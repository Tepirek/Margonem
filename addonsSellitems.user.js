// ==UserScript==
// @name         MARGONEM ADDONS v3.1 - SELLITEMS
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

(function() {
    'use strict';

    class AStar {
        constructor(collisionsString, width, height, start, end , additionalCollisions){
            this.width = width;
            this.height = height;
            this.collisions = this.parseCollisions(collisionsString, width, height);
            this.additionalCollisions = additionalCollisions || {};
            this.start = this.collisions[start.x][start.y];
            this.end = this.collisions[end.x][end.y];
            this.start.beginning = true;
            this.start.g = 0;
            this.start.f = heuristic(this.start,this.end);
            this.end.target = true;
            this.end.g = 0;
            //if(this.start.collision) throw new Error('Start point cannot be a collision!');
            //if(this.end.collision) throw new Error('End point cannot be a collision!');
            this.addNeighbours();
            this.openSet = [];
            this.closedSet = [];
            this.openSet.push(this.start);
        }

        parseCollisions(collisionsString, width, height){
            const collisions = new Array(width);
            for(let w = 0; w < width; w++){
                collisions[w] = new Array(height);
                for(let h = 0; h < height; h++){
                    collisions[w][h] = new Point(w, h, collisionsString.charAt(w+h*width) === '1');
                }
            }
            return collisions;
        }

        addNeighbours(){
            for(let i = 0; i < this.width; i++){
                for(let j = 0; j < this.height; j++){
                    this.addPointNeighbours(this.collisions[i][j])
                }
            }
        }

        addPointNeighbours(point){
            const x = point.x, y = point.y;
            const neighbours = [];
            if(x > 0) neighbours.push(this.collisions[x-1][y]);
            if(y > 0) neighbours.push(this.collisions[x][y-1]);
            if(x < this.width - 1) neighbours.push(this.collisions[x+1][y]);
            if(y < this.height -1) neighbours.push(this.collisions[x][y+1]);
            point.neighbours = neighbours;
        }

        anotherFindPath(){
            while(this.openSet.length > 0){
                let currentIndex = this.getLowestF();
                let current = this.openSet[currentIndex];
                if(current === this.end) return this.reconstructPath();
                else{
                    this.openSet.splice(currentIndex,1);
                    this.closedSet.push(current);
                    for(const neighbour of current.neighbours){
                        if(this.closedSet.includes(neighbour)) continue;
                        else{
                            const tentative_score = current.g + 1;
                            let isBetter = false;
                            if(this.end == this.collisions[neighbour.x][neighbour.y] || (!this.openSet.includes(neighbour) && !neighbour.collision && !this.additionalCollisions[neighbour.x+256*neighbour.y])){
                                this.openSet.push(neighbour);
                                neighbour.h = heuristic(neighbour, this.end);
                                isBetter = true;
                            }else if(tentative_score < neighbour.g && !neighbour.collision){
                                isBetter = true;
                            }
                            if(isBetter){
                                neighbour.previous = current;
                                neighbour.g = tentative_score;
                                neighbour.f = neighbour.g + neighbour.h;
                            }
                        }
                    }
                }
            }
        }

        getLowestF(){
            let lowestFIndex = 0;
            for(let i = 0; i< this.openSet.length; i++){
                if(this.openSet[i].f < this.openSet[lowestFIndex].f) lowestFIndex = i;
            }
            return lowestFIndex;
        }

        reconstructPath(){
            const path = [];
            let currentNode = this.end;
            while(currentNode !== this.start){
                path.push(currentNode);
                currentNode = currentNode.previous;
            }
            return path;
        }
    }

    class Point{
        constructor(x, y, collision){
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
    function heuristic(p1, p2){
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }

    function getWay(x,y){
        return (new AStar(map.col, map.x, map.y, {x: hero.x, y: hero.y}, {x: x, y: y}, g.npccol)).anotherFindPath();
    }
    var debug = false;

    function goTo(x,y){
        let _road_ = getWay(x,y);
        if(debug) console.log(_road_);
        if(!Array.isArray(_road_)) return;
        window.road = _road_;
    }

    let itemsToSellString = [];
    let itemsToSellArray = [];

    function useTeleport(teleportName) {
        for (let i in g.item) {
            if (g.item[i].tip.indexOf("Gotowy do użycia za") == -1 && g.item[i].name == teleportName) {
                _g(`moveitem&id=${g.item[i].id}&st=1`);
            }
        }
    }

    function useBlessing(blessingName) {
        for(let i in g.item){
            if(g.item[i].name == blessingName && hero.ble == null) {
                _g(`moveitem&id=${g.item[i].id}&st=1`);
            }
        }
    }

    function selectPotion() {
        if(localStorage.getItem("inputMixture") == "Mała pomarańczowa mikstura") return 80184260;
        else if(localStorage.getItem("inputMixture") == "Pomarańczowa mikstura") return 80184261;
        else return 80184262;
    }

    function countPotion() {
        if(localStorage.getItem("inputMixture") == "") return -1;
        let counter = 0;
        for(let i in g.item){
            if(g.item[i].name == localStorage.getItem("inputMixture")) {
                counter++;
            }
        }
        return counter;
    }

    function addItemToList(itemName) {
        let items = (localStorage.getItem('inputItemsToSell')) ? JSON.parse(localStorage.getItem('inputItemsToSell')) : [];
        if(!items.includes(itemName)) items.push(itemName);
        localStorage.setItem('inputItemsToSell', JSON.stringify(items));
        inputItemsToSell.value = items.join(', ');
    }

    function addItemsToSellArray() {
        let items = (localStorage.getItem("inputItemsToSell")) ? JSON.parse(localStorage.getItem("inputItemsToSell")) : "";

        for (let i in g.item) {
            for (let j in items) {
                if(g.item[i].name == items[j]) {
                    if(!itemsToSellArray.includes(g.item[i].id)) itemsToSellArray.push(g.item[i].id);
                }
            }
        }
        itemsToSellString = itemsToSellArray.join(',');
    }

    function checkFullBags() {
        var torba1 = document.getElementById('bs0');
        var torba2 = document.getElementById('bs1');
        var torba3 = document.getElementById('bs2');
        if(torba1.innerText == "0" && torba2.innerText == "0" && torba3.innerText == "0") return true;
        else return false;
    }

    function sellItems() {
        if(map.name != "Kwieciste Przejście" && map.name != "Dom Tunii") {
            localStorage.setItem("lastBotMaps", localStorage.getItem("bot_maps"));
            localStorage.setItem("bot_maps", "Dom Tunii");
            useTeleport("Zwój teleportacji na Kwieciste Przejście");
        }
        else if (map.name == "Dom Tunii" && (hero.x != 7 || hero.y != 10)) {
            goTo(7, 10);
        }
        else if(map.name == "Dom Tunii" && hero.x == 7 && hero.y == 10) {
            setTimeout(() => {_g(`talk&id=${16366}`);}, 1000);
            setTimeout(() => {$(`#replies li:contains(Pokaż mi, co masz na sprzedaż.)`).click();}, 2000);
            setTimeout(() => {addItemsToSellArray();}, 3000);
            console.log(selectPotion());
            setTimeout(() => {_g(`shop&buy=${selectPotion()},${localStorage.getItem("inputMixtureNumber") - countPotion()}&sell=${itemsToSellString}`);}, 3500);
            setTimeout(() => {$(`#shop_close`).click();}, 4000);
            setTimeout(() => {
                localStorage.setItem("shoppingDone", 1);
                localStorage.setItem("sell", "false");
            }, 4500);
        }
    }

    function returnToExp() {
        if(localStorage.getItem("inputTeleport") == "KWIATY") {
            localStorage.setItem("shoppingDone", 0);
            localStorage.setItem("bot_maps", localStorage.getItem("lastBotMaps"));
            location.reload();
        }
        else if (localStorage.getItem("inputTeleport") != "THUZAL" && localStorage.getItem("inputTeleport") != "KWIATY") {
            localStorage.setItem("shoppingDone", 0);
            localStorage.setItem("bot_maps", localStorage.getItem("lastBotMaps"));
            useTeleport(localStorage.getItem("inputTeleport"));
        }
        else if(map.name == "Dom Tunii") {
            localStorage.setItem("bot_maps", "Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Gildia Magów");
            setTimeout(() => {location.reload();}, 2000);
        }
        else if(map.name == "Thuzal") {
            localStorage.setItem("bot_maps", "Gildia Magów");
        }
        else if(map.name == "Gildia Magów" && (hero.x != 17 || hero.y != 14)) {
            goTo(17, 14);
        }
        else if(map.name == "Gildia Magów" && hero.x == 17 && hero.y == 14) {
            setTimeout(() => {_g(`talk&id=59861`);}, 1000);
            setTimeout(() => {
                localStorage.setItem("shoppingDone", 0);
                localStorage.setItem("bot_maps", localStorage.getItem("lastBotMaps"));
                $(`#replies li:contains(${localStorage.getItem("inputTownExp")})`).click();}, 2000);
        }
    }

    g.loadQueue.push({
        fun: () => {
            setInterval(() => {
                if(localStorage.getItem("running") == "true" && (checkFullBags() || (!checkFullBags() && countPotion() == 0 && countPotion() != -1))) localStorage.setItem("sell", "true");
                if(localStorage.getItem("sell") == "true") sellItems();
                else if(localStorage.getItem("shoppingDone") == 1) returnToExp();
                else if(localStorage.getItem("inputBlessing") != "") useBlessing(localStorage.getItem("inputBlessing"));

                if(map.name == "Trupia Przełęcz" && hero.x == 3 && hero.y == 80) {
                    setTimeout(() => {_g(`talk&id=32691`);}, 1000);
                    setTimeout(() => {$(`#replies li:contains(${localStorage.getItem("inputTownExp")})`).click();}, 2000);
                }

                if(localStorage.getItem("checkbox1") === "true" && map.name == "Port Tuzmer") {
                    if(hero.x != 79 || hero.y != 48) goTo(79, 48);
                    else if(hero.x == 79 || hero.y == 48) {
                        setTimeout(() => {_g(`talk&id=38389`);}, 500);
                        setTimeout(() => {$(`#replies li:contains(Toć ja nie szukam pracy, tylko ją oferuję.)`).click();}, 1000);
                        setTimeout(() => {$(`#replies li:contains(${localStorage.getItem("checkbox2")})`).click();}, 1500);
                        setTimeout(() => {$(`#replies li:contains(Drogo, ale zgadzam się.)`).click();}, 2000);
                        setTimeout(() => {$(`#replies li:contains(Dalej)`).click();}, 2500);
                    }
                }
            }, 5000);
        }
    });
})();
