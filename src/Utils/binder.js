function filmBinder(data) {
  const {
    name,
    director,
    launchdate,
    time,
    description,
    poster,
    finishtime,
    actors,
    rated,
    categoryid,
  } = data;
  return [
    name,
    director,
    launchdate,
    time,
    description,
    poster,
    finishtime ? finishtime : null,
    actors,
    rated,
    categoryid,
  ];
}

function showTimeBinder(roomId, filmId, showTimes = []) {
  const data = showTimes.map((s) => {
    return [roomId, filmId, s.time, s.price];
  });
  return data;
}

module.exports = { filmBinder, showTimeBinder };
