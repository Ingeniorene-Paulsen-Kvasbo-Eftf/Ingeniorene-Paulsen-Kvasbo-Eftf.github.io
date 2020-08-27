var terminal = new Terminal();
var eliza = new ElizaBot(false);
window.onload = function () {
    var initial = eliza.getInitial();
    terminal.setTextColor("#ffffff");
    terminal.setWidth("100%");
    terminal.setHeight("100%");
    terminal.setBackgroundColor("#00000000");
    var container = document.getElementById("terminal_active");
    container.appendChild(terminal.html);
    terminal.input(initial, handleElizaReply);
};
function handleElizaReply(input) {
    var reply = eliza.transform(input);
    if (eliza.quit) {
        var final = eliza.getFinal();
        terminal.clear();
        terminal.print(final);
        terminal.beep();
        return;
    }
    else {
        terminal.clear();
        terminal.input(reply, handleElizaReply);
    }
}
