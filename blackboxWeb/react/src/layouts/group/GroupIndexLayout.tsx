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
import apis from "../../apis";
import { T_group } from "../../apis/group";
import { useUser } from "../../contexts/user";

function GroupIndexLayout() {
  const nav = useNav();
  const { user } = useUser();
  const isNavReplace = !nav.search;
  const page = nav.params.page;
  const [groupList, setGroupList] = useState<T_group[] | null>(null);

  const getGroupList = useCallback(async () => {
    try {
      const result = await apis.group.getList();
      if (result.isSuccess) {
        setGroupList(result.groupList);
      } else {
        setGroupList([]);
        console.log(result.msg);
      }
    } catch (err: any) {
      setGroupList([]);
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    if (!isNavReplace && !groupList) {
      const init = async () => {
        await getGroupList();
      };
      init();
    }
  }, [groupList, getGroupList, isNavReplace]);

  if (!user) {
    return <Navigate to="/signin" />;
  } else if (isNavReplace) {
    return <Navigate replace to={`/group?page=1`} />;
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        {groupList && (
          <>
            <MyTable
              header={{
                title: "?????? ??????",
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
                        nav.push(`/group/create`);
                      }}
                      href="#"
                      component="a"
                      rel="noreferrer"
                      variant="gradient"
                      color="light"
                    >
                      ??????
                    </MyMDButton>
                  </MyMDBox>
                ),
              }}
              table={(() => {
                type column = "no" | "??????" | "??????" | "??????";
                type low = {
                  [name in column]: JSX.Element;
                };
                const columnList: column[] = ["no", "??????", "??????", "??????"];

                return {
                  columns: columnList.map((column) => {
                    let width = "";
                    switch (column) {
                      case "no": {
                        width = "5%";
                        break;
                      }
                      case "??????": {
                        width = "15%";
                        break;
                      }
                      case "??????": {
                        width = "15%";
                        break;
                      }
                      case "??????": {
                        width = "65%";
                        break;
                      }
                    }

                    return {
                      Header: column,
                      accessor: column,
                      width,
                    };
                  }),
                  rows: groupList.map((group, idx) => {
                    const row: low = {
                      no: (
                        <MyMDTypography
                          display="block"
                          variant="caption"
                          color="text"
                          fontWeight="regular"
                        >
                          {groupList.length - idx}
                        </MyMDTypography>
                      ),
                      ["??????"]: (
                        <MyMDTypography
                          onClick={(evt: any) => {
                            evt.preventDefault();
                            nav.push(`/group/${group.groupIdx}`);
                          }}
                          href="#"
                          display="block"
                          component="a"
                          variant="caption"
                          fontWeight="medium"
                        >
                          {group.groupNm}
                        </MyMDTypography>
                      ),
                      ["??????"]: (
                        <MyMDTypography
                          onClick={(evt: any) => {
                            evt.preventDefault();
                            nav.push(`/group/${group.groupIdx}`);
                          }}
                          href="#"
                          display="block"
                          component="a"
                          variant="caption"
                          fontWeight="regular"
                          color="text"
                        >
                          ??????????????? ????????? ?????????19??? 113
                        </MyMDTypography>
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
    );
  }
}

export default GroupIndexLayout;
