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
      name: "??????",
    },
    {
      value: "S",
      name: "????????????",
    },
    {
      value: "F",
      name: "?????????",
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
                  title: "?????? ??????",
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
                        ??????
                      </MyMDButton>
                    </MyMDBox>
                  </>
                }
                table={(() => {
                  type column =
                    | "no"
//                    | "??????"
                    | "???????????????"
                    | "?????????"
                    | "???????????????"
                    | "????????????"
                    | "????????????"
                    | "????????????"
                    | "??????";
                  type low = {
                    [name in column]: JSX.Element;
                  };
                  const columnList: column[] = [
                    "no",
//                    "??????",
                    "???????????????",
                    "?????????",
                    "???????????????",
                    "????????????",
                    "????????????",
                    "????????????",
//                    "??????",
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
                        case "????????????": {
                          width = "12%";
                          align = "center";
                          break;
                        }
                        // case "??????": {
                        //   width = "12%";
                        //   break;
                        // }
                        case "???????????????": {
                          width = "12%";
                          align = "left";
                          break;
                        }
                        case "?????????": {
                          width = "12%";
                          align = "left";
                          break;
                        }
                        case "???????????????": {
                          width = "12%";
                          align = "left";
                          break;
                        }
                        case "????????????": {
                          width = "7%";
                          align = "left";
                          break;
                        }
                        case "????????????": {
                          width = "7%";
                          align = "left";
                          break;
                        }
                        // case "??????": {
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
                        ["????????????"]: (
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
                        // ["??????"]: (
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
                        //     {/* SH????????????2-6?????? */}
                        //   </MyMDTypography>
                        // ),
                        ["???????????????"]: (
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
                              {/* 602??? 1?????? */}
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
                        ["?????????"]: (
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
                        ["???????????????"]: (
                          <MyMDTypography
                            color={isChecking || !isPass ? "primary" : undefined}
                            display="block"
                            variant="caption"
                            fontWeight="medium"
                          >
                            {(() => {
                              if (isChecking) {
                                return "?????????";
                              } else if (isPass) {
                                return "????????????";
                              } else {
                                return "?????????";
                              }
                            })()}
                          </MyMDTypography>
                        ),
                        ["????????????"]: (
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
                        ["????????????"]: (
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
                        ["??????"]: <MyMDBox></MyMDBox>,
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
