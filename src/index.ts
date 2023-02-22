declare var Terminal: any;
declare var formbutton: any;

interface Window {
  formbutton: any;
}

const terminal = new Terminal();
const eliza = new ElizaBot(false);

window.onload = function () {
  // Init libs
  initFormButton();

  const initial = eliza.getInitial();

  // Set up terminal
  terminal.setTextColor("#070141");
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

function initFormButton() {
  window.formbutton =
    window.formbutton ||
    function () {
      (formbutton.q = formbutton.q || []).push(arguments);
    };
  formbutton("create", {
    title: "Ta kontakt!",
    styles: {
      button: {
        background: "rgb(183,174,165)",
      },
      title: {
        background: "rgb(183,174,165)",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      },
    },
    fields: [
      {
        name: "name",
        type: "text",
        label: "Navn",
        required: true,
      },
      {
        name: "email",
        type: "email",
        label: "Epost",
        required: true,
      },
      {
        name: "Melding",
        type: "textarea",
        required: true,
      },
      {
        type: "submit",
      },
    ],
    action: "https://formspree.io/xgengvpd",
  });
}
