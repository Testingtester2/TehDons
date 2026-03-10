var CONFIG={
  NETWORKS:{
    ethereum:{name:'Ethereum',chainId:'0x1',icon:'Ξ',explorer:'https://etherscan.io/tx/',nativeCurrency:{name:'Ether',symbol:'ETH',decimals:18},tokens:[{symbol:'ETH',name:'Ether',decimals:18,address:null},{symbol:'USDC',name:'USD Coin',decimals:6,address:'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'},{symbol:'SHIB',name:'Shiba Inu',decimals:18,address:'0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE'}]},
    polygon:{name:'Polygon',chainId:'0x89',icon:'⬡',explorer:'https://polygonscan.com/tx/',nativeCurrency:{name:'POL',symbol:'POL',decimals:18},tokens:[{symbol:'POL',name:'POL',decimals:18,address:null},{symbol:'USDC',name:'USD Coin',decimals:6,address:'0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'}]},
    bsc:{name:'BNB Chain',chainId:'0x38',icon:'◆',explorer:'https://bscscan.com/tx/',nativeCurrency:{name:'BNB',symbol:'BNB',decimals:18},tokens:[{symbol:'BNB',name:'BNB',decimals:18,address:null}]},
    arbitrum:{name:'Arbitrum',chainId:'0xa4b1',icon:'◈',explorer:'https://arbiscan.io/tx/',nativeCurrency:{name:'Ether',symbol:'ETH',decimals:18},tokens:[{symbol:'ETH',name:'Ether',decimals:18,address:null},{symbol:'ARB',name:'Arbitrum',decimals:18,address:'0x912CE59144191C1204E64559FE8253a0e49E6548'}]},
  },
  ERC20_ABI:['function transfer(address to, uint256 amount) returns (bool)','function balanceOf(address owner) view returns (uint256)'],
};
