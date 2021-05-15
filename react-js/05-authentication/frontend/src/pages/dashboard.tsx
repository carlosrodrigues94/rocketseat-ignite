import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      Dashboard
      <p>{user.email}</p>
    </div>
  );
};

export default Dashboard;
