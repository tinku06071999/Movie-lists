const { default: jwt_decode } = require("jwt-decode");

const verifyToken = (token) => { console.log(jwt_decode(token)); };

export default { verifyToken };