import Validator from "@lib/utils/validator";
import { PRVIDSTR, PTOKEN_ID } from "@lib/core";
import {sleep} from "@lib/module/Account/account.utils";

async function loopGetUnspentCoinsV3() {
    let coins = null
    while (true) {
        await sleep(500);
        const _coinsScan = await this.getStorageCoinsScan();
        if (_coinsScan[PTOKEN_ID]) {
            coins = _coinsScan
            break;
        }
    }
    return coins
}

async function getUnspentCoinsV3(params) {
    let unspentCoins = []
    try {
        const { version, tokenID, isNFT = false } = params;
        new Validator(`getUnspentCoinsV3-tokenID`, tokenID).required().string();
        new Validator(`getUnspentCoinsV3-version`, version).required().number();
        new Validator(`getUnspentCoinsV3-isNFT`, isNFT).boolean();

        let coinsScan = await this.getStorageCoinsScan();
        if (!coinsScan) return []
        if (!coinsScan[PTOKEN_ID]) {
            coinsScan = await this.loopGetUnspentCoinsV3();
        }
        // get PRV coins
        if (tokenID === PRVIDSTR && coinsScan[PRVIDSTR] && coinsScan[PRVIDSTR]?.unspentCoins) {
            unspentCoins = coinsScan[PRVIDSTR]?.unspentCoins || []
        }
        // get PTOKEN coins
        if (tokenID !== PRVIDSTR && coinsScan[PTOKEN_ID] && coinsScan[PTOKEN_ID]?.unspentCoins) {
            const tokenCoins = coinsScan[PTOKEN_ID]?.unspentCoins || [];
            unspentCoins = tokenCoins
                .filter(({ TokenID: _tokenID }) =>
                    _tokenID.toLowerCase() === tokenID.toLowerCase()
                );
        }
    } catch (error) {
        console.log("GET UNSPENT COINS V3 FAILED", error);
        throw error;
    }
    return unspentCoins;
}

export default {
    getUnspentCoinsV3,
    loopGetUnspentCoinsV3,
}