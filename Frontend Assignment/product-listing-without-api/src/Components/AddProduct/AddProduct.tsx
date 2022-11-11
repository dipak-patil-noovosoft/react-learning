import React, {Component} from 'react';
import './AddProduct.css'
import {IProduct} from "../../types";
import {action, observable, toJS} from "mobx";
import {observer} from "mobx-react";
import {StoreContext} from "../StoreContext";


const formState: Omit<IProduct,'id'> = observable({
    productName : "",
    price: 0,
    discountedPrice:0,
    quantity:0,
    category: '',
    description:''
})

@observer
class AddProduct extends Component<{},{}>{
    static contextType = StoreContext;
     handleClick = ( store,rootStore) => {
         store.addProduct(formState)
         rootStore.goTo('home')
    }
    render() {
        const context = this.context;
        const {rootStore} = context;
        return (
            <div className='createProduct'>
                <>con : {toJS(formState.productName)}</>
                <h1>Add Product</h1>
                <form className='productForm'>
                    <div className='productName'>
                        <label htmlFor="">Name </label>
                        <input type="text"  value={toJS(formState.productName)} placeholder='Name' onChange={
                            action((e)=>{
                            formState.productName  = e.target.value;
                        }
                        )}/>
                    </div>
                    <div className='productCategory'>
                        <label htmlFor="">Category </label>
                        <input type="text" placeholder='Category' onChange={action((e)=>{
                            formState.category = e.target.value;
                        })}/>
                    </div>
                    <div className='productPrice'>
                        <label htmlFor="">Price </label>
                        <input type="text" placeholder='Price'  onChange={action((e)=>{
                            formState.price = Number(e.target.value);
                        })}/>
                    </div>
                    <div className='productDiscountedPrice'>
                        <label htmlFor="">DiscountedPrice </label>
                        <input type="text" placeholder='DiscountedPrice'  onChange={action((e)=>{
                            formState.discountedPrice = Number(e.target.value);
                        })}/>
                    </div>
                    <div className='productQuantity'>
                        <label htmlFor="">Quantity </label>
                        <input type="number" placeholder='Quantity' onChange={action((e)=>{
                            formState.quantity = Number(e.target.value);
                        })} />
                    </div>
                    <div className='productDescription'>
                        <label htmlFor="">Description </label>
                        <textarea placeholder='Description' value={toJS(formState.description)} onChange={action((e)=>{
                            formState.description = e.target.value;
                        })}> </textarea>
                    </div>
                    <div className='addProduct-btn'>
                        <button onClick={(e)=> {
                            e.preventDefault()
                            this.handleClick(context.productStore, rootStore)
                        }}>Click</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddProduct;