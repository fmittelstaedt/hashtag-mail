// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	chrome.pageAction.show(sender.tab.id);
  sendResponse();
});


chrome.pageAction.onClicked.addListener(function(tab){
  console.log("got show tags.");
  console.log(tab.id);
  chrome.tabs.sendMessage(tab.id, {msg_type: "show_tags"}, function(response) {
  });
});