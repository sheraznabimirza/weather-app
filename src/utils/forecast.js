const request = require("request");

const forecast = ({ latitude, longitude }, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=6325accb7a871025886b2cae162ecdf4&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather server", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const temp = body.current.temperature;
      const feelslike = body.current.feelslike;
      const weather_descriptions = body.current.weather_descriptions[0];

      const data =
        weather_descriptions +
        ". It is currently " +
        temp +
        " degrees out. It feels like " +
        feelslike +
        " degrees out.";

      callback(undefined, data);
    }
  });
};

module.exports = forecast;
