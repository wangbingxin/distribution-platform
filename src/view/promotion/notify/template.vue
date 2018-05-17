<template>
  <div class="notify-template">
    <div class="template-title">{{name}}</div>
    <div class="template-content">
      <div v-for="(row,rowIndex) in content" :key="rowIndex">
        <span v-for="(cell,cellIndex) in row" :key="cellIndex" :class="{modifiable: cell.modifiable}" :style="{color: cell.color}" @click="changeDialog(cell.modifiable,rowIndex,cellIndex)">{{cell.value}}</span>
      </div>
    </div>
    <el-dialog :visible.sync="dialog" title="编辑模板消息内容">
      <input class="el-input__inner" v-model="input" placeholder="请输入文案内容" :style="{color}"></input>
      <div class="tip">
        <p>可使用
          <span class="blue" @click="addValue('{fans.nickname}')">{fans.nickname}</span> 占位符, 发送时会被替换成用户昵称</p>
        <p>可使用
          <span class="blue" @click="addValue('{fans.id}')">{fans.id}</span> 占位符, 发送时会被替换成用户数字ID</p>
        <p>可使用
          <span class="blue" @click="addValue('{fans.vipendtime}')">{fans.vipendtime}</span> 占位符, 发送时会被替换成用户年费到期时间</p>
        <p>可使用
          <span class="blue" @click="addValue('{account.nickname}')">{account.nickname}</span> 占位符, 发送时会被替换成推送消息的服务号名称</p>
      </div>
      <dl class="color-list">
        <dt class="color-title">文案颜色</dt>
        <dd class="color-item" @click="changeColor(colorBlock)" v-for="colorBlock in colorList" :key="colorBlock" :style="{'background-color': colorBlock}">{{colorBlock === color ? '√' : ''}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeDialog(false)">取 消</el-button>
        <el-button type="primary" @click="modify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const color = ['rgb(0, 0, 0)', 'rgb(255, 0, 0)', 'rgb(255, 148, 0)', 'rgb(0, 153, 255)', 'rgb(255, 51, 153)', 'rgb(153, 153, 153)']

export default {
  name: 'notify-temlate',
  props: ['content', 'name'],
  data() {
    return {
      dialog: false,
      index: {
        row: 1,
        col: 1,
      },
      colorList: color,
      color: color[0],
      input: '',
    }
  },
  methods: {
    changeDialog(flag, row, col) {
      this.dialog = flag
      if (!flag) return
      else {
        this.color = this.colorList[0] 
        this.input = ''       
        this.index.row = row
        this.index.col = col
      }
    },
    modify() {
      this.changeDialog(false)
      this.$emit('update-content',{
        value: this.input,
        color: this.color,
        row: this.index.row,
        col: this.index.col
      })
    },
    changeColor(color){
      this.color = color
    },
    addValue(value){
      this.input += value
    }
  }
}
</script>

<style>
.notify-template .el-dialog {
  width: 500px;
}
</style>


<style lang="scss" scoped>
@import '../../../base/variable.scss';
.notify-template {
  background-color: #f7f7f7;
  padding: 16px;
}

.template-content {
  font-size: 12px;
}

.modifiable {
  color: #666;
  &::before {
    content: '';
    background: url(../../../assets/修改.png) no-repeat center / 100% auto;
    display: inline-block;
    height: 1em;
    width: 1em;
    margin-right: .3em;
  }
}

.tip {
  padding: 16px 0;
  color: #666;
  line-height: 1.5em;
  font-size: 12px;
  .blue {
    color: $blue1;
    cursor: pointer;
  }
}

.color-item {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  overflow: hidden;
  line-height: 24px;
  text-align: center;
  color: #fff;
}
</style>