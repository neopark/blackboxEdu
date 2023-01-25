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
import {T_user} from "../../apis/user"

function UserDetailLayout() {
  const nav = useNav();
  const { user } = useUser();
  const state = nav.state as {userid:string}
  const id = state.userid;
  const isCreate = nav.pathname.includes("/user/create");
  const [isInit, setIsInit] = useState(false);

  const [userInfo,setUserInfo] = useState<T_user|null>(null);


  const getUser = useCallback(async () => {
    try {
      const result = await apis.user.get({
        id,
      });
      if (result.isSuccess && result.user) {
        const user = result.user;
        setUserInfo(result.user);
      } else {
        console.log(result.msg);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }, [id]);

  useEffect(() => {
    if (!isInit) {
      const init = async () => {
        if (!isCreate) {
          await getUser();
        }
        setIsInit(true);
      };
      init();
    }
  }, [isCreate, getUser, isInit]);

  if (!user) {
    return <Navigate to="/signin" />;
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
       <MyMDBox pt={1} pl={1} pr={1} borderRadius="md" bgColor="#FFFFFF">
         <MyMDBox pr={1}  pt={1}  pb={2} >
             <MyMDTypography ml={1} variant="h6">
                회원정보
             </MyMDTypography>
        <table   className="myTable"
                    style={{
                      marginTop: 5,
                      tableLayout: "fixed",
                    }}
        ><thead>
        </thead>
        <tbody>
        <tr>
              <td style={{backgroundColor:"#eeeeee"}}>  <MyMDTypography ml={1} variant="caption"> 이름 </MyMDTypography></td>
              <td><MyMDTypography ml={1} variant="caption"  fontWeight="medium">{userInfo?.userNm}</MyMDTypography></td>
              <td style={{backgroundColor:"#eeeeee"}}>  <MyMDTypography ml={1} variant="caption"> 전화번호 </MyMDTypography></td>
              <td><MyMDTypography ml={1} variant="caption"  fontWeight="medium">{userInfo?.hp}</MyMDTypography></td>
              </tr>
              <tr>
              <td style={{backgroundColor:"#eeeeee"}}>  <MyMDTypography ml={1} variant="caption"> 회사명 </MyMDTypography></td>
              <td><MyMDTypography ml={1} variant="caption"  fontWeight="medium">{userInfo?.bizName}</MyMDTypography></td>
              <td style={{backgroundColor:"#eeeeee"}}>  <MyMDTypography ml={1} variant="caption"> 사업자번호 </MyMDTypography></td>
              <td><MyMDTypography ml={1} variant="caption"  fontWeight="medium">{userInfo?.bizRegNo}</MyMDTypography></td>
              </tr>
              <tr>
              <td style={{backgroundColor:"#eeeeee"}}>  <MyMDTypography ml={1} variant="caption"> 자격번호 </MyMDTypography></td>
              <td colSpan={3}><MyMDTypography ml={1} variant="caption"  fontWeight="medium">{userInfo?.license}</MyMDTypography></td>
              </tr>
              <tr >
              <td style={{backgroundColor:"#eeeeee",height:300}}>  <MyMDTypography ml={1} variant="caption"> 비고 </MyMDTypography></td>
              <td colSpan={3}><MyMDTypography ml={1} variant="caption"  fontWeight="medium" ></MyMDTypography></td>
              </tr>
        </tbody>
        </table>
        <MyMDBox m={1} justifyContent="center" display="flex">
                          <MyMDBox pr={1}>
                          <MyMDButton m={1}   variant="gradient"
                            color="secondary">수정</MyMDButton>
                          </MyMDBox>
                          <MyMDBox pr={1}>
                          <MyMDButton m={1}   variant="gradient"
                            color="info">삭제</MyMDButton>
                          </MyMDBox>
                          </MyMDBox>
        </MyMDBox>
        </MyMDBox>
      </DashboardLayout>
    );
  }
}

export default UserDetailLayout;
