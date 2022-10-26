import logo from './assets/icons8-connect-develop-48.svg'
import friends from './assets/animation_500_l859okyg.gif';
import CardView from './components/LoginCardView';
import './MainApp.css';
import { GoogleOAuthProvider } from '@moeindana/google-oauth';

function App() {
  return (
    <div className="MainApp">
      <header className="App-header">
        <div className='App-head'>
          <img src={logo} alt='No image'></img>
          <h2 className="headone">Authentication App</h2> 
           </div>
        <img src={friends} alt="loading..." />
      </header>
      <div className='card'>
      <GoogleOAuthProvider clientId="1049605190831-2d04u5iv0den3fs5hv2pamm276cvqvqd.apps.googleusercontent.com">
        <CardView></CardView>
      </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default App;
