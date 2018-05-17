<template>
  <div class="x-table" data-template="x-table">
    <table :style="{'text-align': align}">
      <colgroup>
        <col v-for="(val,i) in column" :key="i" :width="val.width">
      </colgroup>
      <thead>
        <tr class="x-table-head-row">
          <th v-for="(col,i) in column" :key="col.prop+i" :class="'x-table-head-col-'+i">
            <div class="cell">{{col.label}}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row,index) in data" :key="'x-table-body-row-'+index" :class="[`x-table-body-row-${index}`,{odd: stripe && !(index%2),even: stripe && (index%2)}]">
          <td v-for="(col,i) in column" :class="'x-table-body-col-'+i" :key="'x-table-body-col-'+i">
            <cell :class="col.className" :row="index+1" :col="i+1" :cell="row[col.prop]" :rowData="row" :slotColC="$scopedSlots[`col-${i+1}`]"
              :slotColN="$slots[`col-${i+1}`]" :slotCellC="$scopedSlots[`row-${index+1}-col-${i+1}`]" :slotCellN="$slots[`row-${index+1}-col-${i+1}`]">
            </cell>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!data.length" class="none-data">
      <img src="../../assets/no_info.png">
    </div>
  </div>
</template>
<script>
/**
 *  column
 *    [{
 *      width,label,prop
 *    }]
 *
 */
import "./table.scss";
import cell from "./table-cell";
function isStr(val) {
  return typeof val === "string";
}
export default {
  name: "x-table",
  components: {
    cell
  },
  props: {
    data: {
      required: true,
      type: Array
    },
    column: {
      required: true,
      validator(value) {
        if (!Array.isArray(value) || !value.length) return false;
        for (let i = 0, len = value.length; i > len; i++) {
          if (
            !isStr(value[i].label) ||
            !isStr(value[i].prop) ||
            (value[i].width && !isStr(value[i].width))
          ) {
            return false;
          }
        }
        return true;
      }
    },
    stripe: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default() {
        return "left";
      }
    }
  },
  data() {
    return {};
  },
  install(Vue, options) {
    Vue.component(this.name, this);
  }
};
</script>
