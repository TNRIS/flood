
/**
 * Leaflet 
 * @param {[type]} leafletMap [description]
 */
const GeolocationControl = (leafletMap) => {
  const geolocationOptions = {
    watch: false,
    setView: false,
    maximumAge: 10000,
    enableHighAccuracy: true
  }
  
  const trackLocationButton = L.easyButton({
    states: [{
      stateName: 'location-off',
      icon: '<i class="material-icons geolocate-icon" style="font-size: 22px;">location_off</i>',
      title: 'Track my location',
      onClick: (control) => {
        control.state('location-on')
        leafletMap.locate({...geolocationOptions, watch: true})
      }
    }, {
      stateName: 'location-on',
      icon: '<i class="material-icons geolocate-icon location-on-button" style="font-size: 22px;">location_on</i>',
      title: 'Track my location',
      onClick: (control) => {
        control.state('location-off')
        leafletMap.stopLocate()
      }
    }]
  }).disable()

  const geolocateButton = L.easyButton({
    states: [{
      icon: '<i class="material-icons geolocate-icon" style="font-size: 22px;">my_location</i>',
      title: 'Find my location',
      onClick: () => {
        leafletMap.closePopup()
        trackLocationButton.enable()
        leafletMap.locate(geolocationOptions)
      }
    }]
  })

  const locateToolbar = L.easyBar([geolocateButton, trackLocationButton], {
    position: 'topright'
  })
  locateToolbar.addTo(leafletMap)
}

export default GeolocationControl
