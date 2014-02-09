function expandAndLoadMessages() {

}

function findHashtagsInBody(body) {
	var hashtags = new Array();
	$body = $( "<div>" + body + "</div>" );

	var regexp = /#[A-Za-z0-9]+/;
	$body.find("p").each(function(entry) {
		var paragraph = $(this).html();
		var string = paragraph;

		var found;
		while (found = regexp.exec(string)) {
			var tag = found[0];
			if (!(tag in hashtags)) {
				hashtags.push(tag);
				hashtags[tag] = new Array();
			}
			hashtags[tag] = paragraph;
		    string = string.substring(found.index + tag.length);
		}
	});

	return hashtags;
}

$('div#\\:2 div.nH div.nH div.nH table.Bs.nH.iY tr td.Bu div.nH.if div.nH.aHU div.nH.hx div.nH:nth-child(3) > div').each(function( index ) {
	$(this).find("div.Bk div.G3.G2 div div div.ads div.gs div.gE.iv.gt table.cf.gJ tbody tr.acZ.xD td table.cf.adz tbody tr td.ady div.iw.ajw span.hb span.g2").each(function( index2 ) {
			console.log("bla");});
});

function scanPageForEmails() {
	var emails = new Array();
	// All E-mail items
	$('div#\\:2 div.nH div.nH div.nH table.Bs.nH.iY tr td.Bu div.nH.if div.nH.aHU div.nH.hx div.nH:nth-child(3) > div').each(function( index ) {
		emails[index] = new Array();

		//profile image url
		emails[index]["profile_img"] = $(this).find("div.Bk div.G3.G2 div div div.ads div.aju div.aCi img.ajn").attr("src");

		emails[index]["from"] = new Array();
		//from name
		emails[index]["from"]["name"] = $(this).find("div.Bk div.G3.G2 div div div.ads div.gs div.gE.iv.gt table.cf.gJ tbody tr td.gF.gK span").html();
		//from address
		emails[index]["from"]["email"] = $(this).find("div.Bk div.G3.G2 div div div.ads div.gs div.gE.iv.gt table.cf.gJ tbody tr td.gF.gK span").attr("email");

		emails[index]["to"] = new Array();
		$(this).find("div.Bk div.G3.G2 div div div.ads div.gs div.gE.iv.gt table.cf.gJ tbody tr.acZ.xD td table.cf.adz tbody tr td.ady div.iw.ajw span.hb span.g2").each(function( index2 ) {
			emails[index]["to"][index2] = new Array();

			//to namesv
			emails[index]["to"][index2]["name"] = $(this).html();
			//to adresses
			emails[index]["to"][index2]["email"] = $(this).attr("email");
		});
		
		//datetime
		emails[index]["datetime"] = $(this).find("div.Bk div.G3.G2 div div div.ads div.gs div.gE.iv.gt table.cf.gJ tbody tr.acZ td.gH div.gK span.g3").html();

		//content
		var $body = $(this).find("div.Bk div.G3.G2 div div div.ads div.gs div.gt.adP.adO div div:first-child");
		if ($body.html().trim() == "") {
			$body = $(this).find("div.Bk div.G3.G2 div div div.ads div.gs div.gt.adP.adO div span");
		}

		$body.find("div[role=\"button\"]").remove();
		$body.find("blockquote.gmail_quote").remove();

		$body = $body.html();
		if (typeof $body === 'undefined') {
		$body = "";
		}
		$body = "<p>"+$body+"</p>";
		$body = $body.replace(/<div><br[^>]*[\/]{0,1}><\/div>/g,"</p><p>");
		$body = $body.replace(/<br[^>]*[\/]{0,1}>/g,"");

		$body = $body.replace(/<font[^>]*>/g,"");
		$body = $body.replace(/<\/font>/g,"");

		$body = $body.replace(/<div[^>]*>/g,"<p>");
		$body = $body.replace(/<\/div>/g,"</p>");

		$body = $body.replace(/<p>\s*<p>/g,"<p>");
		$body = $body.replace(/<\/p>\s*<\/p>/g,"</p>");
		$body = $body.replace(/<p>\s*<\/p>/g,"");

		emails[index]["body"] = $body;
		
		//attachments
		emails[index]["attachments"] = new Array();
		$(this).find("div.Bk div.G3.G2 div div div.ads div.gs div.hq.gt.a10 div.aQH span.aZo").each(function( index2 ) {
			emails[index]["attachments"][index2] = new Array();

			emails[index]["attachments"][index2]["name"] = $(this).find("a.aQy div.aQA span.AV3").html();
			
			if (typeof $(this).attr("download_url") !== 'undefined' && $(this).attr("download_url") !== false) {
				var arr = $(this).attr("download_url").split(":",2);
				emails[index]["attachments"][index2]["url"] = $(this).attr("download_url").replace(arr[0]+":"+arr[1]+":","");
			} else {
				emails[index]["attachments"][index2]["url"] = $(this).find("a.aQy").attr("href");
			}
		});

		//hashtags
		emails[index]["hashtags"] = findHashtagsInBody(emails[index]["body"]);

	});

	return emails;
}

function convertEmailsToHashtags(emails) {
	var hashtags = new Array();

	hashtagPositions = new Array();

	emails.forEach(function(email) {
	    email["hashtags"].forEach(function(tag){
	    	if (!(tag in hashtagPositions)) {
	    		var n = hashtags.length;
	    		hashtagPositions[tag] = n;
	    		hashtags[hashtagPositions[tag]] = new Array();
	    		hashtags[hashtagPositions[tag]]["tag"] = tag;
	    		hashtags[hashtagPositions[tag]]["emails"] = new Array();
	    	}

	    	var n = hashtags[hashtagPositions[tag]]["emails"].length;
	    	hashtags[hashtagPositions[tag]]["emails"][n] = new Array();

	    	hashtags[hashtagPositions[tag]]["emails"][n]["profile_img"] = email["profile_img"];
	    	hashtags[hashtagPositions[tag]]["emails"][n]["from"] = email["from"];
	    	hashtags[hashtagPositions[tag]]["emails"][n]["to"] = email["to"];
	    	hashtags[hashtagPositions[tag]]["emails"][n]["datetime"] = email["datetime"];
	    	hashtags[hashtagPositions[tag]]["emails"][n]["body"] = email["body"];

	    	hashtags[hashtagPositions[tag]]["emails"][n]["paragraph"] = email["hashtags"][tag];
	    })
	});
	
	return hashtags;
}


