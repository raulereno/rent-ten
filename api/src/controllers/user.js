const { User } = require("../db");

const getUser = (mail, password) => {
  //acordarse del password

  if (!mail) {
    throw new Error("Es requerido el mail");
  }

  const findUser = User.findOne({ where: { mail } });

  return findUser;
};

const createUser = async (data) => {
  const { name, lastname, mail, country } = data;
  if (!name || !lastname || !mail || !country) {
    throw new Error(
      "Estos datos son requeridos para la creación de un usuario"
    );
  }

  const createUser = await User.create(data);

  return createUser;
};

//Hacer una nueva ruta de admind rent-ten/admin y separar los controllers

//Funcion que va a mostrar todos los usuarios, a aquellas personas que tiene autorización
// const allUser = async (mail) => {
//   const user = await User.findOne({ where: { mail } });

//   if (!user.admin) {
//     throw new Error("Se requieren permisos");
//   }

//   const allUsers = await User.findAll();

//   return allUsers;
// };

module.exports = { getUser, createUser };
