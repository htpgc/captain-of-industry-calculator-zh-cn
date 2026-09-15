<!--
Author: Alexey Usov (dax@xdax.ru, https://github.com/doubleaxe)
Please don't remove this comment if you use unmodified file
-->
<script setup lang="ts">
import {t} from '@/scripts/i18n';
import {injectBlueprintModel} from '@/scripts/model/store';
import {mdiClose} from '@mdi/js';
import {useVModel} from '@vueuse/core';
import {ref, unref} from 'vue';

const props = defineProps<{
    modelValue: boolean;
}>();
const emit = defineEmits(['update:modelValue']);
const dialog = useVModel(props, 'modelValue', emit);
const roundingMode = ref('ceil');
const blueprintModel = injectBlueprintModel();

function applyFactoryCounts() {
    const roundToCeil = unref(roundingMode) === 'ceil';
    const setOne = unref(roundingMode) === 'one';
    blueprintModel.applyCalculatedFactoryCount((solvedCount) => {
        if(roundToCeil) {
            return Math.ceil(solvedCount);
        }
        if(setOne) {
            return 1;
        }
        return solvedCount;
    });
    dialog.value = false;
}
</script>

<template>
    <v-dialog v-model="dialog">
        <v-sheet>
            <v-toolbar>
                <v-toolbar-title>{{ t('counts.autoApply') }}</v-toolbar-title>
                <v-spacer />
                <v-btn
                    :icon="mdiClose"
                    @click="dialog = false"
                />
            </v-toolbar>
            <v-container>
                <v-alert type="warning">
                    This will apply automatically calculated factory counts for all factories.
                    In result manually set counts will be equal to automatically calculated ones.
                </v-alert>
                <v-row dense class="mt-2">
                    <v-col>
                        <v-radio-group v-model="roundingMode" inline>
                            <v-radio
                                :label="t('counts.roundUp')"
                                value="ceil"
                            />
                            <v-radio
                                :label="t('counts.setFractional')"
                                value="fractional"
                            />
                            <v-radio
                                :label="t('counts.setOne')"
                                value="one"
                            />
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-row dense class="mt-2">
                    <v-col>
                        <v-btn
                            color="primary"
                            block
                            @click="applyFactoryCounts()"
                        >{{ t('counts.title') }}</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </v-dialog>
</template>
