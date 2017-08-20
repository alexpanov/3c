import {Chromeless} from 'chromeless';

export const createChromeless = () => new Chromeless({
  remote: {
    endpointUrl: process.env.CHROMELESS_ENDPOINT_URL || 'https://2g6um144j9.execute-api.us-east-1.amazonaws.com/dev',
    apiKey: process.env.CHROMELESS_API_KEY || 'lDg8xyjZKD7lCQK6LTxWy468naN78RsdaWxqM8A1'
  },
});
