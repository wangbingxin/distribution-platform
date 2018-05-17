/**
 * 转换时间格式
 */
Date.prototype.Format = function (format = "yyyy-MM-dd hh:mm:ss") {
  var o = {
    "M+": this.getMonth() + 1, //month 
    "d+": this.getDate(), //day 
    "h+": this.getHours(), //hour 
    "m+": this.getMinutes(), //minute 
    "s+": this.getSeconds(), //second 
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
    "S": this.getMilliseconds() //millisecond 
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

/**
 * 转换时间戳
 */
export function getLocalTime(nS) {
  return (new Date(parseInt(nS) * 1000).Format("yyyy-MM-dd hh:mm:ss"))/*.substr(2,14)*/;
}

export { scroll } from './scroll.js';

export function IntToMoney(n) {
  if (typeof n !== 'number') {
    n = Number(n)
    if (isNaN(n)) {
      console.warn('IntToMoney需要输入 number 类型')
      return '¥ 0'
    }
  }
  const str = n.toFixed(2)
  return '¥ ' + str
}

/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * you can visit 'http://easings.net/zh-cn' to get effect
*/
export const QuadEaseInOut = function (t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

export function setCookie(name, value, millisecond) {
  var exp = new Date();
  exp.setTime(exp.getTime() + millisecond);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return '';
}

export function colorRGB2Hex(color) {
  var reg = /^[rR][gG][Bb][Aa]?[\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\s]*,){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\s]*,?[\s]*(0\.\d{1,2}|1|0)?[\)]{1}$/
  if (reg.test(color)) {
      var rgb = color.split(',');
      var r = parseInt(rgb[0].split('(')[1]);
      var g = parseInt(rgb[1]);
      var b = parseInt(rgb[2].split(')')[0]);
      var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      return hex;
  }else{
      if(color) console.error('color 格式不正确')
      return '#000';
  }
};  

export { luhnCheck } from './luhnCheck'
export { IDCheck } from './IDCheck'