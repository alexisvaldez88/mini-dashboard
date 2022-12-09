import React from "react";
import styled from "styled-components";
import { Home } from "../modules/home";

const Layout = styled.div`
  background-color: #d9d9db;
`;

const HomePage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default HomePage;
