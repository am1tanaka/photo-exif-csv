/**
 * ファイル出力
 * @copyright 2015 YuTanaka@AmuseOne
 */

var React = require('react/dist/react.min');
var encoding = require('encoding-japanese');

/**
 * データを渡して、指定の形式で保存する
 * @param array state appのstate
 * @param string enc エンコード。ShiftJISは'SJIS'。UTF8は'UTF8'
 * @return string 指定の文字エンコードしたCSVのバイト配列を返す
 */
module.exports.exportCSV = function(state, enc) {
    var body = "";
    var header = [];
    // ヘッダーの出力
    if (state.exportFileName) {
        header.push('"ファイル名"');
    }
    if (state.exportLatLng) {
        header.push('"緯度","経度"');
    }
    if (state.exportAlt) {
        header.push('"高度"');
    }
    if (state.exportDate) {
        header.push('"撮影日"');
    }
    if (state.exportTime) {
        header.push('"撮影時間"');
    }

    // データを処理する
    body = state.photoDatas.map(function(data) {
        var line = [];
        if (state.exportFileName) {
            line.push('"'+data.fileName+'"');
        }
        if (state.exportLatLng) {
            line.push(data.lat);
            line.push(data.lng);
        }
        if (state.exportAlt) {
            line.push(data.alt);
        }
        if (state.exportDate) {
            line.push('"'+data.date+'"');
        }
        if (state.exportTime) {
            line.push('"'+data.time+'"');
        }
        var temp = line.join(',')+"\r\n";
        return temp;
    });

    var csv = header.join(",")+"\r\n"+body.join("");
    var sjis_array = encoding.convert(encoding.stringToCode(csv), enc);
    var uint8_array = new Uint8Array(sjis_array);
    var blob = new Blob([uint8_array], { type: 'text/csv;charset='+enc });
    var ret = (window.URL || window.webkitURL).createObjectURL(blob);
    return ret;
};

/**
 * GeoJSON形式の文字列を返す
 * @param array 作成したEXIF情報
 * @return string 文字列化したデータ
 */
module.exports.exportGeoJSON = function(data) {
    return "";
};
