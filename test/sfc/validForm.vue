<template>
  <form novalidate>
    <p :class="alertValidation">{{ validMessage }}</p>
    <textarea v-on:input="onInput" :class="textboxValidation"></textarea>
  </form>
</template>

<script>
export default {
  data: function data() {
    return {
      valid: false
    }
  },
  computed: {
    validMessage() {
      return this.valid ? "입력된 내용이 있습니다" : "입력된 내용이 없습니다"
    },
    alertValidation() {
      return this.valid ? this.alert.success : this.alert.error
    },
    textboxValidation() {
      return this.valid ? this.textbox.success : this.textbox.error
    }
  },
  methods: {
    isRequired(value) {
      return value.length > 0
    },
    onInput(e) {
      this.valid = this.isRequired(e.target.value);
    }
  }
}
</script>

<style module="alert"> 
  .success { color: green }
  .error { font-weight: bold; color: red; }
</style>

<style module="textbox">
  .success { border: 1px solid green }
  .error { border: 1px solid red }
</style>