// ==UserScript==
// @name         MARGONEM ADDONS v3.1 - STASIS
// @description  none
// @namespace    http://tampermonkey.net/
// @author       Tepirek
// @version      3.1
// @updateURL    https://github.com/Tepirek/Margonem/raw/master/addonsPanel.user.js
// @downloadURL  https://github.com/Tepirek/Margonem/raw/master/addonsPanel.user.js
// @match        http://*.margonem.pl/
// @grant        none
// ==/UserScript==

function dice(vx,vy)
{
    return Math.floor(Math.random()*(vy-vx+1)+vx);
}

setInterval(function(){
    if($("#stasis-overlay").css("display") == "block")
    {
        message("STAN NIEAKTYWNOSCI");
        var x = dice(1,4);
        switch(x)
        {
            case 1:
                for(var a=0; a<2; a++){
                    jQuery.event.trigger({ type : 'keypress', which : 87 });
                };
                break;
            case 2:
                for(var b=0; b<2; b++){
                    jQuery.event.trigger({ type : 'keypress', which : 83 });
                };
                break;
            case 3:
                for(var c=0; c<2; c++){
                    jQuery.event.trigger({ type : 'keypress', which : 65 });
                };
                break;
            case 4: for(var d=0; d<2; d++){
                jQuery.event.trigger({ type : 'keypress', which : 68 });
            };
                break;
        }
    }
},dice(1000,2000));

setInterval(function(){
    message("ODŚWIEŻAM");
    window.location.reload();
},dice(120000,240000));
