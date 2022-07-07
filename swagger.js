const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    version: '1.0.0',
    title: 'Department Summary Statistics',
    description: 'Documentation automatically generated by the <b>swagger-autogen</b> module.',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Statistics',
      description: 'Summary statistics endpoints',
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be "header", "query" or "cookie"
      name: 'X-API-KEY', // name of the header, query parameter or cookie
      description: 'Bearer token',
    },
  },
  definitions: {
    Employee: {
      id: 1,
      name: 'Anurag',
      salary: 90000,
      currency: 'USD',
      department: 'Banking',
      sub_department: 'Loan',
      on_contract: true,
    },
    SummaryStatistics: {
      min: 30000,
      max: 110000,
      mean: 70000,
    },
    DepartmentSS: {
      department: 'Engineering',
      summary: {
        $ref: '#/definitions/SummaryStatistics',
      },
    },
    SubDepartmentSS: {
      department: 'Engineering-Platform',
      summary: {
        $ref: '#/definitions/SummaryStatistics',
      },
    },
    AddEmployee: {
      $name: 'Anurag',
      $salary: 90000,
      $currency: 'USD',
      $department: 'Banking',
      $sub_department: 'Loan',
      on_contract: true,
    },
    EmployeeError: {
      errors: [
        {
          msg: 'Invalid value',
          param: 'name',
          location: 'body',
        },
      ],
    },
    UserLogin: {
      username: 'foo',
      password: 'bar',
    },
    UserJWT: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2NTcyMjA4OTd9.cc6Kk2YovvO9d_dfuZaVrxpQpeB2Ls5-ObeNMAF083Q',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
