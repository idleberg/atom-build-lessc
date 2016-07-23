'use babel';

const self = '[build-lessc] ';
const debug = atom.config.get('build-lessc.debug');

import {exec} from 'child_process';

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
          if (debug === true) console.log(self, error);
          // No CoffeeScript installed
          return false;
        }
        if (debug === true) console.log(self, stdout);
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
          args: [ '--no-color', '{FILE_ACTIVE}', '{FILE_ACTIVE_NAME_BASE}.css' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'coffeescript:compile',
          errorMatch: errorMatch
        }
      ];
    }
  };
}
