import "./global.css";
import "./assets/vendor/fonts/boxicons.css";
import "./assets/vendor/css/core.css";
import "./assets/vendor/css/theme-default.css";
import "./assets/css/demo.css";
import "./assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "./assets/vendor/libs/apex-charts/apex-charts.css";
import "./assets/vendor/css/pages/page-account-settings.css";
import "./assets/vendor/css/pages/page-auth.css";
import "./assets/vendor/css/pages/page-icons.css";
import "./assets/vendor/css/pages/page-misc.css";
import "./assets/vendor/js/helpers.js";
import "./assets/vendor/libs/jquery/jquery.js";
import "./assets/vendor/libs/popper/popper.js";
import "./assets/vendor/js/bootstrap.js";
import "./assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "./assets/vendor/js/menu.js";
import "./assets/vendor/libs/apex-charts/apexcharts.js";
import "./assets/js/main.js";
import "./assets/js/dashboards-analytics.js";
import "./utils/i18n";
import HMR from "@roxi/routify/hmr";
import App from "./App.svelte";

const app = HMR(App, { target: document.body }, "routify-app");

export default app;
