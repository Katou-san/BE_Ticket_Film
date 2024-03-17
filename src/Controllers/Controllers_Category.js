const {
    S_Add_Category,
    S_Delete_Category,
    S_Edit_Category,
    S_Get_Category,
  } = require("../Services/Service_Category");


  const CTL_Get_Category = async (req, res) => {
    try {
      const response = await S_Get_Category();
      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
  };

  const CTL_Add_Category = async (req, res)=>{
    try{
        const Role = req.Role_id;
        if(Role != 1 || !Role)
        {
            return res.status(404).json({status: 404, message: "Permission denied!"});
        }
        const {Category_Id, Category_Name} = req.body;
        const response = await S_Add_Category(req.body);

        res.status(200).json(response);
    }catch(err){
        return res.status(404).json({status: 404, message: err.message});
    }
  }
  
  const CTL_Delete_Category = async (req, res)=>{
    try{
        const Role = req.Role_id;
        if(Role != 1 || !Role)
        {
            return res.status(404).json({status: 404, message: "Permission denied!"});
        }
        const {Category_Id} = req.body;
        const response = await S_Delete_Category(req.body);

        res.status(200).json(response);
    }catch(err){
        return res.status(404).json({status: 404, message: err.message});
    }
  }

  const CTL_Edit_Category = async (req, res)=>{
    try{
        const Role = req.Role_id;
        if(Role != 1 || !Role)
        {
            return res.status(404).json({status: 404, message: "Permission denied!"});
        }
        const {Category_Id, Category_Name} = req.body;
        const response = await S_Edit_Category(req.body);

        res.status(200).json(response);
    }catch(err){
        return res.status(404).json({status: 404, message: err.message});
    }
  }
  module.exports = {CTL_Get_Category, CTL_Add_Category, CTL_Edit_Category, CTL_Delete_Category};
  