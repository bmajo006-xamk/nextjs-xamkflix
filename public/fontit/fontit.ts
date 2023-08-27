import { Roboto } from '@next/font/google';
import { NextFont } from '@next/font';
import localFont from '@next/font/local';
import { Raleway } from '@next/font/google';


export const fontti : NextFont = Roboto({
    weight : '300',
    subsets: ['latin']
});

export const esittelyfontti : NextFont = localFont({
    src: './GothamBold.ttf'
});
export const downtonFontti : NextFont = Raleway({
    weight : '300',
    subsets: ['latin']

});

export const moonfallFontti : NextFont = localFont({
    weight: '200',
    src: '/ITC Blair W02 Medium.ttf'

})
export const worstFontti : NextFont = localFont({
    src: '/LAQUATSA Regular.ttf'
})


