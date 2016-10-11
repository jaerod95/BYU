var jr_video_selector = {
  init: function() {
    console.log("JR_Tests is running");

    //checks to see if in edit mode on a page that includes the youtube slot on it.
    try {
      var contentFrame = document.getElementById('wiki_page_body_ifr').contentWindow.document || document.getElementById('wiki_page_body_ifr').contentDocument;
      contentFrame.getElementById("JR_vidSlot").addEventListener("mouseover", changeRed);
      contentFrame.getElementById("JR_vidSlot").addEventListener("mouseleave", changeback);
      contentFrame.getElementById("JR_vidSlot").addEventListener("click", jr_video_selector.upload);
    }
    //if not found, then it consoles out this message and no other video injector script is ran
    catch (e) {
      console.log("IPT-371 Tags not found");
    }
    //makes the img 'click to add video' turn red on hover
    function changeRed(event) {
      var contentFrame = document.getElementById('wiki_page_body_ifr').contentWindow.document || document.getElementById('wiki_page_body_ifr').contentDocument;
      contentFrame.getElementById('JR_vidSlot').style.backgroundImage = "URL('/courses/138/files/14232/preview')";
    }

    //returns img 'click to add video' to normal color scheme on mouse exit
    function changeback(event) {
      var contentFrame = document.getElementById('wiki_page_body_ifr').contentWindow.document || document.getElementById('wiki_page_body_ifr').contentDocument;
      contentFrame.getElementById('JR_vidSlot').style.backgroundImage = "URL('/courses/138/files/14425/preview')";
    }
  },

  upload: function() {
    var contentFrame = document.getElementById('wiki_page_body_ifr').contentWindow.document || document.getElementById('wiki_page_body_ifr').contentDocument;
    var video = prompt("Please paste the URL to your youtube video here", "ex. https://www.youtube.com/watch?v=tpDqfj3v30c");
    video = getSecondPart(video);
    contentFrame.getElementById("JR_vidSlot").innerHTML = "<iframe class='vid' src='https://www.youtube.com/embed/" + video + "?feature=oembed' allowfullscreen='allowfullscreen' frameborder='0' style='width: 430px; height: 322.5px;'></iframe>";
    // gets the special url code for each video
    function getSecondPart(str) {
      var sub = "youtu.be/";
      console.log(str);
      if (str.indexOf(sub) !== -1) {
        console.log("first if ran");
        return str.split('youtu.be/')[1];
      }
      var jr_vid = str.split('v=')[1];
      console.log("video url after inital split: " + jr_vid);
      try {
        console.log("video url after 1st split: " + jr_vid.split('&')[0]);
        return jr_vid.split('&')[0];
      } catch (e) {
        try {
          console.log("video url after 2nd split: " + jr_vid.split9('!')[0]);
          return jr_vid.split9('!')[0];
        } catch (e) {
          console.log("final split: " + jr_vid);
          return jr_vid;
        }
      }
    }
  },
  justify: function() {
    try {
      console.log('Ran Justify');
      var imgs = document.getElementsByClassName('JR_bbimg');
      var boxs = document.getElementsByClassName('JR_blueboxipt');
      for (var i = 0; i < 2; i++) {
        var ps1 = boxs[i].children[0].clientHeight;
        var box1h = boxs[i].clientHeight;
        box1h -= 65;
        box1h /= 2;
        var marg1 = box1h - ps1;
        imgs[i].style.marginTop = marg1 + "px";
      }
    } catch (e) {
      console.log('justify failed');
    }
  }
};

setTimeout(jr_video_selector.justify, 800);
setTimeout(function() {
  if (document.getElementById('wiki_page_body_ifr') !== null) {
    jr_video_selector.init();
  }
}, 800);
