import Head from 'next/head'
import { Rubik } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Game } from '@/components/Game'
import { GameProvider } from '@/context/GameContext'
const rubik = Rubik({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>NextJS Memory</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${rubik.className}`}>
        <Game />
      </main>
    </>
  )
}
