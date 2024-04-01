const showTimeModel = require("../Models/ShowTime");

class ShowTimeController {
  async index(req, res) {
    try {
      const filmId = req.params.filmId;
      if (!filmId) {
        res.status(400).send("No params");
      } else {
        const [result] = await showTimeModel.getShowTimes(filmId);
        res.json(result);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }

  async getForRoom(req, res) {
    try {
      const roomId = req.params.roomId;
      const mode = req.query.mode;
      if (!roomId) {
        res.status(400).send("No params");
      } else {
        if (mode === "brief") {
          const [result] = await showTimeModel.getBriefShowtimesForRoom(roomId);
          res.json(result);
        } else {
          const [result] = await showTimeModel.getShowTimesForRoom(roomId);
          res.json(result);
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }

  async addShowtime(req, res) {
    try {
      const data = req.body;
      const [result] = await showTimeModel.addShowtime(
        data.room_id,
        data.film_id,
        data.showtimes
      );
      res.json(result.affectedRows);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }
  async find(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send("No params");
      } else {
        const [result] = await showTimeModel.find(id);
        res.json(result);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send("No params");
      } else {
        const [result] = await showTimeModel.delete(id);
        res.json(result.affectedRows);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }
}

module.exports = new ShowTimeController();
