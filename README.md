Get the cardlist from the faeria unity files
--

Since disunity doesn't extract from Unity5 asset files, we just parse
the entire contents of the .asset file as ascii and hunt for the cardlist manually.

It will break when things are updated.

Hopefully, I can just delete this repo when Abrakam releases an official API or card list resource.

The lastest version can be found [on the github page demo](http://tidwell.github.io/faeria-cards/)

##Install

Download and extract DisUnity to ./disunity_v0.5.0 from `https://github.com/ata4/disunity/releases`

Copy the asset file

`cp ~/Library/Application\Support/Steam/SteamApps/common/Faeria/Faeria.app/Contents/Resources/Data/resources.assets ./`

(I have no idea where this is on windows, happy hunting!)

Run disunity to get the raw hex dump from the asset file:

`java -jar ./disunity_v0.5.0/disunity.jar asset unpack resources.assets`

Convert the hex dump in `/resources/object_data.block` to the `build/output.js`

`npm start`


The copy/disunity/npm tasks are wrapped up in runner.sh to do the whole thing rapidly.

`./runner.sh`


##View

open `./public/index.html` or `./build/output.json` for the nice pretty version.



##To Convert from the official CSV

Download the csv into `./tmp/cards.csv` from `https://github.com/abrakam/Faeria_Cards/blob/master/CardExport/merlin_shortened.csv`

Run the converter

`./csv-runner.sh`



## Deploy Demo

Github pages deploy

`git subtree push --prefix public origin gh-pages`


This might violate some TOS so use at your own risk.
I'm not responsible, this is for academic use only, etc, etc.