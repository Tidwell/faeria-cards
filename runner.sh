cp ~/Library/Application\Support/Steam/SteamApps/common/Faeria/Faeria.app/Contents/Resources/Data/resources.assets ./;

java -jar ./disunity_v0.5.0/disunity.jar asset unpack resources.assets;

npm start

open ./public/index.html