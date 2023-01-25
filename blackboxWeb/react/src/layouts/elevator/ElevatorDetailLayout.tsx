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
import MyMDSelect from "../../components/MyMDSelect";
import { useUser } from "../../contexts/user";
import { Navigate } from "react-router-dom";
import { Divider, Grid ,Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { T_elevator } from "../../apis/elevator";

type T_selectGroup = {
  name: string;
  value: string;
};

function ElevatorDetailLayout() {
  const nav = useNav();
  const { user } = useUser();
  
  const state = nav.state as {elevatorNo:string}
  const no = state.elevatorNo;

  //const no = nav.pathname.split("/elevator/")[1];


  const isCreate = nav.pathname.includes("/elevator/create");
  const [isInit, setIsInit] = useState(false);
  const [elevator, setElevator] = useState<T_elevator| null>(null);
  const [elevatorNm, setElevatorNm] = useState("");
  const [elevatorNo, setElevatorNo] = useState("");
  const [group, setGroup] = useState<T_selectGroup | null>(null);
  const [memo, setMemo] = useState("");
  const [groupList, setGroupList] = useState<T_selectGroup[] | null>([]);

  const getGroupList = useCallback(async () => {
    try {
      const result = await apis.group.getList();
      if (result.isSuccess) {
        const groupList = result.groupList;
        const selectGroupList: T_selectGroup[] = [];
        for (let idx = 0; idx < groupList.length; idx++) {
          const groupItem = groupList[idx];
          selectGroupList.push({
            name: groupItem.groupNm,
            value: groupItem.groupIdx,
          });
        }
        setGroupList(selectGroupList);
        setGroup(selectGroupList[0]);
      } else {
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }, []);

    const getElevator = useCallback(async () => {
    try {
      const result = await apis.elevator.get({
        elevatorNo:no,
      });
      if (result.isSuccess ) {
        const elevator = result.elevator;
        console.log(elevator);
        setElevator(result.elevator);
        // setElevatorNo(elevator.elevatorNo);
        // setElevatorNm(elevator.buldNm);
    //    setMemo("");
      } else {
        console.log(result.msg);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }, [no]);

  useEffect(() => {
    // if (!isInit) {
    //   const init = async () => {
        // await getGroupList();
        // if (!isCreate) {
          getElevator();
        // }
    //      setIsInit(true);
    //   };
    //   init();
    // }
  }, []);

  if (!user) {
    return <Navigate replace to={`/signin`} />;
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
             <>
            <MyMDBox pt={1} pl={1} pr={1} borderRadius="md" bgColor="#FFFFFF">
                <MyMDBox
                  pr={1}
                  pt={1}
                  pb={2}
                >
             <MyMDTypography ml={1} variant="h6">
                승강기 정보
             </MyMDTypography>
             <table
                    className="myTable"
                    style={{
                      marginTop: 5,
                      tableLayout: "fixed",
                    }}
                  >
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            승강기번호
                          </MyMDTypography>
                        </td>
                        <td >
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {elevator?.elevatorNo}
                          </MyMDTypography>
                        </td>
                        <td colSpan={2}>
                        <MyMDBox m={1} justifyContent="left" display="flex">
                          <MyMDBox pr={1}>
                          <MyMDButton m={1}   variant="gradient"
                            color="secondary">검사이력</MyMDButton>
                          </MyMDBox>
                          <MyMDBox pr={1}>
                          <MyMDButton m={1}   variant="gradient"
                            color="info">고장이력</MyMDButton>
                          </MyMDBox>
                          </MyMDBox>
                        </td>
                      </tr>
                      </tbody>
                      </table>
                      <table
                    className="myTable"
                    style={{
                      marginTop: 5,
                      tableLayout: "fixed",
                    }}
                  >
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            건물명
                          </MyMDTypography>
                        </td>
                        <td colSpan={3}>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {elevator?.buldNm} {elevator?.installationPlace}
                          </MyMDTypography>
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            소재지
                          </MyMDTypography>
                        </td>
                        <td colSpan={3}>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {elevator?.address1} = {elevator?.address2}
                          </MyMDTypography>
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            제조업체
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {elevator?.manufacturerName}
                          </MyMDTypography>
                        </td>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            모델명
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                          {elevator?.elvtrModel}
                          </MyMDTypography>
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            종류
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            장애인용
                          </MyMDTypography>
                        </td>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            상태
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                           {elevator?.elvtrStts}
                          </MyMDTypography>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            적재하중
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {elevator?.liveLoad}
                          </MyMDTypography>
                        </td>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            최대정원
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                          {elevator?.ratedCap}
                          </MyMDTypography>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            운행구간
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {elevator?.shuttleSection}
                          </MyMDTypography>
                        </td>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            운행층수
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                           {elevator?.shuttleFloorCnt}
                          </MyMDTypography>
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            지상층수
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {elevator?.divGroundFloorCnt}
                          </MyMDTypography>
                        </td>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            지하층수
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {elevator?.divUndgrndFloorCnt}
                          </MyMDTypography>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            정격속도
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {elevator?.ratedSpeed}
                          </MyMDTypography>
                        </td>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            최종검사일
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                          {elevator?.lastInspctDe}
                          </MyMDTypography>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            검사유효기간
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {elevator?.applcBeDt} ~ {elevator?.applcEnDt}
                          </MyMDTypography>
                        </td>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            설치일/최초설치일
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                          {elevator?.installationDe} / {elevator?.frstInstallationDe}
                          </MyMDTypography>
                        </td>
                      </tr>
                      </tbody>
                      </table>      
                      <table
                    className="myTable"
                    style={{
                      marginTop: 5,
                      tableLayout: "fixed",
                    }}
                  >
                    <thead></thead>
                    <tbody>

     
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                             유지관리업체
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {elevator?.manufacturerName}
                          </MyMDTypography>
                        </td>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            유지관리업체 연락처
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                          {elevator?.manufacturerTelno}
                          </MyMDTypography>
                        </td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            하도급/공동수급업체명
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                           - 
                          </MyMDTypography>
                        </td>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            하도급 / 공동수급 연락처
                          </MyMDTypography>
                        </td>
                        <td>
                          <MyMDTypography variant="caption" fontWeight="medium">
                           -
                          </MyMDTypography>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          <MyMDTypography color="text" variant="caption" fontWeight="regular">
                            최종 검사 기관
                          </MyMDTypography>
                        </td>
                        <td colSpan={3}>
                          <MyMDTypography variant="caption" fontWeight="medium">
                            {elevator?.inspctInstt}
                          </MyMDTypography>
                        </td>
                        </tr>
                      </tbody>
                      </table>      

              </MyMDBox>
              <MyMDBox m={1} pb={4} justifyContent="center" display="flex">
                          <MyMDBox pr={1}>
                          <MyMDButton m={1}   variant="gradient"
                            color="info">수정</MyMDButton>
                          </MyMDBox>
                          <MyMDBox pr={1}>
                          <MyMDButton m={1}   variant="gradient"
                            color="primary">삭제</MyMDButton>
                          </MyMDBox>
                          </MyMDBox>

            </MyMDBox>       
          </>
      </DashboardLayout>
    );
  }
}


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default ElevatorDetailLayout;
