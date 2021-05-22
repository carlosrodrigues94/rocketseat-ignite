import React, { useContext } from "react";
import { Can } from "../components/Can";
import decode from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

// import { Container } from './styles';

const Metrics: React.FC = () => {
  const { user } = useContext(AuthContext);

  return <div>Metrics</div>;
};

export default Metrics;

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    return { props: {} };
  },
  { permissions: ["metrics.list"], roles: ["administrator"] }
);
