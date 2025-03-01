import { useApi } from "@/hooks/useApi";
import useForm, { IInputs } from "@/hooks/useForm";
import { BasicIResponse, IAuthResponse, IChangePasswordForm } from "@/interfaces/user_response.interface";
import { IUserFormSignUp } from "@/stores/user/user.interface";
import { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { FormEvent } from "react";

const initialForm: IChangePasswordForm = {
  password: "",
  confirm_password: "",
};

const useChangePassword = (token: string) => {
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
    onChange(e, name as keyof IChangePasswordForm, file);
  };

  const validateForm = (): boolean => {
    const { password, confirm_password } = form;
    if (password?.trim() === confirm_password.trim()) return true;
    return false;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { password } = form;
    try {
      const { msg } = await loadApi<BasicIResponse>({
        endpoint: "users/change-password",
        type: "PUT",
        body: {password, token},
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

export default useChangePassword;
