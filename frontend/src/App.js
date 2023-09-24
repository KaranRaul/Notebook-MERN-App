
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Routes
} from "react-router-dom";
import NavBar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import NoteState from './context/notes/NotesState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';



function App() {

  return (
    <>

      <NoteState>
        <Router>
          <NavBar />
          <h2 className='mt-5 ms-4'>
            NOTEBOOK
            <small className="text-muted  m-3">Save your notes with Encryption</small>
          </h2>

        </Router>
        <div className="container">
          <Router>
            <Routes>
              <Route exact path="/" Component={() => <Alert messege={"Please Login OR SignUp to Open the Notes"} />}></Route>
              <Route exact path="/home" Component={() => <Home />}></Route>
              <Route exact path='/about' Component={() => <About />}></Route>
              <Route path="/login" Component={() => <Login />}></Route>
              <Route exact path="/signup" Component={() => <SignUp />}></Route>
            </Routes>
          </Router >
        </div>
      </NoteState >
    </>

  );
}

export default App;
