
App = {

    web3Provider: null,
    contracts: {},
    account: 0X0,
    loading: false,

    init: async () => {
        return App.initWeb3();
    },

    initWeb3: async () => {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                App.displayAccountInfo();
                return App.initContract();
                
            } catch(error) {
                //user denied access
                console.error("Unable to retrieve your accounts! You have to approve this application on Metamask");
            }
        } else if(window.web3) {
            window.web3 = new Web3(web3.currentProvider || "ws://localhost:8545");
            App.displayAccountInfo();
            return App.initContract();
        } else {
            //no dapp browser
            console.log("Non-ethereum browser detected. You should consider trying Metamask");
        }
    },

    displayAccountInfo: async () => {
        const accounts = await window.web3.eth.getAccounts();
        App.account = accounts[0];
        $('#account').text(App.account);
        const balance = await window.web3.eth.getBalance(App.account);
        $('#accountBalance').text(window.web3.utils.fromWei(balance, "ether") + " ETH");
        //$('#modal-purchase').attr("hidden",true);
       
    },

    initContract: async () => {
        $.getJSON('Market.json', artifact => {
            App.contracts.Market = TruffleContract(artifact);
            App.contracts.Market.setProvider(window.web3.currentProvider);
            App.listenToEvents();
            return App.reloadArticles();
        });
    },

    // Listen to events raised from the contract
    listenToEvents: async () => {
        const marketInstance = await App.contracts.Market.deployed();
        if(App.logSellArticleEventListener == null) {
            App.logSellArticleEventListener = marketInstance.LogSellArticle({fromBlock: '0'}).on("data", event => {
                    $('#' + event.id).remove();
                    $('#events').append('<li class="list-group-item" id="' + event.id + '">' + event.returnValues._name + ' is for sale</li>');
                    App.reloadArticles();
                })
                .on("error", error => {
                    console.error(error);
                });
        }
        if(App.logBuyArticleEventListener == null) {
            App.logBuyArticleEventListener = marketInstance.LogBuyArticle({fromBlock: '0'}).on("data", event => {
                    $('#' + event.id).remove();
                    $('#events').append('<li class="list-group-item" id="' + event.id + '">' + event.returnValues._buyer + ' bought ' + event.returnValues._name + '</li>' );


                   // $('#modal-bg2').modal('show');
                    //$('#modal-purchase').attr("hidden",false);
                    //$('#purchaselink').text(event.returnValues._hashvalue)
                    


                    App.reloadArticles();
                })
                .on("error", error => {
                    console.error(error);
                });
        }

        $('.btn-subscribe').hide();
        $('.btn-unsubscribe').show();
        $('.btn-show-events').show();
    },

    

    stopListeningToEvents: async () => {
        if(App.logSellArticleEventListener != null) {
            console.log("unsubscribe from sell events");
            await App.logSellArticleEventListener.removeAllListeners();
            App.logSellArticleEventListener = null;
        }
        if(App.logBuyArticleEventListener != null) {
            console.log("unsubscribe from buy events");
            await App.logBuyArticleEventListener.removeAllListeners();
            App.logBuyArticleEventListener = null;
        }

        $('#events')[0].className = "list-group-collapse";

        $('.btn-subscribe').show();
        $('.btn-unsubscribe').hide();
        $('.btn-show-events').hide();
    },

    sellArticle: async () => {
        const articlePriceValue = parseFloat($('#article_price').val());
        const articlePrice = isNaN(articlePriceValue) ? "0" : articlePriceValue.toString();
        const _name = $('#article_name').val();
        const _description = $('#article_description').val();
        const _price = window.web3.utils.toWei(articlePrice, "ether");
        const _hashvalue = $('#hashvalue').text();
        console.log(_hashvalue)
        

        if(_name.trim() == "" || _price === "0") {
            return false;
        }
        try {
            const marketInstance = await App.contracts.Market.deployed();
        //    console.log(value123);
            const transactionReceipt = await marketInstance.sellArticle(
                _name,
                _description,
                _price,
                _hashvalue,
                {from: App.account, gas: 5000000}
            ).on("transactionHash", hash => {
                console.log("transaction hash", hash);
                $('#modal-loading').attr('hidden', false)
                App.blurBackground();


              //  $('#animation-area').style.filter.blur(2px);
                //App.logBuyArticleEventListener = marketInstance.LogBuyArticle({fromBlock: '0'}).on("data", event => {
                    
            //    })
            });
            console.log("transaction receipt" + transactionReceipt);
            $('#modal-loading').attr('hidden', true);
            $('#modal-submission').attr('hidden', false);
            App.blurBackground();



        } catch(error) {
            console.error(error);
            $('#modal-loading').attr('hidden', true);
            $('#modal-error').attr('hidden', false);
            App.blurBackground();




        }
    },

    buyArticle: async () => {
        event.preventDefault();

        // retrieve the article price
        var _articleId = $(event.target).data('id');
        const articlePriceValue = parseFloat($(event.target).data('value'));
        const articlePrice = isNaN(articlePriceValue) ? "0" : articlePriceValue.toString();
        const _price = window.web3.utils.toWei(articlePrice, "ether");
        

        
        
        try {
            const marketInstance = await App.contracts.Market.deployed();
            
           // const articleIds = await marketInstance.getArticlesForSale();
            const transactionReceipt = await marketInstance.buyArticle(
                _articleId, {
                    from: App.account,
                    value: _price,
                    gas: 500000
                }
            ).on("transactionHash", hash => {
                console.log("transaction hash", hash);

                var number = 0;
                marketInstance.LogSellArticle({fromBlock: "0"}).on("data", async function(event) {
                number++;    
              //  console.log(number);
                //console.log(_articleId);
                if (number == _articleId){
                    console.log('https://ipfs.infura.io/ipfs/' + event.returnValues._hashvalue);
                    console.log(event.returnValues._name);
                    console.log(event.returnValues._seller);
                    $('#purchaselink').text('https://ipfs.infura.io/ipfs/' + event.returnValues._hashvalue);
                    $('#modal-loading').attr('hidden', false);
                    App.blurBackground();

                } else {
                    return
                }});


                
            });
                
                

            /*    App.logBuyArticleEventListener = marketInstance.LogBuyArticle({fromBlock: "0" }).on("data", event => {
                
               console.log(_articleId);
               console.log(event.returnValues);
               

               

                });

            /*    console.log('https://ipfs.infura.io/ipfs/' + event.returnValues._hashvalue);
               console.log(event.returnValues._name);
               console.log(event.returnValues._seller); */
                
            
            console.log("transaction receipt", transactionReceipt);
            $('#modal-loading').attr('hidden', true);
            $('#modal-receipt').attr('hidden', false);
            App.blurBackground();



            


            

// FOLLOWING CODE OPENS WINDOW (IN WORKS)


        /*    print = () => {
                let popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
                popupWin.document.open();
                popupWin.document.write(`
                  <html>
                    <head>
                      <title>Here is your passcode</title>
                     </head>
                <body>test</body>
                  </html>`
                );
                popupWin.document.close();
            }
            function openOther(){
              //I called Api using service
               let scope=this;
               setTimeout(function() { scope.print(); }, 3000);
            }
            openOther();
*/
        //   App.logBuyArticleEventListener = marketInstance.LogBuyArticle({fromBlock: '0'}).on("data", event => {
        //  console.log('https://ipfs.infura.io/ipfs/' + event.returnValues._hashvalue);
       // })
           // console.log(marketInstance.Article.hashvalue);
        } catch(error) {
            console.error(error);
            $('#modal-loading').attr('hidden', true);
            $('#modal-error').attr('hidden', false);
            App.blurBackground();
          
        }
    },



    reloadArticles: async () => {
        // avoid reentry
        if (App.loading) {
            return;
        }
        App.loading = true;

        // refresh account information because the balance may have changed
        App.displayAccountInfo();

        try {
            const marketInstance = await App.contracts.Market.deployed();
            const articleIds = await marketInstance.getArticlesForSale();
            $('#articlesRow').empty();
            for(let i = 0; i < articleIds.length; i++) {
                const article = await marketInstance.articles(articleIds[i]);
                App.displayArticle(article[0], article[1], article[3], article[4], article[5]);
            }
            App.loading = false;
        } catch(error) {
            console.error(error);
            App.loading = false;
        }
    },

    displayArticle: (id, seller, name, description, price) => {
        // Retrieve the article placeholder
        const articlesRow = $('#articlesRow');
        const etherPrice = web3.utils.fromWei(price, "ether");

        // Retrieve and fill the article template
        var articleTemplate = $('#articleTemplate');
        articleTemplate.find('.panel-title').text(" " + name);
        articleTemplate.find('.article-description').text(description);
        articleTemplate.find('.article-price').text(etherPrice);
        articleTemplate.find('.btn-buy').attr('data-id', id);
        articleTemplate.find('.btn-buy').attr('data-value', etherPrice);

        // seller?
        if (seller == App.account) {
            articleTemplate.find('.article-seller').text("You");
            articleTemplate.find('.btn-buy').hide();
        } else {
            articleTemplate.find('.article-seller').text(seller);
            articleTemplate.find('.btn-buy').show();
        }

        // add this new article
        articlesRow.append(articleTemplate.html());
    },

    CloseReceipt: async () => {
        $('#modal-receipt').attr('hidden', true);
        console.log('hello');
        App.unblurBackground();


    },

    CloseSubmission: async () => {
        $('#modal-submission').attr('hidden', true);
        console.log('closed submission');
        App.unblurBackground();


    },


    CloseWindow: async () => {
        $('#modal-loading').attr('hidden', true);
        console.log('hello');
        App.unblurBackground();


    },



    CloseError: async () => {
        $('#modal-error').attr('hidden', true);
        console.log('hello');
        App.unblurBackground();


    },

    blurBackground: async () => {
        var background = document.getElementById("animation-area");
        background.setAttribute("style", "filter: brightness(.4);");
    },

    unblurBackground: async () => {
        var background = document.getElementById("animation-area");
        background.setAttribute("style", "filter: brightness(1);");
    },
    
};




$(function () {
    $(window).load(function () {
        App.init();
    });
});
