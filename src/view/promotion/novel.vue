<template>
  <div class="promotion-novel">
    <div class="title">{{Chinese}}</div>
    <x-sub-title :item="subTitle" @change-item="changeTitle" :default.sync="activeTitle">
      <el-cascader expand-trigger="click" :options="categories" v-model="categoriesV" change-on-select @change="changeCategory">
      </el-cascader>
      <div :class="['sort',{active: !sort }]" @click="sortNovel('natural')">默认</div>
      <div :class="['sort',{active: sort & artificial && sort & click }]" @click="sortNovel('click')">按点击排序
        <i :class="['sort',{rotate: sort === 0b101}]"></i>
      </div>
      <div :class="['sort',{active: sort & artificial && !(sort & click) }]" @click="sortNovel('count')">按字数排序
        <i :class="['sort',{rotate: sort === 0b001 }]"></i>
      </div>
      <el-input placeholder="请输入小说名称搜索" icon="search" v-model="searchV" :on-icon-click="searchNovel" class="search" v-on:keyup.enter.native="searchNovel">
      </el-input>
    </x-sub-title>
    <div class="novel-list" ref="table">
      <div v-for="(val,row) in bookList" :key="row" :class="['novel-list-row',`row-${row}`]">
        <router-link tag="div" class="col-1 pointer-box" :to="{ name:promotionNovelInfo, params:{id:val.book_id}}">
          <div class="cover">
            <img :src="val.cover_url">
          </div>
          <div class="content">
            <div class="first">
              <span class="name">{{val.book_name}}</span>
              <el-tag color="#ff6d6d" v-if="val.is_new" style="margin-left: 2em">最新</el-tag>
              <!-- <el-tag v-for="(val,i) in val.novel.label" :key="i" :color="val.color" style="margin-left: 2em">最新</el-tag> -->
            </div>
            <div class="sec">
              <span>作者：{{val.author_name}}</span>
              <span>{{val.book_word_count}}字</span>
              <span :class="{green: val.book_end_status}">[{{val.book_end_status ? '已' : '未' }}完结]</span>
            </div>
            <div class="third">
              简介：{{val.book_summary}}
            </div>
          </div>
        </router-link>
        <div class="col-2">
          <div class="cover">
            <img :src="val.docuemnt_cover">
          </div>
          <div class="sec">
            <p class="copy-title">{{val.headline}}</p>
            <p>{{val.update_time}}</p>
          </div>
          <router-link target="_blank" :to="{name: novelCopy,params:{id:val.book_id}}">
            <el-button type="primary">获取推广<br>文案</el-button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="meta.last_page">
      <el-pagination @current-change="handleCurrentChange" :current-page="meta.current_page" :page-size="meta.per_page" :page-count="meta.last_page" layout="prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { promotionNovel, novelCopy, promotionNovelInfo } from "../../namespace";
import classification from "../../analog-data/promotion/classification.json";
import promotionCopy from "../../analog-data/promotion/promotion-copy.json";
import { getBookCategories, getBookList } from "../../api";
import { findFullcategory } from "../../api/bookCategories";
function enterRoute(context, route, list) {
  context.bookList = list.books;
  context.meta = list.meta;

  if (route.query.category) {
    context.categoriesV = findFullcategory(+route.query.category);
    context.activeTitle = +route.query.category;
    context.searchV = "";
  } else if (route.query.key) {
    context.searchV = route.query.key;
    context.categoriesV = [];
    context.activeTitle = 0;
  } else {
    context.searchV = "";
    context.categoriesV = [];
    context.activeTitle = 0;
  }

  if (route.query.sort) {
    context.sort = +route.query.sort;
  } else {
    context.sort = 0;
  }

  if (route.query.page) {
    context.page = page;
  } else {
    context.page = 1;
  }
}

function parseRoute(route) {
  //route里的字段映射成接口的字段
  /* 
    query:{
      category,     //分类
      page,         //页数
      key           //关键字
      sort          //排序
    } 
  */
  /**
   * params:{
   *  book_category_id, //分类
   *  page,              //页面
   *  order_field,      //排序字段
   *  order_type,       //排序顺序
   *  book_name         //关键字
   * }
   */
  let params = {};
  if (route.query.category) params.book_category_id = route.query.category;
  if (route.query.page) params.page = route.query.page;
  if (route.query.key) params.book_name = route.query.key;
  if (route.query.sort) {
    if (route.query.sort & 4) {
      params.order_field = "click";
    } else {
      params.order_field = "word_count";
    }
    if (route.query.sort & 2) {
      params.order_type = "asc";
    } else {
      params.order_type = "desc";
    }
  }
  return params;
}

export default {
  name: promotionNovel.name,
  data() {
    return {
      novelCopy: novelCopy.name,
      promotionNovelInfo: promotionNovelInfo.name,
      bookList: [],
      Chinese: promotionNovel.Chinese,
      subTitle: [
        {
          label: "全部",
          value: 0
        },
        {
          label: "男频",
          value: 1
        },
        {
          label: "女频",
          value: 2
        }
      ],
      categories: [], //分类集合
      categoriesV: [], //选择的分类
      searchV: "",
      meta: {},
      activeTitle: 0,
      /**  
 * 关于排序
 *      非默认(artificial)  0b001 | 1   默认(natural) 0b000
 *      升序(asc)           0b010 | 2   降序(desc)    0b000
 *      点击(click)         0b100 | 4   字数(count)   0b000
 * 
 *      默认        0b000   | 0  
 *      字数降序    0b001   | 1 
 *      字数升序    0b011   | 3 
 *      点击降序    0b101   | 5
 *      点击升序    0b111   | 7 
 */
      sort: 0,
      artificial: 0b001,
      asc: 0b010,
      desc: 0,
      click: 0b100,
      count: 0,
      natural: 0
    };
  },
  methods: {
    searchNovel() {
      if (this.searchV || this.searchV !== this.$route.query.search) {
        this.reload({ key: this.searchV });
      }
    },
    sortNovel(key) {
      /**
       * @param {key: 'natural'(默认) ， 'count'(字数) , 'clic'(点击)}
       */
      const oSort = this.sort.toString(2);
      const isNatural = !this.sort;
      const isCount = !isNatural && !(this.sort & this.click);
      const isClick = !isCount;
      const isAsc = !isNatural && this.sort & this.asc;
      const isDesc = !isAsc;
      let sort = null;
      if (key === "natural") {
        if (isNatural) return;
        else sort = this.natural;
      } else if (key === "click") {
        if (isClick) {
          sort = this.click + (isAsc ? this.desc : this.asc) + this.artificial;
        } else {
          sort = this.click + this.desc + this.artificial;
        }
      } else if (key === "count") {
        if (isCount) {
          sort = this.count + (isAsc ? this.desc : this.asc) + this.artificial;
        } else {
          sort = this.count + this.desc + this.artificial;
        }
      }

      this.reload({ sort });
    },
    handleCurrentChange(page) {
      if (page !== this.meta.current_page) {
        this.reload({ page });
      }
    },
    changeCategory() {
      const category = this.categoriesV[this.categoriesV.length - 1];
      if (category !== +this.activeTitle) this.reload({ category });
    },
    changeTitle(category) {
      if (category !== +this.activeTitle) this.reload({ category });
    },
    reload(params) {
      /* 
        搜索条件发生改变
        query:{
          category,     //分类
          page,         //页数
          sort,         //默认
          key           //关键字
        }
      */
      const condition = {};
      const query = this.$route.query;

      //关键字和分类的处理
      if ("category" in params) {
        if (params.category) condition.category = params.category;
      } else if ("key" in params) {
        if (params.key) condition.key = params.key;
      } else if (query.key) {
        condition.key = params.key;
      } else if (query.category) {
        condition.category = params.category;
      }
      //排序处理
      if ("sort" in params) {
        if (params.sort) condition.sort = params.sort;
      } else if (query.sort) {
        condition.sort = query.sort;
      }
      //页数处理
      if ("page" in params) {
        if (params.page === 0 || params.page === 1)
          condition.page = params.page;
      } else if (query.page) {
        condition.page = query.page;
      }
      this.$router.replace({
        name: promotionNovel.name,
        query: condition
      });
    }
  },
  async beforeRouteUpdate(to, form, next) {
    const bookList = await getBookList(parseRoute(to));
    enterRoute(this, to, bookList);
    next();
  },
  async mounted() {
    let loadingInstance = this.$loading({
      target: this.$refs.table
    });
    const [categories, bookList] = await Promise.all([
      getBookCategories(),
      getBookList(parseRoute(this.$route))
    ]);
    this.categories = categories;
    enterRoute(this, this.$route, bookList);
    loadingInstance.close();
  }
};
</script>

<style lang="scss" scoped>
@import "../../base/mixin.scss";

div.sort {
  display: inline;
  margin: 0 5px;
  cursor: pointer;
  user-select: none;
}

.search {
  width: 180px;
  position: absolute;
  right: 26px;
  top: 7px;
}

.active {
  color: $blue1;
}

.green {
  color: #32dc86;
}

.novel-list {
  padding: 26px;
  background-color: #fff;
}

.novel-list-row {
  @include flex;
  padding: 16px;
  color: #999;
  &:hover {
    background-color: $theme !important;
  }
  & > div {
    flex: 1;
  }
  &:nth-child(2n-1) {
    background-color: #f7f7f7;
  }
  .col-1 {
    margin-right: 40px;
    .cover {
      float: left;
      height: 92px;
      width: 69px;
      img {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
    .content {
      float: left;
      margin-left: 16px;
      width: calc(100% - 16px - 69px);
      .name {
        color: $blue1;
        font-size: 14px;
      }
      .first {
        height: 24px;
        line-height: 24px;
      }
      .sec {
        @include flex;
        max-width: 400px;
        margin: 0.8em 0 0.8em;
      }
      .third {
        @include multiLine(2);
        height: 38px;
      }
    }
  }
  .col-2 {
    height: 92px;
    max-width: 48%;
    @include flex;
    .sec {
      height: 92px;
      @include flex($direction: column);
      flex: 1;
      margin-right: 20px;
    }
    .copy-title {
      color: #333;
      font-weight: bold;
      font-size: 14px;
      word-wrap: break-word;
    }
    p {
      width: 100%;
    }
    .cover {
      height: 92px;
      width: 190px;
      img {
        display: block;
        height: 100%;
      }
    }
  }
}
</style>

<style lang="scss">
.promotion-novel .el-cascader__label {
  line-height: 49px;
}
</style>
