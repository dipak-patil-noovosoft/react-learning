import React, {Component} from 'react';
import {Nav, NavItem} from "reactstrap";
import {RouterLink} from "mobx-state-router";

class NavBar extends Component<{}, {}> {
    render() {
        return (
            <Nav>
                <NavItem>
                    <RouterLink className='mx-2 text-decoration-none' routeName='product'>
                        Product
                    </RouterLink>
                    <RouterLink className='mx-2 text-decoration-none' routeName='post'>
                        Post
                    </RouterLink>
                    <RouterLink className='mx-2 text-decoration-none' routeName='filterPicker'>
                        FilterPicker
                    </RouterLink>
                    <RouterLink className='mx-2 text-decoration-none' routeName='multiInputForm'>
                        JsonInput
                    </RouterLink>
                </NavItem>
            </Nav>
        );
    }
}

export default NavBar;