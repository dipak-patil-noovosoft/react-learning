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
    @observable listTableStore: ListTableStore<IPostResponse>
    @observable postWithUsername: (IPost)[] = [];
    rootStore

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
        this.listTableStore = new ListTableStore(this.fetchPost)
        autorun(() => this.listTableStore.list?.posts.map((e) =>
            this.getUser(e.userId).then(user => {
                this.appendUsernameToPost(e, user);
            })
        ))
    }

    @action fetchPost = (page: number, limit: number, searchQuery: string) => {
        this.postWithUsername = [];
        return Networking.getData<IPostResponse>(`posts/search?q=${searchQuery}&limit=${limit}&skip=${page * limit}`);
    }

    getUser = (userId: number) => {
        return Networking.getData<IUser>(`users/${userId}`);
    }

    @action appendUsernameToPost = (post: IPost, user: IUser) => {
        this.postWithUsername = [...this.postWithUsername, {...post, userName: user.firstName}]
    }
}