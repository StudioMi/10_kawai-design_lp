## 使い方
https://pagecraft.atlassian.net/wiki/spaces/IS/pages/6881299/AstroShotFormat

## 環境を複製してローカルで作業を開始するまで
( 1 ) このページの下記UIから**このリポジトリを別名(担当する案件名)で複製**する


![スクリーンショット 2023-07-12 12 23 24](https://github.com/StudioMi/99_PageCraft_AstroShotFormat/assets/120582764/623c8f74-25de-413e-8f4f-b3423a3005dc)


( 2 ) 自身のローカルディレクトリに作業用ディレクトリを作成し、複製したリポジトリをcloneする
(例:
desktop/works/案件名/)
のようにディレクトリを作成し、本環境をcloneする

( 3 ) ターミナルなどから作業用のローカルディレクトリにアクセスし、ライブラリをインストールする
```
npm install
```
を実行

( 4 ) 開発開始
ターミナルなどから作業用のローカルディレクトリにアクセスし、
```
npm run dev
```
を実行

( 5 ) ビルド(納品用)データが必要な場合は
```
npm run build
```
を実行(ビルドデータはdist/に生成される)
