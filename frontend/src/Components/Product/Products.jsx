import React, { useEffect, useState } from "react";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import { useParams } from "react-router-dom";
import {
  Pagination,
  Slider,
  Typography,
} from "@mui/material";
import {toast} from "react-hot-toast";

const categories =[
    "",
    "Cakes",
    "Flowers",
    "Chocolates",
    "Books",
    "Gift Hampers",
    "Premium Gifts",
    "Home & Living Gifts",
];

const occasionCategories =[
    "Birthday",
    "Wedding",
    "Christmas",
    "New Year",
    "Diwali",
    "Bhai Dooj",
    "Children's Day",
];

const priceCategories =[500, 1000, 1500, 2000, 3000, 5000, 10000];



const Products = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState(20000);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  
  const dispatch = useDispatch();
  const { loading, error, products, productsCount, resultPerPage , filteredProductsCount} =
    useSelector((state) => state.products);

  const { keyword } = useParams();

  const pageCount = Math.ceil(productsCount / resultPerPage);

  const setCurrentPageNo = (e, value) => {
    setCurrentPage(value);
  };

  // const priceHandler = (event, newPrice)=>{
  //   setPrice(newPrice);
  // }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, category, price, ratings));
  }, [dispatch, error, keyword, currentPage, category, price, ratings]);

  let count = filteredProductsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="productsHeading">Our Products</h2>

          <div className="products-container">
            <div className="filtersContainer">
              <h2>Filters</h2>
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((item) => (
                  <li 
                    className={`category-link ${category === item ? 'active' : ''}`}
                    key={item}
                    onClick={()=> setCategory(item)}
                  >
                     {item===""? "All Gifts":item}
                  </li>
                ))}
              </ul>


              <Typography  style={{paddingTop:"10px"}}>Occasion</Typography>
              <ul className="categoryBox">
              {occasionCategories.map((category) => (
                  <li 
                    className="category-link"
                    key={category}
                    onClick={()=> setCategory(category)}
                  >
                     {category}
                     </li>
                     ))}
                    </ul>
             
             <Typography style={{paddingTop:"10px"}}>Price</Typography>
             <ul className="categoryBox">
               {priceCategories.map((item) => (
                 <li 
                   className={`category-link ${price === item ? 'active' : ''}`}
                   key={item}
                   onClick={()=> setPrice(item)}
                 >
                  Below ₹{item}
                 </li>
               ))}
             </ul>

              {/* <Typography style={{padding:"10px 0px"}}>Price</Typography> 
              <div style={{padding:"0px 20px 10px 10px"}}>
                <Slider 
                    style={{color:"black"}}
                    size="small"
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={10000}
                />
              </div> */}

              <Typography style={{padding:"10px 0px"}}>Rating</Typography> 
              <div style={{padding:"5px 20px 10px 10px"}}>
                <Slider 
                    style={{color:"black"}}
                    size="small"
                    value={ratings}
                    onChange={(e, newRating)=> setRatings(newRating)}
                    valueLabelDisplay="auto"
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={5}
                />
              </div>

              {/* <Typography>Occasions</Typography>
              <ul className="categoryBox">
                {occasions.map((occasion) => (
                  <li
                    className="category-link"
                    key={occasion}
                    onClick={() => setOccasion(occasion)}
                  >
                    {occasion}
                  </li>
                ))}
              </ul> */}
            </div>

            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} id={product._id} />
                ))}
            </div>
          </div>

          {/* // pagination */}

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={setCurrentPageNo}
                variant="outlined"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
