import { useState, useEffect } from 'react';
import { Row, Col, Input, Button, message, Modal, Space, Divider } from 'antd';
import { diffChars, diffWords } from 'diff';
import { post } from './http';

const { TextArea } = Input;

const extractPost = (params) => post('/extract', params);

const buttonStyle = {display: 'flex', justifyContent: 'center', alignItems: 'center'}

function App() {
  const [str, setStr] = useState('');
  const [extractStr, setExtractStr] = useState('');
  const [diffStr, setDiffStr] = useState([]);
  const [show, setShow] = useState(false);

  const extractClick = async () => {
    if (!str) {
      return message.info('请输入内容')
    }
    let data = await extractPost({content: str});

    if (Array.isArray(data)) {
      let resultList = []; // 去重结果
      let repeatList = []; // 重复结果

      // 判断重复项
      data.forEach((item) => {
        if (resultList.includes(item)) {
          // 重复
          repeatList.push(item);
        } else {
          resultList.push(item);
        }
      })

      resultList = resultList.join('\n');
      repeatList = repeatList.join('\n');

      data = `${resultList}`;
      if (repeatList.length) {
        data += `\n\n\n重复项：\n${repeatList}`
      }

      message.success('提取成功!');
    }

    setExtractStr(data);
  }

  useEffect(() => {
    const diff = diffChars(str, extractStr);

    console.log(diff);
    setDiffStr(diff);
  }, [str, extractStr]);

  return (
    <div className="App" style={{margin: '20px'}}>
      <Row justify="space-around" align="middle">
        <Col span={15}>
          <TextArea rows={30} value={str} onChange={(e) => setStr(e.target.value)} />
        </Col>
        <Col span={2} style={buttonStyle}>
          <Space size="small" direction="vertical">
            <Button type="primary" onClick={extractClick}>提取</Button>
            <Button type="primary" onClick={() => setShow(true)}>对比</Button>
          </Space>
        </Col>
        <Col span={7}>
          <TextArea rows={30} value={extractStr} onChange={(e) => setExtractStr(e.target.value)}  />
        </Col>
      </Row>

      <Modal visible={show} footer={null} onCancel={() => setShow(false)}>
        <div>红色代表生成后没有源字符</div>
        <Divider></Divider>
        {
          diffStr.map((part, index) => {
            const color = part.removed ? 'red' : 'grey';

            return <span style={{color}} key={index}>{part.value}</span>
          })
        }

      </Modal>
    </div>
  );
}

export default App;
