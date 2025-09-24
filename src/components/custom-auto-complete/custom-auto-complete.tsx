import {
  Autocomplete,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { ChangeEvent, SyntheticEvent } from "react";
import { useDebounce } from "use-debounce";

import SearchIcon from "@mui/icons-material/Search";
import "./custom-auto-complete.css";
import theme from "../../constant/styles/theme";

type CustomAutoCompleteProps = {
  options: { key: string; value: string; child?: JSX.Element }[];
  value?: string;
  loading?: boolean;
  loadingText?: boolean;
  onChange: (selectedValue: string | "") => void;
  onClick?: () => void;
  onDebounceCall?: (selectedValue: string | "") => void;
  onInputEmpty?: () => void;
  width?: string;
  hasError?: boolean;
  errorMessage?: string;
  placeholder?: string;
  isDisabled?: boolean;
  bgWhite?: boolean;
  hasStartSearchIcon?: boolean;
  hideTextPreview?: boolean;
  menuStyle?: {
    maxHeight: number;
    width: number;
  };
  maxHeightForOptionsList?: number;
  hideArrow?: boolean;
};

const CustomAutoComplete = (props: CustomAutoCompleteProps) => {
  const {
    options,
    maxHeightForOptionsList,
    value,
    loading,
    loadingText,
    placeholder,
    bgWhite,
    isDisabled,
    onDebounceCall,
    onClick,
    onInputEmpty,
    hasStartSearchIcon,
    hideTextPreview,
    hideArrow,
    onChange,
  } = props;

  // Tracks the selected value in the dropdown
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebounce(inputValue, 1000);

  // Resolve the default selected option
  const defaultOption = options.find((opt) => opt.key === value)?.value || null;

  // Trigger parent `onDebounceCall` when input value changes (debounced)
  useEffect(() => {
    if (debouncedInputValue && (debouncedInputValue.length > 3 || debouncedInputValue === "")) {
      onDebounceCall?.(debouncedInputValue);
    }
  }, [debouncedInputValue, onDebounceCall]);

  // Handle selection change in Autocomplete
  const handleChange = (_: SyntheticEvent<Element, Event>, newValue: string | null) => {
    const selectedOption = options.find((opt) => opt.value === newValue);
    const selectedKey = selectedOption?.key || "";
    console.log("Selected option key:", selectedKey);
    onChange(selectedKey); // Notify parent about the selected key
  };

  // Handle text input changes
  const handleInputChange = (_: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setInputValue(newInputValue);
    if (newInputValue === "") {
      onInputEmpty?.(); // Notify parent when input is empty
    }
  };

  // Styling
  const inputStyles = {
    background: bgWhite ? "white" : "inherit",
    border: "none",
    outline: "none",
    borderRadius: "4px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
    "& .MuiAutocomplete-inputRoot": {
      border: "none !important",
      borderRadius: "4px !important",
      "&:hover": {
        border: "none !important",
      },
    },
  };

  const sxStyles = props.hasError
    ? {
        ...inputStyles,
        ...errorBorder,
      }
    : {
        ...inputStyles,
      };

  return (
    <>
      <Autocomplete
        value={defaultOption} // Current selected option
        inputValue={inputValue} // Controlled input value
        onInputChange={handleInputChange} // Handle input changes
        onChange={handleChange} // Handle option selection
        options={loading ? [] : options.map((opt) => opt.value)} // Filtered option values
        loading={loading}
        ListboxProps={{
          style: { maxHeight: maxHeightForOptionsList },
        }}
        sx={{
          ...sxStyles,
          "& .MuiOutlinedInput-root": {
            padding: hideArrow ? "6px 10px !important" : "inherit",
          },
        }}
        size="small"
        disablePortal
        disabled={isDisabled}
        loadingText={loadingText || "Loading..."}
        clearIcon={false}
        className={hideArrow ? "custom-autocomplete" : ""}
        renderOption={(props, option) => {
          const { key, ...otherProps } = props;
          const selectedOption = options.find((opt) => opt.value === option);
          return (
            <li key={key} {...otherProps}>
              {selectedOption?.child || option}
            </li>
          );
        }}
        PaperComponent={(props) => <Paper {...props} />}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              value: hideTextPreview ? "" : params.inputProps.value,
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress size="20px" color="inherit" />}
                  {params.InputProps.endAdornment}
                  {hasStartSearchIcon && <SearchIcon sx={{ opacity: 0.5 }} />}
                </>
              ),
              style: {
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                fontSize: "14px",
                letterSpacing: "0.25%",
                lineHeight: "150%",
                height: "44px",
              },
            }}
            onClick={onClick && !isDisabled ? onClick : undefined}
            placeholder={placeholder}
          />
        )}
      />
      <Typography
        sx={{
          color: theme.palette.error.main,
          marginLeft: props.hasError ? "5px" : "0px",
          fontSize: "0.75rem",
          lineHeight: 1.66,
          letterSpacing: "0.03333em",
        }}
      >
        {props.hasError ? props.errorMessage : ""}
      </Typography>
    </>
  );
};

export default CustomAutoComplete;

const errorBorder = {
  "&.MuiAutocomplete-root": {
    border: "1px solid red",
    borderRadius: "4px",
  },
};