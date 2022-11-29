const { conn } = require("./src/db.js");
const axios = require("axios");
const server = require("./src/app.js");

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    axios.post("http://localhost:3001/houses/fulldb");
  });
});
