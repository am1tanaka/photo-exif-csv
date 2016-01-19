var React = require('react/dist/react.min');

/** テーブルのデータを返す*/
var getDataTag = function(tag, data) {
    var id = "tbl-"+tag;
    return
        <td id={id} key={id+"-"+data}>{data}</td>;
};

/** テーブルの行描画*/
var tableRow = function(row) {
    var fname = getDataTag('filename', row.fileName);
    var lat = getDataTag('lat', row.lat);
    var lng = getDataTag('lng', row.lng);
    var alt = getDataTag('alt', row.alt);
    var dt = getDataTag('datetime', row.date);
    return (
        <tr key={row.fileName}>
            {fname}{lat}{lng}{alt}{dt}
        </tr>
    );
};

module.exports = React.createClass({
    /** propsの定義*/
    propTypes: {
        datas: React.PropTypes.array.isRequired,
    },
    /** 列の表示・非表示を設定する*/
    setShowRow : function() {
        var st = this.props.datas;
        if (st.exportFileName) {
            $('#row-filename').show();
        }
        else {
            $('#row-filename').hide();
        }
        if (st.exportLatLng) {
            $('#row-lat').show();
            $('#row-lng').show();
        }
        else {
            $('#row-lat').hide();
            $('#row-lng').hide();
        }
        if (st.exportAlt) {
            $('#row-alt').show();
        }
        else {
            $('#row-alt').hide();
        }
        if (st.exportDate || st.exportTime) {
            $('#row-datetime').show();
        }
        else {
            $('#row-datetime').hide();
        }
    },
    /** 描画更新ご*/
    componentDidUpdate : function() {
        this.setShowRow();
    },
    /** シーン描画*/
    render: function() {
        var tbody = this.props.datas.photoDatas.map(tableRow);
        var st = this.props.datas;
        var dt = "撮影日時";
        if (!st.exportDate) {
            dt = "撮影時刻";
        } else if (!st.exportTime) {
            dt = "撮影日";
        }
        return(
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th id='row-filename' key='tbl-filename'>ファイル名</th>
                        <th id='row-lat' key='tbl-lat'>緯度</th>
                        <th id='row-lng' key='tbl-lng'>経度</th>
                        <th id='row-alt' key='tbl-alt'>高度</th>
                        <th id='row-datetime' key='tbl-datetime'>{dt}</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        );
    }
});
