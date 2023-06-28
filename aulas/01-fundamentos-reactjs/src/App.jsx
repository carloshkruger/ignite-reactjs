import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"

import styles from "./App.module.css"

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <div>
            test
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
