import Head from 'next/head'
import CardList from '../components/cardview/CardList'
import styles from '../styles/Home.module.css'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          COMPONENTS
        </h1>
        <CardList />
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
