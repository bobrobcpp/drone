import { hrtime } from 'process';

// Get a more exact timestamp than Date.now()
export function getCurrentTimestamp(): bigint {
    return hrtime.bigint();
}