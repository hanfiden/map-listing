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
              list: marker.info_list
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
          'circle-stroke-width': 1,
        }
      })

      map.on('moveend', () => {
        const features = map.queryRenderedFeatures({ layers: ['markers'] });
        // console.log(features)
        const popup = new mapboxgl.Popup({
        });

        // Clear any existing listings
        listingEl.innerHTML = '';

        if (features.length) {
          for (const feature of features) {
            const itemLink = document.createElement('div')
            itemLink.className = 'brand__card';
            itemLink.innerHTML = feature.properties.list;
            itemLink.addEventListener('mouseenter', () => {
              // Highlight corresponding feature on the map
              popup
                .setLngLat(feature.geometry.coordinates)
                .setHTML(feature.properties.window)
                .addTo(map);
            });

            itemLink.addEventListener('mouseleave', () => {
              // Highlight corresponding feature on the map
              popup.remove(map)
            });

            listingEl.appendChild(itemLink);
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

      const markerItem = document.createElement('div')
      markerItem.className = 'brand__card';
      markerItem.innerHTML = marker.info_list;
      listingEl.appendChild(markerItem);
    });

    mapText.textContent = 'Déplacez sur la carte pour voir les résultats';
    fitMapToMarkers(map, markers);
  }
};

export { initMapbox };
