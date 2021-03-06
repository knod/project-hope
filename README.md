# Local development
The very first time you start working on this repository (repo), you'll have to clone to your local machine. To do so, open your terminal and type the following command in the folder where you want your local repo to live: `git clone https://github.com/codeforboston/project-hope.git`. This will create a project named `project-hope` in the directory into which you typed the command. After that you type `cd project-hope` to get into that project folder so you can do further work.

In subsequent times, the workflow goes like this:
* Pull any updates to branches you'll be working with to make sure your files are as current as possible: `git pull origin`
* Create a new branch for yourself locally: `git checkout -b your-branch-name`
* Make your changes
* As you're making changes, feel free to stage (prep for saving) and commit (actually save) your changes as often as you'd like:
    * Stage all the changes you've made: `git add .`
    * Commit them: `git commit -m 'Describe your change here'`
* Feel free to push (upload) to your remote branch as often as you'd like (so long as you're the only one pushing to/working on this branch): `git push origin your-branch-name`. Whenever you do this the online branch will be updated with those changes.
* Someone can then do work on the other side, using pull requests to merge to the master branch of the project. If you're uncomfortable doing so, feel free to check with other team members.

If you wanna learn more see here: https://www.atlassian.com/git

For more about code development best practices, see the [wiki](https://github.com/codeforboston/project-hope/wiki).
