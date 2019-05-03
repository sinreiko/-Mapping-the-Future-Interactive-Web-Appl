$(document).ready(function(){
    $(".img-window").hide();
    $("#dates").hide();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) {
    dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 
    today = dd + '-' + mm + '-' + yyyy;
    var startDate;
         $("#start_date").datetimepicker({
                    format: 'yyyy-mm-ddThh:ii:ss',
                     onSelect: function (selected) {
                          var startDate = new Date(selected);
                          startDate.setDate(startDate.getDate() + 1);
                             $("#end_date").datetimepicker("option", "minDate", startDate);
                    }    
                    
        });
        $("#end_date").datetimepicker({
                     format: 'yyyy-mm-ddThh:ii:ss',
                    onSelect: function (selected) {
                      var endDate = new Date(selected);
                      endDate.setDate(endDate.getDate() - 1);
                      $("#start_date").datetimepicker("option", "maxDate", endDate);
                    }
        });
    
    $("select[name='ticket']").on('change', function(){
        if($(this).val() == "paid"){            
            $(this).after("<br><label for='price'>Price</label><br><input type='number' name='price' placeholder='min: 1, max: 999' min='1' max='999' />");
        }
        if($(this).val() == "donation"){            
            $(this).after("<br><label for='donate'>Donate</label><br><input type='number' name='donate' placeholder='min: 1' min='1' />");
        }
    })
    $("#create-events").hide();
    $("#top-menu").hide();
  var $sections = $('.container');
  var $mainsections = $('.section');
  // The user scrolls
  $(window).scroll(function(){
    
    var currentScroll = $(this).scrollTop();
    
    var $currentSection;
    var $currentMainSection;
    $mainsections.each(function(){
        var mainDivPosition = $(this).offset().top;
        if(mainDivPosition - 150 < currentScroll){
            $currentMainSection = $(this);
        }
        var id = $currentMainSection.attr('id');
        $('#menu ul li a').removeClass('active');
        $("[href=\\#"+id+"]").addClass('active');
        
    })
    $sections.each(function(){
    
      var divPosition = $(this).offset().top;
        console.log(divPosition);
        
      if(divPosition  - 150 < currentScroll){
        $currentSection = $(this);
        console.log($currentSection);
      }
      var id = $currentSection.attr('id');
        if (id !== undefined){
            $("#top-menu").show();
            $("#create-events").show()
            $("#create-events").addClass("toMenu");
        } else {
            $("#top-menu").hide();
            $("#create-events").hide()
            $("#create-events").removeClass("toMenu");
        }
   	 $('#top-menu li a').removeClass('active');
   	 $("[href=\\#"+id+"]").addClass('active');

    })

  });

    if(window.location.href.indexOf("loggedin.html") > -1){
        localStorage.setItem("signed-in", true);
        
    }
    var sign_in = $(".sign-in");
    if(window.location.href.indexOf("index.html") > -1 || window.location.href.indexOf("event_details.html") > -1){
        var user_loggedin = localStorage.getItem("signed-in", true);
        var username = localStorage.getItem("username");
            if(user_loggedin == 'true'){
                $(".events").parent("li").append("<li><a class='scroll-menu account' href='loggedin.html'>Account</a></li>")
                sign_in.attr('href', '#index.html');
                sign_in.html("Sign Out");  
                sign_in.addClass("sign-out");
                
                $("#create-events").on('click', function(){
                    $(this).addClass("menuTransition");
                      $("#menuContent").delay(500).fadeIn(1);
                      $(this).text('');
                        $("textarea[name='org']").html(username);
                })
            } else {
                $("#create-events").on('click', function(){
                    alert("Please sign in first to create an event.")
                })
            }
        
            $("#menuClose").click(function() {
                $("#create-events").removeClass("menuTransition");
                $("#menuContent").fadeOut(300);
                $("#create-events").html('+');
                $("#menu.toMenu").css('transition', '.5s ease-in-out');
              });
    }
    
    $(".sign-out").on('click',function(){
        localStorage.setItem("signed-in", false);
        $(".account").remove();
        sign_in.attr('href', 'signup.html');
        sign_in.html("Sign In"); 
    })
    
   var location;
    $("input[name='address']").on('change', function(){
        var add_str = $(this).val();
        var replace_add = add_str.split(' ').join('+');
        console.log(replace_add);
        $.ajax({
            url:"https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address="+ replace_add +"&key=AIzaSyBTnL_MrIIX7Ta5nuWjEHLMqY2rcXiA7N0",
            type: "GET",
            contentType: "application/json",
            success:function(response){
                location = JSON.stringify(response.results[0].formatted_address);
                $(this).val(location);
                localStorage.setItem("location", location);
            }
        })
    })
    function readURL(input) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
                $("#blah").attr('src', e.target.result);
                $("#blah").show();
                localStorage.setItem("base64", e.target.result);

    }

    reader.readAsDataURL(input.files[0]);
      }
    }
    $("#imgUpload").change(function() {
      readURL(this);
        
    });
    
    function showPreview(coords){
        var rx = 100 / coords.w;
        var ry = 100 / coords.h;

        $('#uploadPreview1').css({
            width: Math.round(rx * 500) + 'px',
            height: Math.round(ry * 370) + 'px',
            marginLeft: '-' + Math.round(rx * coords.x) + 'px',
            marginTop: '-' + Math.round(ry * coords.y) + 'px'
        });
    }
    
    $("#btn-create").on('click', function(){
        var title = $("input[name='title']").val();
        var desc = $("textarea[name='desc']").val();
        var location = $("input[name='address']").val();
        var startDate = document.getElementById('start_date').value;
        var endDate = document.getElementById('end_date').value;
        var ticket = $("select[name='ticket'] option:selected").val();
        var eventType = $("select[name='event'] option:selected").val();
        console.log(startDate + " " + endDate);
        localStorage.setItem("title", title);
        localStorage.setItem("desc", desc);
        localStorage.setItem("start", startDate);
        localStorage.setItem("end", endDate);
        localStorage.setItem("ticket", ticket);
        localStorage.setItem("eventType", eventType);
        validateForm();
        if(validateForm() == true){
            window.location.href = "event_details.html";
            eventDetails();
        }
        
    });

    eventDetails();
    function eventDetails(){
        if(window.location.href.indexOf("event_details.html") > -1){
            var title = localStorage.getItem("title");
            var desc = localStorage.getItem("desc");
            var start = localStorage.getItem("start");
            var end = localStorage.getItem("end");
            var ticket = localStorage.getItem("ticket");
            var eventType = localStorage.getItem("eventType");
            var base64 = localStorage.getItem("base64");
            var location = JSON.parse(localStorage.getItem("location"));
            $("#event-title").html(title);
            $(".img").attr('src', base64);
            $("p#desc").html(desc);
            $("#start").html(start);
            $("#type").html(eventType + " Events")
            $("#end").html(end);
            $("#map").before("<p>"+location+"</p>");
            if(start != "" && start != ""){
                $("#dates").show();
            } else {
                $("#dates").hide();
            }
        }
    }
    
    function validateForm() {
      var isValid = true;
      $('.required').each(function() {
        if ( $(this).val() === '' ) {
            isValid = false;
        } else {
            
        }
      });
      return isValid;
    }
})

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
                url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query="+replace_loc+"&sensor=false&key=AIzaSyBQVsS3Zgj3lbDr74ihMMzk7Plq4ND3_b0", 
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

            
//        $.ajax({ 
//            url: "https://api.mlab.com/api/1/databases/events/collections/events?apiKey=6tUOcgEycXkPBDS6QAVDF13wOHcNnf3O",
//            data: JSON.stringify({
//                "title": title,
//                "desc": desc,
//                "location": location,
//                "startDate": startDate,
//                "endDate": endDate,
//                "base64": base64,
//                "ticket": ticket,
//                "eventType": eventType
//            }),
//            type: "POST",
//            contentType: "application/json",
//            success:function(response) {
//                window.location.href = "event_details.html";
//                console.log(response);
//                eventDetails();
//            }
//        })
//    })