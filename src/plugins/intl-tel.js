(function ($) {
  formosa.register('intl-tel', 'intl-tel', function (options) {
    if (!$.fn.intlTelInput) {
      return;
    }
    var element = $(this);
    var hidden = $('<input type="hidden"/>')
      .attr('name', element.attr('name'))
      .val(element.val())
      .insertAfter(element);
    element.intlTelInput(options);

    element.removeAttr('name')
      .attr('type', 'tel')
      .closest('form').submit(function () {
        hidden.val(element.intlTelInput('getNumber'));
      });
  });
})(jQuery);
