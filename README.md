# formosa
A framework allows you customize form input. And you can use it by HTML input tag.

## Demo
[Demo](https://emn178.github.io/formosa/samples/demo/)

## Download
[Compress](https://raw.github.com/emn178/formosa/master/build/formosa.min.js)  
[Uncompress](https://raw.github.com/emn178/formosa/master/src/formosa.js)

## Installation
You can also install formosa by using Bower.
```
bower install formosa
```

## Usage
You need to include dependent JavaScript and CSS files first. And you can add HTML input tag to use them.
```HTML
<input type="any type registered"
  data-options="options with JSON format" 
  data-vendor="any vendor registered for this type"
  data-norender />
```
Examples
```HTML
<!-- 
  Use default vendor(bootstrap-datetimepicker) for datetime input.
  And pass options {"format":"lll"} to bootstrap-datetimepicker
-->
<input type="datetime" data-options='{"format":"lll"}' />

<!-- Use bootstrap-datepicker for date input -->
<input type="date" data-vendor="bootstrap-datepicker" />

<!-- Use browser default color input -->
<input type="color" data-norender />
```

### Settings
You can set up default options for specific type by this:
```JavaScript
// set up default options for 'datetime' input type
formosa.types.datetime.options = {
  format: 'YYYY-MM-DD HH:mm'
};
```
Or you want to set up default options for specific type under specific vendor:
```JavaScript
// set up default options for 'datetime' input type under vendor 'bootstrap-datetimepicker'
formosa.vendors['bootstrap-datetimepicker'].datetime.options = {
  format: 'YYYY-MM-DD HH:mm'
};
```
Options look up order is
```
element options > vendor default options > type default options
```

If you have multiple vendors with the same type, you can specify the vendor by `data-vendor`. The first one registered will be default vendor. You can also set up default vendor by this:
```JavaScript
// set the 'bootstrap-datepicker' as default vendor of 'date' input type
formosa.types.date.vendor = 'bootstrap-datepicker';
```

## Plugins
Currently formosa implement following plugins. You need to install the dependent libraries for the input type you want to use.

Input|Vendor|Description|Requirement
---|---|---|---
date|jquery-ui|Date Picker|[jQuery UI](https://jqueryui.com/)
date|bootstrap-datepicker|Date Picker|[bootstrap-datepicker](https://github.com/eternicode/bootstrap-datepicker)
datetime|bootstrap-datetimepicker|Datetime Picker|[Bootstrap 3 Datepicker](https://eonasdan.github.io/bootstrap-datetimepicker/)
color|kolor-picker|Color Picker|[kolor-picker](https://jqueryui.com/)
intl-tel|intl-tel-input|International Telephone|[International Telephone Input](https://github.com/jackocnr/intl-tel-input)

## License
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/formosa  
Author: Chen, Yi-Cyuan (emn178@gmail.com)
