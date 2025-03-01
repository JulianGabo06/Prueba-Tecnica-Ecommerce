import SingUp from "@/views/auth/signup";
import useRegister from "@/views/auth/signup/useRegister";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

jest.mock("./useRegister");

describe("SingUp Component", () => {
  beforeEach(() => {
    (useRegister as jest.Mock).mockReturnValue({
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      email: "",
      password: "",
      name: "",
      confirm_password: "",
      loadingApi: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component", () => {
    render(
      <SnackbarProvider>
        <SingUp />
      </SnackbarProvider>
    );

    expect(
      screen.getByText(/Registrate: ¡Unete a nosotros!/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar contraseña/i)).toBeInTheDocument();
  });

  it("calls handleChange on input change", () => {
    render(
      <SnackbarProvider>
        <SingUp />
      </SnackbarProvider>
    );

    const nameInput = screen.getByLabelText(/Nombre/i);
    fireEvent.change(nameInput, { target: { value: "Test User" } });
    expect(useRegister().handleChange).toHaveBeenCalled();
  });

  it("submits the form and calls handleSubmit", async () => {
    const mockHandleSubmit = jest.fn();

    (useRegister as jest.Mock).mockReturnValue({
      ...useRegister(),
      handleSubmit: mockHandleSubmit,
    });

    render(
      <SnackbarProvider>
        <SingUp />
      </SnackbarProvider>
    );

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });

  it("displays password format recommendations", () => {
    render(
      <SnackbarProvider>
        <SingUp />
      </SnackbarProvider>
    );

    expect(
      screen.getByText(
        /Ten en cuenta estas recomendaciones para crear tu contraseña/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Minimo 8 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/Minimo 1 mayuscula/i)).toBeInTheDocument();
    expect(screen.getByText(/Minimo 1 numero/i)).toBeInTheDocument();
  });

  it("shows loading state when loadingApi is true", () => {
    (useRegister as jest.Mock).mockReturnValue({
      ...useRegister(),
      loadingApi: true,
    });

    render(
      <SnackbarProvider>
        <SingUp />
      </SnackbarProvider>
    );

    expect(
      screen.getByRole("button", { name: /Iniciar sesión/i })
    ).toHaveAttribute("aria-busy", "true");
  });
});
