// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

/*
Gherkin mode - http://www.cukes.info/
Report bugs/issues here: https://github.com/codemirror/CodeMirror/issues
*/

// Following Objs from Brackets implementation: https://github.com/tregusti/brackets-gherkin/blob/master/main.js
//var Quotes = {
//  SINGLE: 1,
//  DOUBLE: 2
//};

//var regex = {
//  keywords: /(Feature| {2}(Scenario|In order to|As|I)| {4}(Given|When|Then|And))/
//};

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("gherkin", function () {
  return {
    startState: function () {
      return {
        lineNumber: 0,
        tableHeaderLine: false,
        allowFeature: true,
        allowBackground: false,
        allowScenario: false,
        allowSteps: false,
        allowPlaceholders: false,
        allowMultilineArgument: false,
        inMultilineString: false,
        inMultilineTable: false,
        inKeywordLine: false
      };
    },
    token: function (stream, state) {
      if (stream.sol()) {
        state.lineNumber++;
        state.inKeywordLine = false;
        if (state.inMultilineTable) {
            state.tableHeaderLine = false;
            if (!stream.match(/\s*\|/, false)) {
              state.allowMultilineArgument = false;
              state.inMultilineTable = false;
            }
        }
      }

      stream.eatSpace();

      if (state.allowMultilineArgument) {

        // STRING
        if (state.inMultilineString) {
          if (stream.match('"""')) {
            state.inMultilineString = false;
            state.allowMultilineArgument = false;
          } else {
            stream.match(/.*/);
          }
          return "string";
        }

        // TABLE
        if (state.inMultilineTable) {
          if (stream.match(/\|\s*/)) {
            return "bracket";
          } else {
            stream.match(/[^\|]*/);
            return state.tableHeaderLine ? "header" : "string";
          }
        }

        // DETECT START
        if (stream.match('"""')) {
          // String
          state.inMultilineString = true;
          return "string";
        } else if (stream.match("|")) {
          // Table
          state.inMultilineTable = true;
          state.tableHeaderLine = true;
          return "bracket";
        }

      }

      // LINE COMMENT
      if (stream.match(/#.*/)) {
        return "comment";

      // TAG
      } else if (!state.inKeywordLine && stream.match(/@\S+/)) {
        return "tag";

      // FEATURE
      } else if (!state.inKeywordLine && state.allowFeature && stream.match(/(姗熻兘|锷熻兘|銉曘偅銉笺儊銉旮半姤|喙傕竸喔｀竾喔弗喔编竵|喔剿抚喔侧浮喔覆喔∴覆喔｀笘|喔剿抚喔侧浮喔曕箟喔竾喔佮覆喔｀笚喔侧竾喔樴父喔｀竵喔脆笀|嗖灌硢嗖氞硩嗖氞渤|喟椸眮喟｀爱啾亅啜﹣啜灌ň啜傕é啜班ň|啜ㄠ〞啜?啜ㄠ﹣啜灌ň啜皘啜栢ň啜膏﹢啜呧à|啶班啶?啶侧啶东賵赛蹖跇诏蹖|禺丕氐賷丞|转讻谠谞讛|肖褍薪泻褑褨芯薪邪谢|肖褍薪泻褑懈褟|肖褍薪泻褑懈芯薪邪谢薪芯褋褌|肖褍薪泻褑懈芯薪邪谢|耶蟹械薪褔讫谢械泻谢械谢械泻|小胁芯泄褋褌胁芯|袨褋芯斜懈薪邪|袦萤屑泻懈薪谢械泻|袦芯谐褍褯薪芯褋褌|蚂蔚喂蟿慰蠀蚁纬委伪|螖蠀谓伪蟿蠈蟿畏蟿伪|W艂a橹ciwo橹膰|Vlastnos钮|Trajto|T铆nh n膬ng|Savyb臈|Pretty much|Po啪iadavka|Po啪adavek|Potrzeba biznesowa|脰zellik|Osobina|Ominaisuus|Omadus|OH HAI|Mogu膰nost|Mogucnost|Jellemz艖|Hw忙t|Hwaet|Funzionalit脿|Funktionalit茅it|Funktionalit盲t|Funkcja|Funkcionalnost|Funkcionalit腻te|Funkcia|Fungsi|Functionaliteit|Func葲ionalitate|Func牛ionalitate|Functionalitate|Funcionalitat|Funcionalidade|Fonctionnalit茅|Fitur|F墨膷a|Feature|Eiginleiki|Egenskap|Egenskab|Caracter铆stica|Caracteristica|Business Need|Aspekt|Arwedd|Ahoy matey!|Ability):/)) {
        state.allowScenario = true;
        state.allowBackground = true;
        state.allowPlaceholders = false;
        state.allowSteps = false;
        state.allowMultilineArgument = false;
        state.inKeywordLine = true;
        return "keyword";

      // BACKGROUND
      } else if (!state.inKeywordLine && state.allowBackground && stream.match(/(鑳屾櫙|氚瓣步|喙佮笝喔о竸喔脆笖|嗖灌部嗖ㄠ硩嗖ㄠ硢嗖侧硢|喟ㄠ眹喟哎啾嵿隘喟倈啜啜涏啜曕|啶啶粪啶犩き啷傕ぎ啶缕夭賲蹖賳赖|丕賱禺賱賮賷丞|专拽注|孝邪褉懈褏|袩褉械写褘褋褌芯褉懈褟|袩褉械写懈褋褌芯褉懈褟|袩芯蟹邪写懈薪邪|袩械褉械写褍屑芯胁邪|袨褋薪芯胁邪|袣芯薪褌械泻褋褌|袣械褉械褕|违蟺蠈尾伪胃蚁慰|Za艂o偶enia|Yo\-ho\-ho|Tausta|Taust|Situ腻cija|Rerefons|Pozadina|Pozadie|Pozad铆|Osnova|Latar Belakang|Kontext|Konteksts|Kontekstas|Kontekst|H谩tt茅r|Hannergrond|Grundlage|Ge莽mi艧|Fundo|Fono|First off|Dis is what went down|Dasar|Contexto|Contexte|Context|Contesto|Cen谩rio de Fundo|Cenario de Fundo|Cefndir|B峄慽 c岷h|Bakgrunnur|Bakgrunn|Bakgrund|Baggrund|Background|B4|Antecedents|Antecedentes|脝r|Aer|Achtergrond):/)) {
        state.allowPlaceholders = false;
        state.allowSteps = true;
        state.allowBackground = false;
        state.allowMultilineArgument = false;
        state.inKeywordLine = true;
        return "keyword";

      // SCENARIO OUTLINE
      } else if (!state.inKeywordLine && state.allowScenario && stream.match(/(鍫存櫙澶х侗|鍦烘櫙澶х翰|锷囨湰澶х侗|鍓ф湰澶х翰|銉嗐兂銉椼罗|銈枫侪銉偑銉嗐兂銉椼罗銉笺儓|銈枫侪銉偑銉嗐兂銉椼罗|銈枫侪銉偑銈偊銉堛儵銈ゃ兂|鞁滊倶毽槫 臧涤殧|喔福喔膏笡喙€喔笗喔膏竵喔侧福喔撪箤|喙傕竸喔｀竾喔福喙夃覆喔囙竞喔竾喙€喔笗喔膏竵喔侧福喔撪箤|嗖掂部嗖掂舶嗖｀硢|喟曕哎喟ㄠ皞|啜啜曕ē啜?啜班﹤啜?啜班﹪啜栢ň|啜啜曕ē啜?啜⑧ň啜傕啜缃啶ぐ啶苦う啷冟ざ啷嵿く 啶班啶ぐ啷囙啶缃爻賷賳丕乇賷賵 賲禺胤胤|丕賱诏賵蹖 爻賳丕乇蹖賵|转讘谞讬转 转专谳讬砖|小褑械薪邪褉懈泄薪褘遥 褌萤蟹械谢械褕械|小褑械薪邪褉懈泄 褋褌褉褍泻褌褍褉邪褋懈|小褌褉褍泻褌褍褉邪 褋褑械薪邪褉褨褞|小褌褉褍泻褌褍褉邪 褋褑械薪邪褉懈褟|小褌褉褍泻褌褍褉邪 褋褑械薪邪褉懈褬邪|小泻懈褑邪|袪邪屑泻邪 薪邪 褋褑械薪邪褉懈泄|袣芯薪褑械锌褌|螤蔚蚁喂纬蚁伪蠁萎 危蔚谓伪蚁委慰蠀|Wharrimean is|Template Situai|Template Senario|Template Keadaan|Tapausaihio|Szenariogrundriss|Szablon scenariusza|Swa hw忙r swa|Swa hwaer swa|Struktura scenarija|Structur膬 scenariu|Structura scenariu|Skica|Skenario konsep|Shiver me timbers|Senaryo tasla臒谋|Schema dello scenario|Scenariomall|Scenariomal|Scenario Template|Scenario Outline|Scenario Amlinellol|Scen腻rijs p脓c parauga|Scenarijaus 拧ablonas|Reckon it's like|Raamstsenaarium|Plang vum Szenario|Plan du Sc茅nario|Plan du sc茅nario|Osnova sc茅n谩艡e|Osnova Scen谩ra|N谩膷rt Scen谩ru|N谩膷rt Sc茅n谩艡e|N谩膷rt Scen谩ra|MISHUN SRSLY|Menggariskan Senario|L媒sing D忙ma|L媒sing Atbur冒ar谩sar|Konturo de la scenaro|Koncept|Khung t矛nh hu峄忧g|Khung k峄媍h b岷|Forgat贸k枚nyv v谩zlat|Esquema do Cen谩rio|Esquema do Cenario|Esquema del escenario|Esquema de l'escenari|Esbozo do escenario|Delinea莽茫o do Cen谩rio|Delineacao do Cenario|All y'all|Abstrakt Scenario|Abstract Scenario):/)) {
        state.allowPlaceholders = true;
        state.allowSteps = true;
        state.allowMultilineArgument = false;
        state.inKeywordLine = true;
        return "keyword";

      // EXAMPLES
      } else if (state.allowScenario && stream.match(/(渚嫔瓙|渚媩銈点兂銉椼俪|鞓坾喔娻父喔断竞喔竾喙€喔笗喔膏竵喔侧福喔撪箤|喔娻父喔断竞喔竾喔曕副喔о腑喔⑧箞喔侧竾|嗖夃拨嗖距补嗖班玻喑嗋矖嗖赤硜|喟夃唉喟距肮喟班埃喟侧眮|啜夃é啜距ü啜班è啜距▊|啶夃う啶距す啶班ぃ|賳賲賵賳赖 赖丕|丕賲孬賱丞|赞谠讙诪讗谠转|耶褉薪讫泻谢讫褉|小褑械薪邪褉懈褬懈|袩褉懈屑械褉褘|袩褉懈屑械褉懈|袩褉懈泻谢邪写懈|袦懈褋芯谢谢邪褉|袦懈褋邪谢谢邪褉|危蔚谓维蚁喂伪|螤伪蚁伪未蔚委纬渭伪蟿伪|You'll wanna|Voorbeelden|Variantai|Tapaukset|Se 镁e|Se the|Se 冒e|Scenarios|Scenariji|Scenarijai|Przyk艂ady|Primjeri|Primeri|P艡铆klady|Pr铆klady|Piem脓ri|P茅ld谩k|Pavyzd啪iai|Paraugs|脰rnekler|Juhtumid|Exemplos|Exemples|Exemple|Exempel|EXAMPLZ|Examples|Esempi|Enghreifftiau|Ekzemploj|Eksempler|Ejemplos|D峄?li峄嘘|Dead men tell no tales|D忙mi|Contoh|Cen谩rios|Cenarios|Beispiller|Beispiele|Atbur冒ar谩sir):/)) {
        state.allowPlaceholders = false;
        state.allowSteps = true;
        state.allowBackground = false;
        state.allowMultilineArgument = true;
        return "keyword";

      // SCENARIO
      } else if (!state.inKeywordLine && state.allowScenario && stream.match(/(鍫存櫙|鍦烘櫙|锷囨湰|鍓ф湰|銈枫侪銉偑|鞁滊倶毽槫|喙€喔笗喔膏竵喔侧福喔撪箤|嗖曕播嗖距哺嗖距舶嗖距矀嗖秥喟膏皑啾嵿皑喟苦暗啾囙岸喟倈啜啜曕ē啜缃啶ぐ啶苦う啷冟ざ啷嵿く|爻賷賳丕乇賷賵|爻賳丕乇蹖賵|转专谳讬砖|小褑械薪邪褉褨泄|小褑械薪邪褉懈芯|小褑械薪邪褉懈泄|袩褉懈屑械褉|危蔚谓维蚁喂慰|T矛nh hu峄忧g|The thing of it is|Tapaus|Szenario|Swa|Stsenaarium|Skenario|Situai|Senaryo|Senario|Scenaro|Scenariusz|Scenariu|Sc茅nario|Scenario|Scenarijus|Scen腻rijs|Scenarij|Scenarie|Sc茅n谩艡|Scen谩r|Primer|MISHUN|K峄媍h b岷|Keadaan|Heave to|Forgat贸k枚nyv|Escenario|Escenari|Cen谩rio|Cenario|Awww, look mate|Atbur冒ar谩s):/)) {
        state.allowPlaceholders = false;
        state.allowSteps = true;
        state.allowBackground = false;
        state.allowMultilineArgument = false;
        state.inKeywordLine = true;
        return "keyword";

      // STEPS
      } else if (!state.inKeywordLine && state.allowSteps && stream.match(/(闾ｉ杭|闾ｄ箞|钥屼笖|鐣秥褰搢骞朵笖|鍚屾檪|鍚屾椂|鍓嶆彁|锅囱|锅囱ō|锅囧畾|锅囧|浣嗘槸|浣嗐仐|涓︿笖|銈伞仐|銇倝銇皘銇熴仩銇梶銇椼亱銇梶銇嬨仱|顷橃毵寍臁瓣贝|毹检烂|毵岇澕|毵岇暯|雼▅攴鸽Μ瓿爘攴鸽炀氅磡喙佮弗喔?|喙€喔∴阜喙堗腑 |喙佮笗喙?|喔断副喔囙笝喔编箟喔?|喔佮赋喔笝喔断箖喔箟 |嗖膏硩嗖ム部嗖む部嗖波喑嵿波喑?|嗖菠喑嵿菠喑?|嗖ㄠ部喑曕病嗖苦拨 |嗖ㄠ矀嗖む舶 |嗖嗋拨嗖班硢 |喟鞍喟苦隘啾?|喟氞眴喟睄喟艾喟∴翱喟ㄠ唉喟?|喟曕熬喟ㄠ翱 |喟?喟鞍喟苦案啾嵿哎喟苦挨喟苦安啾?|喟呧蔼啾嵿蔼啾佮啊啾?|啜ò |啜むé |啜溹﹪啜曕ò |啜溹啜掂﹪啜?啜曕 |啜溹é喋嬥▊ |啜呧à喋?|啶う啶?|啶ぐ啶ㄠ啶む |啶ぐ |啶むが |啶むう啶?|啶むぅ啶?|啶溹が |啶氞啶傕啶?|啶曕た啶ㄠ啶む |啶曕う啶?|啶断ぐ |啶呧啶?|賵 |赖賳诏丕賲蹖 |賲鬲賶 |賱賰賳 |毓賳丿賲丕 |孬賲 |亘賮乇囟 |亘丕 賮乇囟 |丕賲丕 |丕匕丕賸 |丌賳诏丕赖 |讻讗砖专 |谠讙诐 |讘讛讬谞转谉 |讗讝讬 |讗讝 |讗讘诇 |携泻褖芯 |液讫屑 |校薪写邪 |孝芯写褨 |孝芯谐写邪 |孝芯 |孝邪泻卸械 |孝邪 |袩褍褋褌褜 |袩褉懈锌褍褋褌懈屑芯, 褖芯 |袩褉懈锌褍褋褌懈屑芯 |袨薪写邪 |袧芯 |袧械褏邪泄 |袧讫褌懈觇讫写讫 |袥械泻懈薪 |袥讫泻懈薪 |袣芯谢懈 |袣芯谐写邪 |袣芯谐邪褌芯 |袣邪写邪 |袣邪写 |袣 褌芯屑褍 卸械 |袉 |袠 |袟邪写邪褌芯 |袟邪写邪褌懈 |袟邪写邪褌械 |袝褋谢懈 |袛芯锌褍褋褌懈屑 |袛邪薪芯 |袛邪写械薪芯 |袙讫 |袙邪 |袘懈褉芯泻 |讪屑屑邪 |讪泄褌懈泻 |讪谐讫褉 |袗屑屑芯 |袗谢懈 |袗谢械 |袗谐邪褉 |袗 褌邪泻芯卸 |袗 |韦蠈蟿蔚 |螌蟿伪谓 |螝伪喂 |螖蔚未慰渭苇谓慰蠀 |螒位位维 |脼urh |脼egar |脼a 镁e |脼谩 |脼a |Zatati |Zak艂adaj膮c |Zadato |Zadate |Zadano |Zadani |Zadan |Za p艡edpokladu |Za predpokladu |Youse know when youse got |Youse know like when |Yna |Yeah nah |Y'know |Y |Wun |Wtedy |When y'all |When |Wenn |WEN |wann |Ve |V脿 |Und |Un |ugeholl |Too right |Thurh |Th矛 |Then y'all |Then |Tha the |Tha |Tetapi |Tapi |Tak |Tada |Tad |Stel |Soit |Siis |葮i |舰i |Si |Sed |Se |S氓 |Quando |Quand |Quan |Pryd |Potom |Pokud |Pokia木 |Per貌 |Pero |Pak |Oraz |Onda |Ond |Oletetaan |Og |Och |O zaman |Niin |Nh瓢ng |N盲r |N氓r |Mutta |Men |Mas |Maka |Majd |Maj膮c |Mais |Maar |m盲 |Ma |Lorsque |Lorsqu'|Logo |Let go and haul |Kun |Kuid |Kui |Kiedy |Khi |Ketika |Kemudian |Ke膹 |Kdy啪 |Kaj |Kai |Kada |Kad |Je偶eli |Je橹li |Ja |It's just unbelievable |Ir |I CAN HAZ |I |Ha |Givun |Givet |Given y'all |Given |Gitt |Gegeven |Gegeben seien |Gegeben sei |Gdy |Gangway! |Fakat |脡tant donn茅s |Etant donn茅s |脡tant donn茅es |Etant donn茅es |脡tant donn茅e |Etant donn茅e |脡tant donn茅 |Etant donn茅 |Et |脡s |Entonces |Ent贸n |Ent茫o |Entao |En |E臒er ki |Ef |Eeldades |E |脨urh |Duota |Dun |Donita牡o |Donat |Donada |Do |Diyelim ki |Diberi |Dengan |Den youse gotta |DEN |De |Dato |Da葲i fiind |Da牛i fiind |Dati fiind |Dati |Date fiind |Date |Data |Dat fiind |Dar |Dann |dann |Dan |Dados |Dado |Dadas |Dada |脨a 冒e |脨a |Cuando |Cho |Cando |C芒nd |Cand |Cal |But y'all |But at the end of the day I reckon |BUT |But |Buh |Blimey! |Bi岷演 |Bet |Bagi |Aye |awer |Avast! |Atunci |Atesa |At猫s |Apabila |Anrhegedig a |Angenommen |And y'all |And |AN |An |an |Amikor |Amennyiben |Ama |Als |Alors |Allora |Ali |Aleshores |Ale |Akkor |Ak |Adott |Ac |Aber |A z谩rove艌 |A tie啪 |A taktie啪 |A tak茅 |A |a |7 |\* )/)) {
        state.inStep = true;
        state.allowPlaceholders = true;
        state.allowMultilineArgument = true;
        state.inKeywordLine = true;
        return "keyword";

      // INLINE STRING
      } else if (stream.match(/"[^"]*"?/)) {
        return "string";

      // PLACEHOLDER
      } else if (state.allowPlaceholders && stream.match(/<[^>]*>?/)) {
        return "variable";

      // Fall through
      } else {
        stream.next();
        stream.eatWhile(/[^@"<#]/);
        return null;
      }
    }
  };
});

CodeMirror.defineMIME("text/x-feature", "gherkin");

});
