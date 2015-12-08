var React = require('react');

module.exports = React.createClass({
    /* props定義*/
    propTypes: {
        linkStateFileName: React.PropTypes.object.isRequired,
        linkStateLatLng: React.PropTypes.object.isRequired,
        linkStateAlt: React.PropTypes.object.isRequired,
        linkStateDate: React.PropTypes.object.isRequired,
        linkStateTime: React.PropTypes.object.isRequired,
        linkStateCSVsjis: React.PropTypes.object.isRequired,
        linkStateCSVutf8: React.PropTypes.object.isRequired,
        linkStateGeoJSON: React.PropTypes.object.isRequired,
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
                        &nbsp;/&nbsp;

                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbLatLng' checkedLink={this.props.linkStateLatLng} /> 緯度・経度
                            </label>
                        </div>
                        &nbsp;/&nbsp;

                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbAlt' checkedLink={this.props.linkStateAlt} /> 高度
                            </label>
                        </div>
                        &nbsp;/&nbsp;

                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbTakeDate' checkedLink={this.props.linkStateDate} /> 撮影日
                            </label>
                        </div>
                        &nbsp;/&nbsp;

                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbTakeTime' checkedLink={this.props.linkStateTime} /> 撮影時間
                            </label>
                        </div>

                    </div>

                    <div className='form-inline'>
                        <div className='radio'>
                            <label>
                                <input type='radio' name='optionsType' id='radioCSVsjis' value='csv' checkedLink={this.props.linkStateCSVsjis} /> CSV(ShiftJIS)
                            </label>
                        </div>
                        &nbsp;/&nbsp;
                        <div className='radio'>
                            <label>
                                <input type='radio' name='optionsType' id='radioCSVutf8' value='csv' checkedLink={this.props.linkStateCSVutf8} /> CSV(UTF-8)
                            </label>
                        </div>
                        &nbsp;/&nbsp;
                        <div className='radio'>
                            <label>
                                <input type='radio' name='optionsType' id='radioGeoJSON' value='geojson' checkedLink={this.props.linkStateGeoJSON} /> GeoJSON
                            </label>
                        </div>
                    </div>

                    <br/>

                    <div>
                        <button type='button' className='btn btn-primary' onClick={this.props.handleExport}>出力</button>
                    </div>
                </div>
            </div>
        );
    }
});
