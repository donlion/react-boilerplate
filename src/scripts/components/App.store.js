import {
    action,
    observable
} from 'mobx';

export default class AppStore {
    @observable title;

    constructor(options={}) {
        this.title = options.title || 'Home';
    }

    @action updateTitle(title='') {
        if (!title) {
            return;
        }

        this.title = title;
    }
}
