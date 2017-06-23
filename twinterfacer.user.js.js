// ==UserScript==
// @name            TWInterfacer
// @description     A new intarface brought to TheWest
// @author          xShteff
// @version         0.01
// @match           https://*.the-west.net/game.php*
// @match           https://*.the-west.de/game.php*
// @match           https://*.the-west.pl/game.php*
// @match           https://*.the-west.nl/game.php*
// @match           https://*.the-west.se/game.php*
// @match           https://*.the-west.ro/game.php*
// @match           https://*.the-west.com.pt/game.php*
// @match           https://*.the-west.cz/game.php*
// @match           https://*.the-west.es/game.php*
// @match           https://*.the-west.ru/game.php*
// @match           https://*.the-west.com.br/game.php*
// @match           https://*.the-west.org/game.php*
// @match           https://*.the-west.hu/game.php*
// @match           https://*.the-west.gr/game.php*
// @match           https://*.the-west.dk/game.php*
// @match           https://*.the-west.sk/game.php*
// @match           https://*.the-west.fr/game.php*
// @match           https://*.the-west.it/game.php*
// @downloadURL     https://xshteff.github.io/TWInterfacer/scriptuser.js
// @updateURL       https://xshteff.github.io/TWKappa/twkappa.user.js
// @grant           none
// @run-at          document-end
// ==/UserScript==

var TWInterfacer = {
    Avatar: function () {
        if (Character.avatarConfig === null && $('#ui_char_avatar img').length === 1) {
            $('#ui_char_avatar img').css({
                'border-radius': '50%'
            });
        } else {
            var newAvatar = $("<div>").css({
                'background': 'url("https://zz1.beta.the-west.net/img.php?type=own_avatar&x=136&y=154")',
                'background-size': '100%',
                'border-radius': '50%',
                'width': '136px',
                'height': '136px',
                'background-position-y': '-10px'
            });
            if ($("#ui_char_avatar .avatar_pic .avatar_pic").length > 0)
                $('#ui_char_avatar .avatar_pic .avatar_pic').remove();
            else {
                setTimeout(function () {
                    TWInterfacer.Avatar()
                }, 500);
            }
            $('#ui_char_avatar .avatar_pic').append(newAvatar);
        }
    },
    CharLinks: function () {
        var charLWrap = $("<img>").attr('src', 'https://puu.sh/wqyyn/fd99395ff6.png').css({
            'width': '30px'
        });

        $('.char_links').css({
            'border-radius': '50%'
        }).append(charLWrap) /*.wrap("<div class='xsht_menu_item'></div>")*/ ;
        $('#ui_character_container .character_link').css({
            'height': '144px',
            'top': '0px'
        });

        $('.char_links.skills').css({
            'left': '126px',
            'top': '4px'
        });

        $('.char_links.questbook').css({
            'left': '140px',
            'top': '30px'
        });

        $('.char_links.achievements').css({
            'left': '145px',
        });

        $('.char_links.ranking').css({
            'left': '140px',
            'top': '89px'
        });

        $('.char_links.daily').css({
            'left': '127px',
            'top': '115px'
        });
    },
    NameAndLevel: function () {
        $('#ui_character_container .char_name').remove();

        $('#ui_character_container .level').remove();

        var newName = $("<span>").attr({
            'onclick': 'PlayerProfileWindow.open();',
            'title': 'View profile'
        }).text(Character.name).css({
            'cursor': 'pointer'
        });

        var newLevel = $("<span>").text(" (" + Character.level + ")").css({
            'font-weight': 'bold'
        });

        var newThing = $("<div>").css({
            'top': '160px',
            'position': 'absolute',
            'color': 'white',
            'text-align': 'center',
            'width': '142px',
            'font-size': '12px'
        }).append(newName).append(newLevel);

        $('#ui_character_container').css({
            'background-image': 'url("https://puu.sh/wrBon/8e174780d2.png")',
            'height': '190px'
        }).prepend(newThing);
    },
    Bars: function () {
        $('.status_bar.energy_bar').css({
            'top': '176px'
        });

        $('.status_bar.health_bar').css({
            'top': '161px'
        });
    },
    SaloonBar: function () {
        $('#ui_notibar').css({
            'margin-top': '250px'
        });
    },
    HealthAndEnergy: function () {
        $('#ui_character_avatar_container').css({
            'top': '10px',
            'left': '15px'
        });

        function parseSVG(s) {
            var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
            div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
            var frag = document.createDocumentFragment();
            while (div.firstChild.firstChild)
                frag.appendChild(div.firstChild.firstChild);
            return frag;
        }

        var donutEnergy = (Character.energy / (Character.maxEnergy / 100)) / 2;
        var leftoverEnergy = 100 - donutEnergy;

        var donutHealth = (Character.health / Character.maxHealth) * 100 / 2;
        var healthLeftover = 100 - donutHealth;
        var egColor = "#174c84"
        if (Character.maxEnergy === 150) {
            egColor = "#46af31"
        }

        var svg = '<svg width="150" height="150" viewBox="0 0 42 42" class="donut" style="transform:rotateX(180deg)">';
        svg += '<circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="transparent"></circle>';
        svg += '<circle class="donut-energy" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="' + egColor + '" stroke-width="2" stroke-dasharray="' + donutEnergy + ' ' + leftoverEnergy + '" stroke-dashoffset="25"></circle>';
        svg += '</svg>';
        svg += '<svg width="150" height="150" viewBox="0 0 42 42" class="donut" style="transform:rotateY(180deg) rotateX(180deg)">';
        svg += '<circle class="donut-health" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ac140c" stroke-width="2" stroke-dasharray="' + donutHealth + ' ' + healthLeftover + '" stroke-dashoffset="25"></circle>';
        svg += '</svg>';
        document.getElementById('ui_character_container').appendChild(parseSVG(svg));

        $('.donut').css({
            'width': '200px',
            'height': '200px',
            'top': '-28px',
            'left': '-28px',
            'position': 'absolute',
            'z-index': '-1'
        });

        EventHandler.listen("energy", function (a, b) {
            var donutEnergy = (a / (Character.maxEnergy / 100)) / 2;;
            var leftoverEnergy = 100 - donutEnergy;
            $('.donut-energy').attr('stroke-dasharray', donutEnergy + " " + leftoverEnergy);
        });

        EventHandler.listen("health", function (a, b) {
            var donHp = (a / (Character.maxHealth / 100)) / 2;;
            var leftHp = 100 - donHp;
            $('.donut-health').attr('stroke-dasharray', donHp + " " + leftHp);
        });

        $('.energy_bar').hide();
        $('.health_bar').hide();
        $('.energy_add').css({
            'top': '142px',
            'left': '72px',
            'bottom': 0
        });
        var donutcontainer = $("<img>").attr('src', 'https://puu.sh/wsor7/24b1f4bf45.png').addClass('donutContainer').css({
            position: 'absolute',
            top: '-12px',
            left: '-12px'
        });
        $('#ui_character_container').before(donutcontainer);
    },
    Init: function () {
        TWInterfacer.HealthAndEnergy();
        TWInterfacer.Avatar();
        TWInterfacer.CharLinks();
        TWInterfacer.Bars();
        TWInterfacer.NameAndLevel();
        TWInterfacer.SaloonBar();
    },
}

TWInterfacer.Init();

/*for (var i = 0; i < $('#mmap_layer_7_foreign_forts').children().length; i++) {
    console.log($('#mmap_layer_7_foreign_forts:nth-child(' + i + ')').css('left'));
}
$.each($('.mmap_county_layer'), function (a) {
    $.each($(this), function (b) {
        var leftValue = parseInt($(this).css('left'));
        $(this).css('left', (leftValue + 5) + "px")
    });
});
$.each($('#mmap_layer_7_foreign_forts').children(), function (a, b) {
    var leftValue = parseInt($(this).css('left'));
    $(this).css('left', (leftValue + 5) + "px")
})*/