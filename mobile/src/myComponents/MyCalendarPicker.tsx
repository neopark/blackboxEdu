import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import MyIcon from "./MyIcon";
import MyModal from "../myTemplates/MyModal";
import MyText from "./MyText";
import values from "../values";
import formats from "../modules/formats";

export function initCalendarPicker() {
  LocaleConfig.locales.ko = {
    today: "오늘",
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  };
  LocaleConfig.defaultLocale = "ko";
}

export type T_MyCalendarPickerProps = {
  date?: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  setDate: (date: Date) => void;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

function MyCalendarPicker({
  date,
  minDate,
  maxDate,
  setDate,
  isVisible,
  setIsVisible,
}: T_MyCalendarPickerProps) {
  return (
    <MyModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      style={{
        width: values.device.width - 40,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
        height: 430,
      }}
    >
      <Calendar
        style={{
          height: 360,
        }}
        current={date ? formats.date(date, "yyyy-mm-dd") : undefined}
        minDate={minDate ? formats.date(minDate, "yyyy-mm-dd") : undefined}
        maxDate={maxDate ? formats.date(maxDate, "yyyy-mm-dd") : undefined}
        onDayPress={(newDay) => {
          setIsVisible(false);
          const { year, month, day } = newDay;
          setDate(new Date(year, month - 1, day));
        }}
        theme={{
          textColor: "#111111",
          todayTextColor: "#111111",
          todayBackgroundColor: "#eeeeee",
          textDisabledColor: "#dddddd",
          "stylesheet.calendar.header": {
            week: {
              paddingTop: 5,
              marginBottom: 15,
              borderRadius: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#eeeeee88",
              paddingHorizontal: 7.8,
            },
          },
        }}
        renderArrow={(direction) => {
          return (
            <MyIcon
              name={direction}
              size={20}
              color={values.colors.blue}
              style={{
                marginBottom: 10,
              }}
            />
          );
        }}
        hideExtraDays={true}
        renderHeader={(headerDate) => {
          return (
            <MyText
              font={null}
              style={{
                color: "#222222",
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              {formats.date(headerDate, "yyyy년 m월")}
            </MyText>
          );
        }}
      />
    </MyModal>
  );
}

export default MyCalendarPicker;
