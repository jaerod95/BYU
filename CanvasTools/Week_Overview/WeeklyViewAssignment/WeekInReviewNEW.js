var jr_date_checker = {

  //Checks to see if 'checkDate' falls within the start and end Dates
  //@params startDate/endDate/checkDate--Any date with the format YYYY-MM-DD

  checkDateValidity: function(startDate, endDate, checkDate) {
    var start = null
    var end = null
    if (startDate > endDate) {
      start = endDate.split('-')
      end = startDate.split('-')
    } else {
      start = startDate.split('-')
      end = endDate.split('-')
    }
    var check = checkDate.split('-')

    var y = false
    var m = false
    var d = false

    //check to find the range of year
    var yearRange = end[0] - start[0]
    y = dateRange(yearRange, 0, y, start)


    if (y) {
      var monthRange = null
      if (start[0] == end[0]) {
        monthRange = end[1] - start[1]
        m = dateRange(monthRange, 1, m, start)
      } else if (start[0] == check[0]) {
        monthRange = 11 - start[1]
        m = dateRange(monthRange, 1, m, start)
      }
      else if (end[0] == check[0]) {
        monthRange = end - 1
        m = dateRange(monthRange, 1, m, end)
      }
      else {
        m = true
      }
      if (m) {
        if (start[0] == check[0] && start[1] == check[1] && end[0] == check[0] && end[1] == check[1]) {
          if (check[2] >= start[2] && check[2] <= end[2]) {
            d = true
          }
        }
        else if (start[0] == check[0] && start[1] == check[1]) {
          if (check[2] >= start[2]) {
            d = true
          }
        }
        else if (end[0] == check[0] && end[1] == check[1]) {
          d = true
        }
        else {
          d = true
        }
      }
    }


    function dateRange(rangeValue, index, bool, var1) {
      for (var g = 0; g <= rangeValue; g++) {
        if (parseInt(var1[index]) + g == check[index]) {
          bool = true
        }
      }
      return bool
    }

    if (y && m && d) {
      return true
    } else {
      return false
    }
  }
}

jr_date_checker.checkDateValidity('2014-9-4', '2016-12-4', '2015-10-4')

for (var i = 0; i < mod.length; i++) {
  jr_date_checker.checkDateValidity()
}
