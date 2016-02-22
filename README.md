Get the cardlist from the faeria unity files
--
This is messy as shit.  Since disunity doesn't extract from Unity5 asset files, we just parse
the entire contents of the .asset file as ascii and hunt for the cardlist manually.

It will break when things are updated - msg me if an update comes out and I haven't released a fix.

The lastest version can be found [on the github page demo](http://tidwell.github.io/faeria-cards/)

Install

`npm install`

Download and extract DisUnity to ./disunity_v0.5.0 from `https://github.com/ata4/disunity/releases`

Copy the `resources.assets` file to `./` from `~/Library/Application Support/Steam/SteamApps/common/Faeria/Faeria.app/Contents/Resources/Data`

Get the raw dump

`java -jar ./disunity_v0.5.0/disunity.jar asset unpack resources.assets`

Convert the hex dump in `/resources/object_data.block` to the `build/output.js` via `npm start`

You can view the dump by opening `./public/index.html`


Deploy github page

Github pages deploy

`git subtree push --prefix public origin gh-pages`


This might violate some TOS so use at your own risk.
I'm not responsible, this is for academic use only, etc, etc.