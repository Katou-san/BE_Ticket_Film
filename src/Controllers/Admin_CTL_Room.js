const roomModel = require("../Models/Room");

class Room {
  // GET: /api/v1/admin/films
  async index(req, res) {
    try {
      const [result] = await roomModel.getRooms();
      if (result === null) {
        res.status(500).send("No connection");
      } else res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }

  // POST: /api/v1/admin/films
  async create(req, res) {
    try {
      const clientData = req.body;
      const [result] = await roomModel.createRoom(clientData);
      if (result === null) {
        res.status(500).send("No connection");
      } else return res.json(result.affectedRows);
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  }

  // PUT: /api/v1/admin/films/{id}
  async update(req, res) {
    try {
      const clientData = req.body;
      const id = req.params.id;
      if (!id) {
        res.status(400).send("No params");
      } else {
        const [result] = await roomModel.updateFilm(id, clientData);
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
        const [result] = await roomModel.deleteFilm(id);
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
      if (!id) res.status(400).send("No params");
      else {
        const [result] = await roomModel.find(id);
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

module.exports = new Room();
