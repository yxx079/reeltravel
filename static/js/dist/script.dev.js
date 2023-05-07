"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function ($) {
  $(document).ready(function () {
    $('#cssmenu').prepend('<div id="menu-button">Menu</div>');
    $('#cssmenu #menu-button').on('click', function () {
      var menu = $(this).next('ul');

      if (menu.hasClass('open')) {
        menu.removeClass('open');
      } else {
        menu.addClass('open');
      }
    });
  });
})(jQuery); // privacy popup


document.addEventListener("DOMContentLoaded", function () {
  var footerLink = document.getElementById("footer-link");
  var lightbox = document.getElementById("lightbox");
  var closeLightbox = document.getElementById("close-lightbox");
  footerLink.addEventListener("click", function (event) {
    event.preventDefault();
    lightbox.classList.remove("lightbox-hidden");
    $("body").css("overflow", "hidden");
  });

  if (closeLightbox) {
    closeLightbox.addEventListener("click", function () {
      lightbox.classList.add("lightbox-hidden");
      $("body").css("overflow", "auto"); // 还原主背景的overflow属性
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      lightbox.classList.add("lightbox-hidden");
      $("body").css("overflow", "auto"); // 还原主背景的overflow属性
    }
  });
}); //load term of use page in footer 

$(document).ready(function () {
  // 当点击"terms of use"链接时，使用jQuery的.load()方法加载terms of use文件
  $("#footer-terms-link").on("click", function (event) {
    event.preventDefault(); // 阻止链接的默认行为
    // 使用.load()方法加载terms of use文件，并将其插入到id为"terms-container"的div中

    $("#terms-container").load($(this).data("target"));
  });
}); //sample data values for populate map

var data = [{
  "loc": [41.575330, 13.102411],
  "title": "aquamarine"
}, {
  "loc": [41.575730, 13.002411],
  "title": "black"
}, {
  "loc": [41.807149, 13.162994],
  "title": "blue"
}, {
  "loc": [41.507149, 13.172994],
  "title": "chocolate"
}, {
  "loc": [41.847149, 14.132994],
  "title": "coral"
}, {
  "loc": [41.219190, 13.062145],
  "title": "cyan"
}, {
  "loc": [41.344190, 13.242145],
  "title": "darkblue"
}, {
  "loc": [41.679190, 13.122145],
  "title": "darkred"
}, {
  "loc": [41.329190, 13.192145],
  "title": "darkgray"
}, {
  "loc": [41.379290, 13.122545],
  "title": "dodgerblue"
}, {
  "loc": [41.409190, 13.362145],
  "title": "gray"
}, {
  "loc": [41.794008, 12.583884],
  "title": "green"
}, {
  "loc": [41.805008, 12.982884],
  "title": "greenyellow"
}, {
  "loc": [41.536175, 13.273590],
  "title": "red"
}, {
  "loc": [41.516175, 13.373590],
  "title": "rosybrown"
}, {
  "loc": [41.506175, 13.173590],
  "title": "royalblue"
}, {
  "loc": [41.836175, 13.673590],
  "title": "salmon"
}, {
  "loc": [41.796175, 13.570590],
  "title": "seagreen"
}, {
  "loc": [41.436175, 13.573590],
  "title": "seashell"
}, {
  "loc": [41.336175, 13.973590],
  "title": "silver"
}, {
  "loc": [41.236175, 13.273590],
  "title": "skyblue"
}, {
  "loc": [41.546175, 13.473590],
  "title": "yellow"
}, {
  "loc": [41.239190, 13.032145],
  "title": "white"
}];
var geoJsonData = getJsonData();
var map_id = geoJsonData['id'];
var position = getPositionFromHash();
var zoom = position[0];
var center_lon = position[1];
var center_lat = position[2];
var center = [center_lat, center_lon];
var targetIcon = new L.icon({
  iconUrl: './images/target_32x32.png',
  iconSize: [32, 32],
  shadowSize: [50, 64],
  iconAnchor: [12, 41],
  shadowAnchor: [4, 62],
  popupAnchor: [3, -33]
});
var center_tiles = getTileURL(center[0], center[1], zoom);
var markers = L.markerClusterGroup();
var geoJsonLayer = L.geoJson(geoJsonData, {
  onEachFeature: function onEachFeature(feature, layer) {
    markers.addLayer(layer);
    layer.bindPopup(feature.properties.text);
  }
});
var drawControl = new L.Control.Draw({
  draw: {
    position: 'topleft',
    polygon: false,
    polyline: false,
    rectangle: false,
    circle: false
  },
  edit: {
    featureGroup: markers
  }
}); //create map for user to add their own location

var osmclassic_url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
var osmclassic_attribution = 'Map data &copy; <a href="http://osm.org/copyright">' + 'OpenStreetMap</a> contributors, Imagery &copy; OpenStreetMap';
var osm_classic = L.tileLayer(osmclassic_url, {
  attribution: osmclassic_attribution,
  zoomMin: 2,
  zoomMax: 18
});
var baseLayers = {
  "OSM oggi": osm_classic
};
var mapAdd = L.map('mapAdd', {
  layers: [osm_classic],
  center: center,
  zoom: zoom
});
mapAdd.addControl(drawControl); // minimappa

var osm_minimap = new L.TileLayer(osmclassic_url, {
  minZoom: 0,
  maxZoom: 13
});
var miniMap = new L.Control.MiniMap(osm_minimap, {
  toggleDisplay: true
}).addTo(mapAdd); // hash

var hash = new L.Hash(mapAdd);
/*
 * Draw events on map1:
 * * draw:created is fired on node creation
 * * draw:deleted is fired on node deletion (when saving)
 */

mapAdd.on('draw:created', function (e) {
  console.log('draw:created');
  var type = e.layerType,
      layer = e.layer; // drawnItems.addLayer(layer);

  markers.addLayer(layer);
  var lat = layer._latlng.lat;
  var lon = layer._latlng.lng;
  var id = layer._leaflet_id;

  function saveIt(tweettext) {
    insertItem(lat, lon, map_id, id, tweettext);
    layer.closePopup();
    layer.bindPopup(tweettext);
  }

  if (type === 'marker') {
    var form = '<form id="inputform" enctype="multipart/form-data">' + '<h4>footprint 1</h4>' + '<textarea class="form-control" placeholder="Il tuo tweet" id="tweet-text" name="tweet-text" style="font-size: small;" row=5>' + "film information and my travel #OpenStreetMap!" + '</textarea>' + '<div class="row-fluid" style="text-align: right;">' + 'caratteri: <span id="counter"></span>' + '</div>' + '<div class="row-fluid">' + '<a role="button" class="btn save-button" id="save" title="save your footprint"></a>' + '<a role="button" class="btn tweet-button" id="tweet"' + 'href="https://twitter.com/intent/tweet?via=OpenStreeMapIt&text=L%27agenzia%20delle%20entrate%20copia%20da%20OpenStreetMap!" ' + 'title="Save inserted and twittered point!"></a>' + '</div>' + '</form>';
    layer.bindPopup(form).openPopup();
    $('#tweet').simplyCountable({
      maxCount: 97
    });
  }

  $('#save').click(function () {
    var tweettext = $('textarea#tweet-text').val();
    saveIt(tweettext);
  });
  $('#tweet').click(function tweetIt(event) {
    event.preventDefault();
    var tweettext = $('textarea#tweet-text').val();
    var twitterBaselink = "https://twitter.com/intent/tweet?";
    var params = {
      url: window.location.href,
      via: 'OpenStreetMapIt',
      text: tweettext
    };
    $('#tweet').attr('href', twitterBaselink + $.param(params));
    saveIt(tweettext);
  });
});
mapAdd.on('draw:deleted', function (e) {
  for (var key in e.layers._layers) {
    var deleted_item = JSON.stringify(e.layers._layers[key].feature);
    deleteItem(deleted_item, map_id);
  }
});
mapAdd.addLayer(markers); //定位当前位置

var gps = new L.Control.Gps({
  //autoActive:true,
  autoCenter: true
}); //inizialize control

gps.on('gps:located', function (e) {
  //	e.marker.bindPopup(e.latlng.toString()).openPopup()
  console.log(e.latlng, map.getCenter());
}).on('gps:disabled', function (e) {
  e.marker.closePopup();
});
gps.addTo(mapAdd);

function searchNominatim(query) {
  var response, _data;

  return regeneratorRuntime.async(function searchNominatim$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("https://nominatim.openstreetmap.org/search?format=json&q=".concat(query), {
            headers: {
              Accept: 'application/json'
            }
          }));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          _data = _context.sent;
          return _context.abrupt("return", _data.map(function (item) {
            return {
              display_name: String(item.display_name),
              lat: parseFloat(item.lat),
              lon: parseFloat(item.lon)
            };
          }));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
} // 添加新的搜索方法，将 Nominatim 结果与样本数据一起返回


function searchLocations(text, callResponse) {
  var nominatimResults, sampleDataResults, combinedResults;
  return regeneratorRuntime.async(function searchLocations$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(searchNominatim(text));

        case 2:
          nominatimResults = _context2.sent;
          sampleDataResults = data.filter(function (item) {
            return item.title.toLowerCase().includes(text.toLowerCase());
          });
          combinedResults = [].concat(_toConsumableArray(nominatimResults.map(function (result) {
            return {
              display_name: result.display_name,
              loc: [result.lat, result.lon]
            };
          })), _toConsumableArray(sampleDataResults.map(function (result) {
            return {
              display_name: result.title,
              loc: result.loc
            };
          })));
          callResponse(combinedResults);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
} // 更新搜索控件，使用新的搜索方法


var searchControl = L.control.search({
  sourceData: function sourceData(text, callResponse) {
    searchNominatim(text).then(function (results) {
      callResponse(results);
    });
  },
  propertyName: 'display_name',
  propertyLoc: ['lat', 'lon'],
  marker: L.circleMarker([0, 0], {
    radius: 30
  }),
  autoCollapse: true,
  autoType: false,
  minLength: 2,
  filterData: function filterData(text, records) {
    var newText = String(text);
    var regSearch = new RegExp(newText.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'), 'i');
    return records.filter(function (elem) {
      return regSearch.test(elem.display_name);
    });
  }
}).addTo(mapAdd); // 其他代码与原代码相同

/*
* Geolocation on the map
*/

$('#locate-me').click(function () {
  mapAdd.locate({
    setView: true
  });
});
/*
* Update links under the map
*/

$('.note > a#reportmap-fullscreen').click(function () {
  $(this).attr('href', '/reportmap.html' + window.location.hash);
});
/*
  * Tweet link
  */

$('.tweet-link').click(function () {
  var twitterBaselink = "https://twitter.com/intent/tweet?";
  var params = {
    url: window.location.href,
    via: 'OpenStreeMapIt',
    text: "L'agenzia delle entrate copia da OpenStreetMap! #agenziauscite"
  };
  $(this).attr('href', twitterBaselink + $.param(params));
});
var map = new L.Map('map', {
  zoom: 9,
  center: new L.latLng(data[0].loc)
}); //set center from first location
// 添加 OpenStreetMap 图层

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);
var markersLayer = new L.LayerGroup(); //layer contain searched elements

map.addLayer(markersLayer); ////////////populate map with markers from sample data

for (i in data) {
  var title = data[i].title,
      //value searched
  loc = data[i].loc,
      //position found
  marker = new L.Marker(new L.latLng(loc), {
    title: title
  }); //se property searched

  marker.bindPopup('title: ' + title);
  markersLayer.addLayer(marker);
}

map.addControl(new L.Control.Search({
  container: 'findbox',
  layer: markersLayer,
  initial: false,
  collapsed: false,
  textPlaceholder: 'search for a movie ',
  textErr: 'Sorry, no results found.'
}));
//# sourceMappingURL=script.dev.js.map
