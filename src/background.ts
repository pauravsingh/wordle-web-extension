chrome.runtime.onInstalled.addListener(function () {
    // Remove all existing rules
    chrome.declarativeContent.onPageChanged.removeRules(function () {
        // Add rule to make extension available only for the NYTimes Wordle page
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {urlEquals: 'https://www.nytimes.com/games/wordle/index.html'},
                })
            ],
            actions: [new chrome.declarativeContent.ShowAction]
        }]);
    });
});
