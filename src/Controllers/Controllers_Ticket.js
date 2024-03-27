const {
  S_Create_Ticket,
  S_Get_Seats,
  S_Get_Ticket,
} = require("../Services/Service_Ticket");

const CTL_Create_Ticket = async (req, res) => {
  try {
    const Email = req.Email;
    const { Time, Film_Id, Price, Quantity, Room_Id, Seats } = req.body;
    if (
      !Email &&
      !Time &&
      !Film_Id &&
      !Price &&
      !Quantity &&
      !Room_Id &&
      !Seats
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
    const Email = req.Email;
    console.log(Email);
    if (!Email) {
      return res
        .status(404)
        .json({ status: 404, message: "Get ticket failed" });
    }

    const response = await S_Get_Ticket(Email);
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
