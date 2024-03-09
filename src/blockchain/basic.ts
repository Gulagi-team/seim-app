import Web3 from 'web3';

export const web3Instance = new Web3(
  'https://bsc-testnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5',
);

export const importWalletFromPK = async (privateKey: string) => {
  console.log('importWalletFromPK');
  try {
    const account = await web3Instance.eth.accounts.privateKeyToAccount(
      privateKey,
    );
    console.log('account1', account);
    return account;
  } catch (e) {
    console.log('e: ', e);
  }
};

export const createAccount = async () => {
  try {
    const account = await web3Instance.eth.accounts.create();
    return account;
  } catch (e) {
    console.log('e: ', e);
  }
};

export const getWalletBalance = async (currentAccount: string) => {
  let walletBalance = 0;
  await web3Instance.eth
    .getBalance(currentAccount)
    .then(b => {
      walletBalance = Number(b) / 1e18;
    })
    .catch(err => {
      console.log('getBalance error', err);
    });
  return walletBalance;
};

export const useSignTransaction = async (
  transactionConfig: any,
  privateKey: string,
) => {
  var respone = '';
  const tx = await web3Instance.eth.accounts.signTransaction(
    {...transactionConfig},
    privateKey,
    // async function (err, signPromise) {
    //   if (!err) {
    //     if (signPromise.rawTransaction) {
    //       await web3TestBSC.eth.sendSignedTransaction(
    //         signPromise.rawTransaction,
    //         function (error, hash) {
    //           if (!error) {
    //             console.log('The hash of your transaction is: ', hash);
    //             Toast.show({
    //               type: 'info',
    //               text1: 'Transaction is submited',
    //             });
    //             respone = hash;
    //             return hash;
    //           } else {
    //             console.log(
    //               'Something went wrong when sendSignedTransaction:',
    //               error,
    //             );
    //             Toast.show({
    //               type: 'error',
    //               text1: 'Something went wrong.',
    //             });
    //             // stateStore.dispatch(closeModal());
    //           }
    //         },
    //       );
    //     }
    //   } else {
    //     console.log('Something went wrong when signTransaction:', err);
    //     // stateStore.dispatch(closeModal());
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Something went wrong.',
    //     });
    //   }
    // },
  );
  // console.log('respone: ', respone);
  // console.log('A: ', tx.transactionHash);
  return tx.transactionHash;
};

export const checkingTransactionReceipt = async (txHash: string) => {
  const res = await web3Instance.eth
    .getTransactionReceipt(txHash)
    .then(receipt => {
      console.log('checkingTransactionReceipt PendingTx', receipt);
      // if (receipt?.status) {
      //   return true;
      // }
      const status = !receipt
        ? 'Processing'
        : receipt.status
        ? 'Completed'
        : 'Failed';
      if (status === 'Completed') {
        return true;
      }
      // console.log('updateTransactionByIdMiddleware err ', err);
      return false;
    });
  return res;
};

// export const sendToken = async (
//   erc20Contract,
//   fromPK,
//   fromAddress,
//   toAddress,
// ) => {
//   console.log('---Start');

//   const methods = erc20Contract.methods.transfer(
//     toAddress,
//     '100000000000000000000',
//   );

//   console.log('---methods: ', methods);
//   const nonce = await web3TestBSC.eth.getTransactionCount(
//     fromAddress,
//     'pending',
//   );
//   console.log('---nonce: ', nonce);

//   const gasEstimate = await methods.estimateGas({
//     from: fromAddress,
//   });
//   // console.log({ gasEstimate });

//   const tx = {
//     from: fromAddress,
//     to: '0xA25C76d4b51821667352EEc35dFB00472311267A',
//     data: methods.encodeABI(),
//     gas: gasEstimate,
//     nonce: nonce,
//   };
//   console.log('---tx: ', tx);
//   // Sign the transaction
//   console.log('---START signPromise---');
//   const signPromise = await web3TestBSC.eth.accounts.signTransaction(
//     tx,
//     fromPK,
//   );
//   console.log('---signPromise: ', signPromise);
//   // const res = await web3TestBSC.eth.sendSignedTransaction(
//   //   signPromise.rawTransaction,
//   // );
//   // console.log('---res: ', res);
//   signPromise
//     .then(signedTx => async () => {
//       console.log(
//         'The hash of your transaction is: ',
//         signedTx.transactionHash,
//       );
//       // signedTx.transactionHash
//       await web3TestBSC.eth.sendSignedTransaction(
//         signedTx.rawTransaction,
//         function (err, hash) {
//           if (!err) {
//             console.log('The hash of your transaction is: ', hash);
//           } else {
//             console.log(
//               'Something went wrong when submitting your transaction:',
//               err,
//             );
//           }
//         },
//       );
//     })
//     .catch(err => {
//       console.log('Promise failed:', err);
//     });
// };
