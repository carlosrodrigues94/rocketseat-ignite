import React from "react";
import styles from "./styles.module.scss";
import { signIn, useSession, signOut } from "next-auth/client";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
const SignInButton: React.FC = () => {
  const iconColor = { isLogged: "#04d361", isNotLogged: "#eba417" };
  const [session] = useSession();

  return (
    <>
      {session ? (
        <button
          type="button"
          onClick={() => {
            signOut();
          }}
          className={styles.signInButton}
        >
          <FaGithub color={iconColor.isLogged} />
          {session.user.name}
          <FiX color="#737380" className={styles.closeIcon} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            signIn("github");
          }}
          className={styles.signInButton}
        >
          <FaGithub color={iconColor.isNotLogged} />
          Sign in with Github
        </button>
      )}
    </>
  );
};

export { SignInButton };
