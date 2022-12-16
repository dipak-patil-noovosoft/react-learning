import RootStore from "./rootStore";
import {action, autorun, makeObservable, observable} from "mobx";
import {IPost, IUser} from "../Types";
import Networking from "../Networking/Networking";
import ListTableStore from "./ListTableStore";

interface IPostResponse {
    posts: IPost[],
    total: number,
    skip: number,
    limit: number
}

export default class PostStore {
    public listTableStore: ListTableStore<IPostResponse>
    @observable postWithUsername: (IPost)[] = [];
    rootStore

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
        this.listTableStore = new ListTableStore(this.fetchPost)
        autorun(() => this.listTableStore.list?.posts.map((post) =>
            this.getUser(post.userId).then(user => {
                this.appendUsernameToPost(post, user);
            })
        ))
    }

    fetchPost = (page: number, limit: number, searchQuery: string) => {
        this.clearPostWithUsername();
        return Networking.getData<IPostResponse>(`posts/search?q=${searchQuery}&limit=${limit}&skip=${page * limit}`);
    }

    getUser = (userId: number) => {
        return Networking.getData<IUser>(`users/${userId}`);
    }

    @action clearPostWithUsername = () => this.postWithUsername = [];
    @action appendUsernameToPost = (post: IPost, user: IUser) => {
        this.postWithUsername = [...this.postWithUsername, {...post, userName: user.firstName}]
    }
}