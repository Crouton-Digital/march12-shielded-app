import { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';

export const useAssets = (address) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBalances = async () => {
      setIsLoading(true);
      try {
        const balances = await window.namada.balances({ owner: address });
        const assets = balances.map((balance) => ({
          symbol: balance.token,
          logoUrl: '', // Replace with actual logo URL
          prettyChainName: '', // Replace with actual chain name
          displayAmount: balance.amount,
          dollarValue: new BigNumber(balance.amount).multipliedBy(1).toString(), // Replace 1 with actual price
          amount: balance.amount,
          denom: balance.token,
        }));
        debugger;
        setData({
          prices: {}, // Replace with actual prices
          allBalances: balances,
          assets,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalances();
  }, [address]);

  const refetch = () => {
    setData(null);
    setIsLoading(true);
  };

  return { data, isLoading, refetch };
};

export const useChain = () => {
  const [chain, setChain] = useState(null);
  const [status, setStatus] = useState('disconnected');
  const [username, setUsername] = useState('dummyUser');
  const [address, setAddress] = useState('dummyAddress');
  const [message, setMessage] = useState('dummyMessage');
  const [wallet, setWallet] = useState('dummyWallet');
  const [isWalletConnected, setWalletConnected] = useState(false);

  const connect = async () => {
    try {
      await window.namada.connect();
      const accounts = await window.namada.accounts();
      const address = accounts.filter(it => !!it.address).pop().address
      setStatus('Connected');
      setWalletConnected(true)
      setAddress(address)
    } catch (err) {
      console.error('connect error', 'perhaps extension missing or not initialized')
    }
  };

  const openView = () => {
    // Here you would normally implement the logic to open the chain view.
    // For this dummy version, we'll just log a message.
    console.log('Chain view opened');
  };

  useEffect(() => {
    // Here you would normally fetch or compute the chain data.
    // For this dummy version, we'll just use a hardcoded object.
    const dummyChain = {
      id: '1',
      name: 'Dummy Chain',
      description: 'This is a dummy chain for demonstration purposes.',
      // Add any other properties you need.
    };

    setChain(dummyChain);
  }, []);

  return { isWalletConnected, connect, openView, status, username, address, message, wallet, chain };
};

export const useManager = () => {
  const [chainRecords, setChainRecords] = useState([]);
  const getChainLogo = (chainName) => {
    // Here you would normally implement the logic to get the logo of the chain.
    // For this dummy version, we'll just return a dummy logo.
    return 'dummyLogo.png';
  };

  useEffect(() => {
    // Here you would normally fetch or compute the chain records.
    // For this dummy version, we'll just use a hardcoded array.
    const dummyChainRecords = [
      {
        id: '1',
        name: 'Dummy Chain 1',
        description: 'This is a dummy chain for demonstration purposes.',
        // Add any other properties you need.
      },
      {
        id: '2',
        name: 'Dummy Chain 2',
        description: 'This is another dummy chain for demonstration purposes.',
        // Add any other properties you need.
      },
    ];

    setChainRecords(dummyChainRecords);
  }, []);

  return { chainRecords, getChainLogo };
};
