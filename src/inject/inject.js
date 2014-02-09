chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		setTimeout(function(){
			hashtags.injectIFrame()
		}, 1000);
	}
	}, 10);
});

hashtags = {
	
	injectIFrame: function() {
		$("html").append("<iframe id='hashtag-view' src='"+chrome.extension.getURL("ui/single.html")+"' style='height:100%; width:100%; top:0px; right:0px; position:absolute; z-index:1000; display:none;'></iframe>");
	},
	
	showIFrame: function() {
		$("#hashtag-view").fadeIn();
	},
	
	hideIFrame: function() {
		$("#hashtag-view").fadeOut();
	}
}