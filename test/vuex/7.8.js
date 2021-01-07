import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {sync} from 'vuex-router-sync'

Vue.use(VueRouter)
Vue.use(Vuex)

// 라우터 생성
const router = new VueRouter({
  routes: [
    // 라우팅 정의
  ]
})

// 스토어 생성
const store = new Vuex.Store({
  // 스토어 정의
})

// 라우터와 스토어를 동기화
sync(store, router)

// store.state.route 아래에 라우팅 데이터를 저장
console.log(store.state.route)

// 상품 목록을 state로 저장하는 모듈
export default {
  state: {
    products: [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Orange' },
      { id: 3, name: 'Banana' }
    ],
    keyword: '',
    result: []
  },
  getters: {
    // router 에서 받은 params.id와 일치하는 id를 가진 product 반환
    currentProduct( state, getters, rootState ) {
      const productId = Number(rootState.route.params.id);

      return state.products.find(product => {
        return product.id === productId
      })
    }
  },
  actions: {
    search({ state, commit, dispatch }) {
      // 키워드와 일치하는 상품을 검색
      const result = state.products.filter(product => {
        return product.name.includes(state.keyword)
      })

      if(result.length === 0) {
        // 검색 결과 없을 시 오류 알림
        dispatch('showError', '키워드와 일치하는 상품이 없습니다')
      } else {
        // 결과가 있으면 스테이트에 반영
        commit('setSearchResult', result)

        // 페이지 이동
        router.push('/search')
      }
    }
  },
  mutations: {
    setSearchResult(state, result) {
      state.result = result
    }
  }
}