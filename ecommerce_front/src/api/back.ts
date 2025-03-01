import { IErrors } from "@/hooks/useApi";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { enqueueSnackbar } from "notistack";

export const baseURL = "http://localhost:5000/api/";

const back = axios.create({
  baseURL,
});

back.interceptors.response.use(
  async (res) => res,
  (error) => {
    if (error instanceof AxiosError)
      if (error.response?.data.errors) {
        error.response?.data.errors.forEach(({ msg }: IErrors) => {
          enqueueSnackbar(msg, { autoHideDuration: 3000, variant: "error" });
          if (
            error?.response?.status &&
            [503, 401].includes(error?.response?.status)
          ) {
            redirect("/");
          }
        });
        return Promise.reject(error);
      }
    enqueueSnackbar(
      error.response?.data.msg || "Internal error, please reload page.",
      { autoHideDuration: 3000, variant: "error" }
    );
    return Promise.reject(error);
  }
);

export { back };
