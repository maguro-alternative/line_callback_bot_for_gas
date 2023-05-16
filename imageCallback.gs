// LINEBotのチャネルアクセストークン
const LINE_BOT_TOKEN = ""
// LINE APIの基本となるURL
const LINE_BASE_URL = 'https://api.line.me/v2/bot';
// 送付されているファイルを取得するURL
const LINE_CONTENTS_URL = 'https://api-data.line.me/v2/bot/message/';
// LINEBotの認証ヘッダー
const HEADER = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + LINE_BOT_TOKEN,
}

// 画像アップロードサービスGayzoのアクセストークン
const GYAZO_TOKEN = ""
// アップロード用のURL
const GYAZO_UPLOAD_URL = "https://upload.gyazo.com/api/upload"

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

      // 画像が送信された場合
      if(event.message.type === 'image'){
        // 返信するフラグを立てる
        replyFlag = True
        const image = getContents(event.message.id);
        const gyazo = JSON.parse(gyazoup(image.getBlob()));

        messages.push({
            'type': 'image',
            'originalContentUrl': gyazo.url,
            'previewImageUrl': gyazo.url
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

//lineから送信された画像をバイナリデータで取得
function getContents(messageId) {
  const contentsUrl = LINE_CONTENTS_URL + messageId + '/content'
  return UrlFetchApp.fetch(contentsUrl, {
      "method": "get",
      'headers': HEADER
  });
}
//バイナリデータの画像をgyazoに送信し、urlを取得
function gyazoup(image){
  const options  = {
    "method": "post",
    "payload": {
      "access_token": GYAZO_TOKEN, //gyazoのアクセストークン
      "imagedata": image
    }
  };
  
  return UrlFetchApp.fetch(
    GYAZO_UPLOAD_URL,
    options
  );
}
