var React = require('react');

module.exports = React.createClass({
    propTypes: {
        appendPhotoData: React.PropTypes.func.isRequired,
        readPhotos: React.PropTypes.func.isRequired
    },
    cancelEvent: function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    },
    /** ドラッグ＆ドロップハンドラ関数*/
    handleDroppedFile: function(event) {
        this.props.readPhotos(event.originalEvent.dataTransfer.files);
        // イベントをキャンセル
        this.cancelEvent(event);
        return false;
    },
    getInitialState: function() {
        return {
            canDaD: true
        };
    },
    /** コンポーネントの組み込みが完了*/
    componentDidMount: function() {
        this.setState({canDaD: !!window.FileReader});
        if (!this.state.canDaD) return;
        // ドラッグ＆ドロップ設定
        var droppable = $('#droppable');
        droppable.bind('dragenter', this.cancelEvent);
        droppable.bind('dragover', this.cancelEvent);
        droppable.bind('drop', this.handleDroppedFile);
    },
    /** シーンの描画 */
    render: function() {
        // ドラッグ＆ドロップのメッセージの有無
        var mes = this.state.canDaD ? <div>この欄に読み込みたい写真をドラッグ＆ドロップするか、以下から指定してください。<br/><br/></div> : "";

        // 描画
        return(
            <table className='table table-bordered'>
                <tbody>
                    <tr className='active'>
                        <td id='droppable'>{mes}
                            <input type='file' name='file-photo' multiple='multiple' />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
});
