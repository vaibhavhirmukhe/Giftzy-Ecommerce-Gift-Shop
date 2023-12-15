import React, { useEffect } from 'react'
import "./Home.css"
import homeImage from '../../img/app_3.png';
import rose_img from '../../img/rose_img.png';
import flower_img from '../../img/flower_img.png';
import ProductCard from './ProductCard';
import { clearErrors, getProduct } from '../../actions/productAction';
import {useSelector, useDispatch} from "react-redux";
import Loader from '../Loader/Loader';
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom';


const Home = () => {

    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state)=> state.products
    );

    useEffect(()=>{

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    },[dispatch, error])

  return (
    <>
        {loading ? <Loader/>  : 
        <>
            <div className='home_container'>
                <section className='first_section'>
                    <h1>Gifts and Flowers for Your Beloved</h1>
                    <p>Welcome to Giftzy, where every gift tells a story! Discover a world of thoughtful surprises and delightful treasures that make every occasion extra special</p>
                    <Link to='/products'> <button className='home_btn'> Start Shopping </button> </Link>
                    <div id="box_container">
                        <div className="box">
                            <span>
                                <img src={rose_img} alt="rose_img" />
                                <div>
                                    <h4>Premium Roses</h4>
                                    <p>₹400</p>
                                    <Link to='/products'>Details--{'>'}</Link>
                                </div>
                            </span>
                        </div>
                        <div className="box">
                            <span>
                                <img src={flower_img} alt="flower_img" />
                                <div>
                                    <h4>Premium Bouquet</h4>
                                    <p>₹300</p>
                                    <Link to='/products'>Details--{'>'}</Link>
                                </div>
                            </span>
                        </div>
                    </div>
                </section>

                <section className='second_section'>
                    <img className="home_img" src={homeImage} alt="Home Banner" srcset="" />
                </section>

            </div>

            <div className='third_section'>
                <div>
                    <h2>100+</h2>  
                    <span>Gifts</span>             
                </div>
                <div>
                    <h2>20+</h2>  
                    <span>Gift Categories</span>             
                </div>
                <div>
                    <h2>Seasonal</h2>  
                    <span>Gift Categories</span>             
                </div>
                <div>
                    <h2>Occasional</h2>  
                    <span>Gift Categories</span>             
                </div>
            </div>

            <div className='product-heading'>
                <p>Products</p>
                <h1>Our Best Selling Products</h1>
            </div>
            <div className='fourth_section'>
                {products && products.map(product=> (<ProductCard product={product} id={product._id} key={product._id}/>))}

            </div>
        </>}
    </>
  )
}

export default Home