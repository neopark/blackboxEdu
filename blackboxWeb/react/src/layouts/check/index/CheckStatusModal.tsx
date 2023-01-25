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
import apis from "../../../apis";

type T_CheckStatusModalProps = {
  statusModalTarget: T_check | null;
  setStatusModalTarget: (statusModalTarget: T_check | null) => void;
};

function CheckStatusModal({ statusModalTarget, setStatusModalTarget }: T_CheckStatusModalProps) {
  const [checkStatusList, setCheckStatusList] = useState<T_checkStatus[] | null>(null);

  const getCheckStatusList = useCallback(async () => {
    if (statusModalTarget) {
      try {
        const result = await apis.check.getStatusList({
          masterIdx: statusModalTarget.idx,
          // masterIdx: 67,
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
  }, [statusModalTarget]);

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
                접점 상태
              </MyMDTypography>
              <MyMDBox pt={1} pl={5} pr={5}>
                <MyMDBox
                  pr={1}
                  pt={4}
                  pb={2}
                  sx={{
                    height: window.innerHeight - 200,
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
