import {
    action,
    observable
} from 'mobx';

export default class AppStore {
    @observable title = 'AppStore';

    constructor(options={}) {
        if (options.title) {
            this.title = options.title;
        }
    }

    @action updateTitle(title='') {
        if (!title) {
            return;
        }

        this.title = title;
    }
}
