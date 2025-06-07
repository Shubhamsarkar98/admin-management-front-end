import { CancelOutlined, Search } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { SelectProps } from "@mui/material/Select";
import type { TextFieldProps } from "@mui/material/TextField";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { CustomTextFieldProps } from "./InputElements";
import { InputTextField } from "./InputElements";


import type { RegisterOptions } from "react-hook-form";

interface FormInputTextFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

export const FormInputTextField = <T extends FieldValues = FieldValues>({
  control,
  rules,
  name,
  ...props
}: CustomTextFieldProps & TextFieldProps & FormInputTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: ControllerField }) => (
        <InputTextField {...ControllerField} {...props} />
      )}
    />
  );
};

interface CommonSelectProps extends Omit<SelectProps, "native"> {
  label: string;
  options: { value: string; label: string }[];
}

export const FilterSelect: React.FC<CommonSelectProps> = ({
  label,
  options,
  ...props
}) => {
  return (
    <FormControl
      size="small"
      sx={{
        width: { xs: "100%", sm: "250px" },
        "& .MuiInputBase-root": { height: "35px", backgroundColor: "white" },
      }}
    >
      <InputLabel sx={{ fontSize: "12px" }}>{label}</InputLabel>
      <Select label={label} {...props} sx={{ borderRadius: "50px" }}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface CommonTextFieldProps extends Omit<TextFieldProps, "native"> {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const CommonTextField: React.FC<CommonTextFieldProps> = ({
  searchTerm,
  setSearchTerm,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <TextField
      {...props}
      size="small"
      sx={{
        width: isMobile ? "100%" : { xs: "100%", sm: "335px" },
        "& .MuiInputBase-root": { height: "35px", backgroundColor: "white" },
        "& .MuiInputBase-input::placeholder": { fontSize: "12.5px" },
        ...props.sx,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setSearchTerm("")} size="small">
              {searchTerm ? (
                <CancelOutlined />
              ) : (
                <Search sx={{ fontSize: "18px" }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
        style: { borderRadius: "50px" },
      }}
    />
  );
};

import type { ControllerProps } from "react-hook-form";

interface CustomSelectFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: ControllerProps<T>["rules"];
  options: { value: string | number; label: string }[];
  label: string;
}

export const FormInputSelectField = <T extends FieldValues = FieldValues>({
  control,
  rules,
  name,
  options,
  ...props
}: CustomSelectFieldProps<T> & SelectProps & T) => {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: ControllerField }) => (
        <Select
          {...ControllerField}
          {...props}
          multiple
          value={ControllerField.value || []}
          renderValue={(selected: any) =>
            Array.isArray(selected)
              ? selected
                  .map((sl) => {
                    const ob = options.find((op) => op.value === sl);
                    return ob?.label;
                  })
                  .join(", ")
              : selected
          }
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};