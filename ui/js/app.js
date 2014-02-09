$(document).ready(function() {
  window.addEventListener("message", function(evt) {
    
    Colors = {};
    Colors.names = {
      lightblue: "#add8e6",
      lightcyan: "#e0ffff",
      lightgreen: "#90ee90",
      lightgrey: "#d3d3d3",
      lightpink: "#ffb6c1",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
    };
    
    Colors.random = function() {
        var result;
        var count = 0;
        for (var prop in this.names)
            if (Math.random() < 1/++count)
               result = prop;
        return result;
    };
    
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
        
        recipients[email.from.email] = {name: email.from.name, color: Colors.random()};

        var message = $('<div class="message panel panel-success" data-message-email="' + email.from.email + '">').wrap('</div>').appendTo(messages);
        var panel_heading = $('<div class="panel-heading">').wrap('</div>').appendTo(message);
  
        var avatar = $('<img id="avatar" src="' + email.profile_img + '"></img>').appendTo(panel_heading)
        var contacts = $('<div id="contacts"></div>').appendTo(panel_heading)
        var to = $("<b>From: </b>" + email.from.email + " </br>").appendTo(contacts)
        contacts.append("<b>To: </b>" + email.to.length + puluralise(" recipient", email.to.length))
  
        var panel_body = $('<div class="panel-body">').wrap('</div>').appendTo(message);
        var body1 = $('<div class="text">').text(email.body.substring(0,100)+"...").wrap('</div>').appendTo(panel_body);
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
    
    $.each($('.message'), function() {
      var email = $(this).data("message-email")
      console.log($(this).find(".panel-heading").attr('style', 'background-color: ' + recipients[email].color + ' !important'));
    });

    var footer = $("#footer .nav-pills")
    for(var recipient in recipients) {
      var pill = $('<li data-email=' + recipient + '"><a href="#">' + recipients[recipient].name + '</a></li>')
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
  }, false);
  
});