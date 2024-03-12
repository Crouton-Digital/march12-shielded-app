import React from 'react';
import { Text, Box } from '@interchain-ui/react';
import AssetsOverview from './AssetsOverview';
import { useChain, useAssets } from '@/namada';
import { ChainName } from 'cosmos-kit';
import { useState, useEffect } from 'react';

interface AssetListSectionProps {
  chainName: ChainName;
  children?: React.ReactNode;
}

export const AssetListSection = ({ chainName }: AssetListSectionProps) => {
  const { isWalletConnected, address } = useChain(chainName);
  const { data, isLoading, refetch } = useAssets(address);

  // useEffect(() => {
  //   if (address !== 'dummyAddress') {
  //     refetch();
  //   }
  // }, [address, refetch]);

  useEffect(() => {
    console.log('isWalletConnected', isWalletConnected)
  }, [isWalletConnected])

  return (<h1>Status: {isWalletConnected ? "FIRST" : "SECOND"}</h1>)

  if (!isWalletConnected) {
    return (
      <Box maxWidth="768px" marginX="auto" marginBottom="60px">
        <Text
          fontSize="$xl"
          fontWeight="$semibold"
          attributes={{ marginBottom: '$10' }}
        >
          My assets
        </Text>

        <Box
          height="160px"
          bg="$cardBg"
          borderRadius="$md"
          p="$6"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="$md" color="$textSecondary">
            Connect the wallet to see the assets
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box maxWidth="$containerMd" marginX="auto" marginBottom="$17">
      <AssetsOverview
        isLoading={isLoading || !data}
        assets={data?.assets ?? []}
        prices={data?.prices ?? {}}
        selectedChainName={chainName}
        refetch={refetch}
      />
    </Box>
  );
};
