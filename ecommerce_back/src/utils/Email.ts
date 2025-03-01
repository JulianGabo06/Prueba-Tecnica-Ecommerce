import fs from "fs";
import path from "path";
import Config from "../Config";
import handlebars from "handlebars";
import nodemailer from "nodemailer";
import { Attachment } from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
  service: Config.service,
  auth: {
    user: Config.userMail,
    pass: Config.passwordMail,
  },
});

const createEmail = async <A extends object>(
  file: string,
  info: A
): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, `../assets/emails/${file}`),
      { encoding: "utf-8" },
      function (err, html) {
        if (err) {
          return reject(err);
        } else {
          const template = handlebars.compile(html);
          const htmlToSend = template({ ...info });
          return resolve(htmlToSend);
        }
      }
    );
  });
};

/** parametriza el correo que será enviado */
const sendCustomEmail = async <R extends object>(
  subject: string,
  destinatario: string[],
  file: string,
  replacements: R,
  attachments?: Attachment[] | undefined
) => {
  try {
    const content = await createEmail(file, replacements);

    const info = await transporter.sendMail({
      from: Config.userMail,
      to: destinatario,
      subject,
      html: content,
      attachments,
    });

    if (info.rejected.length > 0) {
      return {
        message: `Los siguientes destinatarios no recibieron la notificación: ${info.rejected.toString()}`,
      };
    }

    return { message: "Notificación enviada." };
  } catch (error) {
    console.error(`Error al enviar email:`, error);
  }
};

export default { sendCustomEmail };
