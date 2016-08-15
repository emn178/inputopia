(function ($) {
  inputopia.register('jquery-ui', 'autocomplete', {
    available: function () {
      return $.fn.autocomplete;
    },
    render: function (options) {
      $(this).autocomplete(options);
    }
  });
})(jQuery);
