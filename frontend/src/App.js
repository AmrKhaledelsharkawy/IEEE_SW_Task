import {BrowserRouter,Routes,Route} from 'react-router-dom'
import GPACalculator from '../src/page/GPAfront'
import Navbar from '../src/components/navbar'

function App() {
  return (
    <div className="App">
      <div className="container">
             <BrowserRouter>
             <Navbar/>
             <div className="Navbar">
                <Routes>
                <Route path="GPAfront" element={<GPACalculator />} />
                </Routes>
             </div>
             
             </BrowserRouter> 

            </div>

      

    </div>
  );
}

export default App;
