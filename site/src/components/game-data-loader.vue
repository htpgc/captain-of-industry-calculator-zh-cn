<!--
Author: Alexey Usov (dax@xdax.ru, https://github.com/doubleaxe)
Please don't remove this comment if you use unmodified file
-->
<script setup lang="ts">
import {t} from '@/scripts/i18n';
import {useLinkApi, useErrorHandler} from '@/composables';
import {useGameDataProvider} from '@/scripts/data';
import {FileNameHandler} from '@/scripts/model/serializer';
import {computed, onMounted, ref, unref, watch} from 'vue';

const emit = defineEmits(['ready']);

const DEFAULT_GAME_ID = 'coi';
let blueprintName = '';
let blueprintData = '';
const loadGameId = ref(DEFAULT_GAME_ID);
const gameId = ref('');
const {showError} = useErrorHandler();
const {gameDataRef, isReady, isLoading: isGameDataLoading, isAutomatic} = useGameDataProvider(gameId, (err: unknown) => {
    blueprintName = '';
    blueprintData = '';
    gameId.value = '';
    isAutomatic.value = false;
    showError(t('game.loadFailed'), err);
});
const {isLoading: isLinkLoading, exec} = useLinkApi();
const isLoading = computed(() => unref(isGameDataLoading) || unref(isLinkLoading));

watch(gameDataRef, () => {
    const gameData = unref(gameDataRef);
    if(gameData) {
        if(blueprintData) {
            gameData.initPreloadBlueprint({
                name: blueprintName,
                data: blueprintData,
            });
        }
        emit('ready', gameData);
    }
});

function loadGameData(_gameId: string) {
    loadGameId.value = _gameId;
    gameId.value = _gameId;
    isAutomatic.value = true;
}

function fetchLink(_gameId: string | null | undefined, link: string, name: string | null | undefined) {
    type LoadLinkResponse = {
        gameId: string;
        data: string;
        name?: string | null;
    };
    exec<LoadLinkResponse>('load', {link})
        .then((loadedLink: LoadLinkResponse) => {
            if(!loadedLink.gameId || (typeof (loadedLink.gameId) !== 'string')
                || !loadedLink.data || (typeof (loadedLink.data) !== 'string')) {
                throw new Error('data provider returned invalid response');
            }
            if(_gameId && (loadedLink.gameId !== _gameId)) {
                throw new Error(`gameId mismatch: ${loadedLink.gameId} != ${_gameId}`);
            }
            if(loadedLink.gameId !== DEFAULT_GAME_ID) {
                throw new Error(`unsupported gameId: ${loadedLink.gameId}`);
            }
            blueprintName = name || loadedLink.name || '';
            blueprintData = loadedLink.data;
            loadGameData(DEFAULT_GAME_ID);
        })
        .catch((err) => {
            showError(t('game.loadFailed.link'), err);
        });
}

onMounted(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const requestedGameId = searchParams.get('gameId');
    const link = searchParams.get('link');
    let name = searchParams.get('name');

    if(requestedGameId && requestedGameId !== DEFAULT_GAME_ID) {
        showError(t('game.loadFailed'), new Error(`unsupported gameId: ${requestedGameId}`));
        return;
    }

    if(link) {
        if(name) {
            name = FileNameHandler.fileNameToBlueprintName(name + '.txt');
        }
        fetchLink(requestedGameId || DEFAULT_GAME_ID, link, name);
        return;
    }

    loadGameData(DEFAULT_GAME_ID);
});
</script>

<template>
    <v-card v-if="!isReady" title="正在加载 Captain of Industry 数据…" variant="outlined">
        <v-card-text class="d-flex align-center justify-center pa-8">
            <v-progress-circular v-if="isLoading" indeterminate color="primary" />
        </v-card-text>
    </v-card>
</template>
