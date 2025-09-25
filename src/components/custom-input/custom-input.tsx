import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import Search from "@mui/icons-material/Search";
import { Box, IconButton, Typography, InputAdornment } from "@mui/material";
import { type ChangeEvent, useEffect, useState } from "react";
import { customInputStyles, errorStyle } from "./custom-input-styles";

interface CustomInputProps {
  placeholder: string;
  name: string;
  value: string | number | undefined;
  isNumeric?: boolean;
  isDecimal?: boolean;
  hasError?: boolean;
  errorMessage?: string | undefined;
  isPassword?: boolean;
  isEmail?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disableField?: boolean;
  bgWhite?: boolean;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  hasStartSearchIcon?: boolean;
  startSearchIconOnRight?: boolean;
  onClickNotify?: () => void;
  hasOpenListArrow?: boolean;
  required?: boolean;
  maxValue?: number;
  icon?: React.ReactNode;
  format?: string;
}

export default function CustomInput(props: CustomInputProps) {
  const {
    bgWhite,
    onClickNotify,
    maxLength,
    hasStartSearchIcon,
    startSearchIconOnRight,
    hasOpenListArrow,
    required = false,
    icon
  } = props;
  
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState<string | number>(props.value ?? "");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputValue(props.value ?? "");
  }, [props.value]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickArrow = () => {
    if (onClickNotify) {
      onClickNotify();
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const maxValue = props.maxValue || 31;

    if (props.format === "phone") {
      value = formatPhoneNumber(value);
    }

    if (props.isNumeric && maxValue) {
      const numericValue = parseInt(value, 10);
      if (numericValue <= maxValue || value === "") {
        setInputValue(value);
        props.onChange({ ...e, target: { ...e.target, value } });
        return;
      }
    } else {
      setInputValue(value);
      props.onChange({ ...e, target: { ...e.target, value } });
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, ""); // Remove non-numeric characters
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (!match) return value;

    let formatted = "";
    if (match[1]) formatted += `(${match[1]}`;
    if (match[2]) formatted += `) ${match[2]}`;
    if (match[3]) formatted += `-${match[3]}`;

    return formatted;
  };

  const rootStyles = {
    ...customInputStyles.textFieldRoot,
    ...(props.hasError && customInputStyles.textFieldError),
    ...(props.disableField && customInputStyles.textFieldDisabled),
    ...(isFocused && !props.hasError && customInputStyles.textFieldFocus),
    background: bgWhite ? "white" : customInputStyles.textFieldRoot.background,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={rootStyles}>
        {/* Start Icon or Search Icon */}
        {(icon || (hasStartSearchIcon && !startSearchIconOnRight)) && (
          <InputAdornment position="start">
            {icon || (
              <Search 
                sx={{
                  width: 18, 
                  height: 18, 
                  color: '#757775' // Neutral/60
                }} 
              />
            )}
          </InputAdornment>
        )}
        
        {/* Input Field */}
        {props.multiline ? (
          <Box
            component="textarea"
            name={props.name}
            placeholder={props.placeholder}
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e as unknown as ChangeEvent<HTMLInputElement>)}
            disabled={props.disableField}
            required={required}
            maxLength={maxLength}
            rows={props.rows}
            sx={{
              ...customInputStyles.textFieldInput,
              resize: 'vertical',
              minHeight: props.rows ? `${props.rows * 1.5}em` : '60px',
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onInput={
              props.isNumeric
                ? (e: React.FormEvent<HTMLTextAreaElement>) => {
                  (e.target as HTMLTextAreaElement).value = (e.target as HTMLTextAreaElement).value.replace(/[^0-9]/g, "");
                }
                : props.isDecimal
                  ? (e: React.FormEvent<HTMLTextAreaElement>) => {
                    (e.target as HTMLTextAreaElement).value = (e.target as HTMLTextAreaElement).value.replace(/[^0-9.]/g, "");
                  }
                  : undefined
            }
          />
        ) : (
          <Box
            component="input"
            name={props.name}
            type={showPassword ? "text" : props.isPassword ? "password" : props.isEmail ? "email" : "text"}
            placeholder={props.placeholder}
            value={inputValue}
            onChange={handleInputChange}
            disabled={props.disableField}
            required={required}
            maxLength={maxLength}
            inputMode={
              props.isNumeric ? "numeric" : props.isDecimal ? "decimal" : "text"
            }
            sx={customInputStyles.textFieldInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onInput={
              props.isNumeric
                ? (e: React.FormEvent<HTMLInputElement>) => {
                  (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, "");
                }
                : props.isDecimal
                  ? (e: React.FormEvent<HTMLInputElement>) => {
                    (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/[^0-9.]/g, "");
                  }
                  : undefined
            }
          />
        )}

        {/* Password Toggle */}
        {props.isPassword && (
          <IconButton
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            sx={customInputStyles.iconStyle}
            size="small"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        )}

        {/* Arrow Dropdown */}
        {hasOpenListArrow && (
          <IconButton 
            onClick={handleClickArrow}
            sx={customInputStyles.iconStyle}
            size="small"
          >
            {showPassword ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        )}

        {/* End Search Icon */}
        {hasStartSearchIcon && startSearchIconOnRight && (
          <InputAdornment position="end">
            <Search 
              sx={{ 
                width: 18, 
                height: 18, 
                color: '#757775' // Neutral/60
              }} 
            />
          </InputAdornment>
        )}
      </Box>

      {/* Error Message */}
      <Typography 
        sx={{
          ...errorStyle,
          fontSize: "0.75rem",
          lineHeight: 1.66,
          letterSpacing: "0.03333em",
        }}
      >
        {props.hasError ? props.errorMessage : ""}
      </Typography>
    </Box>
  );
}