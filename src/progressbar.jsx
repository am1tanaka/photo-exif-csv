var React = require('react/dist/react.min');

module.exports = React.createClass({
    propTypes: {
        nowIndex: React.PropTypes.number.isRequired,
        fileCount: React.PropTypes.number.isRequired
    },
    render: function() {
        return (
            <div className='progress'>
                <div className='progress-bar progress-bar-striped active'
                    role='progressbar'
                    aria-valuenow='50'
                    aria-valuemin='0'
                    aria-valuemax='100'
                    >プログレスバー
                </div>
            </div>
        );
    }
});
