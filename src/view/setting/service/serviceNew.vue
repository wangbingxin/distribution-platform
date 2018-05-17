<template>
	<div>
		<div class="add-server">
			<div class="content-head">认证服务号授权</div>
			<dl class="content-body add-server-explain">
				<dt>
					<p class="red">暂仅支持认证服务号，授权时，请勾选所有权限（如右图）</p>
					<p>授权须知：</p>
					<p>1.授权成功后，阅读云将自动完成自定义菜单，自动回复等相关配置。</p>
					<p>2.若你已授权给其他第三方，或正在使用多客服功能、开发者模式，本次授权后，阅读云将会自动覆盖原有配置。</p>
					<p>3. 非认证服务号，扔想参与，或不想相关已有的认证号，建议新申请一个认证服务号用于推小说业务，或不配做该项。</p>
				</dt>
				<dd><img src="../../../assets/authorization.png"></dd>
			</dl>
			<a :href="href" target="_bank">
				<el-button type="primary">开始授权</el-button>
			</a>
		</div>
	</div>
</template>

<script>
import { authOfficialAccounts } from '../../../api'
import {
  settingService,
  serviceNew,
  serviceList,
  serviceOption
} from "../../../namespace";

export default {
	name: serviceNew.name,
	data() {
		return {
			href: '###'
		}
	},
	methods: {
		
	},
	created(){
		authOfficialAccounts().then(r => {
			this.href = r.url
		})
	}
}
</script>

<style lang="scss" scoped>
@import '../../../base/mixin.scss';
.add-server, {
	background: #fff;
	padding: 26px;
	margin-bottom: 26px;
}

.add-server .el-button {
	margin-left: 300px;
	padding-left: 100px;
	padding-right: 100px;
}

.content-head {
	line-height: 50px;
	font-size: 14px;
	border-bottom: 1px solid #f7f7f7;
}

.content-body {
	border-bottom: 1px solid #f7f7f7;
	padding: 26px;
	margin-bottom: 26px;
}

.add-server-explain {
	@include flex($space: flex-start);
	dt {
		height: 450px;
		width: 400px;
		box-sizing: border-box;
		font-size: 13px;
		p {
			margin: 20px 0;
			line-height: 2em;
		}
	}

	dd {
		height: 450px;
		padding-left: 10px;
		img {
			height: 450px;
		}
	}
}





</style>