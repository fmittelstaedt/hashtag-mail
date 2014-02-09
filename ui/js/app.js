$(document).ready(function() {
  window.addEventListener("message", function(evt) {
    console.log("should update content.");

    var hashtags = evt.data.hashtags;

    var wrapper = $(".list-wrapper");
    wrapper.empty();

    var recipients = {}

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
        var email = hashtags[i].emails[x];

        recipients[email.from.email] = email.from.name;

        var message = $('<div class="message panel panel-success" data-message-email="' + email.from.email + '">').wrap('</div>').appendTo(messages);
        var panel_heading = $('<div class="panel-heading">').wrap('</div>').appendTo(message);
  
        var avatar = $('<img id="avatar" src="' + email.profile_img + '"></img>').appendTo(panel_heading)
        var contacts = $('<div id="contacts"></div>').appendTo(panel_heading)
      var to = $("<b>From: </b>"+"<a href='#' data-toggle='tooltip' data-placement='right' title data-original-title='" + email.from.email + "'>" + email.from.name + " </a>").appendTo(contacts)
      to.tooltip()
      var from = $("<b>To: </b>"+"<a href='#' data-toggle='tooltip' data-placement='right' title data-original-title='" + separate(email.to) + "'>" + email.to.length + puluralise(" recipient", email.to.length) + " </a>").appendTo(contacts)
      from.tooltip()
      //contacts.append("<b>To: </b>" + "<a href='#' data-toggle='tooltip' data-placement='right' title data-original-title=" + email.to.length + puluralise(" recipient", email.to.length)+ ">" + email.from.name + " </a>")
  
        var panel_body = $('<div class="panel-body">').wrap('</div>').appendTo(message);
      var body1 = $('<div class="text">').text(email.paragraph +"...").wrap('</div>').appendTo(panel_body);
        var body2 = $('<div class="text" style="display: none;">').text(email.body).wrap('</div>').appendTo(panel_body);
  
        var extras = $('<div class="list-extra">').wrap('</div>').appendTo(panel_body);

        var datetime = $('<div id="datetime">').text(email.datetime).wrap('</div>').appendTo(extras);
        var button = $('<button type="button" style="float:right;" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-chevron-down"></span>').wrap('</button>').appendTo(extras);
          button.on("click", function() {
          	if ($(this).find("span").hasClass("glyphicon-chevron-down")) {
          	  $(this).find("span").removeClass('glyphicon-chevron-down');
          	  $(this).find("span").addClass('glyphicon-chevron-up');
          	} else {
          	  $(this).find("span").removeClass('glyphicon-chevron-up');
          	  $(this).find("span").addClass('glyphicon-chevron-down');
          	}
            $(this).parent().parent().find(".text").toggle();
        });  
      }
    }

    var footer = $("#footer .nav-pills")
    for(var recipient in recipients) {
      var pill = $('<li data-email=' + recipient + '"><a href="#">' + recipients[recipient] + '</a></li>')
      var person = pill.wrap('</div>').appendTo(footer);
      pill.on("click", function() {
        var email = $(this).data("email");
        // maybe comment
        $(".message").show();
        $(".message").filter(function() {
          return $(this).data("message-email") != email.substring(0, email.length - 1)
        }).toggle();
        $(".nav li").removeClass("active")
        $(this).addClass("active")
      });
    }

    function puluralise(word, count) {
      if (count > 1) {
        return word + "s";
      } else {
        return word;
      }
  }
  
  function separate(recips) {
    var l = '';
     for (var i = 0; i < recips.length; i++) {
       console.log(recips[i])
    l =  l + recips[i].name + ',';
  }
  return l;
    }
  }, false);
  
});