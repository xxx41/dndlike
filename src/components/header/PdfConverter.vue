<script>
import { jsPDF } from 'jspdf';

export default {
    name: 'pdf-converter',

    data() {
        return {
            pdf: null,
        }
    },

    mounted() {
        this.pdf = new jsPDF();
    },

    methods: {
        async exportPdf() {
            const css = await fetch('./src/assets/styles/dnd-like.css');
            const result = await css.text();
            const init = result.search('#init');
            const finish = result.search('#finish');
            const cssString = result.substring(init + 8, finish - 3).replaceAll('\\n', ' ');
            const divContents = document.querySelector('.preview').innerHTML;
            const printWindow = window.open('', '', 'height=400,width=800');
            printWindow.document.write('<html><head><title>DIV Contents</title>');
            printWindow.document.write(`<style>${cssString}</style>`)
            printWindow.document.write(`</head><body>${divContents}</body></html>`);
            printWindow.document.write('');
            printWindow.document.close();

            window.setTimeout(() => {
                printWindow.print();
            }, 500);
        }
    }
}
</script>

<template>
    <div class="pdf-converter header__item" @click="exportPdf">Export as PDF</div>
</template>