module.exports = {
    syntax: 'postcss-scss',
    plugins: [
        require('postcss-easy-import')({
            extensions: ['.css', '.scss'],
            glob: true
        })
    ]
};
