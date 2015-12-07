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
    /** データ*/
    getDefaultProps: function() {
        return {
            initDatas: [
                {
                    fileName: 'IMG0000.jpg',
                    lat: 35,
                    lng: 139,
                    date: '2015/12/7',
                    time: '16:30'
                },
                {
                    fileName: 'IMG0001.jpg',
                    lat: 35.5,
                    lng: 139.5,
                    date: '2015/12/7',
                    time: '16:31'
                }
            ]
        };
    },
    /** 状態の定義*/
    getInitialState: function() {
            return {
                exportFlags: [],
                /* fileName:写真名 lat:緯度 lng:経度 date=撮影日 time=撮影時間*/
                photoDatas: this.props.initDatas,     // 読み込んんだ写真のデータ
            };
    },
    /** 指定のデータをphotoDatasに追加*/
    appendPhotoData: function(data) {
        var newdt = this.state.photoDatas.concat([data]);
        this.setState({photoDatas: newdt});
    },
    render: function() {
        return (
            <div className='container'>
                <Header ver={VERSION} />
                <DaD />
                <ConfigMenu />
                <Table datas={this.state.photoDatas} />
            </div>
        );
    }
});

ReactDOM.render(
    <Top />,
    document.getElementById('photo-exif-picker')
);
