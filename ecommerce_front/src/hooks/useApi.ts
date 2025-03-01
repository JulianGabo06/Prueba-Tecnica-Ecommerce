import { useState } from "react";
import { AxiosError, AxiosRequestConfig, Method } from "axios";
import { back } from "@/api/back";
import { useUserStore } from "@/stores/user/user.store";

export type IHeaderPropsAPI = {
  "access-token": string | undefined;
  "Content-Type": string | undefined;
};

export interface IRequestProp extends AxiosRequestConfig {
  headers: IHeaderPropsAPI;
  method: Method;
}

export interface ILoadApiProps {
  endpoint: string;
  token?: boolean;
  type: Method;
  instance?: "api_back";
  body?: unknown;
  headers?: IHeaderPropsAPI;
  abortController?: AbortController;
}

export interface IErrors {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export const useApi = () => {
  const [loadingApi, setLoading] = useState<string[]>([]);
  const localToken = useUserStore((state) => state.token);
  const logOut = useUserStore((state) => state.logOut);

  const loadApi = async <R extends object>({
    type = "GET",
    endpoint,
    token = true,
    body,
    instance = "api_back",
    headers = {
      "access-token": undefined,
      "Content-Type": undefined,
    },
    abortController = new AbortController(),
  }: ILoadApiProps): Promise<R> => {
    setLoading([...loadingApi, `${type}__${endpoint}`]);

    try {
      if (token && localToken) {
        if (localToken.length === 0) {
          throw new Error("No has iniciado sesión.");
        }
        headers["access-token"] = localToken;
      }

      const config: IRequestProp = {
        method: type,
        url: endpoint,
        headers: headers,
        signal: abortController.signal,
      };

      if (body) {
        config.data = body;
      }

      let response;
      switch (instance) {
        case "api_back":
        default:
          response = await back<R>(config).then((res: any) => res.data);
          break;
      }

      setLoading((prevState) =>
        prevState.filter((item) => item !== `${type}__${endpoint}`)
      );
      return response;
    } catch (error) {
      setLoading((prevState) =>
        prevState.filter((item) => item !== `${type}__${endpoint}`)
      );
      if (error instanceof AxiosError) {
        if (error.response?.data?.msg) {
          switch (error.response.data.msg) {
            case "INVALID_TOKEN":
              logOut();
              throw new Error("Sesión expirada vuelva iniciar sesion.");
            case "NOT-PROVIDED-TOKEN":
              throw new Error("Se requiere un token.");
            case "NOT-PROVIDED-IP":
              throw new Error("No se reconoció el origen de la petición.");
            default:
              throw new Error(error.response.data.msg);
          }
        } else if (error.response?.data.errors) {
          const listMsg: string[] = error.response?.data.errors.map(
            ({ msg }: IErrors) => msg
          );
          throw new Error(listMsg.join(", "));
        } else {
          throw new Error(
            "Error de conexión, actualiza la página e intente nuevamente."
          );
        }
      } else {
        throw new Error(
          "Error de conexión, actualiza la página e intente nuevamente."
        );
      }
    }
  };

  return {
    loadApi,
    loadingApi,
    loggedApi: Boolean(localToken),
  };
};
