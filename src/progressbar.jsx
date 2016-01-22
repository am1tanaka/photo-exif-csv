var React = require('react/dist/react.min');

module.exports = React.createClass({
    propTypes: {
        nowIndex: React.PropTypes.number.isRequired,
        fileCount: React.PropTypes.number.isRequired,
        visible: React.PropTypes.bool.isRequired
    },
    render: function() {
        // 非表示
        if (!this.props.visible) {
            return (<div></div>);
        }

        var per = Math.round((this.props.nowIndex+1)*100/this.props.fileCount);

        var styles = {
            width: per+"%"
        };

        return (
            <div className='progress'>
                <div className='progress-bar progress-bar-striped active'
                    role='progressbar'
                    aria-valuenow={per}
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={styles}
                    >{styles.width}
                </div>
            </div>
        );
    }
});
