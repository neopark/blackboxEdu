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
import apis from "../../../apis";
import { useCallback, useEffect, useState } from "react";
import MyMDBox from "../../../components/MyMDBox";
import ComplexStatisticsCard from "../../../examples/Cards/StatisticsCards/ComplexStatisticsCard";

function CheckCompleteCountCard() {
  const [checkCompleteCount, setCheckCompleteCount] = useState(0);

  const getCheckCompleteCount = useCallback(async () => {
    try {
      const result = await apis.check.getCompleteCount();
      if (result.isSuccess) {
        setCheckCompleteCount(result.checkCompleteCount);
      } else {
        setCheckCompleteCount(0);
      }
    } catch (err: any) {
      setCheckCompleteCount(0);
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    const ms = 10000;
    getCheckCompleteCount();
    const interval = setInterval(getCheckCompleteCount, ms);
    return () => {
      clearInterval(interval);
    };
  }, [getCheckCompleteCount]);

  return (
    <Grid item xs={12} md={6} lg={4}>
      <MyMDBox mb={1.5}>
        <ComplexStatisticsCard
          countColor="info"
          color="info"
          icon="leaderboard"
          title="점검 완료"
          count={`${checkCompleteCount}대`}
        />
      </MyMDBox>
    </Grid>
  );
}

export default CheckCompleteCountCard;
