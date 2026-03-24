# Slideshow Structure

[<Start Title Text Slide>, <Dummy Image Slide>, <Text Slide>, <Image Slide>, <End Title Text Slide>]

# For SVG Images

We need to convert them into an React components

You will need to use @svgr/cli

Example

```
npx @svgr/cli <project path>/src/BorderAsset/graphics/*.svg --typescript --icon --out-dir ./components
```
