const { exec } = require('node:child_process')

function checkPostgres() {
    exec('docker exec postgres-dev pg_isready', handleReturn)

    function handleReturn(error, stdout) {
        if (stdout.search("accepting connections") === -1) {
            process.stdout.write('.')
            setTimeout(checkPostgres, 1000)
            return
        }
        process.stdout.write("\n 🟢 Postgres está pronto e aceitando conexões")
    }
}

process.stdout.write("\n🔴 Aguardando Postgres aceitar conexões")
checkPostgres()