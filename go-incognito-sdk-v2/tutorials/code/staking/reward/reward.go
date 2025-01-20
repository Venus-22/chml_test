package main

import (
	"fmt"
	"log"

	"github.com/incognitochain/go-incognito-sdk-v2/incclient"
)

func main() {
	// Initialize the testnet client
	client, err := incclient.NewTestNet1Client()
	if err != nil {
		log.Fatalf("Error initializing client: %v", err)
	}

	// Define the private key and convert it to a payment address
	privateKey := "112t8rneWAhErTC8YUFTnfcKHvB1x6uAVdehy1S8GP2psgqDxK3RHouUcd69fz88oAL9XuMyQ8mBY5FmmGJdcyrpwXjWBXRpoWwgJXjsxi4j"
	rewardAddress := incclient.PrivateKeyToPaymentAddress(privateKey, -1)

	if rewardAddress == "" {
		log.Fatalf("Failed to derive payment address from the provided private key.")
	}

	// Pass all four arguments (privateKey, address, tokenID, version)
	tokenIDStr := "0"  // Specify token ID, if you are targeting PRV, this is the default
	version := int8(1) // Version 1 of withdrawal

	// Attempt to send the reward withdrawal transaction
	txHash, err := client.CreateAndSendWithDrawRewardTransaction(privateKey, rewardAddress, tokenIDStr, version)
	if err != nil {
		log.Fatalf("Error sending transaction: %v", err)
	}

	// Print out the transaction hash if successful
	fmt.Printf("Transaction successfully sent! Transaction Hash: %v\n", txHash)
}
