/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9283:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __importDefault(__nccwpck_require__(2186));
const orchestration_1 = __nccwpck_require__(7458);
const project = core_1.default.getInput("project");
const environment = core_1.default.getInput("environment");
(0, orchestration_1.deploy)({
    deploymentName: project,
    environment,
    sourceDirectory: process.cwd(),
}).catch((error) => {
    core_1.default.setFailed(error.message);
});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(5278);
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

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(7351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(5278);
const os = __importStar(__nccwpck_require__(2037));
const path = __importStar(__nccwpck_require__(1017));
const oidc_utils_1 = __nccwpck_require__(8041);
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
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
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
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
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
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
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
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(7147));
const os = __importStar(__nccwpck_require__(2037));
const utils_1 = __nccwpck_require__(5278);
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

/***/ 8041:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(9925);
const auth_1 = __nccwpck_require__(3702);
const core_1 = __nccwpck_require__(2186);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
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
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 3702:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' +
                Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;


/***/ }),

/***/ 9925:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __nccwpck_require__(3685);
const https = __nccwpck_require__(5687);
const pm = __nccwpck_require__(6443);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __nccwpck_require__(4294);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 6443:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ }),

/***/ 7703:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MAIN_FILE_NAME = exports.BUILD_OUTPUT_DIR = exports.NON_STANDARD_NODE_ENV = void 0;
exports.NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against.`;
exports.BUILD_OUTPUT_DIR = "dist";
exports.MAIN_FILE_NAME = "worker.js";
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 1133:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deploy = void 0;
/* eslint-disable node/no-process-env */
const node_fs_1 = __importDefault(__nccwpck_require__(7561));
const node_path_1 = __importDefault(__nccwpck_require__(9411));
const constants_1 = __nccwpck_require__(7703);
const env_1 = __importDefault(__nccwpck_require__(5808));
const errors_1 = __nccwpck_require__(3394);
const logger_1 = __nccwpck_require__(3955);
const workers_api_1 = __nccwpck_require__(9162);
async function deploy({ deploymentName, environment, sourceDirectory, }) {
    if (!process.env.CF_ACCOUNT_ID) {
        throw new errors_1.EnvironmentVariableRequiredError("CF_ACCOUNT_ID");
    }
    if (!env_1.default.CF_API_TOKEN) {
        throw new errors_1.EnvironmentVariableRequiredError("CF_API_TOKEN");
    }
    const scriptPath = node_path_1.default.join(sourceDirectory, constants_1.BUILD_OUTPUT_DIR, constants_1.MAIN_FILE_NAME);
    const workerScript = await node_fs_1.default.promises.readFile(scriptPath, "utf-8");
    const api = new workers_api_1.WorkersApi(env_1.default.CF_API_TOKEN);
    let output;
    try {
        output = await api.uploadWorker({
            accountIdentifier: process.env.CF_ACCOUNT_ID,
            scriptName: deploymentName,
            environment,
            workerScript,
        });
    }
    catch (err) {
        logger_1.logger.error(err);
        throw err;
    }
    if (output.errors && output.errors.length > 0) {
        logger_1.logger.error(output);
        throw new Error("Deployment failed");
    }
    else {
        logger_1.logger.info("Successfully deployed Cloudflare Worker");
    }
}
exports.deploy = deploy;
//# sourceMappingURL=deploy.js.map

/***/ }),

/***/ 5808:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/* eslint-disable node/no-process-env */
Object.defineProperty(exports, "__esModule", ({ value: true }));
class Environment {
    get CF_ACCOUNT_ID() {
        const val = process.env.CF_ACCOUNT_ID;
        if (val === undefined) {
            throw new EnvironmentalVariableRequiredError("CF_ACCOUNT_ID");
        }
        return val;
    }
    get CF_API_TOKEN() {
        const val = process.env.CF_API_TOKEN;
        if (val === undefined) {
            throw new EnvironmentalVariableRequiredError("CF_API_TOKEN");
        }
        return val;
    }
}
const env = new Environment();
exports["default"] = env;
class EnvironmentalVariableRequiredError extends Error {
    constructor(name) {
        super(`The environmental variable '${name}' is required.'`);
    }
}
//# sourceMappingURL=env.js.map

/***/ }),

/***/ 3394:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnvironmentVariableRequiredError = void 0;
class EnvironmentVariableRequiredError extends Error {
    constructor(variable) {
        super(`The environment variable '${variable}' is required.`);
    }
}
exports.EnvironmentVariableRequiredError = EnvironmentVariableRequiredError;
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ 7458:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deploy = void 0;
var deploy_1 = __nccwpck_require__(1133);
Object.defineProperty(exports, "deploy", ({ enumerable: true, get: function () { return deploy_1.deploy; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 3955:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = void 0;
const pino_1 = __importDefault(__nccwpck_require__(8085));
exports.logger = (0, pino_1.default)({
    // eslint-disable-next-line node/no-process-env
    level: process.env.LOG_LEVEL ?? "info",
});
//# sourceMappingURL=logger.js.map

/***/ }),

/***/ 7088:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CloudflareApi = void 0;
const undici_1 = __nccwpck_require__(1773);
const logger_1 = __nccwpck_require__(3955);
const CLOUDFLARE_API_BASE = "https://api.cloudflare.com/client/v4/";
class CloudflareApi {
    constructor(authToken) {
        this.headers = {
            "content-type": "application/javascript",
            Authorization: `Bearer ${authToken}`,
        };
    }
    async get(path) {
        const result = await (0, undici_1.fetch)(`${CLOUDFLARE_API_BASE}${path}`, {
            method: "GET",
            headers: this.headers,
        });
        return (await result.json());
    }
    async post(path, data) {
        return this.sendRequest(path, "POST", data);
    }
    async put(path, data) {
        return this.sendRequest(path, "put", data);
    }
    async sendRequest(path, method, data) {
        let body;
        if (typeof data === "string") {
            body = data;
        }
        else {
            body = JSON.stringify(data);
        }
        const response = await (0, undici_1.fetch)(`${CLOUDFLARE_API_BASE}${path}`, {
            method,
            headers: this.headers,
            body,
        });
        try {
            return (await response.json());
        }
        catch (err) {
            logger_1.logger.error(err);
            throw new Error("Cloudflare API Call Failed.");
        }
    }
}
exports.CloudflareApi = CloudflareApi;
//# sourceMappingURL=cloudflare-api.js.map

/***/ }),

/***/ 9162:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkersApi = void 0;
const logger_1 = __nccwpck_require__(3955);
const cloudflare_api_1 = __nccwpck_require__(7088);
class WorkersApi extends cloudflare_api_1.CloudflareApi {
    constructor(authToken) {
        super(authToken);
    }
    async uploadWorker({ accountIdentifier, scriptName, environment, workerScript, }) {
        const path = environment
            ? `accounts/${accountIdentifier}/workers/services/${scriptName}/environments/${environment}`
            : `accounts/${accountIdentifier}/workers/scripts/${scriptName}`;
        const data = (await this.put(path, workerScript));
        if (data.success && data.result) {
            logger_1.logger.debug({
                etag: data.result.etag,
                size: data.result.size,
                usage_model: data.result.usage_model,
                modified_on: data.result.modified_on,
            });
        }
        return data;
    }
}
exports.WorkersApi = WorkersApi;
//# sourceMappingURL=workers-api.js.map

/***/ }),

/***/ 6950:
/***/ ((module) => {

"use strict";


/* global SharedArrayBuffer, Atomics */

if (typeof SharedArrayBuffer !== 'undefined' && typeof Atomics !== 'undefined') {
  const nil = new Int32Array(new SharedArrayBuffer(4))

  function sleep (ms) {
    // also filters out NaN, non-number types, including empty strings, but allows bigints
    const valid = ms > 0 && ms < Infinity 
    if (valid === false) {
      if (typeof ms !== 'number' && typeof ms !== 'bigint') {
        throw TypeError('sleep: ms must be a number')
      }
      throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity')
    }

    Atomics.wait(nil, 0, 0, Number(ms))
  }
  module.exports = sleep
} else {

  function sleep (ms) {
    // also filters out NaN, non-number types, including empty strings, but allows bigints
    const valid = ms > 0 && ms < Infinity 
    if (valid === false) {
      if (typeof ms !== 'number' && typeof ms !== 'bigint') {
        throw TypeError('sleep: ms must be a number')
      }
      throw RangeError('sleep: ms must be a number that is greater than 0 but less than Infinity')
    }
    const target = Date.now() + Number(ms)
    while (target > Date.now()){}
  }

  module.exports = sleep

}


/***/ }),

/***/ 4826:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const validator = __nccwpck_require__(4174)
const parse = __nccwpck_require__(6214)
const redactor = __nccwpck_require__(7333)
const restorer = __nccwpck_require__(8806)
const { groupRedact, nestedRedact } = __nccwpck_require__(4865)
const state = __nccwpck_require__(1012)
const rx = __nccwpck_require__(9158)
const validate = validator()
const noop = (o) => o
noop.restore = noop

const DEFAULT_CENSOR = '[REDACTED]'
fastRedact.rx = rx
fastRedact.validator = validator

module.exports = fastRedact

function fastRedact (opts = {}) {
  const paths = Array.from(new Set(opts.paths || []))
  const serialize = 'serialize' in opts ? (
    opts.serialize === false ? opts.serialize
      : (typeof opts.serialize === 'function' ? opts.serialize : JSON.stringify)
  ) : JSON.stringify
  const remove = opts.remove
  if (remove === true && serialize !== JSON.stringify) {
    throw Error('fast-redact – remove option may only be set when serializer is JSON.stringify')
  }
  const censor = remove === true
    ? undefined
    : 'censor' in opts ? opts.censor : DEFAULT_CENSOR

  const isCensorFct = typeof censor === 'function'
  const censorFctTakesPath = isCensorFct && censor.length > 1

  if (paths.length === 0) return serialize || noop

  validate({ paths, serialize, censor })

  const { wildcards, wcLen, secret } = parse({ paths, censor })

  const compileRestore = restorer({ secret, wcLen })
  const strict = 'strict' in opts ? opts.strict : true

  return redactor({ secret, wcLen, serialize, strict, isCensorFct, censorFctTakesPath }, state({
    secret,
    censor,
    compileRestore,
    serialize,
    groupRedact,
    nestedRedact,
    wildcards,
    wcLen
  }))
}


/***/ }),

/***/ 4865:
/***/ ((module) => {

"use strict";


module.exports = {
  groupRedact,
  groupRestore,
  nestedRedact,
  nestedRestore
}

function groupRestore ({ keys, values, target }) {
  if (target == null) return
  const length = keys.length
  for (var i = 0; i < length; i++) {
    const k = keys[i]
    target[k] = values[i]
  }
}

function groupRedact (o, path, censor, isCensorFct, censorFctTakesPath) {
  const target = get(o, path)
  if (target == null) return { keys: null, values: null, target: null, flat: true }
  const keys = Object.keys(target)
  const keysLength = keys.length
  const pathLength = path.length
  const pathWithKey = censorFctTakesPath ? [...path] : undefined
  const values = new Array(keysLength)

  for (var i = 0; i < keysLength; i++) {
    const key = keys[i]
    values[i] = target[key]

    if (censorFctTakesPath) {
      pathWithKey[pathLength] = key
      target[key] = censor(target[key], pathWithKey)
    } else if (isCensorFct) {
      target[key] = censor(target[key])
    } else {
      target[key] = censor
    }
  }
  return { keys, values, target, flat: true }
}

function nestedRestore (arr) {
  const length = arr.length
  for (var i = 0; i < length; i++) {
    const { key, target, value } = arr[i]
    if (has(target, key)) {
      target[key] = value
    }
    /* istanbul ignore else */
    if (typeof target === 'object') {
      const targetKeys = Object.keys(target)
      for (var j = 0; j < targetKeys.length; j++) {
        const tKey = targetKeys[j]
        const subTarget = target[tKey]
        if (has(subTarget, key)) {
          subTarget[key] = value
        }
      }
    }
  }
}

function nestedRedact (store, o, path, ns, censor, isCensorFct, censorFctTakesPath) {
  const target = get(o, path)
  if (target == null) return
  const keys = Object.keys(target)
  const keysLength = keys.length
  for (var i = 0; i < keysLength; i++) {
    const key = keys[i]
    const { value, parent, exists } =
      specialSet(target, key, path, ns, censor, isCensorFct, censorFctTakesPath)

    if (exists === true && parent !== null) {
      store.push({ key: ns[ns.length - 1], target: parent, value })
    }
  }
  return store
}

function has (obj, prop) {
  return obj !== undefined && obj !== null
    ? ('hasOwn' in Object ? Object.hasOwn(obj, prop) : Object.prototype.hasOwnProperty.call(obj, prop))
    : false
}

function specialSet (o, k, path, afterPath, censor, isCensorFct, censorFctTakesPath) {
  const afterPathLen = afterPath.length
  const lastPathIndex = afterPathLen - 1
  const originalKey = k
  var i = -1
  var n
  var nv
  var ov
  var oov = null
  var exists = true
  var wc = null
  ov = n = o[k]
  if (typeof n !== 'object') return { value: null, parent: null, exists }
  while (n != null && ++i < afterPathLen) {
    k = afterPath[i]
    oov = ov
    if (k !== '*' && !wc && !(typeof n === 'object' && k in n)) {
      exists = false
      break
    }
    if (k === '*') {
      wc = k
      if (i !== lastPathIndex) {
        continue
      }
    }
    if (wc) {
      const wcKeys = Object.keys(n)
      for (var j = 0; j < wcKeys.length; j++) {
        const wck = wcKeys[j]
        const wcov = n[wck]
        const kIsWc = k === '*'
        if (kIsWc || (typeof wcov === 'object' && wcov !== null && k in wcov)) {
          if (kIsWc) {
            ov = wcov
          } else {
            ov = wcov[k]
          }
          nv = (i !== lastPathIndex)
            ? ov
            : (isCensorFct
              ? (censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov))
              : censor)
          if (kIsWc) {
            n[wck] = nv
          } else {
            wcov[k] = (nv === undefined && censor !== undefined) || (has(wcov, k) && nv === ov) ? wcov[k] : nv
          }
        }
      }
      wc = null
    } else {
      ov = n[k]
      nv = (i !== lastPathIndex)
        ? ov
        : (isCensorFct
          ? (censorFctTakesPath ? censor(ov, [...path, originalKey, ...afterPath]) : censor(ov))
          : censor)
      n[k] = (has(n, k) && nv === ov) || (nv === undefined && censor !== undefined) ? n[k] : nv
      n = n[k]
    }
    if (typeof n !== 'object') break
  }
  return { value: ov, parent: oov, exists }
}

function get (o, p) {
  var i = -1
  var l = p.length
  var n = o
  while (n != null && ++i < l) {
    n = n[p[i]]
  }
  return n
}


/***/ }),

/***/ 6214:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const rx = __nccwpck_require__(9158)

module.exports = parse

function parse ({ paths }) {
  const wildcards = []
  var wcLen = 0
  const secret = paths.reduce(function (o, strPath, ix) {
    var path = strPath.match(rx).map((p) => p.replace(/'|"|`/g, ''))
    const leadingBracket = strPath[0] === '['
    path = path.map((p) => {
      if (p[0] === '[') return p.substr(1, p.length - 2)
      else return p
    })
    const star = path.indexOf('*')
    if (star > -1) {
      const before = path.slice(0, star)
      const beforeStr = before.join('.')
      const after = path.slice(star + 1, path.length)
      const nested = after.length > 0
      wcLen++
      wildcards.push({
        before,
        beforeStr,
        after,
        nested
      })
    } else {
      o[strPath] = {
        path: path,
        val: undefined,
        precensored: false,
        circle: '',
        escPath: JSON.stringify(strPath),
        leadingBracket: leadingBracket
      }
    }
    return o
  }, {})

  return { wildcards, wcLen, secret }
}


/***/ }),

/***/ 7333:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const rx = __nccwpck_require__(9158)

module.exports = redactor

function redactor ({ secret, serialize, wcLen, strict, isCensorFct, censorFctTakesPath }, state) {
  /* eslint-disable-next-line */
  const redact = Function('o', `
    if (typeof o !== 'object' || o == null) {
      ${strictImpl(strict, serialize)}
    }
    const { censor, secret } = this
    ${redactTmpl(secret, isCensorFct, censorFctTakesPath)}
    this.compileRestore()
    ${dynamicRedactTmpl(wcLen > 0, isCensorFct, censorFctTakesPath)}
    ${resultTmpl(serialize)}
  `).bind(state)

  if (serialize === false) {
    redact.restore = (o) => state.restore(o)
  }

  return redact
}

function redactTmpl (secret, isCensorFct, censorFctTakesPath) {
  return Object.keys(secret).map((path) => {
    const { escPath, leadingBracket, path: arrPath } = secret[path]
    const skip = leadingBracket ? 1 : 0
    const delim = leadingBracket ? '' : '.'
    const hops = []
    var match
    while ((match = rx.exec(path)) !== null) {
      const [ , ix ] = match
      const { index, input } = match
      if (index > skip) hops.push(input.substring(0, index - (ix ? 0 : 1)))
    }
    var existence = hops.map((p) => `o${delim}${p}`).join(' && ')
    if (existence.length === 0) existence += `o${delim}${path} != null`
    else existence += ` && o${delim}${path} != null`

    const circularDetection = `
      switch (true) {
        ${hops.reverse().map((p) => `
          case o${delim}${p} === censor:
            secret[${escPath}].circle = ${JSON.stringify(p)}
            break
        `).join('\n')}
      }
    `

    const censorArgs = censorFctTakesPath
      ? `val, ${JSON.stringify(arrPath)}`
      : `val`

    return `
      if (${existence}) {
        const val = o${delim}${path}
        if (val === censor) {
          secret[${escPath}].precensored = true
        } else {
          secret[${escPath}].val = val
          o${delim}${path} = ${isCensorFct ? `censor(${censorArgs})` : 'censor'}
          ${circularDetection}
        }
      }
    `
  }).join('\n')
}

function dynamicRedactTmpl (hasWildcards, isCensorFct, censorFctTakesPath) {
  return hasWildcards === true ? `
    {
      const { wildcards, wcLen, groupRedact, nestedRedact } = this
      for (var i = 0; i < wcLen; i++) {
        const { before, beforeStr, after, nested } = wildcards[i]
        if (nested === true) {
          secret[beforeStr] = secret[beforeStr] || []
          nestedRedact(secret[beforeStr], o, before, after, censor, ${isCensorFct}, ${censorFctTakesPath})
        } else secret[beforeStr] = groupRedact(o, before, censor, ${isCensorFct}, ${censorFctTakesPath})
      }
    }
  ` : ''
}

function resultTmpl (serialize) {
  return serialize === false ? `return o` : `
    var s = this.serialize(o)
    this.restore(o)
    return s
  `
}

function strictImpl (strict, serialize) {
  return strict === true
    ? `throw Error('fast-redact: primitives cannot be redacted')`
    : serialize === false ? `return o` : `return this.serialize(o)`
}


/***/ }),

/***/ 8806:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { groupRestore, nestedRestore } = __nccwpck_require__(4865)

module.exports = restorer

function restorer ({ secret, wcLen }) {
  return function compileRestore () {
    if (this.restore) return
    const paths = Object.keys(secret)
    const resetters = resetTmpl(secret, paths)
    const hasWildcards = wcLen > 0
    const state = hasWildcards ? { secret, groupRestore, nestedRestore } : { secret }
    /* eslint-disable-next-line */
    this.restore = Function(
      'o',
      restoreTmpl(resetters, paths, hasWildcards)
    ).bind(state)
  }
}

/**
 * Mutates the original object to be censored by restoring its original values
 * prior to censoring.
 *
 * @param {object} secret Compiled object describing which target fields should
 * be censored and the field states.
 * @param {string[]} paths The list of paths to censor as provided at
 * initialization time.
 *
 * @returns {string} String of JavaScript to be used by `Function()`. The
 * string compiles to the function that does the work in the description.
 */
function resetTmpl (secret, paths) {
  return paths.map((path) => {
    const { circle, escPath, leadingBracket } = secret[path]
    const delim = leadingBracket ? '' : '.'
    const reset = circle
      ? `o.${circle} = secret[${escPath}].val`
      : `o${delim}${path} = secret[${escPath}].val`
    const clear = `secret[${escPath}].val = undefined`
    return `
      if (secret[${escPath}].val !== undefined) {
        try { ${reset} } catch (e) {}
        ${clear}
      }
    `
  }).join('')
}

/**
 * Creates the body of the restore function
 *
 * Restoration of the redacted object happens
 * backwards, in reverse order of redactions,
 * so that repeated redactions on the same object
 * property can be eventually rolled back to the
 * original value.
 *
 * This way dynamic redactions are restored first,
 * starting from the last one working backwards and
 * followed by the static ones.
 *
 * @returns {string} the body of the restore function
 */
function restoreTmpl (resetters, paths, hasWildcards) {
  const dynamicReset = hasWildcards === true ? `
    const keys = Object.keys(secret)
    const len = keys.length
    for (var i = len - 1; i >= ${paths.length}; i--) {
      const k = keys[i]
      const o = secret[k]
      if (o.flat === true) this.groupRestore(o)
      else this.nestedRestore(o)
      secret[k] = null
    }
  ` : ''

  return `
    const secret = this.secret
    ${dynamicReset}
    ${resetters}
    return o
  `
}


/***/ }),

/***/ 9158:
/***/ ((module) => {

"use strict";


module.exports = /[^.[\]]+|\[((?:.)*?)\]/g

/*
Regular expression explanation:

Alt 1: /[^.[\]]+/ - Match one or more characters that are *not* a dot (.)
                    opening square bracket ([) or closing square bracket (])

Alt 2: /\[((?:.)*?)\]/ - If the char IS dot or square bracket, then create a capture
                         group (which will be capture group $1) that matches anything
                         within square brackets. Expansion is lazy so it will
                         stop matching as soon as the first closing bracket is met `]`
                         (rather than continuing to match until the final closing bracket).
*/


/***/ }),

/***/ 1012:
/***/ ((module) => {

"use strict";


module.exports = state

function state (o) {
  const {
    secret,
    censor,
    compileRestore,
    serialize,
    groupRedact,
    nestedRedact,
    wildcards,
    wcLen
  } = o
  const builder = [{ secret, censor, compileRestore }]
  if (serialize !== false) builder.push({ serialize })
  if (wcLen > 0) builder.push({ groupRedact, nestedRedact, wildcards, wcLen })
  return Object.assign(...builder)
}


/***/ }),

/***/ 4174:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { createContext, runInContext } = __nccwpck_require__(6144)

module.exports = validator

function validator (opts = {}) {
  const {
    ERR_PATHS_MUST_BE_STRINGS = () => 'fast-redact - Paths must be (non-empty) strings',
    ERR_INVALID_PATH = (s) => `fast-redact – Invalid path (${s})`
  } = opts

  return function validate ({ paths }) {
    paths.forEach((s) => {
      if (typeof s !== 'string') {
        throw Error(ERR_PATHS_MUST_BE_STRINGS())
      }
      try {
        if (/〇/.test(s)) throw Error()
        const proxy = new Proxy({}, { get: () => proxy, set: () => { throw Error() } })
        const expr = (s[0] === '[' ? '' : '.') + s.replace(/^\*/, '〇').replace(/\.\*/g, '.〇').replace(/\[\*\]/g, '[〇]')
        if (/\n|\r|;/.test(expr)) throw Error()
        if (/\/\*/.test(expr)) throw Error()
        runInContext(`
          (function () {
            'use strict'
            o${expr}
            if ([o${expr}].length !== 1) throw Error()
          })()
        `, createContext({ o: proxy, 〇: null }), {
          codeGeneration: { strings: false, wasm: false }
        })
      } catch (e) {
        throw Error(ERR_INVALID_PATH(s))
      }
    })
  }
}


/***/ }),

/***/ 9660:
/***/ ((module) => {

"use strict";


function genWrap (wraps, ref, fn, event) {
  function wrap () {
    const obj = ref.deref()
    // This should alway happen, however GC is
    // undeterministic so it might happen.
    /* istanbul ignore else */
    if (obj !== undefined) {
      fn(obj, event)
    }
  }

  wraps[event] = wrap
  process.once(event, wrap)
}

const registry = new FinalizationRegistry(clear)
const map = new WeakMap()

function clear (wraps) {
  process.removeListener('exit', wraps.exit)
  process.removeListener('beforeExit', wraps.beforeExit)
}

function register (obj, fn) {
  if (obj === undefined) {
    throw new Error('the object can\'t be undefined')
  }
  const ref = new WeakRef(obj)

  const wraps = {}
  map.set(obj, wraps)
  registry.register(obj, wraps)

  genWrap(wraps, ref, fn, 'exit')
  genWrap(wraps, ref, fn, 'beforeExit')
}

function unregister (obj) {
  const wraps = map.get(obj)
  map.delete(obj)
  if (wraps) {
    clear(wraps)
  }
  registry.unregister(obj)
}

module.exports = {
  register,
  unregister
}


/***/ }),

/***/ 5521:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { format } = __nccwpck_require__(3837)

function build () {
  const codes = {}
  const emitted = new Map()

  function create (name, code, message) {
    if (!name) throw new Error('Warning name must not be empty')
    if (!code) throw new Error('Warning code must not be empty')
    if (!message) throw new Error('Warning message must not be empty')

    code = code.toUpperCase()

    if (codes[code] !== undefined) {
      throw new Error(`The code '${code}' already exist`)
    }

    function buildWarnOpts (a, b, c) {
      // more performant than spread (...) operator
      let formatted
      if (a && b && c) {
        formatted = format(message, a, b, c)
      } else if (a && b) {
        formatted = format(message, a, b)
      } else if (a) {
        formatted = format(message, a)
      } else {
        formatted = message
      }

      return {
        code,
        name,
        message: formatted
      }
    }

    emitted.set(code, false)
    codes[code] = buildWarnOpts

    return codes[code]
  }

  function emit (code, a, b, c) {
    if (codes[code] === undefined) throw new Error(`The code '${code}' does not exist`)
    if (emitted.get(code) === true) return
    emitted.set(code, true)

    const warning = codes[code](a, b, c)
    process.emitWarning(warning.message, warning.name, warning.code)
  }

  return {
    create,
    emit,
    emitted
  }
}

module.exports = build


/***/ }),

/***/ 5933:
/***/ ((module) => {

"use strict";

function tryStringify (o) {
  try { return JSON.stringify(o) } catch(e) { return '"[Circular]"' }
}

module.exports = format

function format(f, args, opts) {
  var ss = (opts && opts.stringify) || tryStringify
  var offset = 1
  if (typeof f === 'object' && f !== null) {
    var len = args.length + offset
    if (len === 1) return f
    var objects = new Array(len)
    objects[0] = ss(f)
    for (var index = 1; index < len; index++) {
      objects[index] = ss(args[index])
    }
    return objects.join(' ')
  }
  if (typeof f !== 'string') {
    return f
  }
  var argLen = args.length
  if (argLen === 0) return f
  var str = ''
  var a = 1 - offset
  var lastPos = -1
  var flen = (f && f.length) || 0
  for (var i = 0; i < flen;) {
    if (f.charCodeAt(i) === 37 && i + 1 < flen) {
      lastPos = lastPos > -1 ? lastPos : 0
      switch (f.charCodeAt(i + 1)) {
        case 100: // 'd'
        case 102: // 'f'
          if (a >= argLen)
            break
          if (args[a] == null)  break
          if (lastPos < i)
            str += f.slice(lastPos, i)
          str += Number(args[a])
          lastPos = i + 2
          i++
          break
        case 105: // 'i'
          if (a >= argLen)
            break
          if (args[a] == null)  break
          if (lastPos < i)
            str += f.slice(lastPos, i)
          str += Math.floor(Number(args[a]))
          lastPos = i + 2
          i++
          break
        case 79: // 'O'
        case 111: // 'o'
        case 106: // 'j'
          if (a >= argLen)
            break
          if (args[a] === undefined) break
          if (lastPos < i)
            str += f.slice(lastPos, i)
          var type = typeof args[a]
          if (type === 'string') {
            str += '\'' + args[a] + '\''
            lastPos = i + 2
            i++
            break
          }
          if (type === 'function') {
            str += args[a].name || '<anonymous>'
            lastPos = i + 2
            i++
            break
          }
          str += ss(args[a])
          lastPos = i + 2
          i++
          break
        case 115: // 's'
          if (a >= argLen)
            break
          if (lastPos < i)
            str += f.slice(lastPos, i)
          str += String(args[a])
          lastPos = i + 2
          i++
          break
        case 37: // '%'
          if (lastPos < i)
            str += f.slice(lastPos, i)
          str += '%'
          lastPos = i + 2
          i++
          a--
          break
      }
      ++a
    }
    ++i
  }
  if (lastPos === -1)
    return f
  else if (lastPos < flen) {
    str += f.slice(lastPos)
  }

  return str
}


/***/ }),

/***/ 7560:
/***/ ((module, exports) => {

"use strict";


const stringify = configure()

// @ts-expect-error
stringify.configure = configure
// @ts-expect-error
stringify.stringify = stringify

// @ts-expect-error
stringify.default = stringify

// @ts-expect-error used for named export
exports.stringify = stringify
// @ts-expect-error used for named export
exports.configure = configure

module.exports = stringify

// eslint-disable-next-line
const strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/
// eslint-disable-next-line
const strEscapeSequencesReplacer = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/g

// Escaped special characters. Use empty strings to fill up unused entries.
const meta = [
  '\\u0000', '\\u0001', '\\u0002', '\\u0003', '\\u0004',
  '\\u0005', '\\u0006', '\\u0007', '\\b', '\\t',
  '\\n', '\\u000b', '\\f', '\\r', '\\u000e',
  '\\u000f', '\\u0010', '\\u0011', '\\u0012', '\\u0013',
  '\\u0014', '\\u0015', '\\u0016', '\\u0017', '\\u0018',
  '\\u0019', '\\u001a', '\\u001b', '\\u001c', '\\u001d',
  '\\u001e', '\\u001f', '', '', '\\"',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '\\\\'
]

function escapeFn (str) {
  if (str.length === 2) {
    const charCode = str.charCodeAt(1)
    return `${str[0]}\\u${charCode.toString(16)}`
  }
  const charCode = str.charCodeAt(0)
  return meta.length > charCode
    ? meta[charCode]
    : `\\u${charCode.toString(16)}`
}

// Escape C0 control characters, double quotes, the backslash and every code
// unit with a numeric value in the inclusive range 0xD800 to 0xDFFF.
function strEscape (str) {
  // Some magic numbers that worked out fine while benchmarking with v8 8.0
  if (str.length < 5000 && !strEscapeSequencesRegExp.test(str)) {
    return str
  }
  if (str.length > 100) {
    return str.replace(strEscapeSequencesReplacer, escapeFn)
  }
  let result = ''
  let last = 0
  for (let i = 0; i < str.length; i++) {
    const point = str.charCodeAt(i)
    if (point === 34 || point === 92 || point < 32) {
      result += `${str.slice(last, i)}${meta[point]}`
      last = i + 1
    } else if (point >= 0xd800 && point <= 0xdfff) {
      if (point <= 0xdbff && i + 1 < str.length) {
        const point = str.charCodeAt(i + 1)
        if (point >= 0xdc00 && point <= 0xdfff) {
          i++
          continue
        }
      }
      result += `${str.slice(last, i)}${`\\u${point.toString(16)}`}`
      last = i + 1
    }
  }
  result += str.slice(last)
  return result
}

function insertSort (array) {
  // Insertion sort is very efficient for small input sizes but it has a bad
  // worst case complexity. Thus, use native array sort for bigger values.
  if (array.length > 2e2) {
    return array.sort()
  }
  for (let i = 1; i < array.length; i++) {
    const currentValue = array[i]
    let position = i
    while (position !== 0 && array[position - 1] > currentValue) {
      array[position] = array[position - 1]
      position--
    }
    array[position] = currentValue
  }
  return array
}

const typedArrayPrototypeGetSymbolToStringTag =
  Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(
      Object.getPrototypeOf(
        new Uint8Array()
      )
    ),
    Symbol.toStringTag
  ).get

function isTypedArrayWithEntries (value) {
  return typedArrayPrototypeGetSymbolToStringTag.call(value) !== undefined && value.length !== 0
}

function stringifyTypedArray (array, separator, maximumBreadth) {
  if (array.length < maximumBreadth) {
    maximumBreadth = array.length
  }
  const whitespace = separator === ',' ? '' : ' '
  let res = `"0":${whitespace}${array[0]}`
  for (let i = 1; i < maximumBreadth; i++) {
    res += `${separator}"${i}":${whitespace}${array[i]}`
  }
  return res
}

function getCircularValueOption (options) {
  if (options && Object.prototype.hasOwnProperty.call(options, 'circularValue')) {
    var circularValue = options.circularValue
    if (typeof circularValue === 'string') {
      return `"${circularValue}"`
    }
    if (circularValue == null) {
      return circularValue
    }
    if (circularValue === Error || circularValue === TypeError) {
      return {
        toString () {
          throw new TypeError('Converting circular structure to JSON')
        }
      }
    }
    throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined')
  }
  return '"[Circular]"'
}

function getBooleanOption (options, key) {
  if (options && Object.prototype.hasOwnProperty.call(options, key)) {
    var value = options[key]
    if (typeof value !== 'boolean') {
      throw new TypeError(`The "${key}" argument must be of type boolean`)
    }
  }
  return value === undefined ? true : value
}

function getPositiveIntegerOption (options, key) {
  if (options && Object.prototype.hasOwnProperty.call(options, key)) {
    var value = options[key]
    if (typeof value !== 'number') {
      throw new TypeError(`The "${key}" argument must be of type number`)
    }
    if (!Number.isInteger(value)) {
      throw new TypeError(`The "${key}" argument must be an integer`)
    }
    if (value < 1) {
      throw new RangeError(`The "${key}" argument must be >= 1`)
    }
  }
  return value === undefined ? Infinity : value
}

function getItemCount (number) {
  if (number === 1) {
    return '1 item'
  }
  return `${number} items`
}

function getUniqueReplacerSet (replacerArray) {
  const replacerSet = new Set()
  for (const value of replacerArray) {
    if (typeof value === 'string') {
      replacerSet.add(value)
    } else if (typeof value === 'number') {
      replacerSet.add(String(value))
    }
  }
  return replacerSet
}

function configure (options) {
  const circularValue = getCircularValueOption(options)
  const bigint = getBooleanOption(options, 'bigint')
  const deterministic = getBooleanOption(options, 'deterministic')
  const maximumDepth = getPositiveIntegerOption(options, 'maximumDepth')
  const maximumBreadth = getPositiveIntegerOption(options, 'maximumBreadth')

  function stringifyFnReplacer (key, parent, stack, replacer, spacer, indentation) {
    let value = parent[key]

    if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
      value = value.toJSON(key)
    }
    value = replacer.call(parent, key, value)

    switch (typeof value) {
      case 'string':
        return `"${strEscape(value)}"`
      case 'object': {
        if (value === null) {
          return 'null'
        }
        if (stack.indexOf(value) !== -1) {
          return circularValue
        }

        let res = ''
        let join = ','
        const originalIndentation = indentation

        if (Array.isArray(value)) {
          if (value.length === 0) {
            return '[]'
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Array]"'
          }
          stack.push(value)
          if (spacer !== '') {
            indentation += spacer
            res += `\n${indentation}`
            join = `,\n${indentation}`
          }
          const maximumValuesToStringify = Math.min(value.length, maximumBreadth)
          let i = 0
          for (; i < maximumValuesToStringify - 1; i++) {
            const tmp = stringifyFnReplacer(i, value, stack, replacer, spacer, indentation)
            res += tmp !== undefined ? tmp : 'null'
            res += join
          }
          const tmp = stringifyFnReplacer(i, value, stack, replacer, spacer, indentation)
          res += tmp !== undefined ? tmp : 'null'
          if (value.length - 1 > maximumBreadth) {
            const removedKeys = value.length - maximumBreadth - 1
            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`
          }
          if (spacer !== '') {
            res += `\n${originalIndentation}`
          }
          stack.pop()
          return `[${res}]`
        }

        let keys = Object.keys(value)
        const keyLength = keys.length
        if (keyLength === 0) {
          return '{}'
        }
        if (maximumDepth < stack.length + 1) {
          return '"[Object]"'
        }
        let whitespace = ''
        let separator = ''
        if (spacer !== '') {
          indentation += spacer
          join = `,\n${indentation}`
          whitespace = ' '
        }
        let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth)
        if (isTypedArrayWithEntries(value)) {
          res += stringifyTypedArray(value, join, maximumBreadth)
          keys = keys.slice(value.length)
          maximumPropertiesToStringify -= value.length
          separator = join
        }
        if (deterministic) {
          keys = insertSort(keys)
        }
        stack.push(value)
        for (let i = 0; i < maximumPropertiesToStringify; i++) {
          const key = keys[i]
          const tmp = stringifyFnReplacer(key, value, stack, replacer, spacer, indentation)
          if (tmp !== undefined) {
            res += `${separator}"${strEscape(key)}":${whitespace}${tmp}`
            separator = join
          }
        }
        if (keyLength > maximumBreadth) {
          const removedKeys = keyLength - maximumBreadth
          res += `${separator}"...":${whitespace}"${getItemCount(removedKeys)} not stringified"`
          separator = join
        }
        if (spacer !== '' && separator.length > 1) {
          res = `\n${indentation}${res}\n${originalIndentation}`
        }
        stack.pop()
        return `{${res}}`
      }
      case 'number':
        return isFinite(value) ? String(value) : 'null'
      case 'boolean':
        return value === true ? 'true' : 'false'
      case 'bigint':
        return bigint ? String(value) : undefined
    }
  }

  function stringifyArrayReplacer (key, value, stack, replacer, spacer, indentation) {
    if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
      value = value.toJSON(key)
    }

    switch (typeof value) {
      case 'string':
        return `"${strEscape(value)}"`
      case 'object': {
        if (value === null) {
          return 'null'
        }
        if (stack.indexOf(value) !== -1) {
          return circularValue
        }

        const originalIndentation = indentation
        let res = ''
        let join = ','

        if (Array.isArray(value)) {
          if (value.length === 0) {
            return '[]'
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Array]"'
          }
          stack.push(value)
          if (spacer !== '') {
            indentation += spacer
            res += `\n${indentation}`
            join = `,\n${indentation}`
          }
          const maximumValuesToStringify = Math.min(value.length, maximumBreadth)
          let i = 0
          for (; i < maximumValuesToStringify - 1; i++) {
            const tmp = stringifyArrayReplacer(i, value[i], stack, replacer, spacer, indentation)
            res += tmp !== undefined ? tmp : 'null'
            res += join
          }
          const tmp = stringifyArrayReplacer(i, value[i], stack, replacer, spacer, indentation)
          res += tmp !== undefined ? tmp : 'null'
          if (value.length - 1 > maximumBreadth) {
            const removedKeys = value.length - maximumBreadth - 1
            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`
          }
          if (spacer !== '') {
            res += `\n${originalIndentation}`
          }
          stack.pop()
          return `[${res}]`
        }
        if (replacer.size === 0) {
          return '{}'
        }
        stack.push(value)
        let whitespace = ''
        if (spacer !== '') {
          indentation += spacer
          join = `,\n${indentation}`
          whitespace = ' '
        }
        let separator = ''
        for (const key of replacer) {
          const tmp = stringifyArrayReplacer(key, value[key], stack, replacer, spacer, indentation)
          if (tmp !== undefined) {
            res += `${separator}"${strEscape(key)}":${whitespace}${tmp}`
            separator = join
          }
        }
        if (spacer !== '' && separator.length > 1) {
          res = `\n${indentation}${res}\n${originalIndentation}`
        }
        stack.pop()
        return `{${res}}`
      }
      case 'number':
        return isFinite(value) ? String(value) : 'null'
      case 'boolean':
        return value === true ? 'true' : 'false'
      case 'bigint':
        return bigint ? String(value) : undefined
    }
  }

  function stringifyIndent (key, value, stack, spacer, indentation) {
    switch (typeof value) {
      case 'string':
        return `"${strEscape(value)}"`
      case 'object': {
        if (value === null) {
          return 'null'
        }
        if (typeof value.toJSON === 'function') {
          value = value.toJSON(key)
          // Prevent calling `toJSON` again.
          if (typeof value !== 'object') {
            return stringifyIndent(key, value, stack, spacer, indentation)
          }
          if (value === null) {
            return 'null'
          }
        }
        if (stack.indexOf(value) !== -1) {
          return circularValue
        }
        const originalIndentation = indentation

        if (Array.isArray(value)) {
          if (value.length === 0) {
            return '[]'
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Array]"'
          }
          stack.push(value)
          indentation += spacer
          let res = `\n${indentation}`
          const join = `,\n${indentation}`
          const maximumValuesToStringify = Math.min(value.length, maximumBreadth)
          let i = 0
          for (; i < maximumValuesToStringify - 1; i++) {
            const tmp = stringifyIndent(i, value[i], stack, spacer, indentation)
            res += tmp !== undefined ? tmp : 'null'
            res += join
          }
          const tmp = stringifyIndent(i, value[i], stack, spacer, indentation)
          res += tmp !== undefined ? tmp : 'null'
          if (value.length - 1 > maximumBreadth) {
            const removedKeys = value.length - maximumBreadth - 1
            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`
          }
          res += `\n${originalIndentation}`
          stack.pop()
          return `[${res}]`
        }

        let keys = Object.keys(value)
        const keyLength = keys.length
        if (keyLength === 0) {
          return '{}'
        }
        if (maximumDepth < stack.length + 1) {
          return '"[Object]"'
        }
        indentation += spacer
        const join = `,\n${indentation}`
        let res = ''
        let separator = ''
        let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth)
        if (isTypedArrayWithEntries(value)) {
          res += stringifyTypedArray(value, join, maximumBreadth)
          keys = keys.slice(value.length)
          maximumPropertiesToStringify -= value.length
          separator = join
        }
        if (deterministic) {
          keys = insertSort(keys)
        }
        stack.push(value)
        for (let i = 0; i < maximumPropertiesToStringify; i++) {
          const key = keys[i]
          const tmp = stringifyIndent(key, value[key], stack, spacer, indentation)
          if (tmp !== undefined) {
            res += `${separator}"${strEscape(key)}": ${tmp}`
            separator = join
          }
        }
        if (keyLength > maximumBreadth) {
          const removedKeys = keyLength - maximumBreadth
          res += `${separator}"...": "${getItemCount(removedKeys)} not stringified"`
          separator = join
        }
        if (separator !== '') {
          res = `\n${indentation}${res}\n${originalIndentation}`
        }
        stack.pop()
        return `{${res}}`
      }
      case 'number':
        return isFinite(value) ? String(value) : 'null'
      case 'boolean':
        return value === true ? 'true' : 'false'
      case 'bigint':
        return bigint ? String(value) : undefined
    }
  }

  function stringifySimple (key, value, stack) {
    switch (typeof value) {
      case 'string':
        return `"${strEscape(value)}"`
      case 'object': {
        if (value === null) {
          return 'null'
        }
        if (typeof value.toJSON === 'function') {
          value = value.toJSON(key)
          // Prevent calling `toJSON` again
          if (typeof value !== 'object') {
            return stringifySimple(key, value, stack)
          }
          if (value === null) {
            return 'null'
          }
        }
        if (stack.indexOf(value) !== -1) {
          return circularValue
        }

        let res = ''

        if (Array.isArray(value)) {
          if (value.length === 0) {
            return '[]'
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Array]"'
          }
          stack.push(value)
          const maximumValuesToStringify = Math.min(value.length, maximumBreadth)
          let i = 0
          for (; i < maximumValuesToStringify - 1; i++) {
            const tmp = stringifySimple(i, value[i], stack)
            res += tmp !== undefined ? tmp : 'null'
            res += ','
          }
          const tmp = stringifySimple(i, value[i], stack)
          res += tmp !== undefined ? tmp : 'null'
          if (value.length - 1 > maximumBreadth) {
            const removedKeys = value.length - maximumBreadth - 1
            res += `,"... ${getItemCount(removedKeys)} not stringified"`
          }
          stack.pop()
          return `[${res}]`
        }

        let keys = Object.keys(value)
        const keyLength = keys.length
        if (keyLength === 0) {
          return '{}'
        }
        if (maximumDepth < stack.length + 1) {
          return '"[Object]"'
        }
        let separator = ''
        let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth)
        if (isTypedArrayWithEntries(value)) {
          res += stringifyTypedArray(value, ',', maximumBreadth)
          keys = keys.slice(value.length)
          maximumPropertiesToStringify -= value.length
          separator = ','
        }
        if (deterministic) {
          keys = insertSort(keys)
        }
        stack.push(value)
        for (let i = 0; i < maximumPropertiesToStringify; i++) {
          const key = keys[i]
          const tmp = stringifySimple(key, value[key], stack)
          if (tmp !== undefined) {
            res += `${separator}"${strEscape(key)}":${tmp}`
            separator = ','
          }
        }
        if (keyLength > maximumBreadth) {
          const removedKeys = keyLength - maximumBreadth
          res += `${separator}"...":"${getItemCount(removedKeys)} not stringified"`
        }
        stack.pop()
        return `{${res}}`
      }
      case 'number':
        return isFinite(value) ? String(value) : 'null'
      case 'boolean':
        return value === true ? 'true' : 'false'
      case 'bigint':
        return bigint ? String(value) : undefined
    }
  }

  function stringify (value, replacer, space) {
    if (arguments.length > 1) {
      let spacer = ''
      if (typeof space === 'number') {
        spacer = ' '.repeat(Math.min(space, 10))
      } else if (typeof space === 'string') {
        spacer = space.slice(0, 10)
      }
      if (replacer != null) {
        if (typeof replacer === 'function') {
          return stringifyFnReplacer('', { '': value }, [], replacer, spacer, '')
        }
        if (Array.isArray(replacer)) {
          return stringifyArrayReplacer('', value, [], getUniqueReplacerSet(replacer), spacer, '')
        }
      }
      if (spacer.length !== 0) {
        return stringifyIndent('', value, [], spacer, '')
      }
    }
    return stringifySimple('', value, [])
  }

  return stringify
}


/***/ }),

/***/ 8366:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { EventEmitter } = __nccwpck_require__(2361)
const { Worker } = __nccwpck_require__(1267)
const { join } = __nccwpck_require__(1017)
const { pathToFileURL } = __nccwpck_require__(7310)
const { wait } = __nccwpck_require__(3916)
const {
  WRITE_INDEX,
  READ_INDEX
} = __nccwpck_require__(4212)
const buffer = __nccwpck_require__(4300)
const assert = __nccwpck_require__(9491)

const kImpl = Symbol('kImpl')

// V8 limit for string size
const MAX_STRING = buffer.constants.MAX_STRING_LENGTH

class FakeWeakRef {
  constructor (value) {
    this._value = value
  }

  deref () {
    return this._value
  }
}

const FinalizationRegistry = global.FinalizationRegistry || class FakeFinalizationRegistry {
  register () {}
  unregister () {}
}

const WeakRef = global.WeakRef || FakeWeakRef

const registry = new FinalizationRegistry((worker) => {
  if (worker.exited) {
    return
  }
  worker.terminate()
})

function createWorker (stream, opts) {
  const { filename, workerData } = opts

  const bundlerOverrides = '__bundlerPathsOverrides' in globalThis ? globalThis.__bundlerPathsOverrides : {}
  const toExecute = bundlerOverrides['thread-stream-worker'] || __nccwpck_require__.ab + "worker1.js"

  const worker = new Worker(toExecute, {
    ...opts.workerOpts,
    workerData: {
      filename: filename.indexOf('file://') === 0
        ? filename
        : pathToFileURL(filename).href,
      dataBuf: stream[kImpl].dataBuf,
      stateBuf: stream[kImpl].stateBuf,
      workerData
    }
  })

  // We keep a strong reference for now,
  // we need to start writing first
  worker.stream = new FakeWeakRef(stream)

  worker.on('message', onWorkerMessage)
  worker.on('exit', onWorkerExit)
  registry.register(stream, worker)

  return worker
}

function drain (stream) {
  assert(!stream[kImpl].sync)
  if (stream[kImpl].needDrain) {
    stream[kImpl].needDrain = false
    stream.emit('drain')
  }
}

function nextFlush (stream) {
  const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX)
  let leftover = stream[kImpl].data.length - writeIndex

  if (leftover > 0) {
    if (stream[kImpl].buf.length === 0) {
      stream[kImpl].flushing = false

      if (stream[kImpl].ending) {
        end(stream)
      } else if (stream[kImpl].needDrain) {
        process.nextTick(drain, stream)
      }

      return
    }

    let toWrite = stream[kImpl].buf.slice(0, leftover)
    let toWriteBytes = Buffer.byteLength(toWrite)
    if (toWriteBytes <= leftover) {
      stream[kImpl].buf = stream[kImpl].buf.slice(leftover)
      // process._rawDebug('writing ' + toWrite.length)
      write(stream, toWrite, nextFlush.bind(null, stream))
    } else {
      // multi-byte utf-8
      stream.flush(() => {
        Atomics.store(stream[kImpl].state, READ_INDEX, 0)
        Atomics.store(stream[kImpl].state, WRITE_INDEX, 0)

        // Find a toWrite length that fits the buffer
        // it must exists as the buffer is at least 4 bytes length
        // and the max utf-8 length for a char is 4 bytes.
        while (toWriteBytes > stream[kImpl].data.length) {
          leftover = leftover / 2
          toWrite = stream[kImpl].buf.slice(0, leftover)
          toWriteBytes = Buffer.byteLength(toWrite)
        }
        stream[kImpl].buf = stream[kImpl].buf.slice(leftover)
        write(stream, toWrite, nextFlush.bind(null, stream))
      })
    }
  } else if (leftover === 0) {
    if (writeIndex === 0 && stream[kImpl].buf.length === 0) {
      // we had a flushSync in the meanwhile
      return
    }
    stream.flush(() => {
      Atomics.store(stream[kImpl].state, READ_INDEX, 0)
      Atomics.store(stream[kImpl].state, WRITE_INDEX, 0)
      nextFlush(stream)
    })
  } else {
    // This should never happen
    throw new Error('overwritten')
  }
}

function onWorkerMessage (msg) {
  const stream = this.stream.deref()
  if (stream === undefined) {
    this.exited = true
    // Terminate the worker.
    this.terminate()
    return
  }

  switch (msg.code) {
    case 'READY':
      // Replace the FakeWeakRef with a
      // proper one.
      this.stream = new WeakRef(stream)

      stream.flush(() => {
        stream[kImpl].ready = true
        stream.emit('ready')
      })
      break
    case 'ERROR':
      destroy(stream, msg.err)
      break
    default:
      throw new Error('this should not happen: ' + msg.code)
  }
}

function onWorkerExit (code) {
  const stream = this.stream.deref()
  if (stream === undefined) {
    // Nothing to do, the worker already exit
    return
  }
  registry.unregister(stream)
  stream.worker.exited = true
  stream.worker.off('exit', onWorkerExit)
  destroy(stream, code !== 0 ? new Error('The worker thread exited') : null)
}

class ThreadStream extends EventEmitter {
  constructor (opts = {}) {
    super()

    if (opts.bufferSize < 4) {
      throw new Error('bufferSize must at least fit a 4-byte utf-8 char')
    }

    this[kImpl] = {}
    this[kImpl].stateBuf = new SharedArrayBuffer(128)
    this[kImpl].state = new Int32Array(this[kImpl].stateBuf)
    this[kImpl].dataBuf = new SharedArrayBuffer(opts.bufferSize || 4 * 1024 * 1024)
    this[kImpl].data = Buffer.from(this[kImpl].dataBuf)
    this[kImpl].sync = opts.sync || false
    this[kImpl].ending = false
    this[kImpl].ended = false
    this[kImpl].needDrain = false
    this[kImpl].destroyed = false
    this[kImpl].flushing = false
    this[kImpl].ready = false
    this[kImpl].finished = false
    this[kImpl].errored = null
    this[kImpl].closed = false
    this[kImpl].buf = ''

    // TODO (fix): Make private?
    this.worker = createWorker(this, opts) // TODO (fix): make private
  }

  write (data) {
    if (this[kImpl].destroyed) {
      throw new Error('the worker has exited')
    }

    if (this[kImpl].ending) {
      throw new Error('the worker is ending')
    }

    if (this[kImpl].flushing && this[kImpl].buf.length + data.length >= MAX_STRING) {
      try {
        writeSync(this)
        this[kImpl].flushing = true
      } catch (err) {
        destroy(this, err)
        return false
      }
    }

    this[kImpl].buf += data

    if (this[kImpl].sync) {
      try {
        writeSync(this)
        return true
      } catch (err) {
        destroy(this, err)
        return false
      }
    }

    if (!this[kImpl].flushing) {
      this[kImpl].flushing = true
      setImmediate(nextFlush, this)
    }

    this[kImpl].needDrain = this[kImpl].data.length - this[kImpl].buf.length - Atomics.load(this[kImpl].state, WRITE_INDEX) <= 0
    return !this[kImpl].needDrain
  }

  end () {
    if (this[kImpl].destroyed) {
      throw new Error('the worker has exited')
    }

    this[kImpl].ending = true
    end(this)
  }

  flush (cb) {
    if (this[kImpl].destroyed) {
      throw new Error('the worker has exited')
    }

    // TODO write all .buf
    const writeIndex = Atomics.load(this[kImpl].state, WRITE_INDEX)
    // process._rawDebug(`(flush) readIndex (${Atomics.load(this.state, READ_INDEX)}) writeIndex (${Atomics.load(this.state, WRITE_INDEX)})`)
    wait(this[kImpl].state, READ_INDEX, writeIndex, Infinity, (err, res) => {
      if (err) {
        destroy(this, err)
        process.nextTick(cb, err)
        return
      }
      if (res === 'not-equal') {
        // TODO handle deadlock
        this.flush(cb)
        return
      }
      process.nextTick(cb)
    })
  }

  flushSync () {
    if (this[kImpl].destroyed) {
      throw new Error('the worker has exited')
    }

    writeSync(this)
    flushSync(this)
  }

  unref () {
    this.worker.unref()
  }

  ref () {
    this.worker.ref()
  }

  get ready () {
    return this[kImpl].ready
  }

  get destroyed () {
    return this[kImpl].destroyed
  }

  get closed () {
    return this[kImpl].closed
  }

  get writable () {
    return !this[kImpl].destroyed && !this[kImpl].ending
  }

  get writableEnded () {
    return this[kImpl].ending
  }

  get writableFinished () {
    return this[kImpl].finished
  }

  get writableNeedDrain () {
    return this[kImpl].needDrain
  }

  get writableObjectMode () {
    return false
  }

  get writableErrored () {
    return this[kImpl].errored
  }
}

function destroy (stream, err) {
  if (stream[kImpl].destroyed) {
    return
  }
  stream[kImpl].destroyed = true

  if (err) {
    stream[kImpl].errored = err
    stream.emit('error', err)
  }

  if (!stream.worker.exited) {
    stream.worker.terminate()
      .catch(() => {})
      .then(() => {
        stream[kImpl].closed = true
        stream.emit('close')
      })
  } else {
    setImmediate(() => {
      stream[kImpl].closed = true
      stream.emit('close')
    })
  }
}

function write (stream, data, cb) {
  // data is smaller than the shared buffer length
  const current = Atomics.load(stream[kImpl].state, WRITE_INDEX)
  const length = Buffer.byteLength(data)
  stream[kImpl].data.write(data, current)
  Atomics.store(stream[kImpl].state, WRITE_INDEX, current + length)
  Atomics.notify(stream[kImpl].state, WRITE_INDEX)
  cb()
  return true
}

function end (stream) {
  if (stream[kImpl].ended || !stream[kImpl].ending || stream[kImpl].flushing) {
    return
  }
  stream[kImpl].ended = true

  try {
    stream.flushSync()

    let readIndex = Atomics.load(stream[kImpl].state, READ_INDEX)

    // process._rawDebug('writing index')
    Atomics.store(stream[kImpl].state, WRITE_INDEX, -1)
    // process._rawDebug(`(end) readIndex (${Atomics.load(stream.state, READ_INDEX)}) writeIndex (${Atomics.load(stream.state, WRITE_INDEX)})`)
    Atomics.notify(stream[kImpl].state, WRITE_INDEX)

    // Wait for the process to complete
    let spins = 0
    while (readIndex !== -1) {
      // process._rawDebug(`read = ${read}`)
      Atomics.wait(stream[kImpl].state, READ_INDEX, readIndex, 1000)
      readIndex = Atomics.load(stream[kImpl].state, READ_INDEX)

      if (readIndex === -2) {
        throw new Error('end() failed')
      }

      if (++spins === 10) {
        throw new Error('end() took too long (10s)')
      }
    }

    process.nextTick(() => {
      stream[kImpl].finished = true
      stream.emit('finish')
    })
  } catch (err) {
    destroy(stream, err)
  }
  // process._rawDebug('end finished...')
}

function writeSync (stream) {
  const cb = () => {
    if (stream[kImpl].ending) {
      end(stream)
    } else if (stream[kImpl].needDrain) {
      process.nextTick(drain, stream)
    }
  }
  stream[kImpl].flushing = false

  while (stream[kImpl].buf.length !== 0) {
    const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX)
    let leftover = stream[kImpl].data.length - writeIndex
    if (leftover === 0) {
      flushSync(stream)
      Atomics.store(stream[kImpl].state, READ_INDEX, 0)
      Atomics.store(stream[kImpl].state, WRITE_INDEX, 0)
      continue
    } else if (leftover < 0) {
      // stream should never happen
      throw new Error('overwritten')
    }

    let toWrite = stream[kImpl].buf.slice(0, leftover)
    let toWriteBytes = Buffer.byteLength(toWrite)
    if (toWriteBytes <= leftover) {
      stream[kImpl].buf = stream[kImpl].buf.slice(leftover)
      // process._rawDebug('writing ' + toWrite.length)
      write(stream, toWrite, cb)
    } else {
      // multi-byte utf-8
      flushSync(stream)
      Atomics.store(stream[kImpl].state, READ_INDEX, 0)
      Atomics.store(stream[kImpl].state, WRITE_INDEX, 0)

      // Find a toWrite length that fits the buffer
      // it must exists as the buffer is at least 4 bytes length
      // and the max utf-8 length for a char is 4 bytes.
      while (toWriteBytes > stream[kImpl].buf.length) {
        leftover = leftover / 2
        toWrite = stream[kImpl].buf.slice(0, leftover)
        toWriteBytes = Buffer.byteLength(toWrite)
      }
      stream[kImpl].buf = stream[kImpl].buf.slice(leftover)
      write(stream, toWrite, cb)
    }
  }
}

function flushSync (stream) {
  if (stream[kImpl].flushing) {
    throw new Error('unable to flush while flushing')
  }

  // process._rawDebug('flushSync started')

  const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX)

  let spins = 0

  // TODO handle deadlock
  while (true) {
    const readIndex = Atomics.load(stream[kImpl].state, READ_INDEX)

    if (readIndex === -2) {
      throw new Error('_flushSync failed')
    }

    // process._rawDebug(`(flushSync) readIndex (${readIndex}) writeIndex (${writeIndex})`)
    if (readIndex !== writeIndex) {
      // TODO stream timeouts for some reason.
      Atomics.wait(stream[kImpl].state, READ_INDEX, readIndex, 1000)
    } else {
      break
    }

    if (++spins === 10) {
      throw new Error('_flushSync took too long (10s)')
    }
  }
  // process._rawDebug('flushSync finished')
}

module.exports = ThreadStream


/***/ }),

/***/ 4212:
/***/ ((module) => {

"use strict";


const WRITE_INDEX = 4
const READ_INDEX = 8

module.exports = {
  WRITE_INDEX,
  READ_INDEX
}


/***/ }),

/***/ 3916:
/***/ ((module) => {

"use strict";


const MAX_TIMEOUT = 1000

function wait (state, index, expected, timeout, done) {
  const max = Date.now() + timeout
  let current = Atomics.load(state, index)
  if (current === expected) {
    done(null, 'ok')
    return
  }
  let prior = current
  const check = (backoff) => {
    if (Date.now() > max) {
      done(null, 'timed-out')
    } else {
      setTimeout(() => {
        prior = current
        current = Atomics.load(state, index)
        if (current === prior) {
          check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2)
        } else {
          if (current === expected) done(null, 'ok')
          else done(null, 'not-equal')
        }
      }, backoff)
    }
  }
  check(1)
}

// let waitDiffCount = 0
function waitDiff (state, index, expected, timeout, done) {
  // const id = waitDiffCount++
  // process._rawDebug(`>>> waitDiff ${id}`)
  const max = Date.now() + timeout
  let current = Atomics.load(state, index)
  if (current !== expected) {
    done(null, 'ok')
    return
  }
  const check = (backoff) => {
    // process._rawDebug(`${id} ${index} current ${current} expected ${expected}`)
    // process._rawDebug('' + backoff)
    if (Date.now() > max) {
      done(null, 'timed-out')
    } else {
      setTimeout(() => {
        current = Atomics.load(state, index)
        if (current !== expected) {
          done(null, 'ok')
        } else {
          check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2)
        }
      }, backoff)
    }
  }
  check(1)
}

module.exports = { wait, waitDiff }


/***/ }),

/***/ 4294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(4219);


/***/ }),

/***/ 4219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(1808);
var tls = __nccwpck_require__(4404);
var http = __nccwpck_require__(3685);
var https = __nccwpck_require__(5687);
var events = __nccwpck_require__(2361);
var assert = __nccwpck_require__(9491);
var util = __nccwpck_require__(3837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 1773:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Client = __nccwpck_require__(3598)
const Dispatcher = __nccwpck_require__(412)
const errors = __nccwpck_require__(8045)
const Pool = __nccwpck_require__(4634)
const BalancedPool = __nccwpck_require__(7931)
const Agent = __nccwpck_require__(7890)
const util = __nccwpck_require__(3983)
const { InvalidArgumentError } = errors
const api = __nccwpck_require__(4059)
const buildConnector = __nccwpck_require__(2067)
const MockClient = __nccwpck_require__(8687)
const MockAgent = __nccwpck_require__(6771)
const MockPool = __nccwpck_require__(6193)
const mockErrors = __nccwpck_require__(888)
const ProxyAgent = __nccwpck_require__(7858)

const nodeVersion = process.versions.node.split('.')
const nodeMajor = Number(nodeVersion[0])
const nodeMinor = Number(nodeVersion[1])

Object.assign(Dispatcher.prototype, api)

module.exports.Dispatcher = Dispatcher
module.exports.Client = Client
module.exports.Pool = Pool
module.exports.BalancedPool = BalancedPool
module.exports.Agent = Agent
module.exports.ProxyAgent = ProxyAgent

module.exports.buildConnector = buildConnector
module.exports.errors = errors

let globalDispatcher = new Agent()

function setGlobalDispatcher (agent) {
  if (!agent || typeof agent.dispatch !== 'function') {
    throw new InvalidArgumentError('Argument agent must implement Agent')
  }
  globalDispatcher = agent
}

function getGlobalDispatcher () {
  return globalDispatcher
}

function makeDispatcher (fn) {
  return (url, opts, handler) => {
    if (typeof opts === 'function') {
      handler = opts
      opts = null
    }

    if (!url || (typeof url !== 'string' && typeof url !== 'object' && !(url instanceof URL))) {
      throw new InvalidArgumentError('invalid url')
    }

    if (opts != null && typeof opts !== 'object') {
      throw new InvalidArgumentError('invalid opts')
    }

    if (opts && opts.path != null) {
      if (typeof opts.path !== 'string') {
        throw new InvalidArgumentError('invalid opts.path')
      }

      url = new URL(opts.path, util.parseOrigin(url))
    } else {
      if (!opts) {
        opts = typeof url === 'object' ? url : {}
      }

      url = util.parseURL(url)
    }

    const { agent, dispatcher = getGlobalDispatcher() } = opts

    if (agent) {
      throw new InvalidArgumentError('unsupported opts.agent. Did you mean opts.client?')
    }

    return fn.call(dispatcher, {
      ...opts,
      origin: url.origin,
      path: url.search ? `${url.pathname}${url.search}` : url.pathname,
      method: opts.method || (opts.body ? 'PUT' : 'GET')
    }, handler)
  }
}

module.exports.setGlobalDispatcher = setGlobalDispatcher
module.exports.getGlobalDispatcher = getGlobalDispatcher

if (nodeMajor > 16 || (nodeMajor === 16 && nodeMinor >= 5)) {
  let fetchImpl = null
  module.exports.fetch = async function fetch (resource, init) {
    if (!fetchImpl) {
      fetchImpl = __nccwpck_require__(4881)
    }
    const dispatcher = getGlobalDispatcher()
    return fetchImpl.call(dispatcher, resource, init)
  }
  module.exports.Headers = __nccwpck_require__(554).Headers
  module.exports.Response = __nccwpck_require__(7823).Response
  module.exports.Request = __nccwpck_require__(8359).Request
  module.exports.FormData = __nccwpck_require__(2015).FormData
  module.exports.File = __nccwpck_require__(8511).File
}

module.exports.request = makeDispatcher(api.request)
module.exports.stream = makeDispatcher(api.stream)
module.exports.pipeline = makeDispatcher(api.pipeline)
module.exports.connect = makeDispatcher(api.connect)
module.exports.upgrade = makeDispatcher(api.upgrade)

module.exports.MockClient = MockClient
module.exports.MockPool = MockPool
module.exports.MockAgent = MockAgent
module.exports.mockErrors = mockErrors


/***/ }),

/***/ 7890:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const {
  ClientClosedError,
  InvalidArgumentError,
  ClientDestroyedError
} = __nccwpck_require__(8045)
const { kClients, kRunning } = __nccwpck_require__(2785)
const Dispatcher = __nccwpck_require__(412)
const Pool = __nccwpck_require__(4634)
const Client = __nccwpck_require__(3598)
const util = __nccwpck_require__(3983)
const RedirectHandler = __nccwpck_require__(751)
const { WeakRef, FinalizationRegistry } = __nccwpck_require__(6436)()

const kDestroyed = Symbol('destroyed')
const kClosed = Symbol('closed')
const kOnConnect = Symbol('onConnect')
const kOnDisconnect = Symbol('onDisconnect')
const kOnConnectionError = Symbol('onConnectionError')
const kMaxRedirections = Symbol('maxRedirections')
const kOnDrain = Symbol('onDrain')
const kFactory = Symbol('factory')
const kFinalizer = Symbol('finalizer')
const kOptions = Symbol('options')

function defaultFactory (origin, opts) {
  return opts && opts.connections === 1
    ? new Client(origin, opts)
    : new Pool(origin, opts)
}

class Agent extends Dispatcher {
  constructor ({ factory = defaultFactory, maxRedirections = 0, connect, ...options } = {}) {
    super()

    if (typeof factory !== 'function') {
      throw new InvalidArgumentError('factory must be a function.')
    }

    if (connect != null && typeof connect !== 'function' && typeof connect !== 'object') {
      throw new InvalidArgumentError('connect must be a function or an object')
    }

    if (!Number.isInteger(maxRedirections) || maxRedirections < 0) {
      throw new InvalidArgumentError('maxRedirections must be a positive number')
    }

    if (connect && typeof connect !== 'function') {
      connect = { ...connect }
    }

    this[kOptions] = { ...util.deepClone(options), connect }
    this[kMaxRedirections] = maxRedirections
    this[kFactory] = factory
    this[kClients] = new Map()
    this[kFinalizer] = new FinalizationRegistry(/* istanbul ignore next: gc is undeterministic */ key => {
      const ref = this[kClients].get(key)
      if (ref !== undefined && ref.deref() === undefined) {
        this[kClients].delete(key)
      }
    })
    this[kClosed] = false
    this[kDestroyed] = false

    const agent = this

    this[kOnDrain] = (origin, targets) => {
      agent.emit('drain', origin, [agent, ...targets])
    }

    this[kOnConnect] = (origin, targets) => {
      agent.emit('connect', origin, [agent, ...targets])
    }

    this[kOnDisconnect] = (origin, targets, err) => {
      agent.emit('disconnect', origin, [agent, ...targets], err)
    }

    this[kOnConnectionError] = (origin, targets, err) => {
      agent.emit('connectionError', origin, [agent, ...targets], err)
    }
  }

  get [kRunning] () {
    let ret = 0
    for (const ref of this[kClients].values()) {
      const client = ref.deref()
      /* istanbul ignore next: gc is undeterministic */
      if (client) {
        ret += client[kRunning]
      }
    }
    return ret
  }

  dispatch (opts, handler) {
    if (!handler || typeof handler !== 'object') {
      throw new InvalidArgumentError('handler must be an object.')
    }

    try {
      if (!opts || typeof opts !== 'object') {
        throw new InvalidArgumentError('opts must be an object.')
      }

      let key
      if (opts.origin && (typeof opts.origin === 'string' || opts.origin instanceof URL)) {
        key = String(opts.origin)
      } else {
        throw new InvalidArgumentError('opts.origin must be a non-empty string or URL.')
      }

      if (this[kDestroyed]) {
        throw new ClientDestroyedError()
      }

      if (this[kClosed]) {
        throw new ClientClosedError()
      }

      const ref = this[kClients].get(key)

      let dispatcher = ref ? ref.deref() : null
      if (!dispatcher) {
        dispatcher = this[kFactory](opts.origin, this[kOptions])
          .on('drain', this[kOnDrain])
          .on('connect', this[kOnConnect])
          .on('disconnect', this[kOnDisconnect])
          .on('connectionError', this[kOnConnectionError])

        this[kClients].set(key, new WeakRef(dispatcher))
        this[kFinalizer].register(dispatcher, key)
      }

      const { maxRedirections = this[kMaxRedirections] } = opts
      if (maxRedirections != null && maxRedirections !== 0) {
        opts = { ...opts, maxRedirections: 0 } // Stop sub dispatcher from also redirecting.
        handler = new RedirectHandler(this, maxRedirections, opts, handler)
      }

      return dispatcher.dispatch(opts, handler)
    } catch (err) {
      if (typeof handler.onError !== 'function') {
        throw new InvalidArgumentError('invalid onError method')
      }

      handler.onError(err)
    }
  }

  get closed () {
    return this[kClosed]
  }

  get destroyed () {
    return this[kDestroyed]
  }

  close (callback) {
    if (callback != null && typeof callback !== 'function') {
      throw new InvalidArgumentError('callback must be a function')
    }

    this[kClosed] = true

    const closePromises = []
    for (const ref of this[kClients].values()) {
      const client = ref.deref()
      /* istanbul ignore else: gc is undeterministic */
      if (client) {
        closePromises.push(client.close())
      }
    }

    if (!callback) {
      return Promise.all(closePromises)
    }

    // Should never error.
    Promise.all(closePromises).then(() => process.nextTick(callback))
  }

  destroy (err, callback) {
    if (typeof err === 'function') {
      callback = err
      err = null
    }

    if (callback != null && typeof callback !== 'function') {
      throw new InvalidArgumentError('callback must be a function')
    }

    this[kClosed] = true
    this[kDestroyed] = true

    const destroyPromises = []
    for (const ref of this[kClients].values()) {
      const client = ref.deref()
      /* istanbul ignore else: gc is undeterministic */
      if (client) {
        destroyPromises.push(client.destroy(err))
      }
    }

    if (!callback) {
      return Promise.all(destroyPromises)
    }

    // Should never error.
    Promise.all(destroyPromises).then(() => process.nextTick(callback))
  }
}

module.exports = Agent


/***/ }),

/***/ 7032:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { RequestAbortedError } = __nccwpck_require__(8045)

const kListener = Symbol('kListener')
const kSignal = Symbol('kSignal')

function abort (self) {
  if (self.abort) {
    self.abort()
  } else {
    self.onError(new RequestAbortedError())
  }
}

function addSignal (self, signal) {
  self[kSignal] = null
  self[kListener] = null

  if (!signal) {
    return
  }

  if (signal.aborted) {
    abort(self)
    return
  }

  self[kSignal] = signal
  self[kListener] = () => {
    abort(self)
  }

  if ('addEventListener' in self[kSignal]) {
    self[kSignal].addEventListener('abort', self[kListener])
  } else {
    self[kSignal].addListener('abort', self[kListener])
  }
}

function removeSignal (self) {
  if (!self[kSignal]) {
    return
  }

  if ('removeEventListener' in self[kSignal]) {
    self[kSignal].removeEventListener('abort', self[kListener])
  } else {
    self[kSignal].removeListener('abort', self[kListener])
  }

  self[kSignal] = null
  self[kListener] = null
}

module.exports = {
  addSignal,
  removeSignal
}


/***/ }),

/***/ 9744:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { InvalidArgumentError, RequestAbortedError, SocketError } = __nccwpck_require__(8045)
const { AsyncResource } = __nccwpck_require__(852)
const util = __nccwpck_require__(3983)
const { addSignal, removeSignal } = __nccwpck_require__(7032)

class ConnectHandler extends AsyncResource {
  constructor (opts, callback) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError('invalid opts')
    }

    if (typeof callback !== 'function') {
      throw new InvalidArgumentError('invalid callback')
    }

    const { signal, opaque } = opts

    if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
      throw new InvalidArgumentError('signal must be an EventEmitter or EventTarget')
    }

    super('UNDICI_CONNECT')

    this.opaque = opaque || null
    this.callback = callback
    this.abort = null

    addSignal(this, signal)
  }

  onConnect (abort, context) {
    if (!this.callback) {
      throw new RequestAbortedError()
    }

    this.abort = abort
    this.context = context
  }

  onHeaders () {
    throw new SocketError('bad connect', null)
  }

  onUpgrade (statusCode, headers, socket) {
    const { callback, opaque, context } = this

    removeSignal(this)

    this.callback = null
    this.runInAsyncScope(callback, null, null, {
      statusCode,
      headers: util.parseHeaders(headers),
      socket,
      opaque,
      context
    })
  }

  onError (err) {
    const { callback, opaque } = this

    removeSignal(this)

    if (callback) {
      this.callback = null
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque })
      })
    }
  }
}

function connect (opts, callback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      connect.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data)
      })
    })
  }

  try {
    const connectHandler = new ConnectHandler(opts, callback)
    this.dispatch({ ...opts, method: 'CONNECT' }, connectHandler)
  } catch (err) {
    if (typeof callback !== 'function') {
      throw err
    }
    const opaque = opts && opts.opaque
    queueMicrotask(() => callback(err, { opaque }))
  }
}

module.exports = connect


/***/ }),

/***/ 8752:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const {
  Readable,
  Duplex,
  PassThrough
} = __nccwpck_require__(2781)
const {
  InvalidArgumentError,
  InvalidReturnValueError,
  RequestAbortedError
} = __nccwpck_require__(8045)
const util = __nccwpck_require__(3983)
const { AsyncResource } = __nccwpck_require__(852)
const { addSignal, removeSignal } = __nccwpck_require__(7032)
const assert = __nccwpck_require__(9491)

const kResume = Symbol('resume')

class PipelineRequest extends Readable {
  constructor () {
    super({ autoDestroy: true })

    this[kResume] = null
  }

  _read () {
    const { [kResume]: resume } = this

    if (resume) {
      this[kResume] = null
      resume()
    }
  }

  _destroy (err, callback) {
    this._read()

    callback(err)
  }
}

class PipelineResponse extends Readable {
  constructor (resume) {
    super({ autoDestroy: true })
    this[kResume] = resume
  }

  _read () {
    this[kResume]()
  }

  _destroy (err, callback) {
    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError()
    }

    callback(err)
  }
}

class PipelineHandler extends AsyncResource {
  constructor (opts, handler) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError('invalid opts')
    }

    if (typeof handler !== 'function') {
      throw new InvalidArgumentError('invalid handler')
    }

    const { signal, method, opaque, onInfo } = opts

    if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
      throw new InvalidArgumentError('signal must be an EventEmitter or EventTarget')
    }

    if (method === 'CONNECT') {
      throw new InvalidArgumentError('invalid method')
    }

    if (onInfo && typeof onInfo !== 'function') {
      throw new InvalidArgumentError('invalid onInfo callback')
    }

    super('UNDICI_PIPELINE')

    this.opaque = opaque || null
    this.handler = handler
    this.abort = null
    this.context = null
    this.onInfo = onInfo || null

    this.req = new PipelineRequest().on('error', util.nop)

    this.ret = new Duplex({
      readableObjectMode: opts.objectMode,
      autoDestroy: true,
      read: () => {
        const { body } = this

        if (body && body.resume) {
          body.resume()
        }
      },
      write: (chunk, encoding, callback) => {
        const { req } = this

        if (req.push(chunk, encoding) || req._readableState.destroyed) {
          callback()
        } else {
          req[kResume] = callback
        }
      },
      destroy: (err, callback) => {
        const { body, req, res, ret, abort } = this

        if (!err && !ret._readableState.endEmitted) {
          err = new RequestAbortedError()
        }

        if (abort && err) {
          abort()
        }

        util.destroy(body, err)
        util.destroy(req, err)
        util.destroy(res, err)

        removeSignal(this)

        callback(err)
      }
    }).on('prefinish', () => {
      const { req } = this

      // Node < 15 does not call _final in same tick.
      req.push(null)
    })

    this.res = null

    addSignal(this, signal)
  }

  onConnect (abort, context) {
    const { ret, res } = this

    assert(!res, 'pipeline cannot be retried')

    if (ret.destroyed) {
      throw new RequestAbortedError()
    }

    this.abort = abort
    this.context = context
  }

  onHeaders (statusCode, headers, resume) {
    const { opaque, handler, context } = this

    if (statusCode < 200) {
      if (this.onInfo) {
        this.onInfo({ statusCode, headers: util.parseHeaders(headers) })
      }
      return
    }

    this.res = new PipelineResponse(resume)

    let body
    try {
      this.handler = null
      body = this.runInAsyncScope(handler, null, {
        statusCode,
        headers: util.parseHeaders(headers),
        opaque,
        body: this.res,
        context
      })
    } catch (err) {
      this.res.on('error', util.nop)
      throw err
    }

    if (!body || typeof body.on !== 'function') {
      throw new InvalidReturnValueError('expected Readable')
    }

    body
      .on('data', (chunk) => {
        const { ret, body } = this

        if (!ret.push(chunk) && body.pause) {
          body.pause()
        }
      })
      .on('error', (err) => {
        const { ret } = this

        util.destroy(ret, err)
      })
      .on('end', () => {
        const { ret } = this

        ret.push(null)
      })
      .on('close', () => {
        const { ret } = this

        if (!ret._readableState.ended) {
          util.destroy(ret, new RequestAbortedError())
        }
      })

    this.body = body
  }

  onData (chunk) {
    const { res } = this
    return res.push(chunk)
  }

  onComplete (trailers) {
    const { res } = this
    res.push(null)
  }

  onError (err) {
    const { ret } = this
    this.handler = null
    util.destroy(ret, err)
  }
}

function pipeline (opts, handler) {
  try {
    const pipelineHandler = new PipelineHandler(opts, handler)
    this.dispatch({ ...opts, body: pipelineHandler.req }, pipelineHandler)
    return pipelineHandler.ret
  } catch (err) {
    return new PassThrough().destroy(err)
  }
}

module.exports = pipeline


/***/ }),

/***/ 5448:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Readable = __nccwpck_require__(3858)
const {
  InvalidArgumentError,
  RequestAbortedError
} = __nccwpck_require__(8045)
const util = __nccwpck_require__(3983)
const { AsyncResource } = __nccwpck_require__(852)
const { addSignal, removeSignal } = __nccwpck_require__(7032)

class RequestHandler extends AsyncResource {
  constructor (opts, callback) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError('invalid opts')
    }

    const { signal, method, opaque, body, onInfo } = opts

    try {
      if (typeof callback !== 'function') {
        throw new InvalidArgumentError('invalid callback')
      }

      if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
        throw new InvalidArgumentError('signal must be an EventEmitter or EventTarget')
      }

      if (method === 'CONNECT') {
        throw new InvalidArgumentError('invalid method')
      }

      if (onInfo && typeof onInfo !== 'function') {
        throw new InvalidArgumentError('invalid onInfo callback')
      }

      super('UNDICI_REQUEST')
    } catch (err) {
      if (util.isStream(body)) {
        util.destroy(body.on('error', util.nop), err)
      }
      throw err
    }

    this.opaque = opaque || null
    this.callback = callback
    this.res = null
    this.abort = null
    this.body = body
    this.trailers = {}
    this.context = null
    this.onInfo = onInfo || null

    if (util.isStream(body)) {
      body.on('error', (err) => {
        this.onError(err)
      })
    }

    addSignal(this, signal)
  }

  onConnect (abort, context) {
    if (!this.callback) {
      throw new RequestAbortedError()
    }

    this.abort = abort
    this.context = context
  }

  onHeaders (statusCode, headers, resume) {
    const { callback, opaque, abort, context } = this

    if (statusCode < 200) {
      if (this.onInfo) {
        this.onInfo({ statusCode, headers: util.parseHeaders(headers) })
      }
      return
    }

    const parsedHeaders = util.parseHeaders(headers)
    const body = new Readable(resume, abort, parsedHeaders['content-type'])

    this.callback = null
    this.res = body

    this.runInAsyncScope(callback, null, null, {
      statusCode,
      headers: parsedHeaders,
      trailers: this.trailers,
      opaque,
      body,
      context
    })
  }

  onData (chunk) {
    const { res } = this
    return res.push(chunk)
  }

  onComplete (trailers) {
    const { res } = this

    removeSignal(this)

    util.parseHeaders(trailers, this.trailers)

    res.push(null)
  }

  onError (err) {
    const { res, callback, body, opaque } = this

    removeSignal(this)

    if (callback) {
      // TODO: Does this need queueMicrotask?
      this.callback = null
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque })
      })
    }

    if (res) {
      this.res = null
      // Ensure all queued handlers are invoked before destroying res.
      queueMicrotask(() => {
        util.destroy(res, err)
      })
    }

    if (body) {
      this.body = null
      util.destroy(body, err)
    }
  }
}

function request (opts, callback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      request.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data)
      })
    })
  }

  try {
    this.dispatch(opts, new RequestHandler(opts, callback))
  } catch (err) {
    if (typeof callback !== 'function') {
      throw err
    }
    const opaque = opts && opts.opaque
    queueMicrotask(() => callback(err, { opaque }))
  }
}

module.exports = request


/***/ }),

/***/ 5395:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { finished } = __nccwpck_require__(2781)
const {
  InvalidArgumentError,
  InvalidReturnValueError,
  RequestAbortedError
} = __nccwpck_require__(8045)
const util = __nccwpck_require__(3983)
const { AsyncResource } = __nccwpck_require__(852)
const { addSignal, removeSignal } = __nccwpck_require__(7032)

class StreamHandler extends AsyncResource {
  constructor (opts, factory, callback) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError('invalid opts')
    }

    const { signal, method, opaque, body, onInfo } = opts

    try {
      if (typeof callback !== 'function') {
        throw new InvalidArgumentError('invalid callback')
      }

      if (typeof factory !== 'function') {
        throw new InvalidArgumentError('invalid factory')
      }

      if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
        throw new InvalidArgumentError('signal must be an EventEmitter or EventTarget')
      }

      if (method === 'CONNECT') {
        throw new InvalidArgumentError('invalid method')
      }

      if (onInfo && typeof onInfo !== 'function') {
        throw new InvalidArgumentError('invalid onInfo callback')
      }

      super('UNDICI_STREAM')
    } catch (err) {
      if (util.isStream(body)) {
        util.destroy(body.on('error', util.nop), err)
      }
      throw err
    }

    this.opaque = opaque || null
    this.factory = factory
    this.callback = callback
    this.res = null
    this.abort = null
    this.context = null
    this.trailers = null
    this.body = body
    this.onInfo = onInfo || null

    if (util.isStream(body)) {
      body.on('error', (err) => {
        this.onError(err)
      })
    }

    addSignal(this, signal)
  }

  onConnect (abort, context) {
    if (!this.callback) {
      throw new RequestAbortedError()
    }

    this.abort = abort
    this.context = context
  }

  onHeaders (statusCode, headers, resume) {
    const { factory, opaque, context } = this

    if (statusCode < 200) {
      if (this.onInfo) {
        this.onInfo({ statusCode, headers: util.parseHeaders(headers) })
      }
      return
    }

    this.factory = null
    const res = this.runInAsyncScope(factory, null, {
      statusCode,
      headers: util.parseHeaders(headers),
      opaque,
      context
    })

    if (
      !res ||
      typeof res.write !== 'function' ||
      typeof res.end !== 'function' ||
      typeof res.on !== 'function'
    ) {
      throw new InvalidReturnValueError('expected Writable')
    }

    res.on('drain', resume)
    // TODO: Avoid finished. It registers an unecessary amount of listeners.
    finished(res, { readable: false }, (err) => {
      const { callback, res, opaque, trailers, abort } = this

      this.res = null
      if (err || !res.readable) {
        util.destroy(res, err)
      }

      this.callback = null
      this.runInAsyncScope(callback, null, err || null, { opaque, trailers })

      if (err) {
        abort()
      }
    })

    this.res = res

    const needDrain = res.writableNeedDrain !== undefined
      ? res.writableNeedDrain
      : res._writableState && res._writableState.needDrain

    return needDrain !== true
  }

  onData (chunk) {
    const { res } = this

    return res.write(chunk)
  }

  onComplete (trailers) {
    const { res } = this

    removeSignal(this)

    this.trailers = util.parseHeaders(trailers)

    res.end()
  }

  onError (err) {
    const { res, callback, opaque, body } = this

    removeSignal(this)

    this.factory = null

    if (res) {
      this.res = null
      util.destroy(res, err)
    } else if (callback) {
      this.callback = null
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque })
      })
    }

    if (body) {
      this.body = null
      util.destroy(body, err)
    }
  }
}

function stream (opts, factory, callback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      stream.call(this, opts, factory, (err, data) => {
        return err ? reject(err) : resolve(data)
      })
    })
  }

  try {
    this.dispatch(opts, new StreamHandler(opts, factory, callback))
  } catch (err) {
    if (typeof callback !== 'function') {
      throw err
    }
    const opaque = opts && opts.opaque
    queueMicrotask(() => callback(err, { opaque }))
  }
}

module.exports = stream


/***/ }),

/***/ 6923:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { InvalidArgumentError, RequestAbortedError, SocketError } = __nccwpck_require__(8045)
const { AsyncResource } = __nccwpck_require__(852)
const util = __nccwpck_require__(3983)
const { addSignal, removeSignal } = __nccwpck_require__(7032)
const assert = __nccwpck_require__(9491)

class UpgradeHandler extends AsyncResource {
  constructor (opts, callback) {
    if (!opts || typeof opts !== 'object') {
      throw new InvalidArgumentError('invalid opts')
    }

    if (typeof callback !== 'function') {
      throw new InvalidArgumentError('invalid callback')
    }

    const { signal, opaque } = opts

    if (signal && typeof signal.on !== 'function' && typeof signal.addEventListener !== 'function') {
      throw new InvalidArgumentError('signal must be an EventEmitter or EventTarget')
    }

    super('UNDICI_UPGRADE')

    this.opaque = opaque || null
    this.callback = callback
    this.abort = null
    this.context = null

    addSignal(this, signal)
  }

  onConnect (abort, context) {
    if (!this.callback) {
      throw new RequestAbortedError()
    }

    this.abort = abort
    this.context = null
  }

  onHeaders () {
    throw new SocketError('bad upgrade', null)
  }

  onUpgrade (statusCode, headers, socket) {
    const { callback, opaque, context } = this

    assert.strictEqual(statusCode, 101)

    removeSignal(this)

    this.callback = null
    this.runInAsyncScope(callback, null, null, {
      headers: util.parseHeaders(headers),
      socket,
      opaque,
      context
    })
  }

  onError (err) {
    const { callback, opaque } = this

    removeSignal(this)

    if (callback) {
      this.callback = null
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque })
      })
    }
  }
}

function upgrade (opts, callback) {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      upgrade.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data)
      })
    })
  }

  try {
    const upgradeHandler = new UpgradeHandler(opts, callback)
    this.dispatch({
      ...opts,
      method: opts.method || 'GET',
      upgrade: opts.protocol || 'Websocket'
    }, upgradeHandler)
  } catch (err) {
    if (typeof callback !== 'function') {
      throw err
    }
    const opaque = opts && opts.opaque
    queueMicrotask(() => callback(err, { opaque }))
  }
}

module.exports = upgrade


/***/ }),

/***/ 4059:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


module.exports.request = __nccwpck_require__(5448)
module.exports.stream = __nccwpck_require__(5395)
module.exports.pipeline = __nccwpck_require__(8752)
module.exports.upgrade = __nccwpck_require__(6923)
module.exports.connect = __nccwpck_require__(9744)


/***/ }),

/***/ 3858:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// Ported from https://github.com/nodejs/undici/pull/907



const assert = __nccwpck_require__(9491)
const { Readable } = __nccwpck_require__(2781)
const { RequestAbortedError, NotSupportedError } = __nccwpck_require__(8045)
const util = __nccwpck_require__(3983)
const { ReadableStreamFrom, toUSVString } = __nccwpck_require__(3983)

let Blob

const kConsume = Symbol('kConsume')
const kReading = Symbol('kReading')
const kBody = Symbol('kBody')
const kAbort = Symbol('abort')
const kContentType = Symbol('kContentType')

module.exports = class BodyReadable extends Readable {
  constructor (resume, abort, contentType = '') {
    super({
      autoDestroy: true,
      read: resume,
      highWaterMark: 64 * 1024 // Same as nodejs fs streams.
    })

    this._readableState.dataEmitted = false

    this[kAbort] = abort
    this[kConsume] = null
    this[kBody] = null
    this[kContentType] = contentType

    // Is stream being consumed through Readable API?
    // This is an optimization so that we avoid checking
    // for 'data' and 'readable' listeners in the hot path
    // inside push().
    this[kReading] = false
  }

  destroy (err) {
    if (this.destroyed) {
      // Node < 16
      return this
    }

    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError()
    }

    if (err) {
      this[kAbort]()
    }

    return super.destroy(err)
  }

  emit (ev, ...args) {
    if (ev === 'data') {
      // Node < 16.7
      this._readableState.dataEmitted = true
    } else if (ev === 'error') {
      // Node < 16
      this._readableState.errorEmitted = true
    }
    return super.emit(ev, ...args)
  }

  on (ev, ...args) {
    if (ev === 'data' || ev === 'readable') {
      this[kReading] = true
    }
    return super.on(ev, ...args)
  }

  addListener (ev, ...args) {
    return this.on(ev, ...args)
  }

  off (ev, ...args) {
    const ret = super.off(ev, ...args)
    if (ev === 'data' || ev === 'readable') {
      this[kReading] = (
        this.listenerCount('data') > 0 ||
        this.listenerCount('readable') > 0
      )
    }
    return ret
  }

  removeListener (ev, ...args) {
    return this.off(ev, ...args)
  }

  push (chunk) {
    if (this[kConsume] && chunk !== null) {
      consumePush(this[kConsume], chunk)
      return this[kReading] ? super.push(chunk) : true
    }
    return super.push(chunk)
  }

  // https://fetch.spec.whatwg.org/#dom-body-text
  async text () {
    return consume(this, 'text')
  }

  // https://fetch.spec.whatwg.org/#dom-body-json
  async json () {
    return consume(this, 'json')
  }

  // https://fetch.spec.whatwg.org/#dom-body-blob
  async blob () {
    return consume(this, 'blob')
  }

  // https://fetch.spec.whatwg.org/#dom-body-arraybuffer
  async arrayBuffer () {
    return consume(this, 'arrayBuffer')
  }

  // https://fetch.spec.whatwg.org/#dom-body-formdata
  async formData () {
    // TODO: Implement.
    throw new NotSupportedError()
  }

  // https://fetch.spec.whatwg.org/#dom-body-bodyused
  get bodyUsed () {
    return util.isDisturbed(this)
  }

  // https://fetch.spec.whatwg.org/#dom-body-body
  get body () {
    if (!this[kBody]) {
      this[kBody] = ReadableStreamFrom(this)
      if (this[kConsume]) {
        // TODO: Is this the best way to force a lock?
        this[kBody].getReader() // Ensure stream is locked.
        assert(this[kBody].locked)
      }
    }
    return this[kBody]
  }

  async dump (opts) {
    let limit = opts && Number.isFinite(opts.limit) ? opts.limit : 262144
    try {
      for await (const chunk of this) {
        limit -= Buffer.byteLength(chunk)
        if (limit < 0) {
          return
        }
      }
    } catch {
      // Do nothing...
    }
  }
}

// https://streams.spec.whatwg.org/#readablestream-locked
function isLocked (self) {
  // Consume is an implicit lock.
  return (self[kBody] && self[kBody].locked === true) || self[kConsume]
}

// https://fetch.spec.whatwg.org/#body-unusable
function isUnusable (self) {
  return util.isDisturbed(self) || isLocked(self)
}

async function consume (stream, type) {
  if (isUnusable(stream)) {
    throw new TypeError('unusable')
  }

  assert(!stream[kConsume])

  return new Promise((resolve, reject) => {
    stream[kConsume] = {
      type,
      stream,
      resolve,
      reject,
      length: 0,
      body: []
    }

    stream
      .on('error', function (err) {
        consumeFinish(this[kConsume], err)
      })
      .on('close', function () {
        if (this[kConsume].body !== null) {
          consumeFinish(this[kConsume], new RequestAbortedError())
        }
      })

    process.nextTick(consumeStart, stream[kConsume])
  })
}

function consumeStart (consume) {
  if (consume.body === null) {
    return
  }

  const { _readableState: state } = consume.stream

  for (const chunk of state.buffer) {
    consumePush(consume, chunk)
  }

  if (state.endEmitted) {
    consumeEnd(this[kConsume])
  } else {
    consume.stream.on('end', function () {
      consumeEnd(this[kConsume])
    })
  }

  consume.stream.resume()

  while (consume.stream.read() != null) {
    // Loop
  }
}

function consumeEnd (consume) {
  const { type, body, resolve, stream, length } = consume

  try {
    if (type === 'text') {
      resolve(toUSVString(Buffer.concat(body)))
    } else if (type === 'json') {
      resolve(JSON.parse(Buffer.concat(body)))
    } else if (type === 'arrayBuffer') {
      const dst = new Uint8Array(length)

      let pos = 0
      for (const buf of body) {
        dst.set(buf, pos)
        pos += buf.byteLength
      }

      resolve(dst)
    } else if (type === 'blob') {
      if (!Blob) {
        Blob = (__nccwpck_require__(4300).Blob)
      }
      resolve(new Blob(body, { type: stream[kContentType] }))
    }

    consumeFinish(consume)
  } catch (err) {
    stream.destroy(err)
  }
}

function consumePush (consume, chunk) {
  consume.length += chunk.length
  consume.body.push(chunk)
}

function consumeFinish (consume, err) {
  if (consume.body === null) {
    return
  }

  if (err) {
    consume.reject(err)
  } else {
    consume.resolve()
  }

  consume.type = null
  consume.stream = null
  consume.resolve = null
  consume.reject = null
  consume.length = 0
  consume.body = null
}


/***/ }),

/***/ 7931:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const {
  BalancedPoolMissingUpstreamError
} = __nccwpck_require__(8045)
const {
  PoolBase,
  kClients,
  kNeedDrain,
  kAddClient,
  kRemoveClient,
  kGetDispatcher
} = __nccwpck_require__(3198)
const Pool = __nccwpck_require__(4634)
const { kUrl } = __nccwpck_require__(2785)

const kOptions = Symbol('options')

class BalancedPool extends PoolBase {
  constructor (upstreams = [], opts = {}) {
    super()

    this[kOptions] = opts

    if (!Array.isArray(upstreams)) {
      upstreams = [upstreams]
    }

    for (const upstream of upstreams) {
      this.addUpstream(upstream)
    }
  }

  addUpstream (upstream) {
    if (this[kClients].find((pool) => (
      pool[kUrl].origin === upstream &&
      pool.closed !== true &&
      pool.destroyed !== true
    ))) {
      return this
    }

    this[kAddClient](new Pool(upstream, Object.assign({}, this[kOptions])))

    return this
  }

  removeUpstream (upstream) {
    const pool = this[kClients].find((pool) => (
      pool[kUrl].origin === upstream &&
      pool.closed !== true &&
      pool.destroyed !== true
    ))

    if (pool) {
      this[kRemoveClient](pool)
    }

    return this
  }

  get upstreams () {
    return this[kClients]
      .filter(dispatcher => dispatcher.closed !== true && dispatcher.destroyed !== true)
      .map((p) => p[kUrl].origin)
  }

  [kGetDispatcher] () {
    // We validate that pools is greater than 0,
    // otherwise we would have to wait until an upstream
    // is added, which might never happen.
    if (this[kClients].length === 0) {
      throw new BalancedPoolMissingUpstreamError()
    }

    const dispatcher = this[kClients].find(dispatcher => (
      !dispatcher[kNeedDrain] &&
      dispatcher.closed !== true &&
      dispatcher.destroyed !== true
    ))

    if (!dispatcher) {
      return
    }

    this[kClients].splice(this[kClients].indexOf(dispatcher), 1)
    this[kClients].push(dispatcher)

    return dispatcher
  }
}

module.exports = BalancedPool


/***/ }),

/***/ 3598:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/* global WebAssembly */

const assert = __nccwpck_require__(9491)
const net = __nccwpck_require__(1808)
const util = __nccwpck_require__(3983)
const Request = __nccwpck_require__(2905)
const Dispatcher = __nccwpck_require__(412)
const RedirectHandler = __nccwpck_require__(751)
const {
  RequestContentLengthMismatchError,
  ResponseContentLengthMismatchError,
  TrailerMismatchError,
  InvalidArgumentError,
  RequestAbortedError,
  HeadersTimeoutError,
  HeadersOverflowError,
  ClientDestroyedError,
  ClientClosedError,
  SocketError,
  InformationalError,
  BodyTimeoutError,
  HTTPParserError
} = __nccwpck_require__(8045)
const buildConnector = __nccwpck_require__(2067)
const {
  kUrl,
  kReset,
  kServerName,
  kClient,
  kBusy,
  kParser,
  kConnect,
  kBlocking,
  kResuming,
  kRunning,
  kPending,
  kSize,
  kWriting,
  kQueue,
  kConnected,
  kConnecting,
  kNeedDrain,
  kNoRef,
  kKeepAliveDefaultTimeout,
  kHostHeader,
  kClosed,
  kDestroyed,
  kPendingIdx,
  kRunningIdx,
  kError,
  kOnDestroyed,
  kPipelining,
  kSocket,
  kKeepAliveTimeoutValue,
  kMaxHeadersSize,
  kKeepAliveMaxTimeout,
  kKeepAliveTimeoutThreshold,
  kHeadersTimeout,
  kBodyTimeout,
  kStrictContentLength,
  kConnector,
  kMaxRedirections,
  kMaxRequests,
  kCounter
} = __nccwpck_require__(2785)

const channels = {}

try {
  const diagnosticsChannel = __nccwpck_require__(7643)
  channels.sendHeaders = diagnosticsChannel.channel('undici:client:sendHeaders')
  channels.beforeConnect = diagnosticsChannel.channel('undici:client:beforeConnect')
  channels.connectError = diagnosticsChannel.channel('undici:client:connectError')
  channels.connected = diagnosticsChannel.channel('undici:client:connected')
} catch {
  channels.sendHeaders = { hasSubscribers: false }
  channels.beforeConnect = { hasSubscribers: false }
  channels.connectError = { hasSubscribers: false }
  channels.connected = { hasSubscribers: false }
}

class Client extends Dispatcher {
  constructor (url, {
    maxHeaderSize,
    headersTimeout,
    socketTimeout,
    requestTimeout,
    connectTimeout,
    bodyTimeout,
    idleTimeout,
    keepAlive,
    keepAliveTimeout,
    maxKeepAliveTimeout,
    keepAliveMaxTimeout,
    keepAliveTimeoutThreshold,
    socketPath,
    pipelining,
    tls,
    strictContentLength,
    maxCachedSessions,
    maxRedirections,
    connect,
    maxRequestsPerClient
  } = {}) {
    super()

    if (keepAlive !== undefined) {
      throw new InvalidArgumentError('unsupported keepAlive, use pipelining=0 instead')
    }

    if (socketTimeout !== undefined) {
      throw new InvalidArgumentError('unsupported socketTimeout, use headersTimeout & bodyTimeout instead')
    }

    if (requestTimeout !== undefined) {
      throw new InvalidArgumentError('unsupported requestTimeout, use headersTimeout & bodyTimeout instead')
    }

    if (idleTimeout !== undefined) {
      throw new InvalidArgumentError('unsupported idleTimeout, use keepAliveTimeout instead')
    }

    if (maxKeepAliveTimeout !== undefined) {
      throw new InvalidArgumentError('unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead')
    }

    if (maxHeaderSize != null && !Number.isFinite(maxHeaderSize)) {
      throw new InvalidArgumentError('invalid maxHeaderSize')
    }

    if (socketPath != null && typeof socketPath !== 'string') {
      throw new InvalidArgumentError('invalid socketPath')
    }

    if (connectTimeout != null && (!Number.isFinite(connectTimeout) || connectTimeout < 0)) {
      throw new InvalidArgumentError('invalid connectTimeout')
    }

    if (keepAliveTimeout != null && (!Number.isFinite(keepAliveTimeout) || keepAliveTimeout <= 0)) {
      throw new InvalidArgumentError('invalid keepAliveTimeout')
    }

    if (keepAliveMaxTimeout != null && (!Number.isFinite(keepAliveMaxTimeout) || keepAliveMaxTimeout <= 0)) {
      throw new InvalidArgumentError('invalid keepAliveMaxTimeout')
    }

    if (keepAliveTimeoutThreshold != null && !Number.isFinite(keepAliveTimeoutThreshold)) {
      throw new InvalidArgumentError('invalid keepAliveTimeoutThreshold')
    }

    if (headersTimeout != null && (!Number.isInteger(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError('headersTimeout must be a positive integer or zero')
    }

    if (bodyTimeout != null && (!Number.isInteger(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError('bodyTimeout must be a positive integer or zero')
    }

    if (connect != null && typeof connect !== 'function' && typeof connect !== 'object') {
      throw new InvalidArgumentError('connect must be a function or an object')
    }

    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError('maxRedirections must be a positive number')
    }

    if (maxRequestsPerClient != null && (!Number.isInteger(maxRequestsPerClient) || maxRequestsPerClient < 0)) {
      throw new InvalidArgumentError('maxRequestsPerClient must be a positive number')
    }

    if (typeof connect !== 'function') {
      connect = buildConnector({
        ...tls,
        maxCachedSessions,
        socketPath,
        timeout: connectTimeout,
        ...connect
      })
    }

    this[kUrl] = util.parseOrigin(url)
    this[kConnector] = connect
    this[kSocket] = null
    this[kPipelining] = pipelining != null ? pipelining : 1
    this[kMaxHeadersSize] = maxHeaderSize || 16384
    this[kKeepAliveDefaultTimeout] = keepAliveTimeout == null ? 4e3 : keepAliveTimeout
    this[kKeepAliveMaxTimeout] = keepAliveMaxTimeout == null ? 600e3 : keepAliveMaxTimeout
    this[kKeepAliveTimeoutThreshold] = keepAliveTimeoutThreshold == null ? 1e3 : keepAliveTimeoutThreshold
    this[kKeepAliveTimeoutValue] = this[kKeepAliveDefaultTimeout]
    this[kClosed] = false
    this[kDestroyed] = false
    this[kServerName] = null
    this[kOnDestroyed] = []
    this[kResuming] = 0 // 0, idle, 1, scheduled, 2 resuming
    this[kNeedDrain] = 0 // 0, idle, 1, scheduled, 2 resuming
    this[kHostHeader] = `host: ${this[kUrl].hostname}${this[kUrl].port ? `:${this[kUrl].port}` : ''}\r\n`
    this[kBodyTimeout] = bodyTimeout != null ? bodyTimeout : 30e3
    this[kHeadersTimeout] = headersTimeout != null ? headersTimeout : 30e3
    this[kStrictContentLength] = strictContentLength == null ? true : strictContentLength
    this[kMaxRedirections] = maxRedirections
    this[kMaxRequests] = maxRequestsPerClient

    // kQueue is built up of 3 sections separated by
    // the kRunningIdx and kPendingIdx indices.
    // |   complete   |   running   |   pending   |
    //                ^ kRunningIdx ^ kPendingIdx ^ kQueue.length
    // kRunningIdx points to the first running element.
    // kPendingIdx points to the first pending element.
    // This implements a fast queue with an amortized
    // time of O(1).

    this[kQueue] = []
    this[kRunningIdx] = 0
    this[kPendingIdx] = 0
  }

  // TODO: Make private?
  get pipelining () {
    return this[kPipelining]
  }

  // TODO: Make private?
  set pipelining (value) {
    this[kPipelining] = value
    resume(this, true)
  }

  get destroyed () {
    return this[kDestroyed]
  }

  get closed () {
    return this[kClosed]
  }

  get [kPending] () {
    return this[kQueue].length - this[kPendingIdx]
  }

  get [kRunning] () {
    return this[kPendingIdx] - this[kRunningIdx]
  }

  get [kSize] () {
    return this[kQueue].length - this[kRunningIdx]
  }

  get [kConnected] () {
    return !!this[kSocket] && !this[kConnecting] && !this[kSocket].destroyed
  }

  get [kBusy] () {
    const socket = this[kSocket]
    return (
      (socket && (socket[kReset] || socket[kWriting] || socket[kBlocking])) ||
      (this[kSize] >= (this[kPipelining] || 1)) ||
      this[kPending] > 0
    )
  }

  /* istanbul ignore: only used for test */
  [kConnect] (cb) {
    connect(this)
    this.once('connect', cb)
  }

  dispatch (opts, handler) {
    if (!handler || typeof handler !== 'object') {
      throw new InvalidArgumentError('handler must be an object')
    }

    try {
      if (!opts || typeof opts !== 'object') {
        throw new InvalidArgumentError('opts must be an object.')
      }

      if (this[kDestroyed]) {
        throw new ClientDestroyedError()
      }

      if (this[kClosed]) {
        throw new ClientClosedError()
      }

      const { maxRedirections = this[kMaxRedirections] } = opts
      if (maxRedirections) {
        handler = new RedirectHandler(this, maxRedirections, opts, handler)
      }

      const origin = opts.origin || this[kUrl].origin

      const request = new Request(origin, opts, handler)

      this[kQueue].push(request)
      if (this[kResuming]) {
        // Do nothing.
      } else if (util.bodyLength(request.body) == null && util.isIterable(request.body)) {
        // Wait a tick in case stream/iterator is ended in the same tick.
        this[kResuming] = 1
        process.nextTick(resume, this)
      } else {
        resume(this, true)
      }

      if (this[kResuming] && this[kNeedDrain] !== 2 && this[kBusy]) {
        this[kNeedDrain] = 2
      }
    } catch (err) {
      if (typeof handler.onError !== 'function') {
        throw new InvalidArgumentError('invalid onError method')
      }

      handler.onError(err)
    }

    return this[kNeedDrain] < 2
  }

  close (callback) {
    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.close((err, data) => {
          return err ? reject(err) : resolve(data)
        })
      })
    }

    if (typeof callback !== 'function') {
      throw new InvalidArgumentError('invalid callback')
    }

    if (this[kDestroyed]) {
      queueMicrotask(() => callback(new ClientDestroyedError(), null))
      return
    }

    this[kClosed] = true

    if (!this[kSize]) {
      this.destroy(callback)
    } else {
      this[kOnDestroyed].push(callback)
    }
  }

  destroy (err, callback) {
    if (typeof err === 'function') {
      callback = err
      err = null
    }

    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.destroy(err, (err, data) => {
          return err ? /* istanbul ignore next: should never error */ reject(err) : resolve(data)
        })
      })
    }

    if (typeof callback !== 'function') {
      throw new InvalidArgumentError('invalid callback')
    }

    if (this[kDestroyed]) {
      if (this[kOnDestroyed]) {
        this[kOnDestroyed].push(callback)
      } else {
        queueMicrotask(() => callback(null, null))
      }
      return
    }

    if (!err) {
      err = new ClientDestroyedError()
    }

    const requests = this[kQueue].splice(this[kPendingIdx])
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i]
      errorRequest(this, request, err)
    }

    this[kClosed] = true
    this[kDestroyed] = true
    this[kOnDestroyed].push(callback)

    const onDestroyed = () => {
      const callbacks = this[kOnDestroyed]
      this[kOnDestroyed] = null
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](null, null)
      }
    }

    if (!this[kSocket]) {
      queueMicrotask(onDestroyed)
    } else {
      util.destroy(this[kSocket].on('close', onDestroyed), err)
    }

    resume(this)
  }
}

const constants = __nccwpck_require__(953)
const EMPTY_BUF = Buffer.alloc(0)

async function lazyllhttp () {
  let mod
  try {
    mod = await WebAssembly.compile(Buffer.from(__nccwpck_require__(8221), 'base64'))
  } catch (e) {
    /* istanbul ignore next */

    // We could check if the error was caused by the simd option not
    // being enabled, but the occurring of this other error
    // * https://github.com/emscripten-core/emscripten/issues/11495
    // got me to remove that check to avoid breaking Node 12.
    mod = await WebAssembly.compile(Buffer.from(__nccwpck_require__(2643), 'base64'))
  }

  return await WebAssembly.instantiate(mod, {
    env: {
      /* eslint-disable camelcase */

      wasm_on_url: (p, at, len) => {
        /* istanbul ignore next */
        return 0
      },
      wasm_on_status: (p, at, len) => {
        assert.strictEqual(currentParser.ptr, p)
        const start = at - currentBufferPtr
        const end = start + len
        return currentParser.onStatus(currentBufferRef.slice(start, end)) || 0
      },
      wasm_on_message_begin: (p) => {
        assert.strictEqual(currentParser.ptr, p)
        return currentParser.onMessageBegin() || 0
      },
      wasm_on_header_field: (p, at, len) => {
        assert.strictEqual(currentParser.ptr, p)
        const start = at - currentBufferPtr
        const end = start + len
        return currentParser.onHeaderField(currentBufferRef.slice(start, end)) || 0
      },
      wasm_on_header_value: (p, at, len) => {
        assert.strictEqual(currentParser.ptr, p)
        const start = at - currentBufferPtr
        const end = start + len
        return currentParser.onHeaderValue(currentBufferRef.slice(start, end)) || 0
      },
      wasm_on_headers_complete: (p, statusCode, upgrade, shouldKeepAlive) => {
        assert.strictEqual(currentParser.ptr, p)
        return currentParser.onHeadersComplete(statusCode, Boolean(upgrade), Boolean(shouldKeepAlive)) || 0
      },
      wasm_on_body: (p, at, len) => {
        assert.strictEqual(currentParser.ptr, p)
        const start = at - currentBufferPtr
        const end = start + len
        return currentParser.onBody(currentBufferRef.slice(start, end)) || 0
      },
      wasm_on_message_complete: (p) => {
        assert.strictEqual(currentParser.ptr, p)
        return currentParser.onMessageComplete() || 0
      }

      /* eslint-enable camelcase */
    }
  })
}

let llhttpInstance = null
let llhttpPromise = lazyllhttp()
  .catch(() => {
    // TODO: Emit warning?
  })

let currentParser = null
let currentBufferRef = null
let currentBufferSize = 0
let currentBufferPtr = null

const TIMEOUT_HEADERS = 1
const TIMEOUT_BODY = 2
const TIMEOUT_IDLE = 3

class Parser {
  constructor (client, socket, { exports }) {
    assert(Number.isFinite(client[kMaxHeadersSize]) && client[kMaxHeadersSize] > 0)

    this.llhttp = exports
    this.ptr = this.llhttp.llhttp_alloc(constants.TYPE.RESPONSE)
    this.client = client
    this.socket = socket
    this.timeout = null
    this.timeoutValue = null
    this.timeoutType = null
    this.statusCode = null
    this.statusText = ''
    this.upgrade = false
    this.headers = []
    this.headersSize = 0
    this.headersMaxSize = client[kMaxHeadersSize]
    this.shouldKeepAlive = false
    this.paused = false
    this.resume = this.resume.bind(this)

    this.bytesRead = 0

    this.trailer = ''
    this.keepAlive = ''
    this.contentLength = ''
  }

  setTimeout (value, type) {
    this.timeoutType = type
    if (value !== this.timeoutValue) {
      clearTimeout(this.timeout)
      if (value) {
        this.timeout = setTimeout(onParserTimeout, value, this)
        // istanbul ignore else: only for jest
        if (this.timeout.unref) {
          this.timeout.unref()
        }
      } else {
        this.timeout = null
      }
      this.timeoutValue = value
    } else if (this.timeout) {
      // istanbul ignore else: only for jest
      if (this.timeout.refresh) {
        this.timeout.refresh()
      }
    }
  }

  resume () {
    if (this.socket.destroyed || !this.paused) {
      return
    }

    assert(this.ptr != null)
    assert(currentParser == null)

    this.llhttp.llhttp_resume(this.ptr)

    assert(this.timeoutType === TIMEOUT_BODY)
    if (this.timeout) {
      // istanbul ignore else: only for jest
      if (this.timeout.refresh) {
        this.timeout.refresh()
      }
    }

    this.paused = false
    this.execute(this.socket.read() || EMPTY_BUF) // Flush parser.
    this.readMore()
  }

  readMore () {
    while (!this.paused && this.ptr) {
      const chunk = this.socket.read()
      if (chunk === null) {
        break
      }
      this.execute(chunk)
    }
  }

  execute (data) {
    assert(this.ptr != null)
    assert(currentParser == null)
    assert(!this.paused)

    const { socket, llhttp } = this

    if (data.length > currentBufferSize) {
      if (currentBufferPtr) {
        llhttp.free(currentBufferPtr)
      }
      currentBufferSize = Math.ceil(data.length / 4096) * 4096
      currentBufferPtr = llhttp.malloc(currentBufferSize)
    }

    // TODO (perf): Can we avoid this copy somehow?
    new Uint8Array(llhttp.memory.buffer, currentBufferPtr, currentBufferSize).set(data)

    // Call `execute` on the wasm parser.
    // We pass the `llhttp_parser` pointer address, the pointer address of buffer view data,
    // and finally the length of bytes to parse.
    // The return value is an error code or `constants.ERROR.OK`.
    try {
      let ret

      try {
        currentBufferRef = data
        currentParser = this
        ret = llhttp.llhttp_execute(this.ptr, currentBufferPtr, data.length)
        /* eslint-disable-next-line no-useless-catch */
      } catch (err) {
        /* istanbul ignore next: difficult to make a test case for */
        throw err
      } finally {
        currentParser = null
        currentBufferRef = null
      }

      const offset = llhttp.llhttp_get_error_pos(this.ptr) - currentBufferPtr

      if (ret === constants.ERROR.PAUSED_UPGRADE) {
        this.onUpgrade(data.slice(offset))
      } else if (ret === constants.ERROR.PAUSED) {
        this.paused = true
        socket.unshift(data.slice(offset))
      } else if (ret !== constants.ERROR.OK) {
        const ptr = llhttp.llhttp_get_error_reason(this.ptr)
        let message = ''
        /* istanbul ignore else: difficult to make a test case for */
        if (ptr) {
          const len = new Uint8Array(llhttp.memory.buffer, ptr).indexOf(0)
          message = Buffer.from(llhttp.memory.buffer, ptr, len).toString()
        }
        throw new HTTPParserError(message, constants.ERROR[ret], data.slice(offset))
      }
    } catch (err) {
      util.destroy(socket, err)
    }
  }

  finish () {
    try {
      try {
        currentParser = this
        this.llhttp.llhttp_finish(this.ptr) // TODO (fix): Check ret?
      } finally {
        currentParser = null
      }
    } catch (err) {
      // TODO (fix): What if socket is already destroyed? Error will be swallowed.
      /* istanbul ignore next: difficult to make a test case for */
      util.destroy(this.socket, err)
    }
  }

  destroy () {
    assert(this.ptr != null)
    assert(currentParser == null)

    this.llhttp.llhttp_free(this.ptr)
    this.ptr = null

    clearTimeout(this.timeout)
    this.timeout = null
    this.timeoutValue = null
    this.timeoutType = null

    this.paused = false
  }

  onStatus (buf) {
    this.statusText = buf.toString()
  }

  onMessageBegin () {
    const { socket, client } = this

    /* istanbul ignore next: difficult to make a test case for */
    if (socket.destroyed) {
      return -1
    }

    const request = client[kQueue][client[kRunningIdx]]
    if (!request) {
      return -1
    }
  }

  onHeaderField (buf) {
    const len = this.headers.length

    if ((len & 1) === 0) {
      this.headers.push(buf)
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf])
    }

    this.trackHeader(buf.length)
  }

  onHeaderValue (buf) {
    let len = this.headers.length

    if ((len & 1) === 1) {
      this.headers.push(buf)
      len += 1
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf])
    }

    const key = this.headers[len - 2]
    if (key.length === 10 && key.toString().toLowerCase() === 'keep-alive') {
      this.keepAlive += buf.toString()
    } else if (key.length === 7 && key.toString().toLowerCase() === 'trailer') {
      this.trailer += buf.toString()
    } else if (key.length === 14 && key.toString().toLowerCase() === 'content-length') {
      this.contentLength += buf.toString()
    }

    this.trackHeader(buf.length)
  }

  trackHeader (len) {
    this.headersSize += len
    if (this.headersSize >= this.headersMaxSize) {
      util.destroy(this.socket, new HeadersOverflowError())
    }
  }

  onUpgrade (head) {
    const { upgrade, client, socket, headers, statusCode } = this

    assert(upgrade)

    const request = client[kQueue][client[kRunningIdx]]
    assert(request)

    assert(!socket.destroyed)
    assert(socket === client[kSocket])
    assert(!this.paused)
    assert(request.upgrade || request.method === 'CONNECT')

    this.statusCode = null
    this.statusText = ''
    this.shouldKeepAlive = null

    assert(this.headers.length % 2 === 0)
    this.headers = []
    this.headersSize = 0

    socket.unshift(head)

    socket[kParser].destroy()
    socket[kParser] = null

    socket[kClient] = null
    socket[kError] = null
    socket
      .removeListener('error', onSocketError)
      .removeListener('readable', onSocketReadable)
      .removeListener('end', onSocketEnd)
      .removeListener('close', onSocketClose)

    client[kSocket] = null
    client[kQueue][client[kRunningIdx]++] = null
    client.emit('disconnect', client[kUrl], [client], new InformationalError('upgrade'))

    try {
      request.onUpgrade(statusCode, headers, socket)
    } catch (err) {
      util.destroy(socket, err)
    }

    resume(client)
  }

  onHeadersComplete (statusCode, upgrade, shouldKeepAlive) {
    const { client, socket, headers, statusText } = this

    /* istanbul ignore next: difficult to make a test case for */
    if (socket.destroyed) {
      return -1
    }

    const request = client[kQueue][client[kRunningIdx]]

    /* istanbul ignore next: difficult to make a test case for */
    if (!request) {
      return -1
    }

    // TODO: Check for content-length mismatch from server?

    assert(!this.upgrade)
    assert(this.statusCode < 200)

    // TODO: More statusCode validation?

    if (statusCode === 100) {
      util.destroy(socket, new SocketError('bad response', util.getSocketInfo(socket)))
      return -1
    }

    /* istanbul ignore if: this can only happen if server is misbehaving */
    if (upgrade && !request.upgrade) {
      util.destroy(socket, new SocketError('bad upgrade', util.getSocketInfo(socket)))
      return -1
    }

    assert.strictEqual(this.timeoutType, TIMEOUT_HEADERS)

    this.statusCode = statusCode
    this.shouldKeepAlive = shouldKeepAlive

    if (this.statusCode >= 200) {
      const bodyTimeout = request.bodyTimeout != null
        ? request.bodyTimeout
        : client[kBodyTimeout]
      this.setTimeout(bodyTimeout, TIMEOUT_BODY)
    } else if (this.timeout) {
      // istanbul ignore else: only for jest
      if (this.timeout.refresh) {
        this.timeout.refresh()
      }
    }

    if (request.method === 'CONNECT' && statusCode >= 200 && statusCode < 300) {
      assert(client[kRunning] === 1)
      this.upgrade = true
      return 2
    }

    if (upgrade) {
      assert(client[kRunning] === 1)
      this.upgrade = true
      return 2
    }

    assert(this.headers.length % 2 === 0)
    this.headers = []
    this.headersSize = 0

    if (shouldKeepAlive && client[kPipelining]) {
      const keepAliveTimeout = this.keepAlive ? util.parseKeepAliveTimeout(this.keepAlive) : null

      if (keepAliveTimeout != null) {
        const timeout = Math.min(
          keepAliveTimeout - client[kKeepAliveTimeoutThreshold],
          client[kKeepAliveMaxTimeout]
        )
        if (timeout <= 0) {
          socket[kReset] = true
        } else {
          client[kKeepAliveTimeoutValue] = timeout
        }
      } else {
        client[kKeepAliveTimeoutValue] = client[kKeepAliveDefaultTimeout]
      }
    } else {
      // Stop more requests from being dispatched.
      socket[kReset] = true
    }

    let pause
    try {
      pause = request.onHeaders(statusCode, headers, this.resume, statusText) === false
    } catch (err) {
      util.destroy(socket, err)
      return -1
    }

    if (request.method === 'HEAD') {
      assert(socket[kReset])
      return 1
    }

    if (statusCode < 200) {
      return 1
    }

    if (socket[kBlocking]) {
      socket[kBlocking] = false
      resume(client)
    }

    return pause ? constants.ERROR.PAUSED : 0
  }

  onBody (buf) {
    const { client, socket, statusCode } = this

    if (socket.destroyed) {
      return -1
    }

    const request = client[kQueue][client[kRunningIdx]]
    assert(request)

    assert.strictEqual(this.timeoutType, TIMEOUT_BODY)
    if (this.timeout) {
      // istanbul ignore else: only for jest
      if (this.timeout.refresh) {
        this.timeout.refresh()
      }
    }

    assert(statusCode >= 200)

    this.bytesRead += buf.length

    try {
      if (request.onData(buf) === false) {
        return constants.ERROR.PAUSED
      }
    } catch (err) {
      util.destroy(socket, err)
      return -1
    }
  }

  onMessageComplete () {
    const { client, socket, statusCode, upgrade, trailer, headers, contentLength, bytesRead, shouldKeepAlive } = this

    if (socket.destroyed && (!statusCode || shouldKeepAlive)) {
      return -1
    }

    if (upgrade) {
      return
    }

    const request = client[kQueue][client[kRunningIdx]]
    assert(request)

    assert(statusCode >= 100)

    this.statusCode = null
    this.statusText = ''
    this.bytesRead = 0
    this.contentLength = ''
    this.trailer = ''
    this.keepAlive = ''

    assert(this.headers.length % 2 === 0)
    this.headers = []
    this.headersSize = 0

    if (statusCode < 200) {
      return
    }

    const trailers = trailer ? trailer.split(/,\s*/) : []
    for (let i = 0; i < trailers.length; i++) {
      const trailer = trailers[i]
      let found = false
      for (let n = 0; n < headers.length; n += 2) {
        const key = headers[n]
        if (key.length === trailer.length && key.toString().toLowerCase() === trailer.toLowerCase()) {
          found = true
          break
        }
      }
      if (!found) {
        util.destroy(socket, new TrailerMismatchError())
        return -1
      }
    }

    /* istanbul ignore next: should be handled by llhttp? */
    if (request.method !== 'HEAD' && contentLength && bytesRead !== parseInt(contentLength, 10)) {
      util.destroy(socket, new ResponseContentLengthMismatchError())
      return -1
    }

    try {
      request.onComplete(headers)
    } catch (err) {
      errorRequest(client, request, err)
    }

    client[kQueue][client[kRunningIdx]++] = null

    if (socket[kWriting]) {
      assert.strictEqual(client[kRunning], 0)
      // Response completed before request.
      util.destroy(socket, new InformationalError('reset'))
      return constants.ERROR.PAUSED
    } else if (!shouldKeepAlive) {
      // TODO: What if running > 0?
      util.destroy(socket, new InformationalError('reset'))
      return constants.ERROR.PAUSED
    } else if (socket[kReset] && client[kRunning] === 0) {
      // Destroy socket once all requests have completed.
      // The request at the tail of the pipeline is the one
      // that requested reset and no further requests should
      // have been queued since then.
      util.destroy(socket, new InformationalError('reset'))
      return constants.ERROR.PAUSED
    } else {
      resume(client)
    }
  }
}

function onParserTimeout (parser) {
  const { socket, timeoutType, client } = parser

  /* istanbul ignore else */
  if (timeoutType === TIMEOUT_HEADERS) {
    if (!socket[kWriting]) {
      assert(!parser.paused, 'cannot be paused while waiting for headers')
      util.destroy(socket, new HeadersTimeoutError())
    }
  } else if (timeoutType === TIMEOUT_BODY) {
    if (!parser.paused) {
      util.destroy(socket, new BodyTimeoutError())
    }
  } else if (timeoutType === TIMEOUT_IDLE) {
    assert(client[kRunning] === 0 && client[kKeepAliveTimeoutValue])
    util.destroy(socket, new InformationalError('socket idle timeout'))
  }
}

function onSocketReadable () {
  const { [kParser]: parser } = this
  parser.readMore()
}

function onSocketError (err) {
  const { [kParser]: parser } = this

  assert(err.code !== 'ERR_TLS_CERT_ALTNAME_INVALID')

  // On Mac OS, we get an ECONNRESET even if there is a full body to be forwarded
  // to the user.
  if (err.code === 'ECONNRESET' && parser.statusCode && !parser.shouldKeepAlive) {
    // We treat all incoming data so for as a valid response.
    parser.finish()
    return
  }

  this[kError] = err

  onError(this[kClient], err)
}

function onError (client, err) {
  if (
    client[kRunning] === 0 &&
    err.code !== 'UND_ERR_INFO' &&
    err.code !== 'UND_ERR_SOCKET'
  ) {
    // Error is not caused by running request and not a recoverable
    // socket error.

    assert(client[kPendingIdx] === client[kRunningIdx])

    const requests = client[kQueue].splice(client[kRunningIdx])
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i]
      errorRequest(client, request, err)
    }
    assert(client[kSize] === 0)
  }
}

function onSocketEnd () {
  const { [kParser]: parser } = this

  if (parser.statusCode && !parser.shouldKeepAlive) {
    // We treat all incoming data so far as a valid response.
    parser.finish()
    return
  }

  util.destroy(this, new SocketError('other side closed', util.getSocketInfo(this)))
}

function onSocketClose () {
  const { [kClient]: client } = this

  this[kParser].destroy()
  this[kParser] = null

  const err = this[kError] || new SocketError('closed', util.getSocketInfo(this))

  client[kSocket] = null

  if (client[kDestroyed]) {
    assert(client[kPending] === 0)

    // Fail entire queue.
    const requests = client[kQueue].splice(client[kRunningIdx])
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i]
      errorRequest(client, request, err)
    }
  } else if (client[kRunning] > 0 && err.code !== 'UND_ERR_INFO') {
    // Fail head of pipeline.
    const request = client[kQueue][client[kRunningIdx]]
    client[kQueue][client[kRunningIdx]++] = null

    errorRequest(client, request, err)
  }

  client[kPendingIdx] = client[kRunningIdx]

  assert(client[kRunning] === 0)

  client.emit('disconnect', client[kUrl], [client], err)

  resume(client)
}

async function connect (client) {
  assert(!client[kConnecting])
  assert(!client[kSocket])

  let { host, hostname, protocol, port } = client[kUrl]

  // Resolve ipv6
  if (hostname[0] === '[') {
    const idx = hostname.indexOf(']')

    assert(idx !== -1)
    const ip = hostname.substr(1, idx - 1)

    assert(net.isIP(ip))
    hostname = ip
  }

  client[kConnecting] = true

  if (channels.beforeConnect.hasSubscribers) {
    channels.beforeConnect.publish({
      connectParams: {
        host,
        hostname,
        protocol,
        port,
        servername: client[kServerName]
      },
      connector: client[kConnector]
    })
  }

  try {
    const socket = await new Promise((resolve, reject) => {
      client[kConnector]({
        host,
        hostname,
        protocol,
        port,
        servername: client[kServerName]
      }, (err, socket) => {
        if (err) {
          reject(err)
        } else {
          resolve(socket)
        }
      })
    })

    if (!llhttpInstance) {
      llhttpInstance = await llhttpPromise
      llhttpPromise = null
    }

    client[kConnecting] = false

    assert(socket)

    client[kSocket] = socket

    socket[kNoRef] = false
    socket[kWriting] = false
    socket[kReset] = false
    socket[kBlocking] = false
    socket[kError] = null
    socket[kParser] = new Parser(client, socket, llhttpInstance)
    socket[kClient] = client
    socket[kCounter] = 0
    socket[kMaxRequests] = client[kMaxRequests]
    socket
      .on('error', onSocketError)
      .on('readable', onSocketReadable)
      .on('end', onSocketEnd)
      .on('close', onSocketClose)

    if (channels.connected.hasSubscribers) {
      channels.connected.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port,
          servername: client[kServerName]
        },
        connector: client[kConnector],
        socket
      })
    }
    client.emit('connect', client[kUrl], [client])
  } catch (err) {
    client[kConnecting] = false

    if (channels.connectError.hasSubscribers) {
      channels.connectError.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port,
          servername: client[kServerName]
        },
        connector: client[kConnector],
        error: err
      })
    }

    if (err.code === 'ERR_TLS_CERT_ALTNAME_INVALID') {
      assert(client[kRunning] === 0)
      while (client[kPending] > 0 && client[kQueue][client[kPendingIdx]].servername === client[kServerName]) {
        const request = client[kQueue][client[kPendingIdx]++]
        errorRequest(client, request, err)
      }
    } else {
      onError(client, err)
    }

    client.emit('connectionError', client[kUrl], [client], err)
  }

  resume(client)
}

function emitDrain (client) {
  client[kNeedDrain] = 0
  client.emit('drain', client[kUrl], [client])
}

function resume (client, sync) {
  if (client[kResuming] === 2) {
    return
  }

  client[kResuming] = 2

  _resume(client, sync)
  client[kResuming] = 0

  if (client[kRunningIdx] > 256) {
    client[kQueue].splice(0, client[kRunningIdx])
    client[kPendingIdx] -= client[kRunningIdx]
    client[kRunningIdx] = 0
  }
}

function _resume (client, sync) {
  while (true) {
    if (client[kDestroyed]) {
      assert(client[kPending] === 0)
      return
    }

    if (client[kClosed] && !client[kSize]) {
      client.destroy(util.nop)
      continue
    }

    const socket = client[kSocket]

    if (socket) {
      if (client[kSize] === 0) {
        if (!socket[kNoRef] && socket.unref) {
          socket.unref()
          socket[kNoRef] = true
        }
      } else if (socket[kNoRef] && socket.ref) {
        socket.ref()
        socket[kNoRef] = false
      }

      if (client[kSize] === 0) {
        if (socket[kParser].timeoutType !== TIMEOUT_IDLE) {
          socket[kParser].setTimeout(client[kKeepAliveTimeoutValue], TIMEOUT_IDLE)
        }
      } else if (client[kRunning] > 0 && socket[kParser].statusCode < 200) {
        if (socket[kParser].timeoutType !== TIMEOUT_HEADERS) {
          const request = client[kQueue][client[kRunningIdx]]
          const headersTimeout = request.headersTimeout != null
            ? request.headersTimeout
            : client[kHeadersTimeout]
          socket[kParser].setTimeout(headersTimeout, TIMEOUT_HEADERS)
        }
      }
    }

    if (client[kBusy]) {
      client[kNeedDrain] = 2
    } else if (client[kNeedDrain] === 2) {
      if (sync) {
        client[kNeedDrain] = 1
        process.nextTick(emitDrain, client)
      } else {
        emitDrain(client)
      }
      continue
    }

    if (client[kPending] === 0) {
      return
    }

    if (client[kRunning] >= (client[kPipelining] || 1)) {
      return
    }

    const request = client[kQueue][client[kPendingIdx]]

    if (client[kUrl].protocol === 'https:' && client[kServerName] !== request.servername) {
      if (client[kRunning] > 0) {
        return
      }

      client[kServerName] = request.servername

      if (socket && socket.servername !== request.servername) {
        util.destroy(socket, new InformationalError('servername changed'))
        return
      }
    }

    if (client[kConnecting]) {
      return
    }

    if (!socket) {
      connect(client)
      continue
    }

    if (socket.destroyed || socket[kWriting] || socket[kReset] || socket[kBlocking]) {
      return
    }

    if (client[kRunning] > 0 && !request.idempotent) {
      // Non-idempotent request cannot be retried.
      // Ensure that no other requests are inflight and
      // could cause failure.
      return
    }

    if (client[kRunning] > 0 && (request.upgrade || request.method === 'CONNECT')) {
      // Don't dispatch an upgrade until all preceding requests have completed.
      // A misbehaving server might upgrade the connection before all pipelined
      // request has completed.
      return
    }

    if (util.isStream(request.body) && util.bodyLength(request.body) === 0) {
      request.body
        .on('data', /* istanbul ignore next */ function () {
          /* istanbul ignore next */
          assert(false)
        })
        .on('error', function (err) {
          errorRequest(client, request, err)
        })
        .on('end', function () {
          util.destroy(this)
        })

      request.body = null
    }

    if (client[kRunning] > 0 &&
      (util.isStream(request.body) || util.isAsyncIterable(request.body))) {
      // Request with stream or iterator body can error while other requests
      // are inflight and indirectly error those as well.
      // Ensure this doesn't happen by waiting for inflight
      // to complete before dispatching.

      // Request with stream or iterator body cannot be retried.
      // Ensure that no other requests are inflight and
      // could cause failure.
      return
    }

    if (!request.aborted && write(client, request)) {
      client[kPendingIdx]++
    } else {
      client[kQueue].splice(client[kPendingIdx], 1)
    }
  }
}

function write (client, request) {
  const { body, method, path, host, upgrade, headers, blocking } = request

  // https://tools.ietf.org/html/rfc7231#section-4.3.1
  // https://tools.ietf.org/html/rfc7231#section-4.3.2
  // https://tools.ietf.org/html/rfc7231#section-4.3.5

  // Sending a payload body on a request that does not
  // expect it can cause undefined behavior on some
  // servers and corrupt connection state. Do not
  // re-use the connection for further requests.

  const expectsPayload = (
    method === 'PUT' ||
    method === 'POST' ||
    method === 'PATCH'
  )

  if (body && typeof body.read === 'function') {
    // Try to read EOF in order to get length.
    body.read(0)
  }

  let contentLength = util.bodyLength(body)

  if (contentLength === null) {
    contentLength = request.contentLength
  }

  if (contentLength === 0 && !expectsPayload) {
    // https://tools.ietf.org/html/rfc7230#section-3.3.2
    // A user agent SHOULD NOT send a Content-Length header field when
    // the request message does not contain a payload body and the method
    // semantics do not anticipate such a body.

    contentLength = null
  }

  if (request.contentLength !== null && request.contentLength !== contentLength) {
    if (client[kStrictContentLength]) {
      errorRequest(client, request, new RequestContentLengthMismatchError())
      return false
    }

    process.emitWarning(new RequestContentLengthMismatchError())
  }

  const socket = client[kSocket]

  try {
    request.onConnect((err) => {
      if (request.aborted || request.completed) {
        return
      }

      errorRequest(client, request, err || new RequestAbortedError())

      util.destroy(socket, new InformationalError('aborted'))
    })
  } catch (err) {
    errorRequest(client, request, err)
  }

  if (request.aborted) {
    return false
  }

  if (method === 'HEAD') {
    // https://github.com/mcollina/undici/issues/258

    // Close after a HEAD request to interop with misbehaving servers
    // that may send a body in the response.

    socket[kReset] = true
  }

  if (upgrade || method === 'CONNECT') {
    // On CONNECT or upgrade, block pipeline from dispatching further
    // requests on this connection.

    socket[kReset] = true
  }

  if (client[kMaxRequests] && socket[kCounter]++ >= client[kMaxRequests]) {
    socket[kReset] = true
  }

  if (blocking) {
    socket[kBlocking] = true
  }

  // TODO: Expect: 100-continue

  let header = `${method} ${path} HTTP/1.1\r\n`

  if (host) {
    header += `host: ${host}\r\n`
  } else {
    header += client[kHostHeader]
  }

  if (upgrade) {
    header += `connection: upgrade\r\nupgrade: ${upgrade}\r\n`
  } else if (client[kPipelining]) {
    header += 'connection: keep-alive\r\n'
  } else {
    header += 'connection: close\r\n'
  }

  if (headers) {
    header += headers
  }

  if (channels.sendHeaders.hasSubscribers) {
    channels.sendHeaders.publish({ request, headers: header, socket })
  }

  /* istanbul ignore else: assertion */
  if (!body) {
    if (contentLength === 0) {
      socket.write(`${header}content-length: 0\r\n\r\n`, 'ascii')
    } else {
      assert(contentLength === null, 'no body must not have content length')
      socket.write(`${header}\r\n`, 'ascii')
    }
    request.onRequestSent()
  } else if (util.isBuffer(body)) {
    assert(contentLength === body.byteLength, 'buffer body must have content length')

    socket.cork()
    socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, 'ascii')
    socket.write(body)
    socket.uncork()
    request.onBodySent(body)
    request.onRequestSent()
    if (!expectsPayload) {
      socket[kReset] = true
    }
  } else if (util.isBlobLike(body)) {
    if (typeof body.stream === 'function') {
      writeIterable({ body: body.stream(), client, request, socket, contentLength, header, expectsPayload })
    } else {
      writeBlob({ body, client, request, socket, contentLength, header, expectsPayload })
    }
  } else if (util.isStream(body)) {
    writeStream({ body, client, request, socket, contentLength, header, expectsPayload })
  } else if (util.isIterable(body)) {
    writeIterable({ body, client, request, socket, contentLength, header, expectsPayload })
  } else {
    assert(false)
  }

  return true
}

function writeStream ({ body, client, request, socket, contentLength, header, expectsPayload }) {
  assert(contentLength !== 0 || client[kRunning] === 0, 'stream body cannot be pipelined')

  let finished = false

  const writer = new AsyncWriter({ socket, request, contentLength, client, expectsPayload, header })

  const onData = function (chunk) {
    try {
      assert(!finished)

      if (!writer.write(chunk) && this.pause) {
        this.pause()
      }
    } catch (err) {
      util.destroy(this, err)
    }
  }
  const onDrain = function () {
    assert(!finished)

    if (body.resume) {
      body.resume()
    }
  }
  const onAbort = function () {
    onFinished(new RequestAbortedError())
  }
  const onFinished = function (err) {
    if (finished) {
      return
    }

    finished = true

    assert(socket.destroyed || (socket[kWriting] && client[kRunning] <= 1))

    socket
      .off('drain', onDrain)
      .off('error', onFinished)

    body
      .removeListener('data', onData)
      .removeListener('end', onFinished)
      .removeListener('error', onFinished)
      .removeListener('close', onAbort)

    if (!err) {
      try {
        writer.end()
      } catch (er) {
        err = er
      }
    }

    writer.destroy(err)

    // TODO (fix): Avoid using err.message for logic.
    if (err && (err.code !== 'UND_ERR_INFO' || err.message !== 'reset')) {
      util.destroy(body, err)
    } else {
      util.destroy(body)
    }
  }

  body
    .on('data', onData)
    .on('end', onFinished)
    .on('error', onFinished)
    .on('close', onAbort)

  if (body.resume) {
    body.resume()
  }

  socket
    .on('drain', onDrain)
    .on('error', onFinished)
}

async function writeBlob ({ body, client, request, socket, contentLength, header, expectsPayload }) {
  assert(contentLength === body.size, 'blob body must have content length')

  try {
    if (contentLength != null && contentLength !== body.size) {
      throw new RequestContentLengthMismatchError()
    }

    const buffer = Buffer.from(await body.arrayBuffer())

    socket.cork()
    socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, 'ascii')
    socket.write(buffer)
    socket.uncork()

    request.onBodySent(buffer)
    request.onRequestSent()

    if (!expectsPayload) {
      socket[kReset] = true
    }

    resume(client)
  } catch (err) {
    util.destroy(socket, err)
  }
}

async function writeIterable ({ body, client, request, socket, contentLength, header, expectsPayload }) {
  assert(contentLength !== 0 || client[kRunning] === 0, 'iterator body cannot be pipelined')

  let callback = null
  function onDrain () {
    if (callback) {
      const cb = callback
      callback = null
      cb()
    }
  }

  const waitForDrain = () => new Promise((resolve, reject) => {
    assert(callback === null)

    if (socket[kError]) {
      reject(socket[kError])
    } else {
      callback = resolve
    }
  })

  socket
    .on('close', onDrain)
    .on('drain', onDrain)

  const writer = new AsyncWriter({ socket, request, contentLength, client, expectsPayload, header })
  try {
    // TODO (fix): What if socket errors while waiting for body?
    // It's up to the user to somehow abort the async iterable.
    for await (const chunk of body) {
      if (socket[kError]) {
        throw socket[kError]
      }

      if (!writer.write(chunk)) {
        await waitForDrain()
      }
    }

    writer.end()
  } catch (err) {
    writer.destroy(err)
  } finally {
    socket
      .off('close', onDrain)
      .off('drain', onDrain)
  }
}

class AsyncWriter {
  constructor ({ socket, request, contentLength, client, expectsPayload, header }) {
    this.socket = socket
    this.request = request
    this.contentLength = contentLength
    this.client = client
    this.bytesWritten = 0
    this.expectsPayload = expectsPayload
    this.header = header

    socket[kWriting] = true
  }

  write (chunk) {
    const { socket, request, contentLength, client, bytesWritten, expectsPayload, header } = this

    if (socket[kError]) {
      throw socket[kError]
    }

    if (socket.destroyed) {
      return false
    }

    const len = Buffer.byteLength(chunk)
    if (!len) {
      return true
    }

    // TODO: What if not ended and bytesWritten === contentLength?
    // We should defer writing chunks.
    if (contentLength !== null && bytesWritten + len > contentLength) {
      if (client[kStrictContentLength]) {
        throw new RequestContentLengthMismatchError()
      }

      process.emitWarning(new RequestContentLengthMismatchError())
    }

    if (bytesWritten === 0) {
      if (!expectsPayload) {
        socket[kReset] = true
      }

      if (contentLength === null) {
        socket.write(`${header}transfer-encoding: chunked\r\n`, 'ascii')
      } else {
        socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, 'ascii')
      }
    }

    if (contentLength === null) {
      socket.write(`\r\n${len.toString(16)}\r\n`, 'ascii')
    }

    this.bytesWritten += len

    const ret = socket.write(chunk)
    request.onBodySent(chunk)
    return ret
  }

  end () {
    const { socket, contentLength, client, bytesWritten, expectsPayload, header, request } = this
    request.onRequestSent()

    socket[kWriting] = false

    if (socket[kError]) {
      throw socket[kError]
    }

    if (socket.destroyed) {
      return
    }

    if (bytesWritten === 0) {
      if (expectsPayload) {
        // https://tools.ietf.org/html/rfc7230#section-3.3.2
        // A user agent SHOULD send a Content-Length in a request message when
        // no Transfer-Encoding is sent and the request method defines a meaning
        // for an enclosed payload body.

        socket.write(`${header}content-length: 0\r\n\r\n`, 'ascii')
      } else {
        socket.write(`${header}\r\n`, 'ascii')
      }
    } else if (contentLength === null) {
      socket.write('\r\n0\r\n\r\n', 'ascii')
    }

    if (contentLength !== null && bytesWritten !== contentLength) {
      if (client[kStrictContentLength]) {
        throw new RequestContentLengthMismatchError()
      } else {
        process.emitWarning(new RequestContentLengthMismatchError())
      }
    }

    // TODO (fix): Add comment clarifying what this does?
    if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
      // istanbul ignore else: only for jest
      if (socket[kParser].timeout.refresh) {
        socket[kParser].timeout.refresh()
      }
    }

    resume(client)
  }

  destroy (err) {
    const { socket, client } = this

    socket[kWriting] = false

    if (err) {
      assert(client[kRunning] <= 1, 'pipeline should only contain this request')
      util.destroy(socket, err)
    }
  }
}

function errorRequest (client, request, err) {
  try {
    request.onError(err)
    assert(request.aborted)
  } catch (err) {
    client.emit('error', err)
  }
}

module.exports = Client


/***/ }),

/***/ 6436:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/* istanbul ignore file: only for Node 12 */

const { kConnected, kSize } = __nccwpck_require__(2785)

class CompatWeakRef {
  constructor (value) {
    this.value = value
  }

  deref () {
    return this.value[kConnected] === 0 && this.value[kSize] === 0
      ? undefined
      : this.value
  }
}

class CompatFinalizer {
  constructor (finalizer) {
    this.finalizer = finalizer
  }

  register (dispatcher, key) {
    dispatcher.on('disconnect', () => {
      if (dispatcher[kConnected] === 0 && dispatcher[kSize] === 0) {
        this.finalizer(key)
      }
    })
  }
}

module.exports = function () {
  return {
    WeakRef: global.WeakRef || CompatWeakRef,
    FinalizationRegistry: global.FinalizationRegistry || CompatFinalizer
  }
}


/***/ }),

/***/ 2067:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const net = __nccwpck_require__(1808)
const assert = __nccwpck_require__(9491)
const util = __nccwpck_require__(3983)
const { InvalidArgumentError, ConnectTimeoutError } = __nccwpck_require__(8045)
let tls // include tls conditionally since it is not always available

// TODO: session re-use does not wait for the first
// connection to resolve the session and might therefore
// resolve the same servername multiple times even when
// re-use is enabled.

function buildConnector ({ maxCachedSessions, socketPath, timeout, ...opts }) {
  if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) {
    throw new InvalidArgumentError('maxCachedSessions must be a positive integer or zero')
  }

  const options = { path: socketPath, ...opts }
  const sessionCache = new Map()
  timeout = timeout == null ? 10e3 : timeout
  maxCachedSessions = maxCachedSessions == null ? 100 : maxCachedSessions

  return function connect ({ hostname, host, protocol, port, servername }, callback) {
    let socket
    if (protocol === 'https:') {
      if (!tls) {
        tls = __nccwpck_require__(4404) 
      }
      servername = servername || options.servername || util.getServerName(host) || null

      const sessionKey = servername || hostname
      const session = sessionCache.get(sessionKey) || null

      assert(sessionKey)

      socket = tls.connect({
        highWaterMark: 16384, // TLS in node can't have bigger HWM anyway...
        ...options,
        servername,
        session,
        port: port || 443,
        host: hostname
      })

      socket
        .on('session', function (session) {
          // cache is disabled
          if (maxCachedSessions === 0) {
            return
          }

          if (sessionCache.size >= maxCachedSessions) {
            // remove the oldest session
            const { value: oldestKey } = sessionCache.keys().next()
            sessionCache.delete(oldestKey)
          }

          sessionCache.set(sessionKey, session)
        })
        .on('error', function (err) {
          if (sessionKey && err.code !== 'UND_ERR_INFO') {
            // TODO (fix): Only delete for session related errors.
            sessionCache.delete(sessionKey)
          }
        })
    } else {
      socket = net.connect({
        highWaterMark: 64 * 1024, // Same as nodejs fs streams.
        ...options,
        port: port || 80,
        host: hostname
      })
    }

    const timeoutId = timeout
      ? setTimeout(onConnectTimeout, timeout, socket)
      : null

    socket
      .setNoDelay(true)
      .once(protocol === 'https:' ? 'secureConnect' : 'connect', function () {
        clearTimeout(timeoutId)

        if (callback) {
          const cb = callback
          callback = null
          cb(null, this)
        }
      })
      .on('error', function (err) {
        clearTimeout(timeoutId)

        if (callback) {
          const cb = callback
          callback = null
          cb(err)
        }
      })

    return socket
  }
}

function onConnectTimeout (socket) {
  util.destroy(socket, new ConnectTimeoutError())
}

module.exports = buildConnector


/***/ }),

/***/ 8045:
/***/ ((module) => {

"use strict";


class AbortError extends Error {
  constructor () {
    super('The operation was aborted')
    this.code = 'ABORT_ERR'
    this.name = 'AbortError'
  }
}

class UndiciError extends Error {
  constructor (message) {
    super(message)
    this.name = 'UndiciError'
    this.code = 'UND_ERR'
  }
}

class ConnectTimeoutError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, ConnectTimeoutError)
    this.name = 'ConnectTimeoutError'
    this.message = message || 'Connect Timeout Error'
    this.code = 'UND_ERR_CONNECT_TIMEOUT'
  }
}

class HeadersTimeoutError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, HeadersTimeoutError)
    this.name = 'HeadersTimeoutError'
    this.message = message || 'Headers Timeout Error'
    this.code = 'UND_ERR_HEADERS_TIMEOUT'
  }
}

class HeadersOverflowError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, HeadersOverflowError)
    this.name = 'HeadersOverflowError'
    this.message = message || 'Headers Overflow Error'
    this.code = 'UND_ERR_HEADERS_OVERFLOW'
  }
}

class BodyTimeoutError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, BodyTimeoutError)
    this.name = 'BodyTimeoutError'
    this.message = message || 'Body Timeout Error'
    this.code = 'UND_ERR_BODY_TIMEOUT'
  }
}

class InvalidArgumentError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, InvalidArgumentError)
    this.name = 'InvalidArgumentError'
    this.message = message || 'Invalid Argument Error'
    this.code = 'UND_ERR_INVALID_ARG'
  }
}

class InvalidReturnValueError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, InvalidReturnValueError)
    this.name = 'InvalidReturnValueError'
    this.message = message || 'Invalid Return Value Error'
    this.code = 'UND_ERR_INVALID_RETURN_VALUE'
  }
}

class RequestAbortedError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, RequestAbortedError)
    this.name = 'AbortError'
    this.message = message || 'Request aborted'
    this.code = 'UND_ERR_ABORTED'
  }
}

class InformationalError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, InformationalError)
    this.name = 'InformationalError'
    this.message = message || 'Request information'
    this.code = 'UND_ERR_INFO'
  }
}

class RequestContentLengthMismatchError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, RequestContentLengthMismatchError)
    this.name = 'RequestContentLengthMismatchError'
    this.message = message || 'Request body length does not match content-length header'
    this.code = 'UND_ERR_REQ_CONTENT_LENGTH_MISMATCH'
  }
}

class ResponseContentLengthMismatchError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, ResponseContentLengthMismatchError)
    this.name = 'ResponseContentLengthMismatchError'
    this.message = message || 'Response body length does not match content-length header'
    this.code = 'UND_ERR_RES_CONTENT_LENGTH_MISMATCH'
  }
}

class TrailerMismatchError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, TrailerMismatchError)
    this.name = 'TrailerMismatchError'
    this.message = message || 'Trailers does not match trailer header'
    this.code = 'UND_ERR_TRAILER_MISMATCH'
  }
}

class ClientDestroyedError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, ClientDestroyedError)
    this.name = 'ClientDestroyedError'
    this.message = message || 'The client is destroyed'
    this.code = 'UND_ERR_DESTROYED'
  }
}

class ClientClosedError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, ClientClosedError)
    this.name = 'ClientClosedError'
    this.message = message || 'The client is closed'
    this.code = 'UND_ERR_CLOSED'
  }
}

class SocketError extends UndiciError {
  constructor (message, socket) {
    super(message)
    Error.captureStackTrace(this, SocketError)
    this.name = 'SocketError'
    this.message = message || 'Socket error'
    this.code = 'UND_ERR_SOCKET'
    this.socket = socket
  }
}

class NotSupportedError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, NotSupportedError)
    this.name = 'NotSupportedError'
    this.message = message || 'Not supported error'
    this.code = 'UND_ERR_NOT_SUPPORTED'
  }
}

class BalancedPoolMissingUpstreamError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, NotSupportedError)
    this.name = 'MissingUpstreamError'
    this.message = message || 'No upstream has been added to the BalancedPool'
    this.code = 'UND_ERR_BPL_MISSING_UPSTREAM'
  }
}

class HTTPParserError extends Error {
  constructor (message, code, data) {
    super(message)
    Error.captureStackTrace(this, HTTPParserError)
    this.name = 'HTTPParserError'
    this.code = code ? `HPE_${code}` : undefined
    this.data = data ? data.toString() : undefined
  }
}

module.exports = {
  AbortError,
  HTTPParserError,
  UndiciError,
  HeadersTimeoutError,
  HeadersOverflowError,
  BodyTimeoutError,
  RequestContentLengthMismatchError,
  ConnectTimeoutError,
  TrailerMismatchError,
  InvalidArgumentError,
  InvalidReturnValueError,
  RequestAbortedError,
  ClientDestroyedError,
  ClientClosedError,
  InformationalError,
  SocketError,
  NotSupportedError,
  ResponseContentLengthMismatchError,
  BalancedPoolMissingUpstreamError
}


/***/ }),

/***/ 2905:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const {
  InvalidArgumentError,
  NotSupportedError
} = __nccwpck_require__(8045)
const util = __nccwpck_require__(3983)
const assert = __nccwpck_require__(9491)

const kHandler = Symbol('handler')

const channels = {}

try {
  const diagnosticsChannel = __nccwpck_require__(7643)
  channels.create = diagnosticsChannel.channel('undici:request:create')
  channels.bodySent = diagnosticsChannel.channel('undici:request:bodySent')
  channels.headers = diagnosticsChannel.channel('undici:request:headers')
  channels.trailers = diagnosticsChannel.channel('undici:request:trailers')
  channels.error = diagnosticsChannel.channel('undici:request:error')
} catch {
  channels.create = { hasSubscribers: false }
  channels.bodySent = { hasSubscribers: false }
  channels.headers = { hasSubscribers: false }
  channels.trailers = { hasSubscribers: false }
  channels.error = { hasSubscribers: false }
}

class Request {
  constructor (origin, {
    path,
    method,
    body,
    headers,
    idempotent,
    blocking,
    upgrade,
    headersTimeout,
    bodyTimeout
  }, handler) {
    if (typeof path !== 'string') {
      throw new InvalidArgumentError('path must be a string')
    } else if (path[0] !== '/' && !(path.startsWith('http://') || path.startsWith('https://'))) {
      throw new InvalidArgumentError('path must be an absolute URL or start with a slash')
    }

    if (typeof method !== 'string') {
      throw new InvalidArgumentError('method must be a string')
    }

    if (upgrade && typeof upgrade !== 'string') {
      throw new InvalidArgumentError('upgrade must be a string')
    }

    if (headersTimeout != null && (!Number.isFinite(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError('invalid headersTimeout')
    }

    if (bodyTimeout != null && (!Number.isFinite(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError('invalid bodyTimeout')
    }

    this.headersTimeout = headersTimeout

    this.bodyTimeout = bodyTimeout

    this.method = method

    if (body == null) {
      this.body = null
    } else if (util.isStream(body)) {
      this.body = body
    } else if (body instanceof DataView) {
      // TODO: Why is DataView special?
      this.body = body.buffer.byteLength ? Buffer.from(body.buffer) : null
    } else if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) {
      this.body = body.byteLength ? Buffer.from(body) : null
    } else if (util.isBuffer(body)) {
      this.body = body.byteLength ? body : null
    } else if (typeof body === 'string') {
      this.body = body.length ? Buffer.from(body) : null
    } else if (util.isIterable(body) || util.isBlobLike(body)) {
      this.body = body
    } else {
      throw new InvalidArgumentError('body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable')
    }

    this.completed = false

    this.aborted = false

    this.upgrade = upgrade || null

    this.path = path

    this.origin = origin

    this.idempotent = idempotent == null
      ? method === 'HEAD' || method === 'GET'
      : idempotent

    this.blocking = blocking == null ? false : blocking

    this.host = null

    this.contentLength = null

    this.contentType = null

    this.headers = ''

    if (Array.isArray(headers)) {
      if (headers.length % 2 !== 0) {
        throw new InvalidArgumentError('headers array must be even')
      }
      for (let i = 0; i < headers.length; i += 2) {
        processHeader(this, headers[i], headers[i + 1])
      }
    } else if (headers && typeof headers === 'object') {
      const keys = Object.keys(headers)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        processHeader(this, key, headers[key])
      }
    } else if (headers != null) {
      throw new InvalidArgumentError('headers must be an object or an array')
    }

    if (util.isBlobLike(body) && this.contentType == null && body.type) {
      this.contentType = body.type
      this.headers += `content-type: ${body.type}\r\n`
    }

    util.validateHandler(handler, method, upgrade)

    this.servername = util.getServerName(this.host)

    this[kHandler] = handler

    if (channels.create.hasSubscribers) {
      channels.create.publish({ request: this })
    }
  }

  onBodySent (chunk) {
    if (this[kHandler].onBodySent) {
      try {
        this[kHandler].onBodySent(chunk)
      } catch (err) {
        this.onError(err)
      }
    }
  }

  onRequestSent () {
    if (channels.bodySent.hasSubscribers) {
      channels.bodySent.publish({ request: this })
    }
  }

  onConnect (abort) {
    assert(!this.aborted)
    assert(!this.completed)

    return this[kHandler].onConnect(abort)
  }

  onHeaders (statusCode, headers, resume, statusText) {
    assert(!this.aborted)
    assert(!this.completed)

    if (channels.headers.hasSubscribers) {
      channels.headers.publish({ request: this, response: { statusCode, headers, statusText } })
    }

    return this[kHandler].onHeaders(statusCode, headers, resume, statusText)
  }

  onData (chunk) {
    assert(!this.aborted)
    assert(!this.completed)

    return this[kHandler].onData(chunk)
  }

  onUpgrade (statusCode, headers, socket) {
    assert(!this.aborted)
    assert(!this.completed)

    return this[kHandler].onUpgrade(statusCode, headers, socket)
  }

  onComplete (trailers) {
    assert(!this.aborted)

    this.completed = true
    if (channels.trailers.hasSubscribers) {
      channels.trailers.publish({ request: this, trailers })
    }
    return this[kHandler].onComplete(trailers)
  }

  onError (error) {
    if (channels.error.hasSubscribers) {
      channels.error.publish({ request: this, error })
    }

    if (this.aborted) {
      return
    }
    this.aborted = true
    return this[kHandler].onError(error)
  }

  addHeader (key, value) {
    processHeader(this, key, value)
    return this
  }
}

function processHeader (request, key, val) {
  if (val && typeof val === 'object') {
    throw new InvalidArgumentError(`invalid ${key} header`)
  } else if (val === undefined) {
    return
  }

  if (
    request.host === null &&
    key.length === 4 &&
    key.toLowerCase() === 'host'
  ) {
    // Consumed by Client
    request.host = val
  } else if (
    request.contentLength === null &&
    key.length === 14 &&
    key.toLowerCase() === 'content-length'
  ) {
    request.contentLength = parseInt(val, 10)
    if (!Number.isFinite(request.contentLength)) {
      throw new InvalidArgumentError('invalid content-length header')
    }
  } else if (
    request.contentType === null &&
    key.length === 12 &&
    key.toLowerCase() === 'content-type'
  ) {
    request.contentType = val
    request.headers += `${key}: ${val}\r\n`
  } else if (
    key.length === 17 &&
    key.toLowerCase() === 'transfer-encoding'
  ) {
    throw new InvalidArgumentError('invalid transfer-encoding header')
  } else if (
    key.length === 10 &&
    key.toLowerCase() === 'connection'
  ) {
    throw new InvalidArgumentError('invalid connection header')
  } else if (
    key.length === 10 &&
    key.toLowerCase() === 'keep-alive'
  ) {
    throw new InvalidArgumentError('invalid keep-alive header')
  } else if (
    key.length === 7 &&
    key.toLowerCase() === 'upgrade'
  ) {
    throw new InvalidArgumentError('invalid upgrade header')
  } else if (
    key.length === 6 &&
    key.toLowerCase() === 'expect'
  ) {
    throw new NotSupportedError('expect header not supported')
  } else {
    request.headers += `${key}: ${val}\r\n`
  }
}

module.exports = Request


/***/ }),

/***/ 2785:
/***/ ((module) => {

module.exports = {
  kUrl: Symbol('url'),
  kWriting: Symbol('writing'),
  kResuming: Symbol('resuming'),
  kQueue: Symbol('queue'),
  kConnect: Symbol('connect'),
  kConnecting: Symbol('connecting'),
  kHeadersList: Symbol('headers list'),
  kKeepAliveDefaultTimeout: Symbol('default keep alive timeout'),
  kKeepAliveMaxTimeout: Symbol('max keep alive timeout'),
  kKeepAliveTimeoutThreshold: Symbol('keep alive timeout threshold'),
  kKeepAliveTimeoutValue: Symbol('keep alive timeout'),
  kKeepAlive: Symbol('keep alive'),
  kHeadersTimeout: Symbol('headers timeout'),
  kBodyTimeout: Symbol('body timeout'),
  kServerName: Symbol('server name'),
  kHost: Symbol('host'),
  kNoRef: Symbol('no ref'),
  kBodyUsed: Symbol('used'),
  kRunning: Symbol('running'),
  kBlocking: Symbol('blocking'),
  kPending: Symbol('pending'),
  kSize: Symbol('size'),
  kBusy: Symbol('busy'),
  kConnected: Symbol('connected'),
  kClosed: Symbol('closed'),
  kNeedDrain: Symbol('need drain'),
  kReset: Symbol('reset'),
  kDestroyed: Symbol('destroyed'),
  kMaxHeadersSize: Symbol('max headers size'),
  kRunningIdx: Symbol('running index'),
  kPendingIdx: Symbol('pending index'),
  kError: Symbol('error'),
  kClients: Symbol('clients'),
  kClient: Symbol('client'),
  kParser: Symbol('parser'),
  kOnDestroyed: Symbol('destroy callbacks'),
  kPipelining: Symbol('pipelinig'),
  kSocket: Symbol('socket'),
  kHostHeader: Symbol('host header'),
  kConnector: Symbol('connector'),
  kStrictContentLength: Symbol('strict content length'),
  kMaxRedirections: Symbol('maxRedirections'),
  kMaxRequests: Symbol('maxRequestsPerClient'),
  kProxy: Symbol('proxy agent options'),
  kCounter: Symbol('socket request counter')
}


/***/ }),

/***/ 3983:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const assert = __nccwpck_require__(9491)
const { kDestroyed, kBodyUsed } = __nccwpck_require__(2785)
const { IncomingMessage } = __nccwpck_require__(3685)
const stream = __nccwpck_require__(2781)
const net = __nccwpck_require__(1808)
const { InvalidArgumentError } = __nccwpck_require__(8045)
const { Blob } = __nccwpck_require__(4300)
const nodeUtil = __nccwpck_require__(3837)

function nop () {}

function isStream (obj) {
  return obj && typeof obj.pipe === 'function'
}

// based on https://github.com/node-fetch/fetch-blob/blob/8ab587d34080de94140b54f07168451e7d0b655e/index.js#L229-L241 (MIT License)
function isBlobLike (object) {
  return (Blob && object instanceof Blob) || (
    object &&
    typeof object === 'object' &&
    (typeof object.stream === 'function' ||
      typeof object.arrayBuffer === 'function') &&
    /^(Blob|File)$/.test(object[Symbol.toStringTag])
  )
}

function parseURL (url) {
  if (typeof url === 'string') {
    url = new URL(url)
  }

  if (!url || typeof url !== 'object') {
    throw new InvalidArgumentError('invalid url')
  }

  if (url.port != null && url.port !== '' && !Number.isFinite(parseInt(url.port))) {
    throw new InvalidArgumentError('invalid port')
  }

  if (url.path != null && typeof url.path !== 'string') {
    throw new InvalidArgumentError('invalid path')
  }

  if (url.pathname != null && typeof url.pathname !== 'string') {
    throw new InvalidArgumentError('invalid pathname')
  }

  if (url.hostname != null && typeof url.hostname !== 'string') {
    throw new InvalidArgumentError('invalid hostname')
  }

  if (url.origin != null && typeof url.origin !== 'string') {
    throw new InvalidArgumentError('invalid origin')
  }

  if (!/^https?:/.test(url.origin || url.protocol)) {
    throw new InvalidArgumentError('invalid protocol')
  }

  if (!(url instanceof URL)) {
    const port = url.port != null
      ? url.port
      : (url.protocol === 'https:' ? 443 : 80)
    const origin = url.origin != null
      ? url.origin
      : `${url.protocol}//${url.hostname}:${port}`
    const path = url.path != null
      ? url.path
      : `${url.pathname || ''}${url.search || ''}`

    url = new URL(path, origin)
  }

  return url
}

function parseOrigin (url) {
  url = parseURL(url)

  if (url.pathname !== '/' || url.search || url.hash) {
    throw new InvalidArgumentError('invalid url')
  }

  return url
}

function getHostname (host) {
  if (host[0] === '[') {
    const idx = host.indexOf(']')

    assert(idx !== -1)
    return host.substr(1, idx - 1)
  }

  const idx = host.indexOf(':')
  if (idx === -1) return host

  return host.substr(0, idx)
}

// IP addresses are not valid server names per RFC6066
// > Currently, the only server names supported are DNS hostnames
function getServerName (host) {
  if (!host) {
    return null
  }

  assert.strictEqual(typeof host, 'string')

  const servername = getHostname(host)
  if (net.isIP(servername)) {
    return ''
  }

  return servername
}

function deepClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function isAsyncIterable (obj) {
  return !!(obj != null && typeof obj[Symbol.asyncIterator] === 'function')
}

function isIterable (obj) {
  return !!(obj != null && (typeof obj[Symbol.iterator] === 'function' || typeof obj[Symbol.asyncIterator] === 'function'))
}

function bodyLength (body) {
  if (body == null) {
    return 0
  } else if (isStream(body)) {
    const state = body._readableState
    return state && state.ended === true && Number.isFinite(state.length)
      ? state.length
      : null
  } else if (isBlobLike(body)) {
    return body.size != null ? body.size : null
  } else if (isBuffer(body)) {
    return body.byteLength
  }

  return null
}

function isDestroyed (stream) {
  return !stream || !!(stream.destroyed || stream[kDestroyed])
}

function isReadableAborted (stream) {
  const state = stream && stream._readableState
  return isDestroyed(stream) && state && !state.endEmitted
}

function destroy (stream, err) {
  if (!isStream(stream) || isDestroyed(stream)) {
    return
  }

  if (typeof stream.destroy === 'function') {
    if (Object.getPrototypeOf(stream).constructor === IncomingMessage) {
      // See: https://github.com/nodejs/node/pull/38505/files
      stream.socket = null
    }
    stream.destroy(err)
  } else if (err) {
    process.nextTick((stream, err) => {
      stream.emit('error', err)
    }, stream, err)
  }

  if (stream.destroyed !== true) {
    stream[kDestroyed] = true
  }
}

const KEEPALIVE_TIMEOUT_EXPR = /timeout=(\d+)/
function parseKeepAliveTimeout (val) {
  const m = val.toString().match(KEEPALIVE_TIMEOUT_EXPR)
  return m ? parseInt(m[1], 10) * 1000 : null
}

function parseHeaders (headers, obj = {}) {
  for (let i = 0; i < headers.length; i += 2) {
    const key = headers[i].toString().toLowerCase()
    let val = obj[key]
    if (!val) {
      obj[key] = headers[i + 1].toString()
    } else {
      if (!Array.isArray(val)) {
        val = [val]
        obj[key] = val
      }
      val.push(headers[i + 1].toString())
    }
  }
  return obj
}

function isBuffer (buffer) {
  // See, https://github.com/mcollina/undici/pull/319
  return buffer instanceof Uint8Array || Buffer.isBuffer(buffer)
}

function validateHandler (handler, method, upgrade) {
  if (!handler || typeof handler !== 'object') {
    throw new InvalidArgumentError('handler must be an object')
  }

  if (typeof handler.onConnect !== 'function') {
    throw new InvalidArgumentError('invalid onConnect method')
  }

  if (typeof handler.onError !== 'function') {
    throw new InvalidArgumentError('invalid onError method')
  }

  if (typeof handler.onBodySent !== 'function' && handler.onBodySent !== undefined) {
    throw new InvalidArgumentError('invalid onBodySent method')
  }

  if (upgrade || method === 'CONNECT') {
    if (typeof handler.onUpgrade !== 'function') {
      throw new InvalidArgumentError('invalid onUpgrade method')
    }
  } else {
    if (typeof handler.onHeaders !== 'function') {
      throw new InvalidArgumentError('invalid onHeaders method')
    }

    if (typeof handler.onData !== 'function') {
      throw new InvalidArgumentError('invalid onData method')
    }

    if (typeof handler.onComplete !== 'function') {
      throw new InvalidArgumentError('invalid onComplete method')
    }
  }
}

// A body is disturbed if it has been read from and it cannot
// be re-used without losing state or data.
function isDisturbed (body) {
  return !!(body && (
    stream.isDisturbed
      ? stream.isDisturbed(body) || body[kBodyUsed] // TODO (fix): Why is body[kBodyUsed] needed?
      : body[kBodyUsed] ||
        body.readableDidRead ||
        (body._readableState && body._readableState.dataEmitted) ||
        isReadableAborted(body)
  ))
}

function isErrored (body) {
  return !!(body && (
    stream.isErrored
      ? stream.isErrored(body)
      : /state: 'errored'/.test(nodeUtil.inspect(body)
  )))
}

function isReadable (body) {
  return !!(body && (
    stream.isReadable
      ? stream.isReadable(body)
      : /state: 'readable'/.test(nodeUtil.inspect(body)
  )))
}

function getSocketInfo (socket) {
  return {
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    remoteAddress: socket.remoteAddress,
    remotePort: socket.remotePort,
    remoteFamily: socket.remoteFamily,
    timeout: socket.timeout,
    bytesWritten: socket.bytesWritten,
    bytesRead: socket.bytesRead
  }
}

let ReadableStream
function ReadableStreamFrom (iterable) {
  if (!ReadableStream) {
    ReadableStream = (__nccwpck_require__(5356).ReadableStream)
  }

  if (ReadableStream.from) {
    // https://github.com/whatwg/streams/pull/1083
    return ReadableStream.from(iterable)
  }

  let iterator
  return new ReadableStream(
    {
      async start () {
        iterator = iterable[Symbol.asyncIterator]()
      },
      async pull (controller) {
        const { done, value } = await iterator.next()
        if (done) {
          queueMicrotask(() => {
            controller.close()
          })
        } else {
          const buf = Buffer.isBuffer(value) ? value : Buffer.from(value)
          controller.enqueue(new Uint8Array(buf))
        }
        return controller.desiredSize > 0
      },
      async cancel (reason) {
        await iterator.return()
      }
    },
    0
  )
}

const kEnumerableProperty = Object.create(null)
kEnumerableProperty.enumerable = true

module.exports = {
  kEnumerableProperty,
  nop,
  isDisturbed,
  isErrored,
  isReadable,
  toUSVString: nodeUtil.toUSVString || ((val) => `${val}`),
  isReadableAborted,
  isBlobLike,
  parseOrigin,
  parseURL,
  getServerName,
  isStream,
  isIterable,
  isAsyncIterable,
  isDestroyed,
  parseHeaders,
  parseKeepAliveTimeout,
  destroy,
  bodyLength,
  deepClone,
  ReadableStreamFrom,
  isBuffer,
  validateHandler,
  getSocketInfo
}


/***/ }),

/***/ 412:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const EventEmitter = __nccwpck_require__(2361)

class Dispatcher extends EventEmitter {
  dispatch () {
    throw new Error('not implemented')
  }

  close () {
    throw new Error('not implemented')
  }

  destroy () {
    throw new Error('not implemented')
  }
}

module.exports = Dispatcher


/***/ }),

/***/ 1472:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const util = __nccwpck_require__(3983)
const { ReadableStreamFrom, toUSVString, isBlobLike } = __nccwpck_require__(2538)
const { FormData } = __nccwpck_require__(2015)
const { kState } = __nccwpck_require__(5861)
const { Blob } = __nccwpck_require__(4300)
const { kBodyUsed } = __nccwpck_require__(2785)
const assert = __nccwpck_require__(9491)
const { NotSupportedError } = __nccwpck_require__(8045)
const { isErrored } = __nccwpck_require__(3983)
const { isUint8Array } = __nccwpck_require__(4978)

let ReadableStream

async function * blobGen (blob) {
  if (blob.stream) {
    yield * blob.stream()
  } else {
    // istanbul ignore next: node < 16.7
    yield await blob.arrayBuffer()
  }
}

// https://fetch.spec.whatwg.org/#concept-bodyinit-extract
function extractBody (object, keepalive = false) {
  if (!ReadableStream) {
    ReadableStream = (__nccwpck_require__(5356).ReadableStream)
  }

  // 1. Let stream be object if object is a ReadableStream object.
  // Otherwise, let stream be a new ReadableStream, and set up stream.
  let stream = null

  // 2. Let action be null.
  let action = null

  // 3. Let source be null.
  let source = null

  // 4. Let length be null.
  let length = null

  // 5. Let Content-Type be null.
  let contentType = null

  // 6. Switch on object:
  if (object == null) {
    // Note: The IDL processor cannot handle this situation. See
    // https://crbug.com/335871.
  } else if (object instanceof URLSearchParams) {
    // URLSearchParams

    // spec says to run application/x-www-form-urlencoded on body.list
    // this is implemented in Node.js as apart of an URLSearchParams instance toString method
    // See: https://github.com/nodejs/node/blob/e46c680bf2b211bbd52cf959ca17ee98c7f657f5/lib/internal/url.js#L490
    // and https://github.com/nodejs/node/blob/e46c680bf2b211bbd52cf959ca17ee98c7f657f5/lib/internal/url.js#L1100

    // Set source to the result of running the application/x-www-form-urlencoded serializer with object’s list.
    source = object.toString()

    // Set Content-Type to `application/x-www-form-urlencoded;charset=UTF-8`.
    contentType = 'application/x-www-form-urlencoded;charset=UTF-8'
  } else if (object instanceof ArrayBuffer || ArrayBuffer.isView(object)) {
    // BufferSource

    if (object instanceof DataView) {
      // TODO: Blob doesn't seem to work with DataView?
      object = object.buffer
    }

    // Set source to a copy of the bytes held by object.
    source = new Uint8Array(object)
  } else if (object instanceof FormData) {
    const boundary = '----formdata-undici-' + Math.random()
    const prefix = `--${boundary}\r\nContent-Disposition: form-data`

    /*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
    const escape = (str) =>
      str.replace(/\n/g, '%0A').replace(/\r/g, '%0D').replace(/"/g, '%22')
    const normalizeLinefeeds = (value) => value.replace(/\r?\n|\r/g, '\r\n')

    // Set action to this step: run the multipart/form-data
    // encoding algorithm, with object’s entry list and UTF-8.
    action = async function * (object) {
      const enc = new TextEncoder()

      for (const [name, value] of object) {
        if (typeof value === 'string') {
          yield enc.encode(
            prefix +
              `; name="${escape(normalizeLinefeeds(name))}"` +
              `\r\n\r\n${normalizeLinefeeds(value)}\r\n`
          )
        } else {
          yield enc.encode(
            prefix +
              `; name="${escape(normalizeLinefeeds(name))}"` +
              (value.name ? `; filename="${escape(value.name)}"` : '') +
              '\r\n' +
              `Content-Type: ${
                value.type || 'application/octet-stream'
              }\r\n\r\n`
          )

          yield * blobGen(value)

          yield enc.encode('\r\n')
        }
      }

      yield enc.encode(`--${boundary}--`)
    }

    // Set source to object.
    source = object

    // Set length to unclear, see html/6424 for improving this.
    // TODO

    // Set Content-Type to `multipart/form-data; boundary=`,
    // followed by the multipart/form-data boundary string generated
    // by the multipart/form-data encoding algorithm.
    contentType = 'multipart/form-data; boundary=' + boundary
  } else if (isBlobLike(object)) {
    // Blob

    // Set action to this step: read object.
    action = blobGen

    // Set source to object.
    source = object

    // Set length to object’s size.
    length = object.size

    // If object’s type attribute is not the empty byte sequence, set
    // Content-Type to its value.
    if (object.type) {
      contentType = object.type
    }
  } else if (typeof object[Symbol.asyncIterator] === 'function') {
    // If keepalive is true, then throw a TypeError.
    if (keepalive) {
      throw new TypeError('keepalive')
    }

    // If object is disturbed or locked, then throw a TypeError.
    if (util.isDisturbed(object) || object.locked) {
      throw new TypeError(
        'Response body object should not be disturbed or locked'
      )
    }

    stream =
      object instanceof ReadableStream ? object : ReadableStreamFrom(object)
  } else {
    // TODO: byte sequence?
    // TODO: scalar value string?
    // TODO: else?
    source = toUSVString(object)
    contentType = 'text/plain;charset=UTF-8'
  }

  // 7. If source is a byte sequence, then set action to a
  // step that returns source and length to source’s length.
  // TODO: What is a "byte sequence?"
  if (typeof source === 'string' || util.isBuffer(source)) {
    length = Buffer.byteLength(source)
  }

  // 8. If action is non-null, then run these steps in in parallel:
  if (action != null) {
    // Run action.
    let iterator
    stream = new ReadableStream({
      async start () {
        iterator = action(object)[Symbol.asyncIterator]()
      },
      async pull (controller) {
        const { value, done } = await iterator.next()
        if (done) {
          // When running action is done, close stream.
          queueMicrotask(() => {
            controller.close()
          })
        } else {
          // Whenever one or more bytes are available and stream is not errored,
          // enqueue a Uint8Array wrapping an ArrayBuffer containing the available
          // bytes into stream.
          if (!isErrored(stream)) {
            controller.enqueue(new Uint8Array(value))
          }
        }
        return controller.desiredSize > 0
      },
      async cancel (reason) {
        await iterator.return()
      }
    })
  } else if (!stream) {
    // TODO: Spec doesn't say anything about this?
    stream = new ReadableStream({
      async pull (controller) {
        controller.enqueue(
          typeof source === 'string' ? new TextEncoder().encode(source) : source
        )
        queueMicrotask(() => {
          controller.close()
        })
      }
    })
  }

  // 9. Let body be a body whose stream is stream, source is source,
  // and length is length.
  const body = { stream, source, length }

  // 10. Return body and Content-Type.
  return [body, contentType]
}

// https://fetch.spec.whatwg.org/#bodyinit-safely-extract
function safelyExtractBody (object, keepalive = false) {
  if (!ReadableStream) {
    // istanbul ignore next
    ReadableStream = (__nccwpck_require__(5356).ReadableStream)
  }

  // To safely extract a body and a `Content-Type` value from
  // a byte sequence or BodyInit object object, run these steps:

  // 1. If object is a ReadableStream object, then:
  if (object instanceof ReadableStream) {
    // Assert: object is neither disturbed nor locked.
    // istanbul ignore next
    assert(!util.isDisturbed(object), 'disturbed')
    // istanbul ignore next
    assert(!object.locked, 'locked')
  }

  // 2. Return the results of extracting object.
  return extractBody(object, keepalive)
}

function cloneBody (body) {
  // To clone a body body, run these steps:

  // https://fetch.spec.whatwg.org/#concept-body-clone

  // 1. Let « out1, out2 » be the result of teeing body’s stream.
  const [out1, out2] = body.stream.tee()

  // 2. Set body’s stream to out1.
  body.stream = out1

  // 3. Return a body whose stream is out2 and other members are copied from body.
  return {
    stream: out2,
    length: body.length,
    source: body.source
  }
}

const methods = {
  async blob () {
    const chunks = []

    if (this[kState].body) {
      if (isUint8Array(this[kState].body)) {
        chunks.push(this[kState].body)
      } else {
        const stream = this[kState].body.stream

        if (util.isDisturbed(stream)) {
          throw new TypeError('disturbed')
        }

        if (stream.locked) {
          throw new TypeError('locked')
        }

        // Compat.
        stream[kBodyUsed] = true

        for await (const chunk of stream) {
          chunks.push(chunk)
        }
      }
    }

    return new Blob(chunks, { type: this.headers.get('Content-Type') || '' })
  },

  async arrayBuffer () {
    const blob = await this.blob()
    return await blob.arrayBuffer()
  },

  async text () {
    const blob = await this.blob()
    return toUSVString(await blob.text())
  },

  async json () {
    return JSON.parse(await this.text())
  },

  async formData () {
    const contentType = this.headers.get('Content-Type')

    // If mimeType’s essence is "multipart/form-data", then:
    if (/multipart\/form-data/.test(contentType)) {
      throw new NotSupportedError('multipart/form-data not supported')
    } else if (/application\/x-www-form-urlencoded/.test(contentType)) {
      // Otherwise, if mimeType’s essence is "application/x-www-form-urlencoded", then:

      // 1. Let entries be the result of parsing bytes.
      let entries
      try {
        entries = new URLSearchParams(await this.text())
      } catch (err) {
        // istanbul ignore next: Unclear when new URLSearchParams can fail on a string.
        // 2. If entries is failure, then throw a TypeError.
        throw Object.assign(new TypeError(), { cause: err })
      }

      // 3. Return a new FormData object whose entries are entries.
      const formData = new FormData()
      for (const [name, value] of entries) {
        formData.append(name, value)
      }
      return formData
    } else {
      // Otherwise, throw a TypeError.
      throw new TypeError()
    }
  }
}

const properties = {
  body: {
    enumerable: true,
    get () {
      return this[kState].body ? this[kState].body.stream : null
    }
  },
  bodyUsed: {
    enumerable: true,
    get () {
      return this[kState].body && util.isDisturbed(this[kState].body.stream)
    }
  }
}

function mixinBody (prototype) {
  Object.assign(prototype, methods)
  Object.defineProperties(prototype, properties)
}

module.exports = {
  extractBody,
  safelyExtractBody,
  cloneBody,
  mixinBody
}


/***/ }),

/***/ 1037:
/***/ ((module) => {

"use strict";


const forbiddenHeaderNames = [
  'accept-charset',
  'accept-encoding',
  'access-control-request-headers',
  'access-control-request-method',
  'connection',
  'content-length',
  'cookie',
  'cookie2',
  'date',
  'dnt',
  'expect',
  'host',
  'keep-alive',
  'origin',
  'referer',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'via'
]

const corsSafeListedMethods = ['GET', 'HEAD', 'POST']

const nullBodyStatus = [101, 204, 205, 304]

const redirectStatus = [301, 302, 303, 307, 308]

const referrerPolicy = [
  '',
  'no-referrer',
  'no-referrer-when-downgrade',
  'same-origin',
  'origin',
  'strict-origin',
  'origin-when-cross-origin',
  'strict-origin-when-cross-origin',
  'unsafe-url'
]

const requestRedirect = ['follow', 'manual', 'error']

const safeMethods = ['GET', 'HEAD', 'OPTIONS', 'TRACE']

const requestMode = ['navigate', 'same-origin', 'no-cors', 'cors']

const requestCredentials = ['omit', 'same-origin', 'include']

const requestCache = [
  'default',
  'no-store',
  'reload',
  'no-cache',
  'force-cache',
  'only-if-cached'
]

// https://fetch.spec.whatwg.org/#forbidden-response-header-name
const forbiddenResponseHeaderNames = ['set-cookie', 'set-cookie2']

const requestBodyHeader = [
  'content-encoding',
  'content-language',
  'content-location',
  'content-type'
]

// http://fetch.spec.whatwg.org/#forbidden-method
const forbiddenMethods = ['CONNECT', 'TRACE', 'TRACK']

const subresource = [
  'audio',
  'audioworklet',
  'font',
  'image',
  'manifest',
  'paintworklet',
  'script',
  'style',
  'track',
  'video',
  'xslt',
  ''
]

module.exports = {
  subresource,
  forbiddenResponseHeaderNames,
  forbiddenMethods,
  requestBodyHeader,
  referrerPolicy,
  requestRedirect,
  requestMode,
  requestCredentials,
  requestCache,
  forbiddenHeaderNames,
  redirectStatus,
  corsSafeListedMethods,
  nullBodyStatus,
  safeMethods
}


/***/ }),

/***/ 685:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const assert = __nccwpck_require__(9491)
const { atob } = __nccwpck_require__(4300)

const encoder = new TextEncoder()

// https://fetch.spec.whatwg.org/#data-url-processor
/** @param {URL} dataURL */
function dataURLProcessor (dataURL) {
  // 1. Assert: dataURL’s scheme is "data".
  assert(dataURL.protocol === 'data:')

  // 2. Let input be the result of running the URL
  // serializer on dataURL with exclude fragment
  // set to true.
  let input = URLSerializer(dataURL, true)

  // 3. Remove the leading "data:" string from input.
  input = input.slice(5)

  // 4. Let position point at the start of input.
  const position = { position: 0 }

  // 5. Let mimeType be the result of collecting a
  // sequence of code points that are not equal
  // to U+002C (,), given position.
  let mimeType = collectASequenceOfCodePoints(
    (char) => char !== ',',
    input,
    position
  )

  // 6. Strip leading and trailing ASCII whitespace
  // from mimeType.
  // Note: This will only remove U+0020 SPACE code
  // points, if any.
  // Undici implementation note: we need to store the
  // length because if the mimetype has spaces removed,
  // the wrong amount will be sliced from the input in
  // step #9
  const mimeTypeLength = mimeType.length
  mimeType = mimeType.replace(/^(\u0020)+|(\u0020)+$/g, '')

  // 7. If position is past the end of input, then
  // return failure
  if (position.position >= input.length) {
    return 'failure'
  }

  // 8. Advance position by 1.
  position.position++

  // 9. Let encodedBody be the remainder of input.
  const encodedBody = input.slice(mimeTypeLength + 1)

  // 10. Let body be the percent-decoding of encodedBody.
  /** @type {Uint8Array|string} */
  let body = stringPercentDecode(encodedBody)

  // 11. If mimeType ends with U+003B (;), followed by
  // zero or more U+0020 SPACE, followed by an ASCII
  // case-insensitive match for "base64", then:
  if (/;(\u0020){0,}base64$/i.test(mimeType)) {
    // 1. Let stringBody be the isomorphic decode of body.
    const stringBody = decodeURIComponent(new TextDecoder('utf-8').decode(body))
    // 2. Set body to the forgiving-base64 decode of
    // stringBody.
    body = forgivingBase64(stringBody)

    // 3. If body is failure, then return failure.
    if (body === 'failure') {
      return 'failure'
    }

    // 4. Remove the last 6 code points from mimeType.
    mimeType = mimeType.slice(0, -6)

    // 5. Remove trailing U+0020 SPACE code points from mimeType,
    // if any.
    mimeType = mimeType.replace(/(\u0020)+$/, '')

    // 6. Remove the last U+003B (;) code point from mimeType.
    mimeType = mimeType.slice(0, -1)
  }

  // 12. If mimeType starts with U+003B (;), then prepend
  // "text/plain" to mimeType.
  if (mimeType.startsWith(';')) {
    mimeType = 'text/plain' + mimeType
  }

  // 13. Let mimeTypeRecord be the result of parsing
  // mimeType.
  let mimeTypeRecord = parseMIMEType(mimeType)

  // 14. If mimeTypeRecord is failure, then set
  // mimeTypeRecord to text/plain;charset=US-ASCII.
  if (mimeTypeRecord === 'failure') {
    mimeTypeRecord = parseMIMEType('text/plain;charset=US-ASCII')
  }

  // 15. Return a new data: URL struct whose MIME
  // type is mimeTypeRecord and body is body.
  // https://fetch.spec.whatwg.org/#data-url-struct
  return { mimeType: mimeTypeRecord, body }
}

// https://url.spec.whatwg.org/#concept-url-serializer
/**
 * @param {URL} url
 * @param {boolean} excludeFragment
 */
function URLSerializer (url, excludeFragment = false) {
  // 1. Let output be url’s scheme and U+003A (:) concatenated.
  let output = url.protocol

  // 2. If url’s host is non-null:
  if (url.host.length > 0) {
    // 1. Append "//" to output.
    output += '//'

    // 2. If url includes credentials, then:
    if (url.username.length > 0 || url.password.length > 0) {
      // 1. Append url’s username to output.
      output += url.username

      // 2. If url’s password is not the empty string, then append U+003A (:),
      // followed by url’s password, to output.
      if (url.password.length > 0) {
        output += ':' + url.password
      }

      // 3. Append U+0040 (@) to output.
      output += '@'
    }

    // 3. Append url’s host, serialized, to output.
    output += decodeURIComponent(url.host)

    // 4. If url’s port is non-null, append U+003A (:) followed by url’s port,
    // serialized, to output.
    if (url.port.length > 0) {
      output += ':' + url.port
    }
  }

  // 3. If url’s host is null, url does not have an opaque path,
  // url’s path’s size is greater than 1, and url’s path[0]
  // is the empty string, then append U+002F (/) followed by
  // U+002E (.) to output.
  // Note: This prevents web+demo:/.//not-a-host/ or web+demo:/path/..//not-a-host/,
  // when parsed and then serialized, from ending up as web+demo://not-a-host/
  // (they end up as web+demo:/.//not-a-host/).
  // Undici implementation note: url's path[0] can never be an
  // empty string, so we have to slightly alter what the spec says.
  if (
    url.host.length === 0 &&
    url.pathname.length > 1 &&
    url.href.slice(url.protocol.length + 1)[0] === '.'
  ) {
    output += '/.'
  }

  // 4. Append the result of URL path serializing url to output.
  output += url.pathname

  // 5. If url’s query is non-null, append U+003F (?),
  // followed by url’s query, to output.
  if (url.search.length > 0) {
    output += url.search
  }

  // 6. If exclude fragment is false and url’s fragment is non-null,
  // then append U+0023 (#), followed by url’s fragment, to output.
  if (excludeFragment === false && url.hash.length > 0) {
    output += url.hash
  }

  // 7. Return output.
  return output
}

// https://infra.spec.whatwg.org/#collect-a-sequence-of-code-points
/**
 * @param {(char: string) => boolean} condition
 * @param {string} input
 * @param {{ position: number }} position
 */
function collectASequenceOfCodePoints (condition, input, position) {
  // 1. Let result be the empty string.
  let result = ''

  // 2. While position doesn’t point past the end of input and the
  // code point at position within input meets the condition condition:
  while (position.position < input.length && condition(input[position.position])) {
    // 1. Append that code point to the end of result.
    result += input[position.position]

    // 2. Advance position by 1.
    position.position++
  }

  // 3. Return result.
  return result
}

// https://url.spec.whatwg.org/#string-percent-decode
/** @param {string} input */
function stringPercentDecode (input) {
  // 1. Let bytes be the UTF-8 encoding of input.
  const bytes = encoder.encode(input)

  // 2. Return the percent-decoding of bytes.
  return percentDecode(bytes)
}

// https://url.spec.whatwg.org/#percent-decode
/** @param {Uint8Array} input */
function percentDecode (input) {
  // 1. Let output be an empty byte sequence.
  /** @type {number[]} */
  const output = []

  // 2. For each byte byte in input:
  for (let i = 0; i < input.length; i++) {
    const byte = input[i]

    // 1. If byte is not 0x25 (%), then append byte to output.
    if (byte !== 0x25) {
      output.push(byte)
    }

    // 2. Otherwise, if byte is 0x25 (%) and the next two bytes
    // after byte in input are not in the ranges
    // 0x30 (0) to 0x39 (9), 0x41 (A) to 0x46 (F),
    // and 0x61 (a) to 0x66 (f), all inclusive, append byte
    // to output.
    else if (
      byte === 0x25 &&
      !/^[0-9A-Fa-f]{2}$/i.test(String.fromCharCode(input[i + 1], input[i + 2]))
    ) {
      output.push(0x25)
    }

    // 3. Otherwise:
    else {
      // 1. Let bytePoint be the two bytes after byte in input,
      // decoded, and then interpreted as hexadecimal number.
      const nextTwoBytes = String.fromCharCode(input[i + 1], input[i + 2])
      const bytePoint = Number.parseInt(nextTwoBytes, 16)

      // 2. Append a byte whose value is bytePoint to output.
      output.push(bytePoint)

      // 3. Skip the next two bytes in input.
      i += 2
    }
  }

  // 3. Return output.
  return Uint8Array.of(...output)
}

// https://mimesniff.spec.whatwg.org/#parse-a-mime-type
/** @param {string} input */
function parseMIMEType (input) {
  // 1. Remove any leading and trailing HTTP whitespace
  // from input.
  input = input.trim()

  // 2. Let position be a position variable for input,
  // initially pointing at the start of input.
  const position = { position: 0 }

  // 3. Let type be the result of collecting a sequence
  // of code points that are not U+002F (/) from
  // input, given position.
  const type = collectASequenceOfCodePoints(
    (char) => char !== '/',
    input,
    position
  )

  // 4. If type is the empty string or does not solely
  // contain HTTP token code points, then return failure.
  // https://mimesniff.spec.whatwg.org/#http-token-code-point
  if (type.length === 0 || !/^[!#$%&'*+-.^_|~A-z0-9]+$/.test(type)) {
    return 'failure'
  }

  // 5. If position is past the end of input, then return
  // failure
  if (position.position > input.length) {
    return 'failure'
  }

  // 6. Advance position by 1. (This skips past U+002F (/).)
  position.position++

  // 7. Let subtype be the result of collecting a sequence of
  // code points that are not U+003B (;) from input, given
  // position.
  let subtype = collectASequenceOfCodePoints(
    (char) => char !== ';',
    input,
    position
  )

  // 8. Remove any trailing HTTP whitespace from subtype.
  subtype = subtype.trim()

  // 9. If subtype is the empty string or does not solely
  // contain HTTP token code points, then return failure.
  if (subtype.length === 0 || !/^[!#$%&'*+-.^_|~A-z0-9]+$/.test(subtype)) {
    return 'failure'
  }

  // 10. Let mimeType be a new MIME type record whose type
  // is type, in ASCII lowercase, and subtype is subtype,
  // in ASCII lowercase.
  // https://mimesniff.spec.whatwg.org/#mime-type
  const mimeType = {
    type: type.toLowerCase(),
    subtype: subtype.toLowerCase(),
    /** @type {Map<string, string>} */
    parameters: new Map()
  }

  // 11. While position is not past the end of input:
  while (position.position < input.length) {
    // 1. Advance position by 1. (This skips past U+003B (;).)
    position.position++

    // 2. Collect a sequence of code points that are HTTP
    // whitespace from input given position.
    collectASequenceOfCodePoints(
      // https://fetch.spec.whatwg.org/#http-whitespace
      (char) => /(\u000A|\u000D|\u0009|\u0020)/.test(char),
      input,
      position
    )

    // 3. Let parameterName be the result of collecting a
    // sequence of code points that are not U+003B (;)
    // or U+003D (=) from input, given position.
    let parameterName = collectASequenceOfCodePoints(
      (char) => char !== ';' && char !== '=',
      input,
      position
    )

    // 4. Set parameterName to parameterName, in ASCII
    // lowercase.
    parameterName = parameterName.toLowerCase()

    // 5. If position is not past the end of input, then:
    if (position.position < input.length) {
      // 1. If the code point at position within input is
      // U+003B (;), then continue.
      if (input[position.position] === ';') {
        continue
      }

      // 2. Advance position by 1. (This skips past U+003D (=).)
      position.position++
    }

    // 6. If position is past the end of input, then break.
    if (position.position > input.length) {
      break
    }

    // 7. Let parameterValue be null.
    let parameterValue = null

    // 8. If the code point at position within input is
    // U+0022 ("), then:
    if (input[position.position] === '"') {
      // 1. Set parameterValue to the result of collecting
      // an HTTP quoted string from input, given position
      // and the extract-value flag.
      // Undici implementation note: extract-value is never
      // defined or mentioned anywhere.
      parameterValue = collectAnHTTPQuotedString(input, position/*, extractValue */)

      // 2. Collect a sequence of code points that are not
      // U+003B (;) from input, given position.
      collectASequenceOfCodePoints(
        (char) => char !== ';',
        input,
        position
      )
    }

    // 9. Otherwise:
    else {
      // 1. Set parameterValue to the result of collecting
      // a sequence of code points that are not U+003B (;)
      // from input, given position.
      parameterValue = collectASequenceOfCodePoints(
        (char) => char !== ';',
        input,
        position
      )

      // 2. Remove any trailing HTTP whitespace from parameterValue.
      parameterValue = parameterValue.trim()

      // 3. If parameterValue is the empty string, then continue.
      if (parameterValue.length === 0) {
        continue
      }
    }

    // 10. If all of the following are true
    // - parameterName is not the empty string
    // - parameterName solely contains HTTP token code points
    // - parameterValue solely contains HTTP quoted-string token code points
    // - mimeType’s parameters[parameterName] does not exist
    // then set mimeType’s parameters[parameterName] to parameterValue.
    if (
      parameterName.length !== 0 &&
      /^[!#$%&'*+-.^_|~A-z0-9]+$/.test(parameterName) &&
      // https://mimesniff.spec.whatwg.org/#http-quoted-string-token-code-point
      !/^(\u0009|\x{0020}-\x{007E}|\x{0080}-\x{00FF})+$/.test(parameterValue) &&
      !mimeType.parameters.has(parameterName)
    ) {
      mimeType.parameters.set(parameterName, parameterValue)
    }
  }

  // 12. Return mimeType.
  return mimeType
}

// https://infra.spec.whatwg.org/#forgiving-base64-decode
/** @param {string} data */
function forgivingBase64 (data) {
  // 1. Remove all ASCII whitespace from data.
  data = data.replace(/[\u0009\u000A\u000C\u000D\u0020]/g, '')

  // 2. If data’s code point length divides by 4 leaving
  // no remainder, then:
  if (data.length % 4 === 0) {
    // 1. If data ends with one or two U+003D (=) code points,
    // then remove them from data.
    data = data.replace(/=?=$/, '')
  }

  // 3. If data’s code point length divides by 4 leaving
  // a remainder of 1, then return failure.
  if (data.length % 4 === 1) {
    return 'failure'
  }

  // 4. If data contains a code point that is not one of
  //  U+002B (+)
  //  U+002F (/)
  //  ASCII alphanumeric
  // then return failure.
  if (/[^+/0-9A-Za-z]/.test(data)) {
    return 'failure'
  }

  const binary = atob(data)
  const bytes = new Uint8Array(binary.length)

  for (let byte = 0; byte < binary.length; byte++) {
    bytes[byte] = binary.charCodeAt(byte)
  }

  return bytes
}

// https://fetch.spec.whatwg.org/#collect-an-http-quoted-string
// tests: https://fetch.spec.whatwg.org/#example-http-quoted-string
/**
 * @param {string} input
 * @param {{ position: number }} position
 * @param {boolean?} extractValue
 */
function collectAnHTTPQuotedString (input, position, extractValue) {
  // 1. Let positionStart be position.
  const positionStart = position.position

  // 2. Let value be the empty string.
  let value = ''

  // 3. Assert: the code point at position within input
  // is U+0022 (").
  assert(input[position.position] === '"')

  // 4. Advance position by 1.
  position.position++

  // 5. While true:
  while (true) {
    // 1. Append the result of collecting a sequence of code points
    // that are not U+0022 (") or U+005C (\) from input, given
    // position, to value.
    value += collectASequenceOfCodePoints(
      (char) => char !== '"' && char !== '\\',
      input,
      position
    )

    // 2. If position is past the end of input, then break.
    if (position.position >= input.length) {
      break
    }

    // 3. Let quoteOrBackslash be the code point at position within
    // input.
    const quoteOrBackslash = input[position.position]

    // 4. Advance position by 1.
    position.position++

    // 5. If quoteOrBackslash is U+005C (\), then:
    if (quoteOrBackslash === '\\') {
      // 1. If position is past the end of input, then append
      // U+005C (\) to value and break.
      if (position.position >= input.length) {
        value += '\\'
        break
      }

      // 2. Append the code point at position within input to value.
      value += input[position.position]

      // 3. Advance position by 1.
      position.position++
    }

    // 6. Otherwise:
    else {
      // 1. Assert: quoteOrBackslash is U+0022 (").
      assert(quoteOrBackslash === '"')

      // 2. Break.
      break
    }
  }

  // 6. If the extract-value flag is set, then return value.
  if (extractValue) {
    return value
  }

  // 7. Return the code points from positionStart to position,
  // inclusive, within input.
  return input.slice(positionStart, position.position)
}

module.exports = {
  dataURLProcessor,
  URLSerializer,
  collectASequenceOfCodePoints,
  stringPercentDecode,
  parseMIMEType,
  collectAnHTTPQuotedString
}


/***/ }),

/***/ 8511:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { Blob } = __nccwpck_require__(4300)
const { kState } = __nccwpck_require__(5861)

class File extends Blob {
  constructor (fileBits, fileName, options = {}) {
    // TODO: argument idl type check

    // The File constructor is invoked with two or three parameters, depending
    // on whether the optional dictionary parameter is used. When the File()
    // constructor is invoked, user agents must run the following steps:

    // 1. Let bytes be the result of processing blob parts given fileBits and
    // options.

    // 2. Let n be the fileName argument to the constructor.
    const n = fileName

    // 3. Process FilePropertyBag dictionary argument by running the following
    // substeps:

    //    1. If the type member is provided and is not the empty string, let t
    //    be set to the type dictionary member. If t contains any characters
    //    outside the range U+0020 to U+007E, then set t to the empty string
    //    and return from these substeps.
    //    TODO
    const t = options.type

    //    2. Convert every character in t to ASCII lowercase.
    //    TODO

    //    3. If the lastModified member is provided, let d be set to the
    //    lastModified dictionary member. If it is not provided, set d to the
    //    current date and time represented as the number of milliseconds since
    //    the Unix Epoch (which is the equivalent of Date.now() [ECMA-262]).
    const d = options.lastModified ?? Date.now()

    // 4. Return a new File object F such that:
    // F refers to the bytes byte sequence.
    // F.size is set to the number of total bytes in bytes.
    // F.name is set to n.
    // F.type is set to t.
    // F.lastModified is set to d.

    super(fileBits, { type: t })
    this[kState] = {
      name: n,
      lastModified: d
    }
  }

  get name () {
    if (!(this instanceof File)) {
      throw new TypeError('Illegal invocation')
    }

    return this[kState].name
  }

  get lastModified () {
    if (!(this instanceof File)) {
      throw new TypeError('Illegal invocation')
    }

    return this[kState].lastModified
  }

  get [Symbol.toStringTag] () {
    if (!(this instanceof File)) {
      throw new TypeError('Illegal invocation')
    }

    return this.constructor.name
  }
}

class FileLike {
  constructor (blobLike, fileName, options = {}) {
    // TODO: argument idl type check

    // The File constructor is invoked with two or three parameters, depending
    // on whether the optional dictionary parameter is used. When the File()
    // constructor is invoked, user agents must run the following steps:

    // 1. Let bytes be the result of processing blob parts given fileBits and
    // options.

    // 2. Let n be the fileName argument to the constructor.
    const n = fileName

    // 3. Process FilePropertyBag dictionary argument by running the following
    // substeps:

    //    1. If the type member is provided and is not the empty string, let t
    //    be set to the type dictionary member. If t contains any characters
    //    outside the range U+0020 to U+007E, then set t to the empty string
    //    and return from these substeps.
    //    TODO
    const t = options.type

    //    2. Convert every character in t to ASCII lowercase.
    //    TODO

    //    3. If the lastModified member is provided, let d be set to the
    //    lastModified dictionary member. If it is not provided, set d to the
    //    current date and time represented as the number of milliseconds since
    //    the Unix Epoch (which is the equivalent of Date.now() [ECMA-262]).
    const d = options.lastModified ?? Date.now()

    // 4. Return a new File object F such that:
    // F refers to the bytes byte sequence.
    // F.size is set to the number of total bytes in bytes.
    // F.name is set to n.
    // F.type is set to t.
    // F.lastModified is set to d.

    this[kState] = {
      blobLike,
      name: n,
      type: t,
      lastModified: d
    }
  }

  stream (...args) {
    if (!(this instanceof FileLike)) {
      throw new TypeError('Illegal invocation')
    }

    return this[kState].blobLike.stream(...args)
  }

  arrayBuffer (...args) {
    if (!(this instanceof FileLike)) {
      throw new TypeError('Illegal invocation')
    }

    return this[kState].blobLike.arrayBuffer(...args)
  }

  slice (...args) {
    if (!(this instanceof FileLike)) {
      throw new TypeError('Illegal invocation')
    }

    return this[kState].blobLike.slice(...args)
  }

  text (...args) {
    if (!(this instanceof FileLike)) {
      throw new TypeError('Illegal invocation')
    }

    return this[kState].blobLike.text(...args)
  }

  get size () {
    if (!(this instanceof FileLike)) {
      throw new TypeError('Illegal invocation')
    }

    return this[kState].blobLike.size
  }

  get type () {
    if (!(this instanceof FileLike)) {
      throw new TypeError('Illegal invocation')
    }

    return this[kState].blobLike.type
  }

  get name () {
    if (!(this instanceof FileLike)) {
      throw new TypeError('Illegal invocation')
    }

    return this[kState].name
  }

  get lastModified () {
    if (!(this instanceof FileLike)) {
      throw new TypeError('Illegal invocation')
    }

    return this[kState].lastModified
  }

  get [Symbol.toStringTag] () {
    if (!(this instanceof FileLike)) {
      throw new TypeError('Illegal invocation')
    }

    return 'File'
  }
}

module.exports = { File: globalThis.File ?? File, FileLike }


/***/ }),

/***/ 2015:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { isBlobLike, isFileLike, toUSVString } = __nccwpck_require__(2538)
const { kState } = __nccwpck_require__(5861)
const { File, FileLike } = __nccwpck_require__(8511)
const { Blob } = __nccwpck_require__(4300)

class FormData {
  constructor (...args) {
    if (args.length > 0 && !(args[0]?.constructor?.name === 'HTMLFormElement')) {
      throw new TypeError(
        "Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'"
      )
    }

    this[kState] = []
  }

  append (...args) {
    if (!(this instanceof FormData)) {
      throw new TypeError('Illegal invocation')
    }

    if (args.length < 2) {
      throw new TypeError(
        `Failed to execute 'append' on 'FormData': 2 arguments required, but only ${args.length} present.`
      )
    }

    if (args.length === 3 && !isBlobLike(args[1])) {
      throw new TypeError(
        "Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'"
      )
    }

    const name = toUSVString(args[0])
    const filename = args.length === 3 ? toUSVString(args[2]) : undefined

    // 1. Let value be value if given; otherwise blobValue.
    const value = isBlobLike(args[1]) ? args[1] : toUSVString(args[1])

    // 2. Let entry be the result of creating an entry with
    // name, value, and filename if given.
    const entry = makeEntry(name, value, filename)

    // 3. Append entry to this’s entry list.
    this[kState].push(entry)
  }

  delete (...args) {
    if (!(this instanceof FormData)) {
      throw new TypeError('Illegal invocation')
    }

    if (args.length < 1) {
      throw new TypeError(
        `Failed to execute 'delete' on 'FormData': 1 arguments required, but only ${args.length} present.`
      )
    }

    const name = toUSVString(args[0])

    // The delete(name) method steps are to remove all entries whose name
    // is name from this’s entry list.
    const next = []
    for (const entry of this[kState]) {
      if (entry.name !== name) {
        next.push(entry)
      }
    }

    this[kState] = next
  }

  get (...args) {
    if (!(this instanceof FormData)) {
      throw new TypeError('Illegal invocation')
    }

    if (args.length < 1) {
      throw new TypeError(
        `Failed to execute 'get' on 'FormData': 1 arguments required, but only ${args.length} present.`
      )
    }

    const name = toUSVString(args[0])

    // 1. If there is no entry whose name is name in this’s entry list,
    // then return null.
    const idx = this[kState].findIndex((entry) => entry.name === name)
    if (idx === -1) {
      return null
    }

    // 2. Return the value of the first entry whose name is name from
    // this’s entry list.
    return this[kState][idx].value
  }

  getAll (...args) {
    if (!(this instanceof FormData)) {
      throw new TypeError('Illegal invocation')
    }

    if (args.length < 1) {
      throw new TypeError(
        `Failed to execute 'getAll' on 'FormData': 1 arguments required, but only ${args.length} present.`
      )
    }

    const name = toUSVString(args[0])

    // 1. If there is no entry whose name is name in this’s entry list,
    // then return the empty list.
    // 2. Return the values of all entries whose name is name, in order,
    // from this’s entry list.
    return this[kState]
      .filter((entry) => entry.name === name)
      .map((entry) => entry.value)
  }

  has (...args) {
    if (!(this instanceof FormData)) {
      throw new TypeError('Illegal invocation')
    }

    if (args.length < 1) {
      throw new TypeError(
        `Failed to execute 'has' on 'FormData': 1 arguments required, but only ${args.length} present.`
      )
    }

    const name = toUSVString(args[0])

    // The has(name) method steps are to return true if there is an entry
    // whose name is name in this’s entry list; otherwise false.
    return this[kState].findIndex((entry) => entry.name === name) !== -1
  }

  set (...args) {
    if (!(this instanceof FormData)) {
      throw new TypeError('Illegal invocation')
    }

    if (args.length < 2) {
      throw new TypeError(
        `Failed to execute 'set' on 'FormData': 2 arguments required, but only ${args.length} present.`
      )
    }

    if (args.length === 3 && !isBlobLike(args[1])) {
      throw new TypeError(
        "Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'"
      )
    }
    const name = toUSVString(args[0])
    const filename = args.length === 3 ? toUSVString(args[2]) : undefined

    // The set(name, value) and set(name, blobValue, filename) method steps
    // are:

    // 1. Let value be value if given; otherwise blobValue.
    const value = isBlobLike(args[1]) ? args[1] : toUSVString(args[1])

    // 2. Let entry be the result of creating an entry with name, value, and
    // filename if given.
    const entry = makeEntry(name, value, filename)

    // 3. If there are entries in this’s entry list whose name is name, then
    // replace the first such entry with entry and remove the others.
    const idx = this[kState].findIndex((entry) => entry.name === name)
    if (idx !== -1) {
      this[kState] = [
        ...this[kState].slice(0, idx),
        entry,
        ...this[kState].slice(idx + 1).filter((entry) => entry.name !== name)
      ]
    } else {
      // 4. Otherwise, append entry to this’s entry list.
      this[kState].push(entry)
    }
  }

  get [Symbol.toStringTag] () {
    if (!(this instanceof FormData)) {
      throw new TypeError('Illegal invocation')
    }

    return this.constructor.name
  }

  * entries () {
    if (!(this instanceof FormData)) {
      throw new TypeError('Illegal invocation')
    }

    for (const pair of this) {
      yield pair
    }
  }

  * keys () {
    if (!(this instanceof FormData)) {
      throw new TypeError('Illegal invocation')
    }

    for (const [key] of this) {
      yield key
    }
  }

  * values () {
    if (!(this instanceof FormData)) {
      throw new TypeError('Illegal invocation')
    }

    for (const [, value] of this) {
      yield value
    }
  }

  * [Symbol.iterator] () {
    // The value pairs to iterate over are this’s entry list’s entries with
    // the key being the name and the value being the value.
    for (const { name, value } of this[kState]) {
      yield [name, value]
    }
  }
}

function makeEntry (name, value, filename) {
  // To create an entry for name, value, and optionally a filename, run these
  // steps:

  // 1. Let entry be a new entry.
  const entry = {
    name: null,
    value: null
  }

  // 2. Set entry’s name to name.
  entry.name = name

  // 3. If value is a Blob object and not a File object, then set value to a new File
  // object, representing the same bytes, whose name attribute value is "blob".
  if (isBlobLike(value) && !isFileLike(value)) {
    value = value instanceof Blob
      ? new File([value], 'blob')
      : new FileLike(value, 'blob')
  }

  // 4. If value is (now) a File object and filename is given, then set value to a
  // new File object, representing the same bytes, whose name attribute value is
  // filename.
  // TODO: This is a bit weird... What if passed value is a File?
  // Do we just override the name attribute? Since it says "if value is (now)"
  // does that mean that this lives inside the previous condition? In which case
  // creating one more File instance doesn't make much sense....
  if (isFileLike(value) && filename != null) {
    value = value instanceof File
      ? new File([value], filename)
      : new FileLike(value, filename)
  }

  // 5. Set entry’s value to value.
  entry.value = value

  // 6. Return entry.
  return entry
}

module.exports = { FormData: globalThis.FormData ?? FormData }


/***/ }),

/***/ 554:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// https://github.com/Ethan-Arrowood/undici-fetch



const { validateHeaderName, validateHeaderValue } = __nccwpck_require__(3685)
const { kHeadersList } = __nccwpck_require__(2785)
const { kGuard } = __nccwpck_require__(5861)
const { kEnumerableProperty } = __nccwpck_require__(3983)
const {
  forbiddenHeaderNames,
  forbiddenResponseHeaderNames
} = __nccwpck_require__(1037)

function binarySearch (arr, val) {
  let low = 0
  let high = Math.floor(arr.length / 2)

  while (high > low) {
    const mid = (high + low) >>> 1

    if (val.localeCompare(arr[mid * 2]) > 0) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  return low * 2
}

function normalizeAndValidateHeaderName (name) {
  if (name === undefined) {
    throw new TypeError(`Header name ${name}`)
  }
  const normalizedHeaderName = name.toLocaleLowerCase()
  validateHeaderName(normalizedHeaderName)
  return normalizedHeaderName
}

function normalizeAndValidateHeaderValue (name, value) {
  if (value === undefined) {
    throw new TypeError(value, name)
  }
  const normalizedHeaderValue = `${value}`.replace(
    /^[\n\t\r\x20]+|[\n\t\r\x20]+$/g,
    ''
  )
  validateHeaderValue(name, normalizedHeaderValue)
  return normalizedHeaderValue
}

function fill (headers, object) {
  // To fill a Headers object headers with a given object object, run these steps:

  if (object[Symbol.iterator]) {
    // 1. If object is a sequence, then for each header in object:
    // TODO: How to check if sequence?
    for (let header of object) {
      // 1. If header does not contain exactly two items, then throw a TypeError.
      if (!header[Symbol.iterator]) {
        // TODO: Spec doesn't define what to do here?
        throw new TypeError()
      }

      if (typeof header === 'string') {
        // TODO: Spec doesn't define what to do here?
        throw new TypeError()
      }

      if (!Array.isArray(header)) {
        header = [...header]
      }

      if (header.length !== 2) {
        throw new TypeError()
      }

      // 2. Append header’s first item/header’s second item to headers.
      headers.append(header[0], header[1])
    }
  } else if (object && typeof object === 'object') {
    // Otherwise, object is a record, then for each key → value in object,
    // append key/value to headers.
    // TODO: How to check if record?
    for (const header of Object.entries(object)) {
      headers.append(header[0], header[1])
    }
  } else {
    // TODO: Spec doesn't define what to do here?
    throw TypeError()
  }
}

// TODO: Composition over inheritence? Or helper methods?
class HeadersList extends Array {
  append (name, value) {
    const normalizedName = normalizeAndValidateHeaderName(name)
    const normalizedValue = normalizeAndValidateHeaderValue(name, value)

    const index = binarySearch(this, normalizedName)

    if (this[index] === normalizedName) {
      this[index + 1] += `, ${normalizedValue}`
    } else {
      this.splice(index, 0, normalizedName, normalizedValue)
    }
  }

  delete (name) {
    const normalizedName = normalizeAndValidateHeaderName(name)

    const index = binarySearch(this, normalizedName)

    if (this[index] === normalizedName) {
      this.splice(index, 2)
    }
  }

  get (name) {
    const normalizedName = normalizeAndValidateHeaderName(name)

    const index = binarySearch(this, normalizedName)

    if (this[index] === normalizedName) {
      return this[index + 1]
    }

    return null
  }

  has (name) {
    const normalizedName = normalizeAndValidateHeaderName(name)

    const index = binarySearch(this, normalizedName)

    return this[index] === normalizedName
  }

  set (name, value) {
    const normalizedName = normalizeAndValidateHeaderName(name)
    const normalizedValue = normalizeAndValidateHeaderValue(name, value)

    const index = binarySearch(this, normalizedName)
    if (this[index] === normalizedName) {
      this[index + 1] = normalizedValue
    } else {
      this.splice(index, 0, normalizedName, normalizedValue)
    }
  }
}

class Headers {
  constructor (...args) {
    if (
      args[0] !== undefined &&
      !(typeof args[0] === 'object' && args[0] != null) &&
      !Array.isArray(args[0])
    ) {
      throw new TypeError(
        "Failed to construct 'Headers': The provided value is not of type '(record<ByteString, ByteString> or sequence<sequence<ByteString>>"
      )
    }
    const init = args.length >= 1 ? args[0] ?? {} : {}

    this[kHeadersList] = new HeadersList()

    // The new Headers(init) constructor steps are:

    // 1. Set this’s guard to "none".
    this[kGuard] = 'none'

    // 2. If init is given, then fill this with init.
    fill(this, init)
  }

  get [Symbol.toStringTag] () {
    if (!(this instanceof Headers)) {
      throw new TypeError('Illegal invocation')
    }

    return this.constructor.name
  }

  toString () {
    if (!(this instanceof Headers)) {
      throw new TypeError('Illegal invocation')
    }

    return Object.prototype.toString.call(this)
  }

  append (...args) {
    if (!(this instanceof Headers)) {
      throw new TypeError('Illegal invocation')
    }
    if (args.length < 2) {
      throw new TypeError(
        `Failed to execute 'append' on 'Headers': 2 arguments required, but only ${args.length} present.`
      )
    }

    const normalizedName = normalizeAndValidateHeaderName(String(args[0]))

    if (this[kGuard] === 'immutable') {
      throw new TypeError('immutable')
    } else if (
      this[kGuard] === 'request' &&
      forbiddenHeaderNames.includes(normalizedName)
    ) {
      return
    } else if (this[kGuard] === 'request-no-cors') {
      // TODO
    } else if (
      this[kGuard] === 'response' &&
      forbiddenResponseHeaderNames.includes(normalizedName)
    ) {
      return
    }

    return this[kHeadersList].append(String(args[0]), String(args[1]))
  }

  delete (...args) {
    if (!(this instanceof Headers)) {
      throw new TypeError('Illegal invocation')
    }
    if (args.length < 1) {
      throw new TypeError(
        `Failed to execute 'delete' on 'Headers': 1 argument required, but only ${args.length} present.`
      )
    }

    const normalizedName = normalizeAndValidateHeaderName(String(args[0]))

    if (this[kGuard] === 'immutable') {
      throw new TypeError('immutable')
    } else if (
      this[kGuard] === 'request' &&
      forbiddenHeaderNames.includes(normalizedName)
    ) {
      return
    } else if (this[kGuard] === 'request-no-cors') {
      // TODO
    } else if (
      this[kGuard] === 'response' &&
      forbiddenResponseHeaderNames.includes(normalizedName)
    ) {
      return
    }

    return this[kHeadersList].delete(String(args[0]))
  }

  get (...args) {
    if (!(this instanceof Headers)) {
      throw new TypeError('Illegal invocation')
    }
    if (args.length < 1) {
      throw new TypeError(
        `Failed to execute 'get' on 'Headers': 1 argument required, but only ${args.length} present.`
      )
    }

    return this[kHeadersList].get(String(args[0]))
  }

  has (...args) {
    if (!(this instanceof Headers)) {
      throw new TypeError('Illegal invocation')
    }
    if (args.length < 1) {
      throw new TypeError(
        `Failed to execute 'has' on 'Headers': 1 argument required, but only ${args.length} present.`
      )
    }

    return this[kHeadersList].has(String(args[0]))
  }

  set (...args) {
    if (!(this instanceof Headers)) {
      throw new TypeError('Illegal invocation')
    }
    if (args.length < 2) {
      throw new TypeError(
        `Failed to execute 'set' on 'Headers': 2 arguments required, but only ${args.length} present.`
      )
    }

    const normalizedName = normalizeAndValidateHeaderName(String(args[0]))

    if (this[kGuard] === 'immutable') {
      throw new TypeError('immutable')
    } else if (
      this[kGuard] === 'request' &&
      forbiddenHeaderNames.includes(normalizedName)
    ) {
      return
    } else if (this[kGuard] === 'request-no-cors') {
      // TODO
    } else if (
      this[kGuard] === 'response' &&
      forbiddenResponseHeaderNames.includes(normalizedName)
    ) {
      return
    }

    return this[kHeadersList].set(String(args[0]), String(args[1]))
  }

  * keys () {
    const clone = this[kHeadersList].slice()
    for (let index = 0; index < clone.length; index += 2) {
      yield clone[index]
    }
  }

  * values () {
    const clone = this[kHeadersList].slice()
    for (let index = 1; index < clone.length; index += 2) {
      yield clone[index]
    }
  }

  * entries () {
    const clone = this[kHeadersList].slice()
    for (let index = 0; index < clone.length; index += 2) {
      yield [clone[index], clone[index + 1]]
    }
  }

  forEach (...args) {
    if (!(this instanceof Headers)) {
      throw new TypeError('Illegal invocation')
    }
    if (args.length < 1) {
      throw new TypeError(
        `Failed to execute 'forEach' on 'Headers': 1 argument required, but only ${args.length} present.`
      )
    }
    if (typeof args[0] !== 'function') {
      throw new TypeError(
        "Failed to execute 'forEach' on 'Headers': parameter 1 is not of type 'Function'."
      )
    }
    const callback = args[0]
    const thisArg = args[1]

    for (let index = 0; index < this[kHeadersList].length; index += 2) {
      callback.call(
        thisArg,
        this[kHeadersList][index + 1],
        this[kHeadersList][index],
        this
      )
    }
  }

  [Symbol.for('nodejs.util.inspect.custom')] () {
    if (!(this instanceof Headers)) {
      throw new TypeError('Illegal invocation')
    }

    return this[kHeadersList]
  }
}

Headers.prototype[Symbol.iterator] = Headers.prototype.entries

Object.defineProperties(Headers.prototype, {
  append: kEnumerableProperty,
  delete: kEnumerableProperty,
  get: kEnumerableProperty,
  has: kEnumerableProperty,
  set: kEnumerableProperty,
  keys: kEnumerableProperty,
  values: kEnumerableProperty,
  entries: kEnumerableProperty,
  forEach: kEnumerableProperty
})

module.exports = {
  fill,
  Headers,
  HeadersList,
  binarySearch,
  normalizeAndValidateHeaderName,
  normalizeAndValidateHeaderValue
}


/***/ }),

/***/ 4881:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
// https://github.com/Ethan-Arrowood/undici-fetch



const {
  Response,
  makeNetworkError,
  filterResponse,
  makeResponse
} = __nccwpck_require__(7823)
const { Headers } = __nccwpck_require__(554)
const { Request, makeRequest } = __nccwpck_require__(8359)
const zlib = __nccwpck_require__(9796)
const {
  ServiceWorkerGlobalScope,
  Window,
  matchRequestIntegrity,
  makePolicyContainer,
  clonePolicyContainer,
  requestBadPort,
  TAOCheck,
  appendRequestOriginHeader,
  responseLocationURL,
  requestCurrentURL,
  setRequestReferrerPolicyOnRedirect,
  tryUpgradeRequestToAPotentiallyTrustworthyURL,
  createOpaqueTimingInfo,
  appendFetchMetadata,
  corsCheck,
  crossOriginResourcePolicyCheck,
  determineRequestsReferrer,
  coarsenedSharedCurrentTime,
  createDeferredPromise,
  isBlobLike,
  CORBCheck,
  sameOrigin
} = __nccwpck_require__(2538)
const { kState, kHeaders, kGuard, kRealm } = __nccwpck_require__(5861)
const { AbortError } = __nccwpck_require__(8045)
const assert = __nccwpck_require__(9491)
const { safelyExtractBody, extractBody } = __nccwpck_require__(1472)
const {
  redirectStatus,
  nullBodyStatus,
  safeMethods,
  requestBodyHeader,
  subresource
} = __nccwpck_require__(1037)
const { kHeadersList } = __nccwpck_require__(2785)
const EE = __nccwpck_require__(2361)
const { PassThrough, pipeline } = __nccwpck_require__(2781)
const { isErrored, isReadable } = __nccwpck_require__(3983)
const { kIsMockActive } = __nccwpck_require__(4347)
const { dataURLProcessor } = __nccwpck_require__(685)

/** @type {import('buffer').resolveObjectURL} */
let resolveObjectURL
let ReadableStream

class Fetch extends EE {
  constructor (dispatcher) {
    super()

    this.dispatcher = dispatcher
    this.terminated = null
    this.connection = null
    this.dump = false
  }

  terminate ({ reason, aborted } = {}) {
    if (this.terminated) {
      return
    }
    this.terminated = { aborted, reason }

    this.connection?.destroy(reason)

    this.emit('terminated', reason)
  }
}

// https://fetch.spec.whatwg.org/#fetch-method
async function fetch (...args) {
  if (args.length < 1) {
    throw new TypeError(
      `Failed to execute 'fetch' on 'Window': 1 argument required, but only ${args.length} present.`
    )
  }
  if (
    args.length >= 1 &&
    typeof args[1] !== 'object' &&
    args[1] !== undefined
  ) {
    throw new TypeError(
      "Failed to execute 'fetch' on 'Window': cannot convert to dictionary."
    )
  }

  const resource = args[0]
  const init = args.length >= 1 ? args[1] ?? {} : {}

  const context = new Fetch(this)

  // 1. Let p be a new promise.
  const p = createDeferredPromise()

  // 2. Let requestObject be the result of invoking the initial value of
  // Request as constructor with input and init as arguments. If this throws
  // an exception, reject p with it and return p.
  const requestObject = new Request(resource, init)

  // 3. Let request be requestObject’s request.
  const request = requestObject[kState]

  // 4. If requestObject’s signal’s aborted flag is set, then:
  if (requestObject.signal.aborted) {
    // 1. Abort fetch with p, request, and null.
    abortFetch.call(context, p, request, null)

    // 2. Return p.
    return p.promise
  }

  // 5. Let globalObject be request’s client’s global object.
  // TODO: What if request.client is null?
  const globalObject = request.client?.globalObject

  // 6. If globalObject is a ServiceWorkerGlobalScope object, then set
  // request’s service-workers mode to "none".
  if (globalObject instanceof ServiceWorkerGlobalScope) {
    request.serviceWorkers = 'none'
  }

  // 7. Let responseObject be null.
  let responseObject = null

  // 8. Let relevantRealm be this’s relevant Realm.
  const relevantRealm = null

  // 9. Let locallyAborted be false.
  let locallyAborted = false

  // 10. Add the following abort steps to requestObject’s signal:
  requestObject.signal.addEventListener(
    'abort',
    () => {
      // 1. Set locallyAborted to true.
      locallyAborted = true

      // 2. Abort fetch with p, request, and responseObject.
      abortFetch.call(context, p, request, responseObject)

      // 3. Terminate the ongoing fetch with the aborted flag set.
      context.terminate({ aborted: true })
    },
    { once: true }
  )

  // 11. Let handleFetchDone given response response be to finalize and
  // report timing with response, globalObject, and "fetch".
  const handleFetchDone = (response) =>
    finalizeAndReportTiming(response, 'fetch')

  // 12. Fetch request with processResponseEndOfBody set to handleFetchDone,
  // and processResponse given response being these substeps:
  const processResponse = (response) => {
    // 1. If locallyAborted is true, terminate these substeps.
    if (locallyAborted) {
      return
    }

    // 2. If response’s aborted flag is set, then abort fetch with p,
    // request, and responseObject, and terminate these substeps.
    if (response.aborted) {
      abortFetch.call(context, p, request, responseObject)
      return
    }

    // 3. If response is a network error, then reject p with a TypeError
    // and terminate these substeps.
    if (response.type === 'error') {
      p.reject(
        Object.assign(new TypeError('fetch failed'), { cause: response.error })
      )
      return
    }

    // 4. Set responseObject to the result of creating a Response object,
    // given response, "immutable", and relevantRealm.
    responseObject = new Response()
    responseObject[kState] = response
    responseObject[kRealm] = relevantRealm
    responseObject[kHeaders][kHeadersList] = response.headersList
    responseObject[kHeaders][kGuard] = 'immutable'
    responseObject[kHeaders][kRealm] = relevantRealm

    // 5. Resolve p with responseObject.
    p.resolve(responseObject)
  }

  fetching
    .call(context, {
      request,
      processResponseEndOfBody: handleFetchDone,
      processResponse
    })
    .catch((err) => {
      p.reject(err)
    })

  // 13. Return p.
  return p.promise
}

// https://fetch.spec.whatwg.org/#finalize-and-report-timing
function finalizeAndReportTiming (response, initiatorType = 'other') {
  // 1. If response is an aborted network error, then return.
  if (response.type === 'error' && response.aborted) {
    return
  }

  // 2. If response’s URL list is null or empty, then return.
  if (!response.urlList?.length) {
    return
  }

  // 3. Let originalURL be response’s URL list[0].
  const originalURL = response.urlList[0]

  // 4. Let timingInfo be response’s timing info.
  let timingInfo = response.timingInfo

  // 5. Let cacheState be response’s cache state.
  let cacheState = response.cacheState

  // 6. If originalURL’s scheme is not an HTTP(S) scheme, then return.
  if (!/^https?:/.test(originalURL.protocol)) {
    return
  }

  // 7. If timingInfo is null, then return.
  if (timingInfo === null) {
    return
  }

  // 8. If response’s timing allow passed flag is not set, then:
  if (!timingInfo.timingAllowPassed) {
    //  1. Set timingInfo to a the result of creating an opaque timing info for timingInfo.
    timingInfo = createOpaqueTimingInfo({
      startTime: timingInfo.startTime
    })

    //  2. Set cacheState to the empty string.
    cacheState = ''
  }

  // 9. Set timingInfo’s end time to the coarsened shared current time
  // given global’s relevant settings object’s cross-origin isolated
  // capability.
  // TODO: given global’s relevant settings object’s cross-origin isolated
  // capability?
  response.timingInfo.endTime = coarsenedSharedCurrentTime()

  // 10. Set response’s timing info to timingInfo.
  response.timingInfo = timingInfo

  // 11. Mark resource timing for timingInfo, originalURL, initiatorType,
  // global, and cacheState.
  markResourceTiming(
    timingInfo,
    originalURL,
    initiatorType,
    globalThis,
    cacheState
  )
}

// https://w3c.github.io/resource-timing/#dfn-mark-resource-timing
function markResourceTiming () {
  // TODO
}

// https://fetch.spec.whatwg.org/#abort-fetch
function abortFetch (p, request, responseObject) {
  // 1. Let error be an "AbortError" DOMException.
  const error = new AbortError()

  // 2. Reject promise with error.
  p.reject(error)

  // 3. If request’s body is not null and is readable, then cancel request’s
  // body with error.
  if (request.body != null && isReadable(request.body?.stream)) {
    request.body.stream.cancel(error).catch((err) => {
      if (err.code === 'ERR_INVALID_STATE') {
        // Node bug?
        return
      }
      throw err
    })
  }

  // 4. If responseObject is null, then return.
  if (responseObject == null) {
    return
  }

  // 5. Let response be responseObject’s response.
  const response = responseObject[kState]

  // 6. If response’s body is not null and is readable, then error response’s
  // body with error.
  if (response.body != null && isReadable(response.body?.stream)) {
    response.body.stream.cancel(error).catch((err) => {
      if (err.code === 'ERR_INVALID_STATE') {
        // Node bug?
        return
      }
      throw err
    })
  }
}

// https://fetch.spec.whatwg.org/#fetching
function fetching ({
  request,
  processRequestBodyChunkLength,
  processRequestEndOfBody,
  processResponse,
  processResponseEndOfBody,
  processResponseConsumeBody,
  useParallelQueue = false,
}) {
  // 1. Let taskDestination be null.
  let taskDestination = null

  // 2. Let crossOriginIsolatedCapability be false.
  let crossOriginIsolatedCapability = false

  // 3. If request’s client is non-null, then:
  if (request.client != null) {
    // 1. Set taskDestination to request’s client’s global object.
    taskDestination = request.client.globalObject

    // 2. Set crossOriginIsolatedCapability to request’s client’s cross-origin
    // isolated capability.
    crossOriginIsolatedCapability =
      request.client.crossOriginIsolatedCapability
  }

  // 4. If useParallelQueue is true, then set taskDestination to the result of
  // starting a new parallel queue.
  // TODO

  // 5. Let timingInfo be a new fetch timing info whose start time and
  // post-redirect start time are the coarsened shared current time given
  // crossOriginIsolatedCapability.
  const currenTime = coarsenedSharedCurrentTime(crossOriginIsolatedCapability)
  const timingInfo = createOpaqueTimingInfo({
    startTime: currenTime
  })

  // 6. Let fetchParams be a new fetch params whose
  // request is request,
  // timing info is timingInfo,
  // process request body chunk length is processRequestBodyChunkLength,
  // process request end-of-body is processRequestEndOfBody,
  // process response is processResponse,
  // process response consume body is processResponseConsumeBody,
  // process response end-of-body is processResponseEndOfBody,
  // task destination is taskDestination,
  // and cross-origin isolated capability is crossOriginIsolatedCapability.
  const fetchParams = {
    request,
    timingInfo,
    processRequestBodyChunkLength,
    processRequestEndOfBody,
    processResponse,
    processResponseConsumeBody,
    processResponseEndOfBody,
    taskDestination,
    crossOriginIsolatedCapability
  }

  // 7. If request’s body is a byte sequence, then set request’s body to the
  // first return value of safely extracting request’s body.
  // NOTE: Since fetching is only called from fetch, body should already be
  // extracted.
  assert(!request.body || request.body.stream)

  // 8. If request’s window is "client", then set request’s window to request’s
  // client, if request’s client’s global object is a Window object; otherwise
  // "no-window".
  if (request.window === 'client') {
    // TODO: What if request.client is null?
    request.window =
      request.client?.globalObject instanceof Window
        ? request.client
        : 'no-window'
  }

  // 9. If request’s origin is "client", then set request’s origin to request’s
  // client’s origin.
  if (request.origin === 'client') {
    // TODO: What if request.client is null?
    request.origin = request.client?.origin
  }

  // 10. If request’s policy container is "client", then:
  if (request.policyContainer === 'client') {
    // 1. If request’s client is non-null, then set request’s policy
    // container to a clone of request’s client’s policy container. [HTML]
    if (request.client != null) {
      request.policyContainer = clonePolicyContainer(
        request.client.policyContainer
      )
    } else {
      // 2. Otherwise, set request’s policy container to a new policy
      // container.
      request.policyContainer = makePolicyContainer()
    }
  }

  // 11. If request’s header list does not contain `Accept`, then:
  if (!request.headersList.has('accept')) {
    // 1. Let value be `*/*`.
    const value = '*/*'

    // 2. A user agent should set value to the first matching statement, if
    // any, switching on request’s destination:
    // "document"
    // "frame"
    // "iframe"
    // `text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8`
    // "image"
    // `image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5`
    // "style"
    // `text/css,*/*;q=0.1`
    // TODO

    // 3. Append `Accept`/value to request’s header list.
    request.headersList.append('accept', value)
  }

  // 12. If request’s header list does not contain `Accept-Language`, then
  // user agents should append `Accept-Language`/an appropriate value to
  // request’s header list.
  if (!request.headersList.has('accept-language')) {
    request.headersList.append('accept-language', '*')
  }

  // 13. If request’s priority is null, then use request’s initiator and
  // destination appropriately in setting request’s priority to a
  // user-agent-defined object.
  if (request.priority === null) {
    // TODO
  }

  // 14. If request is a subresource request, then:
  if (subresource.includes(request.destination)) {
    // 1. Let record be a new fetch record consisting of request and this
    // instance of the fetch algorithm.
    // TODO
    // 2. Append record to request’s client’s fetch group list of fetch
    // records.
    // TODO
  }

  // 15. Run main fetch given fetchParams.
  return mainFetch.call(this, fetchParams)
}

// https://fetch.spec.whatwg.org/#concept-main-fetch
async function mainFetch (fetchParams, recursive = false) {
  const context = this

  // 1. Let request be fetchParams’s request.
  const request = fetchParams.request

  // 2. Let response be null.
  let response = null

  // 3. If request’s local-URLs-only flag is set and request’s current URL is
  // not local, then set response to a network error.
  if (
    request.localURLsOnly &&
    !/^(about|blob|data):/.test(requestCurrentURL(request).protocol)
  ) {
    response = makeNetworkError('local URLs only')
  }

  // 4. Run report Content Security Policy violations for request.
  // TODO

  // 5. Upgrade request to a potentially trustworthy URL, if appropriate.
  tryUpgradeRequestToAPotentiallyTrustworthyURL(request)

  // 6. If should request be blocked due to a bad port, should fetching request
  // be blocked as mixed content, or should request be blocked by Content
  // Security Policy returns blocked, then set response to a network error.
  if (requestBadPort(request) === 'blocked') {
    response = makeNetworkError('bad port')
  }
  // TODO: should fetching request be blocked as mixed content?
  // TODO: should request be blocked by Content Security Policy?

  // 7. If request’s referrer policy is the empty string, then set request’s
  // referrer policy to request’s policy container’s referrer policy.
  if (request.referrerPolicy === '') {
    request.referrerPolicy = request.policyContainer.referrerPolicy
  }

  // 8. If request’s referrer is not "no-referrer", then set request’s
  // referrer to the result of invoking determine request’s referrer.
  if (request.referrer !== 'no-referrer') {
    request.referrer = determineRequestsReferrer(request)
  }

  // 9. Set request’s current URL’s scheme to "https" if all of the following
  // conditions are true:
  // - request’s current URL’s scheme is "http"
  // - request’s current URL’s host is a domain
  // - Matching request’s current URL’s host per Known HSTS Host Domain Name
  //   Matching results in either a superdomain match with an asserted
  //   includeSubDomains directive or a congruent match (with or without an
  //   asserted includeSubDomains directive). [HSTS]
  // TODO

  // 10. If recursive is false, then run the remaining steps in parallel.
  // TODO

  // 11. If response is null, then set response to the result of running
  // the steps corresponding to the first matching statement:
  if (response === null) {
    response = await (async () => {
      const currentURL = requestCurrentURL(request)

      if (
        // - request’s current URL’s origin is same origin with request’s origin,
        //   and request’s response tainting is "basic"
        (sameOrigin(currentURL, request.url) && request.responseTainting === 'basic') ||
        // request’s current URL’s scheme is "data"
        (currentURL.protocol === 'data:') ||
        // - request’s mode is "navigate" or "websocket"
        (request.mode === 'navigate' || request.mode === 'websocket')
      ) {
        // 1. Set request’s response tainting to "basic".
        request.responseTainting = 'basic'

        // 2. Return the result of running scheme fetch given fetchParams.
        return await schemeFetch
          .call(this, fetchParams)
      }

      // request’s mode is "same-origin"
      if (request.mode === 'same-origin') {
        // 1. Return a network error.
        return makeNetworkError('request mode cannot be "same-origin"')
      }

      // request’s mode is "no-cors"
      if (request.mode === 'no-cors') {
        // 1. If request’s redirect mode is not "follow", then return a network
        // error.
        if (request.redirect !== 'follow') {
          return makeNetworkError(
            'redirect mode cannot be "follow" for "no-cors" request'
          )
        }

        // 2. Set request’s response tainting to "opaque".
        request.responseTainting = 'opaque'

        // 3. Let noCorsResponse be the result of running scheme fetch given
        // fetchParams.
        const noCorsResponse = await schemeFetch
          .call(this, fetchParams)

        // 4. If noCorsResponse is a filtered response or the CORB check with
        // request and noCorsResponse returns allowed, then return noCorsResponse.
        if (noCorsResponse.status === 0 || CORBCheck(request, noCorsResponse) === 'allowed') {
          return noCorsResponse
        }

        // 5. Return a new response whose status is noCorsResponse’s status.
        return makeResponse({ status: noCorsResponse.status })
      }

      // request’s current URL’s scheme is not an HTTP(S) scheme
      if (!/^https?:/.test(requestCurrentURL(request).protocol)) {
        // Return a network error.
        return makeNetworkError('URL scheme must be a HTTP(S) scheme')
      }

      // - request’s use-CORS-preflight flag is set
      // - request’s unsafe-request flag is set and either request’s method is
      //   not a CORS-safelisted method or CORS-unsafe request-header names with
      //   request’s header list is not empty
      //    1. Set request’s response tainting to "cors".
      //    2. Let corsWithPreflightResponse be the result of running HTTP fetch
      //    given fetchParams and true.
      //    3. If corsWithPreflightResponse is a network error, then clear cache
      //    entries using request.
      //    4. Return corsWithPreflightResponse.
      // TODO

      // Otherwise
      //    1. Set request’s response tainting to "cors".
      request.responseTainting = 'cors'

      //    2. Return the result of running HTTP fetch given fetchParams.
      return await httpFetch
        .call(this, fetchParams)
        .catch((err) => makeNetworkError(err))
    })()
  }

  // 12. If recursive is true, then return response.
  if (recursive) {
    return response
  }

  // 13. If response is not a network error and response is not a filtered
  // response, then:
  if (response.status !== 0 && !response.internalResponse) {
    // If request’s response tainting is "cors", then:
    if (request.responseTainting === 'cors') {
      // 1. Let headerNames be the result of extracting header list values
      // given `Access-Control-Expose-Headers` and response’s header list.
      // TODO
      // 2. If request’s credentials mode is not "include" and headerNames
      // contains `*`, then set response’s CORS-exposed header-name list to
      // all unique header names in response’s header list.
      // TODO
      // 3. Otherwise, if headerNames is not null or failure, then set
      // response’s CORS-exposed header-name list to headerNames.
      // TODO
    }

    // Set response to the following filtered response with response as its
    // internal response, depending on request’s response tainting:
    if (request.responseTainting === 'basic') {
      response = filterResponse(response, 'basic')
    } else if (request.responseTainting === 'cors') {
      response = filterResponse(response, 'cors')
    } else if (request.responseTainting === 'opaque') {
      response = filterResponse(response, 'opaque')
    } else {
      assert(false)
    }
  }

  // 14. Let internalResponse be response, if response is a network error,
  // and response’s internal response otherwise.
  let internalResponse =
    response.status === 0 ? response : response.internalResponse

  // 15. If internalResponse’s URL list is empty, then set it to a clone of
  // request’s URL list.
  if (internalResponse.urlList.length === 0) {
    internalResponse.urlList.push(...request.urlList)
  }

  // 16. If request’s timing allow failed flag is unset, then set
  // internalResponse’s timing allow passed flag.
  if (!request.timingAllowFailed) {
    response.timingAllowPassed = true
  }

  // 17. If response is not a network error and any of the following returns
  // blocked
  // - should internalResponse to request be blocked as mixed content
  // - should internalResponse to request be blocked by Content Security Policy
  // - should internalResponse to request be blocked due to its MIME type
  // - should internalResponse to request be blocked due to nosniff
  // TODO

  // 18. If response’s type is "opaque", internalResponse’s status is 206,
  // internalResponse’s range-requested flag is set, and request’s header
  // list does not contain `Range`, then set response and internalResponse
  // to a network error.
  if (
    response.type === 'opaque' &&
    internalResponse.status === 206 &&
    internalResponse.rangeRequested &&
    !request.headers.has('range')
  ) {
    response = internalResponse = makeNetworkError()
  }

  // 19. If response is not a network error and either request’s method is
  // `HEAD` or `CONNECT`, or internalResponse’s status is a null body status,
  // set internalResponse’s body to null and disregard any enqueuing toward
  // it (if any).
  if (
    response.status !== 0 &&
    (request.method === 'HEAD' ||
      request.method === 'CONNECT' ||
      nullBodyStatus.includes(internalResponse.status))
  ) {
    internalResponse.body = null
    context.dump = true
  }

  // 20. If request’s integrity metadata is not the empty string, then:
  if (request.integrity) {
    // 1. Let processBodyError be this step: run fetch finale given fetchParams
    // and a network error.
    const processBodyError = (reason) =>
      fetchFinale.call(context, fetchParams, makeNetworkError(reason))

    // 2. If request’s response tainting is "opaque", or response’s body is null,
    // then run processBodyError and abort these steps.
    if (request.responseTainting === 'opaque' || response.body == null) {
      processBodyError(response.error)
      return
    }

    // 3. Let processBody given bytes be these steps:
    const processBody = (bytes) => {
      // 1. If bytes do not match request’s integrity metadata,
      // then run processBodyError and abort these steps. [SRI]
      if (!matchRequestIntegrity(request, bytes)) {
        processBodyError('integrity mismatch')
        return
      }

      // 2. Set response’s body to the first return value of safely
      // extracting bytes.
      response.body = safelyExtractBody(bytes)[0]

      // 3. Run fetch finale given fetchParams and response.
      fetchFinale.call(context, fetchParams, response)
    }

    // 4. Fully read response’s body given processBody and processBodyError.
    try {
      processBody(await response.arrayBuffer())
    } catch (err) {
      processBodyError(err)
    }
  } else {
    // 21. Otherwise, run fetch finale given fetchParams and response.
    fetchFinale.call(context, fetchParams, response)
  }
}

// https://fetch.spec.whatwg.org/#concept-scheme-fetch
// given a fetch params fetchParams
async function schemeFetch (fetchParams) {
  const context = this

  // let request be fetchParams’s request
  const { request } = fetchParams

  const {
    protocol: scheme,
    pathname: path
  } = new URL(requestCurrentURL(request))

  // switch on request’s current URL’s scheme, and run the associated steps:
  switch (scheme) {
    case 'about:': {
      // If request’s current URL’s path is the string "blank", then return a new response
      // whose status message is `OK`, header list is « (`Content-Type`, `text/html;charset=utf-8`) », 
      // and body is the empty byte sequence. 
      if (path === 'blank') {
        const resp = makeResponse({
          statusText: 'OK',
          headersList: [
            'content-type', 'text/html;charset=utf-8'
          ]
        })
        
        resp.urlList = [new URL('about:blank')]
        return resp
      }

      // Otherwise, return a network error.
      return makeNetworkError('invalid path called')
    }
    case 'blob:': {
      resolveObjectURL ??= (__nccwpck_require__(4300).resolveObjectURL)

      context.on('terminated', onRequestAborted)

      // 1. Run these steps, but abort when the ongoing fetch is terminated: 
      //  1a. Let blob be request’s current URL’s blob URL entry’s object.
      //      https://w3c.github.io/FileAPI/#blob-url-entry
      //      P.S. Thank God this method is available in node.
      const currentURL = requestCurrentURL(request)
      
      // https://github.com/web-platform-tests/wpt/blob/7b0ebaccc62b566a1965396e5be7bb2bc06f841f/FileAPI/url/resources/fetch-tests.js#L52-L56
      // Buffer.resolveObjectURL does not ignore URL queries.
      if (currentURL.search.length !== 0) {
        return makeNetworkError('NetworkError when attempting to fetch resource.')
      }

      const blob = resolveObjectURL(currentURL.toString())

      //  2a. If request’s method is not `GET` or blob is not a Blob object, then return a network error. [FILEAPI]
      if (request.method !== 'GET' || !isBlobLike(blob)) {
        return makeNetworkError('invalid method')
      }

      //  3a. Let response be a new response whose status message is `OK`. 
      const response = makeResponse({ statusText: 'OK', urlList: [currentURL] })

      //  4a. Append (`Content-Length`, blob’s size attribute value) to response’s header list.
      response.headersList.set('content-length', `${blob.size}`)

      //  5a. Append (`Content-Type`, blob’s type attribute value) to response’s header list.
      response.headersList.set('content-type', blob.type)

      //  6a. Set response’s body to the result of performing the read operation on blob.
      response.body = extractBody(blob)[0]

      // since the request has not been aborted, we can safely remove the listener.
      context.off('terminated', onRequestAborted)

      //  7a. Return response.
      return response

      // 2. If aborted, then:
      function onRequestAborted () {
        // 1. Let aborted be the termination’s aborted flag.
        const aborted = context.terminated.aborted

        // 2. If aborted is set, then return an aborted network error.
        if (aborted) {
          return makeNetworkError(new AbortError())
        }

        // 3. Return a network error.
        return makeNetworkError(context.terminated.reason)
      }
    }
    case 'data:': {
      // 1. Let dataURLStruct be the result of running the
      //    data: URL processor on request’s current URL.
      const currentURL = requestCurrentURL(request)
      const dataURLStruct = dataURLProcessor(currentURL)

      // 2. If dataURLStruct is failure, then return a
      //    network error.
      if (dataURLStruct === 'failure') {
        return makeNetworkError('failed to fetch the data URL')
      }

      // 3. Let mimeType be dataURLStruct’s MIME type, serialized.
      const { mimeType } = dataURLStruct

      /** @type {string} */
      let contentType = `${mimeType.type}/${mimeType.subtype}`
      const contentTypeParams = []

      if (mimeType.parameters.size > 0) {
        contentType += ';'
      }

      for (const [key, value] of mimeType.parameters) {
        if (value.length > 0) {
          contentTypeParams.push(`${key}=${value}`)
        } else {
          contentTypeParams.push(key)
        }
      }

      contentType += contentTypeParams.join(',')

      // 4. Return a response whose status message is `OK`,
      //    header list is « (`Content-Type`, mimeType) »,
      //    and body is dataURLStruct’s body.
      return makeResponse({
        statusText: 'OK',
        headersList: [
          'content-type', contentType
        ],
        body: dataURLStruct.body
      })
    }
    case 'file:': {
      // For now, unfortunate as it is, file URLs are left as an exercise for the reader.
      // When in doubt, return a network error.
      return makeNetworkError('not implemented... yet...')
    }
    case 'http:':
    case 'https:': {
      // Return the result of running HTTP fetch given fetchParams.

      return await httpFetch
        .call(this, fetchParams)
        .catch((err) => makeNetworkError(err))
    }
    default: {
      return makeNetworkError('unknown scheme')
    }
  }
}

// https://fetch.spec.whatwg.org/#finalize-response
function finalizeResponse (fetchParams, response) {
  // 1. Set fetchParams’s request’s done flag.
  fetchParams.request.done = true

  // 2, If fetchParams’s process response done is not null, then queue a fetch
  // task to run fetchParams’s process response done given response, with
  // fetchParams’s task destination.
  if (fetchParams.processResponseDone != null) {
    fetchParams.processResponseDone(response)
  }
}

// https://fetch.spec.whatwg.org/#fetch-finale
function fetchFinale (fetchParams, response) {
  const context = this

  // 1. If response is a network error, then:
  if (response.type === 'error') {
    // 1. Set response’s URL list to « fetchParams’s request’s URL list[0] ».
    response.urlList = [fetchParams.request.urlList[0]]

    // 2. Set response’s timing info to the result of creating an opaque timing
    // info for fetchParams’s timing info.
    response.timingInfo = createOpaqueTimingInfo({
      startTime: fetchParams.timingInfo.startTime
    })
  }

  // 2. Let processResponseEndOfBody be the following steps:
  // TODO

  // 3. If fetchParams’s process response is non-null, then queue a fetch task
  // to run fetchParams’s process response given response, with fetchParams’s
  // task destination.
  if (fetchParams.processResponse != null) {
    fetchParams.processResponse(response)
  }

  // 4. If fetchParams’s process response is non-null, then queue a fetch task
  // to run fetchParams’s process response given response, with fetchParams’s
  // task destination.
  // TODO

  // 5. If response’s body is null, then run processResponseEndOfBody.
  // TODO

  // 6. Otherwise:
  // TODO

  // 7. If fetchParams’s process response consume body is non-null, then:
  // TODO

  // TODO: This is a workaround. Until the above has been implemented, i.e.
  // we need to either fully consume the body or terminate the fetch.
  if (response.type === 'error') {
    context.terminate({ reason: response.error })
  }
}

// https://fetch.spec.whatwg.org/#http-fetch
async function httpFetch (fetchParams) {
  const context = this

  // 1. Let request be fetchParams’s request.
  const request = fetchParams.request

  // 2. Let response be null.
  let response = null

  // 3. Let actualResponse be null.
  let actualResponse = null

  // 4. Let timingInfo be fetchParams’s timing info.
  const timingInfo = fetchParams.timingInfo

  // 5. If request’s service-workers mode is "all", then:
  if (request.serviceWorkers === 'all') {
    // TODO
  }

  // 6. If response is null, then:
  if (response === null) {
    // 1. If makeCORSPreflight is true and one of these conditions is true:
    // TODO

    // 2. If request’s redirect mode is "follow", then set request’s
    // service-workers mode to "none".
    if (request.redirect === 'follow') {
      request.serviceWorkers = 'none'
    }

    // 3. Set response and actualResponse to the result of running
    // HTTP-network-or-cache fetch given fetchParams.
    actualResponse = response = await httpNetworkOrCacheFetch.call(
      this,
      fetchParams
    )

    // 4. If request’s response tainting is "cors" and a CORS check
    // for request and response returns failure, then return a network error.
    if (
      request.responseTainting === 'cors' &&
      corsCheck(request, response) === 'failure'
    ) {
      return makeNetworkError('cors failure')
    }

    // 5. If the TAO check for request and response returns failure, then set
    // request’s timing allow failed flag.
    if (TAOCheck(request, response) === 'failure') {
      request.timingAllowFailed = true
    }
  }

  // 7. If either request’s response tainting or response’s type
  // is "opaque", and the cross-origin resource policy check with
  // request’s origin, request’s client, request’s destination,
  // and actualResponse returns blocked, then return a network error.
  if (
    (request.responseTainting === 'opaque' || response.type === 'opaque') &&
    crossOriginResourcePolicyCheck(
      request.origin,
      request.client,
      request.destination,
      actualResponse
    ) === 'blocked'
  ) {
    return makeNetworkError('blocked')
  }

  // 8. If actualResponse’s status is a redirect status, then:
  if (redirectStatus.includes(actualResponse.status)) {
    // 1. If actualResponse’s status is not 303, request’s body is not null,
    // and the connection uses HTTP/2, then user agents may, and are even
    // encouraged to, transmit an RST_STREAM frame.
    // See, https://github.com/whatwg/fetch/issues/1288
    context.connection.destroy()

    // 2. Switch on request’s redirect mode:
    if (request.redirect === 'error') {
      // Set response to a network error.
      response = makeNetworkError()
    } else if (request.redirect === 'manual') {
      // Set response to an opaque-redirect filtered response whose internal
      // response is actualResponse.
      // NOTE(spec): On the web this would return an `opaqueredirect` response,
      // but that doesn't make sense server side.
      // See https://github.com/nodejs/undici/issues/1193.
      response = actualResponse
    } else if (request.redirect === 'follow') {
      // Set response to the result of running HTTP-redirect fetch given
      // fetchParams and response.
      response = await httpRedirectFetch.call(this, fetchParams, response)
    } else {
      assert(false)
    }
  }

  // 9. Set response’s timing info to timingInfo.
  response.timingInfo = timingInfo

  // 10. Return response.
  return response
}

// https://fetch.spec.whatwg.org/#http-redirect-fetch
async function httpRedirectFetch (fetchParams, response) {
  // 1. Let request be fetchParams’s request.
  const request = fetchParams.request

  // 2. Let actualResponse be response, if response is not a filtered response,
  // and response’s internal response otherwise.
  const actualResponse = response.internalResponse
    ? response.internalResponse
    : response

  // 3. Let locationURL be actualResponse’s location URL given request’s current
  // URL’s fragment.
  let locationURL

  try {
    locationURL = responseLocationURL(
      actualResponse,
      requestCurrentURL(request).hash
    )

    // 4. If locationURL is null, then return response.
    if (locationURL == null) {
      return response
    }
  } catch (err) {
    // 5. If locationURL is failure, then return a network error.
    return makeNetworkError(err)
  }

  // 6. If locationURL’s scheme is not an HTTP(S) scheme, then return a network
  // error.
  if (!/^https?:/.test(locationURL.protocol)) {
    return makeNetworkError('URL scheme must be a HTTP(S) scheme')
  }

  // 7. If request’s redirect count is twenty, return a network error.
  if (request.redirectCount === 20) {
    return makeNetworkError('redirect count exceeded')
  }

  // 8. Increase request’s redirect count by one.
  request.redirectCount += 1

  // 9. If request’s mode is "cors", locationURL includes credentials, and
  // request’s origin is not same origin with locationURL’s origin, then return
  //  a network error.
  if (
    request.mode === 'cors' &&
    (locationURL.username || locationURL.password) &&
    !sameOrigin(request, locationURL)
  ) {
    return makeNetworkError('cross origin not allowed for request mode "cors"')
  }

  // 10. If request’s response tainting is "cors" and locationURL includes
  // credentials, then return a network error.
  if (
    request.responseTainting === 'cors' &&
    (locationURL.username || locationURL.password)
  ) {
    return makeNetworkError(
      'URL cannot contain credentials for request mode "cors"'
    )
  }

  // 11. If actualResponse’s status is not 303, request’s body is non-null,
  // and request’s body’s source is null, then return a network error.
  if (
    actualResponse.status !== 303 &&
    request.body != null &&
    request.body.source == null
  ) {
    return makeNetworkError()
  }

  // 12. If one of the following is true
  // - actualResponse’s status is 301 or 302 and request’s method is `POST`
  // - actualResponse’s status is 303 and request’s method is not `GET` or `HEAD`
  if (
    ([301, 302].includes(actualResponse.status) && request.method === 'POST') ||
    (actualResponse.status === 303 &&
      !['GET', 'HEADER'].includes(request.method))
  ) {
    // then:
    // 1. Set request’s method to `GET` and request’s body to null.
    request.method = 'GET'
    request.body = null

    // 2. For each headerName of request-body-header name, delete headerName from
    // request’s header list.
    for (const headerName of requestBodyHeader) {
      request.headersList.delete(headerName)
    }
  }

  // 13. If request’s body is non-null, then set request’s body to the first return
  // value of safely extracting request’s body’s source.
  if (request.body != null) {
    assert(request.body.source)
    request.body = safelyExtractBody(request.body.source)[0]
  }

  // 14. Let timingInfo be fetchParams’s timing info.
  const timingInfo = fetchParams.timingInfo

  // 15. Set timingInfo’s redirect end time and post-redirect start time to the
  // coarsened shared current time given fetchParams’s cross-origin isolated
  // capability.
  timingInfo.redirectEndTime = timingInfo.postRedirectStartTime =
    coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability)

  // 16. If timingInfo’s redirect start time is 0, then set timingInfo’s
  //  redirect start time to timingInfo’s start time.
  if (timingInfo.redirectStartTime === 0) {
    timingInfo.redirectStartTime = timingInfo.startTime
  }

  // 17. Append locationURL to request’s URL list.
  request.urlList.push(locationURL)

  // 18. Invoke set request’s referrer policy on redirect on request and
  // actualResponse.
  setRequestReferrerPolicyOnRedirect(request, actualResponse)

  // 19. Return the result of running main fetch given fetchParams and true.
  return mainFetch.call(this, fetchParams, true)
}

// https://fetch.spec.whatwg.org/#http-network-or-cache-fetch
async function httpNetworkOrCacheFetch (
  fetchParams,
  isAuthenticationFetch = false,
  isNewConnectionFetch = false
) {
  const context = this

  // 1. Let request be fetchParams’s request.
  const request = fetchParams.request

  // 2. Let httpFetchParams be null.
  let httpFetchParams = null

  // 3. Let httpRequest be null.
  let httpRequest = null

  // 4. Let response be null.
  let response = null

  // 5. Let storedResponse be null.
  // TODO: cache

  // 6. Let httpCache be null.
  const httpCache = null

  // 7. Let the revalidatingFlag be unset.
  const revalidatingFlag = false

  // 8. Run these steps, but abort when the ongoing fetch is terminated:

  //    1. If request’s window is "no-window" and request’s redirect mode is
  //    "error", then set httpFetchParams to fetchParams and httpRequest to
  //    request.
  if (request.window === 'no-window' && request.redirect === 'error') {
    httpFetchParams = fetchParams
    httpRequest = request
  } else {
    // Otherwise:

    // 1. Set httpRequest to a clone of request.
    httpRequest = makeRequest(request)

    // 2. Set httpFetchParams to a copy of fetchParams.
    httpFetchParams = { ...fetchParams }

    // 3. Set httpFetchParams’s request to httpRequest.
    httpFetchParams.request = httpRequest
  }

  //    3. Let includeCredentials be true if one of
  const includeCredentials =
    request.credentials === 'include' ||
    (request.credentials === 'same-origin' &&
      request.responseTainting === 'basic')

  //    4. Let contentLength be httpRequest’s body’s length, if httpRequest’s
  //    body is non-null; otherwise null.
  const contentLength = httpRequest.body ? httpRequest.body.length : null

  //    5. Let contentLengthHeaderValue be null.
  let contentLengthHeaderValue = null

  //    6. If httpRequest’s body is null and httpRequest’s method is `POST` or
  //    `PUT`, then set contentLengthHeaderValue to `0`.
  if (
    httpRequest.body == null &&
    ['POST', 'PUT'].includes(httpRequest.method)
  ) {
    contentLengthHeaderValue = '0'
  }

  //    7. If contentLength is non-null, then set contentLengthHeaderValue to
  //    contentLength, serialized and isomorphic encoded.
  if (contentLength != null) {
    // TODO: isomorphic encoded
    contentLengthHeaderValue = String(contentLength)
  }

  //    8. If contentLengthHeaderValue is non-null, then append
  //    `Content-Length`/contentLengthHeaderValue to httpRequest’s header
  //    list.
  if (contentLengthHeaderValue != null) {
    httpRequest.headersList.append('content-length', contentLengthHeaderValue)
  }

  //    9. If contentLength is non-null and httpRequest’s keepalive is true,
  //    then:
  if (contentLength != null && httpRequest.keepalive) {
    // NOTE: keepalive is a noop outside of browser context.
  }

  //    10 .If httpRequest’s referrer is a URL, then append
  //    `Referer`/httpRequest’s referrer, serialized and isomorphic encoded,
  //     to httpRequest’s header list.
  if (httpRequest.referrer instanceof URL) {
    // TODO: isomorphic encoded
    httpRequest.headersList.append('referer', httpRequest.referrer.href)
  }

  //    11. Append a request `Origin` header for httpRequest.
  appendRequestOriginHeader(httpRequest)

  //    12. Append the Fetch metadata headers for httpRequest. [FETCH-METADATA]
  appendFetchMetadata(httpRequest)

  //    13. If httpRequest’s header list does not contain `User-Agent`, then
  //    user agents should append `User-Agent`/default `User-Agent` value to
  //    httpRequest’s header list.
  if (!httpRequest.headersList.has('user-agent')) {
    httpRequest.headersList.append('user-agent', 'undici')
  }

  //    14. If httpRequest’s cache mode is "default" and httpRequest’s header
  //    list contains `If-Modified-Since`, `If-None-Match`,
  //    `If-Unmodified-Since`, `If-Match`, or `If-Range`, then set
  //    httpRequest’s cache mode to "no-store".
  if (
    httpRequest.cache === 'default' &&
    (httpRequest.headersList.has('if-modified-since') ||
      httpRequest.headersList.has('if-none-match') ||
      httpRequest.headersList.has('if-unmodified-since') ||
      httpRequest.headersList.has('if-match') ||
      httpRequest.headersList.has('if-range'))
  ) {
    httpRequest.cache = 'no-store'
  }

  //    15. If httpRequest’s cache mode is "no-cache", httpRequest’s prevent
  //    no-cache cache-control header modification flag is unset, and
  //    httpRequest’s header list does not contain `Cache-Control`, then append
  //    `Cache-Control`/`max-age=0` to httpRequest’s header list.
  if (
    httpRequest.cache === 'no-cache' &&
    !httpRequest.preventNoCacheCacheControlHeaderModification &&
    !httpRequest.headersList.has('cache-control')
  ) {
    httpRequest.headersList.append('cache-control', 'max-age=0')
  }

  //    16. If httpRequest’s cache mode is "no-store" or "reload", then:
  if (httpRequest.cache === 'no-store' || httpRequest.cache === 'reload') {
    // 1. If httpRequest’s header list does not contain `Pragma`, then append
    // `Pragma`/`no-cache` to httpRequest’s header list.
    if (!httpRequest.headersList.has('pragma')) {
      httpRequest.headersList.append('pragma', 'no-cache')
    }

    // 2. If httpRequest’s header list does not contain `Cache-Control`,
    // then append `Cache-Control`/`no-cache` to httpRequest’s header list.
    if (!httpRequest.headersList.has('cache-control')) {
      httpRequest.headersList.append('cache-control', 'no-cache')
    }
  }

  //    17. If httpRequest’s header list contains `Range`, then append
  //    `Accept-Encoding`/`identity` to httpRequest’s header list.
  if (httpRequest.headersList.has('range')) {
    httpRequest.headersList.append('accept-encoding', 'identity')
  }

  //    18. Modify httpRequest’s header list per HTTP. Do not append a given
  //    header if httpRequest’s header list contains that header’s name.
  //    TODO: https://github.com/whatwg/fetch/issues/1285#issuecomment-896560129
  if (!httpRequest.headersList.has('accept-encoding')) {
    if (/^https:/.test(requestCurrentURL(httpRequest).protocol)) {
      httpRequest.headersList.append('accept-encoding', 'br, gzip, deflate')
    } else {
      httpRequest.headersList.append('accept-encoding', 'gzip, deflate')
    }
  }

  //    19. If includeCredentials is true, then:
  if (includeCredentials) {
    // 1. If the user agent is not configured to block cookies for httpRequest
    // (see section 7 of [COOKIES]), then:
    // TODO: credentials
    // 2. If httpRequest’s header list does not contain `Authorization`, then:
    // TODO: credentials
  }

  //    20. If there’s a proxy-authentication entry, use it as appropriate.
  //    TODO: proxy-authentication

  //    21. Set httpCache to the result of determining the HTTP cache
  //    partition, given httpRequest.
  //    TODO: cache

  //    22. If httpCache is null, then set httpRequest’s cache mode to
  //    "no-store".
  if (httpCache == null) {
    httpRequest.cache = 'no-store'
  }

  //    23. If httpRequest’s cache mode is neither "no-store" nor "reload",
  //    then:
  if (httpRequest.mode !== 'no-store' && httpRequest.mode !== 'reload') {
    // TODO: cache
  }

  // 9. If aborted, then:
  // TODO

  // 10. If response is null, then:
  if (response == null) {
    // 1. If httpRequest’s cache mode is "only-if-cached", then return a
    // network error.
    if (httpRequest.mode === 'only-if-cached') {
      return makeNetworkError('only if cached')
    }

    // 2. Let forwardResponse be the result of running HTTP-network fetch
    // given httpFetchParams, includeCredentials, and isNewConnectionFetch.
    const forwardResponse = await httpNetworkFetch.call(
      this,
      httpFetchParams,
      includeCredentials,
      isNewConnectionFetch
    )

    // 3. If httpRequest’s method is unsafe and forwardResponse’s status is
    // in the range 200 to 399, inclusive, invalidate appropriate stored
    // responses in httpCache, as per the "Invalidation" chapter of HTTP
    // Caching, and set storedResponse to null. [HTTP-CACHING]
    if (
      !safeMethods.includes(httpRequest.method) &&
      forwardResponse.status >= 200 &&
      forwardResponse.status <= 399
    ) {
      // TODO: cache
    }

    // 4. If the revalidatingFlag is set and forwardResponse’s status is 304,
    // then:
    if (revalidatingFlag && forwardResponse.status === 304) {
      // TODO: cache
    }

    // 5. If response is null, then:
    if (response == null) {
      // 1. Set response to forwardResponse.
      response = forwardResponse

      // 2. Store httpRequest and forwardResponse in httpCache, as per the
      // "Storing Responses in Caches" chapter of HTTP Caching. [HTTP-CACHING]
      // TODO: cache
    }
  }

  // 11. Set response’s URL list to a clone of httpRequest’s URL list.
  response.urlList = [...httpRequest.urlList]

  // 12. If httpRequest’s header list contains `Range`, then set response’s
  // range-requested flag.
  if (httpRequest.headersList.has('range')) {
    response.rangeRequested = true
  }

  // 13. If response’s status is 401, httpRequest’s response tainting is not
  // "cors", includeCredentials is true, and request’s window is an environment
  // settings object, then:
  // TODO

  // 14. If response’s status is 407, then:
  if (response.status === 407) {
    // 1. If request’s window is "no-window", then return a network error.
    if (request.window === 'no-window') {
      return makeNetworkError()
    }

    // 2. ???

    // 3. If the ongoing fetch is terminated, then:
    if (context.terminated) {
      // 1. Let aborted be the termination’s aborted flag.
      const aborted = context.terminated.aborted

      // 2. If aborted is set, then return an aborted network error.
      if (aborted) {
        return makeNetworkError(new AbortError())
      }

      // 3. Return a network error.
      return makeNetworkError(context.terminated.reason)
    }

    // 4. Prompt the end user as appropriate in request’s window and store
    // the result as a proxy-authentication entry. [HTTP-AUTH]
    // TODO: Invoke some kind of callback?

    // 5. Set response to the result of running HTTP-network-or-cache fetch given
    // fetchParams.
    // TODO
    return makeNetworkError('proxy authentication required')
  }

  // 15. If all of the following are true
  if (
    // response’s status is 421
    response.status === 421 &&
    // isNewConnectionFetch is false
    !isNewConnectionFetch &&
    // request’s body is null, or request’s body is non-null and request’s body’s source is non-null
    (request.body == null || request.body.source != null)
  ) {
    // then:

    // 1. If the ongoing fetch is terminated, then:
    if (context.terminated) {
      // 1. Let aborted be the termination’s aborted flag.
      const aborted = context.terminated.aborted

      // 2. If aborted is set, then return an aborted network error.
      if (aborted) {
        return makeNetworkError(new AbortError())
      }

      // 3. Return a network error.
      return makeNetworkError(context.terminated.reason)
    }

    // 2. Set response to the result of running HTTP-network-or-cache
    // fetch given fetchParams, isAuthenticationFetch, and true.

    // TODO (spec): The spec doesn't specify this but we need to cancel
    // the active response before we can start a new one.
    // https://github.com/whatwg/fetch/issues/1293
    context.connection.destroy()

    response = await httpNetworkOrCacheFetch.call(
      this,
      fetchParams,
      isAuthenticationFetch,
      true
    )
  }

  // 16. If isAuthenticationFetch is true, then create an authentication entry
  if (isAuthenticationFetch) {
    // TODO
  }

  // 17. Return response.
  return response
}

// https://fetch.spec.whatwg.org/#http-network-fetch
function httpNetworkFetch (
  fetchParams,
  includeCredentials = false,
  forceNewConnection = false
) {
  const context = this

  return new Promise((resolve) => {
    assert(!context.connection || context.connection.destroyed)

    context.connection = {
      abort: null,
      destroyed: false,
      destroy (err) {
        if (!this.destroyed) {
          this.destroyed = true
          this.abort?.(err ?? new AbortError())
        }
      }
    }

    // 1. Let request be fetchParams’s request.
    const request = fetchParams.request

    // 2. Let response be null.
    let response = null

    // 3. Let timingInfo be fetchParams’s timing info.
    const timingInfo = fetchParams.timingInfo

    // 4. Let httpCache be the result of determining the HTTP cache partition,
    // given request.
    // TODO: cache
    const httpCache = null

    // 5. If httpCache is null, then set request’s cache mode to "no-store".
    if (httpCache == null) {
      request.cache = 'no-store'
    }

    // 6. Let networkPartitionKey be the result of determining the network
    // partition key given request.
    // TODO

    // 7. Switch on request’s mode:
    if (request.mode === 'websocket') {
      // Let connection be the result of obtaining a WebSocket connection,
      // given request’s current URL.
      // TODO
    } else {
      // Let connection be the result of obtaining a connection, given
      // networkPartitionKey, request’s current URL’s origin,
      // includeCredentials, and forceNewConnection.
      // TODO
    }

    // 8. Run these steps, but abort when the ongoing fetch is terminated:
    // TODO: When do we cleanup this listener?
    context.on('terminated', onRequestAborted)

    //    5. Set response to the result of making an HTTP request over connection
    //    using request with the following caveats:

    //    Follow the relevant requirements from HTTP. [HTTP] [HTTP-SEMANTICS]
    //    [HTTP-COND] [HTTP-CACHING] [HTTP-AUTH]

    //    If request’s body is non-null, and request’s body’s source is null,
    //    then the user agent may have a buffer of up to 64 kibibytes and store
    //    a part of request’s body in that buffer. If the user agent reads from
    //    request’s body beyond that buffer’s size and the user agent needs to
    //    resend request, then instead return a network error.
    //    TODO

    //    Set timingInfo’s final network-response start time to the coarsened
    //    shared current time given fetchParams’s cross-origin isolated capability,
    //    immediately after the user agent’s HTTP parser receives the first byte
    //    of the response (e.g., frame header bytes for HTTP/2 or response status
    //    line for HTTP/1.x).
    //    TODO

    //    Wait until all the headers are transmitted.

    //    Any responses whose status is in the range 100 to 199, inclusive,
    //    and is not 101, are to be ignored, except for the purposes of setting
    //    timingInfo’s final network-response start time above.

    //    If request’s header list contains `Transfer-Encoding`/`chunked` and
    //    response is transferred via HTTP/1.0 or older, then return a network
    //    error.

    //    If the HTTP request results in a TLS client certificate dialog, then:

    //        1. If request’s window is an environment settings object, make the
    //        dialog available in request’s window.

    //        2. Otherwise, return a network error.

    // To transmit request’s body body, run these steps:
    const body = (async function * () {
      try {
        // 1. If body is null and fetchParams’s process request end-of-body is
        // non-null, then queue a fetch task given fetchParams’s process request
        // end-of-body and fetchParams’s task destination.
        if (request.body === null) {
          fetchParams.processEndOfBody?.()
          return
        }

        // 2. Otherwise, if body is non-null:

        //    1. Let processBodyChunk given bytes be these steps:
        for await (const bytes of request.body.stream) {
          // 1. If the ongoing fetch is terminated, then abort these steps.
          if (context.terminated) {
            return
          }

          // 2. Run this step in parallel: transmit bytes.
          yield bytes

          // 3. If fetchParams’s process request body is non-null, then run
          // fetchParams’s process request body given bytes’s length.
          fetchParams.processRequestBody?.(bytes.byteLength)
        }

        // 2. Let processEndOfBody be these steps:

        //    1. If the ongoing fetch is terminated, then abort these steps.
        if (context.terminated) {
          return
        }

        //    2. If fetchParams’s process request end-of-body is non-null,
        //    then run fetchParams’s process request end-of-body.
        fetchParams.processRequestEndOfBody?.()
      } catch (e) {
        // 3. Let processBodyError given e be these steps:

        //    1. If the ongoing fetch is terminated, then abort these steps.
        if (context.terminated) {
          return
        }

        //    2. If e is an "AbortError" DOMException, then terminate the ongoing fetch with the aborted flag set.
        //    3. Otherwise, terminate the ongoing fetch.
        context.terminate({
          aborted: e.name === 'AbortError',
          reason: e
        })
      }
    })()

    // 9. If aborted, then:
    function onRequestAborted () {
      // 1. Let aborted be the termination’s aborted flag.
      const aborted = this.terminated.aborted

      // 2. If connection uses HTTP/2, then transmit an RST_STREAM frame.
      this.connection.destroy()

      // 3. If aborted is set, then return an aborted network error.
      if (aborted) {
        return resolve(makeNetworkError(new AbortError()))
      }

      // 4. Return a network error.
      return resolve(makeNetworkError(this.terminated.reason))
    }

    // 10. Let pullAlgorithm be an action that resumes the ongoing fetch
    // if it is suspended.
    let pullAlgorithm

    // 11. Let cancelAlgorithm be an action that terminates the ongoing
    // fetch with the aborted flag set.
    const cancelAlgorithm = () => {
      context.terminate({ aborted: true })
    }

    // 12. Let highWaterMark be a non-negative, non-NaN number, chosen by
    // the user agent.
    const highWaterMark = 64 * 1024 // Same as nodejs fs streams.

    // 13. Let sizeAlgorithm be an algorithm that accepts a chunk object
    // and returns a non-negative, non-NaN, non-infinite number, chosen by the user agent.
    // TODO

    // 14. Let stream be a new ReadableStream.
    // 15. Set up stream with pullAlgorithm set to pullAlgorithm,
    // cancelAlgorithm set to cancelAlgorithm, highWaterMark set to
    // highWaterMark, and sizeAlgorithm set to sizeAlgorithm.
    if (!ReadableStream) {
      ReadableStream = (__nccwpck_require__(5356).ReadableStream)
    }

    let pullResolve

    const stream = new ReadableStream(
      {
        async start (controller) {
          context.controller = controller
        },
        async pull (controller) {
          if (!pullAlgorithm) {
            await new Promise((resolve) => {
              pullResolve = resolve
            })
          }
          await pullAlgorithm(controller)
        },
        async cancel (reason) {
          await cancelAlgorithm(reason)
        }
      },
      { highWaterMark }
    )

    // 16. Run these steps, but abort when the ongoing fetch is terminated:
    // TODO

    // 17. If aborted, then:
    // TODO: How can this happen? The steps above are not async?

    // 18. Run these steps in parallel:
    //    1. Run these steps, but abort when the ongoing fetch is terminated:
    //        1. While true:
    //            1. If one or more bytes have been transmitted from response’s
    //            message body, then:
    //            NOTE: See onHeaders
    //            2. Otherwise, if the bytes transmission for response’s message
    //            body is done normally and stream is readable, then close stream,
    //            finalize response for fetchParams and response, and abort these
    //            in-parallel steps.
    //            NOTE: See onHeaders

    //    2. If aborted, then:
    function onResponseAborted () {
      // 1. Let aborted be the termination’s aborted flag.
      const aborted = this.terminated.aborted

      // 2. If aborted is set, then:
      if (aborted) {
        // 1. Set response’s aborted flag.
        response.aborted = true

        // 2. If stream is readable, error stream with an "AbortError" DOMException.
        if (isReadable(stream)) {
          this.controller.error(new AbortError())
        }
      } else {
        // 3. Otherwise, if stream is readable, error stream with a TypeError.
        if (isReadable(stream)) {
          this.controller.error(new TypeError('terminated'))
        }
      }

      // 4. If connection uses HTTP/2, then transmit an RST_STREAM frame.
      // 5. Otherwise, the user agent should close connection unless it would be bad for performance to do so.
      this.connection.destroy()
    }

    // 19. Return response.
    // NOTE: See onHeaders

    // Implementation
    const url = requestCurrentURL(request)
    context.dispatcher.dispatch(
      {
        path: url.pathname + url.search,
        origin: url.origin,
        method: request.method,
        body: context.dispatcher[kIsMockActive] ? request.body && request.body.source : body,
        headers: request.headersList,
        maxRedirections: 0
      },
      {
        decoder: null,
        abort: null,
        context,

        onConnect (abort) {
          // TODO (fix): Do we need connection here?
          const { connection } = this.context

          if (connection.destroyed) {
            abort(new AbortError())
          } else {
            this.abort = connection.abort = abort
          }
        },

        onHeaders (status, headersList, resume, statusText) {
          if (status < 200) {
            return
          }

          const headers = new Headers()
          for (let n = 0; n < headersList.length; n += 2) {
            headers.append(
              headersList[n + 0].toString(),
              headersList[n + 1].toString()
            )
          }

          response = makeResponse({
            status,
            statusText,
            headersList: headers[kHeadersList],
            body: { stream }
          })

          this.context.on('terminated', onResponseAborted)

          const codings =
            headers
              .get('content-encoding')
              ?.toLowerCase()
              .split(',')
              .map((x) => x.trim()) ?? []

          const decoders = []

          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding
          for (const coding of codings) {
            if (/(x-)?gzip/.test(coding)) {
              decoders.push(zlib.createGunzip())
            } else if (/(x-)?deflate/.test(coding)) {
              decoders.push(zlib.createInflate())
            } else if (coding === 'br') {
              decoders.push(zlib.createBrotliDecompress())
            } else {
              decoders.length = 0
              break
            }
          }

          if (decoders.length > 1) {
            pipeline(...decoders, () => {})
          } else if (decoders.length === 0) {
            // TODO (perf): Avoid intermediate.
            decoders.push(new PassThrough())
          }

          this.decoder = decoders[0].on('drain', resume)

          const iterator = decoders[decoders.length - 1][Symbol.asyncIterator]()

          pullAlgorithm = async (controller) => {
            // 4. Set bytes to the result of handling content codings given
            // codings and bytes.
            let bytes
            try {
              const { done, value } = await iterator.next()
              bytes = done ? undefined : value
            } catch (err) {
              if (this.decoder.writableEnded && !timingInfo.encodedBodySize) {
                // zlib doesn't like empty streams.
                bytes = undefined
              } else {
                bytes = err
              }
            }

            if (bytes === undefined) {
              // 2. Otherwise, if the bytes transmission for response’s message
              // body is done normally and stream is readable, then close
              // stream, finalize response for fetchParams and response, and
              // abort these in-parallel steps.
              finalizeResponse(fetchParams, response)

              controller.close()

              return
            }

            // 5. Increase timingInfo’s decoded body size by bytes’s length.
            timingInfo.decodedBodySize += bytes?.byteLength ?? 0

            // 6. If bytes is failure, then terminate the ongoing fetch.
            if (bytes instanceof Error) {
              this.context.terminate({ reason: bytes })
              return
            }

            // 7. Enqueue a Uint8Array wrapping an ArrayBuffer containing bytes
            // into stream.
            controller.enqueue(new Uint8Array(bytes))

            // 8. If stream is errored, then terminate the ongoing fetch.
            if (isErrored(stream)) {
              this.context.terminate()
              return
            }

            // 9. If stream doesn’t need more data ask the user agent to suspend
            // the ongoing fetch.
            return controller.desiredSize > 0
          }

          if (pullResolve) {
            pullResolve()
            pullResolve = null
          }

          resolve(response)

          return true
        },

        onData (chunk) {
          if (this.context.dump) {
            return
          }

          //  1. If one or more bytes have been transmitted from response’s
          //  message body, then:

          // 1. Let bytes be the transmitted bytes.
          const bytes = chunk

          // 2. Let codings be the result of extracting header list values
          // given `Content-Encoding` and response’s header list.
          // See pullAlgorithm.

          // 3. Increase timingInfo’s encoded body size by bytes’s length.
          timingInfo.encodedBodySize += bytes.byteLength

          // 4. See pullAlgorithm...

          return this.decoder.write(bytes)
        },

        onComplete () {
          this.decoder.end()
        },

        onError (error) {
          this.decoder?.destroy(error)

          this.context.terminate({ reason: error })

          if (!response) {
            resolve(makeNetworkError(error))
          }
        }
      }
    )
  })
}

module.exports = fetch


/***/ }),

/***/ 8359:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";
/* globals AbortController */



const { extractBody, mixinBody, cloneBody } = __nccwpck_require__(1472)
const { Headers, fill: fillHeaders, HeadersList } = __nccwpck_require__(554)
const util = __nccwpck_require__(3983)
const {
  isValidHTTPToken,
  EnvironmentSettingsObject,
  toUSVString
} = __nccwpck_require__(2538)
const {
  forbiddenMethods,
  corsSafeListedMethods,
  referrerPolicy,
  requestRedirect,
  requestMode,
  requestCredentials,
  requestCache
} = __nccwpck_require__(1037)
const { kEnumerableProperty } = util
const { kHeaders, kSignal, kState, kGuard, kRealm } = __nccwpck_require__(5861)
const { kHeadersList } = __nccwpck_require__(2785)
const assert = __nccwpck_require__(9491)

let TransformStream

const kInit = Symbol('init')

const requestFinalizer = new FinalizationRegistry(({ signal, abort }) => {
  signal.removeEventListener('abort', abort)
})

// https://fetch.spec.whatwg.org/#request-class
class Request {
  // https://fetch.spec.whatwg.org/#dom-request
  constructor (...args) {
    if (args[0] === kInit) {
      return
    }

    if (args.length < 1) {
      throw new TypeError(
        `Failed to construct 'Request': 1 argument required, but only ${args.length} present.`
      )
    }
    if (
      args.length >= 1 &&
      typeof args[1] !== 'object' &&
      args[1] !== undefined
    ) {
      throw new TypeError(
        "Failed to construct 'Request': cannot convert to dictionary."
      )
    }
    const input = args[0] instanceof Request ? args[0] : toUSVString(args[0])
    const init = args.length >= 1 ? args[1] ?? {} : {}

    // TODO
    this[kRealm] = { settingsObject: {} }

    // 1. Let request be null.
    let request = null

    // 2. Let fallbackMode be null.
    let fallbackMode = null

    // 3. Let baseURL be this’s relevant settings object’s API base URL.
    const baseUrl = this[kRealm].settingsObject.baseUrl

    // 4. Let signal be null.
    let signal = null

    // 5. If input is a string, then:
    if (typeof input === 'string') {
      // 1. Let parsedURL be the result of parsing input with baseURL.
      // 2. If parsedURL is failure, then throw a TypeError.
      let parsedURL
      try {
        parsedURL = new URL(input, baseUrl)
      } catch (err) {
        const error = new TypeError('Failed to parse URL from ' + input)
        error.cause = err
        throw error
      }

      // 3. If parsedURL includes credentials, then throw a TypeError.
      if (parsedURL.username || parsedURL.password) {
        throw new TypeError(
          'Request cannot be constructed from a URL that includes credentials: ' +
            input
        )
      }

      // 4. Set request to a new request whose URL is parsedURL.
      request = makeRequest({ urlList: [parsedURL] })

      // 5. Set fallbackMode to "cors".
      fallbackMode = 'cors'
    } else {
      // 6. Otherwise:

      // 7. Assert: input is a Request object.
      assert(input instanceof Request)

      // 8. Set request to input’s request.
      request = input[kState]

      // 9. Set signal to input’s signal.
      signal = input[kSignal]
    }

    // 7. Let origin be this’s relevant settings object’s origin.
    const origin = this[kRealm].settingsObject.origin

    // 8. Let window be "client".
    let window = 'client'

    // 9. If request’s window is an environment settings object and its origin
    // is same origin with origin, then set window to request’s window.
    if (
      request.window instanceof EnvironmentSettingsObject &&
      sameOrigin(request.window, origin)
    ) {
      window = request.window
    }

    // 10. If init["window"] exists and is non-null, then throw a TypeError.
    if ('window' in init && window != null) {
      throw new TypeError(`'window' option '${window}' must be null`)
    }

    // 11. If init["window"] exists, then set window to "no-window".
    if ('window' in init) {
      window = 'no-window'
    }

    // 12. Set request to a new request with the following properties:
    request = makeRequest({
      // URL request’s URL.
      // undici implementation note: this is set as the first item in request's urlList in makeRequest
      // method request’s method.
      method: request.method,
      // header list A copy of request’s header list.
      // undici implementation note: headersList is cloned in makeRequest
      headersList: request.headersList,
      // unsafe-request flag Set.
      unsafeRequest: request.unsafeRequest,
      // client This’s relevant settings object.
      client: request.client,
      // window window.
      window,
      // priority request’s priority.
      priority: request.priority,
      // origin request’s origin. The propagation of the origin is only significant for navigation requests
      // being handled by a service worker. In this scenario a request can have an origin that is different
      // from the current client.
      origin: request.origin,
      // referrer request’s referrer.
      referrer: request.referrer,
      // referrer policy request’s referrer policy.
      referrerPolicy: request.referrerPolicy,
      // mode request’s mode.
      mode: request.mode,
      // credentials mode request’s credentials mode.
      credentials: request.credentials,
      // cache mode request’s cache mode.
      cache: request.cache,
      // redirect mode request’s redirect mode.
      redirect: request.redirect,
      // integrity metadata request’s integrity metadata.
      integrity: request.integrity,
      // keepalive request’s keepalive.
      keepalive: request.keepalive,
      // reload-navigation flag request’s reload-navigation flag.
      reloadNavigation: request.reloadNavigation,
      // history-navigation flag request’s history-navigation flag.
      historyNavigation: request.historyNavigation,
      // URL list A clone of request’s URL list.
      // undici implementation note: urlList is cloned in makeRequest
      urlList: request.urlList
    })

    // 13. If init is not empty, then:
    if (Object.keys(init).length > 0) {
      // 1. If request’s mode is "navigate", then set it to "same-origin".
      if (request.mode === 'navigate') {
        request.mode = 'same-origin'
      }

      // 2. Unset request’s reload-navigation flag.
      request.reloadNavigation = false

      // 3. Unset request’s history-navigation flag.
      request.historyNavigation = false

      // 4. Set request’s origin to "client".
      request.origin = 'client'

      // 5. Set request’s referrer to "client"
      request.referrer = 'client'

      // 6. Set request’s referrer policy to the empty string.
      request.referrerPolicy = ''

      // 7. Set request’s URL to request’s current URL.
      request.url = request.urlList[request.urlList.length - 1]

      // 8. Set request’s URL list to « request’s URL ».
      request.urlList = [request.url]
    }

    // 14. If init["referrer"] exists, then:
    if ('referrer' in init) {
      // 1. Let referrer be init["referrer"].
      const referrer = init.referrer

      // 2. If referrer is the empty string, then set request’s referrer to "no-referrer".
      if (referrer === '') {
        request.referrer = 'no-referrer'
      } else {
        // 1. Let parsedReferrer be the result of parsing referrer with
        // baseURL.
        // 2. If parsedReferrer is failure, then throw a TypeError.
        let parsedReferrer
        try {
          parsedReferrer = new URL(referrer, baseUrl)
        } catch (err) {
          const error = new TypeError(
            `Referrer "${referrer}" is not a valid URL.`
          )
          error.cause = err
          throw error
        }

        // 3. If one of the following is true
        // parsedReferrer’s cannot-be-a-base-URL is true, scheme is "about",
        // and path contains a single string "client"
        // parsedReferrer’s origin is not same origin with origin
        // then set request’s referrer to "client".
        // TODO

        // 4. Otherwise, set request’s referrer to parsedReferrer.
        request.referrer = parsedReferrer
      }
    }

    // 15. If init["referrerPolicy"] exists, then set request’s referrer policy
    // to it.
    if ('referrerPolicy' in init) {
      request.referrerPolicy = init.referrerPolicy
      if (!referrerPolicy.includes(request.referrerPolicy)) {
        throw new TypeError(
          `Failed to construct 'Request': The provided value '${request.referrerPolicy}' is not a valid enum value of type ReferrerPolicy.`
        )
      }
    }

    // 16. Let mode be init["mode"] if it exists, and fallbackMode otherwise.
    let mode
    if ('mode' in init) {
      mode = init.mode
      if (!requestMode.includes(mode)) {
        throw new TypeError(
          `Failed to construct 'Request': The provided value '${request.mode}' is not a valid enum value of type RequestMode.`
        )
      }
    } else {
      mode = fallbackMode
    }

    // 17. If mode is "navigate", then throw a TypeError.
    if (mode === 'navigate') {
      throw new TypeError()
    }

    // 18. If mode is non-null, set request’s mode to mode.
    if (mode != null) {
      request.mode = mode
    }

    // 19. If init["credentials"] exists, then set request’s credentials mode
    // to it.
    if ('credentials' in init) {
      request.credentials = init.credentials
      if (!requestCredentials.includes(request.credentials)) {
        throw new TypeError(
          `Failed to construct 'Request': The provided value '${request.credentials}' is not a valid enum value of type RequestCredentials.`
        )
      }
    }

    // 18. If init["cache"] exists, then set request’s cache mode to it.
    if ('cache' in init) {
      request.cache = init.cache
      if (!requestCache.includes(request.cache)) {
        throw new TypeError(
          `Failed to construct 'Request': The provided value '${request.cache}' is not a valid enum value of type RequestCache.`
        )
      }
    }

    // 21. If request’s cache mode is "only-if-cached" and request’s mode is
    // not "same-origin", then throw a TypeError.
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
      throw new TypeError(
        "'only-if-cached' can be set only with 'same-origin' mode"
      )
    }

    // 22. If init["redirect"] exists, then set request’s redirect mode to it.
    if ('redirect' in init) {
      request.redirect = init.redirect
      if (!requestRedirect.includes(request.redirect)) {
        throw new TypeError(
          `Failed to construct 'Request': The provided value '${request.redirect}' is not a valid enum value of type RequestRedirect.`
        )
      }
    }

    // 23. If init["integrity"] exists, then set request’s integrity metadata to it.
    if ('integrity' in init && init.integrity != null) {
      request.integrity = String(init.integrity)
    }

    // 24. If init["keepalive"] exists, then set request’s keepalive to it.
    if ('keepalive' in init) {
      request.keepalive = Boolean(init.keepalive)
    }

    // 25. If init["method"] exists, then:
    if ('method' in init) {
      // 1. Let method be init["method"].
      let method = init.method

      // 2. If method is not a method or method is a forbidden method, then
      // throw a TypeError.
      if (!isValidHTTPToken(init.method)) {
        throw TypeError(`'${init.method}' is not a valid HTTP method.`)
      }

      if (forbiddenMethods.indexOf(method.toUpperCase()) !== -1) {
        throw TypeError(`'${init.method}' HTTP method is unsupported.`)
      }

      // 3. Normalize method.
      // https://fetch.spec.whatwg.org/#concept-method-normalize
      method = init.method.toUpperCase()

      // 4. Set request’s method to method.
      request.method = method
    }

    // 26. If init["signal"] exists, then set signal to it.
    if ('signal' in init) {
      signal = init.signal
    }

    // 27. Set this’s request to request.
    this[kState] = request

    // 28. Set this’s signal to a new AbortSignal object with this’s relevant
    // Realm.
    const ac = new AbortController()
    this[kSignal] = ac.signal
    this[kSignal][kRealm] = this[kRealm]

    // 29. If signal is not null, then make this’s signal follow signal.
    if (signal != null) {
      if (
        !signal ||
        typeof signal.aborted !== 'boolean' ||
        typeof signal.addEventListener !== 'function'
      ) {
        throw new TypeError(
          "Failed to construct 'Request': member signal is not of type AbortSignal."
        )
      }

      if (signal.aborted) {
        ac.abort()
      } else {
        const abort = () => ac.abort()
        signal.addEventListener('abort', abort, { once: true })
        requestFinalizer.register(this, { signal, abort })
      }
    }

    // 30. Set this’s headers to a new Headers object with this’s relevant
    // Realm, whose header list is request’s header list and guard is
    // "request".
    this[kHeaders] = new Headers()
    this[kHeaders][kGuard] = 'request'
    this[kHeaders][kHeadersList] = request.headersList
    this[kHeaders][kRealm] = this[kRealm]

    // 31. If this’s request’s mode is "no-cors", then:
    if (mode === 'no-cors') {
      // 1. If this’s request’s method is not a CORS-safelisted method,
      // then throw a TypeError.
      if (!corsSafeListedMethods.includes(request.method)) {
        throw new TypeError(
          `'${request.method} is unsupported in no-cors mode.`
        )
      }

      // 2. Set this’s headers’s guard to "request-no-cors".
      this[kHeaders][kGuard] = 'request-no-cors'
    }

    // 32. If init is not empty, then:
    if (Object.keys(init).length !== 0) {
      // 1. Let headers be a copy of this’s headers and its associated header
      // list.
      let headers = new Headers(this.headers)

      // 2. If init["headers"] exists, then set headers to init["headers"].
      if ('headers' in init) {
        headers = init.headers
      }

      // 3. Empty this’s headers’s header list.
      this[kState].headersList = new HeadersList()
      this[kHeaders][kHeadersList] = this[kState].headersList

      // 4. If headers is a Headers object, then for each header in its header
      // list, append header’s name/header’s value to this’s headers.
      if (headers instanceof Headers) {
        this[kState].headersList.push(...headers[kHeadersList])
      } else {
        // 5. Otherwise, fill this’s headers with headers.
        fillHeaders(this[kState].headersList, headers)
      }
    }

    // 33. Let inputBody be input’s request’s body if input is a Request
    // object; otherwise null.
    const inputBody = input instanceof Request ? input[kState].body : null

    // 34. If either init["body"] exists and is non-null or inputBody is
    // non-null, and request’s method is `GET` or `HEAD`, then throw a
    // TypeError.
    if (
      (('body' in init && init.body != null) || inputBody != null) &&
      (request.method === 'GET' || request.method === 'HEAD')
    ) {
      throw new TypeError('Request with GET/HEAD method cannot have body.')
    }

    // 35. Let initBody be null.
    let initBody = null

    // 36. If init["body"] exists and is non-null, then:
    if ('body' in init && init.body != null) {
      // 1. Let Content-Type be null.
      // 2. Set initBody and Content-Type to the result of extracting
      // init["body"], with keepalive set to request’s keepalive.
      const [extractedBody, contentType] = extractBody(
        init.body,
        request.keepalive
      )
      initBody = extractedBody

      // 3, If Content-Type is non-null and this’s headers’s header list does
      // not contain `Content-Type`, then append `Content-Type`/Content-Type to
      // this’s headers.
      if (contentType && !this[kHeaders].has('content-type')) {
        this[kHeaders].append('content-type', contentType)
      }
    }

    // 37. Let inputOrInitBody be initBody if it is non-null; otherwise
    // inputBody.
    const inputOrInitBody = initBody ?? inputBody

    // 38. If inputOrInitBody is non-null and inputOrInitBody’s source is
    // null, then:
    if (inputOrInitBody != null && inputOrInitBody.source == null) {
      // 1. If this’s request’s mode is neither "same-origin" nor "cors",
      // then throw a TypeError.
      if (request.mode !== 'same-origin' && request.mode !== 'cors') {
        throw new TypeError(
          'If request is made from ReadableStream, mode should be "same-origin" or "cors"'
        )
      }

      // 2. Set this’s request’s use-CORS-preflight flag.
      request.useCORSPreflightFlag = true
    }

    // 39. Let finalBody be inputOrInitBody.
    let finalBody = inputOrInitBody

    // 40. If initBody is null and inputBody is non-null, then:
    if (initBody == null && inputBody != null) {
      // 1. If input is unusable, then throw a TypeError.
      if (util.isDisturbed(inputBody.stream) || inputBody.stream.locked) {
        throw new TypeError(
          'Cannot construct a Request with a Request object that has already been used.'
        )
      }

      // 2. Set finalBody to the result of creating a proxy for inputBody.
      if (!TransformStream) {
        TransformStream = (__nccwpck_require__(5356).TransformStream)
      }

      // https://streams.spec.whatwg.org/#readablestream-create-a-proxy
      const identityTransform = new TransformStream()
      inputBody.stream.pipeThrough(identityTransform)
      finalBody = {
        source: inputBody.source,
        length: inputBody.length,
        stream: identityTransform.readable
      }
    }

    // 41. Set this’s request’s body to finalBody.
    this[kState].body = finalBody
  }

  get [Symbol.toStringTag] () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    return this.constructor.name
  }

  // Returns request’s HTTP method, which is "GET" by default.
  get method () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The method getter steps are to return this’s request’s method.
    return this[kState].method
  }

  // Returns the URL of request as a string.
  get url () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The url getter steps are to return this’s request’s URL, serialized.
    return this[kState].url.toString()
  }

  // Returns a Headers object consisting of the headers associated with request.
  // Note that headers added in the network layer by the user agent will not
  // be accounted for in this object, e.g., the "Host" header.
  get headers () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The headers getter steps are to return this’s headers.
    return this[kHeaders]
  }

  // Returns the kind of resource requested by request, e.g., "document"
  // or "script".
  get destination () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The destination getter are to return this’s request’s destination.
    return this[kState].destination
  }

  // Returns the referrer of request. Its value can be a same-origin URL if
  // explicitly set in init, the empty string to indicate no referrer, and
  // "about:client" when defaulting to the global’s default. This is used
  // during fetching to determine the value of the `Referer` header of the
  // request being made.
  get referrer () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // 1. If this’s request’s referrer is "no-referrer", then return the
    // empty string.
    if (this[kState].referrer === 'no-referrer') {
      return ''
    }

    // 2. If this’s request’s referrer is "client", then return
    // "about:client".
    if (this[kState].referrer === 'client') {
      return 'about:client'
    }

    // Return this’s request’s referrer, serialized.
    return this[kState].referrer.toString()
  }

  // Returns the referrer policy associated with request.
  // This is used during fetching to compute the value of the request’s
  // referrer.
  get referrerPolicy () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The referrerPolicy getter steps are to return this’s request’s referrer policy.
    return this[kState].referrerPolicy
  }

  // Returns the mode associated with request, which is a string indicating
  // whether the request will use CORS, or will be restricted to same-origin
  // URLs.
  get mode () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The mode getter steps are to return this’s request’s mode.
    return this[kState].mode
  }

  // Returns the credentials mode associated with request,
  // which is a string indicating whether credentials will be sent with the
  // request always, never, or only when sent to a same-origin URL.
  get credentials () {
    // The credentials getter steps are to return this’s request’s credentials mode.
    return this[kState].credentials
  }

  // Returns the cache mode associated with request,
  // which is a string indicating how the request will
  // interact with the browser’s cache when fetching.
  get cache () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The cache getter steps are to return this’s request’s cache mode.
    return this[kState].cache
  }

  // Returns the redirect mode associated with request,
  // which is a string indicating how redirects for the
  // request will be handled during fetching. A request
  // will follow redirects by default.
  get redirect () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The redirect getter steps are to return this’s request’s redirect mode.
    return this[kState].redirect
  }

  // Returns request’s subresource integrity metadata, which is a
  // cryptographic hash of the resource being fetched. Its value
  // consists of multiple hashes separated by whitespace. [SRI]
  get integrity () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The integrity getter steps are to return this’s request’s integrity
    // metadata.
    return this[kState].integrity
  }

  // Returns a boolean indicating whether or not request can outlive the
  // global in which it was created.
  get keepalive () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The keepalive getter steps are to return this’s request’s keepalive.
    return this[kState].keepalive
  }

  // Returns a boolean indicating whether or not request is for a reload
  // navigation.
  get isReloadNavigation () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The isReloadNavigation getter steps are to return true if this’s
    // request’s reload-navigation flag is set; otherwise false.
    return this[kState].reloadNavigation
  }

  // Returns a boolean indicating whether or not request is for a history
  // navigation (a.k.a. back-foward navigation).
  get isHistoryNavigation () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The isHistoryNavigation getter steps are to return true if this’s request’s
    // history-navigation flag is set; otherwise false.
    return this[kState].historyNavigation
  }

  // Returns the signal associated with request, which is an AbortSignal
  // object indicating whether or not request has been aborted, and its
  // abort event handler.
  get signal () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // The signal getter steps are to return this’s signal.
    return this[kSignal]
  }

  // Returns a clone of request.
  clone () {
    if (!(this instanceof Request)) {
      throw new TypeError('Illegal invocation')
    }

    // 1. If this is unusable, then throw a TypeError.
    if (this.bodyUsed || (this.body && this.body.locked)) {
      throw new TypeError('unusable')
    }

    // 2. Let clonedRequest be the result of cloning this’s request.
    const clonedRequest = cloneRequest(this[kState])

    // 3. Let clonedRequestObject be the result of creating a Request object,
    // given clonedRequest, this’s headers’s guard, and this’s relevant Realm.
    const clonedRequestObject = new Request(kInit)
    clonedRequestObject[kState] = clonedRequest
    clonedRequestObject[kRealm] = this[kRealm]
    clonedRequestObject[kHeaders] = new Headers()
    clonedRequestObject[kHeaders][kHeadersList] = clonedRequest.headersList
    clonedRequestObject[kHeaders][kGuard] = this[kHeaders][kGuard]
    clonedRequestObject[kHeaders][kRealm] = this[kHeaders][kRealm]

    // 4. Make clonedRequestObject’s signal follow this’s signal.
    const ac = new AbortController()
    if (this.signal.aborted) {
      ac.abort()
    } else {
      this.signal.addEventListener(
        'abort',
        function () {
          ac.abort()
        },
        { once: true }
      )
    }
    clonedRequestObject[kSignal] = ac.signal

    // 4. Return clonedRequestObject.
    return clonedRequestObject
  }
}

mixinBody(Request.prototype)

function makeRequest (init) {
  // https://fetch.spec.whatwg.org/#requests
  const request = {
    method: 'GET',
    localURLsOnly: false,
    unsafeRequest: false,
    body: null,
    client: null,
    reservedClient: null,
    replacesClientId: '',
    window: 'client',
    keepalive: false,
    serviceWorkers: 'all',
    initiator: '',
    destination: '',
    priority: null,
    origin: 'client',
    policyContainer: 'client',
    referrer: 'client',
    referrerPolicy: '',
    mode: 'no-cors',
    useCORSPreflightFlag: false,
    credentials: 'same-origin',
    useCredentials: false,
    cache: 'default',
    redirect: 'follow',
    integrity: '',
    cryptoGraphicsNonceMetadata: '',
    parserMetadata: '',
    reloadNavigation: false,
    historyNavigation: false,
    userActivation: false,
    taintedOrigin: false,
    redirectCount: 0,
    responseTainting: 'basic',
    preventNoCacheCacheControlHeaderModification: false,
    done: false,
    timingAllowFailed: false,
    ...init,
    headersList: init.headersList
      ? new HeadersList(...init.headersList)
      : new HeadersList(),
    urlList: init.urlList ? [...init.urlList.map((url) => new URL(url))] : []
  }
  request.url = request.urlList[0]
  return request
}

// https://fetch.spec.whatwg.org/#concept-request-clone
function cloneRequest (request) {
  // To clone a request request, run these steps:

  // 1. Let newRequest be a copy of request, except for its body.
  const newRequest = makeRequest({ ...request, body: null })

  // 2. If request’s body is non-null, set newRequest’s body to the
  // result of cloning request’s body.
  if (request.body != null) {
    newRequest.body = cloneBody(request.body)
  }

  // 3. Return newRequest.
  return newRequest
}

Object.defineProperties(Request.prototype, {
  method: kEnumerableProperty,
  url: kEnumerableProperty,
  headers: kEnumerableProperty,
  redirect: kEnumerableProperty,
  clone: kEnumerableProperty,
  signal: kEnumerableProperty
})

module.exports = { Request, makeRequest }


/***/ }),

/***/ 7823:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { Headers, HeadersList, fill } = __nccwpck_require__(554)
const { extractBody, cloneBody, mixinBody } = __nccwpck_require__(1472)
const util = __nccwpck_require__(3983)
const { kEnumerableProperty } = util
const { responseURL, isValidReasonPhrase, toUSVString } = __nccwpck_require__(2538)
const {
  redirectStatus,
  nullBodyStatus,
  forbiddenResponseHeaderNames
} = __nccwpck_require__(1037)
const { kState, kHeaders, kGuard, kRealm } = __nccwpck_require__(5861)
const { kHeadersList } = __nccwpck_require__(2785)
const assert = __nccwpck_require__(9491)

// https://fetch.spec.whatwg.org/#response-class
class Response {
  // Creates network error Response.
  static error () {
    // TODO
    const relevantRealm = { settingsObject: {} }

    // The static error() method steps are to return the result of creating a
    // Response object, given a new network error, "immutable", and this’s
    // relevant Realm.
    const responseObject = new Response()
    responseObject[kState] = makeNetworkError()
    responseObject[kRealm] = relevantRealm
    responseObject[kHeaders][kHeadersList] = responseObject[kState].headersList
    responseObject[kHeaders][kGuard] = 'immutable'
    responseObject[kHeaders][kRealm] = relevantRealm
    return responseObject
  }

  // Creates a redirect Response that redirects to url with status status.
  static redirect (...args) {
    const relevantRealm = { settingsObject: {} }

    if (args.length < 1) {
      throw new TypeError(
        `Failed to execute 'redirect' on 'Response': 1 argument required, but only ${args.length} present.`
      )
    }

    const status = args.length >= 2 ? args[1] : 302
    const url = toUSVString(args[0])

    // 1. Let parsedURL be the result of parsing url with current settings
    // object’s API base URL.
    // 2. If parsedURL is failure, then throw a TypeError.
    // TODO: base-URL?
    let parsedURL
    try {
      parsedURL = new URL(url)
    } catch (err) {
      throw Object.assign(new TypeError('Failed to parse URL from ' + url), {
        cause: err
      })
    }

    // 3. If status is not a redirect status, then throw a RangeError.
    if (!redirectStatus.includes(status)) {
      throw new RangeError('Invalid status code')
    }

    // 4. Let responseObject be the result of creating a Response object,
    // given a new response, "immutable", and this’s relevant Realm.
    const responseObject = new Response()
    responseObject[kRealm] = relevantRealm
    responseObject[kHeaders][kGuard] = 'immutable'
    responseObject[kHeaders][kRealm] = relevantRealm

    // 5. Set responseObject’s response’s status to status.
    responseObject[kState].status = status

    // 6. Let value be parsedURL, serialized and isomorphic encoded.
    // TODO: isomorphic encoded?
    const value = parsedURL.toString()

    // 7. Append `Location`/value to responseObject’s response’s header list.
    responseObject[kState].headersList.push('location', value)

    // 8. Return responseObject.
    return responseObject
  }

  // https://fetch.spec.whatwg.org/#dom-response
  constructor (...args) {
    if (
      args.length >= 1 &&
      typeof args[1] !== 'object' &&
      args[1] !== undefined
    ) {
      throw new TypeError(
        "Failed to construct 'Request': cannot convert to dictionary."
      )
    }

    const body = args.length >= 1 ? args[0] : null
    const init = args.length >= 2 ? args[1] ?? {} : {}

    // TODO
    this[kRealm] = { settingsObject: {} }

    // 1. If init["status"] is not in the range 200 to 599, inclusive, then
    // throw a RangeError.
    if ('status' in init && init.status !== undefined) {
      if (!Number.isFinite(init.status)) {
        throw new TypeError()
      }

      if (init.status < 200 || init.status > 599) {
        throw new RangeError(
          `Failed to construct 'Response': The status provided (${init.status}) is outside the range [200, 599].`
        )
      }
    }

    if ('statusText' in init && init.statusText !== undefined) {
      // 2. If init["statusText"] does not match the reason-phrase token
      // production, then throw a TypeError.
      // See, https://datatracker.ietf.org/doc/html/rfc7230#section-3.1.2:
      //   reason-phrase  = *( HTAB / SP / VCHAR / obs-text )
      if (!isValidReasonPhrase(String(init.statusText))) {
        throw new TypeError('Invalid statusText')
      }
    }

    // 3. Set this’s response to a new response.
    this[kState] = makeResponse({})

    // 4. Set this’s headers to a new Headers object with this’s relevant
    // Realm, whose header list is this’s response’s header list and guard
    // is "response".
    this[kHeaders] = new Headers()
    this[kHeaders][kGuard] = 'response'
    this[kHeaders][kHeadersList] = this[kState].headersList
    this[kHeaders][kRealm] = this[kRealm]

    // 5. Set this’s response’s status to init["status"].
    if ('status' in init && init.status !== undefined) {
      this[kState].status = init.status
    }

    // 6. Set this’s response’s status message to init["statusText"].
    if ('statusText' in init && init.statusText !== undefined) {
      this[kState].statusText = String(init.statusText)
    }

    // 7. If init["headers"] exists, then fill this’s headers with init["headers"].
    if ('headers' in init) {
      fill(this[kState].headersList, init.headers)
    }

    // 8. If body is non-null, then:
    if (body != null) {
      // 1. If init["status"] is a null body status, then throw a TypeError.
      if (nullBodyStatus.includes(init.status)) {
        throw new TypeError('Response with null body status cannot have body')
      }

      // 2. Let Content-Type be null.
      // 3. Set this’s response’s body and Content-Type to the result of
      // extracting body.
      const [extractedBody, contentType] = extractBody(body)
      this[kState].body = extractedBody

      // 4. If Content-Type is non-null and this’s response’s header list does
      // not contain `Content-Type`, then append `Content-Type`/Content-Type
      // to this’s response’s header list.
      if (contentType && !this.headers.has('content-type')) {
        this.headers.set('content-type', contentType)
      }
    }
  }

  get [Symbol.toStringTag] () {
    if (!(this instanceof Response)) {
      throw new TypeError('Illegal invocation')
    }

    return this.constructor.name
  }

  // Returns response’s type, e.g., "cors".
  get type () {
    if (!(this instanceof Response)) {
      throw new TypeError('Illegal invocation')
    }

    // The type getter steps are to return this’s response’s type.
    return this[kState].type
  }

  // Returns response’s URL, if it has one; otherwise the empty string.
  get url () {
    if (!(this instanceof Response)) {
      throw new TypeError('Illegal invocation')
    }

    // The url getter steps are to return the empty string if this’s
    // response’s URL is null; otherwise this’s response’s URL,
    // serialized with exclude fragment set to true.
    let url = responseURL(this[kState])

    if (url == null) {
      return ''
    }

    if (url.hash) {
      url = new URL(url)
      url.hash = ''
    }

    return url.toString()
  }

  // Returns whether response was obtained through a redirect.
  get redirected () {
    if (!(this instanceof Response)) {
      throw new TypeError('Illegal invocation')
    }

    // The redirected getter steps are to return true if this’s response’s URL
    // list has more than one item; otherwise false.
    return this[kState].urlList.length > 1
  }

  // Returns response’s status.
  get status () {
    if (!(this instanceof Response)) {
      throw new TypeError('Illegal invocation')
    }

    // The status getter steps are to return this’s response’s status.
    return this[kState].status
  }

  // Returns whether response’s status is an ok status.
  get ok () {
    if (!(this instanceof Response)) {
      throw new TypeError('Illegal invocation')
    }

    // The ok getter steps are to return true if this’s response’s status is an
    // ok status; otherwise false.
    return this[kState].status >= 200 && this[kState].status <= 299
  }

  // Returns response’s status message.
  get statusText () {
    if (!(this instanceof Response)) {
      throw new TypeError('Illegal invocation')
    }

    // The statusText getter steps are to return this’s response’s status
    // message.
    return this[kState].statusText
  }

  // Returns response’s headers as Headers.
  get headers () {
    if (!(this instanceof Response)) {
      throw new TypeError('Illegal invocation')
    }

    // The headers getter steps are to return this’s headers.
    return this[kHeaders]
  }

  // Returns a clone of response.
  clone () {
    if (!(this instanceof Response)) {
      throw new TypeError('Illegal invocation')
    }

    // 1. If this is unusable, then throw a TypeError.
    if (this.bodyUsed || (this.body && this.body.locked)) {
      throw new TypeError()
    }

    // 2. Let clonedResponse be the result of cloning this’s response.
    const clonedResponse = cloneResponse(this[kState])

    // 3. Return the result of creating a Response object, given
    // clonedResponse, this’s headers’s guard, and this’s relevant Realm.
    const clonedResponseObject = new Response()
    clonedResponseObject[kState] = clonedResponse
    clonedResponseObject[kRealm] = this[kRealm]
    clonedResponseObject[kHeaders][kHeadersList] = clonedResponse.headersList
    clonedResponseObject[kHeaders][kGuard] = this[kHeaders][kGuard]
    clonedResponseObject[kHeaders][kRealm] = this[kHeaders][kRealm]

    return clonedResponseObject
  }
}
mixinBody(Response.prototype)

Object.defineProperties(Response.prototype, {
  type: kEnumerableProperty,
  url: kEnumerableProperty,
  status: kEnumerableProperty,
  ok: kEnumerableProperty,
  redirected: kEnumerableProperty,
  statusText: kEnumerableProperty,
  headers: kEnumerableProperty,
  clone: kEnumerableProperty
})

// https://fetch.spec.whatwg.org/#concept-response-clone
function cloneResponse (response) {
  // To clone a response response, run these steps:

  // 1. If response is a filtered response, then return a new identical
  // filtered response whose internal response is a clone of response’s
  // internal response.
  if (response.internalResponse) {
    return filterResponse(
      cloneResponse(response.internalResponse),
      response.type
    )
  }

  // 2. Let newResponse be a copy of response, except for its body.
  const newResponse = makeResponse({ ...response, body: null })

  // 3. If response’s body is non-null, then set newResponse’s body to the
  // result of cloning response’s body.
  if (response.body != null) {
    newResponse.body = cloneBody(response.body)
  }

  // 4. Return newResponse.
  return newResponse
}

function makeResponse (init) {
  return {
    internalResponse: null,
    aborted: false,
    rangeRequested: false,
    timingAllowPassed: false,
    type: 'default',
    status: 200,
    timingInfo: null,
    cacheState: '',
    statusText: '',
    ...init,
    headersList: init.headersList
      ? new HeadersList(...init.headersList)
      : new HeadersList(),
    urlList: init.urlList ? [...init.urlList] : []
  }
}

function makeNetworkError (reason) {
  return makeResponse({
    type: 'error',
    status: 0,
    error:
      reason instanceof Error
        ? reason
        : new Error(reason ? String(reason) : reason),
    aborted: reason && reason.name === 'AbortError'
  })
}

// https://fetch.spec.whatwg.org/#concept-filtered-response
function filterResponse (response, type) {
  // Set response to the following filtered response with response as its
  // internal response, depending on request’s response tainting:
  if (type === 'basic') {
    // A basic filtered response is a filtered response whose type is "basic"
    // and header list excludes any headers in internal response’s header list
    // whose name is a forbidden response-header name.

    const headers = []
    for (let n = 0; n < response.headersList.length; n += 2) {
      if (!forbiddenResponseHeaderNames.includes(response.headersList[n])) {
        headers.push(response.headersList[n + 0], response.headersList[n + 1])
      }
    }

    return makeResponse({
      ...response,
      internalResponse: response,
      headersList: new HeadersList(...headers),
      type: 'basic'
    })
  } else if (type === 'cors') {
    // A CORS filtered response is a filtered response whose type is "cors"
    // and header list excludes any headers in internal response’s header
    // list whose name is not a CORS-safelisted response-header name, given
    // internal response’s CORS-exposed header-name list.

    // TODO: This is not correct...
    return makeResponse({
      ...response,
      internalResponse: response,
      type: 'cors'
    })
  } else if (type === 'opaque') {
    // An opaque filtered response is a filtered response whose type is
    // "opaque", URL list is the empty list, status is 0, status message
    // is the empty byte sequence, header list is empty, and body is null.

    return makeResponse({
      ...response,
      internalResponse: response,
      type: 'opaque',
      urlList: [],
      status: 0,
      statusText: '',
      body: null
    })
  } else if (type === 'opaqueredirect') {
    // An opaque-redirect filtered response is a filtered response whose type
    // is "opaqueredirect", status is 0, status message is the empty byte
    // sequence, header list is empty, and body is null.

    return makeResponse({
      ...response,
      internalResponse: response,
      type: 'opaqueredirect',
      status: 0,
      statusText: '',
      headersList: new HeadersList(),
      body: null
    })
  } else {
    assert(false)
  }
}

module.exports = { makeNetworkError, makeResponse, filterResponse, Response }


/***/ }),

/***/ 5861:
/***/ ((module) => {

"use strict";


module.exports = {
  kUrl: Symbol('url'),
  kHeaders: Symbol('headers'),
  kSignal: Symbol('signal'),
  kState: Symbol('state'),
  kGuard: Symbol('guard'),
  kRealm: Symbol('realm')
}


/***/ }),

/***/ 2538:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { redirectStatus } = __nccwpck_require__(1037)
const { performance } = __nccwpck_require__(4074)
const { isBlobLike, toUSVString, ReadableStreamFrom } = __nccwpck_require__(3983)

let File

// https://fetch.spec.whatwg.org/#block-bad-port
const badPorts = [
  '1', '7', '9', '11', '13', '15', '17', '19', '20', '21', '22', '23', '25', '37', '42', '43', '53', '69', '77', '79',
  '87', '95', '101', '102', '103', '104', '109', '110', '111', '113', '115', '117', '119', '123', '135', '137',
  '139', '143', '161', '179', '389', '427', '465', '512', '513', '514', '515', '526', '530', '531', '532',
  '540', '548', '554', '556', '563', '587', '601', '636', '989', '990', '993', '995', '1719', '1720', '1723',
  '2049', '3659', '4045', '5060', '5061', '6000', '6566', '6665', '6666', '6667', '6668', '6669', '6697',
  '10080'
]

function responseURL (response) {
  // https://fetch.spec.whatwg.org/#responses
  // A response has an associated URL. It is a pointer to the last URL
  // in response’s URL list and null if response’s URL list is empty.
  const urlList = response.urlList
  const length = urlList.length
  return length === 0 ? null : urlList[length - 1].toString()
}

// https://fetch.spec.whatwg.org/#concept-response-location-url
function responseLocationURL (response, requestFragment) {
  // 1. If response’s status is not a redirect status, then return null.
  if (!redirectStatus.includes(response.status)) {
    return null
  }

  // 2. Let location be the result of extracting header list values given
  // `Location` and response’s header list.
  let location = response.headersList.get('location')

  // 3. If location is a value, then set location to the result of parsing
  // location with response’s URL.
  location = location ? new URL(location, responseURL(response)) : null

  // 4. If location is a URL whose fragment is null, then set location’s
  // fragment to requestFragment.
  if (location && !location.hash) {
    location.hash = requestFragment
  }

  // 5. Return location.
  return location
}

/** @returns {URL} */
function requestCurrentURL (request) {
  return request.urlList[request.urlList.length - 1]
}

function requestBadPort (request) {
  // 1. Let url be request’s current URL.
  const url = requestCurrentURL(request)

  // 2. If url’s scheme is an HTTP(S) scheme and url’s port is a bad port,
  // then return blocked.
  if (/^https?:/.test(url.protocol) && badPorts.includes(url.port)) {
    return 'blocked'
  }

  // 3. Return allowed.
  return 'allowed'
}

function isFileLike (object) {
  if (!File) {
    File = (__nccwpck_require__(8511).File)
  }
  return object instanceof File || (
    object &&
    (typeof object.stream === 'function' ||
     typeof object.arrayBuffer === 'function') &&
    /^(File)$/.test(object[Symbol.toStringTag])
  )
}

// Check whether |statusText| is a ByteString and
// matches the Reason-Phrase token production.
// RFC 2616: https://tools.ietf.org/html/rfc2616
// RFC 7230: https://tools.ietf.org/html/rfc7230
// "reason-phrase = *( HTAB / SP / VCHAR / obs-text )"
// https://github.com/chromium/chromium/blob/94.0.4604.1/third_party/blink/renderer/core/fetch/response.cc#L116
function isValidReasonPhrase (statusText) {
  for (let i = 0; i < statusText.length; ++i) {
    const c = statusText.charCodeAt(i)
    if (
      !(
        (
          c === 0x09 || // HTAB
          (c >= 0x20 && c <= 0x7e) || // SP / VCHAR
          (c >= 0x80 && c <= 0xff)
        ) // obs-text
      )
    ) {
      return false
    }
  }
  return true
}

function isTokenChar (c) {
  return !(
    c >= 0x7f ||
    c <= 0x20 ||
    c === '(' ||
    c === ')' ||
    c === '<' ||
    c === '>' ||
    c === '@' ||
    c === ',' ||
    c === ';' ||
    c === ':' ||
    c === '\\' ||
    c === '"' ||
    c === '/' ||
    c === '[' ||
    c === ']' ||
    c === '?' ||
    c === '=' ||
    c === '{' ||
    c === '}'
  )
}

// See RFC 7230, Section 3.2.6.
// https://github.com/chromium/chromium/blob/d7da0240cae77824d1eda25745c4022757499131/third_party/blink/renderer/platform/network/http_parsers.cc#L321
function isValidHTTPToken (characters) {
  if (!characters || typeof characters !== 'string') {
    return false
  }
  for (let i = 0; i < characters.length; ++i) {
    const c = characters.charCodeAt(i)
    if (c > 0x7f || !isTokenChar(c)) {
      return false
    }
  }
  return true
}

// https://w3c.github.io/webappsec-referrer-policy/#set-requests-referrer-policy-on-redirect
function setRequestReferrerPolicyOnRedirect (request, actualResponse) {
  //  Given a request request and a response actualResponse, this algorithm
  //  updates request’s referrer policy according to the Referrer-Policy
  //  header (if any) in actualResponse.

  // 1. Let policy be the result of executing § 8.1 Parse a referrer policy
  // from a Referrer-Policy header on actualResponse.
  // TODO:  https://w3c.github.io/webappsec-referrer-policy/#parse-referrer-policy-from-header
  const policy = ''

  // 2. If policy is not the empty string, then set request’s referrer policy to policy.
  if (policy !== '') {
    request.referrerPolicy = policy
  }
}

// https://fetch.spec.whatwg.org/#cross-origin-resource-policy-check
function crossOriginResourcePolicyCheck () {
  // TODO
  return 'allowed'
}

// https://fetch.spec.whatwg.org/#concept-cors-check
function corsCheck () {
  // TODO
  return 'success'
}

// https://fetch.spec.whatwg.org/#concept-tao-check
function TAOCheck () {
  // TODO
  return 'success'
}

function appendFetchMetadata (httpRequest) {
  //  https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-dest-header
  //  TODO

  //  https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-mode-header

  //  1. Assert: r’s url is a potentially trustworthy URL.
  //  TODO

  //  2. Let header be a Structured Header whose value is a token.
  let header = null

  //  3. Set header’s value to r’s mode.
  header = httpRequest.mode

  //  4. Set a structured field value `Sec-Fetch-Mode`/header in r’s header list.
  httpRequest.headersList.append('sec-fetch-mode', header)

  //  https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-site-header
  //  TODO

  //  https://w3c.github.io/webappsec-fetch-metadata/#sec-fetch-user-header
  //  TODO
}

// https://fetch.spec.whatwg.org/#append-a-request-origin-header
function appendRequestOriginHeader (request) {
  // 1. Let serializedOrigin be the result of byte-serializing a request origin with request.
  let serializedOrigin = request.origin

  // 2. If request’s response tainting is "cors" or request’s mode is "websocket", then append (`Origin`, serializedOrigin) to request’s header list.
  if (request.responseTainting === 'cors' || request.mode === 'websocket') {
    if (serializedOrigin) {
      request.headersList.append('Origin', serializedOrigin)
    }
  }

  // 3. Otherwise, if request’s method is neither `GET` nor `HEAD`, then:
  else if (request.method !== 'GET' && request.method !== 'HEAD') {
    // 1. Switch on request’s referrer policy:
    switch (request.referrerPolicy) {
      case 'no-referrer':
        // Set serializedOrigin to `null`.
        serializedOrigin = null
        break
      case 'no-referrer-when-downgrade':
      case 'strict-origin':
      case 'strict-origin-when-cross-origin':
        // If request’s origin is a tuple origin, its scheme is "https", and request’s current URL’s scheme is not "https", then set serializedOrigin to `null`.
        if (/^https:/.test(request.origin) && !/^https:/.test(requestCurrentURL(request))) {
          serializedOrigin = null
        }
        break
      case 'same-origin':
        // If request’s origin is not same origin with request’s current URL’s origin, then set serializedOrigin to `null`.
        if (!sameOrigin(request, requestCurrentURL(request))) {
          serializedOrigin = null
        }
        break
      default:
        // Do nothing.
    }

    if (serializedOrigin) {
      // 2. Append (`Origin`, serializedOrigin) to request’s header list.
      request.headersList.append('Origin', serializedOrigin)
    }
  }
}

function coarsenedSharedCurrentTime (crossOriginIsolatedCapability) {
  // TODO
  return performance.now()
}

// https://fetch.spec.whatwg.org/#create-an-opaque-timing-info
function createOpaqueTimingInfo (timingInfo) {
  return {
    startTime: timingInfo.startTime ?? 0,
    redirectStartTime: 0,
    redirectEndTime: 0,
    postRedirectStartTime: timingInfo.startTime ?? 0,
    finalServiceWorkerStartTime: 0,
    finalNetworkResponseStartTime: 0,
    finalNetworkRequestStartTime: 0,
    endTime: 0,
    encodedBodySize: 0,
    decodedBodySize: 0,
    finalConnectionTimingInfo: null
  }
}

// https://html.spec.whatwg.org/multipage/origin.html#policy-container
function makePolicyContainer () {
  // TODO
  return {}
}

// https://html.spec.whatwg.org/multipage/origin.html#clone-a-policy-container
function clonePolicyContainer () {
  // TODO
  return {}
}

// https://w3c.github.io/webappsec-referrer-policy/#determine-requests-referrer
function determineRequestsReferrer (request) {
  // TODO
  return 'no-referrer'
}

function matchRequestIntegrity (request, bytes) {
  return false
}

// https://w3c.github.io/webappsec-upgrade-insecure-requests/#upgrade-request
function tryUpgradeRequestToAPotentiallyTrustworthyURL (request) {
  // TODO
}

/**
 * @link {https://html.spec.whatwg.org/multipage/origin.html#same-origin}
 * @param {URL} A
 * @param {URL} B
 */
function sameOrigin (A, B) {
  // 1. If A and B are the same opaque origin, then return true.
  // "opaque origin" is an internal value we cannot access, ignore.

  // 2. If A and B are both tuple origins and their schemes, 
  //    hosts, and port are identical, then return true.
  if (A.protocol === B.protocol && A.hostname === B.hostname && A.port === B.port) {
    return true
  }

  // 3. Return false.
  return false
}

// https://fetch.spec.whatwg.org/#corb-check
function CORBCheck (request, response) {
  // TODO
  return 'allowed'
}

function createDeferredPromise () {
  let res
  let rej
  const promise = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  return { promise, resolve: res, reject: rej }
}

class ServiceWorkerGlobalScope {} // dummy
class Window {} // dummy
class EnvironmentSettingsObject {} // dummy

module.exports = {
  ServiceWorkerGlobalScope,
  Window,
  EnvironmentSettingsObject,
  createDeferredPromise,
  ReadableStreamFrom,
  toUSVString,
  tryUpgradeRequestToAPotentiallyTrustworthyURL,
  coarsenedSharedCurrentTime,
  matchRequestIntegrity,
  determineRequestsReferrer,
  makePolicyContainer,
  clonePolicyContainer,
  appendFetchMetadata,
  appendRequestOriginHeader,
  TAOCheck,
  corsCheck,
  crossOriginResourcePolicyCheck,
  createOpaqueTimingInfo,
  setRequestReferrerPolicyOnRedirect,
  isValidHTTPToken,
  requestBadPort,
  requestCurrentURL,
  responseURL,
  responseLocationURL,
  isBlobLike,
  isFileLike,
  isValidReasonPhrase,
  sameOrigin,
  CORBCheck
}


/***/ }),

/***/ 751:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const util = __nccwpck_require__(3983)
const { kBodyUsed } = __nccwpck_require__(2785)
const assert = __nccwpck_require__(9491)
const { InvalidArgumentError } = __nccwpck_require__(8045)
const EE = __nccwpck_require__(2361)

const redirectableStatusCodes = [300, 301, 302, 303, 307, 308]

const kBody = Symbol('body')

class BodyAsyncIterable {
  constructor (body) {
    this[kBody] = body
    this[kBodyUsed] = false
  }

  async * [Symbol.asyncIterator] () {
    assert(!this[kBodyUsed], 'disturbed')
    this[kBodyUsed] = true
    yield * this[kBody]
  }
}

class RedirectHandler {
  constructor (dispatcher, maxRedirections, opts, handler) {
    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError('maxRedirections must be a positive number')
    }

    util.validateHandler(handler, opts.method, opts.upgrade)

    this.dispatcher = dispatcher
    this.location = null
    this.abort = null
    this.opts = { ...opts, maxRedirections: 0 } // opts must be a copy
    this.maxRedirections = maxRedirections
    this.handler = handler
    this.history = []

    if (util.isStream(this.opts.body)) {
      // TODO (fix): Provide some way for the user to cache the file to e.g. /tmp
      // so that it can be dispatched again?
      // TODO (fix): Do we need 100-expect support to provide a way to do this properly?
      if (util.bodyLength(this.opts.body) === 0) {
        this.opts.body
          .on('data', function () {
            assert(false)
          })
      }

      if (typeof this.opts.body.readableDidRead !== 'boolean') {
        this.opts.body[kBodyUsed] = false
        EE.prototype.on.call(this.opts.body, 'data', function () {
          this[kBodyUsed] = true
        })
      }
    } else if (this.opts.body && typeof this.opts.body.pipeTo === 'function') {
      // TODO (fix): We can't access ReadableStream internal state
      // to determine whether or not it has been disturbed. This is just
      // a workaround.
      this.opts.body = new BodyAsyncIterable(this.opts.body)
    } else if (
      this.opts.body &&
      typeof this.opts.body !== 'string' &&
      !ArrayBuffer.isView(this.opts.body) &&
      util.isIterable(this.opts.body)
    ) {
      // TODO: Should we allow re-using iterable if !this.opts.idempotent
      // or through some other flag?
      this.opts.body = new BodyAsyncIterable(this.opts.body)
    }
  }

  onConnect (abort) {
    this.abort = abort
    this.handler.onConnect(abort, { history: this.history })
  }

  onUpgrade (statusCode, headers, socket) {
    this.handler.onUpgrade(statusCode, headers, socket)
  }

  onError (error) {
    this.handler.onError(error)
  }

  onHeaders (statusCode, headers, resume, statusText) {
    this.location = this.history.length >= this.maxRedirections || util.isDisturbed(this.opts.body)
      ? null
      : parseLocation(statusCode, headers)

    if (this.opts.origin) {
      this.history.push(new URL(this.opts.path, this.opts.origin))
    }

    if (!this.location) {
      return this.handler.onHeaders(statusCode, headers, resume, statusText)
    }

    const { origin, pathname, search } = util.parseURL(new URL(this.location, this.opts.origin))
    const path = search ? `${pathname}${search}` : pathname

    // Remove headers referring to the original URL.
    // By default it is Host only, unless it's a 303 (see below), which removes also all Content-* headers.
    // https://tools.ietf.org/html/rfc7231#section-6.4
    this.opts.headers = cleanRequestHeaders(this.opts.headers, statusCode === 303, this.opts.origin !== origin)
    this.opts.path = path
    this.opts.origin = origin
    this.opts.maxRedirections = 0

    // https://tools.ietf.org/html/rfc7231#section-6.4.4
    // In case of HTTP 303, always replace method to be either HEAD or GET
    if (statusCode === 303 && this.opts.method !== 'HEAD') {
      this.opts.method = 'GET'
      this.opts.body = null
    }
  }

  onData (chunk) {
    if (this.location) {
      /*
        https://tools.ietf.org/html/rfc7231#section-6.4

        TLDR: undici always ignores 3xx response bodies.

        Redirection is used to serve the requested resource from another URL, so it is assumes that
        no body is generated (and thus can be ignored). Even though generating a body is not prohibited.

        For status 301, 302, 303, 307 and 308 (the latter from RFC 7238), the specs mention that the body usually
        (which means it's optional and not mandated) contain just an hyperlink to the value of
        the Location response header, so the body can be ignored safely.

        For status 300, which is "Multiple Choices", the spec mentions both generating a Location
        response header AND a response body with the other possible location to follow.
        Since the spec explicitily chooses not to specify a format for such body and leave it to
        servers and browsers implementors, we ignore the body as there is no specified way to eventually parse it.
      */
    } else {
      return this.handler.onData(chunk)
    }
  }

  onComplete (trailers) {
    if (this.location) {
      /*
        https://tools.ietf.org/html/rfc7231#section-6.4

        TLDR: undici always ignores 3xx response trailers as they are not expected in case of redirections
        and neither are useful if present.

        See comment on onData method above for more detailed informations.
      */

      this.location = null
      this.abort = null

      this.dispatcher.dispatch(this.opts, this)
    } else {
      this.handler.onComplete(trailers)
    }
  }

  onBodySent (chunk) {
    if (this.handler.onBodySent) {
      this.handler.onBodySent(chunk)
    }
  }
}

function parseLocation (statusCode, headers) {
  if (redirectableStatusCodes.indexOf(statusCode) === -1) {
    return null
  }

  for (let i = 0; i < headers.length; i += 2) {
    if (headers[i].toString().toLowerCase() === 'location') {
      return headers[i + 1]
    }
  }
}

// https://tools.ietf.org/html/rfc7231#section-6.4.4
function shouldRemoveHeader (header, removeContent, unknownOrigin) {
  return (
    (header.length === 4 && header.toString().toLowerCase() === 'host') ||
    (removeContent && header.toString().toLowerCase().indexOf('content-') === 0) ||
    (unknownOrigin && header.length === 13 && header.toString().toLowerCase() === 'authorization')
  )
}

// https://tools.ietf.org/html/rfc7231#section-6.4
function cleanRequestHeaders (headers, removeContent, unknownOrigin) {
  const ret = []
  if (Array.isArray(headers)) {
    for (let i = 0; i < headers.length; i += 2) {
      if (!shouldRemoveHeader(headers[i], removeContent, unknownOrigin)) {
        ret.push(headers[i], headers[i + 1])
      }
    }
  } else if (headers && typeof headers === 'object') {
    for (const key of Object.keys(headers)) {
      if (!shouldRemoveHeader(key, removeContent, unknownOrigin)) {
        ret.push(key, headers[key])
      }
    }
  } else {
    assert(headers == null, 'headers must be an object or an array')
  }
  return ret
}

module.exports = RedirectHandler


/***/ }),

/***/ 953:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SPECIAL_HEADERS = exports.HEADER_STATE = exports.MINOR = exports.MAJOR = exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS = exports.TOKEN = exports.STRICT_TOKEN = exports.HEX = exports.URL_CHAR = exports.STRICT_URL_CHAR = exports.USERINFO_CHARS = exports.MARK = exports.ALPHANUM = exports.NUM = exports.HEX_MAP = exports.NUM_MAP = exports.ALPHA = exports.FINISH = exports.H_METHOD_MAP = exports.METHOD_MAP = exports.METHODS_RTSP = exports.METHODS_ICE = exports.METHODS_HTTP = exports.METHODS = exports.LENIENT_FLAGS = exports.FLAGS = exports.TYPE = exports.ERROR = void 0;
const utils_1 = __nccwpck_require__(1891);
// C headers
var ERROR;
(function (ERROR) {
    ERROR[ERROR["OK"] = 0] = "OK";
    ERROR[ERROR["INTERNAL"] = 1] = "INTERNAL";
    ERROR[ERROR["STRICT"] = 2] = "STRICT";
    ERROR[ERROR["LF_EXPECTED"] = 3] = "LF_EXPECTED";
    ERROR[ERROR["UNEXPECTED_CONTENT_LENGTH"] = 4] = "UNEXPECTED_CONTENT_LENGTH";
    ERROR[ERROR["CLOSED_CONNECTION"] = 5] = "CLOSED_CONNECTION";
    ERROR[ERROR["INVALID_METHOD"] = 6] = "INVALID_METHOD";
    ERROR[ERROR["INVALID_URL"] = 7] = "INVALID_URL";
    ERROR[ERROR["INVALID_CONSTANT"] = 8] = "INVALID_CONSTANT";
    ERROR[ERROR["INVALID_VERSION"] = 9] = "INVALID_VERSION";
    ERROR[ERROR["INVALID_HEADER_TOKEN"] = 10] = "INVALID_HEADER_TOKEN";
    ERROR[ERROR["INVALID_CONTENT_LENGTH"] = 11] = "INVALID_CONTENT_LENGTH";
    ERROR[ERROR["INVALID_CHUNK_SIZE"] = 12] = "INVALID_CHUNK_SIZE";
    ERROR[ERROR["INVALID_STATUS"] = 13] = "INVALID_STATUS";
    ERROR[ERROR["INVALID_EOF_STATE"] = 14] = "INVALID_EOF_STATE";
    ERROR[ERROR["INVALID_TRANSFER_ENCODING"] = 15] = "INVALID_TRANSFER_ENCODING";
    ERROR[ERROR["CB_MESSAGE_BEGIN"] = 16] = "CB_MESSAGE_BEGIN";
    ERROR[ERROR["CB_HEADERS_COMPLETE"] = 17] = "CB_HEADERS_COMPLETE";
    ERROR[ERROR["CB_MESSAGE_COMPLETE"] = 18] = "CB_MESSAGE_COMPLETE";
    ERROR[ERROR["CB_CHUNK_HEADER"] = 19] = "CB_CHUNK_HEADER";
    ERROR[ERROR["CB_CHUNK_COMPLETE"] = 20] = "CB_CHUNK_COMPLETE";
    ERROR[ERROR["PAUSED"] = 21] = "PAUSED";
    ERROR[ERROR["PAUSED_UPGRADE"] = 22] = "PAUSED_UPGRADE";
    ERROR[ERROR["PAUSED_H2_UPGRADE"] = 23] = "PAUSED_H2_UPGRADE";
    ERROR[ERROR["USER"] = 24] = "USER";
})(ERROR = exports.ERROR || (exports.ERROR = {}));
var TYPE;
(function (TYPE) {
    TYPE[TYPE["BOTH"] = 0] = "BOTH";
    TYPE[TYPE["REQUEST"] = 1] = "REQUEST";
    TYPE[TYPE["RESPONSE"] = 2] = "RESPONSE";
})(TYPE = exports.TYPE || (exports.TYPE = {}));
var FLAGS;
(function (FLAGS) {
    FLAGS[FLAGS["CONNECTION_KEEP_ALIVE"] = 1] = "CONNECTION_KEEP_ALIVE";
    FLAGS[FLAGS["CONNECTION_CLOSE"] = 2] = "CONNECTION_CLOSE";
    FLAGS[FLAGS["CONNECTION_UPGRADE"] = 4] = "CONNECTION_UPGRADE";
    FLAGS[FLAGS["CHUNKED"] = 8] = "CHUNKED";
    FLAGS[FLAGS["UPGRADE"] = 16] = "UPGRADE";
    FLAGS[FLAGS["CONTENT_LENGTH"] = 32] = "CONTENT_LENGTH";
    FLAGS[FLAGS["SKIPBODY"] = 64] = "SKIPBODY";
    FLAGS[FLAGS["TRAILING"] = 128] = "TRAILING";
    // 1 << 8 is unused
    FLAGS[FLAGS["TRANSFER_ENCODING"] = 512] = "TRANSFER_ENCODING";
})(FLAGS = exports.FLAGS || (exports.FLAGS = {}));
var LENIENT_FLAGS;
(function (LENIENT_FLAGS) {
    LENIENT_FLAGS[LENIENT_FLAGS["HEADERS"] = 1] = "HEADERS";
    LENIENT_FLAGS[LENIENT_FLAGS["CHUNKED_LENGTH"] = 2] = "CHUNKED_LENGTH";
    LENIENT_FLAGS[LENIENT_FLAGS["KEEP_ALIVE"] = 4] = "KEEP_ALIVE";
})(LENIENT_FLAGS = exports.LENIENT_FLAGS || (exports.LENIENT_FLAGS = {}));
var METHODS;
(function (METHODS) {
    METHODS[METHODS["DELETE"] = 0] = "DELETE";
    METHODS[METHODS["GET"] = 1] = "GET";
    METHODS[METHODS["HEAD"] = 2] = "HEAD";
    METHODS[METHODS["POST"] = 3] = "POST";
    METHODS[METHODS["PUT"] = 4] = "PUT";
    /* pathological */
    METHODS[METHODS["CONNECT"] = 5] = "CONNECT";
    METHODS[METHODS["OPTIONS"] = 6] = "OPTIONS";
    METHODS[METHODS["TRACE"] = 7] = "TRACE";
    /* WebDAV */
    METHODS[METHODS["COPY"] = 8] = "COPY";
    METHODS[METHODS["LOCK"] = 9] = "LOCK";
    METHODS[METHODS["MKCOL"] = 10] = "MKCOL";
    METHODS[METHODS["MOVE"] = 11] = "MOVE";
    METHODS[METHODS["PROPFIND"] = 12] = "PROPFIND";
    METHODS[METHODS["PROPPATCH"] = 13] = "PROPPATCH";
    METHODS[METHODS["SEARCH"] = 14] = "SEARCH";
    METHODS[METHODS["UNLOCK"] = 15] = "UNLOCK";
    METHODS[METHODS["BIND"] = 16] = "BIND";
    METHODS[METHODS["REBIND"] = 17] = "REBIND";
    METHODS[METHODS["UNBIND"] = 18] = "UNBIND";
    METHODS[METHODS["ACL"] = 19] = "ACL";
    /* subversion */
    METHODS[METHODS["REPORT"] = 20] = "REPORT";
    METHODS[METHODS["MKACTIVITY"] = 21] = "MKACTIVITY";
    METHODS[METHODS["CHECKOUT"] = 22] = "CHECKOUT";
    METHODS[METHODS["MERGE"] = 23] = "MERGE";
    /* upnp */
    METHODS[METHODS["M-SEARCH"] = 24] = "M-SEARCH";
    METHODS[METHODS["NOTIFY"] = 25] = "NOTIFY";
    METHODS[METHODS["SUBSCRIBE"] = 26] = "SUBSCRIBE";
    METHODS[METHODS["UNSUBSCRIBE"] = 27] = "UNSUBSCRIBE";
    /* RFC-5789 */
    METHODS[METHODS["PATCH"] = 28] = "PATCH";
    METHODS[METHODS["PURGE"] = 29] = "PURGE";
    /* CalDAV */
    METHODS[METHODS["MKCALENDAR"] = 30] = "MKCALENDAR";
    /* RFC-2068, section 19.6.1.2 */
    METHODS[METHODS["LINK"] = 31] = "LINK";
    METHODS[METHODS["UNLINK"] = 32] = "UNLINK";
    /* icecast */
    METHODS[METHODS["SOURCE"] = 33] = "SOURCE";
    /* RFC-7540, section 11.6 */
    METHODS[METHODS["PRI"] = 34] = "PRI";
    /* RFC-2326 RTSP */
    METHODS[METHODS["DESCRIBE"] = 35] = "DESCRIBE";
    METHODS[METHODS["ANNOUNCE"] = 36] = "ANNOUNCE";
    METHODS[METHODS["SETUP"] = 37] = "SETUP";
    METHODS[METHODS["PLAY"] = 38] = "PLAY";
    METHODS[METHODS["PAUSE"] = 39] = "PAUSE";
    METHODS[METHODS["TEARDOWN"] = 40] = "TEARDOWN";
    METHODS[METHODS["GET_PARAMETER"] = 41] = "GET_PARAMETER";
    METHODS[METHODS["SET_PARAMETER"] = 42] = "SET_PARAMETER";
    METHODS[METHODS["REDIRECT"] = 43] = "REDIRECT";
    METHODS[METHODS["RECORD"] = 44] = "RECORD";
    /* RAOP */
    METHODS[METHODS["FLUSH"] = 45] = "FLUSH";
})(METHODS = exports.METHODS || (exports.METHODS = {}));
exports.METHODS_HTTP = [
    METHODS.DELETE,
    METHODS.GET,
    METHODS.HEAD,
    METHODS.POST,
    METHODS.PUT,
    METHODS.CONNECT,
    METHODS.OPTIONS,
    METHODS.TRACE,
    METHODS.COPY,
    METHODS.LOCK,
    METHODS.MKCOL,
    METHODS.MOVE,
    METHODS.PROPFIND,
    METHODS.PROPPATCH,
    METHODS.SEARCH,
    METHODS.UNLOCK,
    METHODS.BIND,
    METHODS.REBIND,
    METHODS.UNBIND,
    METHODS.ACL,
    METHODS.REPORT,
    METHODS.MKACTIVITY,
    METHODS.CHECKOUT,
    METHODS.MERGE,
    METHODS['M-SEARCH'],
    METHODS.NOTIFY,
    METHODS.SUBSCRIBE,
    METHODS.UNSUBSCRIBE,
    METHODS.PATCH,
    METHODS.PURGE,
    METHODS.MKCALENDAR,
    METHODS.LINK,
    METHODS.UNLINK,
    METHODS.PRI,
    // TODO(indutny): should we allow it with HTTP?
    METHODS.SOURCE,
];
exports.METHODS_ICE = [
    METHODS.SOURCE,
];
exports.METHODS_RTSP = [
    METHODS.OPTIONS,
    METHODS.DESCRIBE,
    METHODS.ANNOUNCE,
    METHODS.SETUP,
    METHODS.PLAY,
    METHODS.PAUSE,
    METHODS.TEARDOWN,
    METHODS.GET_PARAMETER,
    METHODS.SET_PARAMETER,
    METHODS.REDIRECT,
    METHODS.RECORD,
    METHODS.FLUSH,
    // For AirPlay
    METHODS.GET,
    METHODS.POST,
];
exports.METHOD_MAP = utils_1.enumToMap(METHODS);
exports.H_METHOD_MAP = {};
Object.keys(exports.METHOD_MAP).forEach((key) => {
    if (/^H/.test(key)) {
        exports.H_METHOD_MAP[key] = exports.METHOD_MAP[key];
    }
});
var FINISH;
(function (FINISH) {
    FINISH[FINISH["SAFE"] = 0] = "SAFE";
    FINISH[FINISH["SAFE_WITH_CB"] = 1] = "SAFE_WITH_CB";
    FINISH[FINISH["UNSAFE"] = 2] = "UNSAFE";
})(FINISH = exports.FINISH || (exports.FINISH = {}));
exports.ALPHA = [];
for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    // Upper case
    exports.ALPHA.push(String.fromCharCode(i));
    // Lower case
    exports.ALPHA.push(String.fromCharCode(i + 0x20));
}
exports.NUM_MAP = {
    0: 0, 1: 1, 2: 2, 3: 3, 4: 4,
    5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
};
exports.HEX_MAP = {
    0: 0, 1: 1, 2: 2, 3: 3, 4: 4,
    5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
    A: 0XA, B: 0XB, C: 0XC, D: 0XD, E: 0XE, F: 0XF,
    a: 0xa, b: 0xb, c: 0xc, d: 0xd, e: 0xe, f: 0xf,
};
exports.NUM = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
];
exports.ALPHANUM = exports.ALPHA.concat(exports.NUM);
exports.MARK = ['-', '_', '.', '!', '~', '*', '\'', '(', ')'];
exports.USERINFO_CHARS = exports.ALPHANUM
    .concat(exports.MARK)
    .concat(['%', ';', ':', '&', '=', '+', '$', ',']);
// TODO(indutny): use RFC
exports.STRICT_URL_CHAR = [
    '!', '"', '$', '%', '&', '\'',
    '(', ')', '*', '+', ',', '-', '.', '/',
    ':', ';', '<', '=', '>',
    '@', '[', '\\', ']', '^', '_',
    '`',
    '{', '|', '}', '~',
].concat(exports.ALPHANUM);
exports.URL_CHAR = exports.STRICT_URL_CHAR
    .concat(['\t', '\f']);
// All characters with 0x80 bit set to 1
for (let i = 0x80; i <= 0xff; i++) {
    exports.URL_CHAR.push(i);
}
exports.HEX = exports.NUM.concat(['a', 'b', 'c', 'd', 'e', 'f', 'A', 'B', 'C', 'D', 'E', 'F']);
/* Tokens as defined by rfc 2616. Also lowercases them.
 *        token       = 1*<any CHAR except CTLs or separators>
 *     separators     = "(" | ")" | "<" | ">" | "@"
 *                    | "," | ";" | ":" | "\" | <">
 *                    | "/" | "[" | "]" | "?" | "="
 *                    | "{" | "}" | SP | HT
 */
exports.STRICT_TOKEN = [
    '!', '#', '$', '%', '&', '\'',
    '*', '+', '-', '.',
    '^', '_', '`',
    '|', '~',
].concat(exports.ALPHANUM);
exports.TOKEN = exports.STRICT_TOKEN.concat([' ']);
/*
 * Verify that a char is a valid visible (printable) US-ASCII
 * character or %x80-FF
 */
exports.HEADER_CHARS = ['\t'];
for (let i = 32; i <= 255; i++) {
    if (i !== 127) {
        exports.HEADER_CHARS.push(i);
    }
}
// ',' = \x44
exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS.filter((c) => c !== 44);
exports.MAJOR = exports.NUM_MAP;
exports.MINOR = exports.MAJOR;
var HEADER_STATE;
(function (HEADER_STATE) {
    HEADER_STATE[HEADER_STATE["GENERAL"] = 0] = "GENERAL";
    HEADER_STATE[HEADER_STATE["CONNECTION"] = 1] = "CONNECTION";
    HEADER_STATE[HEADER_STATE["CONTENT_LENGTH"] = 2] = "CONTENT_LENGTH";
    HEADER_STATE[HEADER_STATE["TRANSFER_ENCODING"] = 3] = "TRANSFER_ENCODING";
    HEADER_STATE[HEADER_STATE["UPGRADE"] = 4] = "UPGRADE";
    HEADER_STATE[HEADER_STATE["CONNECTION_KEEP_ALIVE"] = 5] = "CONNECTION_KEEP_ALIVE";
    HEADER_STATE[HEADER_STATE["CONNECTION_CLOSE"] = 6] = "CONNECTION_CLOSE";
    HEADER_STATE[HEADER_STATE["CONNECTION_UPGRADE"] = 7] = "CONNECTION_UPGRADE";
    HEADER_STATE[HEADER_STATE["TRANSFER_ENCODING_CHUNKED"] = 8] = "TRANSFER_ENCODING_CHUNKED";
})(HEADER_STATE = exports.HEADER_STATE || (exports.HEADER_STATE = {}));
exports.SPECIAL_HEADERS = {
    'connection': HEADER_STATE.CONNECTION,
    'content-length': HEADER_STATE.CONTENT_LENGTH,
    'proxy-connection': HEADER_STATE.CONNECTION,
    'transfer-encoding': HEADER_STATE.TRANSFER_ENCODING,
    'upgrade': HEADER_STATE.UPGRADE,
};
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 2643:
/***/ ((module) => {

module.exports = "AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAzk4AwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAYGAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAAMEBQFwAQ4OBQMBAAIGCAF/AUGgtwQLB/UEHwZtZW1vcnkCAAtfaW5pdGlhbGl6ZQAJGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAAtsbGh0dHBfaW5pdAAKGGxsaHR0cF9zaG91bGRfa2VlcF9hbGl2ZQA1DGxsaHR0cF9hbGxvYwAMBm1hbGxvYwA6C2xsaHR0cF9mcmVlAA0EZnJlZQA8D2xsaHR0cF9nZXRfdHlwZQAOFWxsaHR0cF9nZXRfaHR0cF9tYWpvcgAPFWxsaHR0cF9nZXRfaHR0cF9taW5vcgAQEWxsaHR0cF9nZXRfbWV0aG9kABEWbGxodHRwX2dldF9zdGF0dXNfY29kZQASEmxsaHR0cF9nZXRfdXBncmFkZQATDGxsaHR0cF9yZXNldAAUDmxsaHR0cF9leGVjdXRlABUUbGxodHRwX3NldHRpbmdzX2luaXQAFg1sbGh0dHBfZmluaXNoABcMbGxodHRwX3BhdXNlABgNbGxodHRwX3Jlc3VtZQAZG2xsaHR0cF9yZXN1bWVfYWZ0ZXJfdXBncmFkZQAaEGxsaHR0cF9nZXRfZXJybm8AGxdsbGh0dHBfZ2V0X2Vycm9yX3JlYXNvbgAcF2xsaHR0cF9zZXRfZXJyb3JfcmVhc29uAB0UbGxodHRwX2dldF9lcnJvcl9wb3MAHhFsbGh0dHBfZXJybm9fbmFtZQAfEmxsaHR0cF9tZXRob2RfbmFtZQAgGmxsaHR0cF9zZXRfbGVu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QZx/akHkAEkNACAAQcwBRg0AIABBsAJGDQBBBCEFIARBiARxQYAERg0CIARBKHFFDQILQQAPC0EAQQMgACkDIFAbIQULIAULXQECf0EAIQECQCAALQAoQQFGDQAgAC8BMiICQZx/akHkAEkNACACQcwBRg0AIAJBsAJGDQAgAC8BMCIAQcAAcQ0AQQEhASAAQYgEcUGABEYNACAAQShxRSEBCyABC6IBAQN/AkACQAJAIAAtACpFDQAgAC0AK0UNAEEAIQMgAC8BMCIEQQJxRQ0BDAILQQAhAyAALwEwIgRBAXFFDQELQQEhAyAALQAoQQFGDQAgAC8BMiIFQZx/akHkAEkNACAFQcwBRg0AIAVBsAJGDQAgBEHAAHENAEEAIQMgBEGIBHFBgARGDQAgBEEocUEARyEDCyAAQQA7ATAgAEEAOgAvIAMLlAEBAn8CQAJAAkAgAC0AKkUNACAALQArRQ0AQQAhASAALwEwIgJBAnFFDQEMAgtBACEBIAAvATAiAkEBcUUNAQtBASEBIAAtAChBAUYNACAALwEyIgBBnH9qQeQASQ0AIABBzAFGDQAgAEGwAkYNACACQcAAcQ0AQQAhASACQYgEcUGABEYNACACQShxQQBHIQELIAELTwAgAEEYakIANwMAIABCADcDACAAQTBqQgA3AwAgAEEoakIANwMAIABBIGpCADcDACAAQRBqQgA3AwAgAEEIakIANwMAIABBuAE2AhxBAAt7AQF/AkAgACgCDCIDDQACQCAAKAIERQ0AIAAgATYCBAsCQCAAIAEgAhC4gICAACIDDQAgACgCDA8LIAAgAzYCHEEAIQMgACgCBCIBRQ0AIAAgASACIAAoAggRgYCAgAAAIgFFDQAgACACNgIUIAAgATYCDCABIQMLIAML8soBAxl/A34FfyOAgICAAEEQayIDJICAgIAAIAEhBCABIQUgASEGIAEhByABIQggASEJIAEhCiABIQsgASEMIAEhDSABIQ4gASEPIAEhECABIREgASESIAEhEyABIRQgASEVIAEhFiABIRcgASEYIAEhGSABIRoCQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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QQEhGwwPC0GbASEbDA4LQZwBIRsMDQtBngEhGwwMC0GgASEbDAsLQZ8BIRsMCgtBoQEhGwwJC0GiASEbDAgLQaMBIRsMBwtBpAEhGwwGC0GlASEbDAULQaYBIRsMBAtBpwEhGwwDC0GoASEbDAILQakBIRsMAQtBrwEhGwsDQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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IAAgIDYCAAybAgsgAEEANgIAIB8gI2tBBWohAUEjIRsMswELAkAgASIEIAJHDQBB6wAhGwyaAgsCQAJAIAQtAABBtH9qDggAtgG2AbYBtgG2AbYBAbYBCyAEQQFqIQFB3QAhGwyPAgsgBEEBaiEBQd4AIRsMjgILAkAgASIEIAJHDQBB7AAhGwyZAgsgBC0AAEHFAEcNswEgBEEBaiEBDOQBC0HtACEbIAEiHyACRg2XAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFBqLKAgABqLQAARw2zASABQQNGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMmAILIABBADYCACAfICNrQQRqIQFBLSEbDLABC0HuACEbIAEiHyACRg2WAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFB8LKAgABqLQAARw2yASABQQhGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMlwILIABBADYCACAfICNrQQlqIQFBKSEbDK8BCwJAIAEiASACRw0AQe8AIRsMlgILQQEhGyABLQAAQd8ARw2uASABQQFqIQEM4gELQfAAIRsgASIfIAJGDZQCIAIgH2sgACgCACIjaiEgIB8hBCAjIQEDQCAELQAAIAFBrLKAgABqLQAARw2vASABQQFGDfoBIAFBAWohASAEQQFqIgQgAkcNAAsgACAgNgIADJQCC0HxACEbIAEiHyACRg2TAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFBrrKAgABqLQAARw2vASABQQJGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMlAILIABBADYCACAfICNrQQNqIQFBAiEbDKwBC0HyACEbIAEiHyACRg2SAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFBkLOAgABqLQAARw2uASABQQFGDQEgAUEBaiEBIARBAWoiBCACRw0ACyAAICA2AgAMkwILIABBADYCACAfICNrQQJqIQFBHyEbDKsBC0HzACEbIAEiHyACRg2RAiACIB9rIAAoAgAiI2ohICAfIQQgIyEBAkADQCAELQAAIAFBkrOAgABqLQAARw2tASABQQFGDQEgAUEBaiEBIARBAWoiBCAC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c3QASW52YWxpZCBtZXRob2QgZm9yIFJUU1AveC54IHJlcXVlc3QARXhwZWN0ZWQgU09VUkNFIG1ldGhvZCBmb3IgSUNFL3gueCByZXF1ZXN0AEludmFsaWQgY2hhciBpbiB1cmwgZnJhZ21lbnQgc3RhcnQARXhwZWN0ZWQgZG90AFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fc3RhdHVzAEludmFsaWQgcmVzcG9uc2Ugc3RhdHVzAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIHBhcmFtZXRlcnMAVXNlciBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfaGVhZGVyYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9iZWdpbmAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzZXJ2ZXIASW52YWxpZCBoZWFkZXIgdmFsdWUgY2hhcgBJbnZhbGlkIGhlYWRlciBmaWVsZCBjaGFyAEludmFsaWQgbWlub3IgdmVyc2lvbgBJbnZhbGlkIG1ham9yIHZlcnNpb24ARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgdmVyc2lvbgBFeHBlY3RlZCBDUkxGIGFmdGVyIHZlcnNpb24ASW52YWxpZCBoZWFkZXIgdG9rZW4AU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl91cmwASW52YWxpZCBjaGFyYWN0ZXJzIGluIHVybABVbmV4cGVjdGVkIHN0YXJ0IGNoYXIgaW4gdXJsAERvdWJsZSBAIGluIHVybABFbXB0eSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXJhY3RlciBpbiBDb250ZW50LUxlbmd0aABEdXBsaWNhdGUgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyIGluIHVybCBwYXRoAENvbnRlbnQtTGVuZ3RoIGNhbid0IGJlIHByZXNlbnQgd2l0aCBUcmFuc2Zlci1FbmNvZGluZwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBzaXplAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX3ZhbHVlAE1pc3NpbmcgZXhwZWN0ZWQgTEYgYWZ0ZXIgaGVhZGVyIHZhbHVlAFBhdXNlZCBieSBvbl9oZWFkZXJzX2NvbXBsZXRlAEludmFsaWQgRU9GIHN0YXRlAG9uX2NodW5rX2hlYWRlciBwYXVzZQBvbl9tZXNzYWdlX2JlZ2luIHBhdXNlAG9uX2NodW5rX2NvbXBsZXRlIHBhdXNlAG9uX21lc3NhZ2VfY29tcGxldGUgcGF1c2UAUGF1c2Ugb24gQ09OTkVDVC9VcGdyYWRlAFBhdXNlIG9uIFBSSS9VcGdyYWRlAEV4cGVjdGVkIEhUVFAvMiBDb25uZWN0aW9uIFByZWZhY2UARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgbWV0aG9kAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX2ZpZWxkAFBhdXNlZABJbnZhbGlkIHdvcmQgZW5jb3VudGVyZWQASW52YWxpZCBtZXRob2QgZW5jb3VudGVyZWQAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzY2hlbWEAUmVxdWVzdCBoYXMgaW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgAE1LQUNUSVZJVFkAQ09QWQBOT1RJRlkAUExBWQBQVVQAQ0hFQ0tPVVQAUE9TVABSRVBPUlQASFBFX0lOVkFMSURfQ09OU1RBTlQAR0VUAEhQRV9TVFJJQ1QAUkVESVJFQ1QAQ09OTkVDVABIUEVfSU5WQUxJRF9TVEFUVVMAT1BUSU9OUwBTRVRfUEFSQU1FVEVSAEdFVF9QQVJBTUVURVIASFBFX1VTRVIASFBFX0NCX0NIVU5LX0hFQURFUgBNS0NBTEVOREFSAFNFVFVQAFRFQVJET1dOAEhQRV9DTE9TRURfQ09OTkVDVElPTgBIUEVfSU5WQUxJRF9WRVJTSU9OAEhQRV9DQl9NRVNTQUdFX0JFR0lOAEhQRV9JTlZBTElEX0hFQURFUl9UT0tFTgBIUEVfSU5WQUxJRF9VUkwATUtDT0wAQUNMAEhQRV9JTlRFUk5BTABIUEVfT0sAVU5MSU5LAFVOTE9DSwBQUkkASFBFX0lOVkFMSURfQ09OVEVOVF9MRU5HVEgASFBFX1VORVhQRUNURURfQ09OVEVOVF9MRU5HVEgARkxVU0gAUFJPUFBBVENIAE0tU0VBUkNIAEhQRV9JTlZBTElEX1RSQU5TRkVSX0VOQ09ESU5HAEV4cGVjdGVkIENSTEYASFBFX0lOVkFMSURfQ0hVTktfU0laRQBNT1ZFAEhQRV9DQl9IRUFERVJTX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19DT01QTEVURQBIUEVfQ0JfTUVTU0FHRV9DT01QTEVURQBERUxFVEUASFBFX0lOVkFMSURfRU9GX1NUQVRFAFBBVVNFAFBVUkdFAE1FUkdFAEhQRV9QQVVTRURfVVBHUkFERQBIUEVfUEFVU0VEX0gyX1VQR1JBREUAU09VUkNFAEFOTk9VTkNFAFRSQUNFAERFU0NSSUJFAFVOU1VCU0NSSUJFAFJFQ09SRABIUEVfSU5WQUxJRF9NRVRIT0QAUFJPUEZJTkQAVU5CSU5EAFJFQklORABIUEVfTEZfRVhQRUNURUQASFBFX1BBVVNFRABIRUFEAEV4cGVjdGVkIEhUVFAvAIwLAAB/CwAAgwoAADkNAADACwAADQsAAA8NAABlCwAAagoAACMLAABMCwAApQsAACMMAACfCgAAjAwAAPcLAAA3CwAAPwwAAG0MAADfCgAAVwwAAEkNAAC0DAAAxwwAANYKAACFDAAAfwoAAFQNAABeCgAAUQoAAJcKAACyCgAA7QwAAEAKAACcCwAAdQsAADoMAAAiDQAA5AsAAPALAACaCwAANA0AADINAAArDQAAewsAAGMKAAA1CgAAVQoAAK4MAADuCwAARQoAAP4MAAD8DAAA6AsAAKgMAADzCgAAlQsAAJMLAADdDAAAoQsAAPMMAADkDAAA/goAAEwKAACiDAAABAsAAMgKAAC6CgAAjgoAAAgNAADeCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAWxvc2VlZXAtYWxpdmUAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQECAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAWNodW5rZWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAEBAQEBAAABAQABAQABAQEBAQEBAQEBAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZWN0aW9uZW50LWxlbmd0aG9ucm94eS1jb25uZWN0aW9uAAAAAAAAAAAAAAAAAAAAcmFuc2Zlci1lbmNvZGluZ3BncmFkZQ0KDQoNClNNDQoNClRUUC9DRS9UU1AvAAAAAAAAAAAAAAAAAQIAAQMAAAAAAAAAAAAAAAAAAAAAAAAEAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAECAAEDAAAAAAAAAAAAAAAAAAAAAAAABAEBBQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAEAAAIAAAAAAAAAAAAAAAAAAAAAAAADBAAABAQEBAQEBAQEBAQFBAQEBAQEBAQEBAQEAAQABgcEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAACAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATk9VTkNFRUNLT1VUTkVDVEVURUNSSUJFTFVTSEVURUFEU0VBUkNIUkdFQ1RJVklUWUxFTkRBUlZFT1RJRllQVElPTlNDSFNFQVlTVEFUQ0hHRU9SRElSRUNUT1JUUkNIUEFSQU1FVEVSVVJDRUJTQ1JJQkVBUkRPV05BQ0VJTkROS0NLVUJTQ1JJQkVIVFRQL0FEVFAv";


/***/ }),

/***/ 8221:
/***/ ((module) => {

module.exports = "AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAzk4AwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAYGAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAAMEBQFwAQ4OBQMBAAIGCAF/AUGgtwQLB/UEHwZtZW1vcnkCAAtfaW5pdGlhbGl6ZQAJGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAAtsbGh0dHBfaW5pdAAKGGxsaHR0cF9zaG91bGRfa2VlcF9hbGl2ZQA1DGxsaHR0cF9hbGxvYwAMBm1hbGxvYwA6C2xsaHR0cF9mcmVlAA0EZnJlZQA8D2xsaHR0cF9nZXRfdHlwZQAOFWxsaHR0cF9nZXRfaHR0cF9tYWpvcgAPFWxsaHR0cF9nZXRfaHR0cF9taW5vcgAQEWxsaHR0cF9nZXRfbWV0aG9kABEWbGxodHRwX2dldF9zdGF0dXNfY29kZQASEmxsaHR0cF9nZXRfdXBncmFkZQATDGxsaHR0cF9yZXNldAAUDmxsaHR0cF9leGVjdXRlABUUbGxodHRwX3NldHRpbmdzX2luaXQAFg1sbGh0dHBfZmluaXNoABcMbGxodHRwX3BhdXNlABgNbGxodHRwX3Jlc3VtZQAZG2xsaHR0cF9yZXN1bWVfYWZ0ZXJfdXBncmFkZQAaEGxsaHR0cF9nZXRfZXJybm8AGxdsbGh0dHBfZ2V0X2Vycm9yX3JlYXNvbgAcF2xsaHR0cF9zZXRfZXJyb3JfcmVhc29uAB0UbGxodHRwX2dldF9lcnJvcl9wb3MAHhFsbGh0dHBfZXJybm9fbmFtZQAfEmxsaHR0cF9tZXRob2RfbmFtZQAgGmxsaHR0cF9zZXRfbGVu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C0GcASEbDA0LQZ4BIRsMDAtBoAEhGwwLC0GfASEbDAoLQaEBIRsMCQtBogEhGwwIC0GjASEbDAcLQaQBIRsMBgtBpQEhGwwFC0GmASEbDAQLQacBIRsMAwtBqAEhGwwCC0GpASEbDAELQa8BIRsLA0ACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIBsO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aG9kIGZvciBSVFNQL3gueCByZXF1ZXN0AEV4cGVjdGVkIFNPVVJDRSBtZXRob2QgZm9yIElDRS94LnggcmVxdWVzdABJbnZhbGlkIGNoYXIgaW4gdXJsIGZyYWdtZW50IHN0YXJ0AEV4cGVjdGVkIGRvdABTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3N0YXR1cwBJbnZhbGlkIHJlc3BvbnNlIHN0YXR1cwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBwYXJhbWV0ZXJzAFVzZXIgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2hlYWRlcmAgY2FsbGJhY2sgZXJyb3IAYG9uX21lc3NhZ2VfYmVnaW5gIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX21lc3NhZ2VfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2VydmVyAEludmFsaWQgaGVhZGVyIHZhbHVlIGNoYXIASW52YWxpZCBoZWFkZXIgZmllbGQgY2hhcgBJbnZhbGlkIG1pbm9yIHZlcnNpb24ASW52YWxpZCBtYWpvciB2ZXJzaW9uAEV4cGVjdGVkIHNwYWNlIGFmdGVyIHZlcnNpb24ARXhwZWN0ZWQgQ1JMRiBhZnRlciB2ZXJzaW9uAEludmFsaWQgaGVhZGVyIHRva2VuAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fdXJsAEludmFsaWQgY2hhcmFjdGVycyBpbiB1cmwAVW5leHBlY3RlZCBzdGFydCBjaGFyIGluIHVybABEb3VibGUgQCBpbiB1cmwARW1wdHkgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyYWN0ZXIgaW4gQ29udGVudC1MZW5ndGgARHVwbGljYXRlIENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhciBpbiB1cmwgcGF0aABDb250ZW50LUxlbmd0aCBjYW4ndCBiZSBwcmVzZW50IHdpdGggVHJhbnNmZXItRW5jb2RpbmcASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgc2l6ZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2hlYWRlcl92YWx1ZQBNaXNzaW5nIGV4cGVjdGVkIExGIGFmdGVyIGhlYWRlciB2YWx1ZQBQYXVzZWQgYnkgb25faGVhZGVyc19jb21wbGV0ZQBJbnZhbGlkIEVPRiBzdGF0ZQBvbl9jaHVua19oZWFkZXIgcGF1c2UAb25fbWVzc2FnZV9iZWdpbiBwYXVzZQBvbl9jaHVua19jb21wbGV0ZSBwYXVzZQBvbl9tZXNzYWdlX2NvbXBsZXRlIHBhdXNlAFBhdXNlIG9uIENPTk5FQ1QvVXBncmFkZQBQYXVzZSBvbiBQUkkvVXBncmFkZQBFeHBlY3RlZCBIVFRQLzIgQ29ubmVjdGlvbiBQcmVmYWNlAEV4cGVjdGVkIHNwYWNlIGFmdGVyIG1ldGhvZABTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2hlYWRlcl9maWVsZABQYXVzZWQASW52YWxpZCB3b3JkIGVuY291bnRlcmVkAEludmFsaWQgbWV0aG9kIGVuY291bnRlcmVkAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2NoZW1hAFJlcXVlc3QgaGFzIGludmFsaWQgYFRyYW5zZmVyLUVuY29kaW5nYABNS0FDVElWSVRZAENPUFkATk9USUZZAFBMQVkAUFVUAENIRUNLT1VUAFBPU1QAUkVQT1JUAEhQRV9JTlZBTElEX0NPTlNUQU5UAEdFVABIUEVfU1RSSUNUAFJFRElSRUNUAENPTk5FQ1QASFBFX0lOVkFMSURfU1RBVFVTAE9QVElPTlMAU0VUX1BBUkFNRVRFUgBHRVRfUEFSQU1FVEVSAEhQRV9VU0VSAEhQRV9DQl9DSFVOS19IRUFERVIATUtDQUxFTkRBUgBTRVRVUABURUFSRE9XTgBIUEVfQ0xPU0VEX0NPTk5FQ1RJT04ASFBFX0lOVkFMSURfVkVSU0lPTgBIUEVfQ0JfTUVTU0FHRV9CRUdJTgBIUEVfSU5WQUxJRF9IRUFERVJfVE9LRU4ASFBFX0lOVkFMSURfVVJMAE1LQ09MAEFDTABIUEVfSU5URVJOQUwASFBFX09LAFVOTElOSwBVTkxPQ0sAUFJJAEhQRV9JTlZBTElEX0NPTlRFTlRfTEVOR1RIAEhQRV9VTkVYUEVDVEVEX0NPTlRFTlRfTEVOR1RIAEZMVVNIAFBS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bmdwZ3JhZGUNCg0KDQpTTQ0KDQpUVFAvQ0UvVFNQLwAAAAAAAAAAAAAAAAECAAEDAAAAAAAAAAAAAAAAAAAAAAAABAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAgABAwAAAAAAAAAAAAAAAAAAAAAAAAQBAQUBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAABAAACAAAAAAAAAAAAAAAAAAAAAAAAAwQAAAQEBAQEBAQEBAQEBQQEBAQEBAQEBAQEBAAEAAYHBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAgAAAAACAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE5PVU5DRUVDS09VVE5FQ1RFVEVDUklCRUxVU0hFVEVBRFNFQVJDSFJHRUNUSVZJVFlMRU5EQVJWRU9USUZZUFRJT05TQ0hTRUFZU1RBVENIR0VPUkRJUkVDVE9SVFJDSFBBUkFNRVRFUlVSQ0VCU0NSSUJFQVJET1dOQUNFSU5ETktDS1VCU0NSSUJFSFRUUC9BRFRQLw==";


/***/ }),

/***/ 1891:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enumToMap = void 0;
function enumToMap(obj) {
    const res = {};
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (typeof value === 'number') {
            res[key] = value;
        }
    });
    return res;
}
exports.enumToMap = enumToMap;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 6771:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { kClients } = __nccwpck_require__(2785)
const Agent = __nccwpck_require__(7890)
const {
  kAgent,
  kMockAgentSet,
  kMockAgentGet,
  kDispatches,
  kIsMockActive,
  kNetConnect,
  kGetNetConnect,
  kOptions,
  kFactory
} = __nccwpck_require__(4347)
const MockClient = __nccwpck_require__(8687)
const MockPool = __nccwpck_require__(6193)
const { matchValue, buildMockOptions } = __nccwpck_require__(9323)
const { InvalidArgumentError } = __nccwpck_require__(8045)
const Dispatcher = __nccwpck_require__(412)
const { WeakRef } = __nccwpck_require__(6436)()

class MockAgent extends Dispatcher {
  constructor (opts) {
    super(opts)

    this[kNetConnect] = true
    this[kIsMockActive] = true

    // Instantiate Agent and encapsulate
    if ((opts && opts.agent && typeof opts.agent.dispatch !== 'function')) {
      throw new InvalidArgumentError('Argument opts.agent must implement Agent')
    }
    const agent = opts && opts.agent ? opts.agent : new Agent(opts)
    this[kAgent] = agent

    this[kClients] = agent[kClients]
    this[kOptions] = buildMockOptions(opts)
  }

  get (origin) {
    let dispatcher = this[kMockAgentGet](origin)

    if (!dispatcher) {
      dispatcher = this[kFactory](origin)
      this[kMockAgentSet](origin, dispatcher)
    }
    return dispatcher
  }

  dispatch (opts, handler) {
    // Call MockAgent.get to perform additional setup before dispatching as normal
    this.get(opts.origin)
    return this[kAgent].dispatch(opts, handler)
  }

  async close () {
    await this[kAgent].close()
    this[kClients].clear()
  }

  deactivate () {
    this[kIsMockActive] = false
  }

  activate () {
    this[kIsMockActive] = true
  }

  enableNetConnect (matcher) {
    if (typeof matcher === 'string' || typeof matcher === 'function' || matcher instanceof RegExp) {
      if (Array.isArray(this[kNetConnect])) {
        this[kNetConnect].push(matcher)
      } else {
        this[kNetConnect] = [matcher]
      }
    } else if (typeof matcher === 'undefined') {
      this[kNetConnect] = true
    } else {
      throw new InvalidArgumentError('Unsupported matcher. Must be one of String|Function|RegExp.')
    }
  }

  disableNetConnect () {
    this[kNetConnect] = false
  }

  [kMockAgentSet] (origin, dispatcher) {
    this[kClients].set(origin, new WeakRef(dispatcher))
  }

  [kFactory] (origin) {
    const mockOptions = Object.assign({ agent: this }, this[kOptions])
    return this[kOptions] && this[kOptions].connections === 1
      ? new MockClient(origin, mockOptions)
      : new MockPool(origin, mockOptions)
  }

  [kMockAgentGet] (origin) {
    // First check if we can immediately find it
    const ref = this[kClients].get(origin)
    if (ref) {
      return ref.deref()
    }

    // If the origin is not a string create a dummy parent pool and return to user
    if (typeof origin !== 'string') {
      const dispatcher = this[kFactory]('http://localhost:9999')
      this[kMockAgentSet](origin, dispatcher)
      return dispatcher
    }

    // If we match, create a pool and assign the same dispatches
    for (const [keyMatcher, nonExplicitRef] of Array.from(this[kClients])) {
      const nonExplicitDispatcher = nonExplicitRef.deref()
      if (nonExplicitDispatcher && typeof keyMatcher !== 'string' && matchValue(keyMatcher, origin)) {
        const dispatcher = this[kFactory](origin)
        this[kMockAgentSet](origin, dispatcher)
        dispatcher[kDispatches] = nonExplicitDispatcher[kDispatches]
        return dispatcher
      }
    }
  }

  [kGetNetConnect] () {
    return this[kNetConnect]
  }
}

module.exports = MockAgent


/***/ }),

/***/ 8687:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { promisify } = __nccwpck_require__(3837)
const Client = __nccwpck_require__(3598)
const { buildMockDispatch } = __nccwpck_require__(9323)
const {
  kDispatches,
  kMockAgent,
  kClose,
  kOriginalClose,
  kOrigin,
  kOriginalDispatch,
  kConnected
} = __nccwpck_require__(4347)
const { MockInterceptor } = __nccwpck_require__(410)
const Symbols = __nccwpck_require__(2785)
const { InvalidArgumentError } = __nccwpck_require__(8045)

/**
 * MockClient provides an API that extends the Client to influence the mockDispatches.
 */
class MockClient extends Client {
  constructor (origin, opts) {
    super(origin, opts)

    if (!opts || !opts.agent || typeof opts.agent.dispatch !== 'function') {
      throw new InvalidArgumentError('Argument opts.agent must implement Agent')
    }

    this[kMockAgent] = opts.agent
    this[kOrigin] = origin
    this[kDispatches] = []
    this[kConnected] = 1
    this[kOriginalDispatch] = this.dispatch
    this[kOriginalClose] = this.close.bind(this)

    this.dispatch = buildMockDispatch.call(this)
    this.close = this[kClose]
  }

  get [Symbols.kConnected] () {
    return this[kConnected]
  }

  /**
   * Sets up the base interceptor for mocking replies from undici.
   */
  intercept (opts) {
    return new MockInterceptor(opts, this[kDispatches])
  }

  async [kClose] () {
    await promisify(this[kOriginalClose])()
    this[kConnected] = 0
    this[kMockAgent][Symbols.kClients].delete(this[kOrigin])
  }
}

module.exports = MockClient


/***/ }),

/***/ 888:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { UndiciError } = __nccwpck_require__(8045)

class MockNotMatchedError extends UndiciError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, MockNotMatchedError)
    this.name = 'MockNotMatchedError'
    this.message = message || 'The request does not match any registered mock dispatches'
    this.code = 'UND_MOCK_ERR_MOCK_NOT_MATCHED'
  }
}

module.exports = {
  MockNotMatchedError
}


/***/ }),

/***/ 410:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { getResponseData, buildKey, addMockDispatch } = __nccwpck_require__(9323)
const {
  kDispatches,
  kDispatchKey,
  kDefaultHeaders,
  kDefaultTrailers,
  kContentLength,
  kMockDispatch
} = __nccwpck_require__(4347)
const { InvalidArgumentError, InvalidReturnValueError } = __nccwpck_require__(8045)

/**
 * Defines the scope API for a interceptor reply
 */
class MockScope {
  constructor (mockDispatch) {
    this[kMockDispatch] = mockDispatch
  }

  /**
   * Delay a reply by a set amount in ms.
   */
  delay (waitInMs) {
    if (typeof waitInMs !== 'number' || !Number.isInteger(waitInMs) || waitInMs <= 0) {
      throw new InvalidArgumentError('waitInMs must be a valid integer > 0')
    }

    this[kMockDispatch].delay = waitInMs
    return this
  }

  /**
   * For a defined reply, never mark as consumed.
   */
  persist () {
    this[kMockDispatch].persist = true
    return this
  }

  /**
   * Allow one to define a reply for a set amount of matching requests.
   */
  times (repeatTimes) {
    if (typeof repeatTimes !== 'number' || !Number.isInteger(repeatTimes) || repeatTimes <= 0) {
      throw new InvalidArgumentError('repeatTimes must be a valid integer > 0')
    }

    this[kMockDispatch].times = repeatTimes
    return this
  }
}

/**
 * Defines an interceptor for a Mock
 */
class MockInterceptor {
  constructor (opts, mockDispatches) {
    if (typeof opts !== 'object') {
      throw new InvalidArgumentError('opts must be an object')
    }
    if (typeof opts.path === 'undefined') {
      throw new InvalidArgumentError('opts.path must be defined')
    }
    if (typeof opts.method === 'undefined') {
      throw new InvalidArgumentError('opts.method must be defined')
    }

    this[kDispatchKey] = buildKey(opts)
    this[kDispatches] = mockDispatches
    this[kDefaultHeaders] = {}
    this[kDefaultTrailers] = {}
    this[kContentLength] = false
  }

  createMockScopeDispatchData(statusCode, data, responseOptions = {}) {
    const responseData = getResponseData(data)
    const contentLength = this[kContentLength] ? { 'content-length': responseData.length } : {}
    const headers = { ...this[kDefaultHeaders], ...contentLength, ...responseOptions.headers }
    const trailers = { ...this[kDefaultTrailers], ...responseOptions.trailers }

    return { statusCode, data, headers, trailers };
  }

  validateReplyParameters(statusCode, data, responseOptions) {
    if (typeof statusCode === 'undefined') {
      throw new InvalidArgumentError('statusCode must be defined')
    }
    if (typeof data === 'undefined') {
      throw new InvalidArgumentError('data must be defined')
    }
    if (typeof responseOptions !== 'object') {
      throw new InvalidArgumentError('responseOptions must be an object')
    }
  }

  /**
   * Mock an undici request with a defined reply.
   */
  reply (replyData) {
    // Values of reply aren't available right now as they
    // can only be available when the reply callback is invoked.
    if (typeof replyData === 'function') {
      // We'll first wrap the provided callback in another function,
      // this function will properly resolve the data from the callback
      // when invoked.
      const wrappedDefaultsCallback = (opts) => {
        // Our reply options callback contains the parameter for statusCode, data and options.
        const resolvedData = replyData(opts);

        // Check if it is in the right format
        if (typeof resolvedData !== 'object') {
          throw new InvalidArgumentError('reply options callback must return an object')
        }

        const { statusCode, data, responseOptions = {}} = resolvedData;
        this.validateReplyParameters(statusCode, data, responseOptions);
        // Since the values can be obtained immediately we return them
        // from this higher order function that will be resolved later.
        return { 
          ...this.createMockScopeDispatchData(statusCode, data, responseOptions)
        }
      }

      // Add usual dispatch data, but this time set the data parameter to function that will eventually provide data.
      const newMockDispatch = addMockDispatch(this[kDispatches], this[kDispatchKey], wrappedDefaultsCallback)
      return new MockScope(newMockDispatch);
    }

    // We can have either one or three parameters, if we get here,
    // we should have 2-3 parameters. So we spread the arguments of
    // this function to obtain the parameters, since replyData will always
    // just be the statusCode. 
    const [statusCode, data, responseOptions = {}] = [...arguments];   
    this.validateReplyParameters(statusCode, data, responseOptions);

    // Send in-already provided data like usual
    const dispatchData = this.createMockScopeDispatchData(statusCode, data, responseOptions);
    const newMockDispatch = addMockDispatch(this[kDispatches], this[kDispatchKey], dispatchData)
    return new MockScope(newMockDispatch)
    
  }

  /**
   * Mock an undici request with a defined error.
   */
  replyWithError (error) {
    if (typeof error === 'undefined') {
      throw new InvalidArgumentError('error must be defined')
    }

    const newMockDispatch = addMockDispatch(this[kDispatches], this[kDispatchKey], { error })
    return new MockScope(newMockDispatch)
  }

  /**
   * Set default reply headers on the interceptor for subsequent replies
   */
  defaultReplyHeaders (headers) {
    if (typeof headers === 'undefined') {
      throw new InvalidArgumentError('headers must be defined')
    }

    this[kDefaultHeaders] = headers
    return this
  }

  /**
   * Set default reply trailers on the interceptor for subsequent replies
   */
  defaultReplyTrailers (trailers) {
    if (typeof trailers === 'undefined') {
      throw new InvalidArgumentError('trailers must be defined')
    }

    this[kDefaultTrailers] = trailers
    return this
  }

  /**
   * Set reply content length header for replies on the interceptor
   */
  replyContentLength () {
    this[kContentLength] = true
    return this
  }
}

module.exports.MockInterceptor = MockInterceptor
module.exports.MockScope = MockScope


/***/ }),

/***/ 6193:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { promisify } = __nccwpck_require__(3837)
const Pool = __nccwpck_require__(4634)
const { buildMockDispatch } = __nccwpck_require__(9323)
const {
  kDispatches,
  kMockAgent,
  kClose,
  kOriginalClose,
  kOrigin,
  kOriginalDispatch,
  kConnected
} = __nccwpck_require__(4347)
const { MockInterceptor } = __nccwpck_require__(410)
const Symbols = __nccwpck_require__(2785)
const { InvalidArgumentError } = __nccwpck_require__(8045)

/**
 * MockPool provides an API that extends the Pool to influence the mockDispatches.
 */
class MockPool extends Pool {
  constructor (origin, opts) {
    super(origin, opts)

    if (!opts || !opts.agent || typeof opts.agent.dispatch !== 'function') {
      throw new InvalidArgumentError('Argument opts.agent must implement Agent')
    }

    this[kMockAgent] = opts.agent
    this[kOrigin] = origin
    this[kDispatches] = []
    this[kConnected] = 1
    this[kOriginalDispatch] = this.dispatch
    this[kOriginalClose] = this.close.bind(this)

    this.dispatch = buildMockDispatch.call(this)
    this.close = this[kClose]
  }

  get [Symbols.kConnected] () {
    return this[kConnected]
  }

  /**
   * Sets up the base interceptor for mocking replies from undici.
   */
  intercept (opts) {
    return new MockInterceptor(opts, this[kDispatches])
  }

  async [kClose] () {
    await promisify(this[kOriginalClose])()
    this[kConnected] = 0
    this[kMockAgent][Symbols.kClients].delete(this[kOrigin])
  }
}

module.exports = MockPool


/***/ }),

/***/ 4347:
/***/ ((module) => {

"use strict";


module.exports = {
  kAgent: Symbol('agent'),
  kOptions: Symbol('options'),
  kFactory: Symbol('factory'),
  kDispatches: Symbol('dispatches'),
  kDispatchKey: Symbol('dispatch key'),
  kDefaultHeaders: Symbol('default headers'),
  kDefaultTrailers: Symbol('default trailers'),
  kContentLength: Symbol('content length'),
  kMockAgent: Symbol('mock agent'),
  kMockAgentSet: Symbol('mock agent set'),
  kMockAgentGet: Symbol('mock agent get'),
  kMockDispatch: Symbol('mock dispatch'),
  kClose: Symbol('close'),
  kOriginalClose: Symbol('original agent close'),
  kOrigin: Symbol('origin'),
  kIsMockActive: Symbol('is mock active'),
  kNetConnect: Symbol('net connect'),
  kGetNetConnect: Symbol('get net connect'),
  kConnected: Symbol('connected')
}


/***/ }),

/***/ 9323:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { MockNotMatchedError } = __nccwpck_require__(888)
const { kHeadersList } = __nccwpck_require__(2785)
const {
  kDispatches,
  kMockAgent,
  kOriginalDispatch,
  kOrigin,
  kIsMockActive,
  kGetNetConnect
} = __nccwpck_require__(4347)

function matchValue (match, value) {
  if (typeof match === 'string') {
    return match === value
  }
  if (match instanceof RegExp) {
    return match.test(value)
  }
  if (typeof match === 'function') {
    return match(value) === true
  }
  return false
}

function matchHeaders (mockDispatch, headers) {
  if (typeof mockDispatch.headers === 'undefined') {
    return true
  }
  if (typeof headers !== 'object' || typeof mockDispatch.headers !== 'object') {
    return false
  }

  for (const [matchHeaderName, matchHeaderValue] of Object.entries(mockDispatch.headers)) {
    const header = typeof headers.get === 'function' ? headers.get(matchHeaderName) : headers[matchHeaderName]

    if (!matchValue(matchHeaderValue, header)) {
      return false
    }
  }
  return true
}

function matchKey (mockDispatch, { path, method, body, headers }) {
  const pathMatch = matchValue(mockDispatch.path, path)
  const methodMatch = matchValue(mockDispatch.method, method)
  const bodyMatch = typeof mockDispatch.body !== 'undefined' ? matchValue(mockDispatch.body, body) : true
  const headersMatch = matchHeaders(mockDispatch, headers)
  return pathMatch && methodMatch && bodyMatch && headersMatch
}

function getResponseData (data) {
  if (Buffer.isBuffer(data)) {
    return data
  } else if (typeof data === 'object') {
    return JSON.stringify(data)
  } else {
    return data.toString()
  }
}

function getMockDispatch (mockDispatches, key) {
  // Match path
  let matchedMockDispatches = mockDispatches.filter(({ consumed }) => !consumed).filter(({ path }) => matchValue(path, key.path))
  if (matchedMockDispatches.length === 0) {
    throw new MockNotMatchedError(`Mock dispatch not matched for path '${key.path}'`)
  }

  // Match method
  matchedMockDispatches = matchedMockDispatches.filter(({ method }) => matchValue(method, key.method))
  if (matchedMockDispatches.length === 0) {
    throw new MockNotMatchedError(`Mock dispatch not matched for method '${key.method}'`)
  }

  // Match body
  matchedMockDispatches = matchedMockDispatches.filter(({ body }) => typeof body !== 'undefined' ? matchValue(body, key.body) : true)
  if (matchedMockDispatches.length === 0) {
    throw new MockNotMatchedError(`Mock dispatch not matched for body '${key.body}'`)
  }

  // Match headers
  matchedMockDispatches = matchedMockDispatches.filter((mockDispatch) => matchHeaders(mockDispatch, key.headers))
  if (matchedMockDispatches.length === 0) {
    throw new MockNotMatchedError(`Mock dispatch not matched for headers '${typeof key.headers === 'object' ? JSON.stringify(key.headers) : key.headers}'`)
  }

  return matchedMockDispatches[0]
}

function addMockDispatch (mockDispatches, key, data) {
  const baseData = { times: null, persist: false, consumed: false }
  const replyData = typeof data === 'function' ? { callback: data } : { ...data };
  const newMockDispatch = { ...baseData, ...key, data: { error: null, ...replyData } }
  mockDispatches.push(newMockDispatch)
  return newMockDispatch
}

function deleteMockDispatch (mockDispatches, key) {
  const index = mockDispatches.findIndex(dispatch => {
    if (!dispatch.consumed) {
      return false
    }
    return matchKey(dispatch, key)
  })
  if (index !== -1) {
    mockDispatches.splice(index, 1)
  }
}

function buildKey (opts) {
  const { path, method, body, headers } = opts
  return {
    path,
    method,
    body,
    headers
  }
}

function generateKeyValues (data) {
  return Object.entries(data).reduce((keyValuePairs, [key, value]) => [...keyValuePairs, key, value], [])
}

async function getResponse (body) {
  const buffers = []
  for await (const data of body) {
    buffers.push(data)
  }
  return Buffer.concat(buffers).toString('utf8')
}

/**
 * Mock dispatch function used to simulate undici dispatches
 */
function mockDispatch (opts, handler) {
  // Get mock dispatch from built key
  const key = buildKey(opts)
  let mockDispatch = getMockDispatch(this[kDispatches], key)

  // Here's where we resolve a callback if a callback is present for the dispatch data.
  if (mockDispatch.data.callback) {
    mockDispatch.data = { ...mockDispatch.data, ...mockDispatch.data.callback(opts) }
  }

  // Parse mockDispatch data
  const { data: { statusCode, data, headers, trailers, error }, delay, persist } = mockDispatch
  let { times } = mockDispatch
  if (typeof times === 'number' && times > 0) {
    times = --mockDispatch.times
  }

  // If persist is true, skip
  // Or if times is a number and > 0, skip
  // Otherwise, mark as consumed

  if (!(persist === true || (typeof times === 'number' && times > 0))) {
    mockDispatch.consumed = true
  }

  // If specified, trigger dispatch error
  if (error !== null) {
    deleteMockDispatch(this[kDispatches], key)
    handler.onError(error)
    return true
  }

  // Handle the request with a delay if necessary
  if (typeof delay === 'number' && delay > 0) {
    setTimeout(() => {
      handleReply(this[kDispatches])
    }, delay)
  } else {
    handleReply(this[kDispatches])
  }

  function handleReply (mockDispatches) {
    const responseData = getResponseData(typeof data === 'function' ? data(opts) : data);
    const responseHeaders = generateKeyValues(headers)
    const responseTrailers = generateKeyValues(trailers)

    handler.onHeaders(statusCode, responseHeaders, resume)
    handler.onData(Buffer.from(responseData))
    handler.onComplete(responseTrailers)
    deleteMockDispatch(mockDispatches, key)
  }

  function resume () {}

  return true
}

function buildMockDispatch () {
  const agent = this[kMockAgent]
  const origin = this[kOrigin]
  const originalDispatch = this[kOriginalDispatch]

  return function dispatch (opts, handler) {
    if (agent[kIsMockActive]) {
      try {
        mockDispatch.call(this, opts, handler)
      } catch (error) {
        if (error instanceof MockNotMatchedError) {
          const netConnect = agent[kGetNetConnect]()
          if (netConnect === false) {
            throw new MockNotMatchedError(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect disabled)`)
          }
          if (checkNetConnect(netConnect, origin)) {
            originalDispatch.call(this, opts, handler)
          } else {
            throw new MockNotMatchedError(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect is not enabled for this origin)`)
          }
        } else {
          throw error
        }
      }
    } else {
      originalDispatch.call(this, opts, handler)
    }
  }
}

function checkNetConnect (netConnect, origin) {
  const url = new URL(origin)
  if (netConnect === true) {
    return true
  } else if (Array.isArray(netConnect) && netConnect.some((matcher) => matchValue(matcher, url.host))) {
    return true
  }
  return false
}

function buildMockOptions (opts) {
  if (opts) {
    const { agent, ...mockOptions } = opts
    return mockOptions
  }
}

module.exports = {
  getResponseData,
  getMockDispatch,
  addMockDispatch,
  deleteMockDispatch,
  buildKey,
  generateKeyValues,
  matchValue,
  getResponse,
  mockDispatch,
  buildMockDispatch,
  checkNetConnect,
  buildMockOptions
}


/***/ }),

/***/ 8266:
/***/ ((module) => {

"use strict";
/* eslint-disable */



// Extracted from node/lib/internal/fixed_queue.js

// Currently optimal queue size, tested on V8 6.0 - 6.6. Must be power of two.
const kSize = 2048;
const kMask = kSize - 1;

// The FixedQueue is implemented as a singly-linked list of fixed-size
// circular buffers. It looks something like this:
//
//  head                                                       tail
//    |                                                          |
//    v                                                          v
// +-----------+ <-----\       +-----------+ <------\         +-----------+
// |  [null]   |        \----- |   next    |         \------- |   next    |
// +-----------+               +-----------+                  +-----------+
// |   item    | <-- bottom    |   item    | <-- bottom       |  [empty]  |
// |   item    |               |   item    |                  |  [empty]  |
// |   item    |               |   item    |                  |  [empty]  |
// |   item    |               |   item    |                  |  [empty]  |
// |   item    |               |   item    |       bottom --> |   item    |
// |   item    |               |   item    |                  |   item    |
// |    ...    |               |    ...    |                  |    ...    |
// |   item    |               |   item    |                  |   item    |
// |   item    |               |   item    |                  |   item    |
// |  [empty]  | <-- top       |   item    |                  |   item    |
// |  [empty]  |               |   item    |                  |   item    |
// |  [empty]  |               |  [empty]  | <-- top  top --> |  [empty]  |
// +-----------+               +-----------+                  +-----------+
//
// Or, if there is only one circular buffer, it looks something
// like either of these:
//
//  head   tail                                 head   tail
//    |     |                                     |     |
//    v     v                                     v     v
// +-----------+                               +-----------+
// |  [null]   |                               |  [null]   |
// +-----------+                               +-----------+
// |  [empty]  |                               |   item    |
// |  [empty]  |                               |   item    |
// |   item    | <-- bottom            top --> |  [empty]  |
// |   item    |                               |  [empty]  |
// |  [empty]  | <-- top            bottom --> |   item    |
// |  [empty]  |                               |   item    |
// +-----------+                               +-----------+
//
// Adding a value means moving `top` forward by one, removing means
// moving `bottom` forward by one. After reaching the end, the queue
// wraps around.
//
// When `top === bottom` the current queue is empty and when
// `top + 1 === bottom` it's full. This wastes a single space of storage
// but allows much quicker checks.

class FixedCircularBuffer {
  constructor() {
    this.bottom = 0;
    this.top = 0;
    this.list = new Array(kSize);
    this.next = null;
  }

  isEmpty() {
    return this.top === this.bottom;
  }

  isFull() {
    return ((this.top + 1) & kMask) === this.bottom;
  }

  push(data) {
    this.list[this.top] = data;
    this.top = (this.top + 1) & kMask;
  }

  shift() {
    const nextItem = this.list[this.bottom];
    if (nextItem === undefined)
      return null;
    this.list[this.bottom] = undefined;
    this.bottom = (this.bottom + 1) & kMask;
    return nextItem;
  }
}

module.exports = class FixedQueue {
  constructor() {
    this.head = this.tail = new FixedCircularBuffer();
  }

  isEmpty() {
    return this.head.isEmpty();
  }

  push(data) {
    if (this.head.isFull()) {
      // Head is full: Creates a new queue, sets the old queue's `.next` to it,
      // and sets it as the new main queue.
      this.head = this.head.next = new FixedCircularBuffer();
    }
    this.head.push(data);
  }

  shift() {
    const tail = this.tail;
    const next = tail.shift();
    if (tail.isEmpty() && tail.next !== null) {
      // If there is another queue, it forms the new tail.
      this.tail = tail.next;
    }
    return next;
  }
};


/***/ }),

/***/ 3198:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const Dispatcher = __nccwpck_require__(412)
const {
  ClientDestroyedError,
  ClientClosedError,
  InvalidArgumentError
} = __nccwpck_require__(8045)
const FixedQueue = __nccwpck_require__(8266)
const { kSize, kRunning, kPending, kBusy, kUrl } = __nccwpck_require__(2785)

const kClients = Symbol('clients')
const kNeedDrain = Symbol('needDrain')
const kQueue = Symbol('queue')
const kDestroyed = Symbol('destroyed')
const kClosedPromise = Symbol('closed promise')
const kClosedResolve = Symbol('closed resolve')
const kOnDrain = Symbol('onDrain')
const kOnConnect = Symbol('onConnect')
const kOnDisconnect = Symbol('onDisconnect')
const kOnConnectionError = Symbol('onConnectionError')
const kQueued = Symbol('queued')
const kGetDispatcher = Symbol('get dispatcher')
const kAddClient = Symbol('add client')
const kRemoveClient = Symbol('remove client')

class PoolBase extends Dispatcher {
  constructor () {
    super()

    this[kQueue] = new FixedQueue()
    this[kClosedPromise] = null
    this[kClosedResolve] = null
    this[kDestroyed] = false
    this[kClients] = []
    this[kNeedDrain] = false
    this[kQueued] = 0

    const pool = this

    this[kOnDrain] = function onDrain (origin, targets) {
      const queue = pool[kQueue]

      let needDrain = false

      while (!needDrain) {
        const item = queue.shift()
        if (!item) {
          break
        }
        pool[kQueued]--
        needDrain = !this.dispatch(item.opts, item.handler)
      }

      this[kNeedDrain] = needDrain

      if (!this[kNeedDrain] && pool[kNeedDrain]) {
        pool[kNeedDrain] = false
        pool.emit('drain', origin, [pool, ...targets])
      }

      if (pool[kClosedResolve] && queue.isEmpty()) {
        Promise
          .all(pool[kClients].map(c => c.close()))
          .then(pool[kClosedResolve])
      }
    }

    this[kOnConnect] = (origin, targets) => {
      pool.emit('connect', origin, [pool, ...targets])
    }

    this[kOnDisconnect] = (origin, targets, err) => {
      pool.emit('disconnect', origin, [pool, ...targets], err)
    }

    this[kOnConnectionError] = (origin, targets, err) => {
      pool.emit('connectionError', origin, [pool, ...targets], err)
    }
  }

  get [kBusy] () {
    return this[kNeedDrain]
  }

  get [kPending] () {
    let ret = this[kQueued]
    for (const { [kPending]: pending } of this[kClients]) {
      ret += pending
    }
    return ret
  }

  get [kRunning] () {
    let ret = 0
    for (const { [kRunning]: running } of this[kClients]) {
      ret += running
    }
    return ret
  }

  get [kSize] () {
    let ret = this[kQueued]
    for (const { [kSize]: size } of this[kClients]) {
      ret += size
    }
    return ret
  }

  get destroyed () {
    return this[kDestroyed]
  }

  get closed () {
    return this[kClosedPromise] != null
  }

  close (cb) {
    try {
      if (this[kDestroyed]) {
        throw new ClientDestroyedError()
      }

      if (!this[kClosedPromise]) {
        if (this[kQueue].isEmpty()) {
          this[kClosedPromise] = Promise.all(this[kClients].map(c => c.close()))
        } else {
          this[kClosedPromise] = new Promise((resolve) => {
            this[kClosedResolve] = resolve
          })
        }
        this[kClosedPromise] = this[kClosedPromise].then(() => {
          this[kDestroyed] = true
        })
      }

      if (cb) {
        this[kClosedPromise].then(() => cb(null, null))
      } else {
        return this[kClosedPromise]
      }
    } catch (err) {
      if (cb) {
        cb(err)
      } else {
        return Promise.reject(err)
      }
    }
  }

  destroy (err, cb) {
    this[kDestroyed] = true

    if (typeof err === 'function') {
      cb = err
      err = null
    }

    if (!err) {
      err = new ClientDestroyedError()
    }

    while (true) {
      const item = this[kQueue].shift()
      if (!item) {
        break
      }
      item.handler.onError(err)
    }

    const promise = Promise.all(this[kClients].map(c => c.destroy(err)))
    if (cb) {
      promise.then(() => cb(null, null))
    } else {
      return promise
    }
  }

  dispatch (opts, handler) {
    if (!handler || typeof handler !== 'object') {
      throw new InvalidArgumentError('handler must be an object')
    }

    try {
      if (this[kDestroyed]) {
        throw new ClientDestroyedError()
      }

      if (this[kClosedPromise]) {
        throw new ClientClosedError()
      }

      const dispatcher = this[kGetDispatcher]()

      if (!dispatcher) {
        this[kNeedDrain] = true
        this[kQueue].push({ opts, handler })
        this[kQueued]++
      } else if (!dispatcher.dispatch(opts, handler)) {
        dispatcher[kNeedDrain] = true
        this[kNeedDrain] = !this[kGetDispatcher]()
      }
    } catch (err) {
      if (typeof handler.onError !== 'function') {
        throw new InvalidArgumentError('invalid onError method')
      }

      handler.onError(err)
    }

    return !this[kNeedDrain]
  }

  [kAddClient] (client) {
    client
      .on('drain', this[kOnDrain])
      .on('connect', this[kOnConnect])
      .on('disconnect', this[kOnDisconnect])
      .on('connectionError', this[kOnConnectionError])

    this[kClients].push(client)

    if (this[kNeedDrain]) {
      process.nextTick(() => {
        if (this[kNeedDrain]) {
          this[kOnDrain](client[kUrl], [this, client])
        }
      })
    }

    return this
  }

  [kRemoveClient] (client) {
    client.close(() => {
      const idx = this[kClients].indexOf(client)
      if (idx !== -1) {
        this[kClients].splice(idx, 1)
      }
    })

    this[kNeedDrain] = this[kClients].some(dispatcher => (
      !dispatcher[kNeedDrain] &&
      dispatcher.closed !== true &&
      dispatcher.destroyed !== true
    ))
  }
}

module.exports = {
  PoolBase,
  kClients,
  kNeedDrain,
  kAddClient,
  kRemoveClient,
  kGetDispatcher
}


/***/ }),

/***/ 4634:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const {
  PoolBase,
  kClients,
  kNeedDrain,
  kAddClient,
  kGetDispatcher
} = __nccwpck_require__(3198)
const Client = __nccwpck_require__(3598)
const {
  InvalidArgumentError
} = __nccwpck_require__(8045)
const util = __nccwpck_require__(3983)
const { kUrl } = __nccwpck_require__(2785)
const buildConnector = __nccwpck_require__(2067)

const kOptions = Symbol('options')
const kConnections = Symbol('connections')
const kFactory = Symbol('factory')

function defaultFactory (origin, opts) {
  return new Client(origin, opts)
}

class Pool extends PoolBase {
  constructor (origin, {
    connections,
    factory = defaultFactory,
    connect,
    connectTimeout,
    tls,
    maxCachedSessions,
    socketPath,
    ...options
  } = {}) {
    super()

    if (connections != null && (!Number.isFinite(connections) || connections < 0)) {
      throw new InvalidArgumentError('invalid connections')
    }

    if (typeof factory !== 'function') {
      throw new InvalidArgumentError('factory must be a function.')
    }

    if (connect != null && typeof connect !== 'function' && typeof connect !== 'object') {
      throw new InvalidArgumentError('connect must be a function or an object')
    }

    if (typeof connect !== 'function') {
      connect = buildConnector({
        ...tls,
        maxCachedSessions,
        socketPath,
        timeout: connectTimeout == null ? 10e3 : connectTimeout,
        ...connect
      })
    }

    this[kConnections] = connections || null
    this[kUrl] = util.parseOrigin(origin)
    this[kOptions] = { ...util.deepClone(options), connect }
    this[kFactory] = factory
  }

  [kGetDispatcher] () {
    let dispatcher = this[kClients].find(dispatcher => !dispatcher[kNeedDrain])

    if (dispatcher) {
      return dispatcher
    }

    if (!this[kConnections] || this[kClients].length < this[kConnections]) {
      dispatcher = this[kFactory](this[kUrl], this[kOptions])
      this[kAddClient](dispatcher)
    }

    return dispatcher
  }
}

module.exports = Pool


/***/ }),

/***/ 7858:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { kProxy } = __nccwpck_require__(2785)
const url = __nccwpck_require__(7310)
const Agent = __nccwpck_require__(7890)
const Dispatcher = __nccwpck_require__(412)
const { InvalidArgumentError } = __nccwpck_require__(8045)

const kAgent = Symbol('proxy agent')

class ProxyAgent extends Dispatcher {
  constructor (opts) {
    super(opts)
    this[kProxy] = buildProxyOptions(opts)
    this[kAgent] = new Agent(opts)
  }

  dispatch (opts, handler) {
    const { host } = url.parse(opts.origin)
    return this[kAgent].dispatch(
      {
        ...opts,
        origin: this[kProxy].uri,
        path: opts.origin + opts.path,
        headers: {
          ...opts.headers,
          host
        }
      },
      handler
    )
  }

  async close () {
    await this[kAgent].close()
  }
}

function buildProxyOptions (opts) {
  if (typeof opts === 'string') {
    opts = { uri: opts }
  }

  if (!opts || !opts.uri) {
    throw new InvalidArgumentError('Proxy opts.uri is mandatory')
  }

  return {
    uri: opts.uri,
    protocol: opts.protocol || 'https'
  }
}

module.exports = ProxyAgent


/***/ }),

/***/ 1462:
/***/ ((module) => {

module.exports = eval("require")("pino-pretty");


/***/ }),

/***/ 4978:
/***/ ((module) => {

module.exports = eval("require")("util/types");


/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 852:
/***/ ((module) => {

"use strict";
module.exports = require("async_hooks");

/***/ }),

/***/ 4300:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 7643:
/***/ ((module) => {

"use strict";
module.exports = require("diagnostics_channel");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 8188:
/***/ ((module) => {

"use strict";
module.exports = require("module");

/***/ }),

/***/ 1808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 7561:
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ 9411:
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 4074:
/***/ ((module) => {

"use strict";
module.exports = require("perf_hooks");

/***/ }),

/***/ 2781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 5356:
/***/ ((module) => {

"use strict";
module.exports = require("stream/web");

/***/ }),

/***/ 4404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 7310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 6144:
/***/ ((module) => {

"use strict";
module.exports = require("vm");

/***/ }),

/***/ 1267:
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ 9796:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 5848:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const errSerializer = __nccwpck_require__(7000)
const reqSerializers = __nccwpck_require__(4521)
const resSerializers = __nccwpck_require__(352)

module.exports = {
  err: errSerializer,
  mapHttpRequest: reqSerializers.mapHttpRequest,
  mapHttpResponse: resSerializers.mapHttpResponse,
  req: reqSerializers.reqSerializer,
  res: resSerializers.resSerializer,

  wrapErrorSerializer: function wrapErrorSerializer (customSerializer) {
    if (customSerializer === errSerializer) return customSerializer
    return function wrapErrSerializer (err) {
      return customSerializer(errSerializer(err))
    }
  },

  wrapRequestSerializer: function wrapRequestSerializer (customSerializer) {
    if (customSerializer === reqSerializers.reqSerializer) return customSerializer
    return function wrappedReqSerializer (req) {
      return customSerializer(reqSerializers.reqSerializer(req))
    }
  },

  wrapResponseSerializer: function wrapResponseSerializer (customSerializer) {
    if (customSerializer === resSerializers.resSerializer) return customSerializer
    return function wrappedResSerializer (res) {
      return customSerializer(resSerializers.resSerializer(res))
    }
  }
}


/***/ }),

/***/ 7000:
/***/ ((module) => {

"use strict";


module.exports = errSerializer

const { toString } = Object.prototype
const seen = Symbol('circular-ref-tag')
const rawSymbol = Symbol('pino-raw-err-ref')
const pinoErrProto = Object.create({}, {
  type: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  message: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  stack: {
    enumerable: true,
    writable: true,
    value: undefined
  },
  raw: {
    enumerable: false,
    get: function () {
      return this[rawSymbol]
    },
    set: function (val) {
      this[rawSymbol] = val
    }
  }
})
Object.defineProperty(pinoErrProto, rawSymbol, {
  writable: true,
  value: {}
})

function errSerializer (err) {
  if (!(err instanceof Error)) {
    return err
  }

  err[seen] = undefined // tag to prevent re-looking at this
  const _err = Object.create(pinoErrProto)
  _err.type = toString.call(err.constructor) === '[object Function]'
    ? err.constructor.name
    : err.name
  _err.message = err.message
  _err.stack = err.stack
  for (const key in err) {
    if (_err[key] === undefined) {
      const val = err[key]
      if (val instanceof Error) {
        /* eslint-disable no-prototype-builtins */
        if (!val.hasOwnProperty(seen)) {
          _err[key] = errSerializer(val)
        }
      } else {
        _err[key] = val
      }
    }
  }

  delete err[seen] // clean up tag in case err is serialized again later
  _err.raw = err
  return _err
}


/***/ }),

/***/ 4521:
/***/ ((module) => {

"use strict";


module.exports = {
  mapHttpRequest,
  reqSerializer
}

const rawSymbol = Symbol('pino-raw-req-ref')
const pinoReqProto = Object.create({}, {
  id: {
    enumerable: true,
    writable: true,
    value: ''
  },
  method: {
    enumerable: true,
    writable: true,
    value: ''
  },
  url: {
    enumerable: true,
    writable: true,
    value: ''
  },
  query: {
    enumerable: true,
    writable: true,
    value: ''
  },
  params: {
    enumerable: true,
    writable: true,
    value: ''
  },
  headers: {
    enumerable: true,
    writable: true,
    value: {}
  },
  remoteAddress: {
    enumerable: true,
    writable: true,
    value: ''
  },
  remotePort: {
    enumerable: true,
    writable: true,
    value: ''
  },
  raw: {
    enumerable: false,
    get: function () {
      return this[rawSymbol]
    },
    set: function (val) {
      this[rawSymbol] = val
    }
  }
})
Object.defineProperty(pinoReqProto, rawSymbol, {
  writable: true,
  value: {}
})

function reqSerializer (req) {
  // req.info is for hapi compat.
  const connection = req.info || req.socket
  const _req = Object.create(pinoReqProto)
  _req.id = (typeof req.id === 'function' ? req.id() : (req.id || (req.info ? req.info.id : undefined)))
  _req.method = req.method
  // req.originalUrl is for expressjs compat.
  if (req.originalUrl) {
    _req.url = req.originalUrl
    _req.query = req.query
    _req.params = req.params
  } else {
    // req.url.path is  for hapi compat.
    _req.url = req.path || (req.url ? (req.url.path || req.url) : undefined)
  }
  _req.headers = req.headers
  _req.remoteAddress = connection && connection.remoteAddress
  _req.remotePort = connection && connection.remotePort
  // req.raw is  for hapi compat/equivalence
  _req.raw = req.raw || req
  return _req
}

function mapHttpRequest (req) {
  return {
    req: reqSerializer(req)
  }
}


/***/ }),

/***/ 352:
/***/ ((module) => {

"use strict";


module.exports = {
  mapHttpResponse,
  resSerializer
}

const rawSymbol = Symbol('pino-raw-res-ref')
const pinoResProto = Object.create({}, {
  statusCode: {
    enumerable: true,
    writable: true,
    value: 0
  },
  headers: {
    enumerable: true,
    writable: true,
    value: ''
  },
  raw: {
    enumerable: false,
    get: function () {
      return this[rawSymbol]
    },
    set: function (val) {
      this[rawSymbol] = val
    }
  }
})
Object.defineProperty(pinoResProto, rawSymbol, {
  writable: true,
  value: {}
})

function resSerializer (res) {
  const _res = Object.create(pinoResProto)
  _res.statusCode = res.statusCode
  _res.headers = res.getHeaders ? res.getHeaders() : res._headers
  _res.raw = res
  return _res
}

function mapHttpResponse (res) {
  return {
    res: resSerializer(res)
  }
}


/***/ }),

/***/ 3588:
/***/ ((module) => {

"use strict";


function noOpPrepareStackTrace (_, stack) {
  return stack
}

module.exports = function getCallers () {
  const originalPrepare = Error.prepareStackTrace
  Error.prepareStackTrace = noOpPrepareStackTrace
  const stack = new Error().stack
  Error.prepareStackTrace = originalPrepare

  if (!Array.isArray(stack)) {
    return undefined
  }

  const entries = stack.slice(2)

  const fileNames = []

  for (const entry of entries) {
    if (!entry) {
      continue
    }

    fileNames.push(entry.getFileName())
  }

  return fileNames
}


/***/ }),

/***/ 6535:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const warning = __nccwpck_require__(5521)()
module.exports = warning

const warnName = 'PinoWarning'

warning.create(warnName, 'PINODEP008', 'prettyPrint is deprecated, look at https://github.com/pinojs/pino-pretty for alternatives.')

warning.create(warnName, 'PINODEP009', 'The use of pino.final is discouraged in Node.js v14+ and not required. It will be removed in the next major version')


/***/ }),

/***/ 8015:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

/* eslint no-prototype-builtins: 0 */
const {
  lsCacheSym,
  levelValSym,
  useOnlyCustomLevelsSym,
  streamSym,
  formattersSym,
  hooksSym
} = __nccwpck_require__(2232)
const { noop, genLog } = __nccwpck_require__(8433)

const levels = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60
}
const levelMethods = {
  fatal: (hook) => {
    const logFatal = genLog(levels.fatal, hook)
    return function (...args) {
      const stream = this[streamSym]
      logFatal.call(this, ...args)
      if (typeof stream.flushSync === 'function') {
        try {
          stream.flushSync()
        } catch (e) {
          // https://github.com/pinojs/pino/pull/740#discussion_r346788313
        }
      }
    }
  },
  error: (hook) => genLog(levels.error, hook),
  warn: (hook) => genLog(levels.warn, hook),
  info: (hook) => genLog(levels.info, hook),
  debug: (hook) => genLog(levels.debug, hook),
  trace: (hook) => genLog(levels.trace, hook)
}

const nums = Object.keys(levels).reduce((o, k) => {
  o[levels[k]] = k
  return o
}, {})

const initialLsCache = Object.keys(nums).reduce((o, k) => {
  o[k] = '{"level":' + Number(k)
  return o
}, {})

function genLsCache (instance) {
  const formatter = instance[formattersSym].level
  const { labels } = instance.levels
  const cache = {}
  for (const label in labels) {
    const level = formatter(labels[label], Number(label))
    cache[label] = JSON.stringify(level).slice(0, -1)
  }
  instance[lsCacheSym] = cache
  return instance
}

function isStandardLevel (level, useOnlyCustomLevels) {
  if (useOnlyCustomLevels) {
    return false
  }

  switch (level) {
    case 'fatal':
    case 'error':
    case 'warn':
    case 'info':
    case 'debug':
    case 'trace':
      return true
    default:
      return false
  }
}

function setLevel (level) {
  const { labels, values } = this.levels
  if (typeof level === 'number') {
    if (labels[level] === undefined) throw Error('unknown level value' + level)
    level = labels[level]
  }
  if (values[level] === undefined) throw Error('unknown level ' + level)
  const preLevelVal = this[levelValSym]
  const levelVal = this[levelValSym] = values[level]
  const useOnlyCustomLevelsVal = this[useOnlyCustomLevelsSym]
  const hook = this[hooksSym].logMethod

  for (const key in values) {
    if (levelVal > values[key]) {
      this[key] = noop
      continue
    }
    this[key] = isStandardLevel(key, useOnlyCustomLevelsVal) ? levelMethods[key](hook) : genLog(values[key], hook)
  }

  this.emit(
    'level-change',
    level,
    levelVal,
    labels[preLevelVal],
    preLevelVal
  )
}

function getLevel (level) {
  const { levels, levelVal } = this
  // protection against potential loss of Pino scope from serializers (edge case with circular refs - https://github.com/pinojs/pino/issues/833)
  return (levels && levels.labels) ? levels.labels[levelVal] : ''
}

function isLevelEnabled (logLevel) {
  const { values } = this.levels
  const logLevelVal = values[logLevel]
  return logLevelVal !== undefined && (logLevelVal >= this[levelValSym])
}

function mappings (customLevels = null, useOnlyCustomLevels = false) {
  const customNums = customLevels
    /* eslint-disable */
    ? Object.keys(customLevels).reduce((o, k) => {
        o[customLevels[k]] = k
        return o
      }, {})
    : null
    /* eslint-enable */

  const labels = Object.assign(
    Object.create(Object.prototype, { Infinity: { value: 'silent' } }),
    useOnlyCustomLevels ? null : nums,
    customNums
  )
  const values = Object.assign(
    Object.create(Object.prototype, { silent: { value: Infinity } }),
    useOnlyCustomLevels ? null : levels,
    customLevels
  )
  return { labels, values }
}

function assertDefaultLevelFound (defaultLevel, customLevels, useOnlyCustomLevels) {
  if (typeof defaultLevel === 'number') {
    const values = [].concat(
      Object.keys(customLevels || {}).map(key => customLevels[key]),
      useOnlyCustomLevels ? [] : Object.keys(nums).map(level => +level),
      Infinity
    )
    if (!values.includes(defaultLevel)) {
      throw Error(`default level:${defaultLevel} must be included in custom levels`)
    }
    return
  }

  const labels = Object.assign(
    Object.create(Object.prototype, { silent: { value: Infinity } }),
    useOnlyCustomLevels ? null : levels,
    customLevels
  )
  if (!(defaultLevel in labels)) {
    throw Error(`default level:${defaultLevel} must be included in custom levels`)
  }
}

function assertNoLevelCollisions (levels, customLevels) {
  const { labels, values } = levels
  for (const k in customLevels) {
    if (k in values) {
      throw Error('levels cannot be overridden')
    }
    if (customLevels[k] in labels) {
      throw Error('pre-existing level values cannot be used for new levels')
    }
  }
}

module.exports = {
  initialLsCache,
  genLsCache,
  levelMethods,
  getLevel,
  setLevel,
  isLevelEnabled,
  mappings,
  levels,
  assertNoLevelCollisions,
  assertDefaultLevelFound
}


/***/ }),

/***/ 2812:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { version } = __nccwpck_require__(4147)

module.exports = { version }


/***/ }),

/***/ 4411:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const metadata = Symbol.for('pino.metadata')
const { levels } = __nccwpck_require__(8015)

const defaultLevels = Object.create(levels)
defaultLevels.silent = Infinity

function multistream (streamsArray, opts) {
  let counter = 0

  streamsArray = streamsArray || []
  opts = opts || { dedupe: false }

  let levels = defaultLevels
  if (opts.levels && typeof opts.levels === 'object') {
    levels = opts.levels
  }

  const res = {
    write,
    add,
    flushSync,
    end,
    minLevel: 0,
    streams: [],
    clone,
    [metadata]: true
  }

  if (Array.isArray(streamsArray)) {
    streamsArray.forEach(add, res)
  } else {
    add.call(res, streamsArray)
  }

  // clean this object up
  // or it will stay allocated forever
  // as it is closed on the following closures
  streamsArray = null

  return res

  // we can exit early because the streams are ordered by level
  function write (data) {
    let dest
    const level = this.lastLevel
    const { streams } = this
    let stream
    for (let i = 0; i < streams.length; i++) {
      dest = streams[i]
      if (dest.level <= level) {
        stream = dest.stream
        if (stream[metadata]) {
          const { lastTime, lastMsg, lastObj, lastLogger } = this
          stream.lastLevel = level
          stream.lastTime = lastTime
          stream.lastMsg = lastMsg
          stream.lastObj = lastObj
          stream.lastLogger = lastLogger
        }
        if (!opts.dedupe || dest.level === level) {
          stream.write(data)
        }
      } else {
        break
      }
    }
  }

  function flushSync () {
    for (const { stream } of this.streams) {
      if (typeof stream.flushSync === 'function') {
        stream.flushSync()
      }
    }
  }

  function add (dest) {
    const { streams } = this
    if (typeof dest.write === 'function') {
      return add.call(this, { stream: dest })
    } else if (typeof dest.levelVal === 'number') {
      return add.call(this, Object.assign({}, dest, { level: dest.levelVal, levelVal: undefined }))
    } else if (typeof dest.level === 'string') {
      return add.call(this, Object.assign({}, dest, { level: levels[dest.level] }))
    } else if (typeof dest.level !== 'number') {
      // we default level to 'info'
      dest = Object.assign({}, dest, { level: 30 })
    } else {
      dest = Object.assign({}, dest)
    }
    dest.id = counter++

    streams.unshift(dest)
    streams.sort(compareByLevel)

    this.minLevel = streams[0].level

    return res
  }

  function end () {
    for (const { stream } of this.streams) {
      if (typeof stream.flushSync === 'function') {
        stream.flushSync()
      }
      stream.end()
    }
  }

  function clone (level) {
    const streams = new Array(this.streams.length)

    for (let i = 0; i < streams.length; i++) {
      streams[i] = {
        level: level,
        stream: this.streams[i].stream
      }
    }

    return {
      write,
      add,
      minLevel: level,
      streams,
      clone,
      flushSync,
      [metadata]: true
    }
  }
}

function compareByLevel (a, b) {
  return a.level - b.level
}

module.exports = multistream


/***/ }),

/***/ 3779:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/* eslint no-prototype-builtins: 0 */

const { EventEmitter } = __nccwpck_require__(2361)
const {
  lsCacheSym,
  levelValSym,
  setLevelSym,
  getLevelSym,
  chindingsSym,
  parsedChindingsSym,
  mixinSym,
  asJsonSym,
  writeSym,
  mixinMergeStrategySym,
  timeSym,
  timeSliceIndexSym,
  streamSym,
  serializersSym,
  formattersSym,
  useOnlyCustomLevelsSym,
  needsMetadataGsym,
  redactFmtSym,
  stringifySym,
  formatOptsSym,
  stringifiersSym
} = __nccwpck_require__(2232)
const {
  getLevel,
  setLevel,
  isLevelEnabled,
  mappings,
  initialLsCache,
  genLsCache,
  assertNoLevelCollisions
} = __nccwpck_require__(8015)
const {
  asChindings,
  asJson,
  buildFormatters,
  stringify
} = __nccwpck_require__(8433)
const {
  version
} = __nccwpck_require__(2812)
const redaction = __nccwpck_require__(5159)

// note: use of class is satirical
// https://github.com/pinojs/pino/pull/433#pullrequestreview-127703127
const constructor = class Pino {}
const prototype = {
  constructor,
  child,
  bindings,
  setBindings,
  flush,
  isLevelEnabled,
  version,
  get level () { return this[getLevelSym]() },
  set level (lvl) { this[setLevelSym](lvl) },
  get levelVal () { return this[levelValSym] },
  set levelVal (n) { throw Error('levelVal is read-only') },
  [lsCacheSym]: initialLsCache,
  [writeSym]: write,
  [asJsonSym]: asJson,
  [getLevelSym]: getLevel,
  [setLevelSym]: setLevel
}

Object.setPrototypeOf(prototype, EventEmitter.prototype)

// exporting and consuming the prototype object using factory pattern fixes scoping issues with getters when serializing
module.exports = function () {
  return Object.create(prototype)
}

const resetChildingsFormatter = bindings => bindings
function child (bindings, options) {
  if (!bindings) {
    throw Error('missing bindings for child Pino')
  }
  options = options || {} // default options to empty object
  const serializers = this[serializersSym]
  const formatters = this[formattersSym]
  const instance = Object.create(this)

  if (options.hasOwnProperty('serializers') === true) {
    instance[serializersSym] = Object.create(null)

    for (const k in serializers) {
      instance[serializersSym][k] = serializers[k]
    }
    const parentSymbols = Object.getOwnPropertySymbols(serializers)
    /* eslint no-var: off */
    for (var i = 0; i < parentSymbols.length; i++) {
      const ks = parentSymbols[i]
      instance[serializersSym][ks] = serializers[ks]
    }

    for (const bk in options.serializers) {
      instance[serializersSym][bk] = options.serializers[bk]
    }
    const bindingsSymbols = Object.getOwnPropertySymbols(options.serializers)
    for (var bi = 0; bi < bindingsSymbols.length; bi++) {
      const bks = bindingsSymbols[bi]
      instance[serializersSym][bks] = options.serializers[bks]
    }
  } else instance[serializersSym] = serializers
  if (options.hasOwnProperty('formatters')) {
    const { level, bindings: chindings, log } = options.formatters
    instance[formattersSym] = buildFormatters(
      level || formatters.level,
      chindings || resetChildingsFormatter,
      log || formatters.log
    )
  } else {
    instance[formattersSym] = buildFormatters(
      formatters.level,
      resetChildingsFormatter,
      formatters.log
    )
  }
  if (options.hasOwnProperty('customLevels') === true) {
    assertNoLevelCollisions(this.levels, options.customLevels)
    instance.levels = mappings(options.customLevels, instance[useOnlyCustomLevelsSym])
    genLsCache(instance)
  }

  // redact must place before asChindings and only replace if exist
  if ((typeof options.redact === 'object' && options.redact !== null) || Array.isArray(options.redact)) {
    instance.redact = options.redact // replace redact directly
    const stringifiers = redaction(instance.redact, stringify)
    const formatOpts = { stringify: stringifiers[redactFmtSym] }
    instance[stringifySym] = stringify
    instance[stringifiersSym] = stringifiers
    instance[formatOptsSym] = formatOpts
  }

  instance[chindingsSym] = asChindings(instance, bindings)
  const childLevel = options.level || this.level
  instance[setLevelSym](childLevel)

  return instance
}

function bindings () {
  const chindings = this[chindingsSym]
  const chindingsJson = `{${chindings.substr(1)}}` // at least contains ,"pid":7068,"hostname":"myMac"
  const bindingsFromJson = JSON.parse(chindingsJson)
  delete bindingsFromJson.pid
  delete bindingsFromJson.hostname
  return bindingsFromJson
}

function setBindings (newBindings) {
  const chindings = asChindings(this, newBindings)
  this[chindingsSym] = chindings
  delete this[parsedChindingsSym]
}

/**
 * Default strategy for creating `mergeObject` from arguments and the result from `mixin()`.
 * Fields from `mergeObject` have higher priority in this strategy.
 *
 * @param {Object} mergeObject The object a user has supplied to the logging function.
 * @param {Object} mixinObject The result of the `mixin` method.
 * @return {Object}
 */
function defaultMixinMergeStrategy (mergeObject, mixinObject) {
  return Object.assign(mixinObject, mergeObject)
}

function write (_obj, msg, num) {
  const t = this[timeSym]()
  const mixin = this[mixinSym]
  const mixinMergeStrategy = this[mixinMergeStrategySym] || defaultMixinMergeStrategy
  let obj

  if (_obj === undefined || _obj === null) {
    obj = {}
  } else if (_obj instanceof Error) {
    obj = { err: _obj }
    if (msg === undefined) {
      msg = _obj.message
    }
  } else {
    obj = _obj
    if (msg === undefined && _obj.err) {
      msg = _obj.err.message
    }
  }

  if (mixin) {
    obj = mixinMergeStrategy(obj, mixin(obj))
  }

  const s = this[asJsonSym](obj, msg, num, t)

  const stream = this[streamSym]
  if (stream[needsMetadataGsym] === true) {
    stream.lastLevel = num
    stream.lastObj = obj
    stream.lastMsg = msg
    stream.lastTime = t.slice(this[timeSliceIndexSym])
    stream.lastLogger = this // for child loggers
  }
  stream.write(s)
}

function noop () {}

function flush () {
  const stream = this[streamSym]
  if ('flush' in stream) stream.flush(noop)
}


/***/ }),

/***/ 5159:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fastRedact = __nccwpck_require__(4826)
const { redactFmtSym, wildcardFirstSym } = __nccwpck_require__(2232)
const { rx, validator } = fastRedact

const validate = validator({
  ERR_PATHS_MUST_BE_STRINGS: () => 'pino – redacted paths must be strings',
  ERR_INVALID_PATH: (s) => `pino – redact paths array contains an invalid path (${s})`
})

const CENSOR = '[Redacted]'
const strict = false // TODO should this be configurable?

function redaction (opts, serialize) {
  const { paths, censor } = handle(opts)

  const shape = paths.reduce((o, str) => {
    rx.lastIndex = 0
    const first = rx.exec(str)
    const next = rx.exec(str)

    // ns is the top-level path segment, brackets + quoting removed.
    let ns = first[1] !== undefined
      ? first[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, '$1')
      : first[0]

    if (ns === '*') {
      ns = wildcardFirstSym
    }

    // top level key:
    if (next === null) {
      o[ns] = null
      return o
    }

    // path with at least two segments:
    // if ns is already redacted at the top level, ignore lower level redactions
    if (o[ns] === null) {
      return o
    }

    const { index } = next
    const nextPath = `${str.substr(index, str.length - 1)}`

    o[ns] = o[ns] || []

    // shape is a mix of paths beginning with literal values and wildcard
    // paths [ "a.b.c", "*.b.z" ] should reduce to a shape of
    // { "a": [ "b.c", "b.z" ], *: [ "b.z" ] }
    // note: "b.z" is in both "a" and * arrays because "a" matches the wildcard.
    // (* entry has wildcardFirstSym as key)
    if (ns !== wildcardFirstSym && o[ns].length === 0) {
      // first time ns's get all '*' redactions so far
      o[ns].push(...(o[wildcardFirstSym] || []))
    }

    if (ns === wildcardFirstSym) {
      // new * path gets added to all previously registered literal ns's.
      Object.keys(o).forEach(function (k) {
        if (o[k]) {
          o[k].push(nextPath)
        }
      })
    }

    o[ns].push(nextPath)
    return o
  }, {})

  // the redactor assigned to the format symbol key
  // provides top level redaction for instances where
  // an object is interpolated into the msg string
  const result = {
    [redactFmtSym]: fastRedact({ paths, censor, serialize, strict })
  }

  const topCensor = (...args) => {
    return typeof censor === 'function' ? serialize(censor(...args)) : serialize(censor)
  }

  return [...Object.keys(shape), ...Object.getOwnPropertySymbols(shape)].reduce((o, k) => {
    // top level key:
    if (shape[k] === null) {
      o[k] = (value) => topCensor(value, [k])
    } else {
      const wrappedCensor = typeof censor === 'function'
        ? (value, path) => {
            return censor(value, [k, ...path])
          }
        : censor
      o[k] = fastRedact({
        paths: shape[k],
        censor: wrappedCensor,
        serialize,
        strict
      })
    }
    return o
  }, result)
}

function handle (opts) {
  if (Array.isArray(opts)) {
    opts = { paths: opts, censor: CENSOR }
    validate(opts)
    return opts
  }
  let { paths, censor = CENSOR, remove } = opts
  if (Array.isArray(paths) === false) { throw Error('pino – redact must contain an array of strings') }
  if (remove === true) censor = undefined
  validate({ paths, censor })

  return { paths, censor }
}

module.exports = redaction


/***/ }),

/***/ 2232:
/***/ ((module) => {

"use strict";


const setLevelSym = Symbol('pino.setLevel')
const getLevelSym = Symbol('pino.getLevel')
const levelValSym = Symbol('pino.levelVal')
const useLevelLabelsSym = Symbol('pino.useLevelLabels')
const useOnlyCustomLevelsSym = Symbol('pino.useOnlyCustomLevels')
const mixinSym = Symbol('pino.mixin')

const lsCacheSym = Symbol('pino.lsCache')
const chindingsSym = Symbol('pino.chindings')
const parsedChindingsSym = Symbol('pino.parsedChindings')

const asJsonSym = Symbol('pino.asJson')
const writeSym = Symbol('pino.write')
const redactFmtSym = Symbol('pino.redactFmt')

const timeSym = Symbol('pino.time')
const timeSliceIndexSym = Symbol('pino.timeSliceIndex')
const streamSym = Symbol('pino.stream')
const stringifySym = Symbol('pino.stringify')
const stringifySafeSym = Symbol('pino.stringifySafe')
const stringifiersSym = Symbol('pino.stringifiers')
const endSym = Symbol('pino.end')
const formatOptsSym = Symbol('pino.formatOpts')
const messageKeySym = Symbol('pino.messageKey')
const nestedKeySym = Symbol('pino.nestedKey')
const nestedKeyStrSym = Symbol('pino.nestedKeyStr')
const mixinMergeStrategySym = Symbol('pino.mixinMergeStrategy')

const wildcardFirstSym = Symbol('pino.wildcardFirst')

// public symbols, no need to use the same pino
// version for these
const serializersSym = Symbol.for('pino.serializers')
const formattersSym = Symbol.for('pino.formatters')
const hooksSym = Symbol.for('pino.hooks')
const needsMetadataGsym = Symbol.for('pino.metadata')

module.exports = {
  setLevelSym,
  getLevelSym,
  levelValSym,
  useLevelLabelsSym,
  mixinSym,
  lsCacheSym,
  chindingsSym,
  parsedChindingsSym,
  asJsonSym,
  writeSym,
  serializersSym,
  redactFmtSym,
  timeSym,
  timeSliceIndexSym,
  streamSym,
  stringifySym,
  stringifySafeSym,
  stringifiersSym,
  endSym,
  formatOptsSym,
  messageKeySym,
  nestedKeySym,
  wildcardFirstSym,
  needsMetadataGsym,
  useOnlyCustomLevelsSym,
  formattersSym,
  hooksSym,
  nestedKeyStrSym,
  mixinMergeStrategySym
}


/***/ }),

/***/ 857:
/***/ ((module) => {

"use strict";


const nullTime = () => ''

const epochTime = () => `,"time":${Date.now()}`

const unixTime = () => `,"time":${Math.round(Date.now() / 1000.0)}`

const isoTime = () => `,"time":"${new Date(Date.now()).toISOString()}"` // using Date.now() for testability

module.exports = { nullTime, epochTime, unixTime, isoTime }


/***/ }),

/***/ 8433:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


/* eslint no-prototype-builtins: 0 */

const format = __nccwpck_require__(5933)
const { mapHttpRequest, mapHttpResponse } = __nccwpck_require__(5848)
const SonicBoom = __nccwpck_require__(330)
const warning = __nccwpck_require__(6535)
const {
  lsCacheSym,
  chindingsSym,
  parsedChindingsSym,
  writeSym,
  serializersSym,
  formatOptsSym,
  endSym,
  stringifiersSym,
  stringifySym,
  stringifySafeSym,
  wildcardFirstSym,
  needsMetadataGsym,
  redactFmtSym,
  streamSym,
  nestedKeySym,
  formattersSym,
  messageKeySym,
  nestedKeyStrSym
} = __nccwpck_require__(2232)
const { isMainThread } = __nccwpck_require__(1267)
const transport = __nccwpck_require__(6129)

function noop () {}

function genLog (level, hook) {
  if (!hook) return LOG

  return function hookWrappedLog (...args) {
    hook.call(this, args, LOG, level)
  }

  function LOG (o, ...n) {
    if (typeof o === 'object') {
      let msg = o
      if (o !== null) {
        if (o.method && o.headers && o.socket) {
          o = mapHttpRequest(o)
        } else if (typeof o.setHeader === 'function') {
          o = mapHttpResponse(o)
        }
      }
      let formatParams
      if (msg === null && n.length === 0) {
        formatParams = [null]
      } else {
        msg = n.shift()
        formatParams = n
      }
      this[writeSym](o, format(msg, formatParams, this[formatOptsSym]), level)
    } else {
      this[writeSym](null, format(o, n, this[formatOptsSym]), level)
    }
  }
}

// magically escape strings for json
// relying on their charCodeAt
// everything below 32 needs JSON.stringify()
// 34 and 92 happens all the time, so we
// have a fast case for them
function asString (str) {
  let result = ''
  let last = 0
  let found = false
  let point = 255
  const l = str.length
  if (l > 100) {
    return JSON.stringify(str)
  }
  for (var i = 0; i < l && point >= 32; i++) {
    point = str.charCodeAt(i)
    if (point === 34 || point === 92) {
      result += str.slice(last, i) + '\\'
      last = i
      found = true
    }
  }
  if (!found) {
    result = str
  } else {
    result += str.slice(last)
  }
  return point < 32 ? JSON.stringify(str) : '"' + result + '"'
}

function asJson (obj, msg, num, time) {
  const stringify = this[stringifySym]
  const stringifySafe = this[stringifySafeSym]
  const stringifiers = this[stringifiersSym]
  const end = this[endSym]
  const chindings = this[chindingsSym]
  const serializers = this[serializersSym]
  const formatters = this[formattersSym]
  const messageKey = this[messageKeySym]
  let data = this[lsCacheSym][num] + time

  // we need the child bindings added to the output first so instance logged
  // objects can take precedence when JSON.parse-ing the resulting log line
  data = data + chindings

  let value
  const notHasOwnProperty = obj.hasOwnProperty === undefined
  if (formatters.log) {
    obj = formatters.log(obj)
  }
  const wildcardStringifier = stringifiers[wildcardFirstSym]
  let propStr = ''
  for (const key in obj) {
    value = obj[key]
    if ((notHasOwnProperty || obj.hasOwnProperty(key)) && value !== undefined) {
      value = serializers[key] ? serializers[key](value) : value

      const stringifier = stringifiers[key] || wildcardStringifier

      switch (typeof value) {
        case 'undefined':
        case 'function':
          continue
        case 'number':
          /* eslint no-fallthrough: "off" */
          if (Number.isFinite(value) === false) {
            value = null
          }
        // this case explicitly falls through to the next one
        case 'boolean':
          if (stringifier) value = stringifier(value)
          break
        case 'string':
          value = (stringifier || asString)(value)
          break
        default:
          value = (stringifier || stringify)(value, stringifySafe)
      }
      if (value === undefined) continue
      propStr += ',"' + key + '":' + value
    }
  }

  let msgStr = ''
  if (msg !== undefined) {
    value = serializers[messageKey] ? serializers[messageKey](msg) : msg
    const stringifier = stringifiers[messageKey] || wildcardStringifier

    switch (typeof value) {
      case 'function':
        break
      case 'number':
        /* eslint no-fallthrough: "off" */
        if (Number.isFinite(value) === false) {
          value = null
        }
      // this case explicitly falls through to the next one
      case 'boolean':
        if (stringifier) value = stringifier(value)
        msgStr = ',"' + messageKey + '":' + value
        break
      case 'string':
        value = (stringifier || asString)(value)
        msgStr = ',"' + messageKey + '":' + value
        break
      default:
        value = (stringifier || stringify)(value, stringifySafe)
        msgStr = ',"' + messageKey + '":' + value
    }
  }

  if (this[nestedKeySym] && propStr) {
    // place all the obj properties under the specified key
    // the nested key is already formatted from the constructor
    return data + this[nestedKeyStrSym] + propStr.slice(1) + '}' + msgStr + end
  } else {
    return data + propStr + msgStr + end
  }
}

function asChindings (instance, bindings) {
  let value
  let data = instance[chindingsSym]
  const stringify = instance[stringifySym]
  const stringifySafe = instance[stringifySafeSym]
  const stringifiers = instance[stringifiersSym]
  const wildcardStringifier = stringifiers[wildcardFirstSym]
  const serializers = instance[serializersSym]
  const formatter = instance[formattersSym].bindings
  bindings = formatter(bindings)

  for (const key in bindings) {
    value = bindings[key]
    const valid = key !== 'level' &&
      key !== 'serializers' &&
      key !== 'formatters' &&
      key !== 'customLevels' &&
      bindings.hasOwnProperty(key) &&
      value !== undefined
    if (valid === true) {
      value = serializers[key] ? serializers[key](value) : value
      value = (stringifiers[key] || wildcardStringifier || stringify)(value, stringifySafe)
      if (value === undefined) continue
      data += ',"' + key + '":' + value
    }
  }
  return data
}

function getPrettyStream (opts, prettifier, dest, instance) {
  if (prettifier && typeof prettifier === 'function') {
    prettifier = prettifier.bind(instance)
    return prettifierMetaWrapper(prettifier(opts), dest, opts)
  }
  try {
    const prettyFactory = (__nccwpck_require__(1462).prettyFactory)
    prettyFactory.asMetaWrapper = prettifierMetaWrapper
    return prettifierMetaWrapper(prettyFactory(opts), dest, opts)
  } catch (e) {
    if (e.message.startsWith("Cannot find module 'pino-pretty'")) {
      throw Error('Missing `pino-pretty` module: `pino-pretty` must be installed separately')
    };
    throw e
  }
}

function prettifierMetaWrapper (pretty, dest, opts) {
  opts = Object.assign({ suppressFlushSyncWarning: false }, opts)
  let warned = false
  return {
    [needsMetadataGsym]: true,
    lastLevel: 0,
    lastMsg: null,
    lastObj: null,
    lastLogger: null,
    flushSync () {
      if (opts.suppressFlushSyncWarning || warned) {
        return
      }
      warned = true
      setMetadataProps(dest, this)
      dest.write(pretty(Object.assign({
        level: 40, // warn
        msg: 'pino.final with prettyPrint does not support flushing',
        time: Date.now()
      }, this.chindings())))
    },
    chindings () {
      const lastLogger = this.lastLogger
      let chindings = null

      // protection against flushSync being called before logging
      // anything
      if (!lastLogger) {
        return null
      }

      if (lastLogger.hasOwnProperty(parsedChindingsSym)) {
        chindings = lastLogger[parsedChindingsSym]
      } else {
        chindings = JSON.parse('{' + lastLogger[chindingsSym].substr(1) + '}')
        lastLogger[parsedChindingsSym] = chindings
      }

      return chindings
    },
    write (chunk) {
      const lastLogger = this.lastLogger
      const chindings = this.chindings()

      let time = this.lastTime

      /* istanbul ignore next */
      if (typeof time === 'number') {
        // do nothing!
      } else if (time.match(/^\d+/)) {
        time = parseInt(time)
      } else {
        time = time.slice(1, -1)
      }

      const lastObj = this.lastObj
      const lastMsg = this.lastMsg
      const errorProps = null

      const formatters = lastLogger[formattersSym]
      const formattedObj = formatters.log ? formatters.log(lastObj) : lastObj

      const messageKey = lastLogger[messageKeySym]
      if (lastMsg && formattedObj && !formattedObj.hasOwnProperty(messageKey)) {
        formattedObj[messageKey] = lastMsg
      }

      const obj = Object.assign({
        level: this.lastLevel,
        time
      }, formattedObj, errorProps)

      const serializers = lastLogger[serializersSym]
      const keys = Object.keys(serializers)

      for (var i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (obj[key] !== undefined) {
          obj[key] = serializers[key](obj[key])
        }
      }

      for (const key in chindings) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = chindings[key]
        }
      }

      const stringifiers = lastLogger[stringifiersSym]
      const redact = stringifiers[redactFmtSym]

      const formatted = pretty(typeof redact === 'function' ? redact(obj) : obj)
      if (formatted === undefined) return

      setMetadataProps(dest, this)
      dest.write(formatted)
    }
  }
}

function hasBeenTampered (stream) {
  return stream.write !== stream.constructor.prototype.write
}

function buildSafeSonicBoom (opts) {
  const stream = new SonicBoom(opts)
  stream.on('error', filterBrokenPipe)
  // if we are sync: false, we must flush on exit
  if (!opts.sync && isMainThread) {
    setupOnExit(stream)
  }
  return stream

  function filterBrokenPipe (err) {
    // TODO verify on Windows
    if (err.code === 'EPIPE') {
      // If we get EPIPE, we should stop logging here
      // however we have no control to the consumer of
      // SonicBoom, so we just overwrite the write method
      stream.write = noop
      stream.end = noop
      stream.flushSync = noop
      stream.destroy = noop
      return
    }
    stream.removeListener('error', filterBrokenPipe)
    stream.emit('error', err)
  }
}

function setupOnExit (stream) {
  /* istanbul ignore next */
  if (global.WeakRef && global.WeakMap && global.FinalizationRegistry) {
    // This is leak free, it does not leave event handlers
    const onExit = __nccwpck_require__(9660)

    onExit.register(stream, autoEnd)

    stream.on('close', function () {
      onExit.unregister(stream)
    })
  }
}

function autoEnd (stream, eventName) {
  // This check is needed only on some platforms
  /* istanbul ignore next */
  if (stream.destroyed) {
    return
  }

  if (eventName === 'beforeExit') {
    // We still have an event loop, let's use it
    stream.flush()
    stream.on('drain', function () {
      stream.end()
    })
  } else {
    // We do not have an event loop, so flush synchronously
    stream.flushSync()
  }
}

function createArgsNormalizer (defaultOptions) {
  return function normalizeArgs (instance, caller, opts = {}, stream) {
    // support stream as a string
    if (typeof opts === 'string') {
      stream = buildSafeSonicBoom({ dest: opts, sync: true })
      opts = {}
    } else if (typeof stream === 'string') {
      if (opts && opts.transport) {
        throw Error('only one of option.transport or stream can be specified')
      }
      stream = buildSafeSonicBoom({ dest: stream, sync: true })
    } else if (opts instanceof SonicBoom || opts.writable || opts._writableState) {
      stream = opts
      opts = {}
    } else if (opts.transport) {
      if (opts.transport instanceof SonicBoom || opts.transport.writable || opts.transport._writableState) {
        throw Error('option.transport do not allow stream, please pass to option directly. e.g. pino(transport)')
      }
      stream = transport({ caller, ...opts.transport })
    }
    opts = Object.assign({}, defaultOptions, opts)
    opts.serializers = Object.assign({}, defaultOptions.serializers, opts.serializers)
    opts.formatters = Object.assign({}, defaultOptions.formatters, opts.formatters)

    if ('onTerminated' in opts) {
      throw Error('The onTerminated option has been removed, use pino.final instead')
    }
    if ('changeLevelName' in opts) {
      process.emitWarning(
        'The changeLevelName option is deprecated and will be removed in v7. Use levelKey instead.',
        { code: 'changeLevelName_deprecation' }
      )
      opts.levelKey = opts.changeLevelName
      delete opts.changeLevelName
    }
    const { enabled, prettyPrint, prettifier, messageKey } = opts
    if (enabled === false) opts.level = 'silent'
    stream = stream || process.stdout
    if (stream === process.stdout && stream.fd >= 0 && !hasBeenTampered(stream)) {
      stream = buildSafeSonicBoom({ fd: stream.fd, sync: true })
    }
    if (prettyPrint) {
      warning.emit('PINODEP008')
      const prettyOpts = Object.assign({ messageKey }, prettyPrint)
      stream = getPrettyStream(prettyOpts, prettifier, stream, instance)
    }
    return { opts, stream }
  }
}

function final (logger, handler) {
  const major = Number(process.versions.node.split('.')[0])
  if (major >= 14) warning.emit('PINODEP009')

  if (typeof logger === 'undefined' || typeof logger.child !== 'function') {
    throw Error('expected a pino logger instance')
  }
  const hasHandler = (typeof handler !== 'undefined')
  if (hasHandler && typeof handler !== 'function') {
    throw Error('if supplied, the handler parameter should be a function')
  }
  const stream = logger[streamSym]
  if (typeof stream.flushSync !== 'function') {
    throw Error('final requires a stream that has a flushSync method, such as pino.destination')
  }

  const finalLogger = new Proxy(logger, {
    get: (logger, key) => {
      if (key in logger.levels.values) {
        return (...args) => {
          logger[key](...args)
          stream.flushSync()
        }
      }
      return logger[key]
    }
  })

  if (!hasHandler) {
    try {
      stream.flushSync()
    } catch {
      // it's too late to wait for the stream to be ready
      // because this is a final tick scenario.
      // in practice there shouldn't be a situation where it isn't
      // however, swallow the error just in case (and for easier testing)
    }
    return finalLogger
  }

  return (err = null, ...args) => {
    try {
      stream.flushSync()
    } catch (e) {
      // it's too late to wait for the stream to be ready
      // because this is a final tick scenario.
      // in practice there shouldn't be a situation where it isn't
      // however, swallow the error just in case (and for easier testing)
    }
    return handler(err, finalLogger, ...args)
  }
}

function stringify (obj, stringifySafeFn) {
  try {
    return JSON.stringify(obj)
  } catch (_) {
    try {
      const stringify = stringifySafeFn || this[stringifySafeSym]
      return stringify(obj)
    } catch (_) {
      return '"[unable to serialize, circular reference is too complex to analyze]"'
    }
  }
}

function buildFormatters (level, bindings, log) {
  return {
    level,
    bindings,
    log
  }
}

function setMetadataProps (dest, that) {
  if (dest[needsMetadataGsym] === true) {
    dest.lastLevel = that.lastLevel
    dest.lastMsg = that.lastMsg
    dest.lastObj = that.lastObj
    dest.lastTime = that.lastTime
    dest.lastLogger = that.lastLogger
  }
}

/**
 * Convert a string integer file descriptor to a proper native integer
 * file descriptor.
 *
 * @param {string} destination The file descriptor string to attempt to convert.
 *
 * @returns {Number}
 */
function normalizeDestFileDescriptor (destination) {
  const fd = Number(destination)
  if (typeof destination === 'string' && Number.isFinite(fd)) {
    return fd
  }
  return destination
}

module.exports = {
  noop,
  buildSafeSonicBoom,
  getPrettyStream,
  asChindings,
  asJson,
  genLog,
  createArgsNormalizer,
  final,
  stringify,
  buildFormatters,
  normalizeDestFileDescriptor
}


/***/ }),

/***/ 6129:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const { createRequire } = __nccwpck_require__(8188)
const getCallers = __nccwpck_require__(3588)
const { join, isAbsolute } = __nccwpck_require__(1017)

let onExit

if (global.WeakRef && global.WeakMap && global.FinalizationRegistry) {
  // This require MUST be top level otherwise the transport would
  // not work from within Jest as it hijacks require.
  onExit = __nccwpck_require__(9660)
}

const ThreadStream = __nccwpck_require__(8366)

function setupOnExit (stream) {
  /* istanbul ignore next */
  if (onExit) {
    // This is leak free, it does not leave event handlers
    onExit.register(stream, autoEnd)

    stream.on('close', function () {
      onExit.unregister(stream)
    })
  } else {
    const fn = autoEnd.bind(null, stream)
    process.once('beforeExit', fn)
    process.once('exit', fn)

    stream.on('close', function () {
      process.removeListener('beforeExit', fn)
      process.removeListener('exit', fn)
    })
  }
}

function buildStream (filename, workerData, workerOpts) {
  const stream = new ThreadStream({
    filename,
    workerData,
    workerOpts
  })

  stream.on('ready', onReady)
  stream.on('close', function () {
    process.removeListener('exit', onExit)
  })

  process.on('exit', onExit)

  function onReady () {
    process.removeListener('exit', onExit)
    stream.unref()

    if (workerOpts.autoEnd !== false) {
      setupOnExit(stream)
    }
  }

  function onExit () {
    if (stream.closed) {
      return
    }
    stream.flushSync()
    stream.end()
  }

  return stream
}

function autoEnd (stream) {
  stream.ref()
  stream.flushSync()
  stream.end()
  stream.once('close', function () {
    stream.unref()
  })
}

function transport (fullOptions) {
  const { pipeline, targets, options = {}, worker = {}, caller = getCallers() } = fullOptions

  // Backwards compatibility
  const callers = typeof caller === 'string' ? [caller] : caller

  // This will be eventually modified by bundlers
  const bundlerOverrides = '__bundlerPathsOverrides' in globalThis ? globalThis.__bundlerPathsOverrides : {}

  let target = fullOptions.target

  if (target && targets) {
    throw new Error('only one of target or targets can be specified')
  }

  if (targets) {
    target = bundlerOverrides['pino-worker'] || __nccwpck_require__.ab + "worker.js"
    options.targets = targets.map((dest) => {
      return {
        ...dest,
        target: fixTarget(dest.target)
      }
    })
  } else if (fullOptions.pipeline) {
    target = bundlerOverrides['pino-pipeline-worker'] || __nccwpck_require__.ab + "worker-pipeline.js"
    options.targets = pipeline.map((dest) => {
      return {
        ...dest,
        target: fixTarget(dest.target)
      }
    })
  }

  return buildStream(fixTarget(target), options, worker)

  function fixTarget (origin) {
    origin = bundlerOverrides[origin] || origin

    if (isAbsolute(origin) || origin.indexOf('file://') === 0) {
      return origin
    }

    if (origin === 'pino/file') {
      return __nccwpck_require__.ab + "file.js"
    }

    let fixTarget

    for (const filePath of callers) {
      try {
        fixTarget = createRequire(filePath).resolve(origin)
        break
      } catch (err) {
        // Silent catch
        continue
      }
    }

    if (!fixTarget) {
      throw new Error(`unable to determine transport target for "${origin}"`)
    }

    return fixTarget
  }
}

module.exports = transport


/***/ }),

/***/ 8085:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

/* eslint no-prototype-builtins: 0 */
const os = __nccwpck_require__(2037)
const stdSerializers = __nccwpck_require__(5848)
const caller = __nccwpck_require__(3588)
const redaction = __nccwpck_require__(5159)
const time = __nccwpck_require__(857)
const proto = __nccwpck_require__(3779)
const symbols = __nccwpck_require__(2232)
const { configure } = __nccwpck_require__(7560)
const { assertDefaultLevelFound, mappings, genLsCache } = __nccwpck_require__(8015)
const {
  createArgsNormalizer,
  asChindings,
  final,
  buildSafeSonicBoom,
  buildFormatters,
  stringify,
  normalizeDestFileDescriptor,
  noop
} = __nccwpck_require__(8433)
const { version } = __nccwpck_require__(2812)
const {
  chindingsSym,
  redactFmtSym,
  serializersSym,
  timeSym,
  timeSliceIndexSym,
  streamSym,
  stringifySym,
  stringifySafeSym,
  stringifiersSym,
  setLevelSym,
  endSym,
  formatOptsSym,
  messageKeySym,
  nestedKeySym,
  mixinSym,
  useOnlyCustomLevelsSym,
  formattersSym,
  hooksSym,
  nestedKeyStrSym,
  mixinMergeStrategySym
} = symbols
const { epochTime, nullTime } = time
const { pid } = process
const hostname = os.hostname()
const defaultErrorSerializer = stdSerializers.err
const defaultOptions = {
  level: 'info',
  messageKey: 'msg',
  nestedKey: null,
  enabled: true,
  prettyPrint: false,
  base: { pid, hostname },
  serializers: Object.assign(Object.create(null), {
    err: defaultErrorSerializer
  }),
  formatters: Object.assign(Object.create(null), {
    bindings (bindings) {
      return bindings
    },
    level (label, number) {
      return { level: number }
    }
  }),
  hooks: {
    logMethod: undefined
  },
  timestamp: epochTime,
  name: undefined,
  redact: null,
  customLevels: null,
  useOnlyCustomLevels: false,
  depthLimit: 5,
  edgeLimit: 100
}

const normalize = createArgsNormalizer(defaultOptions)

const serializers = Object.assign(Object.create(null), stdSerializers)

function pino (...args) {
  const instance = {}
  const { opts, stream } = normalize(instance, caller(), ...args)
  const {
    redact,
    crlf,
    serializers,
    timestamp,
    messageKey,
    nestedKey,
    base,
    name,
    level,
    customLevels,
    mixin,
    mixinMergeStrategy,
    useOnlyCustomLevels,
    formatters,
    hooks,
    depthLimit,
    edgeLimit
  } = opts

  const stringifySafe = configure({
    maximumDepth: depthLimit,
    maximumBreadth: edgeLimit
  })

  const allFormatters = buildFormatters(
    formatters.level,
    formatters.bindings,
    formatters.log
  )

  const stringifiers = redact ? redaction(redact, stringify) : {}
  const stringifyFn = stringify.bind({
    [stringifySafeSym]: stringifySafe
  })
  const formatOpts = redact
    ? { stringify: stringifiers[redactFmtSym] }
    : { stringify: stringifyFn }
  const end = '}' + (crlf ? '\r\n' : '\n')
  const coreChindings = asChindings.bind(null, {
    [chindingsSym]: '',
    [serializersSym]: serializers,
    [stringifiersSym]: stringifiers,
    [stringifySym]: stringify,
    [stringifySafeSym]: stringifySafe,
    [formattersSym]: allFormatters
  })

  let chindings = ''
  if (base !== null) {
    if (name === undefined) {
      chindings = coreChindings(base)
    } else {
      chindings = coreChindings(Object.assign({}, base, { name }))
    }
  }

  const time = (timestamp instanceof Function)
    ? timestamp
    : (timestamp ? epochTime : nullTime)
  const timeSliceIndex = time().indexOf(':') + 1

  if (useOnlyCustomLevels && !customLevels) throw Error('customLevels is required if useOnlyCustomLevels is set true')
  if (mixin && typeof mixin !== 'function') throw Error(`Unknown mixin type "${typeof mixin}" - expected "function"`)

  assertDefaultLevelFound(level, customLevels, useOnlyCustomLevels)
  const levels = mappings(customLevels, useOnlyCustomLevels)

  Object.assign(instance, {
    levels,
    [useOnlyCustomLevelsSym]: useOnlyCustomLevels,
    [streamSym]: stream,
    [timeSym]: time,
    [timeSliceIndexSym]: timeSliceIndex,
    [stringifySym]: stringify,
    [stringifySafeSym]: stringifySafe,
    [stringifiersSym]: stringifiers,
    [endSym]: end,
    [formatOptsSym]: formatOpts,
    [messageKeySym]: messageKey,
    [nestedKeySym]: nestedKey,
    // protect against injection
    [nestedKeyStrSym]: nestedKey ? `,${JSON.stringify(nestedKey)}:{` : '',
    [serializersSym]: serializers,
    [mixinSym]: mixin,
    [mixinMergeStrategySym]: mixinMergeStrategy,
    [chindingsSym]: chindings,
    [formattersSym]: allFormatters,
    [hooksSym]: hooks,
    silent: noop
  })

  Object.setPrototypeOf(instance, proto())

  genLsCache(instance)

  instance[setLevelSym](level)

  return instance
}

module.exports = pino

module.exports.destination = (dest = process.stdout.fd) => {
  if (typeof dest === 'object') {
    dest.dest = normalizeDestFileDescriptor(dest.dest || process.stdout.fd)
    return buildSafeSonicBoom(dest)
  } else {
    return buildSafeSonicBoom({ dest: normalizeDestFileDescriptor(dest), minLength: 0, sync: true })
  }
}

module.exports.transport = __nccwpck_require__(6129)
module.exports.multistream = __nccwpck_require__(4411)

module.exports.final = final
module.exports.levels = mappings()
module.exports.stdSerializers = serializers
module.exports.stdTimeFunctions = Object.assign({}, time)
module.exports.symbols = symbols
module.exports.version = version

// Enables default and name export with TypeScript and Babel
module.exports["default"] = pino
module.exports.pino = pino


/***/ }),

/***/ 330:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


const fs = __nccwpck_require__(7147)
const EventEmitter = __nccwpck_require__(2361)
const inherits = (__nccwpck_require__(3837).inherits)
const path = __nccwpck_require__(1017)
const sleep = __nccwpck_require__(6950)

const BUSY_WRITE_TIMEOUT = 100

// This constant ensures that SonicBoom only needs
// 64KB MB of free memory to run. In case of having 1GB+
// of data to write, this prevents an out of memory
// condition.
const MAX_WRITE = 64 * 1024

function openFile (file, sonic) {
  sonic._opening = true
  sonic._writing = true
  sonic._asyncDrainScheduled = false

  // NOTE: 'error' and 'ready' events emitted below only relevant when sonic.sync===false
  // for sync mode, there is no way to add a listener that will receive these

  function fileOpened (err, fd) {
    if (err) {
      sonic._reopening = false
      sonic._writing = false
      sonic._opening = false

      if (sonic.sync) {
        process.nextTick(() => {
          if (sonic.listenerCount('error') > 0) {
            sonic.emit('error', err)
          }
        })
      } else {
        sonic.emit('error', err)
      }
      return
    }

    sonic.fd = fd
    sonic.file = file
    sonic._reopening = false
    sonic._opening = false
    sonic._writing = false

    if (sonic.sync) {
      process.nextTick(() => sonic.emit('ready'))
    } else {
      sonic.emit('ready')
    }

    if (sonic._reopening) {
      return
    }

    // start
    if (!sonic._writing && sonic._len > sonic.minLength && !sonic.destroyed) {
      actualWrite(sonic)
    }
  }

  const flags = sonic.append ? 'a' : 'w'
  const mode = sonic.mode

  if (sonic.sync) {
    try {
      if (sonic.mkdir) fs.mkdirSync(path.dirname(file), { recursive: true })
      const fd = fs.openSync(file, flags, mode)
      fileOpened(null, fd)
    } catch (err) {
      fileOpened(err)
      throw err
    }
  } else if (sonic.mkdir) {
    fs.mkdir(path.dirname(file), { recursive: true }, (err) => {
      if (err) return fileOpened(err)
      fs.open(file, flags, mode, fileOpened)
    })
  } else {
    fs.open(file, flags, mode, fileOpened)
  }
}

function SonicBoom (opts) {
  if (!(this instanceof SonicBoom)) {
    return new SonicBoom(opts)
  }

  let { fd, dest, minLength, maxLength, sync, append = true, mode, mkdir, retryEAGAIN } = opts || {}

  fd = fd || dest

  this._bufs = []
  this._len = 0
  this.fd = -1
  this._writing = false
  this._writingBuf = ''
  this._ending = false
  this._reopening = false
  this._asyncDrainScheduled = false
  this._hwm = Math.max(minLength || 0, 16387)
  this.file = null
  this.destroyed = false
  this.minLength = minLength || 0
  this.maxLength = maxLength || 0
  this.sync = sync || false
  this.append = append || false
  this.mode = mode
  this.retryEAGAIN = retryEAGAIN || (() => true)
  this.mkdir = mkdir || false

  if (typeof fd === 'number') {
    this.fd = fd
    process.nextTick(() => this.emit('ready'))
  } else if (typeof fd === 'string') {
    openFile(fd, this)
  } else {
    throw new Error('SonicBoom supports only file descriptors and files')
  }
  if (this.minLength >= MAX_WRITE) {
    throw new Error(`minLength should be smaller than MAX_WRITE (${MAX_WRITE})`)
  }

  this.release = (err, n) => {
    if (err) {
      if (err.code === 'EAGAIN' && this.retryEAGAIN(err, this._writingBuf.length, this._len - this._writingBuf.length)) {
        if (this.sync) {
          // This error code should not happen in sync mode, because it is
          // not using the underlining operating system asynchronous functions.
          // However it happens, and so we handle it.
          // Ref: https://github.com/pinojs/pino/issues/783
          try {
            sleep(BUSY_WRITE_TIMEOUT)
            this.release(undefined, 0)
          } catch (err) {
            this.release(err)
          }
        } else {
          // Let's give the destination some time to process the chunk.
          setTimeout(() => {
            fs.write(this.fd, this._writingBuf, 'utf8', this.release)
          }, BUSY_WRITE_TIMEOUT)
        }
      } else {
        this._writing = false

        this.emit('error', err)
      }
      return
    }

    this._len -= n
    this._writingBuf = this._writingBuf.slice(n)

    if (this._writingBuf.length) {
      if (!this.sync) {
        fs.write(this.fd, this._writingBuf, 'utf8', this.release)
        return
      }

      try {
        do {
          const n = fs.writeSync(this.fd, this._writingBuf, 'utf8')
          this._len -= n
          this._writingBuf = this._writingBuf.slice(n)
        } while (this._writingBuf)
      } catch (err) {
        this.release(err)
        return
      }
    }

    const len = this._len
    if (this._reopening) {
      this._writing = false
      this._reopening = false
      this.reopen()
    } else if (len > this.minLength) {
      actualWrite(this)
    } else if (this._ending) {
      if (len > 0) {
        actualWrite(this)
      } else {
        this._writing = false
        actualClose(this)
      }
    } else {
      this._writing = false
      if (this.sync) {
        if (!this._asyncDrainScheduled) {
          this._asyncDrainScheduled = true
          process.nextTick(emitDrain, this)
        }
      } else {
        this.emit('drain')
      }
    }
  }

  this.on('newListener', function (name) {
    if (name === 'drain') {
      this._asyncDrainScheduled = false
    }
  })
}

function emitDrain (sonic) {
  const hasListeners = sonic.listenerCount('drain') > 0
  if (!hasListeners) return
  sonic._asyncDrainScheduled = false
  sonic.emit('drain')
}

inherits(SonicBoom, EventEmitter)

SonicBoom.prototype.write = function (data) {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  const len = this._len + data.length
  const bufs = this._bufs

  if (this.maxLength && len > this.maxLength) {
    this.emit('drop', data)
    return this._len < this._hwm
  }

  if (
    bufs.length === 0 ||
    bufs[bufs.length - 1].length + data.length > MAX_WRITE
  ) {
    bufs.push('' + data)
  } else {
    bufs[bufs.length - 1] += data
  }

  this._len = len

  if (!this._writing && this._len >= this.minLength) {
    actualWrite(this)
  }

  return this._len < this._hwm
}

SonicBoom.prototype.flush = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  if (this._writing || this.minLength <= 0) {
    return
  }

  if (this._bufs.length === 0) {
    this._bufs.push('')
  }

  actualWrite(this)
}

SonicBoom.prototype.reopen = function (file) {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  if (this._opening) {
    this.once('ready', () => {
      this.reopen(file)
    })
    return
  }

  if (this._ending) {
    return
  }

  if (!this.file) {
    throw new Error('Unable to reopen a file descriptor, you must pass a file to SonicBoom')
  }

  this._reopening = true

  if (this._writing) {
    return
  }

  const fd = this.fd
  this.once('ready', () => {
    if (fd !== this.fd) {
      fs.close(fd, (err) => {
        if (err) {
          return this.emit('error', err)
        }
      })
    }
  })

  openFile(file || this.file, this)
}

SonicBoom.prototype.end = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  if (this._opening) {
    this.once('ready', () => {
      this.end()
    })
    return
  }

  if (this._ending) {
    return
  }

  this._ending = true

  if (this._writing) {
    return
  }

  if (this._len > 0 && this.fd >= 0) {
    actualWrite(this)
  } else {
    actualClose(this)
  }
}

SonicBoom.prototype.flushSync = function () {
  if (this.destroyed) {
    throw new Error('SonicBoom destroyed')
  }

  if (this.fd < 0) {
    throw new Error('sonic boom is not ready yet')
  }

  if (!this._writing && this._writingBuf.length > 0) {
    this._bufs.unshift(this._writingBuf)
    this._writingBuf = ''
  }

  while (this._bufs.length) {
    const buf = this._bufs[0]
    try {
      this._len -= fs.writeSync(this.fd, buf, 'utf8')
      this._bufs.shift()
    } catch (err) {
      if (err.code !== 'EAGAIN' || !this.retryEAGAIN(err, buf.length, this._len - buf.length)) {
        throw err
      }

      sleep(BUSY_WRITE_TIMEOUT)
    }
  }
}

SonicBoom.prototype.destroy = function () {
  if (this.destroyed) {
    return
  }
  actualClose(this)
}

function actualWrite (sonic) {
  const release = sonic.release
  sonic._writing = true
  sonic._writingBuf = sonic._writingBuf || sonic._bufs.shift() || ''

  if (sonic.sync) {
    try {
      const written = fs.writeSync(sonic.fd, sonic._writingBuf, 'utf8')
      release(null, written)
    } catch (err) {
      release(err)
    }
  } else {
    fs.write(sonic.fd, sonic._writingBuf, 'utf8', release)
  }
}

function actualClose (sonic) {
  if (sonic.fd === -1) {
    sonic.once('ready', actualClose.bind(null, sonic))
    return
  }

  sonic.destroyed = true
  sonic._bufs = []

  if (sonic.fd !== 1 && sonic.fd !== 2) {
    fs.close(sonic.fd, done)
  } else {
    setImmediate(done)
  }

  function done (err) {
    if (err) {
      sonic.emit('error', err)
      return
    }

    if (sonic._ending && !sonic._writing) {
      sonic.emit('finish')
    }
    sonic.emit('close')
  }
}

/**
 * These export configurations enable JS and TS developers
 * to consumer SonicBoom in whatever way best suits their needs.
 * Some examples of supported import syntax includes:
 * - `const SonicBoom = require('SonicBoom')`
 * - `const { SonicBoom } = require('SonicBoom')`
 * - `import * as SonicBoom from 'SonicBoom'`
 * - `import { SonicBoom } from 'SonicBoom'`
 * - `import SonicBoom from 'SonicBoom'`
 */
SonicBoom.SonicBoom = SonicBoom
SonicBoom.default = SonicBoom
module.exports = SonicBoom


/***/ }),

/***/ 4147:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"deploy-zup-action","version":"1.0.0","description":"Github action to deploy to Zuplo","main":"./out/index.js","scripts":{"build":"tsc","bundle":"ncc build ./dist/index.js -o out","release":"yarn build && yarn bundle"},"repository":{"type":"git","url":"git+https://github.com/zuplo/deploy-zup-action.git"},"author":"Zuplo, Inc.","license":"UNLICENSED","bugs":{"url":"https://github.com/zuplo/deploy-zup-action/issues"},"homepage":"https://github.com/zuplo/deploy-zup-action#readme","dependencies":{"@actions/core":"^1.6.0","@actions/github":"^5.0.0","@zuplo/orchestration":"^3.65.0"},"devDependencies":{"@types/node":"^16.11.25","@vercel/ncc":"^0.33.3","typescript":"4.5.5"},"packageManager":"yarn@3.2.0"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(9283);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;