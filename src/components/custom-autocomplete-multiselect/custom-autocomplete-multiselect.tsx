import { Grid, Typography, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState, useCallback, useMemo, memo } from "react";
import type { ChangeEvent, SyntheticEvent } from "react";

// Custom debounce hook
const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
import SearchIcon from "@mui/icons-material/Search";
import "./custom-autocomplete-multiselect.css";
import theme from "../../constant/styles/theme";

type OptionType = {
  key: string;
  value: string;
  hide?: boolean;
};

type CustomAutocompleteMultiselectProps = {
  options: OptionType[];
  value: string[];
  onChange: (selectedValue: string[]) => void;
  placeholder: string;
  hasError?: boolean;
  limitTags: number;
  errorMessage?: string;
  onDebounceCall?: (selectedValue: string) => void;
  onInputEmpty?: () => void;
  onClick?: () => void;
  hasStartSearchIcon?: boolean;
  loading?: boolean;
  isDisabled?: boolean;
  hideArrow?: boolean;
};

const CustomAutocompleteMultiselect = memo(({
  options,
  value,
  limitTags,
  placeholder,
  onChange,
  onDebounceCall,
  onInputEmpty,
  hideArrow,
  hasStartSearchIcon,
  loading,
  hasError,
  errorMessage,
  isDisabled,
  onClick,
}: CustomAutocompleteMultiselectProps) => {

  const [selectedOptionState, setSelectedOptionState] = useState("");
  const selectedOptionDebounce = useDebounce(selectedOptionState, 1000);

  const handleChange = useCallback((
    _event: SyntheticEvent<Element, Event>,
    newValue: string[],
  ) => {
    const selectedOptions = options.filter((opt: OptionType) =>
      newValue.some((option: string) => opt.value === option),
    );
    const selectedKeys = selectedOptions.map((option: OptionType) => option.key) || [];
    onChange(selectedKeys);
  }, [options, onChange]);

  const [preSelectedValues, setPreSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    setPreSelectedValues(
      options.filter((opt: OptionType) => value.includes(opt.key)).map((opt: OptionType) => opt.value),
    );
  }, [value, options]);

  // Remove unused useEffect

  const handleTextChange = useCallback((
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value || "";
    if (newValue === "") {
      onInputEmpty?.();
    }
    setSelectedOptionState(newValue);
  }, [onInputEmpty]);

  useEffect(() => {
    if (
      selectedOptionDebounce &&
      (selectedOptionDebounce.length > 3 || selectedOptionDebounce === "")
    ) {
      onDebounceCall?.(selectedOptionDebounce);
    }
  }, [selectedOptionDebounce, onDebounceCall]);

  const inputStyles = useMemo(() => ({
    background: "inherit",
    border: "none",
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
  }), []);

  const sxStyles = useMemo(() => hasError
    ? {
        ...inputStyles,
        ...errorBorder,
      }
    : {
        ...inputStyles,
      }, [hasError, inputStyles]);

  return (
    <>
      <Autocomplete
        multiple
        limitTags={limitTags}
        className={hideArrow ? "custom-autocomplete" : ""}
        loading={loading}
        onChange={handleChange}
        value={preSelectedValues}
        id="multiple-limit-tags"
        options={options
          .filter((option: OptionType) => !option.hide)
          .map((option: OptionType) => option.value)}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Grid container width={"fit-content"}>
                  {loading && (
                    <CircularProgress size={"20px"} color="inherit" />
                  )}
                  {params.InputProps.endAdornment}
                  {hasStartSearchIcon && <SearchIcon sx={{ opacity: 0.5 }} />}
                </Grid>
              ),
            }}
            disabled={isDisabled}
            onClick={onClick}
            placeholder={placeholder}
            onChange={handleTextChange}
          />
        )}
        size="small"
        sx={{
          ...sxStyles,
          maxWidth: "900px",
          "& .MuiOutlinedInput-root": {
            padding: hideArrow ? "6px 10px !important" : "inherit",
          },
        }}
      />
      {hasError && errorMessage && (
        <Typography
          sx={{
            color: theme.palette.warning.dark,
            marginLeft: "5px",
          }}
          variant="caption"
        >
          {errorMessage}
        </Typography>
      )}
    </>
  );
});

CustomAutocompleteMultiselect.displayName = 'CustomAutocompleteMultiselect';

const errorBorder = {
  "&.MuiAutocomplete-root": {
    border: "1px solid red",
    borderRadius: "4px",
  },
};

export default CustomAutocompleteMultiselect;
