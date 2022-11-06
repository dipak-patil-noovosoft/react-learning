import './App.css';
import {Routes,Route,Link} from 'react-router-dom'
import Feed from "./Components/Feed/Feed";
import UserContextProvider from "./Context/UserContextProvider";
import Cart from "./Components/Cart/Cart";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

const  router = createBrowserRouter([
    {
        path : '/',
        element : (
            <Feed/>
        )
    },
    {
        path : '/cart',
        element : (
            <Cart/>
        )
    }
])
function App() {

  return (
      <UserContextProvider>
        <RouterProvider router={router}/>
      </UserContextProvider>
  );
}

export default App;
