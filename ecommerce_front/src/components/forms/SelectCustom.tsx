import {
  SelectProps,
  Select as SelectMUI,
  styled,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemText,
  Checkbox,
} from "@mui/material";
import colors from "@/resources/colors";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Select = styled(SelectMUI)(() => ({
  border: `1px solid ${colors.borderColor}`,
  borderRadius: 8,
  color: colors.text,
  fontWeight: 400,
  textAlign: "start",
  "& .MuiSvgIcon-root": {
    color: colors.textPlaceholder,
    transition: "transform .2s ease-in-out",
  },
  "& .MuiTypography-root": {
    fontSize: 16,
  },
}));

export type SelectCustomProps = SelectProps & {
  options: { label: string; value: number }[];
  flex?: number;
  multiple?: boolean;
};

const SelectCustom = ({
  options,
  flex,
  multiple = false,
  ...agrs
}: SelectCustomProps) => {
  const {size, variant, ...props} = agrs;
  return (
    <FormControl fullWidth size={size} variant={variant ?? "standard"} sx={{ flex: flex, m: 0 }}>
      <InputLabel id={`${props.label}-${props.name}`} sx={{ color: colors.textPlaceholder }}>
        {props.label}
      </InputLabel>
      <Select
        {...props}
        labelId={`${props.label}-${props.name}`}
        variant={variant ?? "standard"}
        multiple={multiple}
        IconComponent={KeyboardArrowDownIcon}
      >
        {options.map(({ label, value }, index) => (
          <MenuItem key={index} value={value}>
            {multiple && (
              <Checkbox
                checked={(props.value as Array<string | number>).includes(
                  value
                )}
              />
            )}
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCustom;
