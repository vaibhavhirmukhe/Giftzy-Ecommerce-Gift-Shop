import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetails.css";
import { useParams} from "react-router-dom";
import {
  clearErrors,
  getProduct,
  getProductDetails,
} from "../../actions/productAction";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReactStars from "react-rating-stars-component";
import Loader from "../Loader/Loader";
import ProductCard from "../Home/ProductCard";
import {toast} from "react-hot-toast";
import { addItemsToCart } from "../../actions/cartAction";

export default function SimpleSlider() {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { error:productsError, products } = useSelector(
      (state)=> state.products
  );

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };


  const increaseQuantity = () => {

    if(product.Stock <= quantity) return quantity;

    setQuantity((prevQty)=>prevQty + 1);
  };

  const decreaseQuantity = () => {
    if(quantity <= 1) return 1;

    setQuantity((prevQty)=>prevQty - 1);
  };


  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors());
  }

  if(error){
      toast.error(productsError);
      dispatch(clearErrors());
  }
    
    dispatch(getProduct());
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, productsError]);

  const options = {
    size: window.innerWidth > 600 ? 20 : 25,
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "black",
    value: product.ratings,
    isHalf: true,
  };

  return (
    <>
    
      {loading ? (
        <Loader/>
      ) : (
        <>
          <div className="product-detail">
            <div className="product-detail-container">
              <div>
                <div className="image-container">
                  <img
                    src={product.images && product.images[index].url}
                    alt="productDetails"
                    className="product-detail-image"
                  />
                </div>

                <div className="small-images-container">
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        key={item._id}
                        src={item.url}
                        alt={`${i} Slide`}
                        className={
                          i === index
                            ? "small-image selected-image"
                            : "small-image"
                        }
                        onMouseEnter={() => setIndex(i)}
                      />
                    ))}
                </div>
              </div>

              <div className="product-detail-desc">
                <h1>{product.name}</h1>
                <div className="reviews">
                  <ReactStars {...options} />
                  <p>({product.numOfReviews} reviews)</p>
                </div>
                <div className="stock">
                  <p>
                    Status:
                    <b
                      className={product.Stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.Stock < 1 ? " Out-Of-Stock" : " InStock"}
                    </b>
                  </p>
                </div>
                <h4>Details: </h4>
                <p className="product-description">{product.description}</p>
                <p className="price">₹{product.price}</p>
                <div className="quantity">
                  <h3>Quantity:</h3>
                  <p className="quantity-desc">
                    <span className="minus" onClick={decreaseQuantity}>
                        <RemoveIcon />
                    </span>
                    <span className="num">{quantity}</span>
                    <span className="plus" onClick={increaseQuantity}>
                      <AddIcon/>
                    </span>
                  </p>
                </div>
                <div className="buttons">
                  <button
                    type="button"
                    className="add-to-cart"
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="maylike-products-wrapper">
              <h2>You May Also Like</h2>
              <div className="marquee">
                  <div className="maylike-products-container track">
                      {products && products.map(product=> (<ProductCard product={product} key={product._id}/>))}
                  </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
