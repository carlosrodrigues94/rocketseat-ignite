import React from "react";
import styles from "./styles.module.scss";
// import { Container } from './styles';
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
const SignInButton: React.FC = () => {
  const iconColor = { isLogged: "#04d361", isNotLogged: "#eba417" };
  const isUserLoggedIn = true;
  return (
    <>
      {isUserLoggedIn ? (
        <button type="button" className={styles.signInButton}>
          <FaGithub color={iconColor.isLogged} />
          Carlos Rodrigues
          <FiX color="#737380" className={styles.closeIcon} />
        </button>
      ) : (
        <button type="button" className={styles.signInButton}>
          <FaGithub color={iconColor.isNotLogged} />
          Sign in with Github
        </button>
      )}
    </>
  );
};

export { SignInButton };
