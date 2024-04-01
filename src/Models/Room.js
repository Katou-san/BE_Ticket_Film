const { Connection: db } = require("../Config/Connect_mysql");

class Room {
  async getRooms() {
    try {
      await db.connect();
      return db.query(
        "select r.id, r.name, r.seats, count(s.id) as showtime_count from room r left join showtime s on  r.id = s.room_id group by r.id, r.name, r.seats"
      );
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }

  async createRoom(data) {
    try {
      await db.connect();
      const sql = "INSERT INTO room(name, seats) VALUES(?, ?)";
      const values = [data.name, data.seats];
      return db.execute(sql, values);
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }
  async deleteRoom(id) {
    try {
      await db.connect();
      const sql = "DELETE FROM room WHERE id = ?";
      const values = [id];
      return db.execute(sql, values);
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }
  async updateRoom(id, data) {
    try {
      await db.connect();
      const sql = "UPDATE room SET name = ?, seats = ? WHERE id = ?";
      const values = [data.name, data.seats, id];
      return db.execute(sql, values);
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }
  async find(id) {
    try {
      await db.connect();
      const sql = "SELECT * FROM room WHERE id = ?";
      const [result, field] = await db.execute(sql, [id]);
      return [result[0], field];
    } catch (err) {
      console.log(err);
      return [null, null];
    }
  }
}

module.exports = new Room();
