import React from 'react';
import './product.css'
import  {IProduct} from '../types'
// import useCart, {ICartProduct} from "../CustomHooks/useCart";
interface IProductProp{
    product : IProduct
    status :boolean;
    addToCart :(id:number)=>void;
    removeFromCard : ()=>void;
}
function ProductsItems(props :IProductProp) {
    const {id,title,description,price,category,thumbnail,discountPercentage} = props.product;
    const {status,addToCart,removeFromCard} = props;
    const discountPrice = ( price- (discountPercentage/100)*price);
    const handleCartClick = () =>{
        if (!status)addToCart(id);
        else removeFromCard();

    }
    return (
        <div>
            <div className="card">
                <h4>{title}</h4>
                <div className="cardItems">
                    <div className="cardItemsLeft">
                        <img src={thumbnail} alt=""/>
                    </div>
                    <div className="cardItemsMidd">
                        {/*<span > Name : {} </span>*/}
                        <span> <b>Price</b> : {`$ ${ discountPrice }`} <i>  <s> ({price})</s></i></span>
                        <span><b>category</b> : {category}</span>
                        <span> <b>description</b> : {description}</span>
                    </div>
                    {/**/}
                    <div className="cardItemsRight">
                        <button type="submit"
                            onClick={handleCartClick}
                        >
                            {status?`remove`: 'Add to cart'} </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ProductsItems;