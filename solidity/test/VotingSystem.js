const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VotingSystem", function () {
  let VotingSystem;
  let votingSystem;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    VotingSystem = await ethers.getContractFactory("VotingSystem");
    [owner, addr1, addr2] = await ethers.getSigners();
    votingSystem = await VotingSystem.deploy();
    await votingSystem.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await votingSystem.admin()).to.equal(owner.address);
    });

    it("Should start with voting closed", async function () {
      expect(await votingSystem.votingOpen()).to.equal(false);
    });
  });

  describe("Candidate Management", function () {
    it("Should allow admin to add a candidate", async function () {
      await votingSystem.addCandidate("Candidate 1");
      expect(await votingSystem.candidatesCount()).to.equal(1);
    });

    it("Should not allow non-admin to add a candidate", async function () {
      await expect(
        votingSystem.connect(addr1).addCandidate("Candidate 2")
      ).to.be.revertedWith("Only admin can call this.");
    });
  });

  describe("Voter Registration", function () {
    it("Should allow admin to register a voter", async function () {
      await votingSystem.registerVoter(addr1.address);
      const voter = await votingSystem.voters(addr1.address);
      expect(voter.isRegistered).to.equal(true);
    });

    it("Should not allow registering the same voter twice", async function () {
      await votingSystem.registerVoter(addr1.address);
      await expect(
        votingSystem.registerVoter(addr1.address)
      ).to.be.revertedWith("Voter is already registered.");
    });
  });

  describe("Voting Process", function () {
    beforeEach(async function () {
      await votingSystem.addCandidate("Candidate 1");
      await votingSystem.addCandidate("Candidate 2");
      await votingSystem.registerVoter(addr1.address);
      await votingSystem.startVoting();
    });

    it("Should allow registered voter to vote", async function () {
      await votingSystem.connect(addr1).vote(1);
      expect(await votingSystem.getCandidateVotes(1)).to.equal(1);
    });

    it("Should not allow voting when voting is closed", async function () {
      await votingSystem.endVoting();
      await expect(votingSystem.connect(addr1).vote(1)).to.be.revertedWith(
        "Voting is not open yet."
      );
    });

    it("Should not allow voting for non-existent candidate", async function () {
      await expect(votingSystem.connect(addr1).vote(3)).to.be.revertedWith(
        "Invalid candidate ID."
      );
    });

    it("Should not allow voting twice", async function () {
      await votingSystem.connect(addr1).vote(1);
      await expect(votingSystem.connect(addr1).vote(2)).to.be.revertedWith(
        "You have already voted."
      );
    });
  });

  describe("Results", function () {
    beforeEach(async function () {
      await votingSystem.addCandidate("Candidate 1");
      await votingSystem.addCandidate("Candidate 2");
      await votingSystem.registerVoter(addr1.address);
      await votingSystem.registerVoter(addr2.address);
      await votingSystem.startVoting();
    });

    it("Should correctly determine the winner", async function () {
      await votingSystem.connect(addr1).vote(1);
      await votingSystem.connect(addr2).vote(1);
      expect(await votingSystem.getWinner()).to.equal("Candidate 1");
    });
  });
});
