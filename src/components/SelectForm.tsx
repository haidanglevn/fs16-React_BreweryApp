import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

export interface SelectOptions {
  value: string;
  displayLabel: string;
  defaultChecked?: boolean;
}

export interface SelectFormProps {
  inputLabel: string;
  labelId?: string;
  id?: string;
  value: string | undefined;
  onChange:
    | ((event: SelectChangeEvent<string>, child: React.ReactNode) => void)
    | undefined;
  options: SelectOptions[];
}

function SelectForm(props: SelectFormProps) {
  return (
    <FormControl variant="filled" style={{ minWidth: 200 }}>
      <InputLabel>{props.inputLabel}</InputLabel>
      <Select value={props.value} onChange={props.onChange}>
        {props.options.map((option, index) => {
          return (
            <MenuItem
              defaultChecked={option.defaultChecked}
              value={option.value.toLowerCase().replace(/ /g, "_")}
              key={`option-${index}`}
            >
              {option.displayLabel}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default SelectForm;
