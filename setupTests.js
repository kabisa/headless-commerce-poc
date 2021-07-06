const fetchMock = require('jest-fetch-mock');
const dotenv = require("dotenv");

dotenv.config({path: '.env.local'})
fetchMock.enableFetchMocks()
