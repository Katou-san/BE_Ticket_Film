const { Connection } = require("../Config");
const Select = (Callback, From, Where) => {
  return `select ${Callback == "all" ? "*" : Callback} 
  from ${From} 
  ${Where ? `where` + Where : ""}`;
};

const Query = async (sql, Array) => {
  const [rows] = await Connection.query(sql, Array);
  return rows;
};

module.exports = { Select, Query };
