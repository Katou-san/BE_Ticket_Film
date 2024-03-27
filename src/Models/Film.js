const { Connection: db } = require("../Config/Connect_mysql");
const binder = require("../Utils/binder");

class Film {
  async getFilms() {
    try {
      const con = await db.connect();
      return con.query("SELECT * FROM film");
    } catch (err) {
      console.log("Error log from >>> models/Film/getFilms >>>", err);
      return Promise.resolve([null, null]);
    }
  }

  async createFilm(filmData) {
    try {
      const sql =
        "INSERT INTO film(name, director, launchdate, time, description, poster, finishtime, actors, rated, categoryid) VALUES(?,?,?,?,?,?,?,?,?,?)";
      const values = binder.filmBinder(filmData);
      const con = await db.connect();
      return con.execute(sql, values);
    } catch (err) {
      console.log("Error log from >>> models/Film/createFilm >>>", err);
      return Promise.resolve([null, null]);
    }
  }
  async deleteFilm(id) {
    try {
      const sql = "DELETE FROM film WHERE id = ?";
      const con = await db.connect();
      return con.execute(sql, [id]);
    } catch (err) {
      console.log("Error log from >>> models/Film/deleteFilm >>>", err);
      return Promise.resolve([null, null]);
    }
  }
  async updateFilm(id, data) {
    try {
      let sql = "";

      // có file gửi đến thì cập nhật, ko thì giữ nguyên
      if (data.poster) {
        sql =
          "UPDATE film SET name = ?, director = ?, launchdate = ?, time = ?, description = ?, poster = ?, finishtime = ?, actors = ?, rated = ?, categoryid = ? WHERE id = ?";
      } else {
        sql =
          "UPDATE film SET name = ?, director = ?, launchdate = ?, time = ?, description = ?, finishtime = ?, actors = ?, rated = ?, categoryid = ? WHERE id = ?";
      }
      const con = await db.connect();
      let values = binder.filmBinder(data);
      values.push(id);
      if (!data.poster) {
        values.splice(5, 1); // bỏ giá trị của poster ra
      }
      return con.execute(sql, values);
    } catch (err) {
      console.log("Error log from >>> models/Film/updateFilm >>>", err);
      return Promise.resolve([null, null]);
    }
  }
  async find(id) {
    try {
      const sql = "SELECT * FROM film WHERE id = ?";
      const con = await db.connect();
      const [result, field] = await con.execute(sql, [id]);
      return [result[0], field];
    } catch (err) {
      console.log("Error log from >>> models/Film/find >>>", err);
      return Promise.resolve([null, null]);
    }
  }

  async searchByName(query) {
    try {
      const sql = "SELECT * FROM film WHERE name like = ?";
      const con = await db.connect();
      return con.execute(sql, [`%${query}%`]);
    } catch (err) {
      console.log("Error log from >>> models/Film/searchByName >>>", err);
      return Promise.resolve([null, null]);
    }
  }
}

module.exports = new Film();
