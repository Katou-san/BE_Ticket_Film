const {
  S_Add_Film,
  S_Delete_Film,
  S_Edit_Film,
  S_Get_Film,
  S_Get_Film_Details,
  S_GetRC_Film,
  S_Search_Film,
} = require("../Services/Service_Film");
const CTL_Search_Film = async (req, res) => {
  try {
    const value = req.params.value;
    if (!value) {
      return res.status(404).json({ status: 404, message: "not found params" });
    }
    const response = await S_Search_Film(value);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

const CTL_Get_Film = async (req, res) => {
  try {
    const response = await S_Get_Film();
    res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

const CTL_Get_Film_Details = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await S_Get_Film_Details(id);
    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ status: 404, message: err.message });
  }
};

const CTL_Add_Film = async (req, res) => {
  try {
    const Role = req.Role_id;
    if (Role != 1 || !Role) {
      return res
        .status(404)
        .json({ status: 404, message: "Permission denied!" });
    }
    const {
      Film_Id,
      Category_Id,
      Name,
      Director,
      Start_Date,
      End_Date,
      Time,
      Des,
      Poster,
      Member,
      Rated,
    } = req.body;
    const response = await S_Add_Film(req.body);

    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ status: 404, message: err.message });
  }
};

const CTL_Delete_Film = async (req, res) => {
  try {
    const Role = req.Role_id;
    if (Role != 1 || !Role) {
      return res
        .status(404)
        .json({ status: 404, message: "Permission denied!" });
    }
    const { Film_Id } = req.body;
    const response = await S_Delete_Film(req.body);

    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ status: 404, message: err.message });
  }
};

const CTL_Edit_Film = async (req, res) => {
  try {
    const Role = req.Role_id;
    if (Role != 1 || !Role) {
      return res
        .status(404)
        .json({ status: 404, message: "Permission denied!" });
    }
    const { Category_Id, Category_Name } = req.body;
    const response = await S_Edit_Film(req.body);

    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({ status: 404, message: err.message });
  }
};

const CTL_GetRC_Film = async (req, res) => {
  try {
    const response = await S_GetRC_Film();
    res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};
module.exports = {
  CTL_Get_Film,
  CTL_Get_Film_Details,
  CTL_Add_Film,
  CTL_Edit_Film,
  CTL_Delete_Film,
  CTL_GetRC_Film,
  CTL_Search_Film,
};
