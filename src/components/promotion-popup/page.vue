<template>
  <div class="popup-promotion-page">
    <div class="content">
      <div class="row">
        <span class="label">
          <span class="red">*</span>推广渠道或者位置名称</span>
        <el-input class="info" v-model="channel"></el-input>
      </div>
      <div class="row">
        <span class="label">推广内容名称</span>
        <div class="info">{{name}}</div>
      </div>
      <div class="row">
        <span class="label">推广渠道类型</span>
        <el-radio-group v-model="type">
          <el-radio label="AUTHENTICATED">认证号</el-radio>
          <el-radio label="UNAUTHENTICATED">非认证号</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="bottom">
      <el-button type="primary" class="conform" @click="createFromPage">生成链接</el-button>
      <el-button type="primary" class="cancel" @click="handleDialog()">取消</el-button>
    </div>
  </div>
</template>

<script>
import { createFromPage } from '../../api'

export default {
  name: 'popup-promotion-page',
  props: ['name', 'id'],
  data() {
    return {
      channel: '',
      type: 'UNAUTHENTICATED',
      flag: true,
    }
  },
  methods: {
    createFromPage() {
      if (!this.channel) { this.$message.error('推广渠道或者位置名称不能为空'); return }
      if (!this.id) { this.$message.error('操作错误'); return }
      this.flag = false
      createFromPage({
        name: this.channel,
        channel_type: this.type,
        page_id: this.id
      }).then(r => {
        this.flag = true
        this.$emit('success', r.promotion_url)
      }).catch(e => {
        this.flag = true
        console.error(e)
      })
    },
    handleDialog() {
      this.$emit('close', false)
    }
  }
}
</script>
