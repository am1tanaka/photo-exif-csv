var React = require('react/dist/react.min');

/** 削除ボタン*/
var RemoveButton = React.createClass({
    propTypes: {
        isRemove: React.PropTypes.bool.isRequired,
        clearPhotos: React.PropTypes.func.isRequired,
    },
    render: function() {
        if (!this.props.isRemove) {
            return <tr></tr>;
        }
        return (
            <tr key='removebutton'>
                <td>
                    <div className='btn btn-default' onClick={this.props.clearPhotos}>選択したファイルを削除
                    </div>
                </td>
            </tr>
        );
    }
});

/** ドラッグ＆ドロップ*/
module.exports = React.createClass({
    propTypes: {
        appendPhotoData: React.PropTypes.func.isRequired,
        readPhotos: React.PropTypes.func.isRequired,
        clearPhotos: React.PropTypes.func.isRequired,
        isRemove: React.PropTypes.bool.isRequired
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
    componentDidUpdate: function() {
        // ファイルボタンを更新
        var file = document.getElementById('file');
        file.parentNode.innerHTML = file.parentNode.innerHTML;
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
                        <td id='droppable' key='filebutton'>{mes}
                            <div id='file'>
                                <input
                                    type='file'
                                    name='file-photo'
                                    accept='.jpg'
                                    onChange={this.handleSelectFile}
                                    multiple />
                            </div>
                        </td>
                    </tr>
                    <RemoveButton
                        isRemove={this.props.isRemove}
                        clearPhotos={this.props.clearPhotos}
                    />
                </tbody>
            </table>
        </div>

        );
    }
});
