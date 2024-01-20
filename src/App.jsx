import { useState } from 'react'

import FileViewer from './components/FileViewer'
import DocViewer from './components/DocViewer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
      <header className="App-header">
      </header>
      <main>
        <DocViewer />
      </main>
    </div>
    </>
  )
}

export default App
