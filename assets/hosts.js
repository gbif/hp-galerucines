/*
This is just a crude example of what it means to write your own dataset page. This example is not meant to be used as is. It is just to show how you can insert whatever your heart desires.
*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const datasetKey = urlParams.get('taxonKey');
const datasetArticleElement = document.getElementById('insect-hosts-info');

/**
 * Uses GBIF Species API to get the scientific name associated with the taxonKey (datasetKey)
 * Adds the scientific name to the page
 * Compares the scientific name to the "Gelechiidae species name" column in the CSV and grabs the corresponding "Host full name" column values and add unique values to the page as a list
 * Uses GBIF Occurrence API to get the latitude and longitude of the occurrences of the taxonKey and adds markers to the map
 */

// const hostPlantsArray = await fetch(
//   '/assets/Gelechiidae_HostPlants_06May2024.csv'
// )
//   .then((response) => response.text())
//   .then((text) => {
//     let rows = text.split('\n');
//     rows.shift();
//     let hostPlantsArray = [];
//     rows.forEach((row) => {
//       let columns = row.split(',');
//       if (columns[1].includes(dataset.scientificName)) {
//         hostPlantsArray.push(columns[0]);
//       }
//     });
//     return hostPlantsArray;
//   });

if (datasetKey) {
  fetch(`https://api.gbif.org/v1/species/${datasetKey}/name`)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      // datasetArticleElement.innerHTML = datasetTemplate(jsonResponse);

      const hostPlantsArray = [];

      // Read /_data/csv/Gelechiidae_HostPlants_06May2024.csv
      // Find all rows where column "Gelechiidae species name" contains datasetKey.scientificName
      // Grab corresponding column "Host full name" and add to hostPlantsArray
      // Print hostPlantsArray as list elements inside of ul id=host-plants-list
      fetch('/assets/Gelechiidae_HostPlants_06May2024.csv')
        .then((response) => response.text())
        .then((text) => {
          let rows = text.split('\n');
          // skip the first row (header)
          rows.shift();

          console.log(jsonResponse.scientificName);

          rows.forEach((row) => {
            let columns = row.split(',');
            // Matches only scientific name without authorship in spreadsheet
            if (columns[1] && columns[1].includes(jsonResponse.canonicalName)) {
              // hostPlantsArray.push(columns[0]);
              // also add to each plant the corresponding "COL taxon page" url
              hostPlantsArray.push({ name: columns[0], url: columns[4] });
            }
          });
          let hostPlantsList = document.getElementById('host-plants-list');
          console.dir({ ...jsonResponse, hostPlantsArray });
          datasetArticleElement.innerHTML = datasetTemplate({
            ...jsonResponse,
            hostPlantsArray,
          });

          // hostPlantsArray.forEach((hostPlant) => {
          // let li = document.createElement('li');
          // li.textContent = hostPlant;
          // hostPlantsList.appendChild(li);
          // });
        })
        .catch((error) => {
          console.log(error);
        });
      datasetArticleElement.innerHTML = datasetTemplate(jsonResponse);
    })
    .catch(function (err) {
      console.log(err);
    });
} else {
  alert('no such dataset found');
}

// datasetArticleElement.innerHTML = datasetTemplate(datasetKey);

// /** Map */

// // set up the map
let L = window.L;
var map = L.map('insect-hosts-map');

// // adds base tile layer with attribution
const osmAttrib =
  'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
let osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let osm = new L.TileLayer(osmUrl, { attribution: osmAttrib });

// // set the map view to a given center and zoom
map.setView(new L.LatLng(-20, -50), 1);
map.addLayer(osm);

// // set insect layer options
const insectLayerOptions = {
  style: 'fire.point',
  taxonKey: datasetKey,
  icon: '/assets/images/moth.png',
};

// set plants layer options (need to get the taxonKeys from spreadsheet)
const plantLayerOptions = {
  style: 'fire.point',
  taxonKey: datasetKey,
  icon: '/assets/images/plant.png',
};

let gbifAttrib = '<a href="https://www.gbif.org">GBIF</a>';

/**
 * Using Map API to get the insect density layer
 */
// let gbifUrl =
//   'https://api.gbif.org/v2/map/occurrence/density/{z}/{y}/{y}@1x.png?style=' +
//   insectLayerOptions.style +
//   '$srs=EPSG:4326&taxonKey=' +
//   insectLayerOptions.taxonKey;

// let gbifOverlay = L.tileLayer(gbifUrl, {
//   minZoom: 1,
//   maxZoom: 30,
//   zoomOffset: -1,
//   tileSize: 512,
//   attribution: gbifAttrib,
// });

// map.addLayer(gbifOverlay);

// Creating moth icon
let mothIcon = L.icon({
  iconUrl: insectLayerOptions.icon,
  iconSize: [50], // size of the icon
});

// Creating plant icon
let plantIcon = L.icon({
  iconUrl: '/assets/images/plant.png',
  iconSize: [50], // size of the icon
});

// /**
//  * Using Occurrence API to get "markers"
//  */
let mothPoints =
  'https://api.gbif.org/v1/occurrence/search?acceptedTaxonKey=' +
  insectLayerOptions.taxonKey +
  '&limit=1000';

// // for every object inside results, create a marker (use decimalLatitude and decimalLongitude)
fetch(mothPoints)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonResponse) {
    let results = jsonResponse.results;
    for (let i = 0; i < results.length; i++) {
      // if lat and lng are null, skip
      if (!results[i].decimalLatitude || !results[i].decimalLongitude) {
        continue;
      }
      let lat = results[i].decimalLatitude;
      let lng = results[i].decimalLongitude;
      let marker = L.marker([lat, lng], { icon: mothIcon }).addTo(map);
    }
  })
  .catch(function (err) {
    console.log(err);
  });
