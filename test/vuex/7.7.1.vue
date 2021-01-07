<template>
<div>
  <p>{{count}}</p>
  <button v-on:click="increment(1)">+1</button>
</div>
</template>

<script>
export default {
  computed: {
    count: function(){
      return this.$store.state.count
    }
  },
  methods: {
    increment(value) {
      this.$store.commit('increment', value)
    }
  }
}
</script>

<script>
import {mapState, mapMutations} from 'vuex'

export default { 
  // mapState에 배열을 인자로 전달
  // 전달한 이름 그대로 컴포넌트와 연결
  // $store.state.count 와 this.count 연결
  computed: mapState([ 
    'count',
  ]),

  // mapState에 객첼를 인자로 전달
  // 연결한 이름으로 컴포넌트와 연결
  // $store.state.count 를 this.count 연결
  computed: mapState({
    value: 'count'
  }),

  // this.increment(value) 에서 $store.commit('increment', value) 호출
  methods: mapMutations([
    'increment'
  ]),
}
</script>

<script>
import {mapState} from 'vuex'

export default { 
  computed: {
    double() {
      return this.count * 2
    },
    ...mapState([
      'count'
    ])
  }
}
</script>
