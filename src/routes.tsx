import Home from "pages/home";
import CountryDetail from "pages/country-detail";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail/:name",
    element: <CountryDetail />,
  },
  {
    path: "*",
    element: <h2>404 Page not found</h2>,
  },
];

export default routes;
