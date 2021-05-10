let x = 0;
$(document).ready(function () {
    function changeToCrimson() {
        $(".custom-colour-1").css("background-color", "#b21e35");
        $(".custom-colour-2").css("background-color", "#a11d33");
        $(".custom-colour-3").css("background-color", "#85182a");
        $(".custom-colour-4").css("background-color", "#6e1423");
        $(".custom-colour-5").css("background-color", "#641220");
        $("body").css("color", "white");
        $("a").css("color", "mistyrose").hover(
            function() {
                $(this).css("background-color", "crimson");
            },
            function() {
                $(this).css("background-color", "");
            }
        );
        $("*").css("scrollbar-color", "crimson mistyrose");
    }
    function changeToOrange() {
        $(".custom-colour-1").css("background-color", "#ff9e00");
        $(".custom-colour-2").css("background-color", "#ff9100");
        $(".custom-colour-3").css("background-color", "#ff8500");
        $(".custom-colour-4").css("background-color", "#ff7900");
        $(".custom-colour-5").css("background-color", "#ff6d00");
        $("body").css("color", "white");
        $("a").css("color", "mistyrose").hover(
            function() {
                $(this).css("background-color", "orange");
            },
            function() {
                $(this).css("background-color", "");
            }
        )
        $("*").css("scrollbar-color", "orange mistyrose");
    }
    function changeToBrown() {
        $(".custom-colour-1").css("background-color", "#e6ccb2");
        $(".custom-colour-2").css("background-color", "#ddb892");
        $(".custom-colour-3").css("background-color", "#b08968");
        $(".custom-colour-4").css("background-color", "#9c6644");
        $(".custom-colour-5").css("background-color", "#7f5539");
        $("body").css("color", "white");
        $("a").css("color", "mistyrose").hover(
            function() {
                $(this).css("background-color", "sienna");
            },
            function() {
                $(this).css("background-color", "");
            }
        )
        $("*").css("scrollbar-color", "sienna mistyrose");
    }
    function changeToGreen() {
        $(".custom-colour-1").css("background-color", "#92bd2e");
        $(".custom-colour-2").css("background-color", "#719a19");
        $(".custom-colour-3").css("background-color", "#4f7703");
        $(".custom-colour-4").css("background-color", "#3c5c07");
        $(".custom-colour-5").css("background-color", "#28410b");
        $("body").css("color", "white");
        $("a").css("color", "mistyrose").hover(
            function() {
                $(this).css("background-color", "forestgreen");
            },
            function() {
                $(this).css("background-color", "");
            }
        )
        $("*").css("scrollbar-color", "forestgreen mistyrose");
    }
    function changeToTurquoise() {
        $(".custom-colour-1").css("background-color", "#80ffdb");
        $(".custom-colour-2").css("background-color", "#72efdd");
        $(".custom-colour-3").css("background-color", "#64dfdf");
        $(".custom-colour-4").css("background-color", "#56cfe1");
        $(".custom-colour-5").css("background-color", "#48bde3");
        $("body").css("color", "white");
        $("a").css("color", "mistyrose").hover(
            function() {
                $(this).css("background-color", "turquoise");
            },
            function() {
                $(this).css("background-color", "");
            }
        )
        $("*").css("scrollbar-color", "turquoise mistyrose");
    }
    function changeToBlue() {
        $(".custom-colour-1").css("background-color", "#00b4d8");
        $(".custom-colour-2").css("background-color", "#0096c7");
        $(".custom-colour-3").css("background-color", "#0077b6");
        $(".custom-colour-4").css("background-color", "#023e8a");
        $(".custom-colour-5").css("background-color", "#03045e");
        $("body").css("color", "white");
        $("a").css("color", "mistyrose").hover(
            function() {
                $(this).css("background-color", "dodgerblue");
            },
            function() {
                $(this).css("background-color", "");
            }
        )
        $("*").css("scrollbar-color", "dodgerblue mistyrose");
    }
    function changeToGray() {
        $(".custom-colour-1").css("background-color", "#ced4da");
        $(".custom-colour-2").css("background-color", "#adb5bd");
        $(".custom-colour-3").css("background-color", "#6c757d");
        $(".custom-colour-4").css("background-color", "#495057");
        $(".custom-colour-5").css("background-color", "#343a40");
        $("body").css("color", "white");
        $("a").css("color", "mistyrose").hover(
            function() {
                $(this).css("background-color", "gray");
            },
            function() {
                $(this).css("background-color", "");
            }
        )
        $("*").css("scrollbar-color", "gray mistyrose");
    }
    function changeToIndigo() {
        $(".custom-colour-1").css("background-color", "#9d4edd");
        $(".custom-colour-2").css("background-color", "#7b2cbf");
        $(".custom-colour-3").css("background-color", "#5a189a");
        $(".custom-colour-4").css("background-color", "#3c096c");
        $(".custom-colour-5").css("background-color", "#240046");
        $("body").css("color", "white");
        $("a").css("color", "mistyrose").hover(
            function() {
                $(this).css("background-color", "indigo");
            },
            function() {
                $(this).css("background-color", "");
            }
        )
        $("*").css("scrollbar-color", "indigo mistyrose");
    }
    function changeToPink() {
        $(".custom-colour-1").css("background-color", "#ea71c3");
        $(".custom-colour-2").css("background-color", "#dC64b6");
        $(".custom-colour-3").css("background-color", "#d056a8");
        $(".custom-colour-4").css("background-color", "#c64f9f");
        $(".custom-colour-5").css("background-color", "#bb3d92");
        $("body").css("color", "white");
        $("a").css("color", "mistyrose").hover(
            function() {
                $(this).css("background-color", "");
            },
            function() {
                $(this).css("background-color", "");
            }
        )
        $("*").css("scrollbar-color", "#fc46aa #fec5e5");
    }
    switch(document.cookie) {
        case "color=crimson":
            changeToCrimson();
            break;
        case "color=orange":
            changeToOrange();
            break;
        case "color=brown":
            changeToBrown();
            break;
        case "color=green":
            changeToGreen();
            break;
        case "color=turquoise":
            changeToTurquoise();
            break;
        case "color=blue":
            changeToBlue();
            break;
        case "color=gray":
            changeToGray();
            break;
        case "color=indigo":
            changeToIndigo();
            break;
        case "color=pink":
            changeToPink();
            break;
        default:
            break;
    }
    $("button:not(.slide-button)").hide().animate({right: "-=225px"});
    $(".slide-button").click(function(e) {
            e.preventDefault();
            if (x % 2 == 0) {
                $(this).animate({right: "+=225px"});
                $("button:not(.slide-button)").show().animate({right: "+=225px"});
            } else {
                $(this).animate({right: "-=225px"});
                $("button:not(.slide-button)").animate({right: "-=225px"}, function() {
                    $(this).hide();
                });
            }
            x++;
    });
    $(".crimson-button").click(function (e) { 
        e.preventDefault();
        if (confirm("Czy chcesz zapisać wybór? (do 1 stycznia 2030)") == true) {
            document.cookie = "color=crimson; expires=Tue, 1 Jan 2030 12:00:00 UTC; path=/; SameSite=Lax";
        }
        changeToCrimson();
    });
    $(".orange-button").click(function (e) { 
        e.preventDefault();
        if (confirm("Czy chcesz zapisać wybór? (do 1 stycznia 2030)") == true) {
            document.cookie = "color=orange; expires=Tue, 1 Jan 2030 12:00:00 UTC; path=/; SameSite=Lax";
        }
        changeToOrange();
    });
    $(".brown-button").click(function (e) { 
        e.preventDefault();
        if (confirm("Czy chcesz zapisać wybór? (do 1 stycznia 2030)") == true) {
            document.cookie = "color=brown; expires=Tue, 1 Jan 2030 12:00:00 UTC; path=/; SameSite=Lax";
        }
        changeToBrown();
    });
    $(".green-button").click(function (e) { 
        e.preventDefault();
        if (confirm("Czy chcesz zapisać wybór? (do 1 stycznia 2030)") == true) {
            document.cookie = "color=green; expires=Tue, 1 Jan 2030 12:00:00 UTC; path=/; SameSite=Lax";
        }
        changeToGreen();
    });
    $(".turquoise-button").click(function (e) { 
        e.preventDefault();
        if (confirm("Czy chcesz zapisać wybór? (do 1 stycznia 2030)") == true) {
            document.cookie = "color=turquoise; expires=Tue, 1 Jan 2030 12:00:00 UTC; path=/; SameSite=Lax";
        }
        changeToTurquoise();
    });
    $(".blue-button").click(function (e) { 
        e.preventDefault();
        if (confirm("Czy chcesz zapisać wybór? (do 1 stycznia 2030)") == true) {
            document.cookie = "color=blue; expires=Tue, 1 Jan 2030 12:00:00 UTC; path=/; SameSite=Lax";
        }
        changeToBlue();
    });
    $(".gray-button").click(function (e) { 
        e.preventDefault();
        if (confirm("Czy chcesz zapisać wybór? (do 1 stycznia 2030)") == true) {
            document.cookie = "color=gray; expires=Tue, 1 Jan 2030 12:00:00 UTC; path=/; SameSite=Lax";
        }
        changeToGray();
    });
    $(".indigo-button").click(function (e) { 
        e.preventDefault();
        if (confirm("Czy chcesz zapisać wybór? (do 1 stycznia 2030)") == true) {
            document.cookie = "color=indigo; expires=Tue, 1 Jan 2030 12:00:00 UTC; path=/; SameSite=Lax";
        }
        changeToIndigo();
    });
    $(".pink-button").click(function (e) { 
        e.preventDefault();
        if (confirm("Czy chcesz zapisać wybór? (do 1 stycznia 2030)") == true) {
            document.cookie = "color=pink; expires=Tue, 1 Jan 2030 12:00:00 UTC; path=/; SameSite=Lax";
        }
        changeToPink();
    });
});