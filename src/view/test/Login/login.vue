<template>
	<div class="register">
		<x-sub-title :item="['用户登录']" style="background-color: #fff"></x-sub-title>
		<div class="container">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px" style="width:400px">
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="form.phone"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="form.password" placeholder="输入6-20个字符"></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-button type="info" @click="userLogin">立即登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { userLogin } from './api'
export default {
	data() {
		var checkPhone = (rule, value, callback) => {
			var reg = /^1[0-9]{10}$/
			if (!reg.test(value)) {
				callback(new Error('手机号格式不正确'))
			}
			callback()
		}
		var checkPassword = (rule, value, callback) => {
			var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
			if (!reg.test(value)) {
				callback(new Error('密码需包含数字和字母'))
			}
			callback()
		}
		return {
			form: {},
			rules: {
				phone: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
					{ validator: checkPhone, trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ validator: checkPassword, trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		userLogin() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					userLogin(this.form).then(res => {
						if (res.code === 200) {
							this.$router.push('/')
						} else if (res.code === 201) {
							this.$message({
								type: 'warning',
								message: '账号或密码错误'
							})
						} else if (res.code === 202) {
							this.$message({
								type: 'warning',
								message: '该账号已被禁止'
							})
						} else if (res.code === 403) {
							this.$message({
								type: 'warning',
								message: '参数错误'
							})
						} else if (res.code === 404) {
							this.$message({
								type: 'warning',
								message: '该账号不存在'
							})
						}
					})
				}
			})
		}
	}
}
</script>
<style lang="scss" scoped>
	@import './style/variable.scss';
	@import './style/common.scss';
</style>