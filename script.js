'use strict';


const apiKey = 'oQjOhD1OQHUY43juyzzcDxWQyEjl5IxVFceSqeAx';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getValue() {
  $('form').submit(event => {
    event.preventDefault();
    let parkValue = $('.value').val();
    let maxResults = $('#js-max-results').val();
    getNationalParks(parkValue, maxResults); 
    console.log(parkValue);
  });
}

function getNationalParks(query, maxResults) {
  let params = {};
  for(let i = 0; i < query.length; i++){
    if(query[2] === ','){
      params = {
        api_key: apiKey,
        stateCode: query.split(','),
        limit: maxResults,
      };
    }else if(query.length === 2){
      params = {
        api_key: apiKey,
        stateCode: query,
        limit: maxResults,
      };
    }else{
      params = {
        api_key: apiKey,
        q: query,
        limit: maxResults,
      };
    }
  }
  
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getNationalParkState(query, maxResults) {
  const params = {
    api_key: apiKey,
    stateCode: query,

    limit: maxResults,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  
  $('.results').empty();
  console.log(responseJson.data.length);
  for (let i = 0; i < responseJson.data.length & i<maxResults ; i++){
    console.log('Start');
    console.log(responseJson.data[1].url);
    $('.results').append(
      `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></h3>
      <p>${responseJson.data[i].fullName}</p>
      <p>${responseJson.data[i].description}</p>
      </li>`
    )};
  console.log('Finished');
}


getValue();