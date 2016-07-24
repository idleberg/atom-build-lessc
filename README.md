# build-lessc

[![apm](https://img.shields.io/apm/l/build-lessc.svg?style=flat-square)](https://atom.io/packages/build-lessc)
[![apm](https://img.shields.io/apm/v/build-lessc.svg?style=flat-square)](https://atom.io/packages/build-lessc)
[![apm](https://img.shields.io/apm/dm/build-lessc.svg?style=flat-square)](https://atom.io/packages/build-lessc)
[![Travis](https://img.shields.io/travis/idleberg/atom-build-lessc.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-build-lessc)
[![David](https://img.shields.io/david/dev/idleberg/atom-build-lessc.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-lessc#info=dependencies)

[Atom Build](https://atombuild.github.io/) provider for `lessc`, compiles Less into CSS. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

## Installation

### apm

Install `build-lessc` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-lessc`

### GitHub

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

## Usage

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

`Less` — compile style-sheet (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd>)

The name of the output file can be overridden in your `config.cson`:

```cson
"build-coffee":
  outputFile: "{FILE_ACTIVE_NAME_BASE}.css"
```

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

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-build-lessc) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`