// setup some globals
var DFP = DFP || {}, DFP_TARGETS = DFP_TARGETS || {}, googletag = googletag || {};

// setup our array
googletag.cmd = [];

DFP = {

	tags: [],

	rendered_ads: [],

	// Takes an element and builds the add call from data attributes
	getAd: function(id) {

		var el, ad, sz, sizes = ad_sizes = [];

		// get the reference to the element
		el = this.tags[id];

		// build sizes
		sz = el.getAttribute('data-sizes');

		// break up comma seperated sizes, if it has more than one
		if( sz.indexOf(',') >= 0 ) {
			sizes = sz.split(',');
		} else {
			sizes.push(sz);
		}

		// loop through the sizes
		for( var i = 0, ln = sizes.length; i < ln; i++ ) {

			// split each size by the x and make it an array
			d = sizes[i].split('x');

			// insert the new array into our ad sizes
			ad_sizes.push([parseInt(d[0]), parseInt(d[1])]);
		}

		// create the slot aka ad
		ad = googletag.defineSlot(el.getAttribute('data-unit'), ad_sizes, id).addService(googletag.pubads());

		// loop thru global targets
		for( var k in DFP_TARGETS ) {
			ad.setTargeting(k, DFP_TARGETS[k]);
		}

		// loop thru targets on the element
		t = JSON.parse(this.tags[id].getAttribute('data-targets'));

		for( var k in t ) {
			ad.setTargeting(k, t[k]);
		}

		// keep track of rendered ads
        this.rendered_ads[id] = ad;

        // make it a single request
        googletag.pubads().enableSingleRequest();

		// enable services, google documentation says it doesnt hurt anything to call this a bunch
		googletag.enableServices();

		// render the ad
        googletag.display(id);

	},

	processAds: function() {

		var ads = document.querySelectorAll('div.dfp'), s = '';

		for( var i = 0, ln = ads.length; i < ln; i++ ) {
			this.tags[ads[i].id] = ads[i];
			s += 'googletag.cmd.push(function(){DFP.getAd("' + ads[i].id + '")});';
		}

		// write out anonymous functions
		document.write('<scr' + 'ipt>' + s + '</scr' + 'ipt>');
		
	},

	init: function() {

		var g, n;

		// process ads
		this.processAds();

		// load gpt script
		g = document.createElement("script");
		g.async = true;
		g.src = "//www.googletagservices.com/tag/js/gpt.js";
		n = document.getElementsByTagName("script")[0];
		n.parentNode.insertBefore(g, n);

	}
}

DFP.init();