var React = require('react');

module.exports = React.createClass({
    render: function() {
        return(
            <table className='table table-bordered'>
                <tbody>
                    <tr>
                        <td>この欄に読み込みたい写真をドラッグ＆ドロップするか、以下から指定してください。<br/>
                        <br/>
                            <input type='file' name='file-photo' multiple='multiple' />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
});
