export const phone = function (context) {
  return [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
  ]
}

export const verificationCode = function () {
  return []
}

export const password = function (context, form) {
  return [
    { required: true, message: '密码不可为空', trigger: 'blur' },
    { max: 20, message: '密码最大长度为20', trigger: 'blur' },
    { min: 6, message: '密码最小长度为6', trigger: 'blur' },
    { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$).+$/, message: '不能是纯数字或者纯字母', trigger: 'blur' },
    {
      validator(rule, value, callback) {
        if (context[form].repassword !== '' && context[form].repassword !== undefined) {
          context.$refs[form].validateField('repassword');
        }
        callback();
      }, trigger: 'blur'
    }
  ]
}

export const oldpassword = function (context, form) {
  return [
    { required: true, message: '密码不可为空', trigger: 'blur' },
    { max: 20, message: '密码最大长度为20', trigger: 'blur' },
    { min: 6, message: '密码最小长度为6', trigger: 'blur' },
    { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$).+$/, message: '不能是纯数字或者纯字母', trigger: 'blur' },]
}
const repassword = function (context, form) {
  return [
    {
      validator(rule, value, callback) {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== context[form].password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ]
}

export { repassword }

const rules = {
  phone,
  password,
  repassword,
  verificationCode,
  oldpassword
}
/**
 * {
 *   rules: [] 需求规则
 *   form: data里的表单字段,
 *   context: 上下文 
 * }
 * 
 */
export default function (params) {
  if (!params.form) params.form = 'form'
  const result = {}
  params.rules.map(val => {
    result[val] = rules[val](params.context, params.form)
  })
  return result
}