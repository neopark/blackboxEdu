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

function CheckFailCountCard() {
  const [checkFailCount, setCheckFailCount] = useState(0);

  const getCheckFailCount = useCallback(async () => {
    try {
      const result = await apis.check.getFailCount();
      if (result.isSuccess) {
        setCheckFailCount(result.checkFailCount);
      } else {
        setCheckFailCount(0);
      }
    } catch (err: any) {
      setCheckFailCount(0);
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    const ms = 10000;
    getCheckFailCount();
    const interval = setInterval(getCheckFailCount, ms);
    return () => {
      clearInterval(interval);
    };
  }, [getCheckFailCount]);

  return (
    <Grid item xs={12} md={6} lg={4}>
      <MyMDBox mb={1.5}>
        <ComplexStatisticsCard
          countColor="error"
          color="error"
          icon="store"
          title="부적격 점검"
          count={`${checkFailCount}대`}
        />
      </MyMDBox>
    </Grid>
  );
}

export default CheckFailCountCard;
