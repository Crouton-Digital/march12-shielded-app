export const assets= [
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
