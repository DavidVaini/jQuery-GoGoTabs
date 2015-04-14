var currentTab;
$(function (){

	currentTab = getCurrentTab();
	initTabs();

    if (!detectHistorySupport()) {
        triggerHandlers();
    }

	$(".gogo-tabs > .tabs-navigation > a").click(function(e){
		e.preventDefault();
		currentTab = $(this).data("tab");
		updateLocation(currentTab);

	});
});

function switchTab(){
		$(".gogo-tabs > .tabs-content >.content-piece").removeClass("active");
		if(getCurrentTab() === "all" || getCurrentTab() == null){
			$(".gogo-tabs > .tabs-content >.content-piece").show("fast");

		}else{
			$(".gogo-tabs > .tabs-content >.content-piece").hide();
			$(".gogo-tabs > .tabs-content > #" + getCurrentTab()).addClass("active");
			$(".gogo-tabs > .tabs-content > .active").show("fast");
		}
}



function initTabs(){
    if (detectHistorySupport()) {
        $(window).on("popstate", function (e) {
            switchTab();
        });
    } else if (detectHashchangeSupport()) {
        // No history support...IE8/9 FF3
        $(window).on("hashchange", function (e) {
            switchTab();
        });
    } else {
        // Old browser IE7 and earlier
        lastHash = window.location.hash;
        hashinterval = setInterval(pollURL, hashtime);
        switchTab();
    }
}

function getCurrentTab() {
    if (getParameterByName("tab") == null && getHashParameterByName("tab") == null) {
        return $(".gogo-tabs > .tabs-content > .active").attr('id');
    } else if (getParameterByName("tab") == null) {
        return getHashParameterByName("tab");
    } else {
        return getParameterByName("tab");
    }
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


function updateLocation(tab){
    if (detectHistorySupport()) {
        window.history.pushState({}, '', window.location.pathname + "?tab=" + currentTab + getQueryStringMinusParameter("tab"));
    } else {
        window.location.hash = "tab=" + currentTab + getHashStringMinusParameter("tab");
    }
}

function detectHistorySupport(){
	//return !!(window.history && history.pushState);
	return false;
}

function detectHashchangeSupport() {
    var isSupported = "onhashchange" in window;
    if (!isSupported && window.setAttribute) {
        window.setAttribute("onhashchange", "return;");
        isSupported = typeof window.onhashchange === "function";
    }
    return isSupported;
}

function triggerHandlers() {
    if (detectHistorySupport()) {
        $(window).trigger("popstate");
    } else if (detectHashchangeSupport()) {
        // No history support...IE8/9 FF3
        if (getParameterByName("tab") != null) {
            window.location = window.location.protocol + "//" + window.location.host + window.location.pathname + '#tab=' + currentTab;
        }
        $(window).trigger("hashchange");
    } else {
        // Old browser IE7 and earlier
        if (getParameterByName("tab") != null) {
            window.location = window.location.protocol + "//" + window.location.host + window.location.pathname + '#tab=' + currentTab;
        }
        switchTab()
    }
}

function getHashStringMinusParameter(param) {
    var qrystr = window.location.hash.toString().replace(param + "=" + getHashParameterByName(param), "");
    
    qrystr = qrystr.replace('#', '');
    if (qrystr != "") {
        var qrysplit = qrystr.split("&");
        qrystr = "";
        $.each(qrysplit, function (i, str) {
            if (str != "") qrystr += "&" + str;
        });
    }
    return qrystr;
}

function getHashParameterByName(name) {
    var match = RegExp(name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}