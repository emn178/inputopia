(function ($) {
  inputopia.register('myplugin', 'city', {
    available: function () {
      return $.fn.autocomplete;
    },
    render: function (options) {
      options.source = function (request, response) {
        $.ajax({
          url: "http://gd.geobytes.com/AutoCompleteCity",
          dataType: "jsonp",
          data: {
            q: request.term
          },
          success: function (data) {
            response(data.length === 1 && data[ 0 ].length === 0 ? [] : data);
          }
        });
      };
      options.minLength = 3;
      $(this).autocomplete(options);
    }
  });
})(jQuery);
