$(document).ready(function(){
    window.onload = function () {
        LoadMap();
    }
    function LoadMap() {
        var mapOptions = {
            center: new google.maps.LatLng(1.2793048, 103.8365762),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var infoWindow = new google.maps.InfoWindow();
        var latlngbounds = new google.maps.LatLngBounds();
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var location = localStorage.getItem("location");
        var replace_loc = location.split(' ').join('+');
        $.ajax({ 
        async: false, 
        global: false, 
        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query="+replace_loc+"&sensor=false&key=AIzaSyBTnL_MrIIX7Ta5nuWjEHLMqY2rcXiA7N0", 
        dataType: "json", 
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.results.length; i++) {
            var x = data.results[i];
            var myLatlng = new google.maps.LatLng(data.results[i].geometry.location.lat, data.results[i].geometry.location.lng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                animation: google.maps.Animation.DROP,
                title: data.results[i].name
            });
            (function (marker, x) {
            google.maps.event.addListener(marker, "click", function (e) {
                console.log(x.name);
                infoWindow.setContent("<div style = 'width:200px;min-height:40px;color:black'><b>" + x.name + "</b> <br>" + x.formatted_address + "</div>");
                infoWindow.open(map, marker);
                });
            })(marker, x);
            latlngbounds.extend(marker.position);
        }
            var bounds = new google.maps.LatLngBounds();
            map.setCenter(latlngbounds.getCenter());
            map.fitBounds(latlngbounds);
            }
            })
        }
})