
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { network } from "hardhat";

describe("ProductAuthentication", async function () {
    const { viem } = await network.connect();

    const productId =
        "0x1111111111111111111111111111111111111111111111111111111111111111";

    const metadataHash =
        "0x2222222222222222222222222222222222222222222222222222222222222222";

    it("Should register a genuine product", async function () {
        const product = await viem.deployContract(
            "ProductAuthentication"
        );

        await product.write.registerProduct([
            productId,
            "Samsung Galaxy S25",
            "Samsung Electronics",
            "BATCH001",
            metadataHash
        ]);

        const result = await product.read.verifyProduct([
            productId
        ]);

        assert.equal(result, true);
    });

    it("Should return false for an unknown product", async function () {
        const product = await viem.deployContract(
            "ProductAuthentication"
        );

        const unknownId =
            "0x3333333333333333333333333333333333333333333333333333333333333333";

        const result = await product.read.verifyProduct([
            unknownId
        ]);

        assert.equal(result, false);
    });

    it("Should reject duplicate product registration", async function () {
        const product = await viem.deployContract(
            "ProductAuthentication"
        );

        await product.write.registerProduct([
            productId,
            "Samsung Galaxy S25",
            "Samsung Electronics",
            "BATCH001",
            metadataHash
        ]);

        await assert.rejects(async () => {
            await product.write.registerProduct([
                productId,
                "Samsung Galaxy S25",
                "Samsung Electronics",
                "BATCH002",
                metadataHash
            ]);
        });
    });
});
