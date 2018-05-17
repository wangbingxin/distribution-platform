<template>
	<div class="reply-setting">
		<div class="title">回复设置</div>
		<x-sub-title :item="tabTitle" @change-item="changeTextItem" style="background-color: #fff"></x-sub-title>
		<div class="title-text"><span><a href="">点击阅读</a>微信菜单推广技巧</span></div>
		<component :is="currentView" keep-alive></component>
	</div>
</template>
<script>
	import AddAutoReply from './AddAutoReply.vue'
	import MsgAutoReply from './MsgAutoReply.vue'
	import KeywordAutoReply from './KeywordAutoReply.vue'
	export default{
		name: 'reply-setting',
		data(){
			return {
				tabTitle:['被添加自动回复','消息自动回复','关键词自动回复'],
				currentView:'1'
			}
		},
		watch:{
	      '$route.query.tab':'currentTab'
	    },
	    components:{
	      '1': AddAutoReply,
	      '2': MsgAutoReply,
	      '3': KeywordAutoReply
	    },
	    mounted(){
	    	this.currentTab()
	    },
		methods:{
			changeTextItem(val){
				this.$router.push({
		          query:{
		            tab:val
		          }
		        })
			},
			currentTab(){
				this.currentView=this.$route.query.tab?this.$route.query.tab+''+'':'1'
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../style/variable.scss';
	.title-text{
		position: relative;
		span{
			position: absolute;
			right: 25px;
			top: -35px;
			a{
				color: $blue;
			}
		}
	}
</style>