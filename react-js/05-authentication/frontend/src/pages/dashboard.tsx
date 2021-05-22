import React, { useContext } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

// import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div>
      Dashboard
      <p>{user.email}</p>
      <Can permissions={["metrics.list"]}>
        <div>Dados de acesso privado</div>
      </Can>
      <button type="button" onClick={() => signOut()}>
        Sair
      </button>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/me");

  console.log("Response do ServerSide => ", response.data);

  return { props: {} };
});
