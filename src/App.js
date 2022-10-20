
// import logo from '../media/logo.svg';

// import Loading from './components/LoadingComponent.js';
import Header from './layouts/Header';
import Navigation from './layouts/Navigation';
import Footer from './layouts/Footer';
import './styles/App.css';

function App() { return (
    <div className="App">
        {/* Display the Header section of the page */}
        <Header></Header>

        {/* Display the Current navigation page */}
        <Navigation></Navigation>

        {/* Display the Footer section of the page */}
        <Footer></Footer>
    </div>
);}

export default App;
