pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MyERC20 is Ownable, ERC20 {

    constructor(uint256 judge_, uint256 spend_, uint256 n_) ERC20("MyERC20", "MyERC20") {
        _mint(_msgSender(), 10000);
        _judge = judge_;
        _award = spend_ / n_;
        _n = n_;
        _spend = spend_;
    }
    
    uint256 private _judge;
    uint256 private _award;
    uint256 private _n;
    uint256 private _spend;

    function mint(uint256 amount) public onlyOwner {
        _mint(_msgSender(), amount);
    }

        function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }
}