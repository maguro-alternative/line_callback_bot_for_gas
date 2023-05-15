// LINEBotのチャネルアクセストークン
const LINE_BOT_TOKEN = ""
// LINE APIの基本となるURL
const LINE_BASE_URL = 'https://api.line.me/v2/bot';
// LINEBotの認証ヘッダー
const HEADER = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + LINE_BOT_TOKEN,
}

function doPost(e) {
  // 返信するかのフラグ
  const replyFlag = false
  try{
    // イベント内容を展開
    const json = JSON.parse(e.postData.contents);
    
    // 送られてきたリクエストは配列で来るのでforEachで一つ一つ処理
    json.events.forEach(function(event) {
      // リプライトークン(どのメッセージに返信するか)を取得
      const reply_token= event.replyToken;

      // 送信するメッセージ
      let messages = []

      // 内容がテキストメッセージだった場合
      if(event.message.type === 'text'){
        // 返信するフラグを立てる
        replyFlag = True
        messages.push({
          'type': 'text',
          'text': event.message.text
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
