import styles from "../styles/home.module.scss";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio Ig-News</title>
      </Head>
      <div className={styles.title}>Hello World</div>
    </>
  );
}
