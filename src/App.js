import { ethers } from "ethers";
import React, { useState, useEffect } from "react";

import ABI from "./contract.json";

function App() {
  const address = "0xabD24575CB573B5eA01D39AcbE3E1ed73e06B953";

  const [balance, setBalance] = useState(0);
  const [toAddress, setToAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [user, setUser] = useState("");
  const transferTokens = async (amount) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const token = new ethers.Contract(address, ABI.abi, signer);
        const transfer = await token.transfer(toAddress, transferAmount);
        await transfer.wait();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
        setUser(account);
        await getBalance();
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setUser(accounts[0]);
      await getBalance();
    } catch (error) {
      console.log(error);
    }
  };
  const getBalance = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const token = new ethers.Contract(address, ABI.abi, signer);
        console.log(user);
        const bal = await token.balanceOf(user);

        // console.log(bal);
        setBalance(parseInt(bal._hex));
      } else {
        console.log("Metamask is not connected");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isWalletConnected();
  }, [user]);
  return (
    <div className=" p-10 flex items-center justify-center bg-purple-300 min-h-screen rounded-full">
      {user ? (
        <div className="flex flex-col justify-center">
          <h1 className="p-4 text-lg font-bold border">Basic Token</h1>
          <p className="p-3 text-md font-semibold border">Account: {user}</p>
          <p className="p-3 text-md font-semibold border">Balance: {balance}</p>
          <div className="flex p-3 justify-start items-center gap-5 border-dashed border">
            <label htmlFor="toAddress">To:</label>
            <input
              className="bg-transparent border border-black p-3"
              type="text"
              id="toAddress"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
          </div>
          <div className="flex p-3 justify-start rounded items-center gap-5 border-dashed border">
            <label htmlFor="transferAmount">Amount:</label>
            <input
              className="bg-transparent border border-black p-3 rounded"
              type="number"
              id="transferAmount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </div>
          <button
            onClick={transferTokens}
            className=" rounded-md p-4 bg-purple-700 "
          >
            Transfer
          </button>
        </div>
      ) : (
        <button
          className=" rounded-md p-4 bg-purple-700 "
          type="button"
          onClick={connectWallet}
        >
          Connect your wallet
        </button>
      )}
    </div>
  );
}

export default App;
