const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sheraz Mirza",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Sheraz Mirza",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help page that will assist u",
    name: "Sheraz Mirza",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address is provided",
    });
  }

  const { address } = req.query;

  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    forecast(data, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location: data.location,
        address,
      });
    });
  });

  // res.send({
  //   location: address,
  //   forecast: "Hazy and stuff",
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req);
  const { search } = req.query;

  res.send({
    products: search,
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "Sheraz Mirza",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Page not found.",
    name: "Sheraz Mirza",
  });
});

app.listen(5000, () => {
  console.log("Server is up and running on port 5000");
});
