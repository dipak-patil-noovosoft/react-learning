import ProductList from "../Components/ListtTableStoreExericse/ProductList";
import MultipleInputForm from "../Components/FielComponentExericse/MultipleInputForm/MultipleInputForm";
import PostList from "../Components/ListtTableStoreExericse/PostList";
import FilterPicker from "../Components/FilterPicker/FilterPicker";

export const viewMap = {
    home: <ProductList/>,
    multiInputForm: <MultipleInputForm/>,
    product: <ProductList/>,
    post: <PostList/>,
    filterPicker: <FilterPicker/>
}