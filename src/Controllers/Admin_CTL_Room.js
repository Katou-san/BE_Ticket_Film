const roomModel = require("../Models/Room");
const ApiError = require("../Utils/ApiError");

class Room {
  // GET: /api/v1/admin/rooms
  async index(req, res, next) {
    try {
      const [result] = await roomModel.getRooms();
      if (result === null) {
        return next(new ApiError("Database was not connected properly"));
      } else res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // POST: /api/v1/admin/rooms
  async create(req, res, next) {
    try {
      const clientData = req.body;
      const [result] = await roomModel.createRoom(clientData);
      if (result === null) {
        return next(new ApiError("Database was not connected properly"));
      } else res.json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  // PUT: /api/v1/admin/rooms/{id}
  async update(req, res, next) {
    try {
      const clientData = req.body;
      const id = req.params.id;
      if (!id) {
        return next(new ApiError("No nesscessary parameters for request", 400));
      } else {
        const [result] = await roomModel.updateRoom(id, clientData);
        if (result === null) {
          return next(new ApiError("Database was not connected properly"));
        } else res.json(result.affectedRows);
      }
    } catch (err) {
      next(err);
    }
  }

  // DELETE: /api/v1/admin/rooms/:id
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        return next(new ApiError("No nesscessary parameters for request", 400));
      } else {
        const [result] = await roomModel.deleteRoom(id);
        if (result === null) {
          return next(new ApiError("Database was not connected properly"));
        } else res.json(result.affectedRows);
      }
    } catch (err) {
      next(err);
    }
  }

  // GET: /api/v1/admin/rooms/:id
  async find(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        return next(new ApiError("No nesscessary parameters for request", 400));
      } else {
        const [result] = await roomModel.find(id);
        if (result === null) {
          return next(new ApiError("Database was not connected properly"));
        } else res.json(result);
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new Room();
