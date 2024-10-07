var map;

function initMap1() {
  
    map = new mappls.Map('map', {
                    center: [28.61, 77.23],
                    zoomControl: true,
                    location: true
                }
  );
  map.addListener('click', function(e) {
    let divId=document.getElementById("show-result")
            divId.style.display="block";
    divId.innerHTML = `Map Click Event :   ${e.lngLat}`;
  });
           

                const geoData = {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "properties": {
                            "description": "noida",
                            "icon": "https://apis.mapmyindia.com/map_v3/1.png",
                            "icon-size": .75,
                            "icon-offset": [0, -10],
                            "text": "1",
                            "text-size": 10,
                            "text-offset": [0, .6]
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [28.544, 77.5454]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "description": "faridabad",
                            "icon": "https://apis.mapmyindia.com/map_v3/1.png"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [28.27189158, 77.2158203125]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "description": "delhi",
                            "icon": "https://apis.mapmyindia.com/map_v3/1.png"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [28.549511, 77.2678250]
                        }
                    }]
                };
                MultMarker = mappls.addGeoJson({
                    map: map,
                    data: geoData,
                    fitbounds: true,
                    cType: 0,    
                });


                map.addListener('load',function(){
                    var optional_config = {
                        /* location: [28.61, 77.23], */
                        region: "IND",
                        height:300,
                         geolocation:true,
                        pod:'City',
                        bridge:true,
                        tokenizeAddress:true,
                        filter:'cop:9QGXAM',
                        hyperLocal:true, //Default is false. Location parameter is mandatory to use this parameter.
                        distance:true,
                        width:300,
                        height:300,
                        clearButton:false, //to hide cross button, which is right side of search input
                        blank_callback:function(){console.log("called when click on cross button or input value become blank");} 
                       
                    };
                    new mappls.search(document.getElementById("auto"), optional_config, callback);
                    function callback(data) {
                        alert('Data: ' + JSON.stringify(data, null, 2));
                        console.log(data);
                        if (data) {
                            var dt = data[0];
                            if (!dt) return false;
                            var eloc = dt.eLoc;
                            var place = dt.placeName + ", " + dt.placeAddress;
                            /*Use elocMarker Plugin to add marker*/
                            if (marker) marker.remove();
                            mappls.pinMarker({
                                map: map,
                                pin: eloc,
                                popupHtml: place,
                                popupOptions: {
                                    openPopup: true
                                }
                            }, function(data){
                                marker=data;
                                marker.fitbounds();
                            })
                        }
                    }
                });

            }