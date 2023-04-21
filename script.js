function style () {
	var _link = document.createElement('link');
	_link.rel = 'stylesheet';
	_link.type = 'text/css';
	_link.href = 'https://cdn.statically.io/gh/eankossi/cookie_banner/main/style.css';
	document.head.appendChild(_link);
}

function icons () {
	var icons_string = `
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
`;
	document.head.innerHTML += icons_string;
}

function html () {
	var html_string = `
<div class="cookie-notification" id="cookie_banner">
	<p class="h5 cookies__title"><span class="material-symbols-outlined">cookie&ensp;</span>Cookies configuration</p>
	<p>We use our own and third party cookies to analyse the traffic on our website by obtaining the necessary data to study your navigation. You can obtain more information about our <a href="https://www.makingscience.co.uk/cookies-policy/">Cookies Policy</a>. You can accept all cookies by clicking the "Accept" button or configure or reject their use <a href="#" class="conf_cookies">here</a>.</p>
	<button type="button" onclick="consentAcceptAll(); bannerClose();" class="btn btn-default aceptar_all">Accept</button>
	<button type="button" onclick="modalToggle()" class="btn btn-default conf_cookies">Configure</span> 
</div>
<div class="cookies-conf-block open" style="display: none" id="configuration-modal">
	<div class="close-button " id="close-cookies" onclick="modalToggle()">
		<span></span>
		<span></span>
	</div>
	<div class="cookie_box">
		<h3>Configure cookies</h3>
		<p>These are the cookies we use on our website. You can set your preferences and choose how you want your data to be used for the following purposes</p>
		<div class="bloque_cookie">
			<p>Technical cookies (obligatory)</p>
			<input type="checkbox" name="tecnicas" id="functionality_storage" data-name="sessionCookie" checked="" disabled="">
		</div>
		<div class="bloque_cookie">
			<p>Analytics cookies</p>
			<input type="checkbox" name="analiticas" id="analytics_storage" data-name="analyticCookie">
		</div>
		<div class="bloque_cookie">
			<p>Advertising Cookies</p>
			<input type="checkbox" name="publicidad" id="ad_storage" data-name="publicidadCookie">
		</div>
		<div class="bloque_cookie">
			<p>Personalization Cookies</p>
			<input type="checkbox" name="personalization" id="personalization_storage" data-name="personalizationCookie">
		</div>
		<div class="botonera_cookies">
			<span class="btn btn-default aceptar" onclick="consentAcceptAll(); modalToggle(); bannerClose();">Accept</span>
			<span class="btn btn-default pref_cookie" onclick="savePreferences(); modalToggle(); bannerClose();">Save preferences</span>
		</div>
	</div>
</div>
`;
	document.body.innerHTML += html_string;
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }

    return decodeURI(dc.substring(begin + prefix.length, end));
} 

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function modalToggle() {
  var x = document.getElementById("configuration-modal");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function bannerClose() {
  var x = document.getElementById("cookie_banner");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

var consentObj = {}

function pushSetting (type, id, obj) {
	var el = document.getElementById(id);
	if (el.checked) {
		obj[type] = "granted";
	} else {
		obj[type] = "denied";
	}
}

function savePreferences () {
	pushSetting('ad_storage', 'ad_storage', consentObj);
	pushSetting('analytics_storage', 'analytics_storage', consentObj);
	pushSetting('personalization_storage', 'personalization_storage', consentObj);
	pushSetting('functionality_storage', 'functionality_storage', consentObj);
	pushSetting('security_storage', 'functionality_storage', consentObj);
	gtag('consent', 'update', consentObj);
	var settings = JSON.stringify(consentObj);
	setCookie('ms-consent', settings, 365);
}

// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

function gtagConsent (command) {
	var obj = JSON.parse(getCookie('ms-consent'));
	gtag('consent', command, obj);
}

function consentAcceptAll () {
	var obj = {'ad_storage': 'granted',
		'analytics_storage': 'granted',
		'personalization_storage': 'granted',
		'functionality_storage': 'granted',
		'security_storage': 'granted'};
	setCookie('ms-consent', JSON.stringify(obj), 365);
	gtag('consent', 'update', obj);
}

function consentNoCookie() {
		gtag('consent', 'default', {
		'ad_storage': 'denied',
		'analytics_storage': 'denied',
		'personalization_storage': 'denied',
		'functionality_storage': 'denied',
		'security_storage': 'denied'
		});
}


window.onload = function () {
	var myCookie = getCookie('ms-consent');
	console.log(myCookie);
	if (myCookie == null) {
		consentNoCookie();
		style();
		icons();
		html();
	} else {
		gtagConsent('default');
	}
}
