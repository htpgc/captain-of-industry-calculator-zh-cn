<!--
Author: Alexey Usov (dax@xdax.ru, https://github.com/doubleaxe)
Please don't remove this comment if you use unmodified file
-->
<script setup lang="ts">
import {t} from '@/scripts/i18n';
import {useVModel} from '@vueuse/core';
import {knownLayoutAlgorithms, LayoutType} from '@/scripts/graph';

const props = defineProps<{
    modelValue: string;
}>();
const emit = defineEmits(['update:modelValue']);
const selectedAlgorithm = useVModel(props, 'modelValue', emit);
</script>

<template>
    <v-select
        v-model="selectedAlgorithm"
        :items="knownLayoutAlgorithms(LayoutType.ELK).algorithms"
        :label="t('layout.elk')"
        density="compact"
    >
        <template #details>
            Default - {{ knownLayoutAlgorithms(LayoutType.ELK).default }}, see&nbsp;
            <a href="https://www.eclipse.org/elk/reference.html" target="_blank">https://www.eclipse.org/elk/reference.html</a>.
        </template>
    </v-select>
</template>
