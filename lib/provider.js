'use babel';

import {exec} from 'child_process';

// Package settings
import meta from '../package.json';
const debug = atom.config.get(`${meta.name}.debug`);
const notEligible = `**${meta.name}**: \`lessc\` is not in your PATH`;
const outputFile = atom.config.get('build-lessc.outputFile') || '{FILE_ACTIVE_NAME_BASE}.css';

// This package depends on build, make sure it's installed
require('atom-package-deps').install(meta.name);

export function provideBuilder() {
  return class LesscProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'Less';
    }

    isEligible() {
      exec('lessc --version', function (error, stdout, stderr) {
        if (error !== null) {
          // No lessc installed
          if (debug === true) atom.notifications.addError(notEligible, { detail: error, dismissable: true });
          return false;
        }
        if (debug === true) atom.notifications.addInfo(`**${meta.name}**`, { detail: stdout, dismissable: false });
      });
      // Let's go!
      return true;
    }

    settings() {
      const errorMatch = [
        // probably breaks on multi-line errors
        '(?<message>\\w+Error: .*) in (?<file>(\/|\\\\).*) on line (?<line>\\d+), column (?<col>\\d+)'
      ];

      return [
        {
          name: 'Less',
          exec: 'lessc',
          args: [ '--no-color', '{FILE_ACTIVE}', outputFile ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'less:compile',
          errorMatch: errorMatch
        }
      ];
    }
  };
}
