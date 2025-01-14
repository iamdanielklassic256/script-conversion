const fs = require('fs');

function formatBibleText(text) {
    /**
     * Convert Bible text into a numbered verse format.
     * Only treats lines starting with numbers as new verses.
     * No spacing between chapters.
     */
    
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
const sampleText = `Acakki 12
1 Rwot owaco bot Abram ni, “A woko ki i lobo tuwu, ki i kakawu, ki i paco pa
woru, ci icit i lobo ma abinyutti.
2Abimiyi idoko rok madit, abimiyi gum bene, abimiyo nyiŋi bedo dit, pien ibibedo
lakelgum.
3Abimiyo gum i kom jo ma leggi gum, abiceno ŋat mo ma biceni; dok piri en aye
kaka ducu ma wi lobo bilimo iye gumgi.”
4Kit meno Abram ocako wot, macalo Rwot ocike; ki Lot bene owoto kacel kwede.
Abram onoŋo doŋ tye ki mwaka me ditte pyerabiro wiye abic i kare ma en a kwede ki i Karan.
5Abram ocito ki dakone Carai, ki Lot latin pa ominne, ki lwak limgi ducu ma
gucoko kacel, ki lwak jo ducu ma gucokke botgi ki i Karan; gutiŋo wot me cito i
lobo Kanaan. Ka doŋ gutyeko o i lobo Kanaan,
6Abram obaro dye lobo obino i kabedo ma i Cekem, nio wa i te yat kworo me
More. I kare meno onoŋo jo Kanaan aye gitye i lobo meno.
7 Ci Rwot dok onen bot Abram kun wacce ni, “Abimiyo lobo man bot likwayi.”
Ocano keno tyer kunnu pi Rwot ma onen bote-ni.
8Ka dok odak woko ki kunnu, okobo i te got ma tye yo tuŋ wokceŋ me Betel,
oguro iye kemane, kun weko Betel yo tuŋ potoceŋ, ki Ai yo tuŋ wokceŋ; dok
ocano keno tyer pi Rwot kunnu, ci olwoŋo iye nyiŋ Rwot.
9Abram dok okobo, omedde ki wotte yo tuŋ Negeb .
Abram i lobo Ejipt
10Kec onoŋo opoto i lobo, omiyo Abram owoto piny i Ejipt, wek koŋ ebed kunnu,
pien kec onoŋo doŋ lyet twatwal i lobo.
11I kare ma cok donyo i Ejipt, owaco bot dakone Carai ni, “Aŋeyo ni in i dako ma
nen mwonya;
12ka Luejipt gibineni, ci gibiwacci, ‘Man dakone’; ci gibineka woko, ento gibiweki
makwo.
13 Wac ni, in lamera, ci gibibedo kweda maber piri, miyo abikwo piri.”
14Ka Abram otyeko donyo i Ejipt, ci Luejipt guneno dako meno mwonya matek
twatwal.
15Ka ludito ma i kal pa Parao guneno, ci guboro pire bote, gutero dako wa i ot pa
Parao.
16Ci omiyo Parao obedo maber ki Abram pi Carai: gikolle lim, romi, ki twoni;
twoni kana, lwak opii ki aŋeca-gu, megi kana-gu, ki lwak kinaga-gu.
17Ento Rwot ocwalo cog two gemo mogo madoŋo i kom Parao ki jo ma i ode, pi
Carai dako pa Abram.
18Omiyo Parao olwoŋo Abram bote, ci openye ni, “Itima kuman piŋo? Piŋo nene
pe ititta atir ni en dakoni?
19Piŋo dok iwaco ni, ‘En lamera,’ omiya akwanyo, odoko dakona? Nen doŋ,
dakoni ennu. Kwany icit kwede giri.”
20Parao ociko jone pire, ci gulwoke iyo, kacel ki dakone, ki lwak jami ducu ma
yam tye bote.

Acakki 13
1Kit meno Abram odwogo woko ki i Ejipt, en ki dakone, ki lwak jami ducu ma
yam tye bote, kacel ki Lot, ci gutiro i Negeb.
2I kare meno onoŋo Abram odoko lalonyo dyaŋ mada, ki lim me ryal, ki jabu-gu.
3Okobo, omedde ki wotte nia ki i Negeb, odak wa Betel, ka ma yam koŋ okwono
guro iye kemane, ma tye i kin Betel ki Ai,
4i kabedo ma yam okwoŋo caŋo iye keno tyer; ki kunnu aye dok Abram olwoŋo
iye nyiŋ Rwot.
5Ki Lot ma yam onywako wot ki Abram, ceŋ tye ki romi ki dyaŋi-gu ki kema bene.
6Lobo onoŋo doŋ pe romo ka kwat pi gin aryo ducu; pien onoŋo gin ducu ciŋgi ki
lim madwoŋ, ma pe romogi bedo kacel.
7Onoŋo mone doŋ tye i kin lukwa lim pa Abram ki lukwa lim pa Lot. I kare meno
onoŋo jo Kanaan ki jo Periji aye gibedo i lobo meno.
8Abram ocako waco ki Lot ni, “Pe wawek mone obed i kin in ki an, ki i kin lukwa
limmi ki lukwa limma, pien wan ot acel.
9Lobo man ducu pe ineno i nyimi ene? Ber ipokke giri woko keni ki i koma. Ka
ibidok tuŋ acam, ci an abidok gira tuŋ acuc: ce ka in idok tun acuc, ci an abidok
gira tuŋ acam.”
10 Ci Lot ocako tiŋo waŋe malo, ka oneno nota Jordan ducu ma iye ki pii macalo
poto pa Rwot, rom ki lobo Ejipt mudok yo tuŋ Joar; man yam otimme i kare ma
Rwot peya ojwero Codom ki Gomora.
11Pienno Lot oyero gire pire kene lobo ducu ma yam tye i nota Jordan, ci Lot
ocako dak yo tuŋ wokceŋ: kit meno gupokke woko kekengi.
12Abram obedo mere i lobo Kanaan, kun Lot kono bedo mere i kin gaŋi ma gitye i
nota, ocako dak ki kemane nio wa Codom.
13Jo ma i Codom onoŋo jo maraco, balgi dwoŋ twatwal i nyim Rwot.
14Rwot oloko ki Abram ma doŋ onoŋo gutyeko pokke woko ki Lot ni, “Tiŋ waŋi
malo, nen piny nia ki i kabedo ma it ye iye-ni, nen tuŋ acam ki tuŋ acuc, ki tuŋ
wokceŋ ki tuŋ potoceŋ;
15 pien lobo meno ducu ma ineno-ni abimiyone boti ki bot likwayi matwal.
16Abimiyo likwayi bedo pol ma rom ki apwa me ŋom; mumiyo ka ŋatti mo twero
kwano wel apwa me ŋom, ci likwayi welgi bikwanne.
17Doŋ ia malo, iwot i dye lobo-ni, wek inen borre ki lacce, pien abimiyo boti.”
18Kit meno Abram okobo kemane, odak, obedo i te kworo me Mamre, ma tye i
Kebron; dok ocano keno tyer pi Rwot kunnu.

Acakki 14
1I kare pa Amrapel kabaka me Cinar, ki Ariok kabaka me Ellacar, ki Kedor-laomer
kabaka me Elam, ki Tidal kabaka me Goyim,
2luker meno guribbe ka lweny i kom Bera kabaka me Codom, ki Birca kabaka me
Gomora, ki Cinab kabaka me Adma, ki Cemeber kabaka me Jeboim, ki kabaka me
Bela, en aye Joar.
3Mony man ducu guribbe ka lweny i nota me Ciddim, en aye nam me Kado.
4Gubedo i te loc pa Kedor-laomer pi mwaka apar wiye aryo, ento gujemo woko i
mwaka me apar wiye adekke.
5I mwaka me apar wiye aŋwenne, Kedor-laomer ki luker ma yam gitye kwede
gubino dok guero lweny, ci guloyo jo Repaim i Aciterot-Kamaim, ki jo Jujim i
Kam, ki jo Emim i Cave-Kiriataim,
6ki jo Kori i lobo godi megi me Ceir, nio wa i El-paran i waŋ apokki lobo ma tuŋ
tim;
7ka dok gudwogo cen, gucito wa i En-micipat, en aye Kadec, guloyo lobo ducu pa
jo Amalek, ki jo Amor bene ma gibedo i Kajajon-tamar.
8Ka dok kabaka me Codom, kabaka me Gomora, kabaka me Adma, kabaka me
Jeboim, ki kabaka me Bela, ma co, aye Joar, gucito guero lweny i nota me Ciddim,
9i kom Kedor-laomer kabaka me Elam, ki Tidal kabaka me Goyim, ki Amrapel
kabaka me Cinar, ki Ariok kabaka me Ellacar, luker aŋwen guribbe ka lweny i
kom luker abic.
10Nota me Ciddim onoŋo tye iye bur odok macol; ka luker me Codom ki me
Gomora guriŋo woko, jo mukene gupoto i bur meno, ki jo mukene mudoŋŋe
guriŋo, gularo i got.
11Ci merok guyako jami pa jo Codom ki Gomora ducu, ki camgi ducu, gumol,
gucito kwede,
12guyako bene Lot latin pa omin Abram, ma onoŋo obedo i Codom, ki jamine
ducu, guwoto kwede woko.
13Ci dano acel mo ma obwot oriŋo, obino otito ki Abram ma Laibru, ma onoŋo
bedo i te kworo pa Mamre, ma en Laamor, omin Ecikol ki Aner; gin yam gucikke
pi ribbe ki Abram.
14Ka Abram owinyo ni watgi mony oyako woko, ci oywayo monnye, ka otelo wi jo
mupwonyo lweny ma ginywalogi i pacone, jo ma giromo miya adek ki apar wiye
aboro, ci olubo korgi nio wa i Dan.
15En opoko i monnye i dyewor; gucako poto i komgi, en ki luticce, ci guryemogi
nio wa i Koba, i tuŋ acam me Damaciko.
16Ka oyako jami ducu, odwogo kwede, kacel ki watgi Lot, jamine ducu ki mongi ki
lwakgi ducu.
Melkijedek olamo gum i kom Abram
17Ka doŋ odwogo ki ka ma en oloyo iye Kedor-laomer ki Luker ma gitye kwedeni, ci kabaka me Codom ocito ka ŋolo wiye i waŋa yo wa i nota me Cave, ma en
aye Nota pa Kabaka.
18 Melkijedek kabaka me Calem okelo iye mugati ki koŋo vino; en aye onoŋo
ajwaka pa Lubaŋa Mamalo Twal.
19Olamo gum i kome kun waco ni, “Lubaŋa Mamalo Twal ma laket polo ki lobo
omi gum i kom Abram;
20gipwo Lubaŋa Mamalo Twal ma omiyo lumerokki i ciŋi!” Ci Abram omiye dul
acel me apar me jami ducu ma en oyako.
21Kabaka me Codom dok owaco ki Abram ni, “Miya mera dano aye ater, ento in
iter giri jami ducu obed meri.”
22Ento Abram odok iye bot kabaka me Codom ni, “Doŋ atyeko kwoŋo kwoŋ woko
bot Rwot Lubaŋa Mamalo Twal, ma laket polo ki lobo-ni,
23ni, pe abigamo gin mo ki boti kadi latin uci, nyo del war mo, nyo gin mo i kin
jami ma meri-ni, wek pe ibed ka wacci, ‘Amiyo Abram olony.’
24Pe dok abigamo gin mo, doŋ agik ki gin ma awobe gucamo-ni, ki dul lim ma
apoko ki jo ma gucito kweda-ni; wek doŋ Aner, ki Ecikol Mamre guter jamigi
gigi.”

Acakki 16
1Carai dako pa Abram pe omedo ki nywalle latin mo, dok en onoŋo tye ki aŋecane
ma anyira Ejipt ma nyiŋe Agar.
2Carai owaco ki Abram ni, “Nen, macalo Rwot ogeŋa nywalo latin mo-ni, cit idony
i wi aŋecana, wek gwok nyo abinoŋo iye latin mo ma en binywalo.” Ci Abram
owinyo dog Carai.
3Kit meno, i kare ma Abram otyeko bedo i lobo Kanaan mwaka apar, Carai dako
pa Abram otero Agar anyira Ejipt ma aŋecane, omiye bot cware Abram wek obed
dakone.
4Ocako bedo ki Agar, ci Agar ogamo ic. Ka Agar oneno ni doŋ egamo ic, ocako
gayo Carai ki waŋ me cac.
5Carai owaco ki Abram ni, “Kipwola mupoto i koma odok meri! Amiyo aŋecana i
kori; ka en oneno ni doŋ egamo ic, ci ocako gayo an ki waŋ me cac. Myero Rwot
doŋ oŋol kop mapol i kin in ki an!”
6Ento Abram ogamo dog Carai ni, “Nen, aŋecani tye Dok i tweroni giri, in itim giri
kit ma imito i kome.” Omiyo Carai ocako timme aromaroma, nio ka olwi, oriŋo
woko ki bote.
7Lamalaika pa Rwot onoŋe i waŋ it mo ma i dye tim; it meno tye i yo ma cito Cur.
8Obino openye ni, “Agar, aŋeca pa Carai, in mono ia ki kwene kaa, dok icito wa
kwene kaa?” En ogamo ni, “An alwi ariŋo Carai, min ot ma abedo i ode.”
9Lamalaika ogamo ni, “Dok cen bot min ot meno, ci iwore.”
10Lamalaika pa Rwot dok omedo lok ni, “An abimiyo likwayi nya mapol twatwal,
ma ŋatti mo pe romo kwano welgi pi polgi.”
11Dok lamalaika pa Rwot omedde ka wacce ni, “Nen, igamo ic, ibinywalo latin
laco, dok ibicako nyiŋe Icmael; pien Rwot obedo ka neno aromani.
12En bibedo dano ma cal ki kana me tim, en bitugge i kom dano ducu, ki dano
ducu bene bitugge i kome; en bibedo i kabedone pat kun pyem ki utmegine
ducu.”
13Ci Agar ocako nyiŋ Rwot ma oloko kwede ni, “In Lubaŋa ma neno.” Onoŋo en
owacci, “An atyeko neno Lubaŋa ada, aneno en ci pud atye makwo gira?”
14Mumiyo nyiŋ waŋ it meno gicako ni, Beer-lakai-roi; ma tye i kin Kadec ki Bered.
15 Agar onywalo ki Abram latin laco; Abram ocako nyiŋ latinne ma Agar onywalo
ni Icmael.
16Abram onoŋo tye ki mwaka me ditte pyeraboro wiye abicel i kare ma Agar
onywalo Icmael.

Acakki 17
1Ka Abram onoŋo tye ki mwaka me ditte pyeraboŋwen wiye aboŋwen ci Rwot
onen bot Abram kun wacce ni, “An Lubaŋa Matwero-ducu, bed i nyima laboŋo bal
mo,
2ci abiketo gicikkena i kin an ki in, dok abimiyi inya mapol twatwal.”
3Abram oryebbe piny i nyime; Lubaŋa owacce ni,
4“Nen, gicikkena amini eno, in ibibedo kwaro rok mapol.
5 Nia tin nyiŋi pe dok bibedo Abram , ento nyiŋi bibedo Abraim , pien aketo in
wek ibed kwaro rok mapol.
6Abimiyi inya twatwal; abimiyi idoko rok mapol, ki luker bene gibia ki i komi.
7 Dok abimoko gicikkena i kin an ki in ki likwayi ma bilubi, ki i yalwakgi ducu, me
bedo gicikke ma bedo matwal, wek abed Lubaŋani, ki Lubaŋa pa likwayi ma
bilubi bene.
8Dok abimiyo boti ki bot likwayi ma bilubi lobo ma ibedo iye-ni macalo welo, en
aye lobo ducu me Kanaan, wek obed mewu matwal; dok an aye abibedo
Lubaŋagi.”
9Ka Lubaŋa dok owaco bot Abraim ni, “Ki tuŋ boti, in ibigwoko gicikkena, in ki
likwayi ducu ma bilubi, ki yalwakgi ducu.
10 Man aye gicikkena, ma wubi gwoko, i kin an ki in ki likwayi ma bilubi: Gibiliro
litino awobe ducu ma i kinwu.
11Wubiliro del kom nyimwu me co woko, wek obed gin ma nyuto gicikkena i kin
an ki wun.
12Latin laco ma romo nino aboro gibiliro del kom nyime; co ducu gibilirogi i
yalwak ki yalwakgi ducu, nia i kom litino ma ginywalogi i pacowu, nio kom litino
ma wuwilo awila ki limwu ki bot lurok bene, ma pe wunywalogi anywala.
13Gin ducu ma ginywalogi i pacowu, ki ma giwilogi awila ki limwu, ducu
gibilirogi, wek gicikkena obed i del kom nyimwu, wek obed gicikke ma bedo
matwal.
14Ka laco mo onen ma pe giliro del kom nyime me co, waŋe birwenyo woko ki i
kin lutugi, pien oturo gicikkena.”
15Ka Lubaŋa dok owaco ki Abraim ni, “Lok ma dok tuŋ bot Carai, dakoni, pe dok
gibilwoŋo nyiŋe ni Carai, ento nyiŋe doŋ bibedo Cara .
16Abimiye gum, dok makato ducu abimiyo en nywalli latin laco; abimiye gum, en
bibedo min rok mapol, ki luker pa rok mapol gibia ki i kome.”
17Ci Abraim opoto piny aryeba ic ki nyero, kun tamo gire kekene ni, “Dano ma
ditte doŋ romo mwaka miya kulu aye dok binywalo latin? Ki Cara bene ma ditte
doŋ romo mwaka pyeraboŋwen ku lu dok binywalo latin?”
18Abraim ocako waco bot Lubaŋa ni, “Myero Icmael aye doŋ obed makwo i
nyimi!”
19Lubaŋa owacce ni, “Pe gire, ento dakoni Cara aye binywalli latin laco, dok
ibicako nyiŋe Icaka, dok abimoko gicikkena kwede wek obed gicikke ma bedo
matwal bot Likwaye ducu ma bilube.
20Ki ma dok tuŋ bot Icmael bene, atyeko winyo in, ci nen, abimiye gum, abimiyo
en binywal dok nya mapol twatwal; en bibedo kwaro luker apar wiye aryo,
abimiye bedo rok madit.
21Ento abimoko gicikkena ki Icaka, latin ma Cara aye binywalli i kare macalo man
i mwaka ma bino.”
22Ka Lubaŋa doŋ otyeko lok ki Abraim, ci oa woko ki bote, odok malo.
23Abraim otero Icmael ki lwak opii ducu ma ginywalogi i ode, nyo ma giwilogi ki
lim, co ducu ma gitye i kin litino ma i ot pa Abraim, ci oliro del kom nyimgi me co
woko i nino meno kikome, kit macalo Lubaŋa ocike kwede.
24Ka Abraim onoŋo tye ki mwaka me ditte pyeraboŋwen wiye aboŋwen en aye
gicako Liro iye del kom nyime.
25Ki wode Icmael onoŋo doŋ tye ki mwaka me ditte apar wiye adek ka gicako Liro
del kom nyime.
26I nino meno kikome en aye Abraim ki wode Icmael giliro iye del kom nyimgi,
27kacel ki jo ducu ma gitye i ode, litino ma ginywalo i ode, ki jo ma giwilogi ki lim
ki bot lurok; gin bene gilirogi kacel kwede.

Acakki 18
1Rwot dok onen bot Abraim i te kworo ma tye i Mamre, ma onoŋo obedo i dog
kemane i kare ma piny Lyet.
2 Otiŋo waŋe malo, ci oneno jo adek gucuŋ i nyime. Ka onenogi, oriŋo nia ki i dog
kema, ocito ka ŋolo wigi, ci oryebbe piny i ŋom,
3kun wacci, “Laditta, ka gum okaya i nyimi, pe ikat an laticci akata.
4Wek koŋ gikel pii mo matitidi, wek wulwok ki tyenwu, ka doŋ wuywe i te yat-ti,
5dok acito ka omo kwon mo manok wek wubwol ki dogwu, ka doŋ wucak kato
giwu, macalo doŋ wubino bota-ni.” Ci gin gugamo ni, “Citim kit ma iwaco-ni.”
6Abraim orune ocito bot Cara i kema, owacce ni, “Job moko mapwotte ma romo
adita adek, inywan, ited capat matitino.”
7Abraim oriŋo i idwol, okwanyo wod twon ma riŋone pud yom mamit, omiyo bot
awobine, ci oyubo oyotoyot.
8Ka okelo cak lukulu ki cak malibo, ki dek riŋo ma gitedo, oketo i nyimgi; en ocuŋ
i ŋetgi ka konyogi, i te yat, kun gicamo.
9Gupenye ni, “Dakoni Cara kono tye kwene?” En ogamo ni, “En tye i kema.”
10 Owacci, “Abidwogo boti i kare me cwir, ma noŋo dakoni Cara doŋ tye ki wode.”
Cara onoŋo tye ki i ŋeye i dog kema, winyo lokgi.
11I kare meno onoŋo Abraim ki Cara mwaka me ditogi doŋ dwoŋ: dok Cara onoŋo
doŋ pe neno dwe macalo mon wadigi.
12 Mumiyo Cara onyerre kekene, kun wacci, “Ma doŋ ati, aloc woko, ki cwara
bene doŋ oti, oloc woko, dok wabinoŋo yomcwiny odye?”
13Rwot owaco bot Abraim ni, “Cara onyero mono piŋo, ma wacci, ‘An mono dok
abinywalo latin, ma kombeddi doŋ ati woko-ni?’
14 Tye gin mo matek ma loyo Rwot? Ka kare oromo ci abidwogo dok kany, i dye
cwir, anoŋo Cara doŋ tye ki wode.”
15Ento Cara okwero woko kun waco ni, “An pe anyero gira.” Ogamo doge ni, “Pe,
ento me nyero aye inyero.”
Abraim olego pi Codom
16Ka jo meno gucako a woko ki kunnu, ci guneno yo tuŋ Codom; ci Abraim
olwokogi iyo.
17Rwot owacci, “Myero akan gin ma acito ka tiyone woko bot Abraim kulu,
18macalo Abraim obedoko rok madit ki matek, ma rok ducu ma i wi lobo gibilimo
gum ki i kome?
19Pe; an doŋ atyeko yero en, wek ocik litinone ki jo ma i ode ma gibilube gumok
ka lubo korayo pa Rwot ma gitiyo gin ma tye atir kun giŋolo bene kop atir; wek
lacen Rwot omi ki Abraim gin ma yam otyeko cikke kwede-ni.”
20Ka doŋ Rwot owacce ni, “Pien koko i kom Codom ki Gomora doŋ okato kare, ki
balgi doŋ dwoŋ twatwal,
21abicito botgi wek acinen ka ada gitye ka tiyo kit ma koko i komgi owinnye
kwede bota-ni; ka pe, ci abiŋeyo.”
22Kit meno gulokke, gucako wot me kemo i Codom; ento Abraim pud ocuŋ i nyim
Rwot aye.
23Lacen Abraim onyiko bote cok, owacci, “In ada ibityeko jo ma kitgi atir kacel ki
jo maraco?
24Ka gwok nyo jo ma kitgi atir binoŋŋe pyerabic i gaŋ meno, ci ibityeko kabedo
meno woko, pe ibijalo gaŋ meno pi jo pyerabic ma kitgi atir ma gitye iye-ni?
25Pe kumene! In pe myero inek jo ma kitgi atir kacel ki jo maraco, kun imiyo jo
ma kitgi atir bene bedo rom ki jo maraco. Laŋolkop me lobo ducu pe bitimo gin
ma nen, atir, bo?”
26Rwot ogamo ni, “Ka anoŋo i Codom jo ma kitgi atir pyerabic ma tye i gaŋ meno,
abijalo kabedo meno ducu pigi.”
27Abraim ogamo dok ni, “Nen, an doŋ adyerre me lok kwedi, in Rwot, an mera
apwa ki buru mamwa.
28Gwok nyo ka ce birem jo abic me romo jo pyerabic? Ci ibityeko gaŋ meno ducu
woko pi jo abic murem-mi?” Ogamo ni, “An pe abityekone ka ce anoŋo kunnu jo
pyeraŋwen wiye abic.”
29Dok onwoyo aye, owacci, “Ce ka ibinoŋo kunnu jo pyeraŋwen keken kono?”
Ogamo ni, “Pi jo pyeraŋwen-ni pe abitimo iye gin mo.”
30Dok owacci, “Pe kiniga omaki, in Rwot, an abilok doki. Ka ce binoŋŋe kunnu jo
pyeradek kono?” En ogamo ni, “Pe abitimo ce abinoŋo kunnu jo pyeradek.”
31En dok owacci, “Nen, an doŋ adyerre me lok kwedi, in Rwot. Gwok nyo jo
pyeraryo binoŋŋe kunnu kono?” Ogamo ni, “Pi jo pyeraryo-nu pe abityeko gaŋ.”
32Dok onwoyo aye ni, “Pe kiniga omaki, in Rwot, an abilok doki tyen acel keken.
Gwok ka ibinoŋo kunnu jo apar keken kono?” Ogamo ni; “Pi jo apar-ri pe abitye
kone.”
33Ci doŋ Rwot ocako cito, ka doŋ otyeko lok ki Abraim; ci Abraim odok gire i
kabedone.

Acakki 19
1Lumalaika aryo gubino i Codom otyeno; gunoŋo Lot obedo piny i dog gaŋ me
Codom. Ka Lot onenogi, ci oa malo, ocito ka jologi, oryebbe, okulo waŋe piny i
ŋom,
2kun wacci, “Luditona, alegowu, wulokke, wudwog kany, wudony i oda an
laticwu, wubed iye nino acel, wulwok iye tyenwu, ci doŋ wubia giwu odiko con,
wucito i yo wotwu.” Gugamo ni, “Pe; piny biru ki wan i dye gaŋ, kany.”
3En odiyogi ki tek mada, ci gulokke, gudonyo i ode; otedogi karama, omyenogi
kwon ma pe girubo iye tobi, ka gucamo.
4Ento ma pud peya gubuto piny, lwak co ma i gaŋ, jo me Codom, awobe wa ki
ludito bene, guteŋŋe woko ducu, gubino, gurumo ot woko.
5Gulwoŋo Lot, gupenye ni, “Jo ma gubino boti otyeno-ni gitye kwene? Kelgi woko
botwa kany, wekwaŋene kwedgi.”
6Lot okato, ocito botgi i doggola, ci oloro doggola woko cut ki i ŋeye,
7kun waco ni, “Alegowu, utmega, pe wutim tim aranyi.
8Wunen, an atye kany ki anyirana aryo ma pud peya guŋene ki co. Wek gin aye
akelgi botwu, wutimgi giwu kit ma wumito; ento pe wutim gin mo i kom jo man,
pien doŋ gudonyo i oda.”
9Ento guwacci, “Nyik cen!” Ka doŋ guwacci “Nye man obino kany macalo labedo,
dok mito doko laŋolkop ce? Wan koni doŋ watimi marac makato gin.” Ka gucako
dille matek i kom Lot, kun ginyiko pi turo kika.
10Ento lumalaika meno gurwako ciŋgi, ci guywayo Lot gukelo i ot botgi, ci guloro
doggola woko.
11 Gucoro waŋ dano ma gudille ka i doggola-ni, ludito ki awobe bene, wangi ocor
woko, gubedo ka paŋŋe ka yenyo doggola, ci guol woko ata.
12Jo meno gucako waco ki Lot ni, “In dok it ye ki jo mukene ma watwu kany bene?
Macalo cog anyirani, ki litino awobe ki anyiragi, nyo ki ŋatti mo ma tye i gaŋ
kany. Wua kwedgi woko ki i kabedo man;
13pien wayubbe me tyeko gaŋ man woko. Koko ma i kom jo ma gitye iye odoko
dit i nyim Rwot, Rwot ocwalowa ni doŋ wabin, watyek woko.”
14Mumiyo Lot okato ocito, olwoŋo cog anyirane, ma onoŋo nene gimito nyomo
anyirane-ni, kun wacci, “Wua woko ki i kabedo man, pien Rwot obetyeko gaŋ
man woko.” Ento ki bot cog anyirane nen calo lok oree.
15Ka piny doŋ oru, Lumalaika guruyo Lot, kun giwacci, “A woko, icit ki dakoni ki
anyirani aryo ma gitye kanynyi, wek pe ginekgi i can ma gibemiyo i kom gaŋ
man.”
16 Ento en obedo ka galle, mumiyo jo meno gumako ciŋgi, gupeyogi woko, en ki
dakone ki anyirane aryo; Rwot obedo ki kica i komgi, gikelogi wa i ŋe gaŋ woko.
17Ka doŋ gukelogi woko, ci gucikogi ni, “Wuriŋ wular kwowu; pe wulokke wunen
ŋewu, pe wugik i yo ka mo i nota, wuriŋ wular godi, wek pe wuto.”
18Lot owaco ki gin ni, “Aa, luditona;
19nen, an doŋ gum okaya ki botwu, dok wunyuto i koma kica madwoŋ pi Laro
kwona; ento pe atwero riŋo nio wa i godi, miyo gin marac dok poto i koma, ci
neka woko.
20Nen, gaŋ macokke loka ca, ma aromo riŋo alaro iye, dok gaŋŋe tidi mo. Wek
ariŋ alar kunnu; pe gaŋŋe nen tidi twatwal? Wek alar kwona do!”
21Owacce ni, “Nen, gum meno dok amiyi bene aye; pe doŋ abibalo gaŋ ma iloko
pire-ni.
22Doŋ irune oyoto, ilar kunnu; peya atwero timo gin mo nio ka io wa kunnu.”
Mumiyo nyiŋ gaŋ meno gucako ni Joar.
23Ceŋ otuc ma onoŋo Lot donyo i Joar.
24 Ci Rwot ocwalo gweŋ calfa ma mac oliyo woko, ocwer piny nia ki i polo, ocorre
i kom Codom ki Gomora,
25obalo gaŋ meno woko, ki notane ducu, ki lwak jo ducu ma gibedo i gaŋi meno,
ki gin ducu ma gidoŋo i ŋom.
26 Ento dako pa Lot mudoŋ cen aŋec-ci, olokke oneno ŋeye, ci olokke odoko wir
kado cut.
27Abraim oa odiko con, ci ocito i kabedo ma yam koŋ ocuŋ iye i nyim Rwot-ti.
28Ci obolo waŋe oneno yo tuŋ Codom ki Gomora, ki tuŋ lobo ducu ma i nota-nu, ci
oneno yito ma duny i lobo-nu, macalo ruk mac mukur.
29Kit meno Rwot otyeko gaŋi ducu ma i nota i nino meno, ka Lubaŋa opo pi
Abraim, omiyo okwanyo Lot woko, wek can pe opot i kome, i kare ma obalo gaŋ
ma yam Lot obedo iye woko.
Kwaro pa jo Moab ki jo Ammon
30Lot oa woko ki i Joar, ocito obedo i godi, kacel ki anyirane aryo-nu, pien onoŋo
lworo bedo i Joar; odonyo obedo i boro, kacel ki anyirane aryo-nu.
31Nyare me kayone ocako waco bot laminne matidi ni, “Wonwa doŋ oteggi, pe tye
laco mo i wi lobo ma bibino botwa ka bedo kwedwa i kit pa dano ma wi lobo-ni.
32Bin, wek wami wonwa koŋo vino, omati, ci wabibuto kwede, wek wanoŋ nyodo,
wonwa aye onywal kwedwa.”
33Ka gumiyo wongi omato koŋo vino i dyewor meno cut, latin kayone ocito,
obuto ki wonne, ma kun pe ŋeyo ka nyare obuto kwede, ki kare ma nyare oa
kwede malo.
34Orwone latin kayone dok owaco bot matidine ni, “Nen, tin dyewor doŋ atyeko
buto ki wora; wek dok wamiye omat koŋo vino tin dyewor, wek in dok icit ibut
kwede, wek wanoŋ nyodo, wonwa aye onywal kwedwa.”
35Dok gumiyo wongi koŋo vino omato i dyewor meno bene; nyare matidi-ni dok
oa, ocito obuto kwede; en pe oŋeyo ka nyare obuto kwede, ki kare ma nyare oa
kwede malo.
36Kit meno anyira pa Lot aryonu ducu gunywal ki wongi.
37Kayone onywalo latin laco, ocako nyiŋe Moab; en aye odoko kwaro jo Moab nio
wa kombeddi.
38Nyare matidine bene dok onywalo latin laco, ci ocako nyiŋe Ben-ammi; en aye
odoko kwaro jo Ammon wa kombeddi.

Acakki 20
1Abraim ocako wot me cito i lobo me Negeb ma tye i kin Kadec ki Cur, obedo i
Gerar, ka ma otiro iye macalo labedo.
2 Abraim ocako lok i kom dakone Cara ni, “En lamera.” Ci Abimelek kabaka me
Gerar ocwalo jone guomo Cara.
3Ento Lubaŋa obino bote i waŋ lek dyewor, lok kom Cara, dako pa Abraim kun
wacce ni, “Nen, in i dano ma lato, pien dako ma in iomo-ni dako ma cware tye.”
4Abimelek onoŋo peya obedo kwede; ci en ogamo ni, “Rwot, in mono ibineko rok
mo ma pe obalo?
5Pe en aye gire otitta kun wacca ni, ‘Dako-ni lamera?’ Dako kikome bene owaco
ni, ‘En omera.’ Atimo man ma cwinya leŋ, ki ciŋa bene pe obalo gin mo.”
6Lubaŋa dok owacce i waŋ lek ni, “Iyo, aŋeyo ni itimo kumeno ma cwinyi leŋ, ci
onoŋo an aye abedo ka geni, oweko pe itimo bal mo i nyima; mumiyo pe aye in
igudo kome.
7Doŋ idwok dako-ni bot cware gire; pien en lanebi, en bilego piri, ci ibikwo. Ento
ka ikwero dwoko dako-nu bot cware, ber iŋe ni ibito woko ada, in ki jo ma i
paconi ducu.”
8Abimelek oa malo odiko con, olwoŋo luticce ducu, otito botgi lok meno ducu, ci
gubedo ki lworo madwoŋ.
9Ka Abimelek olwoŋo Abraim bote, owacce ni, “Itimowa kuman piŋo? Aballi gin
aŋo, mumiyo in ikelo bal madit i koma ki i kom kerra? In itimo gin ma pe myero
atiya i kom dano.”
10Ka dok Abimelek owaco bot Abraim ni, “Onoŋo mono itamo niŋo, mumiyo itimo
kit man?”
11Abraim ogamo ni, “Lok mumiyo atiyo, pien onoŋo atamo ni, Lubaŋa pe gilworo
i kabedo man, gibineka woko pi dakona.
12Ada mere lamera kikome, nya pa wora, ento pe latin pa maa kikome, ci odoko
dakona.
13I kare ma Lubaŋa okwanya okwanya woko ki i paco pa wora, ma abedo ka
wirre, acako wacce ni, ‘Pi kicani myero itima kit man: i kabedo ducu ma wabio
iye, ibinyuta ni, Man omera.’ ”
14Ci Abimelek okelo romi ki twoni ki lwak opii ki lwak aŋeca, omiyogi bot
Abraim, ci odwoko dakone Cara bote.
15Abimelek owacce ni, “Nen, lobona tye i nyimi en; bed ka ma imito.”
16Ki tuŋ bot Cara owacci, “Nen, atyeko miyo bot cwari cekel me ryal ma romo alip
acel, pi waro kop woko ki i komi i waŋ dano ducu ma ibedo kwedgi, wek ibed
laboŋo bal mo i komi.”
17Ka Abraim olego Lubaŋa, ci Lubaŋa ocaŋo Abimelek ki dakone bene, ki lwak
aŋecane, ci gucako nywalo litino;
18pien onoŋo Rwot ogeŋo nyodo woko i ot pa Abimelek pi lok kom Cara, dako pa
Abraim.

Acakki 21
1Rwot dok olimo Cara kit ma con owaco, ci otime kit ma yam ociko kwede.
2 Cara ogamo ic, ci onywalo latin laco ki Abraim, ma kun en doŋ oti woko, i kare
ma yam Lubaŋa otitte pire-ni.
3Abraim ocako nyiŋ latin ma ginywalle, ma Cara aye onywalo-ni, ni Icaka.
4 Abraim oliro wode Icaka ka doŋ otyeko nino aboro me ditte, kit ma yam Lubaŋa
ocike kwede.
5Abraim onoŋo doŋ mwaka me ditte romo miya acel, ka doŋ wode Icaka
ginywalo.
6Cara owacci, “Lubaŋa doŋ omiya anyero; wa ŋat ma biwinyo bene binyera.”
7Ci owacci, “Aŋa ma kono ceŋ owaco ki Abraim ni waŋ mo Cara bidoto latin? Nen
ka doŋ anywalle awobi ma doŋ en oti, oloc woko.”
Giryemo Agar ki Icmael woko
8Latin odoŋo, ci gijuke dot woko; Abraim otedo karama madit i nino ma gijuko
iye Icaka dot-ti.
9Ento ka Cara oneno wod pa Agar ma anyira Ejipt, ma yam onywal ki Abraim, ka
tuko ki latinne Icaka,
10 en owaco bot Abraim ni, “Ryem aŋeca man ki wode, gucit woko, pien wod pa
aneca-ni pe bibedo laleyo kacel ki woda Icaka.”
11Lok meno cwiny Abraim ocwer iye matek, en pi wode.
12 Ento Lubaŋa owaco ki Abraim ni, “Pe cwinyi ocwer pi latin ki pi aŋecani; gin
ducu ma Cara owacci, tim kit ma en otitti, pien litino pa Icaka aye gibilwoŋogi ni
likwayu.
13Dok abimiyo wod pa aŋeca bene doko rok, pien en latinni.”
14Abraim opuk odiko con, okwanyo kwon ki opiro pii, omiyo Agar, olwoke otere i
yo, ci oŋabo jami ki latinne i wi gwoke, ocwale kwede woko. Dako meno ocito
gire, obedo ka lak ata i tim me Beer-ceba.
15Ka pii ma i opiro otum woko, ci opyelo latinne piny i te yat buŋa mo.
16Ka oweko latinne, ocito cen ka ma borre rom ki ka ma ka gibayo atero gik iye;
pien owacci, “Pe myero anen to pa latinna.” En obedo i anyim kuca, ci latin
odaŋŋe ki koko.
17Lubaŋa owinyo koko pa latin, lamalaika pa Rwot ocako lwoŋo Agar ki i polo,
kun wacce ni, “Man lok aŋo Agar? Pe doŋ i lwor, pien Lubaŋa doŋ otyeko winyo
dwan koko pa latin ki ka ma ipyele iye-ni.
18Doŋ ia malo, itiŋ latin, ci ikwake matek, pien abimiyo en doko rok madit.”
19Ka Lubaŋa oyabo waŋe, ocako neno waŋ pii; ci ocito otwomo, opiko i opirone
poŋ, ka omiyo wode omato.
20Lubaŋa obedo ki latin meno; odoŋo, obedo i tim, odoko ladwar matek ki atero.
21Obedo i tim Paran; minne onyomme nya jo Ejipt.
Abraim ki Abimelek gucikke
22 I kare meno Abimelek ki ladit wi monnye Pikol guwaco bot Abraim ni, “Lubaŋa
tye kwedi i gin ducu ma itiyo;
23kombeddi doŋ ikwoŋ kwoŋ kweda i nyiŋ Lubaŋa ni, pe ibiumo waŋa, kadi wa
litinona ki likwaya bene; macalo an bene atimi ber-ri, in bene ibitima ber, ki
lobona ma koni in labedo iye-ni.”
24Abraim ogamo ni, “Abikwoŋo.”
25Abraim ocako kok bot Abimelek pi waŋ pii mo ma onoŋo luticce gucerre woko
kome.
26Abimelek ogamo ni, “An pe amedo ki ŋeyo ŋatti mo mutimo lakit lok-ku; in
bene pe imedo ki titta lokke. Pe amedo ki winyo lokke nio wa tin!”
27Lacen Abraim okwanyo romi ki twoni, omiyogi bot Abimelek, ci gin jo aryo
guketo gicikke i kingi.
28Abraim oyero bwoŋi romi abiro, oketogi pat.
29Abimelek owaco ki Abraim ni, “Bwoŋi romi abiro ma iketo pat-ti kono piŋo?”
30Ogamo ni, “Bwoŋi romi magi abiro ma ibigamogi ki i ciŋa-ni, ibiketogi pi bedo
cadenna ma nyuto ni, an aye yam akwinyo waŋ pii man.”
31Mumiyo kabedo meno gilwoŋo ni Beer-ceba, pien onoŋo gin aryo ducu
gukwoŋŋe iye ki kwoŋ.
32Kit meno guketo gicikke i Beer-ceba. Ka doŋ Abimelek ki Pikol ladit lawi
monnye gua, gudok i lobo pa jo Piliciti.
33Abraim opito yat anaŋa i Beer-ceba, ci olwoŋo iye nyiŋ Rwot, Lubaŋa Mabedo
Nakanaka.
34Abraim ori i lobo pa jo Piliciti kare malac.

Acakki 22
1 I ŋe lok meno ducu, Lubaŋa otemo Abraim kun wacce ni, “Abraim!” En ogamo
ni, “Ana ene.”
2 Owacce ni, “Kwany wodi Icaka, iter, en wodi acel keken, ma imaro-ni, wot
kwede i lobo Moria, wek icit ityere kunnu, obed gitum awaŋa i kom got mo ma
abititti ki kunnu.”
3Kit meno Abraim opuk odiko con, otweyo kom me bedo i wi kanane, okwanyo
awobene aryo, ocito kwedgi, kacel ki wode Icaka; otoŋo yen me waŋo gitum, oa,
okemo i kabedo ma Rwot otitte-ni.
4I ninome adekke, Abraim otiŋo waŋe, ci oneno kabedo meno ka maborbor.
5Ka Abraim owaco bot awobe aryo ma tiyo bote-ni ni, “Wun wubed koŋ kany
kacel ki kana; an ki latin-ni wabicito anyim loka ca ka woro Lubaŋa, ka dok
wabidwogo botwu.”
6Abraim otiŋo yen me lawaŋ gitum, ocibo i wi wode Icaka; en omako mac ki pala i
ciŋe, ka gucako wot kacel.
7Icaka owaco bot wonne Abraim ni, “Wora!” En ogamo ni, “Aŋa ene, woda.” Ci
owacce ni, “Nen ba, watye ki mac ki yen, ento romo me gitum tye kwene?”
8Abraim ogamo, owacce ni, “Lubaŋa aye bimiyo romo me gitumme, latinna.” Kit
meno, gumedde gigi kacel ki wotgi.
9 Ka guo i kabedo ma Lubaŋa yam otitte, ci Abraim ocano keno tyer, ka ocano yen
i wiye, otweyo wode Icaka, ci opyelo i wi keno, obuto i wi yen.
10Abraim otiŋo ciŋe, okwanyo pala me neko wode.
11Lamalaika pa Rwot olwoŋe ki i polo, kun wacce ni, “Abraim! Abraim!” En
ogamo ni, “An atye ene.”
12Owacce ni, “Pe iket ciŋi i kom latin-nu, pe itim gin mo i kome bene; doŋ tin
atyeko niaŋ atir ni ilworo Lubaŋa, pien pe itwona wodi, wodi acel keken, nen
imiya.”
13Abraim otiŋo waŋe malo, ci oneno nyok romo tye i ŋeye ma tuŋe omoko i
agaba; Abraim ocito okelo nyok romo-nu, ci otyero me bedo gitum awaŋa ma ka
wode.
14Abraim ocako nyiŋ kabedo meno ni, Rwot aye bimiyo; macalo giwaco nio wa
onyo ni, “Gibimiyo wa i wi got pa Rwot.”
15Dok lamalaika pa Rwot olwoŋo Abraim nia ki i polo tyen me aryone kun waco
ni,
16 “Rwot owacci, Doŋ akwoŋŋe ki nyiŋa kekena ni, pi tim man, ma pe itwona
wodi, ma kun en wodi acel keken-ni,
17abimiyi gum ada; abimiyo likwayi ginya mapol macalo lwak lakalatwe me polo,
ma rom ki kweyo ma i dog nam Dok likwayi aye gibiloyo gaŋ pa merokgi;
18 rok ducu ma i lobo gibilimo gumgi ki i kom likwayi, pien ityeko woro doga.”
19Lacen Abraim odok cen bot awobene, ka gua kunnu, gudok kacel kwedgi wa i
Beer-ceba; Abraim obedo i Beer-ceba.
Likwayo pa Nakor
20I ŋe lok meno ducu, gitero lok bot Abraim ni, “Nen, Mirika otyeko nywalo litino
ki omeru Nakor:
21latin kayone Uj, ki Buj ominne, Kemuel won Aram,
22Keced, Kajo, Pildac, Jidlap, ki Becweri.”
23Becweri onywalo Labeka. Mirika onywalo Litino aboro ki Nakor omin Abraim.
24Dakone ma aŋeca, ma nyiŋe Reuma, onywalo bene Teba, Gakam, Takac ki
Maaka.

Acakki 23
Cara oto Abraim owilo kabedo me yik
1Cara ori mwaka miya acel ki pyeraryo wiye abiro; meno aye wel mwaka me kwo
pa Cara.
2Cara oto i Kiriat-arba, ma en aye Kebron, ma i lobo Kanaan; Abraim odonyo i ot
okumo, okoko Cara ki pig waŋe.
3Lacen Abraim oa woko ki i nyim lato, ocito owaco bot jo Kit ni,
4 “An a welo, ma doŋ atyeko bedo i kinwu; wumiya dul lobo mo i kinwu ma
bibedo kabedo me yiko dano, wek ayik iye dakona-ni, oa woko ki i waŋa.”
5Jo Kit gugamo dog Abraim ni,
6“Winy, laditwa; in laker madit i kinwa kany. Yik kom latoni i lyel maber ma iyero
i kin lwak lyel mewa-ni: pe tye ŋatti mo ma i kinwa ma bitwonni lyelle, nyo ma
bigeŋi ni pe iyik latoni iye.”
7Abraim oa malo, ci oryebbe i nyim jo Kit, ma wegi lobo-nu,
8kun wacogi ni, “Ka onoŋo wumito ayik latona wek oa woko ki i waŋa, wuwiny
lokka, wulegga Epron ma wod pa Jokar,
9wek oye mina boro ma i Makpela, ma mere-ni, ma tye i wi agikki potone. Wek
oŋolla welle kikome ma romo wilone, omi bota i nyimwu, obed mera me kabedo
me yik.”
10I kare meno onoŋo Epron bene tye, obedo i kin jo Kit, ci Epron Lakit ogamo dog
Abraim, ma jo Kit ducu giwinyo, kacel ki lwak ducu ma gibedo i gaŋ meno,
11kun waco ni, “Pe kumeno ladit, winy lokka; amini poto, dok amiyi wa ki boro
ma tye iye-ni ki i nyim lutuwa ducu; yik iye kom latoni”
12Abraim dok oryebbe i nyim wegi lobo-nu,
13ka owaco ki Epron, ma wegi lobo ducu giwinyo ni, “Ento ka imito, ci winy lokka.
Abimiyi wel lawil poto, in ibigamo lim ki i ciŋa, wek ayik iye kom latona.”
14Epron owaco bot Abraim ni,
15“Laditta, winy lokka ya; wel dul poto-nu romo cekel me ryal miya aŋwen, meno
kono gin aŋo ki tuŋ boti ki an bene? Yik iye kom latoni.”
16Abraim owinyo dog Epron; ci opimo ki Epron wel ryal ma owaco i nyim jo Kit,
ma romo cekel me ryal miya aŋwen kulu, kun pimo ki kidi mijan ma lucat-wil
gipimo kwedeni.
17Kit meno poto pa Epron ma i Makpela-ni, ma yam tye tuŋe wokceg me Mamre,
poto kacel ki boro ma yam tye i poto-nu, ki yadi ducu ma tye i pota-nu, ma
gurumo dyere ducu, gimiyogi, gimokogi ducu
18me bedo pa Abraim, ki i nyim jo Kit ducu, kacel ki i nyim lwak ducu ma gibedo i
gaŋ meno.
19Ka lok meno otum, Abraim oyiko dakone Cara i boro ma tye i poto Makpela yo
tuŋ wokceŋ me Mamre, ma en aye Kebron, ma i lobo Kanaan.
20Lukit gumoko ni poto-nu, kacel ki boro ma tye iye, gubed pa Abraim me kabedo
me yik.

Acakki 24
1I kare ma Abraim doŋ oti, ma mwaka me ditte doŋ dwoŋ, dok onoŋo Lubaŋa doŋ
otyeko miyo gum ki Abraim i gin ducu,
2ci Abraim owaco ki laticce ma tye i ode, ma onoŋo loyo jamine ducu, ma oteggi i
kingi, ni, “Rwak ciŋi odony ki piny i te ema,
3wek ami ikwoŋ ki nyiŋ Rwot, Lubaŋa me polo ki lobo, ni, pe ibinyomo nyako mo
bot woda ma i kin anyira Kanaan, ma abedo i kingi-ni,
4ento ibicito i lobo tuwa, i kakawa; en aye ibinyomo iye dako bot woda Icaka.”
5Laticce ogamo ni, “Gwok nyo dako aye pe biye bino kweda wa i lobo man; myero
an aye adok ki wodi i lobo tuwu ma yam ibino, ia ki iye-ni?”
6Abraim owacce ni, “Nen maber ni, pe icito ki woda idwoko cen kunnu.
7Rwot Lubaŋa me polo ma yam okwanyo an ki i paco pa wora-ni, ki i lobo ma
ginywala iye-ni, ma yam oloko kweda kun kwoŋŋa kwoŋ ni, ‘Abimiyo lobo man bot likwayi,’ en bicwalo lamalaikane i nyimi, ci ibinyomo dako bot woda nia ki
kunnu.
8Ento ka dako aye pe oye bino kwedi, ci kwoŋŋa-ni pe bimaki; ento woda aye pe
myero idok kwede cen kunnu.”
9Kit meno laticce orwako ciŋe, odonyo ki piny ki i te em laditte Abraim, ocako
kwoŋo kwoŋ i kom lok meno.
10Laticce okwanyo kinaga pa rwode ma romo apar, ka ocako wot, kun otero bene
jami mabeco mapatpat; ci oa me wot i Mecopotamia, i gaŋ pa Nakor.
11En omiyo kinaga orumo coŋgi piny i ŋe gaŋ ma cok ki waŋ pii i kin otyeno
abwora, i kare ma mon gicito iye ka twomo pii.
12Ci olego ni, “Ai Rwot, Lubaŋa pa laditta Abraim, mi lok ducu owotta maber tin.
Alegi inyut mar meri ma pe lokke i kom rwoda Abraim.
13Nen, acuŋ i ŋet waŋ pii en, ki anyira ma i gaŋ guebino bene ka twomo pii.
14Nyako mo ma abilege pii amata, ni, ‘Koŋ icib aguluni piny, wek imiya pii amati,’
ci nyako ma biwaco gire kene ni, ‘Koŋ imati, ka doŋ abimiyo kinagani bene
gimato’, wek en aye obed nyako ma iyero pi laticci Icaka. Kit meno bimiyo aŋeyo
ni; in doŋ inyuto ki laditta mar meri ma pe lokke-ni.”
15Ma pud peya otyeko lokke, ci nen, Labeka, nya pa Becweri, wod pa Mirika, dako
pa Nakor, ma omin Abraim, otuc i waŋ pii ki agulu piine ma obolo i wi gwoke.
16Nyakone onoŋo neno mwonya twatwal, nyako ma ŋattt mo peya omako ciŋe. Ci
nyako meno olor, odonyo i waŋ pii, otwomo pii opoŋo agulu piine, ka odwogo,
okatti kwede woko.
17Latic meno oriŋo, oŋolle i kome, ci owacce ni, “Alegi ba, koŋ imiya pii ma i
aguluni amati.”
18Nyako ogamo ni, “Koŋ imat, laditta”; en otugi tiŋo agulu piine i ciŋe, omiye
omato.
19Ka otyeko, ci owaco gire kene ni. “Abitwomo pii, amiyo ki kinagani bene, nio ka
gumato pii oromogi.”
20Oyotoyot oonyo pii i weer, ci oriŋo odok ka twomo pii i waŋ it, otwomo pii nio
ka oromo kinaga ducu.
21Laco meno ociko waŋe i kome laliŋ, wek eniaŋ ka Rwot otyeko miyo luguma
okaye i yo wotte-ni, nyo pe.
22Ka kinaga gutyeko mato pii, laco meno okwanyo atego um me jabu ma pekke
romo nucu cekel, ki atego jabu aryo me ŋut ciŋ ma pekgi rom ki cekel apar me
jabu, omiyo ki nyako meno
23kun penye ni, “In mono i nya pa ŋa? Kabuto mo twero noŋŋe piwa i gaŋ pa
woru?”
24En ogamo ni, “An anya pa Becweri ma wod pa Mirika, ma onywalo ki Nakor.”
25Dok otitte ni, “Watye bene ki reŋ kal ki cam ma romo, wa kabuto bene noŋŋe.”
26Laco meno okula wiye piny, ci oworo Rwot,
27kun waco ni, “Gipwo Rwot, Lubaŋa pa laditta Abraim, ma pe oweko mar mere
ma pe lokke, ki adane, i kom laditta. An bene, Rwot doŋ otyeko telo wiya, okela
wa i ot ma i kaka pa laditta kikome.”
28Ci anyaka oriŋo otito lok mutimme ducu bot jo ma tye i ot pa minne.
29Labeka onoŋo tye ki ominne ma nyiŋe Laban. Ci Laban oriŋo ocito bot laco
meno, wa i waŋ it.
30Ka oneno atego um, ki atego i ŋut ciŋ laminne, ki pi winyo lok pa laminne
Labeka ni, “Laco-ni oloko bota kit man,” ci owoto bot laco-nu, nen, onoŋo ocuŋ
cok ki kinagane i ŋet waŋ it.
31Owacce ni, “Bin wa i ot, pien Rwot otyeko miyi gum; piŋo dok icuŋ ki i ŋe gaŋ
woko? Pien doŋ atyeko yubo ot ki kabuto pa kinaga bene.”
32Laco-ni obino, odonyo i ot; ka Laban ocako gonyo del woko ki i kom kinaga,
omiyo reŋ kal ki cam bot kinaga, okelo pii lalwok tyene ki tyen jo ma owoto
kwede.
33Ka gikelo cam gicibo i nyime wek ocam; ento en owacci, “An peya abicam, nio
ka atito kit kwena ma giora kwede.” Ci ogamo ni, “Tit do.”
34Ci en otito ni, “An latic pa Abraim.
35Rwot otyeko miyo gum madit omako laditta, doŋ odoko dano madit, omiyo en
olimo lim makwo, dyegi ki dyaŋi, ryal ki jabu, lwak opii ki lwak aŋeca, kinaga
mapol, ki lwak kana.
36I kare ma laditta doŋ oteggi, ci Cara dako pa laditta ocako nywalo latin laco, en
aye gimiye oleyo lim ducu ma en tye kwede.
37Laditta omiya akwoŋo kwoŋ, kun owacca ni, ‘Pe ibinyomo nyako mo bot woda
ki i kin anyira Kanaan, i lobo ma abedo iye-ni;
38ento ibicito i ot pa wora, ki i kin lutuwa, en aye icinyom iye dako bot woda.’
39Ci agamo dog laditta ni, ‘Gwok nyo dako pe biye bino kweda kono.’
40Ento en odokka iye ni, ‘Rwot ma abedo alubo cikke-ni bicwalo lamalaikane
nywako kwedi yo, ci luguma bikayi iyo wotti; in ibinyomo dako bot woda nia i ot
pa wora kikome.
41Ci kwoŋŋa doŋ pe bimaki, ka doŋ icito bot lutuwa; ka ce gin aye pe gumiyi
nyako, ci kwoŋŋa doŋ pe bimaki.’
42“Tin ka ao i waŋ pii, ci alego ni, ‘Ai Rwot, Lubaŋa pa laditta Abraim, ka tin
ibimiyo luguma kaya i wotta man ma awoto iye-ni,
43ci nen, acuŋ i ŋet waŋ pii en; nyako mo ma bibino ka twomo pii, an abiwacce ni,
“Alegi ba, miya pii mo ki aguluni amati,”
44nyako ma bigamo ni, “Koŋ Imati, dok abitwomo mukene pi kinagani bene,” en
aye obed dako ma Rwot oyero me bedo dako pa wod pa laditta.’
45“I kare ma pud peya atyeko loko lok ma tye i cwinya, ci nen, Labeka otuc,
mubolo agulu piine i wi gwoke, ci olor odonyo i waŋ pii, ka otwomo pii. Ci alege
ni ‘Miya pii amat ba!’
46En otugi tiŋo agulu piine ki i wi gwoke kun waco ni, ‘Koŋ imati, ci abimiyo
kinagani bene gimato.’ Ci an amato, ka en omiyo kinagana bene gumato.
47Dok apenye ni, ‘In kono i nya pa aŋa kaa?’ En ogamo ni, ‘An anya pa Becweri ma
wod pa Nakor, ma Mirika aye onywalo.’ Kit meno an acako keto agit i ume, ki
atego jabu i ŋut ciŋe ryoryo.
48Ka akulo wiya piny, aworo Rwot ci apwoyo Rwot, Lubaŋa pa laditta Abraim, ma
otela i yo maber, omiya anoŋo nya pa omin laditta me atera bot wode.
49Kombeddi ka wubitic ki laditta ki mar ki ada, wutitta; ka pe bene wutitta; wek
alokke adok yo tuŋ ciŋ acuc nyo tuŋ acam.”
50Laban ki Becweri gugamo ni, “Lok man oa ki bot Rwot; pe watwero dokki iye
marac nyo maber.
51Nen, en Labeka tye i nyimi enno; in ikwany en, wuwot kwede, wek en ocit obed
ci-wod pa laditti, macalo Rwot doŋ otyeko wacone.”
52Ka latic pa Abraim owinyo lok meno, ocako ryebbe piny i ŋom i nyim Rwot.
53Latic okelo lwak atego ryal ki atego jabu, ki lwak ginaruka, otiŋo omiyogi bot
Labeka; ka dok omiyo ki ominne ki bot minne jami me wel.
54En ki jo ma gitye kwede gucako camo cam ki mat, ci gubuto nino acel kunnu. Ka
gua malo odiko, ci olego ni, “Doŋ wucwala adok bot laditta.”
55Laban ki minne gugamo ni, “Wek koŋ anyaka obed kwedwa kare manok, ma
romo ka nino apar; lacen en doŋ bicito gire.”
56Ogamo kun waco botgi ni, “Pe wugal wiya; macalo Rwot doŋ omiyo luguma
okaya i wot man, wuwek doŋ acak wot, adok bot laditta.”
57Gugamo ni, “Koŋ walwoŋ nyako, wapenye.”
58Ka gilwoŋo Labeka, gipenyo kun giwacce ni “Ibiye wot ki laco man?” En ogamo
ni “Abiwot.”
59Kit meno gucako cwalo nyagi Labeka ki lapidine, kacel ki latic pa Abraim ki
jone.
60Gulamo gum i kom Labeka, kun giwacce ni, “Laminwa, bed min jo alip apar; ki
likwayi gulo gaŋ pa lumerokgi!”
61Lacen Labeka ki lwak aŋecane gua, gucako wot, guito wi kinaga kun gilubo kor
laco meno; kit meno latic meno ocako wot ki Labeka, kun gidok i yo tugi.
62Icaka onoŋo obino oa ki Beer-lakai-roi; i kare meno onoŋo en bedo i Negeb.
63Ka Icaka ocito woko i bar ka lwodo lok otyeno; ci otiŋo waŋe malo, oneno
kinaga ka bino.
64Ka Labeka otiŋo waŋe malo, oneno Icaka, ci olor woko ki i wi kinaga, opye piny.
65Owaco ki latic ni, “Meno laco mene ma loka ca, ma woto i bar kun bino ka romo
kwedwa-ni?” Latic ogamo ni. “En aye laditta-ni.” Labeka okwanyo boŋo oumme
kwede.
66Latic otito bot Icaka lok ducu ma otimme.
67Icaka okelo Labeka i kema, ci obedo kwede, odoko dakone, kun mare bene. Kit
meno cwiny Icaka ocako kwe ki i ŋe to pa minne.

Acakki 25
1Abraim dok onyomo dako mukene, ma nyiŋe Ketula.
2En onywalle Jimran, Yokocan, Medan, Midian, Icibak ki Cua.
3Yokocan onywalo Ceba ki Dedan; litino awobe pa Dedan gin ene: Accurim,
Letucim ki Leummim.
4Litino awobe pa Midian gin aye Epa, Eper, Kanok, Abida ki Eldaa. Gin ducu
likwayo pa Ketula.
5Abraim omiyo jamine ducu bot Icaka.
6Ento litino awobe pa monne ma aŋeca Abraim opoko botgi mot bene, i kare ma
pud en kwo; ci ocwalogi woko cen nia ki ka ŋet wode Icaka. Gudok tuŋ wokceŋ i
lobo mudok tuŋ nyaŋo.
Abraim oto, giyike
7Man aye wel nino me kwo pa Abraim; oromo mwaka miya acel ki pyeraryo wiye
abic.
8Abraim oomo cwinye me agikkine, ci oto woko, ma mwakane doŋ dit, dano
muteggi, ma doŋ oti, ci odok bot lutugi.
9Awobene Icaka ki Icmael guyiko kome i boro lyel ma i Makpela, ma i poto pa
Epron wod pa Jokar, ma Lakit, tuŋ wokceŋ me Mamre,
10 i poto ma yam Abraim owilo ki bot jo Kit. Giyiko Abraim kenyo, kacel ki dakone
Cara.
11Lubaŋa ocako miyo gum ki Icaka ki i ŋe to pa wonne Abraim. Icaka ocako bedo i
Beer-lakai-roi.
12Man aye likwayo pa Icmael wod pa Abraim, ma Agar aŋeca pa Cara, anyira
Ejipt, onywalo ki Abraim.
13Man nyiŋ litino awobe pa Icmael, kun lubo kit ma ginywalogi kwede: Nebayot,
en latin kayo pa Icmael; ki Kooar, Adbeel, Mibcam,
14Micima, Duma, Maca,
15Adad, Tema, Jetur, Napic ki Kedema.
16Man, aye awobe pa Icmael, nyiŋgi ene, kun lubo gaŋgi, ki kabedogi; gin luker
apar wiye aryo macalo rokgi tye.
17Icmael yam ori wi lobo mwaka miya acel ki pyeradek wiye abiro; ci oomo
cwinye me agikkine, oto woko, odok bot lutugi.
18Kabedogi yam ocakke nia ki Kavila nio wa i Cur mukemo tuŋ Ejipt ma dok tuŋ
Aciria; en obedo i kabedone pat kun pyem ki utmegine ducu.
Nywalo Ecau ki Yakobo
19Man aye likwayo pa Icaka, wod pa Abraim: Abraim onywalo Icaka,
20Icaka onyomo dakone Labeka kun onoŋo tye ki mwaka pyeraŋwen; Labeka
yam nya pa Becweri ma jo Aram, ma i lobo Paddan-aram, lamin Laban ma jo
Aram.
21Icaka ocako lego Lubaŋa pi dakone, pien onoŋo lalur; ci Rwot ocwako kor
legane, ka dakone Labeka ogamo ic
22I kare ma litino gubedo ka twomme ki i iye, en owacci, “Ka ce gitimme kit meno,
man nyuto gin aŋo?” Ci ocito ka penyo dog Rwot.
23 Ka Rwot otitte ni, “Rok aryo aye gitye i ii, jo meno aryo-nu kingi bipokke woko
ki i ii; acel bibedo oteka makato lawote, latin matidi aye biloyo latin kayo.”
24Ka kare me gonnyene oromo, ci litino rudi gunen i iye.
25Onywalo latin kayo ma kome kwar, kome ducu obedo ki yer calo boŋo yer;
omiyo gicako nyiŋe ni Ecau.
26Lacen dok ginywalo ominne, kun ciŋe omako opuny tyen Ecau, omiyo gicako
nyiŋe ni Yakobo. I kare ma ginywalo litino-nu onoŋo Icaka ditte doŋ romo mwaka
pyerabicel.
Ecau ocato dit me anywalline woko
27Awobe meno ka gudoŋo, ci Ecau obedo oken makwiri, ladwar i tim. Yakobo
obedo lamwolo, kun bedo mere i kema mot.
28Icaka yam maro mere Ecau, pien onoŋo bedo ka camo ciŋe; ento Labeka dok
onoŋo maro mere Yakobo.
29I kare ma Yakobo tye ka tedo dek ŋor, ci Ecau oa ki i tim, odwogo ma kec
obwoye woko.
30Ecau olego Yakobo ni, “Miya dek ŋor mubok-ki acam, kec obwoya woko.” Pi lok
meno omiyo gilwoŋo nyiŋe ni Edom .
31Yakobo owacce ni, “Koŋ icatta dit me anywallini.”
32Ecau ogamo ni, “An acok to woko; dit me anywalli kono konnye tye kwene?”
33Yakobo ogamo ni; “Koŋ icak ki kwoŋŋa kwoŋ.” Mumiyo en okwoŋŋe kwoŋ, ci
ocato dit me anywalline woko bot Yakobo.
34Ka Yakobo omine kwon ki dek ŋor, ka ocamo, omato pii i wiye, ci oa malo,
ocako wot ocito woko. Ecau ocayo dit me anywalline kit meno.

Acakki 26
1Kec dok opoto i lobo aye, ma pat ki kec ma yam koŋ opoto i kare pa Abraim ca.
Ka Icaka ocito i Gerar, bot Abimelek kabaka Piliciti.
2Ci Rwot onen bote kun wacce ni, “Pe icit i lobo Ejipt; ber ibed i lobo ma abititti.
3 Koŋ ibed i lobo man, an bene abibedo kwedi, abimiyi gum; pien lobo man ducu
abimiyo boti ki bot likwayi, dok abicobo kwoŋ ma yam akwoŋo bot woru Abraim.
4Abimiyo likwayi nya mapol macalo lwak lakalatwe me polo, abimiyo likwayi
lobo man ducu; dok rok ducu ma wi lobo gibilimo gumgi ki i komgi;
5pien yam Abraim oworo doga, kun cobo cikka ki gin ma aciko ducu.”
6Icaka obedo i Gerar.
7 Ka jo kunnu gupenye lok kom dakone, en ogamo ni, “En lamera”; pien olworo
waco ni, “Dakona”, kun tamo ni, “Wek wegi lobo pe guneka woko pi Labeka”; pien
onoŋo nen mwonya mada.
8Ka doŋ odikke kunnu kare malac, ci Abimelek kabaka pa jo Piliciti oneno Icaka ki
i waŋ dirica ka obedo ka tuko ki dakone Labeka.
9Abimelek ocako lwoŋo Icaka owacce ni, “Nen, man dakoni; piŋo in kono nene
iwacci, ‘En lamera’?” Icaka odokke iye ni, “Pien onoŋo atamo ni, ‘Wek pe guneka
woko pire.’ “
10Abimelek ogamo ni, “Itimowa kuman piŋo? Ka nene dano mo obuto ki dakoni,
kono ikelo bal i komwa nono.”
11Abimelek ocako juko lwakke ducu, kun waco ni, “Dano mo ka ogudo kom laco
man, nyo dakone, gibineke woko.”
12Icaka ocoyo poto i lobo meno; ci okayo cam ma dodo tyen miya i mwakanu.
Rwot aye omiye gum,
13dano-nu odoko lalonyo, obedo ka medde ki limo jami, nio ka odoko twon
lalonyo.
14Olimo lim madwoŋ makwo, dyaŋi ki dyegi, ci gaŋŋe opoŋ ki lwak dano, omiyo
nyeko omako jo Piliciti i kome.
15Onoŋo jo Piliciti gujuko waŋ it guculo woko ducu ki lobo, ma con lutic pa
wonne aye yam gukwinyo i kare pa wonne Abraim.
16Abimelek ocako waco ki Icaka ni, “Doŋ koŋ ia woko ki botwa, pien itek ikatowa
woko.”
17Ci Icaka oa woko ki botgi, ocito, ogony otiro i nota me Gerar, ci obedo iye.
18Icaka dok ocako golo waŋ pii ma yam gikwinyo i kare pa wonne Abraim; pien
yam koŋ jo Piliciti guju kogi woko i kare ma doŋ wonne Abraim oto woko-ni; ci
dok ocako lwoŋo nyiŋgi kit ma yam wonne, olwoŋogi kwede.
19Ento lutic pa Icaka gutyeko kwinyo waŋ it i nota-nu, ci gunoŋo iye waŋ it
maloŋo.
20Lukwat pa jo Gerar gucako da ki lukwat pa Icaka, kun giwaco ni, “Pii man
mewa.” Mumiyo en ocako nyiŋ waŋ pii meno ni. Ecek , ni pien gubedo ka da iye
kwede.
21Ka doŋ okwinyo waŋ it mukene, dok gucako da pi eno bene; mumiyo olwoŋo ni
Citna .
22Dok oa woko ki kunnu, okwinyo dok waŋ it mukene aye. Pe doŋ daa obedo tye
pi meno; mumiyo olwoŋo nyiŋe ni Rekobot , kun waco ni, “Pien tin doŋ Rwot
oyabowa kabedo malac, doŋ wabinya i lobe-ni.”
23Ka oa woko ki kunnu odak i Beer-ceba.
24Rwot dok onen bote i dyewor meno, ma wacce ni “An Lubaŋa pa woru Abraim;
pe ilwor, pien atye kwedi, abimiyi gum, dok abimiyo likwayi nya mapol pi laticca
Abraim.”
25Omiyo ocano keno tyer pi Rwot kunnu, ci olwoŋo iye nyiŋ Rwot; ci oguro
kemane kunnu. Luticpa Icaka dok gukwinyo waŋ it kunnu.
Icaka ki Abimelek gucikke
26 Abimelek ocito bote, oa ki i Gerar, kacel ki Akujat lamiye tam, ki Pikol ladit
lawimony mere.
27Ci Icaka owaco botgi ni, “Wunwubino bota pi lok aŋo, ma wun kono wudaga,
dok yam doŋ wuryema ki i lobowu?”
28Gin gugamo ni, “Wan waneno atir ni Lubaŋa tye kwedi, mumiyo wawacci, wek
kwoŋ obed i kin in ki wan, wek waket gicikke ki in,
29wek pe ibitimwa marac, macalo wan bene yam pe wagudo komi, pe bene
watimo gin mo marac i komi, ento tim maberre keken, dok bene waryemi woko
ia ki i kinwa ki kuc. Kombeddi in aye ŋat ma Rwot omiyo gum.”
30Ci otedogi karama, ka gucamo, gumato.
31Gua malo odiko con, ci gukwoŋo kwoŋ ŋat man ki lawote; ka doŋ Icaka
olwokogi i yo tugi, gua, gupokke kwede ki kuc.
32I nino meno bene kikome en aye lutic pa Icaka gubino bote, gutitte lok kom waŋ
it ma gityeko kwinyone, kun giwacce ni, “Watyeko noŋo pii.”
33Ocako nyiŋe ni Ciba, mumiyo nyiŋ gaŋ meno gilwoŋo ni Beer-ceba nio wa
onyoo.
34Ka Ecau doŋ ditte romo mwaka pyeraŋwen, onyomo monne, Judit nya pa Beeri,
jo Kit, ki Bacemat nya pa Elon, jo Kit bene.
35Gumiyo cwercwiny madwoŋ bot Icaka ki Labeka.

Acakki 27
1Ka Icaka doŋ oti, ki waŋe bene doŋ ocido woko ma doŋ pe neno piny, ci olwoŋo
latin kayone Ecau, owacce ni, “Latinna.” En ogamo ni, “Ana ene.”
2Ci owacce ni, “Nen, an doŋ ati woko, pe aŋeyo nino ma abito iye.
3Doŋ ikwany jami dwarri, ki jurani ki atummi, kat doŋ i tim, wek icidwarra lee,
4wek icella riŋo makur, kit ma amaro-ni, ci ikella, wek doŋ acam ciŋi, ka doŋ
alammi gum ma peya ato.”
5I kare ma Icaka tye ka lok ki wode Ecau-ni, onoŋo Labeka bene winyo. Ka Ecau
okato ocito ka dwaro lee i tim, wek ekel riŋo,
6Labeka owaco ki wode Yakobo ni, “Abedo ka winyo woru ka loko ki omeru ni,
7‘Cikella riŋo, wek icella riŋo makur, wek doŋ acam ciŋi, ka doŋ alammi gum i
nyim Rwot ma peya ato.’
8Mumiyo latinna, worra doga i lok ma aciki-ni.
9Wot icit i kin dyegi, icikella litino dyegi aryo ma komgi bulubulu. Wek an ayub
riŋone makur ki woru, kit ma en maroni,
10wek iter ki woru ocam ciŋi, wek olammi gum ma peya oto.”
11Ento Yakobo ogamo dog minne kun wacce ni “Nen ba, omera Ecau kome ki yer,
an: koma pe ki yer.
12Gwok nyo ka wora biboŋa, ci abinen macalo acito ka nyware, miyo bicena, pe
bilamma gum.”
13Minne ogamo doge kun waco ni, “Wek cenni opot i koma, latinna; worra doga
keken. Ber iwot, icikelgi bota.”
14En ocito, okelogi bot minne, ka minne ocelo riŋo makur, kit ma wonne maro-ni.
15Ka Labeka okwanyo ginaruka pa wode Ecau, ma en yam ruko maberre-ni, ma
noŋo tye i ot bot minne, ci oruko ki Yakobo wode matidi-ni.
16Ocako boyo laa litino dyegi-nu ki bade ducu, ki ŋute bene ka ma yer pe iye;
17ka otiŋo riŋo me ocelo makur-ri, ki kwon ma omyeno, omiyo i ciŋ wode Yakobo.
18En odonyo kwede bot wonne, owacce ni, “Aba”; en oye ni, “An atye en do; in aŋa
ce, latinna?”
19Yakobo ogamo dog wonne ni, “An Ecau, latin kayoni. Atyeko timo kit ma
nakanen ititta-ni; doŋ i cukke, ia malo wek icam ciŋa, ka doŋ ilamma gum.”
20Icaka owaco ki wode ni, “In onoŋo riŋo oyotoyot ma rom man niŋniŋ, latinna?”
En ogamo ni, “Pien Rwot Lubaŋani omiyo gum okaya oyot.”
21Dok Icaka owaco bot Yakobo ni, “Koŋ inyik cok bota kany, wek aboŋ komi,
latinna, wek aŋe ka in latinna Ecau kikome ada nyo pe.”
22Ka Yakobo ocako nyiko cok bot wonne Icaka; oboŋo kome, ci owacci, “Dwani
dwan Yakobo, ento badi en aye bad Ecau.”
23Ci doŋ pe omedo ki ŋene, pien onoŋo bade ki yer macalo bad ominne Ecau. Ka
ocako lamme gum kun waco ni,
24“In ada latinna Ecau kikome?” En odok iye ni, “An kikoma.”
25Ka dok owacce ni, “Kel cam bota cok, wek doŋ acam ciŋ latinna, ka doŋ alammi
gum.” Ci oketo cam i nyime, ka ocamo; dok okelle koŋo vino, omato bene.
26Ka dok wonne Icaka owacce ni, “Bin cok, wek inot lema, latinna.”
27 Ci onyiko cok bote, ka onoto leme; ka ocako ŋweyo ŋwec ginarukane, ka
olamme gum, kun wacce ni, “Nen, ŋwec kom woda kur macalo poto ma Rwot
omiyo gum kome!
28Lubaŋa omiyi toyo ma luk a ki i polo, ki lobo ma ceko cam mapek.
29 Lwak jo mapol obed luticci, ki rok mapol bene giryebbe piny i nyimi. In aye
ibed ladit ma loyo omegi, litino pa meni ducu giryebbe piny i nyimi. Cen obed i
kom dano ducu ma biceni, dok gum obed i kom jo ducu ma bilammi gum!”
30Ka doŋ Icaka otyeko lamo gum ki Yakobo okato woko manok nia ki i nyim
wonne Icaka, ominne Ecau ocako dwogo nia ki ka dwarre.
31En bene ocelo riŋo makur, okelo bot wonne. Owaco ki wonne ni, “Wore, doŋ
icukke, ia malo, wek icam ciŋ latinni, ka wek doŋ ilamma gum.”
32Wonne Icaka owacce ni, “In aŋa doki?” Ogamo ni, “An a wodi do, latin kayoni,
Ecau do.”
33Kom Icaka ocako myel matek twatwal, kun waco ni, “Aŋa ma nakanen koŋ
odwaro lee, okella-ni, ma doŋ atyeko camone woko ducu, ma onoŋo peya
idwogo-ni, dok atyeko lamma gum woko do, gum doŋ bidebo gire i kome.”
34Ka Ecau owinyo lok pa wonne, ocako tokke ki cwar koko madit, magwa bene,
kun waco bot wonne ni, “Lamme gum bene do, aya abana!”
35En dok owacce ni, “Omeru obino, obwola, ci doŋ otyeko buyo gummi woko.”
36 Ecau owacce ni, “Pe gicako nyiŋe Yakobo atir? Nen, en doŋ oridde ka laro
jamina kiryo kulu. Okwoŋo buyo dit anywillina, doki nen, in bene dok otyeko
buyo gumma woko.” Dok omedde ki waco lok ni, “In nene pe igwoko gum pira
ce?”
37Icaka ogamo dog Ecau ni, “Nen, doŋ atyeko keto en me bedo rwodi otum, ki
omege ducu atyeko miyogi me bedo luticce; amiye wa kal ki koŋo vino ducu
gubed me pito en. Gin aŋo ma dok abimiyi ba, latinna?”
38 Ecau dok owaco bot wonne ni, “Onoŋo itye ki gum acel keken bo, wora?
Lamma gum, lamma gom mo bene do, aya abana.” Ecau otiŋo wiye malo ka koko.
39Wonne Icaka ocako gamo lokke ni, “Nen, ibibedo bor ki lobo ma ceko cam
mapek, dok ibibedo bor ki toyo ma luk a ki malo i polo.
40 Ibikwo meri ki lak pala lucwanni, ibibedo latic pa omeru; ento i kare ma
ibijemo i kome, ci ibituro rii okol ma oriyo i ŋutini.”
Icaka ocwalo Yakobo i Karan
41Ecau ocako kwero ominne pi gum ma wonne olamo i kome-ni. Ecau opiro lok i
cwinye ni, “Kare me to pa wora doŋ onyiko cok; en aye abineko iye omera
Yakobo bene.”
42Ento ka gitito ki Labeka lok pa latin kayone Ecau, en ocwalo dano, olwoŋo
Yakobo wode matidine, owacce ni, “Nen, omeru Ecau obedo ma cwinye yom kun
oyubbe me neki.
43Mumiyo in iwor doga, latinna; a malo, ilwi, iriŋ woko bot omera Laban i Karan.
44Koŋ icibed kunnu, nio waŋ ma kiniga pa omeru opye;
45wek wiye koŋ owil i gin ma yam itimo i keme-ni; ka doŋ abicwalo dano ka omi
ki kunnu. Piŋo wun aryo ducu myero wurweny woko ki i waŋa lawaŋacel?”
46Ka Labeka dok owaco bot Icaka ni, “An doŋ kwona ool woko ki kit kwo pa mon
Kit. Ka dok Yakobo bene binyomo anyira Kit ma rom ki mon ma gitye i lobo-ni, ci
doŋ kwona konyo aŋo?”

Acakki 28
1Ka Icaka olwoŋo Yakobo, ci olamme gum, ka ocike ni, “In doŋ pe inyom dako mo
ki i kin anyira me Kanaan.
2Ber ia, icit Paddan-aram i ot pa kwaru Becweri ma won meni; en aye inyom iye
nya pa Laban ma omin meni kikome.
3Lubaŋa Matweroducu omiyi gum, omiyi inya mapol, wek ibed lwak rok mapol.
4 Dok omi gum pa Abraim opot i komi, ki i kom likwayi, wek icam lobo ma ibedo
iye-ni macalo welo, ma yam Lubaŋa omiyo ki Abraim!”
5Kit meno Icaka ocwalo Yakobo, ocito i Paddan-aram bot Laban, wod pa Becweri
me Aram, ma omin Labeka ma min Yakobo ki Ecau.
Ecau dok onyomo dako mukene
6Ecau oneno ni Icaka doŋ otyeko lamo gum i kom Yakobo, ka dok ocwale wa i
Paddan-aram wek onyom dako ki kunnu, dok i kare ma olamme gum ocike ni, “In
pe inyom nyako mo ki i kin Lukanaan,”
7dok Yakobo bene oworo dog wonne ki minne, ci ocito i Paddan-aram.
8Ka Ecau oneno ni kit pa anyira Kanaan pe yomo cwiny wonne Icaka,
9ci ocito bot jo Icmael, onyomo iye dako, omedo i kom mere ma con ca. Onyomo
Makalat ma nya pa Icmael wod pa Abraim, ma lamiŋ Nebayot.
Lek obino i wi Yakobo i Betel
10Yakobo oa ki, Beer-ceba, ci odok tuŋ Karan.
11Ka oo i kabedo mo, obuto kenyo i dyewor meno, pien onoŋo ceŋ doŋ opoto
woko. Ka otiŋo got acel mo ki i kin wadi, opyelo piny, oteno ki wiye, ci onino
woko i kabedo meno.
12 Lek obino i wiye, oneno rwom ma gijeŋo tere ocuŋ piny i ŋom, kun wiye gijeŋo
oo wa i polo; ka oneno lumalaika pa Lubaŋa kun gilor piny, ka dok giito gidok
malo.
13 Oneno Rwot ocuŋ tuŋ ka wiye malo, kun waco ni, “An a Rwot, Lubaŋa pa kwaru
Abraim, ki Lubaŋa pa Icaka; abimiyi lobo ma ibuto iye-ni, abimiyo boti ki bot
likwayi;
14dok likwayi gibibedo ma rom ki apwa me lobo, dok wubimedde wuromo yo tuŋ
potoceŋ ki tuŋ wokceŋ, ki yo tuŋ acam ki tuŋ acuc bene; dok i kom in ki i kom
likwayi en aye kaka ducu ma wi lobo bilimo iye gumgi.
15Nen, an atye kwedi, abigwoki ka ma ibiwoto iye ducu, dok abidwoki cen wa i
lobo man; pe abiweki ata nio waŋ ma acobo gin ma atyeko i okone boti-ni.”
16Ka Yakobo oco woko ki i waŋ nino, ci owacci, “Rwot tye i kabedo-ni ada; onoŋo
an kara pe aŋeyo.”
17Ci lworo ocako make, kun wacci, “Kabedo man kara lik kuman! Man ot pa
Lubaŋa kikome, man aye dog gaŋ me polo.”
18Yakobo oa malo odiko con, otino got ma oteno ki wiye-ni, ci ocibo wek obed
wir, ka oonyo moo i wiye.
19Ocako nyiŋ kabedo meno ni Betel ; ento nia wa con onoŋo nyiŋ kabedo meno
gilwoŋo ni Luj.
20Yakobo ocako kwoŋo kwoŋ kun waco ni, “Ka Lubaŋa bibedo kweda, kun gwoka
i yo man ma awoto iye-ni, ka dok bimiya kwon me acama, ki boŋŋi me aruka,
21ka ce abidwogo wa i ot pa wora ki kuc, ci Rwot doŋ bibedo Lubaŋana,
22ki got man bene, ma acibo me bedo wir, bidoko ot pa Lubaŋa: ki gin ducu ma
ibimina, an bene abimini dul acel me aparre.”
Acakki 29
Yakobo otiyo tic bot Laban pi Lakeri ki Lea
1Yakobo dok omedde ki wotte, ka oo i lobo pa jo ma tuŋ wokceŋ.
2Ka obedo ka neno piny, ci oneno waŋ pii i dye bar, lwak romi gubuto piny dul
adek ma gicok i ŋet waŋ pii; pien romi gimato pii i waŋ it meno. Got ma giumo ki
doge bene dwoŋ:
3ka romi ducu doŋ gugurre, gucokke kunnu, ka lukwat gitorre, giloro got woko
cen ki i dog waŋ pii, ka gimiyo romi gimato, ka dok giloro got, gidwoko cen,
giumo ki dog waŋ pii kakare.
4Yakobo openyogi ni, “Utmega, wun wua ki kwene?” Gugamo ni, “Wan waa ki i
Karan.”
5Owaco botgi ni, “Wun mono wuŋeyo Laban wod pa Nakor?” Gugamo ni,
“Waŋeyo en.”
6Owaco botgi ni, “En tye maber kono?” Gugamo ni, “En tye maber gire. Nen, nyare
Lakeri ka bino ki romigi ca!”
7En ogamo ni, “Nen, tipo peya olokke do, man peya kare me guro lim kacel; ber
wumi pii ki romi, ci dok wuciti, wukwagi aye.”
8Ento gin gutitte ni, “Wan pe watwero miyogi, waŋ ma lim ducu gucokke, gugurre
kacel, ka doŋ gicwalo got woko cen ki i dog waŋ pii, ka doŋ wamiyoromi pii.”
9Ka onoŋo en tye ka lok kwedgi, ci Lakeri ocoro ki romi pa wonne, ma onoŋo
kwayogi.
10Ka Yakobo oneno Lakeri nya pa Laban, nya pa omin minne, ki romi pa nerone
Laban, Yakobo okato ci ocwalo got woko cen ki i dog waŋ pii, ka ocako mi yo
romi pa nerone Laban gumato pii.
11Ci Yakobo onoto lem Lakeri, kun kok matek.
12Yakobo otito ki Lakeri ni, en e wat pa wonne kikome, en e wod pa Labeka; ci en
oriŋo, ocito otito ki wonne.
13Ka Laban owinyo lok kom Yakobo wod pa laminne, ci oriŋo ocito ka ŋolo wiye;
okwako kore, onoto leme bene, ka ocako tere wa i ode. Yakobo oyeko lok magi
ducu kikore bot Laban,
14ka Laban owacce ni, “In ada i cogona dok i riŋo koma bene!” Ci obedo kwede
dwe acel.
15Laban ocako waco bot Yakobo ni, “Pien in i watta, doŋ ibitina tic nono bo? Ber
ititta, imito aculli gin aŋo?”
16Onoŋo Laban tye ki anyirane aryo; nyiŋ nyare maditte Lea, ki nyiŋ matidine
Lakeri.
17Lea onoŋo wane kiŋiŋic, ento Lakeri nen mwonya muliŋŋe.
18Yakobo onoŋo maro Lakeri: ci owacci, “Abitini tic mwaka abiro pi Lakeri, nyari
matidi-ni.”
19Laban ogamo ni, “Onoŋo bedo ber ka amiyo en boti, kato ma kono amiyo bot
dano mukene; bed bota.”
20Yakobo otiyo pi Lakeri mwaka abiro; kare meno obedo macalo nino manok mo
ki bot Yakobo, pien onoŋo iye omaro Lakeri mada.
21Yakobo openyo Laban ni, “Doŋ imiya dakona wek abed kwede, pien kare doŋ
oromo.”
22Laban otedo karama ci olwoŋo iye dano ducu ma gitye i kabedo meno.
23Ci okelo nyare Lea bot Yakobo otyeno, ocako bedo kwede.
24Laban omiyo aŋecane Jilpa bot nyare Lea wek okonye.
25Ka odiko ma piny oru, Yakobo oneno kara gimiye Lea. Yakobo owaco ki Laban
ni, “Itima kuman piŋo? Onoŋo pe abedo ka tic boti pi Lakeri? Ibwola kuman
piŋo?”
26Laban ogamo ni, “Pe gitimo kuman i lobo tuwa kany, pe gimiyo nyako matidi
aye kwoŋo ger ki maditte.
27Koŋ ityek cabit pi man acel-li, ci dok wabimiyi giri mukene bene, ka ibitina tic
mwaka abiro mukene.”
28Yakobo otimo kit meno; ocobo cabit pa Lea, ka Laban omiye nyare Lakeri me
bedo dakone.
29Laban dok omiyo aŋecane Bila bot nyare Lakeri wek okonye.
30Yakobo ocako bedo ki Lakeri bene; cwinye omaro Lakeri makato Lea, dok
omedde otiyo tic bot Laban mwaka mukene abiro.
Litino ma ginywalo ki Yakobo
31Ka Rwot oneno ni gidag Lea, ci oyabo iye; ento Lakeri ocuŋ ma pe nywal.
32Lea ogamo ic, onywalo latin laco, ci ocako nyiŋe Reuben, kun waco ni, “Pien
Rwot oneno aromana; koni olo doŋ cwara bimara.”
33Dok ogamo ic, ci onywalo latin laco, owacci, “Pien Rwot owinyo ni gidaga,
omiyo dok omiya latin man bene”; ci ocako nyiŋe ni Cimeon.
34Lacen dok ogamo ic, onywalo latin laco, owacci, “Cwara doŋ bidwogo i koma,
pien doŋ anywalle awobe adek kulu”; mumiyo gicako nyiŋ latin-nu Levi.
35Dok ogamo ic, onywalo latin laco, owacci, “Man aye kare ma abipako iye Rwot”;
mumiyo ocako nyiŋ latin Juda; ci koŋ ocuŋ woko.

Acakki 30
1Ka Lakeri oneno ni pe enywalo latin mo ki Yakobo, ci nyeko omake kom
laminne. Ka owaco bot Yakobo ni, “Miya litino; ka pe, ci adene woko.”
2Kiniga omako Yakobo i kom Lakeri, kun wacce ni, “Iketa adoko Lubaŋa bo, ma
en ogeŋi nywalli?”
3Lakeri ogamo ni, “Aŋecana Bila en do, doŋ ibed kwede, wek onywal latin mo ma
kakara, wek an bene anoŋ litino mogo ki tuŋ bote.”
4Ci omiyo aŋecane obedo dakone, Yakobo ocako bedo kwede.
5Bila ogamo ic, onywalo latin laco ki Yakobo.
6Lakeri owaco ni, “Lubaŋa otyeko ŋolla kop, owinyo ki dwana bene, ci omiya gira
latin laco”; omiyo ocako nyiŋe Dan.
7Bila aŋeca pa Lakeri dok ogamo ic, onywalo latin laco ki Yakobo me aryone.
8Lakeri dok owacci, “Ka me lweny doŋ alwenyo matek wan ki lamera, ci aloye”;
mumiyo ocako nyiŋ latin Naputali.
9Ka Lea bene oneno ni doŋ ecuŋ woko, ma pe enywalo litino, ci otiŋo aŋecane
Jilpa, omiyo ki Yakobo wek obed dakone.
10Aŋeca pa Lea bene onywalo latin laco ki Yakobo.
11Lea owacci, “Gum maber!” Mumiyo ocako nyiŋe Gad.
12Jilpa aŋeca pa Lea dok onywalo latin laco ki Yakobo me aryone.
13Lea owacci, “An koma gum! Pien mon gibilwoŋa ni lagumkom”; mumiyo en
ocako nyiŋ latin ni Acer.
14I kare me kayo ŋano, Reuben ocito i poto, ci onoŋo iye yat nyodo, ci okelogi wa
bot minne Lea. Ka Lakeri olego Lea ni, “Alegi, imiya yat nyodo pa wodi mogo do.”
15Ento en ogamo ni, “In imayo cwara woko ki bota, itamo ni lokke tidi ce? Man
dok imito ni ikwany yat nyodo pa woda woko bene?” Lakeri ogamo ni, “En tin
obut kwedi dyewor ma ka yat nyodo pa wodi.”
16Ka Yakobo odwogo nia ki i tim otyeno, Lea okato ocito ka ŋolo wiye iyo, owacce
ni, “Myero tin idony i oda; pien atyeko wilo in ki yat nyodo pa woda.” Ci ocito
obuto ki Lea i dyewor meno.
17Lubaŋa owinyo lega pa Lea, ci ogamo ic, onywalo latin laco me abicce ki
Yakobo.
18Lea owacci, “Lubaŋa doŋ oculo waŋ miyo aŋecana bot cwara”; mumiyo ocako
nyiŋe Icakar.
19Lea dok ogamo, oyac, onywalo latin me abicelle ki Yakobo.
20Lea dok owacci, “Lubaŋa doŋ omiya mot me lim keny mabeco; cwara doŋ
biketta deyo, pien doŋ atyeko nywalle litino co abicel kulu”; mumiyo ocako nyiŋe
Jabulon.
21Lacen dok onywalo nyare, ci ocako nyiŋe Dina.
22Lubaŋa doŋ ocako po i kom Lakeri, dok owinyo legane bene, ka oyabo iye.
23Ci ogamo, onywalo latin laco, kun wacci, “Lubaŋa otyeko kwanyo lewic woko ki
i koma”;
24ci ocako nyiŋe Yucepu, kun wacci, “Myero Rwot dok omedda latin laco mo
acel!”
Lok ma Yakobo oyubo ki Laban kom mucarane
25Ka Lakeri otyeko nywalo Yucepu, ci Yakobo owaco bot Laban ni, “Doŋ icwala
wek adok paco i lobo tuwa.
26Miya monna ki litinona ma yam atiyo pigi boti-ni, wek doŋ aciti; in bene iŋeyo
gin ma atiyo boti do.”
27Laban ogamo ni, “Ka iye, ci koŋ alokki gin mo; pien atyeto ci aniaŋ ni Rwot
omiya gum pi in.
28Ber ititta gin ma imito amini me mucarani, ci abimini.”
29Yakobo owacce ni, “In kikomi iŋeyo kit ma atiyo ki ticci, ki kit ma agwoko
kwede limmi.
30Pien yam ma peya abino onoŋo limmi nok mo, nen doŋ gumedde madwoŋ
mukato; Rwot obedo ka mini gum ka ma adok iye ducu. Ento an abinoŋo lim ma
tuŋ bota awene?”
31En ogamo ni, “Gin aŋo ma abimini?” Yakobo ogamo ni, “In pe ibimiya gin mo
wacel. Ka ibiye, tima gin macalo man, an abimedde ka kwayo limmi, ki gwokogi
bene.
32Wek tin acit awot i kin limmi ducu, wek ayer ki i kingi romi ma gubedo aciri
aciri ki ma abacabac, ki litino romi macol ducu, kacel ki dyegi ma gubedo
abacabac ki ma aciri aciri; meno gin aye gibibedo mucarana.
33Kit meno leŋ cwinya binen lacen, ka ibibino ka ŋiyo kom mucarana. Ka ibinoŋ o
dyegi ma komgi pe aciri aciri ki abacabac, ki litino romi ma pe gicol gitye i kin
mega, meno gibikwano ni ma gikwalo.”
34Ci Laban ogamo ni, “Ber, wek obed kit ma iwaco-ni.”
35Ento i nino meno Laban okoyo nyogi dyegi ma gubedo kitana kitana, ki ma
abacabac, ki megi dyegi ma gubedo aciri aciri ki abacabac, ma kitartar ducu, ki
litino romi ducu macol, oketo i cin awobene.
36Opoko kingi woko ki Yakobo ma borre romo wot me nino adek kulu; Yakobo
odoŋ ka kwayo lim pa Laban mudoŋŋe.
37Yakobo ocako jako jaŋ pobo madyak ki yaa ki ogali, ci oŋweko pokgi, wek kom
kedi onen ŋwalaŋwala.
38Oketo kedi ma oŋweko komgi, opyelogi i nyim romi i weer pii, ka ma gionyo iye
pii, ka ma lim cito iye ka mato pii, pien nyogine giyito megine ka gibino ka mato
pii.
39Ka giyitogi i nyim kedi, omiyo ginywalo litino ma akolakol, ki ma aciri aciri ki
ma abacabac.
40Yakobo dok opoko litino romi pat, oloko waŋ lim ka neno gin ma akolakol ki
lwak lim pa Laban macolle ducu, ka opoko dul limme pat kun pe dok ribogi ki pa
Laban.
41I kare ma nyogi yito megine matego, ci Yakobo pyelo kedi i weer pii i nyim
romi, wek oyitte i nyim kedi,
42ento ka megine magorogoro aye giyitogi, en pe pyelo kedi i nyimgi; pienno lim
magoro ducu pa Laban, mategone ducu pa Yakobo.
43Kit meno laco meno odoko lalonyo madwoŋ, ma tye ki lwak lim, ki lwak aŋeca
ki lwak opiine, ki lwak kinaga ki kana.

Acakki 31
1Yakobo obedo ka winyo kun awo be pa Laban giwaco ni, “Yakobo doŋ otero lim
pa wonwa woko ducu, olimo lonyo nia ki i kom lim pa wonwa.”
2Yakobo oneno ni waŋ Laban oballe woko i kome, pe dok nene maber kit macon.
3Rwot owaco bot Yakobo ni, “Doŋ idok i lobo pa kwarowu bot lutuwu, an abibedo
kwedi.”
4Yakobo olwoŋo Lakeri ki Lea i bar olet ka ma limme tye iye,
5ci owaco botgi ni, “An aneno waŋ wonwu ocido woko i koma, pe doŋ nena
maber kit macon. Ento Lubaŋa pa wora yam tye kweda.
6Wun wuŋeyo ni atyeko tic bot wonwu ki tekka ducu;
7ci en obedo ka bwola, kun loko mucarana atata tyen apar kulu, ento Lubaŋa pe
oye en otimo gin mo marac i koma.
8Ka owaco ni, ‘Lim ma abacabac bibedo meri me mucarani,’ ci lim ducu ginywal
mubedo abacabac keken. Ka dok oloko doge ni, ‘Lim ma gibedo akolakol gin aye
bibedo meri me mucarani,’ ci lim ducu dok ginywal akolakol.
9Meno aye kit ma Lubaŋa okwanyo kwede lim pa wonwu ci omiyogi bota.
10“I kare ma megine giyitogi, atiŋo waŋa malo ki i waŋ lek, ci aneno nyogi ma
gitigo megine komgi obedo akolakol ki abacabac ki opukopuk.
11Lamalaika pa Lubaŋa owacca i waŋ lek ni,. ‘Yakobo’, an agamo ni, ‘An a ene!’
12Ci owacca ni, ‘Tiŋ waŋi malo wek inen, nyogi ducu ma gitigo megine-ni gubedo
akolakol ki abacabac ki opukopuk; pien atyeko neno kit ma Laban timi kwede.
13 An Lubaŋa me Betel, ka ma yam iwiro iye wir ki moo, ka ikwoŋo iye kwoŋ
bota-ni. Doŋ ia malo, icit woko cen ki i lobe-ni, idok i lobo ma ginywali iye ca.’ “
14Lakeri ki Lea gugamo ni, “Tye dok dul lim mo nyo ginaleya mo ma dok odoŋ
piwa i ot pa wonwa?
15Pe doŋ en nenowa macalo lurok ata? Doŋ otyeko catowa woko, tye ka camo
bene lim ma gimiyo piwa woko.
16Lim ducu ma doŋ Lubaŋa otyeko kwanyo ki bot wonwa doŋ mewa ki pa
litinowa; doŋ gin ducu ma Lubaŋa owacci aye itim.”
17Yakobo oa, oketo awobene ki monne i wi kinaga,
18oleko limme ducu, ma yam olimo i Paddan-aram; ci ocako wot me dok i lobo
Kanaan bot Icaka.
19Laban onoŋo ocito ka ŋolo yer kom romine, ci Lakeri okwalo cal lubaŋa ki i ot
pa, wonne.
20Yakobo obwolo Laban La-aram, pe otitte pi wotte.
21Olwi ki lwak lim ducu ma yam tye kwede, ka ocako wot, oŋolo kulu Euprate, ci
okemo lobo godi me Gilead.
Laban olubo kor Yakobo
22Ka nino okato adek kulu, ci gitito bot Laban ni, “Yakobo doŋ otyeko lwi, ocito
woko.”
23En ogwarre ki lutugi, gutwarre, gulubo kore; ka guwoto nino abiro, ci gudiŋo
kore cokcok i kin godi me Gilead.
24Ento Lubaŋa obino bot Laban La-aram i waŋ lek, kun wacce ni, “Gwokke, pe
icilok lok mo maber nyo marac bot Yakobo.”
25Laban omako Yakobo iyo. Onoŋo doŋ otyeko gony woko i lobo godi, ci Laban ki
lutugi gugony i lobo godi meno me Gilead.
26Laban ocako lok ki Yakobo ni, “Itimo kuman piŋo, ma ibwola kit man, doŋ itiŋo
anyirana, ilwi kwedgi, macalo iyakogi ayaka ki pala lucwan-ni?
27Piŋo ilwi woko alwiya i muŋ ali, kun iumo waŋa ma pe ititta gin mo, ma kono
nene aciki ki yomcwiny ki wer ki ajaa ki opuk?
28Piŋo pe iweko aciko litinona kun anoto lem anyirana? Man itimo gin me caro a
tika.
29Onoŋo atwero timi marac; ento Lubaŋa pa woru oloko kweda tin i dyewor,
ocika ni ‘Gwokke pe icilok lok mo maber nyo marac bot Yakobo.’
30Man doŋ ia icako wot woko, pien pi ot pa woru odoko mitti mada; ento dok
ikwalo ki cal lubaŋana me ŋo kono?”
31Yakobo ogamo dog Laban ni, “Onoŋo abedo ki lworo, abedo ka tamo ni gwok
nyo ibimayo anyirani woko ki bota.
32Ka ibinoŋo cal lubaŋani bot ŋatti mo kany, ŋat meno pe bikwo. Cim koni jamini
ma inoŋo tye bota kany i nyim utmegiwa ci ikwany idok giri kwede.” Onoŋo
Yakobo pe oŋeyo ni Lakeri aye ma okwalogi.
33Kit meno Laban ocako donyo i kemapa Yakobo, ki i kema pa Lea, ki i kema pa
mon aŋeca aryo-nu ducu, ci pe omedo ki noŋogi; ka okato woko ki i kema pa Lea,
dok odonyo i kema pa Lakeri.
34I kare meno onoŋo Lakeri otiŋo lubaŋa-nu, ci orwakogi i kom me bedo i wi
kinaga; ci obedo i wigi. Laban oŋiyo jami ma i kema ducu, pe omedo ki noŋogi.
35Lakeri owaco bot wonne ni, “Laditta, pe kiniga omaki i koma ka ineno ni pe
atwero a malo i nyimi, pien atye ki kit pa wan mon.” Kit meno Laban oyenyo cal
lubaŋane kwe, pe omedo ki noŋogi.
36Kiniga omako Yakobo, ocako da ki Laban, kun waco bot Laban ni, “Balla doŋ tye
kwene kaa? Atimo bal aŋo, mumiyo ilubo kora twatwal-li?
37Kadi bed iyenyo i kin jamina ducu, kit gin aŋo ma inoŋo i kom jami ducu ma oa i
odi? Kel iket kany i nyim utmegini ki utmegina, wek guŋol kop i kin wan aryo-ni.
38An abedo kwedi mwaka pyeraryo; pe i megi romini ki megi dyegini mo opoto,
pe bene acamo nyok romoni mo.
39Lim ma ŋuu aye omwodo pe akelo riŋone boti, an aye aculo gira; lim ma
gikwalo i dyeceŋ ki i dyewor ipenyo bota.
40Yam abedo kit meno, kun ceŋ waŋa dyeceŋ, koyo neka dyewor, pe aketo nino
mo i waŋa.
41I lwak mwaka pyeraryo ma abedo kwedi i odi-ni, atiyo boti mwaka apar wiye
aŋwen pi anyirani aryo-ni, ki mwaka abicel pi limmi, ibedo ka loko mucarana
tyen apar kulu.
42Ka ce Lubaŋa pa wora, Lubaŋa pa Abraim ma Icaka bene lworo, pe obedo tuŋ
bota, kono tin icwala adok tuwa ki ciŋa noŋo adada. Lubaŋa oneno twon
aromana, ki tic ma atiyo ki ciŋa ci tin dyewor bene ojuki.”
Yakobo ki Laban gucikke
43Laban ogamo kun dok iye bot Yakobo ni, “Anyira man gin anyirana, ki litino
bene gin litinona, lim bene gin limma, ki gin ma ineno-ni gin ducu limma. Ento
abitimo gin aŋo tin i kom anyirana-ni, nyo i kom litinogi ma gunywalo?
44Doŋ ibin wek waket gicikke i kin in ki an, me bedo caden i kin in ki an.”
45Ci Yakobo otino got ocibo wek obed wir.
46Ka Yakobo owaco bot utmegine ni, “Wucok got”, ci gucoko got, guguro kacel, ka
gucamo cam i ŋet odur got meno.
47Laban ocako nyiŋ kabedo meno ni Jegarcaduta; ento Yakobo ocako nyiŋe ni
Galeed.
48Laban owacci, “Odur man en aye caden i kin in ki an tin.” Mumiyo ocako nyiŋe
Galeed.
49Ocako nyiŋ wir meno ni Mijpa, pien owacci, “Rwot ogwok kin an ki in, ka kinwa
doŋ bipokke woko.
50Ka ibiketo giŋi marac i kom anyirana, nyo ka dok ibinyomo mon mukene,
idodogi i kom anyirana, kadi ŋatti mo pe tye kwedwa, ber ipo ni Lubaŋa en aye
caden i kin in ki an.”
51Ci Laban dok owaco bot Yakobo ni, “Nen odur man, ki wir ma atyeko cibo i kin
in ki an.
52Odur man aye caden, ki wir bene en caden, an pe abikato ka ŋet odur man pi
cito boti, in bene pe ibikato ka ŋet odur man ki wir man pi cito bota, ni pi tim
marac.
53Lubaŋa pa Abraim, Lubaŋa pa Nakor, Lubaŋa pa wongi, obed laŋolkop i kinwa.”
Kit meno Yakobo okwoŋo kwoŋ ki nyiŋ Lubaŋa ma wonne Icaka lworo.
54Yakobo otyero gitum i wi got, kun olwoŋo iye utmegine ducu ka camo cam
kwede, ci gucamo gubuto kunnu i wi got.
55Ka piny oru odiko con, Laban oa, onoto lem likwaye ki lem anyirane, olamo
gum i komgi, ci opokke kwedgi odok i gaŋŋe.

Acakki 32
Yakobo oyubbe pi rwatte ki Ecau
1Yakobo omedde ki wotte ci lumalaika pa Rwot guromo kwede.
2Ka Yakobo onenogi, owacci, “Man mony pa Lubaŋa!” Mumiyo olwoŋo nyiŋ
kabedo-nu ni Makanaim .
3Yakobo ocwalo lukwena bot ominne Ecau ma tye i lobo Ceir, i lobo pa jo Edom.
4Opwonyogi ni, “Wubiwaco bot laditta Ecau kit man: Laticci Yakobo owacci, ‘Doŋ
atyeko bedo bot Laban abedo nio wa i kare-ni.
5Atye ki twoni ki lwak kana, ki lwak lim, ki lwak opii ki lwak aŋeca; acwalo kwena
boti laditta wek anoŋ pwoc mo ki tuŋ boti.’ ”
6Ka lukwena gudwogo bot Yakobo, guwacce ni, “Wao bot omeru Ecau, en obebino
ka jolo wii i yo, kacel ki jo miya aŋwen.”
7Lworo omako Yakobo matek kome bene oryaŋŋe woko; ci opoko kin jo ma
onoŋo gitye kwede, ki dyegi ki dyaŋi, ki kinaga, dul aryo,
8kun tamo ni “Ka Ecau obino olwenyo i kom dul man acel-li otyeko woko, ci dul
acel mudoŋ ca bibwot.”
9Yakobo olego ni, “Ai Lubaŋa pa kwara Abraim, Lubaŋa pa wora Icaka, ai Rwot in
ma yam iwacca ni, ‘Doŋ idok tuwu bot kakawu, an abitimi maber,’
10an pe amyero kadi matidi mo ki mar meri ducu ma pe lokke, ki ada meri ducu
ma inyuto i kom an laticci; pien con aŋolo kulu Jordan ma kun atye ki odoona
keken, ci kombeddi doŋ apokke dul aryo kulu.
11Alegi ni ilara ki i ciŋ omera, lara ki i ciŋ Ecau; pien alwore, gwok nyo obebino ka
nekowa ducu mon ki litinogi.
12 Ento yam onoŋo iwaco ni, ‘Abitimi ber, abimiyo likwayi bedo macalo kweyo
ma i dog nam, ma pe kwanne pi dwoŋŋe.’ ”
13En obuto kenyo i nino meno, okwanyo dul lim mogo ma yam tye kwede ocwalo
bot ominne Ecau,
14megi dyegi miya aryo ki nyogi dyegi pyeraryo, megi romi miya aryo ki nyogi
romi pyeraryo,
15megi kinaga ma ginyeto cakgi pyeradek ki litinogi, megi dyaŋi pyeraŋwen ki
twoni apar, megi kana pyeraryo ki twoni kana apar.
16Otiŋo man ducu, omiyo i ciŋ luticce, kun gilekogi dul ki dul patpat. Ociko luticce
ni, “Wun wukat i nyima, wek kinwu obed mabocoboco ka wutye ka lekogi.”
17Ociko latel yo ni, “Ka omera Ecau oromo kwedi, ce openyi ni, ‘Wun jo pa aŋa?
Wucito kwene? Lim man ma i nyimwu-ni pa aŋa?’
18Ibiwacce ni, ‘Lim pa laticci Yakobo; gin aye mot ma ocwalo bot laditte Ecau; en
bene pud odoŋ ceŋ i ŋewa.’ “
19Omedde ki pwonyo dano me aryo ki me adekke, ki gin ducu ma gileko lim,
ocikogi ni, “Wubiloko lok ma romrom bot Ecau ka wuromo kwede,
20ka wubiwacce ni, ‘Dok bene laticci Yakobo aye odoŋ cen i ŋewa.’ ” Onoŋo otamo
ni, “Wek akwe cwinye ki mot ma ocito anyim-mi, ci lacen olo abineno waŋe twal,
dok en bene gwok doŋ bijola.”
21Kit meno mot okwoŋo nyime, kun en kikome obuto i gony i dyewor meno.
Yakobo olwenyo i Peniel
22I dyewor meno en oa malo, ci okwanyo monne aryo, aŋecane aryo, kacel ki
litinone apar wiye acel, owoto oŋolo kwedgi kulu Jabok i waŋ wat apara.
23Okwanyogi, omiyo guŋolo kulu, kacel ki lim ma en tye kwede ducu.
24 Yakobo ka odoŋ kene, laco mo obino, ocako rette kwede nio wa kwarpiny.
25Ka laco meno oneno ni pe doŋ etwero loyo Yakobo, ci otwomo awaŋ-macce; ci
em Yakobo otuk owil woko lacuŋo ma en rette kwede.
26Owacce ni, “Weka doŋ aciti, pien piny doŋ mito ru woko.” Ento Yakobo ogamo
ni, “Pe abiweki, nio waŋ ma koŋ ilamma gum.”
27En ogamo ni, “Nyiŋi kono aŋa?” En owacci, “Yakobo.”
28 Ci dok owacce ni, “Nia tin nyiŋi doŋ pe gibilwoŋo ni Yakobo, ento ni Icrael ,
pien ibedo ka lweny ki Lubaŋa, dok ki dano bene, ci imedo ki loyo.”
29 Yakobo dok openye ni, “Alegi ni itucca nyiŋi do.” En owacce ni, “Ipenyo nyiŋa
kono piŋo?” Omiye gum ka kenyo.
30Ci Yakobo ocako nyiŋ kabedo meno ni, Peniel, kun wacci, “Pien atyeko neno
Lubaŋa waŋ ki waŋ, ento pud akwo gira aye.”
31Ceŋ otucce i Peniel kun doŋ woto ma komo akoma pi eme ma otuk owil wokoni.
32Omiyo wa i kare man Luicrael gikwero riŋo puc me bam ma tye i awaŋ-mac,
pien Lubaŋa otwomo me Yakobo i ler awaŋ-mac.

Acakki 33
1Ka Yakobo otiŋo waŋe malo, ci oneno ka Ecau bino, kacel ki jone miya aŋwen.
Ocako poko litino i kin Lea ki Lakeri ki bot aŋecane aryo-ni.
2Ocwalo aŋeca ki litinogi anyim, ka dok Lea ki litinone, ka doŋ Lakeri ki Yucepu
gucoko korgi ducu.
3En kikome obolle, ocito anyim, kun woto ryebbe piny tyen abiro nio ka oo
kwede cok bot ominne.
4Ento Ecau otokke ki ŋwec, oriŋo ka mote, ci opoto okwako kore, ka omako ŋute,
onoto leme, ci gucako koko.
5Ka dok Ecau otiŋo waŋe malo, ci oneno lwak mon ki litinogi, owacci, “Maca kono
jo mene ma gibino-ni?” Yakobo ogamo ni, “Meno aye gin litino ma Lubaŋa omiyo
ki laticci pi kicane.”
6Ka aŋeca gunyiko cok, kacel ki litinogi, ci guryebbe piny;
7Lea bene kit meno kacel ki litinone ka gunyiko cok ci guryebbe piny; me
agikkine Yucepu ki Lakeri gunyiko cok, gin bene guryebbe piny.
8Ecau owacci, “Lwak man ma arwatte kwedgi ducu, te lokke aŋo?” Yakobo ogamo
ni, “Wek anen maber-ber i nyim laditta.”
9Ento Ecau owacci, “An atye ki ma roma, omera; wek lim man ducu gubed meri.”
10Yakobo ogamo ni, “Aa, pe. Alegi ni, ka ineno an ayomo cwinyi, ci ber igam mot
ma amiyi ki ciŋa-ni; pien ada, ka aneno waŋi, rom ki ma aneno waŋ Lubaŋa, pi kit
cwiny maber ma ijola kwede-ni.
11Alegi igam mot ma amiyo gikelo boti-ni, pien Lubaŋa doŋ onyuto kicane i koma,
dok bene atye ki mera ma roma.” Obedo ka ride ki lok meno, nio ka oye, ogamo
motte.
12Lacen Ecau owacci, “Wek doŋ wanywaku yo kacel, kun atelo nyimi.”
13Ento Yakobo ogamo ni, “Laditta, iŋeyo ni litino pud peya guteggi, dok atye ka
gwoko romi ki dyaŋi ma pud gidoto litinogi; ka wamiyogi wot malac, bibwoyogi
woko, kadi bed pi nino acel, lim ducu gibito woko.
14Wek in laditta iwot, icit anyim i nyim laticci, kun an alubo kori motmot, muporo
wot pa lim mutella yo, ki wot pa litino, nio ka abio boti i Ceir.”
15Ecau ogamo ni, “Wek awek boti jo mogo ma abino kwedgi-ni.” Ento en owacci,
“Gimitte piŋo? Laditta, tima ber, wek doŋ obed kit meno.”
16Kumeno Ecau ocako wot i nino meno me dok i Ceir.
17Yakobo owoto odok mere tuŋ Cukot, ogero ode pire kene dok oguro dwol
dyaŋine. Mumiyo nyiŋ kabedo meno gilwoŋo ni Cukot .
18Lacen Yakobo oo ki kuc i gaŋ me Cekem, ma tye i lobo Kanaan, kun oa ki i
Paddan-aram; oguro kemane i nyim gaŋ.
19 Dul-latin lobo ma oguro iye kema-ni, owilo ki bot litino pa Kamor, ma won
Cekem, ki wellim ma romo miya acel.
20Ocano keno tyer kunnu, ci olwoŋo ni El-Eloe-Icrael .

Acakki 34
Guculo kwor pi ronyo Dina
1Dina nya pa Lea, ma onywalo ki Yakobo, ocito ka limo mon ma i lobo meno.
2Cekem wod pa Kamor ma Lakiv, laker me lobo meno, ka onene, ci omake tektek
obuto kwede, omiye lewic.
3Cwinye omaro Dina nya pa Yakobo; omaro nyako, kun loko kwede mot mupye.
4Cekem oloko ki wonne Kamor ni, “Nyomma nyako man, obed dakona.”
5Yakobo owinyo ni otyeko ronyo nyare Dina; ento onoŋo awobene gitye ki limme
i olet. Yakobo odiyo cwinye, oliŋ gire mot, nio ka gudwogo.
6Kamor won Cekem ocito bot Yakobo ka penyo keny.
7Ka awobe pa Yakobo guwinyo lok meno, gua ki i olet, gudwogo, ci gukeco, kiniga
omakogi, pien otimo gin ma pe myero i Icrael, pi buta ki nya pa Yakobo, pien kit
tim macalo meno pe myero otimme.
8Kamor oloko kwedgi kun waco ni, “Tipo kom woda doŋ omaro nyawu; alegowu,
wuwek en onyom nyawu, obed dakone.
9Wek nyomme obed i kinwa kwedwu; wumi anyirawu botwa, wun bene wunyom
anyirawa, wuter.
10Wun wubibedo kwedwa, wubibedo i lobo-ni macalo wumito; wubed iye wucat
iye wilwu, wek wulim iye lim.”
11Cekem bene owaco kit meno bot won nyako ki omegine, ni, “Ber wujol kennya,
abikelo botwu lim ducu ma wuŋolla.
12Wuŋolla wel lim kit ma wumito ducu ki me ayal, abikolo lim kit ma wubiwacca;
ento wumiya anyom nyako-ni obed dakona.”
13Awobe pa Yakobo gugamo dog Cekem ki wonne Kamor kun gibwologi abwola,
pien oronyo lamingi Dina.
14Guwaco botgi ni, “Pe watwero tiyo iye gin mo, ento miyo laminwa bot dano ma
pe giliro, meno bikelo lewic i komwa.
15Tye yo acel keken; ka otimme, ci miyo waye, en ene: ka wudoko macalo wan, ka
dano acel acel ma laco i kinwu olirre.
16Miyo wan doŋ wabimiyowu anyirawa, ki wan bene doŋ wabinyomo anyirawu;
ci doŋ wabibedo i kinwu macalo wat acel.
17Ento ka pe wuwinyo lokwa, ka wukwero Lirre, ci wakwanyo nyawa, waa,
wacito giwa.”
18Lokgi oyomo cwiny Kamor ki wode Cekem.
19Latin awobi orune ka timo woko cut, pien onoŋo cwinye yom i kom nya pa
Yakobo. Onoŋo yam giwore makato jo ducu ma i ot pa wonne.
20Kit meno Kamor ki wode Cekem gucito i dog gaŋgi, ci guwaco bot jo me gaŋgi
ni,
21“Jo man gimer kwedwa; waweku gin gubed i lobo, gucat wilgi iye; nen, lobo-ni
tye malac ma romogi; wuwek wanyom anyiragi, wek wami gin bene gunyom
anyirawa.
22Tye lok acel ma bimiyo giye bedo i kinwa, en aye bedo wat acel, ka laco acel
acel i kinwa bilirre, kit macalo gin gilirre.
23Pe limgi, ki lonyogi ki lwak lee ma tye i ciŋgi ducu gibidoko limwa? Ber waye
lokgi wek gubed kwedwa.”
24Ci jo ducu ma guwok ki i dog gaŋ guwinyo lok pa Kamor ki wode Cekem; co
ducu ki acel acel gulirre, lwak ducu ma guwok ki i dog gaŋ meno.
25Ka nino okato adek, ma doŋ bur okwok, ci awobe pa Yakobo aryo, Cimeon ki
Levi, omegi Dina, gukwanyo pala lucwan, gucito, guturo ki donyo i gaŋ ma pe
wegine giŋeyo, ci guneko co woko ducu.
26Ka guneko Kamor ki wode Cekem ki pala lucwan, ci gukwanyo Dina woko ki i ot
pa Cekem, gucito kwede.
27Awobe pa Yakobo gucorre i gaŋ pa luto, guyako iye jamigi pi ronyo lamingi.
28Guyako dyegigi ki dyaŋigi, ki lwak kana, ki jami ducu ma tye i gaŋ ki ma tye i
potti bene.
29Guyako lwak lonyogi ducu, ki litinogi ducu ki mon megi, ki jami ma i odigi ducu,
gutero matwal.
30Ci Yakobo owaco bot Cimeon ki Levi ni, “Wun wukelo ayela i koma, wumiyo
nyiŋa odoko ŋwe lituny i kin wegi lobo-ni, Lukanaan ki Luperiji. An lwakka nok
mo, ka ce gucokke kacel me lweny kweda, gibityeka woko liweŋ, an kacel ki oda
ducu.”
31Ento gugamo ni, “Myero doŋ gubed ki laminwa macalo lakwele bo?”

Acakki 35
Lubaŋa omiyo Yakobo gum i Betel
1 Lubaŋa owaco bot Yakobo ni, “A woko icit i Betel, wek ibed kunnu; dok ican
keno tyer kunnu ka ma yam an anen iye boti i kare ma iriŋo ilwi woko ki bot
omeru Ecau.”
2Omiyo Yakobo owaco bot jo ma i ode ki jo ducu ma gibedo bote ni, “Wubol lwak
cal lubaŋa pa lurok ma wutye kwedgi i kinwu-ni, wulonnye kenwu, wulok
ginarukawu;
3ka doŋ waayu, wacitu woko wa i Betel, wek acit acan keno tyer pi Lubaŋa ma
yam ogamo doga i nino ma yam can odiŋani, ma obedo kweda i kabedo ducu ma
awoto iye.”
4Gumiyo ki Yakobo cal ducu, ki agit ma noŋo tye i itgi bene; ci cal lubaŋa pa lurok
ma gitye kwede Yakobo oyikogi piny i te yat kworo ma yam tye cok ki Cekem.
5Ka gitye ka wot, lworo ma oa ki bot Lubaŋa opoto i kom wegi gaŋi ma tye cok
kwedgi, omiyo pe gulubo kor awobe pa Yakobo.
6Yakobo otiro i Luj ma en aye Betel, ma tye i lobo Kanaan, en kacel ki lwak dano
ducu ma yam gitye kwede.
7Ocano keno tyer kunnu, olwoŋo nyiŋ kabedo meno ni El-betel pien onoŋo
Lubaŋa yam onen iye bote i kare ma olwi oriŋo woko ki bot ominne.
8Debola lapidi pa Labeka oto woko, ci giyike i te yat kworo ma i ŋet Betel;
mumiyo nyiŋ kabedo meno gilwoŋo ni Alon-bakut .
9Lubaŋa dok onyutte bot Yakobo i kare ma en oa ki i Paddan-aram, ci omiye gum.
10 Lubaŋa owacce ni, “Nyiŋi Yakobo; pe dok gibilwoŋo nyiŋi ni Yakobo, ento nyiŋi
doŋ bibedo Icrael.” Omiyo nyiŋe odoko Icrael.
11 Lubaŋa dok owacce ni, “An Lubaŋa Matwero-ducu; nywal, inya; rok ki lwak rok
mapol bia i komi, ki luker bene gibia ki i komi.
12Lobo ma yam amiyo ki Abraim ki Icaka abimiyo boti, ka dok abimiyo lobo bot
likwayi ma gibilubi.”
13Lubaŋa ocako a ki i kabedo ka ma yam oloko iye kwede-ni odok malo.
14 Ci Yakobo ocibo wii i kabedo ka ma oloko iye kwede-ni, ocibo iye wir got;
oonyo gityer amata i keme, ka oliyo moo i kome.
15Yakobo ocako nyiŋ kabedo ma Lubaŋa oloko iye kwede-ni ni Betel.
16Gumedde ki wot nia ki i Betel: i kare ma pud Eprat kiborbor, mwoc Ogoyo
Lakeri, ci nyodone obedo tek.
17Ka doŋ nyodone obedo tek, dako lacolo owacce ni, “Pe ilwor; tin doki ibinywalo
latin laco mukene.”
18I kare ma en to ma cwinye cok ka tum, ocako nyiŋ latinne ni. Benoni; ento
wonne ocako nyiŋe ni Benjamin.
19Lakeri oto woko kit meno, ci giyike i yo ma cito Eprat, ma en aye Beterekem.
20Yakobo ocibo wir got i wi lyel pa Lakeri; meno wir lyel pa Lakeri ma pud tye
ocuŋ kunnu nio wa i kare man.
21Icrael omedde ki wotte, ogony i ŋe lubele me Eder ma wiye ocudo malo.
22 I kare ma Icrael tye i lobo meno, ci wode Reuben otimo caro, obuto ki ci-wonne
Bila ma aŋeca; ci wonne owinyo pire bene. Yakobo yam tye ki awobene apar wiye
aryo.
23Litino awobe pa Lea gin aye Reuben, latin kayo pa Yakobo, Cimeon, Levi, Juda,
Icakar ki Jabulon.
24Litino awobe pa Lakeri gin aye Yucepu ki Benjamin.
25Litino awobe pa Bila, aŋeca: pa Lakeri, gin aye Dan ki Naputali.
26Litino awobe pa Jilpa, aŋeca pa Lea, gin aye Gad ki Acer. Meno gin aye litino
awobe pa Yakobo ma ginywalogi i Paddan-aram.
27 Yakobo obino bot wonne Icaka i Mamre, i Kiriat-arba, en aye Kebron ka ma
yam Abraim ki Icaka gubedo iye.
28Icaka yam ori wi lobo mwaka miya acel ki pyeraboro.
29Icaka oomo cwinye me agikkine, oto woko ci odok oto, lutugi, dano muteggi, ma
doŋ oti; ci awobene Ecau ki Yakobo guyiko kome.

Acakki 36
1Man-aye likwayo pa Ecau, en Edom.
2 Ecau onyomo anyira Kanaan: Ada nya pa Elon Lakit, Okolibama nya pa Ana,
wod pa Jibeon Lakiv,
3ki Bacemat nya pa Icmael, lamin Nebayot.
4Ada onywalo ki Ecau Erifaji; Bacemat onywalo Reuel;
5ki Okolibama onywalo Jeuc, Jalam ki Kora; meno aye litino awobe ma ginywalo
ki Ecau i lobo Kanaan.
6Ecau otero monne ki litino awobene ki anyirane, ki lwak jo ducu ma en tye
kwede, ki limme, lee mere ducu ki lonyone ducu ma olimogi ki i lobo Kanaan,
odak kwedgi i lobo mukene kun opokke ki ominne Yakobo.
7Onoŋo gin ducu gitye ki lim madwoŋ, ma pe doŋ romogi bedo kacel: pien lobo
ma onoŋo gibedo iye pe romo me kwayo limgi,
8Omiyo Ecau odak obedo i lobo godi me Ceir; Ecau en aye Edom.
9Likwayo pa Ecau won jo Edom ma i lobo godi me Ceir gin ene.
10Man aye nyiŋ litino awobe pa Ecau: Erifaji wod pa Ada ma, dako pa Ecau, ki
Reuel wod pa Bacemat dako pa Ecau.
11Litino awobe pa Erifaji gin Teman Omar Jepo, Gatam ki Kenaj.
12Timna yam en dako pa Erifaji, wod pa Ecau, ma aŋeca; onywalo Amalek ki
Erifaji. Man gin aye litino awobe pa Ada, dako pa Ecau.
13Man gin aye litino awobe pa Reuel: Nakat, Jera Cama ki Mija. Man aye litino
awobe pa Bacemat dako pa Ecau.
14Man aye litino awobe pa Okolibama nya pa Ana wod pa Jibeon, dako pa Ecau;
onywalo ki Ecau awobe magi: Jeuc, Jalam ki Kora.
15Magi aye litino awobe pa Ecau ma rwodi. Litino awobe pa Erifaji latin ka yo pa
Ecau gin ene: rwot Teman rwot Omar, rwot Jepo, rwot Kenaj:
16rwot Kora, rwot Gatam rwot Amalek; magi aye rwodi pa Erifaji ma i lobo Edom;
gin aye awobe pa Ada.
17Magi aye litino awobe pa Reuel wod pa Ecau: rwot Nakat, rwot Jera rwot Cama
ki rwot Mija; meno aye rwodi pa Reuel ma i lobo Edom; gin aye litino awobe pa
Bacemat, dako pa Ecau.
18Magi aye litino awobe pa Okilibama dako pa Ecau: rwot Jeuc rwot Jalam ki rwot
Kora: meno gin aye rwodi ma Okolibama nya pa Ana, dako pa Ecau, onywalo.
19Gin aye litino awobe pa Ecau, en aye Edom; meno aye gin rwodigi.
20Magi aye awobe pa Ceir Lakori, ma gin wegi lobo-nu: Lotan, Cobal, Jibeon, Ana,
21Dicon, Ejer ki Dican; magi aye rwodi pa jo Kori, litino awobe pa Ceir ma i lobo
Edom.
22Litino awobe pa Lotan gin aye Kori ki Eman; ki lamin Lotan en Timna.
23Magi aye litino awobe pa Cobal: Alvan, Manakat, Ebal, Cepo ki Onam.
24Magi aye litino awobe pa Jibeon: Aiya, ki Ana; en aye Ana ma yam onoŋo waŋ
pii amuro ma tye i tim, i kare ma en tye ka kwayo lwak kana pa wonne Jibeon.
25Magi aye Litino pa Ana: Dicon ki Okolibama, nya pa Ana.
26Magi aye litino awobe pa Dicon: Kemdan, Eciban, Itran ki Keran.
27Magi aye litino awobe pa Ejer: Bilan, Jaavan ki Akan.
28Magi aye litino awobe pa Dican: Uj ki Aran.
29Magi aye rwodi pa jo Kori: rwot Lotan, rwot Cobal, rwot Jibeon, rwot Ana,
30rwot Dicon, rwot Ejer ki rwot Dican; meno aye rwodi pa jo Koti, kit ma calo
kakagi tye kwede i lobo Ceir.
31Magi aye luker ma guloyo lobo Edom, ma onoŋo pud peya kabaka mo oloyo jo
Icrael.
32Bela wod pa Beor onoŋo loyo Edom, nyiŋ gaŋ kalle gilwoŋo ni Dinkaba.
33Ka Bela oto, ci Jobab wod pa Jera me Bojra oleyo ka tyene.
34Ka Jobab oto, ci Kucam mua ki i lobo pa jo Teman oleyo ka tyene.
35Ka Kucam oto, ci Adad wod pa Bedad oleyo ka tyene. En con olwenyo, oloyo jo
Midian ma gitye i lobo Moab; nyiŋ gaŋ kalle gilwoŋo Avit.
36Ka Adad oto ci Camla me Macireka oleyo ka tyene.
37Ka Camla oto, ci Caul me Rekobot ma tye i dog kulu Euprate oleyo ka tyene.
38Ka Caul oto, ci Baal-kanan wod pa Akbor oleyo ka tyene.
39Ka Baal-kanan wod pa Akbor oto, ci Kadar oleyo ka tyene; nyiŋ gaŋ kalle
gilwoŋo Pau. Nyiŋ dakone Meketabel, nya pa Matred, nya pa Mejakab.
40Magi aye nyiŋ rwodi ma tuŋ bot Ecau, macalo doggolagi tye kwede, ki kabedogi,
ma lubo nyiŋgi: rwot Timna, rwot Alva, rwot Jetet,
41rwot Okolibama rwot. Ela rwot Pinon,
42rwot Kenaj, rwot Teman, rwot Mibjar,
43rwot Magdiel ki rwot Iram; magi aye rwodi pa jo Edom, en aye Ecau, ma kwaro
pa jo Edom, kit ma yam gibedo kwede i kabedogi, i lobo ma odoko megi.

Acakki 37
1Yakobo obedo i lobo ma yam koŋ wonne obedo iye-ni, lobo me Kanaan.
2Man aye lok me tekwaro pa Yakobo. Ka Yucepu doŋ ditte oromo mwaka apar
wiye abiro, onoŋo doŋ kwayo lim kacel ki omege; en obedo ki litino awobe pa
Bila ki Jilpa, mon pa wonne; Yucepu okelo lok maraco i komgi bot wongi.
3Yakobo onoŋo maro Yucepu makato litinone ducu pien onoŋo en latin ma
ginywalo ka wi tiyone; okwone kanyi mabor ma bade boco.
4Ento ka omegine guneno ni wongi maro en makato gin ducu, cwinygi ocako
kwere woko, pe gitwero lok kwede maber.
5Ka Yucepu oleko lek, ci otito bot omegine, ci gumedde ameda ki kwere.
6En otito botgi ni, “Koŋ wuwiny kit lek ma aleko-ni:
7nen ba, i kare ma wabedo ka tweyo larita i poto, ci nen, laritana oa malo ocuŋ
atir; ci laritawu gugurre, gurume dyere, ka giryebbe piny bot laritana.”
8Omegine gugamo ni, “In ada ibiloyowa? In aye doŋ ibiloyo wiwa?” Gumedde ki
kwere doŋ marac pi lekke ki pi lokke.
9Dok oleko lek mukene, dok otito ki omegine aye, kun wacci, “Nenu ba, dok aleko
lek mukene aye. Nen, ceŋ ki dwe ki lakalatwe apar wiye acel gubedo ka ryebbe
piny i nyima.”
10Ka otito bot wonne ki bot omegine, wonne ocoke, ojuke matek, kun wacce ni,
“Meno kit lek aŋo ma ileko kumene-ni? An ki meni ki omegini wabibino, ci
wapoto waryebbe piny i nyimi ada?”
11 Nyeko omako omegine i kome ento wonne okano lok meno i cwinye.
Gicato Yucepu i Ejipt
12Ka omegine gucito ka kwayo lim pa wongi ma cok ki Cekem,
13ci Icrael owaco bot Yucepu ni, “Omegini pe gitye ka kwat i ŋet Cekem? Bin wek
aori icit botgi.” En ogamo doge ni, “An a ene”.
14Ci owacce ni, “Koŋ, icinen ka omegini gitye maber, kacel ki lim bene, ka
idwokka lok doki.” Ka ocwale nia ki i nota me Kebron, ci ocito wa i Cekem.
15Laco mo onoŋe ka woto juŋŋe atata i olet; laco meno openye ni, “In ibeyenyo
aŋo?”
16En ogamo ni, “Abeyenyo omegina. Alegi ititta ka ma gitye iye ka kwayo limgi.”
17Laco meno owacce ni, “Doŋ gutyeko a woko, pien awinyo ka giwaco ni, ‘Wacitu
wa i Dotan’” Yucepu ocako lubo kor omegine, ka onoŋogi i Dotan.
18Ka gunene ki ka mabor, ma onoŋo peya oo botgi cok, ci guyubo lok i kome me
neke,
19kun giloko kekengi ni, “Lalek eno bino-nu.
20Wubin tin wa neke woko, wek wabole i bur mo kany; ci wabitito ni, ‘ŋuu mo aye
omake, omwode woko’, wek wanen kit ma lekke-nu bicobbe kwede.”
21Reuben owinyo yub meno, ci olare ki i ciŋgi, kun wacci, “Pe wan aye waneke.”
22Reuben owacogi dok ni, “Pe giony remone mo; wubole woko i bur man ma tye i
tim kany, ento pe wuket ciŋwu i kome.” Onoŋo en oyubbe me kwanye woko ki i
ciŋgi pi dwoke bot wonne.
23Ka Yucepu oo bot omegine, ci gupoto i kome, gulunyo boŋo kanyine woko,
kanyi mabor ma bade boco ma onoŋo oruko-ni;
24ci gumake, gutere gubole woko i bur. Bur meno onoŋo pii pe iye.
25Lacen gubedo piny ka cam; ka gutiŋo wangi, ci guneno lwak jo Icmael ma gua i
Gilead, ki lwak kinaga ma gutiŋo yec odok, moo yat too ki murra, ma giwoto
gicito kwede i Ejipt.
26Juda dok owaco ki omegine ni, “Konyo aŋo ka waneko ominwa dok wamuŋo
tone woko?
27Wubin wek wacatu en bot jo Icmael, pe wan aye waneke ki ciŋwa, pien en
ominwa, remowa kikome.” Ci omegine guworo doge.
28 Jo Midian ma lucatwil gubino kenyo; ci guywayo Yucepu woko ki i bur, gucate
woko bot jo Icmael, kun giwile ki cekel me ryal pyeraryo; ci gutero Yucepu wa i
Ejipt.
29Ka Reuben odwogo i dog bur, ci oneno Yucepu doŋ pe i bur, ci cwinye ocwer
ocako yeco boŋone woko.
30Ka odok cen bot omegine, owacogi ni “Awobi-ni doŋ pe do; man abidok kwene
ba?”
31Ka gukwanyo kanyi pa Yucepu, ci guneko dyel, ka guluto kanyi i remo;
32ka gukelo kanyi mabor ma bade boco bot wongi, kun giwaco ni, “Wan wanoŋo
man; koŋ iŋi, ka nyo kanyi pa wodi onyo pe.”
33Ka oŋiyo, ci owacci, “Man kanyi pa woda do; ŋuu doŋ omwode woko do; adada
Yucepu doŋ ŋuu okido woko matitino do.”
34Yakobo bene cwinye ocwer, ocako yeco boŋone, ci otweyo boŋo cola i pyere,
obedo ka koko wode pi kare malac.
35Awobene ducu ki anyirane gua malo gucito ka kweyo cwinye; okwero ni pe
gikwe cwinye, kun wacci, “Aa pe, abilubo kor latinna i lyel ki koko.” Wonne obedo
ka koke kit meno.
36Ci jo Midian gucato Yucepu woko i Ejipt bot Potipar, ladit tic pa Parao, ma loyo
askari Lukur-piny.

Acakki 38
1I kare meno Juda oa woko ki bot omegine, ocito odak bot laco mo ma i Adulam,
ma nyiŋe Kira.
2Juda oneno nya pa Lakanaan mo ma nyiŋe Cua; ci onyomo, ka obedo kwede.
3Ci ogamo ic, onywalo latin laco, wonne ocako nyiŋe Er.
4Dako dok ogamo, onywalo latin laco, ocako nyiŋe Onan.
5Dok ogamo ic aye, onywalo latin laco, ocako nyiŋe Cela, Latin meno en onywalo i
Kejib.
6Juda onyomo nyako ma nyiŋe Tamar ki wode Er ma latin kayone.
7Ento Er latin kayo pa Juda yam onoŋo dano marac i nyim Rwot, ci Rwot oneke
woko.
8Ci Juda owaco bot Onan ni, “Dony i wi ci-omeru, ci ibed kwede macalo won ot,
wek inywal kwede wi omeru.”
9Ento Onan oŋeyo ni litino pe bibedo mere; pi meno ka odonyo i wi ci-ominne, ci
onyeto kodine piny, wek pe enywal kwede wi ominne.
10Gin ma otimo pe oyomo cwiny Rwot, ci oneke woko bene.
11Juda dok owaco bot ci-wode Tamar ni, “Koŋ doŋ ibed macalo daa-to i ot pa
woru, nio waŋ ma woda Cela bidoŋo”, pien onoŋo lworo ni gwok bito woko,
macalo omegine. Kit meno Tamar odok obedo i ot pa wonne.
12Ka kare okato, ci dako pa Juda ma nya pa Cua-ni oto woko. Ka cwiny Juda doŋ
opye, ci ocito i Timna bor luŋol yer romine, onywako yo ki lareme Kira ma Laadulam.
13Ka gitito bot Tamar ni, “Kwaru okato obecito i Timna ka ŋolo yer rom ine”,
14ci olunyo boŋo cola me dalako woko, ka oumme ki kitambara, odwalo ki kome
woko ducu, ka ocito obedo kwede i dogcel me Enaim, ma okemo yo me Timna;
pien onoŋo oneno ni kadi bed Cela doŋ oteggi, ento peya gimiye ni olake.
15Ka Juda onene, ci otamo ni gwok dako lakwele mo, pien onoŋo en oumo waŋe
woko ducu.
16Ka ocito bote ka ma obedo iye i ŋet yo, owacce ni, “Bin wek abed kwedi,” kun pe
ŋeyo ni ci-wode. En ogamo ni, “Ibimiya gin aŋo kono, ka wek ibin ibed kweda?”
17En odok iye ni, “Abikwanyo latin dyel ki i kin dyegina, acwalli.” Dako-nu ogamo
ni, “Ibijeŋo gin aŋo bota, ka doŋ ibicwalla?”
18Ogamo ni, “In imito ajeŋŋi gin aŋo?” En odok iye ni, “Agit meri, ki tolli, ki odooni
ma tye i ciŋi-ni.” Ci otiŋo omiyogi ducu bote, ka odonyo obedo kwede, ci dako-nu
oyac kwede.
19Dako oa okato ocito gire woko, olunyo boŋo kitambara ma oumme kwede-ni,
ka doŋ oruko boŋo cola me dalako.
20Ka Juda ocwalo La-adulam ma lareme pi terre latin dyel, wek odwokke jami ma
yam ojeŋo bot dako-nu, pe omedo ki noŋo kome.
21Obedo ka penyo jo ma i kabedo-nu ni, “Dako mo ma lakwele-ni tye kwene, ma
onoŋo yam bedo i ŋet yo Enaim?” Guwacce ni, “Lakwele mo pe obedo kany.”
22Ka odok cen bot Juda, ci owacce ni, “Pe amedo ki noŋo dako-nu; ki jo ma i
kabedo meno bene guwacci, ‘Lakwele mo pe yam obedo kunnu.’ “
23Juda ogamo ni, “Wek doŋ oter jami-nu obed mere, giwek nyerowa; nen, acwalo
latin dyel man, ci noŋo kome aye oloyi.”
24Ka dwe adek okato, ci gitito ki Juda ni, “Ci-wodi Tamar obedo ka timme kwele
kwele, ci doŋ oyac woko ki tim kwelene-ni.” Juda owacci, “Wukele woko, wek
giwaŋe woko.”
25Ka gitye ka kele woko, ci en ocwalo lok bot kwarone, ni “Won jami man en aye
ayac kwede.” Dok onwoyo aye ni, “Alegi ni iŋigi. Agit, ki tol ki odoo-nu jami pa
aŋa kaa?”
26Juda oŋiyogi, ci otuco kun waco ni, “Dako man kite atir makata woko, pien pe
amedo ki miyo en bot woda Cela.” Pe bene omedo ki bedo kwede.
27Ka kare me gonnyene oromo, ci onen ni litino rudi tye i iye.
28Ka mwoc doŋ ogoye, latin ocwalo ciŋe woko, ci lacolo otweyo uci makwar i
ciŋe, kun wacci, “Man aye okwoŋo katti woko.”
29Ka doŋ oŋunyo ciŋe, odwoko cen, nen, ominne aye dok okatti woko, ci dako-nu
owacci, “In doŋ ituro ki baro dye ic, ikatti woko niŋniŋ?” Mumiyo gicako nyiŋe
Perej .
30Ka lacen ominne dok ginywalo kun uci makwar tye i ciŋe; ci gicako nyiŋe jera.

Acakki 39
1Gitero Yucepu woko i Ejipt, ci Potipar ladit tic pa Parao, ma loyo askari lukurpiny, ma Laejipt, owilo en woko ki bot jo Icmael ma gutere kunnu-ni.
2 Rwot yam tye ki Yucepu, ci odoko lakomegum; ocako bedo gire i ot pa laditte
ma Laejipt;
3ci laditte bene oneno ni Rwot tye kwede, pien Rwot omiyo gin ducu ma en tiyo
bedo maber.
4Cwiny Potipar obedo, yom i kom Yucepu, ci odoko laticce. Ocako kete obedo
ladit ma loyo ode ki jamine ducu.
5Nia i kare meno ma okete obedo ladit ma loyo ode, ki lalo jamine ducu, Rwot
ocako miyo gum obedo i ot pa Laejipt meno pi Yucepu; gum pa Rwot opoto i kom
jami ma yam tyekwede ducu, ma i ot ki ma i poto-gu.
6Ci Potipar omiyo jami ducu i te loc pa Yucepu; pi bedo kwede omiyo doŋ pe paro
gin mo, kono pi cam keken ma en camo-ni. Onoŋo Yucepu nen mabulobulo, dok
mwonya matek.
7Lacen dako pa laditte cwinye ocako pyette i kom Yucepu, ci owacce ni, “Wabut
kwedi.”
8Ento en okwero woko, ci owaco bot ci-laditte ni, “Nen ba, pi bedona kany omiyo
laditta pe doŋ paro pi gin mo ma tye i ot-ti, dok otyeko keto gin ducu ma etye
kwede i ciŋa.
9En pe doŋ tye ki dit makato an i ot man, pe tye gin mo ma dok okano ma peya
omiyo i ciŋa, kono in keken, pien in i dakone. An dok acorre ka tiyo bal madit
marac kuman niŋniŋ, kun atimo wa bal i kom Lubaŋa kulu?”
10Kadi bed dako meno obedo ka bito Yucepu jwijwi, pe omedo ki winyo lokke, pe
oye buto kwede, kadi bedo kwede.
11Ento ka nino mo acel owec, ma, onoŋo laco mo pe i ot, ka Yucepu odonyo i ot ka
tiyo ticce,
12ci dako-nu omake ki boŋone, kun wacci, “But kweda.” Ento Yucepu omwomme
oweko boŋone i ciŋe, okato gire woko ki i ot.
13Ka dako-nu oneno en oweko boŋone i ciŋe, omwomme gire oka-to woko ki i ot,
14ci olwoŋo co ma gibedo i ode, ci otittigi ni, “Nenu, ladit-ti okelo Laibru-ni kany
me nywarowa; obino bota i ot ni ebut kweda kulu, ci atokke adaŋŋe ki koko
matek.
15Ka oneno ni atiŋo dwana malo kun agorre matek ki koko, ci otenyo ginarukane
bota, ci omwomme oka-to woko ki i ot.”
16Ci opyelo boŋone ka ŋete nio ka won ot odwogo paco.
17Otitte kit lok acel-lu, kun waco ni, “Opii Laibru-ni ma ikelo i kinwa obino bota i
ot ka nywara;
18ento ka atiŋo dwana oyotoyot kun adaŋŋe, ci oweko ginarukane bota,
omwomme gire woko ki i ot.”
19Ka Potipar owinyo lok ma dakone olokke, ni, “Man en aye kit ma opiini otima
kwede”, ci kiniga omake matek mada.
20Ocako mako Yucepu, oketo i mabuc, i kabedo ma gitweyo iye lumabuc pa
kabaka, ci obedo i mabuc kunnu.
21 Ento Rwot onoŋo tye ki Yucepu, ci onyutte mar mere ma pe lokke, ci omiyo en
oyomo cwiny lagwok ot mabuc.
22Lagwok mabuc omiyo twer ki Yucepu me gwoko lumabuc ducu ma gitye i
mabuc; gin ducu ma gitiyo kunnu, en aye loyo.
23Lagwok ot mabuc pe doŋ tamo pi gin mo ma oketo i ciŋ Yucepu, pien onoŋo
Rwot tye kwede; gin ducu ma en tiyo, Rwot omiyo iye gum.

Acakki 40
1Ka kare okato, latyer koŋo vino pa kabaka me Ejipt ki lated mugatine gubalo i
nyime.
2Kiniga omako Parao i kom ludito ticce aryo-nu, ladit latyer koŋo vino ki ladit me
tedo mugati,
3ci oketogi i ot pa ladit ma loyo askari lukur-piny po gwokogi, i ot mabuc ma
Yucepu bene gitweye iye-ni.
4Ladit ma loyo askari lukur-piny oketogi i ciŋ Yucepu, en okurogi; ka gitweyogi i
ot kol kare mo.
5Ci guleko lek i nino acel, latyer koŋo vino ki lated mugati pa kabaka me Ejipt, ma
gitweyogi i ot mabuc; ŋat acel acel oleko gire lekke, kun lek acel acel tye ki tyen
lokke.
6Ka Yucepu obino botgi odiko, ci onenogi kun gitye ki cwercwiny.
7Ci openyo ludito tic aryo pa Parao ma gitye kwede i ot kol i ot pa laditte, ni, “Tin
waŋwu oballe woko piŋo?”
8Gugamo ni, “Tin waleko lek, ci pe tye dano mo ma gonyowa te lekke.” Yucepu
owacogi ni, “Pe Lubaŋa gire aye lagony tere? Koŋ wutitta lekke mono.”
9Ci latyer koŋo vino ocako tito lekke bot Yucepu, kun wacce ni, “I waŋ lekka
onoŋo olok tye i nyima,
10olok onoŋo tye ki jaŋe adek; ka pud oluro me keto: ture, ci onyak, olugo ocek
woko.
11Ka amako kikopo pa Parao i ciŋa, ci aŋolo nyige, abiyo i kikopo, ka amiyo
kikopo i ciŋ Parao.”
12Yucepu ogamo, owacce ni, “Man aye te lekke: jaŋe adek-ki, meno nino adek;
13i nino me adekke Parao bitiŋi ci dwoki i dog ticci, ci dok ibimiyo kikopo pa
Parao i ciŋe kit macon ca, kit macalo con i kare ma in latyer koŋo vinone.
14Ento ber ipo pira ka doŋ idok i dog ticci; alegi ni in bene itima ber do, itit pira
bot Parao, wek gigonya woko ki i ot man.
15Pien yam gikwala akwala ki i lobo pa jo Ibru; man bene dok giketa kany i ot kol
noŋo ma pe abalo gin mo.”
16Ka ladit me tedo mugati oneno ni gigonyo te lek maber, en owaco ki Yucepu ni,
“An bene onoŋo aleko lekka: onoŋo adodo aduku adek i wiya.
17I aduku mamalone ca onoŋo tye iye lwak kit gin ma gitedo ducu pi Parao, ento
winyo obedo ka camogi woko ki i aduku ma tye i wiya-ni.”
18Yucepu ogamo ni, “Man aye te lekke: aduku adek en aye nino adek;
19i nino me adekke Parao bitiŋi malo, ci biŋabi i kom yat, ka winyo gibicamo riŋo
komi woko.”
20Ka nino adek oromo, en aye nino ma ginywalo iye Parao, ci otedo karama ki
luticce ducu, ci Parao okelo ladit latyer kono yino kacel ki ladit lated mugati i
nyim luticce.
21Odwoko ladit latyer koŋo vino i dog ticce me tyero koŋo vino, ci otiŋo kikopo
pa Parao omiyo i ciŋe;
22ento oŋabo: ladit lated mugati malo i kom yat kit ma nene Yucepu ogonyo
kwede te lekgi.
23Ento ladit latyer koŋo vino pe omedo ki po pi Yucepu, wiye owil woko i kome
matwal.

Acakki 41
1Ka mwaka okato aryo kulu, Parao oleko lek ni onoŋo ecuŋ i ŋet kulu Nail,
2ci nen, dyaŋi abiro ma komgi pilpil ma gucwe, gubedo ka camo lum tiro.
3Dyaŋi mukene abiro dok gukatti woko ki i kulu Nail ma komgi omok, gujony
woko liŋok, ma gulubo korgi, ka gucuŋ ka ŋet dyaŋi meno, ma gitye i ŋet kulu
Nail.
4Dyaŋi ma komgi omok, ma gujony woko liŋok-ki gucamo dyaŋi ma komgi pilpil
mucwe-ni woko. Ci Parao oco woko ki i waŋ nino.
5Ka dok onino, ci dok oleko lek mukene me aryone, oneno wit kal abiro ma ocek
oluŋŋe, mabeco, ma gujany i kom tyen kai acel.
6Dok i ŋegi oneno wit kal abiro ma gulot gujany ma walgi atati, ma gubwarre
woko pi yamo malyet mua ki tuŋ wokceŋ.
7Ci wite abiro ma waŋgi atati-ni gumwonyo wit kal ma ocek oluŋŋe, ma waŋgi
ŋaraŋara-ni woko. Ka Parao dok oco woko ki i waŋ nino, onoŋo ni dok eleko lek
aye.
8Cwinye obedo ka cwer odiko con; ci ocwalo kwena olwoŋo lutyet ki luryeko ma i
Ejipt ducu. Parao otitogi lekke, ento ŋat mo pe onen ma otwero gonyo ki Parao te
lekke.
9Ladit latyer koŋo vino owaco ki Parao ni, “Apo rocca tin.
10I kare ma Parao okeco i kom luticce, ci otweya i ot kol kacel ki ladit lated mugati
i ot pa ladit ma loyo askari lukur-piny,
11wan ducu waleko lek i dyewor acel-lu, en ki an, waleko lek ma tyen lokgi
patpat.
12Latin Ibru mo onoŋo tye kwedwa, ma obedo latic pa ladit ma loyo askari lukurpiny. Ka yam watitte, ci ogonyowa te lekwa, kun gonyo te lek pa ŋat acel acel kit
ma lekke tye kwede.
13Kit ma en ogonyo te Lekwa, ci otimme kumeno; an gidwoka i dog ticca, ento
lated mugati giŋabo malo i kom yat.”
14Ci Parao ocwalo kwena gilwoŋo Yucepu, gikelo woko aruya ki i ot kol; olyelo
wiye, ka oloko boŋone, ci ocito odonyo bot Parao.
15Parao owaco bot Yucepu ni, “An onoŋo aleko lek, ento ŋatti mo pe onoŋŋe ma
twero gonnya te lekke; abedo ka winyo ka giloko i komi ni ka iwinyo lek mo, ci
itwero gonyo tere.”
16Yucepu ogamo dog Parao ni, “Meno pe a ki i iya; Lubaŋa aye bidok iye ki Parao
lok me kuc.”
17Ci Parao owaco bot Yucepu ni, “Nen, iwaŋ lekka onoŋo acuŋ i ŋet kulu Nail;
18ci dyaŋi abiro mucwe ma komgi pilpil gukatti woko ki i kulu Nail, gubedo ka
camo lum tiro.
19Ka dok dyaŋi mukene abiro bene gukatti woko gulubo korgi ima gigoro, komgi
omok ma gujony woko liŋok, kit ma yam peya aneno i lobo me Ejipt ducu.
20Ci dyaŋi ma komgi omok ma gujony woko liŋok-ki gucamo dyaŋi abiro mucweni woko;
21ento kadi bed gucamogi woko, pe nene ni gucamogi, pien onoŋo pud gujony
woko liŋok ma rom aroma ki kit ma nene gitye kwede. Ci aco woko ki iwaŋ nino.
22Dok aneno ki i waŋ Lekka wit kal abiro ma gujany i kom tyen kal acel, ma wangi
ŋaraŋara mabeco;
23ka dok wite abiro muner ma wangi atati, ma gubwarre woko pi yamo malyet
mua i tuŋ wokceŋ, gulot gudoŋo i ŋegi;
24ci wite ma waŋgi atati-ni gumwonyo wite abiro mabeco-ni. Ci atito bot lutyet,
ento pe tye ŋatti mo ma twero gonnya tere.”
25Yucepu ogamo dog Parao owaco ni, “Lek pa Parao en lek acel; Lubaŋa doŋ
onyuto ki Parao gin ma en bitiyo.
26Dyaŋi abiro mabeco-ni nyuto mwaka abiro, ki wit kal abiro mabeco bene nyuto
mwaka abiro; lek aryo-nu te lokgi acel.
27Dyaŋi ma komgi otuk, ma gujony woko liŋok-ki ma dok gukatti woko gulubo
korgi-ni, ki wit kal abiro mubwarre woko pi yamo malyet mua i tuŋ wokceŋ ca,
meno nyuto mwaka abiro me kec.
28Tye kit macalo doŋ atito ki Parao, Lubaŋa onyuto ki Parao gin ma en bitiyo.
29Mwaka abiro bibedo ma cam bicek madwoŋ twatwal i lobo ducu me Ejipt,
30ento i ŋegi dok bibino mwaka abiro me kec, ma wi dano biwil woko i lwak
camgi ma guceko i lobo Ejipt. Kec bineko lobo woko libok;
31ki lonyo cam madwoŋ-ŋi pe biŋene ni yam tye i lobo pi lok pa kec ma bilubone,
pien kec meno bibedo gwa matek.
32Lek pa Parao mudodde aryo-ni nyuto ni lok man Lubaŋa aye omoko, dok
bimiyo timme i kare ma cok-ki.
33“Mumiyo i kare man myero Parao oyer dano ma nen kwiri, maryek, ci oket en
olo lobo Ejipt ducu.
34Dok ber Parao omedde ka keto ludito ma guloyo lobo, wek gubed ka jogo dul
acel me abic me cam ma ocek i lobo Ejipt i kin mwaka abiro ma piny ocek-ki.
35Gin gubed ka guro cam ma ocek i mwaka mabeco ma cam bicek iye-ni, wek
gigwok kal i te twero pa Parao, gikan me agwoka i gaŋi ducu.
36Cam meno obed dero kec me agwoka ma gigwoko i lobo Ejipt pi kec ma bipoto
mwaka abiro, wek kec pe onek lobo.”
Yucepu odoko lalo lobo Ejipt
37Tam man Parao oneno ni ber, kacel ki luticce ducu.
38Parao owaco ki luticce ni, “Watwero noŋo dano mukene macalo man, ma Cwiny
pa Lubaŋa tye kwede bene?”
39Ci Parao owaco bot Yucepu ni, “Macalo Lubaŋa doŋ otyeko nyutti man ducu-ni,
pi meno pe doŋ tye dano mo ma nen kwiri, maryek macalo in.
40 In aye doŋ ibiloyo oda, ki lwakka ducu gibitiyo kun gilubo gin ma iciko; kono
nyo lok ma dok i kom komker keken, en aye bimiyo abedo dit makati.”
41Parao dok owaco bot Yucepu ni, “Nen, doŋ atyeko keti me loyo lobo Ejipt ducu.”
42 Ci Parao okwanyo agitte ma olunyo ki i ciŋe, orwako i ciŋ Yucepu, dok oruke ki
ginaruka me boŋo camanini maber, ka dok obolo nyor jabu i ŋute;
43ka omiyo en oriŋo ki gadigadine me aryone, kun dano gidaŋŋe i nyime ni,
“Rumu coŋwu!” Ci oketo en me loyo lobo Ejipt ducu kit meno.
44Parao dok omedde lok ki Yucepu kun wacce ni, “An Parao; ka in pe iye, ci pe
bibedo ŋatti mo ma bitiŋo ciŋe kadi tyene i lobo ducu me Ejipt.”
45Ci Parao ocako nyiŋ Yucepu ni Japenat-panea; ci omiye Acenaci nya pa Potipera
ajwaka me On me bedo dakone. Ci Yucepu ocako wot orumo lobo Ejipt ducu.
46Yucepu onoŋo doŋ mwaka me ditte romo pyeradek i kare ma donyo i tic pa
Parao kabaka me Ejipt. Yucepu okato woko ki i nyim Parao, ci owoto orumo lobo
Ejipt ducu.
47Cam ocek i lobo madwoŋ twatwal otyeko mwaka abiro,
48ci ocoko cam ducu ma ocek i mwaka abiro-ni i kare ma lobo Ejipt oceko cam
madwoŋ, ci okano cam i dero kec i gaŋi ducu; i gaŋ acel acel en okano cam mua i
potti murumo kenyo.
49Yucepu okano lwak cam madwoŋ i dero kec; cam obedo dwoŋ ma rom ki
kweyo ma i dog nam, nio ka oweko pimone pien pe twero pimme.
50Ma mwaka kec peya oromo, onoŋo Yucepu doŋ tye ki litino awobe aryo, ma
Acenaci nya pa Potipera ajwaka me On onywalo kwede.
51Yucepu ocako nyiŋ latin kayone ni Manace, kun wacci, “Pien Lubaŋa doŋ omiyo
wiya owil woko ki i kom aromana ducu ki i kom jo ducu me ot pa wora.”
52Nyiŋ latin me aryone ocako ni Epraim, ni, “Pien Lubaŋa omiya anywal i lobo ma
abedo iye ki aroma.”
53Ka mwaka abiro ma cam obedo ka cek iye madwoŋ twatwal i lobo Ejipt doŋ
ogik,
54 ci mwaka abiro me kec ocakke, kit ma yam Yucepu owaconi. Kec opoto i lobo
ducu; ento i lobo Ejipt ducu onoŋo cam tye.
55 Ka cam doŋ otum woko i lobo Ejipt ducu pi kec mupoto, dano gucako koko pi
cam bot Parao; ci Parao owaco bot jo Ejipt ducu ni, “Wucit bot Yucepu wutim gin
ma owacciwu.”
56Ka kec opoto oromo lobo Ejipt ducu, ci Yucepu ocako yabo dog dero kec ducu,
ocato cam bot jo Ejipt, pien onoŋo kec doŋ lyet twatwal i lobo Ejipt.
57Lobo ducu gucako mol i Ejipt bot Yucepu ka wilo kal, pien onoŋo kec doŋ lyet
twatwal i wi lobo ducu.

Acakki 42
1Ka Yakobo owinyo ni kal tye i Ejipt, owaco bot awobene ni, “Piŋo wubedo ka
nenne anena?”
2 Ka owaco botgi ni, “Nen, an awinyo ni kal tye i Ejipt; wucit wuwilliwa kai kunnu,
wek wabedu kwo, pe wato ki kec.”
3Mumiyo omegi Yucepu apar gucito i Ejipt ka wilo kal.
4Ento Yakobo pe ocwalo Benjamin, omin Yucepu, kacel ki omegine ca, pien obedo
ka lworo ni gwok dok gibitime rac bene.
5Kit meno awobe pa Icrael gucito ka wil i kin jo mukene ma gicito kunnu, pien
onoŋo kec oromo lobo Kanaan ducu.
6I kare meno onoŋo Yucepu odoko laloyo maber i lobo Ejipt; en obedo ka cato kal
bot lwak me lobo meno. Ci omegi Yucepu bene gubino, gupoto piny aryeba cwiny
i nyime, kun gukulo wangi i ŋom.
7Ka Yucepu oneno omegine, ci oŋeyogi cut, ento obedo gwa i komgi, macalo gin
Lurok ata, kun gerre agera ni, “Wun wua ki kwene?” Gugamo ni, “Waa ki i lobo
Kanaan, wabino ka wilo cam.”
8Kit-meno Yucepu oŋeyo omegine, ento gin pe gumedo ki ŋeye.
9Yucepu ocako po lek ma yam oleko i komgi-ni; dok owaccigi ni, “Wun lurot piny
do, wun wubino ka neno lobo-ni ka kabedo mo tye noŋo.”
10Gugamo ni, “Pe kumeno Laditwa, wan luticci wabino giwa ka wilo cam.
11Wan ducu awobe pa ŋat acel, wan jo ma iwa leŋ, wan pe lurot piny.”
12Owaccigi ni, “Pe ya, wun wubino mewu ka neno kabedo mo ma tye nono.”
13Gugamo dok ni, “Wan ducu wan omego apar wiye aryo, ma awobe pa laco acel
ma tye i lobo Kanaan; ci ominwa matidine odoŋ bot wonwa, ki acel aye doŋ pe.”
14Yucepu owaco ki gin ni, “Doŋ kara tye kit ma awacowu, ni wun lurot piny.
15Pi lok meno, wun doŋ gibinenowu maber kit man: macalo Parao tye makwo-ni,
wun pe doŋ wubia woko i kabedo-ni, ka ominwu matidi-ni pe obino kany.
16Wucwal ŋat acel i kinwu, wek en ocikel ominwu, kun noŋo wun pud wudoŋ
kany i mabuc, wek lokwu koŋ ginen maber, ka wun wutye ki ada i iwu. Ka pe,
macalo Parao tye makwo-ni, wun lurot piny i ada.”
17Ci oketogi ducu i mabuc pi nino adek.
18Ka nino adek oromo, ci Yucepu owaco botgi ni, “Wutim kit man ci wubikwo,
pien alworo Lubaŋa:
19ka wun jo ma iwu leŋ, wuwek ŋat acel aye gitwe odoŋ i mabuc, wek jo mukene
gucit paco guter kal ki jo ma paco pi larogi ki kec,
20ka wucikel ominwu matidi-ni bota; miyo binen ni lokwu doŋ tye ada, ci pe
wubito.” Ci gutimo kit meno.
21Gucako lok gigi kekengi ni, “I adane, wan woroco i kom ominwa, pien waneno
cwercwinye, ka yam bako doge botwa, ci pe wamedo ki winyone; mumiyo tin can
man opoto i komwa bene.”
22 Reuben owacogi ni, “Yam pe atittiwu ni pe wutim bal mo i kom latin ca? Ento
wun pe wumedo ki winyo, en aye mumiyo gipido pi remone i komwa-ni.”
23Pe gumedo ki niaŋ ni Yucepu winyo lokgi-ni, pien onoŋo Iadum aye tye i kingi.
24Ka oa woko ki botgi ci ocako koko; ka odok botgi obedo ka lok kwedgi. Omako
25Yucepu ociko ni doŋ gipik kal opoŋ kicaa megi, ka dok gidwok lim pa dano acel
acel gipik i kicaane, dok gumi botgi peke me wotgi. Man ducu gitimo botgi.
26Ka gutweyo kal i ŋe kanagi, ci gucako wot.
27Ka ŋat acel oyabo dog kicaane i kabedo ma gibuto iye-ni, wek emi cam ki
kanane, ci oneno lim giketo i dog kicaane.
28Ocako waco ki omegine ni, “Limma gidwoko kakare. Nen, tye i kicaana ene.” Ka
guwinyo, ci cwinygi opoto nirim, gubedo ka cabbe kekengi ki myelkom kun
giwaco ni, “Lubaŋa timowa kuman piŋo?”
29Ka gudwogo bot wongi Yakobo i lobo Kanaan, gutitte gin ducu ma otimme i
komgi, kun giwaco ni,
30“Dano ma ladit me lobo-nu obedo ka lok ki gero i komwa, olokowa wadoko
lurot piny.
31Ento wan watitte ni, ‘Wan jo ma iwa leŋ, wan pe lurot piny.
32Wan omego apar wiye aryo ma wonwa acel. Ominwa acel aye doŋ pe, ki acel
matidine tye odoŋ bot wonwa i lobo Kanaan.’
33Ci dano meno, ladit me lobo-nu, owaco botwa ni, ‘Man aye miyo abiniaŋ ni wun
jo ma iwu leŋ: wuwek ominwu acel odoŋ bota, wuter kal me laro kec i pacowu,
wek wuciti.
34Wucikel ominwu matidini bota, ci doŋ abiŋeyo ni wun pe lurot piny, ento wun
jo ma iwu leŋ, ci doŋ abimiyo ominwu i ciŋwu, dok wubicato wil i lobo-ni.’ ”
35Ka gitye ka onyo kal ma i kicaa megi, ci dano acel acel onoŋo lim ma nene oboyo
tye i kicaane. Ka gin ki wongi guneno lim ma giboyo, ci lworo omakogi matek.
36Wongi Yakobo owaco ni, “Wutyeko litinona woko do. Yucepu doŋ pe, Cimeon
bene doŋ pe, dok wumito tero Benjamin; man ducu canne poto i wiya.”
37Reuben ocako waco bot wonne ni, “Ibineko litino awobena aryo-ni ducu ka
ineno pe adwoko en paco boti. Miya acit kwede, ci abikelo en paco boti.”
38Ento en ogamo, okwero woko ni, “Woda pe bicito kwedwu kunnu, pien ominne
doŋ oto mere woko, en kene aye odoŋ. Ka gin marac dok otimme i kome i wotwuni, ci wubitero lwar wiya i lyel ki cwercwiny.”

Acakki 43
2dok kal ma gikelo ki i Ejipt doŋ gucamo otum woko, wongi owaco botgi ni,
“Wudok kunnu, wuciwil ki wan cam mo manok.”
3Juda ogamo doge ni, “Dano ca ocikowa matek kun waco ni, ‘Pe wubineno waŋa
ka ominwu pe i kinwu.’
4Ka icwalo ominwa owoto kwedwa, ci wabicito kunnu ka willi cam;
5ento ka pe icwalo en, pe wabicito kunnu, pien dano ca owacowa ni, ‘Pe
wubineno waŋa ka ominwu pe i kinwu.’ “
6Icrael owacci, “Piŋo wutima marac kuman? Piŋo dok wutito ki dano ca ni wutye
ki ominwu mukene?”
7Gudok iye ni, “Dano ca openyowa ki lwak peny mapol i komwa ki i kom kakawa,
kun waco ni, ‘Wonwu pud tye makwo? Ominwu mukene tye?’ Wan wadok iye i
kom gin ma openyo; wan onoŋo watwero ŋeyo niŋniŋ ni en biwacci, ‘Wukel
ominwu kany’?”
8Juda owaco bot wonne Icrael ni, “Mi latin i ciŋa, cwale wawot kwede, ci wabia
wacito, wek wabed kwo, pe wato, wan kacel ki in ki litinowa bene.
9An abicuŋ pire; ibipenya pire. Ka ce pe abikelo en boti i kare ma adwogo, akete i
nyimi, ci wek an aye abed won alii matwal;
10pien ka nene pe wagalle, kono man doŋ wawirre kunnu kiryo.”
11Ci wongi Icrael dokowaco botgi ni, “Ka doŋ myero obed kumeno ba, doŋ wutim
kit man: wuter nyig yadi mogo ma wuyero me lobo-ni i kicaawu, wuter mot ki
dano-nu, moo makur manok ki moo kic, odok yat ki murra, nyig otitimo ki yaa.
12Dok wuter lim ma romo culo wil tyen aryo; wutiŋ lim ma nene gidwoko giketo i
dog kicaawuni; gwok nyo yam wigi owil awila.
13Wuter ki ominwu, wek wua, wucit dok bot dano-nu;
14ber Lubaŋa Matwero-ducu aye omi kica omak dano-nu i komwu, wek ocwal
ominwu mukene ca ki Benjamin. Ka gityeko litinona woko, doŋ gityeka arumo
do!”
15Ci gutero mot, ki wel lim ma dodo tyen aryo, kacel ki Benjamin; gua gucito i
Ejipt, gucuŋ i nyim Yucepu.
16Ka Yucepu oneno ni Benjamin tye i kingi, ci owaco bot lakan jamine me ot ni,
“Kel jo-nu i ot, ka inek riŋo iyubi, pien gin koni gibicam kweda dyeceŋ.”
17Dano meno otiyo kit ma Yucepu ocike, okelo jo-nu i ot pa Yucepu.
18Lworo omako omegine ka giterogi i ot pa Yucepu, guwaco ni, “Man pi lok me
lim, ma nene gidwoko giketo i dog kicaawa i kare mukwoŋo ca. Mumiyo gikelowa 
i ot-ti, wek enoŋ lok i komwa, emakwa, wek wadok opiine, ka dok ema lwak
kanawa woko.”
19Pi meno gucito bot lakan jami me ot pa Yucepu, guloko kwede ki i doggola,
20guwacce ni, “Laditta, wan wabino kany ka wilo cam i kare mukwoŋo ca;
21ka wao i kabedo ma wabuto iye-ni, wagonyo dog kicaawa, ci wanoŋo lim tye i
dog kicaa pa ŋat acel acel ma i kinwa, limwa ducu onoŋo tye ki berre; en watyeko
dwogo kwedeni,
22ka dok wabino ki lim me wilo cam. Pe waŋeyo ŋat ma oketolimwa i kicaawa.”
23En ogamo ni, “Wuywe ma cwinywu opye mot, pe lworo omakwu. Lubaŋa ma
Lubaŋa pa wonwu en aye gwok nyo okano ki wun lim i kicaawu; an mera agamo
limwu.” Ci ocito okelo Cimeon botgi.
24Dano meno oterogi i ot pa Yucepu, omiyogi pii me lwoko tyengi, ka dok omiyo
cam ki kanagi.
25Guyubo motgi me atyera bot Yucepu ka bidwogo i dyeceŋ, pien guwinyo ni
gibicam kunnu.
26Ka Yucepu odwogo paco, gutero motgi bote i ot, guryebbe piny i nyime.
27Openyogi ka gitye maber, kun waco ni, “Wonwu tye maber, ladit mo muti ma
nene wuloko pire-ni pud tye makwo?”
28Gugamo ni, “Laticci ma wonwa tye maber, pud tye makwo.” Gukulo wigi piny,
guryebbe i nyime.
29Ka otiŋo waŋe malo ci oneno ominne Benjamin, latin pa minne, owacci, “Man
aye ominwu matidi-ni bo, ma nene wutitta pire-ni? Lubaŋa omini gum, latinna!”
30Yucepu okato woko oyot, pien onoŋo cwinye pukke pi ominne, ocito oyenyo ka
ma myero ekok iye. Ci odonyo ka koko i kicikane.
31Ka olwoko waŋe, ci okatti woko kun diyo cwinye, owacci, “Doŋ gitok cam.”
32Gitoko camme kene pat, ki megi bene pat, ki pa Luejipt ma yam gicamo kwedgi
bene pat kakengi, pien Luejipt pe gicamo kacel ki jo Ibru, bedo me kwer ki bot
Luejipt.
33Gubedo piny i nyime, latin kayo macalo dit me anywalline tye kwede ki latin
matidine kit macalo por me tidine tye kwede; ci gucako bedo ka nenne kekengi
kun giuro.
34Gipoko botgi cam kun gitoko a ki i meja pa Yucepu, ento pa Benjamin gipoko
mere ododo pa omegine tyen abic kulu. Kit meno gimato, gibedo kwede ki
yomcwiny.

Acakki 44
1Yucepu ociko lakan jami me ot ni, “Pik cam opoŋ kicaa pa jo-nu, mabup, ma
gitwero tino; dok iket lim pa ŋat acel acel i dog kicaane,
2ci iket kikopona, kikopo ryal-li, i dog kicaa pa latin matidi-ni, kacel ki limme me
wilo kal.” En otimo kit macalo Yucepu owacce.
3Ka piny doŋ oru maleŋ, ci gicwalo jo-nu gukato woko kacel ki kanagi.
4Ka guwoto manok nia ki i gaŋ, Yucepu owaco ki lakan jamine ni, “Doŋ ilub kor
jo-nu; ka imakogi, ci iwac botgi ni, ‘Piŋo wuculo gin maber ki gin marac? Piŋo
wukwalo kikopo ryal mera woko?
5Pe rwoda mato ki kikopo meno? Dok pe en aye tyeto kwede bene? Wutimo rac
mada.’ ”
6Ka omakogi i yo, ci owacogi lok meno.
7Gugamo doge ni, “Lok aŋo mumiyo in laditwa iloko lakit lok meno? Wan luticci
pe myero watim lakit tim macalo meno!
8Nen ba, lim ma nene wanoŋo i dog kicaawa, wadwoko cen boti nia wa ki i lobo
Kanaan; dok wan myero wakwal ryal nyo jabu ki i ot pa laditwa niŋniŋ?
9Ka ce gibinoŋo tye bot ŋat mo i kinwa, wek en aye oto, wan bene wabibedo
opiini laditwa.”
10En ogamo ni, “Wuwek koŋ doŋ obed kit ma wuwaco-ni: ŋat ma gibinoŋo kikopo
bote aye bibedo opiina, jo mukene bal bibedo pe i komgi.”
11Ŋat acel acel ocako cibo yecce piny oyotoyot, ŋat acel acel oyabo dog kicaane.
12Ka oyenyo dog kicaa nia ki kom pa ladit nio wa kom latin, ci ginoŋo kikopo i
dog kicaa pa Benjamin.
13Gucako yeco boŋŋigi pi cwercwiny, gin ducu gutweyo yec i ŋe kanagi, gudok i
gaŋ.
14Ka Juda ki omegine gudok i ot pa Yucepu, gunoŋo en pud tye kenyo; gupoto,
guryebbe piny i nyime.
15Yucepu owacogi ni, “Wun wutimo kit tim macalo man piŋo ce? Wun pe wuŋeyo
ni dano macalo an-ni ŋeyo tyet?”
16Juda ogamo kun waco ni, “Wan wabidok iye lok aŋo, ladit? Wabigamo lok aŋo
kono? Wabikwanyo bal i komwa kekenwa niŋniŋ? Lubaŋa otyeko noŋo bal i
komwa; nen, wan wadoko opiini, laditwa, wan ducu kacel ki ŋat ma ginoŋo
kikopo bote-ni.”
17Ento en ogamo ni, “An pe atwero timo kit eno! Ento ŋat ma ginoŋo kikopo boteni, aye bibedo opiina; ento ki tuŋ botwu wun wudok mewu bot wonwu ki kuc.”
18Juda ocako cito bote, owacce ni, “Alegi laditta, wek an alok lok mo kwedi, pe
iwek kinigani obed Lyet i koma, pien in irom ki Parao kikome.
19Ladit, in yam ipenyowa ni, ‘Wun wutye ki wonwu, onyo omegiwu?’
20Wan wagamo dogi ni, ‘Watye ki wonwa, dano muti doŋ, ki ominwa matidine
latin me tiyone. Ominne aye oto woko, en aye odoŋ latin acel i kor minne; wonne
bene maro en.’
21Ka dok iwaco botwa ni, ‘Wukel en bota, wek aket waŋa i kome.’
22Wan watito boti ni, ‘Latin awobi-nu pe twero weko ka ŋet wonne; ka ce opokke
woko ki wonne, ci wonne to woko.’
23Ento in onoŋo iwaco botwa ni, ‘Ka ominwu matidi-ni pe obino kany kacel
kwedwu, pe dok wubineno waŋa.’
24“Ka wadok paco bot wonwa ladit, ci watitte lokki ducu.
25Ka wonwa owaco ni, ‘Wuwot dok wuciwil ki wan cam mo manok’,
26wan wawacce ni, ‘Pe watwero dok Ka ominwa rmatidi-ni bicito kwedwa, ci
wabidok kunnu, pien pe wabineno waŋ dano ca, ka ominwa matidi-ne pe i
kinwa.’
27Ci wora owacowa ni, ‘Wun wuŋeyo ni dakona onywalo litino awobe aryo;
28acel oweka woko, ci yam awacci, Ada ŋuu okide woko, pe dok amedo ki nene
matwal.
29Ka dok wukwanyo man woko ki bota, ce gin marac bipoto i kome, ci wubitero
lwar wiya i lyel ki: cwercwiny.’
30“Mumiyo ka an adok bot wora;: ma latin awobi-ni pe i kinwa, macalo kwone
ocuŋ i kom latin awobi-ni,
31ka oneno ni latin awobi-ni pe i kinwa, ci en bito woko. Miyo wabitero lwar wi
wonwa i lyel ki cwercwiny.
32An nene acuŋ pi latin awobi man bot wora, kun awacce ni, ‘Ka pe abidwoko en
boti, an abibedo won alii i nyim wora i kare me kwona ducu.’
33Mumiyo kombeddi alegi ni ber iye an opiini, adoŋ ma ka latin awobi man, abed
opiini, ladit; wek latin man odok paco kacel ki omegine.
34Pien atwero dok paco bot wora niŋniŋ, ka pe latin-ni tye kweda? Alworo neno
gin marac ka poto i kom wora.”

Acakki 45
1 Yucepu diyo cwinye doŋ oloye woko ki i nyim lwak ducu ma gucuŋ ka ŋete, ci
odaŋŋe ni, “Wumi dano ducu gua woko ki bota, guciti.” Kit meno ŋatti mo yam pe
odoŋ bote i kare ma en nyutte kekene bot omegine.
2Ocako koko matek ma Luejipt bene giwinyo, ki jo ma i gaŋ kal pa Parao bene
guwinyo.
3Yucepu owaco bot omegine ni, “An a Yucepu; wora mono pud tye makwo?” Ento
omegine pe gitwero gamo doge, pien tipo komgi oto woko i nyime.
4Yucepu owaco bot omegine ni, “Alegowu, wubin bota cok.” Gucito cok bote.
Owacogi ni, “An aye ominwu Yucepu, ma yam wucato i Ejipt.
5Pe doŋ wubed ki cwercwiny, pe cwinywu owaŋ i komwu kekenwu pi cato an
kany; pien Lubaŋa aye yam ocwala kany i nyimwu, wek akony kwowu.
6Pien kec doŋ obedo i lobo pi mwaka aryo; pud dok odoŋ mwaka abic ma pur ki
kac bibedo pe.
7Lubaŋa ocwalo an i nyimwu wek agwok ki wun jo ma bidoŋ wi lobo, ki pi gwoko
ki wun jo mapol ma gibibwot makwo.
8Pien wun aye yam pe wucwala kany, ento Lubaŋa gire; omiyo an adoko won
Parao, ki lalo ode ducu ki lalo lobo Ejipt ducu.
9 Wutim oyot, wucit bot wora, wuciwacce ni, ‘Latinni Yucepu owaco kuman ni,
Lubaŋa oketa abedo laloyo i Ejipt ducu; bin bota kany, pe dok iru.
10Ibibedo i lobo Gocen, ibibedo cok kweda, in ki litinoni ki litino pa litinoni ducu,
ki dyegini ki dyaŋi-gu ki gin ma itye kwedgi ducu.
11Abipito in kunnu pien pud dok odoŋ mwaka me kec mukene abic i anyim; wek
in ki jo ma i paconi, ki gin ma it ye kwedgi ducu pe wubed lucan.’
12Iyo, kombeddi waŋwu oneno, ki waŋ omera Benjamin bene oneno ni an kikoma
aye aloko kwedwu ki doga.
13Myero wun wucitit bot wora kit deyona ducu ma atye kwede i Ejipt, ki gin ducu
ma doŋ wuneno. Wucit oyot, wek wukel wora kany.”
14Ocako poto i ŋut ominne Benjamin ki koko, ki Benjamin bene okok i ŋute.
15Ka onoto lem omegine ducu kun kok; ka doŋ lacen omegine gucako boko lok
kwede.
16Ka lok owinnye wa ki i ot pa Parao ni, “Omegi Yucepu gubino”, pire oyomo
cwiny Parao ki luticce matek.
17Parao owaco bot Yucepu ni, “Wac bot omegini ni, ‘Wutim kit man, wutwe yec i
ŋe kanawu, wudok cen i lobo Kanaan;
18wutiŋ wonwu ki jowu, wek wubin bota; abimiyowu gin mabeco ma tye i lobo
Ejipt, wucicamo moo ma i lobo-ni.’
19“Dok icikgi ni, ‘Wutim kit man: Wuter gadigadi nia ki i lobo Ejipt kany pi
litinowu matino ki pi mon mewu, wek wukel wonwu obin.
20Pe wupar pi jamiwu, pien gin mabeco ma tye i lobo Ejipt ducu mewu.’ ”
21Awobe pa Icrael gutiyo kit meno; Yucepu omiyogi gadigadi kit macalo Parao
ociko, ka dok omiyogi peke me wotgi.
22Omiyo botgi ducu ŋat acel acel boŋŋi mabeco me aruka i nino madito, ento bot
Benjamin omiyo cekel me ryal miya adek ki ruk mabeco abic me nino madito.
23Ocwalo bot wonne jami macalo man: Kana apar ma guyene ki jami mabeco ma
oa ki i Ejipt, ki megi kana apar ma guyeyo kal, ki cam, ki peke me wot pa wongi.
24Ka doŋ ocako cwalo omegine gucito. Ka doŋ gia ocikogi ni, “Pe wubed ka da
iyo.”
25Ka gua woko ki i Ejipt, ci gudwogo i lobo Kanaan bot wongi Yakobo.
26Ka gutitte ni, “Yucepu pud tye makwo, en aye laloyo i lobo Ejipt ducu”; ci tipo
kome oto woko lirut, pien onoŋo peya oye lokgi.
27Ento ka doŋ gutitte lok kom Yucepu ducu, kit ma ocikogi kwede, ka dok pi neno
lwak gadigadi ma Yucepu ocwalo pi tiŋo en, ka tipo kom wongi ocako dwogo.
28Ka Icrael ocako lok ni, “Doŋ otum, woda Yucepu kara pud tye makwo; abiwot
acito ka nene ma pud peya ato.”

Acakki 46
1Icrael ocako wot ki jami ma yam en tye kwedgi ducu; ka obino i Beer-ceba, ci
otyero gitum bot Lubaŋa pa wonne Icaka.
2Lubaŋa oloko ki Icrael i waŋ lek dyewor kun lwoŋe ni, “Yakobo, Yakobo.” En
ogamo ni, “An a ene.”
3Owacce ni, “An Lubaŋa, Lubaŋa pa woru; pe ilwor cito i Ejipt, pien abimiyi idoko
rok madit kunnu.
4Abicito kwedi wa i Ejipt, abidwoki cen bene; doki i kare ma ibito, ciŋ Yucepu
biumo waŋi.”
5Yakobo ocako wot ki i Beer-ceba, kun awobene gutiŋe, kacel ki litinogi matino,
ki mongi, i gadigadi ma Parao ocwalo me tiŋogi.
6 Gutero limgi makwo ki jamigi ma yam gulimo ki i lobo Kanaan, gucito kwede i
Ejipt; gutero Yakobo ki litinone ki likwaye ducu.
7En owoto i Ejipt ki awobene ki anyirane ducu, wa ki likwaye ma co ki ma anyira.
8Man aye nyiŋ likwayo pa Icrael ma gucito i Ejipt: Yakobo ki awobene. Reuben,
latin kayo pa Yakobo,
9ki awobe pa Reuben, aye Kanok, Pallu, Kejeron ki Karmi.
10Awobe pa Cimeon aye Jemuel, Jamin, Okad, Jakin, Jokar ki Caul, ma awobi pa
dako Lakanaan.
11Awobe pa Levi aye Gercon, Kokat ki Merari.
12Awobe pa Juda aye Er, Onan, Cela, Perej ki Jera, ento Er ki Onan guto woko i
lobo Kanaan; awobe pa Perej aye Kejeron ki Kamul.
13Awobe pa Icakar aye Tola, Puwa, Iob, ki Cimron.
14Awobe pa Jabulon aye Cered, Elon ki Jaleel.
15Meno aye awobe pa Lea ma en onywalo ki Yakobo i Paddan-aram, kacel ki
nyare Dina; wel litino awobene ki anyirane giromo pyeradek wiye adek.
16Awobe pa Gad aye Jipion, Kagi, Cuni, Ejibon, Eri, Arodi ki Areli.
17Awobe pa Acer aye Imna, Iciva, Icivi, Beria ki Cera ma lamingi. Awobe pa Beria
aye Keber ki Malkiel.
18Meno aye litino awobe pa Jilpa, ma Laban omiyo bot Lea; en onywalo ki Yakobo
litino apar wiye abicel.
19Awobe pa Lakeri dako pa Yakobo aye Yucepu ki Benjamin.
20Yucepu onywalo Manace ki Epraim ki i lobo Ejipt, ma Acenaci, nya, pa Potipera
ajwaka me On aye onywalogi.
21Awobe pa Benjamin aye Bela, Beker, Acibel, Gera, Naaman, Eki, Roc, Mupim,
Kupim ki Arud.
22Meno aye awobe pa Lakeri ma en onywalo ki Yakobo, litino ducu apar wiye
aŋwen.
23Awobi pa Dan aye Kucim.
24Awobe pa Naputali aye Jajeel, Guni, Jejer ki Cilem.
25Meno aye likwayo pa Bila ma Laban yam omiyo ki nyare Lakeri; en onywalo ki
Yakobo litino ducu abiro.
26Jo ducu ma tuŋ bot Yakobo ma yam ocito kwedgi i Ejipt, ma gin yam litinone ki
likwaye kikome, ma pe gikwano iye mon pa litino awobene onoŋo giromo jo
pyerabicel wiye abicel;
27 ki litino awobe ma nene Yucepu onywalogi ki i Ejipt, nene gin awobe aryo;
pienno jo ducu ma tuŋ bot Yakobo ma gucito i Ejipt giromo pyerabiro.
Yakobo ki jo ma i ode i Ejipt
28Yakobo ocwalo Juda anyim bot Yucepu, wek onyuttigi yo ma cito i Gocen; ci guo
i lobo Gocen.
29Yucepu oyubo gadigadine me cito ka rwatte ki wonne Icrael i Gocen; ka ocito,
onyutte kekene bote, ka opoto i ŋute kun kok kwede pi kare mo malac.
30Icrael owaco bot Yucepu ni, “Tin to doŋ obin, pien doŋ aneno waŋi, aniaŋ ni pud
ikwo ada.”
31Yucepu owaco ki omegine ki jo ma i ot pa wonne ni, “Abidok ka tito ki Parao,
abiwacce ni, ‘Omega ki jo ma i ot pa wora, ma yam gitye i lobo Kanaan, doŋ
gutyeko bino bota;
32gin lukwat, pien gin yam lukwat dyaŋi; dok gin gubino ki dyegigi ki dyaŋi-gu, ki
gin ducu ma gitye kwede.’
33Ka ce Parao olwoŋowu, ka openyowu ni, ‘Wun wutiyo tic aŋo?’
34wun wudok iye ni, ‘Wan luticci wan lukwat dyaŋi nia ka tinowa nio kwede wa
onyoo, wan kacel ki kwarowa’, wek wubed i Gocen, pien bedo me kwer bot
Luejipt me bedo ki lakwat mo.”

Acakki 47
1Yucepu ocito ka tito bot Parao ni, “Wora ki omega, ki dyegigi ki dyaŋi-gu ki
jamigi ducu gutyeko bino ki i lobo Kanaan; kombeddi doŋ gitye i lobo Gocen.”
2Okwanyo jo abic ki i kin omegine, oterogi, onyutogi bot Parao.
3Parao openyo omegine ni, “Wun wutiyo tic aŋo?” Gin guwaco bot Parao ni, “Wan
luticci wan lukwat macalo kwariwa.”
4Ka guwaco bot Parao ni, “Wan doŋ wabino ka bedo i lobo-ni; pien ka kwayo
limwa aye pe, pien onoŋo kec doŋ Lyet twatwal i lobo Kanaan; kombeddi walegi
ni, wek wabed i lobo Gocen.”
5Parao owaco bot Yucepu ni, “Woru ki omegini doŋ gubino boti.
6Lobo Ejipt tye boti, ket woru ki omegini i lobo maberre, wek gubed i lobo Gocen;
ka iŋeyo i kingi jo makwiri, ci iketgi gubed ludito ma gwoko limma.”
7Lacen Yucepu okelo wonne Yakobo, okete i nyim Parao, ci Yakobo olamo gum i
kom Parao.
8Parao owaco bot Yakobo ni, “In mono doŋ iri wi lobo mwaka adi kaa?”
9Yakobo owaco bot Parao ni, “An doŋ ari wi lobo mwaka miya acel ki pyeradek
macalo labedo. Ento mwaka ma ari kwede pud nok, dok opoŋ ki can, peya rom ki
mwaka pa kwarina ma gubedo kwede macalo lubedo.”
10Yako bo olamo gum i kom Parao, ka doŋ okato woko ki i nyime.
11Yucepu omiyo ki wonne ki omegine kabedo i lobo Ejipt, i ŋom maberre, i
Ramcec, kun miyogi lobo wek obed megi, kit macalo Parao ociko.
12Yucepu ocako poko cam ki wonne, ki omegine ki bot jo ducu me ot pa wonne,
kun lubo wel jo ma tye botgi.
Loc pa Yucepu i kare me kec
13I kare meno onoŋo cam doŋ pe i lobo ducu; pien onoŋo kec doŋ Lyet twatwal,
omiyo jo ma i lobo Ejipt ki i lobo Kanaan kec obwoyogi woko.
14Yucepu ocoko cente ducu ma yam tye i lobo Ejipt ki i lobo Kanaan, ma yam
dano guwilo ki cam; ci otero i ot pa Parao.
15Ka cente doŋ otum woko ki i lobo Ejipt ki i lobo Kanaan bene, ci jo Ejipt ducu
gubino bot Yucepu, guwaco ni, “Miniwa cam; myero wato ki i komi ma ineno
piŋo? Pien centewa doŋ otum woko.”
16Yucepu ogamo ni, “Wumiya lim makwo, ci an abimiyowu cam aloko ki dyaŋwu,
ka limwu me cente doŋ otum woko.”
17Gucako kelo limgi makwo bot Yucepu, aguragura, romi, dyaŋi ki kana; ci
Yucepu olokogi ki cam. I mwaka meno opoko botgi cam pi lwak lim makwo ma
gukelo.
18Ka mwaka meno doŋ otum, ci gubino bote i mwaka ma lubone, kun giwacce ni,
“Wan pe doŋ wakano lok mo boti, laditwa, centewa doŋ watyeko woko ducu; ki
lim makwo doŋ odoko pa laditwa; gin mo pe ma odoŋ i nyim laditwa, kono
komwa ki lobowa keken.
19Myero wato ki i komi ma inenowa piŋo, wan kacel ki lobowa? In iwilwa ki cam
kacel ki lobowa, wan kacel ki lobowa wabibedo opii pa Parao; dok imiwa kodi
wek wabed makwo, pe wato, wek lobo pe odoŋ noŋo.”
20Kit meno Yucepu owilo lobo ducu me Ejipt obedo pa Parao; pien Luejipt ducu
gucato pottigi woko, pi kec ma onoŋo doŋ Lyet twatwal. Lobo odoko pa Parao;
21oloko dano ducu gubedo opii, nia i agikki lobo Ejipt tuŋ cel, nio tuŋ cel.
22Lobo pa ajwagi keken aye pe giwilo, pien ajwagi onoŋo gitye ki camgi ma a ki i
ciŋ Parao; onoŋo gubedo ka camo gin ma Parao miyogi, mumiyo pe gucato lobogi.
23Yucepu dok owaco bot lwak ni, “Nen, i kare man atyeko wilowu ki lobo mewu
me bedo pa Parao. Kombeddi doŋ wugam kodi ma wubicoyo i lobo.
24I kare me kac wubimiyo acel me abic bot Parao, ki dul aŋwen me abic bibedo
mewu, pi kodi me acoya i pottiwu, ki pi camwu, ki jo ma i pacowu, ki cam pa
litinowu.”
25Gugamo ni, “Doŋ ityeko laro kwowa, wek berwa onen i nyimi, ladit, wan
wabibedo opii pa Parao.”
26Pi lok man Yucepu oketo odoko cik i lobo Ejipt, pud tye nio wa onyoo, ni, Parao
myero oter dul acel me abic; lobo pa ajwagi keken aye pe odoko pa Parao.
Yakobo ociko Yucepu me agikkine
27Jo Icrael gubedo i lobo Ejipt, i lobo Gocen; gunoŋo iye lim, gumedde, gunya
mapol.
28Yakobo obedo i lobo Ejipt mwaka apar wiye abiro; kit meno nino pa Yakobo,
mwaka me kwone ducu, oromo miya acel ki pyeraŋwen wiye abiro.
29 Ka kare me to pa Icrael doŋ onyiko cok, ci olwoŋo wode Yucepu, owacce ni, “Ka
doŋ berra onen boti, ci irwak ciŋi, odony ki piny i te ema, icikke kweda ki gen ki
ada ni, pe ibiyika i Ejipt,
30ento wek acibut kacel ki kwarina; tiŋa woko ki i Ejipt, ci iciyika i kabedo ma
giyikogi iye.” En ogamo ni, “Abitiyo kit ma doŋ iwaco-ni.”
31Dok owaco ni, “Kwoŋŋa kwoŋ,” ci ocako kwoŋo kwoŋ. Lacen Icrael okulo wiye
piny i wi kitandane.

Acakki 48
1Lacen gitito bot Yucepu ni, “Nen, woru kome lit;” ci otero litino awobene aryo,
Manace ki Epraim.
2Ka gitito ki Yakobo ni, “Wodi Yucepu obino boti,” ci Icrael ocukke oa malo, obedo
i wi kitanda.
3 Yakobo owaco bot Yucepu ni, “Lubaŋa Matwero-ducu yam onen bota i Luj i lobo
Kanaan, omiya iye gum,
4owacca ni, ‘Nen, abimiyi inya imedde mapol, dok abimiyi idoko rok mapol,
abimiyo lobo man bot likwayi ki jo ma bilubogi obed megi matwal.’
5Awobeni aryo-ni ma inywalogi i lobo Ejipt ma onoŋo peya abino boti i Ejipt,
meno mera gira; Epraim ki Manace gibibedo litinona, macalo Reuben ki Cimeon
bene.
6Litino ma ginywalogi ki i ŋegi bibedo meri, ento gibikwanogi ki nyiŋ omegigi i
kare ma gipoko lobo me bedo ginaleyagi.
7 Pien ka yam aa ki i Paddan, me cwercwiny Lakeri otona woko i lobo Kanaan i
waŋayo, munoŋo Eprat pud kiborbor; ci ayiko en i yo ma cito Eprat, en aye
Beterekem.”
8Ka Icrael oneno awobe pa Yucepu, ci owacci, “Man kono jo mene?”
9Yucepu ogamo dog wonne ni, “Gin litino awobena, ma Lubaŋa omiya ki kany.”
Ka owacci, “Kelgi bota kany, wek alam gum i komgi.”
10I kare meno onoŋo Yako bo doŋ oti, waŋe ocido woko, ma pe doŋ neno piny. Ka
Yucepu okelogi cok bote, ci onoto lemgi ka okwakogi ki bade.
11Icrael owaco bot Yucepu ni, “Onoŋo yam atamo ni pe dok abineno waŋi; nen, ka
Lubaŋa dok omiyo aneno wa litinoni bene.”
12Yucepu odirogi cen manok ki ka coŋe; oryebbe piny, okulo wiye i ŋom.
13Yucepu otero gin aryo ducu, omako Epraim ki ciŋe tuŋ lacuc mukemo ciŋ Icrael
ma lacam, ki Manace omako ki ciŋe tuŋ lacam ma okemo cin Icrael malacuc,
odirogi cok bote.
14Icrael otino ciŋe malacuc oketo i wi Epraim, ma latin matidi, ki ciŋe malacam
oketo i wi Manace, kun ogwenyo ciŋe, pien Manace aye onoŋo latin kayo.
15Olamo gum i kom Yucepu kun waco ni, “Lubaŋa ma yam kwarowa Abraim ki
Icaka gubedo ka lubo cikke, Lubaŋa ma obedo ka kwayo an i kare me kwona ducu
nio wa i nino man,
16lamalaika ma yam olara ki i gin marac, omi gum botawobe-ni; wek gilwoŋ nyiŋa
pigi, ki nyiŋ kwarowa Abraim ki Icaka; gudoŋ, gudok lwak mapol i wi lobo.”
17Ka Yucepu oneno ni wonne ogwenyo ciŋe malacuc aye dok oketo i wi Epraim,
pe opwoyo; ci ocako kwanyo ciŋ wonne ki i wi Epraim wek elok eket i wi Manace.
18Yucepu owaco bot wonne ni, “Pe kit meno, wora, pien man aye latin kayo, ket
ciŋi malacuc i wiye.”
19Ento wonne okwero woko, kun wacci, “An aŋeyo ya latinna, aŋeyo; en bibedo
rok, en bene bibedo madit, ento ominne matidi bibedo dit makato en, likwaye
bidoko lwak rok mapol.”
20 Olamo gum i komgi i nino meno, kun wacci, “Icrael bilamo gum ki nyiŋwu, ni,
‘Lubaŋa omiyi ibed macalo Epraim ki Manace’;” kit meno oketo Epraim i nyim
Manace.
21Icrael owaco bot Yucepu ni, “Nen, an doŋ acok to, ento Lubaŋa bibedo kwedwu,
dok bidwokowu i lobo pa kwarowu.
22Kor got ma yam ayako ki i ciŋ jo Amor ki pala lucwan ki atero, doŋ atyeko miyo
boti makato pa omegini.”

Acakki 50
1Yucepu ocako poto i nyim wonne, okok ki pig waŋe kun noto leme,
2lacen ociko luticce ma ludaktar pi wiro kom wonne ki yat ma talo kom, ci
ludaktar guwiro kom Icrael;
3kun wirone otyeko nino pyeraŋwen, en aye nino ma mitte ka giwiro kom dano
ki yat latal kom. Luejipt gukoko Yakobo nino pyerabiro.
4Ka nino me kwero cola doŋ otum, ci Yucepu oloko ki jo pa Parao, kun wacci,
“Alegowu ni, ka wuneno kombeddi ni bedona botwu kany oyomo cwinywu, ci
wuwac lokke bot Parao, kun wuwacce ni,
5 wora omiya akwoŋo kwon kun waco ni, ‘An doŋ acok to: wubiyika i Lyel ma
yam an ki koma aye akwinyo i lobo Kanaan.’ Mumiyo alegi ni, itima ber, wek
aciyik wora, ka adwogi.”
6Parao ogamme ni, “Ber iwot giri, iciyik woru, kit macalo en omiyo ikwoŋo
akwoŋa-ni.”
7Ci Yucepu ocito ka yiko wonne, ocito ki lwak lutic pa Parao ducu, ludoŋo me ode,
ki ludoŋo ducu me lobo Ejipt,
8kacel ki jo ducu me ot pa Yucepu, ki omegine, ki jo me ot pa wonne. Litinogi
keken ki lwak dyaŋigi ki dyegigi aye gudoŋ i lobo Gocen.
9Yucepu ocito ki lwak gadigadi ki wegi aguragura, owoto ki lwak jo mapol
twatwal.
10Ka guo i laro moyo ma i Atad, ma tye loka Jordan ci gukok kunnu ki cwercwiny
ki kumo madwoŋ; Yucepu okwero cola pa wonne nino abiro.
11Ka wegi lobo-nu ma gin Lukanaan, guneno kwero cola ma i laro moyo i Atad, ci
guwaco ni, “Mankwero cola me cwercwiny madwoŋ bot Luejipt.” Pi meno nyiŋ
kabedo meno gilwoŋo ni, Abel-micraim; tye loka Jordan.
12Awobene gutimo i kome kit ma nene en ocikogi kwede,
13 pien awobene gutero kome i lobo Kanaan, ci guyiko kome i boro ma i poto ma
tye i Makpela i tuŋ wokceŋ me Mamre, ma yam Abraim owilo, kacel ki poto, bot
Epron Lakit, wek obed mere me kabedo me yik.
14Ka doŋ otyeko yiko wonne, ci Yucepu odok i Ejipt kacel ki omegine, ki jo ducu
ma nene ocito kwedgi ka yiko wonne.
Yucepu okweyo cwiny omegine
15Ka omegi Yucepu guneno ni wongi doŋ otyeko to woko, ci gutamo ni, “Gwok
nyo Yucepu doŋ bicako kwerowa woko, biculo kwor ma yam watime kwede
marac-ci i komwa.”
16Omiyo gucako cwalo kwena bot Yucepu kun giwaco ni, “Yam woru ocikowa ki
cik man ma onoŋo peya oto, ni,
17‘Wuwac bot Yucepu ni, alegi itim kica bot omegini pi tim aranyi ki pi bal ma
gutimo i komi, pien gutimo tim aranyi i komi ada.’ Doŋ kombeddi walegi itimwa
kica pi tim aranyiwa, pien wan waworo Lubaŋa pa woru.” Yucepu okok ka guloko
kwede.
18Omegine bene gucito ci guryebbe i nyime kun giwaco ni, “Nen, wan doŋ luticci.”
19Ento Yucepu odok iye botgi ni, “Pe wulwor, an atye ma ka Lubaŋa bo?
20Ki tuŋ botwu yam wuyubbe pi timo gin marac i koma, ento Lubaŋa oyubo pi
tiyo gin maber, ma omiyo jo mapol gubedo kwo, macalo gitye kwede wa
kombeddi.
21Pi meno pe wubed ki lworo mo; abipitowu ki litinowu ducu.” Kit meno ojiŋo
cwinygi kun kweyo igi.
To pa Yucepu
22Kit meno Yucepu obedo i Ejipt, en ki jo me ot pa wonne, ori mwaka miya acel ki
apar.
23Yucepu oneno litino pa Epraim, nio wa i kom likwaye me adekke; litino pa
Makir wod pa Manace en omiyo gubedo mere bene.
24Yucepu owaco bot omegine ni, “An doŋ acok to; ento Lubaŋa bilimowu, dok en
bikwanyowu woko ki i lobo man, bidwokowu ka ma yam okwoŋo iye bot Abraim
ki Icaka ki bot Yakobo.”
25 Yucepu omiyo litino pa Icrael gukwoŋo kwoŋ kun waco ni, “Lubaŋa bilimowu,
ci wubitiŋo cogona woko ki kany.”
26Yucepu oto, ma mwaka me ditte romo miya acel ki apar; guwiro kome ki yat
latal-kom, lacen gupyelo kome i canduk me yik i Ejipt.`;

// Format the text and save to file
const formattedText = formatBibleText(sampleText);
fs.writeFileSync('formatted_bible.txt', formattedText, 'utf8');

console.log('Formatted text has been saved to formatted_bible.txt');