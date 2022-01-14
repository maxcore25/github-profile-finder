$(document).ready(function () {
  $('#searchUser').on('keyup', function (e) {
    let username = e.target.value;

    // Make request to GitHub
    $.ajax({
      url: `https://api.github.com/users/${username}`,
      data: {
        client_id: '',
        client_secret: '',
      },
    }).done(function (user) {
      console.log(user);
      $.ajax({
        url: `https://api.github.com/users/${username}/repos`,
        data: {
          client_id: '',
          client_secret: '',
          sort: 'created: asc',
          per_page: 5,
        },
      }).done(function (repos) {
        $.each(repos, function (index, repo) {
          $('#repos').append(`
            <div class="well">
                <div class="row">
                    <div class="col-md-7">
                        <strong>${repo.name}</strong>: ${repo.description}
                    </div>
                    <div class="col-md-3">
                        <span class="label label-default">Forks: ${repo.forks_count}</span>
                        <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                        <span class="label label-success">Stars: ${repo.stargazers_count}</span></div>
                    <div class="col-md-2">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                    </div>
                </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
            <div class="card-header">${user.login}</div>
            <div class="card-body">
                
                <div class="row">
                    <div class="col-md-3">
                        <img style="width: 100%" class="thumbnail avatar" src="${user.avatar_url}" alt="Avatar">
                        <a class="btn btn-primary btn-block" target="_blank" href="${user.html_url}">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="label label-default">Public Repos: ${user.public_repos}</span>
                        <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                        <span class="label label-success">Followers: ${user.followers}</span>
                        <span class="label label-info">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `);
    });
  });
});
