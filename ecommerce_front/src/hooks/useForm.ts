import { SelectChangeEvent } from "@mui/material";
import { Moment } from "moment";
import { useState } from "react";

const stateToFocuses = <T extends object>(
  state: T
): Record<string, boolean> => {
  return Object.keys(state).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as Record<string, boolean>);
};

export interface IInputs {
  target: {
    value: Moment | number | boolean | any[];
    name: string;
    files?: FileList | null;
  };
}
export const useForm = <T extends object, V extends object>(
  initState: T,
  validator?: V
) => {
  const inititialFocuses = stateToFocuses(initState);
  const [state, setState] = useState<T>(initState);
  const [focuses, setFocuses] = useState(inititialFocuses);

  const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | unknown>
      | IInputs,
    key: keyof T,
    file: boolean = false,
    arrayFiles: boolean = false
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      (async () => {
        const { target } = e;
        if (!file) {
          const { value, checked, type } = target as HTMLInputElement;
          if (type === "checkbox") {
            setState({
              ...state,
              [key]: checked,
            });
          } else {
            setState({
              ...state,
              [key]: type === "number" ? Number(value) : value,
            });
          }
          return resolve("Cambios guardados con Exito!");
        }

        if (arrayFiles) {
          const { files } = target as HTMLInputElement;
          if (!files) {
            return reject("Debe Seleccionar los archivos a cargar.");
          }
          const values = Array.from(files);
          const listFiles = await Promise.all(
            values.map(async (file: File) => {
              const base64String = await getBase64(file);
              return {
                file: base64String,
                url: URL.createObjectURL(file),
                name: file.name,
              };
            })
          );
          const value = state[key] as unknown[];
          if (value.length > 0) {
            setState({
              ...state,
              [key]: [...value, ...listFiles],
            });
          } else {
            setState({ ...state, [key]: listFiles });
          }
          return resolve("Archivos cargados con exito!");
        }

        if (file) {
          const { files } = target as HTMLInputElement;
          if (!files || files.length === 0) {
            return reject("Debe Seleccionar un archivo");
          }
          setState({
            ...state,
            [key]: {
              file: await getBase64(files[0]),
              url: URL.createObjectURL(files[0]),
              name: files[0].name,
            },
          });
          return resolve("Archivo cargado con exito!");
        }
      })();
    });
  };

  const setForm = (form: T): Promise<string> => {
    return new Promise((resolve) => {
      (async () => {
        setState({
          ...form,
        });
        return resolve("Cambios guardados con Exito!");
      })();
    });
  };

  const resetForm = () => {
    setForm(initState);
  };

  const isValidRegExpObject = (obj: V): obj is V & Record<string, RegExp> => {
    if (typeof obj !== "object" || obj === null) return false;

    for (const key in obj) {
      const value = obj[key];
      if (
        value &&
        typeof value === "object" &&
        value.constructor.name === "RegExp"
      ) {
        continue;
      } else {
        return false;
      }
    }

    return true;
  };

  const validateFieldsText = (key: keyof V, value: keyof T) => {
    if (!validator) {
      throw new Error("To use this feature you need the validators.");
    }
    const v = validator[key] as RegExp;
    return v.test(state[value] as string);
  };

  const onChangeFocus = (key?: keyof T) => {
    const f = { ...focuses };
    for (const keys in state) {
      if (keys === key) {
        f[keys] = true;
      } else {
        f[keys] = false;
      }
    }

    setFocuses(f);
  };

  if (validator && !isValidRegExpObject(validator)) {
    throw new Error("All validator fields must be of RegEx type.");
  }

  return {
    ...state,
    form: state,
    focuses,
    onChange,
    setForm,
    resetForm,
    getBase64,
    validateFieldsText,
    onChangeFocus,
  };
};

export default useForm;