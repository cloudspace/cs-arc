var packages = {
  "angular-1.X": "./arc-angular-1-x.js",
  "react-0.X":   "./arc-react-0-x.js",
  "es5":         "./arc.js"
};

module.exports = function(flag) {
  if(packages.hasOwnProperty(flag)) {
	require(packages[flag]);  
  }
  else {
    throw 'No such package exists';
  }
};