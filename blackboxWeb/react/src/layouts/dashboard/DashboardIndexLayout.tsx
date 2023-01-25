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

import Grid from "@mui/material/Grid";
import MyMDBox from "../../components/MyMDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import CheckingElevatorList from "../../layouts/dashboard/index/CheckingElevatorList";
import { useUser } from "../../contexts/user";
import { Navigate } from "react-router-dom";
import CheckingCountCard from "./index/CheckingCountCard";
import CheckCompleteCountCard from "./index/CheckCompleteCountCard";
import CheckFailCountCard from "./index/CheckFailCountCard";
import CheckCompleteDayChart from "./index/CheckCompleteDayChart";
import CheckCompleteMonthChart from "./index/CheckCompleteMonthChart";
import CheckFailDayChart from "./index/CheckFailDayChart";

function DashboardIndexLayout() {
  const { user } = useUser();

  if (!user) {
    return <Navigate replace to={`/signin`} />;
  } else {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MyMDBox py={3}>
          <Grid container spacing={3}>
            <CheckingCountCard />
            <CheckCompleteCountCard />
            <CheckFailCountCard />
          </Grid>
          {/* <MyMDBox mt={4.5}>
            <Grid container spacing={3}>
              <CheckCompleteDayChart />
              <CheckCompleteMonthChart />
              <CheckFailDayChart />
            </Grid>
          </MyMDBox> */}
          <MyMDBox mt={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={12}>
                <CheckingElevatorList />
              </Grid>
            </Grid>
          </MyMDBox>
        </MyMDBox>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default DashboardIndexLayout;
