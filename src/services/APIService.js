import * as Request from './RequestService';
// import { API_TOKEN } from '../constants';

// const BEARER_AUTH = `Bearer ${API_TOKEN}`;
const BASE_URL = 'https://api-generator.retool.com/1tdqbQ';

export const getConfig = () => ({
  headers: {
    Authorization: 'qqq',
  },
});

export const fetchUserAPI = (id) => {
  const url = `${BASE_URL}/user`;
  const config = getConfig();
  return Request.get({ url, config });
};

export const createUserAPI = (data) => {
  const url = `${BASE_URL}//user`;
  const config = getConfig();
  console.log('Request.ppost >> ', data)
  return Request.post({ url, config, data });
};

export const updateUserAPI = (data) => {
  const url = `${BASE_URL}//user/${data.id}`;
  const config = getConfig();
  return Request.put({ url, config, data: { name: data.name, email: data.email } });
};

export const deleteUserAPI = (data) => {
  const url = `${BASE_URL}//user/${data}`;
  const config = getConfig();
  return Request.del({ url, config });
};
