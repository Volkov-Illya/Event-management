// const API = {
//     auth: require( './auth/Auth.js' ),
//     guard: require( './auth/Guard.js' ), 
//   };
const API = {
	auth: require( './core/Auth.js' ),
	guard: require( './core/Guard.js' ),
	event: require( './core/Event.js' ),
	expert: require( './core/Expert.js' ),
	manager: require( './core/Manager.js' )
};
	
module.exports = API;
	