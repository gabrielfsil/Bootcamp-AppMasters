// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Map from "@material-ui/icons/Map";
import Warning from "@material-ui/icons/Warning";



// Componente principal do dashboard
import DashboardPage from "./views/Dashboard/Dashboard";
import MapPage from "./views/Map";
import RecommendationsPage from "./views/Recommendations";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/map",
    name: "Mapa",
    icon: Map,
    component: MapPage,
    layout: "/admin",
  },
  {
    path: "/recomendations",
    name: "Recomendações",
    icon: Warning,
    component: RecommendationsPage,
    layout: "/admin",
  },
];

export default dashboardRoutes;
