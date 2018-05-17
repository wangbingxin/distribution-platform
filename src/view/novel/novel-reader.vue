<template>
  <div class="novel-content-wrap">
    <x-head></x-head>
    <div class="novel-content">
      <div class="novel-content-title red">
        {{content.chapter_name}}
      </div>
      <div class="novel-content-paragraph">
        {{content.chapter_content}}
      </div>
      <footer>
        <router-link v-if="content.prev_chapter_id" :to="{name,params:{id:$route.params.id,cid:  content.prev_chapter_id}}">
          <el-button type="primary">上一章</el-button>
        </router-link>
        <router-link :to="{name:promotionNovelInfo,params:{id:$route.params.id}}">
          <el-button>返回书籍详情</el-button>
        </router-link>
        <router-link v-if="content.next_chapter_id" :to="{name,params:{id:$route.params.id,cid:  content.next_chapter_id}}">
          <el-button type="primary">下一章</el-button>
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script>
import { novelReader, promotionNovelInfo } from '../../namespace'
import { getNovelContent } from '../../api'

export default {
  name: novelReader.name,
  data() {
    return {
      name: novelReader.name,
      promotionNovelInfo: promotionNovelInfo.name,
      content: {
        "chapter_id": 0,
        "chapter_name": "加载中",
        "chapter_serial_number": 0,
        "chapter_content": "加载中"
      }
    }
  },
  methods: {
  },
  created() {
    getNovelContent(this.$route.params.id, this.$route.params.cid).then(r => {
      this.content = r
    }).catch(e => {
      this.$router.push('/404')
    })
  },
  beforeRouteUpdate(to, from, next) {
    getNovelContent(to.params.id, to.params.cid).then(r => {
      this.content = r
      next()
    }).catch(e => {
      next('/404')
    })
  }
}
</script>

<style lang="scss" scoped>
.novel-content-wrap {
  background-color: #e8e2d6;
  min-height: 100vh;
  overflow: hidden;
}

.novel-content {
  box-sizing: border-box;
  width: 880px;
  padding: 26px;
  margin: 36px auto;
  background-color: #f7f0e6;
}

.novel-content-title {
  font-size: 30px;
  line-height: 1.5em;
  padding-bottom: 26px;
  border-bottom: 1px solid #e6e6e6;
}

.novel-content-paragraph {
  white-space: pre-wrap;
  font-size: 14px;
  line-height: 1.5em;
}

footer {
  text-align: right;
  .el-button {
    width: 150px;
  }
}
</style>