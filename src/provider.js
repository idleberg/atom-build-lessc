import { configSchema, getConfig } from './config';
import { EventEmitter } from 'events';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import Logger from './log';
import { name } from '../package.json';
import which from 'which';

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
        Logger.log('Always eligible');
        return true;
      }

      if (which.sync('lessc', { nothrow: true })) {
        Logger.log('Build provider is eligible');
        return true;
      }

      Logger.error('Build provider isn\'t eligible');
      return false;
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

export function activate() {
  Logger.log('Activating package');

  // This package depends on build, make sure it's installed
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies(name);
  }
}

export function deactivate() {
  Logger.log('Deactivating package');
}
