const filmModel = require("../Models/Film");
class FilmController {
  // GET: /api/v1/admin/films
  async index(req, res) {
    try {
      const query = req.query.id;
      if (!query) {
        const [result] = await filmModel.getFilms();
        res.json(result);
      } else {
        const [result] = await filmModel.searchByName(query);
        if (result === null) {
          res.status(500).send("No connection");
        } else res.json(result);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }

  // POST: /api/v1/admin/films
  async create(req, res) {
    try {
      const clientData = req.body;
      clientData.poster = req.file.filename;
      const [result] = await filmModel.createFilm(clientData);
      if (result === null) {
        res.status(500).send("No connection");
      } else res.json(result.affectedRows);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }

  // PUT: /api/v1/admin/films/{id}
  async update(req, res) {
    try {
      const clientData = req.body;
      const id = req.params.id;
      clientData.poster = req.file?.filename ?? "";
      if (!id) {
        res.status(400).send("No params");
      } else {
        const [result] = await filmModel.updateFilm(id, clientData);
        if (result === null) {
          res.status(500).send("No connection");
        } else res.json(result.affectedRows);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }

  // DELETE: /api/v1/admin/films/:id
  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) res.status(400).send("No params");
      else {
        const [result] = await filmModel.deleteFilm(id);
        if (result === null) {
          res.status(500).send("No connection");
        } else res.json(result.affectedRows);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }

  // GET: /api/v1/admin/films/:id
  async find(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send("No params");
      } else {
        const [result] = await filmModel.find(id);
        if (result === null) {
          res.status(500).send("No connection");
        } else res.json(result);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }
}

module.exports = new FilmController();
