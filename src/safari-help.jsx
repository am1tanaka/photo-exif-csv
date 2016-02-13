var React = require('react/dist/react.min');

/** Safari用のコメント出力*/
module.exports = React.createClass({
    render: function() {
        // Safariかを判定
        var ua = window.navigator.userAgent.toLowerCase();
        if (    (ua.indexOf('chrome') == -1)
            &&  (ua.indexOf('safari') >= 0)) {
            return (
                <p className='bg-warning text-warning'>
                    Google ChromeやFirefoxでの利用を推奨します。
                    <br />
                    Safariではファイル出力が行われません。
                    画面に表示される文字列をコピーして、
                    テキストエディタなどに貼り付けてCSVファイルとして保存してご利用ください。
                </p>);
        }

        return <div></div>;
    }
});
