// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// This is the contract for a basic token system
contract Token {
    // Token Name
    string public name;
    // The symbol of the token
    string public symbol;
    // The number of decimals used for the token
    uint8 public decimals;
    // The total supply of the token
    uint256 public totalSupply;
    // The balance of each address
    mapping(address => uint256) public balanceOf;

    // The constructor function is called when the contract is deployed
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _totalSupply) {        
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = _totalSupply;
    }

    // Token transfer
    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value && _value > 0, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
    }
}
