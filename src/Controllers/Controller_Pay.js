const axios = require("axios").default; // npm install axios
const CryptoJS = require("crypto-js");

const Pay = (req, res) => {
  let reqtime = Date.now();
  let params = {
    appid: config.appid,
    reqtime: reqtime, // miliseconds
    mac: CryptoJS.HmacSHA256(
      config.appid + "|" + reqtime,
      config.key1
    ).toString(),
  };

  axios
    .get(config.endpoint, { params })
    .then((res) => {
      let banks = res.data.banks;
      for (let id in banks) {
        let banklist = banks[id];
        console.log(id + ".");
        for (let bank of banklist) {
          console.log(bank);
        }
      }
    })
    .catch((err) => console.error(err));
};

module.exports = { Pay };
