import type { Handler } from '@netlify/functions';
import type { DayEvents, Events } from '../../src/types';

// GET handler
const getHandler: Handler = async (event, context) => {
  const apiSummer = "http://localhost:3030/api/summer/";
  console.log('PRERES');
  console.log(apiSummer);

  const res: Response = await fetch(`${apiSummer}cargar-eventos`);
  const resParsed = (await res.json()) as DayEvents[];

  return {
    statusCode: res.status,
    body: JSON.stringify(resParsed),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

// POST handler
const postHandler: Handler = async (event, context) => {
  const apiSummer = "http://localhost:3030/api/summer/";

  const requestBody = JSON.parse(event.body || '{}');
  const res: Response = await fetch(`${apiSummer}crear-evento`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  const resParsed = (await res.json()) as Events;

  return {
    statusCode: res.status,
    body: JSON.stringify(resParsed),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

// PUT handler
const putHandler: Handler = async (event, context) => {
  const apiSummer = "http://localhost:3030/api/summer/";

  const requestBody = JSON.parse(event.body || '{}');
  const res: Response = await fetch(`${apiSummer}actualizar-evento/${requestBody._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  const resParsed = (await res.json()) as Events;

  return {
    statusCode: res.status,
    body: JSON.stringify(resParsed),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

const handler: Handler = async (event, context) => {
  switch (event.httpMethod) {
    case 'GET':
      return getHandler(event, context);
    case 'POST':
      return postHandler(event, context);
    case 'PUT':
      return putHandler(event, context);
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
  }
};

export { handler };