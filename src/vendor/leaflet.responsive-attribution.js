// Use a compact attribution control for small map container widths
// Borrowed code from this project: https://github.com/areichman/leaflet-responsive-attribution

L.Control.Attribution.prototype._addTo = L.Control.Attribution.prototype.addTo;

L.Control.Attribution.prototype.addTo = function(map) {
  L.Control.Attribution.prototype._addTo.call(this, map);

  // use the css checkbox hack to toggle the attribution
  var parent     = this._container.parentNode;
  var checkbox   = document.createElement('input');
  var label      = document.createElement('label');
  L.DomEvent.disableClickPropagation(label);
  var checkboxId = map._container.id + '-attribution-toggle';  // unique name if multiple maps are present

  checkbox.setAttribute('id', checkboxId);
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('leaflet-compact-attribution-toggle');
  parent.insertBefore(checkbox, parent.firstChild);

  label.setAttribute('for', checkboxId);
  label.classList.add('leaflet-control');
  label.classList.add('leaflet-compact-attribution-label');
  parent.appendChild(label);

  // initial setup for map load
  if (map._container.offsetWidth <= 600) {
    L.DomUtil.addClass(this._container, 'leaflet-compact-attribution');
  }

  // update on map resize
  map.on('resize', function() {
    if (map._container.offsetWidth > 600) {
      L.DomUtil.removeClass(this._container, 'leaflet-compact-attribution');
    } else {
      L.DomUtil.addClass(this._container, 'leaflet-compact-attribution');
    }
  }, this);

  return this;
};
