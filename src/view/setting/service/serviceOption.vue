<template>
  <div class="set-server">
    <!-- <div class="content-body view-section-spacing" v-for="item in officialAccount" :key="item.name"> -->
      <dl class="server-info">
        <dt>
          <img :src="officialAccount.head_img">
        </dt>
        <dd>
          <p>
            <span style="color: #333; font-size: 15px;">{{officialAccount.nickname}}</span>
            <el-tag color="#1581ff" v-if="officialAccount.service_type_info === '2'">服务号</el-tag>
            <el-tag color="#f6a623" v-if="officialAccount.is_auth">已认证</el-tag>
          </p>
          <p>{{officialAccount.name}}</p>
          <p>{{officialAccount.appid}}</p>
        </dd>
      </dl>
      <div class="server-settings">
        <h3>授权设置</h3>
        <div class="server-settings-item">
          <p style="margin: 20px 0">
            <span class="num">1</span> 文件上传</p>
          <p style="margin: 20px 0;line-height: 2em">设置请前往
            <span class="red">微信后台 > 公众号设置 > 功能设置</span> <br>
            <span>点击设置业务域名下载第3条里的文件，上传到阅读云</span><br>
            <span v-if="officialAccount.verify_txt"> 已上传文件：{{officialAccount.verify_txt}} </span>
          </p>
          <el-upload class="upload-demo" drag :http-request="upload" action="" :data="{name:officialAccount.name}">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </div>
        <div class="server-settings-item">
          <p style="margin: 20px 0">
            <span class="num">2</span> 公众号设置</p>
          <p style="margin: 20px 0">设置请前往
            <span class="red">微信后台 > 公众号设置 > 功能设置</span>
          </p>
          <div class="server-settings-message">
            <p>
              <span class="label">业务域名：</span> {{domain}}
              <el-tag class="copy " color="#32dc86" style="margin-left: 1em" :data-clipboard-text="domain">复制</el-tag>
            </p>
            <p>
              <span class="label">JS接口安全域名：</span> {{domain}}
              <el-tag class="copy " color="#32dc86" style="margin-left: 1em" :data-clipboard-text="domain">复制</el-tag>
            </p>
            <p>
              <span class="label">网页授权域名：</span> {{domain}}
              <el-tag class="copy " color="#32dc86" style="margin-left: 1em" :data-clipboard-text="domain">复制</el-tag>
            </p>
          </div>
        </div>
        <div class="server-settings-item">
          <p style="margin: 20px 0">
            <span class="num">3</span> 密钥设置
          </p>
          <p style="margin: 20px 0">设置请前往
            <span class="red">基本配置 > 开发者ID > 应用密匙</span>
          </p>
          <div class="server-settings-input">
            <span>APP Secret：</span>
            <el-input v-model="officialAccount.appsecret"></el-input>
            <!-- <el-button type="primary" @click="saveSecret(item.name,item.appsecret)">保存</el-button> -->
          </div>
        </div>
        <div class="server-settings-item">
          <p style="margin: 20px 0">
            <span class="num">4</span> 服务号安全设置
          </p>
          <p style="margin: 20px 0"> 设置每天新增关注粉丝人数上限阀值，防止被微信清理粉丝，当日服务号加满后自动关注到下一个服务号。 </p>
          <div class="server-settings-input">
            <span>日关注上限：</span>
            <el-input v-model="officialAccount.subscribe_day_maximum"></el-input>
          </div>
          <div class="server-settings-input" style="margin-top: 20px">
            <span>总关注上限：</span>
            <el-input v-model="officialAccount.subscribe_top_num"></el-input>
          </div>
          <el-button class="big" type="primary" @click="save(officialAccount.name,officialAccount.appsecret,officialAccount.subscribe_day_maximum,officialAccount.subscribe_top_num)">保存</el-button>
        </div>
        <div class="server-settings-explain">
          注意：您必须完成以上4步的设置，才能正常使用小说cps平台。未完成设置将会引起部分页面打不开或支付失败。
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import {
  setOfficialAccountsFile,
  getOfficialAccounts,
  setOfficialAccountsSecret,
  setOfficialAccountsThreshold,
  getOfficialAccountUserStatByName
} from "../../../api";
import {
  settingService,
  serviceNew,
  serviceList,
  serviceOption
} from "../../../namespace";

import Clipboard from "clipboard";

export default {
  name: serviceOption.name,
  data() {
    return {
      officialAccount: {},
      domain: window.options.domain
    };
  },
  methods: {
    upload(data) {
      let formData = new FormData();
      formData.append("verify_file", data.file);
      formData.append("name", data.data.name);
      setOfficialAccountsFile(formData);
    },
    // saveSecret(name, appsecret) {
    //   setOfficialAccountsSecret({ name, appsecret })
    // },
    // saveThreshold(name,subscribe_day_maximum, subscribe_top_num) {
    //   setOfficialAccountsThreshold({ name, subscribe_day_maximum, subscribe_top_num })
    // },
    save(name, appsecret, subscribe_day_maximum, subscribe_top_num) {
      setOfficialAccountsSecret({ name, appsecret });
      setOfficialAccountsThreshold({
        name,
        subscribe_day_maximum,
        subscribe_top_num
      });
    }
  },
  created() {
    getOfficialAccountUserStatByName(this.$route.query.name).then(r => {
      this.officialAccount = r;
    });
  },
  mounted() {
    const success = e => {
      this.$message("复制成功");
      e.clearSelection();
    };
    const error = e => {
      this.$message.error("复制失败,请自行复制");
    };
    const title = new Clipboard(".server-settings-message .copy");
    title.on("success", success);
    title.on("error", error);
  }
};
</script>

<style lang="scss" scoped>
@import "../../../base/mixin.scss";

.num {
  display: inline-block;
  width: 17px;
  height: 17px;
  line-height: 15px;
  font-size: 12px;
  font-style: normal;
  color: #1581ff;
  border: 1px solid #1581ff;
  border-radius: 50%;
  text-align: center;
}

.content-body {
  background: #fff;
  padding: 26px;
}

.content-head {
  line-height: 50px;
  font-size: 14px;
  border-bottom: 1px solid #f7f7f7;
}

.server-settings {
  h3 {
    height: 48px;
    line-height: 48px;
    padding-left: 15px;
    margin: 10px 0;
    font-size: 16px;
  }
  .server-settings-item {
    padding: 0 20px;
    font-size: 14px;
    .server-settings-message {
      line-height: 30px;
      background-color: #f7f7f7;
      display: inline-block;
      padding: 10px 0;
      padding-right: 20px;
      .label {
        width: 130px;
        margin-right: 10px;
        text-align: right;
        display: inline-block;
      }
      .copy {
        cursor: pointer;
      }
    }
    .server-settings-input {
      .el-input {
        width: 300px;
      }
    }
  }
  .server-settings-explain {
    margin-top: 20px;
  }
}

.server-info {
  @include flex($space: flex-start);
  dt img {
    height: 60px;
    display: block;
  }
  dd {
    margin-left: 10px;
    height: 60px;
    @include flex($direction: column);
    align-items: flex-start;
  }
}
.set-server{
  padding: 26px;
}
.set-server .el-button.big {
  margin-left: 100px;
  margin-top: 20px;
  padding-left: 100px;
  padding-right: 100px;

}

.none-data {
  padding: 50px;
  background-color: #fff;
  img {
    height: 200px;
    margin: auto;
    display: block;
  }
}
</style>