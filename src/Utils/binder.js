function filmBinder(data) {
  const {
    name,
    director,
    launch_date,
    time,
    description,
    poster,
    finish_date,
    actors,
    rated,
    category_id,
  } = data;
  return [
    name,
    director,
    launch_date,
    time,
    description,
    poster,
    finish_date ? finish_date : null,
    actors,
    rated,
    category_id,
  ];
}

function showTimeBinder(roomId, filmId, showTimes = []) {
  const data = showTimes.map((s) => {
    return [roomId, filmId, s.time, s.price];
  });
  return data;
}

module.exports = { filmBinder, showTimeBinder };
