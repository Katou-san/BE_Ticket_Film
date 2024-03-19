const {
    S_Add_View,
    S_Delete_View,
    S_Edit_View,
    S_Get_View,
} = require("../Services/Service_View");


const CTL_Get_View = async (req, res) => {
    try {
        const {Film_Id} = req.body;
        const response = await S_Get_View(req.body);
        res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    }
};

const CTL_Add_View = async (req, res) => {
    try {
        const Role = req.Role_id;
        if (Role != 1 || !Role) {
            return res.status(404).json({ status: 404, message: "Permission denied!" });
        }
        const { View_Id, Room_Id, Film_Id, Showtime } = req.body;
        const response = await S_Add_View(req.body);

        res.status(200).json(response);
    } catch (err) {
        return res.status(404).json({ status: 404, message: err.message });
    }
}

const CTL_Delete_View = async (req, res) => {
    try {
        const Role = req.Role_id;
        if (Role != 1 || !Role) {
            return res.status(404).json({ status: 404, message: "Permission denied!" });
        }
        const { View_Id } = req.body;
        const response = await S_Delete_View(req.body);

        res.status(200).json(response);
    } catch (err) {
        return res.status(404).json({ status: 404, message: err.message });
    }
}

// để mặc định từ category, chưa chỉnh sửa
const CTL_Edit_View = async (req, res) => {
    try {
        const Role = req.Role_id;
        if (Role != 1 || !Role) {
            return res.status(404).json({ status: 404, message: "Permission denied!" });
        }
        const { Category_Id, Category_Name } = req.body;
        const response = await S_Edit_View(req.body);

        res.status(200).json(response);
    } catch (err) {
        return res.status(404).json({ status: 404, message: err.message });
    }
}
module.exports = { CTL_Get_View, CTL_Add_View, CTL_Edit_View, CTL_Delete_View };
