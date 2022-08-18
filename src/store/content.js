import { defineStore } from 'pinia';
import * as showdown from 'showdown';

export const useContentStore = defineStore({
  id: 'content',

  state: () => ({
    content: {
      page1: '# Title'
    },
    currentPage: 1,
    maxLength: 2500,
    converter: new showdown.Converter(),
    pageTag: '-- page --',
  }),

  getters: {
    parsedContent() {
      let content = '';
      Object.values(this.content).forEach(value => {
        content += `-- page -- ${value}`;
      });

      return content;
    },

    pages() {
      let pages = [];
      Object.values(this.content).forEach(value => {
        let title = '';
        let titleUntilIndex = value.search('\n');
        if (titleUntilIndex === -1) titleUntilIndex = value.length;
        [title, value] = [value.slice(0, titleUntilIndex).replace('#', ''), value.slice(titleUntilIndex)]

        const column1 = value.substring(0, this.maxLength);
        const column2 = value.substring(this.maxLength + 1, this.maxLength * 2);
        let column1Html = this.converter.makeHtml(column1);
        let column2Html = this.converter.makeHtml(column2);
        pages.push(`
            <h1 class="title">${title}</h1>
            <div class="column1 column">${column1Html}</div>
            <div class="column2 column">${column2Html}</div>`);
      });

      return pages;
    }
  },

  actions: {
    addPage(page) {
      this.content[`page${this.currentPage}`] = page;
      this.currentPage++;
    },

    incrementCurrentPage() {
      this.currentPage++;
    },

    setContent(content) {
      let currentPage = 1;
      this.content = {};
      while (content.search(this.pageTag) >= 0) {
        if (content.search(this.pageTag) >= 0) {

          content = content.replace(/-- page --/, '').trim();
          let nextPage = content.search(this.pageTag);
          if (nextPage >= 0) {
            this.content[`page${currentPage}`] = content.substring(0, nextPage);
            content = content.substring(nextPage);
          } else {
            this.content[`page${currentPage}`] = content;
          }

          currentPage++;
        }
      }

      Object.keys(this.content).forEach(key => {
        if (this.content[key] === '') delete this.content[key];
      })
    }
  }
})