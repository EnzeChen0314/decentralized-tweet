pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "hardhat/console.sol";

contract ERCTT is Ownable, ERC20 {

    constructor(uint256 judge_, uint256 spend_, uint256 n_, address from_) ERC20("ERCTT", "ERCTT") {
        _judge = judge_;
        _n = n_;
        _from = from_;
        _spend = spend_;
        _mint(_msgSender(), 200);
        _send_back = 0;
    }

    
    uint256 private _judge;
    address private _from;
    uint256 private _n;
    uint256 private _spend;
    uint256 _send_back;
    event tellaward(uint256 award);

    function publish1(address to) public virtual {
        require(balanceOf(_msgSender()) >= _spend, "Spend amount exceeds balance!");
        transfer(to, _spend);
    }
    

    function publish2(uint256 final_score) public virtual {
        uint256 final_judge = (2 * final_score > _n)? 1 : 0;
        
        if (final_judge == _judge) {
            _send_back = _spend - final_judge * _spend / final_score - (1 - final_judge) * _spend / (_n - final_score);
        }

        console.log(_send_back);
    }

    function publish3(address to) public virtual {
        transfer(to, _send_back);
    }

    function mint(uint256 amount) public onlyOwner {
        _mint(_msgSender(), amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
        
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }
}