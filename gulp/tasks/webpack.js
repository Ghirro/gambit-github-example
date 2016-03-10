import express from 'express';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import nodeOpen from 'open';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';


function runDevServer(config, port = 8000, host = 'localhost') {
  const compiler = webpack(config);
  const app = express();

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    stats: {
      colors: true,
    },
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use('/', express.static(path.join(__dirname, '../../src/')));


  app.listen(port, host, err => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    console.log('Listening on', host);
    nodeOpen(`http://${host}:${port}`);
  });
}

gulp.task('serve', () => {
  runDevServer(webpackConfig);
});
