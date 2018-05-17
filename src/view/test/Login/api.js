import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'http://admin.wangluogudu.com:8029'
//axios.defaults.baseURL = 'http://118.31.16.152:8029'
axios.defaults.withCredentials = true

// 检测手机号
export const checkPhone = params => { return axios.get('/user/v1.0/check_phone', { params: params }).then(res => res.data); };

// 发送验证码
export const sendCode = params => { return axios.get('/user/v1.0/send_message', { params: params }).then(res => res.data); };

// 注册
export const userRegister = params => { return axios.post('/user/v1.0/register', qs.stringify(params)).then(res => res.data); };

// 登录
export const userLogin = params => { return axios.post('/user/v1.0/login', qs.stringify(params)).then(res => res.data); };

// 修改密码
export const updatePassword = params => { return axios.post('/user/v1.0/update_password', qs.stringify(params)).then(res => res.data); };
