import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            boxShadow: {
                normal: '0 3px 8px 0 rgba(0,0,0,0.24)',
            },
        },

        colors: {
            primary: 'var(--primary)', //1
            primary_hover: 'var(--primary_hover)', //2
            dark_primary: 'var(--dark_primary)', //3
            dark_primary_hover: 'var(--dark_primary_hover)', //4

            secondary_light: 'var(--secondary_light)', //5
            secondary_dark: 'var(--secondary_dark)', //6
            secondary_light_hover: 'var(--secondary_light_hover)', //7
            secondary_black: 'var(--secondary_black)', //8

            danger: 'var(--danger)', //9
            danger_hover: 'var(--danger_hover)', //10

            background_light: 'var(--background_light)', //11
            background_dark: 'var(--background_dark)', //12
            white: 'var(--white)',
            btn_bg: '#373B53',

            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            emerald: colors.emerald,
            indigo: colors.indigo,
            yellow: colors.yellow,
            stone: colors.warmGray,
            sky: colors.lightBlue,
            neutral: colors.trueGray,
            gray: colors.coolGray,
            slate: colors.blueGray,
            lime: colors.lime,
            rose: colors.rose,
            orange: colors.orange,
            green: colors.green,
        },

        fontFamily: {
            sans: ['Montserrat'],
        },
    },
    plugins: [],
};
export default config;
