// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

contract ArchiDAO is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    struct Proposal {
        string ipfsHash;
        address proposer;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        address[] contributors;
    }

    IERC20Upgradeable public archiToken;
    Proposal[] public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string ipfsHash);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support);
    event Rewarded(uint256 indexed proposalId, address[] contributors, uint256 amount);

    function initialize(address _archiToken) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        archiToken = IERC20Upgradeable(_archiToken);
    }

    function createProposal(string memory ipfsHash, address[] memory contributors) external {
        proposals.push(Proposal({
            ipfsHash: ipfsHash,
            proposer: msg.sender,
            votesFor: 0,
            votesAgainst: 0,
            executed: false,
            contributors: contributors
        }));
        emit ProposalCreated(proposals.length - 1, msg.sender, ipfsHash);
    }

    function vote(uint256 proposalId, bool support) external {
        require(proposalId < proposals.length, "Invalid proposal");
        require(!hasVoted[proposalId][msg.sender], "Already voted");
        require(archiToken.balanceOf(msg.sender) > 0, "Must hold ARCHI token");
        hasVoted[proposalId][msg.sender] = true;
        if (support) {
            proposals[proposalId].votesFor++;
        } else {
            proposals[proposalId].votesAgainst++;
        }
        emit Voted(proposalId, msg.sender, support);
    }

    function rewardContributors(uint256 proposalId, uint256 amountPerContributor) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Already rewarded");
        require(proposal.votesFor > proposal.votesAgainst, "Proposal not accepted");
        proposal.executed = true;
        for (uint i = 0; i < proposal.contributors.length; i++) {
            archiToken.transfer(proposal.contributors[i], amountPerContributor);
        }
        emit Rewarded(proposalId, proposal.contributors, amountPerContributor);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
} 