import './App.css';
import UserContextProvider from "./Context/UserContextProvider";
import Cart from "./Components/Cart/Cart";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import ProductListingLayout from "./Components/ProductListingLayout/ProductListingLayout";
import Product from "./Components/Product/Product";

const  router = createBrowserRouter([{
        element  : <ProductListingLayout/>,
        children :[{
            path : '/',
            element : (<Product/>)
        },
        {
            path : '/cart',
            element : (<Cart/>)
        }]
    }])
function App() {
  return (
      <UserContextProvider>
        <RouterProvider router={router}/>
      </UserContextProvider>
  );
}

export default App;
