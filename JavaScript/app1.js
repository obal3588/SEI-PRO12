






$(document).ready(function () {
    /*Initialized parameters*/

    let counter = 0; //counter up to 9 times.used for tie condation 
    let start = false; // start game condation  
    let player = "player X" //player x is first one 
    let playerValue = true; //binery condation  True is X false is O
    let grid = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]

    let ceil0 =$('.row0 #ceil0');
    let ceil1 =$('.row0 #ceil1');
    let ceil2 =$('.row0 #ceil2');
    let ceil3 =$('.row1 #ceil0');
    let ceil4 =$('.row1 #ceil1');
    let ceil5 =$('.row1 #ceil2');
    let ceil6 =$('.row2 #ceil0');
    let ceil7 =$('.row2 #ceil1');
    let ceil8 =$('.row2 #ceil2');

    console.log(ceil8);
    
    
 
    const click_handler = function () {
        if (!start)
            return

        const cul = this.id.match(/\d+/g);
        const temp = $(this).parent();
        const row = temp[0].className.match(/\d+/g);

        //swich between player and update the grid  & counter 
        if (playerValue) {
            $(this).append("X");
            $(this).addClass("X");
            grid[row][cul] = "X";
            player = "player O"
            counter++;

            playerValue=false;
        }
        else {
            $(this).append("O");
            playerValue = true;
            $(this).addClass("O");
            grid[row][cul] = "O";
            player = "player X"
            counter++;
        }


        // debugger;

        //check Win it eather return -1 or 
        const check = whoWin();
        //tie condation 
        if (counter >= 9 && check == -1) {
            $("footer").append("<b><br>Tie</b>")
            alert("Tie!!");
        }

        //update the player text 
        $(".player p").text(player);
        //stop Event listener for this obj
        $(this).unbind();
    }

//whoWin stop the game and show who win  or  return -1
    const whoWin = function () {

        if (
            $(ceil0).hasClass("X") &&$(ceil1).hasClass("X")&&$(ceil2).hasClass("X")||
            $(ceil3).hasClass("X") &&$(ceil4).hasClass("X")&&$(ceil5).hasClass("X")||
            $(ceil6).hasClass("X") &&$(ceil1).hasClass("X")&&$(ceil2).hasClass("X")||
            $(ceil0).hasClass("X") &&$(ceil1).hasClass("X")&&$(ceil2).hasClass("X")||
            $(ceil0).hasClass("X") &&$(ceil1).hasClass("X")&&$(ceil2).hasClass("X")||
            $(ceil0).hasClass("X") &&$(ceil1).hasClass("X")&&$(ceil2).hasClass("X")||
            $(ceil0).hasClass("X") &&$(ceil1).hasClass("X")&&$(ceil2).hasClass("X")||
            $(ceil0).hasClass("X") &&$(ceil1).hasClass("X")&&$(ceil2).hasClass("X")
            )
    }

    
    const startHandler = function () {

        start = true;
        $('aside').append("<b>Start</b>");
        $(".player p").text(player);
        $(this).unbind();
    }
    const resetHandler = function () {
        // reload the page 

      //  window.location.reload();
    //   $("#theForm")[0].reset();
     
      
    }



    $("td").click(click_handler);
    $("#start").click(startHandler);
    $("#reset").click(resetHandler);

});











/*
my references
allEqual
    https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal


    extractColumn
    https://gist.github.com/eddieajau/5f3e289967de60cf7bf9

    */




