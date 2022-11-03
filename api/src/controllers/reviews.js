const { Review, House, User } = require("../db");

const addReview = async (data) => {
  const { opinion, rating, userId, houseId } = data;

  if (!opinion && (!rating || rating <= 0 || rating >= 6)) {
    throw new Error("Datos invalidos");
  }

  const newReview = await Review.create({ opinion, rating });

  newReview.setHouse(houseId);
  newReview.setUser(userId);
  return newReview;
};

const getReviews = async (houseId) => {
  if (!houseId) {
    throw new Error("Se requiere id de casa para ver las reseñas.");
  }
  const reviewsFromHouse = await Review.findAll({ where: { houseId } });
  return reviewsFromHouse;
};

module.exports = { addReview, getReviews };
