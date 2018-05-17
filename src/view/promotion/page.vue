<template>
  <div class="promotion-page">
    <div class="title">{{Chinese}}</div>
    <div class="promotion-page-content">
      <x-table :data="tableData" :column="tableColumn" stripe>
        <template slot="col-3" scope="scope">
          <a :href="scope.rowData.link" target="_black">
            <span>查看</span>
          </a>
          <span @click="handleDialog(scope.row)">获取推广链接</span>
        </template>
      </x-table>
    </div>
    <el-dialog class="dialog-1" title="生成推广链接" :visible.sync="dialog" custom-class="dialog-popup-page">
      <x-popup :name="checkedPage.name" :id="checkedPage.id" :status.sync="dialog"></x-popup>
    </el-dialog>
  </div>
</template>

<script>
import popup from "../../components/promotion-popup";
import { promotionPage } from "../../namespace";
import { getPromotionPages } from "../../api";
const tableColumn = [
  {
    width: "300",
    prop: "title",
    label: "页面"
  },
  {
    prop: "description",
    label: "优势"
  },
  {
    width: "300",
    prop: "operation",
    label: "操作"
  }
];
export default {
  name: promotionPage.name,
  components: { "x-popup": popup },
  data() {
    return {
      Chinese: promotionPage.Chinese,
      tableData: [],
      tableColumn,
      channel: "",
      dialog: false,
      checkedPage: {}
    };
  },
  methods: {
    handleDialog(i) {
      this.checkedPage.name = this.tableData[i - 1].title;
      this.checkedPage.id = this.tableData[i - 1].id;
      this.dialog = true;
    }
  },
  async created() {
    const promotionPages = await getPromotionPages();
    this.tableData = promotionPages;
  }
};
</script>

<style lang="scss" scoped>
@import "../../base/mixin.scss";

.promotion-page-content {
  padding: 26px;
  background-color: #fff;
}

.x-table-body-col-2 span {
  &:first-child {
    padding-right: 80px;
  }
  color: $blue1;
  cursor: pointer;
}
</style>