
// Use this to override the reaction to submitting a form
function override_submit(jquerySelector, success, failure){
    $(jquerySelector).submit(function( event ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      $.ajax({
            type: 'POST',
            url:$(this).attr('action'),
            data: $(this).serialize()
        })
        .done(success)
        .error(failure)
    });
}

