# line_callback_bot_for_gas
JokenのLINEBotコンテストで使うコードのひな型です。  

講習スライド  
https://speakerdeck.com/maguroalternative/linebotcourse

# textCallback.gs
テキストのオウム返しのコード。  
![image](https://github.com/maguro-alternative/line_callback_bot_for_gas/assets/71870614/8bc085fd-e31c-40ba-bf2b-718f1ac2bab5)

# imageCallback.gs
画像のオウム返しのコード。  
画像アップロードサービス、GyazoのAPIを使用。  

## Gyazo APIトークン取得手順  
下記リンクにアクセス。  
https://gyazo.com/api?lang=ja  
アカウント登録もすましておく。    

アプリケーションの登録をクリック。  
![image](https://github.com/maguro-alternative/line_callback_bot_for_gas/assets/71870614/5b8c8c5d-165a-406d-b431-7aa499e609cc)  

New Applicationをクリック。  
![image](https://github.com/maguro-alternative/line_callback_bot_for_gas/assets/71870614/0b510b81-f82d-4457-9569-f1c5ce927ee1)

以下の項目を適当に入力。  
![image](https://github.com/maguro-alternative/line_callback_bot_for_gas/assets/71870614/bc98a26f-1407-45e0-8fbf-1f8df489eb05)  

アプリケーションが作成されるのでそこをクリック。  

一番下の部分にtoken生成のボタンがあるので、クリック。    
![image](https://github.com/maguro-alternative/line_callback_bot_for_gas/assets/71870614/6a73e573-ed35-4625-9d62-ad07d0cc151e)  

表示されたのがトークンとなる。GYAZO_TOKENに当てはめる。

参考記事  

https://qiita.com/maguro-alternative/items/57a8781fdf2b2ef41a3e

# videoCallback.gs
動画のオウム返しのコード。  
YouTubeを使用。  
参考記事  

https://qiita.com/maguro-alternative/items/9b332bde6a1332be5f10

# stickerCallback.gs
スタンプのオウム返しのコード。
