import Footer from "./components/Footer"
import Manager from "./components/Manager"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
     <Navbar/>
     <div className="px-10">
     <Manager/>
     </div>
     <Footer/>
    </>
  )
}

export default App
