import React from 'react'
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../actions/cartAction';
import {toast} from 'react-hot-toast';

const ProductCard = ( {product, id} ) => {
    const dispatch = useDispatch();
    
    const options ={
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "black",
        value: product.ratings,
        isHalf: true,
    }

    const addToCartHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addItemsToCart(id));
        toast.success("Item Added To Cart");
    };

  return (
    <Link className='product_card' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <div className='product_detail'>
            <div>
                <p className='product_name'>{product.name}</p>
                <ReactStars {...options}/>
                <span>({product.numOfReviews} Reviews)</span>
                <span className='price'>{`₹${product.price}`}</span>
            </div>
            <div className='shop_icon' onClick={addToCartHandler}>
                <ShoppingCartOutlinedIcon  style={{color:"white", fontSize:"1.2vmax"}}/>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard