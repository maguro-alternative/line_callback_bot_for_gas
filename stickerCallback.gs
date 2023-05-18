// LINEBotのチャネルアクセストークン
const LINE_BOT_TOKEN = ""
// LINE APIの基本となるURL
const LINE_BASE_URL = 'https://api.line.me/v2/bot';
// 送付されているファイルを取得するURL
const LINE_CONTENTS_URL = 'https://api-data.line.me/v2/bot/message/';
// LINEスタンプのURL
const LINE_STICKER_IMAGE_URL = "https://stickershop.line-scdn.net/stickershop/v1/sticker/"
// LINEBotの認証ヘッダー
const HEADER = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + LINE_BOT_TOKEN,
}

function doPost(e) {
  // 返信するかのフラグ
  let replyFlag = false
  try{
    // イベント内容を展開
    const json = JSON.parse(e.postData.contents);
    
    // 送られてきたリクエストは配列で来るのでforEachで一つ一つ処理
    json.events.forEach(function(event) {
      // リプライトークン(どのメッセージに返信するか)を取得
      const reply_token= event.replyToken;

      // 送信するメッセージ
      let messages = []

      // 画像が送信された場合
      if(event.message.type === 'sticker'){
        // 返信するフラグを立てる
        replyFlag = true
        const sticker_url = LINE_STICKER_IMAGE_URL + event.message.stickerId + "/iPhone/sticker_key@2x.png"

        messages.push({
            'type': 'image',
            'originalContentUrl': sticker_url,
            'previewImageUrl': sticker_url
        })
      }
      
      // 返信する場合
      if(replyFlag){
        // メッセージをpostリクエストでLINEのAPIサーバーに送信
        UrlFetchApp.fetch(LINE_BASE_URL + "/message/reply", {
          'headers': HEADER,
          'method': 'post',
          'payload': JSON.stringify({
            'replyToken': reply_token,
            'messages': messages,
          }),
        });
      }
    });
  }catch(e){
    if(e=="TypeError: Cannot read properties of undefined (reading 'contents')") return
    return
  }
}
