import axios from 'axios';

async function request(options) {
  try {
    const { data = {} } = await axios(options);
    return data;
  } catch (err) {
    return null;
  }
}

function get(url, params = {}, options = {}) {
  return request({
    method: 'get',
    url,
    params,
    ...options,
  });
}

function post(url, params = {}, options = {}) {
  const data = params;
  return request({
    method: 'post',
    url,
    data,
    ...options,
  });
}

export {
  get,
  post
}
