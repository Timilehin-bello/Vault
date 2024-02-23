// import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { expect } from "chai";
// import { ethers } from "hardhat";

// describe("Vault Contract", function () {
//   // Fixture to deploy the contract
//   async function deployVaultFixture() {
//     const Vault = await ethers.getContractFactory("Vault");
//     const vault = await Vault.deploy();

//     // Accounts setup
//     const [owner, donor, beneficiary] = await ethers.getSigners();

//     return { vault, owner, donor, beneficiary };
//   }

//   it("Should allow a donor to add a grant", async function () {
//     const { vault, donor, beneficiary } = await loadFixture(deployVaultFixture);

//     const depositAmount = ethers.parseEther("1.0"); // 1 Ether
//     const currentTime = await time.latest();
//     const releaseTime = currentTime + time.duration.days(1); // 1 day from now

//     await expect(
//       vault
//         .connect(donor).addGrant(beneficiary.address, releaseTime, { value: depositAmount })
//     )
//       .to.emit(vault, "GrantAdded")
//       .withArgs(donor.address, beneficiary.address, depositAmount, releaseTime);
//   });

//   it("Should allow the beneficiary to claim the grant after the release time", async function () {
//     const { vault, donor, beneficiary } = await loadFixture(deployVaultFixture);

//     const depositAmount = ethers.parseEther("1.0"); // 1 Ether
//     const currentTime = await time.latest();
//     const releaseTime = currentTime + time.duration.days(1); // 1 day from now

//     await vault.connect(donor).addGrant(beneficiary.address, releaseTime, { value: depositAmount });

//     // Increase the blockchain time to after the release time
//     await time.increaseTo(releaseTime + 1);

//     await expect(() =>
//       vault.connect(beneficiary).claimGrant()
//     ).to.changeEtherBalances(
//       [vault, beneficiary],
//       [depositAmount * -1, depositAmount]
//     );
//   });

//   it("Should not allow the beneficiary to claim the grant before the release time", async function () {
//     const { vault, donor, beneficiary } = await loadFixture(deployVaultFixture);

//     const depositAmount = ethers.utils.parseEther("0.5"); // 0.5 Ether
//     const currentTime = await time.latest();
//     const releaseTime = currentTime + time.duration.days(1); // 1 day from now

//     await vault
//       .connect(donor)
//       .addGrant(beneficiary.address, releaseTime, { value: depositAmount });

//     // Attempt to claim before the release time
//     await expect(vault.connect(beneficiary).claimGrant()).to.be.revertedWith(
//       "Grant is not yet releasable"
//     );
//   });
// });
