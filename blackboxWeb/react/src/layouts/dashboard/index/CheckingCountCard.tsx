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

import apis from "../../../apis";
import { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MyMDBox from "../../../components/MyMDBox";
import ComplexStatisticsCard from "../../../examples/Cards/StatisticsCards/ComplexStatisticsCard";

function CheckingCountCard() {
  const [checkingCount, setCheckingCount] = useState(0);

  const getCheckingCount = useCallback(async () => {
    try {
      const result = await apis.check.getCheckingCount();
      if (result.isSuccess) {
        setCheckingCount(result.checkingCount);
      } else {
        setCheckingCount(0);
      }
    } catch (err: any) {
      setCheckingCount(0);
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    const ms = 10000;
    getCheckingCount();
    const interval = setInterval(getCheckingCount, ms);
    return () => {
      clearInterval(interval);
    };
  }, [getCheckingCount]);

  return (
    <Grid item xs={12} md={6} lg={4}>
      <MyMDBox mb={3}>
        <ComplexStatisticsCard
          countColor="primary"
          color="primary"
          icon="weekend"
          title="점검중"
          count={`${checkingCount}대`}
        />
      </MyMDBox>
    </Grid>
  );
}

export default CheckingCountCard;
