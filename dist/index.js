module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(104);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 82:
/***/ (function(__unusedmodule, exports) {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 102:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(747));
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(82);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 104:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(470);

main();

async function main() {
  const cwd = core.getInput("cwd");

  try {
    if (cwd) {
      core.debug(`cwd input is set to "${cwd}". Changing working directory`);
      process.chdir(cwd);
      core.info(`working directory is ${process.cwd()}`);
    }

    const cli = __webpack_require__(177);
    const run = cli.run || cli.cli || cli.default;
    await run();
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}


/***/ }),

/***/ 119:
/***/ (function(__unusedmodule, exports) {

let FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, isTTY=true;
if (typeof process !== 'undefined') {
	({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env);
	isTTY = process.stdout && process.stdout.isTTY;
}

const $ = exports.$ = {
	enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && (
		FORCE_COLOR != null && FORCE_COLOR !== '0' || isTTY
	)
}

function init(x, y) {
	let rgx = new RegExp(`\\x1b\\[${y}m`, 'g');
	let open = `\x1b[${x}m`, close = `\x1b[${y}m`;

	return function (txt) {
		if (!$.enabled || txt == null) return txt;
		return open + ((''+txt).includes(close) ? txt.replace(rgx, close + open) : txt) + close;
	};
}

// modifiers
exports.reset = init(0, 0);
exports.bold = init(1, 22);
exports.dim = init(2, 22);
exports.italic = init(3, 23);
exports.underline = init(4, 24);
exports.inverse = init(7, 27);
exports.hidden = init(8, 28);
exports.strikethrough = init(9, 29);

// colors
exports.black = init(30, 39);
exports.red = init(31, 39);
exports.green = init(32, 39);
exports.yellow = init(33, 39);
exports.blue = init(34, 39);
exports.magenta = init(35, 39);
exports.cyan = init(36, 39);
exports.white = init(37, 39);
exports.gray = init(90, 39);
exports.grey = init(90, 39);

// background colors
exports.bgBlack = init(40, 49);
exports.bgRed = init(41, 49);
exports.bgGreen = init(42, 49);
exports.bgYellow = init(43, 49);
exports.bgBlue = init(44, 49);
exports.bgMagenta = init(45, 49);
exports.bgCyan = init(46, 49);
exports.bgWhite = init(47, 49);


/***/ }),

/***/ 177:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const fs_1 = __importDefault(__webpack_require__(747));
const path_1 = __importDefault(__webpack_require__(622));
const colors = __importStar(__webpack_require__(119));
const get_repo_url_1 = __webpack_require__(489);
function runCheck({ pass, title, url }) {
    try {
        const result = pass();
        if (!result) {
            console.error(colors.red('Check failed: '), title);
            console.error(colors.yellow('How to fix: '), url);
            process.exit(1);
        }
    }
    catch (err) {
        console.error('run failed (internal tool error, please report this!)');
        throw err;
    }
}
const cwd = process.cwd();
const packageJsonContents = fs_1.default.readFileSync(path_1.default.join(cwd, 'package.json'), {
    encoding: 'utf-8',
});
const READMEContents = fs_1.default.readFileSync(path_1.default.join(cwd, 'README.md'), {
    encoding: 'utf-8',
});
const pkg = JSON.parse(packageJsonContents);
async function cli() {
    // Check: Has ESM
    runCheck({
        title: 'ES Module Entrypoint',
        url: 'https://docs.skypack.dev/package-authors/package-checks#esm',
        pass: () => {
            return ((pkg.exports &&
                !!(pkg.exports['import'] ||
                    !!Object.values(pkg.exports).find((x) => typeof x === 'object' && x.import))) ||
                !!pkg.module ||
                pkg.type === 'module' ||
                (typeof pkg.main === 'string' && pkg.main.endsWith('.mjs')));
        },
    });
    // Check: Export Map
    runCheck({
        title: 'Export Map',
        url: 'https://docs.skypack.dev/package-authors/package-checks#export-map',
        pass: () => {
            return !!pkg.exports;
        },
    });
    // Check: Has "files"
    runCheck({
        title: 'No Unnecessary Files',
        url: 'https://docs.skypack.dev/package-authors/package-checks#files',
        pass: () => {
            return !!pkg.files;
        },
    });
    // Check: Has "keywords"
    runCheck({
        title: 'Keywords',
        url: 'https://docs.skypack.dev/package-authors/package-checks#keywords',
        pass: () => {
            return !!pkg.keywords;
        },
    });
    // Check: Has "keywords"
    runCheck({
        title: 'Keywords (Empty)',
        url: 'https://docs.skypack.dev/package-authors/package-checks#keywords',
        pass: () => {
            return !!pkg.keywords.length;
        },
    });
    // Check: Has "license"
    runCheck({
        title: 'License',
        url: 'https://docs.skypack.dev/package-authors/package-checks#license',
        pass: () => {
            return !!pkg.license;
        },
    });
    // Check: Has "README"
    runCheck({
        title: 'README',
        url: 'https://docs.skypack.dev/package-authors/package-checks#readme',
        pass: () => {
            return !!READMEContents;
        },
    });
    // Check: Has "repository url"
    runCheck({
        title: 'Repository URL',
        url: 'https://docs.skypack.dev/package-authors/package-checks#repository',
        pass: () => {
            let repositoryUrl;
            if (pkg.repository && pkg.repository.url) {
                repositoryUrl = get_repo_url_1.repoURL(pkg.repository.url);
            }
            return !!repositoryUrl;
        },
    });
    // Check: Has types
    runCheck({
        title: 'TypeScript Types',
        url: 'https://docs.skypack.dev/package-authors/package-checks#types',
        pass: () => {
            return !!pkg.types || !!pkg.typings; // `typings` is also valid according to TypeScript, even though `types` is preferred
        },
    });
    console.error(colors.green(`[100/100] ${pkg.name} passes all quality checks.`));
}
exports.cli = cli;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 431:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(82);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 470:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(431);
const file_command_1 = __webpack_require__(102);
const utils_1 = __webpack_require__(82);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 489:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repoURL = exports.repoAssetURL = void 0;
const path_1 = __importDefault(__webpack_require__(622));
/** Get URL for any asset from a repo */
function repoAssetURL(url, filepath, version) {
    let sanitizedURL = repoURL(url);
    // @ts-ignore this is a real thing
    const { hostname, pathname } = new URL(sanitizedURL);
    switch (hostname) {
        case "bitbucket.org": {
            return `https://bitbucket.org${path_1.default.join("/", pathname, version || "HEAD", filepath)}`;
        }
        case "github.com": {
            const [repo, dir] = pathname.split("/tree/");
            return `https://raw.githubusercontent.com${path_1.default.join("/", repo, version || "HEAD", dir ? dir.replace(/[^/]+/, "") : "", filepath)}`;
        }
        case "gitlab.com": {
            return `https://gitlab.com${path_1.default.join("/", pathname, "-", "raw", version || "HEAD", filepath)}`;
        }
        default: {
            return undefined; // Dunno what this is; return as-is
        }
    }
}
exports.repoAssetURL = repoAssetURL;
/** Turn repo URL into normal URL */
function repoURL(url) {
    return url
        .trim()
        .replace(/^git\+/i, "")
        .replace(/\.git$/i, "")
        .replace(/git@/, "")
        .replace(/(bitbucket|github|gitlab)\.([a-z]+):/, "$1.$2/")
        .replace(/bitbucket:/, "$1.org/")
        .replace(/(github|gitlab):/, "$1.com/")
        .replace(/^(http\s*:\/\/|https\s*:\/\/|\/\/)?/, "https://");
}
exports.repoURL = repoURL;
//# sourceMappingURL=get-repo-url.js.map

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ })

/******/ });