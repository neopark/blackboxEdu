import React, { useState } from "react";
import MyCalendarPicker from "../myComponents/MyCalendarPicker";
import MyDateTimePicker from "../myComponents/MyDateTimePicker";
import MyHeader from "../myTemplates/MyHeader";
import MyInput from "../myComponents/MyInput";
import MyStatusBar from "../myComponents/MyStatusBar";
import MyText from "../myComponents/MyText";
import MyView from "../myComponents/MyView";
import formats from "../modules/formats";
import { GS } from "../styles/sizes";
import values from "../values";
import MyLayout from "../myTemplates/MyLayout";

function ExampleDatePickerLayout() {
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isDateTimeVisible, setIsDateTimeVisible] = useState(false);

  return (
    <MyLayout>
      <MyStatusBar />
      <MyHeader leftComponentName="back" title="Date Picker" />
      <MyView
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          paddingTop: GS(20),
          paddingHorizontal: GS(20),
          paddingBottom: GS(20) + values.device.bottomSpaceHeight,
        }}
      >
        <MyText font="nsm">Calendar</MyText>
        <MyInput
          style={{
            marginTop: GS(5),
          }}
          touchProps={{
            onPress: () => {
              setIsCalendarVisible(true);
            },
          }}
          value={calendarDate ? formats.date(calendarDate, "yyyy.mm.dd") : ""}
          placeholder="Calendar"
        />

        <MyText
          style={{
            marginTop: GS(20),
          }}
          font="nsm"
        >
          Date Time
        </MyText>
        <MyInput
          style={{
            marginTop: GS(5),
          }}
          touchProps={{
            onPress: () => {
              setIsDateTimeVisible(true);
            },
          }}
          value={dateTime ? formats.date(dateTime, "yyyy.mm.dd / ktt hh:MM") : ""}
          placeholder="Date Time"
        />
      </MyView>
      {(() => {
        let year = 0;
        let month = 0;
        let day = 0;
        if (calendarDate) {
          year = calendarDate.getFullYear();
          month = calendarDate.getMonth();
          day = calendarDate.getDate();
        }

        return (
          <MyCalendarPicker
            date={calendarDate}
            minDate={calendarDate ? new Date(year, month, day - 14) : null}
            maxDate={calendarDate ? new Date(year, month, day + 14) : null}
            setDate={setCalendarDate}
            isVisible={isCalendarVisible}
            setIsVisible={setIsCalendarVisible}
          />
        );
      })()}
      {(() => {
        let year = 0;
        let month = 0;
        let day = 0;
        if (dateTime) {
          year = dateTime.getFullYear();
          month = dateTime.getMonth();
          day = dateTime.getDate();
        }

        return (
          <MyDateTimePicker
            mode="datetime"
            isVisible={isDateTimeVisible}
            setIsVisible={setIsDateTimeVisible}
            date={dateTime}
            minDate={dateTime ? new Date(year, month, day - 14) : null}
            maxDate={dateTime ? new Date(year, month, day + 14) : null}
            setDate={setDateTime}
          />
        );
      })()}
    </MyLayout>
  );
}

export default ExampleDatePickerLayout;
