const mp = new MercadoPago("TEST-5e794334-bb92-4bf9-8833-a6e409c170ec");

module.exports = { mp };

// const bricksBuilder = mp.bricks();

// const renderCardPaymentBrick = async (bricksBuilder) => {
//   const settings = {
//     initialization: {
//       amount: 100, // monto a ser pago
//     },
//     callbacks: {
//       onReady: () => {
//         // callback llamado cuando Brick esté listo
//       },
//       onSubmit: (cardFormData) => {
//         // callback llamado cuando el usuario haga clic en el botón enviar los datos
//         console.log(cardFormData);
//         // ejemplo de envío de los datos recolectados por el Brick a su servidor
//         return new Promise((resolve, reject) => {
//           fetch("http://localhost:3001/houses/process_payment", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(cardFormData),
//           })
//             .then((response) => {
//               // recibir el resultado del pago
//               return response.json();
//             })
//             .then((data) => {
//               console.log(data);
//               sessionStorage.setItem("key", JSON.stringify(data));
//               resolve();
//             })
//             .catch((error) => {
//               console.log(error);
//               // tratar respuesta de error al intentar crear el pago
//               reject();
//             });
//         });
//       },
//       onError: (error) => {
//         // callback llamado para todos los casos de error de Brick
//         console.log(error);
//       },
//     },
//   };
//   window.cardPaymentBrickController = await bricksBuilder.create(
//     "cardPayment",
//     "cardPaymentBrick_container",
//     settings
//   );
// };
// renderCardPaymentBrick(bricksBuilder);
