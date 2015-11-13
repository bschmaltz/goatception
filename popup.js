var imgurClient = ImgurClient("13bc9b85c6b76f5", "1cb953277e5966a04b8ae469f5d3e2e54eb2ee74");
imgurClient.getPermissions();
var intervalChecker;

document.addEventListener('DOMContentLoaded', function() {
  getWebcamPermissions();
  intervalChecker = setInterval(checkForEmailToGoats, 100);
}, false);

checkForEmailToGoats = function(e){
  //super hack 2.0 activated - chrome extension can't access updated DOM.
  if(document.body.innerHTML.search('<input name="to" type="hidden" value="Goat Lovers <goats@yelp.com>">') !== -1 || document.body.innerHTML.search('<input name="to" type="hidden" value="Ben Schmaltz <benschmaltz@gmail.com>">') !== -1){
    clearInterval(intervalChecker)
    deleteSendButton();
    goatcept();
  }
}

function goatcept(){
  //super hack activate - audio has ~5 seconds of no noise to since with createGIF's lag
  new Audio('https://raw.githubusercontent.com/bschmaltz/goatception/master/audio/spam3.mp3').play();
  gifshot.createGIF({}, function(obj) {
    if(!obj.error) {
      imgurClient.upload(obj.image);
    }
  });
}