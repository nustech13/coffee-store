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
import Categories from './pages/admin/category/categories';
import Products from './pages/admin/product/products';
import Orders from './pages/admin/order/orders';
import OrderDetails from './pages/admin/orderDetail/listOrderDetail';
import Feedbacks from './pages/admin/feedback/feedbacks';
import ScrollToTop from "react-scroll-to-top";
import Customers from './pages/admin/customer/customers';
import LoginAdmin from './pages/admin/login/login';
function App() {
  
  return (
    <div>
      <Router>
        <ScrollToTop smooth style={{backgroundColor: '#0082e6'}} color="#fff"/>
        <Switch>
          <Route path={"/"} exact component={Home}/>
          <Route path={"/lien-he"} exact component={Contact}/>
          <Route path={"/dang-nhap"} exact component={Login}/>
          <Route path={"/dang-ky"} exact component={Register}/>
          <Route path={"/gio-hang"} exact component={Cart}/>
          <Route path={"/san-pham/"} exact component={ListProduct}/>
          <Route path={"/san-pham/chi-tiet/:id"} exact component={ProductDetail}/>
          <Route path={"/admin/login"} exact component={LoginAdmin}/>
          <Route path={"/admin/category"} exact component={Categories}/>
          <Route path={"/admin/product"} exact component={Products}/>
          <Route path={"/admin/order"} exact component={Orders}/>
          <Route path={"/admin/customer"} exact component={Customers}/>
          <Route path={"/admin/orderDetail/:id"} exact component={OrderDetails}/>
          <Route path={"/admin/feedback/:id"} exact component={Feedbacks}/>
          <Route component={NotFound404}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
