const { Query } = require("../Utils/Fun_SQL");
const { Date_Handle, Get_Current_Date } = require("../Utils/Handle_Date");
const S_Get_Film = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "SELECT * FROM Film";
      const result = await Query(sql);
      resolve({ status: 200, data: result });
    } catch (err) {
      reject(err);
    }
  });
};

const S_Get_Film_Details = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql =
        "SELECT *,category.name as name_cate,category.id as id_cate ,film.name as name_Film FROM film JOIN category ON film.category_id = category.id WHERE film.id = ?";
      const result = await Query(sql, [id]);

      if (result.length == 0) {
        return resolve({ status: 404, data: "Film_Id not found" });
      }

      resolve({ status: 200, data: result[0] });
    } catch (err) {
      reject(err);
    }
  });
};

const S_GetRC_Film = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let Result_Done = [];
      let Result_Now = [];
      let Result_Soon = [];
      const sql = "SELECT * FROM film";
      const find = await Query(sql);
      find.map((result) => {
        let launch_date = Date_Handle(result.launch_date);
        let finish_date = Date_Handle(result.finish_date);
        let currnent = Get_Current_Date();

        if (launch_date.month == currnent.month) {
          if (
            launch_date.day <= currnent.day &&
            currnent.day <= finish_date.day
          ) {
            Result_Now.push(result.id);
          } else if (launch_date.day >= currnent.day) {
            Result_Soon.push(result.id);
          }
        } else if (launch_date.month < currnent.month) {
          if (
            launch_date.day >= currnent.day &&
            currnent.day <= finish_date.day
          ) {
            Result_Now.push(result.id);
          }
        } else if (
          launch_date.month > currnent.month &&
          launch_date.year == currnent.year
        ) {
          Result_Soon.push(result.id);
        }
      });

      resolve({
        status: 200,
        data: { Result_Now, Result_Soon },
      });
    } catch (err) {
      reject(err);
    }
  });
};

const S_Add_Film = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      } = data;

      const check_id_category = await Query(
        "SELECT Category_Id FROM Category WHERE Category_Id=?",
        [Category_Id]
      );
      if (check_id_category.length == 0) {
        return resolve({ status: 404, message: "Category_Id not found" });
      }

      const check_id_film = await Query(
        "SELECT Film_Id FROM Film WHERE Film_Id=?",
        [Film_Id]
      );
      if (check_id_film.length > 0) {
        return resolve({ status: 404, message: "Film_Id is ready" });
      }

      const check_name_film = await Query(
        "SELECT Name FROM Film WHERE Name=?",
        [Name]
      );
      if (check_name_film.length > 0) {
        return resolve({ status: 404, message: "Name is ready" });
      }

      // thiếu kiểm tra ngày bắt đầu ngày kết thúc

      const sql =
        "INSERT INTO Film (Film_Id, Category_Id, Name, Director, Start_Date, End_Date, Time, Des, Poster, Member, Rated) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const result = await Query(sql, [
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
      ]);
      resolve({ status: 200, data: "Film add successfully" });
    } catch (err) {
      reject(err);
    }
  });
};

const S_Delete_Film = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Film_Id } = data;

      const check_id = await Query("SELECT Film_Id FROM Film WHERE Film_Id=?", [
        Film_Id,
      ]);
      if (check_id.length == 0) {
        return resolve({ status: 404, data: "Film_Id not found" });
      }

      const currentDate = new Date();
      const startDate = new Date(check_id[0].Start_Date);
      const endDate = new Date(check_id[0].End_Date);
      if (
        (currentDate >= startDate && currentDate <= endDate) ||
        currentDate < startDate
      ) {
        return resolve({
          status: 400,
          data: "The film is still being shown or about to be shown and cannot be deleted",
        });
      }

      const sql = "DELETE FROM Film WHERE Film_Id = ?";
      const result = await Query(sql, [Film_Id]);
      resolve({ status: 200, data: "Film deleted successfully" });
    } catch (err) {
      reject(err);
    }
  });
};

// phần này chưa chỉnh sữa (vẫn đang là của category)
const S_Edit_Film = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Category_Id, Category_Name } = data;

      const check_id = await Query(
        "SELECT Category_Id FROM Category WHERE Category_Id=?",
        [Category_Id]
      );
      if (check_id.length > 0) {
        const check_name = await Query(
          "SELECT Category_Name FROM Category WHERE Category_Name=?",
          [Category_Name]
        );
        if (check_name.length > 0) {
          return resolve({ status: 404, message: "Category_Name is ready" });
        }

        const sql =
          "UPDATE Category SET Category_Name = ? WHERE Category_Id =?";
        const result = await Query(sql, [Category_Name, Category_Id]);
        resolve({ status: 200, data: "Category updated successfully" });
      }

      resolve({ status: 404, data: "Category_Id not found" });
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  S_Get_Film,
  S_Get_Film_Details,
  S_Add_Film,
  S_Delete_Film,
  S_Edit_Film,
  S_GetRC_Film,
};
