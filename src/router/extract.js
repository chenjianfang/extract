const fs = require('fs');

function extract(ctx) {

  const str = ctx.request.body.content;

  let matchList = str.match(/<SN>[^S]*(?=<\/SN>)/g)

  if (!matchList) {
    return ctx.body = '没有匹配到<SN>xxx</SN>格式数据';
  }

  matchList = matchList.map((item) => item.slice(4));

  let result = [];

  for (let i = 0; i < matchList.length; i += 1) {
    const item = matchList[i];
    const itemMatch = item.match(/<(.*)>/);

    if (!itemMatch) {
      ctx.body = `${item} 没有匹配到<SN><xxxx></SN>格式数据`;
      break;
    }

    let head = itemMatch[1];

    const footerIndex = item.indexOf('>') + 1;
    const footerList =  item.slice(footerIndex).split('|');

    if (!footerList) {
      ctx.body = `${item} 没有匹配到<SN><xxxx></SN>xxxx|xxxx格式数据`;
      break;
    }

    const single = footerList.map((fi) => `${head}${fi}`);
    result = [
      ...result,
      ...single
    ]
  }

  ctx.body = result;
}

module.exports = extract
