/* Dependencies */

// utils
const gulp = require('gulp');
const fractal = require('../../fractal');
const paths = require('../../paths');

const logger = fractal.cli.console;

/* Tasks */

// start fractal dev server
gulp.task('fractal:serve', () => {
    const server = fractal.web.server({
        sync: true,
        syncOptions: {
            notify: true,
            watchOptions: {
                ignored: ['**/*.scss', `${paths.srcComponents}/**/*.conf.js`],
            },
            open: 'tunnel',
        }
    });
    server.on('error', err => logger.error(err.message));
    fractal.components.on('updated', (e) => {
        const path = e.path;
        if (path.match(/.twig/i) || path.match(/.config.json/i)) {
            logger.success(`${path} has been updated`);
        }
    });
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
});
