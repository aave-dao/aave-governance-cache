declare module '@bgd-labs/js-utils' {
  import type { AbiEvent } from 'abitype';
  import type { Address, GetLogsReturnType } from 'viem';

  export function getContractDeploymentBlock(args: {
    client: any;
    contractAddress: Address;
    fromBlock: bigint;
    toBlock: bigint;
    maxDelta: bigint;
  }): Promise<bigint>;

  export function getBlockAtTimestamp(args: {
    client: any;
    timestamp: bigint;
    fromBlock: bigint;
    toBlock: bigint;
    maxDelta: bigint;
  }): Promise<{
    number: bigint;
    timestamp: bigint;
  }>;

  export function strategicGetLogs<TAbiEvents extends AbiEvent[] | undefined>({
    client,
    events,
    address,
    fromBlock,
    toBlock,
  }: {
    client: any;
    events: TAbiEvents;
    address: Address | Address[];
    fromBlock: bigint;
    toBlock: bigint;
  }): Promise<GetLogsReturnType<undefined, TAbiEvents>>;

  export function readJSONCache<T = any>(
    filePath: string,
    filename: string | number,
  ): T | undefined;

  export function writeJSONCache<T extends {}>(
    filePath: string,
    filename: string | number,
    json: T,
  ): void;
}
