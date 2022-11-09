import React from 'react';
import {IProduct} from "../types";
import './item.css'
import {useLocation} from "react-router-dom";
interface IProductProp{
    product : IProduct
    status :boolean;
    addToCart? :(id:number)=>void;
    removeFromCard : (id:number)=>void;
}

const  Item : React.FC<IProductProp> = (props) => {
    const {id,title,brand,description,price,category,thumbnail,discountPercentage} = props.product;
    const {status,addToCart,removeFromCard} = props;
    const discountPrice = ( price- (discountPercentage/100)*price).toFixed(2);
    const btnStatus = "btnStatus"+status;
    const {pathname} = useLocation();
    let isVisible = true;
    if(pathname === '/cart') isVisible = false;
    const handleCartClick = () =>{
        if (!status) {
            if (addToCart) {
                addToCart(id);
            }
        }
        else {
            removeFromCard(id);
        }
    }
    return (
        <div>
            <div className="card">
                <h4>{title} ({brand})</h4>
                <div className="cardItems">
                    <div className="cardItemsLeft">
                        <img src={thumbnail} alt="Loading"/>
                    </div>
                    <div className="cardItemsMidd">
                        <span> <b>Price</b> : {`$ ${ discountPrice }`} <i>  <s> ({price})</s></i></span>
                        <span><b>category</b> : {category}</span>
                        {   isVisible &&
                            <span> <b>description</b> : {description}</span>
                        }
                    </div>
                    <div className="cardItemsRight " >
                        <button type="submit" className={"btnCart "+(btnStatus)}
                                onClick={handleCartClick}
                        >
                            {status?`remove`: 'Add to cart'} </button>
                    </div>

                </div>

            </div>
        </div>
    );

}

export default Item;