const jwt = require('jsonwebtoken')
require('dotenv').config();

const secret_key = process.env.TOKEN_KEY


exports.parseJwt= (data)=> {
    try {
      let token = data.slice(7);
      const decode = Buffer.from(token.split(".")[1], "base64");
      const toString = decode.toString();
      return JSON.parse(toString);
    } catch (e) {
      return null;
    }
}
 
exports.generetToken = (userId) => {
    const token = jwt.sign({ userId: userId }, { algorithm: 'HS256' }, secret_key, { expiresIn: '30d' })
    return token
}





exports.verifyAdminToken = (req,res) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(" ")[1]
            console.log(token);
            let decoded = jwt.verify(token,secret_key);
            userId = decoded.userId   
            console.log(userId);         
            return res.send(userId)
        } catch (err) {
            return res.send({ status: false, message: "Invalid token.." });
        }
    } else {
        return res.send({ status: false, message: "Invalid token" });
    }
}
