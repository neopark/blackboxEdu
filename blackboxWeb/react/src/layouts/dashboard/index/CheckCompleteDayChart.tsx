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
import MyMDBox from "../../../components/MyMDBox";
import ReportsBarChart from "../../../examples/Charts/BarCharts/ReportsBarChart";

function CheckCompleteDayChart() {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <MyMDBox mb={1.5}>
        <ReportsBarChart
          color="info"
          title="일별 점검 현황"
          description="Last Campaign Performance"
          date="campaign sent 2 days ago"
          chart={{
            labels: (() => {
              const today = new Date();
              const lastMonthDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
              const dayList = [];
              for (let idx = 1; idx <= lastMonthDay; idx++) {
                dayList.push(idx);
              }
              return dayList;
            })(),
            datasets: {
              data: (() => {
                const maxCount = 100;
                const today = new Date();
                const lastDay = today.getDate();
                const valueList = [];
                for (let idx = 1; idx < lastDay; idx++) {
                  valueList.push(Math.floor(Math.random() * maxCount));
                }
                return valueList;
              })(),
            },
          }}
        />
      </MyMDBox>
    </Grid>
  );
}

export default CheckCompleteDayChart;
