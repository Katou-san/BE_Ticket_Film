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

const S_Get_Ticket = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = "SELECT id FROM _user WHERE _email = ? ";
      const result = await Query(sql, [email]);
      if (result.length == 0) {
        resolve({ status: 200, message: "Not found user", data: [] });
      }
      const sql1 = `SELECT *,t.id as tiket_Id FROM ticket t join showtime s on t.showtime_id = s.id WHERE t.user_id = ?`;
      const result2 = await Query(sql1, [result[0].id]);
      let out = [];
      let now = [
        {
          id: 10,
          showtime_id: 10,
          user_id: 5,
          creation_time: "2024-03-28T13:45:22.000Z",
          seat_index: "test",
          room_id: 3,
          film_id: 8,
          time: "2024-03-27T11:43:42.000Z",
          tiket_Id: 36,
        },
      ];
      result2.map((row) => {
        if (Date_Handle(row.time).day >= new Date().getDate()) {
          now.push(row);
        } else {
          out.push(row);
        }
      });

      resolve({
        status: 200,
        message: "Get complete",
        data: [...now, ...out],
      });
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = { S_Create_Ticket, S_Get_Seats, S_Get_Ticket };
