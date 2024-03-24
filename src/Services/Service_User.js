const { Query } = require("../Utils/Fun_SQL");
const {
  JWT_Create_Token,
  // Hash_Password,
  // Confirm_Hash_Password,
} = require("../Middleware/JWT_Actions");

const S_Login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Email, Pass } = data;
      const sql = `SELECT * FROM _user WHERE _email = ? And _pass =?`;
      const result = await Query(sql, [Email, Pass]);
      if (result.length == 0) {
        resolve({ status: 404, data: "Not found User" });
      }

      // if (!Confirm_Hash_Password(Pass, result[0]._pass)) {
      //   resolve({ status: 404, data: "Pass not match" });
      // }

      const { _name } = result[0];
      const Access_Token = JWT_Create_Token({
        Name: _name,
        Email,
      });
      resolve({ status: 200, data: { Access_Token, Name: _name } });
    } catch (err) {
      reject(err);
    }
  });
};

const S_Signup = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Email, Pass, Phone, Address } = data;
      const check_Email = await Query(
        "SELECT _email FROM _user WHERE _email=?",
        [Email]
      );

      if (check_Email.length > 0) {
        resolve({ status: 404, message: "Email is ready" });
      } else {
        const sql =
          "INSERT INTO _user (_email,_name,_pass,_phone,_address) VALUES(?,?,?,?,?)";
        const result = await Query(sql, [
          Email,
          Email.split("@")[0],
          Pass,
          Phone,
          Address,
        ]);

        const Access_Token = JWT_Create_Token({
          Email,
          Name: Email.split("@")[0],
        });

        resolve({
          status: 200,
          data: { Access_Token, Name: Email.split("@")[0] },
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const S_Auth = (Email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "SELECT * FROM _user WHERE _email = ?";
      const result = await Query(sql, [Email]);

      const { _name } = result[0];
      const Access_Token = JWT_Create_Token({
        Email,
        Name: _name,
      });

      resolve({ status: 200, data: { Access_Token, Name: _name } });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { S_Login, S_Signup, S_Auth };
