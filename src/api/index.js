import axios from './axios'
import { getLocalTime } from '../util/'
import { IntToMoney } from '../util'

const meta = {
  current_page: Number,
  last_page: Number,
  next_page_url: String,
  per_page: Number,
  prev_page_url: String,
  total: Number
}
//获取公告
const noticesType = {
  meta,
  notices: [
    {
      content: String,
      type_name: String,
      is_popup: Number,
      title: String,
      updated_time: Number,
    }
  ]
}
export async function getNotices(params) {
  if ('notice_type_id' in params && !params.notice_type_id) delete params.notice_type_id
  let notices = await axios('/notices', { params, type: noticesType, name: 'notices' })
  notices.notices.forEach((val, i) => { val.updated_time = getLocalTime(val.updated_time) })
  return notices
}

//获取公告分类
const noticesTypesType = [
  {
    "id": Number,
    "name": String
  }
]
export function getNoticeTypes(params) {
  return axios('/noticeTypes', { params, type: noticesTypesType, name: 'noticesTypes' })
}

//获取页面推广页面的页面种类
const promotionPagesType = [
  {
    "id": Number,
    "title": String,
    "description": String
  },
]
export function getPromotionPages(params) {
  return axios('/promotionPages', { params, type: promotionPagesType, name: 'promotionPages' }).then(r => {
    return r.map(val => {
      val.link = window.options.domain + val.link
      return val
    })
  })
}

//获取推广文案下面的信息

//标题
const headlinesType = [
  {
    "id": Number,
    "title": String,
  },
]
export function getHeadlines(params) {
  return axios('/headlines', { params, type: headlinesType, name: 'headlines' })
}

//图片
const documentCoversType = [
  {
    "id": Number,
    "origin_cover": String,
  },
]
export function getDocumentCovers(params) {
  return axios('/documentCovers', { params, type: documentCoversType, name: 'documentCovers' })
}

//模版
const bodyTemplatesType = [
  {
    "id": Number,
    "content": String,
  },
]
export function getBodyTemplates(params) {
  return axios('/bodyTemplates', { params, type: bodyTemplatesType, name: 'bodyTemplates' })
}

//引导
const originalGuidesType = [
  {
    "id": Number,
    "content": String,
  },
]
export function getOriginalGuides(params) {
  return axios('/originalGuides', { params, type: originalGuidesType, name: 'originalGuides' })
}

//获取图书分类
export { getBookCategories } from './bookCategories.js'

//获取图书详情

const bookInfoType = {
  "book_id": Number,
  "book_name": String,
  "book_summary": String,
  "book_uuid": String,
  "cover_url": String,
  "book_word_count": Number,
  "book_chapter_total": Number,
  "book_category_id": Number,
  "book_category": String,
  "book_end_status": Number,
  "book_published_time": String,
  "copyright_type": String,
  "copyright_name": String,
  "headline_id": Number,
  "headline": String,
  "document_cover_id": Number,
  "docuemnt_cover": String,
  "body_template_id": Number,
  "original_guide_id": Number,
  "force_subscribe_chapter_id": Number,
  "document_end_chapter_id": Number,
  "update_time": String,
  "author_name": String
}
export function getBookInfo(id) {
  return axios('/books/' + id, { type: bookInfoType, name: 'bookInfo' })
}

//获取推广图书列表
const bookListType = {
  meta,
  books: [bookInfoType]
}
export function getBookList(params) {
  return axios('/books', { params, type: bookListType, name: 'bookList' })
}
//获取章节目录
const chaptersType = [
  {
    "chapter_id": Number,
    "chapter_name": String,
    "chapter_serial_number": Number,
    "chapter_is_vip": Number
  }
]
export function getChapters(id) {
  return axios('/books/' + id + '/chapters', { type: chaptersType, name: 'chapters' })
}
//获取文案章节内容
const contentType = [{
  "chapter_id": Number,
  "chapter_name": String,
  "chapter_serial_number": Number,
  "chapter_content": String
}]


export function getContent(id) {
  return axios('/templateChapters/' + id, { type: contentType, name: 'templateChapters' })
}

//获取章节内容
const NovelContentType = {
  "chapter_id": Number,
  "chapter_name": String,
  "chapter_serial_number": Number,
  "chapter_content": String,
  "prev_chapter_id": String,
  "next_chapter_id": String,
}
export function getNovelContent(id, cid) {
  return axios(`/books/${id}/chapters/${cid}`, { type: NovelContentType, name: 'NovelContent' })
}


//生成派单（推广页面）
export function createFromPage(params) {
  return axios.post('/sendOrders/createFromPage', params)
}

//生成派单（推广章节）
export function createFromChapte(params) {
  return axios.post('/sendOrders/createFromChapter', params)
}

//获取派单（推广统计）
const sendOrdersType = {
  send_orders: [{
    id: Number,
    name: String,
    entrance: String,
    channel_type: String,
    book_name: String,
    updated_time: String,
    promotion_url: String,
    click_number: Number,
    register_user_number: Number,
    net_subscribe_user_number: Number,
    unsubscribe_user_number: Number,
    pay_success_user_number: Number,
    total_recharge_amount: Number
  }],
  meta
}
export function getSendOrders(params) {
  const domain = window.options.domain
  return axios('/sendOrders', { params, type: sendOrdersType, name: 'chapters' }).then(r => {
    r.send_orders.forEach(val => {
      val.promotion_url = domain + val.promotion_url
      val.total_recharge_amount_format = IntToMoney(val.total_recharge_amount)
    })
    return r
  })
}

//导出派单（推广统计）
export function exportSendOrders(href) {
  const a = document.createElement('a')
  a.setAttribute('href', href)
  a.click()
}

//获取派单（按日期统计）（结算中心）
const billsType = {
  meta,
  bills: [{
    "date": String,
    "recharge_amount": Number,
    "ratio": String,
    "settlement_price": Number
  }]
}
export function getBills(params) {
  return axios('/bills', { params, type: billsType, name: 'bills' }).then(r => {
    r.bills.forEach(val => {
      // val.tax = IntToMoney(val.recharge_amount - val.settlement_price)
      val.tax = 0
      val.recharge_amount = IntToMoney(val.recharge_amount)
      val.settlement_price = IntToMoney(val.settlement_price)
    })
    return r
  })
}

//导出派单（推广统计）
export function exportBills(href) {
  const a = document.createElement('a')
  a.setAttribute('href', href)
  a.click()
}


//获取账号银行信息
export function getCashAccount() {
  return axios('/cashAccount', { notErrMessage: true })
}

//设置账号银行信息
export function setCashAccount(params) {
  return axios.post('/cashAccounts', params)
}


//获取提现列表
const withdrawCashesType = {
  meta,
  withdraw_cashes: [{
    withdraw_amount: Number,// 提现金额.
    pay_amount: Number,// 付款金额.
    pay_time: String,// 打款时间.
    status: Number,// 状态：1-待审核、2-打款中、3-已打款、4-被冻结、5-打款失败.
    created_time: String,// 申请时间. 
  }]
}
export function getWithdrawCashes(params) {
  return axios('/withdrawCashes', { params, type: withdrawCashesType, name: 'withdrawCashes' }).then(r => {
    r.withdraw_cashes.forEach(val => {
      val.withdraw_amount = IntToMoney(val.withdraw_amount)
      val.pay_amount = IntToMoney(val.pay_amount)
    })
    return r
  })
}


//申请提现
export function setWithdrawCashes(params) {
  return axios.post('withdrawCashes/apply', params, { message: '提现成功' })
}

//获取今日充值数据
const todayRechargeType = {
  success_amount: Number, //成功充值总额
  paid_number: Number,//成功次数.
  unpaid_number: Number, //失败次数. 
}
export function todayRecharge() {
  return axios('/orders/today', { type: todayRechargeType, name: "todayRecharge" })
}



//获得充值订单
const ordersType = {
  meta,
  orders: [{
    "merchant_order_id": String,
    "user_id": Number,
    "user_nickname": String,
    "pay_money": Number,
    "pay_flag": Number,
    "pay_time": String,
    "send_order_id": Number,
    "send_order_name": String
  }]
}
export function getOrders(params) {
  return axios('/orders', { params, type: ordersType, name: 'orders' }).then(r => {
    r.orders.forEach(val => {
      val.pay_money = IntToMoney(val.pay_money)
    })
    return r
  })
}

//充值订单 - 导出  (充值记录)
export function exportOrders(href) {
  const a = document.createElement('a')
  a.setAttribute('href', href)
  a.click()
}

//获取已发送通知列表
const WechatTemplateMsgsType = {
  meta,
  msgs: [
    {
      "id": Number,
      "template_name": String,
      // "template_content": String,
      "send_time": String,
      "send_status": String,
      "status": String
    }
  ],
}
export function getWechatTemplateMsgs(page) {
  return axios('/wechatTemplateMsgs', { params: { page }, type: WechatTemplateMsgsType, name: "WechatTemplateMsgs" })
}

//获取消息模板列表
const WechatTemplateType = [
  {
    "common_template_id": String,
    "title": String,
    "content": String,
    "example": String
  },
]
export function getWechatTemplates() {
  return axios('/wechatTemplates', { type: WechatTemplateType, name: "WechatTemplate" }).then(r => {
    return r.map(val => {
      val.content = val.content.split(/\n+/g).map(val => {
        return val.match(/[^{]+?(?={{)|{{.+?}}/g).map(val => {
          if (val.indexOf('{{') === 0) {
            return {
              value: '',
              modifiable: true,
              color: '',
              name: val.slice(2, -2)
            }
          } else {
            return {
              value: val,
              modifiable: false,
            }
          }
        })
      })
      return val
    })
  })
}

//停止发送模板消息
export function stopWechatTemplates(id) {
  return axios.post(`/wechatTemplateMsgs/${id}/stop`)
}

//创建模板消息
export function creatWechatTemplates(params) {
  return axios.post(`/wechatTemplateMsgs`, params)
}

//模板消息测试
export function testWechatTemplates(params) {
  return axios.post(`/wechatTemplateMsgs/test`, params)
}

//服务号授权
export function authOfficialAccounts() {
  return axios('officialAccounts/auth')
}
//获取服务号列表
export function getOfficialAccounts() {
  return axios('officialAccounts')
}

//获取服务号列表详情
const userStatType = [
  {
    "name": String,
    "nickname": String,
    "total_user_number": Number,
    "today_new_user_number": Number,
    "subscribe_day_maximum": Number,
    "subscribe_top_num": Number,
    "is_auth": Number
  }
]
export function getOfficialAccountsUserStat(params) {
  return axios(`/officialAccounts/userStat`, { type: userStatType, name: 'userStat' }).then(r => {
    r.forEach(val => {
      val.is_auth = val.is_auth ? '已授权' : '未授权'
    })
    return r
  })
}

export function getOfficialAccountUserStatByName(name) {
  return axios(`/officialAccounts/${name}`, ).then(r => {
    r.is_auth = r.is_auth ? '已授权' : '未授权'
    return r
  })
}


//上传公众号文件
export function setOfficialAccountsFile(params) {
  return axios.post(`/officialAccounts/verify`, params)
}

//设置公众号密钥
export function setOfficialAccountsSecret(params) {
  return axios.post(`/officialAccounts/secretSet`, params)
}

//设置公众号阈值
export function setOfficialAccountsThreshold(params) {
  return axios.post(`/officialAccounts/update`, params)
}


//获取验证码
export function getVerificationCode(phone) {
  const data = new FormData()
  data.append('phone', phone)
  return axios({
    url: '/auth/sms',
    data: data,
    message: '已发送',
    method: 'post'
  })
}

//注册
export function register(params) {
  return axios({
    method: 'post',
    url: '/auth/register',
    data: params,
    message: '注册成功'
  })
}

//登录 
export function login(params) {
  return axios({
    method: 'post',
    url: '/auth/login',
    data: params,
    message: false
  })
}

//修改密码 
export function modifyPassword(params) {
  return axios({
    method: 'post',
    url: '/modifyPassword',
    data: params,
    message: '修改成功'
  })
}



export function getCity() {
  return axios('/cities').then(r => {
    const cities = []
    for (let i in r.cities) {
      const province = { value: i, label: i }
      if (r.cities[i].length > 1) {
        province.children = r.cities[i].map(v => {
          return {
            value: v, label: v
          }
        })
      }
      cities.push(province)
    }
    return cities
  })
}