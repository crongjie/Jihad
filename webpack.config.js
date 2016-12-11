var webpack = require('webpack');

module.exports = {
	entry: {
		app: ["./src/entry.js"]
    },
	output: {
        filename: "./output/app.js"
	},
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
	/*
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	],*/
	externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        'toastr': "toastr", 
        //'react-redux': "reactRedux",
        //'redux-form': "reduxForm",
        'lodash': "_"
    },
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				query: {
					  presets: ['es2015', 'react']
				}
			}
		]
	}
};