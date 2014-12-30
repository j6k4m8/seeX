# Seex

Seex.js aims to fix the common problem where responsive design results in sentences like "See the figure at left..." when the figure is really on top or below the paragraph.

Simply mark a span of text with the class `.seex` and give it the attribute, `data-seex-target="#your-target-id"` and seex.js will change the inside text to match the *real* location of your element or figure.

Seex currently recognizes the following formats of text:

| Phrase | Example |
|--------|---------|
| `see {X}` | `See above` |
| `at {X}` | `At left` |
| `on the {X}` | `on the right` |
| `{X}` | `Below` |

Conversion is done intelligently, so you don't wind up with sentences like, "See left for the figure" or "As you can see on the below." 

Instead, the sentence is replaced with a variation on your original text.


```
<p>
    <span class="seex" data-seex-target="#fig1">At left</span>, you can see a graph of population growth since 1994.
</p>
```

## Usage
seex.js is included and can be called at any time: It will automatically listen for DOM changes, orientation changes, or window rescaling after it has been called.

```
Seex.begin();
```

You can include a dictionary of options:

```
Seex.begin({
    // no options just yet!
});
```

You can force a refresh:

```
Seex.refresh();
```

Finished seexing? Destroy everything.

```
Seex.destroy();
```

