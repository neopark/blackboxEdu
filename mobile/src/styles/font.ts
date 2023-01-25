export type T_nsFont = "nsvb" | "nsb" | "nsm" | "nsr" | "nsl" | "nst";

export type T_font = T_nsFont | null;

export function getFont(font?: T_font) {
  switch (font) {
    case null: {
      return undefined;
    }
    case "nsvb": {
      return "NotoSansKR-Black";
    }
    case "nsb": {
      return "NotoSansKR-Bold";
    }
    case "nsm": {
      return "NotoSansKR-Medium";
    }
    default:
    case "nsr": {
      return "NotoSansKR-Regular";
    }
    case "nsl": {
      return "NotoSansKR-Light";
    }
    case "nst": {
      return "NotoSansKR-Thin";
    }
  }
}
