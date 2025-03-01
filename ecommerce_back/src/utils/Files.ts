import path from "path";
import fs from "fs";
import { Crypt } from "./";
import { UploadedFile } from "express-fileupload";
const extensionesImage = ["png", "jpg", "jpeg", "gif"];
const extensionesDoc = ["pdf"];

export interface ResultGetFile {
  Base64: string;
  extension: string;
}

const existFolder = () => {
  if (!fs.existsSync(path.join(__dirname, "../private/profile"))) {
    fs.mkdirSync(path.join(__dirname, "../private/profile"), {
      recursive: true,
    });
  }
};

const salveFile = (
  file: UploadedFile,
  folder: string,
  id: number | string,
  type: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cutName = file.name.split(".");
    const extension = cutName[cutName.length - 1];

    switch (type) {
      case "image":
        if (!extensionesImage.includes(extension)) {
          return reject(
            `La extensión ${extension} del archivo ${file.name} no es permitidas - ${extensionesImage}`
          );
        }
        break;

      case "doc":
        if (!extensionesDoc.includes(extension)) {
          return reject(
            `La extensión ${extension} del archivo ${file.name} no es permitidas - ${extensionesDoc}`
          );
        }
        break;

      default:
        return reject(
          `La extensión ${extension} del archivo ${file.name} no es permitidas - ${extensionesDoc},${extensionesImage}`
        );
    }

    const nameTemp =
      Crypt.encrypt(`${file.name}-${id}-${file?.md5}`) + `.${extension}`;
    const uploadPath = path.join(__dirname, "../private/", folder, nameTemp);

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(nameTemp);
    });
  });
};

const getFile = (rutaFile: string): Promise<ResultGetFile> => {
  return new Promise((resolve, reject) => {
    if (rutaFile.length === 0) {
      reject("Debe ingresar la ruta del archivo.");
    }
    const cutName = rutaFile.split(".");
    const extension = cutName[cutName.length - 1];
    const ruta = path.join(__dirname, "../private/", rutaFile);
    fs.readFile(ruta, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve({ Base64: data.toString("base64"), extension: extension });
    });
  });
};

const deleteFile = (rutaFile: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const ruta = path.join(__dirname, "../private/", rutaFile);
    fs.unlink(ruta, (err) => {
      if (err) {
        return reject(false);
      }
      return resolve(true);
    });
  });
};

/**
 * Guarda una imagen desde un string Base64.
 * @param base64Data El string base64 que representa la imagen.
 * @param outputPath La ruta donde se guardará la imagen.
 * @returns Un objeto con el estado de la operación y el nombre del archivo.
 */
async function saveImageFromBase64(
  base64Data: string,
  id: string | number,
  dir_dest: string
): Promise<{ status: boolean; fileName: string }> {
  try {
    const base64String = base64Data.split(",")[1];

    const imageBuffer = Buffer.from(base64String, "base64");
    const hash = Crypt.encrypt(`${id}`);
    const fileType = base64Data.split(";")[0].split("/")[1];
    const fileName = `${hash}.${fileType}`;
    const privateDestinationPath = path.join(
      __dirname,
      "../private/",
      dir_dest
    );
    if (!fs.existsSync(privateDestinationPath)) {
      fs.mkdirSync(privateDestinationPath, {
        recursive: true,
      });
    }
    const outputPath = path.join(privateDestinationPath, fileName);
    return new Promise((resolve, reject) => {
      fs.writeFile(outputPath, imageBuffer, (err) => {
        if (err) {
          return reject({ status: false, fileName: "" });
        }
        return resolve({ status: true, fileName });
      });
    });
  } catch (error) {
    return { status: false, fileName: "" };
  }
}
async function getBase64FromImage(folder: string, name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const privateDirectory = "private";
    const imagePath = path.join(__dirname, "../", privateDirectory, "/", folder, "/", name);
    console.log(imagePath);
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        return reject('');
      }
      const extension = name.split(".")[1];
      return resolve(`data:image/${extension};base64,${data.toString("base64")}`);
    });
  });
}

export default {
  salveFile,
  getFile,
  deleteFile,
  existFolder,
  saveImageFromBase64,
  getBase64FromImage,
};
