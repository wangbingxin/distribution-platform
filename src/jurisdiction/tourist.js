import * as namespace from '../namespace'
import menuFormat from './util'

//服务号
export const TOURIST = {
  role: 'tourist',
  shelter: {name: namespace.login.name},   //禁止进入路由的重定向收容站
  route: {     //路由是否允许进入
    [namespace.home.name]: false,                 //首页

    //推广模块
    [namespace.promotionNovel.name]: false,       //推广小说
    [namespace.promotionPage.name]: false,        //推广h5网页
    [namespace.promotionNovelInfo.name]: false,   //小说信息
    [namespace.promotionNotify.name]: false,      //消息模版模块
    [namespace.promotionNotifyNew.name]: false,   //新建消息模版
    [namespace.promotionNotifyList.name]: false,  //消息模版列表

    //小说模块
    [namespace.novelCopy.name]: false,            //推广小说文案
    [namespace.novelReader.name]: false,          //阅读器

    //用户模块
    [namespace.passport.name]: true,
    [namespace.login.name]: true,                 //登录
    [namespace.register.name]: true,              //注册
    [namespace.password.name]: false,             //修改密码

    //统计模块
    [namespace.statisticsPromote.name]: false,         //推广统计
    [namespace.statisticsRecord.name]: false,          //充值统计
    [namespace.statisticsCenter.name]: false,          //统计中心
    [namespace.statisticsAmount.name]: false,          //金额统计
    [namespace.statisticsWithdraw.name]: false,        //提现统计
    [namespace.statisticsWithdrawSetting.name]: false, //提现设置

    //系统模块
    [namespace.settingService.name]: false,       //服务号设置
    [namespace.serviceNew.name]: false,           //新建服务号
    [namespace.serviceList.name]: false,          //服务号列表
    [namespace.serviceOption.name]: false,        //服务号设置

    [namespace.NotFound.name]: true
  }
}

export default TOURIST