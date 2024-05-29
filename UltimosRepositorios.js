require('dotenv').config(); 

const username = 'WesleyS08';

async function fetchRepos() {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc`, {
        headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}` // Usando a variável de ambiente
        }
    });
    const repos = await response.json();
    return repos;
}

async function fetchUserStats() {
    const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}` // Usando a variável de ambiente
        }
    });
    const userData = await response.json();
    return userData;
}

async function displayRepos() {
    const repos = await fetchRepos();
    const reposContainer = document.getElementById('github-repos');

    // Limpar qualquer conteúdo pré-existente dentro do container
    reposContainer.innerHTML = '';

    // Pegar apenas os 4 últimos repositórios
    const latestRepos = repos.slice(0, 4);

    latestRepos.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.className = 'repo-card'; // Adicionando a classe repo-card
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

displayRepos();
displayUserStats();
