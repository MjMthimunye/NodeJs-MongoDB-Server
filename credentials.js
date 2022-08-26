var credentials ={

	credentials: {
		client_id: 'w60MNKC2EJfOuAZ9dDSRoGpahhaycVM1',
		client_secret: 'YqFQYEnm6iPbFZfI',
		grant_type: 'client_credentials',
		scope: 'viewables:read',

	},
	
	//Autodesk Forge base url
	BaseUrl: 'https://developer.api.autodesk.com',
	Version: 'v1'
} ;

credentials.Authentication = credentials.BaseUrl + '/authentication/' + credentials.Version + '/authenticate'


module.exports = credentials;