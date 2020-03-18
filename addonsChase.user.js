// ==UserScript==
// @name         MARGONEM ADDONS v3.1 - CHASE
// @description  123
// @namespace    http://tampermonkey.net/
// @author       Tepirek
// @version      3.1
// @updateURL    https://github.com/Tepirek/Margonem/raw/master/addonsPanel.user.js
// @downloadURL  https://github.com/Tepirek/Margonem/raw/master/addonsPanel.user.js
// @match        http://*.margonem.pl/
// @run-at       document-end
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function(d, _p, _nP, _r, _bM) {
    let tmparr = new Array();

    //elementy graficzne
    let box = d.createElement("span");
    box.id = "enepere123";
    box.style = "position: absolute; z-index: 1000; color: white; top: 0px; left: 0px; min-width: 300px; font-size: 15px;";
    d.body.appendChild(box);
    let uciek = d.createElement("span");
    uciek.innerHTML = "UCIECZKA";
    uciek.style.fontWeight = "bold";
    uciek.tip = "Naciśnij podczas walki, aby po walce automatycznie uciec na Kwieciste Przejście.";

    //zmienne dla ucieczki
    let isUcieczka = false;
    let idZwoja;
    window.hero.searchPath1 = function(a, t) {
                if (this.isBlockedSearchPath()) return this.blockedInfoSearchPath();
                for (var h = [], i = 128 & hero.opt ? 8 : 20, r = Math.max(0, Math.min(a, this.x) - i), s = Math.min(map.x - 1, Math.max(a, this.x) + i), o = Math.max(0, Math.min(t, this.y) - i), e = Math.min(map.y - 1, Math.max(t, this.y) + i), d = r - 1; s + 1 >= d; d++) {
                    h[d] = [];
                    for (var x = o - 1; e + 1 >= x; x++) h[d][x] = !(d >= r && s >= d && x >= o && e >= x) || isset(g.npccol[d + 256 * x]) || map.col && "0" != map.col.charAt(d + x * map.x) ? -2 : -1
                }
                h[this.x][this.y] = 0, b = -1, road = [];
                for (var c = {
                    x: -1,
                    y: -1,
                    dist: 99
                }, y = 1; s - r + e - o + 3 > y; y++)
                    for (var d = r; s >= d; d++)
                        for (var x = o; e >= x; x++) {
                            if (-1 != h[d][x] || h[d][x - 1] != y - 1 && h[d][x + 1] != y - 1 && h[d - 1][x] != y - 1 && h[d + 1][x] != y - 1 || (h[d][x] = y), h[a][t] > 0) {
                                d = s + 1;
                                break
                            }
                            c.dist2 = Math.abs(a - d) + Math.abs(t - x), h[d][x] == y && c.dist2 < c.dist && (c.x = d, c.y = x, c.dist = c.dist2)
                        }
                if (c.hdist = Math.abs(a - hero.x) + Math.abs(t - hero.y), h[a][t] > 0 || c.dist < c.hdist) {
                    h[a][t] < 0 && (a > c.x ? b = 2 : a < c.x ? b = 1 : t > c.y ? b = 0 : t < c.y && (b = 3), a = c.x, t = c.y), road[0] = {
                        x: a,
                        y: t
                    };
                    for (var f = h[a][t] - 1, l = a, m = t; f > 0; f--) h[l][m - 1] == f ? m-- : h[l][m + 1] == f ? m++ : h[l - 1][m] == f ? l-- : h[l + 1][m] == f ? l++ : f = 0, f && (road[h[a][t] - f] = {
                        x: l,
                        y: m
                    })
                }
                road.length > 1 && null == g.playerCatcher.follow && $("#target").stop().css({
                    left: 32 * a,
                    top: 32 * t,
                    display: "block",
                    opacity: 1
                }).fadeOut(1e3)
            };
    uciek.addEventListener("click", function() {
        if (g.battle) {
            if (!isUcieczka) {
                for (let i in g.item) {
                    if (g.item[i].loc == "g" && g.item[i].name == "Zwój teleportacji na Kwieciste Przejście") {
                        isUcieczka = true;
                        idZwoja = i;
                        uciek.style.color = "green";
                        uciek.innerHTML = "UCIECZKA AKTYWNA";
                        break;
                    }
                }
            } else {
                uciek.style.color = "white";
                uciek.innerHTML = "UCIECZKA";
                isUcieczka = false;
            }
        }
    });
    box.appendChild(uciek);
    let dane = d.createElement("span");
    box.appendChild(dane);
    let style = d.createElement("style");
    style.innerHTML = ".adison9711:hover{background:#686868}";
    d.head.appendChild(style);
    //zmienna numeracji
    let number;
    //zmienne dla poscigu
    let oid = 0;
    let ox;
    let oy;
    let hx;
    let hy;
    let walczacy = [];
    //anulowanie poscigu
    d.querySelector("#nick").addEventListener("click", function() {
        if (oid != 0) {
            oid = 0;
            message(`Przerwałeś pościg!`);
        }
    });

    //stworzenie spana dla osoby
    function wyjebPodswietlenie() {
        for (let i in g.other) {
            d.querySelector(`#other${i}`).style.backgroundColor = "";
        }
    }

    function createOtherSpan(nr, id, nick, klan, relacja, lvl, profa, prawa) {
        if(klan == "Brak klanu" || klan == "Anioły Ciemności" || klan == "Archanioły Ciemności" || klan == "Nowe Porządki" || klan == "Libertas" || klan == "Zwykły Klan" || klan == "Ciemna strona pomidora" || klan == "Tańczący z Orkami" || klan == "Freedom" || klan == "Żołnierze Wyklęci") {
        //caly div
        let sp = d.createElement("span");
        sp.classList.add("adison9711");
        sp.innerHTML = `<br>${nr}. `;
        //nick i relacja(style tez)
        let nickname = d.createElement("span");
        nickname.innerHTML = `${nick}`;
        nickname.tip = "Naciśnij, aby napisać do tej osoby.";
        nickname.addEventListener("click", function() {
            chatTo(`${nick}`);
        });
        nickname.style.fontWeight = "bold";
        if (prawa > 0) {
            nickname.style.background = "gold";
        }
        switch (relacja) {
            case "fr":
                sp.style.background = "#02cf39";
                nickname.style.background = "#296639";
                break;
            case "en":
                sp.style.background = "#ff0000";
                nickname.style.background = "#912d2d";
                break;
            case "cl":
                sp.style.background = "#00aeff";
                nickname.style.background = "#36657a";
                break;
        }
        sp.style.background = "#ff0000";
        nickname.style.background = "#912d2d";

           if(klan == "Brak klanu") {
               sp.style.background = "#2c6963";
               nickname.style.background = "#2c6963";
           }
        sp.appendChild(nickname);

        //lvl i profa
        let lvlpr = d.createElement("span");
        lvlpr.innerHTML = ` ${lvl}${profa} `;
        sp.appendChild(lvlpr);

        //odleglosc
        let odle = d.createElement("span");
        let licz = Math.round(Math.sqrt(Math.pow(g.other[id].x - hero.x, 2) + Math.pow(g.other[id].y - hero.y, 2)));
        odle.innerHTML = `[Odl.: ${licz}] `;
        odle.tip = "Naciśnij, aby podejść."
        odle.addEventListener("click", function() {
            window.hero.searchPath1(g.other[id].x, g.other[id].y);
        });
        sp.appendChild(odle);

        //poscig
        let forposcig = d.createElement("span");
        forposcig.innerHTML = `[ATAKUJ]`;
        forposcig.tip = "Naciśnij, aby aktywować pościg."
        forposcig.addEventListener("click", function() {
            if (!g.battle) {
                if (map.pvp == 2) {
                    oid = id;
                    message(`Rozpoczęto pościg za: ${g.other[id].nick}!`);
                } else {
                    message(`Nie jesteś na czerwonej mapce!`);
                }
            } else {
                message(`Trwa walka!`);
            }
        });
        sp.appendChild(forposcig);

        //kolorek dla postaci po najechaniu
        sp.addEventListener("mouseover", function() {
            wyjebPodswietlenie();
            d.querySelector(`#other${id}`).style.backgroundColor = "rgb(255, 102, 0, .65)";
            d.querySelector(`#other${id}`).style.borderRadius = "7px";
        });
        sp.addEventListener("mouseleave", function() {
            if (g.other[id]) d.querySelector(`#other${id}`).style.backgroundColor = "";
        });
        dane.appendChild(sp);

        // dodawanie divow
        }
    }

    //kreacja div'a
    function createDiv() {
        number = 1;
        dane.innerHTML = "";
        for (let i in g.other) {
            let litera = "";
            if (number < 10) litera = `0${number}`;
            else litera = number;
            let o = g.other[i];
            if (o.nick === undefined) continue;
            if (o.clan === undefined) {
                createOtherSpan(litera, o.id, o.nick, "Brak klanu", o.relation, o.lvl, o.prof, o.rights);
            }
            else {
                createOtherSpan(litera, o.id, o.nick, o.clan.name, o.relation, o.lvl, o.prof, o.rights);
            }
            number++;
        }
    }

    //funkcje podstawowe
    parseInput = function(a, b, c) {
        _p(a, b, c);
        //dodanie do tablicy walczacych graczy
        if (a.hasOwnProperty("emo")) {
            for (let i in a.emo) {
                if (a.emo[i].name == "battle" && !walczacy.includes(a.emo[i].source_id)) {
                    walczacy.push(a.emo[i].source_id);
                } else if (a.emo[i].name != "battle" && walczacy.includes(a.emo[i].source_id)) {
                    walczacy.splice(walczacy.indexOf(a.emo[i].source_id), 1);
                }
            }
        }
        d.querySelector("#enepere123").style.width = d.querySelector("#centerbox").style.left;
        createDiv();
    }

    hero.run = function() {
        if (oid != 0) {
            if (g.other[oid]) {
                ox = g.other[oid].x;
                oy = g.other[oid].y;
                hx = hero.x;
                hy = hero.y;
                if (!g.battle) {
                    if (Math.abs(hx - ox) <= 3 && Math.abs(hy - oy) <= 3) {
                        if (!walczacy.includes(Number(oid))) _g(`fight&a=attack&id=${oid}`);
                    }
                    if (hx != ox || hy != oy) {
                        window.hero.searchPath1(ox, oy);
                    }
                } else {
                    oid = 0;
                    message(`Jest walka!`);
                }
            }
        }
        _r.apply(this, arguments);
    }

    let chudsada;
battleMsg = function(a, b) {
    let ret = _bM(a, b);
    if (a.indexOf("winner=") > -1) {
        _g("fight&a=quit");
        if (isUcieczka) {
            _g(`moveitem&st=1&id=${idZwoja}`);
            isUcieczka = false;
            uciek.style.color = "white";
            uciek.innerHTML = "UCIECZKA";
        }
        chudsada = setInterval(function(){
            if(g.battle){
                _g("fight&a=quit");
            } else {
                clearInterval(chudsada);
            }
        }, 100);
    }
    return ret;
}
})(document, parseInput, newNpc, hero.run, battleMsg)
