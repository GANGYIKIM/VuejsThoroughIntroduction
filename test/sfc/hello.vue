<template>
    <div>
        <p class="message"> msg : {{ msg }}</p>
        <p :class="$style.greetingMessage">안뇽</p>
    </div>
</template>

<script>
    export default {
        data() {
            return  { msg: '안녕!' }
        },
        created(){
            console.log(this.$style)
        }
    }
</script>

<style module>
    .message {
        color: pink;    
    }
    .greetingMessage {
        color: red
    }
</style>