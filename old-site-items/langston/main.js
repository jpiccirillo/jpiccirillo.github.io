function changeContent(id) {
    $.get("content/" + id+'.txt', function(data) {
            var title = data.split("|")[0];
            var content = data.split("|")[1];

            content = content.replace(/\n/g, '<br>');

            $("#title").text(title)
            $("#content").html(content)
        });
}

$( document ).ready(function() {
    var most_recent = $("ul li").last().children().text()
    changeContent(most_recent);
    // console.log(most_recent)
});
