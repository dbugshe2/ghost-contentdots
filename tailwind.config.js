module.exports = {
    purge: ["./**/*.hbs", "*.hbs", "!node_modules", "!node_modules/**"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["Montserrat", "sans-serrif"],
                dmsans: ["DM\\ Sans", "sans-serrif"],
                mulish: ["Mulish", "sans-serrif"],
            },
            fontSize: {
                xxs: ["10px", "13px"],
            },
            borderWidth: {
                0.2: "0.2px",
            },
            backgroundImage: (theme) => ({
                "purple-conic":
                    "conic-gradient(from 247.85deg at 50% 50%, #344FA1 -32.26deg, #3F3697 162.19deg, #344FA1 327.74deg, #3F3697 522.19deg)",
            }),
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/typography"),
    ],
};
