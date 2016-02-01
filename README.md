scdl-firefox
============

Soundcloud Music Downloader
---------------------------

![logo](data/icon-512.png)

The plugin is able to download music from http://www.soundcloud.com and set id3tag to the downloaded music. It will probably work only with Linux and needs the python script scdl (https://github.com/flyingrub/scdl) installed and configured. Just right click on a song link on https://soundcloud.com/ and select "Download this song". After some seconds it should appear in the download folder you configured for scdl. It is very simple and fully free and opensource: https://github.com/sedrubal/scdl-firefox

Install
-------

Download from

 - [addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/soundcloud-music-downloader/)
 - [github](https://github.com/sedrubal/scdl-firefox/releases)

or build it yourself:

Build
-----

 - install [jpm](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm)
 - for testing run `jpm run -b $(which firefox)`
 - for building run `jpm xpi`
 - for signing run `jpm sign --api-key="your amo api key" --api-secret="and the secret"`

Contribution
------------

Pull requests are welcome.

License
-------

[MIT](http://mit-license.org/)
