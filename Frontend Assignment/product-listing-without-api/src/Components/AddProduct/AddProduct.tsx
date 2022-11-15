import React, {Component} from 'react';
import './AddProduct.css'
import {IProduct} from "../../types";
import {action, observable, toJS} from "mobx";
import {observer} from "mobx-react";
import {StoreContext} from "../../StoreContext/StoreContext";




@observer
class AddProduct extends Component<{}, {}> {

    static contextType = StoreContext;
    formState: Omit<IProduct,'id'> &{errorMessage : string} = observable({
        productName: "",
        price: 0,
        discountedPrice: 0,
        quantity: 0,
        category: 'mobile',
        description: '',
        errorMessage : ''
    })

    //Clear Form function after submitting form
    clearForm = action(() => {
        this.formState = {
            productName: "", price: 0, discountedPrice: 0,
            quantity: 0, category: 'mobile', description: ''
            , errorMessage : ''
        }
    })
    //Form Validation
    validateForm = () => {
        if ((/^$/).test(this.formState.productName) || (/^$/).test(String(this.formState.price)) ||
            (/^$/).test(String(this.formState.discountedPrice)) || (/^$/).test(this.formState.description)) {
            this.formState.errorMessage = 'Please fill all the fields'
            return true;
        }
        if (!(/^[+]?([0-9]+(?:[\][0-9]*)?|\.[0-9]+)$/).test(String(this.formState.price))) {
            this.formState.errorMessage = 'Negative value not accepted'
            return true;
        }
        if (this.formState.price < this.formState.discountedPrice) {
            this.formState.errorMessage = 'Discounted Price should not be less than actual price'
            return true;
        }
        if (this.formState.quantity === 0) {
            this.formState.errorMessage = 'Quantity should be greater than 0'
            return true;
        }
        return false;
    }

    handleClick = (store, routerStore) => {
        if (this.validateForm()) {
            return;
        }
        const {errorMessage,...rest} = this.formState;
        store.addProduct(rest)
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
                        <input type="text"
                               name='productName'
                                   value={this.formState.productName}
                               placeholder='Name' onChange={
                                action((e:React.ChangeEvent<HTMLInputElement>) => {
                                    this.formState[e.target.name] = e.target.value;
                                })
                        }/>
                    </div>
                    <div className='productCategory'>
                        <label htmlFor="">Category </label>
                        <select name="category" onChange={(e) => this.formState.category = (e.target.value)}>
                            <option value="mobile">Mobile</option>
                            <option value="laptop">Laptop</option>
                            <option value="style-fashion">Style & Fashion</option>
                        </select>
                    </div>
                    <div className='productPrice'>
                        <label htmlFor="">Price </label>
                        <input type="number" placeholder='Price'
                               value={this.formState.price}
                               onChange={action((e) => {
                                   this.formState.price = Number(e.target.value);
                               })}/>
                    </div>
                    <div className='productDiscountedPrice'>
                        <label htmlFor="">DiscountedPrice </label>
                        <input type="number"
                               value={this.formState.discountedPrice}
                               placeholder='DiscountedPrice'
                               onChange={action((e) => {
                                   this.formState.discountedPrice = Number(e.target.value);
                               })}
                        />
                    </div>
                    <div className='productQuantity'>
                        <label htmlFor="">Quantity </label>
                        <button disabled={this.formState.quantity == 0}
                                type="button"
                                onClick={action(() => {
                                    this.formState.quantity--
                                })}>-
                        </button>
                        <input type="number" placeholder='Quantity'
                               min={1}
                               value={this.formState.quantity}
                               onChange={action((e) => {
                                   this.formState.quantity = Number(e.target.value);
                               })}
                        />
                        <button type="button"
                                onClick={action(() => {
                                    this.formState.quantity++
                                })}>+
                        </button>
                    </div>
                    <div className='productDescription'>
                        <label htmlFor="">Description </label>
                        <textarea placeholder='Description'
                                  value={toJS(this.formState.description)}
                                  onChange={action((e) => {
                                      this.formState.description = e.target.value;
                                  })}> </textarea>
                    </div>
                    <p style={{color:"red"}}>{this.formState.errorMessage}</p>
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