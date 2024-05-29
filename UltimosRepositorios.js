const username = 'WesleyS08';

async function fetchGitHubData() {
    const reposResponse = await fetch('https://raw.githubusercontent.com/seu-usuario/seu-repositorio/main/repos.json');
    const userResponse = await fetch('https://raw.githubusercontent.com/seu-usuario/seu-repositorio/main/user.json');
    const repos = await reposResponse.json();
    const userData = await userResponse.json();
    return { repos, userData };
}

async function displayRepos() {
    const data = await fetchGitHubData();
    const repos = data.repos;
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
    const data = await fetchGitHubData();
    const userData = data.userData;
    const statsSpan = document.getElementById('github-stats');
    statsSpan.textContent = `Repos: ${userData.public_repos}, Followers: ${userData.followers}, Following: ${userData.following}`;
}

displayRepos();
displayUserStats();
