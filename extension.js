const vscode = require("vscode");

function queryTextEdit() {
  return vscode.commands.registerCommand("inlineSearch.text", function () {

    let inputBox = vscode.window.createInputBox();
    inputBox.title = "快捷百度搜索";
    inputBox.placeholder = "请输入内容";
    inputBox.prompt = "将打开百度搜索";
		inputBox.onDidAccept(()=>{
			vscode.commands.executeCommand('vscode.open', 
				vscode.Uri.parse(`https://www.baidu.com/s?ie=UTF-8&wd=${inputBox.value}`)
			)
			inputBox.close();
		})
		inputBox.show();
  });
}

function activate(context) {
  context.subscriptions.push(queryTextEdit());
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
