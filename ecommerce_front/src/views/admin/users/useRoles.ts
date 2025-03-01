import { useApi } from "@/hooks/useApi";
import {
  BasicIResponse,
  GetUsers,
  IGetUserResponse,
} from "@/interfaces/user_response.interface";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";

const useRoles = () => {
  const { loadApi, loadingApi } = useApi();
  const [users, setUsers] = useState<GetUsers[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetUsers = async () => {
    setIsLoading(true);
    try {
      const { status, users } = await loadApi<IGetUserResponse>({
        endpoint: "users/users",
        type: "GET",
      });
      setUsers(users);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleChangeRols = async (userId: number, newRole: string) => {
    try {
      const response = await loadApi<BasicIResponse>({
        token: true,
        endpoint: "/users/assign-role",
        type: "PUT",
        body: { userId, role: newRole },
      });

      if (response.status) {
        enqueueSnackbar("Rol actualizado correctamente", {
          variant: "success",
        });
        handleGetUsers(); // Refrescar la lista de usuarios
      } else {
        enqueueSnackbar("Error al actualizar el rol", { variant: "error" });
      }
    } catch (error) {
      console.error("Error updating role", error);
      enqueueSnackbar("Error inesperado al actualizar el rol", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return {
    loadingApi,
    users,
    handleChangeRols,
    isLoading,
  };
};

export default useRoles;
