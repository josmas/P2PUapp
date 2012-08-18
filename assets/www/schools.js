var serviceURL = "http://api.localhost:8000/api/alpha/school/";

var schools;

$('#mainPage').bind('pageinit', function(event) {
  getSchoolsList();
});

function getSchoolsList(){
  var call = $.getJSON(serviceURL + '?format=jsonp&callback=?', function(data) {
    $('#schoolsList li').remove();
    
    schools = data.objects;
    $.each(schools, function(index, school) {
      $('#schoolsList').append(
        '<li><a href="#">' +
        '<h3>' + school.name + '<h3/>' +
        '<h4>' + school.short_name + '</h4>' +
        '<p>' + school.description + '</p>' +
        '</a></li>');
    });
    
    $('#schoolsList').listview('refresh');
  });
}
