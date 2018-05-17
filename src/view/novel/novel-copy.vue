<template>
  <div class="novel-copy">
    <div class="detail-content">
      <h3 class="novel-text" ref="title" v-html="getTemplateDate(0)"></h3>
      <div class="novel-content">
        <section class="cover-wrap" ref="cover">
          <div class="fill-box"></div>
          <div class="cover-containter">
            <img :src="getTemplateDate(1)">
          </div>
        </section>
        <section ref="article">
          <section class="article" v-for="item in template.end.chapter_serial_number" :key="item" v-html="bodyTemplates[item - 1]">
          </section>
        </section>
        <section class="novel-guide" ref="guide" v-html="getTemplateDate(3)"></section>
      </div>
    </div>
    <div class="el-popover-wrap">
      <el-popover v-model="popover[0]" ref="popover1" placement="top" width="400" trigger="click" popper-class="novel-copy-popover">
        <div class="popover-wrap">
          <div class="popover-item" @click="change(nameMap[0][0],v,0)" v-for="(v,i) in source[nameMap[1][0]]" :key="i" v-html="v[nameMap[3][0]]"></div>
        </div>
      </el-popover>
      <el-popover v-model="popover[1]" ref="popover2" placement="top" width="400" trigger="click" popper-class="novel-copy-popover">
        <div class="popover-wrap">
          <div class="popover-item" @click="change(nameMap[0][1],v,1)" v-for="(v,i) in source[nameMap[1][1]]" :key="i">
            <img style="width: 100%" :src="v[nameMap[3][1]]">
          </div>
        </div>
      </el-popover>
      <el-popover v-model="popover[2]" ref="popover3" placement="top" width="400" trigger="click" popper-class="popper-cover novel-copy-popover">
        <div class="popover-wrap">
          <div class="popover-item" @click="change(nameMap[0][2],v,2)" v-for="(v,i) in source[nameMap[1][2]]" :key="i" v-html="v[nameMap[3][2]]"></div>
        </div>
      </el-popover>
      <el-popover v-model="popover[3]" ref="popover4" placement="top" width="400" trigger="click" popper-class="novel-copy-popover">
        <div class="popover-wrap">
          <div class="popover-item" @click="change(nameMap[0][3],v,3)" v-for="(v,i) in source[nameMap[1][3]]" :key="i" v-html="v[nameMap[3][3]]"></div>
        </div>
      </el-popover>
      <el-popover v-model="popover[4]" ref="popover5" placement="top" width="400" trigger="click" popper-class="novel-copy-popover">
        <div class="popover-wrap">
          <div class="popover-item single" @click="change(nameMap[0][4],v,4)" v-for="(v,i) in source[nameMap[1][4]]" :key="i">{{v[nameMap[3][5]]}}</div>
        </div>
      </el-popover>
      <el-popover v-model="popover[5]" ref="popover6" placement="top" width="400" trigger="click" popper-class="novel-copy-popover">
        <div class="popover-wrap">
          <div class="popover-item single" @click="change(nameMap[0][5],v,5)" v-for="(v,i) in source[nameMap[1][5]]" :key="i">{{v[nameMap[3][5]]}}</div>
        </div>
      </el-popover>
    </div>
    <div class="link-maker-bar">
      <div class="popover-wrap">
        <div v-popover:popover1 class="popover">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wenanbiaoti"></use>
          </svg>
          <span class="label">文案标题</span>
        </div>
        <div v-popover:popover2 class="popover">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wenanfengmian"></use>
          </svg>
          <span class="label">封面文案</span>
        </div>
        <div v-popover:popover3 class="popover">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhengwenmoban"></use>
          </svg>
          <span class="label">正文模版</span>
        </div>
        <div v-popover:popover4 class="popover">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yuanwenyindao"></use>
          </svg>
          <span class="label">原文引导</span>
        </div>
        <div v-popover:popover5 class="popover">
          <span class="label">文章章节-{{template.end.chapter_serial_number}}</span>
        </div>
        <div v-if="role.subscribe" v-popover:popover6 class="popover">
          <span class="label">关注章节-{{template.subscribe.chapter_serial_number}}</span>
        </div>
        <el-button v-if="role.promotionCopy" class="copy-title" type="primary" size="small" data-clipboard-target=".novel-text">复制标题</el-button>
        <el-button v-if="role.promotionCopy" class="copy-content" type="primary" size="small" data-clipboard-target=".novel-content">复制正文</el-button>
        <el-button v-if="role.promotionLink" type="danger" size="small" @click="dialog = true">生成推广链接</el-button>
        <el-button v-if="role.promotionSave" @click="saveCopy" type="success" icon="document" size="small">保存</el-button>
      </div>
    </div>
    <el-dialog title="生成推广链接" :visible.sync="dialog" custom-class="dialog-popup-promotion">
      <x-popup v-if="source[nameMap[1][5]]" type="x-novel" :info="info" :chapter="source[nameMap[1][5]][template.end.chapter_serial_number]" :template="template" :status.sync="dialog"></x-popup>
    </el-dialog>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import role from "../../jurisdiction";
import scroll from "../../util/scroll";
import { novelCopy } from "../../namespace";
import popup from "../../components/promotion-popup";
import {
  getHeadlines,
  getDocumentCovers,
  getBodyTemplates,
  getOriginalGuides,
  getBookInfo,
  getChapters,
  getContent
} from "../../api";

//自己的名字，接口中素材列表的名字，接口中素材列表id的名字，接口中素材列表内容的名字,接口中默认id的名字,保存文案时使用的名字,
const nameMap = [
  ["title", "cover", "article", "guide", "end", "subscribe"],
  [
    "headlines",
    "documentCovers",
    "bodyTemplates",
    "originalGuides",
    "contents",
    "chapters"
  ],
  ["id", "id", "id", "id", "chapter_id", "chapter_id"],
  [
    "title",
    "origin_cover",
    "content",
    "content",
    "chapter_content",
    "chapter_name"
  ],
  [
    "headline_id",
    "document_cover_id",
    "body_template_id",
    "origin_guide_id",
    "document_end_chapter_id",
    "force_subscribe_chapter_id"
  ],
  [
    "headline_id",
    "document_cover_id",
    "body_template_id",
    "origin_guide_id",
    "document_end_chapter_id",
    "subscribe_chapter_id"
  ]
];
function initTemplate(origin, source) {
  let template = {};
  nameMap[0].forEach((key, i) => {
    const listKey = nameMap[1][i];
    const listIdKey = nameMap[2][i];
    const defaultIdKey = nameMap[4][i];
    const list = source[listKey];
    const id = origin[i];
    if (id) template[key] = list.find(val => val[listIdKey] === id);
    else template[key] = list[0];
  });
  return template;
}

function initOrigin(origin) {
  return nameMap[4].map((key, i) => origin[key]);
}

function shuffle(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    var idx = Math.floor(Math.random() * (len - i));
    var temp = arr[idx];
    arr[idx] = arr[len - i - 1];
    arr[len - i - 1] = temp;
  }
  return arr;
}
export default {
  name: novelCopy.name,
  components: { "x-popup": popup },
  data() {
    return {
      bookID: +this.$route.params.id,
      role,
      source: {},
      template: {
        title: "",
        cover: "",
        article: "",
        guide: "",
        end: 0,
        subscribe: 0
      },
      popover: [false, false, false, false, false, false],
      nameMap,
      dialog: false,
      info: {}
    };
  },
  computed: {
    bodyTemplates() {
      const template = this.getTemplateDate(2);
      const chapter = this.source[nameMap[1][4]];
      if (template && chapter) {
        return chapter.map(val => {
          return template
            .replace("章节标题", val[nameMap[3][5]])
            .replace("章节内容", val[nameMap[3][4]]);
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    getTemplateDate(i) {
      //获取选中的模板的内容
      return this.template[nameMap[0][i]][nameMap[3][i]];
    },
    change(key, val, index) {
      this.template[key] = val;
      this.popover.splice(index, 1, false);
      if (index < 4) scroll(this.$refs[key], document.body);
    },
    saveCopy() {
      const config = { book_id: this.bookID };
      nameMap[0].forEach((key, i) => {
        config[nameMap[4][i]] = this.template[key][nameMap[2][i]];
      });
      setBookPromotionCopy(config);
    }
  },
  async beforeRouteEnter(to, from, next) {
    const [
      headlines,
      documentCovers,
      bodyTemplates,
      originalGuides,
      chapters,
      contents,
      bookInfo
    ] = await Promise.all([
      getHeadlines(),
      getDocumentCovers(),
      getBodyTemplates(),
      getOriginalGuides(),
      getChapters(to.params.id),
      getContent(to.params.id),
      getBookInfo(to.params.id)
    ]);
    next(vm => {
      vm.source = {
        headlines: shuffle(headlines),
        documentCovers: shuffle(documentCovers),
        bodyTemplates: shuffle(bodyTemplates),
        originalGuides: shuffle(originalGuides),
        chapters,
        contents
      };
      vm.template = initTemplate(initOrigin(bookInfo), vm.source);
      vm.info = bookInfo;
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
    const title = new Clipboard(".copy-title");
    title.on("success", success);
    title.on("error", error);
    const content = new Clipboard(".copy-content");
    content.on("success", success);
    content.on("error", error);
  }
};
</script>
<style lang="scss">
.novel-copy {
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 64px;
  background: #fff;
  float: none;
  .novel-text {
    padding-bottom: 10px;
    margin-bottom: 14px;
    border-bottom: 1px solid #e7e7eb;
    line-height: 1.4;
    font-weight: 400;
    font-size: 24px;
  }
  .cover-wrap {
    position: relative;
    margin-bottom: 20px;
    .fill-box {
      height: 0;
      padding-top: 65%;
    }
    .cover-containter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;      
    }
    img {
      display: block;
      width: 100%;
    }
  }
  .article {
    margin-top: 20px;
  }
  .novel-guide {
    margin-top: 20px;
  }
  .link-maker-bar {
    padding: 0;
    background: #fff;
    border-top: 1px solid #e7e7eb;
    width: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 10;
  }
  .popover-wrap {
    margin: auto;
    width: 1000px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .popover {
    &:hover {
      background: #f7f7f7;
    }
    display: inline-block;
    color: #999;
    font-size: 13px;
    line-height: 16px;
    cursor: pointer;
    padding: 15px;
  }
  .icon.arrow {
    transform: scale(0.5);
  }
}

.novel-copy-popover {
  &.el-popover {
    padding: 0;
  }
  .popover-wrap {
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .popover-item {
    padding: 10px 20px;
    border-bottom: 1px solid #e7e7eb;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    cursor: pointer;
    &:hover {
      background-color: #f7f7f7;
    }
  }
  &.popper-cover {
    width: 300px !important;
  }
  .single {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
