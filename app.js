const express = require("express");

const { json } = require("express/lib/response");

const https = require("https");

const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //console.log("post req received");
  //console.log(req.body.Cityname);
  const appkey = "fe476581d6d4f8086caf42fb8bb29c7e";
  const unit = "metric";
  const query = req.body.Cityname;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?appid=" + appkey + "&units=" + unit + "&q=" + query + "";
  https.get(url, function (response) {
    //console.log(response);
    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      //  json.stringify(object)
      console.log(weatherdata);
      const temp = weatherdata.main.temp;
      const weatherdesp = weatherdata.weather[0].description;
      //console.log(temp);
      //res.send("<h1>the temp in london is "+temp+" degree celcius</h1>");
      const icon = weatherdata.weather[0].icon;
      const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The Temp in " + query + " is " + temp + " degree celcius</h1>");
      res.write("<p>The weather is currently " + weatherdesp + " </p>");
      res.write("<img src=" + imgurl + ">");
      res.send();
    });
  });
})

app.listen(3000, function () {
  console.log("server is running at the port");
});
