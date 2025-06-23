// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract ArchiToken is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    function initialize() public initializer {
        __ERC20_init("ArchiDAO Token", "ARCHI");
        __Ownable_init();
        __UUPSUpgradeable_init();
        // Başlangıçta mint edilmiyor, ileride mint fonksiyonu eklenebilir.
    }
    
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
    
    // İleride mint fonksiyonu eklenebilir
} 