console.log("Initializing the mijisou extension for keyword tips...");
inputq = $("[name='q']");
if(inputq.length>0)
    console.log("Bind the input dom successfully.");
else
    console.log("Failed to bind the input dom.");
var autocomplete = inputq.typeahead({
    source: [],
    matcher: function (item) {
        return true;
    },
});
inputq.bind('input propertychange',function() {
    chrome.runtime.sendMessage({keyword: inputq.val().split(' ').pop()},
        function (response) {
            autocomplete.data('typeahead').source = response;
            inputq.typeahead.bind(inputq, 'lookup');
            console.log(response);
            return true;
        });
});

$.fn.typeahead.Constructor.prototype.render = function (items) {
    var that = this;

    items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item);
        i.find('a').html(that.highlighter(item));
        return i[0];
    });

    this.$menu.html(items);
    return this;
};

$.fn.typeahead.Constructor.prototype.select = function() {
    var val = this.$menu.find('.active').attr('data-value');
    if (val) {
        strs = this.$element.val();
        strsArray = strs.split(' ');
        for (var i = 0; i < strsArray.length; i++) {
            if (strsArray[i] === '') {
                strsArray.splice(i, 1);
                i--;
            }
        }
        strsArray.pop();
        this.$element
            .val(this.updater(strsArray.join(' ') + (strsArray.length>0?' ':'') + val))
            .change();
    }
    return this.hide();
};
