const path = require('path');

const paths = {};

paths.assets = path.resolve(__dirname, 'assets');
paths.docs = path.resolve(__dirname, 'docs');
paths.publicPath = '/spotify-clone/';
paths.src = path.resolve(__dirname, 'src');
paths.tsConfig = path.resolve(__dirname, 'tsconfig.json');

paths.app = path.join(paths.src, 'app');
paths.entryModule = path.join(paths.app, 'app.module') + '#AppModule';
paths.favicon = path.join(paths.assets, 'favicon.svg');
paths.index = path.join(paths.src, 'index.html');
paths.main = path.join(paths.src,'main.ts');
paths.polyfills = path.join(paths.src, 'polyfills.ts');

module.exports = paths;
