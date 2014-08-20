(function(){
  'use strict';

  $(document).ready(function(){
    $('#addHint').click(addHint);
  });

  function addHint(){
    var $i = $('<input>');
    $i.attr('type', 'text');
    $i.attr('name', 'hints');
    $i.addClass('form-control');
    $('#hints').append($i);
  }
})();


