module.exports = {
  name: 'server-extract',
  script: './index.js',
  cwd: '/data/release/extract',
  env: {
    NODE_ENV: 'production',
  },
  error_file: '/data/logs/server-extract.err.log',
  out_file: '/data/logs/server-extract.out.log',
};
