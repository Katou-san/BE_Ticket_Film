const { S_Signup, S_Login, S_Auth } = require("../Services/Service_User");

const CTL_Login = async (req, res) => {
  try {
    const { Email, Pass } = req.body;
    if (!Email && !Pass) {
      return res.status(404).json({ status: 404, message: "Login failed" });
    }
    const response = await S_Login(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};

const CTL_Signup = async (req, res) => {
  try {
    const { Email, Pass, Phone, Address } = req.body;
    if (!Email && !Pass && !Phone && !Address) {
      return res.status(404).json({ status: 404, message: "Signup failed" });
    }

    const response = await S_Signup(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};

const CTL_Auth = async (req, res) => {
  try {
    const Email = req.Email;
    if (!Email) {
      return res.status(404).json({ status: 404, message: "Login failed" });
    }
    const response = await S_Auth(Email);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};

module.exports = { CTL_Signup, CTL_Login, CTL_Auth };
