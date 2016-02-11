var React = require('react/dist/react.min');

module.exports = {
    /** React用コンポーネント*/
    Component: React.createClass({
        propTypes: {
            nowIndex: React.PropTypes.number.isRequired,
            fileCount: React.PropTypes.number.isRequired,
            visible: React.PropTypes.bool.isRequired
        },
        /** 更新後*/
        /*
        componentDidUpdate: function() {
            module.exports.updateProgressBar(this.props.nowIndex, this.props.fileCount);
        },
        */
        /** 更新チェック。インデックスが1より大きい場合は更新しない*/
        /*
        shouldComponentUpdate: function() {
            return true; //this.props.nowIndex <= 1;
        },
        */
        /** 描画*/
        render: function() {
            // 非表示
            if (!this.props.visible) {
                return (<div></div>);
            }

            var per = Math.round((this.props.nowIndex+1) * 100 / this.props.fileCount);
            // 上限チェック
            if (per > 100) {
                per = 100;
            }

            var styles = {
                width: per+"%"
            };

            return (
                <div className='progress'>
                    <div key={'pgbar'+per} id='pgbar' className='progress-bar progress-bar-striped'
                        role='progressbar'
                        aria-valuemin='0'
                        aria-valuemax='100'

                        aria-valuenow={per}
                        style={styles}
                        >{styles.width}
                    </div>
                </div>
            );
        }
    }),
    /** プログレッシブバーの更新*/
    updateProgressBar: function(idx, count) {
        /*
        var per = Math.round(idx * 100 / count);
        // 上限チェック
        if (per > 100) {
            per = 100;
        }

        $('#pgbar')
            .attr({"aria-valuenow": per})
            .text(per+"%")
            .css("width", per+"%");
        */
    }
};
