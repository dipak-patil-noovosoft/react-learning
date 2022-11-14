import React, {Component} from 'react';
import './AddProduct.css'
import {IProduct} from "../../types";
import {action, observable, toJS} from "mobx";
import {observer} from "mobx-react";
import {StoreContext} from "../StoreContext";


let formState: Omit<IProduct, 'id'> = observable({
    productName: "",
    price: 0,
    discountedPrice: 0,
    quantity: 0,
    category: 'mobile',
    description: ''
})

@observer
class AddProduct extends Component<{}, {}> {
    static contextType = StoreContext;

    clearForm = action(() => {
        formState = {
            productName: "",
            price: 0,
            discountedPrice: 0,
            quantity: 0,
            category: 'mobile',
            description: ''
        }
    })
    handleClick = (store, routerStore) => {
        store.addProduct(formState)
        routerStore.goTo('home')
        this.clearForm();
    }

    render() {
        const context = this.context;
        const {routerStore} = context;
        return (
            <div className='createProduct'>
                <h1>Add Product</h1>
                <form className='productForm'>
                    <div className='productName'>
                        <label htmlFor="">Name </label>
                        <input type="text" value={toJS(formState.productName)}
                               placeholder='Name' onChange={
                            action((e) => {
                                    formState.productName = e.target.value;
                                }
                            )}/>
                    </div>
                    <div className='productCategory'>
                        <label htmlFor="">Category </label>
                        <select name="category" onChange={(e) => formState.category = (e.target.value)}>
                            <option value="mobile">Mobile</option>
                            <option value="laptop">Laptop</option>
                            <option value="style-fashion">Style & Fashion</option>
                        </select>
                    </div>
                    <div className='productPrice'>
                        <label htmlFor="">Price </label>
                        <input type="number" placeholder='Price'
                               min={1}
                               onChange={action((e) => {
                                   formState.price = Number(e.target.value);
                               })}/>
                    </div>
                    <div className='productDiscountedPrice'>
                        <label htmlFor="">DiscountedPrice </label>
                        <input type="number" placeholder='DiscountedPrice'
                               min={1}
                               onChange={action((e) => {
                                   formState.discountedPrice = Number(e.target.value);
                               })}
                        />
                    </div>
                    <div className='productQuantity'>
                        <label htmlFor="">Quantity </label>
                        <button disabled={formState.quantity == 0}
                                type="button"
                                onClick={action((e) => {
                                    formState.quantity--
                                })}>-
                        </button>
                        <input type="number" placeholder='Quantity'
                               min={1}
                               value={formState.quantity}
                               onChange={action((e) => {
                                   formState.quantity = Number(e.target.value);
                               })}
                        />
                        <button type="button"
                                onClick={action((e) => {
                                    formState.quantity++
                                })}>+
                        </button>
                    </div>
                    <div className='productDescription'>
                        <label htmlFor="">Description </label>
                        <textarea placeholder='Description'
                                  value={toJS(formState.description)}
                                  onChange={action((e) => {
                                      formState.description = e.target.value;
                                  })}> </textarea>
                    </div>
                    <div className='addProduct-btn'>
                        <button onClick={(e) => {
                            e.preventDefault()
                            this.handleClick(context.productStore, routerStore)
                        }}>Click
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddProduct;