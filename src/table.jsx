var React = require('react');

/** テーブルの行描画*/
var tableRow = function(row) {
    return (
        <tr key={row.fileName}>
            <td>{row.fileName}</td>
            <td>{row.lat}</td>
            <td>{row.lng}</td>
            <td>{row.date} {row.time}</td>
        </tr>
    );
};

module.exports = React.createClass({
    /** propsの定義*/
    propTypes: {
        datas: React.PropTypes.array.isRequired,
    },
    /** シーン描画*/
    render: function() {
        var tbody = this.props.datas.map(tableRow);
        return(
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>ファイル名</th>
                        <th>緯度</th>
                        <th>経度</th>
                        <th>撮影日時</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        );
    }
});
