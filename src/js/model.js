import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';
import { RESULTS_PER_PAGE } from './config';

export const state = {
  recipe: {},
  results: [],
  resultsPerPage: RESULTS_PER_PAGE,
  currentPage: 1,
};

// Doesn't return anything, only changes the state object
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`${err} ❌`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} ❌`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.currentPage) {
  state.currentPage = page;
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;

  return state.results.slice(start, end);
};
