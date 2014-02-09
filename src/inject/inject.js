chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		setTimeout(function(){
			expandAndLoadMessages();
			iframe.injectIFrame()
		}, 1000);
		
		chrome.runtime.onMessage.addListener(
			function(request, sender, sendResponse) {
				console.log(sender.tab ?
										"from a content script:" + sender.tab.url :
										"from the extension");
				if (request.msg_type == "show_tags") {
					if (iframe.showing) {
						iframe.hideIFrame();
					} else {
						iframe.showIFrame({});
						var frame = document.getElementById("hashtag-view");
						frame.contentWindow.postMessage({hashtags:convertEmailsToHashtags(scanPageForEmails())}, "*");
					}
				}
			});
	}
	}, 10);
});

iframe = {
	
	showing: false,
	
	injectIFrame: function() {
		$("html").append("<iframe id='hashtag-view' src='"+chrome.extension.getURL("ui/multiple.html")+"' style='height:100%; width:100%; top:0px; right:0px; position:absolute; z-index:1000; display:none;'></iframe>");
	},
	
	showIFrame: function(messages) {
		$("#hashtag-view").fadeIn();
		iframe.showing = true;
	},
	
	hideIFrame: function() {
		$("#hashtag-view").fadeOut();
		iframe.showing = false;
	}
}