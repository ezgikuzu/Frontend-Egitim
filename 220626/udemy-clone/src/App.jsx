import BottomNav from "./components/BottomNav"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Home from "./pages/Home"

function App() {


  return (

    <div className="flex flex-col">
      <Header />
      <div className="app-container">
        <Sidebar />
        <main className="app-main">
          <div className="space-y-xl">
            <div className="preview-card">
              <div className="preview-header">Anasayfa</div>
              <Home />
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>


  )
}

export default App
