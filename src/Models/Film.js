const { Connection: db } = require("../Config/Connect_mysql");
const binder = require("../Utils/binder");

class Film {
  async getFilms() {
    try {
      await db.connect();
      return db.query(
        "select f.*, count(s.id) as showtime_count from film f left join showtime s on f.id = s.film_id group by f.id"
      );
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }

  async createFilm(filmData) {
    try {
      const sql =
        "INSERT INTO film(name, director, launch_date, time, description, poster, finish_date, actors, rated, category_id) VALUES(?,?,?,?,?,?,?,?,?,?)";
      const values = binder.filmBinder(filmData);
      await db.connect();
      return db.execute(sql, values);
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }
  async deleteFilm(id) {
    try {
      const sql = "DELETE FROM film WHERE id = ?";
      await db.connect();
      return db.execute(sql, [id]);
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }
  async updateFilm(id, data) {
    try {
      let sql = "";

      // có file gửi đến thì cập nhật, ko thì giữ nguyên
      if (data.poster) {
        sql =
          "UPDATE film SET name = ?, director = ?, launch_date = ?, time = ?, description = ?, poster = ?, finish_date = ?, actors = ?, rated = ?, category_id = ? WHERE id = ?";
      } else {
        sql =
          "UPDATE film SET name = ?, director = ?, launch_date = ?, time = ?, description = ?, finish_date = ?, actors = ?, rated = ?, category_id = ? WHERE id = ?";
      }
      await db.connect();
      let values = binder.filmBinder(data);
      values.push(id);
      if (!data.poster) {
        values.splice(5, 1); // bỏ giá trị của poster ra
      }
      return db.execute(sql, values);
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }

  async find(id) {
    try {
      const sql = "SELECT * FROM film WHERE id = ?";
      await db.connect();
      const [result, field] = await db.execute(sql, [id]);
      return [result[0], field];
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }

  async searchByName(query) {
    try {
      const sql = "SELECT * FROM film WHERE name like = ?";
      await db.connect();
      return db.execute(sql, [`%${query}%`]);
    } catch (err) {
      console.log(err);
      return Promise.resolve([null, null]);
    }
  }
}

module.exports = new Film();
