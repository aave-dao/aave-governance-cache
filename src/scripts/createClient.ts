import { createPublicClient, http } from 'viem';

export const createViemClient = ({
  chain,
  rpcUrl,
}: {
  chain: any;
  rpcUrl?: string;
}): any =>
  createPublicClient({
    batch: {
      multicall: true,
    },
    chain,
    transport: http(rpcUrl),
  });
