var homeCheck = window.location.href.split('courses/')[1]
if (homeCheck.indexOf('/') === -1 || homeCheck.indexOf('home') > -1) {
  console.log('this is the home page dawg')
  if (homeCheck.indexOf('home') > -1) {
    homeCheck = homeCheck.split('/')[0]
  }


  //////////////////////////////////////////////////////////////////////////////////
  //Option #1 get the side wrapper and add a note not to forget to do the readings//
  //////////////////////////////////////////////////////////////////////////////////

  $('#right-side-wrapper').append('<div class="jr_do_readings"><p>Don\'t forget to do your readings before doing your assignments!</p></div>')



  ///////////////////////////////////////////////////////
  //Option #2 get the content for each week dynamically//
  ///////////////////////////////////////////////////////

  var dynamicWeekGenerator = {

    GenerateweekSpan: function() {
      var currentDate = new Date()
      var d = []
      while (currentDate.getDay() > 0) {
        currentDate.setDate(currentDate.getDate() - 1)
      }
      for (var i = 0; i < 7; i++) {
        d.push(currentDate.toISOString().split('T')[0])
        currentDate.setDate(currentDate.getDate() + 1)
      }
      return d
    },

    match: null,

    fin: null,

    URL: 'https://byu.instructure.com/api/v1/courses/',

    oAuth: '7407~HDUjHVKpaOh9LAIrRr2ZLHmFwe7GFVw8lMujKnyjMToWUeLfQAvdQZ95vZCZsqSn',

    TYPE: 'GET',

    makeRequest: function(content) {
      var d = dynamicWeekGenerator.GenerateweekSpan()
      var that = this

      //change the URL to look for the browser URL to pull info



      jQuery.ajax({
        //gets all the var types of content in the course
        url: that.URL + homeCheck + '/' + content + '?per_page=50&access_token=' + that.oAuth,
        type: that.TYPE,
        success: function(response) {
          //checks all due dates to see if one matches the week
          for (var i = 0; i < response.length; i++) {
            for (var g = 0; g < 7; g++) {
              if (response[i].due_at.split('T')[0] === d[g]) {
                that.match = response[i]
                break
              }
            }
          }
          if (that.match === null) {
            console.log('had to check assignments')
            that.makeRequest('assignments')
              //here you need to check for assignments in the canvas course



          } else {
            jQuery.ajax({
              url: that.URL + homeCheck + '/modules?per_page=50&access_token=' + that.oAuth,
              type: that.TYPE,
              success: function(ret) {
                for (var l = 0; l < ret.length; l++) {
                  jQuery.ajax({
                    url: that.URL + homeCheck + '/modules/' + ret[l].id + '/items?per_page=50&access_token=' + that.oAuth,
                    type: that.TYPE,
                    success: function(ret2) {
                      for (var a = 0; a < ret2.length; a++) {
                        try {
                          if (ret2[a].content_id === that.match.id) {
                            that.fin = ret2
                            that.ShowContent()
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

          //manipulateData(response);
        },
        error: function(response) {
          console.log("Error! Check the console and try again..");
          console.log(response);
        }
      });
    },

    ShowContent: function() {
      var that = this
      for (var q = 0; q < that.fin.length; q++) {
        if (q === 0) {
          $('.jr_week_view_main').append('<h1 class="jr_week_title" style="color: white; text-align: center; font-weight: bold;">Weekly Overview</h1><div class="jr_week_box" style="width: 100%; height: 30px; display: flex; border: 1px solid rgb(214,214,214); padding: 12px 6px; border-collapse: collapse; background-color: #FAFAFA;"><div class="jr_icon" style="width: 1.875rem; display: inline-block;"><span class="type_icon"><span class="ig-type-icon" style="background-color: #008A14;"><i class="icon-document"></i></span></span></div><div class="jr_content" style="display: block; margin-left: 1.875rem;"><div class="jr_title"><a href="' + that.fin[q].html_url + '" class="jr_week_a" style="color: black;">' + that.fin[q].title + '</a></div><div class="jr_due_date" id="jr_due_date' + q + '"></div></div></div>')
        } else {
          $('.jr_week_view_main').append('<div class="jr_week_box" style="width: 100%; height: 30px; display: flex; border: 1px solid rgb(214,214,214); padding: 12px 6px; border-collapse: collapse; background-color: #FAFAFA;"><div class="jr_icon" style="width: 1.875rem; display: inline-block; margin-left: 1.865rem;"><span class="type_icon"><span class="ig-type-icon" style="background-color: #008A14;"><i class="icon-' + th t.fin[q].type.toLowerCase() + '"></i></span></span></div><div class="jr_content" style="display: block; margin-left: 1.875rem;"><div class="jr_title"><a href="' + that.fin[q].html_url + '" class="jr_week_a" style="color: black;">' + that.fin[q].title + '</a></div><div class="jr_due_date" id="jr_due_date' + q + '"></div></div></div>')
        }
      }

      for (var z = 0; z < tempFin.length; z++) {
        var type = ''
        switch (that.fin[p].type) {
          case 'Page':
            type = 'pages'
            break
          case 'Quiz':
            type = 'quizzes'
            break
          case 'Discussion':
            type = 'dicussion_topics'
            break
          case 'Assignment':
            type = 'assignments'
            break
          default:
        }


        jQuery.ajax({
          url: that.URL + homeCheck + '/' + type + '?per_page=50&access_token=' + that.oAuth,
          type: that.TYPE,
          success: function(ret) {
            for (var e = 0; e < ret.length; e++) {
              for (var w = 0; w < tempFin.length; w++) {
                if (tempFin[w].title === ret[e].title) {
                  due = ret[e].due_at
                  points = ret[e].points_possible
                  due = due.split('T')[0]
                  console.log(due)
                  console.log('this is a sucess')
                  $('#jr_due_date' + objNum).append(due + ' | ' + points + ' points')
                  objNum++
                }
              }
            }
          },
          error: function(e) {
            console.log('error with ajax')
            objNum++
          }
        });
      }

      var tempFin = this.fin
      var due = null
      var points = null
      var objNum = 0
      for (var p = 0; p < tempFin.length; p++) {
        var type = ''
      }
    }
  }

  dynamicWeekGenerator.makeRequest('quizzes');

  /////////////////////////////////////////////
  //Option #3 add all module pages to sidebar//
  /////////////////////////////////////////////
  /*
    function jr_to_do() {
      for (var g = 0; g < $('.to-do-list').children().length; g++) {
        var assignment_id = $('.to-do-list').children()[g].children[0].href.split('assignments/')[1].split('#')[0]
        console.log(assignment_id)
        var assignment_type = $('.to-do-list').children()[g].children[0].children[0].getAttribute('aria-label')
        console.log(assignment_type)
        var c = null
        switch (assignment_type) {
          case 'Discussion':
          console.log('opt 1')
          c = 'discussion_topics'
          break;
          case 'Assignment':
                  console.log('opt 2')
          c = 'assignments'
          break;
          case 'Quiz':
                  console.log('opt 3')
          c = 'quizzes'
          break;
        }

        jQuery.ajax({
          //gets all the var types of content in the course
          url: 'https://byu.instructure.com/api/v1/courses/203/' + c + '?per_page=50&access_token=7407~HDUjHVKpaOh9LAIrRr2ZLHmFwe7GFVw8lMujKnyjMToWUeLfQAvdQZ95vZCZsqSn',
          type: 'GET',
          success: function(response) {
            for (var k = 0; k < response.length; k++) {
              console.log(response[k])
              console.log('ajax')
            }
          },
          error: function(e) {
            console.log('error')
          }
      });
      }
    }

    jr_to_do()

    $('.right-side-list to-do-list').append('<li class="todo" style=""><a class="item" href="/courses/203/assignments/1763#submit" data-track-category="dashboard" data-track-label="todo needs submitting"><i class="icon-discussion" aria-label="Discussion"></i><div class="todo-details"><b>Turn in Video Posts</b><p>1 point•Sep 8 at 11:59pm</p></div></a><button type="button" class="Button Button--icon-action disable_item_link disable-todo-item-link" title="Ignore this assignment" href="#" data-api-href="https://byu.instructure.com/api/v1/users/self/todo/assignment_1763/submitting?permanent=1" data-flash-message=""><i class="icon-x"></i><span class="screenreader-only">Ignore</span></button></li>')
  */
} else {
  console.log('this aint the home page')
}
