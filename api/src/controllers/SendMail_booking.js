const { transporter } = require("../../nodemailer/nodemailer");


const SendMail_booking = async (data) => {
    try {

        await transporter.sendMail({
            from: '"RentTen / Rent for everyone" "<Rent-Ten@rentten.com>"',
            to: data.renter_email,
            subject: "Details of your booking on Rent-Ten",
            html:
                `
            <tr align="center"><td><div><div></div></div><table border="0" cellspacing="0" cellpadding="0" style="padding-bottom:20px;max-width:516px;min-width:220px"><tbody><tr><td width="8" style="width:8px"></td><td><div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px" align="center" class="m_-8822763748912768113mdv2rw"><img src="https://i.ibb.co/kBWJzcG/logo.png" width="74" height="44" aria-hidden="true" style="margin-bottom:16px" alt="Rent-Ten" class="CToWUd" data-bit="iit"><div style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word"><div style="font-size:24px"> Details of your booking on Rent-Ten </div></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">

            <h3 style="color:blue"> Thank you for booking on Rent-Ten!</h3>
            <h3>Here are the details of your booking:</h3><br/>
            <b>• Link to the place you rented:</b>  <a href="http://localhost:4200/housedetail/${data.houseId}">CLICK</a><br/>
            <b>• When you can entry to the house:</b> ${data.start}<br/>
            <b>• When you must go out:</b> ${data.end}<br/>
            <h3>Remember contact your guest one day before!</h3><br/>

            Email of your host: ${data.guest_email}
            
            </div></div><div style="text-align:left"><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center"><div>Te hemos enviado este correo electrónico para informarte de cambios importantes en tu cuenta y en los servicios de Rent-Ten.</div><div style="direction:ltr">© 2022 Rent-Ten LLC, <a class="m_-8822763748912768113afal" style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center">1503 Argentina, Buenos Aires, CA 9543, ARG</a></div></div></div></td><td width="8" style="width:8px"></td></tr></tbody></table></td></tr>
            
            `,

        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    SendMail_booking
}