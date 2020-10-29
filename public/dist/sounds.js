var sounds = { dead: { url: "../sounds/dead.wav", volume: .25 }, smash: { url: "../sounds/smash.mp3", volume: .25 }, ping: { url: "../sounds/ping.mp3", volume: .25 }, bump: { url: "../sounds/bump.mp3", volume: .25 }, jump: { url: "../sounds/jump.wav", volume: .25 }, coin: { url: "../sounds/coin.mp3", volume: .25 } }, soundContext = new AudioContext; for (var key in sounds) loadSound(key); function loadSound(a) { var b = sounds[a], c = b.url, d = b.buffer, e = new XMLHttpRequest; e.open("GET", c, !0), e.responseType = "arraybuffer", e.onload = function () { soundContext.decodeAudioData(e.response, function (a) { b.buffer = a }) }, e.send() } function playSound(a, b) { var c = sounds[a], d = sounds[a].volume || 1, e = c.buffer; if (e) { var f = soundContext.createBufferSource(); f.buffer = e; var g = soundContext.createGain(); b ? b.volume && (g.gain.value = d * b.volume) : g.gain.value = d, g.connect(soundContext.destination), f.connect(g), f.start(0) } }