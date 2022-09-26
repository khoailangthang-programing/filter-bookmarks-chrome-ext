let btn = document.getElementById('btn-action');
let listBookmarks = document.getElementById('list-bookmarks');
var arrVal = [];

let inputSearch = document.createElement('input');
inputSearch.classList.add('input-search');
inputSearch.placeholder = 'Enter key to search bookmarks..';
inputSearch.addEventListener('keyup', function () {
    let thisVal = this.value;
    thisVal = thisVal.toLowerCase();
    arrVal.filter(function (arrFilter) {
        let arrFilterVal = arrFilter['val'];
        arrFilterVal = arrFilterVal.toLowerCase();
        if (arrFilterVal.indexOf(thisVal) === -1) {
            document.getElementById(arrFilter['id']).style.display = 'none';
        } else {
            document.getElementById(arrFilter['id']).style.display = 'block';
        }
    });
});
listBookmarks.append(inputSearch);
if (!listBookmarks.classList.contains('loaded-full-bookmarks')) {
    chrome.bookmarks.getTree( process_bookmark );
} else {
    listBookmarks.classList.remove('loaded-full-bookmarks');
    listBookmarks.innerHTML = '';
    chrome.bookmarks.getTree( process_bookmark );
}

function process_bookmark(bookmarks) {

    for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        if (bookmark.url) {
            var newItem = document.createElement("a");
            newItem.href = bookmark.url;
            newItem.append(bookmark.title);
            newItem.classList.add('item-bookmark');
            var idItem = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
            newItem.id = idItem;
            listBookmarks.append(newItem);
            var newArr = [];
            newArr['id'] = idItem;
            newArr['val'] = bookmark.title;
            arrVal.push(newArr);
        }

        if (i == (bookmarks.length - 1)) {
            listBookmarks.classList.add('loaded-full-bookmarks');
        }

        if (bookmark.children) {
            process_bookmark(bookmark.children);
        }
    }
}