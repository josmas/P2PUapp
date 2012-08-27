require(["jquery"], function($) {
  var serviceURL = "https://api.p2pu.org/api/alpha/school/";

  $('#mainSchoolsPage').live('pageshow', function(event) { 
    $.mobile.showPageLoadingMsg(); 
    getSchoolsList();
  });

  function getSchoolsList(){
    var call = $.getJSON(serviceURL + '?format=jsonp&callback=?', function(data) {
      var schools;
      $('#schoolsList li').remove();
      
      schools = data.objects;
      $.each(schools, function(index, school) {
        $('#schoolsList').append(
          '<li><a>' +
          '<h3>' + school.name + '<h3/>' +
          '<h4>' + school.short_name + '</h4>' +
          '</a></li>');
        (function(index, schoolId){
          $('#schoolsList li:nth-child(' + (index + 1) + ') a').click( function(){
            linkToPage(schoolId);
          });
        })(index, school.id);
      });
      
      $.mobile.hidePageLoadingMsg(); 
      $('#schoolsList').listview('refresh');
    });
  }

  function linkToPage(pageId){
    $.mobile.changePage( "schooldetails.html?id=" + pageId, { transition: "slideup"} );
  }

  $('#schoolDetailsPage').live('pageshow', function(event) {
    $.mobile.showPageLoadingMsg(); 
    var id = getParams()["id"];
    $.getJSON(serviceURL + id + '?format=jsonp&callback=?', showSchoolDetails);
  });

  function showSchoolDetails(data) {
    school = data;
    $('#description').html(school.description);
    $.mobile.hidePageLoadingMsg(); 
  }

  function getParams() {
    var params = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0, len = hashes.length; i < len; i++){
      hash = hashes[i].split('=');
      params.push(hash[0]);
      params[hash[0]] = hash[1];
    }
    return params;
  }
});
