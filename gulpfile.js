/*eslint no-var: 0 */
var requireDir = require('require-dir');

// ES6 everywhere!
require('babel-core/register');
// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });
