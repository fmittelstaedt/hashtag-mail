$(document).ready(function() {
  var wrapper = $(".list-wrapper");
  
  for (var i = 0; i < hashtags.length; i++) {
    var list = $('<div class="list list-multiple well">').wrap('</div>').appendTo(wrapper);
    
    var list_header = $('<div class="list-header">').text(hashtags[i].tag).wrap('</div>').appendTo(list);
    
    var messages = $('<div class="messages">').wrap('</div>').appendTo(list);
    
    for (var x = 0; x < hashtags[i].emails.length; x++) {
      var email = emails[x];
      var message = $('<div class="message panel panel-default">').wrap('</div>').appendTo(messages);
      var panel_heading = $('<div class="panel-heading">').html("<b>From: </b>" + email.from.email + " </br><b>To: </b>" + email.to.length + puluralise(" recipient", email.to.length)).wrap('</div>').appendTo(message);
      var panel_body = $('<div class="panel-body">').text(email.body).wrap('</div>').appendTo(message);
    }
  }

  function puluralise(word, count) {
    if (count > 1) {
      return word + "s";
    } else {
      return word;
    }
  }
});