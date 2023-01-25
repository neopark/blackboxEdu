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

import { Navigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MyMDBox from "../../components/MyMDBox";
import MyMDTypography from "../../components/MyMDTypography";
import MyMDInput from "../../components/MyMDInput";
import MyMDButton from "../../components/MyMDButton";
import BasicLayout from "../../layouts/authentication/components/BasicLayout";
import { useState } from "react";
import { useUser } from "../../contexts/user";
import { toast } from "react-toastify";

function SigninIndexLayout() {
  const { user, setUser } = useUser();
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  if (user) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <BasicLayout image={require("../../assets/images/home_back.png")}>
        <Card>
          <MyMDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MyMDTypography variant="h4" pb={1} fontWeight="medium" color="white" mt={1}>
              Login
            </MyMDTypography>
          </MyMDBox>
          <MyMDBox pt={4} pb={3} px={3}>
            <MyMDBox component="form" role="form">
              <MyMDBox mb={2}>
                <MyMDInput
                  type="text"
                  label="ID"
                  value={userId}
                  fullWidth={true}
                  onChange={(evt: any) => {
                    setUserId(evt.target.value);
                  }}
                />
              </MyMDBox>
              <MyMDBox mb={2}>
                <MyMDInput
                  type="password"
                  label="Password"
                  value={userPassword}
                  fullWidth={true}
                  onChange={(evt: any) => {
                    setUserPassword(evt.target.value);
                  }}
                />
              </MyMDBox>
              <MyMDBox mt={4} mb={1}>
                <MyMDButton
                  onClick={() => {
                    if (userId === "shadmin" && userPassword === "sh1234") {
                      setUser({});
                    } else {
                      toast.error("아이디 또는 비밀번호가 일치하지 않습니다.");
                    }
                  }}
                  variant="gradient"
                  color="info"
                  fullWidth
                >
                  sign in
                </MyMDButton>
              </MyMDBox>
            </MyMDBox>
          </MyMDBox>
        </Card>
      </BasicLayout>
    );
  }
}

export default SigninIndexLayout;
