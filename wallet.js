// ═══ TehDon's Wallet — FIXED ═══
// Key fix: eth_requestAccounts must be called DIRECTLY from click handler
// without any DOM manipulation beforehand (browsers block popups otherwise)

var WalletState = { address: null, provider: null, signer: null };

var Wallet = {
  isMobile: /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
  hasMetaMask: function() { return typeof window.ethereum !== 'undefined'; },
  short: function(a) { return a ? a.slice(0,6)+'...'+a.slice(-4) : ''; },
  connected: function() { return !!WalletState.address; },
  addr: function() { return WalletState.address; },

  demoConnect: function() {
    var h='0123456789abcdef', a='0x';
    for(var i=0;i<40;i++) a+=h[Math.floor(Math.random()*16)];
    WalletState.address = a;
    return a;
  },

  // CRITICAL: This must be called directly from the click event
  // Do NOT remove modal or change DOM before calling this
  connect: async function() {
    if (!window.ethereum) throw new Error('NO_WALLET');

    // STEP 1: Request accounts IMMEDIATELY — this triggers MetaMask popup
    var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    if (!accounts || accounts.length === 0) throw new Error('NO_ACCOUNTS');
    WalletState.address = accounts[0].toLowerCase();

    // STEP 2: Setup ethers (after popup is resolved)
    try {
      if (typeof ethers !== 'undefined') {
        WalletState.provider = new ethers.BrowserProvider(window.ethereum);
        WalletState.signer = await WalletState.provider.getSigner();
      }
    } catch(e) { /* non-critical */ }

    // STEP 3: Listen for changes
    try {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    } catch(e) {}
    window.ethereum.on('accountsChanged', function(a) {
      if (!a.length) { WalletState.address=null; window.dispatchEvent(new Event('wallet-disconnected')); }
      else { WalletState.address=a[0].toLowerCase(); window.dispatchEvent(new CustomEvent('wallet-changed',{detail:{address:WalletState.address}})); }
    });

    return WalletState.address;
  },

  donate: async function(toAddr, amount, token, netKey) {
    if (!WalletState.signer) throw new Error('DEMO');
    var net = CONFIG.NETWORKS[netKey];
    try {
      await window.ethereum.request({ method:'wallet_switchEthereumChain', params:[{chainId:net.chainId}] });
    } catch(e) {
      if (e.code===4902) await window.ethereum.request({ method:'wallet_addEthereumChain', params:[{chainId:net.chainId,chainName:net.name,nativeCurrency:net.nativeCurrency}] });
    }
    WalletState.provider = new ethers.BrowserProvider(window.ethereum);
    WalletState.signer = await WalletState.provider.getSigner();
    var tx;
    if (!token.address) tx = await WalletState.signer.sendTransaction({to:toAddr,value:ethers.parseUnits(amount,token.decimals)});
    else { var c=new ethers.Contract(token.address,CONFIG.ERC20_ABI,WalletState.signer); tx=await c.transfer(toAddr,ethers.parseUnits(amount,token.decimals)); }
    return { hash:tx.hash, url:net.explorer+tx.hash };
  },

  getBalance: async function(tokenAddr,dec) {
    if (!WalletState.provider||!WalletState.address) return '?';
    try {
      if (!tokenAddr) { var b=await WalletState.provider.getBalance(WalletState.address); return ethers.formatUnits(b,dec||18); }
      var c=new ethers.Contract(tokenAddr,CONFIG.ERC20_ABI,WalletState.provider); var b2=await c.balanceOf(WalletState.address); return ethers.formatUnits(b2,dec||18);
    } catch(e) { return '?'; }
  }
};
