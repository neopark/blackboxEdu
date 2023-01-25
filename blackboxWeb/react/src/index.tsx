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

import { initApis } from "./apis";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { MaterialUIControllerProvider } from "./context";
import Contexts from "./contexts";
import { ToastContainer } from "react-toastify";
import "./csss/MyMDSelect.css";
import "./csss/myTable.css";
import "./csss/toast.css";
import "react-toastify/dist/ReactToastify.css";

function Run() {
  initApis();
  ReactDOM.render(
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <Contexts>
          <App />
        </Contexts>
      </MaterialUIControllerProvider>
      <ToastContainer hideProgressBar={true} position="bottom-right" autoClose={3000} />
    </BrowserRouter>,
    document.getElementById("root")
  );
}

Run();
