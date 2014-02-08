
function scanPageForEmails() {
	var emails = new Array();
	// All E-mail items
	$('div#\\:2 div.nH div.nH div.nH table.Bs.nH.iY tr td.Bu div.nH.if div.nH.aHU div.nH.hx div.nH:nth-child(3)').each(function( index ) {	
		emails[index] = new Array();

		//profile image url
		emails["profile_img"] = $(XXXXXXXXXXXXXXXXXXXXXX);

		emails["from"] = new Array();
		//from name
		emails["from"]["name"] = $(XXXXXXXXXXXXXXXXXXXXXX);
		//from address
		emails["from"]["email"] = $(XXXXXXXXXXXXXXXXXXXXXX);

		emails["to"] = new Array();
		$(XXXXXXXXXXXXXXXXXXXXXX).each(function( index ) {
			emails["to"][index] = new Array();

			//to names
			emails["to"][index]["name"] = $(XXXXXXXXXXXXXXXXXXXXXX);
			//to adresses
			emails["to"][index]["email"] = $(XXXXXXXXXXXXXXXXXXXXXX);

			i++;
		});
		
		//datetime
		emails["datetime"] = $(XXXXXXXXXXXXXXXXXXXXXX);
		//content
		
		//attachments
		
	});

}



