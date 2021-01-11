import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'

const localVue = createLocalVue();

localVue.use(Vuex)

describe('KbnLoginView', () => {
  let actions
  let $router
  let store
  let LoginFormComponentStub

  // 'KbnLoginForm' 컴포넌트의 로그인 버튼 클릭을 일으키는 헬퍼 함수
  const triggerLogin = (loginView, target) => {
    const loginForm = loginView.find(target)
    loginForm.vm.onLogin('foo@domain.com', '12345678')
  }

  beforeEach(() => {
    // KbnLoginForm 컴포넌트 스텁 설정
    LoginFormComponentStub = {
      name: 'KbnLoginForm',
      props: ['onLogin'],
      render: h => h('p', ['login form'])
    }

    // vue router 목업 설정
    $router = {
      push : sinon.spy()
    }

    // login 액션 동작 확인을 위한 Vuex 관련 설정
    actions = {
      login: sinon.stub() // login 액션 목업
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  describe('login', () => {
    let loginView
    describe('sucess', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          mocks: {
            $router
          },
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
      })

      it('홈페이지 루트로 리다이렉트', done => {
        // login 액션 성공
        actions.login.resolves()

        triggerLogin(loginView, LoginFormComponentStub)

        // refresh promise
        loginView.vm.$nextTick(() => {
          expect($router.push.called).to.equal(true)
          expect($router.push.args[0][0].path).to.equal('/')
          done()
        })
      })
    })

    describe('fail', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
        sinon.spy(localView.vm, 'throwReject') // spy를 이용해 래핑
      })
      afterEach(() => {
        loginView.vm.throwReject.restore() // spy 래핑 해제
      })

      it('오류 처리가 호출됨', done => {
        // fail to login action
        const message = 'login failed'
        actions.login.rejects(new Error(message))

        triggerLogin(loginView, LoginFormComponentStub)

        // refresh promise
        loginView.vm.$nextTick(() => {
          const callInfo = loginView.vm.throwReject
          expect(callInfo.called).to.equal(true)
          expect(callInfo.args[0][0].message).to.equal(message)
          done()
        })
      })
    })
  })
})
