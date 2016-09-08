if ($('.jr_week_box')) {
  Date.prototype.getWeek = function(start) {
      // the starting point
      start = start || 0

      var today = new Date(this.setHours(0, 0, 0, 0))
      var today_ref = today

      var day = today.getDay() - start

      var date = today.getDate() - day
        //  Start/End Dates
      var dates = []
      for (var i = 0; i < 7; i++) {
        dates.push(new Date(today.setDate(date + i)).toISOString().split('T')[0])
      }
      console.log(dates)
      return dates
    }
    // test code
  var d = new Date().getWeek()
  console.log(d)
  var match = null
  var fin = null


  function makeRequest() {
    var oAuth = '7407~HDUjHVKpaOh9LAIrRr2ZLHmFwe7GFVw8lMujKnyjMToWUeLfQAvdQZ95vZCZsqSn';

    /*change the URL to look for the browser URL to pull info*/

    var URL = 'https://byu.instructure.com/api/v1/courses/253/'
    var TYPE = "GET"

    jQuery.ajax({
      url: URL + 'quizzes?per_page=50&access_token=' + oAuth,
      type: TYPE,
      success: function(response) {
        for (var i = 0; i < response.length; i++) {
          for (var g = 0; g < 7; g++) {
            if (response[i].due_at.split('T')[0] === d[g]) {
              console.log("match found")
              match = response[i]
              console.log(match)
              break
            }
          }
        }
        if (match === null) {
          console.log('repeat')
        } else {
          console.log('sucess')
          jQuery.ajax({
            url: URL + 'modules?per_page=50&access_token=' + oAuth,
            type: TYPE,
            success: function(ret) {
              for (var l = 0; l < ret.length; l++) {
                jQuery.ajax({
                  url: URL + 'modules/' + ret[l].id + '/items?per_page=50&access_token=' + oAuth,
                  type: TYPE,
                  success: function(ret2) {
                    for (var a = 0; a < ret2.length; a++) {
                      try {
                        if (ret2[a].content_id === match.id) {
                          fin = ret2
                          console.log(fin)
                          jr_show_content(fin)
                          break
                        }
                      } catch (e) {}
                    }
                  },
                  error: function(ret2) {
                    alert("Error! Check the console and try again..");
                    console.log(response);
                  }
                });
              }
            },
            error: function(ret) {
              alert("Error! Check the console and try again..");
              console.log(response);
            }
          });
        }

        //manipulateData(response);*/
      },
      error: function(response) {
        alert("Error! Check the console and try again..");
        console.log(response);
      }
    });
  }
  makeRequest();

  function jr_show_content(obj) {
    console.log(obj[0].title)
    document.getElementsByClassName('jr_week_box')[0].innerHTML = '<ul class="ig-list items context_module_items manageable ui-sortable">'
    for (var q = 0; q < obj.length; q++) {
      var str = obj[q].title
      document.getElementsByClassName('jr_week_box')[0].innerHTML += '<li class="context_module_item indent_0 _requirement"><a href="' + obj[q].html_url + '">' + str + '</a></li>'
    }
    document.getElementsByClassName('jr_week_box')[0].innerHTML += '</ul>'
  }
}
else {
  console.log('no week box detected')
}
