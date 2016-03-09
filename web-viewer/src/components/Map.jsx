/*global L*/

import React from 'react';

const Map = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    setTimeout(() => {
      this.map = L.map(this.refs.map, {
        center: [31, -100],
        zoom: 7
      });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }, 500)
  },
  render: function() {
    return (
      <div className="map">
        <div ref="map" className="map--full">
        </div>
      </div>
    )
  }
});


export default Map;
