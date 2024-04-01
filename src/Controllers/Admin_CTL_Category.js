const categoryModel = require("../Models/Category");
const ApiError = require("../Utils/ApiError");

class CategoryController {
  async index(req, res, next) {
    try {
      const [result] = await categoryModel.getCategories();
      if (result === null) {
        return next(new ApiError("Database was not connected properly"));
      } else res.json(result);
    } catch (err) {
      next(err);
    }
  }
  async create(req, res, next) {
    try {
      const name = req.body.name;
      const [result] = await categoryModel.createCategory(name);
      if (result === null) {
        return next(new ApiError("Database was not connected properly"));
      } else res.json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        return next(new ApiError("No nesscessary parameters for request", 400));
      }
      const [result] = await categoryModel.deleteCategory(id);
      if (result === null) {
        return next(new ApiError("Database was not connected properly"));
      } else res.json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        return next(new ApiError("No nesscessary parameters for request", 400));
      }
      const name = req.body.name;
      const [result] = await categoryModel.updateCategory(id, name);
      if (result === null) {
        return next(new ApiError("Database was not connected properly"));
      } else res.json(result.affectedRows);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CategoryController();
