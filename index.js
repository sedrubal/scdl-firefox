var data = require("sdk/self").data;

var self = require("sdk/self");
let { Cc, Ci } = require('chrome');

var contextMenu = require("sdk/context-menu");
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
  image: self.data.url("./icon-16.png"),
	accessKey: "d",
	onMessage: function (url) {
		console.log(url);

		// if you know a better way to run scdl, let me know
		var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
		file.initWithPath("/usr/bin/scdl");
		var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
		process.init(file);
		var args = ["-l", url];
		process.run(false, args, args.length); // blocking, argv, argc
		// console.log(file.exitValue);
		// TODO make a feedback, if it was successful...
		// e.g. https://techoverflow.net/blog/2014/02/02/Thunderbird-addon-call-eternal-prog/
	}
}
);
