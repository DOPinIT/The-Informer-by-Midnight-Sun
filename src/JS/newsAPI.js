const KEY = 'S9P6gsklItZ6AfgyQULO5BfOKZag8n9Y';
const SECTIONS_URL =
  'https://api.nytimes.com/svc/news/v3/content/section-list.json?';

const SECTION_SEARCH_URL = 'https://api.nytimes.com/svc/news/v3/content/inyt/';

const ARTICLE_SEARCH_URL =
  'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';

const MOST_VIEWED_ARTICLES_URL =
  'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?';

class NewsApi {
  pageNumberBySearch = 0;

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
      `${SECTION_SEARCH_URL}${sectionName}.json?api-key=${KEY}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(data => data);
  }

  async articleSearchList(searchQuery, milliseconds) {
    let filterByDate = '';

    if (milliseconds) {
      filterByDate = `fq=pub_date:(${DateTimestamp.createTimestamp(
        milliseconds
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
      .then(data => data);
  }

  async getMostViewedArticles() {
    return await fetch(`${MOST_VIEWED_ARTICLES_URL}api-key=${KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(data => data);
  }
}

// Create timestamp for search request by date - 2020-02-01 - YYYY-MM-DD
class DateTimestamp {
  static createTimestamp(milliseconds) {
    const date = new Date(milliseconds);
    const year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();

    if (month < 10) {
      month = month.toString().padStart(2, '0');
    }
    if (day < 10) {
      day = day.toString().padStart(2, '0');
    }
    return `${year}-${month}-${day}`;
  }
}

const newsApi = new NewsApi();
const sectionListPromise = newsApi.getSectionList().then(sectionList => {
  console.log(sectionList);
});

const sectionName = 'business';

newsApi
  .getNewsListBySectionName(sectionName)
  .then(newsList =>
    console.log('News list by section name ', newsList.results)
  );

newsApi
  .articleSearchList('ukraine')
  .then(data => console.log('Search list by submit', data.response))
  .catch(error => console.log(error.message));

newsApi
  .getMostViewedArticles()
  .then(mostViewedArticles =>
    console.log('The most viewed articles ', mostViewedArticles.results)
  );
