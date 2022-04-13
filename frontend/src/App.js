import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ListProduct from './pages/Products.jsx';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/Detail.jsx';
import NotFound404 from './pages/404';
import Contact from './pages/contact';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Cart from './pages/cart.jsx';

function App() {
  
  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/"} exact component={Home}/>
          <Route path={"/lien-he"} exact component={Contact}/>
          <Route path={"/dang-nhap"} exact component={Login}/>
          <Route path={"/dang-ky"} exact component={Register}/>
          <Route path={"/gio-hang"} exact component={Cart}/>
          <Route path={"/san-pham/"} exact component={ListProduct}/>
          <Route path={"/san-pham/chi-tiet/:id"} exact component={ProductDetail}/>
          <Route component={NotFound404}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
