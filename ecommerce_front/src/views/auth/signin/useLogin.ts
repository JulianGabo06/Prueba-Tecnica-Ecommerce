import { useApi } from "@/hooks/useApi";
import useForm, { IInputs } from "@/hooks/useForm";
import { ILoginResponse } from "@/interfaces/user_response.interface";
import { IUserFormSignIn } from "@/stores/user/user.interface";
import { useUserStore } from "@/stores/user/user.store";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { FormEvent } from "react";

const initialForm: IUserFormSignIn = {
  email: "",
  password: "",
};

const useLogin = () => {
  const { onChange, form, resetForm } = useForm(initialForm);
  const { loadApi, loadingApi } = useApi();
  const SignIn = useUserStore((state) => state.signIn);
  const router = useRouter();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | unknown>
      | IInputs
  ) => {
    const { type, name } = e.target as HTMLInputElement;
    const file = type === "file";
    onChange(e, name as keyof IUserFormSignIn, file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, msg } = await loadApi<ILoginResponse>({
        endpoint: "users/signin",
        type: "POST",
        body: form,
      });
      console.log(data);
      enqueueSnackbar(msg, { autoHideDuration: 3000, variant: "success" });
      resetForm();
      SignIn(data);
      const { user } = data;
      if (user.role === "admin") return router.push("/admin/products");
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return { handleChange, form, ...form, handleSubmit, loadingApi };
};

export default useLogin;
