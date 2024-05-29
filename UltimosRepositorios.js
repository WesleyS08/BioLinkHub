import config from './config.js'; // Importando o arquivo de configuração
const username = 'WesleyS08';
const GITHUB_TOKEN = config.GITHUB_TOKEN;



async function fetchRepos() {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc`, {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`
        }
    });
    const repos = await response.json();
    return repos;
}

async function fetchUserStats() {
    const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`
        }
    });
    const userData = await response.json();
    return userData;
}

async function displayRepos() {
    const repos = await fetchRepos();
    const reposContainer = document.getElementById('github-repos');
    reposContainer.innerHTML = '';
    const latestRepos = repos.slice(0, 4);

    latestRepos.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.className = 'repo-card';
        repoElement.innerHTML = `
            <a href="${repo.html_url}" target="_blank" class="repo-link">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
            </a>
        `;
        reposContainer.appendChild(repoElement);
    });
}

async function displayUserStats() {
    const userData = await fetchUserStats();
    const statsSpan = document.getElementById('github-stats');
    statsSpan.textContent = `Repos: ${userData.public_repos}, Followers: ${userData.followers}, Following: ${userData.following}`;
}

function init() {
    displayRepos();
    displayUserStats();
}

init(); // Chamar a função de inicialização para iniciar o processo
