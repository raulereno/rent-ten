const { User } = require("../db");

const getUsers =() =>{
  const users = User.findAll();
  return users
}


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
    await User.create(data);
  }

  return createUser;
};
const updateProfilePicture = async (userID, newPicture, authID) => {
  const finder = await User.findOne({ where: { id: userID } });
  await finder.update({ picture: newPicture });
  // axios
  //   .patch(`https://YOUR_DOMAIN/api/v2/users/${authID}`, {
  //     data: { user_metada: { picture: newPicture } },
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
};

module.exports = { getUsers, getUser, createUser, updateProfilePicture };
