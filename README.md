#CS-Arc

## Setup

## Development

This works off of a connector pattern. This package currently
supports Angular 1.X, React 0.X, and vanilla JavaScript. Using
browserify and transforms, we create our framework specific
files.

### Browserify React

Browserify react is a transform for Browserify that allows the tool to
parse JSX source code, making react components possible.

### Manual Compilation

`browserify -t reactify main.jsx > bundle.js`
`browserify main.js > bundle.js`

## Usage

### Arc

``` javascript
var arc = new Arc({
    inner: 180, // inner radius
    outer: 240, // outer radius
    start: 0, // starting angle
    end: 1, //ending angle
    transition: 5000 // time in milliseconds
    container: 'clock', // container id
    name: 'inner' // arc id
});
```

#### .render()
Builds the arc svg and sets the internal d3 object
```javascript
arc.render();
```

#### .update()
Takes in a percent and updates the arc with an animation
```javascript
this.secondsArc.update(.5);
```
