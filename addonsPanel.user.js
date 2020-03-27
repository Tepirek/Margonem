// ==UserScript==
// @name         MARGONEM ADDONS v3.1 - PANEL
// @description  none
// @namespace    http://tampermonkey.net/
// @author       Tepirek
// @version      3.1
// @updateURL    https://github.com/Tepirek/Margonem/raw/master/addonsPanel.user.js
// @downloadURL  https://github.com/Tepirek/Margonem/raw/master/addonsPanel.user.js
// @match        http://*.margonem.pl/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let expowiska = {
        "Kwiaty --> Thuzal": {
            map: "Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Gildia Magów",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "Wioska startowa 1": {
            map: "Osada Śmiałków",
            mobs: "Zając, Świerszcz, Żaba, Żuk",
            mobs_id: [],
            ignore_mob: []
        },
        "Wioska startowa 2": {
            map: "Osada Śmiałków",
            mobs: "Młody żuk",
            mobs_id: [],
            ignore_mob: []
        },
        "Wioska startowa 3": {
            map: "Osada Śmiałków",
            mobs: "Szerszeń, Żuk, Lis",
            mobs_id: [],
            ignore_mob: []
        },
        "Wioska startowa 4": {
            map: "Samotna Nizina",
            mobs: "Dziki pies, Czarny dziki pies, Silny jeleń",
            mobs_id: [],
            ignore_mob: []
        },
        "Wioska startowa 5": {
            map: "Lęgowisko Szkarad p.2, Lęgowisko Szkarad p.1",
            mobs: "Szczur wojownik, Szczur piwniczny",
            mobs_id: [],
            ignore_mob: []
        },
        "Grobowiec Karka-han": {
            map: "Grobowiec Rodziny Tywelta, Grobowiec Rodziny Tywelta p.1, Grobowiec Rodziny Tywelta p.2, Grobowiec Rodziny Tywelta p.1",
            mobs: "Gacówka rogata, Duża larwa, Szabrownik, Adept",
            mobs_id: [],
            ignore_mob: []
        },
        "Mrówki": {
            map: "Zniszczone Opactwo, Leśny Bród, Mrowisko, Mrowisko p.1, Mrowisko p.2, Kopiec Mrówek p.2, Kopiec Mrówek p.1, Kopiec Mrówek, Leśny Bród, Mrowisko",
            mobs: "Mrówcza Królowa, Brązowa mrówka robotnica, Brązowa mrówka żołnierz, Brązowa mrówka tragarz",
            mobs_id: [],
            ignore_mob: []
        },
        "Zulusy Karka-han": {
            map: "Karka-han, Prastara Puszcza, Tygrysia Granica, Osada Zulusów, Siedziba Zulusów, Osada Zulusów, Lokum Mulu, Osada Zulusów, Lokum Gula, Lokum Gula - sala 2, Lokum Gula",
            mobs: "Dida Gula, Zulu Gula, Nuna Gula, Fula Gula, Zulu Mulu, Furu Mulu, Bulu Mulu, Nuna Furla",
            mobs_id: [],
            ignore_mob: []
        },
        "Południce/Wieczornice 1": {
            map: "Werbin, Brama Północy, Góry Zrębowe, Zachodnie Rozdroża, Cienisty Bór, Las Dziwów, Liściaste Rozstaje, Sosnowe Odludzie, Księżycowe Wzniesienie, Mglista Polana Vesy, Wzgórze Płaczek, Trupia Przełęcz",
            mobs: "Wieczornica, Południca, Górska pantera, Górska salamandra, Grafitowa puma, Leszy",
            mobs_id: [],
            ignore_mob: []
        },
        "Południce/Wieczornice 2": {
            map: "Mythar, Złowrogie Bagna, Las Dziwów, Liściaste Rozstaje, Sosnowe Odludzie, Księżycowe Wzniesienie, Mglista Polana Vesy, Wzgórze Płaczek, Trupia Przełęcz",
            mobs: "Wieczornica, Południca, Górska pantera, Górska salamandra, Grafitowa puma, Leszy",
            mobs_id: [],
            ignore_mob: []
        },
        "Przeklęty zamek": {
            map: "Torneg, Stare Ruiny, Przeklęty Zamek - wejście północne, Przeklęty Zamek - podziemia północne, Przeklęty Zamek - zbrojownia, Przeklęty Zamek - kanały, Przeklęty Zamek - podziemia południowe, Przeklęty Zamek - wejście południowe, Przeklęty Zamek - sala zgromadzeń, Przeklęty Zamek p.1, Przeklęty Zamek p.2, Przeklęty Zamek - komnata, Przeklęty Zamek - wejście wschodnie",
            mobs: "Cmentarny ghul, Zjawa, Nieumarły mnich, Nieumarły wojownik, Nieumarły wiarus",
            mobs_id: [],
            ignore_mob: []
        },
        "Gobliny Werbin": {
            map: "Torneg, Las Goblinów, Morwowe Przejście, Podmokła Dolina, Morwowe Przejście",
            mobs: "Leśny goblin, Goblin traper, Zły goblin, Mistrz fechtunku, Władca krzewów, Pancerny goblin",
            mobs_id: [],
            ignore_mob: []
        },
        "Ghule": {
            map: "Eder, Fort Eder, Mokradła, Dolina Rozbójników, Wioska Ghuli, Polana Ścierwojadów, Wioska Ghuli, Zapomniany Grobowiec p.1, Zapomniany Grobowiec p.2, Zapomniany Grobowiec p.3, Zapomniany Grobowiec p.4, Zapomniany Grobowiec p.5, Zapomniany Grobowiec p.4, Zapomniany Grobowiec p.3, Zapomniany Grobowiec p.2, Zapomniany Grobowiec p.1",
            mobs: "Ghul zwiadowca, Ghul nocny, Ghul cmentarny, Ghul słabeusz, Ghul wojownik, Ghul szaman",
            mobs_id: [],
            ignore_mob: []
        },
        "Warany i żółwie": {
            map: "Eder, Spokojne Przejście, Zasłonięte Jezioro, Słoneczna Wyżyna, Lazurowe Wzgórze, Słoneczna Wyżyna, Zasłonięte Jezioro",
            mobs: "Waran szary, Żółw ostrogrzbiety, Waran krótkoogonowy, Żółw norowy, Żółw błotny, Waran krokodylowy, Waran stepowy, Gawial, Aligator, Krokodyl, Waran piaskowy",
            mobs_id: [],
            ignore_mob: []
        },
        "Wilcze plemię": {
            map: "Werbin, Brama Północy, Góry Zrębowe, Zachodnie Rozdroża, Kanion Straceńców, Krasowa Pieczara p.2, Krasowa Pieczara p.3, Kanion Straceńców, Krasowa Pieczara p.3, Krasowa Pieczara p.2, Krasowa Pieczara p.1, Kanion Straceńców, Warczące Osuwiska, Góry Zrębowe, Zachodnie Rozdroża",
            mobs: "Oko Wilka, Wilcza Więź, Zakrzywiony Pazur, Wilczy Śpiew, Wilcze Prawo, Wilcza Jagoda, Wilcza Paszcza",
            mobs_id: [],
            ignore_mob: []
        },
        "Zbiry": {
            map: "Eder, Fort Eder, Mokradła, Dolina Rozbójników, Przełęcz Łotrzyków, Pagórki Łupieżców, Skład Grabieżców, Pagórki Łupieżców, Kamienna Kryjówka, Pagórki Łupieżców, Schowek na Łupy",
            mobs: "Rozbójniczka, Stary rozbójnik, Pospolity zbir, Zły zbir, Przebiegły łotr, Podejrzany zakapior, Zapijaczony zbój",
            mobs_id: [],
            ignore_mob: []
        },
        "Bazyliszki": {
            map: "Werbin, Brama Północy, Góry Zrębowe, Zachodnie Rozdroża, Kanion Straceńców, Krasowa Pieczara p.2, Krasowa Pieczara p.3, Kanion Straceńców, Pieczara Szaleńców - sala 1, Pieczara Szaleńców - sala 2, Pieczara Szaleńców - sala 3, Pieczara Szaleńców - sala 4, Pieczara Szaleńców - sala 3, Pieczara Szaleńców - sala 2",
            mobs: "Magiczny bazyliszek, Srebrny bazyliszek, Purpurowy bazyliszek",
            mobs_id: [],
            ignore_mob: []
        },
        "Świnie": {
            map: "Eder, Spokojne Przejście, Racicowy Matecznik, Pieczara Kwiku - sala 1, Racicowy Matecznik, Zbójecka Skarpa, Racicowy Matecznik, Gościniec Bardów",
            mobs: "Odyniec, Locha, Warchlak",
            mobs_id: [],
            ignore_mob: []
        },
        "Demilisze": {
            map: "Mythar, Złowrogie Bagna, Werbin, Brama Północy, Góry Zrębowe, Zachodnie Rozdroża, Cienisty Bór, Las Dziwów, Liściaste Rozstaje, Sosnowe Odludzie, Rachminowa Jaskinia p.3, Rachminowa Jaskinia p.4, Rachminowa Jaskinia p.4 - przepaście, Wąski chodnik p.4, Chodniki Erebeth p.4 - sala 1, Chodniki Erebeth p.4 - sala 2, Kopalnia Thudul-ultok p.4 - sala 2, Kopalnia Thudul-ultok p.4 - sala 1, Ochnowa Pieczara p.4 - sala 1, Ochnowa Pieczara p.4 - sala 2, Ochnowa Pieczara p.4 - sala 1, Kopalnia Thudul-ultok p.4 - sala 1, Kopalnia Thudul-ultok p.4 - sala 2, Chodniki Erebeth p.4 - sala 2, Chodniki Erebeth p.4 - sala 1, Wąski chodnik p.4, Rachminowa Jaskinia p.4 - przepaście",
            mobs: "Wermont Pokwas, Wermont Pluskokwik, Wermont Karmikwik, Demilisz, Wermont",
            mobs_id: [30032, 30020],
            ignore_mob: []
        },
        "Topielce": {
            map: "Eder, Gościniec Bardów, Wertepy Rzezimieszków, Źródło Narumi, Uroczysko Wodnika, Moczary Rybiego Oka, Stary Kupiecki Trakt, Stukot Widmowych Kół",
            mobs: "Dziwożona, Wodnik, Mamuna, Topielica tataraku, Topielec szuwarowy, Topielica rzęsy, Topielec oczeretu",
            mobs_id: [],
            ignore_mob: []
        },
        "Magazynierzy": {
            map: "Ithan, Zniszczone Opactwo, Zburzona Twierdza, Nawiedzony Jar, Mroczny Przesmyk, Zapomniany Szlak, Kamienna Jaskinia, Kamienna Jaskinia - sala 2, Andarum Ilami, Świątynia Andarum, Zejście prawe Świątyni, Podziemia Świątyni, Magazyn Świątyni, Magazyn Świątyni p.2, Zbrojownia Andarum, Magazyn Świątyni p.2, Krypta Świątyni Andarum, Magazyn Świątyni p.2",
            mobs: "Vonaros, Zły magazynier, Nieuprzejmy magazynier, Zdenerwowany magazynier, Podły magazynier, Wkurzony magazynier, Złośliwy magazynier, Niemiły magazynier, Kowal Nieszczęścia, Przerażający mnich, Śmierć magazyniera, Duchowy rozpruwacz",
            mobs_id: [],
            ignore_mob: []
        },
        "Erem": {
            map: "Andarum Ilami, Świątynia Andarum, Zejście prawe Świątyni, Podziemia Świątyni, Magazyn Świątyni, Magazyn Świątyni p.2, Krypta Świątyni Andarum, Magazyn Świątyni p.2, Magazyn Świątyni, Podziemia Świątyni, Zejście lewe Świątyni, Świątynia Andarum, Andarum Ilami, Skały Mroźnych Śpiewów, Erem Czarnego Słońca - północ, Erem Czarnego Słońca - lochy, Erem Czarnego Słońca - południe, Skały Mroźnych Śpiewów, Erem Czarnego Słońca - sala wejściowa, Erem Czarnego Słońca p.1 s.1, Erem Czarnego Słońca - sala wejściowa, Erem Czarnego Słońca p.2 s.1, Erem Czarnego Słońca p.2 s.2, Erem Czarnego Słońca - sala wejściowa, Erem Czarnego Słońca p.1 s.2, Erem Czarnego Słońca - sala wejściowa, Skały Mroźnych Śpiewów, Andarum Ilami",
            mobs: "Przerażający mnich, Śmierć magazyniera, Duchowy rozpruwacz, Mnich chybione zaklęcie, Chytry mnich, Spokojny mnich, Przebiegły mnich",
            mobs_id: [175813],
            ignore_mob: []
        },
        "Bandyci": {
            map: "Kwieciste Przejście, Lazurowe Wzgórze, Lokum Bandytów, Lokum Bandytów p.1, Lokum Bandytów, Lazurowe Wzgórze, Chata Bandytów, Chata Bandytów p.1, Chata Bandytów, Chata bandytów - przyziemie, Chata Bandytów, Lazurowe Wzgórze, Kwieciste Przejście, Zbójecka Skarpa",
            mobs: "Sprytny bandzior, Cwany bandyta, Łowca naiwniaków, Celne oko, Rudy twardziel, Wodna kobra, Plująca kobra",
            mobs_id: [],
            ignore_mob: []
        },
        "Grexy": {
            map: "Tuzmer, Stare Sioło, Sucha Dolina, Płaskowyż Arpan, Trupia Przełęcz, Kamienna Strażnica - wsch. baszta p.1, Kamienna Strażnica - wsch. baszta skalna sala p.1, Kamienna Strażnica - wsch. baszta zasypany tunel, Kamienna Strażnica - tunel, Kamienna Strażnica - zach. baszta p.1, Kamienna Strażnica - zach. baszta p.2, Trupia Przełęcz, Grota Samotnych Dusz p.1, Grota Samotnych Dusz p.2, Grota Samotnych Dusz p.3, Grota Samotnych Dusz p.4, Grota Samotnych Dusz p.5, Grota Samotnych Dusz p.6, Grota Samotnych Dusz p.5, Grota Samotnych Dusz p.4, Grota Samotnych Dusz p.3, Grota Samotnych Dusz p.2, Grota Samotnych Dusz p.1",
            mobs: "Grex, Urgrap, Volmat",
            mobs_id: [147777],
            ignore_mob: []
        },
        "Piraci": {
            map: "Tuzmer, Port Tuzmer, Latarniane Wybrzeże, Korsarska Nora - sala 1, Korsarska Nora - sala 2, Korsarska Nora - sala 3, Korsarska Nora - sala 4, Korsarska Nora p.1, Korsarska Nora - przejście 2, Korsarska Nora p.2, Korsarska Nora - przejście 2, Korsarska Nora - przejście 3, Korsarska Nora p.2, Korsarska Nora - przejście 3, Korsarska Nora - przejście 2, Korsarska Nora - przejście 1, Korsarska Nora p.2, Korsarska Nora - przejście 1, Korsarska Nora - przejście 2, Korsarska Nora p.1, Korsarska Nora - sala 4, Korsarska Nora - sala 3, Korsarska Nora - sala 2, Korsarska Nora - sala 1, Latarniane Wybrzeże, Ukryta Grota Morskich Diabłów, Ukryta Grota Morskich Diabłów - arsenał, Ukryta Grota Morskich Diabłów, Ukryta Grota Morskich Diabłów - siedziba, Ukryta Grota Morskich Diabłów, Ukryta Grota Morskich Diabłów - skarbiec, Ukryta Grota Morskich Diabłów",
            mobs: "Bezduszna piratka, Krnąbrny pirat, Niemiłosierny pirat, Bezwzględny pirat, Henry Kaprawe Oko",
            mobs_id: [],
            ignore_mob: []
        },
        "Mumie": {
            map: "Tuzmer, Stare Sioło, Sucha Dolina, Płaskowyż Arpan, Oaza Siedmiu Wichrów, Ruiny Pustynnych Burz, Oaza Siedmiu Wichrów, Ciche Rumowiska, Dolina Suchych Łez, Ciche Rumowiska, Oaza Siedmiu Wichrów, Płaskowyż Arpan",
            mobs: "Pradawna mumia, Scarabeaus Zihanitum, Scarabeaus Nangar, Chodzące truchło, Mumia wysokiego kapłana, Antyczny wojownik, Scarabeaus Gir-tab, Cheperu, Zabalsamowany wyznawca Seta, Bezduszna piratka, Krnąbrny pirat, Dżin",
            mobs_id: [],
            ignore_mob: []
        },
        "Magradit": {
            map: "Port Tuzmer, Magradit, Magradit - Góra Ognia, Wulkan Politraki p.3 - sala 2, Magradit - Góra Ognia, Wulkan Politraki p.4, Wulkan Politraki p.3 - sala 1, Wulkan Politraki p.3 - sala 2, Wulkan Politraki p.2, Wulkan Politraki p.1, Wulkan Politraki p.2, Wulkan Politraki p.3 - sala 2, Wulkan Politraki p.3 - sala 1, Wulkan Politraki p.4, Skalna wyrwa, Magradit - Góra Ognia, Magradit",
            mobs: "Ifryt, Feniks, Palisandrowy skorpion, Skorpion palącego jadu, Marid, Żelazowy skorpion, Skorpion świętego ognia, Zjadliwy skorpion",
            mobs_id: [],
            ignore_mob: []
        },
        "Patrycjusze + draki": {
            map: "Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Gvar Hamryd, Rozlewisko Kai, Przysiółek Valmirów, Śnieżycowy Las, Śnieżna Granica, Śnieżycowy Las, Przysiółek Valmirów, Szczerba Samobójców, Żołnierski Korytarz, Thuzal, Grań Gawronich Piór, Krypty Bezsennych - kaplica, Krypty Bezsennych p.1, Krypty Bezsennych p.2, Krypty Bezsennych p.2 - przejście - sala 1, Krypty Bezsennych p.2 - przejście - sala 2, Krypty Bezsennych p.2, Krypty Bezsennych p.3, Krypty Bezsennych p.2 - sala 2, Krypty Bezsennych p.1, Krypty Bezsennych - kaplica, Grań Gawronich Piór, Gvar Hamryd",
            mobs: "Drakinia północnej gwiazdy, Drak białych nocy, Drak jeździec wichury, Drak północnego wiatru, Drak wiecznego szronu, Opuszczony patrycjusz, Osamotniona patrycjuszka, Nieumarły patrycjusz, Bezsenny patrycjusz",
            mobs_id: [],
            ignore_mob: []
        },
        "Krzaki": {
            map: "Tuzmer, Stare Sioło, Piachy Zniewolonych, Mythar, Urwisko Zdrewniałych, Wąwóz Zakorzenionych Dusz, Krzaczasta Grota p.2 - sala 2, Krzaczasta Grota p.2 - sala 3, Krzaczasta Grota p.2 - sala 1, Krzaczasta Grota p.2 - sala 3, Krzaczasta Grota p.1 - sala 3, Krzaczasta Grota - sala boczna, Krzaczasta Grota - korytarz, Krzaczasta Grota - sala boczna, Krzaczasta Grota p.1 - sala 3, Krzaczasta Grota p.1 - sala 2, Krzaczasta Grota p.1 - sala 1, Wąwóz Zakorzenionych Dusz, Regiel Zabłąkanych, Źródło Zakorzenionego Ludu, Piaskowa Gęstwina, Źródło Zakorzenionego Ludu, Jaskinia Korzennego Czaru p.2 - sala 1, Jaskinia Korzennego Czaru p.3, Jaskinia Korzennego Czaru p.2 - sala 1, Jaskinia Korzennego Czaru p.1 - sala 1, Jaskinia Korzennego Czaru p.1 - sala 3, Jaskinia Korzennego Czaru p.1 - sala 4, Jaskinia Korzennego Czaru p.1 - sala 3, Jaskinia Korzennego Czaru p.1 - sala 1, Jaskinia Korzennego Czaru p.1 - sala 2, Jaskinia Korzennego Czaru p.1 - sala 4, Jaskinia Korzennego Czaru p.2 - sala 2, Jaskinia Korzennego Czaru p.1 - sala 1, Jaskinia Korzennego Czaru p.2 - sala 2, Jaskinia Korzennego Czaru p.1 - sala 4, Jaskinia Korzennego Czaru p.1 - sala 2, Jaskinia Korzennego Czaru p.1 - sala 1, Jaskinia Korzennego Czaru p.2 - sala 1, Źródło Zakorzenionego Ludu, Regiel Zabłąkanych, Wąwóz Zakorzenionych Dusz, Urwisko Zdrewniałych",
            mobs: "Kościodrzew, Kamienny Starodrzew, Paszczodendron, Rycerz Trzech Sęków",
            mobs_id: [],
            ignore_mob: []
        },
        "Maho małe": {
            map: "Mythar, Urwisko Zdrewniałych, Wąwóz Zakorzenionych Dusz, Regiel Zabłąkanych, Tuzmer, Stare Sioło, Piachy Zniewolonych, Piaskowa Gęstwina, Źródło Zakorzenionego Ludu, Altepetl Mahoptekan, Dolina Chmur, Złota Góra p.1, Złota Góra p.2, Złota Góra p.3, Złota Góra p.2, Złota Góra p.1, Dolina Chmur, Altepetl Mahoptekan, Mictlan p.1, Mictlan p.2, Mictlan p.3, Mictlan p.4, Mictlan p.3, Mictlan p.2, Mictlan p.1, Altepetl Mahoptekan, Niecka Xiuh Atl, Dolina Chmur, Niecka Xiuh Atl, Altepetl Mahoptekan",
            mobs: "Mutokli, Mahoptek Chimalli, Mahoptek Atlatl, Mahoptek Tematlatl, Kapłan Itztli, Kapłan Mictecacihuatl, Harmon liści, Gąszczowy oczowlep, Pancerna bolita, Jeżozwierz, Nokturni",
            mobs_id: [],
            ignore_mob: []
        },
        "Wiedźmy dookoła": {
            map: "Tristam, Potępione Zamczysko, Plugawe Pustkowie, Jęczywąwóz, Pogranicze Wisielców, Jęczywąwóz, Plugawe Pustkowie, Zachodnie Zbocze",
            mobs: "Kąsająca Grymaśnica, Raszpla Ragana, Obwisła Prukwa, Zadzierzgnięta Haniebnica, Odchodnica Cesarska, Ścierwica Mięsówka, Dokuczliwa Bździągwa, Rogata Rozkosznica, Złośliwa Sekutnica",
            mobs_id: [154305, 154363],
            ignore_mob: []
        },
        "Wiedźmy zamek": {
            map: "Tristam, Potępione Zamczysko, Potępione Zamczysko - korytarz wejściowy, Potępione Zamczysko - lochy zachodnie, Potępione Zamczysko - korytarz wejściowy, Potępione Zamczysko - zachodnia komnata, Potępione Zamczysko - korytarz zachodni, Potępione Zamczysko - korytarz wejściowy, Potępione Zamczysko - sala ofiarna, Potępione Zamczysko - korytarz wejściowy, Potępione Zamczysko - korytarz wschodni, Wieża Szlochów p.1, Wieża Szlochów p.2, Wieża Szlochów p.3, Wieża Szlochów p.2, Wieża Szlochów p.1, Potępione Zamczysko - korytarz wschodni, Potępione Zamczysko - wschodnia komnata, Potępione Zamczysko - korytarz wejściowy, Potępione Zamczysko - lochy wschodnie, Potępione Zamczysko - korytarz wejściowy, Potępione Zamczysko",
            mobs: "Kapryśnica Gorejąca, Kąsająca Grymaśnica, Raszpla Ragana, Obwisła Prukwa, Zadzierzgnięta Haniebnica, Odchodnica Cesarska, Ścierwica Mięsówka, Dokuczliwa Bździągwa, Rogata Rozkosznica, Złośliwa Sekutnica",
            mobs_id: [154305, 154363],
            ignore_mob: []
        },
        "Katakumby całe": {
            map: "Stare Sioło, Sucha Dolina, Płaskowyż Arpan, Oaza Siedmiu Wichrów, Ruiny Pustynnych Burz, Pustynne Katakumby, Pustynne Katakumby - sala 1, Komnaty Bezdusznych - sala 1, Komnaty Bezdusznych - sala 2, Katakumby Odnalezionych Skrytobójców, Katakumby Opętanych Dusz, Korytarz Porzuconych Marzeń, Katakumby Gwałtownej Śmierci, Wschodni Tunel Jaźni, Katakumby Krwawych Wypraw, Zachodni Tunel Jaźni, Katakumby Poległych Legionistów, Zachodni Tunel Jaźni, Katakumby Opętanych Dusz, Korytarz Porzuconych Nadziei, Katakumby Odnalezionych Skrytobójców, Komnaty Bezdusznych - sala 2, Komnaty Bezdusznych - sala 1, Pustynne Katakumby - sala 2, Pustynne Katakumby, Ruiny Pustynnych Burz, Pustynne Katakumby",
            mobs: "Imperialny oszczepnik, Nekrolord Wernoradu, Starożytny legionista, Antyczny skrytobójca, Duch arystokraty, Imperialny gwardzista, Chopesz",
            mobs_id: [],
            ignore_mob: []
        },
        "Maddoki": {
            map: "Kwieciste Przejście, Głuchy Las, Zawodzące Kaskady, Mglista Grota p.1 - sala 1, Mglista Grota p.1 - sala 2, Mglista Grota p.2, Mglista Grota - sala wyjściowa, Zawodzące Kaskady, Skryty Azyl, Błotna Grota p.2, Błotna Grota p.1, Skryty Azyl, Błotna Grota p.1, Błotna Grota p.2, Skryty Azyl, Jaszczurze Korytarze p.1, Jaszczurze Korytarze p.2, Grota Jaszczurzej Łuski, Jaszczurze Korytarze p.2, Jaszczurze Korytarze p.3 - sala 2, Jaszczurze Korytarze p.3 - sala 1, Jaszczurze Korytarze p.3 - sala 2, Jaszczurze Korytarze p.4 - sala 2, Jaszczurze Korytarze p.4 - sala 3, Jaszczurze Korytarze p.3 - sala 3, Jaszczurze Korytarze p.4 - sala 3, Jaszczurze Korytarze p.4 - sala 2, Jaszczurze Korytarze p.4 - sala 1, Skryty Azyl, Jaszczurze Korytarze p.4 - sala 1, Jaszczurze Korytarze p.4 - sala 2, Jaszczurze Korytarze p.3 - sala 2, Jaszczurze Korytarze p.2, Jaszczurze Korytarze p.1, Skryty Azyl, Złota Dąbrowa, Oślizgłe Przejście - sala 1, Oślizgłe Przejście - sala 2, Złota Dąbrowa, Mglisty Las, Mechata Jama p.2, Mechata Jama p.1 - sala 2, Mglisty Las, Mechata Jama p.1 - sala 1, Mechata Jama p.2, Mglisty Las, Jaszczurza Nora, Mglisty Las, Grota porośniętych Stalagmitów - sala wyjściowa, Grota porośniętych Stalagmitów - przejście, Grota porośniętych Stalagmitów - sala boczna, Grota porośniętych Stalagmitów - przejście, Grota porośniętych Stalagmitów - sala główna, Grota Błotnej Magii, Grota porośniętych Stalagmitów - sala główna, Grota porośniętych Stalagmitów - przejście, Grota porośniętych Stalagmitów - sala wyjściowa, Mglisty Las, Złota Dąbrowa, Oślizgłe Przejście - sala 2, Oślizgłe Przejście - sala 1, Złota Dąbrowa, Skryty Azyl, Zawodzące Kaskady",
            mobs: "Opieszały Maddok, Senny Maddok, Aligator rzeczny, Kajman czarny, Ociężały Maddok, Szaman Maddoków, Leniwy Maddok, Strażnik Maddoków, Krokodyl różańcowy",
            mobs_id: [],
            ignore_mob: []
        },
        "Pustynia": {
            map: "Smocze Skalisko, Jaskinia Próby, Jaskinia Odwagi, Smocze Skalisko, Urwisko Vapora, Smocze Skalisko, Pustynia Shaiharrud - zachód, Skały Umarłych, Pustynia Shaiharrud - zachód, Jurta Chaegda, Jaskinia Smoczej Paszczy p.1, Jaskinia Smoczej Paszczy p.2, Jaskinia Smoczej Paszczy p.1, Pustynia Shaiharrud - zachód, Namiot Gwardii Smokoszczękich, Pustynia Shaiharrud - zachód, Sępiarnia, Pustynia Shaiharrud - zachód, Jurta Czcicieli, Jaskinia Szczęk, Pustynia Shaiharrud - zachód, Namiot Piechoty Piłowej, Pustynia Shaiharrud - zachód, Namiot Naznaczonych, Jaskinia Piaskowej Burzy s.2, Jaskinia Piaskowej Burzy s.1, Pustynia Shaiharrud - zachód, Pustynia Shaiharrud - wschód, Pustynia Shaiharrud - wschód, Jaskinia Sępa s.1, Namiot Błogosławionych, Pustynia Shaiharrud - wschód, Jaskinia Sępa s.2, Pustynia Shaiharrud - wschód, Namiot Pustynnych Smoków, Pustynia Shaiharrud - wschód, Grota Poświęcenia, Pustynia Shaiharrud - wschód, Jurta Nomadzka, Pustynia Shaiharrud - wschód, Świątynia Hebrehotha - przedsionek, Pustynia Shaiharrud - wschód, Pustynia Shaiharrud - zachód, Smocze Skalisko, Jaskinia Odwagi, Jaskinia Próby, Smocze Skalisko",
            mobs: "Sęp, Smokoszczęki, Tancerz Shaiharrud, Piłowiec, Zaklinacz sępów, Shaiharrudzki mutant, Czciciel Charkhaam",
            mobs_id: [],
            ignore_mob: []
        },
        "Orki": {
            map: "Ithan, Zniszczone Opactwo, Zburzona Twierdza, Opuszczony Bastion, Podziemne Przejście p.1, Podziemne Przejście p.2, Zrujnowana Wieża, Opuszczony Bastion, Zrujnowana Wieża, Podziemne Przejście p.2, Podziemne Przejście p.1",
            mobs: "Ork wuakl, Ork bashwooz, Ork trarroll, Ork kuurgh, Ork zhaghokk",
            mobs_id: [],
            ignore_mob: []
        },
        "Koboldy": {
            map: "Nithal, Podgrodzie Nithal, Nizina Wieśniaków, Lazurytowa Grota p.1, Lazurytowa Grota p.2, Lazurytowa Grota p.4, Lazurytowa Grota p.3, Lazurytowa Grota p.2, Lazurytowa Grota p.1",
            mobs: "Kobold nożownik, Kobold łucznik, Kobold",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
        "DEFAULT": {
            map: "",
            mobs: "",
            mobs_id: [],
            ignore_mob: []
        },
    };

    const container = document.createElement("div");
    const header = document.createElement("div");
    const content = document.createElement("div");
    const checkbox1 = document.createElement("input");
    const checkbox2 = document.createElement("select");
    let captainMaps = ["Archipelag Bremus An", "Rem", "Magradit", "Wyspę Wraków", "Caneum", "Ingotię"];
    for (let i = 0; i < captainMaps.length; i++) {
        let option = document.createElement(`option`);
        option.value = captainMaps[i];
        option.text = captainMaps[i];
        checkbox2.appendChild(option);
    }
    const inputTeleport = document.createElement("select");
    const defaultOption1 = document.createElement("option");
    const defaultOption2 = document.createElement("option");
    defaultOption1.value = "THUZAL";
    defaultOption1.text = "THUZAL";
    defaultOption2.value = "KWIATY";
    defaultOption2.text = "KWIATY";
    inputTeleport.appendChild(defaultOption1);
    inputTeleport.appendChild(defaultOption2);
    let teleportList = localStorage.getItem("teleportList") ? JSON.parse(localStorage.getItem("teleportList")) : [];
    for (let i = 0; i < teleportList.length; i++) {
        let option = document.createElement(`option`);
        option.value = teleportList[i];
        option.text = teleportList[i];
        inputTeleport.appendChild(option);
    }
    const inputBlessing = document.createElement("select");
    let blessingList = localStorage.getItem("blessingList") ? JSON.parse(localStorage.getItem("blessingList")) : [];
    for (let i = 0; i < blessingList.length; i++) {
        let option = document.createElement(`option`);
        option.value = blessingList[i];
        option.text = blessingList[i];
        inputBlessing.appendChild(option);
    }
    const inputMixture = document.createElement("select");
    let mixtureList = ['Mała pomarańczowa mikstura', 'Pomarańczowa mikstura', 'Duża pomarańczowa mikstura'];
    for (let i = 0; i < mixtureList.length; i++) {
        let option = document.createElement(`option`);
        option.value = mixtureList[i];
        option.text = mixtureList[i];
        inputMixture.appendChild(option);
    }
    const inputMixtureNumber = document.createElement("input");
    const inputTownExp = document.createElement("input");
    const inputTownDead = document.createElement("input");
    const inputItemsToSell = document.createElement("input");
    const inputItemsToSellNumber = document.createElement("input");
    const buttonResetItemsToSell = document.createElement("input");
    const inputBotMobsNames = document.createElement("input");
    const inputBotMapsNames = document.createElement("input");
    const inputBotSelector = document.createElement("select");
    for (let i = 0; i < Object.keys(expowiska).length; i++) {
        let option = document.createElement("option");
        option.value = Object.keys(expowiska)[i];
        option.text = Object.keys(expowiska)[i];
        inputBotSelector.appendChild(option);
    }
    const buttonStartStop = document.createElement("input");
    const buttonReset = document.createElement("input");

    container.style = "z-index: 1000;width: 304px;height: auto;background-color: #050726;color: #ffffff;position: absolute;";
    header.style = "height: 40px;border: 2px solid #b57104;text-align: center;font-size: 30px;padding-top: 5px;";
    content.style = "height: 300px;border: 2px solid #b57104;border-top: none;";
    checkbox1.style = "width: 135px;margin: 10px 0px 0px 10px;float: left;text-align: center;background-color: red;";
    checkbox2.style = "width: 135px;margin: 10px 0px 0px 10px;float: left;padding: 0; box-sizing: border-box;";
    inputTeleport.style = "width: 280px;margin: 10px 10px 0px 10px;padding: 0; box-sizing: border-box;";
    inputBlessing.style = "width: 280px;margin: 10px 10px 0px 10px;padding: 0; box-sizing: border-box;";
    inputMixture.style = "width: 230px;margin: 10px 0px 0px 10px;float: left;padding: 0; box-sizing: border-box;";
    inputMixtureNumber.style = "width: 40px;margin: 10px 0px 0px 10px;float: left;padding: 0; box-sizing: border-box;";
    inputTownExp.style = "width: 135px;margin: 10px 0px 0px 10px;float: left;padding: 0; box-sizing: border-box;";
    inputTownDead.style = "width: 135px;margin: 10px 0px 0px 10px;float: left;padding: 0; box-sizing: border-box;";
    inputItemsToSell.style = "width: 180px;margin: 10px 0px 0px 10px;float: left;padding: 0; box-sizing: border-box;";
    inputItemsToSellNumber.style = "width: 30px;margin: 10px 0px 0px 10px;float: left;padding: 0; box-sizing: border-box;";
    buttonResetItemsToSell.style = "width: 50px;margin: 10px 0px 0px 10px;float: left;padding: 0; box-sizing: border-box;";
    inputBotMobsNames.style = "width: 280px;margin: 10px 10px 0px 10px;padding: 0; box-sizing: border-box;";
    inputBotMapsNames.style = "width: 280px;margin: 10px 10px 0px 10px;padding: 0; box-sizing: border-box;";
    inputBotSelector.style = "width: 280px;margin: 10px 10px 0px 10px;padding: 0; box-sizing: border-box;";
    buttonStartStop.style = "width: 135px;margin: 10px 0px 0px 10px;float: left;padding: 0; box-sizing: border-box;";
    buttonReset.style = "width: 135px;margin: 10px 0px 0px 10px;float: left;padding: 0; box-sizing: border-box;";

    header.innerText = "Margonem Addons v3.1";
    content.style.display = localStorage.getItem("containerVisible") === "false" ? "none" : "block";
    checkbox1.type = "button";
    checkbox1.value = "Kapitan";
    checkbox1.style.backgroundColor = localStorage.getItem("checkbox1") === "true" ? "green" : "red";
    checkbox2.value = localStorage.getItem("checkbox2");
    inputTeleport.value = localStorage.getItem("inputTeleport");
    inputBlessing.value = localStorage.getItem("inputBlessing");
    inputMixture.value = localStorage.getItem("inputMixture");
    inputMixtureNumber.type = "number";
    inputMixtureNumber.value = localStorage.getItem("inputMixtureNumber");
    inputTownExp.placeholder = "Miasto dojścia";
    inputTownExp.value = localStorage.getItem("inputTownExp");
    inputTownDead.placeholder = "Miasto respu";
    inputTownDead.value = localStorage.getItem("inputTownDead");
    inputItemsToSell.disabled = "true";
    inputItemsToSell.placeholder = "Nazwy itemów na sell";
    inputItemsToSell.value = JSON.parse(localStorage.getItem("inputItemsToSell"));
    inputItemsToSellNumber.disabled = "true";
    inputItemsToSellNumber.value = localStorage.getItem("inputItemsToSellNumber");
    buttonResetItemsToSell.type = "button";
    buttonResetItemsToSell.value = "Resetuj";
    inputBotMobsNames.value = localStorage.getItem("bot_mobs");
    inputBotMapsNames.value = localStorage.getItem("bot_maps");
    inputBotSelector.value = localStorage.getItem("bot_expowiska");
    buttonStartStop.type = "button";
    buttonStartStop.value = localStorage.getItem("running") === "false" ? "Start" : "Stop";
    buttonReset.type = "button";
    buttonReset.value = "Resetuj";

    container.appendChild(header);
    container.appendChild(content);
    content.appendChild(checkbox1);
    content.appendChild(checkbox2);
    content.appendChild(inputTeleport);
    content.appendChild(inputBlessing);
    content.appendChild(inputMixture);
    content.appendChild(inputMixtureNumber);
    content.appendChild(inputTownExp);
    content.appendChild(inputTownDead);
    content.appendChild(inputItemsToSell);
    content.appendChild(inputItemsToSellNumber);
    content.appendChild(buttonResetItemsToSell);
    content.appendChild(inputBotMobsNames);
    content.appendChild(inputBotMapsNames);
    content.appendChild(inputBotSelector);
    content.appendChild(buttonStartStop);
    content.appendChild(buttonReset);

    header.addEventListener("click", () => {
        if(localStorage.getItem("containerVisible") === "true") {
            localStorage.setItem("containerVisible", "false");
            content.style.display = "none";
        }
        else if(localStorage.getItem("containerVisible") === "false") {
            localStorage.setItem("containerVisible", "true");
            content.style.display = "block";
        }
    });

    checkbox1.addEventListener("click", () => {
        if(localStorage.getItem("checkbox1") === "true") {
            localStorage.setItem("checkbox1", "false");
            checkbox1.style.backgroundColor = "red";
        }
        else if(localStorage.getItem("checkbox1") === "false") {
            localStorage.setItem("checkbox1", "true");
            checkbox1.style.backgroundColor = "green";
        }
    });

    checkbox2.addEventListener("change", () => {
        localStorage.setItem("checkbox2", checkbox2.value);
    });

    inputTeleport.addEventListener("change", () => {
        localStorage.setItem("inputTeleport", inputTeleport.value);
    });

    inputBlessing.addEventListener("change", () => {
        localStorage.setItem("inputBlessing", inputBlessing.value);
    });

    inputMixture.addEventListener("change", () => {
        localStorage.setItem("inputMixture", inputMixture.value);
    });

    inputMixtureNumber.addEventListener("change", () => {
        if(inputMixtureNumber.value > 0) localStorage.setItem("inputMixtureNumber", inputMixtureNumber.value);
        else localStorage.setItem("inputMixtureNumber", 0);
        inputMixtureNumber.value = localStorage.getItem("inputMixtureNumber");
    });

    inputTownExp.addEventListener("keyup", () => {
        localStorage.setItem("inputTownExp", inputTownExp.value);
    });

    inputTownDead.addEventListener("keyup", () => {
        localStorage.setItem("inputTownDead", inputTownDead.value);
    });

    inputBotMobsNames.addEventListener("keyup", () => {
        localStorage.setItem("bot_mobs", inputBotMobsNames.value);
    });

    inputBotMapsNames.addEventListener("keyup", () => {
        localStorage.setItem("bot_maps", inputBotMapsNames.value);
    });

    inputBotSelector.addEventListener("change", () => {
        localStorage.setItem("bot_expowiska", inputBotSelector.value);
        inputBotMapsNames.value = expowiska[inputBotSelector.value].map;
        localStorage.setItem(`bot_maps`, inputBotMapsNames.value);
        inputBotMobsNames.value = expowiska[inputBotSelector.value].mobs;
        localStorage.setItem(`bot_mobs`, inputBotMobsNames.value);
        localStorage.setItem("mobs_id", expowiska[inputBotSelector.value].mobs_id);
    });

    buttonResetItemsToSell.addEventListener("click", () => {
        localStorage.setItem("inputItemsToSell", JSON.stringify([]));
        localStorage.setItem("inputItemsToSellNumber", 0);
        inputItemsToSell.value = "";
        inputItemsToSellNumber.value = 0;
    });

    buttonStartStop.addEventListener("click", () => {
        if(localStorage.getItem("running") === "true") {
            localStorage.setItem("running", "false");
            buttonStartStop.value = "Start";
        }
        else if(localStorage.getItem("running") === "false") {
            localStorage.setItem("running", "true");
            buttonStartStop.value = "Stop";
        }
    });

    buttonReset.addEventListener("click", () => {
        localStorage.setItem("checkbox1", "false");
        localStorage.setItem("checkbox2", "");
        localStorage.setItem("inputTeleport", "");
        localStorage.setItem("inputBlessing", "");
        localStorage.setItem("inputMixture", "");
        localStorage.setItem("inputMixtureNumber", 0);
        localStorage.setItem("inputTownExp", "");
        localStorage.setItem("inputTownDead", "");
        localStorage.setItem("inputItemsToSell", JSON.stringify([]));
        localStorage.setItem("inputItemsToSellNumber", 0);
        localStorage.setItem("bot_mobs", "");
        localStorage.setItem("bot_maps", "");
        localStorage.setItem("bot_expowiska", "");
        localStorage.setItem("running", "false");

        checkbox1.style.backgroundColor = "red";
        checkbox2.value = "";
        inputTeleport.value = "";
        inputBlessing.value = "";
        inputMixture.value = "";
        inputMixtureNumber.value = 0;
        inputTownExp.value = "";
        inputTownDead.value = "";
        inputItemsToSell.value = "";
        inputItemsToSellNumber.value = 0;
        inputBotMobsNames.value = "";
        inputBotMapsNames.value = "";
        inputBotSelector.value = "";
        buttonStartStop.value = "Start";
    });

    function createItemsListeners() {
        for(let i in g.item) {
            if(g.item[i].loc === "g") {
                document.querySelector(`#item${g.item[i].id}`).addEventListener("contextmenu", () => {
                    let items = localStorage.getItem("inputItemsToSell") !== "" ? JSON.parse(localStorage.getItem("inputItemsToSell")) : JSON.stringify([]);
                    if(!items.includes(g.item[i].name)) items.push(g.item[i].name);
                    localStorage.setItem('inputItemsToSell', JSON.stringify(items));
                    localStorage.setItem("inputItemsToSellNumber", items.length);
                    inputItemsToSell.value = items.join(', ');
                    inputItemsToSellNumber.value = items.length;
                });
            }
        }
    }

    function findTeleports() {
        let teleports = [];
        for(let i in g.item) {
            if(g.item[i].loc === "g") {
                if(g.item[i].tip.indexOf("Teleportuje") > -1) {
                    if(!teleports.includes(g.item[i].name)) teleports.push(g.item[i].name);
                }
            }
        }
        localStorage.setItem("teleportList", JSON.stringify(teleports));
        return teleports;
    }

    function findBlessings() {
        let blessings = [];
        for(let i in g.item) {
            if(g.item[i].loc === "g") {
                if(g.item[i].tip.indexOf("Działa") > -1 && g.item[i].tip.indexOf("Mikstury") > -1) {
                    if(!blessings.includes(g.item[i].name)) blessings.push(g.item[i].name);
                }
            }
        }
        localStorage.setItem("blessingList", JSON.stringify(blessings));
        return blessings;
    }

    function useTeleport(teleportName) {
        for (let i in g.item) {
            if (g.item[i].tip.indexOf("Gotowy do użycia za") == -1 && g.item[i].name == teleportName) {
                _g(`moveitem&id=${g.item[i].id}&st=1`);
            }
        }
    }

    function returnToExp(teleportName, maps) {
        let m = maps.split(", ");
        for(i in m) {
            if(!g.dead && m[i] == map.name) {
                useTeleport(teleportName);
                return;
            }
        }
    }

    window.onload = () => {
        // Onload preferences
        document.querySelector('#inne').style.display = "none";
        document.querySelector('#MgvAddonsIcon').style.display = "none";
        document.querySelector('#ni-promo').style.display = "none";
        document.querySelector('#ual').style.display = "none";
        // Addons panel
        if(!localStorage.getItem("containerVisible")) localStorage.setItem("containerVisible", "true");
        if(!localStorage.getItem("checkbox1")) localStorage.setItem("checkbox1", "false");
        if(!localStorage.getItem("checkbox2")) localStorage.setItem("checkbox2", "false");
        if(!localStorage.getItem("inputTeleport")) localStorage.setItem("inputTeleport", "");
        if(!localStorage.getItem("inputBlessing")) localStorage.setItem("inputBlessing", "");
        if(!localStorage.getItem("inputMixture")) localStorage.setItem("inputMixture", "");
        if(!localStorage.getItem("inputMixtureNumber")) localStorage.setItem("inputMixtureNumber", 0);
        if(!localStorage.getItem("inputTownExp")) localStorage.setItem("inputTownExp", "");
        if(!localStorage.getItem("inputTownDead")) localStorage.setItem("inputTownDead", "");
        if(!localStorage.getItem("inputItemsToSell")) localStorage.setItem("inputItemsToSell", JSON.stringify([]));
        if(!localStorage.getItem("inputItemsToSellNumber")) localStorage.setItem("inputItemsToSellNumber", 0);
        if(!localStorage.getItem("bot_mobs")) localStorage.setItem("bot_mobs", "");
        if(!localStorage.getItem("bot_maps")) localStorage.setItem("bot_maps", "");
        if(!localStorage.getItem("bot_expowiska")) localStorage.setItem("bot_expowiska", "");
        if(!localStorage.getItem("running")) localStorage.setItem("running", "false");

        document.body.appendChild(container);

        $(document).bind("contextmenu",function(e){
            return false;
        });

        setTimeout(() => {
            createItemsListeners();
            findTeleports();
            findBlessings();
            returnToExp(localStorage.getItem("inputTeleport"), localStorage.getItem("inputTownDead"));
        }, 3000);
    }
})();
