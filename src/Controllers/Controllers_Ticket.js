const { S_Create_Ticket, S_Get_Seats } = require("../Services/Service_Ticket");

const CTL_Create_Ticket = async (req, res) => {
  try {
    const Email = req.Email;
    const { Date, Film_Id, Price, Quantity, Room, Seats, Time } = req.body;
    console.log(Email);
    if (
      !Email &&
      !Date &&
      !Film_Id &&
      !Price &&
      !Quantity &&
      !Room &&
      !Seats &&
      !Time
    ) {
      return res
        .status(404)
        .json({ status: 404, message: "Cant not Pay Ticket" });
    }
    const response = await S_Create_Ticket(req.body, Email);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};

const CTL_Get_Ticket = async (req, res) => {
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

const CTL_Delete_Ticket = async (req, res) => {
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

const CTL_Get_Seats = async (req, res) => {
  try {
    const response = await S_Get_Seats(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ status: 404, message: e.message });
  }
};

module.exports = {
  CTL_Delete_Ticket,
  CTL_Get_Ticket,
  CTL_Create_Ticket,
  CTL_Get_Seats,
};
