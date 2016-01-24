var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;

var mozbutton = buttons.ActionButton({
	id: "mozilla-link",
	label: "Visit Mozilla",
	icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png"
	},
	onClick:  handleClick
});

function handleClick(state) {
	tabs.open("https://soundcloud.com/");
}

// var pageMod = require("sdk/page-mod");
//
// pageMod.PageMod({
//   include: "*.soundcloud.com",
// 	contentStyleFile: data.url("scdl-btns.css")
// });


var self = require("sdk/self");
let { Cc, Ci } = require('chrome');

var contextMenu = require("sdk/context-menu");
var menuItem = contextMenu.Item({
	label: "scdl: Download this song",
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
		//this.label = "scdl " + url;
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
	}
}
);
