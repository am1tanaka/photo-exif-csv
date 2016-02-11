var React = require('react/dist/react.min');

module.exports = React.createClass({
    propTypes: {
        nowIndex: React.PropTypes.number.isRequired,
        fileCount: React.PropTypes.number.isRequired,
        visible: React.PropTypes.bool.isRequired
    },
    /** 前回のパーセンテージ*/
    lastPercent: 0,
    /** パーセンテージ*/
    percent: 0,
    /** コンポーネント更新後に目的のパーセントを設定*/
    componentDidUpdate: function() {
        $('#pgbar').css('width', this.percent+'%');
    },
    /** 描画*/
    render: function() {
        var newper = 0;

        // 非表示
        if (!this.props.visible) {
            return (<div></div>);
        }

        // 進捗を更新する
        newper = Math.round((this.props.nowIndex+1)*100/this.props.fileCount);
        if (newper > this.percent) {
            this.lastPercent = this.percent;
        }
        else {
            this.lastPercent = newper;
        }
        this.percent = newper;

        // 開始幅を設定
        var styles = {
            width: this.lastPercent+"%"
        };

        return (
            <div className='progress'>
                <div className='progress-bar progress-bar-striped active'
                    id='pgbar'
                    key={'pgbar'+newper}
                    role='progressbar'
                    aria-valuenow={newper}
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={styles}
                    >{newper+'%'}
                </div>
            </div>
        );
    }
});
