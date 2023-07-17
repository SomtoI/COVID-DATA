
import GraphParent from './components/GraphParent'
import { TableDataProvider } from './utils/TableDataContext'
import './App.css'

function App() {

  return (
    <>
      <TableDataProvider>
        <GraphParent />
      </TableDataProvider>
    </>
  )
}

export default App
