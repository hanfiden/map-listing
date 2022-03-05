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
  const mapText = document.getElementById('mapText');
  const markers = JSON.parse(mapElement.dataset.markers);

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [2.209666999999996, 46.232192999999995],
      zoom: 5
    });

    ////////////////// OPTIONS ON THE MAP ////////////////////
    const nav = new mapboxgl.NavigationControl()
    const full_screen = new mapboxgl.FullscreenControl({ container: document.querySelector('.main') })
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

    ////////////////// AJAX LISTING ////////////////////
    map.on('load', function () {
      const geojson =
      {
        type: 'FeatureCollection',
        features: markers.map((marker) => (
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [marker.lng, marker.lat]
            },
            properties: {
              window: marker.info_window,
              list: marker.info_list,
              coordinate: [marker.lng, marker.lat]
            }
          }))
      };
      // console.log(geojson)

      map.addSource("markers", {
        type: "geojson",
        data: geojson
      });

      map.addLayer({
        id: "markers",
        type: "circle",
        source: "markers",
        paint: {
          'circle-radius': 1,
          'circle-stroke-width': 0
        }
      })

      map.on('moveend', () => {
        const features = map.queryRenderedFeatures({ layers: ['markers'] });
        // Clear any existing listings
        listingEl.innerHTML = '';
        // console.log(features)

        const popup = new mapboxgl.Popup({
          offset: 25
        });

        if (features.length) {
          // Get all coord points to calculate the nearest distance between brand and center layer
          const points = turf.featureCollection(features.map(feature => turf.point(JSON.parse(feature.properties.coordinate))));
          // console.log(points)
          const nearest = turf.nearestPoint(turf.point(map.getCenter().toArray()), points);
          // console.log(nearest.geometry.coordinates)
          // console.log(features)

          for (const feature of features) {
            const itemLink = document.createElement('div')
            itemLink.className = 'brand__card';
            itemLink.innerHTML = feature.properties.list;

            // Check the condition of which feature coord is the same as the nearest coord
            if (JSON.parse(feature.properties.coordinate)[0] ===  nearest.geometry.coordinates[0]) {
              // Add on first div when nearest to the center
              listingEl.prepend(itemLink)
            } else {
              listingEl.appendChild(itemLink);
            }

            itemLink.addEventListener('mouseenter', () => {
              // Highlight corresponding feature on the map
              popup
                .setLngLat(feature.geometry.coordinates)
                .setHTML(feature.properties.window)
                .addTo(map);
            });

            itemLink.addEventListener('mouseleave', () => {
              popup.remove(map)
            });
          }
        }
      });
    });

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
        markerItem.classList.add('active-card')
      });

      result_marker.getElement().addEventListener('mouseleave', () => {
        result_marker.togglePopup()
        markerItem.classList.remove('active-card')
        // popup.remove(map)
      });

      result_marker.getElement().addEventListener('click', () => {
        map.flyTo({
          center: [marker.lng, marker.lat],
          zoom: 12
        });
      });

      // Set default markers with ajax
      const markerItem = document.createElement('div')
      markerItem.className = 'brand__card';
      markerItem.innerHTML = marker.info_list;
      listingEl.appendChild(markerItem);

      markerItem.addEventListener('mouseenter', () => {
        // Highlight corresponding feature on the map
        popup
          .setLngLat([marker.lng, marker.lat])
          .addTo(map);
      });

      markerItem.addEventListener('mouseleave', () => {
        // Highlight corresponding feature on the map
        popup.remove(map)
      });
    });

    mapText.textContent = 'Déplacez sur la carte pour voir les résultats';
    fitMapToMarkers(map, markers);
  }
};

export { initMapbox };
