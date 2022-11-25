const { conn } = require("./src/db.js");
const axios = require("axios");
const server = require("./src/app.js");
const http = require("http").Server(server);

// const io = require("socket.io")(http, {
//   cors: {
//     origin: true,
//     credentials: true,
//     allowedHeaders: ["my-custom-header"],
//     methods: ["GET", "POST"],
//   },
// });
// io.on("connection", (socket) => {
//   console.log("Nuevo usuario conectado");
//   console.log(socket);
//   socket.on("sendMessage", (messageInfo) => {
//     console.log(messageInfo);
//     socket.broadcast.emit("receiveMessage", messageInfo);
//   });
// });
//   socket.on("sendMessage", (messageInfo) => {
//     if (messageInfo.text === "paidMethod") {
//       messageInfo = {
//         text: "El metodo de pago es MercadoPago",
//         messageType: 1,
//       };
//     }
//     console.log(messageInfo);
//     socket.emit("receiveMessage", messageInfo);
//   });
// });

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    axios.post("http://localhost:3001/houses/fulldb");
  });
});

// http.listen(3000, () => {
//   console.log(`Server on port ${3000}`);
// });
