// ==UserScript==
// @name         MARGONEM ADDONS v3.1 - AUTOHEAL
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

    // Your code here...
    g.loadQueue.push({
    fun: function () {

        function waitforitem(){
            if(g.item.length==0){
                setTimeout(waitforitem,300);
                console.log('[AutoHeal]Wait for g.item...');
            }else{
              console.log('[AutoHeal]Find g.item.');
  let main = {
    potion_name : localStorage.getItem(hero.nick),
    allnames : [],
  };

  const kordy = JSON.parse(localStorage.getItem(`apos`));
  if(!localStorage.getItem('aProcent')) localStorage.setItem('aProcent','85');
  const select = document.createElement('select');
  select.id='aPotion';
  select.classList='select-style';

  for(let i in g.item){
    const {id,name,stat,loc} = g.item[i];
    if(stat.indexOf('leczy')!=-1 && loc=='g' && main.allnames.includes(name)==false || stat.indexOf('fullheal')!=-1 || stat.indexOf('perheal')!=-1){
        let x = document.createElement('option');
        x.innerHTML = name;
        x.id = id;
        select.appendChild(x);
        main.allnames.push(name);
    };
  }
  select.value = main.potion_name;

  const divek = document.createElement('div');
                divek.style = "position: absolute; bottom: 0px; right: 465px; height: 45px; z-index: 497; width: 340px; padding: 5px; border: 5px solid #c9a428; background: #030c1c; color: white;"
  divek.style.display='block';
  divek.id='a_Div';
  if(localStorage.getItem('aMini')=='true') divek.style.display='none';
  else divek.style.display='block';
  divek.appendChild(select);
  document.body.appendChild(divek);


  const divek_mini = document.createElement('img');
  divek_mini.style.position='absolute';
  divek_mini.src='https://i.imgur.com/L8FI0tO.gif';
  document.body.appendChild(divek_mini);
  divek_mini.style.top= "25px";
  divek_mini.style.right= "235px";
  divek_mini.style.display='block';
  divek_mini.style.zIndex='999999';
  if(localStorage.getItem('aMini')=='false') divek_mini.style.display='none';
  else divek_mini.style.display='block';
  document.body.appendChild(divek_mini);



  const lek_value = document.createElement('input');
  lek_value.style.maxWidth='38px'
  lek_value.value = parseInt(localStorage.getItem('aProcent'));
  lek_value.type='number';
  lek_value.tip='Od ilu % leczyć'
  divek.appendChild(lek_value);

  const txt = document.createElement('span');
  txt.innerHTML='%';
  divek.appendChild(txt);

  const check = document.createElement('input');
  if(localStorage.getItem('aStatusx') == 'on'){
    check.checked=true;
  }else{
    check.checked=false;
  };
  check.type='checkbox';
  divek.appendChild(check);

  const span = document.createElement('span');
  span.innerHTML='On/Off<br><span style="font-size : 11px">Używaj wszystkich potek:</span> ';
  divek.appendChild(span);


  const other_potion = document.createElement('input');
  if(localStorage.getItem('aother_potion') == 'on'){
    other_potion.checked=true;
  }else{
    other_potion.checked=false;
  };
  other_potion.type='checkbox';
  divek.appendChild(other_potion);

  document.body.appendChild(divek);

  const css = `
  .select-style {
    border: 1px solid #ccc;
    width: 200px;
    border-radius: 5px;
    overflow: hidden;
    background: #fafafa url("img/icon-select.png") no-repeat 90% 50%;
  }

  .select-style select {
    padding: 5px 8px;
    width: 130%;
    border: none;
    box-shadow: none;
    background: transparent;
    background-image: none;
    -webkit-appearance: none;
  }

  .select-style select:focus {
    outline: none;
  }
  `;

  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);

  select.addEventListener('change',()=>{
    message(`Zapisano <span style="color : green">${select.value}</span>!`);
    localStorage.setItem(hero.nick,select.value);
  });



  if(localStorage.getItem('aother_potion')=='on') select.disabled=true; //ustawia bloka

  check.addEventListener('change',()=>{
    if(check.checked==true){
        message('AutoHeal On!')
        localStorage.setItem('aStatusx','on');
    }else{
        message('AutoHeal Off!')
        localStorage.setItem('aStatusx','off');
    }
  });


  divek.addEventListener('contextmenu',(e)=>{
    e.preventDefault();
    if(!localStorage.getItem('aMini')) localStorage.setItem('aMini','false');
    if(localStorage.getItem('aMini')=='false'){
      divek_mini.style.display='block';
      divek.style.display='none';
      localStorage.setItem('aMini','true');
    }
  });

  divek_mini.addEventListener('contextmenu',(e)=>{
    e.preventDefault();
    if(!localStorage.getItem('aMini')) localStorage.setItem('aMini','false');
    if(localStorage.getItem('aMini')=='true'){
      divek_mini.style.display='none';
      divek.style.display='block';
      localStorage.setItem('aMini','false');
    }
  });


  other_potion.addEventListener('change',()=>{
    if(other_potion.checked==true){
        message('UĹźywanie wszystkich potek <font style="color:green">ON!')
        select.disabled=true;
        localStorage.setItem('aother_potion','on');
    }else{
      message('UĹźywanie wszystkich potek <font style="color:red">OFF!')
      select.disabled=false;
        localStorage.setItem('aother_potion','off');
    }
  });

  lek_value.addEventListener('change',()=>{
    if(lek_value.value==100){
        localStorage.setItem('aProcent','99');
        message(`Zapisano <span style="color:red">${lek_value.value}% </span>!`);
       }else if(lek_value.value>100){
           message(`BĹÄd <span style="color:red">${lek_value.value}% </span> pomyĹl dlaczego..!`);
        }else if(lek_value.value<0){
           message(`BĹÄd <span style="color:red">${lek_value.value}%</span> pomyĹl dlaczego..!`);
        }else{
        message(`Zapisano <span style="color:red">${lek_value.value}% </span>!`);
        localStorage.setItem('aProcent',lek_value.value);
   		 }

  });


  let timer;

  let heal = () =>{
  var hp = Math.floor(hero.hp / hero.maxhp * 100);
  var item = localStorage.getItem(hero.nick);
  let statusx = localStorage.getItem('aStatusx');
  let tryb= localStorage.getItem('aother_potion');
  if(tryb=='on'){
    if(hp <= parseInt(localStorage.getItem('aProcent'))&& g.dead == false && g.battle == 0 && statusx=='on' && g.talk.id==0){
      for(let i in g.item){
        const {name,id,loc,stat} = g.item[i];
        if(g.item[i].name != 'Zielona pietruszka' && g.item[i].name != 'Kandyzowane wisienki w cukrze' && loc == 'g' && stat.indexOf('leczy=-')==-1 && stat.indexOf('leczy')!=-1 || stat.indexOf('fullheal')!=-1 || stat.indexOf('perheal')!=-1){
          _g(`moveitem&id=${i}&st=1`,(res)=>{if(res.alert=='Nie speĹniasz wymagaĹ koniecznych do uĹźywania tego przedmiotu!') clearInterval(timer)});
          break;
        }
      }
    };
  }else{
    for (let i in g.item) {
      const {name,id,loc} = g.item[i];
       if (name == item && hp <= parseInt(localStorage.getItem('aProcent')) && loc == 'g'&& g.talk.id==0 && g.dead == false && g.battle == 0 && statusx=='on') {
             _g(`moveitem&id=${i}&st=1`,(res)=>{
                 if(res.alert=='Nie speĹniasz wymagaĹ koniecznych do uĹźywania tego przedmiotu!') clearInterval(timer);
             });
             break;
           };
         };
   };

   timer=setTimeout(heal, 300);
  }


  heal();
            }
        } waitforitem();
  }});


})();
