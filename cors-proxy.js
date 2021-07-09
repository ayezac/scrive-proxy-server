const express = require("express");
const request = require("request");
app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

const api = "https://scrive.com";

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    req.header("access-control-request-headers")
  );

  if (req.method === "OPTIONS") {
    // CORS Preflight
    res.send();
  } else if (req.method === "POST") {
    request(
      {
        url: api + req.url,
        method: req.method,
        form: req.body,
      },
      function (error, response) {
        if (error) {
          console.error("error: " + response.statusCode);
        }
      }
    ).pipe(res);
  } else if (req.method === "GET") {
    const headers = req.headers;
    delete headers.host;
    request(
      {
        url: api + req.url,
        method: req.method,
        headers: req.headers,
      },
      function (error, response) {
        if (error) {
          console.error("error: " + error);
        }
      }
    ).pipe(res);
  }
});

app.set("port", 3030);

app.listen(app.get("port"), function () {
  console.log("Proxy server listening on port " + app.get("port"));
});
