///
///  KacprzykBot
///  Stworzony na potrzeby edukacyjne
///  Bot nie ma na celu obrażania Pana Cezarego
///  Jest używany tylko na serwerze Testowym i prywatnej społeczności w celach humorystycznych i edukacyjnych
///
const Discord = require("discord.js");
const client = new Discord.Client();
const lubisz = [
  "Oczywiście",
  "Chyba",
  "a czy to ważne?",
  "Tak",
  "Nie",
  "To nie twoja sprawa",
  "Skąd mam to wiedzieć",
  "Powinieneś mieć to w 2. klasie podstawówki",
  "Mhm..."
];
const ileto = [
  "Nie potrzebujesz tego żeby zrobić to zadanie. Jest sprytniejszy sposób.",
  "Policz sobie",
  "Nie jestem kalkulatorem tylko matematykiem",
  "Dlaczego sam nie policzysz?",
  "Te liczby sprawiają ci problem?",
  "Skąd mam wiedzieć"
];
const slucham = ["Słucham", "Tak?", "Co się stało?", "Hm?"];
const ct = [
  "Nie jest dobrze...",
  "To jest jakiś dramat...",
  "Ahh te czasy...",
  "Może lepiej zacznijmy lekcje..."
];
var slowo;
client.login(process.env.TOKEN);
console.log("Włączam");

function los(slowa) {
  return slowa[Math.floor(Math.random() * slowa.length)];
}

client.on("ready", readyDiscord);
function readyDiscord() {
  console.log("o działa");
  ///client.users.cache.get("282188744696659969").send("Włączyłem się"); ///DM ThePhaseless
  client.user.setActivity("okolice za oknem", { type: "WATCHING" });
}

client.on("message", msg => {
  if (msg.author != "810790057459187733") {
    if (msg.content.match(/czaruś/i) || msg.content.match(/cezarsiu/i)) {
      //Zachowanie godności
      msg.channel.send("Nie nazywaj mnie tak. Nigdy.");
      //Opinia
    } else if (
      msg.content.match(/czarku/i) &&
      (msg.content.match(/lubisz/i) ||
        msg.content.match(/wiesz/i) ||
        msg.content.match(/czy/i))
    ) {
      if (
        //Wysocki check
        msg.content.match(/wysocki/i) ||
        msg.content.match(/michał/i) ||
        msg.content.match(/michała/i) ||
        msg.content.match(/wysocki/i) ||
        msg.mentions.has("404341103572025361")
      )
        msg.channel.send("Nie.");
      else if (
        msg.content.match(/co o tym sądzisz/i) ||
        msg.content.match(/i co/i)
      )
        msg.channel.send("Śliczne!");
      //Github
      else if (
        msg.content.match(/czarku pomoc/i) ||
        msg.content.match(/cezary pomoc/i)
      ) {
        msg.channel.send("To wszystko co znalazłem:");
        msg.channel.send("https://github.com/MyNameKuba/KacprzykBot");
      }
      //Mood Check
      else if (
        msg.content.match(/jak sie czujesz/i) ||
        msg.content.match(/jak tam/i) ||
        msg.content.match(/jak się czujesz/i) ||
        msg.content.match(/co tam/i)
      )
        msg.channel.send(los(ct));
      //Emotka dla Matmy
      else if (
        msg.content.match(/matematyka/i) ||
        msg.content.match(/matma/i) ||
        msg.content.match(/matematyki/i) ||
        msg.content.match(/matmy/i) ||
        msg.content.match(/matematyke/i) ||
        msg.content.match(/matme/i) ||
        msg.content.match(/matematyką/i) ||
        msg.content.match(/matmą/i)
      ) {
        msg.react("🥰");
      }
      //Wycoski check2
      else if (
        msg.content.match(/wysocki/i) ||
        msg.content.match(/Michał/i) ||
        msg.mentions.has("404341103572025361")
      ) {
        msg.channel.send("O, to ten co się matematyki nie uczy");
      } else if (msg.content.match(/ile to/i) || msg.content.match(/policz/i))
        msg.channel.send(los(ileto));
      //Opinia2mat
      else msg.channel.send(los(lubisz));
    } else if (msg.mentions.has("810790057459187733"))
      msg.channel.send(
        "Czas, który spędziłeś na oznaczenie mnie, mogłeś poświęcić na naukę matematyki. Może już Cię ten profil nie interesuje?! Budowa układu wydalniczego żaby jest baaardzo ciekawa..."
      );
    else if (
      msg.content.match(/nie umiem/i) ||
      msg.content.match(/nwm/i) ||
      msg.content.match(/nie wiem/i)
    )
      msg.channel.send("Siadaj, niedostateczny");
    //Niedostateczny
    else if (
      msg.content.match(/wzory trygonometryczne/i) ||
      msg.content.match(/trygonometria/i) ||
      msg.content.match(/sinus cosinus/i)
    ) {
      msg.channel.send("https://www.matemaks.pl/wzory-trygonometryczne.html");
    } else if (
      msg.content.match(/wzory skróconego mnożenia/i) ||
      msg.content.match(/wzory mnożenia/i) ||
      msg.content.match(/mnożenie/i)
    ) {
      msg.channel.send(
        "https://www.matemaks.pl/wzory-skroconego-mnozenia.html"
      );
    } else if (
      msg.content.match(/wzory wieta/i) ||
      msg.content.match(/wzory vietea/i) ||
      msg.content.match(/wieta/i)
    ) {
      msg.channel.send("https://www.matmana6.pl/wzory-vietea");
    } else if (msg.content.match(/czarku/i) || msg.content.match(/cezary/i)) {
      msg.channel.send(los(slucham));
    }
  }
});

const express = require("express");
const cmd = require("node-cmd");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const verifySignature = (req, res, next) => {
  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac("sha1", process.env.GITHUB_SECRET);
  const digest = "sha1=" + hmac.update(payload).digest("hex");
  const checksum = req.headers["x-hub-signature"];

  if (!checksum || !digest || checksum !== digest) {
    return res.status(403).send("auth failed");
  }

  return next();
};

// Github webhook listener
app.post("/git", verifySignature, (req, res) => {
  if (req.headers["x-github-event"] == "push") {
    cmd.get("bash git.sh", (err, data) => {
      if (err) return console.log(err);
      console.log(data);
      return res.status(200).send(data);
    });
  } else if (req.headers["x-github-event"] == "ping") {
    return res.status(200).send("PONG");
  } else {
    return res.status(200).send("Unsuported Github event. Nothing done.");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});
