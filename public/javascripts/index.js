const columnAnnotation = {
   1: "A",
   2: "B",
   3: "C",
   4: "D",
   5: "E",
   6: "F",
   7: "G",
   8: "H"
}
let rad = document.myForm.fav_color;
let table = document.getElementById("chess-table");

for(let i=0; i<rad.length; i++) {
   rad[i].addEventListener('change', function() {
      table.innerHTML = renderChessboard(this.value);
  });
}

function renderChessboard(pov) {
   // i=num, j=letter
   let chessboard = "";
  if(pov === "WHITE"){
   for(let i = 7; i >= 0; i--){
      let row = `<tr>`;
      for(let j = 0; j < 8; j++) {
         let column = columnAnnotation[(j + 1).toString()] + (i + 1).toString();
         let cell = `<td class="cell" id="${column}"><span class="prefix">${column}</span></td>`;
         row += cell;
      }
      chessboard += "\n" +  row + "</tr>";
   }
  } else {
     for (let i = 0; i < 8; i++) {
        let row = "<tr>";
       for (let j = 7; j >= 0; j--) {
          let column = columnAnnotation[(j + 1).toString()] + (i + 1).toString();
          let cell = `<td class="cell" id="${column}"><span class="prefix">${column}</span></td>`;
          row += cell;
       }
       chessboard += "\n" +  row + "</tr>";
     }
  }
  return  chessboard;
}

function putPieces(fen) {
   if(fen === "start") {
      fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
   }

   let row = 1;
   let column = 1;
   for(let i = 0; i < fen.length; i++) {
      let c = fen.charAt(i);
      if(c === "/") {
         row++;
         column = 1;
      }
      if(c === " ") break; //End of FEN Position part.
      if(!isNaN(c)) {
         column += (+c);
         continue;
      }
      let color = (c.toLowerCase() === c) ? "black" : "white";
      let unicode = chessPieces[c];
      let square = columnAnnotation[column].toString() + (9-row).toString();

      let sq = document.getElementById(square);
      sq.lastChild.innerHTML = unicode;
      sq.lastChild.classList.add(`piece-color-${color}`);
      column++;
   }
}