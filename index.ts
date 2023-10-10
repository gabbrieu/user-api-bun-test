import { Server } from "bun"

const server: Server = Bun.serve({
    fetch(req) {
        // const url = new URL(req.url)
        // if(url.pathname === '/users') return new Response('Users')
        return new Response('Test')
    },
})


console.log(`Listening on http://localhost:${server.port}`)