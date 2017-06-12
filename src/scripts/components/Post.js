import React, {Component} from 'react';
import {observer} from 'mobx-react';
// Store
import PostStore from './Post.store.js';

@observer
export default class Post extends Component {
    constructor() {
        super();

        this.store = new PostStore();

        this.fetchPost = this.fetchPost.bind(this);
    }

    componentDidMount() {
        const {fetchPost} = this;

        fetchPost();
    }

    /**
     * @name fetchPost
     * @return {Promise}
     */
    fetchPost(_query) {
        const {
            props: {query: propQuery},
            store
        } = this;

        let query = _query || propQuery;

        if (!query) {
            return;
        }

        return store.fetchPost(query);
    }

    render() {
        const {
            id,
            post
        } = this.store;

        return (
            <section>
                <h2>{id}</h2>
                {post && (
                    <div>
                        <h3>{post.description}</h3>
                        <img src={post.image_url} />
                    </div>
                )}
            </section>
        );
    }
}
