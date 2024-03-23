const { Date_Handle } = require("../Utils/Handle_Date");
const { Query } = require("../Utils/Fun_SQL");

const S_Create_Ticket = (data, Email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Time, Film_Id, Price, Quantity, Room_Id, Seats } = data;
      const sql = `SELECT id FROM _user WHERE _email = ?`;

      const result = await Query(sql, [Email]);
      if (result.length == 0) {
        resolve({ status: 404, message: "Not found User" });
      }

      const sql2 = `SELECT id FROM showtime WHERE room_id = ? AND film_id=? and time = ? `;
      const result2 = await Query(sql2, [Room_Id, Film_Id, new Date(Time)]);
      if (result2.length == 0) {
        resolve({ status: 404, message: "Not found showtime" });
      }

      const sql3 =
        "Insert into ticket (showtime_id,user_id,creation_time,seat_index) Values(?,?,?,?)";

      let result3;
      if (Quantity === Seats.length) {
        result3 = Seats.map(async (seat) => {
          await Query(sql3, [result2[0].id, result[0].id, new Date(), seat]);
        });

        resolve({ status: 200, message: "Pay ticket Success" });
      }

      resolve({ status: 200, message: "Cant Pay Ticket" });
    } catch (err) {
      reject(err);
    }
  });
};

const S_Get_Seats = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Room_Id, Film_Id, Time } = data;

      const sql = `SELECT seat_index,s.time FROM ticket t JOIN showtime s on t.showtime_id = s.id WHERE s.room_id = ? and s.film_id = ? and s.time = ?`;
      const result = await Query(sql, [Room_Id, Film_Id, new Date(Time)]);
      if (result.length == 0) {
        resolve({ status: 404, data: "Empty" });
      }
      let Seats = [];
      result.map((i) => {
        Seats.push(i.seat_index);
      });

      resolve({ status: 200, data: { Seats: Seats } });
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = { S_Create_Ticket, S_Get_Seats };
