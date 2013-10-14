function Logger(prefix){
	this.prefix = prefix;
};

Logger.prototype.log = function(str) {
	console.log('[%s]%s', this.prefix, str);
};



module.exports = Logger;