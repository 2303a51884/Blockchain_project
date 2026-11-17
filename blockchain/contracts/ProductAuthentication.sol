
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProductAuthentication {

    address public owner;
    uint256 public productCount;

    struct Product {
        string productName;
        string manufacturer;
        string batchNumber;
        bytes32 metadataHash;
        uint256 registeredAt;
        bool exists;
    }

    mapping(bytes32 => Product) private products;

    event ProductRegistered(
        bytes32 indexed productId,
        string productName,
        string manufacturer
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can register products");
        _;
    }

    function registerProduct(
        bytes32 productId,
        string memory productName,
        string memory manufacturer,
        string memory batchNumber,
        bytes32 metadataHash
    ) public onlyOwner {

        require(productId != bytes32(0), "Invalid product ID");
        require(!products[productId].exists, "Product already registered");
        require(bytes(productName).length > 0, "Product name required");
        require(bytes(manufacturer).length > 0, "Manufacturer required");

        products[productId] = Product({
            productName: productName,
            manufacturer: manufacturer,
            batchNumber: batchNumber,
            metadataHash: metadataHash,
            registeredAt: block.timestamp,
            exists: true
        });

        productCount++;

        emit ProductRegistered(
            productId,
            productName,
            manufacturer
        );
    }

    function verifyProduct(
        bytes32 productId
    ) public view returns (bool) {
        return products[productId].exists;
    }

    function getProduct(
        bytes32 productId
    ) public view returns (Product memory) {
        require(products[productId].exists, "Product not found");

        return products[productId];
    }
}
