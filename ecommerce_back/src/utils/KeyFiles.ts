/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-useless-catch */
import fs from "fs";
import app from "../Config";
import crypto from "crypto";

const generateKeys = () => {
  try {
    if (!fs.existsSync(app.publicKey) && !fs.existsSync(app.privateKey)) {
      const options = {
        namedCurve: "secp521r1",
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      };
      const { publicKey, privateKey } = crypto.generateKeyPairSync(
        "ec",
        options
      );

      fs.writeFileSync(app.publicKey, publicKey as never);
      fs.writeFileSync(app.privateKey, privateKey as never);
    }
  } catch (error) {
    throw error;
  }
};

if (Boolean(process.env.terminal)) {
  generateKeys();
}

export default generateKeys;
