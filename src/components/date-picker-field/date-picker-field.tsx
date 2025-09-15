import { Typography } from "@mui/material";
import {
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DateRangeIcon } from "@mui/x-date-pickers/icons";
import dayjs, { type Dayjs } from "dayjs";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { errorStyle } from "../custom-input/custom-input-styles";

export interface DatePickerProps {
  /** Field name for form handling */
  name?: string;
  /** Custom styles for the component */
  styles?: React.CSSProperties;
  /** Whether to use custom styling */
  useCustomStyle?: boolean;
  /** Current selected date value */
  value?: Dayjs | null;
  /** Maximum selectable date */
  maxDate?: Dayjs;
  /** Minimum selectable date */
  minDate?: Dayjs;
  /** Callback fired when date changes */
  onChange: (date: Dayjs | null) => void;
  /** Whether field has validation error */
  hasError?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Disable future dates */
  disableFuture?: boolean;
  /** Field label/placeholder */
  label?: string;
  /** Disable past dates */
  disablePast?: boolean;
  /** Use white background */
  bgWhite?: boolean;
  /** Date format string */
  format?: string;
}
const DatePickerField = (props: DatePickerProps) => {
  const {
    bgWhite = false,
    hasError = false,
    onChange,
    value,
    useCustomStyle = false,
    maxDate,
    disableFuture = false,
    disablePast = false,
    label,
    minDate,
    format = "MM-DD-YYYY",
    errorMessage,
  } = props;

  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [cleared]);

  const inputValue = useMemo(() => {
    return value ? dayjs(value) : null;
  }, [value]);

  const handleChange = useCallback((
    value: Dayjs | null,
  ) => {
    onChange(value);
  }, [onChange]);

  const textFieldProps = useMemo(() => {
    const props: Record<string, unknown> = { fullWidth: true };
    if (!useCustomStyle) props["placeholder"] = "Select Date";
    if (label) props["placeholder"] = label;
    return props;
  }, [useCustomStyle, label]);


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={inputValue}
          closeOnSelect={true}
          onChange={handleChange}
          format={format}
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          minDate={minDate ? dayjs(minDate) : undefined}
          disableFuture={disableFuture}
          disablePast={disablePast}
          slotProps={{
            textField: textFieldProps,
            field: { clearable: true, onClear: () => setCleared(true) },
            openPickerIcon: { children: <DateRangeIcon /> },
            inputAdornment: {
              position: "start",
            },
          }}
          sx={useMemo(() => ({
            "& .MuiInputBase-input": {
              fontSize: "14px",
              padding: "11px 0px",
              border: hasError ? "1px solid #ef4444" : "none",
              outline: "none",
            },
            "& .MuiOutlinedInput-root": {
              background: bgWhite ? "white" : "inherit",
              borderRadius: "5px",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderRadius: "5px",
              border: hasError ? "1px solid #ef4444" : "1px solid #00000029",
            },
          }), [hasError, bgWhite])}
        />
      </LocalizationProvider>
      {hasError && errorMessage && (
        <Typography variant="caption" sx={errorStyle}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
}

export default memo(DatePickerField);
