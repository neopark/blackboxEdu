import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MyMDBox from "./MyMDBox";

export type T_item = {
  value: string;
  name: string;
};

export type T_MyMDSelectProps = {
  value: string;
  label?: string;
  itemList: T_item[];
  onChange: (value: string) => void;
};

function MyMDSelect({ value, label, itemList, onChange }: T_MyMDSelectProps) {
  const theme = useTheme();

  return (
    <MyMDBox
      sx={{
        width: "100%",
        cursor: "pointer",
      }}
    >
      <FormControl fullWidth={true}>
        <InputLabel>{label}</InputLabel>
        <Select
          className="mdSelect"
          sx={{
            font: "inherit",
            color: "#7f839d",
            cursor: "pointer",
            margin: 0,
            boxSizing: "content-box",
            letterSpacing: "inherit",
            fontSize: "0.85rem",
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
          value={value}
          label={label}
          onChange={(evt) => {
            onChange(evt.target.value);
          }}
        >
          {itemList.map((item) => {
            return (
              <MenuItem
                style={{
                  height: 40,
                  fontWeight:
                    value === item.value
                      ? theme.typography.fontWeightMedium
                      : theme.typography.fontWeightRegular,
                }}
                key={item.value}
                value={item.value}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </MyMDBox>
  );
}

export default MyMDSelect;
