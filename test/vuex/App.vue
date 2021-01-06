<template>
<div>
  <h2>태스크 목록</h2>
  <ul>
    <li v-for="task in tasks" v-bind:key="task.id">
      <input type="checkbox" v-bind:checked="task.done" v-on:change="toggleTaskStatus(task)">
      {{task.name}} -
      <span v-for="id in task.labelIds" v-bind:key="id">
        {{getLabelText(id)}}
      </span>
    </li>
  </ul>
  <form v-on:submit.prevent="addTask">
    <input type="text" v-model="newTaskName" placeholder="new task">
  </form>

  <h2>레이블 목록</h2>
  <ul>
    <li v-for="label in labels" v-bind:key="label.id">
      <input type="checkbox" v-bind:value="label.id" v-model="newTaskLabelIds">
      {{ label.text }}
    </li>
  </ul>
  <form v-on:submit.prevent="addLabel">
    <input type="text" v-model="newLabelText" placeholder="new label">
  </form>

  <h2>레이블로 필터링된 목록</h2>
  <ul>
    <li v-for="label in labels" v-bind:key="label.id">
      <input type="radio" v-bind:checked="label.id === filter" v-on:change="changeFilter(label.id)" >
      {{ label.text }}
    </li>
    <li>
      <input type="radio" v-bind:checked="filter === null" v-on:change="changeFilter(null)" >
      필터링 없음
    </li>
  </ul>
  <form v-on:submit.prevent="addLabel">
    <input type="text" v-model="newLabelText" placeholder="new label">
  </form>

  <h2>저장 및 복원</h2>
  <button type="button" v-on:click="save">저장</button>
  <button type="button" v-on:click="restore">복원</button>
</div>
</template>

<script>
export default {
  data: function data(){
    return {
      // temp taskName
      newTaskName: '',

      // temp label linked new task
      newTaskLabelIds: [],

      //temp new label
      newLabelText: ''
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.filteredTasks // get task list
    },
    labels() {
      return this.$store.state.labels
    },
    filter() {
      return this.$store.state.filter
    }
  },
  methods: {
    addTask(){
      this.$store.commit('addTask', {
        name: this.newTaskName,
        labelIds: this.newTaskLabelIds
      })
      this.newTaskName = ''
      this.newTaskLabelIds = []
    },
    toggleTaskStatus(task) {
      this.$store.commit('toggleTaskStatus', {id: task.id})
    },
    addLabel() {
      this.$store.commit('addLabel', {text: this.newLabelText})
    },
    getLabelText(id) {
      const label = this.labels.filter(label => label.id === id)[0];
      return label ? label.text : '';
    },
    changeFilter(labelId) {
      this.$store.commit('changeFilter', {filter: labelId})
    },
    save() {
      this.$store.dispatch('save')
    },
    restore() {
      this.$store.dispatch('restore')
    }
  }
}
</script>