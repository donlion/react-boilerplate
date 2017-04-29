import React, {Component} from 'react';
import {observer} from 'mobx-react';
// Store
import PostStore from './Post.store.js';

let ComponentCount = 0;

@observer
export class Post extends Component {
    constructor() {
        super();

        this._id = `Post${ComponentCount}`;

        ComponentCount++;

        this.store = new PostStore({
            id: this._id
        });

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
    fetchPost() {
        const {
            props: {
                query
            },
            store
        } = this;

        return store.fetchPost(query)
            .then(() => {
                setTimeout(() => {
                    store.post.share_url = '';
                    console.log('setting share_url');
                }, 2000);

                setTimeout(() => {
                    store.post.image_url = 'http://placehold.it/420x420';
                    console.log('setting image_url');
                }, 4000);
            });
    }

    render() {
        const {
            id,
            post
        } = this.store;

        console.info('--- Render Component:', id);

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

export default Post;
