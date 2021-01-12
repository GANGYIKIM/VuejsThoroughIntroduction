<template>
  <form novalidate>
    <div class="form-item">
      <label for="email">이메일 주소</label>
      <input
        id="email"
        v-model="email"
        type="text"
        autocomplete="off"
        placeholder="ex: kanban@domain.com"
        @focus="resetError"
      >
      <ul class="validation-errors">
        <li v-if="!validation.email.format">이메일 주소 형식에 어긋납니다</li>
        <li v-if="!validation.email.required">이메일 주소가 입력되지 않았습니다</li>
      </ul>
    </div>
    <div class="form-item">
      <label for="password">패스워드</label>
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="off"
        @focus="resetError"
      >
      <ul class="validation-errors">
        <li v-if="!validation.password.required">패스워드가 입력되지 않았습니다</li>
      </ul>
    </div>
    <div class="form-actions">
      <kbnButton
        :disabled="disableLoginAction"
        @click="handleClick"
      >로그인</kbnButton>
      <p
        v-if="progress"
        class="login-progress"
      >로그인 중</p>
      <p
        v-if="error"
        class="login-error"
      >로그인 중</p>
    </div>
  </form>
</template>

<script>
import kbnButton from '@/components/atoms/KbnButton'
// 이메일 주소 형식 정규표현식
const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const required = val => !val.trim()

export default {
  name: 'KbnLoginForm',
  components: {
    kbnButton
  },
  props: {
    onLogin: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      email: '',
      password: '',
      progress: false,
      error: ''
    }
  },
  computed: {
    validation () {
      return {
        email: {
          required: required(this.email),
          format: REGEX_EMAIL.test(this.email)
        },
        password: {
          required: required(this.password)
        }
      }
    },
    valid () {
      const validation = this.validation
      const fields = Object.keys(validation)
      let valid = true
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        valid = Object.keys(validation[field]).every(key => validation[field][key])
        if (!valid) {
          break
        }
      }
      return valid
    },
    disableLoginAction () {
      return !this.valid || this.progress
    }
  },
  methods: {
    resetError () {
      this.error = ''
    },
    handleClick (event) {
      if (this.disableLoginAction) return
      this.progress = true // 로그인 처리 중임을 나타내는 플래그
      this.error = ''

      this.$nextTick(() => {
        this.onLogin({
          email: this.email,
          password: this.password
        })
          .catch(err => {
            this.error = err.message
          })
          .then(() => {
            this.progress = false
          })
      })
    }
  }
}
</script>

<style scoped>
  form {
    display: block;
    margin: 0 auto;
    text-align: left;
  }
  label {
    display: block;
  }
  input {
    width: 100%;
    padding: .5em;
    font: inherit
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0.25em 0;
  }
  ul li {
    font-size: 0.5em;
  }
  .validation-errors {
    height: 32px;
  }
  .form-actions p {
    font-size: 0.5em;
  }
</style>
