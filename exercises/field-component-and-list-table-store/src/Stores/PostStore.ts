import RootStore from "./RootStore";
import {action, makeObservable, observable, reaction} from "mobx";
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
    @observable postWithUsername: Record<number, IPost> = {};
    rootStore

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
        this.listTableStore = new ListTableStore(this.fetchPost)
        reaction(
            () => this.listTableStore.list?.posts,
            (posts) => {
                posts?.forEach((post) => {
                    this.getUser(post.userId).then((user) => {
                        this.appendUsernameToPost(post, user);
                    });
                });
            },
        );
    }

    @action fetchPost = (page: number, limit: number, searchQuery: string) => {
        this.clearPostWithUsername()
        return Networking.getData<IPostResponse>(`posts/search?q=${searchQuery}&limit=${limit}&skip=${page * limit}`);
    }
    getUser = async (userId: number) => {
        return Networking.getData<IUser>(`users/${userId}`);
    }
    @action clearPostWithUsername = () => {
        return this.postWithUsername = {};
    }
    @action appendUsernameToPost = (post: IPost, user: IUser) => {
        this.postWithUsername[post.id] = {...post, userName: user.firstName}
    }
}
