var React = require('react');

module.exports = React.createClass({
    render: function() {
        return(
            <div>
                <div className='h1'>
                    photo-exif-picker <span className='small'>{this.props.ver}</span>
                </div>
                <div className='help-block'>
                    写真のEXIFからデータを切り出して、CSVかGeoJSONでダウンロードします。
                </div>
            </div>
        );
    }
});
