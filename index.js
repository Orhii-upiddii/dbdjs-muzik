const dbd = require('dbd.js');
var fs = require('fs');
const bot = new dbd.Bot({
	token: process.env['token'],
	prefix: '-',
	mobile: true,
	fetchInvites: true
});
const app = require('express')();
app.get('/', (req, res) => {
	res.send('');
});
app.listen(8080);
bot.onUserUpdate();
bot.onChannelDelete();
bot.onChannelCreate();
bot.onChannelUpdate();
bot.onRoleCreate();
bot.onRoleDelete();
bot.onLeave();
bot.onJoined();
bot.onMessageUpdate();
bot.onMessageDelete();
bot.onInteractionCreate();
bot.onMessage();
var reader = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));
for (const file of reader) {
	const command = require(`./komutlar/${file}`);
	bot.command({
		name: command.name,
		aliases: command.aliases,
		bkz: command.bkz,
		code: command.code
	});
}


bot.command({
	name: 'çek',
	code: `$setServervar[falsisç;$mentioned[1]]
  $reactionCollector[$splitText[1];$mentioned[1];5m;✅,❌;kabul,red;yes]
$textSplit[$sendMessage[{title:$userTag[$mentioned[1]] kullanıcısı çekmeyi onaylıyor musunuz?}{color:ORANGE};yes]; ]
$onlyPerms[movemembers;Bu komutu kullanabilmek için **Üyeleri Taşı** yetkisine sahip olman gerekiyor]
$onlyBotPerms[movemembers;Bu komutu kullanabilmek için **Üyeleri Taşı** yetkisine sahip olmam gerekiyor]
$onlyIf[$voiceID[$mentioned[1]]!=$voiceID;Zaten çekmeye çalıştığın kişiyle aynı ses kanalındasın]
$onlyIf[$voiceID[$mentioned[1]]!=;Çekmek istediğiniz kullanıcı ses kanalında değil]
$onlyIf[$authorID!=$mentioned[1];Kendini çekemezsin]
$onlyIf[$isBot[$mentioned[1]]!=true;Botları çekemezsin]
$onlyIf[$voiceID[$authorid]!=;Bir ses kanalına girmelisin]
$onlyIf[$mentioned[1]!=;Lütfen sese çekmek istediğiniz kullanıcıyı etiketleyin]
$suppressErrors
`
});

bot.awaitedCommand({
	name: 'kabul',
	code: `
 $resetservervar[falsisç]
 $wait[1s]
 $moveUser[$getservervar[falsisç];$voiceID;Çekme isteği]
 $wait[1s]
 $clearReactions[$channelID;$message[1];all]
 $editMessage[$message[1];{title:$userTag[$mentioned[1]] kullanıcısı çekmeyi onayladı}{color:GREEN}]
 $suppressErrors
 `
});
bot.awaitedCommand({
	name: 'red',
	code: `
 $resetservervar[falsisç]
 $wait[1s]
 $clearReactions[$channelID;$message[1];all]
 $editMessage[$message[1];{title:$userTag[$mentioned[1]] kullanıcısı çekmeyi reddetti}{color:RED}]
 $suppressErrors
 `
});
bot.musicStartCommand({
	channel: '$channelID',
	code: ``
});

bot.musicEndCommand({
	channel: '$channelID',
	code: `:musical_note: Şarkı sona erdi. Ses kanalından çıktım.`
});

bot.command({
	name: 'çal',
	aliases: ['play'],
	code: `$author[Müzik çalınmaya başlandı;$authorAvatar]
$description[Aranan kelime \`$message\`
Bulunan Şarkı : $replaceText[$get[şarkı];;$songInfo[title];-1]
Şarkı Açıklaması : $songInfo[description]
Şarkı uzunluğu : $replaceText[$replaceText[$songInfo[duration];Seconds;Saniye;-1];Second;Saniye;-1]
Şarkı Linki : [Tıkla]($songInfo[url])
Kanal : [$songInfo[publisher]]($songInfo[publisher_url])
Çalan kişi : $userTag[$authorID]]
$thumbnail[$songInfo[thumbnail]]
$color[303136]
$setServerVar[şarkı;$authorID]
$let[$playSong[$message;...;yes;yes;:x: \`$message\` adında bir müzik bulamadım.]]
$suppressErrors[Şarkı çalmazken kullanamazsın]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$argsCheck[>1;Lütfen bir şarkı adı gir]`
});
bot.command({
	name: 'sıralama',
	aliases: ['queue'],
	code: `$description[
 Şuanda Çalan: [$songInfo[title]]($songInfo[url])
 Şarkıyı Açan: <@$songInfo[userID]>
 --------------------------------------
 **Sıralama:**
 $queue[1;15;{number} - {title}]]
 $color[303136]
 $onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken kullanamazsın]
 $onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
 $onlyIf[$queue[1;10;{number} - {title}]!=;Sırada bir şarkı bulunmuyor]
 $suppressErrors[Şarkı çalmazken kullanamazsın]`
});

bot.command({
	name: 'durdur',
	aliases: ['stop', 'pause'],
	code: `
$addCmdReactions[⏸]
$pauseSong
$onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken kullanamazsın]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$suppressErrors[Şarkı çalmazken kullanamazsın]
$onlyForIDs[$getServerVar[şarkı];Bu komutu sadece şarkıyı başlatan $userTag[$getServerVar[şarkı]] kullanıcısı kullanabilir]`
});

bot.command({
	name: 'devam',
	aliases: ['resume'],
	code: `
$addCmdReactions[▶]
$resumeSong
$onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken kullanamazsın]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$suppressErrors[Şarkı çalmazken kullanamazsın]
$onlyForIDs[$getServerVar[şarkı];Bu komutu sadece şarkıyı başlatan $userTag[$getServerVar[şarkı]] kullanıcısı kullanabilir]`
});

bot.command({
	name: 'tekrarla',
	aliases: ['loop'],
	code: `
$addCmdReactions[🔁]
$let[tekrarla;$loopQueue]
$onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken kullanamazsın]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$suppressErrors[Şarkı çalmazken kullanamazsın]
$onlyForIDs[$getServerVar[şarkı];Bu komutu sadece şarkıyı başlatan $userTag[$getServerVar[şarkı]] kullanıcısı kullanabilir]`
});

bot.command({
	name: 'geç',
	aliases: ['skip'],
	code: `
$addCmdReactions[⏯]
$let[geç;$skipSong]
$onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken kullanamazsın]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$suppressErrors[Şarkı çalmazken kullanamazsın]
$onlyForIDs[$getServerVar[şarkı];Bu komutu sadece şarkıyı başlatan $userTag[$getServerVar[şarkı]] kullanıcısı kullanabilir]`
});

bot.command({
	name: 'çık',
	aliases: ['leave'],
	code: `
$addCmdReactions[⏹]
$leaveVC
$onlyIf[$voiceID[$clientID]!=;Zaten bir ses kanalında değilim]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$suppressErrors[Ses kanalından çıkamadım]
$onlyForIDs[$getServerVar[şarkı];Bu komutu sadece şarkıyı başlatan $userTag[$getServerVar[şarkı]] kullanıcısı kullanabilir]`
});

bot.command({
	name: 'ses',
	aliases: ['sound'],
	code: `
$addCmdReactions[🔊]
$volume[$message]
$onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken kullanamazsın]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen kullanamazsın]
$suppressErrors[Şarkı çalmazken kullanamazsın]
$onlyIf[$message<=100;Maximum 100 olarak ayarlanabilir]
$onlyIf[$isNumber[$message]!=false;Bir sayı girmelisin]
$argsCheck[1;Lütfen bir ses seviyesi gir]
$onlyForIDs[$getServerVar[şarkı];Bu komutu sadece şarkıyı başlatan $userTag[$getServerVar[şarkı]] kullanıcısı kullanabilir]`
});

bot.command({
	name: 'panel',
	code: `$reactionCollector[$splitText[1];$getservervar[şarkı];1h;🔇,🔈,🔉,🔊,▶️,⏸,⏯,🔁,⏹;kıs,ses1,ses2,ses3,devam,durdur,geç,tekrarla,çık;yes]
$textSplit[$sendMessage[{title:$username[$clientID] Müzik Paneli}{description:Müzik panelimin komutları aşağıda yer alıyor
Aşağıdaki emojilere tıklayarak bu işlevleri kullanabilirsiniz.:

🔇 - Sesi %0 yapar
🔈 - Sesi %10 yapar
🔉 - Sesi %50 yapar
🔊 - Sesi %100 yapar
▶️ - Şarkıya Devam eder
⏸ - Şarkıyı Durdurur
⏯️ - Şarkıyı geçer 
🔁 - Şarkıyı tekrarlar 
⏹ - Kanaldan Çıkar

**Şarkı Bilgisi**
Şuanda Çalan : [$songInfo[title]]($songInfo[url])
Kalan Süre : $replaceText[$songInfo[duration_left];Seconds;Saniye;-1]
Toplam Süre : $replaceText[$songInfo[duration];Seconds;Saniye;-1]
Şarkı Açıklaması : $songInfo[description]
Şarkı Linki : [Tıkla]($songInfo[url])
Şarkı Sahibi: [$songInfo[publisher]]($songInfo[publisher_url])
Şarkıyı Açan : <@$songInfo[userID]>
}{color:303136}{thumbnail:$songInfo[thumbnail]}{footer:Paneli sadece son şarkıyı başlatan kullanabilir. Şuanda paneli sadece $userTag[$getservervar[şarkı]] kullanabilir.:$userAvatar[$getservervar[şarkı]]};yes]; ]
$onlyIf[$voiceID[$clientID]!=;Şarkı çalmazken paneli kullanamazsın]
$onlyIf[$voiceID!=;Bir ses kanalına girmezsen paneli kullanamazsın]`
});

bot.awaitedCommand({
	name: 'kıs',
	code: `$volume[0]
 :musical_note: Ses %0 olarak ayarlandı
 $suppressErrors[Müzik çalmazken ses ayarlanamaz]`
});

bot.awaitedCommand({
	name: 'ses1',
	code: `$volume[10]
 :musical_note: Ses %10 olarak ayarlandı
 $suppressErrors[Müzik çalmazken ses ayarlanamaz]`
});

bot.awaitedCommand({
	name: 'ses2',
	code: `$volume[50]
 :musical_note: Ses %50 olarak ayarlandı
 $suppressErrors[Müzik çalmazken ses ayarlanamaz]`
});

bot.awaitedCommand({
	name: 'ses3',
	code: `$volume[100]
 :musical_note: Ses %100 olarak ayarlandı
 $suppressErrors[Müzik Çalmazken ses ayarlanamaz]`
});

bot.awaitedCommand({
	name: 'devam',
	code: `$resumeSong
 :musical_note: Şarkı devam ettiriliyor
 $suppressErrors[Müzik çalmazken devam ettireceğim bir şarkı yok]`
});

bot.awaitedCommand({
	name: 'durdur',
	code: `$pauseSong
 :musical_note: Şarkı durduruldu
 $suppressErrors[Müzik çalmazken durdurabileceğim bir şarkı yok]`
});

bot.awaitedCommand({
	name: 'geç',
	code: `$let[geç;$skipSong]
 :musical_note: Şarkı geçildi
 $suppressErrors[Müzik çalmazken durdurabileceğim bir şarkı yok]`
});

bot.awaitedCommand({
	name: 'tekrarla',
	code: `$let[loop;$loopQueue]
 :musical_note: Şarkı tekrarlanıyor
 $suppressErrors[Tekrarlanacak bir şarkı bulamadım]`
});

bot.awaitedCommand({
	name: 'çık',
	code: `$leaveVC
$channelSendMessage[$channelID;:musical_note: Ses kanalından çıktım]
$suppressErrors[Ses kanalından çıkamadım]`
});

bot.status({
	text: '-yardım | Alfa bot kuruldu!',
	type: 'LISTENING',
	status: 'online',
	time: 12
});
bot.variables({
	prefix: '-',
	boş1: '',
	boş2: '',
	boş3: '',
	boş4: '',
	falsisç: '',
	şarkı: ''
});
