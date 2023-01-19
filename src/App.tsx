import routes from "routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";
import React from "react";
import { Col, Row } from "antd";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <div className="App">
      <header>
        <h1>Where in the world ? </h1>
      </header>
      <Row className="content-wrapper">
        <Col span={24}>
          <RouterProvider router={router} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
