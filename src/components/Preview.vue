<script>
import { useContentStore } from '../store/content';
import * as showdown from 'showdown';

export default {
    name: 'preview',

    data() {
        return {
            contentStore: useContentStore(),
            content: '',
            converter: null,
            ratio: 1.4143,
        }
    },

    created() {
        this.converter = new showdown.Converter();
        this.content = this.contentStore.content;
        this.contentStore.$subscribe((mutation, state) => {
            this.content = state.content;
            this.$nextTick(() => this.setHeight());
        });
    },

    mounted() {
        this.setHeight();
        this.setHeightOnResize();
    },

    computed: {
        pages() {
            return this.contentStore.pages;
        }
    },

    methods: {
        setHeightOnResize() {
            window.onresize = () => this.setHeight();
        },

        setHeight() {
            if (!this.$refs.previewContent) return;
            const width = this.$refs.previewContent[0].getBoundingClientRect().width;
            this.$refs.previewContent.forEach(element => {
                element.style.height = `${width * this.ratio}px`;
            });
        },

        getPages(content) {
            return Object.values(content);
        }
    }
}

</script>

<template>
    <section class="preview">
        <!-- <div v-html="parsedContent" id="preview-content" class="dnd-like" ref="previewContent"></div> -->
        <div
            v-for="page in pages"
            v-html="page"
            class="dnd-like preview-content"
            ref="previewContent"></div>
    </section>
</template>

<style scoped>
    .preview {
        background-color: #f2f2f2;
        height: 100%;
        width: 50%;
        padding: 40px;
        overflow-y: scroll;
    }
</style>