const { transporter } = require("../../nodemailer/nodemailer");

const SendMail_booking = async (data) => {

    try {

        await transporter.sendMail({
            from: '"RentTen / Rent for everyone" "<Rent-Ten@rentten.com>"',
            to: data.renter_email,
            subject: "Details of your booking on Rent-Ten",
            html:
                `<h1 style="color:blue"> Thank you for booking on Rent-Ten!</h1>
        <h3>Here are the details of your booking:</h3><br/>
            <b>• Link to the place you rent:</b>  <a href="http://localhost:4200/housedetail/${data.houseId}">HOUSE</a>,<br/>
            <b>• When you can entry to the house:</b> ${data.start}<br/>
            <b>• When you must go out:</b> ${data.end}<br/>
        <h3>Remember contact your guest one day before!</h3><br/>

            Email of your host: ${data.guest_email}`,
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    SendMail_booking
}