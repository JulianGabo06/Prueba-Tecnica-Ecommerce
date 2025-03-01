import { useApi } from "@/hooks/useApi";
import { BasicIResponse } from "@/interfaces/user_response.interface";
import { enqueueSnackbar } from "notistack";
import { FormEvent, useState } from "react";

const useRecoverPassword = () => {
  const { loadApi, loadingApi } = useApi();
  const [email, setEmail] = useState("");

  const handleChange = (value: string) => setEmail(value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { msg } = await loadApi<BasicIResponse>({
        endpoint: "users/recover-password",
        type: "POST",
        body: { email },
      });
      enqueueSnackbar(msg, { autoHideDuration: 3000, variant: "success" });
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return { handleChange, email, handleSubmit, loadingApi };
};

export default useRecoverPassword;
