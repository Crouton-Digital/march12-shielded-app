import { useState, useEffect, useContext, createContext } from 'react';
import BigNumber from 'bignumber.js';

export const ChainContext = createContext<any>({})

export function ChainProvider({ children }) {
	const [isWalletConnected, setWalletConnected] = useState(false);
	const [address, setAddress] = useState('dummyAddress');

	return (<ChainContext.Provider value={{ isWalletConnected, setWalletConnected, address, setAddress }}>
		{children}
	</ChainContext.Provider>)
}

export const useAssets = () => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { isWalletConnected, address } = useContext(ChainContext)

	useEffect(() => {
		const fetchBalances = async () => {
			setIsLoading(true);
			if (address == 'dummyAddress') return;
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
	}, [address, isWalletConnected]);

	const refetch = () => {
		setData(null);
		setIsLoading(true);
	};

	return { data, isLoading, refetch };
};

export const useChain = () => {
	const { isWalletConnected, setWalletConnected, address, setAddress } = useContext(ChainContext)

	const [chain, setChain] = useState(null);
	const [status, setStatus] = useState('disconnected');
	const [username, setUsername] = useState('dummyUser');

	const [message, setMessage] = useState('dummyMessage');
	const [wallet, setWallet] = useState('dummyWallet');

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

	return { isWalletConnected, connect, openView, status, username, address, message, wallet, chain,  };
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

export const assets = [
	{
		"$schema": "../assetlist.schema.json",
		"chain_name": "namada",
		"assets": [
			{
				"description": "The native staking token of EXAMPLE.",
				"denom_units": [
					{
						"denom": "uexp",
						"exponent": 0
					},
					{
						"denom": "example",
						"exponent": 6
					}
				],
				"base": "uexample",
				"name": "Example",
				"display": "example",
				"symbol": "EXP",
				"logo_URIs": {
					"png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/_template/images/chain_image.png",
					"svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/_template/images/chain_image.svg"
				},
				"coingecko_id": ""
			}
		]
	}
]

export const chains = [
	{
		"$schema": "../chain.schema.json",
		"chain_name": "namada",
		"status": "live",
		"website": "",
		"network_type": "testnet",
		"pretty_name": "",
		"chain_id": "",
		"bech32_prefix": "",
		"daemon_name": "",
		"node_home": "$HOME/",
		"key_algos": [
			"secp256k1"
		],
		"slip44": 118,
		"fees": {
			"fee_tokens": [
				{
					"denom": "",
					"fixed_min_gas_price": 0,
					"low_gas_price": 0,
					"average_gas_price": 0.025,
					"high_gas_price": 0.04
				}
			]
		},
		"staking": {
			"staking_tokens": [
				{
					"denom": ""
				}
			]
		},
		"codebase": {
			"git_repo": "",
			"recommended_version": "v1.0.0",
			"compatible_versions": [
				"v1.0.0"
			],
			"cosmos_sdk_version": "",
			"cosmwasm_enabled": true,
			"cosmwasm_path": "$HOME/.example/data/wasm",
			"binaries": {
				"linux/amd64": "OPTIONAL, REMOVE IF NOT NEEDED"
			},
			"genesis": {
				"genesis_url": "https://raw.githubusercontent.com/example-network/networks/master/mainnet/genesis.json"
			},
			"versions": [
				{
					"name": "v1",
					"recommended_version": "v1.0.0",
					"compatible_versions": [
						"v1.0.0"
					],
					"cosmos_sdk_version": "",
					"cosmwasm_enabled": true,
					"cosmwasm_path": "$HOME/.example/data/wasm",
					"binaries": {
						"linux/amd64": "OPTIONAL, REMOVE IF NOT NEEDED"
					}
				}
			]
		},
		"logo_URIs": {
			"png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/_template/images/chain_image.png",
			"svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/_template/images/chain_image.svg"
		},
		"peers": {
			"seeds": [
				{
					"id": "aab202d5648772a8b5be3db575a8a7dd577db78f",
					"address": "seeds.example.com:11156",
					"provider": "Example Labs"
				}
			],
			"persistent_peers": [
				{
					"id": "fca96d0a1d7127afb226a49c4c7d9126118c37e9",
					"address": "example.com",
					"provider": "Example Labs"
				}
			]
		},
		"apis": {
			"rpc": [
				{
					"address": "https://rpc.example.com",
					"provider": "Example Labs"
				}
			],
			"rest": [
				{
					"address": "https://rpc.example.com",
					"provider": "Example Labs"
				}
			],
			"grpc": [
				{
					"address": "https://grpc.example.com",
					"provider": "Example Labs"
				}
			]
		},
		"explorers": [
			{
				"kind": "mintscan",
				"url": "https://www.mintscan.io/example",
				"tx_page": "https://www.mintscan.io/example/txs/${txHash}",
				"account_page": "https://www.mintscan.io/example/account/${accountAddress}"
			},
			{
				"kind": "ping.pub",
				"url": "https://ping.pub/EXAMPLE",
				"tx_page": "https://ping.pub/EXAMPLE/tx/${txHash}"
			}
		]
	}
]
