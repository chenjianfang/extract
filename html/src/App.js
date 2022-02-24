import { useState } from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import { post } from './http';

const { TextArea } = Input;

const extractPost = (params) => post('/extract', params);

function App() {
  const [str, setStr] = useState('');
  const [extractStr, setExtractStr] = useState('');

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

      message.success('提取成功么么哒💋💋💋');
    }

    setExtractStr(data);
  }

  return (
    <div className="App" style={{margin: '20px'}}>
      <Row justify="space-around" align="top">
        <Col span={15}>
          <TextArea rows={30} value={str} onChange={(e) => setStr(e.target.value)} />
        </Col>
        <Col span={1}>
          <Button type="primary" onClick={extractClick}>提取</Button>
        </Col>
        <Col span={7}>
          <TextArea rows={60} value={extractStr} onChange={(e) => setExtractStr(e.target.value)}  />
        </Col>
      </Row>
    </div>
  );
}

export default App;
