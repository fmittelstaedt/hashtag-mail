$(document).ready(function() {
  var wrapper = $(".list-wrapper");
  
  for (var i = 0; i < hashtags.length; i++) {
    
    if (hashtags.length==1) {
           var list = $('<div class="list list-single well">').wrap('</div>').appendTo(wrapper);
         }
         else {
           var list = $('<div class="list list-multiple well">').wrap('</div>').appendTo(wrapper);
         }
    
    var list_header = $('<div class="list-header">').text(hashtags[i].tag).wrap('</div>').appendTo(list);
    
    var messages = $('<div class="messages">').wrap('</div>').appendTo(list);
    
    for (var x = 0; x < hashtags[i].emails.length; x++) {
      var email = emails[x];
      var message = $('<div class="message panel panel-default">').wrap('</div>').appendTo(messages);
      var panel_heading = $('<div class="panel-heading">').html("<b>From: </b>" + email.from.email + " </br><b>To: </b>" + email.to.length + puluralise(" recipient", email.to.length)).wrap('</div>').appendTo(message);
      var panel_body = $('<div class="panel-body">').wrap('</div>').appendTo(message);
      var body1 = $('<div class="text">').text(email.body).wrap('</div>').appendTo(panel_body);
      var body2 = $('<div class="text" style="display: none;">').text(email.body + "3495873985793").wrap('</div>').appendTo(panel_body);
      var button = $('<button type="button" style="float:right;" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-chevron-down"></span>').wrap('</button>').appendTo(panel_body);

      button.on("click", function() {
        button.parent().find(".text").toggle();
      });
      
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