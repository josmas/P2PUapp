require.config({ 
  baseUrl: './js/',
  paths: {  
  'jquery': 'libs/jquery-1.8.0',
  'jqm':    'libs/jquery.mobile-1.1.1',
  'jqmc': 'libs/jquery.mobile-config', 
   },
  shim: {
    jqmc: {
      deps: ['jquery', 'jqm']
    }
  }
});

require(['jqmc', 'schools'], function($) {
  console.log('loaded preferences');
});
