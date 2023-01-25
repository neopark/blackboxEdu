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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// @mui icons
import Icon from "@mui/material/Icon";
import DashboardIndexLayout from "./layouts/dashboard/DashboardIndexLayout";
import SigninIndexLayout from "./layouts/signin/SigninIndexLayout";
import UserIndexLayout from "./layouts/user/UserIndexLayout";
import UserDetailLayout from "./layouts/user/UserDetailLayout";
import ElevatorIndexLayout from "./layouts/elevator/ElevatorIndexLayout";
import ElevatorDetailLayout from "./layouts/elevator/ElevatorDetailLayout";
import GroupIndexLayout from "./layouts/group/GroupIndexLayout";
import GroupDetailLayout from "./layouts/group/GroupDetailLayout";
import CheckIndexLayout from "./layouts/check/CheckIndexLayout";
import PartChangeIndexLayout from "./layouts/partChange/PartChangeIndexLayout";
import TroubleshootingIndexLayout from "./layouts/troubleshooting/TroubleshootingIndexLayout";

export type T_route = {
  key: string;
  type?: string;
  title?: string;
  name?: string;
  route?: string;
  icon?: JSX.Element;
  component?: JSX.Element;
  routes?: T_route[];
};

const routes: T_route[] = [
  {
    key: "dashboard",
    type: "collapse",
    name: "대시보드",
    route: "/dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    component: <DashboardIndexLayout />,
  },
  {
    key: "signin",
    route: "/signin",
    component: <SigninIndexLayout />,
  },
  {
    key: "회원",
    type: "title",
    title: "회원",
  },
  {
    key: "user",
    type: "collapse",
    name: "회원 관리",
    route: "/user",
    icon: <Icon fontSize="small">dashboard</Icon>,
    component: <UserIndexLayout />,
    routes: [
      {
        name: "회원 정보",
        key: "user",
        route: "/user/info",
        icon: <Icon fontSize="small">dashboard</Icon>,
        component: <UserDetailLayout />,
      },
    ],
  },
  {
    key: "엘리베이터",
    type: "title",
    title: "엘리베이터",
  },
  {
    key: "elevator",
    type: "collapse",
    name: "엘리베이터 관리",
    route: "/elevator",
    icon: <Icon fontSize="small">dashboard</Icon>,
    component: <ElevatorIndexLayout />,
    routes: [
      {
        name: "엘리베이터 정보",
        key: "elevator/:id",
        route: "/elevator/:id",
        icon: <Icon fontSize="small">dashboard</Icon>,
        component: <ElevatorDetailLayout />,
      },
    ],
  },
  // {
  //   key: "group",
  //   type: "collapse",
  //   name: "그룹 관리",
  //   route: "/group",
  //   icon: <Icon fontSize="small">dashboard</Icon>,
  //   component: <GroupIndexLayout />,
  //   routes: [
  //     {
  //       name: "그룹 정보",
  //       key: "group/:id",
  //       route: "/group/:id",
  //       icon: <Icon fontSize="small">dashboard</Icon>,
  //       component: <GroupDetailLayout />,
  //     },
  //   ],
  // },
  {
    key: "점검",
    type: "title",
    title: "점검",
  },
  {
    key: "check",
    type: "collapse",
    name: "점검 현황",
    route: "/check",
    icon: <Icon fontSize="small">dashboard</Icon>,
    component: <CheckIndexLayout />,
  },
  {
    key: "partChange",
    type: "collapse",
    name: "부품 교환",
    route: "/partChange",
    icon: <Icon fontSize="small">dashboard</Icon>,
    component: <PartChangeIndexLayout />,
  },
  {
    type: "collapse",
    name: "고장 처리",
    key: "troubleshooting",
    route: "/troubleshooting",
    icon: <Icon fontSize="small">dashboard</Icon>,
    component: <TroubleshootingIndexLayout />,
  },
];

export default routes;
