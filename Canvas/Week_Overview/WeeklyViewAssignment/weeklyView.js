var homeCheck = window.location.href.split('courses/')[1]
if (homeCheck.indexOf('/') === -1 || homeCheck.indexOf('home') > -1) {
  console.log('this is the home page dawg')
  if (homeCheck.indexOf('home') > -1) {
    homeCheck = homeCheck.split('/')[0]
  }
  //Gets the current week period to know what assignments to display
  Date.prototype.getWeek = function(start) {
    // the starting point
    start = start || 0

    var today = new Date(this.setHours(0, 0, 0, 0))
console.log(today)

    var today_ref = today

    var day = today.getDay() - start
console.log(day)
    var date = today.getDate() - day
    console.log(date)
      //  Start/End Dates
    var dates = []
      //makes an array of all the different days of the week
    for (var i = 0; i < 7; i++) {
      dates.push(new Date(today.setDate(date + i)).toISOString().split('T')[0])
    }
    //returns the array of all the different days of the week
    return dates
  }
  var d = new Date().getWeek()
  console.log(d)
  var match = null
  var fin = null


  function makeRequest(content) {
    var oAuth = '7407~HDUjHVKpaOh9LAIrRr2ZLHmFwe7GFVw8lMujKnyjMToWUeLfQAvdQZ95vZCZsqSn';

    /*change the URL to look for the browser URL to pull info*/

    var URL = 'https://byu.instructure.com/api/v1/courses/'
    var TYPE = "GET"

    jQuery.ajax({
      //gets all the var types of content in the course
      url: URL + homeCheck + '/' + content + '?per_page=50&access_token=' + oAuth,
      type: TYPE,
      success: function(response) {
        //checks all due dates to see if one matches the week
        for (var i = 0; i < response.length; i++) {
          for (var g = 0; g < 7; g++) {
            if (response[i].due_at.split('T')[0] === d[g]) {
              match = response[i]
              break
            }
          }
        }
        if (match === null) {
          console.log('had to check assignments')
          makeRequest('assignments')
            //here you need to check for assignments in the canvas course



        } else {
          jQuery.ajax({
            url: URL + homeCheck + '/modules?per_page=50&access_token=' + oAuth,
            type: TYPE,
            success: function(ret) {
              for (var l = 0; l < ret.length; l++) {
                jQuery.ajax({
                  url: URL + homeCheck + '/modules/' + ret[l].id + '/items?per_page=50&access_token=' + oAuth,
                  type: TYPE,
                  success: function(ret2) {
                    for (var a = 0; a < ret2.length; a++) {
                      try {
                        if (ret2[a].content_id === match.id) {
                          fin = ret2
                          jr_show_content(fin)
                          break
                        }
                      } catch (e) {}
                    }
                  },
                  error: function(ret2) {
                    console.log("Error! Check the console and try again..");
                    console.log(response);
                  }
                });
              }
            },
            error: function(ret) {
              console.log("Error! Check the console and try again..");
              console.log(response);
            }
          });
        }

        //manipulateData(response);*/
      },
      error: function(response) {
        console.log("Error! Check the console and try again..");
        console.log(response);
      }
    });
  }
  makeRequest('quizzes');

  function jr_show_content(obj) {
    for (var q = 0; q < obj.length; q++) {
      console.log(obj[q])
      if (q === 0) {
        $('.jr_week_view_main').append('<h1 class="jr_week_title" style="color: white; text-align: center; font-weight: bold;">Weekly Overview</h1><div class="jr_week_box" style="width: 100%; height: 30px; display: flex; border: 1px solid rgb(214,214,214); padding: 12px 6px; border-collapse: collapse; background-color: #FAFAFA;"><div class="jr_icon" style="width: 1.875rem; display: inline-block;"><span class="type_icon"><span class="ig-type-icon" style="background-color: #008A14;"><i class="icon-document"></i></span></span></div><div class="jr_content" style="display: block; margin-left: 1.875rem;"><div class="jr_title"><a href="' + obj[q].html_url + '" class="jr_week_a" style="color: black;">' + obj[q].title + '</a></div><div class="jr_due_date"></div></div></div>')
      } else {
        $('.jr_week_view_main').append('<div class="jr_week_box" style="width: 100%; height: 30px; display: flex; border: 1px solid rgb(214,214,214); padding: 12px 6px; border-collapse: collapse; background-color: #FAFAFA;"><div class="jr_icon" style="width: 1.875rem; display: inline-block; margin-left: 1.865rem;"><span class="type_icon"><span class="ig-type-icon" style="background-color: #008A14;"><i class="icon-' + obj[q].type.toLowerCase() + '"></i></span></span></div><div class="jr_content" style="display: block; margin-left: 1.875rem;"><div class="jr_title"><a href="' + obj[q].html_url + '" class="jr_week_a" style="color: black;">' + obj[q].title + '</a></div><div class="jr_due_date"></div></div></div>')
      }
    }

    /*  $('.jr_week_view_main').append('<ul class="ig-list items context_module_items manageable ui-sortable">')
      $('.jr_week_view_main').append('<li class="context_module_item indent_0 _requirement">')
      $('.jr_week_view_main').append('<div class="ig_row"><a href="' + obj[0].html_url + '">' + obj[0].title + '</a></div></li>')
      for (var q = 1; q < obj.length; q++) {
        var str = obj[q].title
        $('.jr_week_view_main').append('<li class="context_module_item indent_1 _requirement"><a href="' + obj[q].html_url + '">' + str + '</a></li>')
      }
      $('.jr_week_view_main').append('</ul>')*/

  }
} else {
  console.log('this aint the home page')
}
