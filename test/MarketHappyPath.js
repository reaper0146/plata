const Market = artifacts.require("Market");

 // test suite
contract("Market", accounts => {
    let marketInstance;
    const articlePrice = 10;
    const articleName = "article 1";
    const articleDescription = "Description for article 1";
    const seller = accounts[0];

    before('setup contract for each test', async () => {
        marketInstance = await Market.deployed();
    });

    it("should let us sell a first article", async () => {
        const price = web3.utils.toWei(parseFloat(articlePrice).toString(), "ether");
        await marketInstance.sellArticle(
            articleName,
            articleDescription,
            price,
            {from: seller});
        const article = await marketInstance.getArticlesForSale();
        assert.equal(article._seller, seller, "seller must be " + seller);
        assert.equal(article._name, articleName, "article name must be " + articleName);
        assert.equal(article._description, articleDescription, "description must be " + articleDescription);
        assert.equal(article._price.toString(), price, "article price must be " + price, "wei");
    });

    it("should emit an event when a new article is sold", async () => {
        const receipt = await marketInstance.sellArticle(
        articleName,
        articleDescription,
        web3.utils.toWei(parseFloat(articlePrice).toString(), "ether"),
        { from: seller }
        );
        
        assert.equal(receipt.logs.length, 1, "one event should have been triggered");
        assert.equal(receipt.logs[0].event, "LogSellArticle", "event should be LogSellArticle");
        assert.equal(receipt.logs[0].args._seller, seller, "event seller must be " + seller);
        assert.equal(receipt.logs[0].args._name, articleName, "event article name must be " + articleName);
        assert.equal(web3.utils.fromWei(receipt.logs[0].args._price, "ether"),articlePrice,"event article price must be " + articlePrice);
    });

})