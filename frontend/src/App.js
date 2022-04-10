import './App.css';
import Header from './containers/Header/header';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ListProduct from './pages/Products.jsx';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/Detail.jsx';
import NotFound404 from './pages/404';
import Contact from './pages/contact';
function App() {
  
  return (
    <div>
      <Router>
        <Header/>
        <Switch>
          <Route path={"/"} exact component={Home}/>
          <Route path={"/lien-he"} exact component={Contact}/>v
          <Route path={"/san-pham/:id"} exact component={ListProduct}/>
          <Route path={"/san-pham/chi-tiet/:id"} exact component={ProductDetail}/>
          <Route component={NotFound404}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
