/* 
* 全部路由信息
*/

export const home = {
  path: '',
  name: "home",
  Chinese: "首页",
  icon: '#icon-daohang-shouye',
}

//#region  推广模块
export const promotion = {
  name: 'promotion',
  Chinese: '推广运营',
  icon: '#icon-fuwuhao-yingxiaotuiguang',
}

export const promotionNovel = {
  path: '/promotionNovel',
  name: "promotionNovel",
  Chinese: "小说推广",
  icon: '#icon-daohang-xiaoshuoliebiao',
}

export const promotionNovelInfo = {
  path: '/promotionNovel/:id',
  name: "promotionNovelInfo",
  Chinese: "书籍详情",
  meta: {
    activeMenu: promotionNovel.name
  }
}

export const promotionPage = {
  path: '/promotionPage',
  name: "promotionPage",
  Chinese: "页面推广",
  icon: '#icon-daohang-mobanxiaoxi',
}

export const promotionNotify = {
  path: '/promotionNotify',
  name: "promotionNotify",
  Chinese: "定时通知",
}

export const promotionNotifyNew = {
  path: 'new',
  name: "promotionNotifyNew",
  Chinese: "新建模板推送",
  meta: {
    activeMenu: promotionNotify.name
  }
}

export const promotionNotifyList = {
  path: '',
  name: "promotionNotifyList",
  Chinese: "为新模板通知",
  meta: {
    activeMenu: promotionNotify.name
  }
}

//互相引用了
promotionNotify.redirect = { name: promotionNotifyList.name }

//#endregion

//#region 小说模块
export const novelCopy = {
  name: 'novel-copy',
  path: '/novelCopy/:id',
  Chinese: '小说推广模板'
}

export const novelReader = {
  name: 'novel-reader',
  path: '/novelReader/:id/:cid',
  Chinese: '章节内容'
}
//#endregion

//#region 统计模块
export const statistics = {
  name: 'statistics',
  Chinese: '统计结算',
  icon: '#icon-daohang-dingdanjiesuan',
}

export const statisticsPromote = {
  path: '/statisticsPromote',
  name: "statisticsPromote",
  Chinese: "推广统计",
  icon: '#icon-daohang-shujufenxi',
}

export const statisticsRecord = {
  path: '/statisticsRecord',
  name: "statisticsRecord",
  Chinese: "充值记录",
  icon: '#icon-daohang-chongzhijilu',
}

export const statisticsCenter = {
  path: '/statisticsCenter',
  name: "statisticsCenter",
  Chinese: "结算中心",
  icon: '#icon-daohang-dingdanjiesuan',
}

export const statisticsAmount = {
  path: '',
  name: "statisticsAmount",
  Chinese: "结算信息",
  meta: {
    activeMenu: statisticsCenter.name
  }
}

export const statisticsWithdraw = {
  path: 'withdraw',
  name: "statisticsWithdraw",
  Chinese: "提现信息",
  meta: {
    activeMenu: statisticsCenter.name
  }
}

export const statisticsWithdrawSetting = {
  path: 'wthdrawSetting',
  name: "statisticsWithdrawSetting",
  Chinese: "提现设置",
  meta: {
    activeMenu: statisticsCenter.name
  }
}

statisticsCenter.redirect = { name: statisticsAmount.name }

//#endregion

//#region 用户模块
export const login = {
  path: 'login',
  name: "login",
  Chinese: "账号登录",
  meta: {
    Chinese: "账号登录",
  }
}

export const register = {
  path: 'register',
  name: "register",
  Chinese: "账号注册",
  meta: {
    Chinese: "账号注册",
  }
}


export const password = {
  path: 'password',
  name: "password",
  Chinese: "修改密码", meta: {
    Chinese: "修改密码",
  }
}

export const find = {
  path: 'find',
  name: "find",
  Chinese: "密码找回",
  meta: {
    Chinese: "密码找回",
  }
}

export const passport = {
  path: '/passport',
  name: "passport",
  redirect: { name: login.name }
}
//#endregion


//#region 设置模块
export const setting = {
  name: 'setting',
  Chinese: '系统设置',
  icon: '#icon-daohang-gongzhonghaotixing',
}

export const settingService = {
  name: 'settingService',
  Chinese: '服务号设置',
  icon: '#icon-daohang-gongzhonghaotixing',
  path: "/service",
}

export const serviceNew = {
  name: 'serviceNew',
  path: 'new',
  Chinese: '新增服务号',
  meta: {
    activeMenu: settingService.name
  }
  
}

export const serviceList = {
  name: 'serviceList',
  path: 'list',
  Chinese: '服务号列表',
  meta: {
    activeMenu: settingService.name
  }
  
}

export const serviceOption = {
  name: 'serviceOption',
  path: 'option',
  Chinese: '设置服务号',
  meta: {
    activeMenu: settingService.name
  }
}

// settingService.redirect = { name: serviceList.name }
//根据权限重定向，需要外部依赖，写在外边

//#endregion

export const NotFound = {
  name: 'NotFound',
  path: '/404',
}