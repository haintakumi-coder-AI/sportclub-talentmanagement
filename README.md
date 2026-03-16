# 七帝柔道 評価シート プロトタイプ

ローカルで動く静的プロトタイプです。`index.html` をブラウザで開くと利用できます。

## 起動方法

1. `~/Desktop/shichitei-judo-proto/index.html` をブラウザで開く
2. ログイン画面で以下のアカウントを使用

- 管理者: `admin@judo.local` / `admin123`
- 記入者: `eval@judo.local` / `eval123`
- マネージャー: `manager@judo.local` / `manager123`
- 選手: `player01@judo.local` / `player123`

## 補足

- データは `localStorage` に保存されます。
- 記入者は月末に「月末振り返り / 翌月目標」を入力する運用を想定しています。
- ダッシュボードは月間カレンダーで、日付クリックで詳細と参加登録ができます（管理者/マネージャー）。
- リセットしたい場合はブラウザのローカルストレージを削除してください。
