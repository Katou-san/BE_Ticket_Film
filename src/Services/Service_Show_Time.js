const { Query } = require("../Utils/Fun_SQL");
const { Date_Handle } = require("../Utils/Handle_Date");

const S_Get_ShowTime = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Film_Id } = data;

      const sql = "SELECT * FROM Show_time WHERE Film_Id =?";
      const result = await Query(sql, [Film_Id]);
      resolve({ status: 200, data: result });
    } catch (err) {
      reject(err);
    }
  });
};
const S_Get_Time = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Film_Id, Room_Id, Time } = data;
      const sql =
        "SELECT time FROM showtime where Room_Id = ? and Film_Id = ? ";
      const result = await Query(sql, [Room_Id, Film_Id]);

      const DateReq = Date_Handle(Time);
      let Array_Time = [];
      result.map((i) => {
        const TimeDb = Date_Handle(i.time);
        if (
          TimeDb.day == DateReq.day &&
          TimeDb.month == DateReq.month &&
          TimeDb.year == DateReq.year
        ) {
          Array_Time.push(i.room_id);
        }
      });
      resolve({ status: 200, data: { Array_Time: result } });
    } catch (error) {
      reject({ status: 400, data: error });
    }
  });
};
const S_Get_Room = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Film_Id, Time } = data;
      const sql =
        "SELECT s.id,s.room_id,s.time FROM showtime s JOIN film f ON s.film_id = f.id WHERE s.film_id = ? ";
      let Array_Room = [];
      const result = await Query(sql, [Film_Id]);
      if (result.length == 0) {
        resolve({ status: 200, data: result });
      }

      const DateReq = Date_Handle(Time);
      result.map((i) => {
        const TimeDb = Date_Handle(i.time);

        if (
          TimeDb.day == DateReq.day &&
          TimeDb.month == DateReq.month &&
          TimeDb.year == DateReq.year
        ) {
          Array_Room.push(i.room_id);
        }
      });

      resolve({
        status: 200,
        data: { Array_Room },
      });
    } catch (error) {
      reject({ status: 404, message: error });
    }
  });
};

const S_ShowTime_Check = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Film_Id, Room_Id, Time } = data;
      const sql =
        "SELECT st.id, st.room_id,st.time as TimeST FROM `showtime` as st JOIN film as f on st.film_id = f.id WHERE st.room_id = ? and f.id = ?";
      const result = await Query(sql, [Room_Id, Film_Id]);

      if (result.length !== 0) {
        const TimeSt = Date_Handle(result[0].TimeST);
        const TimeREQ = Date_Handle(Time);
        if (
          TimeSt.hour == TimeREQ.hour &&
          TimeSt.day == TimeREQ.day &&
          TimeSt.month == TimeREQ.month &&
          TimeSt.year == TimeREQ.year
        ) {
          resolve({ status: 200, data: result });
        }
      }

      resolve({ status: 200, data: [] });
    } catch (error) {
      reject({ status: 404, message: error });
    }
  });
};
const S_Add_ShowTime = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { View_Id, Room_Id, Film_Id, time } = data;

      // Kiểm tra View_Id
      const check_view_id = await Query(
        "SELECT View_Id FROM View WHERE View_Id=?",
        [View_Id]
      );
      if (check_view_id.length > 0) {
        return resolve({ status: 404, message: "View_Id is already" });
      }

      // Kiểm tra Room_Id
      const check_room_id = await Query(
        "SELECT Room_Id FROM Room WHERE Room_Id=?",
        [Room_Id]
      );
      if (check_room_id.length == 0) {
        return resolve({ status: 404, message: "Room_Id not found" });
      }

      // Kiểm tra Film_Id và Showtime
      const check_film_id = await Query(
        "SELECT Film_Id, Start_Date, End_Date FROM Film WHERE Film_Id=?",
        [Film_Id]
      );
      if (check_film_id.length == 0) {
        return resolve({ status: 404, message: "Film_Id not found" });
      } else {
        const film = check_film_id[0];
        const startDate = new Date(film.Start_Date);
        const endDate = new Date(film.End_Date);
        const showtimeDate = new Date(Showtime);
        if (showtimeDate < startDate || showtimeDate > endDate) {
          return resolve({
            status: 400,
            message: "Showtime is not within the film's start and end dates",
          });
        }
      }

      const sql =
        "INSERT INTO View (View_Id, Room_Id, Film_Id, Showtime) VALUES (?, ?, ?, ?)";
      const result = await Query(sql, [View_Id, Room_Id, Film_Id, Showtime]);
      resolve({ status: 200, message: "Success" });
    } catch (err) {
      reject(err);
    }
  });
};

const S_Delete_ShowTime = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { View_Id } = data;

      const check_id = await Query(
        "SELECT View_Id, Showtime FROM View WHERE View_Id=?",
        [View_Id]
      );
      if (check_id.length > 0) {
        const view = check_id[0];
        const showtimeDate = new Date(view.Showtime);
        const currentDate = new Date();

        // Kiểm tra Showtime
        if (currentDate >= showtimeDate) {
          return resolve({
            status: 400,
            message:
              "Cannot delete view because the showtime has not yet arrived",
          });
        }

        // Kiểm tra Ticket_Id
        const check_ticket_id = await Query(
          "SELECT Ticket_Id FROM Ticket WHERE View_Id=?",
          [View_Id]
        );
        if (check_ticket_id.length > 0) {
          return resolve({
            status: 400,
            message:
              "Cannot delete view because tickets have been sold for this view",
          });
        }

        const sql = "DELETE FROM View WHERE View_Id = ?";
        const result = await Query(sql, [View_Id]);
        resolve({ status: 200, data: "View deleted successfully" });
      } else {
        resolve({ status: 404, data: "View_Id not found" });
      }
    } catch (err) {
      reject(err);
    }
  });
};

// để mặc định ở category chưa chỉnh sửa
const S_Edit_ShowTime = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { View_Id, View_Name } = data;

      const check_id = await Query("SELECT View_Id FROM View WHERE View_Id=?", [
        View_Id,
      ]);
      if (check_id.length > 0) {
        const check_name = await Query(
          "SELECT View_Name FROM View WHERE View_Name=?",
          [View_Name]
        );
        if (check_name.length > 0) {
          return resolve({ status: 404, message: "View_Name is ready" });
        }

        const sql = "UPDATE View SET View_Name = ? WHERE View_Id =?";
        const result = await Query(sql, [View_Name, View_Id]);
        resolve({ status: 200, data: "View updated successfully" });
      }

      resolve({ status: 404, data: "View_Id not found" });
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  S_Get_ShowTime,
  S_Add_ShowTime,
  S_Delete_ShowTime,
  S_Edit_ShowTime,
  S_ShowTime_Check,
  S_Get_Room,
  S_Get_Time,
};
