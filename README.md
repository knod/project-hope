# Local development
The very first time you start working on this repo, you'll have to clone to your local machine. To do so, open your terminal and type the following command in the folder where you want your local repo to live: `git clone https://github.com/codeforboston/project-hope.git`. This will create a project named `project-hope` in the directory into which you type the command

In subsequent times, the workflow goes like this:
* Pull any updates to branches recently: `git pull origin`
* Create a new branch for yourself: `git checkout -b your-branch-name`
* Make your changes
* As you're making changes, feel free to stage and commit your changes as often as you'd like:
    * Stage your changes: `git add .`
    * Commit them: `git commit -m 'Describe your change here'`
* Feel free to push to your remote branch as often as you'd like (so long as you're the only one pushing to this branch): `git push origin your-branch-name`
* We can then use pull requests to merge to master. If you're uncomfortable doing so, feel free to check with other team members.

If you wanna learn more see here: https://www.atlassian.com/git