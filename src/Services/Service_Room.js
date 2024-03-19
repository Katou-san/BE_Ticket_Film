const { Query } = require("../Utils/Fun_SQL");

const S_Get_Room = () =>{
    return new Promise(async (resolve, reject)=>{
        try{
            const sql = "SELECT * FROM Room";
            const result = await Query(sql);
            resolve({status: 200, data: result});
        }catch(err){
            reject(err);
        }
    });
}

const S_Add_Room = (data) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            const{Room_Id, Room_Name, Seats} = data;

            const check_id = await Query("SELECT Room_Id FROM Room WHERE Room_Id=?",[Room_Id]);
            if(check_id,length>0){
                return resolve({ status: 404, message: "Room_Id is ready" });
            }

            const check_name = await Query("SELECT Room_Name FROM Room WHERE Room_Name=?",[Room_Name]);
            if(check_name.length>0){
                return resolve({ status: 404, message: "Room_Name is ready" });
            }

            const sql = "INSERT INTO Room (Room_Id, Room_Name, Seats) VALUES(?, ?, ?)";
            const result = await Query(sql, [Room_Id, Room_Name, Seats]);
            resolve({status: 200, data: "Room add successfully"});


        }catch(err){
            reject(err);
        }
    });
}

const S_Delete_Room = (data) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            const{Room_Id} = data;

            const check_id = await Query("SELECT Room_Id FROM Room WHERE Room_Id=?",[Room_Id]);
            if(check_id.length>0){
                const sql = "DELETE FROM Room WHERE Room_Id = ?";
                const result = await Query(sql, [Room_Id]);
                resolve({status: 200, data: "Room deleted successfully"});
            }
            resolve({status: 404, data: "Room_Id not found"});


        }catch(err){
            reject(err);
        }
    });
}

const S_Edit_Room = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { Room_Id, Room_Name, Seats } = data;

            const check_id = await Query("SELECT Room_Id FROM Room WHERE Room_Id=?", [Room_Id]);
            if (check_id.length == 0) {
                return resolve({ status: 404, data: "Room_Id not found" });
            }

            if (Room_Name) {
                const check_name = await Query("SELECT Room_Name FROM Room WHERE Room_Name=?", [Room_Name]);
                if (check_name.length > 0) {
                    return resolve({ status: 404, message: "Room_Name is ready" });
                }
            }

            const sql = "UPDATE Room SET Room_Name = ?, Seats = ? WHERE Room_Id = ?";
            const result = await Query(sql, [Room_Name, Seats, Room_Id]);
            resolve({ status: 200, data: "Room updated successfully" });

        } catch (err) {
            reject(err);
        }
    });
}


module.exports = {S_Get_Room, S_Add_Room, S_Delete_Room, S_Edit_Room};