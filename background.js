function exportCSVFile(csv, fileTitle) {

    if (fileTitle == "") {
        fileTitle = "Contacts";
    }

    var exportedFilename = fileTitle + '.csv';

    var link = document.createElement("a");
    var url = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    link.setAttribute("href", url);
    link.setAttribute("download", exportedFilename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}

//trigger on click of group (top centre)
$('#app').on("click", "._3V5x5", function () {

    setTimeout(addButton, 100);
});

var addButton = function () {
    if (!$("#DownloadButton").length) {
        var button_tag = document.createElement("div");
        button_tag.innerHTML = '<div id="DownloadButton" class="_14oqx" role="button" style="-moz-box-shadow:inset 0px 1px 0px 0px #9acc85;-webkit-box-shadow:inset 0px 1px 0px 0px #9acc85;box-shadow:inset 0px 1px 0px 0px #9acc85;background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #74ad5a), color-stop(1, #68a54b));background:-moz-linear-gradient(top, #74ad5a 5%, #68a54b 100%);background:-webkit-linear-gradient(top, #74ad5a 5%, #68a54b 100%);background:-o-linear-gradient(top, #74ad5a 5%, #68a54b 100%);background:-ms-linear-gradient(top, #74ad5a 5%, #68a54b 100%);background:linear-gradient(to bottom, #74ad5a 5%, #68a54b 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#74ad5a, endColorstr=#68a54b,GradientType=0);background-color:#74ad5a;border:1px solid #000000;cursor:pointer;color:#ffffff;font-weight:bold;padding:6px 12px;text-decoration:none;text-shadow:1px 1px 0px #000000;"><div class="DcItJ"><div class="_3WCza"><span class="_3LL06" style="color:#ffffff;">Download Group Contacts</span></div></div></div>';

        // get the parent element of report, exit menus
        var menu_dom = document.getElementsByClassName("_3xdMj")[0];
        if (menu_dom) {
            menu_dom.prepend(button_tag);
            $("#DownloadButton").click(function () {
                setTimeout(downloadInfo, 100)
            });
        }
    }
}

var downloadInfo = function () {
    var body_elem = document.getElementsByTagName("BODY")[0];

    var loading_elem = document.createElement("div");

    loading_elem.innerHTML = '<div id="loadingElem" style="width:100%;height:100%;background-color: #2321217a;z-index: 10000;position: absolute;color: white;text-align: center;font-weight: 400;font-size: 22px;"><h2 style="position: relative;top: 50%;transform: translateY(-50%);">Downloading Contacts.....</h2></div>';
    body_elem.prepend(loading_elem)

    //load all
    //get members div
    var str = String(document.getElementsByClassName('_3Q3ui i1XSV')[0].textContent).replace(/[^\d+,]/g, '').replace(/,/g, "\r\n");

    $("#loadingElem").remove();
    var fileTitle = document.getElementsByClassName('_3u328 copyable-text selectable-text')[0].textContent
    exportCSVFile(str, fileTitle);
}

'use strict';
const kLocales = {
    'fb': 'Facebook',
    'tw': 'Twitter',
    'em': 'Email',
    'li': 'LinkedIn'
};
// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(function () {
    for (let key of Object.keys(kLocales)) {
        chrome.contextMenus.create({
            id: key,
            title: kLocales[key],
            type: 'normal',
            contexts: ['selection'],
        });
    }
});

chrome.contextMenus.onClicked.addListener(function (item, tab) {
    let url
    switch (item.menuItemId) {
        case 'tw':
            url = 'https://twitter.com/intent/tweet?text=' + item.selectionText;
            break;
        case 'fb':
            if (validURL(item.selectionText))
                url = 'https://www.facebook.com/sharer/sharer.php?u=' + item.selectionText;
            break;
        case 'em':
            url = 'mailto:?body=' + item.selectionText;
            break
        case 'li':
            url = 'https://www.linkedin.com/shareArticle?mini=true&url=https://web.whatsapp.com&title=Share Whatsapp Story&summary=' + item.selectionText;
            break
    }

    if (url) chrome.tabs.create({url: url, index: tab.index + 1});
});

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
