const Date_Handle = (date) => {
  const temp = new Date(date);
  return {
    hour: temp.getHours(),
    day: temp.getDate(),
    month: temp.getMonth(),
    year: temp.getFullYear(),
  };
};

const Get_Current_Date = () => {
  const temp = new Date();
  return {
    hour: temp.getHours(),
    day: temp.getDate(),
    month: temp.getMonth(),
    year: temp.getFullYear(),
  };
};

module.exports = { Date_Handle, Get_Current_Date };
