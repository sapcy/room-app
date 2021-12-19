import Head from "next/head";
import { useState } from "react";
import CardList from "../components/cardview/CardList";
import styles from "../styles/Home.module.css";
export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);
  
  const apiCompleteHandling = (value) => {
    setSearch(value);
    console.log('apiCompleteHandling', value);
  }

  const inputChangeHandling = (e) => {
    setKeyword(e.target.value);
    setSearch(true);
    console.log(e.target.value);
  };

  function enterKeyUp(e) {
    if (window.event.keyCode == 13) {
      inputChangeHandling(e);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>COMPONENTS</h1>
        <input
          className="search"
          onKeyUp={enterKeyUp}/>
        <CardList 
          keyword={keyword} 
          search={search}
          apiCompleteHandling={apiCompleteHandling}
          />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
