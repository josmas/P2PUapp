var serviceURL = "http://api.localhost:8000/api/alpha/school/";

$('#mainPage').bind('pageinit', function(event) {
  getSchoolsList();
});

function getSchoolsList(){
  var call = $.getJSON(serviceURL + '?format=jsonp&callback=?', function(data) {
    var schools;
    $('#schoolsList li').remove();
    
    schools = data.objects;
    $.each(schools, function(index, school) {
      $('#schoolsList').append(
        '<li><a href="#" onclick="linkToPage(' + school.id + ');">' +
        '<h3>' + school.name + '<h3/>' +
        '<h4>' + school.short_name + '</h4>' +
        '</a></li>');
    });
    
    $('#schoolsList').listview('refresh');
  });
}

function linkToPage(pageId){
  $.mobile.changePage( "schooldetails.html?id=" + pageId, { transition: "slideup"} );
}

$('#schoolDetailsPage').live('pageshow', function(event) {
  var id = getParams()["id"];
  $.getJSON(serviceURL + id + '?format=jsonp&callback=?', showSchoolDetails);
});

function showSchoolDetails(data) {
  school = data;
  $('#description').html(school.description);
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
