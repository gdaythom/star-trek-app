const stripHtml = (text) => {
  return text;
}

/*
  DEPRECATED
  Format the JSON of a show so it can go nicely into a SectionList.
*/
const formatShowData = (show) => {
  let dataShow = [];
  show.seasons.forEach((season, index) => {
    let dataSeason = {};
    season.results.forEach((episode, index) => {
      if(index === 0) {
        dataSeason['season'] = episode
        dataSeason.data = [];
      } else { 
        dataSeason.data.push(episode);
      }
    });
    dataShow.push(dataSeason);
  });
  return dataShow;
}
/*
  Format the JSON of a show season so it can go nicely into a SectionList.
*/
const formatSeasonData = (season) => {
  let dataShow = [];
  let dataSeason = {};
  season.results.forEach((episode, index) => {
    if(index === 0) {
      dataSeason['season'] = episode
      dataSeason.data = [];
    } else { 
      dataSeason.data.push(episode);
    }
  });
  dataShow.push(dataSeason);
  return dataShow;
}

/*
  Get a random number in a provided range.
*/
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/*
  Get the season title from the show title
*/
const getShowSeasonTitle = (artist, collection) => {
  return collection.replace(`${artist}, `, '');
}

const getShowSeasonNumber = (artist, collection) => {
  return artist.replace(`${collection}, Season `, '');
}

const getSearchTerm = (term) => {
  return `https://google.com/search?q=${encodeURIComponent('watch '+term.toLowerCase())}`;
}

/*
  Get a year number from a provided ISO date.
*/
const getYear = (date) => {
  var d = new Date(date);
  return d.getFullYear();
}

const getDate = (date) => {
  var d = new Date(date);
  return d.toLocaleDateString('en-gb', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

const getShowRun = (show) => {
  const startDate = show.seasons[0].results[1].releaseDate;
  const lastSeason = show.seasons.length - 1;
  const lastEpisode = show.seasons[lastSeason].results.length - 1;
  const endDate = show.seasons[lastSeason].results[lastEpisode].releaseDate;
  return `${getYear(startDate)} — ${getYear(endDate)}`;
}

const getShowSeasonCount = (show) => {
  return show.seasons.length;
}

const getShowEpisodeCount = (show) => {
  var count = 0;
  show.seasons.forEach((season) => {
    count += (season.results.length - 1);
  });
  return count;
}

const getSeasonEpisodeCount = (season) => {
  return season.length - 1;
}

const getPlaylistEpisodeCount = (playlist) => {
  return playlist.data.length;
}

const getReleaseDate = (date) => {
  return getDate(date);
}

const getRuntime = (milliseconds) => {
  const episodeInMinutes = Math.floor(( milliseconds / 1000) / 60);
  const hours = Math.floor( episodeInMinutes / 60 );
  const episodeInHours = hours * 60;
  const minutes = episodeInMinutes - episodeInHours;
  return (hours) ? `${hours}h ${minutes}m` : `${minutes}m`;
}

const removeHtmlTags = (string) => {
  return string.replace(/(<([^>]+)>)/gi, "");
}

const getRandomEpisode = (seasons) => {
  const randomSeason = randomIntFromInterval(0, seasons.length - 1);
  let season = seasons[randomSeason];
  let episodes = season.results;
  const randomEpisode = randomIntFromInterval(1, episodes.length - 1);
  return episodes[randomEpisode];
}

export { stripHtml, formatSeasonData, getShowSeasonTitle, getShowSeasonNumber, getSearchTerm, getYear, getShowRun, getShowSeasonCount, getShowEpisodeCount, getPlaylistEpisodeCount, getSeasonEpisodeCount, getReleaseDate, getRuntime, removeHtmlTags, getRandomEpisode };