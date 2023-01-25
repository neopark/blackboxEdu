import { BsImageFill, BsListCheck, BsDot } from "react-icons/bs";
import { AiOutlineClose, AiOutlineTable, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export type T_MyIconName =
  | "BsImageFill"
  | "BsListCheck"
  | "AiOutlineTable"
  | "AiOutlineClose"
  | "BsDot"
  | "AiOutlineLeft"
  | "AiOutlineRight";

export interface T_MyIconProps {
  name: T_MyIconName;
  size?: number;
  color?: string | undefined;
  style?: React.CSSProperties;
}

function MyIcon(props: T_MyIconProps) {
  const { name } = props;
  const newProps = {
    size: 20,
    color: props.color || "#666666",
    ...props,
  };

  switch (name) {
    case "BsDot": {
      return <BsDot {...newProps} />;
    }
    case "BsImageFill": {
      return <BsImageFill {...newProps} />;
    }
    case "BsListCheck": {
      return <BsListCheck {...newProps} />;
    }
    case "AiOutlineTable": {
      return <AiOutlineTable {...newProps} />;
    }
    case "AiOutlineClose": {
      return <AiOutlineClose {...newProps} />;
    }
    case "AiOutlineLeft": {
      return <AiOutlineLeft {...newProps} />;
    }
    case "AiOutlineRight": {
      return <AiOutlineRight {...newProps} />;
    }
  }
}

export default MyIcon;
