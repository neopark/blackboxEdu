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

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import routes from "routes";
import useNav from "uses/useNav";
import { useCallback } from "react";

function Breadcrumbs({ icon, title, route, light }) {
  const nav = useNav();

  const getRouteList = useCallback(
    (routeList, cnt) => {
      let selRoute = null;
      let newRouteList = [];
      for (let idx = 0; idx < routeList.length; idx++) {
        selRoute = routeList[idx];
        if (selRoute.route) {
          const isCur = nav.pathname.split(selRoute.route)[0] === "";
          if (isCur) {
            break;
          }
        }
      }
      const length = nav.pathname.split("/").length - 1;
      if (selRoute.routes && cnt < length) {
        newRouteList = newRouteList.concat(getRouteList(selRoute.routes, cnt + 2));
      }
      newRouteList.unshift(selRoute);
      return newRouteList;
    },
    [nav.pathname]
  );

  const routeList = getRouteList(routes, 1);

  return (
    <MDBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link to="/">
          <MDTypography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
           {/* 홈 <Icon>{icon}</Icon> */}
           홈
          </MDTypography>
        </Link>
        {(() => {
          const newRouteList = [...routeList];
          newRouteList.pop();

          return newRouteList.map((newRoute) => {
            return (
              <Link to={newRoute.route} key={newRoute.name}>
                <MDTypography
                  component="span"
                  variant="button"
                  fontWeight="regular"
                  textTransform="capitalize"
                  color={light ? "white" : "dark"}
                  opacity={light ? 0.8 : 0.5}
                  sx={{ lineHeight: 0 }}
                >
                  {newRoute.name}
                </MDTypography>
              </Link>
            );
          });
        })()}
        {/* {routes.map((el) => (
          <Link to={`/${el}`} key={el}>
            <MDTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el}
            </MDTypography>
          </Link>
        ))} */}
        <MDTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {routeList[routeList.length - 1].name}
        </MDTypography>
      </MuiBreadcrumbs>
      <MDTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {routeList[routeList.length - 1].name}
      </MDTypography>
    </MDBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
