var url = '2PACX-1vRhsvTnyTS0T8A2unviZDI8QsJglQvMaMILTkYNJ6Wbu-Qmfyiw_V_rmjUoFw-sODV-02za-3o6_Zyr';

$.getJSON("http://cors.io/spreadsheets.google.com/feeds/list/0AtMEoZDi5-pedElCS1lrVnp0Yk1vbFdPaUlOc3F3a2c/od6/public/values?alt=json", function (data) {
    //first row "title" column
    console.log(data.feed.entry[0]['gsx$title']['$t']);
});