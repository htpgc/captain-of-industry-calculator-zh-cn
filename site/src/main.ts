/*
Author: Alexey Usov (dax@xdax.ru, https://github.com/doubleaxe)
Please don't remove this comment if you use unmodified file
*/

import {createApp} from 'vue';
import {createVuetify} from 'vuetify';
import {aliases, mdi} from 'vuetify/iconsets/mdi-svg';
import App from './app.vue';
import {applyDocumentLang, locale} from './scripts/i18n';

import './assets/vuetify.scss';
import './assets/main.scss';

applyDocumentLang(locale.value);

//Modified by Marvis: language switch removed (Chinese only), drop legacy locale preference.
try {
    localStorage.removeItem('daxfb-locale');
} catch(err) {
    //no-op
}

const app = createApp(App);

app.use(createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
}));

app.mount('#app');
