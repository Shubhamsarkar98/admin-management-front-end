import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import type { PropsWithChildren } from "react";

const InputMetaWrapper: React.FC<
  PropsWithChildren<{
    label: string;
    errorMessage: string;
    isError: boolean;
  }>
> = ({ label, errorMessage, isError, children }) => {
  return (
    <Box>
      {label && <p className="table-content-1 mb-1" style={{ fontSize: "13px" }}>{label}</p>}
      <div>{children}</div>
      {isError && <p>{errorMessage}</p>}
    </Box>
  );
};

export interface CustomTextFieldProps {
  label?: string | any;
  errorMessage?: string;
}

export const InputTextField = ({
  label = "",
  errorMessage = "",
  error = false,
  required = false,
  ...props
}: CustomTextFieldProps & TextFieldProps) => {
  return (
    <InputMetaWrapper label={label} errorMessage={errorMessage} isError={error}>
      <TextField {...props} label="" variant="outlined" size="small" className="table-content-1 w-full" sx={{
          "& input": {
            fontSize: "13px", // Input text size
          },
        }} />
    </InputMetaWrapper>
  );
};

const fixedWidthStyle = {
  display: 'inline-block',
  width: '300px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

interface SelectProps {
  label: string,
  value: any,
  onChange: any,
  options: any,
  disabled?: boolean
}


export const SelectFormControl: React.FC<SelectProps> = ({ label, value, onChange, options, disabled }) => (
  <FormControl size="small" fullWidth>
    <InputLabel style={fixedWidthStyle}>{label}</InputLabel>
    <Select
      label={label}
      value={value ?? ''}
      onChange={onChange}
      disabled={disabled}
      size="small"
    >
      {options.map((option: any) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
