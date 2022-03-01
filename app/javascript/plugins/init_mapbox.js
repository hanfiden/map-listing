import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([marker.lng, marker.lat]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 12, duration: 10 });
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');
  const listingEl = document.getElementById('feature-listing');
  const filterEl = document.getElementById('feature-filter');
  let brands = [];

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [2.209666999999996, 46.232192999999995],
      zoom: 5,
      doubleClickZoom: false
    });


    function renderListings(features) {
      const empty = document.createElement('p');
      // Clear any existing listings
      listingEl.innerHTML = '';
      if (features.length) {
        for (const feature of features) {
          const itemLink = document.createElement('a');
          const label = `${feature.properties.name} (${feature.properties.abbrev})`;
          itemLink.href = feature.properties.wikipedia;
          itemLink.target = '_blank';
          itemLink.textContent = label;
          itemLink.addEventListener('mouseover', () => {
            // Highlight corresponding feature on the map
            popup
              .setLngLat(feature.geometry.coordinates)
              .setText(label)
              .addTo(map);
          });
          listingEl.appendChild(itemLink);
        }

        // Show the filter input
        filterEl.parentNode.style.display = 'block';
      } else if (features.length === 0 && filterEl.value !== '') {
        empty.textContent = 'No results found';
        listingEl.appendChild(empty);
      } else {
        empty.textContent = 'Drag the map to populate results';
        listingEl.appendChild(empty);

        // Hide the filter input
        filterEl.parentNode.style.display = 'none';

        // remove features filter
        map.setFilter('brand', ['has', 'abbrev']);
      }
    }

    function normalize(string) {
      return string.trim().toLowerCase();
    }

    // Because features come from tiled vector data,
    // feature geometries may be split
    // or duplicated across tile boundaries.
    // As a result, features may appear
    // multiple times in query results.
    function getUniqueFeatures(features, comparatorProperty) {
      const uniqueIds = new Set();
      const uniqueFeatures = [];
      for (const feature of features) {
        const id = feature.properties[comparatorProperty];
        if (!uniqueIds.has(id)) {
          uniqueIds.add(id);
          uniqueFeatures.push(feature);
        }
      }
      return uniqueFeatures;
    }

    map.on('load', () => {
      map.addSource('brands', {
        'type': 'vector',
        'url': 'mapbox://mapbox.04w69w5j'
      });
      map.addLayer({
        'id': 'brand',
        'source': 'brands',
        'source-layer': 'ne_10m_airports',
        'type': 'circle',
        'paint': {
          'circle-color': '#4264fb',
          'circle-radius': 4,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      map.on('movestart', () => {
        // reset features filter as the map starts moving
        map.setFilter('brand', ['has', 'abbrev']);
      });

      map.on('moveend', () => {
        const features = map.queryRenderedFeatures({ layers: ['brand'] });

        if (features) {
          const uniqueFeatures = getUniqueFeatures(features, 'iata_code');
          // Populate features for the listing overlay.
          renderListings(uniqueFeatures);

          // Clear the input container
          filterEl.value = '';

          // Store the current features in sn `brands` variable to
          // later use for filtering on `keyup`.
          brands = uniqueFeatures;
        }
      });

      map.on('mousemove', 'brand', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates based on the feature.
        const feature = e.features[0];
        popup
          .setLngLat(feature.geometry.coordinates)
          .setText(
            `${feature.properties.name} (${feature.properties.abbrev})`
          )
          .addTo(map);
      });

      map.on('mouseleave', 'brand', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

      filterEl.addEventListener('keyup', (e) => {
        const value = normalize(e.target.value);

        // Filter visible features that match the input value.
        const filtered = [];
        for (const feature of brands) {
          const name = normalize(feature.properties.name);
          const code = normalize(feature.properties.abbrev);
          if (name.includes(value) || code.includes(value)) {
            filtered.push(feature);
          }
        }

        // Populate the sidebar with filtered results
        renderListings(filtered);

        // Set the filter to populate features into the layer.
        if (filtered.length) {
          map.setFilter('brand', [
            'match',
            ['get', 'abbrev'],
            filtered.map((feature) => {
              return feature.properties.abbrev;
            }),
            true,
            false
          ]);
        }
      });

      // Call this function on initialization
      // passing an empty array to render an empty state
      renderListings([]);
    });


    ////////////////// OPTIONS ON THE MAP ////////////////////
    const nav = new mapboxgl.NavigationControl()
    const full_screen = new mapboxgl.FullscreenControl({ container: document.querySelector('.body') })
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    })

    ////////////////// EVENTS ON THE MAP ////////////////////
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: true
      })
    ).addControl(nav)
     .addControl(geolocate)
     .addControl(full_screen);

    ////////////////// PARSE EACH DATA TO THE MAP ////////////////////
    const markers = JSON.parse(mapElement.dataset.markers);
    // console.log(markers)

    markers.forEach((marker) => {
      ////////////////// OPTIONS ON THE MARKER ////////////////////

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeOnClick: false
      })
        .setHTML(marker.info_window);

      const result_marker = new mapboxgl.Marker()
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(map)

      ////////////////// EVENTS ON THE MARKER ////////////////////
      result_marker.getElement().addEventListener('mouseenter', () => {
        result_marker.togglePopup();
      });

      result_marker.getElement().addEventListener('mouseleave', () => {
        result_marker.togglePopup()
        // popup.remove(map)
      });

      result_marker.getElement().addEventListener('click', () => {
        map.flyTo({
          center: [marker.lng, marker.lat],
          zoom: 12
        });
      });
    });

    fitMapToMarkers(map, markers);
  }
};

export { initMapbox };
