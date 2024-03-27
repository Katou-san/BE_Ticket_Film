const { Connection: db } = require("../Config/Connect_mysql");

class ShowTime {
  async getShowTimes(filmId) {
    try {
      const con = await db.connect();
      return con.execute(
        "SELECT id, time, film_id, room.name FROM showtime JOIN room ON room_id = room.id WHERE film_id = ?",
        [filmId]
      );
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }
  async getShowTimesForRoom(roomId) {
    try {
      const con = await db.connect();
      const sql =
        "SELECT showtime.time AS stime, film.time AS ftime FROM showtime JOIN film ON film.id = showtime.film_id WHERE room_id = ?";
      return con.execute(sql, [roomId]);
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }
}

module.exports = new ShowTime();
