import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";
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

  useEffect(() => {
    setInputValue(props.value ?? "");
  }, [props.value]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickArrow = () => {
    onClickNotify && onClickNotify();
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

  return (
    <Grid container flexDirection={"column"}>
      <InputBase
        fullWidth
        className="popper-area"
        name={props.name}
        type={showPassword ? "text" : props.isPassword ? "password" : "text"}
        placeholder={props.placeholder}
        value={inputValue}
        sx={{
          background: bgWhite ? "white" : "inherit",
          height: props.multiline ? "fit-content" : "40px",
          // borderRadius: props.multiline ? "25px" : "40px",
          ...customInputStyles.textFieldRoot,
          ...(props.hasError && customInputStyles.textFieldError),
          ...(props.isPassword && customInputStyles.textFieldActive),
          ...customInputStyles.textFieldInput,
        }}
        inputProps={{
          maxLength: maxLength ? maxLength : "", style: {
            fontSize: '14px', fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            letterSpacing: "0.25%",
            lineHeight: "150%"
          },
        }}
        onChange={handleInputChange}
        error={props.hasError}
        required={required}
        disabled={props.disableField}
        // inputMode={props.isNumeric ? "number" : "text"}
        inputMode={
          props.isNumeric ? "numeric" : props.isDecimal ? "decimal" : "text"
        }
        // onInput={
        //   props.isNumeric
        //     ? (e: ChangeEvent<HTMLInputElement>) => {
        //         e.target.value = e.target.value.replace(/[^0-9]/g, "");
        //       }
        //     : undefined
        // }
        onInput={
          props.isNumeric
            ? (e: ChangeEvent<HTMLInputElement>) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }
            : props.isDecimal
              ? (e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/[^0-9.]/g, "");
              }
              : undefined
        }
        classes={{
          root: `${customInputStyles.textFieldRoot}`,
          input: `${customInputStyles.textFieldInput}`,
          focused: `${customInputStyles.textFieldActive}`,
          error: `${customInputStyles.textFieldError}`,
        }}
        multiline={props.multiline}
        rows={props.rows}
        startAdornment={
          <InputAdornment position="start" sx={{paddingLeft:"12px"}}>
            {icon || (hasStartSearchIcon && !startSearchIconOnRight && <SearchIcon />)}
          </InputAdornment>
        }
        // startAdornment={
        //   <InputAdornment position="end">
        //     {hasStartSearchIcon && !startSearchIconOnRight && <SearchIcon />}
        //   </InputAdornment>
        // }
        endAdornment={
          <InputAdornment position="end">
            {props.isPassword && (
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            )}
            {hasOpenListArrow && (
              <IconButton onClick={handleClickArrow}>
                {showPassword ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            )}
            <InputAdornment position="end">
              {hasStartSearchIcon && startSearchIconOnRight && (
                <SearchIcon sx={{ marginRight: "10px" }} />
              )}
            </InputAdornment>
          </InputAdornment>
        }
      />
      <Typography sx={errorStyle} variant="caption">
        {props.hasError ? props.errorMessage : ""}
      </Typography>
    </Grid>
  );
}