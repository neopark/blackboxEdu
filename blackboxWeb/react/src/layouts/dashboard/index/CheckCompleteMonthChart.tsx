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
import ReportsLineChart from "../../../examples/Charts/LineCharts/ReportsLineChart";

function CheckCompleteMonthChart() {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <MyMDBox mb={1.5}>
        <ReportsLineChart
          color="info"
          title="월별 점검 현황"
          description="Last Campaign Performance"
          date="campaign sent 2 days ago"
          chart={{
            labels: (() => {
              const monthList = [];
              for (let idx = 1; idx <= 12; idx++) {
                monthList.push(`${idx}월`);
              }
              return monthList;
            })(),
            datasets: {
              data: (() => {
                const maxCount = 500;
                const today = new Date();
                const lastMonth = today.getMonth() + 1;
                const valueList = [];
                for (let idx = 1; idx < lastMonth; idx++) {
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

export default CheckCompleteMonthChart;
