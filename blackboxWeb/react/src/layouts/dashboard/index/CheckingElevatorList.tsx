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

import { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import MyMDBox from "../../../components/MyMDBox";
import MyMDTypography from "../../../components/MyMDTypography";
import MyTable from "../../../examples/MyTable";
import apis from "../../../apis";
import useNav from "../../../uses/useNav";
import { T_elevator } from "../../../apis/elevator";
import { T_check, T_checkResult } from "../../../apis/check";

function CheckingElevatorList() {
  const nav = useNav();
  const [checkingElevatorList, setCheckingElevatorList] = useState<T_check[]>([]);

  const getCheckingElevatorList = useCallback(async () => {
    try {
      const result = await apis.elevator.getCheckingList();
      if (result.isSuccess) {
        setCheckingElevatorList(result.checkingElevatorList);
      } else {
        setCheckingElevatorList([]);
      }
    } catch (err: any) {
      setCheckingElevatorList([]);
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    const ms = 10000;
    getCheckingElevatorList();
    const interval = setInterval(getCheckingElevatorList, ms);
    return () => {
      clearInterval(interval);
    };
  }, [getCheckingElevatorList]);

  return (
    <Card>
      <MyMDBox p={3}>
        <MyMDBox>
          <MyMDTypography variant="h6" gutterBottom>
            점검중인 엘리베이터
          </MyMDTypography>
        </MyMDBox>
        <MyMDBox display="flex" alignItems="center" lineHeight={0}>
          <MyMDTypography variant="h6" fontWeight="regular" color="primary">
            <strong>{checkingElevatorList.length}대</strong>
          </MyMDTypography>
        </MyMDBox>
        <MyMDBox color="text" px={2}>
          {/* <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon> */}
        </MyMDBox>
        {/* {renderMenu} */}
      </MyMDBox>
      <MyMDBox>
        <MyTable
          table={(() => {
            type column = "no"| "엘리베이터" | "주소" | "점검자" | "시작일시";
            type low = {
              [name in column]: JSX.Element;
            };
            const columnList: column[] = [
              "no",
//              "그룹",
              "엘리베이터",
              "주소",
              "점검자",
              "시작일시",
            ];

            return {
              columns: columnList.map((column) => {
                let width = "";
                switch (column) {
                  case "no": {
                    width = "5%";
                    break;
                  }
                  // case "그룹": {
                  //   width = "15%";
                  //   break;
                  // }
                  case "엘리베이터": {
                    width = "15%";
                    break;
                  }
                  case "주소": {
                    width = "15%";
                    break;
                  }
                  case "점검자": {
                    width = "15%";
                    break;
                  }
                  case "시작일시": {
                    width = "35%";
                    break;
                  }
                }

                return {
                  Header: column,
                  accessor: column,
                  width,
                };
              }),
              rows: checkingElevatorList.map((checkingElevator, idx) => {
                const row: low = {
                  no: (
                    <MyMDTypography
                      display="block"
                      variant="caption"
                      color="text"
                      fontWeight="regular"
                    >
                      {checkingElevatorList.length - idx}
                    </MyMDTypography>
                  ),
                  // ["그룹"]: (
                  //   <MyMDTypography
                  //     onClick={(evt: any) => {
                  //       evt.preventDefault();
                  //       nav.push(`/group/0`);
                  //     }}
                  //     href="#"
                  //     display="block"
                  //     component="a"
                  //     variant="caption"
                  //     fontWeight="medium"
                  //   >
                  //     {/* SH공사공릉2-6단지 */}
                  //   </MyMDTypography>
                  // ),
                  ["엘리베이터"]: (
                    <MyMDBox
                      onClick={(evt: any) => {
                        evt.preventDefault();
                        nav.push(`/elevator/${checkingElevator.elevinfo}`);
                      }}
                      href="#"
                      component="a"
                      alignItems="center"
                    >
                      <MyMDTypography display="block" variant="caption" fontWeight="medium" mb={1}>
                        {/* 602동 1호기 */}
                      </MyMDTypography>
                      <MyMDTypography
                        display="block"
                        variant="caption"
                        fontWeight="regular"
                        color="text"
                      >
                        {checkingElevator.elevinfo?.buldNm}
                      </MyMDTypography>
                    </MyMDBox>
                  ),
                  ["주소"]: (
                    <MyMDTypography
                      display="block"
                      variant="caption"
                      fontWeight="regular"
                      color="text"
                    >
                      {checkingElevator.elevinfo?.address1}
                    </MyMDTypography>
                  ),
                  ["점검자"]: (
                    <MyMDTypography
                      display="block"
                      variant="caption"
                      fontWeight="regular"
                      color="text"
                    >
                      {checkingElevator.userinfo.userNm}
                    </MyMDTypography>
                  ),
                  ["시작일시"]: (
                    <MyMDTypography
                      display="block"
                      variant="caption"
                      fontWeight="regular"
                      color="text"
                    >
                      {checkingElevator.insDate}
                    </MyMDTypography>
                  ),
                };
                return row;
              }),
            };
          })()}
        />
      </MyMDBox>
    </Card>
  );
}

export default CheckingElevatorList;
