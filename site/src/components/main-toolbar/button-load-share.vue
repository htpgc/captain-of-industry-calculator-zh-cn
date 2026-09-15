<!--
Author: Alexey Usov (dax@xdax.ru, https://t.me/doubleaxe, https://github.com/doubleaxe)
Please don't remove this comment if you use unmodified file
-->
<script setup lang="ts">
import {t} from '@/scripts/i18n';
import {ref} from 'vue';
import {mdiCloudDownload, mdiFolderOutline} from '@mdi/js';
import {injectSettings} from '@/scripts/settings';

const settings = injectSettings();
const showShareDialog = ref(false);
</script>

<template>
    <tooltip-button
        :tooltip="t('share.loadBlueprint')"
        :icon="settings.isTouchDevice ? mdiCloudDownload : mdiFolderOutline"
        @click="showShareDialog = true"
    />
    <div class="d-none">
        <load-share-dialog v-model="showShareDialog" />
    </div>
</template>
