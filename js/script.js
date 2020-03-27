const DISCOGS_KEY = "lmHMrXMWZaAtkzwgalXl";
const DISCOGS_SECRET = "drPXsLZeQZHAOgmmAULbfLWonoevPqzEn";
const APISEEDS_APIKEY =
  "WXsdZU05A1HmmgWlFxeEyaRjlYYp2wvpm3gjAwV3TQjaRJ2oHXcdjTg2rBPBh1a9";

const DISCOGS_QUERYURL = (genre, key, secret) =>
  `https://api.discogs.com/database/search?genre=${genre}&per_page=10&page=1&key=${key}&secret=${secret}`;
const APISEEDS_QUERYURL = (artist, track, apikey) =>
  `https://orion.apiseeds.com/api/music/lyric/${artist}/${track}?apikey=${apikey}`;

function fetchDiscogsData(genre) {
  // We have to append a user-agent as describe in Discogs API Documents
  // https://www.discogs.com/developers#page:home,header:home-general-information
  const Header = new Headers();
  Header.append("User-Agent", "LyricalGenius/0.1");

  const requestOptions = {
    method: "GET",
    headers: Header,
    redirect: "follow"
  };

  return fetch(
    DISCOGS_QUERYURL(genre, DISCOGS_KEY, DISCOGS_SECRET),
    requestOptions
  )
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.error(error));
}

function fetchLyricData(artist, track) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  return fetch(
    APISEEDS_QUERYURL(artist, track, APISEEDS_APIKEY),
    requestOptions
  )
    .then(response => response.text())
    .then(result => result)
    .catch(error => console.log("error", error));
}

console.log(fetchDiscogsData("Hip Hop"));
console.log(fetchLyricData("Post Malone", "rockstar"));

// Modal
function toggleModal(element) {
  document.documentElement.classList.toggle("is-clipped");
  element.classList.toggle("is-active");
}

// Close Events
document
  .querySelectorAll(".modal-background, .modal-close", ".close")
  .forEach(function(el) {
    el.addEventListener("click", function() {
      toggleModal(musicModal);
    });
  });

const musicModal = document.getElementById("music-modal");
const musicBtn = document.getElementById("music-modalBtn");

musicBtn.addEventListener("click", function() {
  toggleModal(musicModal);
});

function createRow(track, artist, coverArt, artistArt) {
  const box = document.createElement("div");

  box.className = "box has-background-black has-text-white";

  let content = ` <article class="media">
  <div class="media-left">
    <figure class="image is-96x96">
      <img src="${coverArt}" class="is-rounded" alt="Image">
    </figure>

  </div>
  <div class="media-content">
    <h5 class="trackName">${track}</h5>
    <br>
    <h5 class="artistName">${artist}</h5>
  </div>

  <figure class="image is-128x128">
    <img src="${artistArt}" class="" alt="Image">
  </figure>`;

  rows.appendChild(box);
}
