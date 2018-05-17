import Login from './login.vue'  //登录
import Register from './register.vue'  //注册
import Password from './password.vue'  //修改密码

//登录注册
let LoginReg = [
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register'
    },
    {
        path: '/password',
        component: Password,
        name: 'password'
    }
];

export default LoginReg;