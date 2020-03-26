// ==UserScript==
// @name         MARGONEM ADDONS v3.1 - CHASE
// @description  none
// @namespace    http://tampermonkey.net/
// @author       Tepirek
// @version      3.1
// @updateURL    https://github.com/Tepirek/Margonem/raw/master/addonsPanel.user.js
// @downloadURL  https://github.com/Tepirek/Margonem/raw/master/addonsPanel.user.js
// @match        http://*.margonem.pl/
// @grant        none
// ==/UserScript==

(function(d, _p, _nP, _r, _bM) {
    let tmparr = new Array();

    //elementy graficzne
    let box = d.createElement("span");
    box.id = "enepere123";
    box.style = "position:absolute;z-index:1000;min-width:380px;max-width:380px;color:white;top:0px;left:0px;font-size:16px;";
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
    let dane = d.createElement("div");
    dane.style = "min-width:360px";
    box.appendChild(dane);
    //zmienna numeracji
    let number;
    //zmienne dla poscigu
    let attack = false;
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
            attack = false;
            message(`Przerwano pościg lub śledzenie!`);
        }
    });

    //stworzenie spana dla osoby
    function wyjebPodswietlenie() {
        for (let i in g.other) {
            d.querySelector(`#other${i}`).style.backgroundColor = "";
        }
    }

    function createOtherSpan(nr, id, nick, klan, relacja, lvl, profa, prawa) {
        let entry = d.createElement("div");
        entry.style = "padding-top:2px;padding-bottom:2px;background:black";

        let entryNumber = d.createElement("div");
        entryNumber.style = "float:left;width:25px";
        entryNumber.innerHTML = `${nr}. `;
        entry.appendChild(entryNumber);

        let entryNickname = d.createElement("div");
        entryNickname.style = "float:left;width:130px";
        entryNickname.innerHTML = `${nick} `;
        entryNickname.addEventListener("click", function() {
            chatTo(`${nick}`);
        });
        switch (klan) {
            case 'ARYSTOKRACJA':
            case 'MAGNATERIA':
            case 'Death Eaters':
            case 'Arystokracja Ciemności':
            case 'Trusted':
            case 'Óseless':
            case 'Phasianae':
            case 'Szit Reality':
            case 'N N J L':
                entry.style.background = "#2c8535";
                break;
            case 'Anioły Ciemności':
            case 'Archanioły Ciemności':
            case 'Libertas':
            case 'Nowe Porządki':
            case 'Zwykły Klan':
            case 'Arvania':
            case 'Tańczący z Orkami':
            case 'Weterani z Piekła Rodem':
                entry.style.background = "#913131";
                break;
        }
        entry.appendChild(entryNickname);

        let entryLevel = d.createElement("div");
        entryLevel.style = "float:left;width:40px";
        entryLevel.innerHTML = `${lvl}${profa} `;
        entry.appendChild(entryLevel);

        let distance = Math.round(Math.sqrt(Math.pow(g.other[id].x - hero.x, 2) + Math.pow(g.other[id].y - hero.y, 2)));
        if (distance < 10) distance = `0${distance}`;
        let entryDistance = d.createElement("div");
        entryDistance.style = "float:left;width:30px";
        entryDistance.innerHTML = `[${distance}] `;
        entry.appendChild(entryDistance);

        let entryChase = d.createElement("div");
        entryChase.style = "float:left;width:75px";
        entryChase.innerHTML = '[ATTACK]';
        entryChase.addEventListener("click", function() {
            if (!g.battle) {
                if(map.pvp == 2) {
                    oid = id;
                    attack = true;
                    message("Rozpoczęto pościg za: ${g.other[id].nick}!");
                } else message("Nie jesteś na czerwonej mapie!");
            } else message("Trwa walka!");
        });
        entry.appendChild(entryChase);

        let entryFollow = d.createElement("div");
        entryFollow.style = "float:left;width:75px";
        entryFollow.innerHTML = '[FOLLOW]';
        entryFollow.addEventListener("click", function() {
            if (!g.battle) {
                oid = id;
                attack = false;
                message(`Rozpoczęto podążanie za: ${g.other[id].nick}!`);
            } else message("Trwa walka!");
        });
        entry.appendChild(entryFollow);

        let entryClear = d.createElement("div");
        entryClear.style = "clear:both";
        entry.appendChild(entryClear);
        dane.appendChild(entry);
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
                    if (attack && Math.abs(hx - ox) <= 1 && Math.abs(hy - oy) <= 1) {
                        if (!walczacy.includes(Number(oid))) _g(`fight&a=attack&id=${oid}`);
                    }
                    if (hx != ox || hy != oy) {
                        window.hero.searchPath1(ox, oy);
                    }
                } else {
                    oid = 0;
                    attack = false;
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
            }, 300);
        }
        return ret;
    }
})(document, parseInput, newNpc, hero.run, battleMsg)
