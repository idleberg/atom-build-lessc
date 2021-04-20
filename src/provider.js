import { configSchema, getConfig } from './config';
import { EventEmitter } from 'events';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import { spawnSync } from 'child_process';
import { which } from './util';
import meta from '../package.json';

export { configSchema as config };

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
      if (getConfig('alwaysEligible') === true) {
        return true;
      }

      const cmd = spawnSync(which(), ['lessc']);
      if (!cmd.stdout.toString()) {
        return false;
      }

      return true;
    }

    settings() {
      const errorMatch = [
        // probably breaks on multi-line errors
        '(?<message>\\w+Error: .*) in (?<file>(/|\\\\).*) on line (?<line>\\d+), column (?<col>\\d+)'
      ];

      // User settings
      const outputFile = getConfig('outputFile');
      const customArguments = getConfig('customArguments').trim().split(' ');

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

// This package depends on build, make sure it's installed
export function activate() {
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies(meta.name);
  }
}
