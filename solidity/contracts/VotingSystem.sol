// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract VotingSystem {
    // Struct to hold candidate details
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Struct to hold voter details
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint vote;
    }

    address public admin;
    bool public votingOpen;

    // Mapping to store all candidates (id => Candidate)
    mapping(uint => Candidate) public candidates;

    // Mapping to store voter details (address => Voter)
    mapping(address => Voter) public voters;

    // Number of candidates
    uint public candidatesCount;

    // Events to log actions
    event CandidateAdded(uint candidateId, string candidateName);
    event Voted(address voter, uint candidateId);
    event VotingStarted();
    event VotingEnded();

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this.");
        _;
    }

    modifier onlyWhenVotingOpen() {
        require(votingOpen, "Voting is not open yet.");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(
            voters[msg.sender].isRegistered,
            "You are not a registered voter."
        );
        _;
    }

    constructor() {
        admin = msg.sender;
        votingOpen = false;
    }

    // Function to add a candidate (only by admin)
    function addCandidate(string memory _name) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        emit CandidateAdded(candidatesCount, _name);
    }

    // Function to register a voter (only by admin)
    function registerVoter(address _voter) public onlyAdmin {
        require(!voters[_voter].isRegistered, "Voter is already registered.");
        voters[_voter].isRegistered = true;
        voters[_voter].hasVoted = false;
    }

    // Function to start voting (only by admin)
    function startVoting() public onlyAdmin {
        require(!votingOpen, "Voting is already open.");
        votingOpen = true;
        emit VotingStarted();
    }

    // Function to end voting (only by admin)
    function endVoting() public onlyAdmin {
        require(votingOpen, "Voting is not open.");
        votingOpen = false;
        emit VotingEnded();
    }

    // Function for a registered voter to vote
    function vote(
        uint _candidateId
    ) public onlyWhenVotingOpen onlyRegisteredVoter {
        require(!voters[msg.sender].hasVoted, "You have already voted.");
        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Invalid candidate ID."
        );

        // Record that voter has voted
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].vote = _candidateId;

        // Update candidate vote count
        candidates[_candidateId].voteCount++;

        emit Voted(msg.sender, _candidateId);
    }

    // Function to get the total votes a candidate has received
    function getCandidateVotes(uint _candidateId) public view returns (uint) {
        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Invalid candidate ID."
        );
        return candidates[_candidateId].voteCount;
    }

    // Function to get the winner of the election (based on most votes)
    function getWinner() public view returns (string memory winnerName) {
        uint winningVoteCount = 0;
        uint winningCandidateId = 0;

        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winningCandidateId = i;
            }
        }

        winnerName = candidates[winningCandidateId].name;
    }
}
