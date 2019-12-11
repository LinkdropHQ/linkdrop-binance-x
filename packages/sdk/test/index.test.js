/* global describe, it */
import { expect, assert } from 'chai'
import sdk from '../index'
import { ethers } from 'ethers'

const regex = `/^0x([A-Fa-f0-9]{64})$/`

const wallet = ethers.Wallet.createRandom()

describe('SDK functions tests', () => {
  describe('signReceiverAddress', () => {
    it('should fail with link key not provided', async () => {
      try {
        await sdk.signReceiverAddress({
          receiverAddress: wallet.address
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `linkKey`')
      }
    })
    it('should fail with receiver address not provided', async () => {
      try {
        await sdk.signReceiverAddress({
          linkKey: ethers.Wallet.createRandom().privateKey
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `receiverAddress`')
      }
    })
    it('should correctly sign receiver address', async () => {
      const sig = await sdk.signReceiverAddress({
        linkKey: ethers.Wallet.createRandom().privateKey,
        receiverAddress: wallet.address
      })
      expect(ethers.utils.isHexString(sig)).to.be.true
      expect(ethers.utils.hexDataLength(sig)).to.equal(65)
    })
  })

  describe('signLinkParams', () => {
    it('should fail with private key not provided', async () => {
      try {
        await sdk.signLinkParams({
          asset: 'BNB',
          linkId: ethers.Wallet.createRandom().address,
          amount: '1'
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `privateKey`')
      }
    })
    it('should fail with asset key not provided', async () => {
      try {
        await sdk.signLinkParams({
          privateKey: wallet.privateKey,
          linkId: ethers.Wallet.createRandom().address,
          amount: '1'
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `asset`')
      }
    })
    it('should fail with link id not provided', async () => {
      try {
        await sdk.signLinkParams({
          privateKey: wallet.privateKey,
          asset: 'BNB',
          amount: '1'
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `linkId`')
      }
    })
    it('should fail with amount not provided', async () => {
      try {
        await sdk.signLinkParams({
          privateKey: wallet.privateKey,
          asset: 'BNB',
          linkId: ethers.Wallet.createRandom().address
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `amount`')
      }
    })

    it('should succesfully sign link params', async () => {
      const sig = await sdk.signLinkParams({
        privateKey: wallet.privateKey,
        asset: 'BNB',
        linkId: ethers.Wallet.createRandom().address,
        amount: '1'
      })
      expect(ethers.utils.isHexString(sig)).to.be.true
      expect(ethers.utils.hexDataLength(sig)).to.equal(65)
    })
  })

  describe('isClaimed', () => {
    it('should fail with API host not provided', async () => {
      try {
        await sdk.isClaimed({
          apiHost: '',
          linkId: ethers.Wallet.createRandom().address
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `apiHost`')
      }
    })
    it('should fail with link id not provided', async () => {
      try {
        await sdk.isClaimed({
          apiHost: 'binance.linkdrop.io',
          linkId: ''
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `linkId`')
      }
    })
  })

  describe('generateLink', () => {
    it('should fail with claim host not provided', async () => {
      try {
        await sdk.generateLink({
          claimHost: '',
          privateKey: wallet.privateKey,
          asset: 'BNB',
          amount: '1'
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `claimHost`')
      }
    })
    it('should fail with private key not provided', async () => {
      try {
        await sdk.generateLink({
          claimHost: 'binance.linkdrop.io',
          privateKey: '',
          asset: 'BNB',
          amount: '1'
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `privateKey`')
      }
    })
    it('should fail with asset not provided', async () => {
      try {
        await sdk.generateLink({
          claimHost: 'binance.linkdrop.io',
          privateKey: wallet.privateKey,
          asset: '',
          amount: '1'
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `asset`')
      }
    })
    it('should fail with amount not provided', async () => {
      try {
        await sdk.generateLink({
          claimHost: 'binance.linkdrop.io',
          privateKey: wallet.privateKey,
          asset: 'BNB',
          amount: ''
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `amount`')
      }
    })
    it('should successfully generate link', async () => {
      const {
        url,
        linkId,
        linkKey,
        verifierSignature
      } = await sdk.generateLink({
        claimHost: 'binance.linkdrop.io',
        privateKey: wallet.privateKey,
        asset: 'BNB',
        amount: '1'
      })
      expect(ethers.utils.isHexString(linkKey)).to.be.true
      expect(ethers.utils.hexDataLength(linkKey)).to.equal(32)
      expect(ethers.utils.isHexString(linkId)).to.be.true
      expect(ethers.utils.hexDataLength(linkId)).to.equal(20)
      expect(ethers.utils.isHexString(verifierSignature)).to.be.true
      expect(ethers.utils.hexDataLength(verifierSignature)).to.equal(65)
    })
  })

  describe('checkVerifierSignature', () => {
    it('should fail with asset not provided', async () => {
      try {
        await sdk.checkVerifierSignature({
          asset: '',
          amount: '1',
          linkId: ethers.Wallet.createRandom().address,
          verifierAddress: ethers.Wallet.createRandom().address,
          verifierSignature: '0x' + '0'.repeat(64)
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `asset`')
      }
    })
    it('should fail with amount not provided', async () => {
      try {
        await sdk.checkVerifierSignature({
          asset: 'BNB',
          amount: '',
          linkId: ethers.Wallet.createRandom().address,
          verifierAddress: ethers.Wallet.createRandom().address,
          verifierSignature: '0x' + '0'.repeat(64)
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `amount`')
      }
    })
    it('should fail with link id not provided', async () => {
      try {
        await sdk.checkVerifierSignature({
          asset: 'BNB',
          amount: '1',
          linkId: '',
          verifierAddress: ethers.Wallet.createRandom().address,
          verifierSignature: '0x' + '0'.repeat(64)
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `linkId`')
      }
    })
    it('should fail with verifier address not provided', async () => {
      try {
        await sdk.checkVerifierSignature({
          asset: 'BNB',
          amount: '1',
          linkId: ethers.Wallet.createRandom().address,
          verifierAddress: undefined,
          verifierSignature: '0x' + '0'.repeat(64)
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `verifierAddress`')
      }
    })
    it('should fail with verifier signature not provided', async () => {
      try {
        await sdk.checkVerifierSignature({
          asset: 'BNB',
          amount: '1',
          linkId: ethers.Wallet.createRandom().address,
          verifierAddress: ethers.Wallet.createRandom().address,
          verifierSignature: undefined
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `verifierSignature`')
      }
    })
    it('should fail verifying invalid signature', async () => {
      try {
        await sdk.checkVerifierSignature({
          asset: 'BNB',
          amount: '1',
          linkId: ethers.Wallet.createRandom().address,
          verifierAddress: ethers.Wallet.createRandom().address,
          verifierSignature: '0x' + '0'.repeat(64)
        })
      } catch (err) {
        expect(err.message).to.equal('invalid signature')
      }
    })
    it('should successfully verify signature', async () => {
      const { linkId, verifierSignature } = await sdk.generateLink({
        claimHost: 'binance.linkdrop.io',
        privateKey: wallet.privateKey,
        asset: 'BNB',
        amount: '1'
      })
      expect(
        await sdk.checkVerifierSignature({
          asset: 'BNB',
          amount: '1',
          linkId,
          verifierAddress: wallet.address,
          verifierSignature
        })
      ).to.be.true
    })
  })

  describe('checkReceiverSignature', () => {
    it('should fail with link id not provided', async () => {
      try {
        await sdk.checkReceiverSignature({
          linkId: undefined,
          receiverAddress: ethers.Wallet.createRandom().address,
          receiverSignature: '0x' + '0'.repeat(64)
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `linkId`')
      }
    })
    it('should fail with receiver address not provided', async () => {
      try {
        await sdk.checkReceiverSignature({
          linkId: ethers.Wallet.createRandom().address,
          receiverAddress: null,
          receiverSignature: '0x' + '0'.repeat(64)
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `receiverAddress`')
      }
    })
    it('should fail with receiver signature not provided', async () => {
      try {
        await sdk.checkReceiverSignature({
          linkId: ethers.Wallet.createRandom().address,
          receiverAddress: ethers.Wallet.createRandom().address,
          receiverSignature: null
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `receiverSignature`')
      }
    })
    it('should fail check with invalid receiver signature', async () => {
      try {
        await sdk.checkReceiverSignature({
          linkId: ethers.Wallet.createRandom().address,
          receiverAddress: ethers.Wallet.createRandom().address,
          receiverSignature: '0x' + '0'.repeat(64)
        })
      } catch (err) {
        expect(err.message).to.equal('invalid signature')
      }
    })
    it('should successfully check receiver signature', async () => {
      const receiverAddress = ethers.Wallet.createRandom().address
      const linkKey = ethers.Wallet.createRandom().privateKey
      const receiverSignature = await sdk.signReceiverAddress({
        linkKey,
        receiverAddress
      })
      expect(
        await sdk.checkReceiverSignature({
          linkId: new ethers.Wallet(linkKey).address,
          receiverAddress,
          receiverSignature
        })
      ).to.be.true
    })
  })

  describe('checkBalanceAvailable', () => {
    it('should fail with asset not provided', async () => {
      try {
        await sdk.checkBalanceAvailable({
          asset: undefined,
          amount: '1',
          address: 'bnb' + '0'.repeat(20)
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `asset`')
      }
    })
    it('should fail with amount not provided', async () => {
      try {
        await sdk.checkBalanceAvailable({
          asset: 'BNB',
          amount: null,
          address: 'bnb' + '0'.repeat(20)
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `amount`')
      }
    })
    it('should fail with address not provided', async () => {
      try {
        await sdk.checkBalanceAvailable({
          asset: 'BNB',
          amount: 1,
          address: undefined
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `address`')
      }
    })
  })

  describe('checkLinkParams', () => {
    it('should fail with asset not provided', async () => {
      try {
        await sdk.checkLinkParams({
          asset: undefined,
          amount: 1,
          linkId: ethers.Wallet.createRandom().address,
          verifierAddress: ethers.Wallet.createRandom().address,
          verifierSignature: '0x' + '0'.repeat(64),
          receiverAddress: ethers.Wallet.createRandom().address,
          receiverSignature: '0x' + '0'.repeat(64),
          senderAddress: ethers.Wallet.createRandom().address
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `asset`')
      }
    })
    it('should fail with amount not provided', async () => {
      try {
        await sdk.checkLinkParams({
          asset: 'BNB',
          amount: undefined,
          linkId: ethers.Wallet.createRandom().address,
          verifierAddress: ethers.Wallet.createRandom().address,
          verifierSignature: '0x' + '0'.repeat(64),
          receiverAddress: ethers.Wallet.createRandom().address,
          receiverSignature: '0x' + '0'.repeat(64),
          senderAddress: ethers.Wallet.createRandom().address
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `amount`')
      }
    })
    it('should fail with link id not provided', async () => {
      try {
        await sdk.checkLinkParams({
          asset: 'BNB',
          amount: 1,
          linkId: undefined,
          verifierAddress: ethers.Wallet.createRandom().address,
          verifierSignature: '0x' + '0'.repeat(64),
          receiverAddress: ethers.Wallet.createRandom().address,
          receiverSignature: '0x' + '0'.repeat(64),
          senderAddress: ethers.Wallet.createRandom().address
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `linkId`')
      }
    })
    it('should fail with verifier address not provided', async () => {
      try {
        await sdk.checkLinkParams({
          asset: 'BNB',
          amount: 1,
          linkId: ethers.Wallet.createRandom().address,
          verifierAddress: undefined,
          verifierSignature: '0x' + '0'.repeat(64),
          receiverAddress: ethers.Wallet.createRandom().address,
          receiverSignature: '0x' + '0'.repeat(64),
          senderAddress: ethers.Wallet.createRandom().address
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `verifierAddress`')
      }
    })
    it('should fail with verifier signature not provided', async () => {
      try {
        await sdk.checkLinkParams({
          asset: 'BNB',
          amount: 1,
          linkId: ethers.Wallet.createRandom().address,
          verifierAddress: ethers.Wallet.createRandom().address,
          verifierSignature: undefined,
          receiverAddress: ethers.Wallet.createRandom().address,
          receiverSignature: '0x' + '0'.repeat(64),
          senderAddress: ethers.Wallet.createRandom().address
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `verifierSignature`')
      }
    })
    it('should fail with receiver address not provided', async () => {
      try {
        await sdk.checkLinkParams({
          asset: 'BNB',
          amount: 1,
          linkId: ethers.Wallet.createRandom().address,
          verifierAddress: ethers.Wallet.createRandom().address,
          verifierSignature: '0x' + '0'.repeat(64),
          receiverAddress: undefined,
          receiverSignature: '0x' + '0'.repeat(64),
          senderAddress: ethers.Wallet.createRandom().address
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `receiverAddress`')
      }
    })
    it('should fail with receiver signature not provided', async () => {
      try {
        await sdk.checkLinkParams({
          asset: 'BNB',
          amount: 1,
          linkId: ethers.Wallet.createRandom().address,
          verifierAddress: ethers.Wallet.createRandom().address,
          verifierSignature: '0x' + '0'.repeat(64),
          receiverAddress: ethers.Wallet.createRandom().address,
          receiverSignature: undefined,
          senderAddress: ethers.Wallet.createRandom().address
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `receiverSignature`')
      }
    })
    it('should fail with sender address not provided', async () => {
      try {
        await sdk.checkLinkParams({
          asset: 'BNB',
          amount: 1,
          linkId: ethers.Wallet.createRandom().address,
          verifierAddress: ethers.Wallet.createRandom().address,
          verifierSignature: '0x' + '0'.repeat(64),
          receiverAddress: ethers.Wallet.createRandom().address,
          receiverSignature: '0x' + '0'.repeat(64),
          senderAddress: undefined
        })
      } catch (err) {
        expect(err.message).to.equal('Please provide `senderAddress`')
      }
    })
  })
})
