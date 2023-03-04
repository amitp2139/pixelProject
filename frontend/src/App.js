import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import BidPrice from './components/BidPrice';
import BurgerMenu from './components/BurgerMenu';
import UserList from './components/UseList';


function App() {
  return (
    <Router>
      <BurgerMenu />
      <Routes>
        <Route exact path="/bidprice" element={<BidPrice />} />
        <Route exact path="/userlist" element={<UserList />} />
      </Routes>
    </Router>
  );
}


export default App;
