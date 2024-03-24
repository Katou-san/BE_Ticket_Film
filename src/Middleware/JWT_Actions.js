const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const Key_JWT = "sdfjasfd";
// const salt = bcrypt.genSaltSync(10);

//CREATE JWT TOKEN
const JWT_Create_Token = (Payload) => {
  let token = null;
  try {
    token = jwt.sign(
      { ...Payload, expiresIn: process.env.EXPIRES_IN },
      Key_JWT
    );
    return token;
  } catch (err) {
    return token;
  }
};

const JWT_Verify_Token = async (req, res, next) => {
  let Token = await req.headers["x-access-token"];
  if (Token) {
    jwt.verify(Token, Key_JWT, (err, decoded) => {
      if (err) {
        res.send({ status: 401, message: "Verify Error" });
      } else {
        req.Email = decoded.Email;
        req.Role_id = decoded.Role_id;
        next();
      }
    });
  } else {
    res.send({ status: 401, message: "Not Found Token" });
  }
};

// const Hash_Password = (Pass) => {
//   const Hash_Pass = bcrypt.hashSync(Pass, salt);
//   return Hash_Pass;
// };

// const Confirm_Hash_Password = (Pass, Hash) => {
//   const result = bcrypt.compareSync(Pass, Hash);
//   return result;
// };

module.exports = {
  JWT_Create_Token,
  JWT_Verify_Token,
  // Hash_Password,
  // Confirm_Hash_Password,
};
