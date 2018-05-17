<template>
  <div class="novel-info" ref="root">
    <section class="novel-detail view-section-spacing">
      <x-sub-title :item="[Chinese]"></x-sub-title>
      <div class="novel-detail-content">
        <div class="cover">
          <img :src="info.cover_url">
        </div>
        <div class="text">
          <div class="first">
            <span class="name">{{info.book_name}}</span>
          </div>
          <div class="sec">
            <span>作者：{{info.author_name}}</span>
            <span>{{info.book_word_count}}字</span>
          </div>
          <div class="third">
            简介：{{info.book_summary}}
          </div>
        </div>
      </div>
    </section>
    <section class="novel-chapter">
      <x-sub-title :item="['书籍目录']"></x-sub-title>
      <div ref="table" class="novel-chapter-content">
        <x-table :column="[{label: '章节',prop: 'chapter_name'},{label: '操作',prop: 'chapter_name', width:'350'}]" :data="showChapters" stripe>
          <template slot="col-2" scope="scope">
            <router-link target="_blank" v-if="scope.rowData.is_preview" :to="{name: novelReader, params: { id: id, cid: scope.rowData.chapter_id}}">
              <span>查看章节内容</span>
            </router-link>
            <router-link target="_blank" :to="{name: novelCopy, params: { id: id}} " v-if="scope.rowData.chapter_serial_number <= 5">
              <span>生成推广文案</span>
            </router-link>
          </template>
        </x-table>
      </div>
    </section>
    <section class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="30" :total="chapters.length" layout="prev, pager, next, jumper">
      </el-pagination>
    </section>
    <!-- <el-dialog class="dialog-1" title="生成推广链接" :visible.sync="dialog">
            <x-popup type="x-novel" :chapter="checkedChapter" :info="info" :status.sync="dialog"></x-popup>
          </el-dialog> -->
  </div>
</template>

<script>
import { promotionNovelInfo, novelCopy, novelReader } from "../../namespace";
import scroll from "../../util/scroll";
import { getBookInfo, getChapters } from "../../api";
// import popup from './popup'

export default {
  name: promotionNovelInfo.name,
  // components: { 'x-popup': popup },
  data() {
    return {
      Chinese: promotionNovelInfo.Chinese,
      novelCopy: novelCopy.name,
      novelReader: novelReader.name,
      id: +this.$route.params.id,
      info: {},
      chapters: [],
      showChapters: [],
      page: 1,
      dialog: false,
      checkedChapter: {}
    };
  },
  methods: {
    getChapters() {
      return getChapters(this.$route.params.id).then(r => {
        this.chapters = r;
        this.getShowChapters((this.page = 1));
      });
    },
    getShowChapters(i) {
      this.showChapters = this.chapters.slice(i * 30 - 30, i * 30);
    },
    handleCurrentChange(i) {
      this.getShowChapters(i);
      scroll(this.$refs.table, this.$refs.root.parentNode);
    }
  },
  async beforeRouteUpdate(to, form, next) {
    const info = await getBookInfo(to.params.id);
    this.info = info;
    next();
    this.getChapters();
  },
  async created() {
    const info = await getBookInfo(this.$route.params.id);
    this.info = info;
    this.getChapters();
  }
};
</script>

<style lang="scss" scoped>
@import "../../base/mixin.scss";
.novel-detail-content {
  background-color: #fff;
  overflow: hidden;
  padding: 26px;
  color: #666;
  .cover {
    float: left;
    height: 120px;
    width: 90px;
    img {
      display: block;
      height: 100%;
      width: 100%;
    }
  }
  .text {
    float: left;
    margin-left: 16px;
    width: calc(100% - 16px - 120px);
    .name {
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
    .sec {
      margin-top: 1em;
    }
    .third {
      margin-top: 1em;
      line-height: 1.8em;
      @include multiLine(3);
    }
  }
}

.novel-chapter-content {
  background-color: #fff;
  padding: 26px;
}

.blue {
  color: $blue1;
}
</style>

<style lang="scss">
.novel-chapter-content .x-table-body-col-1 span {
  color: #39a4ff;
  cursor: pointer;
  padding-right: 30px;
}

.novel-chapter-content .x-table-body-col-1 > span:last-child {
  padding: 0;
}

.novel-chapter-content th,
.novel-chapter-content tr {
  text-align: left;
}
</style>
