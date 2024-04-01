const staffModel = require("../Models/Staff");
const { JWT_Create_Token } = require("../Middleware/JWT_Actions");

class StaffController {
  async login(req, res) {
    try {
      const data = req.body;

      const [result] = await staffModel.getStaff({
        email: data.email,
        password: data.password,
      });
      console.log(result);
      // return JWT
      return res.json({ token: JWT_Create_Token(result) });
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }
}

module.exports = new StaffController();
