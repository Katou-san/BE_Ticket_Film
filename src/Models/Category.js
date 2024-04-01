const { Connection: db } = require("../Config/Connect_mysql");

class Category {
  async getCategories() {
    try {
      await db.connect();

      return db.query(
        "select c.*, count(f.id) as film_count from category c left join film f on c.id = f.category_id group by c.id"
      );
    } catch (err) {
      return Promise.resolve([null, null]);
    }
  }
  async createCategory(name) {
    try {
      await db.connect();
      return db.execute("INSERT INTO category(name) VALUES(?)", [name]);
    } catch (err) {
      return Promise.resolve([null, null]);
    }
  }
  async deleteCategory(id) {
    try {
      await db.connect();
      return db.execute("DELETE FROM category WHERE id = ?", [id]);
    } catch (err) {
      return Promise.resolve([null, null]);
    }
  }
  async updateCategory(id, name) {
    try {
      await db.connect();
      return db.execute("UPDATE category SET name = ? WHERE id = ?", [
        name,
        id,
      ]);
    } catch (err) {
      return Promise.resolve([null, null]);
    }
  }
  async find(id) {
    try {
      await db.connect();
      const [result, field] = await db.execute(
        "SELECT * FROM category WHERE id = ?",
        [id]
      );
      return [result[0], field];
    } catch (err) {
      return [null, null];
    }
  }
}

module.exports = new Category();
