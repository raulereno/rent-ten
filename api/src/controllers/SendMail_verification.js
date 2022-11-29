
const { transporter } = require("../../nodemailer/nodemailer");

const SendMail_verification = async (mail, code) => {
    try {

        await transporter.sendMail({
            from: '"Verication email for your Rent-Ten account" "<Rent-Ten@rentten.com>"',
            to: mail,
            subject: "Verification code",
            html:
                `
            <tr align="center"><td><div><div></div></div><table border="0" cellspacing="0" cellpadding="0" style="padding-bottom:20px;max-width:516px;min-width:220px"><tbody><tr><td width="8" style="width:8px"></td><td><div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px" align="center" class="m_6308799531927792701mdv2rw"><img src="https://i.ibb.co/kBWJzcG/logo.png" width="74" height="44" aria-hidden="true" style="margin-bottom:16px" alt="Google" class="CToWUd" data-bit="iit"><div style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word">
            <div style="font-size:24px">Verify your email on Rent-Ten </div></div><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">Your code for verify ${mail} on Rent-Ten.<br><br>Use this code for verify your profile:<br><div style="text-align:center;font-size:36px;margin-top:20px;line-height:44px">${code}</div><br>This code will expire in 24&nbsp;hours.<br><br>If you didnt require verify <a style="font-weight:bold">${mail}</a>, just ignore this message.</div></div><div style="text-align:left"><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center"><div>Te hemos enviado este correo electrónico para informarte de cambios importantes en tu cuenta y en los servicios de Rent-Ten.</div><div style="direction:ltr">© 2022 Rent-Ten LLC, <a class="m_6308799531927792701afal" style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center">1503 Argentina, Buenos Aires, CA 9543, ARG</a></div></div></div></td><td width="8" style="width:8px"></td></tr></tbody></table></td></tr>
            `
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    SendMail_verification
}