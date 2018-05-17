import bus from '../util/bus.js'
export default {
  mounted(){
    bus.$on('update:enable_withdrawal_amount',function(){
      
    })
  }
}