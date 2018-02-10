/** Au préhalable vous devez avoir installé Phantomjs et CasperJs**/ 
var casper = require('casper').create();
/*
Pour faciliter l'utilisation et la lecture des expressions XPath, 
une aide selectXPath est disponible à partir du module casper:*/

var x = require('casper').selectXPath;	

/* paramètre de connection à SAP*/

var info = {idt:"S0018583675",pwd:"CodexAlien6"};

/* Identifiants des différents éléments dont nous aurons besoins */

var identifiant = {input_idt:'input[name="j_username"]',input_password:'input[name="j_password"]',valider_connexion:'#logOnFormSubmit'};
/* variable dans laquelle nous allons stocker les différent liens à utilisé*/
var liens;

/* L'url de la page que l'on veut ouvrir */
casper.start("https://apps.support.sap.com/sap(bD1mciZjPTAwMQ==)/support/pam/pam.html?smpsrv=https%3a%2f%2fwebsmp104.sap-ag.de#ts=0");
//Connection sur le site SAP 
casper.then(function() {
	var test = true;//Variable permettant d'arreter la fonction pour exécuter les fonctions les unes à la suites des autres.
	this.echo("page de connexion chargé");// on affiche un message
	casper.capture("page_de_connexion.png");// on prend une capture d'écrans de la page de connection
	this.sendKeys(identifiant.input_idt,info.idt);//on insère la valeur de info.idt dans la case ayant comment identifiant la valeur de identifiant.input_idt
	this.sendKeys(identifiant.input_password,info.pwd);//on insère la valeur de info.pwd dans la case ayant comment identifiant la valeur de identifiant.input_password
	casper.capture("formulaire_remplit.png");// On prend une captue d'écran pour voir si nos informations ont bien été saisies
	casper.thenClick(identifiant.valider_connexion,function(){// on cliquer sur le bouton ayant comme identifiant la valeur de identifiant.valider_connexion
		if ( ! test ){return;}
		casper.wait(50000,function(){// on attend quelque temps afin que la page puisse se chargé
			casper.capture("connection_établie.png");// on prend une capture d'écran pour voir si la page s'est bien chargé 
			
		});
		
	});
	
	
});
casper.wait(50000,function()
{
	var test = true;
	casper.click(x('//*[@id="pamHeaderNavigation"]/div/ul[2]/li/a'));// on click sur le boutton ayant comme Xpath celui passé en paramètre
	if ( ! test ){return;}
	casper.wait(50000,function()
	{
		casper.capture("cliquer_sur_ Display_All_Product_Versions.png");// On prend une photo pour voir si il a bien cliqué sur le bouton
		
	});
});
/** Fonction qui sont en cours de développement pour pouvoir cliquer sur les liens **/
function getLiens() {
    var links = document.querySelectorAll('.pamSearchResultEntryHeader');
    var listLinks = [];
    for (var i = 0; i <links.length;i++){
    	var unLien = {};
    	var l = links[i].querySelector('.pamPVLink pamFontBold');
    	unLien['chemin'] = l.innerHTML;
    	listLinks.push(unLien);
     }; 
	
    return listFilms;
}



casper.then(function() {
	 liens = this.evaluate(getLiens);
});

casper.then(function()
{
				
					for (var i = 0; i < liens.length; i ++)
					{
						var chaine ="http://quotes.toscrape.com"+liens[i].chemin+"/";
						console.log("Voici le lien suivit par casperjs "+chaine);
						capture(chaine,i);
						
					}				
					casper.exit();
			
},10000);

casper.run();