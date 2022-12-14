import RootStore from "./rootStore";
import {makeObservable, observable} from "mobx";
import {IFetcherResponse, IPost, IUser} from "../Types";
import Networking from "../Networking/Networking";
import ListTableStore from "./ListTableStore";

interface IPostResponse {
    posts: IPost[],
    total: number,
    skip: number,
    limit: number
}

interface IUserResponse {
    users: IUser[],
    total: number,
    skip: number,
    limit: number
}

export default class PostStore {
    @observable listTableStore: ListTableStore<IPost>
    rootStore

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
        this.listTableStore = new ListTableStore(this.fetchPost)
    }

    fetchPost = async (page: number, limit: number, searchQuery: string, filter: string) => {
        const post = await Networking.getData<IPostResponse>(`posts/search?q=${searchQuery}&limit=${limit}&skip=${page * limit}`);
        const user = await Networking.getData<IUserResponse>(`users?limit=100`);

        const mergedData = post.posts.reduce((acc: any, cur) => {
            const userData = user.users.find(u => u.id === cur.userId);
            const userName: string | undefined = userData?.firstName + ' ' + userData?.lastName;
            return [...acc, {...cur, userName: userName ?? undefined}];
        }, []);
        return {
            list: mergedData,
            limit: post.limit,
            skip: post.skip,
            total: post.total
        } as IFetcherResponse<IPost>;
    }

}