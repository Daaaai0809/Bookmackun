# Bookmackun (ぶっくまっくん)

## About
Discord上でWebページのブックマークを管理できるDiscord Botです。  

- 導入は下のリンクから  
https://discord.com/oauth2/authorize?client_id=1228743779222163598&permissions=912680712256&scope=bot

## How to use ?
Discordチャット上のコマンドを利用してブックマークの管理を行います。  
全てのコマンドは他のコマンドを侵略しないために`/bm`から始まります。  

### コマンド一覧
- `/bm add [url]` : ブックマークの追加を行います。ブックマークに追加したいページのURLを入力してください。
- `/bm list` : 今現在登録されているブックマークの一覧を表示します。すでに既読されているもの、有効期限が切れているものは表示されません。表示形式は以下の通りです。
```plain text
YYYY/mm/DDまでに登録された未読ブックマーク一覧

[id]　|　[url] 

1　|　https://example.com
2　|　https://example.com
3　|　https://example.com
```
- `/bm read [id]` : 登録されたブックマークを既読にします。既読にするブックマークのIDを入力してください。
- `/bm remove [id]` : ブックマークを削除します。readと同様ブックマークのIDを入力してください。
- `/bm help` : このBotの使い方を表示します。

## 注意事項
- 5日以上経過したブックマークは自動的に削除されます
- 一度既読にしたものは再度未読にすることができません
- 同じURLのブックマークは登録できません

## 今後実装予定の機能
- リマインダー
- ID指定としているものをSelect形式で選択できるように

## お問い合わせ
- [Kabos](https://x.com/daradara_kabos)(X) のDMまでお願いします
