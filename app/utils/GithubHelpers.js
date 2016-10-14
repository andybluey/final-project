import axios from 'axios';

const GithubHelpers = {
  getCommitInfo: () => {
    // console.log(username);
    return axios.get( `https://api.github.com/events?client_id=8420fd99e9d49bb26114&client_secret=2a5b8f9fbde8942cd23e3de2523899746133ed3d` );
  },

  getUserInfo: (username) => {
    // console.log(username);
    return axios.get( `https://api.github.com/users/${username}?client_id=8420fd99e9d49bb26114&client_secret=2a5b8f9fbde8942cd23e3de2523899746133ed3d` );
  },

  getUserRepos: (username) => {
    return axios.get( `https://api.github.com/users/${username}/repos?client_id=8420fd99e9d49bb26114&client_secret=2a5b8f9fbde8942cd23e3de2523899746133ed3d` );
  },

  getUserActivity: (username) => {
    return axios.get( `https://api.github.com/users/${username}/events?client_id=8420fd99e9d49bb26114&client_secret=2a5b8f9fbde8942cd23e3de2523899746133ed3d` );
  },


  // getUserRepoScore: (username) => {
  //   return repos.data.map(function () {
  //     return (current.stargazers_count * 5) + (current.watchers * 1) + (current.forkers * 3);
  //   });
  // }

};



export default GithubHelpers;
