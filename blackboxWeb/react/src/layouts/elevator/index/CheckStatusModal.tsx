/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

==========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import MyMDBox from "../../../components/MyMDBox";
import MyMDTypography from "../../../components/MyMDTypography";
import MyIcon from "../../../components/MyIcon";
import MyModal from "../../../components/MyModal";
import { useCallback, useEffect, useState } from "react";
import { T_check, T_checkStatus } from "../../../apis/check";
import { T_elevator } from "../../../apis/elevator";
import apis from "../../../apis";
import formats from "../../../modules/formats";
import MyMDInput from "../../../components/MyMDInput";

type T_CheckStatusModalProps = {
  statusModalTarget: T_elevator | null;
  setStatusModalTarget: (statusModalTarget: T_elevator | null) => void;
};

function CheckStatusModal({ statusModalTarget, setStatusModalTarget }: T_CheckStatusModalProps) {
  const [checkStatusList, setCheckStatusList] = useState<T_checkStatus[] | null>(null);
  const [date, setDate] = useState(formats.date(new Date(), "yyyy-mm-dd"));

  const getCheckStatusList = useCallback(async () => {
    if (statusModalTarget) {
      try {
        const result = await apis.check.getStatusList2({
          elevatroNo: statusModalTarget.elevatorNo,
          wdate: date ? date.replaceAll("-", "") : date,
        });
        if (result.isSuccess) {
          setCheckStatusList(result.checkStatusList);
        } else {
          setCheckStatusList([]);
        }
      } catch (err: any) {
        setCheckStatusList([]);
        console.log(err.message);
      }
    }
  }, [date, statusModalTarget]);

  useEffect(() => {
    if (statusModalTarget) {
      getCheckStatusList();
      return () => {
        setCheckStatusList(null);
      };
    }
  }, [statusModalTarget, getCheckStatusList]);

  const getItem = useCallback((text: string) => {
    return (
      <td
        align="center"
        style={{
          paddingLeft: 0,
          backgroundColor: "#eeeeee",
        }}
      >
        <MyMDTypography color="text" variant="caption" fontWeight="regular">
          {text}
        </MyMDTypography>
      </td>
    );
  }, []);

  const getItem2 = useCallback((isOn: number) => {
    return (
      <td
        align="center"
        style={{
          paddingLeft: 0,
        }}
      >
        <MyIcon
          name="BsDot"
          size={25}
          style={{
            marginTop: 10,
          }}
          color={isOn ? "red" : undefined}
        />
      </td>
    );
  }, []);

  return (
    <MyModal
      isVisible={!!statusModalTarget}
      setIsVisible={() => {
        setStatusModalTarget(null);
      }}
      style={{
        width: 1000,
        maxWidth: window.innerWidth - 100,
        height: window.innerHeight - 100,
      }}
    >
      <>
        {statusModalTarget && checkStatusList && (
          <>
            <MyMDBox pt={5} pb={5}>
              <MyMDTypography ml={5} variant="h5">
                접점 상태 - {statusModalTarget.buldNm}
              </MyMDTypography>
              <MyMDBox ml={5} mt={2}>
                <MyMDInput
                  type="date"
                  value={date}
                  onChange={(evt: any) => {
                    console.log("evt:",evt);

                    setDate(evt.target.value);
                  }}
                />
              </MyMDBox>
              <MyMDBox pt={3} pl={5} pr={5}>
                <MyMDBox
                  pr={1}
                  pb={2}
                  sx={{
                    height: window.innerHeight - 290,
                    overflowY: "scroll",
                  }}
                >
                  <table
                    className="myTable"
                    style={{
                      marginTop: 5,
                    }}
                  >
                    <thead></thead>
                    <tbody>
                      <tr>
                        {getItem("날짜")}
                        {getItem("시간")}
                        {getItem("A")}
                        {getItem("B")}
                        {getItem("C")}
                        {getItem("D")}
                        {getItem("E")}
                        {getItem("F")}
                        {getItem("G")}
                        {getItem("H")}
                        {getItem("I")}
                        {getItem("J")}
                        {getItem("K")}
                        {getItem("L")}
                        {getItem("M")}
                        {getItem("N")}
                        {getItem("O")}
                        {getItem("P")}
                        {getItem("Q")}
                        {getItem("R")}
                        {getItem("S")}
                        {getItem("T")}
                        {getItem("U")}
                        {getItem("V")}
                        {getItem("W")}
                        {getItem("X")}
                      </tr>
                      {checkStatusList.map((checkStatus, idx) => {
                        return (
                          <tr key={checkStatus.wtime + idx}>
                            <td
                              align="center"
                              style={{
                                paddingLeft: 0,
                              }}
                            >
                              <MyMDTypography variant="caption" fontWeight="regular">
                                {checkStatus.wdate}
                              </MyMDTypography>
                            </td>
                            <td
                              align="center"
                              style={{
                                paddingLeft: 0,
                              }}
                            >
                              <MyMDTypography variant="caption" fontWeight="regular">
                                {checkStatus.wtime}
                              </MyMDTypography>
                            </td>
                            {getItem2(checkStatus.p1)}
                            {getItem2(checkStatus.p2)}
                            {getItem2(checkStatus.p3)}
                            {getItem2(checkStatus.p4)}
                            {getItem2(checkStatus.p5)}
                            {getItem2(checkStatus.p6)}
                            {getItem2(checkStatus.p7)}
                            {getItem2(checkStatus.p8)}
                            {getItem2(checkStatus.p9)}
                            {getItem2(checkStatus.p10)}
                            {getItem2(checkStatus.p11)}
                            {getItem2(checkStatus.p12)}
                            {getItem2(checkStatus.p13)}
                            {getItem2(checkStatus.p14)}
                            {getItem2(checkStatus.p15)}
                            {getItem2(checkStatus.p16)}
                            {getItem2(checkStatus.p17)}
                            {getItem2(checkStatus.p18)}
                            {getItem2(checkStatus.p19)}
                            {getItem2(checkStatus.p20)}
                            {getItem2(checkStatus.p21)}
                            {getItem2(checkStatus.p22)}
                            {getItem2(checkStatus.p23)}
                            {getItem2(checkStatus.p24)}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </MyMDBox>
                <MyMDBox
                  p={1}
                  onClick={() => {
                    setStatusModalTarget(null);
                  }}
                  sx={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 30,
                    right: 30,
                  }}
                >
                  <MyIcon name="AiOutlineClose" />
                </MyMDBox>
              </MyMDBox>
            </MyMDBox>
          </>
        )}
      </>
    </MyModal>
  );
}

export default CheckStatusModal;
