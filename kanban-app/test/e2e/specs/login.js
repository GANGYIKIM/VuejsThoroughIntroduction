module.exports = {
  '로그인': function(browser) {
    const devServer = browser.globals.devServerURL

    browser
      // 앱 최상위 페이지로
      .url(devServer)
      // 앱 렌더링될 때까지 대기
      .waitForElementVisible('#app', 1000)
      // 이메일 주소 입력
      .enterValue('input#email', 'master@domain.com')
      // 비밀번호 입력
      .enterValue('input#password', '123')
      // 로그인버튼 활성화될 때까지 대기
      .waitForElementPresent('form > .form-actions > button', 1000)
      // 로그인
      .click('form > .form-actions > button')
      // 로그인 성공 후 리다이렉트 후 보드 페이지 대기
      .waitForElementPresent('#app > p', 1000)
      // 현재 페이지가 보드 페이지인지 확인
      .assert.urlEquals('http://localhost:8080/#/')
      .end()
  }
}