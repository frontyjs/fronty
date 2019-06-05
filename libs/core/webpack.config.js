module.exports = {
	output: {
		filename: 'fronty.min.js',
		library: 'frontyLoader', // the loader module always publishes a `fronty` global, so we can't (and shouldn't) use that name
		libraryTarget: 'umd'
	}
};
