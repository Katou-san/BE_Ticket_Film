const { Query } = require("../Utils/Fun_SQL");
const {
  JWT_Create_Token,
  Hash_Password,
  Confirm_Hash_Password,
} = require("../Middleware/JWT_ActionS");

Role_Default = 0;

const S_Login_E = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Email, Pass } = data;
      const sql = `SELECT * FROM Employee WHERE Email = ?`;
      const result = await Query(sql, [Email]);
      if (result.length == 0) {
        resolve({ status: 404, data: "Not found User" });
      }

      if (!Confirm_Hash_Password(Pass, result[0].Pass)) {
        resolve({ status: 404, data: "Pass not match" });
      }

      const { User_id, Name, Role_id } = result[0];
      const Access_Token = JWT_Create_Token({
        Name,
        Email,
        Role_id,
      });
      resolve({ status: 200, data: { Access_Token, Name, User_id } });
    } catch (err) {
      reject(err);
    }
  });
};

const S_Signup_E = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Email, Name, Pass } = data;

      const check_Email = await Query(
        "SELECT Email FROM Employee WHERE Email=?",
        [Email]
      );

      console.log(check_Email.length);

      if (check_Email.length > 0) {
        resolve({ status: 404, message: "Email is ready" });
      }

      const sql =
        "INSERT INTO Employee (Email,Name,Pass,Role_id) VALUES(?,?,?,?)";
      const result = await Query(sql, [
        Email,
        Name,
        Hash_Password(Pass),
        Role_Default,
      ]);

      const Access_Token = JWT_Create_Token({
        Email,
        Name,
        Role_id: Role_Default,
      });

      resolve({ status: 200, data: { Access_Token, Name } });
    } catch (err) {
      reject(err);
    }
  });
};

const S_Auth_E = (Email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "SELECT * FROM Employee WHERE Email = ?";
      const result = await Query(sql, [Email]);

      const { Name, Role_id } = result[0];
      const Access_Token = JWT_Create_Token({
        Email,
        Name,
        Role_id,
      });

      resolve({ status: 200, data: { Access_Token, Name } });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { S_Login_E, S_Signup_E, S_Auth_E };
