const store = {
  state: {
    count: 0
  },
  increment() {
    this.state.count += 1
  }
}

new Vue({
  template: `
  <div>
    <p>{{ count }}</p>
    <button :click="increment">+</button>
  </div>
  `,
  data: store.state,
  methods: {
    increment(){
      store.increment();
    }
  }
})