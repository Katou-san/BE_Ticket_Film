const { Query } = require("../Utils/Fun_SQL");

const S_Get_Category = () =>{
    return new Promise(async (resolve, reject)=>{
        try{
            const sql = "SELECT * FROM Category";
            const result = await Query(sql);
            resolve({status: 200, data: result});
        }catch(err){
            reject(err);
        }
    });
}

const S_Add_Category = (data) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            const{Category_Id, Category_Name} = data;

            const check_id = await Query("SELECT Category_Id FROM Category WHERE Category_Id=?",[Category_Id]);
            if(check_id,length>0){
                return resolve({ status: 404, message: "Category_Id is ready" });
            }

            const check_name = await Query("SELECT Category_Name FROM Category WHERE Category_Name=?",[Category_Name]);
            if(check_name.length>0){
                return resolve({ status: 404, message: "Category_Name is ready" });
            }

            const sql = "INSERT INTO Category (Category_Id, Category_Name) VALUES(?, ?)";
            const result = await Query(sql, [Category_Id, Category_Name]);
            resolve({status: 200, data: "Category add successfully"});


        }catch(err){
            reject(err);
        }
    });
}

const S_Delete_Category = (data) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            const{Category_Id} = data;

            const check_id = await Query("SELECT Category_Id FROM Category WHERE Category_Id=?",[Category_Id]);
            if(check_id.length>0){
                const sql = "DELETE FROM Category WHERE Category_Id = ?";
                const result = await Query(sql, [Category_Id]);
                resolve({status: 200, data: "Category deleted successfully"});
            }
            resolve({status: 404, data: "Category_Id not found"});


        }catch(err){
            reject(err);
        }
    });
}

const S_Edit_Category = (data) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            const{Category_Id, Category_Name} = data;

            const check_id = await Query("SELECT Category_Id FROM Category WHERE Category_Id=?",[Category_Id]);
            if(check_id.length>0){
                const check_name = await Query("SELECT Category_Name FROM Category WHERE Category_Name=?",[Category_Name]);
                if(check_name.length>0)
                {
                    return resolve({ status: 404, message: "Category_Name is ready" });
                }
                
                const sql = "UPDATE Category SET Category_Name = ? WHERE Category_Id =?";
                const result = await Query(sql, [Category_Name, Category_Id]);
                resolve({status: 200, data: "Category updated successfully"});
            }

            resolve({status: 404, data: "Category_Id not found"});


        }catch(err){
            reject(err);
        }
    });
}
module.exports = {S_Get_Category, S_Add_Category, S_Delete_Category, S_Edit_Category};