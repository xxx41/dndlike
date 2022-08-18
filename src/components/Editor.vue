<script>
    import * as ace from 'brace';
    import 'brace/theme/monokai';
    import 'brace/mode/markdown';
    import { useContentStore } from '../store/content';

    export default {
        name: 'editor',

        data() {
            return {
                editor: null,
                contentStore: useContentStore(),
                options: { maxLines: Infinity },
                tags: {
                    page: { text: 'New Page', value: '--page--', default: '--page--' },
                    h1: { text: 'Heading 1', value: '#', default: 'Heading 1' },
                    h2: { text: 'Heading 2', value: '##', default: 'Heading 2' },
                    h3: { text: 'Heading 3', value: '###', default: 'Heading 3' },
                    h4: { text: 'Heading 4', value: '####', default: 'Heading 4' },
                }
            }
        },

        mounted() {
            this.editor = ace.edit('editor');
            this.editor.setTheme("ace/theme/monokai");
            this.editor.session.setMode('ace/mode/markdown');
            this.editor.setOptions(this.options);
            this.editor.setValue(this.contentStore.parsedContent, 1);
            this.editor.on('change', (event) => {
                this.contentStore.setContent(this.editor.getValue());
            });
        },

        methods: {
            insertTag(tag) {
                const lineBreak = this.hasToInsertOnNewLine() ? '\n\n': '';
                const content = `${lineBreak} ${tag.value} ${tag.default}`;
                this.contentStore.content += content;
                this.editor.setValue(this.contentStore.content, 1);
            },

            hasToInsertOnNewLine() {
                const lines = this.editor.session.doc.getAllLines();
                return lines.length > 1 || lines[0].length !== 0;
            }
        }
    }
</script>

<template>
    <div class="editor">
        <!-- <div class="editor-nav">
            <button v-for="tag in tags" @click="insertTag(tag)">{{ tag.text }}</button>
        </div> -->
        <section id="editor" class="editor-content"></section>
    </div>
</template>

<style scoped>
    .editor {
        align-items: center;
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
        justify-content: center;
        width: 50%;
        overflow-y: scroll;
    }

    .editor-nav {
        align-items: center;
        display: flex;
        justify-content: flex-start;
        gap: 0 5px;
        height: 30px;
        padding: 0 15px;
        width: 100%;
    }

    .editor-content {
        height: calc(100% - 30px) !important;
        width: 100%;
    }
</style>