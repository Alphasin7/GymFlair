import jwt from 'jsonwebtoken';





// Middleware to verify authentication via JWT
export  function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).send('invalid token ');
    }
    try {
        const tokenData = token.split(' ')[1];
        const decodedToken = jwt.verify(tokenData,'your_secret_key');
        req.userId=decodedToken.userId
       
        next();
    } catch (error) {
        return res.status(401).send('Authentication failed:invalid token ')

    }
}