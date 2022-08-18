<script>
import HeaderNav from './components/header/HeaderNav.vue';
import Document from './components/Document.vue';
import Editor from './components/Editor.vue';
import Preview from './components/Preview.vue';

export default {
    name: 'app',
    components: { HeaderNav, Document, Editor, Preview },
}
</script>

<template>
    <HeaderNav />
    <Document />
    <div class="main">
        <Editor />
        <Preview />
    </div>
</template>

<style scoped>
.main {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: calc(100vh - 100px);
    justify-content: center;
}
</style>