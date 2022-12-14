import React, {Component} from 'react';
import {RootStoreContext} from "../../Context/StoreContext/RootStoreContext";
import {observer} from "mobx-react";
import ListPagination from "./Pagination/ListPagination";
import ListTable from "./ItemListing";
import {Columns, IPost} from "../../Types";
import PostStore from "../../Stores/PostStore";
import {Button} from "reactstrap";

const column: Columns<IPost>[] = [
    {
        heading: "Title",
        selector: (data) => data.title
    },
    {
        heading: "User Id",
        selector: (data) => data.userId
    },
    {
        heading: "userName",
        selector: (data) => data.userName
    }
]

@observer
class PostList extends Component<{}, {}> {
    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    render() {
        if (!this.context) return null
        const postStore = this.context.postStore;
        const postList = postStore.listTableStore.list;
        if (postList === null) return <>Loading...</>
        return (
            <div className='container'>
                <h1 className='text-center'>Post</h1>
                <ListPagination<PostStore> store={postStore}>
                    <ListTable<IPost>
                        list={postList}
                        tableFormat={column}
                    />
                </ListPagination>
            </div>
        );
    }
}

export default PostList;