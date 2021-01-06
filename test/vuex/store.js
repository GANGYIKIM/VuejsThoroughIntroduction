import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // task default state
    tasks: [
      { id: 1, name: '우유 사기', labelIds: [1,2],done: false },
      { id: 2, name: 'vue.js 관련 책 사기', labelIds: [1,3], done: true }
    ],
    labels: [
      {id: 1, text: '쇼핑'},
      {id: 2, text: '음료'},
      {id: 3, text: '책'},
    ],
    // 다음으로 추가할 태스크, 레이블 ID
    // 실제 애플리케이션이라면 서버에서 생성하거나 UUID 사용
    nextTaskId: 3,
    nextLabelId: 4,
    filter: null
  },
  getters: {
    filteredTasks(state) {
      if(!state.filter) return state.tasks

      return state.tasks.filter(task => {
        return task.labelIds.indexOf(state.filter) >= 0
      })
    }
  },
  mutations: {
    addTask(state, {name, labelIds}){
      state.tasks.push({
        id: state.nextTaskId,
        name,
        labelIds,
        done: false
      })
      state.nextTaskId++
    },
    toggleTaskStatus(state,{id}){
      const filtered = state.tasks.filter(task => {
        return task.id === id
      })
      filtered.forEach(function(task){
        task.done = !task.done
      })
    },
    addLabel(state, {text}){
      state.labels.push({
        id: state.nextLabelId,
        text
      })
      state.nextLabelId++
    },
    changeFilter(state, {filter}) {
      state.filter = filter
    },
    restore(state, {tasks, labels, nextTaskId, nextLabelId}) {
      state.tasks = tasks
      state.labels = labels
      state.nextTaskId = nextTaskId
      state.nextLabelId = nextLabelId
    }
  },
  actions: {
    // save state to localStorage
    save({state}) {
      const data = {
        tasks: state.tasks,
        labels: state.labels,
        nextTaskId: state.nextTaskId,
        nextLabelId: state.nextLabelId
      }
      localStorage.setItem('task-app-data', JSON.stringify(data))
    },
    restore({commit}) {
      const data = localStorage.getItem('task-app-data')
      if(data) {
        commit('restore', JSON.parse(data))
      }
    }
  }
})

export default store