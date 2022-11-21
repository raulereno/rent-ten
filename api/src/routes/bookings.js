const { House, User, Review, Booking } = require("../db");
const { SendMail_booking } = require("../controllers/SendMail_booking")

const { Router } = require("express");
const router = Router();


router.put("/checkstatus", async (req, res) => {

    const { code, status, houseId } = req.body

    try {

        let booking_finder = await Booking.findOne({ where: { code: code }, include: [User, House] })
        let house_finder = await House.findByPk(houseId, { include: [User] })

        if (booking_finder) {

            await booking_finder.update({ status: status })
            let data = {
                houseId: houseId,
                start: booking_finder.start,
                end: booking_finder.end,
                guest_email: house_finder.Users[0].mail ? house_finder.Users[0].mail : 'No owner for this house',
                renter_email: booking_finder.User.mail
            }

            await SendMail_booking(data)
            return res.status(200).json({ msg: `Status of booking with code ${code} has changed to ${status}` })
        }
        return res.status(404).json({ msg: `No booking found with code ${code}` })
    } catch (error) {
        console.log(error)
    }
});


router.post("/", async (req, res) => {

    const { newReserve, houseId, userId } = req.body

    try {

        let newBook = await Booking.create(newReserve)
        await newBook.setHouse(houseId)
        await newBook.setUser(userId)

        res.status(200).json(newBook);

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;