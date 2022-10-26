import logo from './assets/icons8-connect-develop-48.svg'
import friends from './assets/animation_500_l859okyg.gif';
import CardView from './components/LoginCardView';
import './UserScreen.css';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import { useLocation } from 'react-router-dom';

function App() {
  const { state } = useLocation();
  const { res } = state;
  console.log("its "+JSON.stringify(state));

  return (
    <div className="MainApp">
    <header className="App-header">
        <NavBar pwd = {res['password']} pic = {res['image']} email = {res['email']} name = {res['username']} uid = {res['uid']}></NavBar>
    <div className='container-2'>
    <Profile pic = {res['image']} email = {res['email']} name = {res['username']}></Profile>
    </div>
    </header>
  </div>
  );
}

export default App;
