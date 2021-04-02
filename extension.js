"use strict";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context)
{

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "better-stack-overflow-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let searchCommand = vscode.commands.registerCommand('better-stack-overflow-helper.betterStackOverflowSearch', async function ()
	{
		// The code you place here will be executed every time your command is executed

		let searchQuery = getSelectedText();
		if (!searchQuery || searchQuery == null || searchQuery.length < 1)
		{
			searchQuery = await vscode.window.showInputBox({
				placeHolder: 'Enter your Stack Overflow search query'
			});
		}
		
		actualSearch(searchQuery);
	});

	context.subscriptions.push(searchCommand);
}

function actualSearch(term)
{
	vscode.window.showInformationMessage(`SO SEARCH: ${term}`);

	vscode.window.createWebviewPanel('webview', "panel title", vscode.ViewColumn.Beside,
	null );
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

function getSelectedText()
{
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return ''; }

    const document = editor.document;
    const eol = document.eol === 1 ? '\n' : '\r\n';
    let result = '';
    const selectedTextLines = editor.selections.map(function(selection)
	{
        if (selection.start.line === selection.end.line && selection.start.character === selection.end.character)
		{
            const range = document.lineAt(selection.start).range;
            const text = editor.document.getText(range);
            return `${text}${eol}`;
        }
        return editor.document.getText(selection);
    });

    if (selectedTextLines.length > 0)
	{
        result = selectedTextLines[0];
    }
    result = result.trim();
    return result;
}