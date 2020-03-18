// ==UserScript==
// @name         MARGONEM ADDONS v3.1 - FAST FIGHT
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
    g.loadQueue.push({fun:function(){
        var timer1, timer2, timer3;
        const divek12 = document.createElement('div');
        divek12.style = "position: absolute; bottom: 0px; right: 390px; z-index: 498; width: 60px; height: 45px; padding: 5px !important; text-align: center; border: 5px solid #c9a428; background: #030c1c; color: white;";

        const kruci1 = document.createElement('input');
        if(localStorage.getItem('aBattle') == 'on'){
            kruci1.checked = true;
        }else{
            kruci1.checked = false;
        }
        kruci1.type='checkbox';
        kruci1.tip = "Automatyczna walka";
        divek12.appendChild(kruci1);

        const kruci2 = document.createElement('input');
        if(localStorage.getItem('alertOff') == 'on'){
            kruci2.checked = true;
        }else{
            kruci2.checked = false;
        }
        kruci2.type='checkbox';
        kruci2.tip = "Alerty";
        divek12.appendChild(kruci2);

        const kruci3 = document.createElement('input');
        if(localStorage.getItem('loading') == 'on'){
            kruci3.checked = true;
        }else{
            kruci3.checked = false;
        }
        kruci3.type='checkbox';
        kruci3.tip = "Szybsze ładowanie gry";
        divek12.appendChild(kruci3);

        const span = document.createElement('span');
        span.innerHTML='<center>On/Off<br></center>';
        divek12.appendChild(span);

        document.body.appendChild(divek12);

        kruci1.addEventListener('change',()=>{
            if(kruci1.checked==true){
                message('Szybka walka On!')
                location.reload();
                localStorage.setItem('aBattle','on');
            }else{
                message('Szybka walka Off!')
                location.reload();
                localStorage.setItem('aBattle','off');
            }
        });

        kruci2.addEventListener('change',()=>{
            if(kruci2.checked==true){
                message('Alerty wyłączone!')
                location.reload();
                localStorage.setItem('alertOff','on');
            }else{
                message('Alerty włączone!')
                location.reload();
                localStorage.setItem('alertOff','off');
            }
        });

        kruci3.addEventListener('change',()=>{
            if(kruci3.checked==true){
                message('Szybsze ładowanie włączone!')
                location.reload();
                localStorage.setItem('loading','on');
            }else{
                message('Szybsze ładowanie wyłączone!')
                location.reload();
                localStorage.setItem('loading','off');
            }
        });

        function lookx(){
            if(localStorage.getItem('aBattle') == 'on'){
                if($("#autobattleButton").css("display") == "block"){
                    $("#autobattleButton").click()
                };
                timer1 = setTimeout(lookx, 500);
            }else {
                clearInterval(timer1);
            }
        }lookx();

        function looky(){
            if(localStorage.getItem('alertOff') == 'on'){
                mAlert = function() {};
                timer2 = setTimeout(looky, 500);
            }else {
                clearInterval(timer2);
            }
        }looky();

        function lookz(){
            if(localStorage.getItem('loading') == 'on'){
                // Szybsze ładowanie gry by Priv
                $.getScript("http://addons2.margonem.pl/get/83/83679verified.js");
                timer3 = setTimeout(lookz, 500);
            }else {
                clearInterval(timer3);
            }
        }lookz();
    }})
})();
