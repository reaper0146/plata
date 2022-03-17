pragma solidity >0.4.99 <0.7.0;

import "./Ownable.sol";

contract Market is Ownable {
    // Custom types
    struct Article {
        uint id;
        address payable seller;
        address buyer;
        string name;
        string description;
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
    string description;
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
        uint256 _price,
        string _hashvalue,
        address[] _ACL);
    
    event LogCheckAccess(
        string accessTxt
    );



    // kill the smart contract
    function kill() public onlyOwner {
        selfdestruct(owner);
    }

    // sell an article
    function sellArticle(string memory _name, string memory _description, uint256 _price, string memory _hashvalue) public {
        // a new article
        articleCounter++;
        //ACL.push(msg.sender);
        //address[] memory _ACL = new address[];
        //ACL.push(msg.sender);
       // _ACL.push(msg.sender);



        // store this article
        articles[articleCounter] = Article(
            articleCounter,
            msg.sender,
            address(0),
            _name,
            _description,
            _price,
            _hashvalue,
           ACL
        );


        // trigger the event
        emit LogSellArticle(articleCounter, msg.sender, _name, _price, _hashvalue);//, ACL);
    }

    // buy an article
    function buyArticle(uint _id) public payable {

        // we check whether there is at least one article
        require(articleCounter > 0, "There should be at least one article");

        // we check whether the article exists
        require(_id > 0 && _id <= articleCounter, "Article with this id does not exist");

        // we retrieve the article
        Article storage article = articles[_id];

        article.ACL.push(msg.sender);

        // we check whether the article has not already been sold
        //require(article.buyer == address(0), "Article was already sold");

        // we don't allow the seller to buy his/her own article
        require(article.seller != msg.sender, "Seller cannot buy his own article");

        // we check whether the value sent corresponds to the article price
        require(article.price == msg.value, "Value provided does not match price of article");

        // keep buyer's information
        article.buyer = msg.sender;

        // the buyer can buy the article
        article.seller.transfer(msg.value);



       // emit GiveHash()
        // trigger the event
        emit LogBuyArticle(_id, article.seller, article.buyer, article.name, article.price, article.hashvalue, article.ACL);

    }

    // fetch the number of articles in the contract


    function getNumberOfArticles() public view returns (uint) {
        return articleCounter;
    }

    // fetch and returns all article IDs available for sale
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
            // keep only the ID for the article not already sold
            //if (articles[i].buyer == address(0)) {
                articleIds[numberOfArticlesForSale] = articles[i].id;
                numberOfArticlesForSale++;
            //}
        }

        // copy the articleIds array into the smaller forSale array
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
            emit LogBuyArticle(_id, article.seller, article.buyer, article.name, article.price, article.hashvalue, article.ACL);
        } else {
            emit LogCheckAccess("Need to purchase first");
        }
        
    }


}
