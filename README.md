# Local development
The very first time you start working on this repo, you'll have to clone to your local machine. To do so, open open your terminal and type the following command in the folder where you want your local repo to live: `git clone https://github.com/codeforboston/project-hope.git` This will create a project named `project-hope` in the directory into which you type the command

In subsequent times, the workflow goes like this:
* `git pull origin`
* `git checkout develop`
* Make your changes
* When you are ready to push them up:
    * `git add .`: this stages all your changes
    * `git commit -m 'describe your change here'`: commit them
    * `git push origin develop`

Later on, we can merge stuff to master as we think it's in a good state. 