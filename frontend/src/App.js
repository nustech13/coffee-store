import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ListProduct from './pages/client/product/products.jsx';
import Home from './pages/client/home/home.jsx';
import ProductDetail from './pages/client/detail/detail.jsx';
import NotFound404 from './pages/client/notFound404/404.jsx';
import Contact from './pages/client/contact/contact.jsx';
import Login from './pages/client/login/login.jsx';
import Register from './pages/client/register/register.jsx';
import Cart from './pages/client/cart/cart.jsx';

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
