import { UserModel } from "../Models";

const existUserByID = async (id: number | string) => {
  if (id) {
    const user = await UserModel.findOne({ where: { id, status: true } });
    if (!user) {
      throw new Error("Usuario no se encuentra registrado o activo.");
    }
  }
};

const existUserByEmail = async (email: string) => {
  if (email) {
    const user = await UserModel.findOne({ where: { email, status: true } });
    if (!user) {
      throw new Error("Usuario no se encuentra registrado o activo.");
    }
  }
};

const existUser = async (
  email: string
): Promise<{
  status: boolean;
  msg: string;
  code: number;
  id_user?: number;
}> => {
  const user: any = await UserModel.findOne({
    where: {
      status: true,
      email,
    },
  });

  if (!user)
    return {
      status: false,
      msg: "Este usuario no existe en el sistema",
      code: 404,
    };

  return {
    status: true,
    msg: "Este email ya está registrado",
    code: 200,
    id_user: user.id,
  };
};

export default { existUserByEmail, existUserByID, existUser };
