"use client";
import { ThemeOptions, createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import colors from "./colors";

const palette = {
  primary: {
    main: colors.primary,
    light: colors.primaryLight,
    contrastText: colors.contrastText,
  },
  secondary: {
    main: colors.textPlaceholder,
    light: colors.secondaryLight,
    contrastText: colors.contrastText,
  },
  error: {
    main: red.A400,
  },
};

const theme = createTheme({
  palette,
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: "600 !important",
      lineHeight: "1.2 !important",
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: "600 !important",
    },
    h3: {
      fontSize: "1.6rem",
      fontWeight: "500",
    },
    h4: {
      fontSize: "1.4rem",
      fontWeight: "500",
    },
    h5: {
      fontSize: "1.2rem",
      fontWeight: "500",
    },
    subtitle1: {
      fontSize: "1.2rem",
      fontWeight: "500 !important",
    },
    subtitle2: {
      fontSize: "1.2rem",
    },
  },
  components: {
    MuiIcon: {
      styleOverrides: {
        colorPrimary: colors.textPlaceholder,
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
    MuiTypography: {
      defaultProps: {
        fontWeight: 400,
        lineHeight: 1,
        variant: "body2",
      },
      variants: [
        {
          props: { variant: "body1" },
          style: {
            fontSize: "14px",
            fontWeight: 500,
          },
        },
        {
          props: { variant: "body2" },
          style: {
            fontSize: "14px",
          },
        },
        {
          props: { variant: "caption" },
          style: {
            color: colors.textDisabled,
            fontSize: ".765rem",
          },
        },
      ],
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          minWidth: 223,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          fontSize: 16,
          fontWeight: 500,
          borderRadius: 8,
          textTransform: "none",
          boxShadow: "none",
          padding: "12px 20px",
          fontFamily: "Inter, sans-serif",
          lineHeight: 1,
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        color: "primary",
        variant: "standard",
      },
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: `${colors.textPlaceholder}`,
            fontWeight: 400,
            fontSize: 14,
          },
          "& svg": {
            color: `${colors.textPlaceholder}`,
          },
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        color: "secondary",
      },
      styleOverrides: {
        root: {
          padding: 5,
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        color: "secondary",
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 400,
          color: colors.text,
          lineHeight: "normal",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${colors.borderColor}`,
            transition: "all .2s ease-in-out",
          },
          "& .MuiInputBase-input": {
            fontWeight: 400,
            fontSize: "1rem",
          },
          "& svg": {
            color: "#999999",
          },
          ":hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary,
            },
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: { variant: "standard" },
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 500,
          lineHeight: "normal",
          color: colors.text,
          "& .MuiFormLabel-root": {
            color: `${colors.textPlaceholder} !important`,
            fontWeight: "400 !important",
            fontSize: 14,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.MuiInputBase-input": {
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "normal",
            border: "none",
          },
          "& svg": {
            color: colors.secondary,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          color: colors.textPlaceholder,
          lineHeight: "normal",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          transition: ".2s color ease-in",
          fontSize: "0.9rem",
          fontWeight: 500,
          color: colors.secondary,
          lineHeight: "normal",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.textPlaceholder,
        },
      },
    },
  },
} as ThemeOptions);

export default theme;
