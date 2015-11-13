var imgurClient = ImgurClient("13bc9b85c6b76f5", "1cb953277e5966a04b8ae469f5d3e2e54eb2ee74");
imgurClient.getPermissions();

document.addEventListener('DOMContentLoaded', function() {
  getWebcamPermissions();
}, false);

document.onclick = function(e){
  console.log('click', e);
  if(composeButtonClicked(e)){
    console.log('compose clicked')
    $('input[name=to]').onkeydown = function(){
      console.log('swag' + $('input[name=to]').value);
    }
  }else if(sendButtonClicked(e)){
    var emailInfo = getEmailInfo();
    if(emailInfo.to === "goats@yelp.com"){
      goatcept();
    }
  }
}

function goatcept(){
  new Audio('http://soundbible.com/grab.php?id=1570&type=mp3').play();
  gifshot.createGIF({}, function(obj) {
    if(!obj.error) {
      imgurClient.upload(obj.image);
    }
  });
}