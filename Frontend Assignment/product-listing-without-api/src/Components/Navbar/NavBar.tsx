import React from 'react';
import './Navbar.css'
import {RouterLink} from "mobx-state-router";
class NavBar extends React.Component<{}, {}> {
    render() {
        return (
            <div className='navBar'>
                <div className='navItem'>
                    <RouterLink className='link' routeName={'home'}>
                        <p>home</p>
                    </RouterLink>
                </div>
                <div className='navItem'>
                    <RouterLink className='link' routeName={'cart'}>
                        <p>Cart</p>
                    </RouterLink>
                </div>
                <div className='navItem'>
                    <RouterLink className='link' routeName={'addProduct'}>
                        <p>Add Product</p>
                    </RouterLink>
                </div>
            </div>
        );
    }
}

export default NavBar;