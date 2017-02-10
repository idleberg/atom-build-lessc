'use babel';

import { EventEmitter } from 'events';
import { platform} from 'os';
import { spawnSync } from 'child_process';

// Package settings
import meta from '../package.json';

this.config = {
  customArguments: {
    title: 'Custom Arguments',
    description: 'Specify your preferred arguments for `lessc`',
    type: 'string',
    'default': '--no-color',
    order: 0
  },
  outputFile: {
    title: 'Output File',
    description: 'Specify the default name of the output file, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders',
    type: 'string',
    'default': '{FILE_ACTIVE_NAME_BASE}.css',
    order: 1
  },
  manageDependencies: {
    title: 'Manage Dependencies',
    description: 'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 2
  }
};

// This package depends on build, make sure it's installed
export function activate() {
  if (atom.config.get(meta.name + '.manageDependencies') && !atom.inSpecMode()) {
    this.satisfyDependencies();
  }
}
export function which() {
  if (platform() === 'win32') {
    return 'where';
  }
  return 'which';
}

export function satisfyDependencies() {
  let k;
  let v;

  require('atom-package-deps').install(meta.name);

  const ref = meta['package-deps'];
  const results = [];

  for (k in ref) {
    if (typeof ref !== 'undefined' && ref !== null) {
      v = ref[k];
      if (atom.packages.isPackageDisabled(v)) {
        if (atom.inDevMode()) {
          console.log('Enabling package \'' + v + '\'');
        }
        results.push(atom.packages.enablePackage(v));
      } else {
        results.push(void 0);
      }
    }
  }
  return results;
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
      const cmd = spawnSync(which(), ['lessc']);
      if (!cmd.stdout.toString()) {
        return false;
      }

      return true;
    }

    settings() {
      const errorMatch = [
        // probably breaks on multi-line errors
        '(?<message>\\w+Error: .*) in (?<file>(\/|\\\\).*) on line (?<line>\\d+), column (?<col>\\d+)'
      ];

      // User settings
      const outputFile = atom.config.get(meta.name + '.outputFile');
      const customArguments = atom.config.get(meta.name + '.customArguments').trim().split(' ');

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
