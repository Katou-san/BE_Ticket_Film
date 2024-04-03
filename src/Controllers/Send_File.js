const path = require("path");

const Send_Image_Film = async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = { root: path.join(__dirname, "../../public/images") };
    return res.sendFile(`${id}`, filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(404).json({ stats: 404, message: err.message });
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = { Send_Image_Film };
