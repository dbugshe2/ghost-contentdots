module.exports = {
    plugins: [
        require("postcss-easy-import"),
        require('tailwindcss'),
        require("postcss-color-mod-function"),
        require('autoprefixer'),
        require("cssnano")
    ]
}
