const {
  S_Add_ShowTime,
  S_Delete_ShowTime,
  S_Edit_ShowTime,
  S_Get_ShowTime,
  S_ShowTime_Check,
  S_Get_ShowTime_Price,
  S_Get_Time,
  S_Get_Room,
} = require("../Services/Service_Show_Time");

const CTL_Get_ShowTime = async (req, res) => {
  try {
    const { Film_Id } = req.body;
    const response = await S_Get_ShowTime(req.body);
    res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

const CTL_Add_ShowTime = async (req, res) => {
  try {
    const Role = req.Role_id;
    if (Role != 1 || !Role) {
      return res
        .status(404)
        .json({ status: 404, message: "Permission denied!" });
    }
    const { Room_Id, Film_Id, Showtime } = req.body;
    const response = await S_Add_ShowTime(req.body);

    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ status: 404, message: err.message });
  }
};

const CTL_Delete_ShowTime = async (req, res) => {
  try {
    const Role = req.Role_id;
    if (Role != 1 || !Role) {
      return res
        .status(404)
        .json({ status: 404, message: "Permission denied!" });
    }
    const { View_Id } = req.body;
    const response = await S_Delete_ShowTime(req.body);

    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ status: 404, message: err.message });
  }
};

// để mặc định từ category, chưa chỉnh sửa
const CTL_Edit_ShowTime = async (req, res) => {
  try {
    const Role = req.Role_id;
    if (Role != 1 || !Role) {
      return res
        .status(404)
        .json({ status: 404, message: "Permission denied!" });
    }
    const { Category_Id, Category_Name } = req.body;
    const response = await S_Edit_ShowTime(req.body);

    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ status: 404, message: err.message });
  }
};

const CTL_Get_Room = async (req, res) => {
  try {
    const { Film_Id, Time } = req.body;
    if (!Film_Id || !Film_Id) {
      return res.status(400).json({ status: 400, message: "not a valid film" });
    }
    const response = await S_Get_Room(req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ status: 404, message: err.message });
  }
};

const CTL_Get_Time = async (req, res) => {
  try {
    const response = await S_Get_Time(req.body);
    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ status: 404, message: err.message });
  }
};

const CTL_ShowTime_Check = async (req, res) => {
  try {
    const Email = req.Email;
    const { Film_Id, Room_Id, Time } = req.body;
    if (!Film_Id && !Room_Id && !Time) {
      return res.status(404).json({ status: 404, message: "fail" });
    }

    const response = await S_ShowTime_Check(req.body);

    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ status: 404, message: err.message });
  }
};

const CTL_Get_Price = async (req, res) => {
  try {
    const { Film_Id, Room_Id, Time } = req.body;
    if (!Film_Id && !Room_Id && !Time) {
      return res.status(404).json({ status: 404, message: "fail" });
    }

    const response = await S_Get_ShowTime_Price(req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ status: 404, message: err.message });
  }
};
module.exports = {
  CTL_Get_ShowTime,
  CTL_Add_ShowTime,
  CTL_Edit_ShowTime,
  CTL_Delete_ShowTime,
  CTL_ShowTime_Check,
  CTL_Get_Room,
  CTL_Get_Time,
  CTL_Get_Price,
};
