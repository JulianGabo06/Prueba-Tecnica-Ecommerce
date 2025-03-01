import {
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    TextFieldProps,
    Typography,
  } from "@mui/material";
  import React, { ReactNode, useRef, useState } from "react";
  import Visibility from "@mui/icons-material/Visibility";
  import VisibilityOff from "@mui/icons-material/VisibilityOff";
  import colors from "@/resources/colors";
  import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
  
  export type InputProps = TextFieldProps & {
    Icon?: ReactNode | boolean | null;
    position?: "end" | "start";
    type?: "text" | "number" | "password" | "email" | "date";
    flex?: number;
  };
  
  const Input = ({
    position = "end",
    Icon = null,
    type = "text",
    flex,
    ...props
  }: InputProps) => {
    const value = props.value as string;
    const name = props.name as string;
    const { onChange, placeholder } = props;
    const [showPassword, setShowPassword] = useState("password");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleShowPassword = () =>
      setShowPassword((prev) => {
        if (prev == "password") return "text";
        return "password";
      });
  
    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => event.preventDefault();
  
    const handleShowCalendar = () => {
      if (inputRef.current) {
        try {
          inputRef.current?.showPicker();
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    return (
      <>
        {Icon ? (
          <TextField
            type={type === "password" ? showPassword : type}
            InputProps={{
              endAdornment: (
                <InputAdornment position={position}>
                  {type !== "password" ? (
                    Icon
                  ) : (
                    <IconButton
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword === "password" ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            {...props}
          />
        ) : type === "date" ? (
          <Stack
            component="label"
            direction="row"
            py={1}
            px={2}
            justifyContent="space-between"
            color={colors.textPlaceholder}
            borderRadius={2}
            border="1px solid #00000014"
            alignItems="center"
            gap={1}
            sx={{
              cursor: "pointer",
              position: "relative",
              userSelect: "none",
            }}
            onClick={handleShowCalendar}
            flex={flex}
          >
            <Typography
              variant="body1"
              color={value ? colors.text : colors.textPlaceholder}
              ml={-1}
              sx={{
                textWrap: "nowrap",
                textOverflow: "elipsis",
                overflow: "hidden",
              }}
            >
              {value ? value : placeholder}
              <input
                id="input_data"
                name={name}
                type="date"
                ref={inputRef}
                style={{ width: 0, height: 0, visibility: "hidden" }}
                onChange={onChange}
              />
            </Typography>
            <CalendarTodayOutlined sx={{ width: 20, height: 20 }} />
          </Stack>
        ) : (
          <TextField
            type={type}
            {...props}
            InputProps={{ size: props.size, ...props.InputProps }}
            
          />
        )}
      </>
    );
  };
  
  export default Input;