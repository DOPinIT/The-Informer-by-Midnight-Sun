import DateTimestamp from './DateTimestamp';
import {
  sectionResponseMarkup,
  favoriteResponseMarkup,
  searchResponseMarkup,
} from './markup';

const KEY = 'S9P6gsklItZ6AfgyQULO5BfOKZag8n9Y';
const SECTIONS_URL =
  'https://api.nytimes.com/svc/news/v3/content/section-list.json?';

const SECTION_SEARCH_URL = 'https://api.nytimes.com/svc/news/v3/content/inyt/';

const ARTICLE_SEARCH_URL =
  'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';

const MOST_VIEWED_ARTICLES_URL =
  'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?';

export default class NewsApi {
  pageNumberBySearch = 0;
  hits = 0;
  totalNumberOfPages = 0;

  sections = '';
  constructor() {}

  set pageNumberBySearch(numberOfPage) {
    this.pageNumberBySearch = numberOfPage;
  }

  increasePageNumber() {
    this.pageNumberBySearch += 1;
  }

  decreasePageNumber() {
    if (this.pageNumberBySearch === 0) {
      return;
    }
    this.pageNumberBySearch -= 1;
  }

  async getSectionList() {
    return await fetch(`${SECTIONS_URL}api-key=${KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(data => {
        if (data.num_results === 0) {
          throw new Error();
        }

        this.sections = data.results.map(element => element.section);
        return data.results.map(element => element.display_name);
      });
  }

  async getNewsListBySectionName(sectionName) {
    return await fetch(
      `${SECTION_SEARCH_URL}${sectionName.toLowerCase()}.json?api-key=${KEY}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(data => data.results);
  }

  async articleSearchList(searchQuery, milliseconds) {
    let filterByDate = '';

    if (milliseconds) {
      filterByDate = `fq=pub_date:(${DateTimestamp.createTimestamp(
        milliseconds,
        '-'
      )})`;
    }

    return await fetch(
      `${ARTICLE_SEARCH_URL}${searchQuery}&api-key=${KEY}&${filterByDate}&page=${this.pageNumberBySearch}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('We did not find anything');
        }
        return response.json();
      })
      .then(data => data.response)
      .then(data => {
        data.meta.hits > 1000
          ? (this.hits = 1000)
          : (this.hits = data.meta.hits);
        this.totalNumberOfPages = Math.ceil(this.hits / 10);
        return data.docs;
      });
  }

  async getMostViewedArticles() {
    return await fetch(`${MOST_VIEWED_ARTICLES_URL}api-key=${KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(data => data.results);
  }
}

const newsApi = new NewsApi();
const gallery = document.querySelector('.card');

// проверка обработчика для search
/* newsApi
  .articleSearchList('ukraine')
  .then(response => {
    const pageMarkup = searchResponseMarkup(response);
    gallery.insertAdjacentHTML('beforeend', pageMarkup);
  })
  .catch(error => console.log(error.message));
 */

// проверка обработчика для favorite

/* newsApi
  .getMostViewedArticles()
  .then(mostViewedArticles => {
    console.log('The most viewed articles ', mostViewedArticles);
    gallery.innerHTML = favoriteResponseMarkup(mostViewedArticles);
  })
  .catch(error => console.log(error.message)); */

// проверка обработчика для section запросов
/* const sectionName = 'business';

newsApi
  .getNewsListBySectionName(sectionName)
  .then(newsList => {
    console.log(newsList);
    if (newsList === null) {
      throw new Error();
    }
    const sectionMarkup = sectionResponseMarkup(newsList);
    console.log(sectionMarkup);
    console.log(gallery);
    gallery.insertAdjacentHTML('beforeend', sectionMarkup);
  })
  .catch(error => error.message); */
