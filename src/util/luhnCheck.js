
//银行卡号Luhn校验算法
//luhn校验规则：16位银行卡号（19位通用）:
//1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
//2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
//3.将加法和加上校验位能被 10 整除。

//bankno为银行卡号  不验证长度和字符
function luhnCheck(bankno) {
  var len = bankno.length,
    checkNum = +bankno.substr(len - 1, 1),//取出最后一位（与luhn进行比较）
    baseNum = bankno.substr(0, len - 1).split('').reverse(),//前15或18位
    total = 0

  baseNum.forEach(function (val, i) {
    if ((i + 1) % 2) { //奇数
      const n = val * 2
      total += n >= 10 ? (n - 9) : n
    } else {  //偶数
      total += +val
    }
  }, this);
  if ((total + checkNum) % 10) {
    return false
  } else {
    return true
  }
}

export default function wrap(rule, value, callback) {
  if(luhnCheck(value.replace(/\s/g,''))){
    callback()
  }else{
    callback(new Error('您输入的银行卡有误'))
  }
}

export { wrap as luhnCheck }
