chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "canvas_script.js"});
  chrome.browserAction.setBadgeText({text: "on", tabId: tab.id } );
});
