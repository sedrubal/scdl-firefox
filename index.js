var data = require("sdk/self").data;
var notifications = require("sdk/notifications");
var self = require("sdk/self");
let { Cc, Ci } = require('chrome');
var contextMenu = require("sdk/context-menu");
var prefs = require("sdk/simple-prefs").prefs;
var pkg = require("./package.json");

var menuItem = contextMenu.Item({
	label: "Download this song",
  context: [
		contextMenu.URLContext("*.soundcloud.com"),
		contextMenu.SelectorContext("a"),
	],
  contentScript: 'self.on("click", function () {' +
                 '  var url = document.activeElement.href;' +
                 '  self.postMessage(url);' +
                 '});',
  image: self.data.url("./icon.svg"),
	accessKey: "d",
	onMessage: function (url) {
		console.log("Downloading " + url);

		// if you know a better way to run scdl, let me know
		var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
		file.initWithPath(prefs.scdl_path);
		var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
		process.init(file);
		var args = ["-l", url];
		process.run(false, args, args.length); // blocking, argv, argc
		// console.log(file.exitValue);
		// TODO make a feedback, if it was successful...
		// e.g. https://techoverflow.net/blog/2014/02/02/Thunderbird-addon-call-eternal-prog/
		console.log("Successfully downloaded " + url);
		notifications.notify({
			title: pkg.title,
			text: "Sound was downloaded successfully.\n" + url,
			iconURL: self.data.url("./icon.svg")
		});
	}
}
);
