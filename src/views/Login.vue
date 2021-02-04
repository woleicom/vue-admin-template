<template>
  <a-layout class='login animated fadeIn'>
    <div class="model">
      <div class="login-form">
        <h3>后台管理系统</h3>
        <a-divider />
        <a-form
          :model='formModel'
          @finish='handleSubmitFinish'
          @finishFailed='handleSubmitFinishFailed'
        >
          <a-form-item
            name='username'
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <a-input v-model:value="formModel.username" placeholder='用户名'>
              <template v-slot:prefix>
                <user-outlined />
              </template> 
            </a-input>
          </a-form-item>
          <a-form-item
            name='password'
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <a-input-password v-model:value="formModel.password" placeholder="密码">
              <template v-slot:prefix>
                <lock-outlined />
              </template> 
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button 
              type='primary' 
              htmlType='submit' 
              class='login-form-button' 
              :loading='loading'>
                登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </a-layout>
</template>
<style lang="less">
@import '../style/views/login.less';
</style>
<script>
import store from '../store';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import {sendLogin} from '../api/login';
import {$iscode} from '../utils/app';
export default {
  name: 'Login',
  components: {
    UserOutlined,
    LockOutlined
  },
  data() {
    return {
      loading: false,
      formModel: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    setUserToken(token) {
      store.setUserToken(token);
    },
    async handleSubmitFinish() {
      this.loading = true;
      try{
        let res = await sendLogin({
          username: this.formModel.username,
          password: this.formModel.password,
        });
        this.loading = false;
        if($iscode(res,true)){
          localStorage.setItem('token', res.data.token);
          this.setUserToken(res.data.token);
          this.$router.push('/');
        };
      }catch(e){
        this.loading = false;
      };
    },
    handleSubmitFinishFailed(errorInfo){
      console.log('Failed:', errorInfo);
    }
  }
}
</script>