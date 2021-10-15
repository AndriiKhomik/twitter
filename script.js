const BASE_URL = 'https://ajax.test-danit.com/api/json/';

const makeRequest = url => fetch(url).then(response => {
  if (response.ok) {
    return response.json()
  } else {
    throw new Error('Server Error')
  }
});

const renderMainStructure = (tagName, classNames = [], text = '') => {
  const el = document.createElement(tagName);
  el.classList.add(...classNames);
  el.innerText = text;
  document.querySelector('#root').append(el);

};

renderMainStructure('h2', ['title', 'text-center'], 'Application like a Twitter');
renderMainStructure('div', ['container'], );

class Card {
  constructor({title, body: text, name, username, email, postsId}) {
    this.title = title;
    this.text = text;
    this.name = name;
    this.username = username;
    this.email = email;
    this.postsId = postsId;
    this.render();
  }

  createElement(element, classNames = [], text = '') {
    const el = document.createElement(element);
    el.classList.add(...classNames);
    el.innerText = text;
    return el;
  }

  render() {
    const card = this.createElement('article', ['card']);
    const title = this.createElement('h3', ['title', 'text-center'], `Post title: ${this.title}`);
    const text = this.createElement('p', undefined, this.text);
    const name = this.createElement('p', undefined, `Author\'s name: ${this.name}`);
    const username = this.createElement('p', undefined, `Author\'s nickname: ${this.username}`);
    const mail = this.createElement('p', ['mail'], `E-mail: ${this.email}`);
    this.button = this.createElement('button', ['btn', 'btn-danger'], 'Delete post');
    card.append(...[title, text, name, username, mail, this.button]);

    document.querySelector('.container').append(card);

    this.addButtonListener();
  }

  addButtonListener() {
    this.button.addEventListener('click', event => {
      if (event.target.classList.contains('btn')) {
        this.deleteRequest();
        event.target.closest('.card').remove()
      }
    });
  }

  deleteRequest() {
    fetch(`https://ajax.test-danit.com/api/json/posts/${this.postsId}`, {
      method: 'DELETE',
      body: JSON.stringify()
    });
  }
}

const renderCard = (users, {title, body, userId, id: postsId}) => {
  users.map(({name, id, username, email}) => {
    if (userId === id) {
      new Card({
        title,
        body,
        name,
        username,
        email,
        postsId
      });
    }
  });
};

const renderPost = (posts) => posts.map((post) => makeRequest(`${BASE_URL}/users`)
  .then(users => renderCard(users, post)));

const requestPosts = makeRequest(`${BASE_URL}/posts`)
  .then(posts => renderPost(posts));




