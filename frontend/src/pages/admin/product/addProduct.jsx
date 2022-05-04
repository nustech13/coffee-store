import React, { useEffect, useState } from 'react'; 
import { withRouter } from "react-router";
import axios from 'axios';
import './addProduct.css';
const AddProduct = ({setIsAddActive, getProducts, setLoading, setPage}) =>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [sale, setSale] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const getCategories = async () =>{
      const res = await axios.get('http://localhost:5000/v1/api/category/');
      if(res.data){
        setCategories(res.data);           
      }
    }
    useEffect(() =>{
      let mounted = true;
      if(mounted) {getCategories();}
      return () => mounted = false;
    }, []);
    const create = async (e)=>{
      e.preventDefault();
      const product = {
        name: name,
        price: price,
        sale: sale,
        description: description,
        image: image,
        categories: category
      }
      if(name.length < 1){
        alert( "Name không được để trống");
      }
      else if(price.length < 1){
        alert( "Price không được để trống");
      }
      else if(sale.length < 1){
        alert( "Sale không được để trống");
      }
      else if(sale < 0 || sale > 100 ){
        alert( "Sale phải trong khoảng 0-100");
      }
      else if(category.length < 1){
        alert( "Category không được để trống");
      }
      else{
        await axios.post('http://localhost:5000/v1/api/product/add/', product)
        .then(response => {
          alert( "Thêm Sản Phẩm Thành Công!!!" );
          setIsAddActive(false);
          setLoading(false);
          setPage(1);
          getProducts(1);
        })
        .catch(error => {
          console.log(error)
          alert("Thêm sản phẩm thất bại!!!");
        })
      }
      
    }
    const uploadImage = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setImage(String(base64));
    };
  
    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
  
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };
    return(
      <div className="image-container">
        <div className="after">
          <div className="boxed">
            <div className='boxed-close'><i onClick={()=> setIsAddActive(false)} className="fa fa-times" aria-hidden="true"></i></div>
            <form className="form-product" encType="multipart/form-data">
              <h2>ADD PRODUCT</h2>
              <div className="form-input">
                <label>Product Name:</label>
                <input type="text" value={name || ""} onChange={(e)=> setName(e.target.value)}/>
              </div>
              <div className="form-input">
                <label>Price:</label>
                <input type="text" value={price || ""} onChange={(e)=> setPrice(e.target.value.replace(/\D/,''))}/>
              </div>
              <div className="form-input">
                <label>Sale:</label>
                <input type="text" value={sale || ""} onChange={(e)=> setSale(e.target.value.replace(/\D/,''))}/>
              </div>
              <div className="form-input">
                <label>Image:</label>
                <input
                  type="file"
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                />
                <img src={image} alt="" height={'100px'} width={'200px'}/>
              </div>
              <div className="form-input">
                <label>Category</label>
                <select onChange={(e)=> setCategory(e.target.value)}>
                  <option value="">[Select Category]</option>
                  {categories && categories.map((item) =>(
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-input">
                <label>Description</label>
                <input type="text" value={description || ""} onChange={(e)=> setDescription(e.target.value)}/>
              </div>
              <div className="form-btn-add">
                <button onClick={(e)=> create(e)}>Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )

}

export default withRouter(AddProduct);