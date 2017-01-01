$(function() {
    $("#upload-input").change(function() {
        var f = this.files[0];
        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                var resDOM = $(e.target.result);
                var lst = resDOM.find("li");
                for (var i = 0; i < lst.length; ++i) {
                    var name = lst[i].innerText;
                    var link = lst[i].children[0].href
                    var tags = lst[i].children[0].attributes.getNamedItem("tags").nodeValue

                    chrome.bookmarks.create({
                        'title': name + ((tags == "")?"":(". Tags: " + tags)),
                        'url': link
                    });
                }
            }
        })(f);

        reader.readAsText(f);
        $("#msg").text("Done.")
    })
})
