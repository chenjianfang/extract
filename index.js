const path = require('path');
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const router = require('./src/router/index');

const app = new Koa();

const PORT = 8080;

app.use(koaStatic(path.join(__dirname, './html/build')));


app.use(cors({
  credentials: true,
}));

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} is start`);
});
