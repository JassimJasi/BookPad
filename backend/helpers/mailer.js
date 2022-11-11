const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);
//to send veriication code
exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOption = {
    from: EMAIL,
    to: email,
    subject: "BookPad email varification",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="../frontend/public/icons/icon.png" alt="" srcset="" style="width:30px"><span>Action require : Active your BookPad account</span></div><div style="padding:1rem;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on BookPad.To complete your register, please confirm your account</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm you account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">BookPad help you to build an good friend circle</span></div></div>`,
  };
  stmp.sendMail(mailOption, (req, res) => {
    if (err) return err;
    return res;
  });
};
//to send password reset code
exports.sendResetCode = (email, name, code) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOption = {
    from: EMAIL,
    to: email,
    subject: "Reset BookPad Password",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="../frontend/public/icons/icon.png" alt="" srcset="" style="width:30px"><span>Action require : Active your BookPad account</span></div><div style="padding:1rem;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on BookPad.To complete your register, please confirm your account</span></div><a  style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">${code}</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">BookPad help you to build an good friend circle</span></div></div>`,
  };
  stmp.sendMail(mailOption, (req, res) => {
    if (err) return err;
    return res;
  });
};
