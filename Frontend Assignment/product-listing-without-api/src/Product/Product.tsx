import React, {Component} from 'react';
import './product.css'
import {ICartProduct, IProduct} from "../types";
import {StoreContext} from "../StoreContext/StoreContext";
import {observer} from "mobx-react";
interface IProductProps {
    product : IProduct | ICartProduct
    cnt : any
    isCart:boolean
}
@observer
class Product extends Component<IProductProps, {}>  {
    constructor(props: IProductProps) {
        super(props);
    }
    static contextType = StoreContext;

    render() {
        const context = this.context;

        const {id,productName,category,price,description,discountedPrice,quantity} = this.props.product;
        const{isCart} =  this.props;
        return (

            <div className='productCard'>
                <div className='productTitle'>
                    <h2>{productName}</h2>
                </div>
                <div className='productDetails'>
                    <div className='productItems'>
                        <p className='left'>Category :  </p>
                        <p className='right'>{category}</p>
                    </div>
                    <div className='productItems'>
                        <p className='left'>Price :  </p>
                        <p className='right'>{discountedPrice} <s>({price})</s></p>
                    </div>
                    {!isCart && <div className='productItems'>
                        <p className='left'>Description : </p>
                        <p className='right'>{description}</p>
                    </div>
                    }
                    {!isCart &&
                        <div className='productItems'>
                        <p className='left'>Quantity : </p>
                        <p className='right'>{context.productStore.getProductQuantity(id)}</p>

                    </div>}
                    <div className='productItems'>

                        <p className='left'>Cart :  </p>
                        <button disabled={context.cartStore.getCartQuantity(id)===0} onClick={()=>context.cartStore.removeFromCart(id)}>-</button>
                            {context.cartStore.getCartQuantity(id)}
                        <button disabled={(context.productStore.getProductQuantity(id) === (context.cartStore.getCartQuantity(id)))} onClick={()=>context.cartStore.addToCart(id)}>+</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;