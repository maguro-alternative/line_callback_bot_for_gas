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

const YOUTUBE_URL = 'https://www.youtube.com/watch?v='

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
      if(event.message.type === 'video'){
        // 返信するフラグを立てる
        replyFlag = True
        const videoBlob = getContents(event.message.id);

        // YouTubeに動画をアップロード
        const video = YouTube.Videos.insert(
          {
            snippet: {
              title: 'LINEBotからの動画',
              description: 'LINEBotから送信された動画です。'
            },
            status: {
              privacyStatus: 'unlisted'
            }
          },
          'snippet,status',
          videoBlob.getBlob()
        );

        // アップロードした動画のURLを取得
        const videoUrl = YOUTUBE_URL + video.id;

        messages.push({
          'type': 'text',
          'text': '動画をアップロードしました。\n' + videoUrl
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

//lineから送信された動画をバイナリデータで取得
function getContents(messageId) {
  const contentsUrl = LINE_CONTENTS_ENDPOINT + messageId + '/content'
  return UrlFetchApp.fetch(contentsUrl, {
      "method": "get",
      'headers': HEADER
  });
}
