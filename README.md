# Development

Run `gulp` to fire up the project server.

Any changes to the `src/` folder will trigger live reload.

#### Device testing

To view local dev link on a mobile device connected to same network, update the option to `online: true` in `gulp-tasks/browser-sync.js`. Then after you run `gulp`, grab the url from the terminal and you're good to go.

## HTML

**Where it goes:** `src/html/partials/story/`.

The main HTML file is `src/html/index.hbs`. Generally speaking, You should mostly just include new partials in there and not modify too much of it since there are a bunch of presets.

Partials are not automatically included. You must add them to `index.hbs`. If you created a new file `content.hbs` it would be referenced as `{{> story/content }}`.


#### Metadata

Fill out `template-data/meta.json`

##### Analytics

For The Experience analytics use `UA-126459234-1`.

#### Copy

Using a Google Doc for copy is recommended. We use [ArchieML](http://archieml.org) as a micro CMS.

**Google doc url for this piece**

- Create a Google Doc
https://docs.google.com/document/d/1h-SeCnSLW1tT9i0FyceVeLLf5ODXiAypti8uFmZJqNE/edit#

Running `gulp fetch-google` at any point (even in new tab while server is running) will pull down the latest, and output a file `template-data/copy.json`.

You can now reference the JSON in your HTML, namespaced by `copy` (eg. `<p>{{copy.connections}}</p>`).

#### SVG icons

There is a directory called `svg` in the root of project, it contains a bunch of [icons](https://feathericons.com/). To include them in the HTML, simply do this:

`<div>@@include('arrow-left.svg')</div>`

This way you can drop in svg icons anywhere in your HTML code whilst keeping it uncluttered.

## JavaScript

**Where it goes:** `src/js/`

Take a look at `entry.js`. This is the kickoff file, the only one included and run automatically.

Then take a look at `graphic.js`, it has some basic skeleton stuff setup for you. This is imported and called from `entry.js` once on load, and subsequently on a debounced resize event.

[D3 Jetpack](https://github.com/gka/d3-jetpack/) is included globally by default. For any other libraries, it is recommend that you use `npm` to install and import them. You can also do it the vanilla way by including them in the `src/assets` folder and putting a script tag in the HTML.

The JavaScript is transpiled from ES6, and uses Webpack to bundle into a single file. That means each file creates its own closure, so a "global" variable is scoped to a file unless you declare it as `window.variable = ....`.

This project used `window.location.hash` and `hashchange` event listener to change slides.

#### Installing libraries

**NPM way**:
`npm install [name] --save`.
Usage: (see library docs, but usually) `import [library] from '[library]'`

## CSS

**Where it goes:** `src/css/story/`.

There is a file for you to start off with, `story.styl`. You can create as many files as you want in this directory, they are automatically included.

Checkout some of the auto-included files in `src/css/utils/` (`variables.styl`, `helpers.styl`, `presets.styl`). Font family and font size are defined on `variables.styl`.

## Fonts

Fonts are loaded async and use the [FOUT](https://www.zachleat.com/web/comprehensive-webfonts/#fout-class) practice. We have three font families:

- **Grifo**
- **Moderat**

Example:

```html
<div class='example'>
	<p class='tk-atlas'>test</p>
</div>
```

## Assets

**Where it goes:** `src/assets/`

- Each person has seperate image files. For example, Ama's image url: ` assets/ama/images/ama-1.jpg`
- Button icons are stored in `assets/button_icons`

## Deploy

Run `gulp dist`

This generates a single html file with inlined css, a single js file, and a folder with assets in the `dist` folder.


## Pre-launch checklist

- optimize images: make sure they aren't unncessarily large in dimensions (should be no more than 2x their final rendered dimensions), should also crunched with something like [imageoptim](https://imageoptim.com/online).
- clean data: reduce filesize bloat by making sure you aren't loading unnecessary columns and rows.
- remove console logs: aesthetics :smile:
- enable anayltics
- fill out metadata: `template-data/meta.json`
- create two social images:
  * Facebook: 1200 x 628 (`src/assets/social/social-facebook.jpg`)
  * Twitter: 1024 x 576 (`src/assets/social/social-twitter.jpg`)
- The links on `site-footer__social` needs updating before publish. Change the latter half of the url to this project's url.