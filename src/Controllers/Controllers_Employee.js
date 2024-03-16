const {
  S_Signup_E,
  S_Login_E,
  S_Auth_E,
} = require("../Services/Service_Employee");

const CTL_Login_E = async (req, res) => {
  try {
    const { Email, Pass } = req.body;
    if (!Email && !Pass) {
      return res.status(404).json({ status: 404, message: "Login failed" });
    }
    const response = await S_Login_E(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};

const CTL_Signup_E = async (req, res) => {
  try {
    const { Email, Pass } = req.body;
    if (!Email && !Pass && !Phone && !Address) {
      return res.status(404).json({ status: 404, message: "Signup failed" });
    }

    const response = await S_Signup_E(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};

const CTL_Auth_E = async (req, res) => {
  try {
    const Email = req.Email;
    if (!Email) {
      return res.status(404).json({ status: 404, message: "Login failed" });
    }
    const response = await S_Auth_E(Email);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};

module.exports = { CTL_Signup_E, CTL_Login_E, CTL_Auth_E };
