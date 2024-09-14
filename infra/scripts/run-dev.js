const { spawn } = require("node:child_process");

runCommand("npm", ["run", "start:dev"]);

let isInterrupted = false;

process.on("SIGINT", () => {
  if (isInterrupted) return;
  isInterrupted = true;

  console.log("\n🔴 Processo interrompido, vamos parar os serviços.");
  runCommand("npm", ["run", "services:stop"]).on("exit", () => {
    console.log("\n🟢 Processo finalizado, tudo ocorreu bem, bom descanso.");
    process.exit();
  });
});

function runCommand(command, args) {
  return spawn(command, args, { stdio: "inherit", shell: true });
}
