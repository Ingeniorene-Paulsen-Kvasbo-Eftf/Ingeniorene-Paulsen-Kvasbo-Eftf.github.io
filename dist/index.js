var terminal = new Terminal();
var eliza = new ElizaBot(false);
window.onload = function () {
    initFormButton();
    var initial = eliza.getInitial();
    terminal.setTextColor("#070141");
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
