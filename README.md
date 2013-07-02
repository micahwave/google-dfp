# Google DFP

A lightweight, unobtrusive implementation of Google's DFP ad library

## Installation

Include the script near the closure of your `<body>` tag:

	<script src="/path/to/dfp.min.js"></script>

## Usage

Use HTML and data attributes to define your ad slots.

	<div id='my-ad' data-unit='1234/my-ad' data-sizes='300x250,300x600' data-targets='{"key":"value"}'></div>

Note the use of single quotes for the attributes. This is done so the json in the data-targets attribute can use double quotes.

The data-sizes attribute will accept a single size or multiple sizes seperated by commas.

The data-targets attribute may contain a json object of key/value pairs used for ad targeting.

### Additional Targeting

If you use common targets across all your ads you do not need to define them in each ad's data-targets attribute. Instead, you can make use of a global named `DFP_TARETS`. Simply define the variable before you include the library to take advantage of this.

	<script>var DFP_TARGETS = {key: value};</script>
	<script src="/path/to/dfp.min.js"></script>




	

