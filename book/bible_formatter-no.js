const fs = require('fs');

function formatBibleText(text) {
    /**
     * Convert Bible text into a numbered verse format.
     * Removes copyright notice and specific header text.
     * Only treats lines starting with numbers as new verses.
     */
    
    // Remove the specific text and copyright notice
    text = text.replace(/Acoli Baibul/g, '')
              .replace(/© 1985, Bible Society of Uganda\./g, '')
              .replace(/©/g, ''); // Remove any remaining copyright symbols
    
    // Split the text into lines
    const lines = text.trim().split('\n');
    
    const formattedVerses = [];
    let currentBook = '';
    let currentChapter = '';
    let currentVerseText = '';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) {
            // If we have accumulated verse text, save it before the blank line
            if (currentVerseText) {
                formattedVerses.push(currentVerseText);
                currentVerseText = '';
            }
            continue;
        }
        
        // Check if this is a chapter heading (e.g., "Acakki 19")
        const chapterMatch = line.match(/^(\w+)\s+(\d+)$/);
        if (chapterMatch) {
            // Save any accumulated verse text before starting new chapter
            if (currentVerseText) {
                formattedVerses.push(currentVerseText);
                currentVerseText = '';
            }
            
            // Start new chapter
            currentBook = chapterMatch[1];
            currentChapter = chapterMatch[2];
            continue;
        }
        
        // Check if line starts with a verse number
        const verseMatch = line.match(/^(\d+)(.*)/);
        if (verseMatch && currentBook && currentChapter) {
            // Save any previous verse text
            if (currentVerseText) {
                formattedVerses.push(currentVerseText);
            }
            
            // Start new verse
            const verseNumber = verseMatch[1];
            const verseContent = verseMatch[2].trim();
            currentVerseText = `${currentBook} ${currentChapter}:${verseNumber} ${verseContent}`;
        } else if (currentVerseText) {
            // This is a continuation of the current verse
            currentVerseText += ' ' + line;
        }
    }
    
    // Don't forget to add the last verse if there is one
    if (currentVerseText) {
        formattedVerses.push(currentVerseText);
    }
    
    // Join all verses with newlines
    return formattedVerses.join('\n');
}

// Example usage with the provided text
const sampleText = `Wel 1
1 Rwot oloko ki Moses i tim Cinai; i kema me rwatte, i kom nino dwe mukwoŋo
me dwe me aryo, i mwaka me aryone nia i kare ma doŋ gua woko ki i lobo Ejipt.
Owacci,
2“Kwan wel lwak jo Icrael ducu, kun ilubo doggolagi ki dog odi pa kwarogi kit ma
Wel nyiŋgi tye kwede, kun ikwano co ducu ki acel acel,
3cakke ki i kom jo ma ditogi romo mwaka pyeraryo dok kwede malo, jo Icrael
ducu ma romo cito ka lweny; wubikwanogi wun ki Aron ki bucagi.
4Dok wubibedo ki dano acel ma oa ki i kaka acel acel, ma ŋat acel acel bibedo
ladit wi kaka ki i ot pa kwarogi.
5Man gin aye nyiŋ jo ma gibicuŋ ka konyowu: Jo pa Reuben, Elijur wod pa
Cedeur;
6jo pa Cimeon, Celumiel wod pa Juricadai;
7jo pa Juda, Nakucon wod pa Aminadab;
8jo pa Icakar, Netanel wod pa Juar;
9jo pa Jabulon, Eliab wod pa Kelon;
10i awobe pa Yucepu, jo pa Epraim, Elicama wod pa Amikud, jo pa Manace,
Gamaliel wod pa Pedajur;
11jo pa Benjamin, Abidan wod pa Gideoni;
12jo pa Dan, Akiejer wod pa Amicadai;
13jo pa Acer, Pagiel wod pa Okoran;
14jo pa Gad, Eliacap wod pa Deuel;
15jo pa Naputali, Akira wod pa Enan.”
16Man gin aye dano ma giyero ki i lwak, ma gin aye lutel wi kaka pa kwarogi, gin
ludito ma i kaka pa jo Icrael.
17Moses ki Aron gukwanyo jo meno ma doŋ gikwano nyiŋgi-ni,
18ci i kom nino mukwoŋo me dwe me aryo gucoko lwak ducu kacel. Gin gunyuto
watgi kun gilubo doggolagi ki dog odi pa kwarogi, kit ma wel nyiŋgi tye kwede,
cakke ki i kom jo ma ditogi romo mwaka pyeraryo dok kwede malo, ki acel acel,
19macalo Rwot ociko ki Moses. En okwanogi i tim Cinai kit meno, Welgi ene:
Acoli Baibul
© 1985, Bible Society of Uganda.
20Jo pa Reuben, latin kayo pa Icrael. Ka gikwano wel likwayone kun gicoyo nyiŋgi
ki acel acel ma lubo doggolagi ki dog odi pa kwarogi, co ducu cakke ki i kom jo ma
mwaka me ditogi romo pyeraryo dok kwede malo, jo ducu ma giromo cito ka
lweny,
21wel jo ma i kaka pa Reuben oromo alip pyeraŋwen wiye abicel, ki miya abic.
22Jo pa Cimeon. Ka gikwano wel likwayone kun gicoyo nyiŋgi ki acel acel ma lubo
doggolagi ki dog odi pa kwarogi, co ducu cakke ki i kom jo ma mwaka me ditogi
romo pyeraryo dok kwede malo, jo ducu ma giromo cito ka lweny,
23wel jo ma i kaka pa Cimeon oromo alip pyerabic wiye aboŋwen, ki miya adek.
24Jo pa Gad. Ka gikwano wel likwayo ne kun gicoyo nyiŋgi ki acel acel ma lubo
doggolagi ki dog odi pa kwarogi co ducu cakke ki i kom jo ma mwaki me ditogi
romo pyeraryo dok kwede malo, jo ducu ma giromo cito ka lweny,
25wel jo ma i kaka pa Gad oromo alip pyeraŋwen wiye abic, ki miya abicel ki
pyerabic.
26Jo pa Juda. Ka gikwano wel likwayo ne kun gicoyo nyiŋgi ki acel acel ma lubo
doggolagi ki dog odi pa kwarogi, co ducu cakke ki i kom jo ma mwaka me ditogi
romo pyeraryo dok kwede malo, jo ducu ma giromo cito ka lweny,
27wel jo ma i kaka pa Juda oromo alip pyerabiro wiye aŋwen, ki miya abicel.
28Jo pa Icakar. Ka gikwano wel likwayone kun gicoyo nyiŋgi ki acel acel ma lubo
doggolagi ki dog odi pa kwarogi, co ducu cakke ki i kom jo ma mwaka me ditogi
romo pyeraryo dok kwede malo, jo ducu ma giromo cito ka lweny.
29Wel jo ma i kaka pa Icakar oromo alip pyerabic wiye aŋwen, ki miya aŋwen.
30Jo pa Jabulon. Ka gikwano wel likwayone kun gicoyo nyiŋgi ki acel acel ma lubo
doggolagi ki dog odi pa kwarogi, co ducu cakke ki i kom jo ma mwaka me ditogi
romo pyeraryo dok kwede malo, jo ducu ma giromo cito ka lweny,
31wel jo ma i kaka pa Jabulon oromo alip pyerabic wiye abiro, ki miya aŋwen.
32Jo pa Yucepu, jo pa Epraim. Ka gikwano wel likwayone kun gicoyo nyiŋgi ki acel
acel ma lubo doggolagi ki dog odi pa kwarogi, co ducu cakke ki i kom jo ma
mwaka me ditogi romo pyeraryo dok kwede malo, jo ducu ma giromo cito ka
lweny,
33wel jo ma i kaka pa Epraim oromo alip pyeraŋwen, ki miya aŋwen.
34Jo pa Manace. Ka gikwano wel likwayone kun gicoyo nyiŋgi ki acel acel ma lubo
doggolagi ki dog odi pa kwarogi, co ducu cakke ki i kom jo ma mwaka me ditogi
romo pyeraryo dok kwede malo, jo ducu ma giromo cito ka lweny,
35wel jo ma i kaka pa Manace oromo alip pyeradek wiye aryo, ki miya aryo.
36Jo pa Benjamin. Ka gikwano wel likwayone kun gicoyo nyiŋgi ki acel acel ma
lubo doggolagi ki dog odi pa kwarogi, co ducu cakke ki I kom jo ma mwaka me
ditogi romo pyeraryo dok kwede malo, jo ducu ma giromo cito ka lweny,
37wel jo ma i kaka pa Benjamin oromo alip pyeradek wiye abic, ki miya aŋwen.
38Jo pa Dan. Ka gikwano wel likwayone kun gicoyo nyiŋgi ki acel acel ma lubo
doggolagi ki dog odi pa kwarogi, co ducu cakke ki i kom jo ma mwaka me ditogi
romo pyeraryo dok kwede malo, jo ducu ma giromo cito ka lweny,
39wel jo ma i kaka pa Dan oromo alip pyerabicel wiye aryo, ki miya abiro.
40Jo pa Acer. Ka gikwano Wel likwayone kun gicoyo nyiŋgi ki acel acel ma lubo
doggolagi ki dog odi pa kwarogi, co ducu cakke ki i kom jo ma mwaka me ditogi
romo pyeraryo dok kwede malo, jo ducu ma giromo cito ka lweny,
41wel jo ma i kaka pa Acer oromo alip pyeraŋwen wiye acel, ki miya abic.
42Jo pa Naputali. Ka gikwano Wel likwayone kun gicoyo nyiŋgi ki acel acel ma
lubo doggolagi ki dog odi pa kwarogi, co ducu cakke ki i kom jo ma mwaka me
ditogi romo pyeraryo dok kwede malo, jo ducu ma giromo cito ka lweny.
43Wel jo ma i kaka pa Naputali oromo alip pyerabic wiye adek, ki miya aŋwen.
44Meno gin aye jo ma gikwano welgi, ma yam Moses ki Aron gukwano, kun lutel
wi Icrael gukonyogi, jo apar wiye aryo, ma ŋat acel acel ocuŋ pi ot pa kwarogi.
45Kit meno wel jo Icrael ducu ma gikwano kun gilubo odi pa kwarogi, nia ki i kom
jo ma ditogi romo mwaka pyeraryo dok kwede malo, jo Icrael ducu ma romo cito
ka lweny,
46welgi ducu onoŋo oromo alip miya abicel ki adek, ki miya abic ki pyerabic noŋo.
Giketo jo pa Levi ka loyo kema pa Lubaŋa
47Ento jo pa Levi pe gikwano welgi kacel kwedgi kun gilubo kaka pa kwarogi,
48pien onoŋo Rwot owaco ki Moses ni,
49“Wel kaka pa Levi aye pe ikwan, pe ibikwano welgi i kin jo Icrael;
50ento ket jo pa Levi gubed ludito ma loyo tic i kema lok me caden, gulo jamine
ducu, wa gin ducu ma tye iye. Gin aye bitiŋo kema ki jami ma tye iye ducu, gibitic
iye, dok gibiguro kema me butogi rumo kema pa Lubaŋa.
51Ka kema bicako wot, ci gin Lulevi aye gibiputo woko; dok ka gibiguro kema,
Lulevi aye gibigurone. Ka ce dano mo ata onyiko cok ki kema, gibineko woko.
52Jo Icrael gibiguro kemagi ki dog buca monygi, dano acel acel ki dog gonygi, ki
dano acel acel i te benderane.
53Ento jo pa Levi gibiguro kemagi rumo kema lok me caden, wek akemo pe opot i
kom lwak jo Icrael; jo pa Levi gibigwoko kema lok me caden.”
Acoli Baibul
© 1985, Bible Society of Uganda.
54Jo Icrael gutimo kit meno gutiyo gin ducu kit ma onoŋo Rwot ociko ki Moses.
Wel 2
1Rwot owaco bot Moses ki Aron ni,
2“Jo Icrael gibiguro kemagi ŋat acel acel i te benderane, kun gitye ki lanyut me odi
pa kwarogi; gibiguro kemagi kun doggi tiko kema me rwatte tuŋŋi ki tuŋŋi ducu.
3Jo ma biguro kemagi yo tuŋ wokceŋ, ka ma ceŋ tuc ki iye-ni, gibibedo jo ma i te
bendera pa Juda, kun gilubo buca monygi; latel wi jo pa Juda aye Nakucon ma
wod pa Aminadab,
4ma gikwano wel dano ma i buca monnye oromo alip pyerabiro wiye aŋwen, ki
miya abicel.
5Jo ma biguro kemagi ma cok kwede gibibedo kaka pa Icakar; latel wi jo pa Icakar
aye Natanel ma wod pa Jura,
6ma gikwano wel dano ma i buca monnye oromo alip pyerabic wiye aŋwen ki
miya aŋwen.
7Ka dok kaka pa Jabulon; latel wi jo pa Jabulon aye Eliab ma wod pa Kelon,
8ma gikwano wel dano ma i buca monnye oromo alip pyerabic wiye abiro, ki
miya aŋwen.
9Wel jo ducu ma i gony pa Juda, i bucagi, oromo alip miya acel ki pyeraboro wiye
aŋwen, ki miya aŋwen. Ka wot ocakke, gin aye gibitelo yo.
10“Ki yo tuŋ acuc en aye bendera me gony pa jo pa Reuben bicuŋ iye, kun gilubo
buca monygi; latel wi jo pa Reuben aye Elijur ma wod pa Cedeur,
11ma gikwano Wel dano ma i buca monnye oromo alip pyeraŋwen wiye abicel, ki
miya abic.
12Jo ma biguro kemagi ma cok kwede gibibedo kaka pa Cimeon; latel wi jo pa
Cimeon aye Celumiel ma wod pa Juricadai,
13ma gikwano Wel dano ma i buca monnye oromo alip pyerabic wiye aboŋwen ki
miya adek.
14Ka dok kaka pa Gad; latel wi jo pa Gad aye Eliacap wod pa Reuel,
15ma gikwano wel dano ma i buca monnye oromo alip pyeraŋwen wiye abic, ki
miya abicel ki pyerabic.
16Wel jo ducu ma i gony pa Reuben, i bucagi, oromo alip miya acel ki pyerabic
wiye acel, ki miya aŋwen ki pyerabic. Ka wot cakke, gin aye gibimol me aryone.
Acoli Baibul
© 1985, Bible Society of Uganda.
17“Lacen kema me rwatte bicako wot, kacel ki gony pa jo Levi, i dye gony ducu.
Kit ma giguro ki kemagi gibicako wotgi kikore kit meno, kun dul acel acel tye ki
kabedone, kun gilubbe aluba bendera ki bendera.
18“Ki yo tuŋ potoceŋ bendera pa jo Epraim bicuŋ iye, kun gilubo buca monygi;
latel wi jo pa Epraim aye Elicama ma wod pa Amikud,
19ma gikwano wel dano ma i buca monnye oromo alip pyeraŋwen, ki miya
aŋwen.
20Jo ma biguro kemagi ma cok kwede gibibedo kaka pa Manace; latel wi jo pa
Manace aye Gamaliel ma wod pa Pedajur,
21ma gikwano wel dano ma i buca monnye oromo alip pyeradek wiye aryo, ki
miya aryo.
22Ka dok kaka pa Benjamin; latel wi jo pa Benjamin aye Abidan ma wod pa
Gideoni,
23ma gikwano wel dano ma i buca monnye oromo alip pyeradek wiye abic, ki
miya aŋwen.
24Wel jo ducu ma i gony pa Epraim, i bucagi, oromo alip miya acel ki aboro, ki
miya acel. Gin gibimol me adekke.
25“Ki yo tuŋ acam bendera pa jo pa Dan bicuŋ iye, kun gilubo buca monygi; latel
wi jo pa Dan aye Akiejer ma wod pa Amicadai,
26ma gikwano wel dano ma i buca monnye oromo alip pyerabicel wiye aryo, ki
miya abiro.
27Jo ma biguro kemagi ma cok kwede gibibedo kaka pa Acer; latel wi jo pa Acer
en aye Pagiel ma wod pa Okoran,
28ma gikwano wel dano ma i buca monnye oromo alip pyeraŋwen wiye acel, ki
miya abic.
29Ka dok kaka pa Naputali; latel wi jo pa Naputali aye Akira ma wod pa Enan,
30ma gikwano wel dano ma i buca monnye oromo alip pyerabic wiye adek, ki
miya abicel.
31Wel jo ducu ma i gony pa Dan oromo alip miya acel ki pyerabic wiye abiro, ki
miya abicel. Gin gibimol me agikkine, kun gilubbe aluba bendera ki bendera.”
32Meno aye jo Icrael kit ma gikwanogi kwede, kun lubo dog odi pa kwarogi; jo
ducu ma i gonygi ducu ma gikwanogi i buca monygi onoŋo guromo alip miya
abicel ki adek, ki miya abic ki pyerabic noŋo.
33Ento jo pa Levi pe gikwano i kom jo Icrael, macalo Rwot onoŋo ociko ki Moses.
Acoli Baibul
© 1985, Bible Society of Uganda.
34Jo Icrael yam gutiyo kit meno. Kit ma Rwot con ociko ki Moses ducu, guguro
kemagi kit meno i te benderagi, gucako wot bene gumol kit meno, ŋat acel acel ki
doggolane, macalo dog odi pa kwarogi tye kwede.
Wel 3
1Magi aye likwayo pa Aron ki Moses i kare ma Rwot obedo ka lok ki Moses i wi
got me Cinai.
2 Magi aye nyiŋ awobe pa Aron: Nadab latin kayone ki Abiu, Eleajar ki Itamar;
3meno aye nyiŋ awobe pa Aron, gin aye ajwagi ma giwirogi ki moo, ma Moses
yam okwerogi pi tiyo tic me bedo ajwagi.
4 Ento Nadab ki Abiu guto i nyim Rwot i kare ma gutyero mac mapat i nyim Rwot
i tim Cinai, kit mac ma yam pe ocikogi kwede; gin pe gubedo ki litino. Mumiyo
Eleajar ki Itamar gutiyo tic pa ajwagi i kare ma wongi pud kwo.
5Rwot owaco bot Moses ni,
6“Kel kaka pa Levi cok, ci iketgi i nyim ajwaka wek guti bote.
7Gibicobo tic mapatpat pire ki pi lwak ducu i nyim kema me rwatte, dok gibitiyo
tic pi jo Icrael kun gitiyo ticgi i kema.
8Gin aye gibigwoko jami ducu ma i kema me rwatte, dok gibitiyo tic pi jo Icrael
kun gitiyo ticgi i kema.
9Ibimiyo Lulevi bot Aron ki awobene; gityeko miyogi bote matwal kun
gikwanyogi woko ki i kin jo Icrael.
10Ci ibiketo Aron ki awo bene, gibitiyo ticgi me bedo ajwagi; ento ka ŋat mo
mukene onyiko cok, gibineke woko.”
11Rwot dok owaco bot Moses ni,
12“Nen, doŋ atyeko kwanyo jo pa Levi ki i kin jo Icrael ma ka litino kayo ducu
mukwono yabo ic i kin jo Icrael. Jo pa Levi aye gibibedo jona,
13 pien litino kayo ducu mera. I nino ma yam aneko iye litino kayo ducu ma i lobo
Ejipt ca, en aye akwero iye litino kayo ducu ma i Icrael gubed mera, pa dano ki pa
lee; gibibedo mera; an a Rwot.”
14Rwot owaco bot Moses ki i tim Cinai ni,
15“Kwan wel likwayo pa Levi, kun ilubo dog odi pa kwarogi, ki doggolagi;
ibikwano co ducu cakke ki i kom jo ma ditogi romo dwe acel dok kwede malo.”
16Kit meno Moses okwano welgi kit ma Rwot owaco-ni, macalo yam ocike-ni.
17Magi aye awobe pa Levi ma giyeko nyiŋgi: Gercon, Kokat ki Merari.
Acoli Baibul
© 1985, Bible Society of Uganda.
18Magi aye nyiŋ awobe pa Gercon kun lubo doggolagi: Libni ki Cimei.
19Awobe pa Kokat kun lubo doggolagi gin aye Amram, Ijar, Kebron ki Ujiel.
20Awobe pa Merari kun lubo doggolagi gin aye Makali ki Muci. Meno aye doggola
pa Lulevi, kun lubo dog odi pa kwarogi.
21Jo pa Gercon aye doggola pa jo pa Libni ki doggola pa jo pa Cimei; meno aye
doggola pa jo pa Gercon.
22Welgi ka gikwano wel co ducu cakke ki i kom jo ma ditogi romo dwe acel dok
kwede malo oromo alip abiro, ki miya abic.
23Doggola pa jo pa Gercon yam giguro kemagi i ŋe kema yo tuŋ potoceŋ,
24kun Eliacap wod pa Lael obedo ladit ki i ot pa kwaro pa jo Gercon.
25Tic pa likwayo pa Gercon i kema me rwatte obedo me gwoko kema; en aye
kema kikome ki laum wiye, boŋo cuka laum doggola me doggola kema me rwatte,
26boŋo cuka me aŋaba me larum dyekal, boŋo cuka laum doggola me dyekal ma
orumo kema ki keno tyer, ki lwak tol lacikgi; dog tic ducu ma mitte pi jami magi.
27Jo pa Kokat aye doggola pa jo pa Amram, ki doggola pa jo pa Ijar, ki doggola pa
jo pa Kebron, ki doggola pa jo pa Ujiel; meno aye doggola pa jo pa Kokat.
28Welgi ka gikwano Wel co ducu cakke ki i kom jo ma ditogi romo dwe acel dok
kwede malo oromo alip aboro, ki miya abicel ma gitiyo ticgi i kabedo maleŋ.
29Doggola pa jo pa Kokat yam giguro kemagi i ŋet kema yo tuŋ acuc,
30kun Elijapan wod pa Ujiel obedo ladit ki i ot pa kwaro me doggola pa jo. Kokat.
31Ticgi obedo me gwoko canduk, meja, okarmac, keno tyer, jami me kabedo
maleŋ ma ajwagi gitiyo kwedgi ducu, ki boŋo kicika; dog tic ducu ma mitte pi
jami magi.
32Ladit ma loyo ludito ducu pa Lulevi obedo Eleajar wod pa ajwaka Aron. En
onoŋo loyo jo ma gitiyo ticgi i kabedo maleŋ.
33Jo pa Merari aye doggola pa jo pa Makali ki doggola pa jo pa Muci; meno aye
doggola pa jo pa Merari.
34Welgi ka gikwano Wel co ducu cakke ki i kom jo ma ditogi romo dwe acel dok
kwede malo oromo alip abicel, ki miya aryo.
35Ladit ki i ot pa kwarogi ma i doggola pa jo Merari obedo Juriel wod pa Abikail.
Gin yam giguro kemagi i ŋet kema yo tun acam.
36Tic ma gimiyo bot likwayo pa Merari obedo me gwoko lwak guti me kema, lwak
riine, lwak wirre lwak tedi tere ki gin ma okemo ticce ducu; dog tic ducu ma
mitte pi jami magi ducu.
Acoli Baibul
© 1985, Bible Society of Uganda.
37Ka dok lwak wir ducu ma gurumo dyekal, ki tedi tergi ki lwak teke lagurgi, ki
lwak tolle.
38Jo ma yam giguro kemagi i nyim kema yo tuŋ wokceŋ, i nyim kema me rwatte
ka ma cen tuc iye-ni, gin aye Moses ki Aron ki awobene. Gin onoŋo gityeko ketogi
i dog tic ma i kabedo maleŋ, pi tiyo tic ducu ma mitte pi jo Icrael; ka ŋat mo
mukene onyiko cok, myero ginek woko.
39Wel jo Levi ducu ma yam gikwano, ma Moses ki Aron gukwano welgi pi lubo cik
pa Rwot, kun lubo doggolagi, co ducu cakke ki i kom jo ma ditogi romo dwe acel
dok kwede malo, oromo alip pyeraryo wiye aryo.
Koko litino kayo
40Rwot owaco bot Moses ni, “Kwan wel litino kayo ducu ma co ki i kin jo Icrael,
cakke ki i kom jo ma ditogi romo dwe acel dok kwede malo; kwan welgi kun ilubo
nyiŋgi.
41An a Rwot; ibikwanyo jo pa Levi gubed mera ma ka litino kayo ducu ma i kin jo
Icrael; dok iter lim makwo pa jo Levi ma ka litino kayo ducu ma i kin lim makwo
pa jo Icrael.”
42Kit meno Moses okwano Wel litino kayo ma i kin jo Icrael ducu, macalo Rwot
ocike.
43Litino kayo ducu ma co, macalo wel nyiŋgi tye, cakke ki i kom jo ma ditogi romo
dwe acel dok kwede malo, ka gikwano welgi onoŋo guromo alip pyeraryo wiye
aryo, ki miya aryo ki pyerabiro wiye adek.
44Rwot owaco bot Moses ni
45“Kwany jo pa Levi gubed ma ka litino kayo ducu ma i kin jo Icrael, dok iter lim
makwo pa jo Levi ma ka limgi; jo pa Levi gibibedo jona; an a Rwot.
46Pi koko litino kayo miya aryo ki pyerabiro wiye adek ma i kin jo Icrael ma
gudoŋ ma wel pa jo pa Levi orem woko pigi-ni,
47ibigamo cekel abic abic pi dano acel acel; ibigamo kun ilubo cekel me kabedo
maleŋ, ma cekel acel romo gera pyeraryo-ni.
48Lim meno ma gikoko kwede wel jo ma gudoŋ-ŋi ibimiyo bot Aron ki awo bene.”
49Mumiyo Moses ogamo lim me kok ki bot jo mudoŋ, ma wel pa jo Levi orem me
kokogi;
50ci ogamo lim ryal ki bot litino kayo pa jo Icrael ma romo cekel alip acel, ki miya
adek pi pyerabicel wiye abic, kun lubo cekel me kabedo maleŋ.
51Moses omiyo lim meno me kok bot Aron ki awobene, kit ma Rwot owaco-ni,
macalo Rwot yam ociko ki Moses.
Acoli Baibul
© 1985, Bible Society of Uganda.
Wel 4
1Rwot owaco bot Moses ki Aron ni,
2“Kwan wellikwayo pa Kokat ma i kin likwayo pa Levi, kun ilubo doggolagi ki dog
odi pa kwarogi,
3cakke ki i kom jo ma ditogi romo mwaka pyeradek o wa i kom jo ma ditogi romo
mwaka pyerabic, jo ducu ma giromo donyo i dog tic pi tiyo tic ma i kema me
rwatte.
4Man aye tic ma likwayo pa Kokat gibitiyo i kema me rwatte: gibitic i kom jami
maleŋ makato.
5Ka gony doŋ bicako wot, Aron ki awobene bidonyo i kema ka kwanyo boŋo
kicika, ci giumo kwede canduk lok me caden.
6Ka dok gibiumo wiye ki laa dyel, lacen gibiyaro boŋo ma bulu i kom meno, ka
doŋ gibirwako talle iye.
7Gibipeto boŋo ma bulu i kom meja me mugati me aketa i nyim Rwot, ka doŋ
gibiketo caani i wiye, ki atabo me odok eceta, ki weer, ki cupa me onyo gityer
amata; mugati ma gicano i nyim Rwot jwijwi bene obed i wiye.
8Lacen gibiyaro boŋo makwar i wiye, ci meno gibiumo ki laa dyel laumme, ka doŋ
gibirwako talle iye.
9Ka dok gibikwanyo boŋo ma bulu, ci giumo ki okarmac, kacel ki laputte, ki
magacce, ki caanine ki atabo moone ducu ma gitiyo kwede ticce;
10ci gibiboyo en ki jami ticce ducu ki laa dyel laumme, ka doŋ gibipyelo i wi tal
latiŋŋe.
11Gibiyaro boŋo ma bulu i kom keno tyer me jabu, ka dok gibiumo kome ki gin
ma gikwoyo ki laa dyel, ka doŋ gibirwako talle iye.
12Gibikwanyo jami tic ducu ma gitiyo kwedgi i kabedo maleŋ, gibiboyogi ducu ki
boŋo ma bulu, ka doŋ gibiumogi ki gin ma gikwoyo ki laa dyel, ci gibipyelo i wi tal
latingi.
13Gibijobo buru mac ma i keno me tyer woko, gibiyaro boŋo ma lamar lamar i
wiye;
14ka dok gibiketo iye jami tic ducu me keno tyer, ma gitiyo kwede tic i kome,
weer lawaŋ mac, gin lacob riŋo, akwaya latokke ki becen, jami tic ducu me keno
tyer; ka dok gibiyaro i kome laa dyel laumme, lacen gibirwako talle.
15Ka Aron ki awobene doŋ gutyeko umo kabedo maleŋ ki jami ma i kabedo maleŋ
ducu i kare ma giputo gony, lacen likwayo pa Kokat doŋ gibibino ka tiŋogi, ento
Acoli Baibul
© 1985, Bible Society of Uganda.
pe gugud kom jami maleŋ ducu, wek pe guto. Magi aye jami me kema me rwatte
ma likwayo pa Kokat gibitiŋo.
16“Eleajar wod pa Aron aye biloyo moo tara, ki odok eceta ma ŋwece kur, ki
gityer me moko kwon me nino ducu, ki moo wir, kun dok loyo kom kema ducu ki
lwak jami ducu ma bedo iye, en aye kabedo maleŋ kikome ki jami ticce.”
17Rwot owaco bot Moses ki Aron ni,
18“Pe iwek doggola ducu me kaka pa jo pa Kokat guto gutum woko ki i kin jo pa
Levi,
19ento ber itimgi kit man wek gubed makwo, ma pe guto i kare ma gibino cok ki
jami maleŋ makato-ni: Aron ki awobene aye bidonyo ka nyutogi tic pa ŋat acel
acel ki yec ma gibitiŋo,
20ento gin pe bidonyo iye ka neno kom jami maleŋ kadi matidi mo, wek pe guto.”
21Rwot owaco bot Moses ni,
22“Kwan wellikwayo pa Gercon bene, kun ilubo doggolagi ki dog odi pa kwarogi;
23ibikwano welgi cakke ki i kom jo ma ditogi romo mwaka pyeradek o wa i kom
jo ma ditogi romo mwaka pyerabic, jo ducu ma giromo donyo i dog tic pi tiyo tic i
kom kema me rwatte.
24Man en aye dog tic ma doggola pa Gercon ducu gibitiyo, me tiyo tic ki me tino
yec:
25gibitiŋo boŋo cuka me kema, ki kema me rwatte ki laum wiye, ki laa dyel ma
giumo kwede wiye malo,
26ki boŋo cuka me aŋaba me rumo dyekal, ki boŋo laum doggaŋ me dyekal ma
orumo kema ki keno tyer, ki lwak tol lacikgi, ki jami tic ducu ma gitiyo kwedgi
iye; gibitiyo tic ducu ma mitte i kom jami magi.
27Tic pa likwayo pa Gercon ducu gibitiyo kit ma Aron ki awo bene gicikogi i kom
jami ducu ma gibitinone, ki i kom gin ducu ma gibitiyone; dok in aye ibipoko
yecgi ducu botgi me agwoka.
28Man en aye tic pa doggola ducu pa likwayo pa Gercon ki i kema me rwatte; dog
ticgi bibedo i te loc pa Itamar wod pa ajwaka Aron.
29“Likwayo pa Merari ibikwano welgi kun ilubo doggolagi ki dog odi pa kwarogi;
30ibikwano welgi cakke ki i kom jo ma ditogi romo mwaka pyeradek o wa i kom
jo ma ditogi romo mwaka pyerabic, jo ducu ma giromo donyo i dog tic pi tiyo tic i
kema me rwatte.
31Magi aye gin ma gimiyo botgi me atiŋa, ma en aye ticgi ducu ki i kema me
rwatte: lwak guti me kema, ki riine, ki lwak wirre ki lwak tedi tere,
Acoli Baibul
© 1985, Bible Society of Uganda.
32ki wir ducu ma orumo dyekal, ki tedi tergi ducu, ki lwak teke lagurgi ki tol
lacikgi, ki lwak jami ticgi ducu ki gin ma okemo tic ducu. Ibipoko botgijami ma
gimito ni gutiŋ kun inyuto ki nyiŋgi.
33Man aye tic pa doggola ducu pa likwayo pa Merari, en aye dog ticgi ducu ki i
kema me rwatte; bibedo i te loc pa Itamar wod pa ajwaka Aron.”
34Moses ki Aron ki lutel wi lwak gukwano wel likwayo pa Kokat, kun lubo
doggolagi ki dog odi pa kwarogi,
35cakke ki i kom jo ma ditogi romo mwaka pyeradek o wa i kom jo ma ditogi
romo mwaka pyerabic, jo ducu ma giromo donyo i dog tic, pi tiyo tic i kema me
rwatte;
36welgi ma gikwano kun lubo doggolagi oromo alip aryo, ki miya abiro ki
pyerabic.
37Meno aye wel doggola ducu pa jo pa Kokat, jo ducu ma gutiyo tic i kema me
rwatte, ma Moses ki Aron gukwano welgi, macalo Rwot ociko ki i dog Moses.
38Man wel likwayo pa Gercon ma gikwano welgi kun lubo doggolagi ki dog odi pa
kwarogi,
39cakke ki i kom jo ma ditogi romo mwaka pyeradek o wa i kom jo ma ditogi
romo mwaka pyerabic, jo ducu ma giromo donyo i dog tic, pi tiyo tic i kema me
rwatte;
40welgi ma gikwano kun lubo doggolagi oromo alip aryo, ki miya abicel ki
pyeradek.
41Meno aye Wel doggola ducu pa likwayo pa Gercon, jo ducu ma gutiyo tic i kema
me rwatte, ma Moses ki Aron gukwano welgi, macalo Rwot ociko ki i dog Moses.
42Man wel likwayo pa Merari ma gikwano welgi kun lubo doggolagi ki dog odi pa
kwarogi,
43cakke ki i kom jo ma ditogi romo mwaka pyeradek o wa i kom jo ma ditogi
romo mwaka pyerabic, jo ducu ma giromo donyo i dog tic, pi tiyo tic i kema me
rwatte:
44welgi ma gikwano kun lubo doggolagi oromo alip adek, ki miya aryo.
45Meno aye jo me doggola pa likwayo pa Merari ma gikwanogi, ma Moses ki Aron
gukwano welgi, macalo Rwot ociko ki i dog Moses.
46Jo ducu ki i kin jo pa Levi ma gikwano welgi, ma Moses ki Aron ki lutel wi Icrael
gukwanogi kun lubo doggolagi ki dog odi pa kwarogi
47cakke ki i kom jo ma ditogi romo mwaka pyeradek o wa i kom jo ma ditogi
romo mwaka pyerabic, jo ducu ma giromo donyo i dog tic pi tiyo tic mapatpat ki
pi tiŋo yec i kema me rwatte
Acoli Baibul
© 1985, Bible Society of Uganda.
48jo ma i kingi ma gikwano welgi guromo alip aboro, ki miya abic ki pyeraboro.
49Macalo Rwot yam ociko kun wok ki i dog Moses ci gimiyogi ticgi kit meno, ŋat
acel acel i dog ticce me tiyo tic nyo me tiŋo yec; gikwano welgi kit meno, macalo
Rwot ociko ki Moses.
Wel 5
1Rwot owaco ki Moses ni,
2“Cik jo Icrael gucwal ludobo ducu gua woko ki i gony, ki dano acel acel ma kome
cwer tut, ki dano acel acel ma odoko keni pi gudo kom dano muto.
3Wubicwalo co wa ki mon bene, kun wucwalogi woko ki i gony, wek pe gubal
gonygi ma an abedo iye-ni odok keni.”
4Jo Icrael gutiyo kit meno, ci guryemogi woko i ŋe gony; macalo Rwot con owaco
bot Moses, jo Icrael gutiyo kit meno.
Cik ma mako culo waŋ jami
5 Rwot owaco bot Moses ni,
6“Wac ki jo Icrael ni, Ka ce laco mo nyo dako mo otimo bal mo ma dano timo kun
giŋayo waŋ Rwot, ce otiŋo alii,
7en bituco bal mere ma otimo-ni; ka dok en biculo waŋ gin marac ma otimo;
bimedo iye acel me abic, ci miyo bot dano ma en otimo marac-ci.
8Ento ka dano meno watte mo pe ma myero giculle waŋ gin marac-ci, ci giculo
Waŋ gin marac meno bot Rwot pi ajwaka, kun gibamo i kom nyok romo me
kwanyo bal ma gitimo kwede gin lakwany bal ki i kome.
9Gityer ducu, nyo jami ducu maleŋ pa jo Icrael ma gikelo bot ajwaka bibedo mere.
10Jami maleŋ ma dano acel acel okelo bibedo mere; gin ducu ma dano mo omiyo
bot ajwaka bibedo mere.”
Cik ma mako nyeko
11Rwot owaco bot Moses ni,
12“Wac ki jo Icrael ni, Ka dako pa laco mo waŋe olal, ci otimo kir i kom cware,
13ka laco-mo obuto kwede, ce cware pe oŋeyo, ma dako ojerre kekene kun lokke
okanne woko, dok pe tye caden mo ma moko lok kom dako-nu, pien pe ginoŋe
iye;
14ka cwiny me nyeko omako laco, kun nyeko omake i kom dakone ma ojerre
kekene-ni, nyo ka cwiny me nyeko omako laco, kun nyeko omake i kom dakone,
kadi bed dako pe ojerre kekene,
Acoli Baibul
© 1985, Bible Society of Uganda.
15ci laco bitero dakone bot ajwaka, kun tero gityer ma gimito pi dakone, agwata
moko kwon acel me moko cayiri; pe bionyo moo i kome, pe biketo iye odok
luban, pien meno gityer me moko kwon me nyeko, en gityer me moko kwon me
lapo wic, ma bimiyo gipo pi bal meno.
16“Ajwaka bikelo dako cok, ci cibo i nyim Rwot.
17Ka dok ajwaka bitero pii maleŋ ki otako, ci jobo apwa ma i dye ot me kema,
onyo i pii.
18Ka ajwaka bicibo dako i nyim Rwot, bigonyo yer wi dako wek oket ata lijayi, ci
keto gityer me moko kwon me lapo wic i cinŋ, ma en aye gityer me moko kwon
me nyeko. Ajwaka bimako pii makec me ceno dano i ciŋe.
19Ka ajwaka bimiyo dako-nu kwoŋo kwoŋ, kun waco ni, ‘Ka laco mo pe obuto
kwedi, ka pe iŋak woko, kun ijerre kekeni ma it ye i te twero pa cwari, ci gin
marac mo pe otimi pi pii man makec me ceno dano-ni.
20Ento ka ce waŋi olal woko, ma pud it ye i te twero pa cwari, ka ijerre kekeni, ci
laco mo ma pe cwari obuto kwedi,
21ci (ajwaka bimiyo dako-nu kwoŋo kwoŋ ma kelo ceno dano kun waco ki dako-
nu ni,) Rwot omi in idok ŋat ma giceno ki dano, kun dano gikwoŋo akwoŋa ki
nyiŋi i kin lutuwu, i kare ma Rwot bitweyo nyodoŋi woko ci miyo ii bene deŋ
woko;
22wek pii man me ceno dano ocit i cin ii, omi ii odeŋ, ci otwe nyodoŋi woko.’ Dako
bigamo ni, ‘Amen, Amen.’
23“Lacen ajwaka bicoyo lok me ceno dano-ni i karatac, ka dok lwoko vinone woko
ki pii makec-ci,
24ci bimiyo dakonu mato pii makec ma giceno ki dano-ni, ci pii me ceno dano
bidonyo i iye, miyo iye mwode matek.
25Ka dok ajwaka bikwanyo gityer me moko kwon me nyeko woko ki i cin dako-
nu, ci kwato gityer me moko kwon i nyim Rwot, tero i keno tyer.
26Ka ajwaka bijobo moko me gityer poŋ ciŋ acel obed gin me po i kome, biwaŋo i
wi keno tyer; ka dok lacen en bimiyo dako-nu mato pii.
27Ka doŋ omiyo omato pii, ka ce onoŋo en otyeko jerre kekene kun otimo kir i
kom cware, ci pii me ceno dano bidonyo i iye, miyo iye mwode matek; iye biden
woko, nyodone bitwene woko, dako-ni bidoko ŋat ma giceno dano ki nyiŋe i kin
lutugi.
28Ento ka dako-nu pe ojerre kekene, ma bal mo pe i kome, gin marac mo pe
bitimo, ci en binywalo litino.
Acoli Baibul
© 1985, Bible Society of Uganda.
29“Man aye cik ma mako lok me nyeko, ka dako ma tye i te twero pa cware noŋo
wage olal, ci ojerre kekene,
30nyo ka cwiny me nyeko omako laco mo, kun nyeko omake i kom dakone; en
bicibo dako i nyim Rwot, ci ajwaka bitiyo i kom dako kun lubo cik man ducu.
31Laco pe bibedo ki bal mo, ento bal bidok i wi dako ka obalo.”
Wel 6
1Rwot owaco bot Moses ni,
2“Wac bot jo Icrael ni, Ka laco mo nyo dako mo okwoŋo kwoŋ ma pire tek, kwoŋ
me bedo ajula pa Lubaŋa , ci okone gire kene pi bedo dano pa Rwot,
3 en bikone gire kene kun pe mato koŋo vino nyo gin ma mero dano; pe bimato
kono mawac ma oa i kom vino nyo i kom gin mo ma mero dano; pe bimato pig
nyig olok, kadi camo nyige madyak nyo mutwone.
4I kare ducu ma en okone iye gire kene, pe bicamo gin mo ma oa i kom olok, kadi
nyige matino ma i iye, wa odune.
5“I kare ducu ma noŋo en okwoŋo pire ni ebikone gire kene, lyedi pe bigudo
wiye; bibedo dano maleŋ o wa i kare ma en okone iye pi bedo dano pa Rwot doŋ
otum; biweko yer wiye lot maboco ma pe giŋolo.
6“I kare ma en okone iye gire kene pi bedo dano pa Rwot, pe binyiko cok i kom
dano muto.
7Pe biballe doko keni kadi pi wonne nyo minne, nyo ominne, nyo laminne ka ce
guto, pien gin ma nyuto konene kene pi bedo dano pa Lubaŋa pud tye i wiye.
8I kare ducu me konene kene en bibedo maleŋ pi Rwot.
9“Ka dano mo oto atura ka ŋete, ma miyo wiye ma okwero-ni odoko keni, en
bilyelo wiye i nino me lonnyene; bilyelo i nino me abirone.
10I kom nino me aborone en bitero amam aryo nyo litino akuri aryo bot ajwaka i
doggola kema me rwatte.
11Ajwaka bityero acel pi gitum me bal ki acel pi gitum awaŋa, kun timo gin
lakwany bal ki i kom dano-nu, pien onoŋo obalo pi gudo kom dano muto. En
bikwero wiye i nino meno kikome,
12ci kone gire pi bedo dano pa Rwot pi karene me kone kene, dok bikelo wod
romo ma ditte mwaka acel obed gitum me tiŋo alii; ento kare mukwono ca noŋo
oballe noŋo, pien yer wiye ma okwero-ni odoko keni.
13 “Man aye cik ma mako dano ma ajula pa Lubaŋa ka karene me kone kene doŋ
otum. Gibikele i doggola kema me rwatte,
Acoli Baibul
© 1985, Bible Society of Uganda.
14ci en bityero motte bot Rwot, wod romo acel me mwaka acel, ma kome pe ki
mwonyo, pi gitum awaŋa, ki bwoŋ romo acel ma ditte mwaka acel ma kome pe ki
mwonyo pi gityer lakwecwiny,
15kacel ki aduku me mugati ma tobi pe iye, capat me moko kwon mapwotte ma
girubo ki moo, ki capat marep ma tobi pe iye ma gireyo moo i komgi, ki gityer me
moko kwon ki gityer amata mutikogi.
16“Ajwaka bikelogi i nyim Rwot, ci tyero gitum me balle ki gitum me tiŋo alii.
17Ka dok bityero nyok romo obed gityer Lakwecwiny bot Rwot, kacel ki aduku
mugati ma tobi pe iye. Ka dok ajwaka bityero gityer me moko kwon ki gityer
amatane.
18Dano ma ajula pa Lubaŋa bilyelo yer wiye me kone kene i doggola kema me
rwatte, ci bikwanyo yer wiye me bedo ajula-ni, keto i mac ma tye i te gityer
lakwecwinynyi.
19Ajwaka bikwanyo bat nyok romo ka doŋ gitedo, ki capat acel ma tobi pe iye, ki i
aduku, ki capat marep acel ma tobi pe iye, biketogi i dye cin ajula, ka doŋ olyelo
yer wiye me kone kene.
20Ajwaka bikwatogi me bedo gityer me akwata i nyim Rwot; gin aye waŋ wat
maleŋ pa ajwaka, kacel ki gok ma gikwato-ni ki em ma gityero; lacen ajula doŋ
twero mato koŋo vino.
21“Man aye cik ma mako ajula ma okwoŋo kwoŋ. Gityerre bot Rwot bibedo ma
oporo kwoŋŋe ma okwoŋo me bedo ajula pa Lubaŋa, ma en miyo kacel ki gin ma
en romo noŋone: wek en oti ma oporo kwoŋ ma yam okwoŋo, kun lubo cik ma
mako konene kene me bedo ajula.”
Lamo gum pa ajwagi
22Rwot owaco bot Moses ni,
23“Wac bot Aron ki awobene ni, Wubilamo gum i kom jo Icrael kit man: ibiwaco
botgi ni,
24Rwot omini gum, ogwoki;
25Rwot oneni ki waŋ me kica, otimi ber
26Rwot tiŋ waŋe i komi omini kuc.
27Gibiketo nyiŋa i kom jo Icrael kit meno, ci an abimiyogi gum.”
Wel 7
1Ka Moses otyeko guro kema, owiro ki moo dok okwero kacel ki jamine ducu. Ka
dok owiro keno tyer ki moo bene, okwero kacel ki jami ticce ducu.
Acoli Baibul
© 1985, Bible Society of Uganda.
2I kare meno lutel wi Icrael, ma gin ludito kaka ki i odi pa kwarogi, lutel wi kaka
ma giloyo wi jo ma yam gikwano welgi-ni,
3gutyero gityer megi, gukelo i nyim Rwot. Gumiyo gadigadi abicel ma gitye ki gin
umo wigi, ki twoni apar wiye aryo; lutel wic aryo aryo gumiyo gadigadi acel acel,
ci ŋat acel acel omiyo twon acel; gutyerogi ki i nyim kema.
4Rwot dok owaco ki Moses ni,
5“Gam jami-ni woko ducu ki botgi wek giti kwedgi tic ma i kema me rwatte, ci
imigi bot Lulevi, macalo dog tic ma ŋat acel acel tye kwede.”
6Omiyo Moses ogamo gadigadi ducu ki twoni, ci omiyogi bot Lulevi.
7Gadigadi aryo ki twoni aŋwen omiyo bot likwayo pa Gercon, ma oporo dog ticgi;
8ka dok gadigadi aŋwen ki twoni aboro omiyo bot likwayo pa Merari, ma oporo
dog ticgi, kun gitye i te loc pa Itamar wod pa ajwaka Aron.
9Ento pe omiyo gin mo bot likwayo pa Kokat, pien yam giketogi i dog tic me
gwoko jami maleŋ ki me tiŋogi i wi gwokgi.
10Ci lutel wic gutyero gityer me kwero keno tyer i kom nino meno ma giwiro iye
ki moo-ni; lutel wic gutyero gityergi i nyim keno tyer.
11Rwot owaco bot Moses ni, “Gibityero gityergi kun latel wic acel acel tyero mere
i ninone, pi kwero keno me tyer.”
12Ŋat ma otyero gityerre i nino mukwoŋo en aye Nakucon wod pa Aminadab, ma
i kaka pa Juda.
13En otyero caani me ryal acel ma pekke romo cekel miya acel ki pyeradek, ki
becen me ryal acel ma pekke cekel pyerabiro, ka giporo ki cekel me kabedo
maleŋ; gin aryo ducu igi opoŋ ki moko kwon mapwotte ma girubo ki moo pi
gityer me moko kwon.
14Ka doki atabo me jabu acel ma pekke cekel apar ma opoŋ ki odok eceta;
15wod twon acel, nyok romo acel, ki wod romo acel me mwaka acel pi gitum
awaŋa;
16nyok dyel acel pi gitum me bal;
17ka doki pi gityer lakwecwiny otyero twoni aryo, nyogi romi abic, nyogi dyegi
abic, ki litino nyogi romi abic ma ditogi mwaka acel acel. Man aye gityer ma
Nakucon wod pa Aminadab otyero.
18I nino me aryone Netanel wod pa Juar, ma en aye latel wi jo pa Icakar otyero
gityer.
19Pi gityerre en otyero caani me ryal acel ma pekke romo cekel miya acel ki
pyeradek, ki becen me ryal acel ma pekke cekel pyerabiro, ka giporo ki cekel me
Acoli Baibul
© 1985, Bible Society of Uganda.
kabedo maleŋ; gin aryo ducu igi opoŋ ki moko kwon mapwotte ma girubo ki moo
pi gityer me moko kwon.
20Ka doki atabo me jabu acel ma pekke cekel apar ma opoŋ ki odok eceta;
21wod twon acel, nyok romo acel, ki wod romo acel me mwaka acel pi gitum
awaŋa:
22nyok dyel acel pi gitum me bal;
23ka doki pi gityer lakwecwiny otyero twoni aryo, nyogi romi abic, nyogi dyegi
abic, ki litino nyogi romi abic ma ditogi mwaka acel acel, Man aye gityer ma
Netanel wod pa Juar otyero.
24I nino me adekke obedo kare pa Eliab wod pa Kelon, ma en aye latel wi jo pa
Jabulon.
25Pi gityerre en otyero caani me ryal acel ma pekke romo cekel miya acel ki
pyeradek, ki becen me ryal acel ma pekke cekel pyerabiro, ka giporo ki cekel me
kabedo maleŋ; gin aryo ducu igi opoŋ ki moko kwon mapwotte ma girubo ki moo
pi gityer me moko kwon.
26Ka doki atabo me jabu acel ma pekke cekel apar ma opoŋ ki o dok eceta;
27wod twon acel, nyok romo acel, ki wod romo acel me mwaka acel pi gitum
awaŋa;
28nyok dyel acel pi gitum me bal;
29ka doki pi gityer lakwecwiny otyero twoni aryo, nyogi romi abic, nyogi dyegi
abic, ki litino nyogi romi abic ma ditogi mwaka acel acel. Man aye gityer ma Eliab
wod pa Kelon otyero.
30I nino me aŋwenne obedo kare pa Elijur wod pa Cedeur, ma en aye latel wi jo
pa Reuben.
31Pi gityerre en otyero caani me ryal acel ma pekke romo cekel miya acel ki
pyeradek, ki becen me ryal acel ma pekke cekel pyerabiro, ka giporo ki cekel me
kabedo maleŋ; gin aryo ducu igi opoŋ ki mo ko kwon mapwotte ma girubo ki
moo pi gityer me moko kwon.
32Ka doki atabo me jabu acel ma pekke cekel apar ma opoŋ ki odok eceta;
33wod twon acel, nyok romo acel, ki wod romo acel me mwaka acel pi gitum
awaŋa;
34nyok dyel acel pi gitum me bal;
35ka doki pi gityer lakwecwiny otyero twoni aryo, nyogi romi abic, nyogi dyegi
abic, ki litino nyogi romi abic ma ditogi mwaka acel acel, Man aye gityer ma Elijur
wod pa Cedeur otyero.
Acoli Baibul
© 1985, Bible Society of Uganda.
36I nino me abicce obedo kare pa Celumiel wod pa Juricadai, ma en aye latel wi jo
pa Cimeon.
37Pi gityerre en otyero caani me ryal acel ma pekke romo cekel miya acel ki
pyeradek, ki becen me ryal acel ma pekke cekel pyerabiro, ka giporo ki cekel me
kabedo maleŋ; gin aryo ducu igi opoŋ ki moko kwon mapwotte ma girubo ki moo
pi gityer me moko kwon.
38Ka doki atabo me jabu acel ma pekke cekel apar ma opoŋ ki odok eceta;
39wod twon acel, nyok romo acel, ki wod romo acel me mwaka acel pi gitum
awaŋa;
40nyok dyel acel pi gitum me bal;
41ka doki pi gityer lakwecwiny otyero twoni aryo, nyogi romi abic, nyogi dyegi
abic, ki litino nyogi romi abic ma ditogi mwaka acel acel, Man aye gityer ma
Celumiel wod pa Juricadai otyero.
42I nino me abicelle obedo kare pa Eliacap wod pa Deuel, ma en aye latel wi jo pa
Gad.
43Pi gityerre en otyero caani me ryal acel ma pekke romo cekel miya acel ki
pyeradek, ki becen me ryal acel ma pekke cekel pyerabiro, ka giporo ki cekel me
kabedo maleŋ; gin aryo ducu igi opoŋ ki moko kwon mapwotte ma girubo ki moo
pi gityer me moko kwon.
44Ka doki atabo me jabu acel ma pekke cekel apar ma opoŋ ki odok eceta;
45wod twon acel, nyok romo acel, ki wod romo acel me mwaka acel pi gitum
awaŋa:
46nyok dyel acel pi gitum me bal;
47ka doki pi gityer lakwecwiny otyero twoni aryo, nyogi romi abic, nyogi dyegi
abic, ki litino nyogi romi abic ma ditogi mwaka acel acel, Man aye gityer ma
Eliacap wod pa Deuel otyero.
48I nino me abirone obedo kare pa Elicama wod pa Amikud, ma en aye latel wi jo
pa Epraim.
49Pi gityerre en otyero caani me ryal acel ma pekke romo cekel miya acel ki
pyeradek, ki becen me ryal acel ma pekke cekel pyerabiro, ka giporo ki cekel me
kabedo maleŋ; gin aryo ducu igi opoŋ ki moko kwon mapwotte ma girubo ki moo
pi gityer me moko kwon,
50ka doki atabo me jabu acel ma pekke cekel apar ma opoŋ ki odok eceta;
51wod twon acel, nyok romo acel, ki wod romo acel me mwaka acel pi gitum
awaŋa;
Acoli Baibul
© 1985, Bible Society of Uganda.
52nyok dyel acel pi gitum me bal;
53ka doki pi gityer lakwecwiny otyero twoni aryo, nyogi romi abic, nyogi dyegi
abic, ki litino nyogi romi abic ma ditogi mwaka acel acel. Man aye gityer ma
Elicama wod pa Amikud otyero.
54I nino me aborone obedo kare pa Gamaliel wod pa Pedajur, ma en aye latel wi
jo pa Manace.
55Pi gityerre en otyero caani me ryal acel ma pekke romo cekel miya acel ki
pyeradek, ki becen me ryal acel ma pekke cekel pyerabiro, ka giporo ki cekel me
kabedo maleŋ; gin aryo ducu igi opoŋ ki moko kwon mapwotte ma girubo ki moo
pi gityer me moko kwon.
56Ka doki atabo me jabu acel ma pekke cekel apar ma opoŋ ki odok eceta;
57wod twon acel, nyok romo acel, ki wod romo acel me mwaka acel pi gitum
awaŋa;
58nyok dyel acel pi gitum me bal;
59ka doki pi gityer lakwecwiny otyero twoni aryo, nyogi romi abic, nyogi dyegi
abic, ki litino nyogi romi abic ma ditogi mwaka acel acel. Man aye gityer ma
Gamaliel wod pa Pedajur otyero.
60I nino me aboŋwenne obedo kare pa Abidan wod pa Gideoni, ma en aye latel wi
jo pa Benjamin.
61Pi gityerre en otyero caani me ryal acel ma pekke romo cekel miya acel ki
pyeradek, ki becen me ryal acel ma pekke cekel pyerabiro, ka giporo ki cekel me
kabedo maleŋ; gin aryo ducu igi opoŋ ki moko kwon mapwotte ma girubo ki moo
pi gityer me moko kwon.
62Ka doki atabo me jabu acel ma pekke cekel apar ma opoŋ ki odok eceta;
63wod twon acel, nyok romo acel ki wod romo acel me mwaka acel pi gitum
awaŋa;
64nyok dyel acel pi gitum me bal;
65ka doki pi gityer lakwecwiny otyero twoni aryo, nyogi romi abic, nyogi dyegi
abic, ki litino nyogi romi abic ma ditogi mwaka acel acel. Man aye gityer ma
Abidan wod pa Gideoni otyero.
66I nino me aparre obedo kare pa Akiejer wod pa Amicadai, ma en aye latel wi jo
pa Dan.
67Pi gityerre en otyero caani me ryal acel ma pekke romo cekel miya acel ki
pyeradek, ki becen me ryal ma pekke cekel pyerabiro, ka giporo ki cekel me
kabedo maleŋ; gin aryo ducu igi opoŋ ki moko kwon mapwotte ma girubo ki moo
pi gityer me moko kwon.
Acoli Baibul
© 1985, Bible Society of Uganda.
68Ka doki atabo me jabu acel ma pekke cekel apar ma opoŋ ki odok eceta;
69wod twon acel, nyok romo acel, ki wod romo acel me mwaka acel pi gitum
awaŋa;
70nyok dyel acel pi gitum me bal;
71ka doki pi gityer lakwecwiny otyero twoni aryo, nyogi romi abic, nyogi dyegi
abic, ki litino nyogi romi abic ma ditogi mwaka acel acel. Man aye gityer ma
Akiejer wod pa Amicadai otyero.
72I nino me apar wiye acel obedo kare pa Pagiel wod pa Okoran, ma en aye latel
wi jo pa Acer.
73Pi gityerre en otyero caani me ryal acel ma pekke romo cekel miya acel ki
pyeradek, ki becen me ryal ma pekke cekel pyerabiro, ka giporo ki cekel me
kabedo maleŋ; gin aryo ducu igi opoŋ ki moko kwon mapwotte ma girubo ki moo
pi gityer me moko kwon.
74Ka dok atabo me jabu acel ma pekke cekel apar ma opoŋ ki odok eceta;
75wod twon acel, nyok romo acel, ki wod romo acel me mwaka acel pi gitum
awaŋa;
76nyok dyel acel pi gitum me bal;
77ka doki pi gityer lakwecwiny otyero twoni aryo, nyogi romi abic, nyogi dyegi
abic, ki litino nyogi romi abic ma ditogi mwaka acel acel. Man aye gityer ma
Pagiel wod pa Okoran otyero.
78I nino me apar wiye aryo obedo kare pa Akira wod pa Enan, ma en aye latel wi
jo pa Naputali.
79Pi gityerre en otyero caani me ryal acel ma pekke romo cekel miya acel ki
pyeradek, ki becen me ryal ma pekke cekel pyerabiro, ka giporo ki cekel me
kabedo maleŋ; gin aryo ducu igi opoŋ ki moko kwon mapwotte ma girubo ki moo
pi gityer me moko kwon.
80Ka dok atabo me jabu acel ma pekke cekel apar ma opoŋ ki odok eceta;
81wod twon acel, nyok romo acel, ki wod romo acel me mwaka acel pi gitum
awaŋa;
82nyok dyel acel pi gitum me bal;
83ka doki pi gityer lakwecwiny otyero twoni aryo, nyogi romi abic, nyogi dyegi
abic, ki litino nyogi romi abic ma ditogi mwaka acel acel. Man aye gityer ma Akira
wod pa Enan otyero.
Acoli Baibul
© 1985, Bible Society of Uganda.
84Man aye obedo gityer me kwero keno tyer, ma gityero i kom nino ma giwiro iye
ki moo, ma oa ki bot lutel wi Icrael: caani me ryal apar wiye aryo, becen me ryal
apar wiye aryo, ki atabo me jabu apar wiye aiyo,
85kun caani me ryal acel acel pekke romo cekel miya acel ki pyeradek, ki becen
acel acel pekke romo cekel pyerabiro, mumiyo ryal me jami-nu ducu pekke
oromo cekel alip aryo, ki miya aŋwen ka giporo ki cekel me kabedo maleŋ.
86Atabo me jabu onoŋo tye apar wiye aryo, ma odok eceta opoŋo igi, kun atabo
acel acel pekke romo cekel apar ka giporo ki cekel me kabedo maleŋ, mumiyo
jabu me atabo ducu oromo cekel miya acel ki pyeraryo.
87Lim makwo ducu pi gitum awaŋa giromo twoni apar wiye aryo, nyogi romi
apar wiye aryo, ki litino nyogi romi apar wiye aryo ma ditogi mwaka acel acel,
kacel ki gityer me moko kwon mutikogi; ki nyogi dyegi apar wiye aryo pi gitum
me bal.
88Lim makwo ducu pi gityer lakwecwiny giromo twoni pyeraryo wiye aŋwen,
nyogi romi pyerabicel, nyogi dyegi pyerabicel, ki litino nyogi romi ma ditogi
mwaka acel acel pyerabicel. Meno aye obedo gityer me kwero keno tyer, ma
gityero ka doŋ gityeko wirone ki moo.
89I kare ma Moses ocito i kema me rwatte ka lok iye ki Rwot, owinyo dwan ma
tye ka lok kwede-ni ka a ki malo i wi kom me kica ma i wi canduk lok me caden-
ni, kun winnye ki i kin lukerubi aryo, ma kun loko kwede.
Wel 8
1 Rwot owaco ki Moses ni,
2“Wac bot Aron ni, Ka icibo laput malo, laput abiro-ni bimenyo kabedo ma i nyim
okar-mac.”
3Ci Aron otimo kit meno; ocibo mac laputte malo wek gumeny kabedo ma i nyim
okarmac, macalo Rwot ociko ki Moses.
4Man aye kit tic ma gitiyo kwede okar-mac, gitiyo ki jabu ma giteto ki nyol. Nia ki
i tedi tere o kwede wa i kom cal aturene onoŋo gitiyo kun giteto ki nyol; Moses
otiyo okar-mac kun lubo kit cal ma Rwot onoŋo onyuto bote.
Kwero Lulevi pi tic maleŋ
5Rwot owaco ki Moses ni,
6“Kwany Lulevi woko ki i kin jo Icrael, ci ilonygi.
7Ibitimogi kit man pi lonyogi: kir pii me lwoko bal i komgi, ci wek gin gulyel
komgi woko ducu ki lyedi, gulwok boŋŋigi, gulonnye kekengi.
Acoli Baibul
© 1985, Bible Society of Uganda.
8Lacen wek gin gukwany wod twon kacel ki gityer me moko kwon mutike, me
moko kwon mapwote ma girubo ki moo, ka doki in ibikwanyo wod twon mukene
pi gitum me bal.
9Ka doŋ ibitero Lulevi i nyim kema me rwatte, kun icoko lwak jo Icrael ducu
kacel.
10Ka itero Lulevi i nyim Rwot, jo Icrael gibiketo ciŋgi i wigi,
11ka Aron bityero Lulevi i nyim Rwot gubed gityer akwata ma oa ki bot jo Icrael,
wek gubed ka tiyo tic pa Rwot.
12Ka dok Lulevi gibiketo ciŋgi i wi twoni, ci ibityero acel pi gitum me bal, ki acel
pi gitum awaŋa bot Rwot, pi kwanyo bal ki i kom Lulevi.
13Ibitero Lulevi i nyim Aron ki awo bene, ci ibityerogi gubed gityer akwata bot
Rwot.
14“Ibipoko Lulevi woko ki i kin jo Icrael kit meno, ci Lulevi doŋ bibedo jona.
15Ka doŋ lacen Lulevi gibidonyo ka tiyo tic ma i kema me rwatte, ka doŋ ityeko
lonyogi kun ityerogi macalo gityer akwata.
16Pien gityeko miyogi bota matwal ki i kin jo Icrael; atyeko kwanyogi pira kena
ma ka litino ducu mukwoŋo yabo ic, ma litino kayo pa jo Icrael ducu.
17 Pien litino kayo ducu ma i kin jo Icrael gin mera, pa dano ki pa lee bene; yam
akwerogi gubed mera i nino ma aneko iye litino kayo ducu ma i lobo Ejipt.
18Ci doŋ atyeko kwanyo jo pa Levi me leyo ka tyengi, gin litino kayo ducu ma i kin
jo Icrael.
19Dok atyeko miyo Lulevi bot Aron ki awobene me mot, kun gia woko ki i kin jo
Icrael pi tiyo tic i kema me rwatte pi jo Icrael, dok pi kwanyo bal ki i kom jo
Icrael, wek gemo mo pe opot i kom jo Icrael pi nyiko cok ki kabedo maleŋ.”
20Moses ki Aron ki lwak jo Icrael ducu gutiyo kit meno i kom Lulevi; kit ducu ma
yam Rwot ociko ki Moses i kom Lulevi-ni, jo Icrael bene gutimo i komgi kit meno.
21Lulevi gulonnye kekengi i kom balgi; gulwoko boŋŋigi; ka Aron otyerogi macalo
gityer akwata i nyim Rwot, ci Aron otimo gin lakwany bal ki i komgi wek gubed
ma gulony.
22Lacen Lulevi gudonyo ka tiyo ticgi i kema me rwatte me konyo Aron ki
awobene; kit ma onoŋo Rwot ociko ki Moses i kom Lulevi, gitimogi kit meno.
Kare me tic pa Lulevi
23Rwot owaco ki Moses ni
24“Man aye lok ma mako Lulevi: jo ma ditogi romo mwaka pyeraryo wiye abic ki
dok kwede malo gibidonyo ka cobo dog ticgi ma gitiyo pi kema me rwatte.
Acoli Baibul
© 1985, Bible Society of Uganda.
25Ka mwaka me ditogi oromo pyerabic, ci doŋ gibiweko ticgi ma gitiyo, pe doŋ
gibitic matwal.
26Ento gibikonyo omegigi ma i kema me rwatte wek gugwok cik ma mako ticgi,
ento pe gibitiyo tic kikome. Ibitimo Lulevi kit meno pi lok ma dok i kom ticgi.”
Wel 9
1 Rwot oloko ki Moses i tim Cinai i dwe mukwoŋo me mwaka me aryone ma
onoŋo doŋ gua woko ki i lobo Ejipt kun wacce ni,
2“Jo Icrael myero gukwer nino madit me Kato i kare ma giciko.
3I nino dwe apar wiye aŋwen me dwe man otyeno, i kare ma giciko, en aye
wubikwero iye; wubikwero kun wulubo cikke ducu ki lok ducu ma giciko i
kome.”
4Kit meno Moses ociko jo Icrael ni gukwer nino madit me Kato.
5Ci gukwero nino me Kato i dwe mukwono, i nino dwe apar wiye aŋwen, otyeno i
tim Cinai; kit ducu ma yam Rwot ociko ki Moses, jo Icrael bene gutimo kit meno.
6Onoŋo tye jo mogo ma gudoko keni pi gudo kom dano muto, mumiyo pe gitwero
kwero nino madit me Kato i nino meno. Gucito bot Moses ki Aron i nino meno;
7ci jo meno guwacce ni, “Wan doŋ wadoko keni pi gudo kom dano muto; piŋo
gigenowa pe watyer gityer pa Rwot i kin jo Icrael i kare ma giciko?”
8Moses owaco botgi ni, “Koŋ wukur wek koŋ awiny gin ma Rwot biciko i komwu.”
9Rwot owaco bot Moses ni.
10“Wac bot jo Icrael ni, Kadi bed ŋatti mo i kinwu, nyo i kin likwayowu, odoko
keni pi gudo kom dano muto, nyo otiŋo wot mabor, en pud twero kwero Kato pa
Rwot.
11Gibikwero i dwe me aryo, i nino dwe apar wiye aŋwen, otyeno; gibicamo iye
mugati ma tobi pe iye ki dek mogo makec.
12 Pe gibiweko gin mo doŋ nio odiko, cogone mo pe gibituro; gibikwero kun
gilubo cik ducu ma mako nino me Kato.
13Ento dano ma olony, ma pe ocito ka wot mo, ento dok oweko kwero nino madit
me Kato, dano meno waŋe birwenyo woko ki i kin lutugi, pien onoŋo pe otyero
gityer pa Rwot i kare ma giciko; dano meno balle bidok i wiye.
14Ka larok mo obedo i kinwu, ka en kwero Kato pa Rwot, en bitiyo kun lubo cik
me nino me Kato ki gin ma giciko iye. Wubibedo ki cik acel pi labedo ki pi
anywalli me lobo.”
Pol i wi kema
Acoli Baibul
© 1985, Bible Society of Uganda.
15I kom nino ma giguro iye kema pa Lubaŋa, en aye pol obino, oboyo kom kema
woko, en kema lok me caden; otyeno oumo wi kema ma nen macalo mac nio wa
odiko.
16Ci obedo kwede kit meno jwijwi; pol umo wiye dyeceŋ, ki gin macalo mac umo
dyewor.
17Ka ce pol owarre woko ki i kema, ci jo Icrael gicako wot anyim; i kabedo ka ma
pol ocuŋ iye, jo Icrael giguro iye kemagi.
18Jo Icrael gicako wot pi cik pa Rwot, dok pi cik pa Rwot giguro kemagi; ka ce pol
pud oumo wi kema pa Rwot, ci gin bene pud gibedo i gonygi.
19Ka pol omedde ki umo wi kema lwak nino mapol, jo Icrael bene gimedde ki
gwoko cik ma mako tic pa Rwot kun pe gidak.
20I kare mukene pol umo wi kema pi nino mo manok, ci pi lubo cik pa Rwot gin
bene gibedo i gony megi-nu kit meno; dok pi lubo cik pa Rwot miyo gidak.
21I kin mukene pol bedo cakke otyeno nio wa odiko; ka odiko pol owarre woko ki
i wiye, ci gicako wot; nyo ka omedde ori pi nino acel ki dywor acel, kare ma pol
owarre iye-ni, en aye gicako iye wot bene.
22Kadi bed ori i wiye pi nino aryo, nyo dwe acel, nyo pi kare mo malac, ka ce pol
pud omedde ki umo wi kema, kun bedo kenyo, ci jo Icrael bene koŋ gibedo i
gonygi kun pe gidak; ento ka owarre woko, ci gin bene gicako wot.
23Pi lubo cik pa Rwot miyo giguro kemagi, dok pi lubo cik pa Rwot miyo gidak,
kun gigwokocik ma mako tic pa Rwot kit ma yam Rwot ociko ki i dog Moses.
Wel 10
1Rwot owaco bot Moses ni,
2“Yub tum aryo me ryal ma ibitetogi ki nyol, ci ibitic kwedgi me lwoŋo lwak ki pi
cako wot.
3Ka gikuto tum aryo ducu, ci lwak ducu gibicokke kacel boti i doggola kema me
rwatte.
4Ento ka gikuto tum acel keken, ci lutel wic, ma gin ludito ma i kaka ducu pa jo
Icrael, gibicokke kacel boti.
5Ka wukuto okok maloŋo kicel, ci gony ma yo tun wokceŋ gibicako wot.
6Ka wukuto okok maloŋo tyen me aryone, ci gony ducu ma yo tun acuc gibicako
wot. Gibikuto tum kok maloŋo me cako wot anyim.
7Ento ka wumito coko lwak kacel wubikuto, ento pe wukut okok maloŋo.
Acoli Baibul
© 1985, Bible Society of Uganda.
8Awobe pa Aron, ma gin aye ajwagi, gibikuto tumo Cik me kuto tum bibedo
botwu cik matwal nio wa i kare pa likwayowu ducu.
9Ka wucito i mony ka lweny ki lukworwu ma gidiyowu i lobowu, ci wubimiyo
oduru mony kok kun wukuto tum, wek Rwot Lubaŋawu opo piwu ci olarwu ki
bot lukworwu.
10I nino ma cwinywu yom iye bene, ki i nino madito ma gicikowu pigi, ki i kare
me por dwe ducu, wubikuto iye tum i wi gitum awaŋa mewu, ki i wi gitum mewu
me gityer lakwecwiny; gibikutogi wek Lubaŋa opo piwu; an a Rwot Lubaŋawu.”
Jo Icrael gua woko ki i Cinai
11I mwaka me aryone, i dwe me aryone, i kom nino dwe pyeraryo, pol ocako
warre woko ki i wi kema lok me caden,
12omiyo jo Icrael gucako wot, gua woko ki i tim Cinai kun giwoto, gikobo; ci pol
ocito ocuŋ wa i tim Paran.
13Gudak tyen man mukwoŋo kit ma Rwot yam ociko ki Moses.
14Bendera me gony pa jo pa Juda aye gutelo yo ki buca monygi ducu; lawimonygi
aye Nakucon wod pa Aminadab.
15Lawimony me kaka pa Icakar obedo Natanel wod pa Juar,
16ki lawimony me kaka pa Jabulon obedo Eliab wod pa Kelon.
17Ka kema pa Rwot doŋ giputo, ci likwayo pa Gercon ki likwayo pa Merari ma
gitiŋo kema, gucako wotgi.
18Ki bendera me gony pa jo pa Reuben ocako wot ki buca monygi ducu;
lawimonygi obedo Elijur wod pa Cedeur
19Lawimony me kaka pa Cimeon obedo Celumiel wod pa Juricadai.
20Lawimony me kaka pa Gad obedo Eliacap wod pa Deuel.
21Dok jo pa Kokat gucako wot, kun gitiŋo jami maleŋ ducu; kema onoŋo doŋ
giguro ocuŋ ma peya guo.
22Ka dok bendera me gony pa jo pa Epraim ocako wot ki buca monygi ducu;
lawimonygi obedo Elicama wod pa Amikud.
23Lawimony me kaka pa Manace obedo Gamaliel wod pa Pedajur.
24Lawimony me kaka pa Benjamin obedo Abidan wod pa Gideoni.
25Lacen bendera me gony pa jo pa Dan ocako wot ki buca monygi ducu, kun
gicoko ŋe gony ducu; lawimony megi obedo Akiejer wod pa Amicadai.
26Lawimony me kaka pa Acer obedo Pagiel wod pa Okoran.
27Lawimony me kaka pa Naputali obedo Akira wod pa Enan.
Acoli Baibul
© 1985, Bible Society of Uganda.
28Man aye onoŋo kit wot pa jo Icrael, ma lubo buca monygi, i kare ma gimol me
cako wot.
29Moses owaco bot Kobab wod pa Reuel ma Lamidian, won dakone, ni, “Wan
wacako wot wadak i kabedo ma Rwot cen owaco pire ni ebimiyowa-ni. Ber iwot
kwedwa, ci wabitimi maber.”
30Ento Kobab owacce ni, “An pe abicito; abidok i lobo tuwa ki bot lutuwa.”
31Moses ogamo ni, “Alegi, pe iwekwa, pien in iŋeyo ni wabigony i tim, ci ibibedo
botwa ma ka waŋwa.
32Dok ka ibiwoto kwedwa, gin maber ducu ma Rwot bitimo i komwa, wan bene
wabitimi kit meno.”
33Gucako a woko ki i nyim got pa Rwot, ci gutiŋo wot me nino adek; ci canduk me
gicikke pa Rwot owoto otelo yo nyimgi wot me nino adek pi yenyo kabedo me
yweyogi,
34kun pol pa Rwot woto lamalo ka wigi ki i dyeceŋ, i kare ducu ma gicako wot nia
ki i gonygi.
35 Kare ducu ka canduk cako wot, ci Moses waco ni, “Doŋ ia malo, ai Rwot imi
lumerok meri guket woko ata; wek jo ma dagi guriŋ woko ki i nyimi.”
36Ka doŋ ocun ka yweyo, ci en dok waco ni, “Doŋ idwog cen, ai Rwot, bot lwak
doggola mapol mada ma i Icrael.”
Wel 11
1Dano gubedo ka lok ki akeca pi can ducu ma gitye iye, ci Rwot owinyo; ka Rwot
otyeko winyone, kiniga omake, ci mac pa Rwot opoto, olyel i kingi, owaŋo kabedo
mogo ma i ŋet gony.
2Lwak gukok bot Moses, ci Moses olego Rwot, ka mac ocako pye.
3Mumiyo nyiŋ kabedo meno gilwoŋo ni, Tabera , pien mac pa Rwot olyel i kingi.
4I kare meno lwak jo a ta ma gitye i kingi cwinygi opukke matek, omiyo jo Icrael
bene gucako koko doki, kun giwaco ni, “Lutuwa, aŋa ma bimiyowa riŋo me
acamawa?
5Pud wapo pi rec ma yam wacamo nono i Ejipt, ki pi okwer ki okono ki kituŋgulu
maboco ki kituŋgulu matino ki kituŋgulu matikki;
6ento i kare-ni kero komwa doŋ peke, dok gin mo bene doŋ peke, kono nyo
manna man ma waneno keme-ni.”
7 Onoŋo manna nen macalo nyig koo, dok bene nen macalo odok yat ma gilwoŋo
bedola.
Acoli Baibul
© 1985, Bible Society of Uganda.
8Dano gicito ka jobone, ka girego ki kidi nyo giodo ki pany, ka gitedo ki agulu, nyo
gitimo ki capatine; ka gicamo, mitte rom ki mit pa capat ma gitedo ki moo.
9 Ka toyo oluk i dye gony ki i dyewor, ci manna bene poto piny.
Moses oyero ludoŋo pyerabiro
10Moses owinyo ka dano gikok i doggolagi ducu, kun ŋat acel acel tye i dog
kemane; ci kiniga omako Rwot matek, Moses bene cwinye pe obedo yom.
11Moses owaco bot Rwot ni, “Piŋo itima marac kuman? Piŋo an pe anoŋo gum mo
i nyimi, mumiyo in doŋ iketo peko pa lwak man ducu i koma?
12Onoŋo an aye abedo min lwak man ducu bo? An aye yam anywalogi bo,
mumiyo Iwaco bota ni atiggi i kora, macalo lapidi tiŋo latin ma pud dot, atergi i
lobo ma yam ikwoŋo pire ni ibimiyo bot kwarogi?
13Ni kono abinoŋo riŋo kwene me amiya ki lwak dano man ducu? Pien gibedo ka
kok i nyima kun giwaco ni, ‘Miniwa riŋo wek wacam.’
14An pe atwero tigo lwak dano man pira kena; yecce pek mukato kare.
15Ka ibedo ka tima kit man, ci ber ineka woko magicel, ka anoŋo gum mo i nyimi,
wek pe abed ka neno can kuman.”
16Rwot owaco bot Moses ni, “Cokka jo pyerabiro ki i kin ludoŋo pa jo Icrael, ma
iŋeyo ni gin ludoŋo ki i kin lwak ki ludito ma loyogi; ci ikelgi i kema me rwatte,
wek gucuŋ kunnu kacel kwedi.
17An abilor piny abino ka lok kwedi kunnu; ci abikwanyo cwinya mo ma tye i
komi-ni, abiketo i komgi; miyo gibinywako tigo peko pa lwak kacel kwedi, wek in
pe doŋ ibed ka tiŋone piri keni.
18Wac bot lwak ni, ‘Wulonnye kekenwu wubed maleŋ pi nino ma diki, ci
wubicamo riŋo; pien wubedo ka kok i it Rwot kun wuwaco ni, “Aŋa ma bimiyowa
riŋo me acamawa? Pien yam onoŋo watye maber giwa i Ejipt.” Pi meno Rwot
bimiyowu riŋo ci wubicamo.
19Pe wubicamo pi nino acel keken, nyo nino aryo, nyo abic, nyo apar, nyo
pyeraryo,
20ento wubicamo pi dwe acel kulu, nio ka bikatti woko ki i umwu, nio ka ocido
cwinywu woko, pien wutyeko kwero Rwot ma bedo i kinwu-ni kun wukok i
nyime ki pig waŋwu, wuwaco ni, “Piŋo yam waa woko ki i Ejipt?”’”
21Ento Moses ogamo ni, “Jo ma abedo i kingi welgi romo alip miya abicel, co ma
giwoto ki tyengi, ci in iwaco ni, ‘Abimiyogi riŋo wek gucam pi dwe kulu!’
22Myero ginek lwak lim makwo, romi ki dyaŋi-gu, wek oromgi? Nyo lwak rec
ducu ma, tye i nam gibicoko kacel pigi, wek oromgi?”
Acoli Baibul
© 1985, Bible Society of Uganda.
23Rwot ogamo dog Moses ni, “Cin Rwot aye doŋ odoko cek bo? Ibineno tin ka ce
lokka bicobbe boti kakare nyo pe.”
Ludoŋo guloko macalo lunebi
24Moses okato woko ka tito ki dano lok ma Rwot owaco; ci ocoko jo pyerabiro ki i
kin ludoŋo pa jo Icrael, oketogi gurumo kema me rwatte.
25Ka Rwot olor piny ki pol, ci oloko kwedgi, okwanyo cwinye mo ma tye i kom
Moses, oketo i kom ludoŋo pyerabiro. Ka cwiny pa Lubaŋa opoto i komgi, ci
gucako lok macalo lunebi. Ento pe dok gumedde ki timo kit meno.
26Onoŋo jo aryo gudoŋ cen i gony, acel nyiŋe Eldad ki mukene nyiŋe Medad, ci
cwiny pa Lubaŋa opoto i komgi. Onoŋo gitye i kin jo ma yam gicoyo nyiŋgi-ni,
ento pe gukato woko gucito i kema me rwatte, mumiyo gubedo ka lok macalo
lunebi i dye gony.
27Latin awobi mo oriŋo otito bot Moses ni, “Eldad ki Medad gitye ka lok macalo
lunebi i dye gony.”
28Ci Yocwa wod pa Nun, ma onoŋo obedo lakeny pa Moses cakke wa i tinone,
owacci, “Moses, laditta, jukgi woko.”
29Ento Moses owaco bote ni, “In nyeko omaki pira ce? Kono jo pa Rwot ducu
gubedo lunebi, kono ber mada, wek Rwot oony cwiny mere i komgi!”
30Ci Moses ki ludoŋo pa jo Icrael gudok i gony.
Rwot ocwalo aluru
31Ka Rwot omiyo yamo okodo, ci okelo lwak aluru nia ki i nam, ci gupoto piny i
ŋet gony. Lacce romo wot me nino acel ki tuŋcel, dok ki tuŋ mukene bene lacce
romo wot me nino acel ma orumo gony ducu, opoŋo piny ma romo futi adek kulu.
32Dano gutwarre ka cokogi i nino meno dyeceŋ ki dyewor benebene, ki orwone
bene. Jo ma gucoko manok keken gucoko muromo guniya pyeradek; ci gucako
moyone murumo gony.
33I kare ma riŋone pud omoko i kin lakgi, ma peya gucamo otum, kiniga omako
Rwot i kom dano, ci opwodo lwak ki two gemo mapek.
34Mumiyo nyiŋ kabedo meno gulwoŋo ni, Kibrot-atava , pien jo ma kecgi dwoŋ
giyikogi kunnu.
35Nia ki i Kibrotatava lwak gutiŋo wot me cito Kajerot, ci gutiro gubedo kunnu.
Wel 12
1Onoŋo Moses onyomo dako mo ma nya jo Kuc, ci Miriam ki Aron gucako loko lok
akeca i kom Moses pi dako-nu.
Acoli Baibul
© 1985, Bible Society of Uganda.
2Gubedo ka waco ni, “Rwot obedo ka lok ki dog Moses kene bo? Pe obedo ka lok
ki dogwa bene?” Ci Rwot owinyo yo.
3Moses onoŋo yam mwol matek, mwol makato dano ducu ma onoŋo yam gitye i
wi lobo-ni.
4Cutcut Rwot owaco bot Moses ki Aron ki Miriam ni, “Wukat woko, wun adek
ducu, wubin i kema me rwatte.” Gin adek ducu gukato woko.
5Ci Rwot olor piny ki wir me pol, ocuŋ i dog kema me rwatte, ka olwoŋo Aron ki
Miriam. Gin aryo ducu gukato anyim.
6Ci owacci, “Wuwiny lokka. Ka ce tye lanebi mo i kinwu, an Rwot aweko en ŋeya
ki i ginanyuta, aloko kwede ki i waŋ lek.
7 Ento bot laticca Moses pe bedo kit meno; pien atyeko keto oda ducu i ciŋe.
8Abedo ka lok kwede waŋ ki waŋ, ka maleŋ atyer, pe agoŋo lok; en neno kit ma
Rwot cal kwede, Piŋo pe wulworo loko lok akeca i kom laticca Moses?”
9Kiniga omako Rwot i komgi, ci ocito woko.
10Ka pol owarre woko ki i wi kema me rwatte, ci nen, kom Miriam orugo woko
cut, okwor matar macalo pee. Ka Aron olokke yo tuŋ bot Miriam, oneno kome
orugo woko matar
11ci owaco bot Moses ni, “Ai, laditta, pe iket can i komwa pien watimo lok me
miŋo, doŋ wabalo.
12Pe iwek en obed macalo latin ma ginywalo ma doŋ oto, ma riŋo kome nucune
doŋ oballe woko ma pud oa aaya ki i minne.”
13Moses okok bot Rwot ni, “Caŋe ba, ai Lubaŋa, abako doga boti do.”
14 Ento Rwot owaco bot Moses ni, “Ka nene wonne aye onoŋo oŋulo laa i waŋe
keken, kono pe en obedo ki lewic pi nino abiro? Wek koŋ gitweye woko i ŋe gony
pi nino abiro, ka lacen gibikele doŋ i gony.”
15Kit meno gitweyo Miriam woko i ne gony pi nino abiro; ci lwak pe gumedo ki
dak ka mo nio waŋ ma gimiyo Miriam odwogo woko i gony.
16Ka doŋ lacen dano gucako wot nia ki i Kajerot, ci gugony i tim Paran gubedo iye.
Wel 13
1Rwot owaco bot Moses ni,
2“Cwal dano gucit gurot lobo Kanaan ma abimiyo bot jo Icrael. Cwal dano acel ki i
kaka acel acel pa kwarogi, kun dano acel acel bedo latel wic i kingi.”
Acoli Baibul
© 1985, Bible Society of Uganda.
3Moses ocwalogi ki i tim me Paran, kit macalo Rwot ociko; gin ducu onoŋo gin
ludito i kin jo Icrael.
4Nyiŋi ene; i kaka pa Reuben Camua wod pa Jakur;
5i kaka pa Cimeon Capat wod pa Kori;
6i kaka pa Juda Kaleb wod pa Jepune;
7i kaka pa Icakar Igal wod pa Yucepu;
8i kaka pa Epraim Kocea wod pa Nun;
9i kaka pa Benjamin Palti wod pa Rapu;
10i kaka pa Jabulon Gadiel wod pa Codi;
11i kaka pa Yucepu, en aye kaka pa Manace, Gadi wod pa Cuci;
12i kaka pa Dan Amiel wod pa Gemali;
13i kaka pa Acer Cetur wod pa Mikael;
14i kaka pa Naputali Nabi wod pa Vopci;
15i kaka pa Gad Geuel wod pa Maki.
16Meno aye nyiŋ jo ma Moses ocwalogi ka roto lobo. Moses ocako nyiŋ Kocea
wod pa Nun ni Yocwa.
17Moses ocwalogi ka roto lobo Kanaan kun waco botgi ni, “Wucit i Negeb kuca ca,
wuit malo wa i lobo godi,
18wek wunen kit ma lobo-nu tye kwede, ka ce jo ma bedo iye jo matego nyo jo
magoro, ka ce ginok nyo gipol,
19ka ce lobo ma gibedo iye-ni ber nyo rac, ka ce gaŋi ma gibedo iye tye apero nyo
girumo ki cel matego,
20ka ce lobone ceko cam nyo pe ceko, ka ce yadi tye i lo bone nyo pe. Wucam co ki
i cwinywu, ci wudwog ki nyig yadi mogo mucek i lobo kunnu.” Kare ma gin gucito
onoŋo obedo kare ma nyig olok cako cek iye.
21Kit meno gucito ka roto piny nia ki i tim Jin o wa i Rekob, ma cok ki yo ma
donyo i Kamat.
22Gucito nio wa i Negeb ka guo kwede i Kebron; ci Akiman, Cecai ki Talmai
likwayo pa Anak onoŋo gitye kunnu, (Kebron onoŋo gigero ori mwaka abiro ma
peya gigero Joan ma i Ejipt.)
23Lurot piny guo wa i nota me Ecikol, ci guŋolo jaŋ tuga nyig olok acel ma olugo,
gutiŋo ki tal mabor kun jo aryo aye gulebo, dok gukelo ki nyig okwer pomegranat
ki nyig oduru.
Acoli Baibul
© 1985, Bible Society of Uganda.
24Kabedo meno yam gilwoŋo ni nota me Ecikol , pien jo Icrael guŋolo iye jaŋ tuga
nyig olok.
25I ŋe nino pyeraŋwen gudwogo ki ka roto piny ma i lobo-nu.
26Gudwogo bot Moses ki Aron ki lwak jo Icrael ducu ma i tim Paran, i Kadec;
gukelo lok ki kunnu botgi ki bot lwak ducu, dok gunyuto botgi gin mucek i lo bo-
nu.
27Gutito ki Moses ni, “Wacito i lobo ma icwalowa iye; lobone mol cak ki moo kic,
man aye nyig yadine ma wakelo-ni.
28Kun kono jo ma gibedo i lobo-nu jo matego, gaŋgi bene gigoyo ki cel matego,
dok gidito twatwal; medo ki meno, waneno iye likwayo pa Anak.
29Jo Amalek gibedo megi i lobo ma i Negeb; jo Kit, jo Jebuc ki jo Amor gibedo i
lobo godi; jo Kanaan gibedo i lobo murabo dog nam, ki murabo dog Jordan.”
30Kaleb ojuko dano guliŋ woko i nyim Moses ci owacci, “Wan watugi cito kunnu
magicel, wek wacamu woko; pien wan waromo loyogi.”
31Ento dano ma yam gunywako kwede wot kunnu guwacci, “Wan pe waromo ette
me cito i kom jo meno, pien gitego, gikatowa woko.”
32Ci gukelo lok marac ma obalo cwiny jo Icrael woko i kom lobo ma guroto-ni,
kun giwacci, “Lobo ma wawoto wabaro iye-ni, waroto ducu, lobone camo jo ma
gibedo iye woko; dok jo ducu ma wanenogi iye kunnu jo ma komgi pek madito.
33 Dok waneno twoni oluma kunnu, likwayo pa Anak ma kwarogi ducu twoni
oluma. Wan giwa watino warom ki otwoŋo mamwa, dok myero wanen kumeno
ki tun botgi.”
Wel 14
1Lwak ducu gucako daŋŋe matek, ci dano gukok ki pig wangi dyewor benebene.
2Jo Icrael ducu gubedo ka ŋur i kom Moses ki Aron, ci lwakgi ducu guwaco botgi
ni, “Kono nene wato giwa ki i Ejipt, kono ber! Nyo kono nene wato ki i tim kany!
3Piŋo Rwot okelowa i lobo man wek ginekwa woko ki pala lucwan? Monwa ki
litinowa gibiyakogi woko bene; kono nene pe obedo ber ka wadok giwa cen i
Ejipt?”
4Ci gucako lok kekengi ni, “Wek wayeru laditwa mo, wek wadoku cen i Ejipt.”
5Moses ki Aron gupoto piny aryeba ic i nyim lwak jo Icrael ma gucokke ducu.
6Ci Yocwa wod pa Nun ki Kaleb wod pa Jepune ma yam gitye i kin jo ma guroto
lobo-nu guyeco boŋŋigi kekengi pien cwinygi ocwer.
Acoli Baibul
© 1985, Bible Society of Uganda.
7Guwa, bot lwak jo Icrael ducu ni, “Lobo ma yam wawoto wabaro iye, waroto,
wanoŋo ni lobone ber makato ducu.
8Ka i Rwot obedo yom i komwa, en biterowa i lobo-nu, ci miyo i ciŋwa, en aye
lobo ma mol cak ki moo kic.
9 Ento pe wujem i kom Rwot; dok pe wulwor wegi lobo-nu, pien gin kwon me
acamawa mere. Gin mo ma geŋo ŋegi doŋ pe, dok Rwot tye tuŋ botwa; pe
wulworgi.”
10Ento lwak ducu guwacci, gicelgi acela ki got. Ka dok deyo pa Rwot onen i kema
me rwatte i nyim jo Icrael ducu.
11Ci Rwot owaco bot Moses ni, “Jo man gibicaya pi kare ma rom mene? Gibikwero
ye an pi kare ma rom mene, kadi bed atiyo lwak lanyut ducu ma rom man i kingi?
12Abipwodogi ki two gemo, abitwonogi lobo ma nene myero obed me aleyagi,
dok abimiyo in idoko rok madit mada ki matek makatogi.”
13 Ento Moses owaco bot Rwot ni, “Jo Ejipt dok gibiwinyo pire bene, pien in aye
yam itiŋo jo man ki tekki ikwanyogi woko ki i kingi,
14dok gibitito bot jo ma gibedo i lobo man, Doŋ gityeko winyo ni in Rwot it ye i
dye jo man, dok ni in Rwot aye gibedo ka neni waŋ ki waŋ, ki pol meri obedo ka
cuŋ ka wigi, dok ibedo ka wot i nyimgi i wir pol dyeceŋ ki i wir mac dyewor.
15Ka ineko jo man woko lawaŋe acel, ci lurok ma giwinyo ywekani gibiwacci,
16‘Onoŋo tero jo man i lobo ma yam okwoŋo pire ni ebimiyo botgi-ni doŋ oloyo
Rwot woko, en mumiyo onekogi woko i dye tim-mi.’
17Kombeddi alegi ni, wek tek pa Rwot obed madit kit macalo yam iciko kun
iwacci,
18 ‘Rwot kiniga pe mako oyot, mar mere ma pe lokke dwoŋ; en weko bal ki tim
aranyi pa dano, ento pe kwanyo kop i kom lubalo. En keto can i kom likwayo ki i
kom Likwayo pa likwayogi pi bal pa kwarogi nio i yalwak me adek ki me aŋwen.’
19Alegi ni itim kica ki joni man pi rocgi, macalo in marri ma pe lokke dwoŋ
twatwal-li, kit ma ibedo ka weko balgi cakke wa ki i Ejipt nio koni.”
Can ma Lubaŋa oketo i kom jo Icrael
(Nwo 1.34-40)
20Rwot ogamo ni, “Doŋ atimo kica botgi kit macalo iwaco-ni.
21 Ento ada, macalo atye kwo-ni, dok macalo deyo pa Rwot bipoŋo lobo ducu-ni,
akwoŋo ni,
22i kom jo ma guneno deyona ki lwak lanyut ma yam atiyo i Ejipt ki i tim, ento ma
gubedo ka omo iya ma doŋ odoko tyen apar kulu, ma pe guwinyo doga bene, pe
tye ŋat mo i kingi
Acoli Baibul
© 1985, Bible Society of Uganda.
23ma bineno lobo ma yam akwoŋo pire bot kwarogi ni abimiyogini; pe tye ŋat mo
i kin jo ma gicaya ma bineno.
24 Ento laticca Kaleb abitero i lobo ma yam ocito iye-ni, ci Likwaye bicamo, pien
en tye ki cwiny mapat, dok en tye ka lubo gin ma amito ducu kakare atir.
25Jo Amalek ki jo Kanaan gibedo i nota ducu; pi meno wun diki wulokke wucak
wot wudok tun tim i yo ma kemo Nam Makwar.”
26Rwot dok owaco bot Moses ki bot Aron ni,
27“Lwak man marac-ci gibiweko ŋuro i koma awene? Doŋ atyeko winyo lwak
ŋuro ma jo Icrael gitye ka ŋuro kwede i koma.
28Wac botgi ni an Rwot awacci, ‘Macalo atye makwo-ni, gin ma doŋ wuwaco ma
awinyo ki ita abitiyo botwu.
29 Komwu muto biradde piny i dye tim man. I kin jo ma gikwanogi-ni, ma yam
gikwano welgi cakke ki i kom jo ma ditogi romo mwaka pyeraryo dok kwede
malo, ma gubedo ka ŋur i koma-ni,
30pe acel mo bio i lobo ma yam akwoŋo pire ni abimiyogi bedo iye; kono Kaleb
wod pa Jepune ki Yocwa wod pa Nun keken aye gibio.
31Ento litinowu ma wuwacci gibiyakogi wokoni, gin aye abiterogi kunnu, gin aye
gibiŋeyo lobo ma wun wucayo-ru.
32Wun aye komwu muto biradde piny i dye tim man.
33 Litinowu gibibedo lukwat i tim mwaka pyeraŋwen kun gineno can pi
tarwaŋwu atata, nio ka kom danowu ma oto me agikkine obuto i dye tim.
34Wubineno can pi balwu mwaka pyeraŋwen, muporo wel nino ma yam wuroto
ki lobo-ni, nino pyeraŋwen, mwaka acel pi nino acel acel, ci wubiŋeyo ni iya oarre
woko i komwu.’
35An a Rwot ma doŋ aloko; ada abitiyo man i kom lwak man marac-ci ducu ma
guribbe me pyem kweda; gibitum woko i dye tim kany, gibito megi kunnu.”
36Jo ma yam Moses ocwalo ka roto lobo-ni, ma yam gudwogo ci gumiyo lwak
ducu guŋur i kom Rwot pi lok marac ma gutito i kom lobo-nu,
37jo-nu guto woko ki two gemo i nyim Rwot.
38Ento Yocwa wod pa Nun ki Kaleb wod pa Jepune aye gudoŋ ma gikwo ki i kin
lwak dano ma gucito ka roto lobo-ni.
Jo Icrael giloyogi i Korma
(Nwo 1.41-46)
39Moses otito lok meno ducu bot jo Icrael, ci dano gukok matek.
Acoli Baibul
© 1985, Bible Society of Uganda.
40Ci gua malo odiko con, gucito guito malo wa i lacol me lobo godi, kun giwaco ni,
“Nen, wan doŋ watye kany co do, doŋ wabicito wa i kabedo ma Rwot ociko pire;
pien doŋ wabalo.”
41Ento Moses owaco botgi ni, “Piŋo wun koni wuturo cik ma Rwot oketo? Pien
meno pe bitwerre wacel.
42Pe wucit kunnu, wek pe lumerokwu guradwu woko piny, pien Rwot pe tye i
kinwu.
43Jo Amalek ki jo Kanaan gitye i nyimwu kunnu, pala lucwangi bityekowu woko;
pien wun wukwero lubo kor Rwot, miyo Rwot pe bibedo kwedwu.”
44Ento gin guette ni gimito ito malo wa i lacol lobo godi ca, kadi bed canduk me
gicikke pa Rwot, ki Moses bene, pe gua woko ki i gony.
45Ci jo Amalek ki jo Kanaan ma gibedo i lobo godi kunnu gulor piny, guloyogi, ci
guryemogi nio wa i Korma.
Wel 15
1Rwot owaco bot Moses ni,
2“Wac ki jo Icrael ni, Ka doŋ wuo i lobo ma wubibedo iye, ma abimiyowu-ni,
3ce wutyero dyaŋ nyo romo bot Rwot obed gityer ma giwaŋo ki mac, nyo gitum
awaŋa, nyo kit gitum mukene, nyo gityer me cobo kwoŋ, nyo gityer ma ic
opwoyo, nyo ka tyero i ninowu madito ma giciko wek obed gin ma ŋwece kur me
yomo cwiny Rwot,
4ci ŋat ma okelo gityerre myero otyer bot Rwot bene moko kwon mapwotte ma
romo agwata acel ma girubo ki moo ma romo cupa aryo ki nucu, obed gityer me
moko kwon.
5Dok wubikelo yino me gityer amata pi gitum awaŋa nyo gitum mukene ducu ma
romo cupa aryo ki nucu pi romo acel acel.
6Nyo ka pi nyok romo wubikelo moko kwon mapwotte ma romo agwata aryo ma
girubo ki moo ma romo cupa adek pi gityer me moko kwon.
7Pi gityer: amata wubikelo yino ma romo cupa adek obed gin ma ŋwece kur me
yomo cwiny Rwot.
8Ka wuyubo twon pi gitum awaŋa, nyo pi gitum mukene, nyo pi cobo kwon, nyo
pi gityer lakwecwiny ma wutyero bot Rwot,
9ci myero wutyer kacel ki twon moko kwon mapwotte ma romo agwata adek ma
girubo ki moo ma romo cupa abic obed gityer me moko kwon.
Acoli Baibul
© 1985, Bible Society of Uganda.
10Pi gityer amata wubityero koŋo vino ma romo cupa abic obed gityer ma giwaŋo
ki mac, gin ma ŋwece kur meyomo cwiny Rwot.
11“Gibitiyo kit meno pi twon acel acel, nyo pi nyok romo acel acel, nyo pi wod
romo nyo latin nyok dyel acel acel.
12Ducu bilubo Wel lim ma wukelo me atyera; wubitiyo kit meno i komgi acel acel
macalo welgi, tye.
13Anywalli ducu me lobowu gibitiyo kit meno ka gityero gityer ma giwaŋo ki mac
obed gin ma ŋwece kur me yomo cwiny Rwot.
14Ka larok mo odoko labedo i kinwu, nyo: ŋat mo ma bibedo i kinwu wa i kare pa
likwayowu ducu, ka en mito tyero gityer ma giwaŋo ki mac obed gin ma ŋwece
kurme yomo cwiny Rwot, en bene bitime kit ma wun wutimo-ni.
15Pi lwak mucokke cik bibedo acel piwu ki pi larok ma odoko labedo i kinwu;
meno bibedo cik matwal nio wa i kare pa likwayowu ducu; labedo bibedo ma
rom ki wun i nyim Rwot.
16 Cik bibedo acel ki ŋolo kop bene acel pi wun ki pi lurok ma gibedo i kinwu.”
17Rwot owaco bot Moses ni,
18“Wac bot jo Icrael ni, Ka doŋ wuo i lobo ma atye ka terowu iye-ni,
19ka wucamo cam ma ocek i lobe-nu, wubityero gityer bot Rwot.
20I kom moko kwon me kal manyen mukwoŋo cek wubityero capat lakoto obed
gityer; wubityero macalo wutyero gityer ma wukwanyo ki i kom kal ma wudino.
21Wubimiyo gityer bot Rwot ki i kom moko kwoti me kal manyen mukwoŋo cek
nio wa i kare pa likwayowu ducu.
22“Ento ka ce wuroco, kuli pe wumako cik magi ducu ma Rwot yam ociko ki
Moses,
23ki gin ducu ma Rwot ocikowu kwede ki i dog Moses, nia wa i nino ma yam Rwot
okwoŋo miyo iye cik, medde kwede wa i kare pa likwayowu ducu;
24ka ce dano guroco ma pe gubalo akaka, kun lwak pe ŋeyo gin mo iye, ci lwak
ducu bityero wod twon acel me gitum awaŋa obed gin ma ŋwece kur me yomo
cwiny Rwot, ki gityer me moko kwon ki gityer amata mutike macalo cik tye, kacel
ki nyok dyel acel pi gitum me bal.
25Ajwaka bitimo gin lakwany bal ki i kom lwak jo Icrael ducu, ci Rwot biweko
balgi; pien onoŋo pe gubalo akaka dok gukelo gityergi, gityer ma giwaŋo ki mac
bot Rwot, ki gitumgi me bal, i nyim Rwot pi balgi ma pe gutimo akaka.
26Gibiweko bal pa lwak jo Icrael ducu, kacel ki pa lurok ma gibedo i kingi, pien
onoŋo bal meno omako lwak ducu.
Acoli Baibul
© 1985, Bible Society of Uganda.
27 “Ka ce dano acel mo aye obalo ma pe otimo akaka, ci en bityero bwoŋ dyel ma
ditte romo mwaka acel pi gitum me bal.
28Ci ajwaka bitimo gin lakwany bal i nyim Rwot pi dano-nu ma opoto i bal ma pe
otimo akaka, pi kwanyo bal ki i kome, ci Rwot biweko balle.
29Wubibedo ki cik acel pi dano ma obalo ma pe otimo akaka, kadi bed en anywalli
pa jo Icrael nyo labedo ma bedo i kingi.
30Ento ka dano mo otimo bal mo me tekwic, kadi bed anywalli me lobo nyo
labedo, noŋo doŋ ocayo Rwot; dano meno waŋe birwenyo woko ki i kin lutugi.
31Noŋo ocayo lok pa Rwot, oturo cikke, pi meno dano meno wane birwenyo woko
magicel; balle bidok i wiye.”
Dano ma pe ogwoko cabit
32I kare ma jo Icrael gitye i tim, ci gunoŋo dano mo ma coko yen riddo i ceŋ cabit.
33Jo ma gunoŋe ka en coko yen riddo-ni gukele bot Moses ki Aron ki bot lwak
ducu.
34Gukete i ot kol, pien peya ginyuto botgi gin ma myero gutim i kome.
35Ci Rwot owaco bot Moses ni, “Dano meno gibineke woko. Lwak ducu gibicele ki
got woko i ŋe gony.”
36Lwak ducu gukele woko i ŋe gony, gucele ki got guneke woko, kit macalo Rwot
onoŋo ociko ki Moses.
Keto jira i dog boŋo
37Rwot owaco bot Moses ni,
38 “Lok ki jo Icrael ci icikgi ni gukwo jira i twok dog boŋŋigi, wa i kare pa
likwayogi ducu, dok i kom jira ma i twok dog boŋo acel acel guket iye tol ma bulu.
39Bibedo botwu jira dog boŋo ma wuneno kome wek wupo cik pa Rwot ducu,
wulubgi, kun pe wulubo tamwu kenwu ki gin ma wuneno, ma wumaro lubo pi
mitiwu kenwu.
40Kit meno miyo wubipo cikka ducu, wubicobo, miyo wubibedo jo maleŋ pi
Lubaŋawu.
41An a Rwot Lubaŋawu ma yam akwanyowu ki i lobo Ejipt wek abed Lubaŋawu;
an a Rwot Lubaŋawu.”
Wel 16
1 Kora wod pa Ijar, ma wod pa Kokat, wod pa Levi, kacel ki Datan ki Abiram
awobe pa Eliab ki On wod pa Pelet, ma gin adek ducu gubedo likwayo pa Reuben,
Acoli Baibul
© 1985, Bible Society of Uganda.
2gutero dano ci gucito kwedgi i kom Moses, kacel ki lwak dano ma i kin jo Icrael,
lutel wi lwak miya aryo ki pyerabic ma giyero ki i kin lwak mucokke, jo ma
giŋene mada.
3Gucokke kacel i kom Moses ki Aron ci guwaco botgi ni, “Mewu doŋ okato kare!
Pien jo magi ducu gin lwak maleŋ, gin ducu ki acel acel Rwot bene tye i kingi. Ci
piŋo wun wukette kenwu malo twatwal makato lwak pa Rwot ducu?”
4Ka Moses owinyo, opoto aryeba ic.
5Ci owaco bot Kora ki lwakke ducu ni, “Diki odiko Rwot aye binyuto danone ki
ŋat maleŋ i kinwa, ci bimiyo en nyiko cok bote; ŋat ma en oyero aye en bimiyo
nyiko cok.
6Doŋ wutim kit man: wukwany weer me waŋo odok eceta, Kora ki lwakke ducu.
7Diki wuket mac iye, ci wuket iye odok eceta i nyim Rwot, ci dano ma Rwot oyero
aye bibedo maleŋ, Wun mewu dok okato kare, wun likwayo pa Levi!”
8Moses dok owaco bot Kora ni, “Doŋ koŋ wuwiny ya, wun likwayo pa Levi.
9Wun wubwono man ni gin matidi mo, ma Lubaŋa pa Icrael aye opokowu woko
ki i kom lwak jo Icrael ci okelowu cok bote pi tiyo tic i kema pa Rwot, kun wun
aye wucuŋ i nyim lwak ka tic pigi?
10En doŋ okelowu ka ma cok kwede wun kacel ki utmegiwu ducu ma gin likwayo
pa Levi, ci dok pud wuyenyo yo me doko ajwagi aye?
11Wun wubedo ka jemo i kom Rwot, mumiyo wun ki lwakwu ducu wucokke
kacel-li. Aron kono gin aŋo mumiyo wuŋur i kome-ni?”
12Moses dok ocwalo dano pi lwoŋo Datan ki Abiram ma awobe pa Eliab; ento gin
guwacci, “Pe wabicito kunnu.
13Pud ibwono man ni gin matidi mo, ma ikwanyowa woko ki i lobo ma mol cak ki
moo kic-ci, ma it ye ka nekowa kwede i tim-mi? Myero in dok ikette keni me bedo
laker ma loyowa?
14Dok bene peya ikelowa i lobo mo ma mol cak ki moo kic, peya imiyowa potti
mogo ma waleyo, nyo potti olok, ci kombeddi doŋ imito umo waŋwa woko. Wan
pe wabicito kunnu.”
15Kiniga omako Moses matek ci owaco bot Rwot ni, “Pe iye gityergi. An peya
akwanyo kadi kanagi acel mo ki botgi, pe atimo gin marac i kom ŋat mo i kingi.”
16Lacen Moses owaco bot Kora ni, “In ki lwakki wubed tye i nyim Rwot diki, in ki
gin ki Aron,
17kun noŋo ŋat acel acel i kinwu omako atabo weerre me waŋo odok eceta.
Wuket iye odok eceta, ci ŋat acel acel okel atabo weerre i nyim Rwot, atabo weer
miya aryo ki pyerabic; in bene ki Aron, ŋat man ki atabo weerre.”
Acoli Baibul
© 1985, Bible Society of Uganda.
18Ŋat acel acel ocako kwanyo atabo weerre, ci guketo mac i igi, ka guketo odok
eceta iye, ci gucuŋ i dog kema me rwatte, kacel ki Moses ki Aron.
19Kora ocoko lwak jo ducu ci gucuŋ ma gukemme ki Moses ki Aron i doggola
kema me rwatte. Ci deyo pa Rwot onen bot lwak ducu.
20Rwot owaco bot Moses ki Aron ni,
21“Wun wupokke kenwu ki i kin lwak man, wek anekgi atyekgi woko kombeddi.”
22Ento gin gupoto piny aryeba ic ci guwacci, “Ai Lubaŋa, Lubaŋa ma won tipo
kom jo ducu, pi bal pa dano acel keken miyo kiniga maki i kom lwak ducu?”
23Rwot owaco bot Moses ni,
24“Cik lwak ni gua woko ki ka ma jo pa Kora, Datan ki Abiram gibedo iye.”
25Moses oa ocito bot Datan ki Abiram, ci ludoŋo pa jo Icrael gulubo kore.
26Owaco bot lwak ni, “Alegowu ni, wua wupokke ki i ŋet kema pa jo magi ma
giraco-ni, pe wugud kom jamigi mo, wek pe gijwerwu woko kacel kwedgi pi bal
megi ducu.”
27Omiyo dano gua woko ki i ŋet kema pa Kora, Datan ki Abiram; ci Datan ki
Abiram gukatti woko gucuŋ i dog kemagi kacel ki mongi ki awobegi ki litinogi
matino.
28Moses owacci, “Man aye gin ma bimiyo wuŋeyo ni Rwot onoŋo ocwala ka tiyo
tic man ducu, pe abedo ka tiyone pira kena.
29Ka ce jo man gibito i kit ma dano gito kwede jwijwi-ni, nyo kit keckom ma poto
i kom dano ducu en aye bipoto i komgi, ci pe noŋo Rwot aye ma ocwala.
30Ento ka Rwot oketo gin mo manyen, ce lobo oŋamo doge omwonyogi woko
ducu, lwakgi ki jamigi ducu, miyo gilor piny i bur Lyel ma pud gikwo, ci wubiŋeyo
ni, jo ma gubedo ka cayo Rwot.”
31Ka otyeko waco lok meno ducu, ci nom ma gucuŋ iye obar oyabbe woko,
32lobo oŋamo doge omwonyogi woko, kacel ki jo me odigi, ki lwak jo pa Kora
ducu ki jamigi ducu liweŋ.
33Kit meno gin ki lwakgi ki jamigi ducu gulor piny i bur Lyel ma gikwo; ci lobo
oumo wigi woko gurwenyo woko ki i kin lwak.
34Jo Icrael ducu ma gurumogi-ni guriŋo woko ka guwinyo kokogi kun giwacci,
“Wek lobo pe dok omwonywa bene!”
35Ka dok mac bene oa ki bot Rwot, owaŋo jo meno miya aryo ki pyerabic ma
gubedo ka tyero odok eceta-ni, otyekogi woko.
36Ka Rwot dok owaco bot Moses ni,
Acoli Baibul
© 1985, Bible Society of Uganda.
37“Cik Eleajar wod pa ajwaka Aron ni okwany atabo weer me waŋo odok eceta
woko ducu ki i mac ma Lyel-li, oony mac ma i igi-ni ka mabor, pien gin jami
maleŋ.
38Atabo weer pa jo meno ma balgi okelo can me to i komgi-ni myero gipadgi
woko malac ki nyol gudok laum wi keno tyer; pien onoŋo yam doŋ gityerogi wo
ko i nyim Rwot mumiyo pud gin jami maleŋ. Ci gibibedo lanyut bot jo Icrael.”
39Kit meno Eleajar okwanyo atabo weer me mola ma yam jo ma mac owanogi-ni
gutyero, ci gipadogi gudoko laum wi keno tyer,
40wek obed gin me poyo wi jo Icrael, wek ŋat mo ma pe ajwaka, ma pe lakwar
Aron, pe onyik cok ka wano odok eceta i nyim Rwot, wek pe odok macalo Kora ki
lwakke, kit ma Rwot owaco bot Eleajar ki i dog Moses.
Aron olaro lwak
41Ento orwone lwak jo Icrael ducu dok gucako ŋur i kom Moses ki i kom Aron
kun giwaco ni, “Wun aye wuneko jo pa Rwot woko.”
42Ka lwak gu tyeko cokke i kom Moses ki Aron, gulokke tuŋ kema me rwatte; ci,
nen, pol oumo ko me woko, deyo pa, Rwot ocako nen.
43Moses ki Aron gucito i nyim kema me rwatte,
44ci Rwot owaco bot Moses ni,
45“Wua woko ki i kin lwak man wek atyekgi woko kombeddi.” Gupoto piny
aryeba cwiny,
46ci Moses owaco bot Aron ni, “Kwany atabo, weerri me waŋo odok eceta, iket iye
mac ma itoko ki i keno tyer, ci iket iye odok eceta, itiŋ iter bot lwak oyotoyot, icit
itim gin lakwany bal ki i komgi, pien kiniga doŋ ocako bino kun oa ki bot Rwot,
two gemo doŋ bicakke.”
47Aron okwanyo atabo weer kit ma Moses owaco, cut, oriŋo kwede i dye lwak; ci,
nen, two gemo onoŋo doŋ ocakke i kin dano. Oketo odok eceta i atabo weer,
ocako timo gin lakwany bal ki i kom lwak.
48Ocuŋ i kin jo muto ki jo makwo, ci two gemo ogik woko.
49Jo ma two gemo onekogi guromo alip apar wiye aŋwen ki miya abiro, kun pe
giribo iye jo ma guto i alii pa Kora.
50Aron odok cen bot Moses i dog kema me rwatte ka two gemo doŋ ogik woko.
Wel 17
1Rwot owaco bot Moses ni,
Acoli Baibul
© 1985, Bible Society of Uganda.
2“Lok ki jo Icrael ci igam odoo ki botgi, odoo acel pi dog ot pa kwarogi acel acel.
Gam ki bot lutel wigi ducu, ma oporo dog odi pa kwarogi, odoo ducu apar wiye
aryo. Co nyiŋ dano acel acel i kom odoone,
3ci ico nyiŋ Aron i kom odoo pa likwayo pa Levi; pien ludito wi kaka ki i dog odi
pa kwarogi gibibedo ki odoogi acel acel.
4Ibicibogi i kema me rwatte i nyim canduk lok me caden ka ma arwatte iye
kwedwu-ni.
5Ci odoo pa dano ma abiyero en aye bilot. Meno aye abinoŋo iye yo me juko jo
Icrael ma gibedo ka ŋur i koma-ni.”
6Moses oloko ki jo Icrael, ci lutel wigi ducu gukelo odoo bote, odoo acel pi lutel
wigi acel acel, ma oporo wel odi pa kwarogi, odoo apar wiye aryo; odoo pa Aron
bene onoŋo tye i kin odoogi.
7Ci Moses ocibo odoo ducu i nyim Rwot i kema lok me caden.
8 Orwone Moses odonyo i kema lok me caden; ci, nen, odoo pa Aron ma ocuŋ pi
dog ot pa Levi-ni aye olot woko, ocako kico bolo olaŋ, ci oturo ture onyako nyig
yaa mucek.
9Ka Moses okelo odoo ducu nia ki i nyim Rwot, otero bot jo Icrael ducu, guneno,
ci dano acel acel okwanyo odoone.
10Rwot owaco bot Moses ni, “Dwok odoo pa Aron i nyim canduk lok me caden
kakare, wek gigwok obed lanyut pi jo mujemo, wek ijuk ki nurgi atata i koma,
ogik woko, wek pe to opot i komgi.”
11Moses otimo kit ma Rwot ocike kwede.
12Ci jo Icrael guwaco bot Moses ni, “Nen ba, watum woko do, keckom opoto i
komwa omiyo wato, wato woko.
13Jo ducu ma gibino cok, ma gibino cok ki kema pa Rwot, gito woko. Wan ducu
myero wato woko bo?”
Wel 18
1Ci Rwot owaco bot Aron ni, “In ki awobeni kacel ki jo me ot pa kwarowu
wubitiŋo alii me bal pi kabedo maleŋ, dok in kacel ki awobeni wubitiŋo alii me
bal pi ticwu me bedo ajwagi.
2In ibikelo utmegini ma i kaka, pa Levi cok kacel kwedi, ma en aye kaka pa woru,
wek guribbe kwedi, gukonyi ma noŋo in ki awobeni wutye ka tic i nyim kema lok
me caden.
Acoli Baibul
© 1985, Bible Society of Uganda.
3Gin gibibedo kwedwu i dog ticwu, dok gibitiyo tic ducu ma miite i kema; ento pe
gibicito cok i kom jami ducu ma i kabedo maleŋ, pe gibinyiko cok ki keno tyer,
wek pe to opot i kom gin ki wun.
4Gibinywako tic kwedwu i kema me rwatte pi tic ducu ma i kema; pe ŋat mukene
mo bibino botwu cok.
5Wun wubitiyo tic ma i kabedo maleŋ, ki tic i kom keno tyer, wek kiniga pe dok
opot i kom jo Icrael.
6Nen, doŋ akwanyo utmegiwu, gin Lulevi, ki i kin jo Icrael; gin gitye macalo mot
ma gimiyowu, gin aye jo ma gimiyo bot Rwot pi tiyo tic i kema me rwatte.
7In ki awobeni keken wubitiyo ticwu me bedo ajwagi i lok ducu ma kemo kom
keno tyer nyo ma tye i tyelo ma boŋo kicika oumo-ni. Amiyowu tic me bedo
ajwagina macalo mot ma amiyo botwu; ka ŋat mo ata obino cok, gibineke woko.”
Cam pa ajwagi
8Rwot dok owaco bot Aron ni, “Nen, doŋ atyeko miyo i ciŋi gityer ducu ma gimiyo
bota, jami maleŋ ducu ma jo Icrael gikelo. Atyeko miyogi gubed waŋ wat ma tuŋ
boti, ki bot awobeni me bedo waŋ wat ma myero gimi botgi dikdik.
9Magi aye gibibedo meri ki i kom jami maleŋ maka to ma pe giwaŋo ki mac:
gityer ducu ma jo Icrael gimiyo bota, gityer me moko kwon ducu gitum me bal
ducu, gitum me tino alii ducu; gibibedo maleŋ makato piri ki pi awobeni.
10Wubicamo i kabedo mo maleŋ makato; cowu ducu gitwero camo; tye maleŋ
piwu.
11Man bene mewu: gin ducu ma gikwanyo ki i kom motgi me bedo gityer akwata;
atyeko miyogi botwu ki bot awobewu ki anyirawu obed waŋ watwu me dikdik. Jo
ducu ma i odi ma gulonnye gitwero camo.
12Moo mabecone ducu, yino mabecone ducu ki bel maberre ducu, mot ducu ma
gimiyo bot Rwot me wi mwaka doŋ amiyo botwu.
13Cam ducu mukwoŋo cek i lobogi ma gikelo bot Rwot bibedo mewu; dano ducu
ma i odi ma olonnye twero camo.
14 “Gin ducu ma i Icrael ma gidyero i cin Rwot bibedo mewu.
15“Litino ducu ma, gikwoŋo nywalogi, kadi bed dano nyo lee, ma gityero bot Rwot
bibedo mewu, Ento litino kayo ducu pa dano gibikokogi akoka ki lim, ki litino
kaye pa lee ma keni ma pe gicamo bene gibikokogi akoka.
16Gibikokogi ka ditogi romo dwe acel. Wel me kokogi ibimoko ni obed cekel me
ryal abic, kun lubo cekel me kabedo maleŋ ma romo gera pyeraryo.
Acoli Baibul
© 1985, Bible Society of Uganda.
17Ento latin kayo pa dyaŋ nyo pa romo nyo pa dyel pe gibikoko; gin gileŋ. Ibikiro
remogi i kom keno tyer, dok ibiwaŋo dwologi obed gityer ma giwaŋo ki mac, gin
ma ŋwece kur me yomo cwiny Rwot.
18Riŋogi bibedo mewu, macalo gok ma gik Wato ki em malacuc bene mewu.
19Gityer maleŋ ducu ma jo Icrael gimiyo bot Rwot doŋ amiyo botwu ki bot
awobewu ki anyirawu obed waŋ: watwu me dikdik. Man aye gicikke ma gimoko
ki kado i nyim Rwot matwal piri ki pi likwayu.”
20Rwot dok owaco bot Aron ni, “Pe wubilimo ginaleya mo nyo dul lobo mo i kin jo
Icrael; an ki koma aye abedo ginaleyawu.
Cam pa Lulevi
21 “Bot Lulevi atyeko miyogi dul acel me apar i kom jami pa jo Icrael me bedo
megi pi culo ticgi ma gitiyo, ticgi ma i kema me rwatte.
22Dok nia tin jo Icrael pe gibinyiko cok ki kema me rwatte, wek pe gunoŋ bal ma
kelogi to.
23Ento Lulevi keken aye gibitiyo tic ma i kema me rwatte, gin aye gibibedo lubalo
ka gin mo orocce iye. Bibedo cik matwal nio wa i kare pa likwayowu ducu; dok pe
gibileyo dul lobo mo i kin jo Icrael.
24Pien dul acel me apar ma a ki bot jo Icrael, ma gimiyo obed gityer bot Rwot,
atyeko mi yo bot Lulevi me ginaleyagi; mumi yo aloko i komgi ni, pe gibibedo ki
dul lobo mo me aleyagi i kin jo Icrael.”
Dul acel me apar
25Rwot owaco bot Moses ni,
26“Dok iwac bot Lulevi ni, ‘Ka wugamo dul acel me apar ki bot jo Icrael, ma atyeko
miyo botwu obed mewu, wun dok wubimiyo gityer ma a ki iye bot Rwot, dul acel
me apar ki i kom dul acel me apar ma gikelo botwu.
27Gityerwu man gibikwano piwu macalo wumiyo ki i kom bel ma wudino ki i
kom koŋo olok ma oa ki i nyig olokwu ma wubiyo.
28Kit meno wun bene wubimiyo gityer bot Rwot ki i kom dul acel me apar ducu
ma wubigamo ki bot jo Icrael; wubikwanyo gityer pa Rwot ki i kome, wumiyo bot
ajwaka Aron.
29Mot ducu ma gimiyo botwu en aye wubikwanyo iye gityer ducu ma myero bot
Rwot, ki i kom mabecone ducu, ci bedo gin ma gikwero wek obed maleŋ.’
30Mumiyo ibiwaco bot Lulevi ni, ‘Ka doŋ wutyero mabecone woko, ci mudoŋŋe
bibedo mewu macalo oa ki i laro dino belwu nyo i ka biyo nyig olokwu.
31Wutwero camo i kabedo ducu, wun ki jo ma i odiwu; pien en aye giculowu
kwede pi ticwu i kema me rwatte.
Acoli Baibul
© 1985, Bible Society of Uganda.
32Pe wubinoŋo iye bal mo, tekke wutyeko kwanyo mabecone pi gityer. Ento pe
wupyed jami maleŋ ma jo Icrael gimiyo, wek pe wuto.’ ”
Wel 19
1Rwot owaco bot Moses ki Aron ni,
2“Man en cik ma an Rwot aye aciko: Cik jo Icrael ni gukel boti roya makwar
maberre ma kome pe ki mwonyo, ma peya gitiyo kwede me pur.
3Ibimiyo bot ajwaka Eleajar ci gibitero woko i ŋe gony, ka doŋ gibineko i nyim
Eleajar.
4Ajwaka Eleajar bigwelo remone ki lwet ciŋe, ci kiro remone tyen abiro mukemo
nyim kema me rwatte.
5Gibiwaŋo kom roya woko ma kun en neno; pyene ki riŋone ki remone ki cete,
gibiwaŋone ducu.
6Dok ajwaka bikwanyo yat cedar ki anyero ki uci makwar ci bibologi i dye mac
ma waŋo riŋo roya-ni.
7Ka dok ajwaka bilwoko boŋŋine ki pii, lwoko kome ki pii, ka doŋ lacen bidok i
gony; ci ajwaka bibedo keni nio wa otyeno.
8Ŋat ma onoŋo owaŋo roya-ni bene bilwoko boŋŋine, lwoko kome ki pii, ci
bibedo keni nio wa otyeno.
9 Ci dano mo ma olony, ma pe kome ki keni aye bijobo buru roya-ni, ci biketo i
kabedo mo ma olony, woko ki i ŋe gony, Gibikano pi lwak jo Icrael pi yubo pii me
lwoko kwer; meno gitimo pi kwanyo bal.
10Ŋat ma ojobo buru bene bilwoko boŋŋine ci bedo keni nio wa otyeno. Man
bibedo cik matwal bot jo Icrael ki bot Lurok ma bedo i kingi.
Ŋat ma odoko keni pi gudo kom dano muto
11“Ŋat ma ogudo kom dano mo ma oto bibedo keni pi nino abiro.
12Bilonynye kekene i ki pii me lwoko kwer i nino me adekke ki i nino me abiro
miyo bibedo ma olony. Ento ka pe olonnye kekene i nino me adekke ki i nino me
abiro, ci pe doŋ bibedo ma olony.
13Dano mo-ni ma ogudo kom dano muto, ce pe olonnye kekene, noŋo obalo kema
pa Rwot, omiyo odoko keni. Dano meno waŋe birwenyo woko ki i kin jo Icrael. En
bedo keni pien pii me lwoko kwer peya gionyo i kome, miyo keni mere pud tye i
kome.
14“Ka dano oto i kemawu mo cik tye kit man: dano acel acel ma donyo i kema
meno, ki dano ducu ma gubedo iye ka dano-nu oto, gibibedo keni pi nino abiro.
Acoli Baibul
© 1985, Bible Society of Uganda.
15Dok agulu nyo atabo-gu ducu ma i kema ma pe giumo wigi bedo keni.
16Dano mo ka tye i tim ce ogudo kom dano ma gineko ki pala Lucwan, nyo kom
dano mo ma oto kene, nyo cogo dano mo, nyo lyel ma giyiko iye dano, bibedo
keni pi nino abiro.
17Pi lonyo dano ma odoko keni kit meno gibikwanyo buru mo i kom buru roya
ma yam gineko me kwanyo bal, gibiketo i otako, ci gimedo iye pii ma mol.
18Dano mo ma olony bikwanyo anyero ci luto i pii-nu, kiro i kom kema ki i kom
jami ducu ma tye iye, ki i kom dano ducu ma onoŋo gitye kenyo. Gibitimo
kumeno bene pi ŋat ma ogudo cogo-ni nyo ma ogudo kom dano ma gineko nyo
ma oto kene, nyo ma ogudo lyel ma giyiko iye dano.
19Dano ma olony bikiro pii meno i kom dano ma keni i nino me adekke ki i nino
me abiro, En bilonyo dano ma keni-ni i nino me abirone, dok dano-nu bilwoko
boŋŋine, lwoko kome ki pii, ci otyeno noŋo en doŋ olony.
20“Ento ka dano mo onoŋo tye keni, ce pe olonnye kekene, dano meno waŋe
birwenyo woko ki i dye lwak pa Lubaŋa, pien noŋo obalo kabedo maleŋ pa Rwot
omiyo odoko keni, En bedo keni pien pii me lwoko kwer noŋo pe gionyo i kome.
21Meno bibedo cik botwu matwal. Ŋat ma okiro pii me lwoko kwer bilwoko
boŋŋine; ki ŋat mo ma ogudo pii me lwoko kwer bibedo keni nio wa otyeno.
22Gin ducu ma dano ma keni-ni ogudo bibedo keni; ŋat ma ogudo jami-nu bene
bibedo keni nio wa otyeno.”
Wel 20
1Jo Icrael ki lwakgi ducu guo i tim Jin i dwe mukwoŋo, ci gutiro i Kadec, gubedo
iye. Miriam oto kenyo, giyike bene kenyo.
2Pii onoŋo pe tye me amata pa lwak, ci gucokke kacel i kom Moses ki Aron.
3Gukeco i kom Moses kun giwacci, “Kono yam wato woko i kare ma utmegiwa
guto i nyim Rwot-ti, kono ber.
4Piŋo nene ikelo lwak pa Rwot i tim ata kany, wek wato woko, wan kacel ki
limwa?
5Piŋo nene imiyo waa woko ki i Ejipt, ikelowa i kabedo man marac-ci? Pe kabedo
ma ceko bel, kadi wa oduro nyo olok nyo okwer pomegranat; pii mo bene pe me
amata.”
6Moses ki Aron gua woko ki i nyim lwak, gucito doggola kema me rwatte, gupoto
piny iryeba cwiny. Ci deyo pa Rwot onen botgi.
7Rwot owaco ki Moses ni,
Acoli Baibul
© 1985, Bible Society of Uganda.
8“Kwany odoo ki i nyim canduk lok le caden, ci igur lwak kacel, wun ki meru
Aron, ci iwac ki pata got ki i nyim lwak ni owek piine okatti woko. Kit meno
ibikelo pii pigi nia ki i pata got wek lwak gumati, ki limgi bene.”
9Moses okwanyo odoo woko ki i nyim Rwot kit macalo ocike kwede.
10Moses ki Aron gucoko lwak kacel i nyim pata got, ci Moses owaco botgi ni, “Doŋ
wuwiny ba, wun lujemo-ni. Wumito ni wan wakel pii nia ki i pata got man piwu?”
11Ci Moses otiŋo ciŋe malo, ogoyo pata got ki odoone tyen aryo kulu; ci pii ocorre
limayi, lwak gumato, ki limgi makwo bene.
12Ento Rwot owaco bot Moses ki Aron ni, “Pien wun pe wuye an, kun pe wunyuto
ki i nyim jo Icrael ni an aleŋ, pi meno wun pe doŋ wubitero lwak man i lobo ma
abimiyogi-ni.”
13Man en aye pii me Meriba , ka ma jo Icrael gukeco iye i kom Rwot ci en onyutte
kene ni eleŋ i kingi-ni.
Jo Edom gukwero ni jo Icrael pe guwok ki i lobogi
14Moses ocwalo lukwena ma gicito bot kabaka me Edom nia ki i Kadec ci guwacci,
“Omeru Icrael owaco kuman ni, In iŋeyo can madito ducu ma opoto i komwa:
15kit ma yam kwarowa guwoto kwede i Ejipt, ma wabedo i Ejipt pi kare malac, ci
jo Ejipt gutimowa magwa, wan ki kwarowa ducu.
16Ka yam wakok bot Rwot, en owinyo dwanwa, ocwalo lamalaika, okwanyowa
woko ki i Ejipt. Ci kombeddi watye doŋ i Kadec, i gaŋ ma doŋ cok ki waŋ lobowu.
17Ber wuwek wawok ki i lobowu. Pe wabiŋak wawok ki i poto mo, nyo i poto
olok, pe wabimato pii ma i waŋ it, Wabimol ma walubo gudo madit-ti pa Kabaka,
pe wabiŋak wadok yo tun acuc nyo tuŋ acam, nio ka wawok wakato waŋ
lobowu.”
18Ento jo Edom guwaco ni, “Pe wubiwok ki i lobowa, mi yo wan aye wabino i
komwu ki pala lucwan.”
19Jo Icrael gugamo ni, “Wabiwok i gudo madit keken. Ka wamato piiwu mo, wan
nyo limwa makwo, wabiculo wane. Wek wawok wakat ki tyenwa keken, lok mo
mukene pe.”
20Jo Edom dok guwacci, “Pe wubiwok ki i lobowa.” Ci jo Edom gubino ka lweny i
komgi ki lwak co mapol ki mony matek.
21Kit meno jo Edom gukwero miyo jo Icrael kato kun giwok ki i lobogi; omiyo jo
Icrael gua gulokke, guceyo yo mukene.
Aron oto i wi got Kor
22Lwak jo Icrael ducu gua ki i Kadec, gubino i te got Kor.
Acoli Baibul
© 1985, Bible Society of Uganda.
23Rwot owaco bot Moses-ki Aron i te got Kor, i waŋ lobo Edom, ni,
24“Aron aye doŋ bito, bidok bot lutugi; en pe bidonyo i lobo ma amiyo bot jo
Icrael, pien yam wujemo i kom cikka i dog pii me Meriba.
25Ter Aron ki wode Eleajar, icit kwedgi malo i wi got Kor,
26iluny boŋo tic pa Aron ducu ki i kome, ci iruk ki wode Eleajar, pien Aron doŋ
bidok bot lutugi, en bito ki kunnu.”
27Moses otiyo kit ma Rwot ocike kwede. Guito malo i wi got Kor kun lwak ducu
gineno.
28 Moses olunyo bone tic pa Aron woko ducu, ci oruko kwede wode Eleajar, Aron
oto woko ki kunnu i wi got. Lacen Moses ki Eleajar gulor woko piny ki i wi got.
29Ka lwak jo Icrael ducu guneno ni Aron doŋ oto, ci gukoke nino pyeradek.
Wel 21
1 Ka kabaka me Arad, ma en Lakanaan ma bedo i Negeb, owinyo ni jo Icrael
gibibino ki i yo Atarim, ci olwenyo komgi, oyako jo mogo woko ki i kingi.
2Ci jo Icrael gukwoŋo kwoŋ bot Rwot kun giwaco ni, “Ka ibimiyo jo man i ciŋwa
ada, ci wan wabidyerogi i ciŋi, wabijwero gaŋigi woko liweŋ.”
3Rwot owinyo lega pa jo Icrael, omiyo guloyo Lukanaan, ci gin gudyerogi i cin
Rwot kacel ki gaŋigi, gujwero woko; mumiyo nyiŋ kabedo meno gilwoŋo ni
Korma .
Twol ma giteto ki mola
4 Jo Icrael gua ki i te got Kor, gucako lubo yo ma cito i Nam Makwar, kun girabo
lobo Edom. Ci cwiny dano oballe woko ma gitye iyo,
5 gucako loko lok akeca i kom Lubaŋa ki, i kom Moses kun giwaco ni, “Piŋo
wukwanyowa woko ki i Ejipt wek wato i tim? Cam pe, pii bene pe, owinywa ocido
woko ki cam ma konnye pe-ni.”
6Rwot ocwalo twol ma kwirgi kec i kom lwak, ci gucako toŋo dano; jo Icrael guto
mapol.
7Dano gubino bot Moses, guwaco ni, “Doŋ watyeko balo, pien waloko lok akeca i
kom Rwot ki i komi. Leg Rwot wek okwany twol woko ki i kinwa.” Ci Moses olego
pi lwak.
8Rwot owaco ki Moses ni, “Tet cal twol ma kwirre kec-ci, iket iŋab malo i kom tal;
ci dano ducu ma twol otoŋo, ka oneno kome, ci bedo kwo.”
9 Kumeno Moses oteto twol mola, oŋabo malo i wi tal; ci ka twol otoŋo dano mo
en neno kom twol mola, ci kwo.
Acoli Baibul
© 1985, Bible Society of Uganda.
Jo Icrael gurabo lobo Moab
10Jo Icrael gucako wot, ci gugony i Obot.
11Dok gua woko ki i Obot, gugony i Iye-abarim, i tim ma okemo Moab, yo tuŋ
wokceŋ.
12Dok gua ki kunnu, gumedo wot, gugony i nota me Jered.
13Gua ki kunnu, gumedo wot, gugony loka kulu Amon, ma tye i dye tim, ma oa wa
i waŋ lobo pa jo Amor, Amon en aye waŋ lobo pa jo Moab, ma i kin Moab ki jo
Amor.
14En aye ka ma giwaco i Buk me Lweny pa Rwot ni, “Waeb ma i Cupa, ki nota me
Amon ducu,
15ki luŋ me nota mapol ma oyarre nio wa i kabedo ma gilwoŋo ni Ar, ojeŋŋe wa i
waŋ lobo me Moab.”
16Gua ki kunnu, gubino i Beer . En aye waŋ it ma yam Rwot owaco iye bot Moses
ni, “Cok lwak kacel, wek ami pii botgi.”
17I kare meno jo Icrael guwero wer man ni, “Gunnye malo, in waŋ it! Wakoro ki
wer!
18Man waŋ it ma luker gukwinyo, ma twoni ma i lwak gugolo matut ki tal ker ki
odoogi.” Ka dok gua i dye tim, gucito i Matana
19Nia i Matana gucito Nakaliel, ki nia ki kunnu gucito Bamot.
20Nia ki kunnu gucito i nota ma otoŋŋe i lobo Moab, i te lacol got Piciga, ma neno
piny tuŋ tim aroo.
Jo Icrael guloyo Cikon kabaka pa jo Amor
(Nwo 2.26-37)
21Jo Icrael gucwalo lukwena bot Cikon, kabaka pa jo Amor, ma giwaco ni,
22“Ber iwek wawok ki i lobowu, Pe wabiŋak wawok ki i poto mo, nyo i poto olok,
pe wabimato pii ma i waŋ it. Wabimol ma walubo gudo pa Kabaka madit-ti nio ka
wawok wakato waŋ lobowu.”
23Ento Cikon pe oye ni jo Icrael guwok ki i lobone. Ocoko jone ducu, ogurogi
kacel, ci ocito ka lweny i kom jo Icrael i tim. Ka oo i Jakaj, ocako lweny i kom jo
Icrael.
24Ento jo Icrael guneko jone mapol ki pala lucwan, ci gucamo lobogi cakke ki i
kulu Amon o kwede wa i Jajer ma tye i waŋ lobo pa jo Ammon.
25Jo Icrael gumako gaŋi ducu pa jo Amor, gucako bedo iye, i Kecbon ki i gaŋi
matino ducu ma i ŋete.
Acoli Baibul
© 1985, Bible Society of Uganda.
26Kecbon onoŋo obedo gaŋ kai pa Cikon kabaka pa jo Amor. Cikon yam con koŋ
olwenyo i kom kabaka pa jo Moab ci okwanyo lobone woko ducu ki i ciŋe nio wa i
Amon.
27Mumiyo lurot wer giwaco ni, “Wubin i Kecbon, gaŋ kai pa Cikon! Wek giger
odoco, giyub ocuŋ matek.
28 Pien mac yam oa ki i Kecbon, olyel matek kun oa ki i gaŋ kal pa Cikon. Owaŋo
gaŋ Ar pa jo Moab, ma gin rwodi me wi godi me Amon.
29Can madwoŋ opoto i komi, in Moab! Wuto wutum woko do, wun lwak pa
Kemoc! Jok Kemoc omiyo awobene guriŋo gularo komgi, oweko anyirane giyako
gitero i ciŋ Cikon kabaka pa jo Amor.
30Kit meno likwayogi gityeko woko nia ki i Kecbon nio wa i Dibon. Wajwero piny
woko nio ka mac oryeyo piny wa i Medeba.”
Jo Icrael guloyo Og kabaka me Bacan
(Nwo 3.1-11)
31Kit meno jo Icrael gubedo i lobo pa jo Amor.
32Ka dok Moses ocwalo dano ka roto Jajer. Gumako gaŋi matino ma i ŋete, ci
guryemo jo Amor ma gibedo kunnu.
33Ka gulokke, gudok yo tuŋ Bacan. Ci Og kabaka me Bacan ocorre ka lweny i
komgi, en ki lwakke ducu, ci lweny ogeto i Edrei.
34Ento Rwot owaco bot Moses ni, “Pe ilwore; pien atyeko miye i ciŋi, en ki lwakke
ducu, ki lobogi bene. Ibitimo en kit ma itimo i kom Cikon kabaka pa jo Amor ma
yam obedo Kecbon.”
35Kit meno jo Icrael guneko Og ki awobene ducu, gujwero lwakke ducu nid waŋ
ma ŋat acel mo pe odoŋ mubwot makwo; ci gucamo lobogi woko.
Wel 22
1Jo Icrael dok gucako wot ci guguro kemagi i lobo aroo me Moab loka Jordan
mukemo Jeriko.
2Balak wod pa Jipor oneno gin ducu ma jo Icrael gutimo i kom jo Amor.
3En kacel ki jo Moab gubedo ki lworo madwoŋ i kom jo Icrael, pien gipol mada,
mumiyo lworo oloco kom jo Moab woko.
4Ci jo Moab guwaco ki ludoŋo pa jo Midian ni, “Lwak jo man gibijwerowa woko ki
gin ma orumowa ducu, macalo twon dyaŋ ma camo lum ki i bar tyeko woko.”
Pienno Balak wod pa Jipor ma onoŋo obedo kabaka me Moab i kare meno,
Acoli Baibul
© 1985, Bible Society of Uganda.
5 ocwalo lukwena bot Balaam wod pa Beor i Petor ma cok ki kulu Euprate i lobo
Amau ka Lwoŋe kun giwaco ni, “Nen, rok mo gubino ma gua ki i Ejipt, guumo
lobo woko lipuk; kombeddi doŋ gubedo ma gukemo lobowa.
6Tim ber ibin wek icen jo-ni woko pira, pien gitek gikata woko. Gwok nyo miyo
abitwero loyogi, aryemogi woko ki i lobo kany; pien aŋeyo ni ŋat ma ilego gum
kome, kome bedo gum, ki ŋat ma iceno doŋ giceno.”
7Kit meno ludoŋo me Moab ki ludoŋo me Midian gucako wot ki lim me tyet i
ciŋgi, Gucito bot Balaam, gutitte lok me kwena ma Balak ocwalo.
8En owaco ki gin ni, “Tin wubut kany, ci abidwoko lok botwu kit ma Rwot biloko
bota.” Kit meno ludito pa jo Moab gubedo bot Balaam.
9Ci Lubaŋa obino bot Balaam, owaco ni, “Jo mene ma gitye boti-ni?”
10Balaam owaco ki Lubaŋa ni, “Balak wod pa Jipor, ma kabaka me Moab, en aye
ocwalla kwena ma kun waco ni,
11‘Nen, rok mo gubino ma gua ki i Ejipt, ci guumo lobo woko lipuk. Tim ber ibin
wek icen jo-ni woko pira; miyo gwok nyo abitwero lweny kwedgi ci aryemogi
woko.’ “
12Lubaŋa owaco ki Balaam ni, “In pe ibiwot kwedgi; pe ibiceno jo meno, pien gin
jo ma gimiyogi gum con.”
13Ka Balaam oa malo odiko, ci owaco ki ludito pa Balak ni, “Wudok giwu i
lobowu; pien Rwot otyeko kwero ni pe acit kwedwu.”
14Mumiyo ludito pa jo Moab gua gudok bot Balak, guwaco ni, “Balaam okwero
bino kwedwa woko.”
15Balak dok omedde ki cwalo ludito jo mapol makato gin ca, ki dano ma giŋene
makato jo ma gukwoŋo ca.
16Gin gucito bot Balaam, guwaco bote ni, “Balak wod pa Jipor owaco kuman ni,
‘Pe iwek gin mo ogeŋi bino bota;
17pien ada abiketti deyo madit, dok gin ducu ma ibiwacca abitiyo.’ “
18Ento Balaam odok iye ki lutic pa Balak ni, “Kadi bed Balak onoŋo omiya ryal ki
jabu ducu ma i ode, pe atwero kalo wi cik pa Rwot Lubaŋana pi tiyo gin mo
matidi nyo madit.
19Doŋ alegowu ni wun bene tin wubed kany wek aŋe gin ma Rwot dok biwacca.”
20Ci Lubaŋa obino bot Balaam i dyewor meno owaco bote ni, “Ka jo meno gubino
ka lwoŋi, ci ia malo icit kwedgii ento gin ma aciko boti aye ibitiyone.”
Balaam ki kanane
Acoli Baibul
© 1985, Bible Society of Uganda.
21Kit meno Balaam oa malo odiko con, otweyo del kom kanane, ocito ki ludito pa
jo Moab.
22Ento kiniga omako Lubaŋa pi citone; ci lamalaika pa Rwot ocuŋ woko i yo
macalo lamerokke. Balaam onoŋo oito i wi kana, ki luticce aryo onoŋo gitye
kwede.
23Ci kana oneno lamalaika pa Rwot kun ocuŋ i dye gudo, kun noŋo owoto pala
lucwanne, omako i ciŋe, Kana olokke, oa woko ki i gudo, ocito i poto. Balaam
ogoyo kana omiyo odok woko i yo gudo.
24Ci lamalaika dok ocuŋ i yo ka mo madiŋ ma i kin poto olok ma gigeŋo ki cel got
tuŋŋi ki tuŋŋi.
25Ka dok kana oneno lamalaika pa Rwot, ci oyokke ki cel got, odiyo tyen Balaam i
kom cel, omiyo en dok ogoye aye.
26Ka dok lamalaika pa Rwot omedde ki wot anyim ci ocuŋ tuŋ lacuc nyo tuŋ
acam
27Ka kana oneno lamalaika pa Rwot, obuto woko piny ka tyen Balaam, ci kiniga
omako Balaam, ogoyo kana ki odoone.
28Ka doŋ Rwot oyabo dog kana ci owaco bot Balaam ni, “An atimo gin aŋo i komi
mumiyo igoya tyen adek kulu-ni?”
29Ci Balaam owaco ki kana ni, “Pien ibedo ka nywara. Kono atye ki pala i ciŋa,
kono aneki kwede woko.”
30Ci kana owaco ki Balaam ni, “An pe a kanani ma ibedo i koma kare me kwoni
ducu nio wa onyoo? Onoŋo yam koŋ anyebbe ka timo kit man i komi?” En ogamo
ni, “Pe.”
31Lacen Rwot oyabo waŋ Balaam, ci oneno lamalaika pa Rwot ka ocun i dye yo
ma omako pala lucwan i ciŋe; ci Balaam okulo wiye piny, opoto piny aryeba
cwiny.
32Lamalaika pa Rwot owaco bote ni, “Piŋo igoyo kanani tyen adek kulu? Nen, an
abino anyim ka juki, pien wotti akaka-ni pe oyomo cwinya.
33Kana onena ci olokke aa woko ki i nyima tyen adek kulu. Kono en pe onoŋo
olokke oa woko ki bota, kono onoŋo doŋ aneki woko tin ada, kun aweko en
makwo.”
34Ci Balaam owaco bot lamalaika pa Rwot ni, “Doŋ abalo, pien onoŋo pe aŋeyo ni
icuŋ i yo pi lweny i koma. Mumiyo ka ce otimme marac ma pe ipwoyo, ci abidok
cen ki ŋeya.”
35Ento lamalaika pa Rwot ogamo dog Balaam ni, “In doŋ icit ki jo meno; ento gin
ma aciki aye ibiloko.” Pienno Balaam omedde ki wot kacel ki ludito pa Balak.
Acoli Baibul
© 1985, Bible Society of Uganda.
Balak ojolo Balaam
36Ka Balak owinyo ni Balaam doŋ obino, ci ocito ka romo kwede i gaŋ me Moab
ma i waŋ lobo ma kulu Amon opoko, wa i waŋ lobo kikome.
37Ka Balak owaco bot Balaam ni. “An yam pe acwalo kwena ka lwoŋi? Piŋo pe
nene ibino bota? An pe atwero keto deyo i komi?”
38Balaam ogamo ni, “Nen doŋ abino boti. Kombeddi an atye ki twero me loko gin
mo boti? Lok ma Rwot biketo i doga, en aye myero aloki.”
39Balaam ocito gin ki Balak, ci gucito i Kiriat-kujot.
40Ka Balak ocako tumo twoni ki romi opoko riŋo ocwalo bot Balaam ki ludito ma
yam gitye kwede.
Balaam olamo gum i kom jo Icrael
41Orwone Balak otero Balaam ocito kwede malo wa i Bamot-baal, ci Balaam
oneno jo Icrael ma gitye cok ki kunnu.
Wel 23
1Balaam owaco bot Balak ni, “Ber icanna keno tyer abiro kany, ci ikella twoni
abiro ki romi bene abiro.”
2Balak otiyo kit ma Balaam ociko-ni; ci Balak ki Balaam gubedo ka tyero twon
acel ki nyok romo acel i wi keno tyer acel acel.
3Ci Balaam owaco bot Balak ni, “Cuŋ kany i ŋet gitum awaŋani-ni, ci an abicito
kunnu. Gwok nyo Rwot bibino ka rwatte kweda, ci gin ducu ma en binyutta
abititti.” Ci ocito malo i wi got ka ma yadi pe iye.
4Ci Lubaŋa orwatte ki Balaam. Balaam owaco bote ni, “Doŋ atyeko yubo keno
tyer abiro, dok atyero twon acel ki nyok romo acel i wi keno tyer acel acel.”
5Ci Rwot oketo lokke i dog Balaam kun waco bote ni, “Dok cen bot Balak ci iwac
kit man.”
6Odok cen ci onoŋo Balak pud ocuŋ ka ŋet gitum awaŋane kacel ki ludito pa jo
Moab ducu.
7Balaam ocako lokke kun loko macalo lanebi. Owacci, “Balak okela ki i Aram,
kabaka me Moab ooma ki i wi godi ma tye yo tuŋ wokceŋ: ‘Bin wek icenna jo pa
Yakobo. Bin ikec i kom jo Icrael!’
8Abiceno niŋniŋ ka Lubaŋa pe oceno? Akeco i kome niŋniŋ ka Rwot pe okeco i
kome?
9Anenogi ki i wi pata got mabor, abedo ka nenogi ki i wi cere. Nen, gin lwak ma
gibedo ka kengi, pe guribbe kacel ki rok mu kene ducu.
Acoli Baibul
© 1985, Bible Society of Uganda.
10Aŋa ma kwano jo pa Yakobo ma gipol macalo apwa-ni? Aŋa ma kwano jo Icrael
ma gipol mada kuman? Wek an ato kit to pa jo-ni ma kitgi atir-ri! Agikki kwona
obed macalo megi!”
11Ci Balak owaco ki Balaam ni, “Gin aŋo ma doŋ itimo tuŋ bota? Akeli kany ka
ceno lumerokka, ci nen, in ilamo gum komgi keken.”
12Odok iye ni, “Myero agwokke ka loko gin ma Rwot oketo i doga.”
Lok me aryo ma Balaam owaco
13Balak dok owaco bote ni, “Bin doŋ kweda i kabedo mukene ka ma iromo nenogi
iye. Ibineno jo ma gitye cok keken, pe ibinenogi ducu; ci icengi pira ki kunnu.”
14Ci otere i poto pa Jopim wa i lacol got Piciga. Ocano keno tyer abiro kunnu, ci
otyero twon acel ki nyok romo acel i wi keno tyer acel acel.
15Ci Balaam owaco bot Balak ni, “cuŋ kany ka ŋet gitum awaŋani, kun an arwatte
ki Rwot kuca.”
16Ci Rwot orwatte ki Balaam, oketo lok i doge kun waco ni, “Dok cen bot Balak, ci
iwac kit man.”
17Odok bote ci onoŋo Balak pud ocuŋ ka ŋet gitum awaŋane ki ludito pa jo Moab
kacel kwede. Balak openye ni, “Rwot doŋ oloko niŋo?”
18Balaam ocako lokke kun loko macalo lanebi. Owacci, “A malo, Balak, ci iwiny;
winy an ya, in wod pa Jipor.
19Lubaŋa pe dano, ma twero loko goba; en I pe wod pa dano, ma myero onen ki
tamme. Ka doŋ owaco lok mo, ci pe bitiyone? Ka onoŋo oloko, ci pe cobo kakare?
20Nen ya, alimo cik me miyo gum; ka Lubaŋa omiyo gum, pe atwero dwokone
cen.
21Pe aneno can mo ma bipoto i kom Yakobo; pe aneno aroma mo ma bibedo bol
jo Icrael. Rwot Lubaŋagi tye kwedgi, awinyo ka gidaŋŋe gijolo kabakagi.
22Lubaŋa okwanyogi ki i Ejipt, kerone calo kero pa jubi.
23Lugaga mo pe ma loko can i kom Yakobo, gi-tyet mo pe ma mako kom Icrael
Koni doŋ gibiwaco lok i kom Yakobo ki Icrael ni, ‘Lubaŋa otimo gin madit
kuman!’
24Nen lwak meno! Gia malo macalo min labwor, gitiŋŋe macalo labwor ma pe
buto piny nio ka emwodo lee ma omako, ci mato remo pa dano ma onekogi.”
25Ci Balak owaco bot Balaam ni, “Ka pe iye cenogi, myero pe dok ilam gum komgi
aye.”
26Ento Balaam odok iye ki Balak ni, “Yam pe awaco boti ni, ‘Gin ducu ma Rwot
ocika kwede, meno aye myero ati’?”.
Acoli Baibul
© 1985, Bible Society of Uganda.
27Ci Balak owaco bot Balaam ni, “Koni doŋ ibin, abiteri i kabedo mukene; gwok
Lubaŋa biye ni icengi ki kunnu.”
28Balak dok otero Balaam i wi lacol got Peor ma neno piny tuŋ tim aroo.
29Ci Balaam owaco bot Balak ni, “Canna bene keno tyer abiro kany, ikella twoni
abiro ki nyogi romi abiro.”
30Balak otiyo kit ma Balaam owaco-ni, ci otyero twon acel ki nyok romo acel i wi
keno tyer acel acel.
Wel 24
1Balaam, onoŋo doŋ oniaŋ ni Rwot mito miyo gum kom jo Icrael, mumiyo pe dok
ocito ka yenyo tyet kit ma onoŋo ocito i kare mukeneni, ento oloko waŋe oneno
yo tuŋ tim.
2Ka Balaam otiŋo waŋe malo, ci oneno jo Icrael ma guguro kemagi kaka man pat,
kaka man pat. Cwiny pa Lubaŋa obino i kome,
3ci ocako lokke kun loko macalo lanebi. Owacci, “Man lok pa Balaam wod pa Beor,
lok pa twon laco ma wane doŋ giyabo,
4lok pa ŋat ma winyo gin ma Lubaŋa owaco, ki ma neno gin ma Won Twer Ducu
nyuto bote, kun opoto piny ento waŋe bedo twolo.
5Kemawu nen maber kuman, wun jo pa Yakobo, gonywu ber kuman, wuti jo
Icrael!
6Nen calo nota ma oryene mabor, macalo pott i ma gipuro i ŋet kulu; cal ki yadi
ma ŋwece kur ma Rwot opito, nyo yadi cedar ma obakke i ŋet pii.
7Pii bipoŋ libic i agulugi kare ducu, likwayogi bibedo rom ki pii ma mol madwoŋ;
kabakagi bibedo dit makato Agag, gibiketo deyo mamalo mada i kom kerre.
8Lubaŋa ma kerone calo kero pa jubi okwanyogi woko ki i Ejipt. Icrael bicamo
lurok ma lukworre, bituro cogogi, biŋido matinotino; bicelogi pil ki aterone.
9 Onyoŋo piny, obuto calo labwor, macalo min labwor; aŋa ma bituge? Gum obed
i kom jo ducu ma bilamo gum i kom Icrael, cen opot i kom dano ducu ma bicene.”
10Kiniga omako Balak matek i kom Balaam, Odoŋo ciŋe ci owaco bot Balaam ni,
“Alwoiji ka ceno lumerokka, ci nen, ni doŋ ilego gum komgi odoko tyen adek
kulu.
11Pi meno in doŋ iriŋ woko oyot idok doŋ gaŋ, Yam awacci abiketo deyo i komi
ada, ento Rwot doŋ ogeŋi woko ki i limo deyo mo ki bota.”
12Balaam ogamo dog Balak, owacci, “Yam atito ki lukwenani ma yam icwalogi
bota ni,
Acoli Baibul
© 1985, Bible Society of Uganda.
13‘Kadi bed Balak omiya-ryal ki jabu ducu ma i ode, pe atwero turo cik pa Rwot pi
timo gin mo kadi ber kadi rac kit ma an aye amito; gin ma Rwot biwaco keken
aye abiwaco.’ ”
Lok pa Balaam me agikkine
14Lacen Balaam owaco bot Balak ni, “Kombeddi, nen, an doŋ abidok woko bot
lutuwa. Bin wek koŋ ami iŋe gin ma jo me rok man bitimo i kom joni i kare ma
tye anyim.”
15Ci ocako lokke kiin loko macalo lanebi, Owacci, “Man lok pa Balaam wod pa
Beor, lok pa twon laco ma waŋe doŋ giyabo,
16lok pa ŋat ma winyo gin ma Lubaŋa owaco, ŋat ma tye ki ŋec mua ki but En
Mamalo Twal, ma neno gin ma Won Twer Ducu nyuto bote, kun opoto piny ento
waŋe bedo twolo:
17Anene, ento pe kombeddi, anene, ento pe tye cok. Lakalatwe bibino kun a ki bot
Yakobo, odoo ker bia ki i Icrael; bityero tur nyim jo Moab, bituro wi jo ducu ma
gimaro woo me lweny.
18En bimayo lobo pa jo Edom. Jo Ceir ma lukworre en bimayo lobo ki botgi, kun jo
Icrael gitye ka lweny ki tek.
19Jo pa Yakobo gibiloyo loc; jo mubwot i gaŋ pa jo Moab gibinekogi woko liweŋ.”
20Ka dok oneno tuŋ not jo Amalek, oloko macalo lanebi kun waco ni, “Jo Amalek
yam gutelo wi rok mukene ducu, ento i agikki gibityekogi woko matwal.”
21Dok oneno tuŋ bot jo Keni, oloko macalo lanebi kun waco ni, “Kabedowu biri
nakanaka, ka-larrewu gigero i pata got;
22ento wun jo Kain gibiyakowu, wubitum woko. Jo Aciria gibiterowu i opii pi kare
ma rom mene?”
23Dok oloko macalo lanebi kun waco ni, “Magi dok jo mene do ma gucokke yo tuŋ
acam?
24Lukwaŋ mel gibibino ma gua ki yo tuŋ Caiprac, gibiyelo jo Aciria ki jo Eber
matek; gin bene gibinekogi gityekogi woko matwal.”
25Lacen Balaam oa malo odok cen ka ma en bedo iye; ki Balak bene ocito woko.
Wel 25
1I kare ma jo Icrael gubedo i Citim, gucako timo abor i kom anyira Moab.
2Anyira Moab gubedo ka lwoŋo jo Icrael ka ma gitumo iye gitum bot jogigi, ci jo
Icrael gucamo riŋo ma gityero dok guryebbe i nyim jogigi.
Acoli Baibul
© 1985, Bible Society of Uganda.
3Kit meno jo Icrael guribbe kengi ki jok Baal me Peor, cikiniga omako Rwot i
komgi.
4Rwot owaco bot Moses ni, “Kwany ludito ducu ma i kin lwak, idegi i wi yat malo i
dyeceŋ i nyim Rwot, wek kiniga pa Rwot mager-ri oa woko i kom jo Icrael.”
5Mumiyo Moses owaco ki luŋolkop pa jo Icrael ni, “ŋat acel acel ma i kinwu onek
jo me kakane ma guribbe kekengi ki jok Baal me Peor.”
6Dano mo i kin jo Icrael obino ki nya jo Midian otero i gaŋgi, kun Moses ki lwak jo
Icrael ducu gineno, kun onoŋo gitye ka koko i nyim doggola kema me rwatte.
7Ka Finekaci wod pa Eleajar ma wod pa ajwaka Aron oneno, en oa malo, oweko
lwak, omako toŋ,
8ocito olubo kor Laicrael wa i kicika ma i tyelo, ci ocobo gin aryo ducu, Laicrael ki
dako-nu, ocobo igi pii. Kit meno omiyo two gemo oa woko ki i kom jo Icrael.
9Ento onoŋo jo ma two gemo onekogi guromo alip pyeraryo wiye aŋwen.
10Ci Rwot owaco bot Moses ni,
11“Finekaci wod pa Eleajar ma wod pa ajwakana Aron otyeko doŋ dwoko
akecana cen ki i kom jo Icrael, pien nyeko ma omaka omako wa en bene ki i kingi,
omiyo nene pe atyeko jo Icrael woko pi nyekona.
12Pi meno in iwac bote ni, atyeko miyo bote gicikkena me kuc.
13En kacel ki Likwaye ma bilube gibibedo i tic me bedo ajwakana matwal pi
gicikke man ma aketo kwedgi, pien nene nyeko omake pi Lubaŋane, ci otimo gin
lakwany bal ki i kom Jo Icrael.”
14Nyiŋ Laicrael ma gineko kacel ki nya jo Midian obedo Jimri wod pa Calu, ma
ladit wi kaka i ot pa kwarogi i kin jo pa Cimeon.
15Nyiŋ dako ma nya jo Midian ma gineko-ni Kojibi nya pa Jur ma yam ladit wi
kaka i ot pa kwarogi i kin jo Midian.
16Ci Rwot owaco bot Moses ni,
17“Cit doŋ magwa i kom jo Midian, ilweny i komgi;
18pien gin gupoto i komwu magwa pi bwolowu kun gimiyo wupoto i bal i lok pa
jok me Peor, ki i lok pa Kojibi nya pa rwot ma i kin jo Midian ma lamingi i kare ma
two gemo opoto pi lok pa jok me Peor.”
Wel 26
1 I ŋe two gemo Rwot owaco bot Moses ki ajwaka Eleajar wod pa Aron ni,
Acoli Baibul
© 1985, Bible Society of Uganda.
2“Kwan Wel jo Icrael ducu, cakke ki i kom jo ma ditogi romo mwaka pyeraryo
dok kwede malo, kun ilubo dog odi pa kwarogi, jo Icrael ducu ma romo cito ka
lweny.”
3-4Ci Moses ki ajwaka Eleajar guloko ki ludito i lobo aroo me Moab i ŋet Jordan
ma cok ki Jeriko ni, “Wukwan Wel dano cakke ki i kom jo ma ditogi romo mwaka
pyeraryo dok kwede malo,” macalo Rwot ociko ki Moses. Jo Icrael ma yam gua ki
i lobo Ejipt gubedo jo magi:
5Jo me kaka pa Reuben ma obedo latin kayo pa Yakobo ma nyiŋe mukene Icrael-li
gin ene: Likwayo pa Kanok, Pallu.
6Kejeron ki Karmi.
7Meno aye doggola pa jo pa Reuben; welgi ducu oromo alip pyeraŋwen wiye
adek, ki miya abiro ki pyeradek.
8Likwayo pa Pallu gin aye Eliab,
9ki awobene Nemuel, Datan ki Abiram, Magi aye Datan ki Abiram ma lwak guyero
ma gupyem ki Moses ki Aron kun gibedo i kin lwak pa Kora i kare ma gujem i
kom Rwot.
10Lobo oŋamo doge omwonyogi woko ci guto kacel ki Kora i kare ma mac owaŋo
dano miya aryo ki pyerabic, otyekogi woko, ci nyiŋgi odoko lok aboka me juko
dano.
11Ento awobe pa Kora pe guto.
12Jo me kaka pa Cimeon gin ene: likwayo pa Nemuel, Jamin, Jakin,
13Jera ki Caul.
14Meno aye doggola pa jo pa Cimeon; welgi ducu oromo alip pyeraryo wiye aryo,
ki miya aryo.
15Jo me kaka pa Gad gin ene: likwayo pa Jepon, Kagi, Cuni,
16Ojini, Eri,
17Arod ki Areli.
18Meno aye doggola pa jo pa Gad; welgi ducu oromo alip pyeraŋwen, ki miya abic.
19Kaka pa Juda, Er ki On an ma awobe pa Juda yam guto con i lobo Kanaan.
20Doŋ jo me kaka pa Juda gin ene: Likwayo pa Cela, Perej ki Jera,
21ki pa Kejeron ki Kamul ma awobe pa Perej.
22Meno aye doggola pa jo pa Juda; welgi ducu oromo alip pyerabiro wiye abicel ki
miya abic.
Acoli Baibul
© 1985, Bible Society of Uganda.
23Jo me kaka pa Icakar gin ene: likwayo pa Tola, Puwa,
24Jacub ki Cimron.
25Meno aye doggola pa jo pa Icakar; welgi ducu oromo alip pyerabicel wiye
aŋwen, ki miya adek.
26Jo me kaka pa Jabulon gin ene: likwayo pa Cered, Elon ki Jaleel.
27Meno aye doggola pa jo pa Jabulon; welgi ducu oromo alip pyerabicel, ki miya
abic.
28Jo me kaka pa Yucepu gin aye likwayo pa Manace ki Epraim.
29Kaka pa Manace. Makir wod pa Manace onywalo Gilead.
30Jo pa Gilead gin ene; likwayo pa Iejer, Kelek
31Aciriel, Cekem,
32Cemida ki Keper.
33Jelopekad wod pa Keper onywalo anyira keken, awo bene pe, Nyiŋ anyirane
Makala, Noa, Kogla, Mirika ki Tiŋa.
34Meno aye doggola pa jo pa Manace; welgi ducu oromo alip pyerabic wiye aryo,
ki miya abiro.
35Jo me kaka pa Epraim gin ene: likwayo pa Cutela, Beker, Takan,
36ki pa Eran ma wod pa Cutela.
37Meno aye doggola pa jo pa Epraim; welgi oromo alip pyeradek wiye aryo, ki
miya abic. Meno ducu gubedo Likwayo pa Yucepu.
38Jo me kaka pa Benjamin gin ene: likwayo pa Bela, Acibel, Akiram,
39Cepupam, Kupam,
40ki pa Arud ki Naaman ma awobe pa Bela.
41Meno aye doggola pa jo pa Benjamin; welgi ducu oromo alip pyeraŋwen wiye
abic, ki miya abicel.
42Jo me kaka pa Dan gin ene: likwayo pa Cukam.
43Doggola ducu pa likwayo pa Cukam Wel danogi oromo alip pyerabicel wiye
aŋwen, ki miya aŋwen.
44Jo me kaka pa Acer gin ene: likwayo pa Imna, Icivi ki Beria,
45ki pa Keber ki Malkiel ma awobe pa Beria.
46Nya pa Acer nyiŋe obedo Cera.
Acoli Baibul
© 1985, Bible Society of Uganda.
47Meno aye doggola pa jo pa Acer; welgi ducu oromo alip pyerabic wiye adek, ki
miya aŋwen.
48Jo me kaka pa Naputali gin ene: likwayo pa Jajeel, Guni,
49Jejer ki Cilem.
50Meno aye doggola pa jo pa Naputali; welgi ducu oromo alip pyeraŋwen wiye
abic, ki miya aŋwen.
51Wel jo Icrael ducu oromo alip miya abicel ki acel, ki miya abiro ki pyeradek.
52 Ci Rwot owaco bot Moses ni,
53“Ibipoko lobo i kin kaka magi obed me aleyagi kun ilubo wel nyiŋgi ma gicoyo.
54Ibimiyo dul lobo malac bot kaka maditone ki dul lobo manok bot kaka matino;
dul lobo me aleyagi gibipoko ma oporo wel dano ma i kaka mo-ni.
55Lobo gibipoko ki bolo kwir kun lubo kaka pa kwarogi.
56Gibilimo lobo me aleyagi muporo dit pa kaka acel acel kun lubo kit ma kwir
opoto kwede.”
Kaka pa Levi
57Jo me kaka pa Levi gin aye doggola pa Gercon, Kokat ki Merari,
58kacel ki likwayo pa Libni, Kebron, Makali, Muci ki Kora, Kokat onywalo Amram,
59ma dakone obedo Yokobedi nya pa Levi ma onywalo i Ejipt. Yokobedi onywalo
Aron ki Moses ki lam ingi Miriam ki Amram.
60 Aron onywalo Nadab, Abiu, Eleajar ki Itamar,
61 ento Nadab ki Abiu guto woko i kare ma gutyero mac mapat i nyim Rwot, kit
mac ma yam pe ocikogi kwede.
62Gikwano wel jo Levi ducu ma co, cakke i kom jo ma ditogi romo dwe acel dok
kwede malo, Welgi oromo alip pyeraryo wiye adek: ento welgi yam pe gikwano i
kin jo Icrael, pien pe gipoko botgi dul lobo mo me aleyagi i kin jo Icrael.
Kaleb ki Yocwa aye gudog makwo
63Meno gin aye jo ma Moses ki ajwaka Eleajar gukwanogi i lobo aroo me Moab i
ŋet Jordan, ma cok ki Jeriko.
64Ento pe tye ŋat mo acel i kingi ki i kin jo ma yam Moses ki ajwaka Aron
gukwanogi i kare ma gukwano wel jo Icrael i tim me Cinai ca.
65 Onoŋo yam Rwot owaco pigi bot Moses ni, “Gibito woko i tim,” ci dano mo pe
odoŋ ki i kingi, kono nyo Kaleb wod pa Jepune ki Yocwa wod pa Nun keken aye
gudoŋ.
Acoli Baibul
© 1985, Bible Society of Uganda.
Wel 27
1I kare meno anyira pa Jelopekad gubino bot Moses. Jelope kad obedo wod pa
Keper, wod pa Gilead, ma wod pa Makir, wod pa Manace; gin aye jo me doggola
pa Manace wod pa Yucepu. Nyiŋ anyiranu Makala, Noa, Kogla, Mirika ki Tiŋa.
2Gin gubino gucuŋ i nyim Moses ki ajwaka Eleajar, ki i nyim lutel wic ki lwak jo
Icrael ducu i doggola kema me rwatte, ci guwacci,
3“Wonwa yam oto woko i tim, En yam pe tye i kin lwak jo ca ma gujemo i kom
Rwot, i lwak pa Kora, ento oto mere pi balle kene gire; yam pe onywalo awobe.
4Pi lok aŋo miyo gikwanyo nyiŋ wonwa woko ki i kin doggolane? Ni pi litino co
ma pe onywalo-ni bo? Wuminiwa walim dul lobo mo i kin omegi wonwa.”
5Moses otero lok me kokogi i nyim Rwot.
6Ci Rwot owaco ki Moses ni.
7 “Lok pa anyira pa Jelopekad tye atir. Ibipoko lobo botgi i kin omego pa wongi
obed me aleyagi, wek gule dul lobo ma myero obed pa wongi.
8Dok iwac bot jo Icrael ni, ‘Ka laco mo oto ma pe onywalo wode mo, ci wubimiyo
ginaleyane bot nyare.
9Ka nyare mo pe, ci wubimiyo bot omegine.
10Ka ominne mo pe, ci wubimiyo bot omegi wonne.
11Ka omin wonne mo pe ci wubimiyo ginaleyane bot watgi macok ma i doggolagi,
ci bidoko mere. Man aye bibedo cik bot jo Icrael, ki lok ma doŋ giŋolo, macalo
Rwot ociko ki Moses.’ ”
Giyero Yocwa me leyo ka tyen Moses
(Nwo 31.1-8)
12 Rwot owaco bot Moses ni, “Cit malo i wi got man me Abarim, icinen lobo ma
abimiyo bot jo Icrael.
13Ka doŋ ineno, ci in bene doŋ ibito, idok bot lutuwu, macalo yam omeru Aron
odok botgi-ni;
14pien yam wujemo i kom lokka i tim Jin i kare ma lwak okeco i koma ca, kun pe
wunyuto ni an aleŋ i nyimgi, i waŋ pii kunnu.” (Man aye pii me Meriba ma cok ki
Kadec i tim Jin.)
15Moses olego Rwot kun wacci,
16“Ai Rwot Lubaŋa ma loyo tipo kom jo ducu, tim ber iket dano mo me loyo lwak,
Acoli Baibul
© 1985, Bible Society of Uganda.
17 wek owirre i kingi macalo laditgi, dok otel nyimgi ka ma gibicito iye ducu, wek
lwakki pe gubed macalo romi ma lakwatgi pe.”
18 Ci Rwot owaco bot Moses ni, “Kwany Yocwa wod pa Nun, dano ma tye ki
cwiny, en aye iket ciŋi i kome.
19I mi en ocuŋ i nyim ajwaka Eleajar ki i nyim lwak ducu, ci ibicike pi ticce i
nyimgi ducu.
20Dok imine twerri mogo, wek lwak jo Icrael ducu gubed ka woro doge.
21 En bicuŋ i nyim ajwaka Eleajar ma en aye bipenyo lok ma Rwot oŋolo kun tiyo
ki Urim i nyim Rwot; kit meno en kacel ki lwak Jo Icrael ducu gibitiyo gin ducu
kun gilubo lok pa Eleajar.”.
22Moses otiyo kit ma Rwot ocike kwede; okwanyo Yocwa, omiyo ocuŋ i nyim
ajwaka Eleajar i nyim lwak ducu,
23 ci oketo ciŋe i wiye, ocike pi ticce, macalo Rwot ocike kwede.
Wel 28
1Rwot owaco not Moses ni,
2“Cik jo Icrael kun iwaco botgi ni, ‘Myero wunen ni wukelo bota gityerra i kare
ma giciko, en aye camma me gityer ma giwaŋo ki mac me bedo gin ma ŋwece kur
ma yomo cwinya.’ ”
3“Dok iwac botgi ni, Man aye gityer ma giwaŋo ki mac ma wubityero bot Rwot:
litino nyogi romi aryo ma ditogi mwaka acel acel ma komgi pe ki mwonyo, i nino
acel acel, obed gitum awaŋa me nino ducu.
4Wubityero latin romo acel odiko, ki latin romo mukene wubityero otyeno,
5kacel ki moko kwon mapwotte ma romo agwata acel ma girubo ki moo nyig
jeituni ma giodo aoda ma romo cupa aryo ki nucu pi gityer me moko kwon.
6Meno aye gitum me nino ducu ma yam giciko pire i wi got Cinai obed gin ma
ŋwece kur, gityer ma giwaŋo ki mac bot Rwot.
7Gityer amata mutike bibedo koŋo vino ma romo cupa aryo ki nucu pi latin romo
acel acel; wubiliyo koŋo vino makec me gityer amata i kabedo maleŋ i nyim
Rwot.
8Latin romo mukene wubityero otyeno kacel ki gityer me moko kwon ki gityer
amata kit macalo wutimo ki gityer me odiko; bibedo gityer ma giwaŋo ki mac, gin
ma ŋwece kur me yo mo cwiny Rwot.
Gityer me nino me cabit
Acoli Baibul
© 1985, Bible Society of Uganda.
9“I kom nino me cabit wubityero nyogi romi aryo ma ditogi mwaka acel acel, ma
komgi pe ki mwonyo, ki moko kwon mapwotte ma romo agwata aryo, ma girubo
ki moo pi gityer me moko kwon, ki gityer amata mutike.
10Man aye gitum awaŋa me nino me cabit acel acel ma wubimedo i kom gitum
awaŋa me nino ducu ki gityer amata mutike.
Gityer me por dwe
11“I acakki dwe ducu en aye wubityero iye gitum awaŋa bot Rwot: litino twoni
aryo, nyok romo acel ki litino nyogi romi abiro ma ditogi mwaka acel acel, ma
komgi pe ki mwonyo;
12kacel ki moko kwon mapwotte ma girubo ki moo ma romo agwata adek pi twon
acel acel, agwata aryo pi nyok romo acel-li
13ki agwata acel pi latin romo acel acel; bibedo gitum awaŋa ma ŋwece kur me yo
mo cwiny, gityer ma giwaŋo ki mac bot Rwot.
14Gityer amata mutikogi bibedo koŋo vino ma romo cupa abic pi twon, cupa adek
pi nyok romo, ki cupa aryo ki nucu pi latin romo. Man aye gitum awaŋa me dwe
acel acel tyeko kwede dwe ducu ma i mwaka.
15Dok bene wubityero nyok dyel acel bot Rwot pi gitum me bal; wubimedo i kom
gitum awaŋa me nino ducu ki gityer amatane.
Gityer me nino madito me Mugati ma Tobi Pe Iye
(Levi 23.5-14)
16 “I nino dwe apar wiye aŋwen me dwe mukwoŋo en aye nino madit me Kato
(Paska) pa Rwot.
17 Dok i kom nino dwe apar wiye abic me dwe acel-lu en aye nino madit;
wubicamo mugati ma tobi pe iye pi nino abiro.
18I kom nino mukwoŋone wubibedo iye ki gurre maleŋ; pe wuti iye tic mo matek.
19Ento wubityero iye gityer ma giwaŋo ki mac, gitum awaŋa bot Rwot: litino
twoni aryo, nyok romo acel, ki litino nyogi romi abiro ma ditogi mwaka acel acel;
wunen ni komgi pe ki mwonyo.
20Wubityero bene gityer me moko kwon mapwotte ma girubo ki moo. Wumi ma
romo agwata adek pi twon acel acel, agwata aryo pi nyok romo,
21ki agwata acel pi latin romo acel acel.
22Wubityero bene nyok dyel acel bot Rwot pi gitum me bal me kwanyo bal ki i
komwu.
23Wubityero gitum magi kun wumedo ki gitum awaŋa me odiko, ma en gitum
awaŋa me nino ducu.
Acoli Baibul
© 1985, Bible Society of Uganda.
24Wubityero cam me gityer ma giwaŋo ki mac, gin ma ŋwece kur me yo mo cwiny
Rwot, kit meno pi nino abiro ki piny maru; wubityero kun wumedo ki gitum
awaŋa me nino ducu ki gityer amata mutike.
25I nino me abirone wubibedo ki gurre maleŋ: pe wuti iye tic mo matek.
Gityer me nino madit me pwoyo kac
(Levi 23.15-22)
26 “I kom nino me tyero cam me wi mwaka, ma wukelo iye gityer me moko kwon
kai manyen bot Rwot i ninowu madit me kwero agikki cabit abiro, wubibedo iye
ki gurre maleŋ. Pe wuti iye tic mo matek,
27ento wutyer iye gitum awaŋa, gin ma ŋwece kur me yo mo cwiny Rwot: litino
twoni aryo, nyok romo acel, ki litino nyogi romi abiro ma ditogi mwaka acel acel;
28kacel ki gityer me moko kwon mapwotte ma girubo ki moo. Wumi ma romo
agwata adek pi twon acel acel, agwata aryo pi nyok romo,
29ki agwata acel pi latin romo acel acel.
30Wubityero bene nyok dyel acel pi kwanyo bal ki i komwu.
31Wubityerogi kacel ki gityer amata mutikogi kun wumedo ki gitum awaŋa me
nino ducu. Wunen ni komgi pe ki mwonyo.
Wel 29
1“I nino dwe acel me dwe me abiro wubibedo iye ki gurre maleŋ; pe wuti iye tic
mo matek. En aye nino ma wubimiyo gwara kok iye,
2dok wubityero iye gitum awaŋa, gin ma ŋwece kur me yomo cwiny Rwot: wod
twon acel, nyok romo acel ki litino nyogi romi abiro ma ditogi mwaka acel acel,
ma komgi pe ki mwonyo;
3kacel ki gityer me moko mapwotte ma girubo ki moo mutikogi, agwata adek pi
wod twon, agwata aryo pi nyok romo
4ki agwata acel pi latin romo acel acel.
5Wubityero bene nyok dyel acel pi gitum me bal me kwanyo bal ki i komwu.
6Meno ducu wubityero kun wumedo ki gitum awaŋa me por dwe ki gityer me
moko kwon mutike, ki gitum awaŋa me nino ducu ki gityerre me moko kwon, ki
gityer amatagi kit ma cikgi tye. Gibibedo gin ma ŋwece kur ma yomo cwiny,
gityer ma giwaŋo ki mac bot Rwot.
Gityer pi nino madit me Kwanyo Bal
(Levi 23.26-32)
Acoli Baibul
© 1985, Bible Society of Uganda.
7 “I nino dwe apar me dwe me abiro wubibedo ki gurre maleŋ, kun wukumo iye
ki toncwiny; pe wuti iye tic mo,
8ento wutyer gitum awaŋa bot Rwot, gin ma ŋwece kur me yomo cwinye: wod
twon acel, nyok romo acel ki litino nyogi romi abiro ma ditogi mwaka acel acel;
wunen ni komgi pe ki mwonyo.
9Wumi bene gityer me moko kwon mapwotte ma girubo ki moo, agwata adek pi
wod twon, agwata aryo pi nyok romo,
10ki agwata acel pi latin romo acel acel.
11Wubityero bene nyok dyel acel pi gitum me bal ma gimedo ki gitum me bal me
lakwany bal, ki gitum awaŋa me nino ducu, ki gityer mere me moko kwon, ki
gityer amata mutikogi ducu.
Gityer pi nino madito me Bolo
(Levi 23.33-44)
12“I nino dwe apar wiye abic me dwe me abiro wubibedo ki gurre maleŋ; pe wuti
iye tic mo matek. Wubikwero nino madito me woro Rwot pi nino abiro.
13Wubityero gitum awaŋa i nino man mukwoŋo-ni, gityer ma giwaŋo ki mac wek
obed gin ma ŋwece kur me yomo cwiny Rwot: litino twoni apar wiye adek, nyogi
romi aryo ki litino nyogi romi apar wiye aŋwen ma ditogi mwaka acel acel; gubed
ma komgi pe ki mwonyo.
14Wubimiyo gityer me moko kwon mutikogi, moko mapwotte ma girubo ki moo
ma romo agwata adek pi twoni apar wiye adek ki acel acel, agwata aryo pi nyogi
romi aryo pi acel acel,
15ki agwata acel pi litino romi apar wiye aŋwen pi acel acel.
16Wubityero bene nyok dyel acel pi gitum me bal ma gimedo ki gitum awaŋa me
nino ducu, ki gityer me moko kwon ki gityer amata mutike.
17“I nino me aryone wubimiyo litino twoni apar wiye aryo, nyogi romi aryo ki
litino nyogi romi apar wiye aŋwen ma ditogi mwaka acel acel, ma komgi pe ki
mwonyo,
18kacel ki gityer me moko kwon ki gityer amata pi twoni ki nyogi romi ki litino
romi ma lubo welgi, macalo cik tye.
19Wubityero bene nyok dyel acel pi gitum me bal ma gimedo ki gitum awaŋa me
nino ducu, ki gityer me moko kwon mere ki gityer amata mutikogi ducu.
20“I nino me adekke wubimiyo litino twoni apar wiye acel, nyogi romi aryo ki
litino nyogi romi apar wiye aŋwen ma ditogi mwaka acel acel, ma komgi pe ki
mwonyo,
Acoli Baibul
© 1985, Bible Society of Uganda.
21kacel ki gityer me moko kwon ki gityer amata pi twoni ki nyogi romi ki litino
romi ma lubo welgi, macalo cik tye.
22Wubityero bene nyok dyel acel pi gitum me bal ma gimedo ki gitum awaŋa me
nino ducu, ki gityer me moko kwon ki gityer amata mutike.
23“I nino me aŋwenne wubimiyo litino twoni apar, nyogi romi aryo ki litino nyogi
romi apar wiye aŋwen ma ditogi mwaka acel acel, ma komgi pe ki mwonyo,
24kacel ki gityer me moko kwon ki gityer amata pi twoni ki nyogi romi ki litino
romi ma lubo welgi, macalo cik tye.
25Wubityero bene nyok dyel acel pi gitum me bal ma gimedo ki gitum awaŋa me
nino ducu, ki gityer me moko kwon ki gityer amata mutike.
26“I nino me abicce wubimiyo litino twoni aboŋwen, nyogi romi aryo ki litino
nyogi romi apar wiye aŋwen ma ditogi mwaka acel acel, ma komgi pe ki mwonyo,
27kacel ki gityer me moko kwon ki gityer amata pi twoni ki nyogi romi ki litino
romi ma lubo welgi, macalo cik tye.
28Wubityero bene nyok dyel acel pi gitum me bal ma gimedo ki gitum awaŋa me
nino ducu, ki gityer me moko kwon ki gityer amata mutike.
29“I nino me abicel wubimiyo litino twoni aboro, nyogi romi aryo ki litino nyogi
romi apar wi ye aŋwen ma ditogi mwaka acel acel ma komgi pe ki mwonyo,
30kacel pi gityer me moko kwon ki gityer amata pi twoni ki nyogi romi ki litino
romi ma lubo welgi, macalo cik tye.
31Wubityero bene nyok dyel acel pi gitum me bal ma gimedo ki gitum awaŋa me
nino ducu, ki gityer me moko kwon ki gityer amata mutike.
32“I nino me abiro wubimiyo litino twoni abiro, nyogi romi aryo ki litino nyogi
romi apar wiye aŋwen ma ditogi mwaka acel acel, ma komgi pe ki mwonyo,
33kacel ki gityer me moko kwon ki gityer amata pi twoni ki nyogi romi ki litino
romi ma lubo welgi, macalo cik tye.
34Wubityero bene nyok dyel acel pi gitum me bal ma gimedo ki gitum awaŋa me
nino ducu, ki gityer me moko kwon ki gityer amata mutike.
35“I nino me aborone wubibedo iye ki cokke madit me woro Lubaŋa; pe wuti iye
tic mo matek,
36ento wutyer iye gitum awaŋa, gityer ma giwaŋo ki mac wek obed gin ma ŋwece
kur me yomo cwiny Rwot: twon acel, nyok romo acel ki litino nyogi romi abiro
ma ditogi mwaka acel acel, ma komgi pe ki mwonyo,
37kacel ki gityer me moko kwon ki gityer amata pi twon ki nyok romo ki litino
romi ma lubo welgi, macalo cik tye.
Acoli Baibul
© 1985, Bible Society of Uganda.
38Wubityero bene nyok dyel acel pi gitum me bal ma gimedo ki gitum awaŋa me
nino ducu, ki gityer me moko kwon ki gityer amata mutike.
39“Meno aye gin ma wubityero bot Rwot i ninowu madito ma giciko, kun wumedo
iye gityerwu me cobo kwon ki gityer mu kene ma iwu opwoyo, pi gitumwu me
awaŋa, gityer me moko kwon ki me amata, dok pi gityerwu me lakwecwiny.”
40Moses otito ki jo Icrael lok ducu ma Rwot ocike kwede.
Wel 30
1Moses owaco bot ludito wi kaka pa jo Icrael ni, “Man gin ma Rwot ociko,
2 ni, Ka laco mo okwoŋo kwoŋ mo bot Rwot, nyoocikke pi lok mo kun olamme
kekene otwene kene ki cikke me timo gin mo-ni, myero pe otur cikkene, ento
myero ocob kakare kit ma owaco kwede.
3“Nyo ka nyako mo okwoŋo kwoŋ mo bot Rwot, otwene kwede ki cikke me timo
gin mo-ni ma kun tye i paco pa wonne i kare ma pud tidi.
4Ce wonne owinyo pi kwoŋŋe ki cikke ma otwene kwede kekene, ci pe omedo ki
waco iye lok mo bote, ci kwon ducu ma en okwono ki cikke ducu ma otwene
kwede kekene bimoko i kome matwal.
5Ento ka ce wonne ojuke woko i nino ma owinyo iye lokke-ni, ci kwoŋ pa nyako-
nu ki lok ma otwene kwede ke kene pe bimoko i kome; Rwot bene bitimme kica,
pien onoŋo wonne ogeŋo woko.
6“Ka ce ginyomo nyako mo ma noŋo okwoŋo kwon nyo otwene kekene ki cikke
kun oloko laboŋo tamo tere,
7ce cware owinyo pire, ci pe omedo ki waco iye lok mo bote i nino ma owinyo
iye-ni, ci kwoŋŋe ki cikke ma otwene kwede kekene bimoko i kome matwal.
8Ento ka ce cware ojuke woko i nino ma owinyo iye lokke-ni, ci cware bikwanyo
kwoŋ meno woko ki i kome, nyo lok mo ma onoŋo otwene kwede kekene kun
oloko laboŋo tamo tere; Rwot bene bitimme kica.
9“Ka ce daa-to nyo dako ma cware oryemo okwoŋo kwoŋ, ci lok ducu ma en
otwene kwede kekene bimoko i kome.
10“Ka dako mo okwoŋo kwoŋ nyo otwene kekene ki cikke ma doŋ ginyomo woko,
11ce cware owinyo pire ci pe omedo ki waco iye lok mo bote, dok pe ojuke, ci
kwoŋ ducu ma en okwoŋo, ki cikke ducu ma otwene kwede, bimoko i kome.
12Ento ka ce cware ogeŋo woko i nino ma owinyo pire-ni, ci lok ducu ma dako-nu
oloko ma mako kwoŋ ma okwoŋo nyo cikke ma otwene kwede pe bimoko, pien
cware doŋ ogeŋo woko: Rwot bene bitimme kica iye.
Acoli Baibul
© 1985, Bible Society of Uganda.
13Kwoŋ ducu ma dako okwoŋo nyo ma otwene kwede me keto aroma i kome
kekene, cware twero moko, dok cware twero geŋo woko.
14Ento ka cware pe owaco lok mo bote, obedo ka liŋ aliŋa nino ducu, miyo en
moko kwede kwoŋ pa dakone ducu ki cikke ducu ma otwene kwede kekene, pien
pe owaco lok mo bote i nino ma owinyo iye pire-ni.
15Ento ka ori ma pe ogeŋo woko oyotoyot, ci bal pa dakone bidok i wiye ka pe
ocobo.”
16Meno aye cik ma Rwot ociko ki Moses ma mako Laco ki dakone ka okwono
kwon, ki won nyako ki nyare ka okwoŋo kwoŋ i kare ma en pud tidi, ma noŋo
pud tye i paco pa wonne.
Wel 31
1Rwot owaco bot Moses ni,
2“Doŋ icul kwor pa jo Icrael i kom jo Midian; lacen doŋ ibito, idok bot lutuwu.”
3Ci Moses owaco ki lwak ni, “Wumi lumony ma gitye i kinwu gurukke ki jami
lwenygi, wek gucit ka lweny i kom jo Midian, gucul kwor pa Rwot i komgi.
4Wucwal dano alip acel mua ki i kaka acel acel ma i Icrael gucit i lweny.”
5Kit meno ginoŋo dano alip apar wiye aryo ma gurukke pi lweny mua ki i lwak
doggola mapol mada ma i Icrael, dano alip acel mua ki i kaka acel acel.
6Moses ocwalogi woko ka lweny, kacel ki Finekaci wod pa ajwaka Eleajar ma
omako jami maleŋ pa Lubaŋa ki tum me goyo oduru.
7Gulwenyo i kom jo Midian macalo Rwot ociko ki Moses, ci guneko co megi ducu.
8Luker abic pa jo Midian onoŋo tye i kin dano ma ginekogi; nyiŋgi Evi, Rekem,
Jur, Kur ki Reba. Dok guneko Balaam wod pa Beor bene ki pala lucwan.
9Jo Icrael guyako mon ki litino pa jo Midian, gutero woko; dok gumayo limgi
makwo madito ki matino ducu, ki jamigi ducu.
10Gaŋigi ducu i kabedo mapatpat ma gin gibedo iye, ki gonygi ducu, guwaŋo
woko ki mac,
11ci gutero jami ducu ma guyako nyo gumayo, dano wa ki lee-gu, gucito kwede,
12gukelo bot Moses ki ajwaka Eleajar ki bot lwak jo Icrael, i gonygi ma i lobo aroo
me Moab i ŋet Jordan, ma cok ki Jeriko.
Lonyo jami ma giyako
13Moses ki ajwaka Eleajar ki lutel wi lwak ducu gucito woko ka rwatte kwedgi i
ŋe gony.
Acoli Baibul
© 1985, Bible Society of Uganda.
14Ci kiniga omako Moses i kom ludito me mony, i kom lulo dano alip ki lulo dano
miya ma gudwogo ki ka tero dano i mony.
15Moses owaco botgi ni, “Man wuweko mon ducu gudoŋ makwo piŋo?
16 Nen, mon-ni aye yam gulubo tam pa Balaam ci gumiyo jo Icrael guŋayo waŋ
Rwot i lok i kom jok Peor ca, mumiyo two gemo opoto i kom lwak pa Rwot.
17Kombeddi doŋ wunek litino co woko ducu ma i kin litinogi, dok wunek mon
ducu ma doŋ otyeko ŋene ki co.
18Ento litino anyira ducu ma peya gubuto ki co wugwokgi makwo gubed mewu.
19Koŋ wubut woko i ne gony pi nino abiro. Jo ducu ma i kinwu ma guneko dano,
ki jo ducu ma gugudo kom dano muto myero wulonnye kekenwu, kacel ki dano
ma wuyakogi, i nino me adekke ki i nino me abirone.
20Wulony boŋŋi aruka ducu, gin ducu ma gitiyo ki laa, nyo ma gicweyo ki yer
dyegi, ki jami ducu ma gitiyo ki bao nyo ki yat.”
21Ajwaka Eleajar owaco bot lulweny ma onoŋo gucito i mony ni, “Man aye cik ma
giketo, ma yam Rwot ociko ki Moses:
22Jami ma obedo jabu, nyo ryal, nyo mola, nyo nyonyo, nyo koc, nyo racac keken,
23gin ducu ma mac pe balo, wubimiyo wok kato ki i mac ci bilony woko. Ento kadi
bed kumeno, pud dok gibilonyo ki pii me lwoko kwer; ci gin ducu ma mac balo
woko wubimiyo wok kato ki i pii.
24Myero wulwok bonniwu i nino me abirone, ci doŋ wubibedo ma wulony; ka
lacen wubibino i gony.”
Poko jami ma giyako i mony
25Rwot owaco ki Moses ni,
26“Doŋ ikwan wel jami ma giyako ki i mony, dano ki lee bene; wukwan ki ajwaka
Eleajar ki ludito kaka ma i ot pa kwarogi ma i kin lwak.
27Ci ipok jami ma giyako i mony i dul aryo, tuŋ cel pi lulweny ma gucito i mony,
tuŋ cel pi lwak ducu.
28Dok ijog ajog pa Rwot ki bot lulweny ma gucito i mony kun ikwanyo acel i kom
miya abic ki i kom dano, ki twoni, ki kana, ki romi ki dyegi.
29Kwany ki i kom nucu ma megi, ci imi bot ajwaka Eleajar obed gityer bot Rwot.
30I kom nucu ma tuŋ bot jo Icrael ibikwanyo iye acel i kom pyerabic ki kom dano,
ki twoni, ki kana, ki romi nyo dyegi, ki i kom lim makwo ducu, ci imi bot Lulevi
ma gigwoko kema pa Rwot.”
31Ci Moses ki Eleajar gutiyo kit ma Rwot ociko ki Moses.
Acoli Baibul
© 1985, Bible Society of Uganda.
32Jami ma lulweny guyako, ma odoŋ, onoŋo obedo romi alip miya abicel ki
pyerabiro wiye abic,
33dyaŋi alip pyerabiro wiye aryo,
34kana alip pyerabicel wiye acel,
35ki dano alip pyeradek wiye aryo ma gin ducu aye anyira ma peya gubuto ki co.
36Nucune ma gipoko bot jo ma gucito i mony obedo romi alip miya adek ki
pyeradek wiye abiro, ki miya abic;
37romi ma gijogo pi Rwot guromo miya abicel ki pyerabiro wiye abic.
38Dyaŋi guromo alip pyeradek wiye abicel; dyaŋi ma gijogo pi Rwot guromo
pyerabiro wiye aryo.
39Kana gubedo alip pyeradek, ki miya abic; gin ma gijogo pi Rwot guromo
pyerabicel wiye acel.
40Dano guromo alip apar wiye abicel; dano ma gijogo pi Rwot guromo pyeradek
wiye aryo.
41Moses omiyo dul ma gijogo me gityer pa Rwot bot ajwaka Eleajar, macalo Rwot
ocike.
42Nucu ma gipoko ki jo Icrael, ma Moses opoko pat ki maca pa jo ma yam gucito i
mony,
43wek obed pi lwak, obedo romi alip miya adek ki pyeradek wiye abiro, ki miya
abic,
44dyaŋi alip pyeradek wiye abicel,
45kana alip pyeradek, ki miya abic,
46ki dano alip apar wiye abice!
47I kom nucu man ma obedo pi lwak Moses okwanyo iye acel ki i kom pyerabic, i
kom dano ki i kom lee, ci omiyogi bot Lulevi ma gigwoko kema pa Rwot, macalo
Rwot ocike kwede.
48Ka doŋ ludito ma giloyo lumony ducu, lulo dano alip ki lulo dano miya, gubino
bot Moses.
49Guwacci, “Wan luticci watyeko kwano Wel lumony ma gitye i te locwa, ci onen
ni pe tye dano acel mo ma orwenyo ki i kingi.
50Ci doŋ wakelo gityerwa bot Rwot, gin ma dano acel acel onoŋo i lweny, jami me
jabu, mola bad, atego ŋut ciŋ, agit ciŋ ki tiko ŋut, pi kwanyo bal ki i komwa i nyim
Rwot.”
Acoli Baibul
© 1985, Bible Society of Uganda.
51Moses ki ajwaka Eleajar gugamo jabu meno ki botgi; gin ducu obedo jami me
deyo kom ma gitiyo ki diro
52Jabu ducu ma lulo dano alip ki lulo dano miya gutyero bot Rwot pekke oromo
makato ratili miya aŋwen.
53Onoŋo lulweny ducu guyako jami, ŋat acel acel pire kene.
54Moses ki ajwaka gugamo jabu ki bot ludito wi mony, gutero i kema me rwatte
obed gin me poyo wi Rwot i kom jo Icrael.
Wel 32
1Jo me kaka pa Reuben ki pa Gad gubedo ki lwak lim makwo mapol twatwal. Ka
guneno lobo Jajer ki lobo Gilead obedo lobo maber twatwal me kwat,
2ci gucito bot Moses ki ajwaka Eleajar ki bot lutel wi lwak, guwaco ni,
3“Gaŋi magi, Atarot, Dibon, Jajer, Nimra, Kecbon, Eleale, Cebam, Nebo ki Beon
4ma i lobo ma yam Rwot oloyo i nyim lwak jo Icrael, lobogi ber twatwal me kwat;
ci wan luticwu-ni watye ki lim madwoŋ.
5Ka in bene ipwoyo tamwa-ni, ci iye lobo man gimi botwa obed mewa, pe doŋ
iterwa waŋol loka Jordan.”
6Ento Moses owaco bot jo pa Gad ki pa Reuben ni, “Omegiwu gibicito ka lweny
kun wun wubedo kany bo?
7Piŋo wumito balo cwiny jo Icrael, ni pe gucit loka ca i lobo ma yam Rwot omiyo
botgi?
8 Kwarowu bene yam koŋ gutimo kit meno i kare ma acwalogi ki i Kadec-barnea
pi neno lobo.
9Pien ka gucito malo wa i nota me Ecikol, ka guneno lobo, ci gubalo cwiny jo
Icrael woko, ni pe gucit i lobo ma Rwot doŋ otyeko miyo botgi.
10 Ci kiniga omako Rwot i komgi i nino maca. Okwono kwon kun waco ni,
11‘Ada, pe tye ŋat mo ki i kin jo ma yam gua ki i Ejipt, cakke ki i kom jo ma ditogi
romo mwaka pyeraryo dok kwede malo ma bineno lobo ma yam akwoŋo pire ni
abimiyo bot Abraim ki Icaka ki Yakobo, pien pe gubedo ka lubo gin ma amito
ducu kakare.
12Pe tye ŋat mo ma bineno, kono nyo Kaleb wod pa Jepune ma jo Keniji, ki Yocwa
wod pa Nun, pien gin aye gubedo ka lubo gin ma amito ducu kakare.’
Acoli Baibul
© 1985, Bible Society of Uganda.
13Kiniga omako Rwot i kom jo Icrael i kare ca, ci omiyo gubedo ka wirre i tim
atata gutyeko mwaka pyeraŋwen kulu, nio ka yalwak ma yam gutimo rac i nyim
Rwot gutum woko.
14Ci nen, wun bene dok wua malo kun wuleyo ka wegiwu, wun litino pa lubalo,
miyo wubimedo dok kiniga pa Rwot doko mager t kom jo Icrael!
15Pien ka wuweko luba gin ma en mito kombeddi, ci en dok bitenyo lwak man
woko i tim ata; kit meno wubimiyo lwak man ducu to tum woko.”
16Ka gin dok gubino bote kun giwaco ni, “Wabigero dwol ma wagero ki gweŋ pi
romiwa, ki gaŋi pi mon ki litinowa.
17Ento wan wabiruko jami Iwenywa, kun wayubbe pi telo wi jo Icrael anyim, nio
ka wabiterogi i kabedogi, kun noŋo monwa ki litinowa gibedo i gaŋi gogo ma
wacelo matek pi dano ma gibedo i lobo-ni.
18Pe wabidwogo i pacowa nio waŋ ma jo Icrael gutyeko noŋo ginaleyagi ki acel
acel ducu.
19Wan pe wabinywako leyo lobo kacel kwedgi i ne kulu Jordan ki tuŋ kunnu
ducu, pien ginaleya ma me wa doŋ watyeko noŋone i loka Jordan kany ma tuŋ
wokceŋ.”
20Omiyo Moses dok owaco botgi ni, “Ka ce wubitimo kit meno, ka ce wubiruko
jami Lwenywu wucito anyim ka lweny i nyim Rwot,
21kun dano acel acel i kinwu ma romo lweny kato loka Jordan i nyim Rwot, nio ka
Rwot otyeko ryemo lumerokke woko ki i nyime, ci ber.
22Ka Rwot doŋ otyeko loyo lobo-nu, ci lacen wubidwogo giwu kun banya mo pe i
komwu bot Rwot nyo bot jo Icrael, ci lobo man wubicamo bedo mewu i nyim
Rwot.
23Ento ka pe wutimo kit meno, ci nen, noŋo wutimo bal i kom Rwot. Myero wuŋe
ni, balwu bimiyo wutiŋo alii ma bidwarowu.
24Wuger gaŋi pi mon ki Litinowu, ki dwol pi romiwu; ento wucob gin ma
wuwaco-ni.”
25Jo Gad ki jo Reuben gudok iye bot Moses ni, “Wan aye luticci; wabitiyo kit
macalo in laditwa iciko ducu.
26Litinowa ki monwa ki romiwa ki limwa makwo ducu gibidoŋ kany i gaŋi ma i
Gilead.
27Ento wan ducu ma waruko jami lweny wabikato waŋolo loka ca ka lweny i
nyim Rwot kit macalo in laditwa iciko-ni.”
28 Kit meno Moses omiyo cik ma makogi bot ajwaka Eleajar ki bot Yocwa wod pa
Nun, ki bot ludito ki i odi pa kwarogi ma i kaka ducu pa jo Icrael.
Acoli Baibul
© 1985, Bible Society of Uganda.
29Owaco botgi ni, “Ka jo Gad ki jo Reuben ma doŋ gurukke pi lweny i nyim Rwot
gibikato giŋolo kwedwu loka Jordan, dok ka wun wuloyo lobonu woko, ci
wubimiyo botgi lobo Gilead obed megi.
30Ento ka pe bigikato loka ca kacel kwedwu kun gurukke me lweny, ci
gibinywako camo lobo Kanaan kacel kwedwu.”
31Jo pa Gad ki pa Reuben gudok iye ni, “Wabitimo kit ma Rwot doŋ oloko botwa,
ladit.
32Wabikato Loka ca i nyim Rwot, wacito i lobo Kanaan kun warukke me lweny,
miyo lobo ma loka Jordan kany bidoŋ i ciŋwa ci bedo me aleyawa.”
33Mumiyo Moses omiyo bot jo Gad ki jo Reuben ki bot nucu kaka pa Manace wod
pa Yucepu lobo ma yam obedo pa Cikon kabaka pa jo Amor ki Og kabaka me
Bacan, lobo ducu ma gin yam guloyo, kacel ki gaŋi ducu ma i lobo-nu ki lobo ma i
ŋetgi ducu.
34Jo Gad gugero Dibon, Atarot, Aroer,
35Atarot-copan, Jajer, Jogbea,
36Bet-nimra ki Bet-aran, gin ducu gaŋi ma gicelo ki cel gogo, ki dwol pi romigi.
37Jo Reuben gugero Kecbon, Eleala, Kiriataim,
38Nebo ki Baal-meon (magi giloko nyiŋgi woko) ki Cibma; ci gucako nyiŋ mukene
pi gaŋi ma gugero-ni.
39Jo pa Makir wod pa Manace gucito i lobo Gilead, gumako gumayo woko ki bot jo
Amor ma onoŋo gitye kunnu.
40Ci Moses omiyo Gilead bot jo pa Makir wod pa Manace, gucako bedo iye.
41Jair me kaka pa Manace ocito omako gaŋi matino mapol, ocako nyiŋgi ni, Kavot-
jair.
42Dok Noba ocito omako Kenat ki gaŋi matino ma i ŋete, ci ocako nyiŋe Noba,
macalo nyiŋe kikome.
Wel 33
1Jo Icrael yam guwoto kun gikobo ki wotgi kit man, i kare ma gua woko ki i lobo
Ejipt ki bucagi kun Moses ki Aron gitelo wigi.
2Yam Moses obedo ka coyo nyiŋ kabedo acel acel i kare ma gua ki iye, macalo
Rwot ociko, Nyiŋ kabedo ki kit ma gukobo ki wotgi en ene:
Acoli Baibul
© 1985, Bible Society of Uganda.
3Jo Icrael gua woko ki i Ramcec i nino dwe apar wiye abic me dwe mukwoŋo, i
nino ma lubo nino madit me Kato (Paska), Gua gucito woko ki wayu kun jo Ejipt
ducu gineno.
4Noŋo jo Ejipt gitye ka yiko litino kayogi ma onoŋo Rwot ogoyo oneko woko,
ocobo kwede kop ma oŋolo i kom lubaŋa ducu pa jo Ejipt.
5Kit meno jo Icrael gua ki i Ramcec, gugony i Cukot.
6Gua ki i Cukot, gugony i Etam ma tye i dog tim.
7Gua ki i Etam, ci gulokke gudok cen i Piakirot ma yo tuŋ wokceŋ me Baal-jepon;
ci gugony i nyim Migdol.
8Gua ki i Pi-akirot guwok gukato i dye nam, guo i tim. Guwoto wot me nino adek i
dye tim me Etam, ci gugony i Mara.
9Gua ki i Mara, gubino i Elim. I Elim yam tye iye waŋ it apar wiye aryo, ki otit
pyerabiro; ci gugony kunnu.
10Gua ki i Elim, gugony i ŋet Nam Makwar.
11Gua ki i ŋet Nam Makwar, gugony i tim Cin.
12Gua ki i tim Cin, gugony i Dopka.
13Gua ki i Dopka, gugony i Aluc.
14Gua ki i Aluc, gugony i Repidim ka ma pii amata pa dano obedo pe.
15Gua ki i Repidim gucito wa i te got Kor. Ka pud gitye i yo me cito kunnu gugony
i kabedo magi: tim Cinai,
16Kibrot-atava,
17Kajerot,
18Ritma,
19Rimmon-perej,
20Libna,
21Rica,
22Keelata,
23got Ceper,
24Karada,
25Makelot
26Takat
Acoli Baibul
© 1985, Bible Society of Uganda.
27Tera
28Mitka
29Kacimona,
30Mocerot,
31Bene-jaa-kan,
32Kor-agidgad.
33Jotibata,
34Abrona,
35Ejion-geber,
36tim me Jin, en aye Kadec
37lacen gugony i te got Kor, i dog waŋ lobo me Edom.
38 Ajwaka Aron oito malo i wi got Kor kit ma Rwot ociko, ci oto woko kunnu, i
mwaka me pyeraŋwenne nia ma jo Icrael gua ki i lobo Ejipt, i nino mukwoŋo me
dwe me abic,
39onoŋo Aron doŋ tye ki mwaka me ditte miya acel ki pyeraryo wiye adek i kare
ma en oto ki i wi got.
40 Ci kabaka me Arad, ma en Lakanaan ma bedo i Negeb i lobo owinyo pi bino pa
jo Icrael.
41Ka gua ki i te got Kor gugony i kabedo magi: Jalmona,
42Punon,
43Obot,
44Iye-abarim ma i lobo Moab,
45Dibon-gad,
46Almon-Diblataim.
47Gua ki i Almon-diblataim gugony i dye godi Abarim, i nyim got Nebo.
48Gua ki kunnu, gugony i lobo aroo me Moab i ŋet Jordan ma cok ki Jeriko.
49Guguro kemagi i ŋet Jordan cakke i Bet-jecimot o kwede wa Abelcitim i bar
aroo me Moab.
Lubaŋa ociko jo Icrael ma peya guŋolo Jordan
50I lobo aroo me Moab i ŋet Jordan ma cok ki Jeriko Rwot owaco bot Moses ni,
51“Cik jo Icrael ni, Ka wuŋolo kulu Jordan wukato i lobo Kanaan,
Acoli Baibul
© 1985, Bible Society of Uganda.
52ci wubiryemo jo ma gibedo i lobo meno woko ducu ki i nyimwu; wubibalo got
megi ducu ma gigoro cal i komgi, ki cal jogigi me nyonyo ma giliyo aliya, dok
wubimuko waŋ jogigi ma i wi godi.
53Wubicamo lobo-nu, wubibedo iye, pien atyeko miyo botwu ni obed mewu.
54 Wubilimo lobo me aleyawu kun gipoko ki bolo kwir ma lubo kit ma doggolawu
tye kwede, Wubimiyo dul lobo malac bot kaka maditone ki dul lobo manok bot
kaka matino. Ka ma kwir opoto iye i kom dano mo, en aye bedo mere; wubilimo
lobo me aleyawu kun lubo kaka pa kwarowu.
55Ento ka pe wuryemo jo ma gibedo i lobo-nu woko ki i nyimwu, ci gin jo meno
ma wuwekogi gudoŋŋi gibibedo macalo atero mabit me cobo waŋwu ki okuto me
cobo lakŋetwu, ci gibiyelowu i lobo ka ma wubibedo iye-ni.
56Ci abitimo i komwu kit ma onoŋo atamo ni abitimo i komgi.”
Wel 34
1Rwot owaco bot Moses ni,
2“Cik jo Icrael kun iwaco botgi ni, Ka wudonyo i lobo Kanaan, ma en aye lobo ma
gibimiyowu obed mewu me aleyawu, waŋ apokki me lobowu bibedo k it man:
3Wan lobowu yo tuŋ acuc bicakke i tim me Jin ci rabo ŋet lobo Edom. Bia ki tuŋ
agikki nam me Kado ma tuŋ wokceŋ,
4ka doŋ bilokke dok tuŋ acuc ka ma giito iye malo i Akrabim, ka dok kato kwede
wa i Jin, ki agikkine bibedo i ŋet Kadec-barnea yo tuŋ acuc, Ka dok bicito medde
kwede nio wa i Kajar-adar, ka kato cito kwede i Ajimon.
5Ka waŋ lobo cako lokke ki i Ajimon cito wa i nota ora me Ejipt; ci wane bigik i
dog nam.
6“Waŋ lobo ma yo tuŋ potoceŋ bibedo Nam Madit; dog namme bibedo waŋ
lobowu ma yo tuŋ potoceŋ.
7“Man aye bibedo waŋ lobowu ma yo tuŋ acam: bia ki i Nam Madit ci bicito atir o
wa i kom got Kor.
8Nia ki i kom got Kor bicito atir wa i yo ma donyo i Kamat, ci cito wa i Jedad;
9ka dok bimedde cito wa i Jipron, ka bigik i Kajar-enan, Man aye bibedo waŋ
lobowu ma yo tuŋ acam.
10“Waŋ lobowu ma yo tuŋ wokceŋ bicakke ki i Kajar-enan cito atir o wa i Cepam.
11Ka waŋ lobo bilor dok tuŋ piny nia ki i Cepam o kwede wa i Ribla ma i ŋet Ain
yo tuŋ wokceŋ. Ka dok bilor piny cito o kwede i kor got me nam me Kineret yo
tuŋ wokceŋ.
Acoli Baibul
© 1985, Bible Society of Uganda.
12Ka dok bilor piny wa i Jordan, ka bigik i nam me Kado, Meno aye bibedo
lobowu, ki waŋ apokkine ma orumo ducu.”
13 Moses dok ociko jo Icrael kun waco ni, “Man aye lobo ma wubileyo kun gipoko
ki bolo kwir, ma yam Rwot ociko ni gimi bot kakawu aboŋwen ki nucu;
14pien kaka pa Reuben ki kaka pa Gad gutyeko gamo ginaleyagi kun lubo dog odi
pa kwarogi, kacel ki nucu kaka pa Manace bene.
15Gutyeko gamo lobogi loka Jordan mukemo Jeriko, yo tuŋ wokceŋ, ka ma ceŋ tuc
ki iye-ni.”
16Rwot owaco bot Moses ni,
17“Man aye nyiŋ dano ma gibipoko botwu lobo me ginaleyawu: ajwaka Eleajar ki
Yocwa wod pa Nun.
18Dok wubikwanyo latel wic acel ki i kaka acel acel wek gupok lobo me aleyawu.
19Magi aye nyiŋ lutel; pi kaka pa Juda, Kaleb wod pa Jepune.
20Pi kaka pa Cimeon, Cemuel wod pa Amikud.
21Pi kaka pa Benjamin, Elidad wod pa Kicion.
22Pi kaka pa Dan, Buki wod pa Jogli.
23Pi likwayo pa Yucepu, pi kaka pa Manace, Kaniel wod pa Epod;
24ki i kaka pa Epraim, Kemuel wod pa Ciptan.
25Pi kaka pa Jabulon, Elijapan wod pa Pamak.
26Pi kaka pa Icakar, Paltiel wod pa Ajan.
27Pi kaka pa Acer, Akiud wod pa Celomi.
28Pi kaka pa Naputali, Pedael wod pa Amikud.
29Magi aye dano ma Rwot ociko ni gupok lobo me aleya pa jo Icrael ki i lobo
Kanaan.”
Wel 35
1 I lobo aroo me Moab ma i ŋet Jordan mukemo Jeriko Rwot owaco bot Moses ni,
2“Cik jo Icrael ni gumi ki Lulevi gaŋi me bedogi ki i koni lobo ma gibilimo me
aleyagi; dok myero wumi botgi lobo ma orumo gaŋi-nu obed me oletgi.
3Gaŋi-nu bibedo pa Lulevi me bedogi, ki olet ma i ŋetgi bibedo pi kwayo dyaŋigi
ki limgi makwo ducu.
Acoli Baibul
© 1985, Bible Society of Uganda.
4Lobo ma wubimiyo bot jo Levi pi oletgi lacce biromo yadi miya abic cakke ki i cel
me gaŋ tuŋŋi ki tuŋŋi kun rumo gaŋ ducu.
5Wubipimo dul lobo ma latwoke aŋwen ma romrom; bor me twoke acel acel
bibedo yadi alip acel, kun gaŋ bedo i dyere.
6Wubimiyo bot Lulevi gaŋi abicel me laro lunek dano ka ma wubiweko lunek riŋo
iye, dok wubimiyo botgi gaŋi mukene pyera ŋwen wiye aryo wumedo i kom
meno.
7Kit meno gaŋi ducu ma wubimiyo bot Lulevi biromo pyeraŋwen wiye aboro,
kacel ki oletgi.
8Gaŋigi wubimiyo botgi kuti wukwanyo ki i kom lobo ma jo Icrael gibigamo;
wubikwanyo mabup ki bot kaka madito, dok ki bot kaka matinone wubikwanyo
manok, kun kaka acel acel miyo gaŋine mogo bot Lulevi muporo lobo ma ogamo
me ginaleyane.”
Gaŋi me laro lunek dane
(Nwo 19.1-13; Yoc 20.1-9)
9Rwot owaco bot Moses ni,
10“Wac bot jo Icrael ni, Ka doŋ wuŋolo kulu Jordan, wukato i lobo Kanaan,
11ci wubiyero gaŋi mogo wek gubed gaŋi me laro lunek dano, wek dano ma pe
guneko dano akaka guriŋ gular iye komgi.
12Gaŋi magi bibedo me laro lanek dano ki bot lacul kwor, wek lanek dano mo pe
oto nio ka ocuŋ i nyim lwak wek giŋol koppe.
13Wubiyero gaŋiwu abicel,
14adek loka Jordan tuŋ wokceŋ ki adek i lobo Kanaan, gubed gaŋi me laro lunek
dano.
15Gaŋi magi abicel-li gibibedo me laro kom pi jo Icrael ki pi welowu ki pi lubedo
ma gibedo i kinwu, wek ka ŋat mo oneko dano kun pe oneko akaka oriŋ olar iye
kome.
16“Ento ka ogoyo dano ki nyonyo mo oreto piny ci oto woko, meno en lanek;
gibineke woko.
17Ka ce ocelo dano ki kidi ma omako i ciŋe, ma romo neko dano, ci ocelo oto
woko, meno aye lanek; gibineke woko.
18Nyo ka ogoyo ki yat ma omako i ciŋe, ma romo neko dano, ci oto woko, meno en
lanek; gibineke woko.
19Wat macok pa lato kikome aye bineko lanek dano woko; ka oromo kwede, ci
neke woko.
Acoli Baibul
© 1985, Bible Society of Uganda.
20Ka ŋat mo obako dano ocobo pil pi mone, nyo otokke i kome ci obayo ocobo
woko, kun noŋo okiye akiya, ci oto woko,
21nyo ka odoŋe ki ciŋe pi mone ma tye i kingi ci oto woko, ŋat ma ocobe nyo ma
odoŋe-ni gibineko woko; meno en lanek. Wat macok ki Lato kikome aye bineko
lanek dano woko, ka oromo kwede.
22“Ento ka ce obako ci ocobe oyotoyot ma tyen mone mo pe, nyo otokke i kome ci
obayo ocobo ma pe okiye akiya,
23nyo ocele ki kidi ma romo neko dano ma noŋo pe onene, ci oto woko kadi yam
pe en lamerokke, dok onoŋo pe opiro timo en marac,
24ci lwak myero oŋol kop i kin lanek ki wat pa lato ma lacul kwor remo kun lubo
cik magi.
25Lwak myero olar lanek dano ki i cin wat pa lato ma lacul kwor remo-ni, ci
dwoko lanek i gaŋ me laro lunek dano ka ma yam oriŋo olaro-ni. En bibedo
kunnu matwal, nio ka ajwaka madit ma giwiro ki moo maleŋ i kare-nu otyeko to
woko.
26Ento ka i kare mo lanek dano ocito okato woko i ŋe waŋ apokki me gaŋ me laro
kome ka ma yam oriŋo iye-ni,
27ci lacul kwor remo pa lato onoŋo kome owec, kun tye woko i ŋe waŋ apokki me
gaŋ me laro kome, ce lacul kwor remo pa lato oneko lanek-ki, pe gibikwano alii
me remo i wiye.
28Pien dano meno myero obed i gaŋ me laro kom nio i kare ma ajwaka madit bito
iye; ento i ŋe to pa ajwaka madit lanek dano twero dok cen i pacone.
29Meno ducu bibedo cik botwu wa i kare pa likwayowu ducu, i kabedo ducu ma
wubibedo iye.
Cik ma mako lucaden ki lim me kok
30 “Ka ce dano mo oneko dano, ci gibineko lanek woko pi lok pa lucaden; ento pe
gibineko dano mo pi lok ma lacaden acel keken otito.
31Dok pe wubigamo lim me koko kwo pa lanek dano mo ma balle romo to;
gibineke aneka.
32Dok pe wugam lim me kok mo pi dano ma oriŋo olaro gaŋ me laro lunek dano,
wek giyene odwog obed i lobone ma noŋo ajwaka madit peya oto.
33Pe wubinyobo lobo ma wubibedo iye-ni; pien remo nyobo lobo woko, dok pe
tye gin mo ma twero kwanyo bal ki i lobo pi remo ma oo iye-ni, kono remo pa
lanek dano meno kek en aye kwanyo.
34Pe wubimiyo lobo ma wubedo iye, ma an bene abedo iye i dyewuni, odok keni;
pien an a Rwot ma abedo i kin jo Icrael.”
Acoli Baibul
© 1985, Bible Society of Uganda.
Wel 36
1Ludito kaka pa kwarogi ma i doggola pa Gilead wod pa Makir ma wod pa
Manace ma i doggola pa Yucepu gubino cok, ci guloko i nyim Moses ki ludito kaka
mukene.
2Guwaco ni, “Laditwa, Rwot yam ociki ni imi lobo me aleya bot jo Icrael kun
gibolo kwir; ci yam ociki ni imi ginaleya pa ominwa Lyel Jelopekad bot anyirane.
3Ento ka ce awobe ma i kaka mukene gunyomogi ki i kin jo Icrael ata, ci miyo
lobogi gi bi kwanyo woko ki i kom ginaleya pa kwarogi, gimedo i kom lobo pa
kaka ma anyirane doŋ tye iyeni; meno miyo gibijwiko lobowa woko ma yam
gipoko botwa ki kwir.
4Dok ka kare me jubili pa jo Icrael oromo, ci lobogi gibimedo i kom lobo pa kaka
ma anyira gitye iye-ni matwal, ci miyo lobowa me aleya bijwik woko.”
5Moses ociko jo Icrael kit man, kun cikke oa ki bot Rwot, ni, “Lok me kaka pa
likwayo pa Yucepu tye atir.
6Doŋ man aye cik ma Rwot omiyo ma okemo kom anyira pa Lyel Jelopekad, ni,
‘Wek gin gunyomme ki dano ma gitamo ni ber, tekke ka ginyomogi i doggola mo
ma i kaka pa kwarogi.
7Lobo ma gimiyo bot jo Icrael me aleyagi pe gibilokone nia i kaka man dok i kaka
mukene; pien dano acel acel ma i kin jo Icrael bimoko matwal i kom ginaleya ma i
kaka pa kwarogi.
8Dok ka nyako mo oleyo dul lobo mo ma i kaka mo ma i kin jo Icrael, ci en
binyomme ki dano mo ma i doggola mo ma i kaka pa kwarogi, wek dano acel acel
ma i kin jo Icrael obed ki lobone ma oleyo ki bot kwarone.
9Kumeno, pe gibiloko ginaleya mo nia ki i kaka mo-ni dok i kaka mukene, ento
kaka acel acel pa jo Icrael bimoko gire i lobo me ginaleyane kikome.’ ”
10Anyira pa Jelopekad gutimo kit ma Moses ocikogi kwede.
11Makala, Tiŋa, Kogla, Mirika ki Noa, ma gin aye anyira pa Jelopekad, gunyomme
ki awobe pa omegi wongi.
12Ginyomogi i doggola pa jo pa Manace wod pa Yucepu, omiyo lobo me aleyagi
obedo i kaka me doggola pa wongi, pe gikobo woko.
13Meno ducu aye gin lok ma Rwot ociko ki ma oŋolo ki i dog Moses bot jo Icrael i
lobo aroo me Moab i ŋet kutu Jordan ma okemo Jeriko.`;

// Format the text and save to file
const formattedText = formatBibleText(sampleText);
fs.writeFileSync('wel.txt', formattedText, 'utf8');

console.log('Formatted text has been saved to formatted_bible.txt');