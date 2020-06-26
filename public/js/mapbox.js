/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiaW5uYXllZHppbm92aWNoIiwiYSI6ImNrYnZmN2ZxMjA1aDIydXJ2b2xlZ3A1NnQifQ.z-HAzksHL94Ool8TJepuUw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/innayedzinovich/ckbvfhtoc03lp1iqyhineg9qq',
  scrollZoom: false,
  // center: [-73.006, 40.7128],
  // zoom: 8,
  // interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create and Add marker
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
