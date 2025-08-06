let light = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
});
let dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; CartoDB'
});

let map = L.map('map', {
  center: [47.5, -120.5],
  zoom: 7,
  layers: [light]
});

let currentBase = 'light';
document.getElementById('themeToggle').onclick = () => {
  if (currentBase === 'light') {
    map.removeLayer(light);
    map.addLayer(dark);
    currentBase = 'dark';
  } else {
    map.removeLayer(dark);
    map.addLayer(light);
    currentBase = 'light';
  }
};

// Load lake GeoJSON
fetch('lakes.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        layer.bindPopup(\`<b>\${feature.properties.name}</b><br>Sample depth: \${feature.properties.depth} ft\`);
      },
      style: {
        color: '#3399ff',
        weight: 2
      }
    }).addTo(map);
  });
