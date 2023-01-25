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

import MyMDBox from "../../components/MyMDBox";
import MyMDButton from "../../components/MyMDButton";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import { useCallback, useEffect, useState } from "react";
import MyMDTypography from "../../components/MyMDTypography";
import MyTable from "../../examples/MyTable";
import { Navigate } from "react-router-dom";
import useNav from "../../uses/useNav";
import { T_elevator } from "../../apis/elevator";
import apis from "../../apis";
import { useUser } from "../../contexts/user";

import CheckStatusModal from "./index/CheckStatusModal";
import { T_check, T_checkResult } from "../../apis/check";
import MyIcon from "../../components/MyIcon";


function ElevatorIndexLayout() {
  const nav = useNav();
  const { user } = useUser();
  const isNavReplace = !nav.search;
  const page = nav.params.page;
  const pagesize = 10;
  const [total, setTotal] = useState<null | number>(null);
  const [totalPage, setTotalPage] = useState<null | number>(null);
  const [elevatorList, setElevatorList] = useState<T_elevator[] | null>(null);
  const [statusModalTarget, setStatusModalTarget] = useState<T_elevator | null>(null);
  

  const getElevatorList = useCallback(async () => {
    try {
      const result = await apis.elevator.getList(
        {
          page:Number(page),
          pagesize:pagesize,
        }
      );

      if (result.isSuccess) {
        //console.log("1:",result);
        setTotalPage(result.totalPage);
        setTotal(result.total);
        //console.log("2:",result.elevatorList);
         setElevatorList(result.elevatorList);
        // console.log("3:",result.elevatorList);

      } else {
        setElevatorList([]);
        console.log(result.msg);
      }
    } catch (err: any) {
      setElevatorList([]);
      console.log(err.message);
    }
  }, [page]);

  useEffect(() => {
   // if (!isNavReplace && !elevatorList) {
      const init = async () => {
        await getElevatorList();
      };
      init();
   // }
  }, [getElevatorList,page]);

  if (!user) {
    return <Navigate replace to={`/signin`} />;
  } else if (isNavReplace) {
    return <Navigate replace to={`/elevator?page=1`} />;
  } else {
    return (
      <>
      <DashboardLayout>
        <DashboardNavbar />
        {elevatorList && (
          <>
            <MyTable
             pagesize={pagesize}
             totalPage={totalPage}
              header={{
                title: "엘리베이터 관리",
                rightComponent: (
                  <MyMDBox
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <MyMDButton
                      onClick={(evt: any) => {
                        evt.preventDefault();
                        nav.push(`/elevator/create`);
                      }}
                      href="#"
                      component="a"
                      rel="noreferrer"
                      variant="gradient"
                      color="light"
                    >
                      등록
                    </MyMDButton>
                  </MyMDBox>
                ),
              }}
              table={(() => {
                type column = "no" | "타입" | "엘리베이터" | "주소" | "유지보수업체" | "비고";
                type low = {
                  [name in column]: JSX.Element;
                };
                const columnList: column[] = [
                  "no",
                  "타입",
                  "엘리베이터",
                  "주소",
                  "유지보수업체",
                  "비고",
                ];

                return {
                  columns: columnList.map((column) => {
                    let width = "";
                    switch (column) {
                      case "no": {
                        width = "5%";
                        break;
                      }
                      case "타입": {
                        width = "5%";
                        break;
                      }
                      case "엘리베이터": {
                        width = "20%";
                        break;
                      }
                      case "주소": {
                        width = "20%";
                        break;
                      }
                      case "유지보수업체": {
                        width = "15%";
                        break;
                      }
                      case "비고": {
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
                  rows: elevatorList.map((elevator, idx) => {
                    const row: low = {
                      no: (
                        <MyMDTypography
                          display="block"
                          variant="caption"
                          color="text"
                          fontWeight="regular"
                        >
                          {Number(total)-(pagesize*(Number(page)-1))-idx}
                        </MyMDTypography>
                      ),
                      ["타입"]: (
                        <MyMDTypography
                          // onClick={(evt: any) => {
                          //   evt.preventDefault();
                          //   nav.push(`/group/0`);
                          // }}
                          // href="#"
                          display="block"
                          component="a"
                          variant="caption"
                          fontWeight="medium"
                        >
                          {elevator.elvtrKindNm}
                        </MyMDTypography>
                      ),
                      ["엘리베이터"]: (
                        <MyMDBox
                          onClick={(evt: any) => {
                            evt.preventDefault();
                      //      nav.push(`/elevator/${elevator.elevatorNo}`);
                            nav.pushParam('/elevator/info',{elevatorNo:elevator.elevatorNo});
                          }}
                          href="#"
                          component="a"
                          alignItems="center"
                        >
                          <MyMDTypography
                            display="block"
                            variant="caption"
                            fontWeight="medium"
                            mb={1}
                          >
                            {/* 602동 1호기 */}
                          </MyMDTypography>
                          <MyMDTypography
                            display="block"
                            variant="caption"
                            fontWeight="regular"
                            color="text"
                          >
                            {elevator.buldNm}
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
                          {elevator.address1}
                        </MyMDTypography>
                      ),
                      ["유지보수업체"]: (
                        <MyMDTypography
                          display="block"
                          variant="caption"
                          fontWeight="regular"
                          color="text"
                        >
                          {elevator.mntCpnyNm}
                        </MyMDTypography>
                      ),
                      ["비고"]: <MyMDBox
                                component="a"
                                href={`#`}
                                alignItems="center"
                                p={1}
                                onClick={(evt: any) => {
                                  evt.preventDefault();
                                  setStatusModalTarget(elevator);
                                }}
                              >
                                <MyIcon name="AiOutlineTable" color="#888888" size={22} />

                      </MyMDBox>,
                    };
                    return row;
                  }),
                };
              })()}
            />
            <Footer />
          </>
        )}
      </DashboardLayout>
      <CheckStatusModal
          statusModalTarget={statusModalTarget}
          setStatusModalTarget={setStatusModalTarget}
        />
      </>
    );
  }
}

export default ElevatorIndexLayout;
