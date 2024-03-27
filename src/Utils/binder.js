function filmBinder(data) {
    const { name, director, launchdate, time, description, poster, finishtime, actors, rated, categoryid } = data
    return [name, director, launchdate, time, description, poster, finishtime ? finishtime : null, actors, rated, categoryid];
}

module.exports = { filmBinder }