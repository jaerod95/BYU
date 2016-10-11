var API_TOOL = {
  init: function() {
    ///////////////////////////
    // VARIABLE DECLARATIONS //
    ///////////////////////////

    /* global jQuery, $ */

    // Authentication tokens

    // url and request type defined by the text fields
    var TYPE = $('#reqType').val()
    var URL = null
    var BH_token = null
    var BH_username = 'byumastercourses/jrod95'
    var BH_password = '3pillarsofjoy'
    var BH_domainID = null
    var BH_data = null;


    ////////////////////
    // EVENT HANDLERS //
    ////////////////////

    $('#api').on('click', makeRequest)
      //  $('#BH_submit').on('click', BH_login)

    ///////////////
    // FUNCTIONS //
    ///////////////
    /*
        ///////////////////////
        //BH-COURSE CONVERTER//
        ///////////////////////
            function BH_login() {
              URL = 'https://gls.agilix.com/cmd'
              TYPE = 'GET'
        //      BH_username = $('#BH_username').val()
        //      BH_password = $('#BH_password').val()
              jQuery.ajax({
                url: URL,
                type: TYPE,
                contentType: 'application/json',
                data: {
                    cmd: 'login',
                    username: BH_username,
                    password: BH_password,
                    _format: 'JSON'
                },
                success: function(response) {
                  saveData(response)
                  manipulateData(response)
                  BH_courseID = prompt('Please input the course ID number: ')
                  req2()
                  $('#BH_converter').css("opacity", "0")
                },
                error: function(response) {
                  alert("Error! Check the console and try again..");
                  console.log(response);
                }
              });
            }

            function saveData(res) {
              BH_token = res.response._token
              BH_domainID = res.response.user.domainid
            }

            function req2() {
              console.log('req2 ran')
              jQuery.ajax({
                url: URL,
                type: TYPE,
                contentType: 'application/json',
                data: {
                    cmd: 'getmanifest',
                    entityid: BH_courseID,
                    categories: 'Exams',
                    _format: 'JSON'
                },
                success: function(response) {
                  console.log(response)
                  manipulateData(response)
                },
                error: function(response) {
                  alert("Error! Check the console and try again..");
                  console.log(response);
                }
              });
            }

                function req3() {
                  console.log('req3 ran')
                  jQuery.ajax({
                    url: URL,
                    type: TYPE,
                    contentType: 'application/json',
                    data: {
                        cmd: 'getcommandlist',
                        _format: 'JSON'
                    },
                    success: function(response) {
                      console.log(response)
                      manipulateData(response)
                    },
                    error: function(response) {
                      alert("Error! Check the console and try again..");
                      console.log(response);
                    }
                  });
                }




    */

    ////////////
    //BH Login//
    ////////////
      console.log("login Attempted")
    jQuery.ajax({
      url: 'https://gls.agilix.com/cmd?cmd=login&username=byumastercourses/jrod95&password=3pillarsofjoy&_format=JSON',
      type: 'GET',
      contentType: 'application/json',
      success: function(response) {
        console.log(response)
      },
      error: function(response) {
        alert("Error! Check the console and try again..");
        console.log(response);
      }
    });


    // make an ajax request to the specified URL
    function makeRequest() {
      URL = $('#url').val()
      TYPE = $('#reqType').val()
      BH_data = $('#data').val().split(',')

      BH_data = BH_Compute_Data(BH_data)
      console.log(BH_data)
      jQuery.ajax({
        url: URL + BH_data,
        type: TYPE,
        contentType: 'application/json',
        success: function(response) {
          console.log(response)
          manipulateData(response);


        },
        error: function(response) {
          alert("Error! Check the console and try again..");
          console.log(response);
        }
      });
    }


    function BH_Compute_Data(data) {
      if (data.length < 2)
        return ""
      var str = "?"
      str += data[0]
      str += '='
      str += data[1]
      for (var e = 2; e < data.length; e += 2) {
        str += '&'
        str += data[e]
        str += '='
        str += data[e + 1]
      }
      return str27061705
      
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
          } else {
            props.push(temp);
            temp = '';
          }

          if (i == s.length - 1) {
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
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
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
