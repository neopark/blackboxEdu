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
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import { useCallback, useEffect, useState } from "react";
import MyMDTypography from "../../components/MyMDTypography";
import MyTable from "../../examples/MyTable";
import { T_check, T_checkResult } from "../../apis/check";
import apis from "../../apis";
import useNav from "../../uses/useNav";
import { Navigate } from "react-router-dom";
import MyIcon from "../../components/MyIcon";
import formats from "../../modules/formats";
import MyMDInput from "../../components/MyMDInput";
import MyMDButton from "../../components/MyMDButton";
import MyMDSelect from "../../components/MyMDSelect";
import CheckDetailModal from "./index/CheckDetailModal";
import CheckStatusModal from "./index/CheckStatusModal";
import { useUser } from "../../contexts/user";
import { Typography } from "@mui/material";
import { textAlign } from "@mui/system";

// import { toast } from "react-toastify";

type T_selectCheckResult = {
  name: string;
  value: T_checkResult | "all";
};

function CheckIndexLayout() {
  const nav = useNav();
  const pagesize = 10;
  const { user } = useUser();
  const isNavReplace = !nav.search;
  const page = nav.params.page;
  const today = new Date();
  const preMonth = today.setMonth(today.getMonth()-1);
  const [sdate, setSdate] = useState(nav.params.date || formats.date(new Date(preMonth), "yyyy-mm-dd"));
  const [edate, setEdate] = useState(nav.params.date || formats.date(new Date(), "yyyy-mm-dd"));
  const [checkResult, setCheckResult] = useState(nav.params.checkResult || "all");
  const [checkList, setCheckList] = useState<T_check[] | null>(null);
  const [detailModalTarget, setDetailModalTarget] = useState<T_check | null>(null);
  const [statusModalTarget, setStatusModalTarget] = useState<T_check | null>(null);
  const [totalPage, setTotalPage] = useState<null | number>(null);
  const [total, setTotal] = useState<null | number>(null);

  const selectCheckResultList: T_selectCheckResult[] = [
    {
      value: "all",
      name: "전체",
    },
    {
      value: "S",
      name: "점검완료",
    },
    {
      value: "F",
      name: "점검중",
    },
  ];

  const getCheckList = useCallback(async () => {

    try {
//      console.log(sdate);
      const result = await apis.check.getList({
        page: Number(page),
        pagesize,
        sdate:sdate,
        edate:edate,
      });

//      console.log(result)
      if (result.isSuccess) {
        setTotalPage(result.totalPage);
        setTotal(result.total);
        setCheckList(result.checkList);
      } else {
        setCheckList([]);
      }
    } catch (err: any) {
      setCheckList([]);
      console.log(err.message);
    }
  }, [page,sdate,edate]);

  useEffect(() => {
    const init = async () => {
      await getCheckList();
    };
    init();
  }, [getCheckList, page]);

  if (!user) {
    return <Navigate replace to={`/signin`} />;
  } else if (isNavReplace) {
    return <Navigate replace to={`/check?page=1`} />;
  } else {
    return (
      <>
        <DashboardLayout>
          <DashboardNavbar />
          {checkList && (
            <>
              <MyTable
                pagesize={pagesize}
                totalPage={totalPage}
                header={{
                  title: "점검 현황",
                }}
                filter={
                  <>
                    <MyMDInput
                      type="date"
                      value={sdate}
                      onChange={(evt: any) => {
                        setSdate(evt.target.value);
                      }}
                    />
                    <Typography mx={2}>
                    -
                    </Typography>
                    
                    <MyMDInput
                      type="date"
                      value={edate}
                      onChange={(evt: any) => {
                        setEdate(evt.target.value);
                      }}
                    />
                    <MyMDBox ml={1} width={130}>
                      <MyMDSelect
                        value={checkResult}
                        itemList={selectCheckResultList}
                        onChange={(value) => {
                          for (let idx = 0; idx < selectCheckResultList.length; idx++) {
                            const selCheckResult = selectCheckResultList[idx];
                            if (value === selCheckResult.value) {
                              setCheckResult(value);
                              break;
                            }
                          }
                        }}
                      />
                    </MyMDBox>
                    <MyMDBox
                      display="flex"
                      sx={{
                        flex: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      <MyMDButton
                        component="a"
                        rel="noreferrer"
                        variant="gradient"
                        color="light"
                        href="#"
                        onClick={(evt: any) => {
                          evt.preventDefault();

                          getCheckList();  
                        }}
                      >
                        조회
                      </MyMDButton>
                    </MyMDBox>
                  </>
                }
                table={(() => {
                  type column =
                    | "no"
//                    | "그룹"
                    | "엘리베이터"
                    | "담당자"
                    | "점검유효성"
                    | "점검결과"
                    | "접점상태"
                    | "점검일시"
                    | "비고";
                  type low = {
                    [name in column]: JSX.Element;
                  };
                  const columnList: column[] = [
                    "no",
//                    "그룹",
                    "엘리베이터",
                    "담당자",
                    "점검유효성",
                    "점검결과",
                    "접점상태",
                    "점검일시",
//                    "비고",
                  ];

                  return {
                    columns: columnList.map((column) => {
                      let width = "";
                      let align = "left";
                      switch (column) {
                        case "no": {
                          width = "5%";
                          align = "left";
                          break;
                        }
                        case "점검일시": {
                          width = "12%";
                          align = "center";
                          break;
                        }
                        // case "그룹": {
                        //   width = "12%";
                        //   break;
                        // }
                        case "엘리베이터": {
                          width = "12%";
                          align = "left";
                          break;
                        }
                        case "담당자": {
                          width = "12%";
                          align = "left";
                          break;
                        }
                        case "점검유효성": {
                          width = "12%";
                          align = "left";
                          break;
                        }
                        case "점검결과": {
                          width = "7%";
                          align = "left";
                          break;
                        }
                        case "접점상태": {
                          width = "7%";
                          align = "left";
                          break;
                        }
                        // case "비고": {
                        //   width = "21%";
                        //   break;
                        // }
                      }
                      return {
                        Header: column,
                        accessor: column,
                        width,
                        align,
                      };
                    }),
                    rows: checkList.map((check, idx) => {
                      const isChecking = check.status === "1";
                      const isPass = check.cstatus === "S";
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
                        ["점검일시"]: (
                          <MyMDTypography
                            display="block"
                            variant="caption"
                            color="text"
                            fontWeight="medium"
                          >
                            {formats.date(check.insDate, "yyyy.mm.dd  HH:MM")} 
                             - {formats.date(check.updDate, "yyyy.mm.dd  HH:MM")}
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
                              nav.push(`/elevator/${check.elevatorNo}`);
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
                              {check.elevinfo?.buldNm}
                            </MyMDTypography>
                          </MyMDBox>
                        ),
                        ["담당자"]: (
                          <MyMDBox
                            onClick={(evt: any) => {
                              evt.preventDefault();
                              nav.push(`/user/kakao_neopark77@naver.com`);
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
                              {check.userinfo?.userNm}
                            </MyMDTypography>
                            {/* <MyMDTypography
                              display="block"
                              variant="caption"
                              fontWeight="regular"
                              color="text"
                            >
                              {check.userinfo?.hp}
                            </MyMDTypography> */}
                          </MyMDBox>
                        ),
                        ["점검유효성"]: (
                          <MyMDTypography
                            color={isChecking || !isPass ? "primary" : undefined}
                            display="block"
                            variant="caption"
                            fontWeight="medium"
                          >
                            {(() => {
                              if (isChecking) {
                                return "점검중";
                              } else if (isPass) {
                                return "점검완료";
                              } else {
                                return "부적격";
                              }
                            })()}
                          </MyMDTypography>
                        ),
                        ["점검결과"]: (
                          <>
                            {!isChecking && (
                              <MyMDBox
                                component="a"
                                href={`#`}
                                alignItems="center"
                                p={1}
                                onClick={(evt: any) => {
                                  evt.preventDefault();
                                  setDetailModalTarget(check);
                                }}
                              >
                                <MyIcon name="BsListCheck" color="#666666" />
                              </MyMDBox>
                            )}
                          </>
                        ),
                        ["접점상태"]: (
                          <>
                            {!isChecking && (
                              <MyMDBox
                                component="a"
                                href={`#`}
                                alignItems="center"
                                p={1}
                                onClick={(evt: any) => {
                                  evt.preventDefault();
                                  setStatusModalTarget(check);
                                }}
                              >
                                <MyIcon name="AiOutlineTable" color="#888888" size={22} />
                              </MyMDBox>
                            )}
                          </>
                        ),
                        ["비고"]: <MyMDBox></MyMDBox>,
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
        <CheckDetailModal
          detailModalTarget={detailModalTarget}
          setDetailModalTarget={setDetailModalTarget}
        />
        <CheckStatusModal
          statusModalTarget={statusModalTarget}
          setStatusModalTarget={setStatusModalTarget}
        />
      </>
    );
  }
}

export default CheckIndexLayout;
