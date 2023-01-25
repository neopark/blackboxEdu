import { useEffect, useRef } from "react";

export type T_MyModalProps = {
  setIsVisible: (isVisible: boolean) => void;
  isVisible: boolean;
  style?: React.CSSProperties;
  children: JSX.Element;
};

function MyModal({ setIsVisible, isVisible, style, children }: T_MyModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isVisible]);

  return (
    <div
      className="modal"
      onClick={() => {
        setIsVisible(false);
      }}
      style={{
        pointerEvents: isVisible ? "auto" : "none",
        top: 0,
        left: 0,
        zIndex: 10000,
        display: "flex",
        opacity: isVisible ? 1 : 0,
        width: window.innerWidth,
        height: window.innerHeight,
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        backgroundColor: "#00000066",
        transition: "all 0.2s",
      }}
    >
      <div
        ref={ref}
        onClick={(evt) => {
          evt.stopPropagation();
        }}
        style={{
          ...style,
          position: "fixed",
          borderRadius: 10,
          backgroundColor: "#ffffff",
          boxShadow: `0px 1px 10px 0px #00000066`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default MyModal;
