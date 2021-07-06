import { enableFetchMocks } from 'jest-fetch-mock'
import { config } from "dotenv";

config({path: '.env.local'})
enableFetchMocks()
