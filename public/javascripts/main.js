//generate the deck of poke
//deck is the deck of pole
var deck=[];
//deckpoint is which poke is going tobe distributed
var deckpoint=0;
//computercardpoint include the poke point in computer's hand
var computercardpoint=[];
//playercardpoint include the poke point in player's hand
var playercardpoint=[];
var playercardid=0;
var computercardid=0;

var generatedeck=function(toparray){
    //take the input all are as diamond,h(heart),s(spade),c(club),d(diamond)
    var cdeck=[];
    console.log("length"+toparray.length);
    //transfor J,Q,K,A into 11,12,13,1
    for(var i=0;i<toparray.length;i++){
        if(toparray[i]=='J'){
            toparray[i]=11;
        }else if(toparray[i]=='Q'){
            toparray[i]=12;
        }else if(toparray[i]=='K'){
            toparray[i]=13;
        }else if(toparray[i]=='A'){
            toparray[i]=1;
        }
    }
    //all changed to diamond
    for(var i=0;i<toparray.length;i++){
        toparray[i] = toparray[i]+'d';
    }
    var color=['h','s','c','d'];
    for(j=0;j<color.length;j++){
        //console.log(item);
        item = color[j];
        console.log(item);
        for(var i=1;i<=13;i++){
            citem = i+item;
            var push=1;
            for(var k=0;k<toparray.length;k++){
                if(toparray[k]==citem){
                    push=0;
                }
            }
            if(push == 0){
                console.log(citem+' is already in toparray');
            }else{
                cdeck.push(citem);
            }
        }
    }
    var newcdeck = cdeck.sort(function() {
            return Math.random() - 0.5
        });

    for(i=0;i<toparray.length;i++){
        deck[i]=toparray[i];
    }
    for(i=0;i<cdeck.length;i++){
        deck.push(cdeck[i]);
    }

    return deck;
};

//change data into value
calculatevalue=function(num){
    var value='';
  if(num.length>=3){
      value=10;
  } else{
      value=num.slice(0,1);
  }
  return value;
};

//calculate the total value
calculatetotalvalue=function(arr){
    var total=0;
    var acesnum=0;
    var cnum=0;
    var possibletotal=[];
    var cbestnum=0;
    for(var i =0;i<arr.length;i++){
        //remember to change to int
        cnum=parseInt(calculatevalue(deck[arr[i]]));
        if(cnum == 1){
            acesnum=acesnum+1;
        }else{
            total = total+cnum;
        }
    }
    console.log("total: "+total+"acesnum: "+ acesnum);
    if ( acesnum == 0){
        if(total > 21){
            //-1 means > 21
            return total;
        }else{
            return total;
        }
    }else{
        for(var j =0;j<=acesnum;j++){
            possibletotal.push(total+j*11+(acesnum-j)*1);
        }
        cbestnum=possibletotal[0];
        if(cbestnum > 21){
            return cbestnum;
        }
        for(var k =0;k<possibletotal.length;k++){
            if(possibletotal[k] <= 21){
                cbestnum=possibletotal[k];
            }else{
                break;
            }
        }
        return cbestnum;
    }
};

//calculate the class os the card
calculateclass=function(num){
    var cardclass;
    if(num.length>=3){
        console.log('3');
        console.log(num.slice(2));
        cardclass = num.slice(2);
    } else{
        console.log('2');
        console.log(num.slice(1));
        cardclass = num.slice(1);
    }
    return cardclass;
};

//get the inner html
switchcass=function(numclass,num){
    switch(numclass){
        case 'h':
            return "<span>"+num+"&hearts;</span>";
        case 's':
            return "<span>"+num+"&spades;</span>";
        case 'd':
            return "<span>"+num+"&diams;</span>";
        case 'c':
            return "<span>"+num+"&clubs;</span>";
    }
};

changebacktodisplay=function(num){
    var originnum;
    if(num.length>=3){
        if(num.slice(0,2)==13){
            originnum='K';
        }else if(num.slice(0,2)==12){
            originnum='Q';
        }else if(num.slice(0,2)==11){
            originnum='J';
        }else if(num.slice(0,2)==10){
            originnum='10';
        }
    } else{
        //console.log('2')
       if(num.slice(0,1) == 1){
           originnum='A';
       }else {
           originnum = num.slice(0,1);
       }
    }
    console.log("originnum:   "+originnum);
    return originnum;
};


var main=function(){
    console.log('after the page is loaded');
    var subbutton=document.querySelector("form .playBtn");
    subbutton.addEventListener("click",(evt)=>{
        evt.preventDefault();
        console.log('game begin!');
        var input = document.getElementById("startValues").value;
        console.log(input);
        if(input==''){
            arrayinput=[];
        }else{
            arrayinput = input.split(',');
        }
       // arrayinput = input.split(',');
        console.log(arrayinput);
        document.querySelector(".start").classList.add("removeform");

        //here genrate the deck of the poke, deck is the suit of poke
        var deck = generatedeck(arrayinput);
        deckpoint=4;
        computercardpoint=[0,2];
        playercardpoint=[1,3];
        console.log(deck);

        var gamearea=document.querySelector(".game");
            var gamediv = document.createElement("div");
                var computerdiv = document.createElement("div");
                computerdiv.id="computerarea";
                var playerdiv = document.createElement("div");
                playerdiv.id="playarea";
                    var computerheader = document.createElement("div");
                    computerheader.classList.add("cheader");
                        var computerheaderh3 = document.createElement("h3");
                        var computerheadertext = document.createTextNode("Computer Hand - Total:?");
                        computerheaderh3.appendChild(computerheadertext);
                    computerheader.appendChild(computerheaderh3);

                    var computerbody = document.createElement("div");
                    computerbody.classList.add("cbody");
                            var computercard1 = document.createElement("div");
                            computercard1.classList.add("computercard1");

                            var computercard2 = document.createElement("div");
                            computercard2.classList.add("normalcard");
                            computercard2.setAttribute("style", "left: 15%;");

                            var cardclass = calculateclass(deck[2]);
                            var dispalynum=changebacktodisplay(deck[2]);
                            var computercard2upleft=document.createElement("div");
                            console.log("displaynum:   "+dispalynum);
                            var ihtml = switchcass(cardclass,dispalynum);
                            computercard2upleft.innerHTML=ihtml;
                            computercard2upleft.classList.add("upperleft");
                            computercard2upleft.classList.add(cardclass);

                            var computercard2downright=document.createElement("div");
                            computercard2downright.innerHTML=ihtml;
                            computercard2downright.classList.add("downright");
                            computercard2downright.classList.add(cardclass);

                            computercard2.appendChild(computercard2upleft);
                            computercard2.appendChild(computercard2downright);


                    computerbody.appendChild(computercard1);
                    computerbody.appendChild(computercard2);

                    var playerheader = document.createElement("div");
                    playerheader.classList.add("pheader");
                    var playerheaderh3 = document.createElement("h3");
                    var tval = calculatetotalvalue(playercardpoint);
                    console.log("player card:  "+playercardpoint);
                    var playerheadertext = document.createTextNode("Player Hand - Total:"+tval);
                    playerheaderh3.appendChild(playerheadertext);
                    playerheader.appendChild(playerheaderh3);


                        var playerbody = document.createElement("div");
                        playerbody.classList.add("pbody");
                            var playercard1 = document.createElement("div");
                            playercard1.classList.add("normalcard");
                            playercard1.setAttribute("style", "left:"+0+"%");
                            cardclass = calculateclass(deck[1]);
                            dispalynum=changebacktodisplay(deck[1]);
                            var playercard1upleft=document.createElement("div");
                            ihtml = switchcass(cardclass,dispalynum);
                            playercard1upleft.innerHTML=ihtml;
                            playercard1upleft.classList.add("upperleft");
                            playercard1upleft.classList.add(cardclass);
                            var playercard1downright=document.createElement("div");
                            playercard1downright.innerHTML=ihtml;
                            playercard1downright.classList.add("downright");
                            playercard1downright.classList.add(cardclass);

                            playercard1.appendChild(playercard1upleft);
                            playercard1.appendChild(playercard1downright);


                            var playercard2 = document.createElement("div");
                            playercard2.classList.add("normalcard");
                            playercard2.setAttribute("style", "left:"+15+"%");
                            cardclass = calculateclass(deck[3]);
                            dispalynum=changebacktodisplay(deck[3]);
                            var playercard2upleft=document.createElement("div");
                            ihtml = switchcass(cardclass,dispalynum);
                            playercard2upleft.innerHTML=ihtml;
                            playercard2upleft.classList.add("upperleft");
                            playercard2upleft.classList.add(cardclass);
                            var playercard2downright=document.createElement("div");
                            playercard2downright.innerHTML=ihtml;
                            playercard2downright.classList.add("downright");
                            playercard2downright.classList.add(cardclass);
                            playercard2.appendChild(playercard2upleft);
                            playercard2.appendChild(playercard2downright);

                        playerbody.appendChild(playercard1);
                        playerbody.appendChild(playercard2);

                        var playerbottom = document.createElement("div");
                        playerbottom.classList.add("pbottom");
                        var playerbutton1 = document.createElement("button");
                        playerbutton1.classList.add("bottombutton1");
                        var playerbutton1text = document.createTextNode("Hit");
                        playerbutton1.appendChild(playerbutton1text);
                        playerbottom.appendChild(playerbutton1);

                        var playerbutton2 = document.createElement("button");
                        playerbutton2.classList.add("bottombutton2");
                        var playerbutton2text = document.createTextNode("Stand");
                        playerbutton2.appendChild(playerbutton2text);
                        playerbottom.appendChild(playerbutton2);

                playerdiv.appendChild(playerheader);
                playerdiv.appendChild(playerbody);
                playerdiv.appendChild(playerbottom);

                computerdiv.appendChild(computerheader);
                computerdiv.appendChild(computerbody);
                //computerdiv.insertBefore(computerheader,computerbody)
                //computerdiv.appendChild(computerheader);

            gamediv.appendChild(computerdiv);
            gamediv.appendChild(playerdiv);

        gamearea.appendChild(gamediv);

        playerbutton1.onclick=addplayercard;

        playerbutton2.onclick=stopadd;
        playercardid=2;
        computercardid=2;


    });
};

addplayercard=function(evt){
    evt.preventDefault();
    console.log("hit");

    console.log("playercardid:   "+playercardid);
    console.log("deckpoint:  "+deckpoint);
    playercardpoint.push(deckpoint);

    var playerarea=document.getElementById("playarea");
    var playerbodyarea=document.querySelector("div .pbody");
        var playercard = document.createElement("div");
        playercard.classList.add("normalcard");
        playercard.setAttribute("style", "left:"+15*playercardid+"%");
        cardclass = calculateclass(deck[deckpoint]);
        dispalynum=changebacktodisplay(deck[deckpoint]);
        var playercardupleft=document.createElement("div");
        ihtml = switchcass(cardclass,dispalynum);
        playercardupleft.innerHTML=ihtml;
        playercardupleft.classList.add("upperleft");
        playercardupleft.classList.add(cardclass);
        var playercarddownright=document.createElement("div");
        playercarddownright.innerHTML=ihtml;
        playercarddownright.classList.add("downright");
        playercarddownright.classList.add(cardclass);
        playercard.appendChild(playercardupleft);
        playercard.appendChild(playercarddownright);
    playerbodyarea.appendChild(playercard);

    var playerheaderarea=document.querySelector("div .pheader");
   // playerheaderarea.classList.add("removeform");

    var playerheader = document.createElement("div");
    playerheader.classList.add("pheader");
    var playerheaderh3 = document.createElement("h3");
    var tval = calculatetotalvalue(playercardpoint);
    var playerheadertext = document.createTextNode("Player Hand - Total:"+tval);
    playerheaderh3.appendChild(playerheadertext);
    playerheader.appendChild(playerheaderh3);
    playerarea.replaceChild(playerheader,playerheaderarea);

    if(tval > 21){
        console.log("player card:  "+playercardpoint);
        var playerbottomarea=document.querySelector("div .pbottom");
        var playerbottombutton1=document.querySelector("div .pbottom .bottombutton1");
        var playerbottombutton2=document.querySelector("div .pbottom .bottombutton2");
        playerbottombutton1.classList.add("removeform");
        playerbottombutton2.classList.add("removeform");
        var playerbust=document.createElement("div");
        playerbust.classList.add("playerbust");
        var playerbusth3 = document.createElement("h3");
        var playerbusttext = document.createTextNode("Player Lost(Bust!)");
        playerbusth3.appendChild(playerbusttext);
        playerbust.appendChild(playerbusth3);
        playerbottomarea.appendChild(playerbust);

        var cbodyarea=document.querySelector("div .cbody");
        var ccard1=document.querySelector("div .computercard1");
        var lastcomputercard1 = document.createElement("div");
        lastcomputercard1.classList.add("normalcard");
        lastcomputercard1.setAttribute("style", "left:"+0+"%");
        cardclass = calculateclass(deck[0]);
        dispalynum=changebacktodisplay(deck[0]);
        var lastcomputercard1upleft=document.createElement("div");
        ihtml = switchcass(cardclass,dispalynum);
        lastcomputercard1upleft.innerHTML=ihtml;
        lastcomputercard1upleft.classList.add("upperleft");
        lastcomputercard1upleft.classList.add(cardclass);
        var lastcomputercard1downright=document.createElement("div");
        lastcomputercard1downright.innerHTML=ihtml;
        lastcomputercard1downright.classList.add("downright");
        lastcomputercard1downright.classList.add(cardclass);
        lastcomputercard1.appendChild(lastcomputercard1upleft);
        lastcomputercard1.appendChild(lastcomputercard1downright);
        cbodyarea.replaceChild(lastcomputercard1,ccard1);

        var mycomputerarea=document.getElementById("computerarea");
        var coriginheaderarea=document.querySelector("div .cheader");
        var cheaderarea = document.createElement("div");
        cheaderarea.classList.add("cheader");
        var cheaderh3 = document.createElement("h3");
        var tval = calculatetotalvalue(computercardpoint);
        var cheadertext = document.createTextNode("Computer Hand - Total:"+tval);
        cheaderh3.appendChild(cheadertext);
        cheaderarea.appendChild(cheaderh3);
        mycomputerarea.replaceChild(cheaderarea,coriginheaderarea);
    }else{
        console.log("player card:  "+playercardpoint);
        playercardid=playercardid+1;
        deckpoint=deckpoint+1;
    }
};
stopadd=function(evt){
    evt.preventDefault();
    console.log("Stand");
    var playerbottombutton1=document.querySelector("div .pbottom .bottombutton1");
    var playerbottombutton2=document.querySelector("div .pbottom .bottombutton2");
    playerbottombutton1.classList.add("removeform");
    playerbottombutton2.classList.add("removeform");

    // show the first card of computer
    var cbodyarea=document.querySelector("div .cbody");
    var ccard1=document.querySelector("div .computercard1");
    var lastcomputercard1 = document.createElement("div");
    lastcomputercard1.classList.add("normalcard");
    lastcomputercard1.setAttribute("style", "left:"+0+"%");
    cardclass = calculateclass(deck[0]);
    dispalynum=changebacktodisplay(deck[0]);
    var lastcomputercard1upleft=document.createElement("div");
    ihtml = switchcass(cardclass,dispalynum);
    lastcomputercard1upleft.innerHTML=ihtml;
    lastcomputercard1upleft.classList.add("upperleft");
    lastcomputercard1upleft.classList.add(cardclass);
    var lastcomputercard1downright=document.createElement("div");
    lastcomputercard1downright.innerHTML=ihtml;
    lastcomputercard1downright.classList.add("downright");
    lastcomputercard1downright.classList.add(cardclass);
    lastcomputercard1.appendChild(lastcomputercard1upleft);
    lastcomputercard1.appendChild(lastcomputercard1downright);
    cbodyarea.replaceChild(lastcomputercard1,ccard1);

    var mycomputerarea=document.getElementById("computerarea");
    var coriginheaderarea=document.querySelector("div .cheader");
    var cheaderarea = document.createElement("div");
    cheaderarea.classList.add("cheader");
    var cheaderh3 = document.createElement("h3");
    var tval = calculatetotalvalue(computercardpoint);
    var cheadertext = document.createTextNode("Computer Hand - Total:"+tval);
    cheaderh3.appendChild(cheadertext);
    cheaderarea.appendChild(cheaderh3);
    mycomputerarea.replaceChild(cheaderarea,coriginheaderarea);

    var playertval = calculatetotalvalue(playercardpoint);
    var computertval = calculatetotalvalue(computercardpoint);
    //when less than 18 computer would get hit
    while(computertval < 18){

        computercardpoint.push(deckpoint);
        var cnewcard = document.createElement("div");
        cnewcard.classList.add("normalcard");
        cnewcard.setAttribute("style", "left:"+computercardid*15+"%");
        cardclass = calculateclass(deck[deckpoint]);
        dispalynum=changebacktodisplay(deck[deckpoint]);
        var cnewcardupleft=document.createElement("div");
        ihtml = switchcass(cardclass,dispalynum);
        cnewcardupleft.innerHTML=ihtml;
        cnewcardupleft.classList.add("upperleft");
        cnewcardupleft.classList.add(cardclass);
        var cnewcarddownright=document.createElement("div");
        cnewcarddownright.innerHTML=ihtml;
        cnewcarddownright.classList.add("downright");
        cnewcarddownright.classList.add(cardclass);
        cnewcard.appendChild(cnewcardupleft);
        cnewcard.appendChild(cnewcarddownright);
        cbodyarea.appendChild(cnewcard);


        mycomputerarea=document.getElementById("computerarea");
        coriginheaderarea=document.querySelector("div .cheader");
        cheaderarea = document.createElement("div");
        cheaderarea.classList.add("cheader");
        cheaderh3 = document.createElement("h3");
        computertval = calculatetotalvalue(computercardpoint);
        cheadertext = document.createTextNode("Computer Hand - Total:"+computertval);
        cheaderh3.appendChild(cheadertext);
        cheaderarea.appendChild(cheaderh3);
        mycomputerarea.replaceChild(cheaderarea,coriginheaderarea);

        computercardid=computercardid+1;
        deckpoint=deckpoint+1;
    }
    if(computertval > 21){
        var playerbottomarea=document.querySelector("div .pbottom");
        var playerbust=document.createElement("div");
        playerbust.classList.add("playerbust");
        var playerbusth3 = document.createElement("h3");
        var playerbusttext = document.createTextNode("Computer Lost(Bust)! Player Win!");
        playerbusth3.appendChild(playerbusttext);
        playerbust.appendChild(playerbusth3);
        playerbottomarea.appendChild(playerbust);
    }else{
        if(computertval>playertval){
            var playerbottomarea=document.querySelector("div .pbottom");
            var playerbust=document.createElement("div");
            playerbust.classList.add("playerbust");
            var playerbusth3 = document.createElement("h3");
            var playerbusttext = document.createTextNode("Player Lost!");
            playerbusth3.appendChild(playerbusttext);
            playerbust.appendChild(playerbusth3);
            playerbottomarea.appendChild(playerbust);

        }else if(computertval < playertval){
            var playerbottomarea=document.querySelector("div .pbottom");
            var playerbust=document.createElement("div");
            playerbust.classList.add("playerbust");
            var playerbusth3 = document.createElement("h3");
            var playerbusttext = document.createTextNode("Player Win!");
            playerbusth3.appendChild(playerbusttext);
            playerbust.appendChild(playerbusth3);
            playerbottomarea.appendChild(playerbust);

        }else{
            var playerbottomarea=document.querySelector("div .pbottom");
            var playerbust=document.createElement("div");
            playerbust.classList.add("playerbust");
            var playerbusth3 = document.createElement("h3");
            var playerbusttext = document.createTextNode("Equal!");
            playerbusth3.appendChild(playerbusttext);
            playerbust.appendChild(playerbusth3);
            playerbottomarea.appendChild(playerbust);
        }
    }
    playerbottomarea=document.querySelector("div .pbottom");
    var resultForm=document.createElement("form");
    resultForm.classList.add("resultForm");
    resultForm.name='result';
    resultForm.method='POST';
    resultForm.action='/result';

    var my_label1=document.createElement('label');
    my_label1.id='my_label1';
    my_label1.innerHTML="<b>Initials  </b>";

    var my_tb=document.createElement('INPUT');
    my_tb.type='TEXT';
    my_tb.id='Initials';
    my_tb.name='Initials';

    var my_tb2=document.createElement('INPUT');
    my_tb2.classList.add("haddeninput");
    my_tb2.id='computertval';
    my_tb2.name='computertval';
    my_tb2.value=computertval;

    var my_tb3=document.createElement('INPUT');
    my_tb3.classList.add("haddeninput");
    my_tb3.id='playertval';
    my_tb3.name='playertval';
    my_tb3.value=playertval;

    var my_tb4=document.createElement('INPUT');
    my_tb4.classList.add("my_tb2");
    my_tb4.id="my_tb4";
    my_tb4.type="submit";
    my_tb4.value="Submit";
    my_tb4.addEventListener("click",function(evt){
        evt.preventDefault();
        console.log('submit');
        var myInitials=document.getElementById("Initials").value;
        var mycomputertval=document.getElementById("computertval").value;
        var myplayertval=document.getElementById("playertval").value;
        var req = new XMLHttpRequest();
        var url= "http://localhost:3000/result";
        req.open('POST', url, true);
        req.onload = function() {
            if (req.status >= 200 && req.status < 400) {
                console.log(req.response);
                console.log('Success!!');
                document.getElementById("my_label1").classList.add("haddeninput");
                document.getElementById("Initials").classList.add("haddeninput");
                document.getElementById("my_tb4").classList.add("haddeninput");
                console.log(req.response.length);
                data = JSON.parse(req.responseText);
                console.log(data);
                console.log(data.length);
                console.log(data[0]);
                console.log(data[data.length-1]);
                playerbottomarea=document.querySelector("div .pbottom");
                var resulttable=document.createElement('table');
                resulttable.id='result-table';
                resulttable.innerHTML="<thead> <th>Initials</th> <th>Computer Score</th> <th>User Score</th> </thead> <tbody id=\"result-list\"> </tbody>";

                playerbottomarea.appendChild(resulttable);
                var html='';
                if(data.length>=5){
                    for(var k=data.length-5;k<data.length;k++){
                        html=html+"<tr> <td>"+data[k].userInitials+"</td> <td>"+data[k].computerScore+"</td> <td>"+data[k].userScore+"</td> </tr>";;
                    }
                }else{
                    for(var k=0;k<data.length;k++){
                        html=html+"<tr> <td>"+data[k].userInitials+"</td> <td>"+data[k].computerScore+"</td> <td>"+data[k].userScore+"</td> </tr>";;
                    }
                }

                var resultbodyarea=document.getElementById("result-list");
                resultbodyarea.innerHTML=html;

                var restartButton=document.createElement("button");
                restartButton.classList.add("restartbutton");
                var restartButtonText = document.createTextNode("Restart");
                restartButton.appendChild(restartButtonText);
                playerbottomarea.appendChild(restartButton);
                restartButton.onclick=reset;
            }
        };
        req.onerror = function() {
            console.log('error');
        };
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send("Initials="+myInitials+"&computertval="+mycomputertval+"&playertval="+myplayertval);
    });

    resultForm.appendChild(my_label1);
    resultForm.appendChild(my_tb);
    resultForm.appendChild(my_tb2);
    resultForm.appendChild(my_tb3);
    resultForm.appendChild(my_tb4);

    //resultForm.submit();
    playerbottomarea.appendChild(resultForm);


    /*playerbottomarea=document.querySelector("div .pbottom");
    var restartButton=document.createElement("button");
    restartButton.classList.add("restartbutton");
    var restartButtonText = document.createTextNode("Restart");
    restartButton.appendChild(restartButtonText);
    playerbottomarea.appendChild(restartButton);
    restartButton.onclick=reset;*/

};

var reset = function(){
    console.log('reload!');
    window.location.reload();
};
document.addEventListener('DOMContentLoaded', main);

