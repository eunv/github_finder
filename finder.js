const img = document.getElementById('img');
const ghchart = document.getElementById('ghchart');
const input = document.getElementById('input');
const btn = document.getElementById('data-btn');
const nameElement = document.getElementById('name');
const portfolioElement = document.getElementById('portfolio');
const gistElement = document.getElementById('gist')
const locationElement = document.getElementById('location');
const repoElement = document.getElementById('repo');
const followersElement = document.getElementById('followers');
const followingsElement = document.getElementById('following');
const createdElement = document.getElementById('created');
const repositoriesDiv = document.getElementById('repositoriesDiv');

const fetchData = async () => {
  const username = input.value.trim(); // Get the trimmed username from the input field

  if (username === '') {
    return; // Exit the function if the username is empty
  }

  try {
    const { avatar_url, name, public_gists, blog, location, public_repos, followers, following, created_at } = await (await fetch(`https://api.github.com/users/${username}`)).json();
    const ghchart_url = `https://ghchart.rshah.org/${username}`;

    console.log(avatar_url.type);

    img.src = avatar_url;
    ghchart.src = ghchart_url;
    gistElement.textContent = public_gists;
    nameElement.textContent = name;
    portfolioElement.textContent = blog;
    locationElement.textContent = location;
    repoElement.textContent = public_repos;
    followersElement.textContent = followers;
    followingsElement.textContent = following;
    createdElement.textContent = created_at;

    if (fetch) {
      document.getElementById('container').style.display = "block"
    }
    const repositoriesData = await (await fetch(`https://api.github.com/users/${username}/repos`)).json();

    repositoriesDiv.innerHTML = ''; // Clear previous repository data

    repositoriesData.forEach(repo => {
      const repoDiv = document.createElement('div');
      repoDiv.classList.add('repository');

      repoDiv.innerHTML = `
          <div class="repos">
          <div class="repo-name">
          <span>${repo.name}</span>
          </div>
          <div class="repo-detail">
          <div class="repo-stars">
          <span>Stars: ${repo.stargazers_count}</span>
          </div>
          <div class="repo-watchers">
          <span>watchers: ${repo.watchers}</span>
          </div>
          <div class="repo-forks">
          <span>fork: ${repo.forks}</span>
          </div>
          </div>
          
          </div>
          

              
          `;

      repositoriesDiv.appendChild(repoDiv);
    });
  } catch (error) {
    console.log('Error:', error);
  }
};

// click button and call the function 
btn.addEventListener('click', fetchData);

// if anyone press enter then also they get the respone 
input.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    fetchData();
  }
});