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
      if (!roomId) {
        res.status(400).send("No params");
      } else {
        const [result] = await showTimeModel.getShowTimesForRoom(roomId);
        res.json(result);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  }
}

module.exports = new ShowTimeController();
