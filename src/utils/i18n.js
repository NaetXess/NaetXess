import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';
import { i18 } from './function';

export const localeLang = () => {
    return new Promise((resolve) => {
        let fallbackLocale;
        if (localStorage.getItem("language")) {
            fallbackLocale = localStorage.getItem("language");
        } else {
            fallbackLocale = "en";
        }
        const lngs = [fallbackLocale, fallbackLocale];
        i18(fallbackLocale).then((response) => {
            let datas = response[0];
            // console.log(datas);
            addMessages("en", datas);
            addMessages("tr", datas);
            resolve(datas);
        });

        let initialLocale;
        const detectedLocale = getLocaleFromNavigator(); // the locale could be region specific, i.e. de-CH
        if (lngs.indexOf(detectedLocale) > -1) initialLocale = detectedLocale;
        if (!initialLocale && detectedLocale.indexOf('-') > 0) {
            const foundLng = lngs.find((l) => detectedLocale.indexOf(l + '-') === 0);
            if (foundLng) initialLocale = foundLng;
        }
        if (!initialLocale) initialLocale = fallbackLocale;

        init({
            fallbackLocale,
            initialLocale
        });
    });
}

localeLang().then((datas) => {
    // console.log(datas)
});





