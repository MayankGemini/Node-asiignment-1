const fileSystem = require('fs');
const httpModule = require('http');

const server = httpModule.createServer(async (request, response) => {
  try {
    if (request.url === '/' && request.method === 'GET') {
      const jsonData = await fileSystem.promises.readFile('text.json', 'utf8');
      const parsedData = JSON.parse(jsonData);

      const dataObject = {
        existingData: parsedData,
      };

      await fileSystem.promises.writeFile('data.txt', JSON.stringify(dataObject), 'utf8');

      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(dataObject));
    } else {
      response.statusCode = 404;
      response.end('Not Found');
    }
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.end('Error');
  }
});

server.listen(8080, () => {
  console.log('Done');
});
