import './App.css'
import Tour from './components/Tour.jsx'
function App() {

return (
  <>
  <div className='container'>
    <div>
      <ul className='list'>
        <img src='./logo.png' alt='logo'/>
          <li>Home</li>
          <li>About</li>
          <li>Tours</li>
      </ul>
    </div>
  
  </div>
  <Tour/>

  </>
)
}

export default App
