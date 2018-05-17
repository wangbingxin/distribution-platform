<template>
  <div style="overflow: hidden">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="width:400px" class="l new-template">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name" placeholder="不超过20字"></el-input>
        <div class="tip">任意填写，方便自己识别即可</div>
      </el-form-item>
      <el-form-item label="选择模板" class="is-required">
        <el-select v-model="form.template" placeholder="请选择" style="width: 180px" @change="changeTemplate">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <x-notify-template :name="template.title" :content="template.content" @update-content="updateContent"></x-notify-template>
      </el-form-item>
      <el-form-item label="跳转链接" prop="redirect">
        <el-input v-model="form.redirect" placeholder="请填写跳转链接"></el-input>
        <div class="tip">用户点击模板后跳转到的网页链接，仅限您小说网站内部的链接 在手机上打开您要跳转的页面，点击右上角“…”,复制链接后贴到上面输入框内 模板消息可推具体小说，填入小说的推广链接，方便查看模板消息推广效果
        </div>
      </el-form-item>
      <el-form-item label="发送时间" prop="sendTime" class="is-required">
        <el-date-picker style="width: 180px" v-model="form.sendTime" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="测试ID" ref="test" @click="test" prop="test">
        <el-input v-model="form.test" style="width: 180px" @blur="verifyTest"></el-input>
        <el-button type="warning" class="test" @click="test"> 测试发送 </el-button>
        <div class="tip">设置完后，建议您先测试发送，确认ok后再保存<br> 用测试粉丝账号进入服务号菜单中的用户中心 - 个人中心，填写粉丝数字ID</div>
      </el-form-item>
      <el-form-item label="">
        <el-button type="info" @click="submitForm"> 保存 </el-button>
        <el-button> 重置 </el-button>
      </el-form-item>
    </el-form>
    <div class="template-example l"> {{template.title}} <br> {{template.example}} </div>
  </div>
</template>

<script>
import notifyTemplate from "./template.vue";
import {
  getWechatTemplates,
  testWechatTemplates,
  creatWechatTemplates
} from "../../../api";

import { colorRGB2Hex } from "../../../util";

const pickerOptions = {
  shortcuts: [
    {
      text: "5分钟后",
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() + 60 * 1000 * 5);
        picker.$emit("pick", date);
      }
    },
    {
      text: "10分钟后",
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() + 60 * 1000 * 10);
        picker.$emit("pick", date);
      }
    },
    {
      text: "30分钟后",
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() + 60 * 1000 * 30);
        picker.$emit("pick", date);
      }
    }
  ],
  disabledDate(date) {
    return date < new Date() - 86400000;
  }
};

export default {
  components: {
    "x-notify-template": notifyTemplate
  },
  data() {
    return {
      form: {
        sendTime: "",
        template: "",
        name: "",
        redirect: "",
        test: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { max: 20, message: "长度不超过20", trigger: "blur" }
        ],
        redirect: [
          { required: true, message: "请输入跳转链接", trigger: "blur" },
          { type: "url", message: "请输入正确的跳转链接", trigger: "blur" }
        ],
        sendTime: [
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入发送时间"));
              } else if (value < new Date()) {
                callback(new Error("不能再过去发送时间"));
              } else {
                callback();
              }
            }
          }
        ]
      },
      options: [],
      pickerOptions,
      template: {},
      templateList: []
    };
  },
  methods: {
    updateContent(cell) {
      const o = this.template.content[cell.row][cell.col];
      o.value = cell.value;
      o.color = cell.color;
    },
    changeTemplate(val) {
      this.resetTemplate(this.template);
      this.template = this.templateList[val];
    },
    verify() {
      let flag = false;
      this.$refs.form.validate(valid => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    test() {
      if (this.verifyTest() && this.verify()) {
        const form = this.form;
        const template = this.template;
        testWechatTemplates(
          this.JsonToFormData({
            name: form.name,
            template_id: template.common_template_id,
            template_content: this.formatTemplate(template),
            redirect_url: form.redirect,
            user_id: form.test
          })
        );
      }
    },
    verifyTest() {
      if (!this.form.test) {
        this.$refs.test.validateState = "error";
        this.$refs.test.validateMessage = "请输入测试ID";
        return false;
      } else {
        this.$refs.test.validateState = "";
        this.$refs.test.validateMessage = "";
        return true;
      }
    },
    submitForm() {
      if (this.verify()) {
        const form = this.form;
        const template = this.template;
        creatWechatTemplates(
          this.JsonToFormData({
            name: form.name,
            template_id: template.common_template_id,
            template_content: this.formatTemplate(template),
            redirect_url: form.redirect,
            send_time: new Date(form.sendTime).Format()
          })
        );
      }
    },
    resetForm() {
      this.$refs.refs.resetFields();
      this.resetTemplate(this.template);
    },
    formatTemplate(t) {
      const content = [];
      t.content.forEach(row => {
        row.forEach(cell => {
          if (cell.modifiable) {
            content.push({
              [cell.name]: [cell.value, colorRGB2Hex(cell.color)]
            });
          }
        });
      });
      return content;
    },
    resetTemplate(t) {
      t.content.forEach(row => {
        row.forEach(cell => {
          if (cell.modifiable) {
            cell.value = "";
            cell.color = "";
          }
        });
      });
    },
    JsonToFormData(json) {
      const data = new FormData();
      for (var key in json) {
        if (typeof json[key] === "object") {
          data.append(key, JSON.stringify(json[key]));
        } else {
          data.append(key, json[key]);
        }
      }
      return data;
    }
  },
  created() {
    getWechatTemplates().then(r => {
      this.templateList = r;
      this.template = r[0];
      this.form.template = 0;
      this.options = r.map((val, i) => {
        return {
          value: i,
          label: val.title
        };
      });
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../../base/mixin.scss";
.tip {
  font-size: 12px;
  color: #999;
  line-height: 1.5em;
}

div.tip {
  margin-top: 0.8em;
}

.test {
  float: right;
}

.el-button:not(.test) {
  padding: 10px 40px;
}

.template-example {
  width: 320px;
  background-color: #f7f7f7;
  padding: 16px;
  margin-top: 145px;
  margin-left: 16px;
  white-space: pre-wrap;
  line-height: 24px;
}
.el-button.el-button--info {
  background-color: $blue1;
  border-color: $blue1;
}
</style>

<style lang="scss">
.new-template {
  .el-form-item__error {
    left: 105%;
    width: 100%;
    line-height: 30px;
    top: 0;
  }
}
</style>
