var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./header.jsx');
var DaD = require('./dad.jsx');
var ConfigMenu = require('./config-panel.jsx');
var Table = require('./table.jsx');

var VERSION = "Ver151207.1";

/**
 * 写真データから指定のデータを切り出すブラウザアプリトップ
 */
var Top = React.createClass({
    render: function() {
        return (
            <div className='container'>
                <Header ver={VERSION}/>
                <DaD />
                <ConfigMenu />
                <Table />
            </div>
        );
    }
});

ReactDOM.render(
    <Top />,
    document.getElementById('photo-exif-picker')
);
