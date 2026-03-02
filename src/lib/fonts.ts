import { Instrument_Serif } from 'next/font/google';
import localFont from 'next/font/local';

export const instrumentSerif = Instrument_Serif({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-instrument',
    display: 'swap',
});

export const geistMono = localFont({
    src: '../app/fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
    display: 'swap',
});
