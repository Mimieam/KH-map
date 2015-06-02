!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self);var n=o;n=n.L||(n.L={}),n=n.Control||(n.Control={}),n.Geocoder=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function corslite(url, callback, cors) {
    var sent = false;

    if (typeof window.XMLHttpRequest === 'undefined') {
        return callback(Error('Browser not supported'));
    }

    if (typeof cors === 'undefined') {
        var m = url.match(/^\s*https?:\/\/[^\/]*/);
        cors = m && (m[0] !== location.protocol + '//' + location.domain +
                (location.port ? ':' + location.port : ''));
    }

    var x = new window.XMLHttpRequest();

    function isSuccessful(status) {
        return status >= 200 && status < 300 || status === 304;
    }

    if (cors && !('withCredentials' in x)) {
        // IE8-9
        x = new window.XDomainRequest();

        // Ensure callback is never called synchronously, i.e., before
        // x.send() returns (this has been observed in the wild).
        // See https://github.com/mapbox/mapbox.js/issues/472
        var original = callback;
        callback = function() {
            if (sent) {
                original.apply(this, arguments);
            } else {
                var that = this, args = arguments;
                setTimeout(function() {
                    original.apply(that, args);
                }, 0);
            }
        }
    }

    function loaded() {
        if (
            // XDomainRequest
            x.status === undefined ||
            // modern browsers
            isSuccessful(x.status)) callback.call(x, null, x);
        else callback.call(x, x, null);
    }

    // Both `onreadystatechange` and `onload` can fire. `onreadystatechange`
    // has [been supported for longer](http://stackoverflow.com/a/9181508/229001).
    if ('onload' in x) {
        x.onload = loaded;
    } else {
        x.onreadystatechange = function readystate() {
            if (x.readyState === 4) {
                loaded();
            }
        };
    }

    // Call the callback with the XMLHttpRequest object as an error and prevent
    // it from ever being called again by reassigning it to `noop`
    x.onerror = function error(evt) {
        // XDomainRequest provides no evt parameter
        callback.call(this, evt || true, null);
        callback = function() { };
    };

    // IE9 must have onprogress be set to a unique function.
    x.onprogress = function() { };

    x.ontimeout = function(evt) {
        callback.call(this, evt, null);
        callback = function() { };
    };

    x.onabort = function(evt) {
        callback.call(this, evt, null);
        callback = function() { };
    };

    // GET is the only supported HTTP Verb by XDomainRequest and is the
    // only one supported here.
    x.open('GET', url, true);

    // Send the request. Sending data is not supported.
    x.send(null);
    sent = true;

    return x;
}

if (typeof module !== 'undefined') module.exports = corslite;

},{}],2:[function(require,module,exports){
(function (global){
(function() {
	'use strict';

	var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);

	module.exports = L.Class.extend({
		options: {
			timeout: 500,
			noResultsMessage: 'No results found.'
		},

		initialize: function(elem, callback, context, options) {
			L.setOptions(this, options);

			this._elem = elem;
			this._resultFn = options.resultFn ? L.Util.bind(options.resultFn, options.resultContext) : null;
			this._autocomplete = options.autocompleteFn ? L.Util.bind(options.autocompleteFn, options.autocompleteContext) : null;
			this._selectFn = L.Util.bind(callback, context);
			this._container = L.DomUtil.create('div', 'leaflet-control-geocoder-result leaflet-bar');
			this._resultTable = L.DomUtil.create('table', '', this._container);

			// TODO: looks a bit like a kludge to register same for input and keypress -
			// browsers supporting both will get duplicate events; just registering
			// input will not catch enter, though.
			L.DomEvent.addListener(this._elem, 'input', this._keyPressed, this);
			L.DomEvent.addListener(this._elem, 'keypress', this._keyPressed, this);
			L.DomEvent.addListener(this._elem, 'keydown', this._keyDown, this);
			L.DomEvent.addListener(this._elem, 'blur', function() {
				/*if (this._isOpen) {
					this.close();
				}*/
			}, this);
		},

		close: function() {
			L.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-result-open');
			this._isOpen = false;
		},

		_open: function() {
			var rect = this._elem.getBoundingClientRect();
			if (!this._container.parentElement) {
				this._container.style.left = rect.left + 'px';
				this._container.style.top = rect.bottom + 'px';
				this._container.style.width = (rect.right - rect.left) + 'px';
				document.body.appendChild(this._container);
			}

			L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-result-open');
			this._isOpen = true;
		},

		_setResults: function(results) {
			var i,
			    tr,
			    td,
			    text;

			delete this._selection;
			this._results = results;

			while (this._resultTable.firstChild) {
				this._resultTable.removeChild(this._resultTable.firstChild);
			}

			for (i = 0; i < results.length; i++) {
				tr = L.DomUtil.create('tr', '', this._resultTable);
				tr.setAttribute('data-result-index', i);
				td = L.DomUtil.create('td', '', tr);
				if (results[i].html) {
					td.innerHTML = results[i].html;
				} else {
					text = document.createTextNode(results[i].name);
					td.appendChild(text);
				}
				// mousedown + click because:
				// http://stackoverflow.com/questions/10652852/jquery-fire-click-before-blur-event
				L.DomEvent.addListener(td, 'mousedown', L.DomEvent.preventDefault);
				L.DomEvent.addListener(td, 'click', this._createClickListener(results[i]));
			}

			if (!i) {
				tr = L.DomUtil.create('tr', '', this._resultTable);
				td = L.DomUtil.create('td', 'leaflet-control-geocoder-no-results', tr);
				td.innerHTML = this.options.noResultsMessage;
			}

			this._open();

			if (results.length > 0) {
				// Select the first entry
				this._select(1);
			}
		},

		_createClickListener: function(r) {
			var resultSelected = this._resultSelected(r);
			return L.bind(function() {
				this._elem.blur();
				resultSelected();
			}, this);
		},

		_resultSelected: function(r) {
			return L.bind(function() {
				this.close();
				this._elem.value = r.name;
				this._lastCompletedText = r.name;
				this._selectFn(r);
			}, this);
		},

		_keyPressed: function(e) {
			var index;

			if (this._isOpen && e.keyCode === 13 && this._selection) {
				index = parseInt(this._selection.getAttribute('data-result-index'), 10);
				this._resultSelected(this._results[index])();
				L.DomEvent.preventDefault(e);
				return;
			}

			if (e.keyCode === 13) {
				this._complete(this._resultFn, true);
				return;
			}

			if (this._autocomplete && document.activeElement === this._elem) {
				if (this._timer) {
					clearTimeout(this._timer);
				}
				this._timer = setTimeout(L.Util.bind(function() { this._complete(this._autocomplete); }, this),
					this.options.timeout);
				return;
			}

			this._unselect();
		},

		_select: function(dir) {
			var sel = this._selection;
			if (sel) {
				L.DomUtil.removeClass(sel.firstChild, 'leaflet-control-geocoder-selected');
				sel = sel[dir > 0 ? 'nextSibling' : 'previousSibling'];
			}
			if (!sel) {
				sel = this._resultTable[dir > 0 ? 'firstChild' : 'lastChild'];
			}

			if (sel) {
				L.DomUtil.addClass(sel.firstChild, 'leaflet-control-geocoder-selected');
				this._selection = sel;
			}
		},

		_unselect: function() {
			if (this._selection) {
				L.DomUtil.removeClass(this._selection.firstChild, 'leaflet-control-geocoder-selected');
			}
			delete this._selection;
		},

		_keyDown: function(e) {
			if (this._isOpen) {
				switch (e.keyCode) {
				// Escape
				case 27:
					this.close();
					L.DomEvent.preventDefault(e);
					return;
				// Up
				case 38:
					this._select(-1);
					L.DomEvent.preventDefault(e);
					return;
				// Down
				case 40:
					this._select(1);
					L.DomEvent.preventDefault(e);
					return;
				}
			}
		},

		_complete: function(completeFn, trySelect) {
			var v = this._elem.value;
			function completeResults(results) {
				this._lastCompletedText = v;
				if (trySelect && results.length === 1) {
					this._resultSelected(results[0])();
				} else {
					this._setResults(results);
				}
			}

			if (!v) {
				return;
			}

			if (v !== this._lastCompletedText) {
				completeFn(v, completeResults, this);
			} else if (trySelect) {
				completeResults.call(this, this._results);
			}
		}
	});
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
(function() {
    'use strict';

    var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    var Autocomplete = require('./autocomplete');

    L.Control.Geocoder = L.Control.extend({
        options: {
            showResultIcons: false,
            collapsed: true,
            expand: 'click',
            position: 'topright',
            placeholder: 'Search...',
            errorMessage: 'Nothing found.'
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);
            if (!this.options.geocoder) {
                this.options.geocoder = new L.Control.Geocoder.Nominatim();
            }
        },

        onAdd: function (map) {
            var className = 'leaflet-control-geocoder',
                container = L.DomUtil.create('div', 'leaflet-bar leaflet-control ' + className),
                icon = L.DomUtil.create('a', 'leaflet-control-geocoder-icon', container),
                input;

            this._map = map;
            this._container = container;
            icon.href = '#';
            input = this._input = L.DomUtil.create('input');
            input.type = 'text';
            input.placeholder = this.options.placeholder;
            new Autocomplete(input, this._geocodeResultSelected, this, {
                resultFn: this.options.geocoder.geocode,
                resultContext: this.options.geocoder,
                autocompleteFn: this.options.geocoder.suggest,
                autocompleteContext: this.options.geocoder
            });

            container.appendChild(input);

            if (this.options.collapsed) {
                if (this.options.expand === 'click') {
                    L.DomEvent.addListener(icon, 'click', function(e) {
                        // TODO: touch
                        if (e.button === 0 && e.detail !== 2) {
                            this._toggle();
                        }
                    }, this);
                } else {
                    L.DomEvent.addListener(icon, 'mouseover', this._expand, this);
                    L.DomEvent.addListener(icon, 'mouseout', this._collapse, this);
                    this._map.on('movestart', this._collapse, this);
                }
            } else {
                this._expand();
            }

            L.DomEvent.disableClickPropagation(container);

            return container;
        },

        markGeocode: function(result) {
            this._map.fitBounds(result.bbox);

            if (this._geocodeMarker) {
                this._map.removeLayer(this._geocodeMarker);
            }

            this._geocodeMarker = new L.Marker(result.center)
                .bindPopup(result.html || result.name)
                .addTo(this._map)
                .openPopup();

            return this;
        },

        _geocodeResultSelected: function(result) {
            if (this.options.collapsed) {
                this._collapse();
            } else {
                this._clearResults();
            }
            this.markGeocode(result);
        },

        _toggle: function() {
            if (L.DomUtil.hasClass(this._container, 'leaflet-control-geocoder-expanded')) {
                this._collapse();
            } else {
                this._expand();
            }
        },

        _expand: function () {
            L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-expanded');
            this._input.select();
        },

        _collapse: function () {
            this._container.className = this._container.className.replace('leaflet-control-geocoder-expanded', '');
        }
    });

    L.control.geocoder = function(options) {
        return new L.Control.Geocoder(options);
    };

    require('./providers/nominatim');
    require('./providers/google');
    require('./providers/bing');
    require('./providers/mapquest');
    require('./providers/mapbox');

    module.exports = L.Control.Geocoder;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./autocomplete":2,"./providers/bing":4,"./providers/google":5,"./providers/mapbox":6,"./providers/mapquest":7,"./providers/nominatim":8}],4:[function(require,module,exports){
(function (global){
(function() {
    'use strict';

    var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    var corslite = require('corslite');
    
    L.Control.Geocoder.Bing = L.Class.extend({
        initialize: function(key) {
            this.key = key;
        },

        geocode : function (query, cb, context) {
            corslite('//dev.virtualearth.net/REST/v1/Locations' + L.Util.getParamString({
                query: query,
                key : this.key
            }), function(err, resp) {
                var results = [],
                    data;
                if (!err) {
                    data = resp.responseText;
                    for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
                        var resource = data.resourceSets[0].resources[i],
                            bbox = resource.bbox;
                        results[i] = {
                            name: resource.name,
                            bbox: L.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
                            center: L.latLng(resource.point.coordinates)
                        };
                    }
                }
                cb.call(context, results);
            }, this, 'jsonp');
        },

        reverse: function(location, scale, cb, context) {
            L.Control.Geocoder._jsonp('//dev.virtualearth.net/REST/v1/Locations/' + location.lat + ',' + location.lng, {
                key : this.key
            }, function(data) {
                var results = [];
                for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
                    var resource = data.resourceSets[0].resources[i],
                        bbox = resource.bbox;
                    results[i] = {
                        name: resource.name,
                        bbox: L.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
                        center: L.latLng(resource.point.coordinates)
                    };
                }
                cb.call(context, results);
            }, this, 'jsonp');
        }
    });

    L.control.geocoder.bing = function(key) {
        return new L.Control.Geocoder.Bing(key);
    };

    module.exports = L.Control.Geocoder;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"corslite":1}],5:[function(require,module,exports){
(function (global){
(function() {
    'use strict';

    var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    require('../control');

    L.Control.Geocoder.Google = L.Class.extend({
        options: {
            serviceUrl: 'https://maps.googleapis.com/maps/api/geocode/json'
        },

        initialize: function(key) {
            this._key = key;
        },

        geocode: function(query, cb, context) {
            var params = {
                address: query,
            };
            if(this._key && this._key.length)
            {
                params.key = this._key;
            }

            L.Control.Geocoder.getJSON(this.options.serviceUrl, params, function(data) {
                    var results = [],
                            loc,
                            latLng,
                            latLngBounds;
                    if (data.results && data.results.length) {
                        for (var i = 0; i <= data.results.length - 1; i++) {
                            loc = data.results[i];
                            latLng = L.latLng(loc.geometry.location);
                            latLngBounds = L.latLngBounds(L.latLng(loc.geometry.viewport.northeast), L.latLng(loc.geometry.viewport.southwest));
                            results[i] = {
                                name: loc.formatted_address,
                                bbox: latLngBounds,
                                center: latLng
                            };
                        }
                    }

                    cb.call(context, results);
            });
        },

        reverse: function(location, scale, cb, context) {
            var params = {
                latlng: encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng)
            };
            if(this._key && this._key.length) {
                params.key = this._key;
            }

            L.Control.Geocoder.getJSON(this.options.serviceUrl, params, function(data) {
                var results = [],
                        loc,
                        latLng,
                        latLngBounds;
                if (data.results && data.results.length) {
                    for (var i = 0; i <= data.results.length - 1; i++) {
                        loc = data.results[i];
                        latLng = L.latLng(loc.geometry.location);
                        latLngBounds = L.latLngBounds(L.latLng(loc.geometry.viewport.northeast), L.latLng(loc.geometry.viewport.southwest));
                        results[i] = {
                            name: loc.formatted_address,
                            bbox: latLngBounds,
                            center: latLng
                        };
                    }
                }

                cb.call(context, results);
            });
        }
    });

    L.Control.Geocoder.google = function(key) {
        return new L.Control.Geocoder.Google(key);
    };

    module.exports = L.Control.Geocoder;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../control":3}],6:[function(require,module,exports){
(function (global){
(function() {
    'use strict';

    var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    require('../control');

    L.Control.Geocoder.Mapbox = L.Class.extend({
        options: {
            serviceUrl: 'https://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/'
        },

        initialize: function(accessToken) {
            this._accessToken = accessToken;
        },

        geocode: function(query, cb, context) {
            L.Control.Geocoder.getJSON(this.options.serviceUrl + encodeURIComponent(query) + '.json', {
                access_token: this._accessToken,
            }, function(data) {
                var results = [],
                loc,
                latLng,
                latLngBounds;
                if (data.features && data.features.length) {
                    for (var i = 0; i <= data.features.length - 1; i++) {
                        loc = data.features[i];
                        latLng = L.latLng(loc.center.reverse());
                        if(loc.hasOwnProperty('bbox')) {
                            latLngBounds = L.latLngBounds(L.latLng(loc.bbox.slice(0, 2).reverse()), L.latLng(loc.bbox.slice(2, 4).reverse()));
                        } else {
                            latLngBounds = L.latLngBounds(latLng, latLng);
                        }
                        results[i] = {
                            name: loc.place_name,
                            bbox: latLngBounds,
                            center: latLng
                        };
                    }
                }

                cb.call(context, results);
            });
        },

        suggest: function(query, cb, context) {
            return this.geocode(query, cb, context);
        },

        reverse: function(location, scale, cb, context) {
            L.Control.Geocoder.getJSON(this.options.serviceUrl + encodeURIComponent(location.lng) + ',' + encodeURIComponent(location.lat) + '.json', {
                access_token: this._accessToken,
            }, function(data) {
                var results = [],
                loc,
                latLng,
                latLngBounds;
                if (data.features && data.features.length) {
                    for (var i = 0; i <= data.features.length - 1; i++) {
                        loc = data.features[i];
                        latLng = L.latLng(loc.center.reverse());
                        if(loc.hasOwnProperty('bbox'))
                        {
                            latLngBounds = L.latLngBounds(L.latLng(loc.bbox.slice(0, 2).reverse()), L.latLng(loc.bbox.slice(2, 4).reverse()));
                        }
                        else
                        {
                            latLngBounds = L.latLngBounds(latLng, latLng);
                        }
                        results[i] = {
                            name: loc.place_name,
                            bbox: latLngBounds,
                            center: latLng
                        };
                    }
                }

                cb.call(context, results);
            });
        }
    });

    L.control.geocoder.mapbox = function(accessToken) {
        return new L.Control.Geocoder.Mapbox(accessToken);
    };

    module.exports = L.Control.Geocoder;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../control":3}],7:[function(require,module,exports){
(function (global){
(function() {
    'use strict';

    var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    require('../util');

    L.Control.Geocoder.MapQuest = L.Class.extend({
        initialize: function(key) {
            // MapQuest seems to provide URI encoded API keys,
            // so to avoid encoding them twice, we decode them here
            this._key = decodeURIComponent(key);
        },

        _formatName: function() {
            var r = [],
                i;
            for (i = 0; i < arguments.length; i++) {
                if (arguments[i]) {
                    r.push(arguments[i]);
                }
            }

            return r.join(', ');
        },

        geocode: function(query, cb, context) {
            L.Control.Geocoder._jsonp('//www.mapquestapi.com/geocoding/v1/address', {
                key: this._key,
                location: query,
                limit: 5,
                outFormat: 'json'
            }, function(data) {
                var results = [],
                    loc,
                    latLng;
                if (data.results && data.results[0].locations) {
                    for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
                        loc = data.results[0].locations[i];
                        latLng = L.latLng(loc.latLng);
                        results[i] = {
                            name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
                            bbox: L.latLngBounds(latLng, latLng),
                            center: latLng
                        };
                    }
                }

                cb.call(context, results);
            }, this);
        },

        reverse: function(location, scale, cb, context) {
            L.Control.Geocoder._jsonp('//www.mapquestapi.com/geocoding/v1/reverse', {
                key: this._key,
                location: location.lat + ',' + location.lng,
                outputFormat: 'json'
            }, function(data) {
                var results = [],
                    loc,
                    latLng;
                if (data.results && data.results[0].locations) {
                    for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
                        loc = data.results[0].locations[i];
                        latLng = L.latLng(loc.latLng);
                        results[i] = {
                            name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
                            bbox: L.latLngBounds(latLng, latLng),
                            center: latLng
                        };
                    }
                }

                cb.call(context, results);
            }, this);
        }
    });

    L.control.geocoder.mapQuest = function(key) {
        return new L.Control.Geocoder.MapQuest(key);
    };

    module.exports = L.Control.Geocoder;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util":9}],8:[function(require,module,exports){
(function (global){
(function() {
    'use strict';

    var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    var corslite = require('corslite');
    require('../util');

    L.Control.Geocoder.Nominatim = L.Class.extend({
        options: {
            serviceUrl: '//nominatim.openstreetmap.org/',
            geocodingQueryParams: {},
            reverseQueryParams: {},
            htmlTemplate: function(r) {
                var a = r.address,
                    parts = [];
                if (a.road || a.building) {
                    parts.push('{building} {road} {house_number}');
                }

                if (a.city || a.town || a.village) {
                    parts.push('<span class="' + (parts.length > 0 ? 'leaflet-control-geocoder-address-detail' : '') +
                        '">{postcode} {city} {town} {village}</span>');
                }

                if (a.state || a.country) {
                    parts.push('<span class="' + (parts.length > 0 ? 'leaflet-control-geocoder-address-context' : '') +
                        '">{state} {country}</span>');
                }

                return L.Control.Geocoder.template(parts.join('<br/>'), a, true);
            }
        },

        initialize: function(options) {
            L.Util.setOptions(this, options);
        },

        geocode: function(query, cb, context) {
            var params = L.extend({
                    q: query,
                    limit: 5,
                    format: 'json',
                    addressdetails: 1
                }, this.options.geocodingQueryParams),
                url = this.options.serviceUrl + 'search/' + L.Util.getParamString(params);

            corslite(url, L.bind(function(err, resp) {
                var results = [],
                    data;

                if (!err) {
                    data = JSON.parse(resp.responseText);
                    for (var i = data.length - 1; i >= 0; i--) {
                        var bbox = data[i].boundingbox;
                        for (var j = 0; j < 4; j++) {
                            bbox[j] = parseFloat(bbox[j]);
                        }
                        results[i] = {
                            icon: data[i].icon,
                            name: data[i].display_name,
                            html: this.options.htmlTemplate ?
                                this.options.htmlTemplate(data[i])
                                : undefined,
                            bbox: L.latLngBounds([bbox[0], bbox[2]], [bbox[1], bbox[3]]),
                            center: L.latLng(data[i].lat, data[i].lon),
                            properties: data[i]
                        };
                    }
                    cb.call(context, results);
                } else {
                    // TODO
                }
            }, this), 'json_callback');
        },

        reverse: function(location, scale, cb, context) {
            var params = L.extend({
                    lat: location.lat,
                    lon: location.lng,
                    zoom: Math.round(Math.log(scale / 256) / Math.log(2)),
                    addressdetails: 1,
                    format: 'json'
                }, this.options.reverseQueryParams),
                url = this.options.serviceUrl + 'reverse/' + L.Util.getParamString(params);

            corslite(url, L.bind(function(err, resp) {
                var result = [],
                    data,
                    loc;

                if (!err) {
                    data = JSON.parse(resp.responseText);
                    if (data && data.lat && data.lon) {
                        loc = L.latLng(data.lat, data.lon);
                        result.push({
                            name: data.display_name,
                            html: this.options.htmlTemplate ?
                                this.options.htmlTemplate(data)
                                : undefined,
                            center: loc,
                            bounds: L.latLngBounds(loc, loc),
                            properties: data
                        });
                    }

                    cb.call(context, result);
                } else {
                    // TODO
                }
            }, this), 'json_callback');
        }
    });

    L.control.geocoder.nominatim = function(options) {
        return new L.Control.Geocoder.Nominatim(options);
    };

    module.exports = L.Control.Geocoder;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util":9,"corslite":1}],9:[function(require,module,exports){
(function (global){
(function() {
    'use strict';

    var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);
    require('./control');
    
    L.Control.Geocoder.template = function (str, data, htmlEscape) {
        return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
            var value = data[key];
            if (value === undefined) {
                value = '';
            } else if (typeof value === 'function') {
                value = value(data);
            }
            return L.Control.Geocoder.htmlEscape(value);
        });
    };

    // Adapted from handlebars.js
    // https://github.com/wycats/handlebars.js/
    L.Control.Geocoder.htmlEscape = (function() {
        var badChars = /[&<>"'`]/g;
        var possible = /[&<>"'`]/;
        var escape = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#x27;',
            '`': '&#x60;'
        };

        function escapeChar(chr) {
            return escape[chr];
        }

        return function(string) {
            if (string == null) {
                return '';
            } else if (!string) {
                return string + '';
            }

            // Force a string conversion as this will be done by the append regardless and
            // the regex test will do this transparently behind the scenes, causing issues if
            // an object's to string has escaped characters in it.
            string = '' + string;

            if (!possible.test(string)) {
                return string;
            }
            return string.replace(badChars, escapeChar);
        };
    })();

    module.exports = L.Control.Geocoder;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./control":3}]},{},[3])(3)
});