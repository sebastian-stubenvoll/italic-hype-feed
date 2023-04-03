# A feed for you recents reads as tracked by ItalicType

## Setup

You can easily set up a copy of this repository to display your own *italictype* reads. 
To do so follow these steps:

1. Fork this repository
2. Under the repository settings navigate to `Secrets and variables -> Actions`
3. Save your *italictype* username and password as repository secrets
   `ITALIC_TYPE_USENAME`and `ITALIC_TYPE_PASSWORD` respectively

**Disclaimer:** At the end of the day you are inputting your login data on a
foreign website. Only do so **at your own risk**. For a closer look check out
the scripts in the `backend` folder. Remember the importance of
having unique password on different websites and stay safe! :)

4. Under `Actions -> General -> Workflow permissions` grant read and write
   permissions


Github Actions will then periodically run a script that obtains your
*italictype* data, filters out any sensitive information and writes it to the
repository, so the static webpage can display it. The data publically available
to anyone will be limited to:

+ Your avatar and name
+ The books you are currently reading and what page you are on
+ The books you have completed
+ Date of completion as well as the rating given

Naturally, do not set this repository up if you don't want that data to be
publically available.
