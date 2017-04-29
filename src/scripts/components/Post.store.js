import {
    action,
    observable
} from 'mobx';
import request from 'axios';
import get from 'lodash/get';

/**
 * @name PostStore
 * @type {Object}
 */
export default class PostStore {
    @observable id;
    @observable post = {};

    constructor(options={}) {
        if (options.id) {
            this.id = options.id;
        }
    }

    @action fetchPost(query='') {
        if (!query) {
            return;
        }

        return request.get(`https://backend-api.tattoodo.com/api/search/posts?q=${query}&limit=1`)
            .then(response => {
                let data = response ? get(response, 'data.data') : [];
                this.post = data[0];
            })
            .catch(error => {
                console.error(error);
            });
    }
}
