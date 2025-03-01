import dotenv from "dotenv";

dotenv.config();

const Config = {
  //config
  port: process.env.PORT || 3000,
  publicKey: process.env.PUBLIC_KEY || "",
  privateKey: process.env.PRIVATE_KEY || "",
  dev: process.env.NODE_ENV !== "production",
  //DB
  hostDB: process.env.HOST_DB || "",
  userDB: process.env.USER_DB || "",
  portDB: process.env.PORT_DB || "",
  nameDB: process.env.NAME_DB || "",
  PasswordDB: process.env.PASSWORD_DB || "",
  //from
  urlFront: process.env.URL_FRONT,

  //Mails
  userMail: process.env.USER_MAIL,
  passwordMail: process.env.PASSWORD_MAIL,
  service: process.env.SERVICE || "",
  // keyMail: process.env.KEY_MAIL,

  //CERTIFICADOS
  urlCertificado: process.env.URL_CERTIFICATE,

  //FIREBASE
  clientEmailFB: process.env.CLIENT_EMAIL_FB,
  proyectIdFB: process.env.PROYECT_ID_FB,
  privateKeyFB: process.env.PRIVATE_KEY_FB,
  socket: Boolean(process.env.USE_SOCKET),
};

export default Config;
