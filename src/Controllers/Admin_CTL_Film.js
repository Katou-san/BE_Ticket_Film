const filmModel = require("../Models/Film");
const ApiError = require("../Utils/ApiError");

class FilmController {
  // GET: /api/v1/admin/films
  async index(req, res, next) {
    try {
      const query = req.query.q;
      let result = null;
      if (!query) {
        const [data] = await filmModel.getFilms();
        result = data;
      } else {
        const [data] = await filmModel.searchByName(query);
        result = data;
      }
      if (result === null) {
        return next(new ApiError("Database was not connected properly"));
      } else res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // POST: /api/v1/admin/films
  async create(req, res, next) {
    try {
      const clientData = req.body;
      clientData.poster = req.file.filename;
      if (clientData.poster) {
        console.log(req.file);
        console.log("not found img");
      }

      const [result] = await filmModel.createFilm(clientData);
      if (result === null) {
        return next(new ApiError("Database was not connected properly"));
      } else res.json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  // PUT: /api/v1/admin/films/{id}
  async update(req, res, next) {
    try {
      const clientData = req.body;
      const id = req.params.id;
      clientData.poster = req.file?.filename ?? "";
      if (!id) {
        return next(new ApiError("Request requires parameters", 400));
      } else {
        const [result] = await filmModel.updateFilm(id, clientData);
        if (result === null) {
          return next(new ApiError("Database was not connected properly"));
        } else res.json(result.affectedRows);
      }
    } catch (err) {
      next(err);
    }
  }

  // DELETE: /api/v1/admin/films/:id
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        return next(new ApiError("Request requires parameters", 400));
      } else {
        const [result] = await filmModel.deleteFilm(id);
        if (result === null) {
          return next(new ApiError("Database was not connected properly"));
        } else res.json(result.affectedRows);
      }
    } catch (err) {
      if (
        err.code === "ER_ROW_IS_REFERENCED_2" ||
        err.code === "ER_ROW_IS_REFERENCED"
      ) {
        err.message = "Can not delete because of its constraint";
      }
      next(err);
    }
  }

  // GET: /api/v1/admin/films/:id
  async find(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        return next(new ApiError("Request requires parameters", 400));
      } else {
        const [result] = await filmModel.find(id);
        if (result === null) {
          return next(new ApiError("Database was not connected properly"));
        } else res.json(result);
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new FilmController();
