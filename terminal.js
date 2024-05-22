const font = 'Slant';

figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);


// define commands
const root = '~';
let cwd = root;
const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
const commands = {
   public: {
      help() {
         terminal.echo(`List of available commands: ${help}`);
      },
      /*
      echo(...args) {
         terminal.echo(args.join(' '))
      },
      */
      clear() {
         terminal.clear()
         ready()
      },
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
      async joke() {
         const url = 'https://v2.jokeapi.dev/joke/Programming';
         const res = await fetch(url);
         const data = await res.json();
         (async () => {
            if (data.type == 'twopart') {
               // clear the prompt so there's no flashing between animations
               const prompt = this.get_prompt();
               this.set_prompt('');
               await this.echo(`Q: ${data.setup}`, {
                  delay: 5,
                  typing: true
               });
               await this.echo(`A: ${data.delivery}`, {
                  delay: 50,
                  typing: true
               });
               // restore the prompt
               this.set_prompt(prompt);
            } else if (data.type === 'single') {
               await this.echo(data.joke, {
                  delay: 50,
                  typing: true
               });
            }
         })();
      },
   },
   private: {
      experience() {
         terminal.echo(`Entering Experience interpreter. Type "help" for a list of available commands.`);

         this.push({
            help() {
               terminal.echo(`List of available commands: ${formatter.format(['help', 'exit', 'Sintelix', 'CDSIRC', 'PhD'].map(cmd => { return `<white class="command">${cmd}</white>` }))}`, {delay: 20, typing: true});
            },
            Sintelix() {
               terminal.echo(`I am currently working as a Solution Developer at Sintelix, a leading provider of text analytics software. My role involves work across the full stack, from UI development to backend services and data pipelines. Here are some highlights of my work:\n`)
                  .echo(` - Developing natural language processing scripts using Sintelix\'s domain-specific NLP language`)
                  .echo(` - Building and configuring custom NLP pipelines to ingest data, extract entities from unstructured text, and build graph networks`)
                  .echo(` - Developing JavaScript applications to abstract complex text intelligence pipelines, working with NLP and graph APIs`)
                  .echo(` - Contributing to the development of a major open-source intelligence product, including web harvesting, NLP, data analysis, and UI development.`)
            },
            CDSIRC() {
               terminal.echo(`I worked as the Senior Data Analyst at the CDSIRC, Department for Education, from 2020 to 2023. I was responsible for managing the organisation\'s data and digital outputs. Here are some highlights of my work:\n`)
                  .echo(` - I developed a data capture system and database, massively improving the efficiency of data collection, validation, and analysis. This involved using REDCap, SQL, Python, R, and Microsoft Azure.`)
                  .echo(` - I designed and built a <a href="https://cdsirc.sa.gov.au/annual-report-2021-22/index.html">website</a> to present CDSIRC's annual report. I learned basic JavaScript, HTML, and CSS to create a simple and effective site, and transformed the data into interactive visualisations using Plotly.\nPrior to this, the annual report was presented as a PDF document!`)
                  .echo(` - I built and deployed a series of containerised web apps to streamline and automate several data processing tasks which previously took 10s of hours per month.`)
            },
            PhD() {
               terminal.echo(`I completed my PhD in Neuroscience at the University of Adelaide in 2020. I developed valuable skills in data analysis, research, project management, communication, problem-solving, and programming, and I apply them to my life and work every day.`);
            }
         }, {
            prompt: '<white>experience>>></white>',
            name: 'experience'
         })
      },
      education() {
         terminal
            //.echo(` 1 - <white>Software development</white> at <pink>the Internet</pink>, 2017-forever`)
            //.echo(` 2 - <white>PhD in Neuroscience</white> at <green>University of Adelaide</green>, 2016-2020`)
            //.echo(` 3 - <white>BSc in Genetics & Psychology</white> at <green>University of Adelaide</green>, 2012-2015`)
            .echo(`\nEntering Education interpreter. Type "help" for a list of available commands.`);

         this.push({
            help() {
               terminal.echo(`List of available commands: ${formatter.format(['help', 'exit', 'Software', 'PhD', 'BSc'].map(cmd => { return `<white class="command">${cmd}</white>` }))}`, {delay: 20, typing: true});
            },
            Software() {
               terminal.echo(`I am a self-taught developer with a passion for learning and creating new things. I started writing code to process and analyse data during my PhD and never looked back.`)
                  .echo(`I have experience in data science, data engineering, and full-stack development. I particularly enjoy building beautiful and intuitive web applications using modern technologies like React and Svelte.`);
            },
            PhD() {
               terminal.echo(`I completed my PhD in Neuroscience at the University of Adelaide in 2020. My research focused on the impacts of\nperinatal stress on the development of neuroplasticity and other neurophysiological markers.\nI published several scientific papers and presented my work at national and international conferences.\n`);
            },
            BSc() {
               terminal.echo(`I completed a Bachelor of Science in Genetics & Psychology at the University of Adelaide in 2015. I graduated with First Class Honours in Neuroscience in 2016, achieving the highest grade in my cohort.\n`);
            }
         }, {
            prompt: '<white>education>>></white>',
            name: 'education'
         })
      },
      hire() {
         terminal.echo(`<white>I am always open to new opportunities, and I'd love to have a chat. Please contact me at 0430202697 or drjagovandam@gmail.com.</white>`);
      }
   }
};
const command_list = Object.keys(commands.public);
const formatted_list = command_list.map(cmd => {
   return `<white class="command">${cmd}</white>`;
})
const help = formatter.format(formatted_list);

// define directories
const directories = {
   experience: [
      ` - <white>Solution Developer</white> at <a target="_blank" href="https://www.sintelix.com"><pink>Sintelix</pink></a>, 2023-Present`,
      ` - <white>Senior Data Analyst</white> at <a target="_blank" href="https://cdsirc.sa.gov.au/"><blue>CDSIRC, Department for Education</blue></a>, 2020-2023`,
      ` - <white>PhD Candidate in Neuroscience</white> at <green>University of Adelaide</green>, 2016-2020`,
      `\n Type "<white class="command">experience</white>" to enter the Experience interpreter.`
   ],
   education: [
      ` - <white>Software development</white> at <pink>the Internet</pink>, 2017-forever`,
      ` - <white>PhD in Neuroscience</white> at <green>University of Adelaide</green>, 2016-2020`,
      ` - <white>BSc in Genetics & Psychology</white> at <green>University of Adelaide</green>, 2012-2015`,
      `\n Type "<white class="command">education</white>" to enter the Education interpreter.`
   ],
   projects: [
      '',
      '<white>Projects</white>',
      [
         ['Terminal Portfolio',
            'https://github.com/rareallele/terminal-portfolio',
            'A fun way to show my resume in a terminal emulator while showcasing my JavaScript skills'
         ],
         ['JagoIQ',
            'https://jagoiq.com',
            'Operational micro-SaaS business selling AI-powered chatbots for small businesses.\nWebsite built with React, Next.js, Shadcn and Tailwind CSS. Includes calendar booking, Stripe, and email API integrations.'
         ],
         ['CDSIRC Annual Report website',
            'https://cdsirc.sa.gov.au/annual-report-2021-22/index.html',
            'A simple website to present the CDSIRC\'s annual report. Built with pure HTML, CSS, and JavaScript, with interactive visualisations using Plotly.'
         ]
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
         'HTML/CSS',
         'R',
         'Bash'
      ].map(lang => `* <yellow>${lang}</yellow>`),
      '',
      '<white>libraries/frameworks</white>',
      [
         'React',
         'Svelte',
         'Node.js',
         'Next.js',
      ].map(lib => `* <green>${lib}</green>`),
      '',
      '<white>tools</white>',
      [
         'Docker',
         'git',
         'GNU/Linux',
         'REDCap',
         'Azure',
         'SSMS'
      ].map(lib => `* <blue>${lib}</blue>`),
      ''
   ].flat()
};

// prompt
const user = 'hire';
const server = 'me';
function prompt() {
   return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}

// create terminal
const terminal = $('body').terminal({ ...commands.public, ...commands.private }, {
   greetings: false,
   checkArity: false,
   exit: true,
   clear: false,
   completion: true,
   prompt
});
terminal.pause(); // pause the terminal while fonts load

// terminal ready
function ready() {
   console.log('Terminal ready');
   const seed = rand(256);
   terminal.echo(() => rainbow(render('Jago Van Dam'), seed), { ansi: true }) // ansi removes line gaps in greeting
      .echo(`[[;green;]Welcome to my Terminal Portfolio, a more interesting version of my CV.]`)
      .echo(`[[;green;]Type "help" to see a list of available commands.]`)
      .echo(`[[;green;]Type "hire" to hire me now!]\n`)
      .resume();
}

// add event listener to commands and directories
terminal.on('click', '.command', function () {
   const command = $(this).text();
   terminal.exec(command);
})
terminal.on('click', '.directory', function () {
   const dir = $(this).text();
   terminal.exec(`cd ~/${dir}`);
   terminal.exec('ls');
});

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
// highlight typed in commands
const any_command_re = new RegExp(`^\s*(${Object.keys(commands.public).concat(Object.keys(commands.private)).join('|')})`);
$.terminal.new_formatter([any_command_re, '<white>$1</white>']);

console.log(Object.keys(command_list.public).concat(Object.keys(command_list.private)))