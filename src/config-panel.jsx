var React = require('react/dist/react.min');

module.exports = React.createClass({
    /* props定義*/
    propTypes: {
        linkStateFileName: React.PropTypes.object.isRequired,
        linkStateLatLng: React.PropTypes.object.isRequired,
        linkStateAlt: React.PropTypes.object.isRequired,
        linkStateDate: React.PropTypes.object.isRequired,
        linkStateTime: React.PropTypes.object.isRequired,
        handleChangeType: React.PropTypes.func.isRequired,
        outputType: React.PropTypes.string.isRequired,
        handleExport: React.PropTypes.func.isRequired
    },
    /* 描画ブロック*/
    render: function() {
        return(
            <div className='panel panel-default'>
                <div className='panel-heading'>出力する項目にチェックを入れてください。</div>
                <div className='panel-body'>
                    <div className='form-inline'>
                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbFileName' checkedLink={this.props.linkStateFileName} /> ファイル名
                            </label>
                        </div>
                        <span className='hidden-xs'>&nbsp;/&nbsp;</span>

                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbLatLng' checkedLink={this.props.linkStateLatLng} /> 緯度・経度
                            </label>
                        </div>
                        <span className='hidden-xs'>&nbsp;/&nbsp;</span>

                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbAlt' checkedLink={this.props.linkStateAlt} /> 高度
                            </label>
                        </div>
                        <span className='hidden-xs'>&nbsp;/&nbsp;</span>

                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbTakeDate' checkedLink={this.props.linkStateDate} /> 撮影日
                            </label>
                        </div>
                        <span className='hidden-xs'>&nbsp;/&nbsp;</span>

                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbTakeTime' checkedLink={this.props.linkStateTime} /> 撮影時間
                            </label>
                        </div>

                    </div>

                    <hr/>
                    <strong>出力形式</strong>

                    <div className='radio'>
                        <label>
                            <input type='radio' name='optionsType' id='radioCSVmandara' value='CSVmandara'
                                checked={this.props.outputType==="CSVmandara"}
                                onChange={this.props.handleChangeType} /> MANDARAマップエディタ用CSV
                        </label>
                    </div>
                    <div className='radio'>
                        <label>
                            <input type='radio' name='optionsType' id='radioCSVsjis' value='CSVsjis'
                                checked={this.props.outputType==="CSVsjis"}
                                onChange={this.props.handleChangeType} /> Windows Excelなど(CSV ShiftJIS)
                        </label>
                    </div>
                    <div className='radio'>
                        <label>
                            <input type='radio' name='optionsType' id='radioCSVutf8' value='CSVutf8'
                                checked={this.props.outputType==="CSVutf8"}
                                onChange={this.props.handleChangeType} /> Mac Numbersなど(CSV UTF-8)
                        </label>
                    </div>
                    <div className='radio'>
                        <label>
                            <input type='radio' name='optionsType' id='radioGeoJSON' value='GeoJSON'
                                checked={this.props.outputType==="GeoJSON"}
                                onChange={this.props.handleChangeType} /> GeoJSON
                        </label>
                    </div>

                    <br/>

                    <div>
                        <a href="" className='btn btn-primary' id="btnDownload" onClick={this.props.handleExport}>出力</a>
                    </div>
                </div>
            </div>
        );
    }
});
