import React, { useEffect, useState } from "react";
import MyModal from "../myTemplates/MyModal";
import DatePicker from "react-native-date-picker";
import MyText from "./MyText";
import MyTouch from "./MyTouch";
import MyView from "./MyView";
import values from "../values";

export type T_MyDateTimePickerProps = {
  mode?: "time" | "date" | "datetime";
  date?: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  isVisible: boolean;
  setDate: (date: Date) => void;
  setIsVisible: (isVisible: boolean) => void;
};

function MyDateTimePicker({
  mode,
  date,
  minDate,
  maxDate,
  isVisible,
  setDate,
  setIsVisible,
}: T_MyDateTimePickerProps) {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setDateState(date || new Date());
  }, [date, setDateState]);

  return (
    <MyModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      style={{
        borderRadius: 10,
      }}
    >
      <MyView
        style={{
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
        }}
      >
        <MyText
          font="nsm"
          style={{
            fontSize: 15,
            color: "#222222",
          }}
        >
          Date Time Picker
        </MyText>
      </MyView>
      <MyView
        style={{
          alignItems: "center",
        }}
      >
        <MyView
          style={{
            transform: [
              {
                scale: 0.9,
              },
            ],
            top: values.device.isIos ? -23 : -7,
            height: 164,
          }}
        >
          <DatePicker
            onDateChange={setDateState}
            open={true}
            date={dateState}
            minimumDate={minDate || undefined}
            maximumDate={maxDate || undefined}
            mode={mode || "datetime"}
            textColor="#111111"
            locale="ko"
          />
        </MyView>
      </MyView>
      <MyView
        style={{
          alignItems: "center",
          borderTopWidth: 1,
          height: 60,
          paddingHorizontal: 5,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <MyTouch
          style={{
            marginRight: 5,
            marginBottom: 5,
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
          onPress={() => {
            setIsVisible(false);
          }}
        >
          <MyText
            font="nsm"
            style={{
              color: "#888888",
              fontSize: 13,
            }}
          >
            취소
          </MyText>
        </MyTouch>
        <MyTouch
          style={{
            marginRight: 5,
            marginBottom: 5,
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
          onPress={() => {
            const newDate = new Date(dateState);
            newDate.setSeconds(0);
            setDate(newDate);
            setIsVisible(false);
          }}
        >
          <MyText
            font="nsm"
            style={{
              color: values.colors.blue,
              fontSize: 13,
            }}
          >
            확인
          </MyText>
        </MyTouch>
      </MyView>
    </MyModal>
  );
}

export default MyDateTimePicker;
