
const cwd = process.cwd();

module.exports = {
  name: 'server-extract',
  script: './index.js',
  cwd: cwd,
  env: {
    NODE_ENV: 'production',
  },
  error_file: `${cwd}/logs/server-extract.err.log`,
  out_file: `${cwd}/logs/server-extract.out.log`,
};
