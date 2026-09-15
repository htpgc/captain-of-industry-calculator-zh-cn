<!--
Author: Alexey Usov (dax@xdax.ru, https://github.com/doubleaxe)
Please don't remove this comment if you use unmodified file
-->
<script setup lang="ts">
import {ref, computed, reactive, unref, watch, onMounted} from 'vue';
import type {RecipeIOModel} from '@/scripts/model/store';
import {
    injectBlueprintModel,
    type BlueprintItemModel,
} from '@/scripts/model/store';
import {injectSettings} from '@/scripts/settings';
import RecipesMenu from './recipes-menu.vue';
import RecipeSuggestionMenu from './recipe-suggestion-menu.vue';
import {syncRefs, useEventListener, type MaybeElement} from '@vueuse/core';
import {
    SelectedClassType,
    useDragAndScroll,
    useItemDragAndDrop,
    useLeftPanelDragAndDrop,
    useLinkDragAndDrop,
    useOverflowScroll,
    usePointAndClick,
    useSharedBlueprintSurface,
    screenToClient,
} from '@/composables/drag-helpers';
import {useEventHook} from '@/composables';
import {injectFilter} from '@/scripts/filter';
import {Rect, type ReadonlyPointType} from '@/scripts/geometry';
import type {GameItem, GameRecipe} from '#types/game-data';
import {buildTransformStyle} from '@/scripts/util';

const settings = injectSettings();
const filter = injectFilter();
const blueprintModel = injectBlueprintModel();
const blueprintSurface = ref<MaybeElement>(null);
const blueprintCollection = ref<MaybeElement>(null);
const recipesMenuElement = ref<InstanceType<typeof RecipesMenu> | null>(null);
const recipeSuggestionMenuElement = ref<InstanceType<typeof RecipeSuggestionMenu> | null>(null);
//detects if screen was scrolled between pointer down and click, don't perform anything if was scrolled
let wasScrolled = false;

const {onStart: startDragAndScroll} = useDragAndScroll();
useOverflowScroll(blueprintSurface);
const {
    hooks: leftPanelHooks,
    dropZoneSurfaceElem: dropZoneSurfaceElem1,
    dropZoneOriginElem: dropZoneOriginElem1,
} = useLeftPanelDragAndDrop();
const {
    dropZoneSurfaceElem: dropZoneSurfaceElem2,
    dropZoneOriginElem: dropZoneOriginElem2,
} = useLinkDragAndDrop();
const {
    hooks: itemHooks,
    dropZoneSurfaceElem: dropZoneSurfaceElem3,
    dropZoneOriginElem: dropZoneOriginElem3,
} = useItemDragAndDrop();
const {
    processSelected,
    parentElem: dropZoneOriginElem4,
    notifySelected,
} = usePointAndClick();
const {surfaceElem, originElem, updateSurface, boundingRect} = useSharedBlueprintSurface();

syncRefs(blueprintSurface, [
    surfaceElem,
    dropZoneSurfaceElem1,
    dropZoneSurfaceElem2,
    dropZoneSurfaceElem3,
]);
syncRefs(blueprintCollection, [
    originElem,
    dropZoneOriginElem1,
    dropZoneOriginElem2,
    dropZoneOriginElem3,
    dropZoneOriginElem4,
]);

function addItem(selected: GameItem, clientPosition: ReadonlyPointType) {
    const item = reactive(blueprintModel.addItem(selected.name));
    item.setRect(item.rect.assignPoint(clientPosition));
    if(filter.key) {
        const preselectRecipe = item.possibleRecipeForItem(
            filter.key,
            filter.direction,
        );
        if(preselectRecipe) item.selectRecipe(preselectRecipe);
    }
}
useEventHook(leftPanelHooks.notifyDrop, (param) =>
    addItem(param.item, param.clientRect),
);

useEventHook(notifySelected, (param) => {
    if(wasScrolled) {
        return;
    }
    if(param.item.clazz == SelectedClassType.Item) {
        addItem(param.item.item as GameItem, param.clientPosition);
        param.wasHandled();
        return;
    }
    if(param.item.clazz == SelectedClassType.BlueprintItemModel) {
        const item = param.item.item as BlueprintItemModel;
        item.setRect(
            item.rect.assignPoint(param.clientPosition).limit(unref(boundingRect)),
        );
        param.wasHandled();
        return;
    }
});

useEventHook([itemHooks.notifyMove, itemHooks.notifyDrop], (param) => {
    const item = param.item;
    item.setRect(
        item.rect.assignPoint(param.clientRect).limit(unref(boundingRect)),
    );
    if(param.event == 'notifyDrop') {
        updateSurface(blueprintModel.items);
    }
});

const scaleStyle = computed(() => ({
    transform: buildTransformStyle({scale: String(settings.scale)}),
}));

watch(
    [() => blueprintModel.itemsGenerationNumber, () => settings.scale],
    () => {
        const resetScroll = !blueprintModel.itemsGenerationNumber;
        updateSurface(blueprintModel.items, resetScroll);
    },
);

function handleScale(event: WheelEvent) {
    if(settings.scrollScaleEnabled) {
        if(event.deltaY < 0) {
            settings.scale = Math.min(settings.scale + 0.1, 2);
        } else {
            settings.scale = Math.max(settings.scale - 0.1, 0.2);
        }
        event.stopPropagation();
        event.preventDefault();
    }
}

useEventListener(
    'scroll',
    () => {
        wasScrolled = true;
    },
    {capture: true, passive: true},
);
onMounted(() => {
    updateSurface(blueprintModel.items);
});

function openSuggestionMenu(
    productName: string,
    sourceItemId: string,
    screenPosition: ReadonlyPointType,
    mode: 'consuming' | 'producing',
) {
    recipeSuggestionMenuElement.value?.activate(
        productName,
        sourceItemId,
        screenPosition,
        mode,
    );
}

// Handle output dropped in empty space - show recipe suggestions for consumers
function handleOutputDroppedEmpty(
    productName: string,
    sourceItemId: string,
    screenPosition: ReadonlyPointType,
) {
    openSuggestionMenu(productName, sourceItemId, screenPosition, 'consuming');
}

// Handle input dropped in empty space - show recipe suggestions for producers
function handleInputDroppedEmpty(
    productName: string,
    sourceItemId: string,
    screenPosition: ReadonlyPointType,
) {
    openSuggestionMenu(productName, sourceItemId, screenPosition, 'producing');
}

// Single-click on an IO icon opens the same source/target menu as dragging to empty space.
function handleIoSuggestionMenuActivate(
    io: RecipeIOModel,
    screenPosition: ReadonlyPointType,
) {
    const productName = io.name;
    const sourceItemId = io.ownerItem?.key;
    if(!productName || !sourceItemId)
        return;

    openSuggestionMenu(
        productName,
        sourceItemId,
        screenPosition,
        io.isInput ? 'producing' : 'consuming',
    );
}

// Handle recipe selected from suggestion menu - create factory and link
function handleRecipeSelected(
    factory: GameItem,
    recipe: GameRecipe,
    productName: string,
    sourceItemId: string,
    screenPosition: ReadonlyPointType,
    mode: 'consuming' | 'producing',
) {
    const collectionEl = unref(blueprintCollection) as HTMLElement | null;
    if(!collectionEl) return;

    const clientPosition = screenToClient(
        collectionEl,
        Rect.assign(screenPosition),
        settings.scale,
    );

    const newItem = reactive(blueprintModel.addItem(factory.name));
    newItem.setRect(
        newItem.rect.assignPoint(clientPosition).limit(unref(boundingRect)),
    );
    newItem.selectRecipe(recipe.name);

    const linkedItem = blueprintModel.itemByKey(sourceItemId);
    if(!linkedItem) return;

    if(mode === 'consuming') {
        const outputs = linkedItem.selectedRecipe?.visibleOutput() || [];
        for(const output of outputs) {
            if(output.name === productName) {
                newItem.createLink(output);
                updateSurface(blueprintModel.items);
                return;
            }
        }
    } else {
        const inputs = linkedItem.selectedRecipe?.visibleInput() || [];
        for(const input of inputs) {
            if(input.name === productName) {
                const sourceOutput = newItem.selectedRecipe
                    ?.visibleOutput()
                    ?.find((output) =>
                        output.name === productName
                        || (
                            output.isAbstractClassItem
                            && !output.isMatherialized
                            && output.type === input.type
                        ),
                    );
                if(!sourceOutput)
                    return;

                linkedItem.createLink(sourceOutput as RecipeIOModel);
                updateSurface(blueprintModel.items);
                return;
            }
        }
    }
}
</script>

<template>
    <div
        ref="blueprintSurface"
        class="blueprint-surface"
        @pointerdown.left="
            startDragAndScroll($event);
            wasScrolled = false;
        "
        @click="processSelected($event)"
        @wheel="handleScale"
    >
        <div
            ref="blueprintCollection"
            class="blueprint-collection"
            :style="scaleStyle"
        >
            <link-draggable
                @output-dropped-empty="handleOutputDroppedEmpty"
                @input-dropped-empty="handleInputDroppedEmpty"
            />
            <recipes-menu ref="recipesMenuElement" />
            <recipe-suggestion-menu
                ref="recipeSuggestionMenuElement"
                @recipe-selected="handleRecipeSelected"
            />
            <blueprint-links />
            <optimized-tooltip>
                <template v-for="item in blueprintModel.items" :key="item.key">
                    <blueprint-single-item
                        :item="item"
                        :parent="blueprintCollection"
                        @recipes-menu-activate="recipesMenuElement?.activate"
                        @suggestion-menu-activate="handleIoSuggestionMenuActivate"
                    />
                </template>
            </optimized-tooltip>
        </div>
    </div>
</template>

<style scoped>
.blueprint-surface {
    transform-origin: 0 0;
    min-width: 100%;
    min-height: 100%;
}
.blueprint-collection {
    transform-origin: 0 0;
    position: relative;
    overflow: visible;
}
</style>
