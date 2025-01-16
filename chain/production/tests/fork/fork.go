// chain/production/tests/fork/fork.go
package fork

import (
	"log"
	"runtime/debug"

	"github.com/incognitochain/incognito-chain/blockchain/types"
	"github.com/incognitochain/incognito-chain/common"
	"github.com/incognitochain/incognito-chain/multiview"
)

// forkAction represents the action that occurs during a fork
type forkAction struct {
	delayTS   uint64
	multiView *multiview.MultiView
}

// forkMap is a global map storing fork actions based on unique IDs
var forkMap = make(map[string]*forkAction)

// ForkBeaconWithInstruction processes a fork instruction for a beacon block
func ForkBeaconWithInstruction(id string, mv *multiview.MultiView, instType string, newBlock *types.BeaconBlock, delayTS uint64) int {
	defer recoverPanic()

	// Log the incoming parameters for debugging
	log.Printf("[DEBUG] ForkBeaconWithInstruction called: ID=%s, instType=%s, delayTS=%d", id, instType, delayTS)

	// Dereference multiView to call methods on the actual object
	blk := (*mv).GetBestView().GetBlock()
	finalBlk := (*mv).GetFinalView().GetBlock()

	// Log the block instructions for debugging
	instruction := blk.GetInstructions()
	log.Printf("[DEBUG] Block instructions: %+v", instruction)

	// Process the fork instructions
	for _, v := range instruction {
		if v[0] == instType {
			fa := forkMap[id]

			// If no fork action exists for this ID, create a new one
			if fa == nil {
				fa = &forkAction{
					delayTS:   delayTS,
					multiView: mv,
				}
				forkMap[id] = fa
				log.Printf("[INFO] Created new fork action for ID=%s", id)
			}

			// Calculate the current delay in time slots
			currentDelayTs := (uint64(newBlock.GetProposeTime()) - uint64(finalBlk.GetProposeTime())) / common.TIMESLOT
			log.Printf("[DEBUG] Current delay: %d, Fork delay: %d", currentDelayTs, fa.delayTS)

			// Handle the fork logic based on delay times
			if currentDelayTs < fa.delayTS {
				log.Println("[INFO] Simulating fork with delay")
				return 0 // Simulate fork within the fork window
			}
			if currentDelayTs == fa.delayTS {
				log.Println("[INFO] Fork condition met, clearing branch")
				// Assert the concrete type of multiView and call ClearBranch
				if mvConcrete, ok := (*fa.multiView).(*multiview.ConcreteMultiViewType); ok {
					mvConcrete.ClearBranch() // Now you're calling the method on the concrete type
				} else {
					log.Println("[ERROR] Failed to assert multiView to concrete type")
				}
				return 1 // Simulate fork and clear branch
			}

			// If delay exceeds, do nothing
			log.Println("[INFO] No fork, delay exceeded")
			return -1
		}
	}

	// If no instruction matches, return -1
	log.Println("[INFO] No matching instruction found for fork")
	return -1
}

// recoverPanic is a utility function to recover from panics and log stack traces
func recoverPanic() {
	if r := recover(); r != nil {
		log.Printf("[PANIC] Recovered from panic: %v", r)
		log.Printf("[PANIC] Stack trace: %s", string(debug.Stack()))
	}
}
