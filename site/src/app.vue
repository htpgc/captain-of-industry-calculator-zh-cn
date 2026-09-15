<!--
Author: Alexey Usov (dax@xdax.ru, https://github.com/doubleaxe)
Please don't remove this comment if you use unmodified file
-->
<script setup lang="ts">
import {provide, shallowRef, watchEffect} from 'vue';
import {useLocale} from 'vuetify';
import {GameDataKey, type GameData} from './scripts/data';
import {locale} from './scripts/i18n';

const gameData = shallowRef<GameData | undefined>();
provide(GameDataKey, gameData);

//keep Vuetify built-in texts in sync with the selected locale
const {current: vuetifyLocale} = useLocale();
watchEffect(() => {
    vuetifyLocale.value = (locale.value === 'zh') ? 'zhHans' : 'en';
});

function provideGameData(_gameData: GameData) {
    gameData.value = _gameData;
}

window.oncontextmenu = function(event: MouseEvent) {
    const pointerEvent = event as PointerEvent;
    //prevent chrome dev tools simulated context menu during long press in device mode
    if(pointerEvent.pointerType === 'touch') {
        // context menu was triggerd by long press
        event.preventDefault();
        return false;
    }
    return true;
};

</script>

<template>
    <error-dialog />
    <game-data-loader v-if="!gameData" @ready="provideGameData" />
    <main-window v-if="gameData" />
</template>
