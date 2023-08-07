# A feed for you recents reads as tracked by Italic Type
A display feed for your recently read (and current) books, using your [Italic Type](https://www.italictype.com/) data. It updates four times a day. Feel free to check it out on [github pages](https://sebastian-stubenvoll.github.io/italic-hype-feed/)!
It's built with vite and svelte and entirely static.

**This is in no way or form officially affiliated with Italic Type!**
(though their book tracker is awesome, you should [sign up](https://www.italictype.com/) if you haven't)

## Setup

You can easily set up a copy of this repository to display your own [Italic Type](https://www.italictype.com/) reads. 
To do so follow these steps:

1. Fork this repository
2. Adjust `settings.json` for any data you want changed from the defaults.
    You can do this right here on github, if you don't want to clone the repo.
    See the *settings* section under *configuration* for more details.
3. Under the repository settings navigate to `Secrets and variables -> Actions`
4. Save your *Italic Type* read-only API token as a repository secret under the name `IT_TOKEN`.
   If you're unsure how to obtain this token see the *get your token* section.
   
**Disclaimer: At the end of the day, you are saving a secret token on a
   foreign website. The token only has read-only permissions, but anyone with the token
   will be able to acces your book queues. Only do this if you understand the risk.**

5. Under `Actions -> General` enable actions and grant read and write
   permissions
6. Enable github pages under `Pages`

Github Actions should then periodically run a script that obtains your
*Italic Type* data, filters out information that isn't needed, and writes it to the
repository, so the static webpage can display it. The data publicly available
to anyone will be limited to:

+ Your avatar and name (as set in `settings.json`)
+ The books you are currently reading and what page you are on
+ The books you have completed
+ Date of completion as well as the rating given

Naturally, do not set this repository up if you don't want that data to be publicly available. You can also prevent the page you're on, as well as your rating from being shown by adjusting `settings.json` accordingly.

# Get your token
This website uses a token for authentication when sending requests. Requests sent using this token may only read data from certain endpoints. For the website to update automatically, you'll need to save that token as a repository secret, as described in *setup*.

You can obtain your token by sending a `POST` request, just like this:
```bash
 curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"username": "<your-username>", "password": "<your-password>"}' \
    https://www.italictype.com/api-token-auth/
```
Since you're inputting your login data, you should only send this request from trusted devices. Never input your username and password into any website that is not *Italic Type* itself.

The response will contain your token, as well as some other basic user information, e.g. your *Italic Type* avatar URL, should you want to include that on your website.

# Configuration

## Settings
In the root directory of this repository you'll find a file called `settings.json`. Should you want to customise the name or avatar shown on the display page you can adjust this file accordingly. E.g. changing its contents to
```json
{
    "name": "Emma Woodhouse",
    "avatar": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Image_taken_from_page_379_of_%27%28Emma._New_edition.%29%27_%2811299328635%29_%28cropped%29.jpg"
}
```
will set your name and avatar accordingly.

So far supported keys for settings are:
| key | explanation | allowed values | default |
|--------|--------|--------|--------|
| avatar | settings the user picture shown at the top | any image URL string, preferably with a 1:1 ration, otherwise cropping will occur | generic picture of a book |
|  name  |  settings the username shown at the top and in the stats and info sections  |  a string with the preferred name  | "An avid reader" |
|  background  |  set a custom background colour; useful for embedding |  any string valid for setting [CSS colors](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) from javascript; e.g. `"rgba(0,0,0,0)"` or `"coral"` | `"#f6f5f2"` |
| hidePage | hides the current page from books in the *currently* category | `true`/`false` (or any truthy/falsy JS value) | `false`| 
| hideRating | hides the rating given to finished books | `true`/`false` (or any truthy/falsy JS value) | `false` |


Any values that are not [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) will be ignored.

Also bear in mind that once requested, your filtered data will be part of your
public commit history, **so if you want to hide data, adjust the settings before you
enable github actions!**

## Custom URLs
The default configuration assumes you're hosting the page at `<yourgithubusername>.github.io/italic-hype-feed/`. If you're deploying at a different path, e.g. because you renamed the repository, you'll need to create a repository variable (not a secret!) called `BASE` (under `Settings -> Secrets and Variables -> Actions -> Variables`) to match your deployment path, e.g. `/my-changed-repo-name/` if you renamed the repo or `/` if you're using a custom domain.

If you are using your own domain, you'll also want to add a repository variable called
`CNAME` containing the *cname* record you used to setup your custom github pages
domain, e.g. `my.domain.com`.

# Embed this on your own website
The layout for this web-display is fairly responsive, so you can easily embed
this page in an *iframe* like so:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Embedded feed</title>
</head>
<body style="display:flex; flex-direction:column; align-items:center">
    <h1>Welcome to my personal website!</h1>
    Things I like:
    <ul>
        <li>Penguins</li>
        <li>Books</li>
        <li>Music</li>
    </ul>
    <p>Check out what I've read recently</p>

    <iframe src="<your-github-pages-url>" width="340" height="800" frameborder="0"></iframe>
</body>
</html>
```
The individual cards shrink down to a width of `320px`, though setting a `width` of at least `340px` will generally look better and ensure the drop shadows are fully displayed. If you want an easy way to change the background colour – e.g. to make the background transparent, so the display better integrates into your page – you can adjust the `src/app.css` file or simply use the `background` override. There is the possibility to implement a set of CSS variable definitions, should the need for more easily accessible custom styling arise. If that is something you're interested in feel free to open up an issue or even leave a pull request.

# Build it yourself

This assumes you have a working node/npm installation.

You may want to build the project locally, e.g. to develop you own changes.
To do so first clone the repository and then install dependencies by running

```bash
$ npm install
```
in the project root **as well as** in the `backend` folder.
Each directory has its own `package.json`.

Then fetch your *Italic Type* data. To do this your token must be set as the environment variable `IT_TOKEN` and the `update.js` script must be run from the project root. Then execute the respective npm script to run the dev server or build the static page, so e.g.
```bash
$ export IT_TOKEN=<your-token-here> && node ./backend/update.js
$ npm run dev # launches vite dev server
# OR
$ npm run build # builds the website at /dist/
```

Known issues:

- Safari animations aren't 100% working

---

Happy reading! 📚


