<template>
	<div class="register">
		<x-sub-title :item="['用户注册']" style="background-color: #fff"></x-sub-title>
		<div class="container">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px" style="width:400px">
		    	<el-form-item label="手机号" prop="phone">
			        <el-input v-model="form.phone" @blur="checkPhone"></el-input>
			    </el-form-item>
			    <el-form-item label="验证码" prop="code">
			        <el-input v-model="form.code" style="width:160px"></el-input>
			        <template v-if="!isSend">
			        	<el-button type="success" @click="sendCode">发送验证码</el-button>
			        </template>
			        <template v-else>
			        	<span class="tip">{{time}}s后请重新发送验证码</span>
			        </template>
			    </el-form-item>
			    <el-form-item label="密码" prop="password">
			        <el-input type="password" v-model="form.password" placeholder="输入6-20个字符"></el-input>
			    </el-form-item>
			    <el-form-item label="确认密码" prop="repassword">
			        <el-input type="password" v-model="form.repassword" placeholder="输入6-20个字符"></el-input>
			    </el-form-item>
			    <el-form-item label="">
			        <el-button type="info" @click="userRegister">立即注册</el-button>
			    </el-form-item>
		    </el-form>
		</div>
	</div>
</template>
<script>
	import { checkPhone, sendCode, userRegister } from './api'
	export default{
		data(){
			var checkPhone=(rule,value,callback)=>{
				var reg=/^1[0-9]{10}$/
				if(!reg.test(value)){
					callback(new Error('手机号格式不正确'))
				}
				callback()
			}
			var checkPassword=(rule,value,callback)=>{
				//var reg=/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*/,.;:'"-+=><\\|])[\da-zA-Z~!@#$%^&*/,.;:'"-+=><\\|}]{6,20}$/
				var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
				if(!reg.test(value)){
					callback(new Error('密码需包含数字和字母'))
				}
				callback()
			}
			var checkRepassword=(rule,value,callback)=>{
				if(this.form.password!==value){
					callback(new Error('两次密码不一致'))
				}
				callback()
			}
			return {
				form:{},
				rules:{
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ validator: checkPhone, trigger: 'blur' }
					],
					code: [
						{ required: true, message: '请输入验证码', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ validator: checkPassword, trigger: 'blur' }
					],
					repassword: [
						{ required: true, message: '请确认密码', trigger: 'blur' },
						{ validator: checkRepassword, trigger: 'blur' }
					]
				},
				isSend:false,
				time:300
			}
		},
		methods:{
			checkPhone(e){
				this.$refs['form'].validateField('phone',(valid)=>{
					if(!valid){
						checkPhone({
							phone: e.target.value
						}).then(res=>{
							if(res.code === 405){
								this.$message({
									type: 'warning',
									message: '该手机号已注册'
								})
							}
						})
					}
				})
			},
			sendCode(){
				this.$refs['form'].validateField('phone',(valid)=>{
					if(!valid){
						sendCode({
							phone: this.form.phone
						}).then(res=>{
							if(res.code === 200){
								this.isSend=true
								this.timeKill()
							}
						})
					}
				})
			},
			userRegister(){
				this.$refs['form'].validate((valid)=>{
					if(valid){
						userRegister(this.form).then(res=>{
							if(res.code === 200){
								this.$router.push('/login')
							}else if(res.code === 201){
								this.$message({
									type: 'warning',
									message: '注册失败'
								})
							}else if(res.code === 403){
								this.$message({
									type: 'warning',
									message: '参数错误'
								})
							}else if(res.code === 404){
								this.$message({
									type: 'warning',
									message: '该手机号已存在'
								})
							}else if(res.code === 405){
								this.$message({
									type: 'warning',
									message: '验证码错误'
								})
							}	
						})
					}
				})	
			},
			timeKill(){
				var timer=setInterval(()=>{
					this.time--
					if(this.time===0){
						this.isSend=false
						this.time=300
						clearInterval(timer)
					}
				},1000)
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './style/variable.scss';
	@import './style/common.scss';
	.register{
		.tip{
			font-size: 12px;
			color: #999;
		}
	}
</style>