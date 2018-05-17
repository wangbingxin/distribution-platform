
# 项目说明
阅读云平台的分销管理后台（供渠道商使用）。
主要使用vue，vue router，element UI

#版本说明 v1.0
角色（目前只有1个）
  1. 服务号
  2. 订阅号（未开发）

功能
  1. 公告模块
  2. 用户模块
　　1. 登录
　　2. 注册
　　3. 修改密码
  3. 推广模块
　　1. 小说推广
　　2. 页面推广
　　3. 模块消息推送
　　4. 小说文案编辑
  4. 统计模块
　　1. 推广统计
　　2. 充值统计
　　3. 结算中心
  5. 设置模块
　　1. 服务号设置
  6. 小说模块
　　1. 小说详情
　　2. 小说阅读器

# 项目结构

```
.
├── analog-data                                   //模拟数据
├── api                                           
│   ├── index.js                                  //主要api
│   ├── axios.js                                  //全局请求配置
│   ├── bookCategories.js                         //目录缓存+转换
│   └── util.js                                   
├── App.vue                                       
├── assets                                        //图片资源
├── base                                          //基础样式和js                           
├── components                                    //组件                 
├── jurisdiction                                  //权限控制                               
├── main.js                                                                    
├── mixins                                        //混合选项                        
├── namespace                                     //页面名字和菜单名字的集合                              
├── router                                        //路由                              
├── util                                          //全局工具                            
└── view                                          //页面文件
    ├── Home                                      //首页                       
    ├── passport                                  //用户模块
    │   ├── index.vue                             
    │   ├── find.vue                              //找回密码（未开发）
    │   ├── login.vue                             //登录
    │   ├── password.vue                          //修改密码
    │   ├── register.vue                          //注册
    │   ├── rules.js                              //表单验证规则
    │   └── routes.js                             
    ├── promotion                                 //推广模块
    │   ├── notify                                //定时消息
    │   │   ├── index.vue                         
    │   │   ├── list.vue                          //小说推广
    │   │   ├── new.vue                           //小说推广
    │   │   └── template.vue                      //小说推广
    │   ├── novel-info.vue                        //小说详情
    │   ├── novel.vue                             //小说推广
    │   ├── page.vue                              //页面推广
    │   └── routes.js                     
    ├── novel                                     //小说页面（独立，不显示菜单）
    │   ├── novel-copy.vue                        //小说文案
    │   ├── novel-reader.vue                      //小说阅读
    │   └── routes.js                                                          
    ├── statistics                                //统计模块
    │   ├── statisticsPromote.vue                 //推广统计
    │   ├── statisticsRecord.vue                  //充值统计           
    │   ├── statisticsCenter                      //结算中心
    │   │   ├── index.vue                 
    │   │   ├── statisticsAmount.vue              //结算信息
    │   │   ├── statisticsWithdraw.vue            //提现信息
    │   │   ├── statisticsWithdrawSetting.vue     //提现设置
    │   └── router                                                   
    ├── setting                                   //系统设置模块
    │   ├── menu                                  //系统菜单（未实现）
    │   │   └── MenuSetting.vue                   
    │   ├── reply                                 //自动回复（未实现）
    │   │   ├── AddAutoReply.vue                  
    │   │   ├── KeywordAutoReply.vue              
    │   │   ├── MsgAutoReply.vue                  
    │   │   └── ReplySetting.vue                  
    │   ├── routes.js                             
    │   ├── service                               //服务号相关
    │   │   ├── index.vue                
    │   │   ├── ServiceList.vue                   //服务号列表
    │   │   ├── serviceNew.vue                    //新增服务号
    │   │   └── serviceOption.vue                 //服务号设置
    ├── NotFound.vue                              //404页面        
    └── test                                      //一些旧模块或测试模块
.
```
