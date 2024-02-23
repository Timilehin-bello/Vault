// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Vault {
    struct Grant {
        address beneficiary;
        uint amount;
        uint releaseTime;
    }

    mapping(address => Grant) public grants;

    // Event declaration for logging activity
    event GrantAdded(address indexed donor, address indexed beneficiary, uint amount, uint releaseTime);
    event GrantClaimed(address indexed beneficiary, uint amount);

    // Function to deposit Ether into the vault and create a grant for the beneficiary
    function addGrant(address _beneficiary, uint _releaseTime) external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(_releaseTime > block.timestamp, "Release time must be in the future");

        // Create a new grant
        grants[msg.sender] = Grant({
            beneficiary: _beneficiary,
            amount: msg.value,
            releaseTime: _releaseTime
        });

        emit GrantAdded(msg.sender, _beneficiary, msg.value, _releaseTime);
    }

    // Function for the beneficiary to claim their grant
    function claimGrant() external {
        Grant storage grant = grants[msg.sender];

        require(grant.amount > 0, "No grant found for caller");
        require(block.timestamp >= grant.releaseTime, "Grant is not yet releasable");

        uint amount = grant.amount;
        // Reset the grant before transferring to prevent re-entrancy attacks
        grant.amount = 0;

        (bool sent, ) = grant.beneficiary.call{value: amount}("");
        require(sent, "Failed to send Ether");

        emit GrantClaimed(grant.beneficiary, amount);
    }

    // Function to check the details of a grant
    function getGrantDetails(address _donor) external view returns (Grant memory) {
        return grants[_donor];
    }
}
