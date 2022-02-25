import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([marker.lng, marker.lat]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 12, duration: 10 });
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [2.209666999999996, 46.232192999999995],
      zoom: 5,
      doubleClickZoom: false
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

      result_marker.getElement().addEventListener('click', (e) => {
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
