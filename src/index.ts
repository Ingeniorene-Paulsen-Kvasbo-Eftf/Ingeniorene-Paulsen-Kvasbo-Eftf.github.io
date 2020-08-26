declare var Terminal: any;
declare var ElizaBot: any;

const terminal = new Terminal();
const eliza = new ElizaBot();

window.onload = function () {
  // Init libs

  const initial = eliza.getInitial();

  // Set up terminal
  terminal.setTextColor("#ffffff");
  terminal.setWidth("100%");
  terminal.setHeight("100%");
  terminal.setBackgroundColor("#00000000");
  const container = document.getElementById("terminal_active");
  container.appendChild(terminal.html);

  terminal.input(initial, handleElizaReply);
};

function handleElizaReply(input: string) {
  const reply = eliza.transform(input);
  if (eliza.quit) {
    const final = eliza.getFinal();
    terminal.clear();
    terminal.print(final);
    terminal.beep();
    return;
  } else {
    terminal.clear();
    terminal.input(reply, handleElizaReply);
  }
}
