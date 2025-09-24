import { Stack, Typography } from "@mui/material";
import {
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { errorStyle } from "../custom-input/custom-input-styles";
import { prefixItWithZero } from "./utils";

type TimePickerFieldProps = {
  onChange: (hours: number, minutes: number, date: Date) => void;
  width?: string;
  value: string;
  hasError?: boolean;
  errorMessage?: string;
};

const TimePickerField = (props: TimePickerFieldProps) => {
  const { onChange, hasError, errorMessage, width, value } = props;
  const [timeValue, setTimeValue] = useState<string>(value);

  useEffect(() => {
    setTimeValue(value);
  }, [value]);

  const handleTimeChange = useCallback((
    value: Dayjs | null,
  ) => {
    if (value) {
      const selectedDate = new Date(value.toISOString());
      const formattedTime = `${prefixItWithZero(
        selectedDate.getHours().toString(),
      )}:${prefixItWithZero(selectedDate.getMinutes().toString())}`;
      setTimeValue(formattedTime);
      onChange(
        selectedDate.getHours(),
        selectedDate.getMinutes(),
        selectedDate,
      );
    }
  }, [onChange]);

  const timePickerValue = useMemo(() => {
    return timeValue ? dayjs(`2023-01-01T${timeValue}`) : null;
  }, [timeValue]);

  const timePickerStyles = useMemo(() => ({
    "& .MuiInputBase-input": {
      fontSize: "0.85rem",
      padding: "10px 10px",
      borderRadius: "5px",
      border: hasError ? "1px solid #ef4444" : "inherit",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
    "& .MuiOutlinedInput-root.Mui-error": {
      "& fieldset": {
        borderColor: "#ef4444",
      },
    },
  }), [hasError]);

  return (
    <Stack width={width || "100%"}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          onChange={handleTimeChange}
          value={timePickerValue}
          sx={timePickerStyles}
        />
      </LocalizationProvider>
      <Typography 
        sx={{
          ...errorStyle,
          fontSize: "0.75rem",
          lineHeight: 1.66,
          letterSpacing: "0.03333em",
        }}
      >
        {hasError ? errorMessage : ""}
      </Typography>
    </Stack>
  );
};

export default TimePickerField;
