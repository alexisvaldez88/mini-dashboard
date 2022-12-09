import React from "react";
import styled from "styled-components";
import { Dashboard } from "../modules/dashboard";

const Layout = styled.div`
  background-color: #d9d9db;
`;

const DashboardPage = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
