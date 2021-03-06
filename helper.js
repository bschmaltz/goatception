function getWebcamPermissions(){
  navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);
  navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function() {},
      function(err) {
        console.log("An error occured! " + err);
      }
    );
}

function deleteSendButton(){
  document.body.innerHTML = document.body.innerHTML.replace('>Send<\/div>', '');
}

function sendButtonClicked(e){
  return e.srcElement.innerText === "Send";
}

function composeButtonClicked(e){
  return e.srcElement.innerText === "COMPOSE";
}

function getEmailInfo(){
  var emailInfo = {};
  emailInfo.to = $('input[name=to]').value;
  emailInfo.subject = $('input[name=subject]').value;
  emailInfo.message = $('div[aria-label="Message Body"]').innerHTML;
  return emailInfo
}

function QueryString() {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  if(window.location.hash.indexOf('&')!== -1){
    var pairs = window.location.hash.substring(window.location.hash.indexOf('&')+1).split("&");
    for(var i=0; i<pairs.length; i++){
      var pair = pairs[i].split("=")
      query_string[pair[0]] = pair[1];
    }
  }
  return query_string;
};

function exit( status ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // +      input by: Paul
    // +   bugfixed by: Hyam Singer (http://www.impact-computing.com/)
    // +   improved by: Philip Peterson
    // +   bugfixed by: Brett Zamir (http://brettz9.blogspot.com)
    // %        note 1: Should be considered expirimental. Please comment on this function.
    // *     example 1: exit();
    // *     returns 1: null

    var i;

    if (typeof status === 'string') {
        alert(status);
    }

    window.addEventListener('error', function (e) {e.preventDefault();e.stopPropagation();}, false);

    var handlers = [
        'copy', 'cut', 'paste',
        'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
        'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
        'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
    ];

    function stopPropagation (e) {
        e.stopPropagation();
        // e.preventDefault(); // Stop for the form controls, etc., too?
    }
    for (i=0; i < handlers.length; i++) {
        window.addEventListener(handlers[i], function (e) {stopPropagation(e);}, true);
    }

    if (window.stop) {
        window.stop();
    }

    throw '';


}


