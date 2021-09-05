module.exports = {
	config: {
		tailwindjs: "./tailwind.config.js",
		port: 9050, // preffered port for local browsersync
        // default local ghost address
        proxyServer: "locahost:2368" // change this if ghost is running on  different address
	},
	paths: {
		root: "./",
		src: {
			base: "./assets",
			css: "./assets/css",
			js: "./assets/js",
			img: "./assets/img",
			fonts: "./assets/fonts"
        },
        built: {
            base: "./assets/built",
            css: "./assets/built/css",
            js: "./assets/built/js",
            img: "./assets/built/img",
            fonts: "./assets/built/fonts"
        },
		dist: { // dist folder
			base: "./dist",
		}
	}
}
