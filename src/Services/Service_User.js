const { Query } = require("../Utils/Fun_SQL");
const {
  JWT_Create_Token,
  Hash_Password,
  Confirm_Hash_Password,
} = require("../Middleware/JWT_Actions");

const S_Login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Email, Pass } = data;
      const sql = `SELECT * FROM user WHERE Email = ?`;
      const result = await Query(sql, [Email]);
      if (result.length == 0) {
        resolve({ status: 404, data: "Not found User" });
      }

      if (!Confirm_Hash_Password(Pass, result[0].Pass)) {
        resolve({ status: 404, data: "Pass not match" });
      }

      const { User_id, Name } = result[0];
      const Access_Token = JWT_Create_Token({
        Name,
        Email,
      });
      resolve({ status: 200, data: { Access_Token, Name, User_id } });
    } catch (err) {
      reject(err);
    }
  });
};

const S_Signup = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Email, Name, Pass, Phone, Address } = data;

      const check_Email = await Query("SELECT email FROM user WHERE Email=?", [
        Email,
      ]);

      if (check_Email.length > 0) {
        resolve({ status: 404, message: "Email is ready" });
      }

      const sql =
        "INSERT INTO user (Email,Name,Pass ,Phone, Address) VALUES(?,?,?,?,?)";
      const result = await Query(sql, [
        Email,
        Name,
        Hash_Password(Pass),
        Phone,
        Address,
      ]);

      const Access_Token = JWT_Create_Token({
        Email,
        Name,
      });

      resolve({ status: 200, data: { Access_Token, Name } });
    } catch (err) {
      reject(err);
    }
  });
};

const S_Auth = (Email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "SELECT * FROM user WHERE Email = ?";
      const result = await Query(sql, [Email]);

      const { Name } = result[0];
      const Access_Token = JWT_Create_Token({
        Email,
        Name,
      });

      resolve({ status: 200, data: { Access_Token, Name } });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { S_Login, S_Signup, S_Auth };
