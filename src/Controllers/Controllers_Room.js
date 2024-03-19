const {
    S_Add_Room,
    S_Delete_Room,
    S_Edit_Room,
    S_Get_Room,
  } = require("../Services/Service_Room");


  const CTL_Get_Room = async (req, res) => {
    try {
      const response = await S_Get_Room();
      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
  };

  const CTL_Add_Room = async (req, res)=>{
    try{
        const Role = req.Role_id;
        if(Role != 1 || !Role)
        {
            return res.status(404).json({status: 404, message: "Permission denied!"});
        }
        const {Room_Id, Room_Name, Seats} = req.body;
        const response = await S_Add_Room(req.body);

        res.status(200).json(response);
    }catch(err){
        return res.status(404).json({status: 404, message: err.message});
    }
  }
  
  const CTL_Delete_Room = async (req, res)=>{
    try{
        const Role = req.Role_id;
        if(Role != 1 || !Role)
        {
            return res.status(404).json({status: 404, message: "Permission denied!"});
        }
        const {Room_Id} = req.body;
        const response = await S_Delete_Room(req.body);

        res.status(200).json(response);
    }catch(err){
        return res.status(404).json({status: 404, message: err.message});
    }
  }

  const CTL_Edit_Room = async (req, res)=>{
    try{
        const Role = req.Role_id;
        if(Role != 1 || !Role)
        {
            return res.status(404).json({status: 404, message: "Permission denied!"});
        }
        const {Room_Id, Room_Name, Seats} = req.body;
        const response = await S_Edit_Room(req.body);

        res.status(200).json(response);
    }catch(err){
        return res.status(404).json({status: 404, message: err.message});
    }
  }
  module.exports = {CTL_Get_Room, CTL_Add_Room, CTL_Edit_Room, CTL_Delete_Room};
  