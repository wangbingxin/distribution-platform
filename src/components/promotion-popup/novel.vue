<template>
  <div class="popup-promotion-novel">
    <section class="novel-detail-content">
      <div class="cover">
        <img :src="info.cover_url">
      </div>
      <div class="text">
        <div class="first">
          <span class="name">{{info.book_name}}</span>
        </div>
        <div class="sec">
          <span>作者：{{info.author_name}}</span>
          <span class="type">类型：{{info.book_category}}字</span>
        </div>
        <div class="third">
          {{info.book_summary}}
        </div>
      </div>
    </section>
    <section class="content">
      <div class="row">
        <span class="label"> 派单渠道名称</span>
        <el-input class="info" v-model="channel"></el-input>
      </div>
      <div class="row">
        <span class="label">阅读章节原文</span>
        <div class="info chapter">{{chapter.chapter_name}}</div>
      </div>
      <div class="row">
        <span class="label">入口页面</span>
        <div class="info">小说阅读页</div>
      </div>
      <div class="row">
        <span class="label">派单渠道类型</span>
        <el-radio-group v-model="type">
          <el-radio label="AUTHENTICATED">认证号</el-radio>
          <el-radio label="UNAUTHENTICATED">非认证号</el-radio>
        </el-radio-group>
      </div>
    </section>
    <div class="bottom">
      <el-button type="primary" class="conform" @click.native="createFromChapte">生成链接</el-button>
      <el-button type="primary" class="cancel" @click.native="handleDialog()">取消</el-button>
    </div>
  </div>
</template>

<script>
import { createFromChapte } from '../../api'

export default {
  props: ['chapter', 'info'],
  data() {
    return {
      channel: '',
      type: 'UNAUTHENTICATED'
    }
  },
  methods: {
    createFromChapte() {
      if (!this.channel) { this.$message.error('推广渠道或者位置名称不能为空'); return }
      this.flag = false
      createFromChapte({
        name: this.channel,
        channel_type: this.type,
        book_id: this.info.book_id,
        chapter_id: this.chapter.chapter_id,
        headline_id: this.info.headline_id,
        body_template_id: this.info.body_template_id,
        document_cover_id: this.info.document_cover_id,
        original_guide_id: this.info.original_guide_id,
        document_end_chapter_id: this.info.document_end_chapter_id,
        subscribe_chapter_id: this.info.force_subscribe_chapter_id,
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

<style lang="scss" scoped>
@import '../../base/mixin.scss';
.novel-detail-content {
  background-color: #fff;
  overflow: hidden;
  color: #666;
  margin-bottom: 26px;
  font-size: 12px;
  .cover {
    float: left;
    height: 160px;
    width: 120px;
    img {
      display: block;
      height: 100%;
      width: 100%;
      border-radius: 5px; 
    }
  }
  .text {
    float: left;
    margin-left: 16px;
    width: calc(100% - 16px - 120px);
    .name {
      font-size: 16px;
      color: #333;
      font-weight: bold;
    }
    .sec {
      margin-top: 1em;
      .type {
        margin-left: 50px;
      }
    }
    .third {
      margin-top: 1em;
      line-height: 2em;
      @include multiLine(4);
      text-indent: 2em;
    }
  }
}

.info.chapter {
  color: $blue1;
}

</style>