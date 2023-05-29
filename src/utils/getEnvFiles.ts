import * as path from 'path';

export function getEnvFiles(): [string] {
    console.log(process.env.ENVIRONMENT);

    return [path.resolve(`./env/.env.${process.env.ENVIRONMENT}`).trim()];
}
