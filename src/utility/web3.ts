import Web3 from 'web3';
import Transaction from 'ethereumjs-tx';
import * as EthUtil from 'ethereumjs-util';
import Bip39 from 'bip39';
import Hdkey from 'hdkey';
import { EncryptedKeystoreV3Json } from 'web3-core';
import { IAccount } from '~/redux/account/types';
import keythereum from 'keythereum';
import BigInt from 'big-integer';

const {
  REACT_APP_API_URL_FANTOM,
  REACT_APP_KEY_INFURA,
  REACT_APP_EXAMPLE_ADDRESS,
} = process.env;

export const DEFAULT_PROVIDERS = [
  'ws://3.15.138.107:4500',
  'ws://18.189.195.64:4501',
  'ws://18.191.96.173:4502',
  'ws://18.222.120.223:4503',
];

const URL_FANTOM = REACT_APP_API_URL_FANTOM;
const URL_ETHEREUM = `https://rinkeby.infura.io/v3/${REACT_APP_KEY_INFURA}`;

export interface ITransfer {
  from: string;
  to: string;
  value: string;
  memo: string;
  privateKey: string;
}

class Web3Agent {
  constructor(url: string) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(url));
  }

  web3: Web3;

  async getBalance(address: string = REACT_APP_EXAMPLE_ADDRESS) {
    const res = await this.web3.eth.getBalance(address);
    return res;
  }

  async transfer({ from, to, value, memo, privateKey }: ITransfer) {
    const nonce = await this.web3.eth.getTransactionCount(from);
    const gasPrice = await this.web3.eth.getGasPrice();

    const rawTx = {
      from,
      to,
      value: Web3.utils.toHex(Web3.utils.toWei(value, 'ether')),
      gasLimit: Web3.utils.toHex(44000),
      gasPrice: Web3.utils.toHex(gasPrice),
      nonce: Web3.utils.toHex(nonce),
      data: memo,
    };

    const privateKeyBuffer = EthUtil.toBuffer(privateKey);

    const tx = new Transaction(rawTx);

    tx.sign(privateKeyBuffer);
    const serializedTx = tx.serialize();

    return this.web3.eth.sendSignedTransaction(
      `0x${serializedTx.toString('hex')}`
    );
  }

  async estimateFee({
    from,
    to,
    value,
    memo,
  }: Pick<ITransfer, 'from' | 'to' | 'value' | 'memo'>): Promise<string> {
    const gasPrice = await this.web3.eth.getGasPrice();
    const gasLimit = await this.web3.eth.estimateGas({
      from,
      to,
      value: Web3.utils.toHex(Web3.utils.toWei(value, 'ether')),
      data: Web3.utils.asciiToHex(memo),
    });

    const fee = Web3.utils.fromWei(
      BigInt(gasPrice)
        .multiply(BigInt(gasLimit))
        .toString()
    );

    return fee;
  }

  mnemonicToKeys = (mnemonic: string): { publicAddress; privateKey } => {
    const seed = Bip39.mnemonicToSeed(mnemonic);
    const root = Hdkey.fromMasterSeed(seed);

    const addrNode = root.derive("m/44'/60'/0'/0/0");
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey);
    const addr = EthUtil.publicToAddress(pubKey).toString('hex');
    const publicAddress = EthUtil.toChecksumAddress(addr);
    const privateKey = EthUtil.bufferToHex(addrNode._privateKey);

    return { publicAddress, privateKey };
  };

  getKeystore = (
    privateKey: string,
    password: string
  ): EncryptedKeystoreV3Json =>
    this.web3.eth.accounts.encrypt(privateKey, password);

  validateKeystore = (keystore: EncryptedKeystoreV3Json, password: string) =>
    this.web3.eth.accounts.decrypt(keystore, password);

  getPrivateKey = (
    keystore: IAccount['keystore'],
    password: string
  ): Promise<string | null> =>
    new Promise(resolve =>
      keythereum.recover(password, keystore, dataRes => {
        resolve(
          dataRes instanceof Buffer ? EthUtil.bufferToHex(dataRes) : null
        );
      })
    );
}

// const Fantom = new Web3Agent(URL_FANTOM);
const Fantom = new Web3Agent(URL_ETHEREUM);
const Ethereum = new Web3Agent(URL_ETHEREUM);

export { Fantom, Ethereum };
