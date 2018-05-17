<template>
	<div class="menu-setting">
		<div class="title">菜单设置</div>
		<x-sub-title :item="['微信菜单']" style="background-color: #fff"></x-sub-title>
		<div class="container">
			<div class="menu-text">
				生成微信公众号的3*5菜单 <button>生成小说平台菜单</button>
				<span><a href="">点击阅读</a>微信菜单推广技巧</span>
			</div>
			<h1>菜单一</h1>
			<div class="menu-box">
				<div class="menu-item">
					<div class="label">一级菜单</div>
					<div class="name"><input type="text" placeholder="菜单名称（4-8个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址（有二级菜单不要输入地址）"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单1</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单2</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单3</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单4</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单5</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
			</div>
			<h1>菜单二</h1>
			<div class="menu-box">
				<div class="menu-item">
					<div class="label">一级菜单</div>
					<div class="name"><input type="text" placeholder="菜单名称（4-8个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址（有二级菜单不要输入地址）"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单1</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单2</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单3</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单4</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单5</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
			</div>
			<h1>菜单三</h1>
			<div class="menu-box">
				<div class="menu-item">
					<div class="label">一级菜单</div>
					<div class="name"><input type="text" placeholder="菜单名称（4-8个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址（有二级菜单不要输入地址）"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单1</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单2</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单3</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单4</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
				<div class="menu-item">
					<div class="label">二级菜单5</div>
					<div class="name"><input type="text" placeholder="菜单名称（8-16个字）"></div>
					<div class="url"><input type="text" placeholder="跳转地址"></div>
				</div>
			</div>
			<div class="menu-text" style="margin-top: 25px;">
				<button>保存并生成微信菜单</button>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'menu-setting',
		data(){
			return {
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../style/common.scss';
	@import '../style/variable.scss';
	.menu-setting{
		.container{
			.menu-text{
				height: 45px;
				line-height: 45px;
				position: relative;
				button{
					float: right;
					
				}
				span{
					position: absolute;
					top: -68px;
					right: 0;
					color: #999;
					a{
						color: $blue;
					}
				}
			}
			h1{
				color: $red;
				margin: 20px 0;
			}
			.menu-box{
				background-color: #f7f7f7;
				padding: 25px;
				.menu-item{
					height: 30px;
					margin-top: 25px;
					&:first-child{
						margin-top: 0;
					}
					.label{
						float: left;
						width: 10%;
						margin-right: 2%;
						line-height: 32px;
					}
					.name{
						float: left;
						width: 30%;
						margin-right: 2%;
					}
					.url{
						float: left;
						width: 56%;
					}
				}
			}
		}
	}
</style>