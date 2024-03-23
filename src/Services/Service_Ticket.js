const { Date_Handle } = require("../../../project-film/src/Util");
const { Query } = require("../Utils/Fun_SQL");

const S_Create_Ticket = (data, Email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Date, Film_Id, Price, Quantity, Room, Seats, Time } = req.body;
      const sql = `SELECT User_Id FROM user WHERE Email = ?`;
      const sql2 = `SELECT * FROM show_time WHERE Room = ? AND Film_Id=? `;
      const result = await Query(sql, [Email]);
      if (result.length == 0) {
        resolve({ status: 404, data: "Not found User" });
      }

      const result2 = await Query(sql2, [Room, Film_Id]);
      if (result2.length == 0) {
        resolve({ status: 404, data: "Not found View" });
      }

      resolve({ status: 200, data: { Access_Token, Name, User_id } });
    } catch (err) {
      reject(err);
    }
  });
};

const S_Get_Seats = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Room_Id, Film_Id, Time } = data;
      const sql = `SELECT seat_index,s.time FROM ticket t JOIN showtime s on t.showtime_id = s.id WHERE s.room_id = ? and s.film_id = ? `;
      const result = await Query(sql, [Room_Id, Film_Id]);
      if (result.length == 0) {
        resolve({ status: 404, data: "Not found User" });
      }
      let Seats = [];
      let TimeREQ = Date_Handle(Time);
      result.map((i) => {
        let Timedb = Date_Handle(i.Time);
        if (TimeREQ.year) {
        }
      });

      resolve({ status: 200, data: { Seats: result } });
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = { S_Create_Ticket, S_Get_Seats };
