import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      alert("Credenciais inválidas");
    }

    await signIn({ password, email });
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            name="text"
            id=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="new-password"
          />
        </label>
        <label>
          Senha
          <input
            type="text"
            name="text"
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
