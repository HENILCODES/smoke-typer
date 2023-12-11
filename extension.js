const vscode = require('vscode');

function activate(context) {
    console.log('Congratulations, your extension "smoke typer" is now active!');

    // Register an event listener for onType
    vscode.workspace.onDidChangeTextDocument(event => {
        if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
            const isEnabled = vscode.workspace.getConfiguration('smoke-typer').get('enable', true);

            if (isEnabled) {
                const intensity = vscode.workspace.getConfiguration('smoke-typer').get('intensity', 600);
                const TextColor = vscode.workspace.getConfiguration('smoke-typer').get('TextColor', 'inherit');
                const BackgroundColor = vscode.workspace.getConfiguration('smoke-typer').get('BackgroundColor', '#c9c9c44d');
                const BorderRadius = vscode.workspace.getConfiguration('smoke-typer').get('BorderRadius', '3px');

                // Get the current position of the cursor
                const position = vscode.window.activeTextEditor.selection.active;

                // Create a TextEditorDecorationType for the effect
                const decorationType = vscode.window.createTextEditorDecorationType({
                    backgroundColor: `${BackgroundColor}`,
                    color:`${TextColor}`,
                    borderRadius: `${BorderRadius}`
                });

                // Define a range for the effect (e.g., one character around the cursor)
                const range = new vscode.Range(position.translate(0, -1), position.translate(0, 1));

                // Add the decoration to the editor
                vscode.window.activeTextEditor.setDecorations(decorationType, [{ range }]);

                // Dispose the decoration after a short delay (e.g., 600 milliseconds)
                setTimeout(() => decorationType.dispose(), intensity);
            }
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
