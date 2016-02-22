Get the cardlist from the faeria unity files
--


Install

`npm install`

Download and extract DisUnity to ./disunity_v0.5.0 from `https://github.com/ata4/disunity/releases`

Copy the `resources.assets` file to `./` from `~/Library/Application Support/Steam/SteamApps/common/Faeria/Faeria.app/Contents/Resources/Data`

Get the raw dump

`java -jar ./disunity_v0.5.0/disunity.jar asset unpack resources.assets`

Convert the hex dump in `/resources/object_data.block` to the `public/output.js` via `npm start`