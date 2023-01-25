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
import useNav from "../../uses/useNav";
import apis from "../../apis";
import MyEdit from "../../examples/MyEdit";
import MyMDInput from "../../components/MyMDInput";
import { useUser } from "../../contexts/user";
import { Navigate } from "react-router-dom";

function GroupDetailLayout() {
  const nav = useNav();
  const { user } = useUser();
  const idx = nav.pathname.split("/group/")[1];
  const isCreate = nav.pathname.includes("/group/create");
  const [isInit, setIsInit] = useState(false);
  const [groupNm, setGroupNm] = useState("");
  const [groupAddress, setGroupAddress] = useState("");
  const [memo, setMemo] = useState("");

  const getGroup = useCallback(async () => {
    try {
      const result = await apis.group.get({
        idx,
      });
      if (result.isSuccess && result.group) {
        const group = result.group;
        setGroupNm(group.groupNm);
        setGroupAddress("서울특별시 강북구 삼양로19길 113");
        setMemo("");
      } else {
        console.log(result.msg);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }, [idx]);

  useEffect(() => {
    if (!isInit) {
      const init = async () => {
        if (!isCreate) {
          await getGroup();
        }
        setIsInit(true);
      };
      init();
    }
  }, [isCreate, getGroup, isInit]);

  if (!user) {
    return <Navigate to="/signin" />;
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        {isInit && (
          <>
            <MyEdit
              header={{
                title: "그룹 정보",
              }}
            >
              <MyMDBox
                mt={1.5}
                display="flex"
                sx={{
                  alignItems: "center",
                }}
              >
                <MyMDTypography minWidth={120} variant="caption" color="text" fontWeight="medium">
                  이름
                </MyMDTypography>
                <MyMDInput
                  onChange={(evt: any) => {
                    setGroupNm(evt.target.value);
                  }}
                  fullWidth={true}
                  value={groupNm}
                  label="Name"
                  type="text"
                />
              </MyMDBox>
              <MyMDBox
                mt={1.5}
                display="flex"
                sx={{
                  alignItems: "center",
                }}
              >
                <MyMDTypography minWidth={120} variant="caption" color="text" fontWeight="medium">
                  주소
                </MyMDTypography>
                <MyMDInput
                  onChange={(evt: any) => {
                    setGroupAddress(evt.target.value);
                  }}
                  fullWidth={true}
                  value={groupAddress}
                  label="Address"
                  type="text"
                />
              </MyMDBox>
              <MyMDBox
                mt={1.5}
                display="flex"
                sx={{
                  alignItems: "center",
                }}
              >
                <MyMDTypography minWidth={120} variant="caption" color="text" fontWeight="medium">
                  메모
                </MyMDTypography>
                <MyMDInput
                  onChange={(evt: any) => {
                    setMemo(evt.target.value);
                  }}
                  fullWidth={true}
                  multiline={true}
                  value={memo}
                  label="Memo"
                  type="text"
                  rows={10}
                />
              </MyMDBox>
              <MyMDBox mt={5} justifyContent="center" display="flex">
                {!isCreate && (
                  <MyMDBox pr={1}>
                    <MyMDButton
                      component="a"
                      rel="noreferrer"
                      variant="gradient"
                      color="error"
                      href={``}
                      sx={{
                        width: 100,
                      }}
                      onClick={(evt: any) => {
                        evt.preventDefault();
                        nav.goBack();
                      }}
                    >
                      삭제
                    </MyMDButton>
                  </MyMDBox>
                )}
                <MyMDBox pr={1}>
                  <MyMDButton
                    component="a"
                    rel="noreferrer"
                    variant="gradient"
                    color="info"
                    href={``}
                    sx={{
                      width: 100,
                    }}
                    onClick={(evt: any) => {
                      evt.preventDefault();
                      nav.goBack();
                    }}
                  >
                    {isCreate ? "등록" : "수정"}
                  </MyMDButton>
                </MyMDBox>
                <MyMDBox>
                  <MyMDButton
                    component="a"
                    rel="noreferrer"
                    variant="gradient"
                    color="secondary"
                    href={``}
                    sx={{
                      width: 100,
                    }}
                    onClick={(evt: any) => {
                      evt.preventDefault();
                      nav.goBack();
                    }}
                  >
                    취소
                  </MyMDButton>
                </MyMDBox>
              </MyMDBox>
            </MyEdit>
            <Footer />
          </>
        )}
      </DashboardLayout>
    );
  }
}

export default GroupDetailLayout;
