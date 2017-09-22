import React, {
    Component
} from 'react';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            renderer: 'server'
        };
    }

    componentDidMount() {
        this.setState({
            renderer: 'client'
        });
    }

    render() {
        const {renderer} = this.state;

        return (
            <strong>Rendered by: {renderer}</strong>
        );
    }
}
