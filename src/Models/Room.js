const { Connection: db } = require("../Config/Connect_mysql");

class Room {
  async getRooms() {
    try {
      const con = await db.connect();
      return con.query("SELECT * FROM room");
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }

  async createRoom(data) {
    try {
      const con = await db.connect();
      const sql = "INSERT INTO room(name, seats) VALUES(?, ?)";
      const values = [data.name, data.seats];
      return con.execute(sql, values);
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }
  async deleteRoom(id) {
    try {
      const con = await db.connect();
      const sql = "DELETE FROM room WHERE id = ?";
      const values = [id];
      return con.execute(sql, values);
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }
  async updateRoom(id, data) {
    try {
      const con = await db.connect();
      const sql = "UPDATE room SET name = ?, seats = ? WHERE id = ?";
      const values = [data.name, data.seats, id];
      return con.execute(sql, values);
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }
  async find(id) {
    try {
      const con = await db.connect();
      const sql = "DELETE FROM room WHERE id = ?";
      const [result, field] = await con.execute(sql, [id]);
      return [result[0], field];
    } catch (err) {
      console.log(err);
      return [null, null];
    }
  }
}

module.exports = new Room();
