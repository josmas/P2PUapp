define(['jquery'], function ($) {
  console.log("Config file called once again!");
  $(document).on("mobileinit", function () {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    console.log("Config file finished!");
  });
});
