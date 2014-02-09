function expandAndLoadMessages() {

}

function findHashtagsInBody(body) {
	var hashtags = new Array();

	return hashtags;
}

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
		$(this).find("div.Bk div.G3.G2 div div div.ads div.gs div.gE.iv.gt table.cf.gJ tbody tr.acZ.xD td table.cf.adz tbody tr td.ady div.iw.ajw span.hb").each(function( index2 ) {
			emails[index]["to"][index2] = new Array();

			//to namesv
			emails[index]["to"][index2]["name"] = $(this).find("span.g2").html();
			//to adresses
			emails[index]["to"][index2]["email"] = $(this).find("span.g2").attr("email")

			i++;
		});
		
		//datetime
		emails[index]["datetime"] = $(this).find("div.Bk div.G3.G2 div div div.ads div.gs div.gE.iv.gt table.cf.gJ tbody tr.acZ td.gH div.gK span.g3").html();

		//content
		emails[index]["body"] = $(this).find("div.Bk div.G3.G2 div div div.ads div.gs div.gt.adP.adO div div:first-child").html();
		// $body = $body.filter("br").remove();
		// $body = $body.find("div").filter(function() {
		//        return $.trim($(this).text()) === '' && $(this).children().length == 0
		//    });
		// replace <div> by <p>, </div> by </p> and <div><br></div> by ""
		
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
		}

		//hashtags
		emails[index]["hashtags"] = findHashtagsInBody(emails["body"]);

	});

	return emails;
}

function convertEmailsToHashtags(emails) {
	var hashtags = new Array();

	return hashtags;
}


