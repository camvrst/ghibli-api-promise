/* eslint-disable prefer-const */
import './style.scss';
import { filmsImg } from './data/data';
import { truncateStr } from './helpers/truncateStr';

const render = () => {
  const app = document.getElementById('App');
  const ghibliFilms = {
    titles: [],
    description: [],
    img: [],
    date: [],
    url: [],
  };

  // FETCH URL
  const getGhibliApi = () => fetch('https://ghibliapi.herokuapp.com/films').then((res) => res.json());

  // GET THE DATA, MAP & THEN PUSH THE TO GHIBLI OBJ
  getGhibliApi().then((data) => {
    console.log(data);
    data.map((d) => ghibliFilms.titles.push(d.title));
    data.map((d) => ghibliFilms.description.push(d.description));
    filmsImg.map((img) => ghibliFilms.img.push(img));
    data.map((d) => ghibliFilms.date.push(d.release_date));
    data.map((d) => ghibliFilms.url.push(encodeURI(`https://www.studioghibli.com.au/${d.title.replace(/[^a-zA-Z]/g, '').toLowerCase()}`)));
    console.log(ghibliFilms);
    // DOM MANIP
    for (let i = 0; i < ghibliFilms.titles.length; i++) {
      app.innerHTML += `
        <div class="ghibli-card">
            <h1>${ghibliFilms.titles[i]} </h1>
            <h2> (${ghibliFilms.date[i]}) </h2>
            <p>${truncateStr(ghibliFilms.description[i], 150)}</p>
            <a href="${ghibliFilms.url[i]}" target="_blank"> Discover more </a>
            <img src="./images/${ghibliFilms.img[i]}.jpg"/>
        </div>
        `;
    }
    // end of promise
  });
};
render();
