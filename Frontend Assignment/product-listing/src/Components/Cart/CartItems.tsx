import React from 'react';
import {ICart, ICartProducts, IProduct} from "../types";
interface ICartItemProps{
    product : IProduct
    removeFromCard : (id:number)=>void;
    user : {id:number, firstName :string}
}
const  CartItems:React.FC<ICartItemProps> = (props) => {
    const {id,title,price,discountPercentage,category,thumbnail,brand} = props.product;
    const discountPrice = ( price- (discountPercentage/100)*price).toFixed(2);
    const {removeFromCard}= props;

    const handleCartClick = () =>{
        removeFromCard(id);
    }
    return (
        <div>
            <div className="card">
                <h4>{title} ({brand})</h4>

                <div className="cardItems">
                    <div className="cardItemsLeft">
                        <img src={thumbnail} alt=""/>
                    </div>
                    <div className="cardItemsMidd">
                        {/*<span > Name : {} </span>*/}
                        <span> <b>Price</b> : {`$ ${ discountPrice }`} <i>  <s> ({price})</s></i></span>
                        <span><b>category</b> : {category}</span>
                    </div>
                    <div className="cardItemsRight">
                        <button type="submit" className={"btnCart btnStatustrue"}
                                onClick={handleCartClick}
                        >
                            remove </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default CartItems;