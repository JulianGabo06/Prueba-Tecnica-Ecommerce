import { useApi } from "@/hooks/useApi";
import useForm, { IInputs } from "@/hooks/useForm";
import { IAuthResponse } from "@/interfaces/user_response.interface";
import { IUserFormSignUp } from "@/stores/user/user.interface";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { FormEvent } from "react";

const initialForm: IUserFormSignUp = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const useRegister = () => {
  const { onChange, form, resetForm } = useForm(initialForm);
  const { loadApi, loadingApi } = useApi();
  const router = useRouter();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string | unknown>
      | IInputs
  ) => {
    const { type, name } = e.target as HTMLInputElement;
    const file = type === "file";
    onChange(e, name as keyof IUserFormSignUp, file);
  };

  const validateForm = (): boolean => {
    const { password, confirm_password } = form;
    if (password?.trim() === confirm_password.trim()) return true;
    return false;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { confirm_password, ...body } = form;
    try {
      const { user, msg } = await loadApi<IAuthResponse>({
        endpoint: "users/signup",
        type: "POST",
        body,
      });
      enqueueSnackbar(msg, { autoHideDuration: 3000, variant: "success" });
      resetForm();
      setTimeout(() => router.push("/"), 300);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleChange, form, ...form, handleSubmit, loadingApi };
};

export default useRegister;
