<script>
    export default {
        name: 'document',

        components: {  },
    }
</script>

<template>
    <section class="document">
        <select name="cars" id="cars" class="document__item">
            <option value="select document">Select document</option>
        </select>
        <div class="document__name document__item">
            <label for="document-name">Document name</label>
            <input type="text" placeholder="Document name" value="dndlike.md" id="document-name">
        </div>
        <div class="document__save document__item">Save document</div>
        <div class="document__save document__item">New document</div>
    </section>
</template>

<style scoped>
    .document {
        align-items: center;
        border-bottom: solid 1px rgba(255,255,255,0.5);
        display: flex;
        height: 50px;
        justify-content: space-between;
        padding: 0 1rem;
    }

    .document__item {
        align-items: center;
        background: #3a3a3a;
        cursor: default;
        display: flex;
        height: 100%;
        justify-content: center;
        padding: 0 15px;
        user-select: none;
    }

    .document__item:hover {
        opacity: 0.8;
    }

    .document__item:active {
        transform: scale(0.95);
    }
</style>