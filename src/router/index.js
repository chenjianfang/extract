const Router = require('koa-router');
const extract = require('./extract');

const router = new Router();

// 转换文本
router.post('/extract', extract);

module.exports = router;
