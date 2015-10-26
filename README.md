#CS-Arc

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
