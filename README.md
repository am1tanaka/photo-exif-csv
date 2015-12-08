# photo-exif-picker
ドラッグ＆ドロップした写真から緯度経度や時間など、指定のEXIFデータを取り出してCSVやGeoJSONで返す。クライアントサイドで動かす。

# 利用ライブラリ
- Hiroaki Matoba氏 piexifjs https://github.com/hMatoba/piexifjs
  - 写真データからExifを読み出したり、書き込むことができるライブラリ
  - MIT License https://github.com/hMatoba/piexifjs/blob/master/LICENSE.txt
- Twitter Inc. Bootstrap3
  - MIT License https://github.com/twbs/bootstrap/blob/master/LICENSE
- polygonplanet encoding.js https://github.com/polygonplanet/encoding.js
  - Shift-JISとUTF-8の文字エンコード変換に利用。他の文字エンコードにも対応し、半角や全角などの変換も可能
  - MIT
