var React = require('react/dist/react.min');

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
    /** ファイルが選択された時のハンドラ*/
    handleSelectFile : function(event) {
        this.props.readPhotos(event.target.files);
        // イベントをキャンセル
        this.cancelEvent(event);
        return false;
    },
    /** シーンの描画 */
    render: function() {
        // ドラッグ＆ドロップのメッセージの有無
        var mes = this.state.canDaD ? <div><h2>この欄に読み込みたい写真をドラッグ＆ドロップするか、下のボタンから選択してください。</h2><br/><br/></div> : "";

        // 描画
        return(
            <div>
            <table className='table table-bordered'>
                <tbody>
                    <tr className='active'>
                        <td id='droppable'>{mes}
                            <input
                                type='file'
                                name='file-photo'
                                accept='.jpg'
                                onChange={this.handleSelectFile}
                                multiple />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        );
    }
});
