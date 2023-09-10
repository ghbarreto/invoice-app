import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },

        colors: {
            primary: 'rgb(124, 93, 250)',
            primary_hover: 'rgb(146, 119, 255)',
            dark_primary: 'rgb(30,33,57)',
            dark_primary_hover: 'rgb(37, 41, 69)',

            secondary_light: 'rgb(233, 227, 250)',
            secondary_dark: 'rgb(136, 142, 176)',
            secondary_light_hover: 'rgb(126, 136, 195)',
            secondary_black: 'rgb(12,14,22)',

            danger: 'rgb(236, 87, 87)',
            danger_hover: 'rgb(255, 151, 151)',

            background_light: 'rgb(248, 248, 251)',
            background_dark: 'rgb(20, 22, 37)',
        },

        fontFamily: {
            sans: ['League Spartan'],
        },
    },
    plugins: [],
};
export default config;
