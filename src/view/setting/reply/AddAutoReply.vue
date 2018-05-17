<template>
	<div class="add-auto-reply">
		<div class="container">
			<template>
				<div class="reply-text">
					<p>暂无法使用微信菜单编辑功能。</p>
					<p>授权绑定微信账号，开启赚钱快车道。<a>立即授权</a></p>
				</div>
			</template>
			<template>
				<div class="reply-box">
					<div class="reply-content" contenteditable="true">
						
					</div>
					<div class="btn">
						*目前暂只支持文字模式
						<button>保存并发表</button>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'add-auto-reply',
		data(){
			return{

			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../style/common.scss';
	@import '../style/variable.scss';
	.add-auto-reply{
		.reply-text{
			p{
				color: #999;
				line-height: 30px;
				a{
					color: $blue;
				}
			}
		}
		.reply-box{
			.reply-content{
				height: 200px;
				padding: 20px;
				color: #999;
				border: solid 1px #e5e5e5;
				outline: none;
			}
			.btn{
				color: $red;
				margin-top: 10px;
				height: 45px;
				button{
					float: right;
				}
			}
		}
	}
</style>