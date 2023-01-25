import dateFormat from "dateformat";

export type T_formatsDateMask =
  | "ktt hh:MM"
  | "hh:MM:ss"
  | "yyyy-mm-dd"
  | "yyyy.mm.dd  HH:MM:ss"
  | "yyyy.mm.dd  HH:MM"
  | "yyyy.mm.dd  ktt hh:MM"
  | "yyyy.mm.dd / HH:MM:ss"
  | "yyyy.mm.dd / ktt hh:MM"
  | "yyyy.mm.dd"
  | "yyyy년 m월";

function date(dateValue: Date | string, mask: T_formatsDateMask) {
  let text = dateFormat(dateValue, mask, undefined, true);
  if (mask.includes("ktt")) {
    text = text.replace("kpm", "오후");
    text = text.replace("kam", "오전");
  }
  return text;
}

const formats = {
  date,
};

export default formats;
