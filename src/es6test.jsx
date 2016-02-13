'use strict'

import React from 'react/dist/react.min'

//var React = require('react/dist/react.min');

/** ES6テスト*/
export default class ES6Test extends React.Component {
    constructor(props) {
        super(props);
        // 状態の初期化
        this.state = {
            data: []
        };
    }

    render() {
        return <div>ES6 Test2 {this.props.str}</div>;
    }
}

// プロパティタイプ
ES6Test.propTypes = {
    str: React.PropTypes.string.isRequired
};
// 初期値
ES6Test.defaultProps = {
    str: "default str"
};


/*
module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },
    return <div>ES6 Test</div>;
    render: function() {
    }
});
*/
