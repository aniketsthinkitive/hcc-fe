import {
  Grid,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";
import { errorStyle } from "../custom-input/custom-input-styles";
import {
  customSelectStyles,
  selectInputStyle,
} from "./widgets/custom-select-widgets";
import theme from "../../constant/styles/theme";

interface CustomSelectProps {
  placeholder: string;
  name: string;
  value: string | undefined;
  items: {
    value: string;
    label: string;
    disabled?: boolean;
    child?: JSX.Element;
  }[];
  onChange: (e: SelectChangeEvent<string>) => void;
  hasError?: boolean;
  loading?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  bgWhite?: boolean;
  enableDeselect?: boolean;
  menuProps?: {
    PaperProps?: {
      style?: {
        maxHeight: number;
        width: number;
      };
    };
  };
}

function CustomSelect(props: CustomSelectProps) {
  const { items, bgWhite, enableDeselect } = props;

  const handleValue = (e: SelectChangeEvent<string>) => {
    const selectedLabel = e.target.value;
    const selectedKey =
      props.items.find((item) => item.label === selectedLabel)?.value || "";
    e.target.value = selectedKey;

    props.onChange(e);
  };

  const getLabel = (value: string) => {
    const item = items?.find((item) => item.value === value);
    return item ? item.label : "";
  };

  return (
    <>
      <Select
        disabled={props.isDisabled && props.isDisabled}
        MenuProps={props.menuProps}
        sx={{
          ...selectInputStyle,
          borderWidth: "0.5px",
          backgroundColor: bgWhite === true ? "inherit" : "white",
          borderColor: "#F1F1F1",
        }}
        displayEmpty
        name={props?.name}
        value={getLabel(props.value ?? "")}
        onChange={handleValue}
        error={props.hasError}
        renderValue={(selected) => (
          <Typography
            variant="buttonLinkAndField3"
            className={`${customSelectStyles.headerLabel}`}
            sx={{
              color: selected
                ? theme.palette.grey[800]
                : theme.palette.grey[500],
            }}
          >
            {selected || props?.placeholder}
          </Typography>
        )}
      >
        {enableDeselect && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {props?.items?.length > 0 &&
          props.items.map((option) => (
            <MenuItem
              key={option.value}
              value={option.label}
              disabled={option.disabled}
            >
              {option.child && <Grid width={"100%"}>{option.child}</Grid>}
              {!option.child && (
                <Typography className={`${customSelectStyles.headerLabel}`}>
                  {option.label}
                </Typography>
              )}
            </MenuItem>
          ))}
      </Select>
      {props.hasError && (
        <Typography sx={errorStyle} variant="caption">
          {props.hasError ? props.errorMessage : ""}
        </Typography>
      )}
    </>
  );
}

export default CustomSelect;
