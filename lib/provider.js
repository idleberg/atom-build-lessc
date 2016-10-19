'use babel';

import { install } from 'atom-package-deps';
import { execSync } from 'child_process';
import { EventEmitter } from 'events';

// Package settings
import meta from '../package.json';

this.config = {
  customArguments: {
    title: "Custom Arguments",
    description: "Specify your preferred arguments for `lessc`",
    type: "string",
    "default": "--no-color",
    order: 0
  },
  outputFile: {
    title: "Output File",
    description: "Specify the default name of the output file, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders",
    type: "string",
    "default": "{FILE_ACTIVE_NAME_BASE}.css",
    order: 1
  }
};

// This package depends on build, make sure it's installed
export function activate() {
  if (!atom.inSpecMode()) {
    install(meta.name);
  }
}

export function provideBuilder() {
  return class LesscProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('build-lessc.outputFile', () => this.emit('refresh'));
      atom.config.observe('build-lessc.customArguments', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'Less';
    }

    isEligible() {
      try {
        stdout = execSync('lessc --version');
        if (atom.inDevMode()) atom.notifications.addInfo(meta.name, { detail: stdout, dismissable: false });
        return true;
      } catch (error) {
        if (atom.inDevMode()) atom.notifications.addError(meta.name, { detail: error, dismissable: true });
        return false;
      }
    }

    settings() {
      const errorMatch = [
        // probably breaks on multi-line errors
        '(?<message>\\w+Error: .*) in (?<file>(\/|\\\\).*) on line (?<line>\\d+), column (?<col>\\d+)'
      ];

      // User settings
      let outputFile = atom.config.get('build-lessc.outputFile');
      let customArguments = atom.config.get('build-lessc.customArguments').trim().split(" ");

      // add standard arguments
      customArguments.push('{FILE_ACTIVE}');
      customArguments.push(outputFile);

      return [
        {
          name: 'Less',
          exec: 'lessc',
          args: [ '--no-color', '{FILE_ACTIVE}', outputFile ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'less:compile',
          errorMatch: errorMatch
        },
        {
          name: 'Less (user)',
          exec: 'lessc',
          args: customArguments,
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'less:compile-with-user-settings',
          errorMatch: errorMatch
        }
      ];
    }
  };
}
