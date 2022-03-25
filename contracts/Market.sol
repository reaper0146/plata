pragma solidity >0.4.99 <0.7.0;

import "./Ownable.sol";

contract Market is Ownable {
    // Custom types
    struct Article {
        uint id;
        address payable seller;
        address buyer;
        string name;
        string decryptkey;
        uint256 price;
        string hashvalue;
        address[] ACL;
    }

    // State variables
    mapping(uint => Article) public articles;
    uint articleCounter;
    address seller;
    address buyer;
    string name;
    string decryptkey;
    uint256 price;
    string hashvalue;
    address[] ACL;

    // Events
    event LogSellArticle (
        uint indexed _id,
        address indexed _seller,
        string _name,
        uint256 _price,
        string _hashvalue);

    event LogBuyArticle (
        uint indexed _id,
        address indexed _seller,
        address indexed _buyer,
        string _name,
        string _decryptkey,
        uint256 _price,
        string _hashvalue,
        address[] _ACL);

    event LogNoAccess(
        string accessTxt
    );



    // kill the smart contract
    function kill() public onlyOwner {
        selfdestruct(owner);
    }

    // sell an article
    function sellArticle(string memory _name, string memory _decryptkey, uint256 _price, string memory _hashvalue) public {
        // a new article
        articleCounter++;
       
        // store this article
        articles[articleCounter] = Article(
            articleCounter,
            msg.sender,
            address(0),
            _name,
            _decryptkey,
            _price,
            _hashvalue,
           ACL
        );


        // trigger the event
        emit LogSellArticle(articleCounter, msg.sender, _name, _price, _hashvalue);//, ACL);
    }

    // buy an article
    function buyArticle(uint _id) public payable {

        // check that there is at least one article
        require(articleCounter > 0, "There should be at least one article");

        // check that the article exists
        require(_id > 0 && _id <= articleCounter, "Article with this id does not exist");

        // retrieve the article
        Article storage article = articles[_id];

        //buyer is added to the ACL
        article.ACL.push(msg.sender);

        // the owner cannot buy their own article
        require(article.seller != msg.sender, "Seller cannot buy his own article");

        // check that the price received sent corresponds to the article price
        require(article.price == msg.value, "Value provided does not match price of article");

        // store buyer's information
        article.buyer = msg.sender;

        // transfer the price to the owner
        article.seller.transfer(msg.value);

        // trigger the event
        emit LogBuyArticle(_id, article.seller, article.buyer, article.name, article.decryptkey, article.price, article.hashvalue, article.ACL);

    }

    // fetch the number of articles in the contract
    function getNumberOfArticles() public view returns (uint) {
        return articleCounter;
    }

    // fetch and return all article IDs available for sale
    function getArticlesForSale() public view returns (uint[]memory) {
        // we check whether there is at least one article
        if(articleCounter == 0) {
            return new uint[](0);
        }

        // prepare output arrays
        uint[] memory articleIds = new uint[](articleCounter);

        uint numberOfArticlesForSale = 0;
        // iterate over articles
        for (uint i = 1; i <= articleCounter; i++) {
                articleIds[numberOfArticlesForSale] = articles[i].id;
                numberOfArticlesForSale++;
        }

        // copy the articleIds array into the another array to convert to form to sent to frontend
        uint[] memory forSale = new uint[](articleCounter);
        for (uint j = 0; j < articleCounter; j++) {
            forSale[j] = articleIds[j];
        }
        return forSale;
    }

    function checkAccess(uint _id) public {
        uint flag = 0;
        Article storage article = articles[_id];
        for (uint j = 0; j < article.ACL.length; j++) {
            if (article.ACL[j] == msg.sender) {
                flag = 2;
                break;
            } else {
                flag = 1;
            }
        }
        if (flag == 2) {
            emit LogBuyArticle(_id, article.seller, article.buyer, article.name, article.decryptkey, article.price, article.hashvalue, article.ACL);
        } else {
            emit LogNoAccess("Need to purchase first");
        }
        
    }


}