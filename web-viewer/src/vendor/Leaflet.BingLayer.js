/**
 * @license
 * Copyright (c) 2011-2015, Pavel Shramov, Bruno Bergot
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

L.BingLayer = L.TileLayer.extend({
  options: {
    subdomains: [0, 1, 2, 3],
    type: 'Aerial',
    attribution: 'Bing',
    culture: ''
  },

  initialize: function(key, options) {
    L.Util.setOptions(this, options);

    this._key = key;
    this._url = null;
    this._providers = [];
    this.metaRequested = false;
  },

  tile2quad: function(x, y, z) {
    var quad = '';
    for (var i = z; i > 0; i--) {
      var digit = 0;
      var mask = 1 << (i - 1);
      if ((x & mask) !== 0) digit += 1;
      if ((y & mask) !== 0) digit += 2;
      quad = quad + digit;
    }
    return quad;
  },

  getTileUrl: function(p, z) {
    var zoom = this._getZoomForUrl();
    var subdomains = this.options.subdomains,
      s = this.options.subdomains[Math.abs((p.x + p.y) % subdomains.length)];
    return this._url.replace('{subdomain}', s)
        .replace('{quadkey}', this.tile2quad(p.x, p.y, zoom))
        .replace('{culture}', this.options.culture);
  },

  loadMetadata: function() {
    if (this.metaRequested) return;
    this.metaRequested = true;
    var _this = this;
    var cbid = '_bing_metadata_' + L.Util.stamp(this);
    window[cbid] = function (meta) {
      window[cbid] = undefined;
      var e = document.getElementById(cbid);
      e.parentNode.removeChild(e);
      if (meta.errorDetails) {
        return;
      }
      _this.initMetadata(meta);
    };
    var urlScheme = (document.location.protocol === 'file:') ? 'http' : document.location.protocol.slice(0, -1);
    var url = urlScheme + '://dev.virtualearth.net/REST/v1/Imagery/Metadata/'
          + this.options.type + '?include=ImageryProviders&jsonp=' + cbid +
          '&key=' + this._key + '&UriScheme=' + urlScheme;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.id = cbid;
    document.getElementsByTagName('head')[0].appendChild(script);
  },

  initMetadata: function(meta) {
    var r = meta.resourceSets[0].resources[0];
    this.options.subdomains = r.imageUrlSubdomains;
    this._url = r.imageUrl;
    if (r.imageryProviders) {
      for (var i = 0; i < r.imageryProviders.length; i++) {
        var p = r.imageryProviders[i];
        for (var j = 0; j < p.coverageAreas.length; j++) {
          var c = p.coverageAreas[j];
          var coverage = {zoomMin: c.zoomMin, zoomMax: c.zoomMax, active: false};
          var bounds = new L.LatLngBounds(
              new L.LatLng(c.bbox[0]+0.01, c.bbox[1]+0.01),
              new L.LatLng(c.bbox[2]-0.01, c.bbox[3]-0.01)
          );
          coverage.bounds = bounds;
          coverage.attrib = p.attribution;
          this._providers.push(coverage);
        }
      }
    }
    this._update();
  },

  _update: function() {
    if (this._url === null || !this._map) return;
    this._update_attribution();
    L.TileLayer.prototype._update.apply(this, []);
  },

  _update_attribution: function() {
    var bounds = this._map.getBounds();
    var zoom = this._map.getZoom();
    for (var i = 0; i < this._providers.length; i++) {
      var p = this._providers[i];
      if ((zoom <= p.zoomMax && zoom >= p.zoomMin) &&
          bounds.intersects(p.bounds)) {
        if (!p.active && this._map.attributionControl)
          this._map.attributionControl.addAttribution(p.attrib);
        p.active = true;
      } else {
        if (p.active && this._map.attributionControl)
          this._map.attributionControl.removeAttribution(p.attrib);
        p.active = false;
      }
    }
  },

  onAdd: function(map) {
    this.loadMetadata();
    L.TileLayer.prototype.onAdd.apply(this, [map]);
  },

  onRemove: function(map) {
    for (var i = 0; i < this._providers.length; i++) {
      var p = this._providers[i];
      if (p.active && this._map.attributionControl) {
        this._map.attributionControl.removeAttribution(p.attrib);
        p.active = false;
      }
    }
          L.TileLayer.prototype.onRemove.apply(this, [map]);
  }
});

L.bingLayer = function (key, options) {
    return new L.BingLayer(key, options);
};