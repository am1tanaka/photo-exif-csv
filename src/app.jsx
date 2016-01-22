var React = require('react/dist/react.min');
var ReactDOM = require('react-dom/dist/react-dom.min');
var Header = require('./header.jsx');
var DaD = require('./dad.jsx');
var ConfigMenu = require('./config-panel.jsx');
var Table = require('./table.jsx');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
// hMatoba/piexifjs https://github.com/hMatoba/piexifjs
var piexif = require('./libs/piexif.js');
var convertData = require('./convert-csv-geojson.js');

var VERSION = "Ver160121.1";

/**
 * 写真データから指定のデータを切り出すブラウザアプリトップ
 */
var Top = React.createClass({
    mixins: [LinkedStateMixin],
    /** データ*/
    getDefaultProps: function() {
        return {
            initDatas: []
            /*
                {
                    fileName: 'IMG0000.jpg',
                    lat: 35,
                    lng: 139,
                    date: '2015/12/7',
                    time: '16:30'
                },
                {
                    fileName: 'IMG0001.jpg',
                    lat: 35.5,
                    lng: 139.5,
                    date: '2015/12/7',
                    time: '16:31'
                }
            ]*/
        };
    },
    /** 読み込みオブジェクト*/
    reader: null,
    /** 状態の定義*/
    getInitialState: function() {
            return {
                exportFileName: true,
                exportLatLng: true,
                exportAlt: true,
                exportDate: true,
                exportTime: true,
                // CSVsjis CSVutf8 GeoJSON
                outputType: "CSVmandara",
                /* fileName:写真名 lat:緯度 lng:経度 date=撮影日 time=撮影時間*/
                photoDatas: this.props.initDatas,     // 読み込んんだ写真のデータ
            };
    },
    /* 読み込み中インデックス*/
    nowIndex: 0,
    /* ファイルリスト*/
    files: [],
    /** 選択してあったファイルを削除*/
    handleClearFiles : function() {
        this.nowIndex = 0;
        this.files = [];
        this.setState({photoDatas: []});
    },
    /** 指定のデータをphotoDatasに追加*/
    appendPhotoData: function(data) {
        // 同じファイル名のものがあったら上書き
        var photos = this.state.photoDatas;
        for (var i=0 ; i<photos.length ; i++) {
            if (photos[i].fileName == data.fileName) {
                photos[i] = data;
                this.setState({photoDatas: photos});
                return;
            }
        }
        // 新しくデータを追加
        var newdt = this.state.photoDatas.concat([data]);
        this.setState({photoDatas: newdt});
    },
    /** ファイルリストから写真を読み込む*/
    readPhotos: function(fls) {
        if (fls.length > 0) {
            this.nowIndex = 0;
            this.files = fls;
            // 読み込み開始
            this.readExif();
        }
    },
    /** ファイルを読み込みながら解析していく*/
    readExif: function() {
        // オーバーしていたら終了
        if (this.nowIndex >= this.files.length) {
            alert("読み込みを完了しました。");
            return;
        }
        // 読み込み
        this.reader.readAsDataURL(this.files[this.nowIndex]);
        this.nowIndex++;
    },
    /** 緯度・経度を小数点表記に変換して返す*/
    convLatLng: function(dt) {
        return (dt[0][0]/dt[0][1])+(dt[1][0]/(dt[1][1]*60))+(dt[2][0]/(dt[2][1]*3600));
    },
    /** 高度を少数表記にして返す*/
    convAlt: function(dt) {
        return dt[1]==0 ? 0 : dt[0]/dt[1];
    },
    /** 日付を返す*/
    getDate: function(dt) {
        return dt.split(' ')[0].replace(/:/g, "/");
    },
    /** 時間を返す*/
    getTime: function(dttm) {
        return dttm.split(' ')[1];
    },
    /** 出力ボタンの処理*/
    handleExportData: function() {
        var csv = "";
        var enc = "utf-8";
        var ext = "csv";
        switch(this.state.outputType) {
            case "CSVmandara":
            csv = convertData.exportCSV(this.state, "MANDARA");
            enc = "shift_jis";
            break;
            case "CSVsjis":
            csv = convertData.exportCSV(this.state, "SJIS");
            enc = "shift_jis";
            break;
            case "CSVutf8":
            csv = convertData.exportCSV(this.state, "UTF8");
            break;
            case "GeoJSON":
            csv = convertData.exportGeoJSON(this.state);
            ext = "geojson";
            break;
        }
        // ダウンロード
        $('#btnDownload').attr({
            download: "download."+ext,
            href: csv
        });
    },
    /** 出力形式のラジオボタンの変更*/
    handleChangeType: function(e) {
        this.setState({outputType: e.currentTarget.value});
    },
    /** コンポーネントの準備が完了したら、各種イベントなどを設定*/
    componentDidMount: function() {
        var that = this;
        // リーダーの設定
        if (this.reader == null) {
            this.reader = new FileReader();
            this.reader.onloadend = function(e) {
                try {
                    var exifObj = piexif.load(e.target.result);
                }
                catch (e) {
                    alert("Exifの読み込みに失敗しました。写真データが破損している可能性があります。");
                    return;
                }
                /*
                console.log(exifObj.GPS[piexif.GPSIFD.GPSLatitude]);
                console.log(exifObj.GPS[piexif.GPSIFD.GPSLongitude]);
                console.log(exifObj.GPS[piexif.GPSIFD.GPSAltitude]);
                console.log(exifObj.Exif[piexif.ExifIFD.DateTimeOriginal]);
                */
                that.appendPhotoData({
                    fileName: that.files[that.nowIndex-1].name,
                    lat: that.convLatLng(exifObj.GPS[piexif.GPSIFD.GPSLatitude]),
                    lng: that.convLatLng(exifObj.GPS[piexif.GPSIFD.GPSLongitude]),
                    alt: that.convAlt(exifObj.GPS[piexif.GPSIFD.GPSAltitude]),
                    date: that.getDate(exifObj.Exif[piexif.ExifIFD.DateTimeOriginal]),
                    time: that.getTime(exifObj.Exif[piexif.ExifIFD.DateTimeOriginal])
                });
                /*
                for(var ifd in exifObj) {
                    if (ifd == "thumbnail") {
                        continue;
                    }
                    console.log("-"+ifd);
                    for (var tag in exifObj[ifd]) {
                        console.log("  ["+tag+"]"+piexif.TAGS[ifd][tag]["name"]+":"+exifObj[ifd][tag]);
                    }
                }
                */
                // 再読み込み
                that.readExif();
            };
        }
    },
    /** 描画*/
    render: function() {
        return (
            <div className='container'>
                <Header ver={VERSION} />
                <DaD
                    appendPhotoData={this.appendPhotoData}
                    readPhotos={this.readPhotos}
                    clearPhotos={this.handleClearFiles}
                    />
                <ConfigMenu
                    linkStateFileName={this.linkState('exportFileName')}
                    linkStateLatLng={this.linkState('exportLatLng')}
                    linkStateAlt={this.linkState('exportAlt')}
                    linkStateDate={this.linkState('exportDate')}
                    linkStateTime={this.linkState('exportTime')}
                    handleChangeType={this.handleChangeType}
                    outputType={this.state.outputType}
                    handleExport={this.handleExportData}
                    visible={this.state.photoDatas.length > 0}
                />
                <Table datas={this.state}
                    visible={this.state.photoDatas.length > 0}
                    />
            </div>
        );
    }
});

ReactDOM.render(
    <Top />,
    document.getElementById('photo-exif-picker')
);
