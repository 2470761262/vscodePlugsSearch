const vscode = require("vscode");
const axios = require("axios");

let http = axios.create();
function openUrl(value) {
  vscode.commands.executeCommand(
    "vscode.open",
    vscode.Uri.parse(`https://www.baidu.com/s?ie=UTF-8&wd=${value}`)
  );
}

function queryTextEdit() {
  return vscode.commands.registerCommand("inlineSearch.text", function () {
    let inputBox = vscode.window.createInputBox();
    inputBox.title = "快捷百度搜索";
    inputBox.placeholder = "请输入内容";
    inputBox.prompt = "将打开百度搜索";
    inputBox.onDidAccept(() => {
      openUrl(inputBox.value);
      inputBox.close();
    });
    inputBox.show();
  });
}

function quickPick() {
  return vscode.commands.registerCommand("inlineSearch.quickPick", function () {
    const editor = vscode.window.activeTextEditor;
    const allSelection = editor.selection;
    const activeText = editor.document.getText(allSelection);
    if (activeText == "") return vscode.window.showErrorMessage("未选中文本~.");

    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "正在连接百度查询关键字~",
        cancellable: true,
      },
      () => {
        return http({
          method: "get",
          url: `http://suggestion.baidu.com/su?wd=${encodeURIComponent(
            activeText
          )}&cb=`,
        })
          .then((g) => {
            console.log(g);
            // const v = eval(data).s;

            // console.log(v, "？？？");
          })
          .catch((e) => {
            console.log("获取数据失败", e);
          });
      }
    );

    // vscode.window
    //   .showQuickPick(x, {
    //     matchOnDescription: true,
    //   })
    //   .then((item) => {

    // });
  });
}

function activate(context) {
  context.subscriptions.push(queryTextEdit());
  context.subscriptions.push(quickPick());
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
