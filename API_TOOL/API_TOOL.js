var API_TOOL = {
    init: function() {
        ///////////////////////////
        // VARIABLE DECLARATIONS //
        ///////////////////////////

        /* global jQuery, $ */

        // Authentication token
        var oAuth = '7407~HDUjHVKpaOh9LAIrRr2ZLHmFwe7GFVw8lMujKnyjMToWUeLfQAvdQZ95vZCZsqSn';

        // url and request type defined by the text fields
        var TYPE = null
        var URL = null

        ////////////////////
        // EVENT HANDLERS //
        ////////////////////

        $('#api').on('click', makeRequest);

        ///////////////
        // FUNCTIONS //
        ///////////////

        // make an ajax request to the specified URL
        function makeRequest() {
          URL = $('#url').val() + "?access_token=" + oAuth;
          TYPE = $('#reqType').val();
            jQuery.ajax({
                url: URL,
                type: TYPE,
                success: function(response) {
                    manipulateData(response);
                },
                error: function(response) {
                    alert("Error! Check the console and try again..");
                    console.log(response);
                }
            });
        }

        function manipulateData(response) {

            var res = response;
            var prop = $('#prop').val();
            var props = [];

            if (prop) {
                var s = prop.split('');
                var temp = '';

                for (var i = 0; i < s.length; i++) {
                    if (s[i] !== '.') {
                        temp += s[i];
                    }
                    else {
                        props.push(temp);
                        temp = '';
                    }

                    if (i == s.length-1) {
                        props.push(temp);
                    }
                }
            }

            for (var i = 0; i < props.length; i++) {
                var temp = res;
                res = temp[props[i]];
            }

            //pretty print the outputted json with syntax highlighting using regEx
            function syntaxHighlight(json) {
                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                });
            }

            var final = JSON.stringify(res, null, 4);

            //spit out the prettified JSON to 'response'
            document.getElementById('response').innerHTML = syntaxHighlight(final);
        }
    }
}
window.addEventListener('DOMContentLoaded', API_TOOL.init);
