<template>
	<div class="keyword-reply">
		<div class="container">
			<template>
				<div class="reply-text">
					<p>暂无法使用微信菜单编辑功能。</p>
					<p>授权绑定微信账号，开启赚钱快车道。<a>立即授权</a></p>
				</div>
			</template>
			<template>
				<span class="text-blue">已启用规则</span>
				<div class="rule-box">
					<div class="rule-content">
						<div class="rule-item">
							<div class="label">规则名称</div>
							<div class="content">这里是规则名称</div>
						</div>
						<div class="rule-item">
							<div class="label">关键词</div>
							<div class="content">
								<span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span>
							</div>
						</div>
						<div class="rule-item">
							<div class="label">回复</div>
							<div class="content">这里是回复内容</div>
						</div>
					</div>
					<div class="btn">
						<a class="blue">编辑</a>
						<a class="red">删除</a>
					</div>
				</div>
				<div class="rule-box">
					<div class="rule-content">
						<div class="rule-item">
							<div class="label">规则名称</div>
							<div class="content">这里是规则名称</div>
						</div>
						<div class="rule-item">
							<div class="label">关键词</div>
							<div class="content">
								<span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span>
							</div>
						</div>
						<div class="rule-item">
							<div class="label">回复</div>
							<div class="content">这里是回复内容</div>
						</div>
					</div>
					<div class="btn">
						<a class="blue">编辑</a>
						<a class="red">删除</a>
					</div>
				</div>
				<div class="rule-box">
					<div class="rule-content">
						<div class="rule-item">
							<div class="label">规则名称</div>
							<div class="content">这里是规则名称</div>
						</div>
						<div class="rule-item">
							<div class="label">关键词</div>
							<div class="content">
								<span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span>
							</div>
						</div>
						<div class="rule-item">
							<div class="label">回复</div>
							<div class="content">这里是回复内容</div>
						</div>
					</div>
					<div class="btn">
						<a class="blue">编辑</a>
						<a class="red">删除</a>
					</div>
				</div>
				<div class="pagination" v-if="meta.last_page">
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="10" :total="100" layout="prev, pager, next, jumper">
		      		</el-pagination>
		      	</div>
			</template>
		</div>
		<x-sub-title :item="['官方推荐模板']" style="background-color: #fff"></x-sub-title>
		<div class="container">
			<div class="title-text">
				点击对应位置既可以复制内容
			</div>
			<div class="rule-box">
				<div class="rule-content">
					<div class="rule-item">
						<div class="label">规则名称</div>
						<div class="content">这里是规则名称</div>
					</div>
					<div class="rule-item">
						<div class="label">关键词</div>
						<div class="content">
							<span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span>
						</div>
					</div>
					<div class="rule-item">
						<div class="label">回复</div>
						<div class="content">这里是回复内容</div>
					</div>
				</div>
				<div class="btn">
					<a class="green">添加</a>
				</div>
			</div>
			<div class="rule-box">
				<div class="rule-content">
					<div class="rule-item">
						<div class="label">规则名称</div>
						<div class="content">这里是规则名称</div>
					</div>
					<div class="rule-item">
						<div class="label">关键词</div>
						<div class="content">
							<span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span>
						</div>
					</div>
					<div class="rule-item">
						<div class="label">回复</div>
						<div class="content">这里是回复内容</div>
					</div>
				</div>
				<div class="btn">
					<a class="grey">已添加</a>
				</div>
			</div>
			<div class="rule-box">
				<div class="rule-content">
					<div class="rule-item">
						<div class="label">规则名称</div>
						<div class="content">这里是规则名称</div>
					</div>
					<div class="rule-item">
						<div class="label">关键词</div>
						<div class="content">
							<span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span><span>关键词1</span>
						</div>
					</div>
					<div class="rule-item">
						<div class="label">回复</div>
						<div class="content">这里是回复内容</div>
					</div>
				</div>
				<div class="btn">
					<a class="green">添加</a>
				</div>
			</div>
			<div class="button">
				<button>保存新添加规则(已选5条)</button>
			</div>
			<div class="pagination"  v-if="meta.last_page">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="10" :total="100" layout="prev, pager, next, jumper">
	      		</el-pagination>
	      	</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'keyword-reply',
		data(){
			return {
				page: 1
			}
		},
		methods:{
			handleCurrentChange(val){}
		}
	}
</script>
<style lang="scss" scoped>
	@import '../style/common.scss';
	@import '../style/variable.scss';
	.keyword-reply{
		.reply-text{
			p{
				color: #999;
				line-height: 30px;
				a{
					color: $blue;
				}
			}
		}
		.container{
			position: relative;
			.title-text{
				position: absolute;
				color: #999;
				right: 25px;
				top: -35px;
			}
			.text-blue{
				display: inline-block;
				color: $blue;
				margin-bottom: 20px;
			}
			.rule-box{
				overflow: hidden;
				padding: 20px;
				&:nth-child(2n-1){
					background-color: #f7f7f7;
				}
				.rule-content{
					float: left;
					width: 90%;
					.rule-item{
						width: 90%;
						float: left;
						line-height: 35px;
						&:nth-child(2){
							margin-top: 10px;
						}
						.label{
							float: left;
							width: 20%;
						}
						.content{
							float: left;
							width: 80%;
							color: #999;
							span{
								display: inline-block;
								line-height: 30px;
								padding: 0 20px;
								margin-right: 15px;
								margin-bottom: 10px;
								font-size: 12px;
								background-color: #ededed;
								border-radius: 2px;
							}
						}
					}
				}
				.btn{
					float: left;
					width: 10%;
					a{
						display: block;
						width: 100%;
						text-align: center;
						line-height: 35px;
						margin-top: 15px;
						color: #fff;
						background-color: red;
						border-radius: 2px;
					}
					.blue{
						background-color: $blue;
					}
					.red{
						background-color: $red;
					}
					.green{
						background-color: $green;
					}
					.grey{
						background-color: #666;
					}
				}
			}
			.button{
				margin-top: 10px;
				text-align: right;
			}
			.pagination{
				text-align: right;
			}
		}
	}
</style>