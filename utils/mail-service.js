import { google } from 'googleapis';
import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const oauthLink = 'https://developers.google.com/oauthplayground';

const {
  EMAIL, MAIL_SERVICE_ID, MAIL_REFRESH_TOKEN, MAIL_SERVICE_SECRET,
} = process.env;

const auth = new google.auth.OAuth2(
  MAIL_SERVICE_ID,
  MAIL_SERVICE_SECRET,
  MAIL_REFRESH_TOKEN,
  oauthLink,
);

const sendEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAIL_REFRESH_TOKEN,
  });

  const accessToken = auth.getAccessToken();

  const stmp = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL,
      clientId: MAIL_SERVICE_ID,
      clientSecret: MAIL_SERVICE_SECRET,
      refreshToken: MAIL_REFRESH_TOKEN,
      accessToken,
    },
  });

  const option = {
    from: EMAIL,
    to: email,
    subject: 'Mouthbook 驗證',
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"><span>Action requise : Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Facebook. To complete your registration, please confirm your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay in touch with all your friends, once refistered on facebook,you can share photos,organize events and much more.</span></div></div>`,
  };

  stmp.sendMail(option, (err, res) => {
    if (err) return err;
    return res;
  });
};

export default sendEmail;
