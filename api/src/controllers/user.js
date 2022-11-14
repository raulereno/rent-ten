const { User } = require("../db");

const getUser = (mail, password) => {
  //acordarse del password

  if (!mail) {
    throw new Error("Es requerido el mail");
  }

  const findUser = User.findOne({ where: { mail: mail } });

  return findUser;
};

const createUser = async (data) => {
  const { mail } = data;
  const finder = await User.findOne({ where: { sub: data.sub } });

  if (!mail) {
    throw new Error(
      "Estos datos son requeridos para la creación de un usuario"
    );
  }

  if (!finder) {
  await User.create(data)}

  return createUser;
};

module.exports = { getUser, createUser };
