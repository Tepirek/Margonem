// ==UserScript==
// @name         MARGONEM ADDONS v3.1 - BOT
// @description  
// @namespace    http://tampermonkey.net/
// @author       Aro
// @version      3.1.3
// @updateURL    https://github.com/Tepirek/mAddon-v3.0/raw/master/MARGONEM%20ADDONS%20v3.1%20-%20BOT.user.js
// @downloadURL  https://github.com/Tepirek/mAddon-v3.0/raw/master/MARGONEM%20ADDONS%20v3.1%20-%20BOT.user.js
// @match        http://telawel.margonem.pl/
// @run-at       document-end
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest

(function(_bM) {
    'use strict';

    log = function() {
        if (arguments[0] == 'Bot' && arguments[1] == 1) {
            location.reload();
            message('Błąd - gra się przładowuje');
        };
        var b = "";
        var a = false;
        if (arguments.length > 1) {
            switch (parseInt(arguments[1])) {
                case 1:
                    b = "Warning: ";
                    if (hero.uprawnienia == 0 && arguments[0].match(/Pakiet odrzucony, poprzednie/)) {
                        a = true
                    }
                    // location.reload();
                    break;
                case 2:
                    b = "Error: ";
                    location.reload();
                    break;
                case 3:
                    a = true;
                    b = "Fatal error: ";
                    $("#console").show();
                    location.reload();
                    break;
                default:
                    b = "Unknow: "
            }
        }
        if (arguments.length > 2 && arguments[2]) {
            b = ""
        }
        $("#contxt").append("<DIV" + (arguments.length > 1 ? (" class=loglvl_" + arguments[1]) : "") + ">" + b + arguments[0] + "</DIV>").scrollTop(1);
        if (b != "" && !a) {
            $("#warn").fadeIn()
        }
    }

    new function bocikTest() {
        if (typeof g == "undefined" && document.location.href.indexOf("telawel.margonem.pl") > -1) {
            document.location.reload();
        }

        //algorytm A*
        class AStar {
            constructor(collisionsString, width, height, start, end, additionalCollisions) {
                this.width = width;
                this.height = height;
                this.collisions = this.parseCollisions(collisionsString, width, height);
                this.additionalCollisions = additionalCollisions || {};
                this.start = this.collisions[start.x][start.y];
                this.end = this.collisions[end.x][end.y];
                this.start.beginning = true;
                this.start.g = 0;
                this.start.f = heuristic(this.start, this.end);
                this.end.target = true;
                this.end.g = 0;
                this.addNeighbours();
                this.openSet = [];
                this.closedSet = [];
                this.openSet.push(this.start);
            }

            parseCollisions(collisionsString, width, height) {
                const collisions = new Array(width);
                for (let w = 0; w < width; w++) {
                    collisions[w] = new Array(height);
                    for (let h = 0; h < height; h++) {
                        collisions[w][h] = new Point(w, h, collisionsString.charAt(w + h * width) === '1');
                    }
                }
                return collisions;
            }

            addNeighbours() {
                for (let i = 0; i < this.width; i++) {
                    for (let j = 0; j < this.height; j++) {
                        this.addPointNeighbours(this.collisions[i][j])
                    }
                }
            }

            addPointNeighbours(point) {
                const x = point.x,
                      y = point.y;
                const neighbours = [];
                if (x > 0) neighbours.push(this.collisions[x - 1][y]);
                if (y > 0) neighbours.push(this.collisions[x][y - 1]);
                if (x < this.width - 1) neighbours.push(this.collisions[x + 1][y]);
                if (y < this.height - 1) neighbours.push(this.collisions[x][y + 1]);
                point.neighbours = neighbours;
            }

            anotherFindPath() {
                while (this.openSet.length > 0) {
                    let currentIndex = this.getLowestF();
                    let current = this.openSet[currentIndex];
                    if (current === this.end) return this.reconstructPath();
                    else {
                        this.openSet.splice(currentIndex, 1);
                        this.closedSet.push(current);
                        for (const neighbour of current.neighbours) {
                            if (this.closedSet.includes(neighbour)) continue;
                            else {
                                const tentative_score = current.g + 1;
                                let isBetter = false;
                                if (this.end == this.collisions[neighbour.x][neighbour.y] || (!this.openSet.includes(neighbour) && !neighbour.collision && !this.additionalCollisions[neighbour.x + 256 * neighbour.y])) {
                                    this.openSet.push(neighbour);
                                    neighbour.h = heuristic(neighbour, this.end);
                                    isBetter = true;
                                } else if (tentative_score < neighbour.g && !neighbour.collision) {
                                    isBetter = true;
                                }
                                if (isBetter) {
                                    neighbour.previous = current;
                                    neighbour.g = tentative_score;
                                    neighbour.f = neighbour.g + neighbour.h;
                                }
                            }
                        }
                    }
                }
            }

            getLowestF() {
                let lowestFIndex = 0;
                for (let i = 0; i < this.openSet.length; i++) {
                    if (this.openSet[i].f < this.openSet[lowestFIndex].f) lowestFIndex = i;
                }
                return lowestFIndex;
            }

            reconstructPath() {
                const path = [];
                let currentNode = this.end;
                while (currentNode !== this.start) {
                    path.push(currentNode);
                    currentNode = currentNode.previous;
                }
                return path;
            }
        }

        class Point {
            constructor(x, y, collision) {
                this.x = x;
                this.y = y;
                this.collision = collision;
                this.g = 10000000;
                this.f = 10000000;
                this.neighbours = [];
                this.beginning = false;
                this.target = false;
                this.previous = undefined;
            }
        }

        function heuristic(p1, p2) {
            return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
        }

        function a_getWay(x, y) {
            return (new AStar(map.col, map.x, map.y, {
                x: hero.x,
                y: hero.y
            }, {
                x: x,
                y: y
            }, g.npccol)).anotherFindPath();
        }

        function a_goTo(x, y) {
            let _road_ = a_getWay(x, y);
            if (!Array.isArray(_road_)) return;
            window.road = _road_;
        }


        //localStorage dla ostatnich mapek
        if (!localStorage.getItem("bot_lastmaps")) {
            localStorage.setItem("bot_lastmaps", JSON.stringify(new Array()));
        }

        let self = this;
        let blokada = false;
        let blokada2 = false;
        let $m_id;
        let herolx,
            heroly,
            increment = 0;


        let bolcka = false;
        let start = false;
        setInterval(() => {
            start = localStorage.getItem("running") === "true" ? true : false;
        }, 500);

        let deade = true;
        let globalArray = new Array();

        function addToGlobal(id) {
            let npc = g.npc[id];
            if (npc.grp) {
                for (let i in g.npc) {
                    if (g.npc[i].grp == npc.grp && !globalArray.includes(g.npc[i].id)) {
                        globalArray.push(g.npc[i].id);
                    }
                }
            } else if (!globalArray.includes(id)) {
                globalArray.push(id);
            }
        }

        function chceckBlockade() {
            for (let i in g.npc) {
                let n = g.npc[i];
                if ((n.type == 2 || n.type == 3) && n.wt < 19 && checkGrp(n.id) && hero.lvl + 30 >= n.lvl && Math.abs(hero.x - n.x) < 2 && Math.abs(hero.y - n.y) < 2 && checkHeroHp()) {
                    return _g(`fight&a=attack&ff=1&id=-${n.id}`);
                }
            }
        }

        //testowa opcja
        setInterval(function() {
            if ($m_id) {
                $m_id = undefined;
            }
        }, 4000);

        let $map_cords = undefined;
        this.PI = parseInput;
        parseInput = function(a) {
            let ret = self.PI.apply(this, arguments); //tutaj dodałem chwilowo poki nie daje rady xd
            if (!g.battle && !g.dead && start) {
                if (!$m_id && !bolcka) {
                    $m_id = self.findBestMob();
                    if (!$m_id && localStorage.getItem(`bot_expowiska`)) {
                        let tmp_naj1,
                            tmp_naj2 = 9999;
                        if (localStorage.getItem("mobs_id") != "") {
                            let exP_mobs = localStorage.getItem("mobs_id").split(",");
                            for (let i in exP_mobs) {
                                if (g.npc[exP_mobs[i]]) {
                                    tmp_naj1 = a_getWay(g.npc[exP_mobs[i]].x, g.npc[exP_mobs[i]].y).length;
                                    if (tmp_naj1 < tmp_naj2) {
                                        tmp_naj2 = tmp_naj1;
                                        $m_id = exP_mobs[i];
                                    }
                                }
                            }
                        }
                    }
                    blokada2 = false;
                    blokada = false;
                }
                if ($m_id) {
                    let mob = g.npc[$m_id];
                    if (!mob) {
                        $m_id = undefined;
                        return ret;
                    }
                    if (Math.abs(hero.x - mob.x) < 2 && Math.abs(hero.y - mob.y) < 2 && !blokada) {
                        blokada = true;
                        if (checkGrp(mob.id)) {
                            _g(`fight&a=attack&ff=1&id=-${mob.id}`, function(res) {
                                //sprawdzenie czy walczy z innym
                                if (res.alert && res.alert == `Przeciwnik walczy już z kimś innym`) {
                                    addToGlobal(mob.id);
                                    $m_id = undefined;
                                }
                            });
                        }
                        setTimeout(function() {
                            $m_id = undefined;
                        }, 300);
                    } else if (!blokada2 && !blokada) {
                        a_goTo(mob.x, mob.y);
                        blokada2 = true;
                    }
                } else if (localStorage.getItem("bot_maps").length > 0) {
                    //g.gwIds - obiekt id mapy i kordy -> 1: `1.13`
                    //g.townname - obiekt id mapy i nazwa -> 1: `Ithan`
                    $map_cords = self.findBestGw();
                    if ($map_cords && !bolcka) {
                        if (hero.x == $map_cords.x && hero.y == $map_cords.y) {
                            _g(`walk`);
                        } else {
                            a_goTo($map_cords.x, $map_cords.y);
                            bolcka = true;
                            setTimeout(function() {
                                bolcka = false;
                            }, 2000);
                        }
                    }
                }

                if (heroly == hero.y && herolx == herolx) {
                    increment++;
                    if (increment > 4) {
                        chceckBlockade();
                        increment = 0;
                        $m_id = undefined;
                        $map_cords = undefined;
                        bolcka = false;
                    }
                } else {
                    heroly = hero.y;
                    herolx = hero.x;
                    increment = 0;
                }
            }
            return ret;
        }

        function checkGrp(id) {
            if (g.npc[id]) { //tutaj
                if (!checke2(g.npc[id].grp)) {
                    return false;
                }
            }
            return true;
        }

        function checke2(grpid) {
            for (let i in g.npc) {
                if (g.npc[i].grp == grpid && g.npc[i].wt > 19) {
                    return false;
                }
            }
            return true;
        }

        function checkHeroHp() {
            if (hero.hp / hero.maxhp * 100 > 70) {
                return true;
            }
            return false;
        }

        this.findBestMob = function() {
            let b1,
                b2 = 9999,
                id;
            let xxx = localStorage.getItem("bot_mobs").split(`, `);

            for (let i in g.npc) {
                let n = g.npc[i];
                for(let j in xxx) {
                    if(n.nick == xxx[j] && checkGrp(n.id) && !globalArray.includes(n.id)){
                        b1 = a_getWay(n.x, n.y);
                        if (b1 == undefined) continue;
                        if (b1.length < b2) {
                            b2 = b1.length;
                            id = n.id;
                        }
                    }
                }
            }
            return id;
        }

        if (!localStorage.getItem(`mapCounter`)) {
            localStorage.setItem(`mapCounter`, 0);
        }

        this.findBestGw = function() {
            let obj,
                txt = localStorage.getItem("bot_maps").split(`, `),
                inc = parseInt(localStorage.getItem(`mapCounter`));

            for (let i in g.townname) {
                //bo admini daja podwojna spacje w nazwach mapy??????
                if (txt[inc] == g.townname[i].replace(/ +(?= )/g, '')) {
                    let c = g.gwIds[i].split(`.`);
                    if (a_getWay(c[0], c[1]) == undefined) continue;
                    obj = {
                        x: c[0],
                        y: c[1]
                    };
                }
                if (obj) {
                    return obj;
                }
            }
            inc++;
            if (inc > txt.length) {
                inc = 0;
            }
            localStorage.setItem(`mapCounter`, parseInt(inc));
        }

        g.loadQueue.push({
            fun : function() {
                // licznik bycia na tych samych koordach przez dłuższy czas
                var counter = 0;
                var a1, b1;
                setInterval(function() {
                    if(a1 == hero.x && b1 == hero.y) {
                        counter++;
                        // console.log(counter);
                    }
                    else {
                        a1 = hero.x;
                        b1 = hero.y;
                        counter = 0;
                    }
                }, 500);

                // odświeżanie jeśli auto walka nie zadziała
                setInterval(function() {
                    if(!g.dead &&  g.battle != "0" && counter > 20) {
                        location.reload();
                    }
                }, 1000);

                // zmienianie koloru tła przy pełnych torbach
                setInterval(function() {
                    var torba1 = document.getElementById('bs0');
                    var torba2 = document.getElementById('bs1');
                    var torba3 = document.getElementById('bs2');
                    var torba4 = document.getElementById('bs6');

                }, 1000);
            }});
    }
    battleMsg = function(a, b) {
        let ret = _bM(a, b);
        if (a.indexOf("winner=") > -1) _g("fight&a=quit");
        return ret;
    }
})(battleMsg);

