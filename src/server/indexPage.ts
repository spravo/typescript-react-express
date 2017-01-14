let cssLink = process.env['NODE_ENV'] === 'development' ? '' : '<link rel="stylesheet" href="/bundle.css">';

const index = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>INDEX</title>
            ${cssLink}
        </head>
        <body>
            <div id="root"></div>
            <script src="/bundle.js"></script>
        </body>
    </html>`;

export default function indexPageRouter(request: any, response: any) {
    response.status(200).type('text/html').send(index);
}
