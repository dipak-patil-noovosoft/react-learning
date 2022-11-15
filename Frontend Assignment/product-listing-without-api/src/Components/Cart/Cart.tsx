import React, {Component} from 'react';
import {StoreContext} from "../../StoreContext/StoreContext";
import Product from "../../Product/Product";
import {observer} from "mobx-react";

@observer
class Cart extends Component<{}, {}> {
    static contextType = StoreContext;

    render() {
        const context = this.context;
        return (
            <div>

                <h1 style={{textAlign:"center"}}>Cart</h1>

                <div style={{display:"flex", flexWrap:'wrap'}}>

                {
            context.cartStore.cartProducts.map((e)=>{
                return (
                    <Product key={e.id} product={e} cnt = {context} isCart={true}/>
                )
            })
        }
             </div>
             </div>
        );
    }
}

export default Cart;