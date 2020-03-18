// ==UserScript==
// @name         MARGONEM ADDONS v3.1 - LOOTFILTER
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
var clasick_plf = {
  engine: () => {
    g.loadQueue.push({
      fun: () => {
        clasick_plf.config.load();
      }
    }),
      $(
        '<style>div.clasick_plf {position: absolute; bottom: 0px; right: 0px; width: 160px; height: 40px; padding: 5px 5px 10px 5px; z-index: 499; overflow: hidden; background: #030c1c; color: white; border: 5px solid #c9a428; text-align: center; font-size: 12px;} div.clasick_plf span.toggle {font: 18px Georgia, Tahoma; color: white;} div.clasick_plf input {vertical-align: middle; margin: 0; padding: 0;} div.clasick_plf input[type="text"] {-moz-appearance: none; appearance: none; width: 62px; height: 12px; outline: none; background: white; border: none; border: 3px solid #c9a428; color: black; padding: 2px; text-shadow: 0 0 3px; font-size: 12px; transition: 0.3s ease;} div.clasick_plf input[type="text"]:focus {color: #c9a428; background: rgba(0,0,0,0.6);} div.clasick_plf table {margin: 0px auto;} div.clasick_plf table td {margin: 0; padding: 0; width: 33%; height: 22px;} div.clasick_plf hr {border: 1px solid #c9a428;}</style>'
      ).appendTo("head");
    var a = !1,
      b = lootItem;
    lootItem = function(c) {
      b(c);
      let d = parseItemStat(c.stat),
        e = parseInt(clasick_plf.vars.config[0]);
      ((isNaN(e) || c.pr >= e) && "true" == clasick_plf.vars.config[1]) ||
      (0 <= c.stat.search(/legendary/) &&
        "true" == clasick_plf.vars.config[2]) ||
      (0 <= c.stat.search(/heroic/) && "true" == clasick_plf.vars.config[3]) ||
      (0 <= c.stat.search(/unique/) && "true" == clasick_plf.vars.config[4]) ||
      ((0 <= c.stat.search(/fullheal/) ||
        0 <= c.stat.search(/leczy/) ||
        0 <= c.stat.search(/perheal/)) &&
        "true" == clasick_plf.vars.config[5]) ||
      (0 <= c.stat.search(/ammo/) && "true" == clasick_plf.vars.config[6]) ||
      (0 <= c.stat.search(/gold/) && "true" == clasick_plf.vars.config[8]) ||
      (0 <= c.stat.search(/teleport/) &&
        "true" == clasick_plf.vars.config[7]) ||
      (0 <= c.stat.search(/runes/) && "true" == clasick_plf.vars.config[9]) ||
      (0 <=
        c.stat.search(
          /Jeden ze skĹadnikĂłw legendarnej zbroi wykuwanej przez krasnoludy/
        ) &&
        "true" == clasick_plf.vars.config[10]) ||
      (0 <= c.stat.search(/ttl/) && "true" == clasick_plf.vars.config[11]) ||
      (0 <= c.stat.search(/bag/) && "true" == clasick_plf.vars.config[12])
        ? g.party &&
          !(isset(d.reqp) && -1 == d.reqp.indexOf(hero.prof)) &&
          (clasick_plf.fn.setLoots(c.id, "must"),
          setStateOnOneLootItem(c.id, 2))
        : (clasick_plf.fn.setLoots(c.id, "not"),
          setStateOnOneLootItem(c.id, 0)),
        a ||
          ((a = !0),
          setTimeout(function() {
            "true" == clasick_plf.vars.config[13]
              ? sendLoots(1, !1)
              : sendLoots(0, !1),
              (a = !1);
          }, 300));
    };
  },
  fn: {
    setLoots: function(a, i) {
      for (
        var h,
          j = { want: [], not: [], must: [] },
          f = g.loots.want,
          k = g.loots.not,
          c = g.loots.must,
          d = 0;
        d < f.length;
        d++
      )
        ((h = f[d]), !$("#loot" + h).hasClass("yours")) &&
          (!1 != a && h == a ? j[i].push(a) : j.want.push(h));
      for (var h, d = 0; d < k.length; d++)
        ((h = k[d]), !$("#loot" + h).hasClass("yours")) &&
          (!1 != a && h == a ? j[i].push(a) : j.not.push(h));
      for (var h, d = 0; d < c.length; d++)
        ((h = c[d]), !$("#loot" + h).hasClass("yours")) &&
          (!1 != a && h == a ? j[i].push(a) : j.must.push(h));
      (g.loots.want = j.want), (g.loots.not = j.not), (g.loots.must = j.must);
    }
  },
  config: {
    load: () => {
      console.log("[CLASICK -> Loot Filter] addon loaded.");
      let a = localStorage.plf_pos
        ? localStorage.plf_pos.split("|")
        : ["15", "15"];
      $(
        '<div class="clasick_plf" style="position: absolute; right: ' +
          "215" +
          "px; bottom: " +
          "0" +
          'px;"><div><span class="toggle" tip="Rozwi\u0144">&#x2699; Loot Filter</span></div><div style="text-align: left; text-indent: 10px;"><label><input type="checkbox" name="t_value" /> Powy\u017Cej</label> <input type="text" onchange="this.value=clasick_plf.format(this.value);" /><img src="https://www.margonem.pl/obrazki/itemy/zlo/patr_coin01.gif" style="vertical-align: middle; position: absolute; right: -3px;" /><br /><hr /><table><tr><td><label tip="\u0141ap: przedmioty legendarne' +
          ("object" == typeof ln
            ? ""
            : "<br />polecany dodatek: <b>Legendary Notificator</b>") +
          '" style="color: #c9a428; text-shadow: 0 0 1px #D4433B, 0 0 4px #D4433B;"><input type="checkbox" name="t_lega" /> *L*</label></td><td><label tip="\u0141ap: przedmioty heroiczne" style="color: #c9a428; text-shadow: 0 0 1px #D4433B, 0 0 4px #D4433B;"><input type="checkbox" name="t_hero" /> *H*</label></td><td><label tip="\u0141ap: przedmioty unikatowe" style="color: #c9a428; text-shadow: 0 0 1px #D4433B, 0 0 4px #D4433B;"><input type="checkbox" name="t_uni" /> *U*</label></td></tr><tr><td><label tip="\u0141ap: mikstury lecz\u0105ce"><input type="checkbox" name="t_mix" /><img src="http://www.margonem.pl/obrazki/itemy/pot/pra_m4.gif" style="vertical-align: middle; height: 20px; width: 20px;" /></label></td><td><label tip="\u0141ap: strza\u0142y"><input type="checkbox" name="t_strzaly" /><img src="http://www.margonem.pl/obrazki/itemy/arr/strzala13.gif" style="vertical-align: middle; height: 20px; width: 20px;" /></label></td><td><label tip="\u0141ap: teleporty"><input type="checkbox" name="t_tp" /><img src="http://www.margonem.pl/obrazki/itemy/pap/pap265.gif" style="vertical-align: middle; height: 20px; width: 20px;" /></label></td></tr><tr><td><label tip="\u0141ap: z\u0142oto"><input type="checkbox" name="t_gold" /><img src="http://www.margonem.pl/obrazki/itemy/zlo/denar01.gif" style="vertical-align: middle; height: 20px; width: 20px;" /></label></td><td><label tip="\u0141ap: Smocze Runy"><input type="checkbox" name="t_runy" /><img src="https://www.margonem.pl/obrazki/itemy/sur/smocza_runa3.gif" style="vertical-align: middle; height: 20px; width: 20px;" /></label></td><td><label tip="\u0141ap: kamienie runiczne"><input type="checkbox" name="t_kamien" /><img src="https://www.margonem.pl/obrazki/itemy/neu/kam9viv.gif" style="vertical-align: middle; height: 20px; width: 20px;" /></label></td></tr><tr><td><label tip="\u0141ap: b\u0142ogos\u0142awie\u0144stwa"><input type="checkbox" name="t_blogo" /><img src="http://helios.margonem.pl/obrazki/itemy/ble/blo73.gif" style="vertical-align: middle; height: 20px; width: 20px;" /></label></td><td><label tip="\u0141ap: torby"><input type="checkbox" name="t_bags" /><img src="https://www.margonem.pl/obrazki/itemy/bag/toolsbag.gif" style="vertical-align: middle; height: 20px; width: 20px;" /></label></td><td><label tip="Akceptuj \u0142up automatycznie"><input type="checkbox" name="autoaccept" /> &#10003;</label></td></tr><tr><td><span style="font-size: 130%; color: #c9a428; text-shadow: 0 0 1px orange; cursor: pointer; display: none;" tip="Ustawienia" onclick="message(\'Ustawienia b\u0119d\u0105 dost\u0119pne w przysz\u0142ej aktualizacji\');">&#9733;</span></td><td colspan="2"><span style="font-size: 80%; position: relative; right:-25px; bottom:0;">v' +
          clasick_plf.vars.version +
          ' by c<span style="color:aqua;text-shadow:0 0 1px black, 0 0 3px aqua, 0 0 5px aqua;">LA</span>sick</span></td></tr></table></div></div>'
      )
        .appendTo("body"),
        $("div.clasick_plf span.toggle").click(function() {
          var a = 60 >= $("div.clasick_plf").innerHeight() ? "160px" : "40px";
          $(this).attr("tip", "40px" == a ? "Rozwi\u0144" : "Zwi\u0144"),
            $("div.clasick_plf").animate({ height: a });
        }),
        $("div.clasick_plf")
          .find('input[type="text"]')
          .val(clasick_plf.format(clasick_plf.vars.config[0])),
        $("div.clasick_plf")
          .find('input[type="checkbox"]')
          .each(function(a) {
            this.checked = !("true" != clasick_plf.vars.config[a + 1]);
          }),
        $("div.clasick_plf input").change(function() {
          $(this).blur(), clasick_plf.config.save.filters();
        });
    },
    save: {
      filters: function() {
        var a = [];
        a.push(
          $('div.clasick_plf input[type="text"]').val()
            ? parseInt(
                $('div.clasick_plf input[type="text"]')
                  .eq(0)
                  .val()
                  .replace(/ /g, "")
              )
            : "0"
        ),
          $('div.clasick_plf input[type="checkbox"]').each(function() {
            a.push(this.checked);
          }),
          (localStorage.plf_config = a),
          (clasick_plf.vars.config = a),
          clasick_plf.vars.refresh();
      }
    },
    reset: () => {
      delete localStorage.plf_config,
        delete localStorage.plf_pos,
        message(goldTxt("# " + clasick_plf.vars.name + " #")),
        message(
          'Ustawienia dodatku zosta\u0142y zresetowane, zalecane <u onclick="window.location.reload(true);">od\u015Bwie\u017Cenie</u> gry.'
        );
    }
  },
  format: a =>
    /^[0-9]+$/.test(a)
      ? a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      : a
          .replace(/[^0-9]/g, "")
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " "),
  vars: {
    version: "1.0.0",
    name: "Loot Filter",
    world: location.host.split(".")[0],
    config: localStorage.plf_config ? localStorage.plf_config.split(",") : [0],
    refresh: function() {
      clasick_plf.vars.config = localStorage.plf_config
        ? localStorage.plf_config.split(",")
        : [0];
    }
  }
};
clasick_plf.engine();
})();
