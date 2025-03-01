const validatePasswordFormat = async (password: string) => {
  if (!password) {
    return;
  }

  const validate =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(
      password
    );

  if (!validate) {
    throw new Error("El formato de la contraseña es invalida");
  }
};

export default { validatePasswordFormat };
