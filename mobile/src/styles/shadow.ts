import { GS } from "./sizes";

export function getShadow(level?: number) {
  switch (level) {
    default:
    case 1: {
      return {
        shadowColor: "#000000",
        shadowOffset: {
          width: GS(0),
          height: GS(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: GS(3.84),
        elevation: 5,
      };
    }
    case 2: {
      return {
        shadowColor: "#000000",
        shadowOffset: {
          width: GS(0),
          height: GS(5),
        },
        shadowOpacity: 0.34,
        shadowRadius: GS(6.27),
        elevation: 10,
      };
    }
    case 3: {
      return {
        shadowColor: "#000000",
        shadowOffset: {
          width: GS(0),
          height: GS(7),
        },
        shadowOpacity: 0.43,
        shadowRadius: GS(9.51),
        elevation: 15,
      };
    }
    case 4: {
      return {
        shadowColor: "#000000",
        shadowOffset: {
          width: GS(0),
          height: GS(10),
        },
        shadowOpacity: 0.51,
        shadowRadius: GS(13.16),
        elevation: 20,
      };
    }
    case 5: {
      return {
        shadowColor: "#000000",
        shadowOffset: {
          width: GS(0),
          height: GS(12),
        },
        shadowOpacity: 0.58,
        shadowRadius: GS(16.0),
        elevation: 25,
      };
    }
  }
}
