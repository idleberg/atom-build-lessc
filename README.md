# build-lessc

[![apm](https://img.shields.io/apm/l/build-lessc.svg?style=flat-square)](https://atom.io/packages/build-lessc)
[![apm](https://img.shields.io/apm/v/build-lessc.svg?style=flat-square)](https://atom.io/packages/build-lessc)
[![apm](https://img.shields.io/apm/dm/build-lessc.svg?style=flat-square)](https://atom.io/packages/build-lessc)
[![Travis](https://img.shields.io/travis/idleberg/atom-build-lessc.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-build-lessc)
[![David](https://img.shields.io/david/idleberg/atom-build-lessc.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-lessc)
[![David](https://img.shields.io/david/dev/idleberg/atom-build-lessc.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-lessc?type=dev)

[Atom Build](https://atombuild.github.io/) provider for `lessc`, compiles Less into CSS. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

![Screenshot](https://raw.githubusercontent.com/idleberg/atom-build-lessc/master/screenshot.png)

*See the linter in action*

## Installation

### apm

Install `build-lessc` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-lessc`

### Using Git

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Linux & macOS
$ cd ~/.atom/packages/
```

Clone repository as `build-lessc`:

```bash
$ git clone https://github.com/idleberg/atom-build-lessc build-lessc
```

Inside the cloned directory, install Node dependencies:

```bash
$ yarn || npm install
```

## Usage

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

`Less` — compile style-sheet
`Less (user)` — compile style-sheet with arguments specified in the package settings

You can change the name of the output file in the package settings, where all [standard replacements](https://github.com/noseglid/atom-build#replacements) can be used.

### Shortcuts

Here's a reminder of the default shortcuts you can use with this package:

**Select active target**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>

**Build script**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>

**Jump to error**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>G</kbd> or <kbd>F4</kbd>

**Toggle build panel**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>

## License

This work is licensed under the [The MIT License](LICENSE.md).
