import { Outlet } from 'react-router-dom';



function App() {

  return (
    <div>
      <Navbar />
      <main className="container container-fluid mt-5">
        <Outlet />
      </main>
    </div>
  )
}

export default App