const categoryModel = require("../Models/Category");

class CategoryController {
  async index(req, res) {
    try {
      const [result] = await categoryModel.getCategories();
      res.json(result);
    } catch (err) {
      console.log(
        "Error's thrown at CategoryRouter/index.js/router.get: ",
        err
      );
    }
  }
}

module.exports = new CategoryController();
