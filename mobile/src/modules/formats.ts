import dateFormat from "dateformat";

export type T_formatsDateMask =
  | "ktt hh:MM"
  | "yyyy-mm-dd"
  | "yyyy.mm.dd / HH:MM:ss"
  | "yyyy.mm.dd / ktt hh:MM"
  | "yyyy.mm.dd"
  | "mmdd"
  | "yyyy년 m월 dd일 HH시 MM분"
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
