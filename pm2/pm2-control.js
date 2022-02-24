const pm2 = require('pm2');
const config = require('./production.config');

pm2.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  pm2.describe(config.name, (err, list) => {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    if (list && list[0] && list[0].pid !== 0) {
      // 已启动
      pm2.reload(config.name, (err) => {
        if (err) {
          console.error(err);
          pm2.disconnect();
          process.exit(2);
          return;
        }
        process.exit(0);
      });
    } else {
      // 未启动
      pm2.start(config, (err) => {
        if (err) {
          console.error(err);
          pm2.disconnect();
          process.exit(2);
          return;
        }
        process.exit(0);
      });
    }
  });
});
