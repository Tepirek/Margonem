// ==UserScript==
// @name         MARGONEM ADDONS v3.1 - VISIBILITY
// @description  none
// @namespace    http://tampermonkey.net/
// @author       Tepirek
// @version      3.1
// @updateURL    https://github.com/Tepirek/Margonem/raw/master/addonsPanel.user.js
// @downloadURL  https://github.com/Tepirek/Margonem/raw/master/addonsPanel.user.js
// @match        http://*.margonem.pl/
// @grant        none
// ==/UserScript==

(() => {
    new class oooooooooooooooooooo {
        constructor() {
            this.interface = typeof window.Engine === "object" ? "ni" : "si";
            this.npcsOutOfView = new Array();
            this.initAjaxParser();
        }

        get hero() {
            return this.interface === "ni" ? window.Engine.hero.d : window.hero;
        }

        get map() {
            return this.interface === "ni" ? window.Engine.map.d : window.map;
        }

        get npcs() {
            return this.interface === "ni" ? this.npcsOnNewInterface : window.g.npc;
        }

        get npcsOnNewInterface() {
            const newNpcs = new Object();

            for (const [id, npc] of Object.entries(window.Engine.npcs.check())) {
                newNpcs[id] = npc.d;
            }

            return newNpcs;
        }

        npcInOutOfRange({x:hx, y:hy}, {x, y}) {
            return Math.abs(x - hx) > this.map.visibility || Math.abs(y - hy) > this.map.visibility;
        }

        initAjaxParser() {
            const self = this;
            const _ajax = window.$.ajax;

            window.$.ajax = (...args) => {
                if (args[0].url.indexOf("/engine?t=") > -1) {
                    const oldsucc = args[0].success;
                    args[0].success = (...arg) => {
                        const canEmit = typeof arg[0] === "object" && arg[0] !== null && arg[0].e === "ok";

                        if (canEmit) {
                            arg[0] = self.parseInput(arg[0]);
                        }

                        return oldsucc.apply(this, arg);
                    };
                }

                return _ajax.apply(this, args);
            }
        }

        parseInput(data) {
            if (this.map.visibility !== 0) {
                if (data.hasOwnProperty("npc") && data.npc !== undefined) {
                    for (const [id, npc] of Object.entries(data.npc)) {
                        if (npc.hasOwnProperty("del") && npc.del === 1 && this.npcs[id] !== undefined) {
                            if ([2, 3].includes(this.npcs[id].type) && this.npcInOutOfRange(this.hero, this.npcs[id])) {
                                this.npcsOutOfView.push(id);
                                delete data.npc[id];
                            }
                        }
                    }
                }
            }

            if (data.hasOwnProperty("h")) {
                const npcsToRemove = new Array();

                for (const [id, npc] of Object.entries(this.npcs)) {
                    if (this.npcsOutOfView.includes(id) && !this.npcInOutOfRange(data.h, npc)) {
                        this.npcsOutOfView.splice(this.npcsOutOfView.indexOf(id), 1);

                        if ((data.hasOwnProperty("npc") && data.npc[id] === undefined) || !data.hasOwnProperty("npc")) {
                            npcsToRemove.push(id);
                        }
                    }
                }

                if (npcsToRemove.length > 0) {
                    if (!data.hasOwnProperty("npc")) {
                        data.npc = new Object();
                    }

                    for (const id of npcsToRemove) {
                        data.npc[id] = {
                            del: 2
                        }
                    }
                }
            }

            return data;
        }
    }
})()
