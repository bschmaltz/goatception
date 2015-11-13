function ImgurClient(clientId, secretClientId){
  return {
    clientId: clientId,
    secretClientId: secretClientId,
    token: null,
    refreshToken: null,
    getPermissions: function(){
      var client = this;
      var params = QueryString();
      if(params.access_token){ //new token given in url. save and use it
        chrome.storage.local.set(
          {
            'goatceptionToken': params.access_token,
            'goatceptionRefreshToken': params.refresh_token
          }, 
          function(result){
            client.token = QueryString().access_token //in case gmail doesn't redirect
            client.refreshToken = QueryString().refresh_token
          }
        );
      }else{
        //check if local token is still valid'
        chrome.storage.local.get(['goatceptionToken', 'goatceptionRefreshToken'], function(result){
          if(result.goatceptionToken){
            client.token = result.goatceptionToken;
            client.refreshToken = result.goatceptionRefreshToken;
          }else{
            authorize();
          }
        });

        function authorize(){
          //redirect to imgur for authorization
          var url = "https://api.imgur.com/oauth2/authorize?client_id="+client.clientId+"&response_type=token";
          window.location.replace(url);
        }
        
      }
    },

    upload: function(gif){
      client = this;
      $.ajax({
        url: 'https://api.imgur.com/3/image',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.token,
          Accept: 'application/json'
        },
        data: {
          image: gif.substring(21),
          type: 'base64'
        },
        success: function(result) {
          console.log("upload success");
          var id = result.data.id;
          window.location = 'https://imgur.com/gallery/' + id;
        },
        error: function(e){
          if(e.status === 403){
            console.log("token expired")
            chrome.storage.local.remove(['goatceptionToken', 'goatceptionRefreshToken'], function(result){
              console.log("try refreshing token and uploading");
              $.ajax({
                url: 'https://api.imgur.com/oauth2/token',
                method: 'POST',
                headers: {
                  Accept: 'application/json'
                },
                data: {
                  refresh_token: client.refreshToken,
                  client_id: client.clientId,
                  client_secret: client.secretClientId,
                  grant_type: refresh_token
                },
                success: function(res){
                  console.log('refreshed worked...retry upload');
                  chrome.storage.local.set(
                    {
                      'goatceptionToken': res.access_token,
                      'goatceptionRefreshToken': res.refresh_token
                    }, 
                    function(result){
                      client.token = res.access_token //in case gmail doesn't redirect
                      client.refreshToken = res.refresh_token
                      client.upload(gif);
                    }
                  );
                },
                error: function(er){
                  console.log('could not refresh'+er);
                }
              });
            });
          }
          console.log("error uploading to Imgur", e);
        }
      });
    }
  };
}