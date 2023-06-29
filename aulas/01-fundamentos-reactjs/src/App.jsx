import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Post } from "./components/Post"

import styles from "./App.module.css"

const posts = [
  {
    id: 1,
    author: {
      name: 'Carlos Henrique',
      avatarUrl: 'https://avatars.githubusercontent.com/u/18452687?v=4',
      role: 'Senior Software Engineer'
    },
    content: [
      {
        type: 'paragraph', 
        content: 'Fala galeraa 👋'
      },
      {
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      {
        type: 'link',
        content: 'jane.design/doctorcare'
      }
    ],
    publishedAt: new Date('2023-06-27 21:00:00')
  },
  {
    id: 2,
    author: {
      name: 'Another User',
      avatarUrl: 'https://avatars.githubusercontent.com/u/18452687?v=4',
      role: 'Frontend Developer'
    },
    content: [
      {
        type: 'paragraph', 
        content: 'Fala galeraa'
      },
      {
        type: 'link',
        content: 'jane.design/doctorcare'
      }
    ],
    publishedAt: new Date('2023-06-26 18:00:00')
  }
]

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => <Post key={post.id} author={post.author} content={post.content} publishedAt={post.publishedAt} />)}
        </main>
      </div>
    </div>
  )
}

export default App
