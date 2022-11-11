import React, {Component} from 'react';
import './product.css'
import {IProduct} from "../types";
import {StoreContext} from "../Components/StoreContext";
import {observer} from "mobx-react";
interface IProductProps {
    product : IProduct
    cnt : any
}
@observer
class Product extends Component<IProductProps, {}>  {
    constructor(props: IProductProps) {
        super(props);
    }
    static contextType = StoreContext;

    render() {
        const context = this.context;
        const {product} = context;

        const {id,productName,category,price,description,discountedPrice,quantity} = this.props.product;
        return (

            <div className='productCard'>
                <div className='productTitle'>
                    <h2>{productName}</h2>
                </div>
                <div className='productDetails'>
                    <div className='productCategory'>
                        <p className='left'>Category :  </p>
                        <p className='right'>{category}</p>
                    </div>
                    <div className='productPrice'>
                        <p className='left'>Price :  </p>
                        <p className='right'>{discountedPrice} <s>({price})</s></p>
                    </div>
                    <div className='productDescription'>
                        <p className='left'>Description : </p>
                        <p className='right'>{description}</p>
                    </div>

                    <div className='productQuantityCount'>
                        <button onClick={()=>context.productStore.addToCart(id)}>+</button>
                        {quantity}
                        <button >-</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default Product;