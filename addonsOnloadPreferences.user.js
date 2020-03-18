// ==UserScript==
// @name         MARGONEM ADDONS v3.1 - ONLOAD PREFERENCES
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

    window.onload = () => {
        document.querySelector('#inne').style.display = "none";
        document.querySelector('#MgvAddonsIcon').style.display = "none";
        document.querySelector('#ni-promo').style.display = "none";
        document.querySelector('#ual').style.display = "none";
    };
})();
