import React from 'react';
import './product.css'
import  {IProduct} from './Feed'
import {ICartProduct} from "../CustomHooks/useCart";
interface IProductProp{
    product : IProduct
    status :boolean;
}
function ProductsItems(props :IProductProp) {
    const {id,title,description,price,category,thumbnail,discountPercentage} = props.product;
    const {status} = props;

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
                        <span> <b>Price</b> : {`$ ${  ( price- (discountPercentage/100)*price)}`} <i>  <s> ({price})</s></i></span>
                        <span><b>category</b> : {category}</span>
                        <span> <b>description</b> : {description}</span>
                    </div>
                    <div className="cardItemsRight">
                        <button type="submit">{status?`remove`: 'Add to cart'}</button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ProductsItems;