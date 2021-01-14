const bodyParser = require('body-parser')
// 'Express' 애플리케이션 인스턴스를 전달받을 함수를 익스포트 
module.exports = app => {
  // HTTP 요청의 body에 담긴 JSON을 파싱할 미들웨어 설치
  app.use(bodyParser.json())
  const users = {
    'master@domain.com': {
      password: '123',
      userId: 1,
      token: '1234567890abcdef'
    }
  }

  // 로그인 API 엔드 포인트는 '/auth/login'
  app.post('/auth/login', (req, res) => {
    const { email, password } = req.body
    const user = users[email]
    if (user) {
      if (user.password != password) {
        res.status(401).json({ message: '로그인에 실패했습니다.' })
      } else {
        res.json({ userId: user.userId, token: user.token })
      }
    } else {
      res.status(404).json({ message: '등록된 사용자가 아닙니다.' })
    }
  })
}