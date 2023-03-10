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
import { T_user } from "../../apis/user";
import apis from "../../apis";
import { useUser } from "../../contexts/user";
import { userInfo } from "os";

function UserIndexLayout() {
  const nav = useNav();
  const { user } = useUser();
  const isNavReplace = !nav.search;
  const page = nav.params.page;
  const [userList, setUserList] = useState<T_user[] | null>(null);

  const getUserList = useCallback(async () => {
    try {
      const result = await apis.user.getList();
      if (result.isSuccess) {
        setUserList(result.userList);
      } else {
        setUserList([]);
        console.log(result.msg);
      }
    } catch (err: any) {
      setUserList([]);
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    if (!isNavReplace && !userList) {
      const init = async () => {
        await getUserList();
      };
      init();
    }
  }, [userList, getUserList, isNavReplace]);

  if (!user) {
    return <Navigate to="/signin" />;
  } else if (isNavReplace) {
    return <Navigate replace to={`/user?page=1`} />;
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        {userList && (
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
                    {/* <MyMDButton
                      onClick={(evt: any) => {
                        evt.preventDefault();
                        nav.push(`/user/create`);
                      }}
                      href="#"
                      component="a"
                      rel="noreferrer"
                      variant="gradient"
                      color="light"
                    >
                      ??????
                    </MyMDButton> */}
                  </MyMDBox>
                ),
              }}
              table={(() => {
                type column = "no" | "?????????" | "????????????" | "?????????" | "????????????"| "??????";
                type low = {
                  [name in column]: JSX.Element;
                };
                const columnList: column[] = ["no", "?????????", "????????????", "?????????","????????????", "??????"];

                return {
                  columns: columnList.map((column) => {
                    let width = "";
                    switch (column) {
                      case "no": {
                        width = "5%";
                        break;
                      }
                      case "?????????": {
                        width = "15%";
                        break;
                      }
                      case "????????????": {
                        width = "15%";
                        break;
                      }
                      case "?????????": {
                        width = "15%";
                        break;
                      }
                      case "????????????": {
                        width = "15%";
                        break;
                      }
                      case "??????": {
                        width = "50%";
                        break;
                      }
                    }

                    return {
                      Header: column,
                      accessor: column,
                      width,
                    };
                  }),
                  rows: userList.map((user, idx) => {
                    const row: low = {
                      no: (
                        <MyMDTypography
                          display="block"
                          variant="caption"
                          color="text"
                          fontWeight="regular"
                        >
                          {userList.length - idx}
                        </MyMDTypography>
                      ),
                      ["?????????"]: (
                        <MyMDBox
                          onClick={(evt: any) => {
                            evt.preventDefault();
//                            nav.params = {itemid:"aaaa"}
                            nav.pushParam(`/user/info`,{userid:user.userId});
                            
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
                            {user.userNm}
                          </MyMDTypography>
                          {/* <MyMDTypography
                            display="block"
                            variant="caption"
                            fontWeight="regular"
                            color="text"
                          >
                            {user.userId}
                          </MyMDTypography> */}
                        </MyMDBox>
                      ),
                      ["????????????"]: (
                        <MyMDTypography
                          onClick={(evt: any) => {
                            evt.preventDefault();
                            nav.push(`/user/${user.userId}`);
                          }}
                          href="#"
                          component="a"
                          display="block"
                          variant="caption"
                          fontWeight="medium"
                        >
                          {user.hp}
                        </MyMDTypography>
                      ),
                      ["?????????"]: (
                        <MyMDTypography variant="caption" color="text" fontWeight="regular">
                          {user.bizName}
                        </MyMDTypography>
                      ),
                      ["????????????"]: (
                        <MyMDTypography variant="caption" color="text" fontWeight="regular">
                          {user.license}
                        </MyMDTypography>
                      ),
                      ["??????"]: (
                        <MyMDTypography
                          display="block"
                          variant="caption"
                          color="text"
                          fontWeight="medium"
                        ></MyMDTypography>
                      ),
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

export default UserIndexLayout;
