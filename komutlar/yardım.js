module.exports = ({
  name:"yardım",
  aliases:['help'],
  code:`$title[$userTag[$clientID] Yardım Menüsü]
  $description[Selam ben Alfa! Bir müzik botuyum ve komutlarım işte şunlar;

 **Prefix** (1)
 \`-\`

 **Müzik** (8)
  \`çal, durdur, devam, tekrarla, geç, ses, çık, panel\`

 **Diğer** (2)
 \`nuke, ping\`
 **Sahibe Özel** (1)
 \`eval\`

---------------------------------------------

 **Durum**
 \`Toplam komutlar: $commandsCount
 Toplam sunucular: $serverCount
 Toplam kanallar: $allChannelsCount
 Toplam kanallar (yazı): $allChannelsCount[text]
 Toplam kanallar (ses): $allChannelsCount[voice]
 Toplam kategoriler: $allChannelsCount[category]
 Toplam Üye: $replaceText[$replaceText[$abbreviate[$allMembersCount];K; Bin];.;,]
 Websocket Ping : $ping ms
 Bot Pingi : $botPing ms
 Uptime: $replaceText[$replaceText[$replaceText[$uptime;s;Saniye;-1];h; Saat;-1];m; Dakika;-1]
 NodeJS Sürümü: $getObjectProperty[nodev]
 Discord.js Sürümü: $getObjectProperty[discordv]
 Dbd.js Sürümü: $packageVersion
 CPU Kullanımı: %$cpu
 CPU İşletim sistemi: $djsEval[require ('os').platform();yes]
 RAM kullanımı: $ram MB
 Depolama kullanımı: $djsEval[process.memoryUsage().rss / 1024 / 1024;yes] MB\`

---------------------------------------------

 *Bot hala beta durumdadır daha fazla komut eklenecektir.*

 **Linkler**
 [Destek Sunucusu](https://discord.gg/en88ucVWYM) | [Botu davet et!]($getBotInvite) | [Sahibim](https://discord.com/users/539843855567028227)]
 $footer[Slash komutları hazırlanıyor...]
 $color[303136]
 $thumbnail[$userAvatar[$clientID]]
 $djseval[d.object.nodev = process.version
d.object.discordv = require('discord.js').version
$createObject[{}]]
  `
})