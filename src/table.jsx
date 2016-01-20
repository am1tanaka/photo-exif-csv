var React = require('react/dist/react.min');

/** テーブルのデータを返す*/
var getDataTag = function(tag, data) {
    var cl = "row-"+tag;
    return <td className={cl} key={cl+"-"+data}>{data}</td>;
};

module.exports = React.createClass({
    /** propsの定義*/
    propTypes: {
        datas: React.PropTypes.array.isRequired,
    },
    /** 指定のものを全てフラグに応じて表示・非表示する
     * @param bool isshow true=表示 / false=非表示
     * @param string selector 対象のIDやクラスなどのセレクター
    */
    showElem : function(isshow, selector) {
        if (isshow) {
            $(selector).each( function() {
                $(this).show();
            });
        }
        else {
            $(selector).each( function() {
                $(this).hide();
            });
        }
    },
    /** 列の表示・非表示を設定する*/
    setShowRow : function() {
        var st = this.props.datas;
        this.showElem(st.exportFileName, '.row-filename');
        this.showElem(st.exportLatLng, '.row-lat');
        this.showElem(st.exportLatLng, '.row-lng');
        this.showElem(st.exportAlt, '.row-alt');
        this.showElem(st.exportDate || st.exportTime, '.row-datetime');
    },
    tableRow : function(row) {
        var fname = getDataTag('filename', row.fileName);
        var lat = getDataTag('lat', row.lat);
        var lng = getDataTag('lng', row.lng);
        var alt = getDataTag('alt', row.alt);
        var datetime = "";
        if (this.props.datas.exportDate) {
            datetime = row.date;
        }
        if (this.props.datas.exportTime) {
            if (datetime !== "") {
                datetime += " ";
            }
            datetime += row.time;
        }
        var dt = getDataTag('datetime', datetime);
        return (
            <tr key={row.fileName}>
                {fname}{lat}{lng}{alt}{dt}
            </tr>
        );
    },
    /** 描画更新ご*/
    componentDidUpdate : function() {
        this.setShowRow();
    },
    /** シーン描画*/
    render: function() {
        var tbody = this.props.datas.photoDatas.map(this.tableRow);
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
                        <th className='row-filename' key='tbl-filename'>ファイル名</th>
                        <th className='row-lat' key='tbl-lat'>緯度</th>
                        <th className='row-lng' key='tbl-lng'>経度</th>
                        <th className='row-alt' key='tbl-alt'>高度</th>
                        <th className='row-datetime' key='tbl-datetime'>{dt}</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        );
    }
});
