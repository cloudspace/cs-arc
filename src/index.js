module.exports = function(flag) {
  switch(flag) {
    case "angular-1.X":
	  require('./arc-angular-1-x.js');
	  break;
	case "react-0.X":
	  require('./arc-react-0-x.js');
	  break;
	case "es5":
	  require('./arc.js');
	  break;
	default:
	  require('./arc.js');
	  break;
  }	
};