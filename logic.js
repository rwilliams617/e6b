(function() {
    var animateX = -20;
    var currentPage = null;
    var currentWidth = 0;
    var currentHash = location.hash;
    var hashPrefix = "#_";
    var pageHistory = [];
    var myCalcParms = [];
    var loadingId = "";
    var RequestObj;
    var images = [];
    var optionItem;
    var mySpeedUnits;
    var myDistUnits;
    var myIAunits;
    var myTempUnits;
    var myTempUnits2;
    var cDistUnits;
    var cSpeedUnits;
    var cWeightUnits;
    var cAreaUnits;
    var cVolumeUnits;
    var LoadValTimmer;
    var settingInputs;
    var keyPads;
    document.getElementsByClassName = function(className) {
        var children = document.getElementsByTagName('*') || document.all;
        var elements = new Array();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    };
    function dictItem(key, value) {
        this.key = key;
        this.value = value;
    }
    ;
    var AppLoad = function() {
        mySpeedUnits = new Array(2);
        mySpeedUnits[0] = new dictItem("Knots", .514444444444);
        mySpeedUnits[1] = new dictItem("Miles", .44704);
        myDistUnits = new Array(2);
        myDistUnits[0] = new dictItem("Nautical", 1852.0);
        myDistUnits[1] = new dictItem("Statute", 1609.344);
        myIAunits = new Array(2);
        myIAunits[0] = new dictItem("feet", 3.28084);
        myIAunits[1] = new dictItem("meters", 1 / 3.28084);
        myTempUnits = new Array(2);
        myTempUnits[0] = new dictItem("C", "C");
        myTempUnits[1] = new dictItem("F", "F");
        myTempUnits2 = new Array(2);
        myTempUnits2[0] = new dictItem("Celsius", "Celsius");
        myTempUnits2[1] = new dictItem("Fahrenheit", "Fahrenheit");
        settingInputs = new Array(1);
        settingInputs[0] = new dictItem("I will enter value", "1");
        settingInputs[1] = new dictItem("I will select from a list", "2");
        keypads = new Array(1);
        keypads[0] = new dictItem("Large Number Pad", "1");
        keypads[1] = new dictItem("Small Number Pad", "2");
        cDistUnits = new Array(8);
        cDistUnits[0] = new dictItem("Nautical Miles", "1852.0");
        cDistUnits[1] = new dictItem("Statute Miles", "1609.344");
        cDistUnits[2] = new dictItem("Kilometers", "1000");
        cDistUnits[3] = new dictItem("Meters", "1");
        cDistUnits[4] = new dictItem("Yards", "0.9144");
        cDistUnits[5] = new dictItem("Feet", "0.3048");
        cDistUnits[6] = new dictItem("Inches", "0.0254");
        cDistUnits[7] = new dictItem("Centimeters", "0.01");
        cSpeedUnits = new Array(9);
        cSpeedUnits[0] = new dictItem("Knots", "1852/3600");
        cSpeedUnits[1] = new dictItem("Mach", "340.29");
        cSpeedUnits[2] = new dictItem("Nautical miles /hour", "(1852/3600)*1");
        cSpeedUnits[3] = new dictItem("Miles per hour", "(0.3048*5280)/3600");
        cSpeedUnits[4] = new dictItem("Kilometers per hour", "1000/3600");
        cSpeedUnits[5] = new dictItem("Meters per hour", "1/3600");
        cSpeedUnits[6] = new dictItem("Yards per hour", "(0.3048*3)/3600");
        cSpeedUnits[7] = new dictItem("Feet per hour", "0.3048/3600");
        cSpeedUnits[8] = new dictItem("Feet per minute", "0.3048/60");
        cWeightUnits = new Array(11);
        cWeightUnits[0] = new dictItem("kilograms", "1");
        cWeightUnits[1] = new dictItem("grams", "0.001");
        cWeightUnits[2] = new dictItem("centigrams", "0.00001");
        cWeightUnits[3] = new dictItem("milligrams", "0.000001");
        cWeightUnits[4] = new dictItem("ounce", "0.45359237/16");
        cWeightUnits[5] = new dictItem("troy ounce", "((144/175)*0.45359237)/12");
        cWeightUnits[6] = new dictItem("pounds", "0.45359237");
        cWeightUnits[7] = new dictItem("metric pounds", "0.5");
        cWeightUnits[8] = new dictItem("troy pounds", "(144/175)*0.45359237");
        cWeightUnits[9] = new dictItem("metric ton", "1000");
        cWeightUnits[10] = new dictItem("carat - intl", "0.0002");
        cAreaUnits = new Array(10);
        cAreaUnits[0] = new dictItem("square miles", "0.09290304*27878400");
        cAreaUnits[1] = new dictItem("square nautical miles", "3429904");
        cAreaUnits[2] = new dictItem("square hectometer", "10000");
        cAreaUnits[3] = new dictItem("square kilometers", "1000000");
        cAreaUnits[4] = new dictItem("acres", "0.09290304*43560");
        cAreaUnits[5] = new dictItem("square meters", "1");
        cAreaUnits[6] = new dictItem("square yards", "0.09290304*9");
        cAreaUnits[7] = new dictItem("square feet", "0.09290304");
        cAreaUnits[8] = new dictItem("square inches", "0.09290304/144");
        cAreaUnits[9] = new dictItem("square centimeters", "0.0001");
        cVolumeUnits = new Array(24);
        cVolumeUnits[0] = new dictItem("gallon [US]", "0.003785411784");
        cVolumeUnits[1] = new dictItem("imperial gallon", "0.00454609");
        cVolumeUnits[2] = new dictItem("liter", "0.001");
        cVolumeUnits[3] = new dictItem("barrel [UK]", "0.00454609*36");
        cVolumeUnits[4] = new dictItem("barrel [US, liquid]", "0.003785411784*31.5");
        cVolumeUnits[5] = new dictItem("barrel [US, petroleum]", "0.003785411784*42");
        cVolumeUnits[6] = new dictItem("metric cup", "0.00025");
        cVolumeUnits[7] = new dictItem("cup [US]", "0.003785411784/16");
        cVolumeUnits[8] = new dictItem("ounce [UK, liquid]", "0.00454609/160");
        cVolumeUnits[9] = new dictItem("ounce [US, liquid]", "0.003785411784/128");
        cVolumeUnits[10] = new dictItem("pint [UK]", "0.00454609/8");
        cVolumeUnits[11] = new dictItem("pint [US, liquid]", "0.003785411784/8");
        cVolumeUnits[12] = new dictItem("pint [US, dry]", "0.0044048838/8");
        cVolumeUnits[13] = new dictItem("quart [Germany]", "0.00114504");
        cVolumeUnits[14] = new dictItem("quart [ancient hebrew]", "0.00108");
        cVolumeUnits[15] = new dictItem("quart [UK]", "0.00454609/4");
        cVolumeUnits[16] = new dictItem("quart [US, dry]", "0.0044048838/4");
        cVolumeUnits[17] = new dictItem("quart [US, liquid]", "0.003785411784/4");
        cVolumeUnits[18] = new dictItem("Tablespoon [metric]", "0.000015");
        cVolumeUnits[19] = new dictItem("Tablespoon [UK]", "(0.00454609/160)/2");
        cVolumeUnits[20] = new dictItem("Tablespoon [US]", "(0.003785411784/128)/2");
        cVolumeUnits[21] = new dictItem("Teaspoon [metric]", "0.000005");
        cVolumeUnits[22] = new dictItem("Teaspoon [UK]", "(0.00454609/160)/8");
        cVolumeUnits[23] = new dictItem("Teaspoon [US]", "(0.003785411784/128)/6");
        var body = document.getElementsByTagName("body")[0];
        for (var child = body.firstChild; child; child = child.nextSibling) {
            if (child.nodeType == 1 && child.getAttribute("selected") == "true") {
                showPage(child);
                break;
            }
        }
        buildCalcParms();
        document.getElementById('spinner').style.display = 'none';
        setTimeout(scrollTo, 20, 0, 1);
        setInterval(updateLayout, 500);
        delete AppLoad;
    };
    addEventListener("load", AppLoad, false);
    addEventListener("click", function(event) {
        event.preventDefault();
        var goBackward = false;
        if (event.toElement.innerText) {
            if (event.toElement.innerText == "Home") {
                goBackward = true;
            }
        }
        var link = event.target;
        while (link && link.localName.toLowerCase() != "a")
            link = link.parentNode;
        if (link && link.hash && link.hash == '#') {
            document.location = link;
        } else if (link && link.hash) {
            var page = document.getElementById(link.hash.substr(1));
            if (!page) {
                loadContent(link.hash.substr(1));
            } else {
                showPage(page, goBackward);
            }
        }
    }, true);
    function updateLayout() {
        if (window.outerWidth != currentWidth) {
            currentWidth = window.outerWidth;
            var orient = currentWidth == 320 ? "profile" : "landscape";
            document.body.setAttribute("orient", orient);
        }
        if (location.hash != currentHash) {
            currentHash = location.hash;
            var pageId = currentHash.substr(hashPrefix.length);
            var page = document.getElementById(pageId);
            if (page) {
                var index = pageHistory.indexOf(pageId);
                var backwards = index != -1;
                if (pageId == "Settings") {
                    pageId = pageHistory[eval(index - 2)];
                    page = document.getElementById(pageId);
                }
                if (backwards) {
                    pageHistory.splice(index, pageHistory.length);
                }
                showPage(page, backwards);
            }
        }
    }
    ;
    function showPage(page, backwards) {
        location.href = currentHash = hashPrefix + page.id;
        pageHistory.push(page.id);
        if (currentPage) {
            var fromPageID = currentPage.id;
            var fromPageTitle = currentPage.title;
        }
        if (fromPageID == "Settings") {
            backwards = true;
        }
        var fromPage = currentPage;
        currentPage = page;
        var pageTitle = document.getElementById("pageTitle");
        var useThis = "";
        var nonEditMenu = "<a id='homeButton' href='#welcome'>Home</a><span style='text-align:center'>" + page.title + "</span>";
        var WXMenu = "<a id='homeButton' href='#welcome'>Home</a>";
        WXMenu += "<span style='text-align:center'>" + page.title + "</span>";
        WXMenu += "<a id='settingsButton' class='button2' href='#wx'>WX</a>";
        document.bgColor = "#fff";
        switch (page.id) {
            case "Settings":
                useThis += "<span id='hb'><a id='homeButton' href='#" + fromPageID + "'>Done</a></span>";
                useThis += "<span style='text-align:center'>" + fromPageTitle + "</span>";
                document.bgColor = "#B3CCD3";
                break;
            case "welcome":
                useThis += "<span style='text-align:center'>" + page.title + "</span>";
                break;
            case "TimeDistance":
            case "wx":
            case "metar":
            case "taf":
            case "sigmet":
            case "pirep":
            case "Conv":
            case "Alt":
            case "Fuel":
            case "FuelFT_lbs":
            case "FuelBurned_lbs":
            case "FuelConsumption_lbs":
            case "Wind":
            case "tempConv":
            case "cDist":
            case "cSpeed":
            case "cWeight":
            case "cArea":
            case "cVolume":
            case "about":
            case "tips":
            case "findICAO":
            case "CommingSoon":
                useThis += nonEditMenu;
                break;
            case "stationBrowse":
            case "stationBrowseState":
            case "stationBrowseList":
            case "stationBrowse2":
            case "stationRAD":
                useThis = WXMenu;
                break;
            default:
                useThis += "<a id='homeButton' href='#welcome'>Home</a>";
                useThis += "<span style='text-align:center'>" + page.title + "</span>";
                useThis += "<a id='settingsButton' class='button2' href='#Settings'>Edit</a>";
                break;
        }
        pageTitle.innerHTML = useThis;
        if (fromPage)
            setTimeout(swipePage, 50, fromPage, page, backwards);
    }
    ;
    function populateNumericDD(ControlName, min, max, appDefault, incrementBy) {
        var userDefault = getCookie(ControlName);
        var thisDefault = 0;
        if (userDefault == "") {
            thisDefault = appDefault
        } else {
            thisDefault = userDefault
        }
        var i = 0;
        var TargetList = document.getElementById(ControlName);
        var thisVal = 0;
        for (i = min; i <= max; i = i + incrementBy) {
            thisval = Math.round(i * 100) / 100;
            if (thisval == thisDefault) {
                TargetList[TargetList.length] = new Option(thisval, thisval, true);
            } else {
                TargetList[TargetList.length] = new Option(thisval, thisval);
            }
        }
    }
    ;
    function populateANumericDD(ControlName, min, max, appDefault, incrementBy) {
        var userDefault = getCookie(ControlName);
        var thisDefault = 0;
        if (userDefault == "") {
            thisDefault = appDefault
        } else {
            thisDefault = userDefault
        }
        var i = 0;
        var TargetList = document.getElementById(ControlName);
        var thisVal = 0;
        for (i = min; i <= max; i = i + incrementBy) {
            thisval = i;
            if (thisval < 10) {
                thisval = "0" + thisval;
            }
            if (thisval == thisDefault) {
                TargetList[TargetList.length] = new Option(thisval, thisval, true);
            } else {
                TargetList[TargetList.length] = new Option(thisval, thisval);
            }
        }
    }
    ;
    function populateUnits(aItems, ControlName, appDefault) {
        var userDefault = getCookie(ControlName);
        var thisDefault = "";
        if (userDefault == "") {
            thisDefault = appDefault
        } else {
            thisDefault = userDefault
        }
        var i = 0;
        var TargetList = document.getElementById(ControlName);
        if (TargetList) {
            for (i = 0; i <= aItems.length - 1; i++) {
                if (aItems[i].value == thisDefault) {
                    TargetList[TargetList.length] = new Option(aItems[i].key, aItems[i].value, true);
                } else {
                    TargetList[TargetList.length] = new Option(aItems[i].key, aItems[i].value);
                }
            }
        }
    }
    ;
    function populateTextbox(ControlName, appDefault) {
        var userDefault = getCookie(ControlName);
        var thisDefault = 0;
        if (userDefault == "") {
            thisDefault = appDefault
        } else {
            thisDefault = userDefault
        }
        document.getElementById(ControlName).value = thisDefault;
    }
    ;
    function clearList(listName) {
        document.getElementById(listName).options.length = 0;
    }
    ;
    function swipePage(fromPage, toPage, backwards) {
        if (myRequest) {
            myRequest.abort();
            myRequest = null;
        }
        if (backwards) {
        } else {
            backwards = false
        }
        fromPage.style.display = "none";
        if (backwards == false) {
            toPage.style.left = "80%";
        }
        toPage.setAttribute("selected", "true");
        scrollTo(0, 1);
        var removed = false;
        var fromId = "";
        if (fromPage.hasAttribute("id")) {
            fromId = fromPage.getAttribute("id");
            clearValues(fromId);
        }
        var percent = 100;
        var timer = setInterval(function() {
            percent += animateX;
            toPage.style.left = (backwards ? -percent : percent) + "%";
            if (percent <= 0) {
                percent = 0;
                if (!removed) {
                    fromPage.removeAttribute("selected");
                    fromPage.style.left = "-100%";
                    fromPage.style.display = "block";
                }
                clearInterval(timer);
                onSwipePageComplete(toPage, toPage.getAttribute("id"));
            }
        }, 0);
    }
    ;
    function clearValues(fromId) {
        var c = "Loading...";
        var ctrl;
        for (i = 0; i <= myCalcParms.length - 1; i++) {
            thisSet = myCalcParms[i];
            if (thisSet.pageID == fromId) {
                if (thisSet.inputMode == "99") {
                    document.getElementById(thisSet.controlName).innerHTML = thisSet.appDefault;
                } else {
                    ctrl = document.getElementById("o_" + thisSet.controlName);
                    if (ctrl) {
                        document.getElementById("o_" + thisSet.controlName).innerHTML = "";
                    }
                }
            }
        }
        if (fromId == "tempConv") {
            clearList("tempConv_tempunit");
            document.getElementById("tempConv_answer").innerHTML = "?";
        }
        if (fromId == "cDist") {
            clearList("cDist_unit");
            document.getElementById("cDist_answer").innerHTML = c;
        }
        if (fromId == "cSpeed") {
            clearList("cSpeed_unit");
            document.getElementById("cSpeed_answer").innerHTML = c;
        }
        if (fromId == "cWeight") {
            clearList("cWeight_unit");
            document.getElementById("cWeight_answer").innerHTML = c;
        }
        if (fromId == "cArea") {
            clearList("cArea_unit");
            document.getElementById("cArea_answer").innerHTML = c;
        }
        if (fromId == "cVolume") {
            clearList("cVol_unit");
            document.getElementById("cVol_answer").innerHTML = c;
        }
        if (fromId == "FuelFT_lbs") {
            document.getElementById("fuelFT_lbl_answer").innerHTML = c;
        }
        if (fromId == "FuelBurned_lbs") {
            document.getElementById("fb_Answer_lbs").innerHTML = c;
            clearList("fb_Hours_lbs");
            clearList("fb_Minutes_lbs");
        }
        if (fromId == "FuelConsumption_lbs") {
            document.getElementById("fc_Answer_lbs").innerHTML = c;
            clearList("fc_hours_lbs");
            clearList("fc_minutes_lbs");
        }
        if (fromId == "metar") {
            document.getElementById("metarAnswer").innerHTML = c;
            clearUL("metarUL");
        }
        if (fromId == "taf") {
            document.getElementById("tafAnswer").innerHTML = c;
            clearUL("tafUL");
        }
        if (fromId == "sigmet") {
            document.getElementById("sigmetAnswer").innerHTML = c;
            clearUL("sigmetUL");
        }
        if (fromId == "sigmet2") {
            document.getElementById("sigmet2Answer").innerHTML = c;
            clearUL("sigmet2UL");
        }
        if (fromId == "pirep") {
            document.getElementById("pirepAnswer").innerHTML = c;
            clearUL("pirepUL");
        }
        if (fromId == "stationRAD") {
            document.getElementById("stationRADanswer").innerHTML = c;
            clearUL("stationRADUL");
        }
        if (fromId == "stationBrowse") {
            clearUL("stationBrowse");
        }
        if (fromId == "stationBrowse2") {
            clearUL("stationBrowse2");
        }
        if (fromId == "stationBrowseList") {
            clearUL("stationBrowseList");
        }
        if (fromId == "stationBrowseState") {
            clearUL("stationBrowseState");
        }
    }
    ;
    function onSwipePageComplete(toPage, fromId) {
        setTimeout(loadValues, 50, fromId);
        return;
    }
    ;
    function loadValues(toPage) {
        var theCTRL;
        switch (toPage) {
            case "stationRAD":
                populateTextbox("stationRADdist", "30");
                populateTextbox("stationRADcd", "KJFK");
                theCTRL = document.getElementById("stationRADdist");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'stationRADdist');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                theCTRL.setAttribute("onkeydown", "return onlyNum()");
                theCTRL = document.getElementById("stationRADcd");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'stationRADcd');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                theCTRL.setAttribute("onkeydown", "return onlyCap(this);");
                theCTRL = document.getElementById("stationRADcmd");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onclick", "calc(31);");
                document.getElementById("stationRADanswer").innerHTML = "loading...";
                calc(31);
                break;
            case "stationBrowse":
                document.getElementById('spinner').style.display = 'block';
                calc(28);
                break;
            case "stationBrowse2":
                document.getElementById('spinner').style.display = 'block';
                calc(29);
                break;
            case "stationBrowseState":
                document.getElementById('spinner').style.display = 'block';
                calc(32);
                break;
            case "stationBrowseList":
                document.getElementById('spinner').style.display = 'block';
                calc(33);
                break;
            case "metar":
                populateTextbox("metarStationID", "KJFK");
                populateTextbox("metarHours", "2");
                populateTextbox("metarDist", "15");
                theCTRL = document.getElementById("cmdGetMetar");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onclick", "calc(23);");
                theCTRL = document.getElementById("metarStationID");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'metarUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                theCTRL.setAttribute("onkeydown", "return onlyCap(this);");
                theCTRL = document.getElementById("metarDist");
                theCTRL.setAttribute("onkeydown", "return onlyNum()");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'metarUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                theCTRL = document.getElementById("metarHours");
                theCTRL.setAttribute("onkeydown", "return onlyNum()");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'metarUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                document.getElementById("metarAnswer").innerHTML = "loading...";
                calc(23);
                break;
            case "taf":
                populateTextbox("tafStationID", "KDFW");
                populateTextbox("tafHours", "1");
                theCTRL = document.getElementById("cmdGetTAF");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onclick", "calc(24);");
                theCTRL = document.getElementById("tafStationID");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'tafUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                theCTRL.setAttribute("onkeydown", "return onlyCap(this);");
                theCTRL = document.getElementById("tafHours");
                theCTRL.setAttribute("onkeydown", "return onlyNum()");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'tafUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                document.getElementById("tafAnswer").innerHTML = "loading...";
                calc(24);
                break;
            case "sigmet":
                populateTextbox("sigmetTo", "KBWI");
                populateTextbox("sigmetFrom", "KIAD");
                populateTextbox("sigmetHours", "2");
                populateTextbox("sigmetDist", "60");
                theCTRL = document.getElementById("cmdSigmet");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onclick", "calc(25);");
                theCTRL = document.getElementById("sigmetTo");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'sigmetUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                theCTRL.setAttribute("onkeydown", "return onlyCap(this);");
                theCTRL = document.getElementById("sigmetFrom");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'sigmetUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                theCTRL.setAttribute("onkeydown", "return onlyCap(this);");
                theCTRL = document.getElementById("sigmetHours");
                theCTRL.setAttribute("onkeydown", "return onlyNum()");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'sigmetUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                theCTRL = document.getElementById("sigmetDist");
                theCTRL.setAttribute("onkeydown", "return onlyNum()");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'sigmetUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                document.getElementById("sigmetAnswer").innerHTML = "loading...";
                calc(25);
                break;
            case "sigmet2":
                populateTextbox("sigmet2Hours", "2");
                document.getElementById("cmdSigmet2").setAttribute("class", "secondaryInput");
                document.getElementById("cmdSigmet2").setAttribute("onclick", "calc(26);");
                document.getElementById("sigmet2Hours").setAttribute("onkeydown", "return onlyNum()");
                document.getElementById("sigmet2Hours").setAttribute("class", "secondaryInput");
                document.getElementById("sigmet2Hours").setAttribute("onblur", "lostFocus(this);");
                document.getElementById("sigmet2Hours").setAttribute("onfocus", "iClearSetting(this);");
                document.getElementById("sigmet2Answer").innerHTML = "loading...";
                calc(26);
                break;
            case "pirep":
                populateTextbox("pirepStationFrom", "KIAD");
                populateTextbox("pirepStationTo", "KJFK");
                populateTextbox("pirepHours", "2");
                populateTextbox("pirepDist", "60");
                theCTRL = document.getElementById("cmdPireps");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onclick", "calc(27);");
                theCTRL = document.getElementById("pirepStationFrom");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'pirepUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                theCTRL.setAttribute("onkeydown", "return onlyCap(this);");
                theCTRL = document.getElementById("pirepStationTo");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'pirepUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                theCTRL.setAttribute("onkeydown", "return onlyCap(this);");
                theCTRL = document.getElementById("pirepHours");
                theCTRL.setAttribute("onkeydown", "return onlyNum()");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'pirepUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                theCTRL = document.getElementById("pirepDist");
                theCTRL.setAttribute("onkeydown", "return onlyNum()");
                theCTRL.setAttribute("class", "secondaryInput");
                theCTRL.setAttribute("onblur", "lostFocus(this,'pirepUL');");
                theCTRL.setAttribute("onfocus", "iClearSetting(this);");
                document.getElementById("pirepAnswer").innerHTML = "loading...";
                calc(27);
                break;
            case "tempConv":
                populateTextbox("tempConv_temp", 0);
                populateUnits(myTempUnits2, "tempConv_tempunit", "Celsius");
                document.getElementById("tempConv_temp").setAttribute("onblur", "lostFocus(this);");
                calc(14);
                break;
            case "cDist":
                populateTextbox("cDist_val", 25);
                populateUnits(cDistUnits, "cDist_unit", "Nautical Miles");
                document.getElementById("cDist_val").setAttribute("onblur", "lostFocus(this);");
                calc(15);
                break;
            case "cSpeed":
                populateTextbox("cSpeed_val", 90);
                populateUnits(cSpeedUnits, "cSpeed_unit", "Knots");
                document.getElementById("cSpeed_val").setAttribute("onblur", "lostFocus(this);");
                calc(16);
                break;
            case "cWeight":
                populateTextbox("cWeight_val", 2);
                populateUnits(cWeightUnits, "cWeight_unit", "kilograms");
                document.getElementById("cWeight_val").setAttribute("onblur", "lostFocus(this);");
                calc(17);
                break;
            case "cArea":
                populateTextbox("cArea_val", 2);
                populateUnits(cAreaUnits, "cArea_unit", "square inches");
                document.getElementById("cArea_val").setAttribute("onblur", "lostFocus(this);");
                calc(18);
                break;
            case "cVolume":
                populateTextbox("cVol_val", 2);
                populateUnits(cVolumeUnits, "cVol_unit", "gallon [US]");
                document.getElementById("cVol_val").setAttribute("onblur", "lostFocus(this);");
                calc(19);
                break;
            case "FuelFT_lbs":
                populateTextbox("FuelFT_lbs_rate", 2400);
                populateTextbox("FuelFT_lbs_usable", 12000);
                calc(20);
                break;
            case "FuelBurned_lbs":
                populateTextbox("FuelBurned_lbs_rate", 4000);
                populateNumericDD("fb_Hours_lbs", 0, 10, 0, 1);
                populateNumericDD("fb_Minutes_lbs", 0, 59, 15, 1);
                calc(21);
                break;
            case "FuelConsumption_lbs":
                populateTextbox("fc_lbs_rate", 4000);
                populateNumericDD("fc_hours_lbs", 0, 10, 0, 1);
                populateNumericDD("fc_minutes_lbs", 0, 59, 15, 1);
                calc(22);
                break;
            case "Settings":
                buildSettingsPage();
                break;
            default:
                populateCalcPage(toPage);
                setTimeout(calc, 50, getCalcID(toPage));
                break;
        }
        setTimeout(scrollTo, 10, 0, 1);
    }
    ;
    function buildCalcParms() {
        myCalcParms = null;
        myCalcParms = [];
        var thisSet;
        thisSet = new Object;
        thisSet.pageID = "FindingTime";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "ftAnswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 1;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingTime";
        thisSet.name = "Speed";
        thisSet.inputMode = "2";
        thisSet.minValue = "60";
        thisSet.maxValue = "250";
        thisSet.increment = "1";
        thisSet.appDefault = "110";
        thisSet.controlName = "ftSpeed";
        thisSet.CalcID = 1;
        thisSet.maxlength = 4;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingTime";
        thisSet.name = "Distance";
        thisSet.inputMode = "2";
        thisSet.minValue = "5";
        thisSet.maxValue = "100";
        thisSet.increment = "1";
        thisSet.appDefault = "50";
        thisSet.controlName = "ftDistance";
        thisSet.CalcID = 1;
        thisSet.maxlength = 4;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingTime";
        thisSet.inputMode = "3";
        thisSet.xList = mySpeedUnits;
        thisSet.appDefault = "Knots";
        thisSet.controlName = "ftSpeedUnits";
        thisSet.CalcID = 1;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingTime";
        thisSet.inputMode = "3";
        thisSet.xList = myDistUnits;
        thisSet.appDefault = "Nautical";
        thisSet.controlName = "ftDistUnits";
        thisSet.CalcID = 1;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingDistance";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "fdAnswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 2;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingDistance";
        thisSet.name = "Speed";
        thisSet.inputMode = "2";
        thisSet.minValue = "60";
        thisSet.maxValue = "250";
        thisSet.increment = "1";
        thisSet.appDefault = "110";
        thisSet.controlName = "fdSpeed";
        thisSet.CalcID = 2;
        thisSet.maxlength = 4;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingDistance";
        thisSet.inputMode = "3";
        thisSet.xList = mySpeedUnits;
        thisSet.appDefault = "Knots";
        thisSet.controlName = "fdSpeedUnits";
        thisSet.CalcID = 2;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingDistance";
        thisSet.name = "Hours";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "10";
        thisSet.increment = "1";
        thisSet.appDefault = "0";
        thisSet.controlName = "fdHours";
        thisSet.CalcID = 2;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingDistance";
        thisSet.name = "Minutes";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "59";
        thisSet.increment = "1";
        thisSet.appDefault = "15";
        thisSet.controlName = "fdMinutes";
        thisSet.CalcID = 2;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "Settings";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "Settings";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 2;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingSpeed";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "fsAnswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 3;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingSpeed";
        thisSet.name = "Distance";
        thisSet.inputMode = "2";
        thisSet.minValue = "5";
        thisSet.maxValue = "100";
        thisSet.increment = "1";
        thisSet.appDefault = "50";
        thisSet.controlName = "fsDistance";
        thisSet.CalcID = 3;
        thisSet.maxlength = 4;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingSpeed";
        thisSet.inputMode = "3";
        thisSet.xList = myDistUnits;
        thisSet.appDefault = "Knots";
        thisSet.controlName = "fsDistUnits";
        thisSet.CalcID = 3;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingSpeed";
        thisSet.name = "Hours";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "10";
        thisSet.increment = "1";
        thisSet.appDefault = "0";
        thisSet.controlName = "fsHours";
        thisSet.CalcID = 3;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FindingSpeed";
        thisSet.name = "Minutes";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "59";
        thisSet.increment = "1";
        thisSet.appDefault = "15";
        thisSet.controlName = "fsMinutes";
        thisSet.CalcID = 3;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "TAS";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "tasAnswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 7;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "TAS";
        thisSet.name = "Indicated Altitude";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "10000";
        thisSet.increment = "250";
        thisSet.appDefault = "5000";
        thisSet.controlName = "tasIA";
        thisSet.CalcID = 7;
        thisSet.maxlength = 5;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "TAS";
        thisSet.name = "Altim Setting 1";
        thisSet.inputMode = "2";
        thisSet.minValue = "28";
        thisSet.maxValue = "31";
        thisSet.increment = "1";
        thisSet.appDefault = "29";
        thisSet.controlName = "tasaltim1";
        thisSet.CalcID = 7;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "TAS";
        thisSet.name = "Altim Setting 2";
        thisSet.inputMode = "2";
        thisSet.minValue = "1";
        thisSet.maxValue = "99";
        thisSet.increment = "1";
        thisSet.appDefault = "92";
        thisSet.controlName = "tasaltim2";
        thisSet.CalcID = 7;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "TAS";
        thisSet.name = "Temp";
        thisSet.inputMode = "2";
        thisSet.minValue = "-50";
        thisSet.maxValue = "110";
        thisSet.increment = "1";
        thisSet.appDefault = "15";
        thisSet.controlName = "tastemp";
        thisSet.CalcID = 7;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "TAS";
        thisSet.name = "Indicated Air Speed";
        thisSet.inputMode = "2";
        thisSet.minValue = "60";
        thisSet.maxValue = "250";
        thisSet.increment = "5";
        thisSet.appDefault = "110";
        thisSet.controlName = "tasIAS";
        thisSet.CalcID = 7;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "TAS";
        thisSet.inputMode = "3";
        thisSet.xList = myTempUnits;
        thisSet.appDefault = "C";
        thisSet.controlName = "tasTempUnits";
        thisSet.CalcID = 7;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FuelFT";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "fuelFTanswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 4;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FuelFT";
        thisSet.name = "Usable Gallons";
        thisSet.inputMode = "2";
        thisSet.minValue = "5";
        thisSet.maxValue = "75";
        thisSet.increment = "1";
        thisSet.appDefault = "40";
        thisSet.controlName = "gallonsUsable";
        thisSet.CalcID = 4;
        thisSet.maxlength = 5;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FuelFT";
        thisSet.name = "Gallons per Hour";
        thisSet.inputMode = "2";
        thisSet.minValue = "3";
        thisSet.maxValue = "20";
        thisSet.increment = ".5";
        thisSet.appDefault = "10";
        thisSet.controlName = "gph";
        thisSet.CalcID = 4;
        thisSet.maxlength = 4;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FuelBurned";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "fbAnswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 5;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FuelBurned";
        thisSet.name = "Gallons per Hour";
        thisSet.inputMode = "2";
        thisSet.minValue = "3";
        thisSet.maxValue = "20";
        thisSet.increment = ".5";
        thisSet.appDefault = "10";
        thisSet.controlName = "fbGPH";
        thisSet.CalcID = 5;
        thisSet.maxlength = 5;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FuelBurned";
        thisSet.name = "Hours";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "10";
        thisSet.increment = "1";
        thisSet.appDefault = "0";
        thisSet.controlName = "fbHours";
        thisSet.CalcID = 5;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FuelBurned";
        thisSet.name = "Minutes";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "59";
        thisSet.increment = "1";
        thisSet.appDefault = "15";
        thisSet.controlName = "fbMinutes";
        thisSet.CalcID = 5;
        thisSet.maxlength = 4;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FuelConsumption";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "fcAnswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 6;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FuelConsumption";
        thisSet.name = "Gallons Burned";
        thisSet.inputMode = "2";
        thisSet.minValue = "1";
        thisSet.maxValue = "50";
        thisSet.increment = "1";
        thisSet.appDefault = "10";
        thisSet.controlName = "fcburned";
        thisSet.CalcID = 6;
        thisSet.maxlength = 4;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FuelConsumption";
        thisSet.name = "Hours";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "10";
        thisSet.increment = "1";
        thisSet.appDefault = "0";
        thisSet.controlName = "fchours";
        thisSet.CalcID = 6;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "FuelConsumption";
        thisSet.name = "Minutes";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "59";
        thisSet.increment = "1";
        thisSet.appDefault = "15";
        thisSet.controlName = "fcminutes";
        thisSet.CalcID = 6;
        thisSet.maxlength = 4;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "PA";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "paAnswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 8;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "PA";
        thisSet.name = "Indicated Altitude";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "10000";
        thisSet.increment = "250";
        thisSet.appDefault = "5000";
        thisSet.controlName = "paIA";
        thisSet.CalcID = 8;
        thisSet.maxlength = 5;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "PA";
        thisSet.name = "Altim Setting 1";
        thisSet.inputMode = "2";
        thisSet.minValue = "28";
        thisSet.maxValue = "31";
        thisSet.increment = "1";
        thisSet.appDefault = "29";
        thisSet.controlName = "paaltim1";
        thisSet.CalcID = 8;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "PA";
        thisSet.name = "Altim Setting 2";
        thisSet.inputMode = "2";
        thisSet.minValue = "1";
        thisSet.maxValue = "99";
        thisSet.increment = "1";
        thisSet.appDefault = "92";
        thisSet.controlName = "paaltim2";
        thisSet.CalcID = 8;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "DA";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "daAnswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 9;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "DA";
        thisSet.name = "Indicated Altitude";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "10000";
        thisSet.increment = "250";
        thisSet.appDefault = "5000";
        thisSet.controlName = "daIA";
        thisSet.CalcID = 9;
        thisSet.maxlength = 5;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "DA";
        thisSet.name = "Altim Setting 1";
        thisSet.inputMode = "2";
        thisSet.minValue = "28";
        thisSet.maxValue = "31";
        thisSet.increment = "1";
        thisSet.appDefault = "29";
        thisSet.controlName = "daaltim1";
        thisSet.CalcID = 9;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "DA";
        thisSet.name = "Altim Setting 2";
        thisSet.inputMode = "2";
        thisSet.minValue = "1";
        thisSet.maxValue = "99";
        thisSet.increment = "1";
        thisSet.appDefault = "92";
        thisSet.controlName = "daaltim2";
        thisSet.CalcID = 9;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "DA";
        thisSet.name = "Temp";
        thisSet.inputMode = "2";
        thisSet.minValue = "-50";
        thisSet.maxValue = "110";
        thisSet.increment = "1";
        thisSet.appDefault = "15";
        thisSet.controlName = "datemp";
        thisSet.CalcID = 9;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "DA";
        thisSet.inputMode = "3";
        thisSet.xList = myTempUnits;
        thisSet.appDefault = "C";
        thisSet.controlName = "datempUnits";
        thisSet.CalcID = 9;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "xwind";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "xwindanswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 10;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "xwind";
        thisSet.name = "Runway Heading";
        thisSet.inputMode = "2";
        thisSet.minValue = "1";
        thisSet.maxValue = "360";
        thisSet.increment = "1";
        thisSet.appDefault = "170";
        thisSet.controlName = "xwindrw";
        thisSet.CalcID = 10;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "xwind";
        thisSet.name = "Wind Direction";
        thisSet.inputMode = "2";
        thisSet.minValue = "1";
        thisSet.maxValue = "360";
        thisSet.increment = "1";
        thisSet.appDefault = "190";
        thisSet.controlName = "xwinddir";
        thisSet.CalcID = 10;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "xwind";
        thisSet.name = "Wind Speed";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "50";
        thisSet.increment = "1";
        thisSet.appDefault = "15";
        thisSet.controlName = "xwindspeed";
        thisSet.CalcID = 10;
        thisSet.maxlength = 2;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windDS";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "windDSanswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 11;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windDS";
        thisSet.name = "Flight Heading";
        thisSet.inputMode = "2";
        thisSet.minValue = "1";
        thisSet.maxValue = "360";
        thisSet.increment = "1";
        thisSet.appDefault = "170";
        thisSet.controlName = "windDSheading";
        thisSet.CalcID = 11;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windDS";
        thisSet.name = "Flight Course";
        thisSet.inputMode = "2";
        thisSet.minValue = "1";
        thisSet.maxValue = "360";
        thisSet.increment = "1";
        thisSet.appDefault = "190";
        thisSet.controlName = "windDScourse";
        thisSet.CalcID = 11;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windDS";
        thisSet.name = "Ground Speed";
        thisSet.inputMode = "2";
        thisSet.minValue = "60";
        thisSet.maxValue = "250";
        thisSet.increment = "1";
        thisSet.appDefault = "110";
        thisSet.controlName = "windDSgs";
        thisSet.CalcID = 11;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windDS";
        thisSet.name = "True Airspeed";
        thisSet.inputMode = "2";
        thisSet.minValue = "60";
        thisSet.maxValue = "250";
        thisSet.increment = "1";
        thisSet.appDefault = "110";
        thisSet.controlName = "windDSTAS";
        thisSet.CalcID = 11;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windh";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "windhanswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 12;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windh";
        thisSet.name = "Flight Course";
        thisSet.inputMode = "2";
        thisSet.minValue = "1";
        thisSet.maxValue = "360";
        thisSet.increment = "1";
        thisSet.appDefault = "190";
        thisSet.controlName = "windhcrs";
        thisSet.CalcID = 12;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windh";
        thisSet.name = "True Airspeed";
        thisSet.inputMode = "2";
        thisSet.minValue = "60";
        thisSet.maxValue = "250";
        thisSet.increment = "1";
        thisSet.appDefault = "110";
        thisSet.controlName = "windhtas";
        thisSet.CalcID = 12;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windh";
        thisSet.name = "Wind Direction";
        thisSet.inputMode = "2";
        thisSet.minValue = "1";
        thisSet.maxValue = "360";
        thisSet.increment = "1";
        thisSet.appDefault = "175";
        thisSet.controlName = "windhdir";
        thisSet.CalcID = 12;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windh";
        thisSet.name = "Wind Speed";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "50";
        thisSet.increment = "1";
        thisSet.appDefault = "15";
        thisSet.controlName = "windhspeed";
        thisSet.CalcID = 12;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windc";
        thisSet.name = "answer";
        thisSet.inputMode = "99";
        thisSet.controlName = "windcanswer";
        thisSet.appDefault = "Loading...";
        thisSet.CalcID = 13;
        thisSet.userDefined = false;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windc";
        thisSet.name = "Heading";
        thisSet.inputMode = "2";
        thisSet.minValue = "1";
        thisSet.maxValue = "360";
        thisSet.increment = "1";
        thisSet.appDefault = "190";
        thisSet.controlName = "windchd";
        thisSet.CalcID = 13;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windc";
        thisSet.name = "True Airspeed";
        thisSet.inputMode = "2";
        thisSet.minValue = "60";
        thisSet.maxValue = "250";
        thisSet.increment = "1";
        thisSet.appDefault = "110";
        thisSet.controlName = "windctas";
        thisSet.CalcID = 13;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windc";
        thisSet.name = "Wind Direction";
        thisSet.inputMode = "2";
        thisSet.minValue = "1";
        thisSet.maxValue = "360";
        thisSet.increment = "1";
        thisSet.appDefault = "175";
        thisSet.controlName = "windcdir";
        thisSet.CalcID = 13;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        thisSet = new Object;
        thisSet.pageID = "windc";
        thisSet.name = "Wind Speed";
        thisSet.inputMode = "2";
        thisSet.minValue = "0";
        thisSet.maxValue = "50";
        thisSet.increment = "1";
        thisSet.appDefault = "15";
        thisSet.controlName = "windcspeed";
        thisSet.CalcID = 13;
        thisSet.maxlength = 3;
        thisSet.userDefined = true;
        myCalcParms.push(thisSet);
        var seed;
        var userDefault;
        var ControlName;
        for (i = 0; i <= myCalcParms.length - 1; i++) {
            thisSet = myCalcParms[i];
            seed = thisSet.pageID + "_" + thisSet.name;
            if (thisSet.inputMode < 3) {
                if (thisSet.userDefined = true) {
                    ControlName = seed + "_inputMode";
                    userDefault = getCookie(ControlName);
                    if (userDefault != "") {
                        thisSet.inputMode = userDefault
                    }
                    ;
                    ControlName = seed + "_minValue_value";
                    userDefault = getCookie(ControlName);
                    if (userDefault != "") {
                        thisSet.minValue = userDefault
                    }
                    ;
                    ControlName = seed + "_maxValue_value";
                    userDefault = getCookie(ControlName);
                    if (userDefault != "") {
                        thisSet.maxValue = userDefault
                    }
                    ;
                    ControlName = seed + "_increment_value";
                    userDefault = getCookie(ControlName);
                    if (userDefault != "") {
                        thisSet.increment = userDefault
                    }
                    ;
                }
            }
        }
    }
    ;
    function populateCalcPage(pageid) {
        var seed;
        var userDefault;
        var ControlName;
        var userValue = "";
        for (i = 0; i <= myCalcParms.length - 1; i++) {
            thisSet = myCalcParms[i];
            seed = thisSet.pageID + "_" + thisSet.name;
            if (thisSet.pageID == pageid) {
                if (thisSet.inputMode < 3) {
                    if (thisSet.userDefined = true) {
                        ControlName = seed + "_inputMode";
                        userDefault = getCookie(ControlName);
                        if (userDefault != "") {
                            thisSet.inputMode = userDefault
                        }
                        ;
                        ControlName = seed + "_minValue_value";
                        userDefault = getCookie(ControlName);
                        if (userDefault != "") {
                            thisSet.minValue = userDefault
                        }
                        ;
                        ControlName = seed + "_maxValue_value";
                        userDefault = getCookie(ControlName);
                        if (userDefault != "") {
                            thisSet.maxValue = userDefault
                        }
                        ;
                        ControlName = seed + "_increment_value";
                        userDefault = getCookie(ControlName);
                        if (userDefault != "") {
                            thisSet.increment = userDefault
                        }
                        ;
                    }
                }
            }
        }
        for (i = 0; i <= myCalcParms.length - 1; i++) {
            thisSet = myCalcParms[i];
            if (thisSet.pageID == pageid) {
                switch (thisSet.inputMode) {
                    case "1":
                        strAnswer = "<input id='" + thisSet.controlName + "' onfocus='iClearSetting(this);'type='text'/>";
                        document.getElementById("o_" + thisSet.controlName).innerHTML = strAnswer;
                        document.getElementById(thisSet.controlName).setAttribute("onchange", "newCalc(this," + thisSet.CalcID + ")");
                        document.getElementById(thisSet.controlName).setAttribute("size", thisSet.maxlength);
                        document.getElementById(thisSet.controlName).setAttribute("maxlength", thisSet.maxlength);
                        document.getElementById(thisSet.controlName).setAttribute("onkeydown", "return onlyNum()");
                        document.getElementById(thisSet.controlName).setAttribute("class", "secondaryInput");
                        document.getElementById(thisSet.controlName).setAttribute("onblur", "lostFocus(this);");
                        userValue = getCookie(thisSet.pageID + "_" + thisSet.name + "_keypad_value");
                        if (userValue == "") {
                            userValue = 2
                        }
                        if (userValue == 2) {
                            document.getElementById(thisSet.controlName).setAttribute("name", thisSet.controlName + "_zip");
                        } else {
                            document.getElementById(thisSet.controlName).setAttribute("name", thisSet.controlName + "_telephone");
                        }
                        userValue = getCookie(thisSet.controlName);
                        if (userValue == "") {
                            userValue = thisSet.appDefault
                        }
                        document.getElementById(thisSet.controlName).value = userValue;
                        break;
                    case "99":
                        break;
                    default:
                        document.getElementById("o_" + thisSet.controlName).innerHTML = "";
                        var elem = document.createElement("select");
                        elem.setAttribute("id", thisSet.controlName);
                        elem.setAttribute("onchange", "calc(" + thisSet.CalcID + ")");
                        document.getElementById("o_" + thisSet.controlName).appendChild(elem);
                        switch (thisSet.inputMode) {
                            case "2":
                                if (thisSet.controlName.indexOf("altim") != -1) {
                                    populateANumericDD(thisSet.controlName, parseFloat(thisSet.minValue), parseFloat(thisSet.maxValue), parseFloat(thisSet.appDefault), parseFloat(thisSet.increment));
                                } else {
                                    populateNumericDD(thisSet.controlName, parseFloat(thisSet.minValue), parseFloat(thisSet.maxValue), parseFloat(thisSet.appDefault), parseFloat(thisSet.increment));
                                }
                                break;
                            case "4":
                                populateANumericDD(thisSet.controlName, parseFloat(thisSet.minValue), parseFloat(thisSet.maxValue), parseFloat(thisSet.appDefault), parseFloat(thisSet.increment));
                                break;
                            default:
                                populateUnits(thisSet.xList, thisSet.controlName, thisSet.appDefault);
                                break;
                        }
                }
            }
        }
    }
    ;
    function buildSettingsPage() {
        var strAnswer = "";
        var i = 0;
        var thisSet;
        var fromPage;
        var homeButton = document.getElementById("homeButton");
        var seedName = "";
        if (homeButton) {
            fromPage = homeButton.getAttribute("href");
            fromPage = fromPage.substr(1);
        }
        strAnswer += "<p>Here you can configure how you will be prompted to enter information for this calculation.</p>";
        for (i = 0; i <= myCalcParms.length - 1; i++) {
            thisSet = myCalcParms[i];
            if (thisSet.pageID == fromPage) {
                if (thisSet.userDefined == true) {
                    seedName = thisSet.pageID + "_" + thisSet.name;
                    strAnswer += "<h1>" + thisSet.name + " Value</h1>";
                    strAnswer += "        <ul>";
                    strAnswer += "          <li>Input mode: <select id='" + seedName + "_inputMode' onchange='settings_ChangeInputMode(\"" + seedName + "\");'  style='float:right' class='secondaryInput'></select></li>";
                    strAnswer += "          <li id='" + seedName + "_minValue'><span id='" + seedName + "_minValue_lbl'>List Minimum Value:</span><input name='zip_" + i + "'  id='" + seedName + "_minValue_value' onkeyup='iKeyUp_Settings(this);' onfocus='iClearSetting(this);' style='float:right' class='secondaryInput'  type='text' maxlength='5' size='5' /></li>";
                    strAnswer += "          <li id='" + seedName + "_maxValue'><span id='" + seedName + "_maxValue_lbl'>List Maximun Value:</span><input name='zip_" + i + "' id='" + seedName + "_maxValue_value' onkeyup='iKeyUp_Settings(this);' onfocus='iClearSetting(this);' style='float:right' class='secondaryInput'  type='text' maxlength='5' size='5' /></li>";
                    strAnswer += "          <li id='" + seedName + "_increment'><span id='" + seedName + "_increment_lbl'>Increment By:</span><input name='zip_" + i + "' id='" + seedName + "_increment_value' onkeyup='iKeyUp_Settings(this);' onfocus='iClearSetting(this);' style='float:right' class='secondaryInput' type='text' maxlength='5' size='5'/></li>";
                    strAnswer += "          <li id='" + seedName + "_keypad'>Keypad: <select onchange='settings_ChangeInputMode(\"" + seedName + "\");' style='float:right' class='secondaryInput' id='" + seedName + "_keypad_value'></select></li>";
                    strAnswer += "        </ul>";
                }
            }
        }
        strAnswer += "<br />";
        strAnswer += "<br />";
        document.getElementById("Settings").innerHTML = strAnswer;
        for (i = 0; i <= myCalcParms.length - 1; i++) {
            thisSet = myCalcParms[i];
            if (thisSet.pageID == fromPage) {
                if (thisSet.userDefined == true) {
                    seedName = thisSet.pageID + "_" + thisSet.name;
                    populateUnits(settingInputs, seedName + "_inputMode", 2);
                    populateUnits(keypads, seedName + "_keypad_value", 2);
                    thisControlName = seedName + "_minValue_value";
                    document.getElementById(thisControlName).value = getSettingValue(thisControlName);
                    thisControlName = seedName + "_maxValue_value";
                    document.getElementById(thisControlName).value = getSettingValue(thisControlName);
                    thisControlName = seedName + "_increment_value";
                    document.getElementById(thisControlName).value = getSettingValue(thisControlName);
                    settings_ChangeInputMode(seedName);
                }
            }
        }
    }
    ;
    function getSettingValue(controlName) {
        var aParts = controlName.split("_");
        var familyName = aParts[0];
        var sectionName = aParts[1];
        var controlGroup = aParts[2];
        var controlGroupInstance = aParts[3];
        strAnswer = familyName + " : " + sectionName + " : " + controlGroup + " : " + controlGroupInstance;
        var storedValue = getCookie(controlName);
        var thisSet;
        var i = 0;
        if (storedValue == "") {
            for (i = 0; i <= myCalcParms.length - 1; i++) {
                thisSet = myCalcParms[i];
                if (thisSet.pageID == familyName) {
                    if (thisSet.name == sectionName) {
                        return thisSet[controlGroup];
                    }
                }
            }
        }
        return storedValue;
    }
    ;
    function getCalcID(PageName) {
        var i = 0;
        for (i = 0; i <= myCalcParms.length - 1; i++) {
            thisSet = myCalcParms[i];
            if (thisSet.pageID == PageName) {
                return thisSet.CalcID;
            }
        }
    }
})();
var level1WX = "";
var level2WX = "";
var level3WX = "";
function recordLevel1WX(theData) {
    level1WX = theData;
}
;
function recordLevel2WX(theData) {
    level2WX = theData;
}
;
function recordLevel3WX(theData) {
    level3WX = theData;
}
;
function lostFocus(control, ulID) {
    if (control.value == "") {
        control.value = getCookie(control.id);
        return;
    }
    if (control.value != getCookie(control.id)) {
        if (ulID) {
            clearUL(ulID)
        }
        return;
    }
}
;
function newCalc(control, CalcID) {
    if (control.value == "") {
        control.value = getCookie(control.id);
    }
    calc(CalcID);
}
;
function iKeyUp_Settings(obj) {
    setTimeout(doSettingChange, 70, obj)
}
;
function doSettingChange(obj) {
    var aParts = obj.id.split("_");
    var familyName = aParts[0];
    var sectionName = aParts[1];
    var controlGroup = aParts[2];
    var controlGroupInstance = aParts[3];
    if (obj.value == ".") {
        return;
    }
    if (!isNumber(obj.value)) {
        document.getElementById(familyName + "_" + sectionName + "_" + controlGroup + "_lbl").className = "settingError";
        document.getElementById(familyName + "_" + sectionName + "_" + controlGroup + "_lbl").innerHTML = "Enter numbers only -->";
        return;
    } else {
        myTarget = familyName + "_" + sectionName + "_" + controlGroup + "_lbl";
        document.getElementById(myTarget).className = "";
        switch (controlGroup) {
            case "minValue":
                document.getElementById(myTarget).innerHTML = "List Minimum Value:";
                break;
            case "maxValue":
                document.getElementById(myTarget).innerHTML = "List Maximun Value:";
                break;
            case "increment":
                document.getElementById(myTarget).innerHTML = "Increment By:";
                break;
            default:
                document.getElementById(myTarget).innerHTML = "";
                break;
        }
    }
    setCookie(obj.id, obj.value);
}
;
function settings_ChangeInputMode(seedName) {
    var show = "";
    if (document.getElementById(seedName + '_inputMode').value == 1) {
        show = "none";
        document.getElementById(seedName + '_keypad').style.display = "";
    } else {
        show = "";
        document.getElementById(seedName + '_keypad').style.display = "none";
    }
    document.getElementById(seedName + '_minValue').style.display = show;
    document.getElementById(seedName + '_maxValue').style.display = show;
    document.getElementById(seedName + '_increment').style.display = show;
    setCookie(seedName + "_inputMode", document.getElementById(seedName + "_inputMode").value);
    setCookie(seedName + "_keypad_value", document.getElementById(seedName + "_keypad_value").value);
}
;
function clearUL(ulID) {
    var cell = document.getElementById(ulID);
    if (cell.hasChildNodes()) {
        while (cell.childNodes.length >= 1) {
            cell.removeChild(cell.firstChild);
        }
    }
}
;
var myRequest;
var sigmetULID = "";
var sigmetAnswerID = "";
function calc(proc) {
    if (!proc) {
        return;
    }
    var dist = 0;
    var distUnits = 0;
    var cDist = 0;
    var speed = 0;
    var speedUnits = 0;
    var cSpeed = 0;
    var h = 0;
    var m = 0;
    var s = 0;
    var nat = 0;
    var sat = 0;
    var miles = 0;
    var knoths = 0;
    var gh = 0;
    var gCap = 0;
    var fuelAnswer = 0;
    var fc_FuelBurned = 0;
    switch (proc) {
        case 1:
            speed = parseInt(document.getElementById("ftSpeed").value);
            speedUnits = parseFloat(document.getElementById("ftSpeedUnits").value);
            dist = parseInt(document.getElementById("ftDistance").value);
            distUnits = parseFloat(document.getElementById("ftDistUnits").value);
            cDist = dist * distUnits;
            cSpeed = speed * speedUnits;
            s = cDist / cSpeed;
            s = Math.round(s);
            h = parseInt(s / 3600);
            s = s - (h * 3600);
            m = parseInt(s / 60);
            s = parseInt(s - (m * 60));
            document.getElementById("ftAnswer").innerHTML = formatTimeSentence(h, m, s);
            setCookie("ftSpeed", speed);
            setCookie("ftSpeedUnits", speedUnits);
            setCookie("ftDistance", dist);
            setCookie("ftDistUnits", distUnits);
            break;
        case 2:
            speed = parseInt(document.getElementById("fdSpeed").value);
            speedUnits = parseFloat(document.getElementById("fdSpeedUnits").value);
            h = parseFloat(document.getElementById("fdHours").value);
            m = parseFloat(document.getElementById("fdMinutes").value);
            s = parseFloat((m * 60) + parseFloat(h * 3600));
            cSpeed = speed * speedUnits;
            nat = (s * cSpeed) / 1852.0;
            sat = (s * cSpeed) / 1609.344;
            nat = Math.round(nat * 100) / 100;
            sat = Math.round(sat * 100) / 100;
            document.getElementById("fdAnswer").innerHTML = formatDistanceSentence(sat, nat);
            setCookie("fdSpeed", speed);
            setCookie("fdSpeedUnits", speedUnits);
            setCookie("fdHours", h);
            setCookie("fdMinutes", m);
            break;
        case 3:
            dist = parseFloat(document.getElementById("fsDistance").value);
            distUnits = parseFloat(document.getElementById("fsDistUnits").value);
            h = parseFloat(document.getElementById("fsHours").value);
            m = parseFloat(document.getElementById("fsMinutes").value);
            s = parseFloat((m * 60) + parseFloat(h * 3600));
            cDist = dist * distUnits;
            miles = cDist / (s * .44704);
            knots = cDist / (s * .514444444444);
            miles = Math.round(miles);
            knots = Math.round(knots);
            document.getElementById("fsAnswer").innerHTML = formatSpeedSentence(miles, knots);
            setCookie("fsDistance", dist);
            setCookie("fsDistUnits", distUnits);
            setCookie("fsHours", h);
            setCookie("fsMinutes", m);
            break;
        case 4:
            gh = parseFloat(document.getElementById("gph").value);
            gCap = parseFloat(document.getElementById("gallonsUsable").value);
            fuelAnswer = gCap / gh;
            h = parseInt(fuelAnswer);
            fuelAnswer -= parseInt(fuelAnswer);
            fuelAnswer *= 60;
            m = parseInt(fuelAnswer);
            fuelAnswer -= parseInt(fuelAnswer);
            fuelAnswer *= 60;
            s = parseInt(fuelAnswer);
            document.getElementById("fuelFTanswer").innerHTML = formatTimeSentence(h, m, s);
            setCookie("gph", gh);
            setCookie("gallonsUsable", gCap);
            break;
        case 5:
            gh = parseFloat(document.getElementById("fbGPH").value);
            h = parseFloat(document.getElementById("fbHours").value);
            m = parseFloat(document.getElementById("fbMinutes").value);
            s = (h * 3600) + (m * 60);
            fuelAnswer = (s / 3600) * gh;
            fuelAnswer = (Math.round(fuelAnswer * 100)) / 100;
            document.getElementById("fbAnswer").innerHTML = fuelAnswer + " gallons";
            setCookie("fbGPH", gh);
            setCookie("fbHours", h);
            setCookie("fbMinutes", m);
            break;
        case 6:
            fc_FuelBurned = parseFloat(document.getElementById("fcburned").value);
            h = parseFloat(document.getElementById("fchours").value);
            m = parseFloat(document.getElementById("fcminutes").value);
            s = (h * 3600) + (m * 60);
            fuelAnswer = fc_FuelBurned / (s / 3600);
            fuelAnswer = (Math.round(fuelAnswer * 100)) / 100;
            document.getElementById("fcAnswer").innerHTML = fuelAnswer + " GPH";
            setCookie("fcburned", fc_FuelBurned);
            setCookie("fchours", h);
            setCookie("fcminutes", m);
            break;
        case 7:
            calcTAS();
            break;
        case 8:
            calcPA();
            break;
        case 9:
            calcDA();
            break;
        case 10:
            computeXWind();
            break;
        case 11:
            WindSpeedDirection();
            break;
        case 12:
            wind12();
            break;
        case 13:
            wind13();
            break;
        case 14:
            calcTempConv();
            break;
        case 15:
            calcDistanceConversion();
            break;
        case 16:
            calcSpeedConversion();
            break;
        case 17:
            calcWeightConversion();
            break;
        case 18:
            calcAreaConversion();
            break;
        case 19:
            calcVolumeConversion();
            break;
        case 20:
            var FuelFT_lbs_rate = parseFloat(document.getElementById("FuelFT_lbs_rate").value);
            var FuelFT_lbs_usable = parseFloat(document.getElementById("FuelFT_lbs_usable").value);
            fuelAnswer = FuelFT_lbs_usable / FuelFT_lbs_rate;
            h = parseInt(fuelAnswer);
            fuelAnswer -= parseInt(fuelAnswer);
            fuelAnswer *= 60;
            m = parseInt(fuelAnswer);
            fuelAnswer -= parseInt(fuelAnswer);
            fuelAnswer *= 60;
            s = parseInt(fuelAnswer);
            document.getElementById("fuelFT_lbl_answer").innerHTML = formatTimeSentence(h, m, s);
            setCookie("FuelFT_lbs_rate", FuelFT_lbs_rate);
            setCookie("FuelFT_lbs_usable", FuelFT_lbs_usable);
            break;
        case 21:
            var FuelBurned_lbs_rate = parseFloat(document.getElementById("FuelBurned_lbs_rate").value);
            var fb_Hours_lbs = parseFloat(document.getElementById("fb_Hours_lbs").value);
            var fb_Minutes_lbs = parseFloat(document.getElementById("fb_Minutes_lbs").value);
            s = (fb_Hours_lbs * 3600) + (fb_Minutes_lbs * 60);
            fuelAnswer = (s / 3600) * FuelBurned_lbs_rate;
            fuelAnswer = (Math.round(fuelAnswer * 100)) / 100;
            fuelAnswer = new Number(fuelAnswer).numberFormat("#,###");
            document.getElementById("fb_Answer_lbs").innerHTML = fuelAnswer + " pounds";
            setCookie("FuelBurned_lbs_rate", FuelBurned_lbs_rate);
            setCookie("fb_Hours_lbs", fb_Hours_lbs);
            setCookie("fb_Minutes_lbs", fb_Minutes_lbs);
            break;
        case 22:
            var fc_lbs_rate = parseFloat(document.getElementById("fc_lbs_rate").value);
            h = parseFloat(document.getElementById("fc_hours_lbs").value);
            m = parseFloat(document.getElementById("fc_minutes_lbs").value);
            s = (h * 3600) + (m * 60);
            fuelAnswer = fc_lbs_rate / (s / 3600);
            fuelAnswer = (Math.round(fuelAnswer * 100)) / 100;
            fuelAnswer = new Number(fuelAnswer).numberFormat("#,###");
            document.getElementById("fc_Answer_lbs").innerHTML = fuelAnswer + " lbs/hr";
            setCookie("fc_lbs_rate", fc_lbs_rate);
            setCookie("fc_hours_lbs", h);
            setCookie("fc_minutes_lbs", m);
            break;
        case 23:
            if (myRequest) {
                myRequest.abort();
                myRequest = null;
            }
            document.getElementById("metarAnswer").innerHTML = "loading...";
            var cell = document.getElementById("metarUL");
            if (cell.hasChildNodes()) {
                while (cell.childNodes.length >= 1) {
                    cell.removeChild(cell.firstChild);
                }
            }
            if (document.getElementById("metarStationID").value.length < 4) {
                document.getElementById("metarAnswer").innerHTML = "The 4 character ICAO Station ID is needed.";
                break;
            }
            setCookie("metarStationID", document.getElementById("metarStationID").value);
            setCookie("metarHours", document.getElementById("metarHours").value);
            setCookie("metarDist", document.getElementById("metarDist").value);
            if (document.getElementById("metarHours").value == 0) {
                document.getElementById("metarAnswer").innerHTML = "No Data available for " + document.getElementById("metarStationID").value;
                break;
            }
            myRequest = new XMLHttpRequest();
            myRequest.open("GET", "metar.aspx?dist=" + document.getElementById("metarDist").value + "&sid=" + document.getElementById("metarStationID").value + "&hrs=" + document.getElementById("metarHours").value);
            myRequest.setRequestHeader("Cache-Control", "no-cache");
            myRequest.onload = myOnLoadHandlerFunctionMETAR;
            myRequest.send();
            break;
        case 24:
            if (myRequest) {
                myRequest.abort();
                myRequest = null;
            }
            document.getElementById("tafAnswer").innerHTML = "loading...";
            var cell = document.getElementById("tafUL");
            if (cell.hasChildNodes()) {
                while (cell.childNodes.length >= 1) {
                    cell.removeChild(cell.firstChild);
                }
            }
            if (document.getElementById("tafStationID").value.length < 3) {
                document.getElementById("tafAnswer").innerHTML = "Enter at least 3 characters for Station ID";
                break;
            }
            setCookie("tafStationID", document.getElementById("tafStationID").value);
            setCookie("tafHours", document.getElementById("tafHours").value);
            if (document.getElementById("tafHours").value == 0) {
                document.getElementById("tafAnswer").innerHTML = "No Data available for " + document.getElementById("metarStationID").value;
                break;
            }
            myRequest = new XMLHttpRequest();
            myRequest.open("GET", "taf.aspx?sid=" + document.getElementById("tafStationID").value + "&hrs=" + document.getElementById("tafHours").value);
            myRequest.setRequestHeader("Cache-Control", "no-cache");
            myRequest.onload = myOnLoadHandlerFunctionTAF;
            myRequest.send();
            break;
        case 25:
            if (myRequest) {
                myRequest.abort();
                myRequest = null;
            }
            document.getElementById("sigmetAnswer").innerHTML = "loading...";
            var cell = document.getElementById("sigmetUL");
            if (cell.hasChildNodes()) {
                while (cell.childNodes.length >= 1) {
                    cell.removeChild(cell.firstChild);
                }
            }
            if (document.getElementById("sigmetTo").value.length < 4) {
                document.getElementById("sigmetAnswer").innerHTML = "The 4 character ICAO Station ID is needed.";
                break;
            }
            if (document.getElementById("sigmetFrom").value.length < 4) {
                document.getElementById("sigmetAnswer").innerHTML = "The 4 character ICAO Station ID is needed.";
                break;
            }
            setCookie("sigmetTo", document.getElementById("sigmetTo").value);
            setCookie("sigmetHours", document.getElementById("sigmetHours").value);
            setCookie("sigmetFrom", document.getElementById("sigmetFrom").value);
            setCookie("sigmetDist", document.getElementById("sigmetDist").value);
            if (document.getElementById("sigmetHours").value == 0) {
                document.getElementById("sigmetAnswer").innerHTML = "No Data available for flight path.";
                break;
            }
            sigmetULID = "sigmetUL";
            sigmetAnswerID = "sigmetAnswer";
            var strReq = "sigmet.aspx?intMode=1&fromID=" + document.getElementById("sigmetFrom").value + "&toID=" + document.getElementById("sigmetTo").value + "&hrs=" + document.getElementById("sigmetHours").value + "&rad=" + document.getElementById("sigmetDist").value;
            myRequest = new XMLHttpRequest();
            myRequest.open("GET", strReq);
            myRequest.setRequestHeader("Cache-Control", "no-cache");
            myRequest.onload = myOnLoadHandlerFunctionSIGMET;
            myRequest.send();
            break;
        case 26:
            if (myRequest) {
                myRequest.abort();
                myRequest = null;
            }
            document.getElementById("sigmet2Answer").innerHTML = "loading...";
            var cell = document.getElementById("sigmet2UL");
            if (cell.hasChildNodes()) {
                while (cell.childNodes.length >= 1) {
                    cell.removeChild(cell.firstChild);
                }
            }
            setCookie("sigmet2Hours", document.getElementById("sigmetHours").value);
            if (document.getElementById("sigmet2Hours").value == 0) {
                document.getElementById("sigmet2Answer").innerHTML = "No Data available for flight path.";
                break;
            }
            sigmetULID = "sigmet2UL";
            sigmetAnswerID = "sigmet2Answer";
            var strReq = "sigmet.aspx?intMode=2&hrs=" + document.getElementById("sigmet2Hours").value;
            myRequest = new XMLHttpRequest();
            myRequest.open("GET", strReq);
            myRequest.setRequestHeader("Cache-Control", "no-cache");
            myRequest.onload = myOnLoadHandlerFunctionSIGMET;
            myRequest.send();
            break;
        case 27:
            if (myRequest) {
                myRequest.abort();
                myRequest = null;
            }
            document.getElementById("pirepAnswer").innerHTML = "loading...";
            var cell = document.getElementById("pirepUL");
            if (cell.hasChildNodes()) {
                while (cell.childNodes.length >= 1) {
                    cell.removeChild(cell.firstChild);
                }
            }
            if (document.getElementById("pirepStationTo").value.length < 4) {
                document.getElementById("pirepAnswer").innerHTML = "The 4 character ICAO Station ID is needed.";
                break;
            }
            if (document.getElementById("pirepStationFrom").value.length < 4) {
                document.getElementById("pirepAnswer").innerHTML = "The 4 character ICAO Station ID is needed.";
                break;
            }
            setCookie("pirepStationTo", document.getElementById("pirepStationTo").value);
            setCookie("pirepHours", document.getElementById("pirepHours").value);
            setCookie("pirepStationFrom", document.getElementById("pirepStationFrom").value);
            setCookie("pirepDist", document.getElementById("pirepDist").value);
            if (document.getElementById("pirepHours").value == 0) {
                document.getElementById("pirepAnswer").innerHTML = "No Data available for flight path.";
                break;
            }
            var strReq = "pirep.aspx?stationFrom=" + document.getElementById("pirepStationFrom").value + "&stationTo=" + document.getElementById("pirepStationTo").value + "&hrs=" + document.getElementById("pirepHours").value + "&rad=" + document.getElementById("pirepDist").value;
            myRequest = new XMLHttpRequest();
            myRequest.open("GET", strReq);
            myRequest.setRequestHeader("Cache-Control", "no-cache");
            myRequest.onload = myOnLoadHandlerFunctionPIREP;
            myRequest.send();
            break;
        case 28:
            if (myRequest) {
                myRequest.abort();
                myRequest = null;
            }
            var cell = document.getElementById("stationBrowse");
            if (cell.hasChildNodes()) {
                while (cell.childNodes.length >= 1) {
                    cell.removeChild(cell.firstChild);
                }
            }
            var strReq = "station1.aspx";
            myRequest = new XMLHttpRequest();
            myRequest.open("GET", strReq);
            myRequest.onload = myOnLoadHandlerFunctionBrowseWX1;
            myRequest.send();
            break;
        case 29:
            if (myRequest) {
                myRequest.abort();
                myRequest = null;
            }
            var cell = document.getElementById("stationBrowse2");
            if (cell.hasChildNodes()) {
                while (cell.childNodes.length >= 1) {
                    cell.removeChild(cell.firstChild);
                }
            }
            var strReq = "station2.aspx?key=" + level1WX;
            myRequest = new XMLHttpRequest();
            myRequest.open("GET", strReq);
            myRequest.onload = myOnLoadHandlerFunctionBrowseWX2;
            myRequest.send();
            break;
        case 31:
            if (myRequest) {
                myRequest.abort();
                myRequest = null;
            }
            document.getElementById("stationRADanswer").innerHTML = "loading...";
            var cell = document.getElementById("stationRADUL");
            if (cell.hasChildNodes()) {
                while (cell.childNodes.length >= 1) {
                    cell.removeChild(cell.firstChild);
                }
            }
            if (document.getElementById("stationRADcd").value.length < 4) {
                document.getElementById("stationRADanswer").innerHTML = "The 4 character ICAO Station ID is required.";
                break;
            }
            setCookie("stationRADdist", document.getElementById("stationRADdist").value);
            setCookie("stationRADcd", document.getElementById("stationRADcd").value);
            myRequest = new XMLHttpRequest();
            myRequest.open("GET", "stationRAD.aspx?dist=" + document.getElementById("stationRADdist").value + "&sid=" + document.getElementById("stationRADcd").value);
            myRequest.onload = myOnLoadHandlerStationRAD;
            myRequest.send();
            break;
        case 32:
            if (myRequest) {
                myRequest.abort();
                myRequest = null;
            }
            var cell = document.getElementById("stationBrowseState");
            if (cell.hasChildNodes()) {
                while (cell.childNodes.length >= 1) {
                    cell.removeChild(cell.firstChild);
                }
            }
            myRequest = new XMLHttpRequest();
            myRequest.open("GET", "stationStates.aspx?&sid=" + level2WX);
            myRequest.onload = myOnLoadHandlerFunctionBrowseState;
            myRequest.send();
            break;
        case 33:
            if (myRequest) {
                myRequest.abort();
                myRequest = null;
            }
            var cell = document.getElementById("stationBrowseList");
            if (cell.hasChildNodes()) {
                while (cell.childNodes.length >= 1) {
                    cell.removeChild(cell.firstChild);
                }
            }
            myRequest = new XMLHttpRequest();
            myRequest.open("GET", "stationList.aspx?&sid=" + level3WX);
            myRequest.onload = myOnLoadHandlerStationList;
            myRequest.send();
            break;
        default:
    }
}
;
function myOnLoadHandlerStationList() {
    var parser = new DOMParser();
    var doc = parser.parseFromString(myRequest.responseText, "text/xml");
    var data = doc.getElementsByTagName("Station");
    var i;
    var strAnswer = "";
    var desc = "";
    var elem1;
    var elem2;
    var haveData = false;
    var thisSite = "";
    var lastSite = "";
    elem1 = document.createElement("li");
    elem2 = document.createElement("div");
    elem3 = document.createElement("p");
    elem3.innerHTML = "<center>" + level3WX.replace("@", "") + "</center>";
    elem2.appendChild(elem3);
    elem1.appendChild(elem2);
    document.getElementById("stationBrowseList").appendChild(elem1);
    for (i = 0; i <= data.length - 1; i++) {
        thisSite = data[i].getElementsByTagName("station_id")[0].firstChild.nodeValue;
        elem1 = document.createElement("li");
        elem2 = document.createElement("p");
        desc = "<center>" + data[i].getElementsByTagName("site")[0].firstChild.nodeValue + " <br/>" + "<small>" + data[i].getElementsByTagName("SiteType")[0].firstChild.nodeValue + " <br/>" + "</small></center>";
        elem2.innerHTML = desc;
        elem1.appendChild(elem2);
        document.getElementById("stationBrowseList").appendChild(elem1);
        lastSite = thisSite;
        haveData = true;
    }
    document.getElementById('spinner').style.display = 'none';
    delete parser;
    delete doc;
    delete data;
}
;
function myOnLoadHandlerFunctionBrowseState() {
    var elem1;
    var elem2;
    var elem3;
    var elem4;
    elem1 = document.createElement("li");
    elem2 = document.createElement("div");
    elem3 = document.createElement("p");
    elem3.innerHTML = "<center>" + level2WX + "</center>";
    elem2.appendChild(elem3);
    elem1.appendChild(elem2);
    document.getElementById("stationBrowseState").appendChild(elem1);
    var data = eval(myRequest.responseText);
    for (var i = 0; i < data.length; i++) {
        elem1 = document.createElement("li");
        elem2 = document.createElement("a");
        elem2.setAttribute("onclick", "recordLevel3WX('@" + data[i] + "')");
        elem2.setAttribute("href", "#stationBrowseList");
        elem3 = document.createElement("div");
        elem3.setAttribute("class", "list-link");
        elem4 = document.createElement("p");
        elem4.innerHTML = data[i];
        elem3.appendChild(elem4);
        elem2.appendChild(elem3);
        elem1.appendChild(elem2);
        document.getElementById("stationBrowseState").appendChild(elem1)
    }
    document.getElementById('spinner').style.display = 'none';
    delete data;
}
;
function myOnLoadHandlerStationRAD() {
    var parser = new DOMParser();
    var doc = parser.parseFromString(myRequest.responseText, "text/xml");
    var data = doc.getElementsByTagName("Station");
    var i;
    var strAnswer = "";
    var desc = "";
    var elem1;
    var elem2;
    var haveData = false;
    var thisSite = "";
    var lastSite = "";
    for (i = 0; i <= data.length - 1; i++) {
        thisSite = data[i].getElementsByTagName("station_id")[0].firstChild.nodeValue;
        elem1 = document.createElement("li");
        elem2 = document.createElement("p");
        desc = "<center>" + data[i].getElementsByTagName("site")[0].firstChild.nodeValue + " <br/>" + "<small>" + data[i].getElementsByTagName("SiteType")[0].firstChild.nodeValue + " <br/>" + data[i].getElementsByTagName("xxx")[0].firstChild.nodeValue + "</small></center>";
        elem2.innerHTML = desc;
        elem1.appendChild(elem2);
        document.getElementById("stationRADUL").appendChild(elem1);
        lastSite = thisSite;
        haveData = true;
    }
    if (haveData) {
        document.getElementById("stationRADanswer").innerHTML = "<center>" + strAnswer + "</center>";
    } else {
        document.getElementById("stationRADanswer").innerHTML = "<center>" + myRequest.responseText + "</center>";
    }
    delete parser;
    delete doc;
    delete data;
}
;
function myOnLoadHandlerFunctionBrowseWX2() {
    var elem1;
    var elem2;
    var elem3;
    var elem4;
    elem1 = document.createElement("li");
    elem2 = document.createElement("div");
    elem3 = document.createElement("p");
    elem3.innerHTML = "<center>" + level1WX + "</center>";
    elem2.appendChild(elem3);
    elem1.appendChild(elem2);
    document.getElementById("stationBrowse2").appendChild(elem1);
    var data = eval(myRequest.responseText);
    for (var i = 0; i < data.length; i++) {
        elem1 = document.createElement("li");
        elem2 = document.createElement("a");
        switch (data[i]) {
            case "C Canada":
                elem2.setAttribute("onclick", "recordLevel2WX('" + data[i] + "')");
                elem2.setAttribute("href", "#stationBrowseState");
                break;
            case "K Mainland United States of America":
                elem2.setAttribute("onclick", "recordLevel2WX('" + data[i] + "')");
                elem2.setAttribute("href", "#stationBrowseState");
                break;
            default:
                elem2.setAttribute("onclick", "recordLevel3WX('" + data[i] + "')");
                elem2.setAttribute("href", "#stationBrowseList");
                break;
        }
        elem3 = document.createElement("div");
        elem3.setAttribute("class", "list-link");
        elem4 = document.createElement("p");
        elem4.innerHTML = data[i];
        elem3.appendChild(elem4);
        elem2.appendChild(elem3);
        elem1.appendChild(elem2);
        document.getElementById("stationBrowse2").appendChild(elem1)
    }
    document.getElementById('spinner').style.display = 'none';
    delete data;
}
;
function myOnLoadHandlerFunctionBrowseWX1() {
    var elem1;
    var elem2;
    var elem3;
    var elem4;
    var data = eval(myRequest.responseText);
    for (var i = 0; i < data.length; i++) {
        elem1 = document.createElement("li");
        elem2 = document.createElement("a");
        elem2.setAttribute("onclick", "recordLevel1WX('" + data[i] + "')");
        elem2.setAttribute("href", "#stationBrowse2");
        elem3 = document.createElement("div");
        elem3.setAttribute("class", "list-link");
        elem4 = document.createElement("p");
        elem4.innerHTML = data[i];
        elem3.appendChild(elem4);
        elem2.appendChild(elem3);
        elem1.appendChild(elem2);
        document.getElementById("stationBrowse").appendChild(elem1)
    }
    document.getElementById('spinner').style.display = 'none';
    delete data;
}
;
function myOnLoadHandlerFunctionSIGMET() {
    var parser = new DOMParser();
    var doc = parser.parseFromString(myRequest.responseText, "text/xml");
    var data = doc.getElementsByTagName("AIRSIGMET");
    var i;
    var strAnswer = "";
    var strBad = "Service not available.  Try again in a few seconds.";
    var elem1;
    var elem2;
    var haveData = false;
    for (i = 0; i <= data.length - 1; i++) {
        strAnswer = data[i].getElementsByTagName("raw_text")[0].firstChild.nodeValue + "<br /><br />";
        if (strAnswer) {
            if (strAnswer.length == 0) {
                strAnswer = strBad
            }
            if (strAnswer.indexOf("Service not available") != -1) {
                strAnswer = strBad
            }
        } else {
            strAnswer = strBad
        }
        elem1 = document.createElement("li");
        elem2 = document.createElement("p");
        elem2.innerHTML = strAnswer;
        elem1.appendChild(elem2);
        document.getElementById(sigmetULID).appendChild(elem1);
        strAnswer = "";
        haveData = true;
    }
    if (!haveData) {
        if (strAnswer.length == 0) {
            strAnswer = "No Data available for flight path."
        }
    }
    document.getElementById(sigmetAnswerID).innerHTML = strAnswer;
    delete parser;
    delete doc;
    delete data;
}
;
function myOnLoadHandlerFunctionMETAR() {
    var parser = new DOMParser();
    var doc = parser.parseFromString(myRequest.responseText, "text/xml");
    var data = doc.getElementsByTagName("METAR");
    var i;
    var strAnswer = "";
    var strBad = "Service not available.  Try again in a few seconds.";
    var desc = "";
    var elem1;
    var elem2;
    var haveData = false;
    var thisSite = "";
    var lastSite = "";
    for (i = 0; i <= data.length - 1; i++) {
        strAnswer = data[i].getElementsByTagName("raw_text")[0].firstChild.nodeValue + "<br />";
        if (strAnswer) {
            if (strAnswer.length == 0) {
                strAnswer = strBad
            }
            if (strAnswer.indexOf("Service not available") != -1) {
                strAnswer = strBad
            }
        } else {
            strAnswer = strBad
        }
        if (strAnswer != strBad) {
            thisSite = data[i].getElementsByTagName("station_id")[0].firstChild.nodeValue;
            if (thisSite != lastSite) {
                elem1 = document.createElement("li");
                elem2 = document.createElement("p");
                if (data[i].getElementsByTagName("xxx")[0].firstChild.nodeValue == "- - -") {
                    desc = "<center>" + data[i].getElementsByTagName("site")[0].firstChild.nodeValue + "</center>";
                } else {
                    desc = "<center>" + data[i].getElementsByTagName("site")[0].firstChild.nodeValue + "<br/> <small>" + data[i].getElementsByTagName("xxx")[0].firstChild.nodeValue + "</small></center>";
                }
                elem2.innerHTML = desc;
                elem1.appendChild(elem2);
                document.getElementById("metarUL").appendChild(elem1);
                lastSite = thisSite;
            }
        }
        elem1 = document.createElement("li");
        elem2 = document.createElement("p");
        elem2.innerHTML = strAnswer;
        elem1.appendChild(elem2);
        document.getElementById("metarUL").appendChild(elem1);
        strAnswer = "";
        haveData = true;
    }
    if (haveData) {
    } else {
        if (strAnswer.length == 0) {
            strAnswer = "No Data available for " + document.getElementById("metarStationID").value
        }
    }
    data = doc.getElementsByTagName("AnswerTime");
    for (i = 0; i <= data.length - 1; i++) {
        strAnswer = data[i].getElementsByTagName("UTCTime")[0].firstChild.nodeValue;
    }
    document.getElementById("metarAnswer").innerHTML = "<center>" + strAnswer + "</center>";
    delete parser;
    delete doc;
    delete data;
}
;
function myOnLoadHandlerFunctionTAF() {
    var parser = new DOMParser();
    var doc = parser.parseFromString(myRequest.responseText, "text/xml");
    var data = doc.getElementsByTagName("TAF");
    var i;
    var strAnswer = "";
    var strBad = "Service not available.  Try again in a few seconds.";
    var elem1;
    var elem2;
    var haveData = false;
    for (i = 0; i <= data.length - 1; i++) {
        strAnswer = data[i].getElementsByTagName("raw_text")[0].firstChild.nodeValue + "<br /><br />";
        if (strAnswer) {
            if (strAnswer.length == 0) {
                strAnswer = strBad
            }
            if (strAnswer.indexOf("Service not available") != -1) {
                strAnswer = strBad
            }
        } else {
            strAnswer = strBad
        }
        elem1 = document.createElement("li");
        elem2 = document.createElement("p");
        elem2.innerHTML = strAnswer;
        elem1.appendChild(elem2);
        document.getElementById("tafUL").appendChild(elem1);
        strAnswer = "";
        haveData = true;
    }
    if (haveData) {
        data = doc.getElementsByTagName("Station");
        for (i = 0; i <= data.length - 1; i++) {
            strAnswer += data[i].getElementsByTagName("site")[0].firstChild.nodeValue + " - " + data[i].getElementsByTagName("station_id")[0].firstChild.nodeValue + "<br />";
        }
    } else {
        if (strAnswer.length == 0) {
            strAnswer = "No Data available for " + document.getElementById("tafStationID").value
        }
    }
    document.getElementById("tafAnswer").innerHTML = "<center>" + strAnswer + "</center>";
    delete parser;
    delete doc;
    delete data;
}
;
function myOnLoadHandlerFunctionPIREP() {
    var parser = new DOMParser();
    var doc = parser.parseFromString(myRequest.responseText, "text/xml");
    var data = doc.getElementsByTagName("PIREP");
    var i;
    var strAnswer = "";
    var strBad = "Service not available.  Try again in a few seconds.";
    var elem1;
    var elem2;
    var haveData = false;
    for (i = 0; i <= data.length - 1; i++) {
        strAnswer = data[i].getElementsByTagName("raw_text")[0].firstChild.nodeValue + "<br /><br />";
        if (strAnswer) {
            if (strAnswer.length == 0) {
                strAnswer = strBad
            }
            if (strAnswer.indexOf("Service not available") != -1) {
                strAnswer = strBad
            }
        } else {
            strAnswer = strBad
        }
        elem1 = document.createElement("li");
        elem2 = document.createElement("p");
        elem2.innerHTML = strAnswer;
        elem1.appendChild(elem2);
        document.getElementById("pirepUL").appendChild(elem1);
        strAnswer = "";
        haveData = true;
    }
    if (!haveData) {
        if (strAnswer.length == 0) {
            strAnswer = "No data available for flight path.";
        }
    }
    document.getElementById("pirepAnswer").innerHTML = strAnswer;
    delete parser;
    delete doc;
    delete data;
}
;
function calcVolumeConversion() {
    var userValue = document.getElementById("cVol_val").value;
    var fVal = document.getElementById("cVol_unit").value;
    var answer = 0;
    var i = 0;
    var strAnswer = "";
    setCookie("cVol_val", userValue);
    setCookie("cVol_unit", fVal);
    document.getElementById("cVol_answer").innerHTML = "";
    strAnswer = "<center><table cellpadding='1'>";
    var theseOpts = document.getElementById("cVol_unit").options;
    for (i = 0; i <= theseOpts.length - 1; i++) {
        if (theseOpts[i].value == fVal) {
        } else {
            answer = userValue * (eval(fVal) / eval(theseOpts[i].value));
            answer = new Number(answer).numberFormat("#,###.##");
            strAnswer += "<tr><td align ='right'>" + answer + "</td><td>" + theseOpts[i].text + "</td></tr>";
        }
    }
    strAnswer += "</table></center>";
    document.getElementById("cVol_answer").innerHTML += strAnswer;
}
;
function calcAreaConversion() {
    var userValue = document.getElementById("cArea_val").value;
    var fVal = document.getElementById("cArea_unit").value;
    var answer = 0;
    var i = 0;
    var strAnswer = "";
    setCookie("cArea_val", userValue);
    setCookie("cArea_unit", fVal);
    document.getElementById("cArea_answer").innerHTML = "";
    strAnswer = "<center><table cellpadding='1'>";
    var theseOpts = document.getElementById("cArea_unit").options;
    for (i = 0; i <= theseOpts.length - 1; i++) {
        if (theseOpts[i].value == fVal) {
        } else {
            answer = userValue * (eval(fVal) / eval(theseOpts[i].value));
            answer = new Number(answer).numberFormat("#,###.##");
            strAnswer += "<tr><td align ='right'>" + answer + "</td><td>" + theseOpts[i].text + "</td></tr>";
        }
    }
    strAnswer += "</table></center>";
    document.getElementById("cArea_answer").innerHTML += strAnswer;
}
;
function calcWeightConversion() {
    var userValue = document.getElementById("cWeight_val").value;
    var fVal = document.getElementById("cWeight_unit").value;
    var answer = 0;
    var i = 0;
    var strAnswer = "";
    setCookie("cWeight_val", userValue);
    setCookie("cWeight_unit", fVal);
    document.getElementById("cWeight_answer").innerHTML = "";
    strAnswer = "<center><table cellpadding='1'>";
    var theseOpts = document.getElementById("cWeight_unit").options;
    for (i = 0; i <= theseOpts.length - 1; i++) {
        if (theseOpts[i].value == fVal) {
        } else {
            answer = userValue * (eval(fVal) / eval(theseOpts[i].value));
            answer = new Number(answer).numberFormat("#,###.##");
            strAnswer += "<tr><td align ='right'>" + answer + "</td><td>" + theseOpts[i].text + "</td></tr>";
        }
    }
    strAnswer += "</table></center>";
    document.getElementById("cWeight_answer").innerHTML += strAnswer;
}
;
function calcDistanceConversion() {
    var userValue = document.getElementById("cDist_val").value;
    var fVal = document.getElementById("cDist_unit").value;
    var answer = 0;
    var i = 0;
    var strAnswer = "";
    setCookie("cDist_val", userValue);
    setCookie("cDist_unit", fVal);
    document.getElementById("cDist_answer").innerHTML = "";
    strAnswer = "<center><table cellpadding='1'>";
    var theseOpts = document.getElementById("cDist_unit").options;
    for (i = 0; i <= theseOpts.length - 1; i++) {
        if (theseOpts[i].value == fVal) {
        } else {
            answer = userValue * (fVal / theseOpts[i].value);
            answer = new Number(answer).numberFormat("#,###.##");
            strAnswer += "<tr><td align ='right'>" + answer + "</td><td>" + theseOpts[i].text + "</td></tr>";
        }
    }
    strAnswer += "</table></center>";
    document.getElementById("cDist_answer").innerHTML += strAnswer;
}
;
function calcSpeedConversion() {
    var userValue = document.getElementById("cSpeed_val").value;
    var fVal = document.getElementById("cSpeed_unit").value;
    var answer = 0;
    var i = 0;
    var strAnswer = "";
    setCookie("cSpeed_val", userValue);
    setCookie("cSpeed_unit", fVal);
    document.getElementById("cSpeed_answer").innerHTML = "";
    strAnswer = "<center><table cellpadding='1'>";
    var theseOpts = document.getElementById("cSpeed_unit").options;
    for (i = 0; i <= theseOpts.length - 1; i++) {
        if (theseOpts[i].value == fVal) {
        } else {
            answer = userValue * (eval(fVal) / eval(theseOpts[i].value));
            answer = new Number(answer).numberFormat("#,###.##");
            strAnswer += "<tr><td align ='right'>" + answer + "</td><td>" + theseOpts[i].text + "</td></tr>";
        }
    }
    strAnswer += "</table></center>";
    document.getElementById("cSpeed_answer").innerHTML += strAnswer;
}
;
function onlyNum() {
    if (event.keyCode == 32) {
        return false
    }
    if (event.keyCode == 45) {
        return true
    }
    if (event.keyCode == 198) {
        return true
    }
    if (event.keyCode == 8) {
        return true
    }
    if (event.keyCode == 46) {
        return true
    }
    if (event.keyCode > 95) {
        if (event.keyCode < 106) {
            return true;
        }
    }
    if ((event.keyCode < 46) || (event.keyCode > 57)) {
        return false;
    }
}
;
function onlyCap(someControl) {
    if (event.keyCode == 32) {
        return false
    }
    setTimeout(doOnlyCap, 5, someControl.id);
    return true;
}
;
function doOnlyCap(ControlName) {
    var thisChar = document.getElementById(ControlName).value;
    thisChar = thisChar.toUpperCase();
    document.getElementById(ControlName).value = thisChar;
    switch (ControlName) {
        case "metarStationID":
            break;
        case "tafStationID":
            break;
        default:
    }
}
;
function iClear(controlName) {
    document.getElementById(controlName).value = "";
}
;
function iClearSetting(control) {
    control.value = "";
}
;
function iKeyUp_tempConv(controlName) {
    setTimeout(iAfterChange_tempConv, 50, controlName);
}
;
function iKeyUp_cDist(controlName) {
    setTimeout(iAfterChange_cDist, 50, controlName);
}
;
function iKeyUp_cSpeed(controlName) {
    setTimeout(iAfterChange_cSpeed, 50, controlName);
}
;
function iKeyUp_cWeight(controlName) {
    setTimeout(iAfterChange_cWeight, 50, controlName);
}
;
function iKeyUp_cArea(controlName) {
    setTimeout(iAfterChange_cArea, 50, controlName);
}
;
function iKeyUp_cVolume(controlName) {
    setTimeout(iAfterChange_cVolume, 50, controlName);
}
;
function iKeyUp_FuelFT_lbs_rate() {
    setTimeout(iAfterChange_FuelFT_lbs_rate, 50);
}
;
function iKeyUp_FuelFT_lbs_usable() {
    setTimeout(iAfterChange_FuelFT_lbs_usable, 50);
}
;
function iKeyUp_FuelBurned_lbs_rate() {
    setTimeout(iAfterChange_FuelBurned_lbs_rate, 50);
}
;
function iKeyUp_fc_lbs_rate() {
    setTimeout(iAfterChange_fc_lbs_rate, 50);
}
;
function iAfterChange_fc_lbs_rate() {
    if (document.getElementById("fc_lbs_rate").value == ".") {
        return;
    }
    if (!isNumber(document.getElementById("fc_lbs_rate").value)) {
        document.getElementById("FuelConsumption_lbs_err").innerHTML = "Enter numbers only.";
        document.getElementById("fc_Answer_lbs").innerHTML = "";
        return;
    }
    document.getElementById("FuelConsumption_lbs_err").innerHTML = "";
    calc(22);
}
;
function iAfterChange_FuelBurned_lbs_rate() {
    if (document.getElementById("FuelBurned_lbs_rate").value == ".") {
        return;
    }
    if (!isNumber(document.getElementById("FuelBurned_lbs_rate").value)) {
        document.getElementById("FuelBurned_lbs_err").innerHTML = "Enter numbers only.";
        document.getElementById("fb_Answer_lbs").innerHTML = "";
        return;
    }
    document.getElementById("FuelBurned_lbs_err").innerHTML = "";
    calc(21);
}
;
function iAfterChange_FuelFT_lbs_rate() {
    if (document.getElementById("FuelFT_lbs_rate").value == ".") {
        return;
    }
    if (!isNumber(document.getElementById("FuelFT_lbs_rate").value)) {
        document.getElementById("FuelFT_lbs_err").innerHTML = "Enter numbers only.";
        document.getElementById("fuelFT_lbl_answer").innerHTML = "";
        return;
    }
    document.getElementById("FuelFT_lbs_err").innerHTML = "";
    calc(20);
}
;
function isNumber(x) {
    if (isNaN(x)) {
        return false;
    }
    if (x.replace(/^\s+|\s+$/g, '') == "") {
        return false;
    }
    return true;
}
;
function iAfterChange_FuelFT_lbs_usable() {
    if (document.getElementById("FuelFT_lbs_usable").value == ".") {
        return;
    }
    if (!isNumber(document.getElementById("FuelFT_lbs_usable").value)) {
        document.getElementById("FuelFT_lbs_err").innerHTML = "Enter numbers only.";
        document.getElementById("fuelFT_lbl_answer").innerHTML = "";
        return;
    }
    document.getElementById("FuelFT_lbs_err").innerHTML = "";
    calc(20);
}
;
function iAfterChange_cSpeed(controlName) {
    if (document.getElementById(controlName).value == ".") {
        return;
    }
    if (!isNumber(document.getElementById(controlName).value)) {
        document.getElementById("cSpeed_err").innerHTML = "Enter numbers only.";
        document.getElementById("cSpeed_answer").innerHTML = "";
        return;
    }
    document.getElementById("cSpeed_err").innerHTML = "";
    calcSpeedConversion();
}
;
function iAfterChange_tempConv(controlName) {
    if (document.getElementById(controlName).value == ".") {
        return;
    }
    if (!isNumber(document.getElementById(controlName).value)) {
        document.getElementById("tempConv_err").innerHTML = "Enter numbers only.";
        document.getElementById("tempConv_answer").innerHTML = "?";
        return;
    }
    document.getElementById("tempConv_err").innerHTML = "";
    calcTempConv();
}
;
function iAfterChange_cDist(controlName) {
    if (document.getElementById(controlName).value == ".") {
        return;
    }
    if (!isNumber(document.getElementById(controlName).value)) {
        document.getElementById("cDist_err").innerHTML = "Enter numbers only.";
        document.getElementById("cDist_answer").innerHTML = "";
        return;
    }
    document.getElementById("cDist_err").innerHTML = "";
    calcDistanceConversion();
}
;
function iAfterChange_cWeight(controlName) {
    if (document.getElementById(controlName).value == ".") {
        return;
    }
    if (!isNumber(document.getElementById(controlName).value)) {
        document.getElementById("cWeight_err").innerHTML = "Enter numbers only.";
        document.getElementById("cWeight_answer").innerHTML = "";
        return;
    }
    document.getElementById("cWeight_err").innerHTML = "";
    calcWeightConversion();
}
;
function iAfterChange_cArea(controlName) {
    if (document.getElementById(controlName).value == ".") {
        return;
    }
    if (!isNumber(document.getElementById(controlName).value)) {
        document.getElementById("cArea_err").innerHTML = "Enter numbers only.";
        document.getElementById("cArea_answer").innerHTML = "";
        return;
    }
    document.getElementById("cArea_err").innerHTML = "";
    calcAreaConversion();
}
;
function iAfterChange_cVolume(controlName) {
    if (document.getElementById(controlName).value == ".") {
        return;
    }
    if (!isNumber(document.getElementById(controlName).value)) {
        document.getElementById("cVol_err").innerHTML = "Enter numbers only.";
        document.getElementById("cVol_answer").innerHTML = "";
        return;
    }
    document.getElementById("cVol_err").innerHTML = "";
    calcVolumeConversion();
}
;
function calcTempConv() {
    document.getElementById("tempConv_answer").innerHTML = "?";
    if (!isNumeric(document.getElementById("tempConv_temp").value)) {
        document.getElementById("tempConv_err").innerHTML = "Enter whole numbers only.";
        return;
    }
    if (document.getElementById("tempConv_temp").value.length == 0) {
        return;
    }
    var temp = parseInt(document.getElementById("tempConv_temp").value);
    var unit = document.getElementById("tempConv_tempunit").value;
    setCookie("tempConv_temp", temp);
    setCookie("tempConv_tempunit", unit);
    if (unit == "Fahrenheit") {
        document.getElementById("tempConv_answer").innerHTML = Math.round(5 / 9 * (temp - 32)) + "&deg;C";
    } else {
        document.getElementById("tempConv_answer").innerHTML = Math.round((temp * 9 / 5) + 32) + "&deg;F";
    }
}
;
function isNumeric(value) {
    return typeof value != "boolean" && value !== null && !isNaN(+value);
}
;
function wind12() {
    var crs = document.getElementById("windhcrs").value;
    var tas = document.getElementById("windhtas").value;
    var wSP = document.getElementById("windhspeed").value;
    var wDir = document.getElementById("windhdir").value;
    setCookie("windhcrs", crs);
    setCookie("windhtas", tas);
    setCookie("windhspeed", wSP);
    setCookie("windhdir", wDir);
    crs = (Math.PI / 180) * crs;
    wd = (Math.PI / 180) * wDir;
    swc = (wSP / tas) * Math.sin(wd - crs);
    hd = crs + Math.asin(swc);
    if (hd < 0) {
        hd = hd + 2 * Math.PI;
    }
    if (hd > 2 * Math.PI) {
        hd = hd - 2 * Math.PI;
    }
    var wca = Math.round((180 / Math.PI) * hd) - parseFloat(document.getElementById("windhcrs").value);
    document.getElementById("windhanswer").innerHTML = "Heading = " + Math.round((180 / Math.PI) * hd) + "&deg;";
    document.getElementById("windhanswer").innerHTML += "<br />Ground Speed = " + Math.round(tas * Math.sqrt(1 - Math.pow(swc, 2)) - (wSP * Math.cos(wd - crs)));
    document.getElementById("windhanswer").innerHTML += "<br />W.C.A = " + wca + "&deg;";
}
;
function wind13() {
    var heading = document.getElementById("windchd").value;
    var tas = document.getElementById("windctas").value;
    var wSP = document.getElementById("windcspeed").value;
    var wDir = document.getElementById("windcdir").value;
    setCookie("windchd", heading);
    setCookie("windctas", tas);
    setCookie("windcspeed", wSP);
    setCookie("windcdir", wDir);
    var wd = (Math.PI / 180) * wDir;
    var hd = (Math.PI / 180) * heading;
    var gs = Math.round(Math.sqrt(Math.pow(wSP, 2) + Math.pow(tas, 2) - 2 * wSP * tas * Math.cos(hd - wd)));
    var wca = Math.atan2(wSP * Math.sin(hd - wd), tas - wSP * Math.cos(hd - wd));
    var crs = (hd + wca) % (2 * Math.PI);
    crs = Math.round((180 / Math.PI) * crs);
    wca = Math.round((180 / Math.PI) * wca);
    document.getElementById("windcanswer").innerHTML = "Course = " + crs + "&deg;";
    document.getElementById("windcanswer").innerHTML += "<br />Ground Speed = " + gs;
    document.getElementById("windcanswer").innerHTML += "<br />W.C.A = " + wca + "&deg;";
}
;
function computeXWind() {
    l = parseFloat(document.getElementById("xwindrw").value);
    n = parseFloat(document.getElementById("xwinddir").value);
    k = parseFloat(document.getElementById("xwindspeed").value);
    setCookie("xwindrw", l);
    setCookie("xwinddir", n);
    setCookie("xwindspeed", k);
    o = Math.abs(n - l);
    oo = (n - l);
    p = .0174 * o;
    q = Math.abs(k * (Math.sin(p)));
    m = Math.abs(k * (Math.cos(p)));
    if (o == 0) {
        g = "none";
    }
    if (o > 90) {
        g = "gain";
    }
    if (o < 90.0000000000000001) {
        g = "loss";
    }
    if (o > 270) {
        g = "loss";
    }
    if (eval(Math.round(m)) == 0) {
        g = "none";
    }
    if (eval(Math.round(q)) == 0) {
        d = "none";
    } else {
        d = computeXWindDir(l, n, k);
    }
    switch (d) {
        case "none":
            document.getElementById("xwindanswer").innerHTML = "No x/wind component.";
            break;
        default:
            document.getElementById("xwindanswer").innerHTML = d + " x/wind of " + eval(Math.round(q)) + ".";
    }
    switch (g) {
        case "loss":
            document.getElementById("xwindanswer").innerHTML += "<br />Head Wind of " + eval(Math.round(m)) + ".";
            break;
        case "gain":
            document.getElementById("xwindanswer").innerHTML += "<br />Tail Wind of " + eval(Math.round(m)) + ".";
            break;
        default:
            document.getElementById("xwindanswer").innerHTML += "<br />No Head/Tail wind component.";
            break;
    }
}
;
function ea(cx, dg, cj) {
    var cc = 0;
    var ca = cj / 180 * Math.PI;
    cc = cx * Math.cos(ca) - dg * Math.sin(ca);
    return cc
}
;
function dz(cx, dg, cj) {
    var cb = 0;
    var ca = cj / 180 * Math.PI;
    cb = cx * Math.sin(ca) + dg * Math.cos(ca);
    return cb
}
;
function dr(cu, cs, cl) {
    var ck = (cu) / 180 * Math.PI;
    var dc = cs * Math.sin(ck);
    var cy = cs * Math.cos(ck);
    var cc = ea(dc, cy, cl);
    var cb = dz(dc, cy, cl);
    var dr = cc;
    return dr
}
;
function computeXWindDir(runway, windDir, windSpeed) {
    var l = runway;
    var n = windDir;
    var k = windSpeed;
    var bh = dr(n, k, l);
    var answer = (bh + 1e-10);
    if (answer == 0) {
        return "none"
    }
    if (answer > 0) {
        return "right"
    } else {
        return "left"
    }
}
;
function calcTAS() {
    var lapserate = 0.0019812;
    var tempcorr = 273.15;
    var stdtemp = 288.15;
    var isFeet = true;
    var isInches = true;
    var altFactor = isFeet ? 1. : 3.28084;
    var setFactor = isInches ? 1. : 0.02953;
    var IAS = parseFloat(document.getElementById("tasIAS").value);
    var cas = 0;
    var IA = parseFloat(document.getElementById("tasIA").value);
    var altim = parseFloat(document.getElementById("tasaltim1").value + "." + document.getElementById("tasaltim2").value);
    var temp = parseFloat(document.getElementById("tastemp").value);
    var tempU = document.getElementById("tasTempUnits").value;
    var DA = 0;
    var PA = 0;
    var TAS = 0;
    setCookie("tasIAS", IAS);
    setCookie("tasIA", IA);
    setCookie("tasaltim1", document.getElementById("tasaltim1").value);
    setCookie("tasaltim2", document.getElementById("tasaltim2").value);
    setCookie("tastemp", temp);
    setCookie("tasTempUnits", tempU);
    if (tempU == "F") {
        temp = (temp + 40) * (5 / 9) - 40;
    }
    var xx = setFactor * altim / 29.92126;
    PA = IA + 145442.2 * altFactor * (1 - Math.pow(xx, 0.190261));
    stdtemp = stdtemp - PA * lapserate;
    Tratio = stdtemp / altFactor / lapserate;
    xx = stdtemp / (temp + tempcorr);
    DA = PA + Tratio * altFactor * (1 - Math.pow(xx, 0.234969));
    aa = DA * lapserate;
    bb = stdtemp - aa;
    cc = bb / stdtemp;
    cc1 = 1 / 0.234969;
    dd = Math.pow(cc, cc1);
    dd = Math.pow(dd, .5);
    ee = 1 / dd;
    cas = IAS;
    ff = ee * cas;
    TAS = roundit(ff) - 1;
    DA = roundit(DA);
    PA = roundit(PA);
    document.getElementById("tasAnswer").innerHTML = "True Airspeed = " + new Number(TAS).numberFormat("#,###");
    document.getElementById("tasAnswer").innerHTML += "<br />Density Altitude = " + new Number(DA).numberFormat("#,###");
    document.getElementById("tasAnswer").innerHTML += "<br />Pressure Altitude = " + new Number(PA).numberFormat("#,###");
}
;
function WindSpeedDirection() {
    var crs = document.getElementById("windDScourse").value;
    var hd = document.getElementById("windDSheading").value;
    var gs = document.getElementById("windDSgs").value;
    var tas = document.getElementById("windDSTAS").value;
    setCookie("windDScourse", crs);
    setCookie("windDSheading", hd);
    setCookie("windDSgs", gs);
    setCookie("windDSTAS", tas);
    crs = (Math.PI / 180) * crs;
    hd = (Math.PI / 180) * hd;
    ws = Math.sqrt(Math.pow(tas - gs, 2) + 4 * tas * gs * Math.pow(Math.sin((hd - crs) / 2), 2));
    wd = crs + Math.atan2(tas * Math.sin(hd - crs), tas * Math.cos(hd - crs) - gs);
    if (wd < 0) {
        wd = wd + 2 * Math.PI;
    }
    if (wd > 2 * Math.PI) {
        wd = wd - 2 * Math.PI;
    }
    document.getElementById("windDSanswer").innerHTML = "Wind Direction = " + Math.round((180 / Math.PI) * wd);
    document.getElementById("windDSanswer").innerHTML += "<br />Wind Speed = " + Math.round(ws);
}
;
function calcPA() {
    var isFeet = true;
    var isInches = true;
    var altFactor = isFeet ? 1. : 3.28084;
    var setFactor = isInches ? 1. : 0.02953;
    var IA = parseFloat(document.getElementById("paIA").value);
    var altim = parseFloat(document.getElementById("paaltim1").value + "." + document.getElementById("paaltim2").value);
    var PA = 0;
    setCookie("paIA", IA);
    setCookie("paaltim1", document.getElementById("paaltim1").value);
    setCookie("paaltim2", document.getElementById("paaltim2").value);
    var xx = setFactor * altim / 29.92126;
    PA = IA + 145442.2 * altFactor * (1 - Math.pow(xx, 0.190261));
    PA = roundit(PA);
    document.getElementById("paAnswer").innerHTML = new Number(PA).numberFormat("#,###");
}
;
function calcDA() {
    var lapserate = 0.0019812;
    var tempcorr = 273.15;
    var stdtemp = 288.15;
    var isFeet = true;
    var isInches = true;
    var altFactor = isFeet ? 1. : 3.28084;
    var setFactor = isInches ? 1. : 0.02953;
    var IA = parseFloat(document.getElementById("daIA").value);
    var altim = parseFloat(document.getElementById("daaltim1").value + "." + document.getElementById("daaltim2").value);
    var temp = parseFloat(document.getElementById("datemp").value);
    var tempU = document.getElementById("datempUnits").value;
    var DA = 0;
    var PA = 0;
    setCookie("daIA", IA);
    setCookie("daaltim1", document.getElementById("daaltim1").value);
    setCookie("daaltim2", document.getElementById("daaltim2").value);
    setCookie("datemp", temp);
    setCookie("datempUnits", tempU);
    if (tempU == "F") {
        temp = (temp + 40) * (5 / 9) - 40;
    }
    var xx = setFactor * altim / 29.92126;
    PA = IA + 145442.2 * altFactor * (1 - Math.pow(xx, 0.190261));
    stdtemp = stdtemp - PA * lapserate;
    Tratio = stdtemp / altFactor / lapserate;
    xx = stdtemp / (temp + tempcorr);
    DA = PA + Tratio * altFactor * (1 - Math.pow(xx, 0.234969));
    DA = roundit(DA);
    document.getElementById("daAnswer").innerHTML = new Number(DA).numberFormat("#,###");
}
;
function roundit(thenum) {
    return Math.floor(thenum + 0.5);
}
;
function formatTimeSentence(h, m, s) {
    var strAnswer = "";
    if (h == 0) {
        strAnswer = ""
    }
    ;
    if (h == 1) {
        strAnswer += h.toString() + " hour "
    }
    ;
    if (h > 1) {
        strAnswer += h.toString() + " hours "
    }
    ;
    if (m == 0) {
        strAnswer += ""
    }
    if (m == 1) {
        strAnswer += m.toString() + " minute "
    }
    if (m > 1) {
        strAnswer += m.toString() + " minutes "
    }
    ;
    if (s == 0) {
        strAnswer += ""
    }
    if (s == 1) {
        strAnswer += s.toString() + " second "
    }
    if (s > 1) {
        strAnswer += s.toString() + " seconds "
    }
    ;
    return strAnswer;
}
;
function formatDistanceSentence(S, N) {
    var strAnswer = "";
    strAnswer += new Number(N).numberFormat("#,###.##") + " nautical miles";
    strAnswer += "<br />";
    strAnswer += new Number(S).numberFormat("#,###.##") + " statute miles";
    return strAnswer;
}
;
function formatSpeedSentence(m, k) {
    var strAnswer = "";
    strAnswer += k + " knots per hour";
    strAnswer += "<br />";
    strAnswer += m + " miles per hour";
    return strAnswer;
}
;
function setCookie(name, value) {
    var path = false;
    var domain = false;
    var secure = false;
    var expires = new Date();
    expires.setUTCFullYear(expires.getUTCFullYear() + 1);
    var curCookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
    document.cookie = curCookie;
}
;
function deleteCookie(name) {
    var path = false;
    var domain = false;
    var secure = false;
    var expires = new Date();
    var value = "";
    expires.setUTCFullYear(expires.getUTCFullYear() + 2);
    var curCookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
    document.cookie = curCookie;
}
;
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
                c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
;
Number.formatFunctions = {count: 0};
Number.prototype.NaN = 'NaN';
Number.prototype.posInfinity = 'Infinity';
Number.prototype.negInfinity = '-Infinity';
Number.prototype.numberFormat = function(format, context) {
    if (isNaN(this)) {
        return Number.prototype.NaNstring;
    } else if (this == +Infinity) {
        return Number.prototype.posInfinity;
    } else if (this == -Infinity) {
        return Number.prototype.negInfinity;
    } else if (Number.formatFunctions[format] == null) {
        Number.createNewFormat(format);
    }
    return this[Number.formatFunctions[format]](context);
};
Number.createNewFormat = function(format) {
    var funcName = "format" + Number.formatFunctions.count++;
    Number.formatFunctions[format] = funcName;
    var code = "Number.prototype." + funcName + " = function(context){\n";
    var formats = format.split(";");
    switch (formats.length) {
        case 1:
            code += Number.createTerminalFormat(format);
            break;
        case 2:
            code += "return (this < 0) ? this.numberFormat(\"" + String.escape(formats[1]) + "\", 1) : this.numberFormat(\"" + String.escape(formats[0]) + "\", 2);";
            break;
        case 3:
            code += "return (this < 0) ? this.numberFormat(\"" + String.escape(formats[1]) + "\", 1) : ((this == 0) ? this.numberFormat(\"" + String.escape(formats[2]) + "\", 2) : this.numberFormat(\"" + String.escape(formats[0]) + "\", 3));";
            break;
        default:
            code += "throw 'Too many semicolons in format string';";
            break;
    }
    eval(code + "}");
};
Number.createTerminalFormat = function(format) {
    if (format.length > 0 && format.search(/[0#?]/) == -1) {
        return "return '" + String.escape(format) + "';\n";
    }
    var code = "var val = (context == null) ? new Number(this) : Math.abs(this);\n";
    var thousands = false;
    var lodp = format;
    var rodp = "";
    var ldigits = 0;
    var rdigits = 0;
    var scidigits = 0;
    var scishowsign = false;
    var sciletter = "";
    m = format.match(/\..*(e)([+-]?)(0+)/i);
    if (m) {
        sciletter = m[1];
        scishowsign = (m[2] == "+");
        scidigits = m[3].length;
        format = format.replace(/(e)([+-]?)(0+)/i, "");
    }
    var m = format.match(/^([^.]*)\.(.*)$/);
    if (m) {
        lodp = m[1].replace(/\./g, "");
        rodp = m[2].replace(/\./g, "");
    }
    if (format.indexOf('%') >= 0) {
        code += "val *= 100;\n";
    }
    m = lodp.match(/(,+)(?:$|[^0#?,])/);
    if (m) {
        code += "val /= " + Math.pow(1000, m[1].length) + "\n;";
    }
    if (lodp.search(/[0#?],[0#?]/) >= 0) {
        thousands = true;
    }
    if ((m) || thousands) {
        lodp = lodp.replace(/,/g, "");
    }
    m = lodp.match(/0[0#?]*/);
    if (m) {
        ldigits = m[0].length;
    }
    m = rodp.match(/[0#?]*/);
    if (m) {
        rdigits = m[0].length;
    }
    if (scidigits > 0) {
        code += "var sci = Number.toScientific(val," + ldigits + ", " + rdigits + ", " + scidigits + ", " + scishowsign + ");\n" + "var arr = [sci.l, sci.r];\n";
    } else {
        if (format.indexOf('.') < 0) {
            code += "val = (val > 0) ? Math.ceil(val) : Math.floor(val);\n";
        }
        code += "var arr = val.round(" + rdigits + ").toFixed(" + rdigits + ").split('.');\n";
        code += "arr[0] = (val < 0 ? '-' : '') + String.leftPad((val < 0 ? arr[0].substring(1) : arr[0]), " + ldigits + ", '0');\n";
    }
    if (thousands) {
        code += "arr[0] = Number.addSeparators(arr[0]);\n";
    }
    code += "arr[0] = Number.injectIntoFormat(arr[0].reverse(), '" + String.escape(lodp.reverse()) + "', true).reverse();\n";
    if (rdigits > 0) {
        code += "arr[1] = Number.injectIntoFormat(arr[1], '" + String.escape(rodp) + "', false);\n";
    }
    if (scidigits > 0) {
        code += "arr[1] = arr[1].replace(/(\\d{" + rdigits + "})/, '$1" + sciletter + "' + sci.s);\n";
    }
    return code + "return arr.join('.');\n";
};
Number.toScientific = function(val, ldigits, rdigits, scidigits, showsign) {
    var result = {l: "",r: "",s: ""};
    var ex = "";
    var before = Math.abs(val).toFixed(ldigits + rdigits + 1).trim('0');
    var after = Math.round(new Number(before.replace(".", "").replace(new RegExp("(\\d{" + (ldigits + rdigits) + "})(.*)"), "$1.$2"))).toFixed(0);
    if (after.length >= ldigits) {
        after = after.substring(0, ldigits) + "." + after.substring(ldigits);
    } else {
        after += '.';
    }
    result.s = (before.indexOf(".") - before.search(/[1-9]/)) - after.indexOf(".");
    if (result.s < 0) {
        result.s++;
    }
    result.l = (val < 0 ? '-' : '') + String.leftPad(after.substring(0, after.indexOf(".")), ldigits, "0");
    result.r = after.substring(after.indexOf(".") + 1);
    if (result.s < 0) {
        ex = "-";
    } else if (showsign) {
        ex = "+";
    }
    result.s = ex + String.leftPad(Math.abs(result.s).toFixed(0), scidigits, "0");
    return result;
};
Number.prototype.round = function(decimals) {
    if (decimals > 0) {
        var m = this.toFixed(decimals + 1).match(new RegExp("(-?\\d*)\.(\\d{" + decimals + "})(\\d)\\d*$"));
        if (m && m.length) {
            return new Number(m[1] + "." + String.leftPad(Math.round(m[2] + "." + m[3]), decimals, "0"));
        }
    }
    return this;
};
Number.injectIntoFormat = function(val, format, stuffExtras) {
    var i = 0;
    var j = 0;
    var result = "";
    var revneg = val.charAt(val.length - 1) == '-';
    if (revneg) {
        val = val.substring(0, val.length - 1);
    }
    while (i < format.length && j < val.length && format.substring(i).search(/[0#?]/) >= 0) {
        if (format.charAt(i).match(/[0#?]/)) {
            if (val.charAt(j) != '-') {
                result += val.charAt(j);
            } else {
                result += "0";
            }
            j++;
        } else {
            result += format.charAt(i);
        }
        ++i;
    }
    if (revneg && j == val.length) {
        result += '-';
    }
    if (j < val.length) {
        if (stuffExtras) {
            result += val.substring(j);
        }
        if (revneg) {
            result += '-';
        }
    }
    if (i < format.length) {
        result += format.substring(i);
    }
    return result.replace(/#/g, "").replace(/\?/g, " ");
};
Number.addSeparators = function(val) {
    return val.reverse().replace(/(\d{3})/g, "$1,").reverse().replace(/^(-)?,/, "$1");
};
String.prototype.reverse = function() {
    var res = "";
    for (var i = this.length; i > 0; --i) {
        res += this.charAt(i - 1);
    }
    return res;
};
String.prototype.trim = function(ch) {
    if (!ch)
        ch = ' ';
    return this.replace(new RegExp("^" + ch + "+|" + ch + "+$", "g"), "");
};
String.leftPad = function(val, size, ch) {
    var result = new String(val);
    if (ch == null) {
        ch = " ";
    }
    while (result.length < size) {
        result = ch + result;
    }
    return result;
};
String.escape = function(string) {
    return string.replace(/('|\\)/g, "\\$1");
}
