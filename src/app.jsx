var React = require('react');
var ReactDOM = require('react-dom');

var Foo = React.createClass({
    render: function() {
        return (
            <div className='label label-primary'>
                Browserify+Babel & Gulpサンプル
            </div>
        );
    }
});

ReactDOM.render(
    <Foo />,
    document.getElementById('example')
);
