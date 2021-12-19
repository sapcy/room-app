import Head from "next/head";
import { Fragment, useState } from "react";
import CardList from "../components/cardview/CardList";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [checkinDate, setCheckinDate] = useState("20211220");
  const [checkoutDate, setCheckoutDate] = useState("20211225");
  const [adult, setAdult] = useState("");
  const [child, setChild] = useState("");
  const [baby, setBaby] = useState("");
  const [search, setSearch] = useState(false);
  
  function apiCompleteHandling(value) {
    setSearch(value);
  }

  function handleSearchInputChange(e) {
    setKeyword(e.target.value);
  }

  function enterKeyUpHandling(e) {
    if (window.event.keyCode == 13) {
      if (e.target.value === '') {
        alert("검색어를 입력하여 주십시오.")
      }
      setKeyword(e.target.value);
      setSearch(true);
    }
  }

  function handleSearchBtnClick() {
    if (keyword === '') {
      alert("검색어를 입력하여 주십시오.")
    } else setSearch(true);
  }

  const handleCheckInDate = (e) => { setCheckinDate(e.target.value); }
  const handleCheckOutDate = (e) => { setCheckoutDate(e.target.value); }
  const handleAdultSelect = (e) => { setAdult(e.target.value); }
  const handleChildSelect = (e) => { setChild(e.target.value); }
  const handleBabySelect = (e) => { setBaby(e.target.value); }
  

  return (
    <div className={styles.container}>
      <Head>
        <title>App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>COMPONENTS</h1>
        <Fragment>
          <div className="row">
            키워드 검색 
            <input
              className="search"
              onKeyUp={enterKeyUpHandling}
              onChange={handleSearchInputChange}
              />
          </div>
          <br/>
          <div className="row">
            체크인 날짜
            <input
              onChange={handleCheckInDate}
              value={checkinDate}
              />
          </div>
          <div className="row">
            체크아웃 날짜
            <input
              onChange={handleCheckOutDate}
              value={checkoutDate}
              />
          </div>
          <div>
            <select name="adultNum" id="adult-select" onChange={handleAdultSelect} value={adult}>
              <option value="">성인</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <select name="childNum" id="child-select" onChange={handleChildSelect} value={child}>
              <option value="">아동</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <select name="babyNum" id="baby-select" onChange={handleBabySelect} value={baby}>
              <option value="">유아</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <br />
          <button onClick={handleSearchBtnClick}>검색</button>
        </Fragment>
        
        <CardList 
          keyword={keyword} 
          search={search}
          apiCompleteHandling={apiCompleteHandling}
          checkinDate={checkinDate}
          checkoutDate={checkoutDate}
          adult={adult}
          child={child}
          baby={baby}
          />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
