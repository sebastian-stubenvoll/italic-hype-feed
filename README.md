# A feed for you recents reads as tracked by italictype
A display feed for your recently read (and current) books, using your italictype
data. It updates four times a day. Feel free to check it out on [github pages](https://sebastian-stubenvoll.github.io/italic-hype-feed/)!
Built with vite and svelte.

**This is in no way or form officially affiliated with italic type**
(though their book tracker is awesome, you should [sign up](https://www.italictype.com/) if you haven't!)

## Setup

You can easily set up a copy of this repository to display your own *italictype* reads. 
To do so follow these steps:

1. Fork this repository
2. Under the repository settings navigate to `Secrets and variables -> Actions`
3. Save your *italictype* username and password as repository secrets
   `ITALIC_TYPE_USENAME` and `ITALIC_TYPE_PASSWORD` respectively

**Disclaimer:** At the end of the day you are inputting your login data on a
foreign website. Only do so **at your own risk**. For a closer look check out
the scripts in the `backend` folder. Remember the importance of
having unique password on different websites and stay safe! :)

4. Under `Actions -> General -> Workflow permissions` grant read and write
   permissions
5. You may need to uncomment or adjust the `base` entry in `vite.config.js` to
   match your deployment path. E.g. if you're deploying with the default github
   pages url, you need to change the entry to `base: '/YOUR-REPO-NAME/'`


Github Actions will then periodically run a script that obtains your
*italictype* data, filters out any sensitive information and writes it to the
repository, so the static webpage can display it. The data publicly available
to anyone will be limited to:

+ Your avatar and name
+ The books you are currently reading and what page you are on
+ The books you have completed
+ Date of completion as well as the rating given

Naturally, do not set this repository up if you don't want that data to be
publicly available.
