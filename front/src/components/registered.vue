<template xmlns:v-hammer="http://www.w3.org/1999/xhtml">
  <div class="login">
    <img src="../assets/logo.png" alt="LOGO" class="logo">
    <div class="login-box">
      <h4 @click="$refs.user.$el.children[0].focus()">用户名</h4>
      <ve-plain-input ref="user" @focus="getInputFocusScrollY" @blur="setWindowScrollY" v-model.trim="data.username" message="请输入正确的用户名，只能是数字或者字母组合" type="reg" inspect="^[0-9a-zA-Z]{2,6}$" class="input" :errorOptions="{position: 'absolute'}"></ve-plain-input>
      <h4 @click="$refs.password.$el.children[0].focus()" style="padding-top: 6px">密码</h4>
      <ve-plain-input ref="password" @focus="getInputFocusScrollY" @blur="setWindowScrollY" v-model.trim="data.password" message="请输入正确的密码" :options="{min: 6, max: 12}" class="input password" :errorOptions="{position: 'absolute'}" typeInput="password"></ve-plain-input>
      <h4 @click="$refs.checkpass.$el.children[0].focus()" style="padding-top: 6px">确认密码</h4>
      <form @submit.prevent="formSubmit" action="javascript:return true">
        <ve-plain-input name="done" ref="checkpass" @keyup.enter.native="registered" @focus="getInputFocusScrollY" v-model.trim="data.checkPassword" message="两次密码输入不一致" class="input password" :errorOptions="{position: 'absolute'}" typeInput="password" @blur="handleBlur"></ve-plain-input>
      </form>
      <div class="login-control">
        <span v-hammer:tap="login">已有账号？直接登录</span>
        <ve-button class="primary" @click="registered">注册</ve-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'utils/axios'
  export default {
    name: 'registered',
    components: {
    },
    data() {
      return {
        data: {
          avatar: 'avatar-' + Math.floor(Math.random() * 8 + 1) + '.png'
        }
      }
    },
    methods: {
      formSubmit() {
        return false;
      },
      async registered() {
        this.$refs.user.mergeMesh('blur');
        this.$refs.password.mergeMesh('blur');
        this.handleBlur();
        if (!this.$refs.user.error && !this.$refs.password.error) {
          const data = await axios.get.call(this, '/hotel/register', this.data);
          if (!data.r) {
            //this.$msg({type: 'success', message: data.e, duration: 2000,});
            this.$router.push('login')
          } else {
            //this.$msg({type: 'error', message: data.e, duration: 4000,});
          }
        }
      },
      handleBlur(ev) {
        this.setWindowScrollY();
        this.$refs.checkpass.error = this.data.checkPassword !== this.data.password;
        if (!this.data.checkPassword) {
          this.$refs.checkpass.error = true;
        }
      },
      login() {
        this.$router.push('login')
      }
    },
    activated() {
      this.data = {};
      this.$refs.checkpass.error = false;
      this.$refs.user.error = false;
      this.$refs.password.error = false;
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/global";
  @keyframes bounceInLeft {
    0% {left: -100%}
    100% {left: 0}
  }
  .login {
    padding-bottom: 36px;
    position: relative;
    animation: bounceInLeft .3s ease-out forwards;
    .logo {
      display: block;
      margin: calc(6.625rem - @topIndicator) auto 0;
      width: 8.75rem;
    }
    .login-box {
      padding: 0 2.25rem;
      margin: 7.875rem auto 0;
      h4 {
        font-size: 1rem;
        font-weight: 400;
      }
      .input {
        margin-top: 14px;
      }
    }
    .login-control {
      margin-top: 30px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      span {
        font-size: 14px;
        color: #25A3A8;
        margin-right: 20px;
        margin-top: 18px;
        display: inline-block;
        height: 36px;
        line-height: 56px;
      }
    }
  }
</style>
