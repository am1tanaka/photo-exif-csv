/**
 * ファイル出力
 * @copyright 2015 YuTanaka@AmuseOne
 */

var React = require('react');
var excoding = require('encoding-japanese');

/**
 * データを渡して、指定の形式で保存する
 * @param array 作成したEXIF情報
 * @param string enc エンコード。ShiftJISは'SJIS'。UTF8は'UTF8'
 * @return string 指定の文字エンコードしたCSV文字列
 */
module.exports.exportCSV = function(data, enc) {
    return "";
};

/**
 * GeoJSON形式の文字列を返す
 * @param array 作成したEXIF情報
 * @return string 文字列化したデータ
 */
module.exports.exportGeoJSON = function(data) {
    return "";
};
