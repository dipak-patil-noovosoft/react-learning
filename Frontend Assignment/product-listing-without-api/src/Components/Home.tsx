
import React, {Component} from 'react';
import {StoreContext} from "./StoreContext";
import {observer} from "mobx-react";
import AddProduct from "./AddProduct/AddProduct";
import {toJS} from "mobx";
import {browserHistory} from 'mobx-state-router'
import Product from "../Product/Product";

@observer
class Home extends Component<{}, {}> {
    static contextType = StoreContext;
    constructor(props) {
        super(props);
    }
    handleClick = (rootStore) => {
        rootStore.goTo('addProduct')
    }
    render() {
        const context = this.context;
        const {rootStore} = context;

        return (
            <div>
                <h1>Home</h1>
                <button type='button' onClick={()=>context.productStore.addProduct({
                    productName:"dipak",
                    price: Math.random(),
                    discountedPrice:3,
                    quantity:3,
                    category: 'cat',
                    description: 'des'
                }
                )}>Click</button>
                <button onClick={()=>this.handleClick(rootStore)}>Add Product</button>
                    <ul>
                    {context.productStore.products.map((e)=>{
                       return (
                            <Product key={e.id} product={e} cnt = {context}/>
                           // <li key={toJS(e.id)}>{toJS(e.productName)}</li>
                       )
                    })}
                </ul>
            </div>
        );
    }
}

export default Home;
