var React = require('react');

module.exports = React.createClass({
    render: function() {
        return(
            <div className='panel panel-default'>
                <div className='panel-heading'>出力する項目にチェックを入れてください。</div>
                <div className='panel-body'>
                    <div className='form-inline'>
                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbFileName' /> ファイル名
                            </label>
                        </div>
                        &nbsp;/&nbsp;

                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbLatLng' /> 緯度・経度
                            </label>
                        </div>
                        &nbsp;/&nbsp;

                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbTakeDate' /> 撮影日
                            </label>
                        </div>
                        &nbsp;/&nbsp;

                        <div className='checkbox'>
                            <label>
                                <input type='checkbox' id='cbTakeTime' className='form-control' /> 撮影時間
                            </label>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
});
