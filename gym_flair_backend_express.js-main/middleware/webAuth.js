import jwt from 'jsonwebtoken'

export default function authenticateTokenWeb(req, res, next) {
    const token = req.cookies.__md_e
    if (token == null) return res.render('login')
  
    jwt.verify(token, 'your_secret_key', (err, data) => {
     
      if (err) return res.render('login')
     
      req.userId = data.userId
      req.role = data.role
      next()
    })
  }