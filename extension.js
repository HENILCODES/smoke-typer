const vscode = require('vscode');

function activate(context) {
    console.log('Congratulations, your extension "smoke typer" is now active!');

    // Register an event listener for onType
    vscode.workspace.onDidChangeTextDocument(event => {
        if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
            // Get the current position of the cursor
            const position = vscode.window.activeTextEditor.selection.active;

            // Create a TextEditorDecorationType for the effect
            const decorationType = vscode.window.createTextEditorDecorationType({
                backgroundColor: 'rgb(201 201 196 / 30%)',
                borderRadius: '3px'
            });

            // Define a range for the effect (e.g., one character around the cursor)
            const range = new vscode.Range(position.translate(0, -1), position.translate(0, 1));

            // Add the decoration to the editor
            vscode.window.activeTextEditor.setDecorations(decorationType, [{ range }]);

            // Dispose the decoration after a short delay (e.g., 500 milliseconds)
            setTimeout(() => decorationType.dispose(), 600);
        }
    });

	let disposable = vscode.commands.registerCommand('smoke-typer.start', function () {
		vscode.window.showInformationMessage('Smoke typer start');
	});
	
	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};

