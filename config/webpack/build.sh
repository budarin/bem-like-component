rimraf .eslintcache && rimraf ./dist && rimraf node_modules/.cache && NODE_ENV=production webpack --mode production --config ./config/webpack/webpack.config.js
