import './App.css';
import Feed from "./Components/Feed/Feed";
import UserContextProvider from "./Context/UserContextProvider";
import Cart from "./Components/Cart/Cart";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Main from "./Components/Main/main";

const  router = createBrowserRouter([{
        element  : <Main/>,
        children :[{
            path : '/',
            element : (<Feed/>)
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
