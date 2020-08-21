const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/weatherFinder", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/weatherFinder", function (req, res) {
  var cityName = req.body.cityName;
  if (cityName === "") {
    res.send("Please enter city Name");
  } else {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=5d7acc7e34f1f0b651fd52b3de0675ce&units=metric";

    https.get(url, function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        const description = weatherData.weather[0].description;
        res.write("<p> the weather currently is " + description + "</p>");
        res.write(
          "<h1>The Weather in " +
            cityName +
            "  is  " +
            temp +
            "  degree celcius</h1>"
        );
        res.write("<img src=" + imageUrl + ">");

        res.send();
      });
    });
  }
});

// app.get("/", function (req, res) {
//   const url =
//     "https://api.openweathermap.org/data/2.5/weather?q=Thane&appid=5d7acc7e34f1f0b651fd52b3de0675ce&units=metric";

//   https.get(url, function (response) {
//     console.log(response.statusCode);

//     response.on("data", function (data) {
//       const weatherData = JSON.parse(data);
//       const temp = weatherData.main.temp;
//       const icon = weatherData.weather[0].icon;
//       const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

//       const description = weatherData.weather[0].description;
//       res.write("<p> the weather currently is " + description + "</p>");
//       res.write(
//         "<h1>The Weather in Thane is  " + temp + "  degree celcius</h1>"
//       );
//       res.write("<img src=" + imageUrl + ">");

//       res.send();
//     });
//   });
// });

app.listen(3000, function () {
  console.log("server running port 3000");
});
