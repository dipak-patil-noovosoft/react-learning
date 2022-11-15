import React, {Component} from 'react';
import {StoreContext} from "../../StoreContext/StoreContext";
import {observer} from "mobx-react";
import Product from "../../Product/Product";

@observer
class Home extends Component<{}, {}> {
    static contextType = StoreContext;
    constructor(props) {
        super(props);
    }
    handleClick = (routerStore) => {
        routerStore.goTo('addProduct')
    }
    render() {
        const context = this.context;
        const {routerStore} = context;

        return (
            <div>
                <h1 style={{textAlign:"center"}}>Home</h1>
                <div style={{display:"flex", flexWrap:'wrap'}}>
                    {context.productStore.products.map((e)=>{
                       return (
                            <Product key={e.id} product={e} cnt = {context} isCart={false}/>
                       )
                    })}
                </div>
            </div>
        );
    }
}

export default Home;
