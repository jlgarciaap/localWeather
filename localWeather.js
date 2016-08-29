



"use strict";

var latitude = '', longitude = '', coords= '';
var APIKEY = "198bc8aeab2883153dbdc0e81bc2db0b";
var country = "";
var weather = "";
var icon = "";
var weatherDescription = "";
var temp= "";
var background="";


function getWeather() {



    $.getJSON('http://ipinfo.io', function(data){

        coords = data.loc.split(",");
        latitude = coords[0];
        longitude = coords[1];


        $.ajax({
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            url:
            'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon='
            + longitude + '&APPID='+ APIKEY + "&units=metric&lang=" + data.country.toLowerCase() ,

            success: function(response) {
                var r = response;

                console.log(response);

                country = r.sys.country;
                icon = '<img src=http://openweathermap.org/img/w/' + r.weather[0].icon + '.png>';
                weather = r.weather[0].main;
                weatherDescription = r.weather[0].description;
                temp = r.main.temp;

                console.log(weather);

                switch (weather) {
                    case "Clear":
                        background = "https://jorindech.files.wordpress.com/2016/02/wolke2.jpg";
                        break;
                    case "Rain" || "Drizzle":
                        background = "http://cdn.wallpapersafari.com/13/84/NTa3RY.jpg";
                        break;
                    case "Clouds":
                        background = "http://il6.picdn.net/shutterstock/videos/9941828/thumb/1.jpg";
                        break;
                    case "Extreme" || "Thunderstorm":
                        background = "http://images.nationalgeographic.com/wpf/media-live/" +
                            "photos/000/475/cache/science-extreme-weather-iceland-volcano_47513_600x450.jpg";
                        break;
                    case "Snow":
                        background = "http://g01.a.alicdn.com/kf/HTB114VMJVXXXXbIXXXXq6xXFXXXr/" +
                            "send-rolled-8-X10-White-Snow-font-b-Forest-b-font-font-b-Backdrop-b-font.jpg";
                        break;
                    default:
                        background = "http://cdn.backgroundhost.com/backgrounds/subtlepatterns/crissXcross.png";
                        break;
                };

                    var urlBackground = "url(" + background + ")";


                $(".tempBox").animate({
                        opacity: 0
                    }, 500,
                    function() {
                        $(this).animate({
                            opacity: 1
                        }, 500);
                        $('#city').text(weatherDescription);
                        $('#temp').html(temp);
                        $('#icon').html(icon);
                        $("body").css("background-image",urlBackground);

                        });

            }

        });

    });
}

function changeTemp(value){


    var result;

    if(value == "F"){

        result = Math.round((temp * 1.8000) + 32.00);



    } else {

        result = temp

    }

    $("#temp").html(result);


}
$(document).ready(function() {

    getWeather();
    //Se llama nada mas cargar la pagina


});


