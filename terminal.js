const font = 'Slant';

figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);


// define commands
const root = '~';
let cwd = root;
const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
const commands = {
   help() {
      terminal.echo(`List of available commands: ${help}`);
   },
   echo(...args) {
      terminal.echo(args.join(' '))
   },
   clear() { ready()},
   ls(dir = null) {
      if (dir) {
         if (dir.startsWith('~/')) {
            const path = dir.substring(2);
            const dirs = path.split('/');
            if (dirs.length > 1) {
               this.error('Invalid directory');
            } else {
               const dir = dirs[0];
               this.echo(directories[dir].join('\n'));
            }
         } else if (cwd === root) {
            if (dir in directories) {
               this.echo(directories[dir].join('\n'));
            } else {
               this.error('Invalid directory');
            }
         } else if (dir === '..') {
            print_dirs();
         } else {
            this.error('Invalid directory');
         }
      } else if (cwd === root) {
         print_dirs();
      } else {
         const dir = cwd.substring(2);
         this.echo(directories[dir].join('\n'));
      }
   },
   cd(dir = null) {
      if (dir === null || (dir === '..' && cwd !== root)) {
         cwd = root;
      } else if (dir.startsWith('~/') && Object.keys(directories).includes(dir.substring(2))) {
         cwd = dir;
      } else if (Object.keys(directories).includes(dir)) {
         cwd = root + '/' + dir;
      } else {
         this.error('Wrong directory');
      }
   },
   experience() {
      terminal
         .echo(` 1 - <white>Solution Developer</white> at <pink>Sintelix</pink>, 2023-Present`)
         .echo(` 2 - <white>Senior Data Analyst</white> at <blue>CDSIRC, Department for Education</blue>, 2020-2023`)
         .echo(` 3 - <white>PhD Candidate in Neuroscience</white> at <green>University of Adelaide</green>, 2016-2020`)
   },
   education() {
      terminal
         .echo(` 1 - <white>Software development</white> at <pink>the Internet</pink>, 2017-forever`)
         .echo(` 2 - <white>PhD in Neuroscience</white> at <green>University of Adelaide</green>, 2016-2020`)
         .echo(` 3 - <white>BSc in Genetics & Psychology</white> at <green>University of Adelaide</green>, 2012-2015`);

      function software() {
         terminal.echo(`I am a self-taught developer with a passion for learning and creating new things.`);
      }
   }
};
const command_list = Object.keys(commands);
const formatted_list = command_list.map(cmd => {
   return `<white class="command">${cmd}</white>`;
})
const help = formatter.format(formatted_list);

// define directories
const directories = {
   experience: [
      ` - <white>Solution Developer</white> at <pink>Sintelix</pink>, 2023-Present`,
      ` - <white>Senior Data Analyst</white> at <blue>CDSIRC, Department for Education</blue>, 2020-2023`,
      ` - <white>PhD Candidate in Neuroscience</white> at <green>University of Adelaide</green>, 2016-2020`,
   ],
   education: [
      ` - <white>Software development</white> at <pink>the Internet</pink>, 2017-forever`,
      ` - <white>PhD in Neuroscience</white> at <green>University of Adelaide</green>, 2016-2020`,
      ` - <white>BSc in Genetics & Psychology</white> at <green>University of Adelaide</green>, 2012-2015`,

   ],
   projects: [
      '',
      '<white>Open Source projects</white>',
      [
         ['jQuery Terminal',
            'https://terminal.jcubic.pl',
            'library that adds terminal interface to websites'
         ],
         ['LIPS Scheme',
            'https://lips.js.org',
            'Scheme implementation in JavaScript'
         ],
         ['Sysend.js',
            'https://jcu.bi/sysend',
            'Communication between open tabs'
         ],
         ['Wayne',
            'https://jcu.bi/wayne',
            'Pure in browser HTTP requests'
         ],
      ].map(([name, url, description = '']) => {
         return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
      }),
      ''
   ].flat(),
   skills: [
      '',
      '<white>languages</white>',

      [
         'JavaScript',
         'TypeScript',
         'Python',
         'SQL',
         'PHP',
         'Bash'
      ].map(lang => `* <yellow>${lang}</yellow>`),
      '',
      '<white>libraries</white>',
      [
         'React.js',
         'Redux',
         'Jest',
      ].map(lib => `* <green>${lib}</green>`),
      '',
      '<white>tools</white>',
      [
         'Docker',
         'git',
         'GNU/Linux'
      ].map(lib => `* <blue>${lib}</blue>`),
      ''
   ].flat()
};

// prompt
const user = 'please';
const server = 'hireme';
function prompt() {
   return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}

// create terminal
const terminal = $('body').terminal(commands, {
   greetings: false,
   checkArity: false,
   exit: false,
   prompt
});
terminal.pause(); // pause the terminal while fonts load

// terminal ready
function ready() {
   const seed = rand(256);
   terminal.echo(() => rainbow(render('Jago Van Dam'), seed), { ansi: true }) // ansi removes line gaps in greeting
      .echo(`[[;green;]Welcome to my Terminal Portfolio]\n`)
      .resume();
}

// add event listener to commands
terminal.on('click', '.command', function () {
   const command = $(this).text();
   terminal.exec(command);
})

/* ------ helper functions ------ */
// render text with figlet
function render(text) {
   const cols = terminal.cols();
   return figlet.textSync(text, {
      font: font,
      width: cols,
      whitespaceBreak: true
   });
}
// print directories
function print_dirs() {
     terminal.echo(Object.keys(directories).map(dir => {
         return `<blue class="directory">${dir}</blue>`;
     }).join('\n'));
}
// trim trailing whitespace
function trim(str) {
   return str.replace(/[\n\s]+$/, '');
}
// rainbow text
function rainbow(string, seed) {
   return lolcat.rainbow(function (char, color) {
      char = $.terminal.escape_brackets(char);
      return `[[;${hex(color)};]${char}]`;
   }, string, seed).join('\n');
}
// hex color
function hex(color) {
   return '#' + [color.red, color.green, color.blue].map(n => {
      return n.toString(16).padStart(2, '0');
   }).join('');
}
// random number
function rand(max) {
   return Math.floor(Math.random() * (max + 1));
}

// override colors
$.terminal.xml_formatter.tags.green = (attrs) => {
    return `[[;#44D544;]`;
};
$.terminal.xml_formatter.tags.blue = (attrs) => {
    return `[[;#55F;;${attrs.class}]`;
};