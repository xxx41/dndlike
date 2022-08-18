<script>
    import PdfConverter from './PdfConverter.vue';

    export default {
        name: 'header-nav',

        components: { PdfConverter },
    }
</script>

<template>
    <header class="header">
        <span>DNDLIKE</span>
        <PdfConverter />
    </header>
</template>

<style scoped>
    .header {
        align-items: center;
        border-bottom: solid 1px rgba(255,255,255,0.5);
        display: flex;
        height: 50px;
        justify-content: space-between;
        padding: 0 1rem;
    }

    .header__item {
        align-items: center;
        background: #3a3a3a;
        cursor: default;
        display: flex;
        height: 100%;
        justify-content: center;
        padding: 0 15px;
        user-select: none;
    }

    .header__item:hover {
        opacity: 0.8;
    }

    .header__item:active {
        transform: scale(0.95);
    }
</style>