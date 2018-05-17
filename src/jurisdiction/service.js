import * as namespace from '../namespace'
import menuFormat from './util'

//服务号
export const SERVICE = {
  role: 'service',
  shelter: {name: namespace.NotFound.name},   //禁止进入路由的重定向收容站
  promotionCopy: true,    //推广文案页面中的复制按钮
  promotionLink: true,   //推广文案页面中的生成推广链接按钮
  promotionSave: false,  //推广文案页面中的保存按钮
  subscribe: true,        //推广文案页面中关注章节按钮  
  route: {     //路由是否允许进入
    [namespace.home.name]: true,                 //首页

    //推广模块
    [namespace.promotionNovel.name]: true,       //推广小说
    [namespace.promotionPage.name]: true,        //推广h5网页
    [namespace.promotionNovelInfo.name]: true,   //小说信息
    [namespace.promotionNotify.name]: true,      //消息模版模块
    [namespace.promotionNotifyNew.name]: true,   //新建消息模版
    [namespace.promotionNotifyList.name]: true,  //消息模版列表

    //小说模块
    [namespace.novelCopy.name]: true,            //推广小说文案
    [namespace.novelReader.name]: true,          //阅读器

    //用户模块
    [namespace.passport.name]: true,
    [namespace.login.name]: true,                //登录
    [namespace.register.name]: true,             //注册
    [namespace.password.name]: true,             //修改密码

    //统计模块
    [namespace.statisticsPromote.name]: true,         //推广统计
    [namespace.statisticsRecord.name]: true,          //充值统计
    [namespace.statisticsCenter.name]: true,          //统计中心
    [namespace.statisticsAmount.name]: true,          //金额统计
    [namespace.statisticsWithdraw.name]: true,        //提现统计
    [namespace.statisticsWithdrawSetting.name]: true, //提现设置

    //系统模块
    [namespace.settingService.name]: true,       //服务号设置
    [namespace.serviceNew.name]: true,           //新建服务号
    [namespace.serviceList.name]: true,          //服务号列表
    [namespace.serviceOption.name]: true,        //服务号设置

    [namespace.NotFound.name]: true
  },
  menu: menuFormat([
    //首页
    [namespace.home],
    //推广模块
    [
      namespace.promotion,
      [
        namespace.promotionNovel,
        namespace.promotionPage,
        namespace.promotionNotify
      ]
    ],
    //统计模块
    [
      namespace.statistics,
      [
        namespace.statisticsPromote,
        namespace.statisticsRecord,
        namespace.statisticsCenter
      ]
    ],
    //系统设置
    [
      namespace.setting,
      [
        namespace.settingService,
      ]
    ],
  ])
}

export default SERVICE