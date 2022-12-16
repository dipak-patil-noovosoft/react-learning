import React, {Component} from 'react';
import {RootStoreContext} from "../../Context/StoreContext/RootStoreContext";
import {observer} from "mobx-react";
import ListPagination from "./Pagination/ListPagination";
import ListTable from "./ListTable";
import {Columns, IPost} from "../../Types";
import PostStore from "../../Stores/PostStore";
import {toJS} from "mobx";

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
        selector: (data) => {
            return data.userName
        }
    }
]

@observer
class PostList extends Component<{}, {}> {
    context: React.ContextType<typeof RootStoreContext> | undefined
    static contextType = RootStoreContext;

    componentDidMount() {
        if (!this.context) return null;
        this.context.postStore.listTableStore.fetchData();
    }

    render() {
        if (!this.context) return null
        const postStore = this.context.postStore;
        //@ts-ignore
        window.__lst = toJS(postStore);

        // const product = postStore.listTableStore?.list?.posts ?? [];
        const postWithUsername = postStore.postWithUsername;
        const product = Object.values(postWithUsername);
        return (
            <div className='container'>
                <h1 className='text-center'>Post</h1>
                <ListPagination<PostStore> store={postStore}>
                    <ListTable<IPost>
                        list={product}
                        tableFormat={column}
                    />
                </ListPagination>
            </div>
        );
    }
}

export default PostList;