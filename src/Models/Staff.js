const { Connection: db } = require("../Config/Connect_mysql");

class Staff {
  async getStaff({ email, password }) {
    try {
      await db.connect();
      const sql =
        "SELECT s.username, s.role_id FROM staff s WHERE email = ? AND password = ?";
      const [result, fields] = await db.execute(sql, [email, password]);
      return [result[0], fields];
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }
}

module.exports = new Staff();
