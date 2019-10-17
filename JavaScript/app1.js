






$(document).ready(function () {
    /*Initialized parameters*/

    let counter = 0; //counter up to 9 times.used for tie condation 
    let start = false; // start game condation  
    let player = "Player X" //player x is first one 
    let playerValue = true; //binery condation 
    let grid = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]

    let oScore=0;
    let xScore=0;



  /**helper funcation  */
  const allEqual = arr => arr.every(v => v === arr[0])
  const extractColumn = function (arr, column) {
      return arr.map(x => x[column])
  }

  /***********************************/

    const columCheck = function (arr) {
        /*colum are equal*/
        if (allEqual(extractColumn(arr, 0)))
            return [arr[0][0], 0]
        else if (allEqual(extractColumn(arr, 1)))
            return [arr[0][1], 1]
        else if (allEqual(extractColumn(arr, 2)))
            return [arr[0][2], 2]

        return -1
    }
    const rowCheck = function (arr) {

        const temp = arr[1];
        /*row are */
        if (allEqual(arr[0]))
            return [arr[0][0], 0]
        else if (allEqual(temp))
            return [arr[1][0], 1]
        else if (allEqual(arr[2]))
            return [arr[2][0], 2]

        else
            return -1
    }
    const checkDiagonal = function (arr) {
        /*diagonal are equl */
        const diagonal1 = [arr[0][0], arr[1][1], arr[2][2]]
        const diagonal2 = [arr[0][2], arr[1][1], arr[2][0]]

        if (allEqual(diagonal1))
            return [arr[1][1], 1]

        else if (allEqual(diagonal2))
            return [arr[1][1],2]

        return -1
    }

    /******************************* */
      

    const result = function (arr) {
        //return -1 or change the color of the winner result and restern the winner 
        const resultRow = rowCheck(arr);
        const resultColum = columCheck(arr);
        const resultDiagonal = checkDiagonal(arr)
        
        if (resultRow != -1) {
            // debugger;
            const temp = resultRow[1]
            const rowClass = '.row' + temp;
            $(rowClass).css("background-color", "red")

            return ["colum", resultRow[0]];
        }

        else if (resultColum != -1) {

            const temp = resultColum[1]
            const columClass = ' #ceil' + temp;
            $(columClass).css("background-color", "red")

            return ["colum", resultColum[0]];
        }
        else if (resultDiagonal != -1) {
            //debugger;
            if (resultDiagonal[1] == 1) {
                $(".row0 #ceil0").css("background-color", "red");
                $(".row1 #ceil1").css("background-color", "red");
                $(".row2 #ceil2").css("background-color", "red");
            }
            else {

                $(".row0 #ceil2").css("background-color", "red");
                $(".row1 #ceil1").css("background-color", "red");
                $(".row2 #ceil0").css("background-color", "red");

            }
            return ["diagnal", resultDiagonal[0]]
        }
        else
            return -1
    }



/***********************************************************************/
/* click_handler will return if the value of start false.it will extract 
the colum and row valued to add it to grid .also call win fanction 



/********************************************************************** */


    const click_handler = function () {
        if (!start)
            return
        //get cul id and row class
        const cul = this.id.match(/\d+/g);
        const temp = $(this).parent();
        const row = temp[0].className.match(/\d+/g);

        //swich between player and update the grid  & counter 
        if (playerValue) {
            $(this).append("X");
            playerValue = false;
            grid[row][cul] = "X";
            player = "Player O"
            counter++;
        }
        else {
            $(this).append("O");
            playerValue = true;
            grid[row][cul] = "O";
            player = "Player X"
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
        $(".player1 p").text(player);
        //stop Event listener for this obj
        $(this).unbind();
    }

//whoWin stop the game and show who win  or  return -1
    const whoWin = function () {

        const finalResult = result(grid);
        if (finalResult == -1)
            return -1
        else {
            //debugger;
            //stop all Event listener
            $("td").unbind();
            start = false;
            //who wins  
            const temp = "<b>" + "<br>" + "player " + finalResult[1] + " is win!!" + "</b>";
            if ( finalResult[1]==="X"){
                xScore++;
               
            //    debugger;
             
               
                }
                else {
                //    debugger;
             
                oScore++;
                }
            $(".massageResult").append(temp);
            
            $('.o').attr("value",oScore);
            $('.x').attr("value", xScore);
        }
    }

const set_storage= async function(){
    localStorage.oScore=oScore;
    localStorage.xScore=xScore;

}
    const startHandler = function () {
        debugger
        start = true;
        $('aside').append("<b>Start</b>");
        $(".player1 p").text(player);
        $(this).unbind(); 
        oScore=   localStorage.oScore;
        xScore=localStorage.xScore;

    }
    
    const resetHandler = function () {
     debugger;
     set_storage().then(function() {
         debugger;
        window.location.reload(); 
     })
           
    }
    const newGame =function(){
       
        debugger;
  
        $(".massageResult").empty();
        $(".blocks").empty();
 
        $('tr').css("background-color","");
        $("td").css("background-color","");

        $(".player1 p").detach();
        $("b").detach();
         counter = 0; //counter up to 9 times.used for tie condation 
         start = false; // start game condation  
         player = "Player X" //player x is first one 
         playerValue = true; //binery condation 
         grid = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]

        //
        $("#start").click(startHandler);
    }
    $('.o').attr("value", localStorage.oScore);
    $('.x').attr("value",  localStorage.xScore);

    $("#start").click(startHandler);
    $("#newGame").click(newGame);
    $('#reset').click(resetHandler);
    $("td").click(click_handler);
    

});






/*
my references
allEqual
    https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal


    extractColumn
    https://gist.github.com/eddieajau/5f3e289967de60cf7bf9

    */




