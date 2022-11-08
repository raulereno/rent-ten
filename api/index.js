const server = require("./src/app.js");
const { conn } = require("./src/db.js");


const { House, User, Review} = require("./src/db.js");

conn.sync({ force: false }).then(() => {
    server.listen(process.env.PORT, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
});

