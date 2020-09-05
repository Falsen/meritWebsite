var _data = null;

$(document).ready(function(){
    var rawdata = {
        "tillfalle":"Urval1",
        "vy":"Antagningspoang",
        "antagningsomgang":"HT2020",
        "larosateId":"",
        "utbildningstyp":"p",
        "fritextFilter":"",
        "urvalsGrupp":"",
        "firstResult":0,
        "maxResults":25000,
        "sorteringsKolumn":1,
        "sorteringsOrdningDesc":false,
        "requestNumber":1,
        "paginate":true
    }
    var data = encodeURIComponent(JSON.stringify(rawdata));

    var schools = [];

    $.get("https://cors-anywhere.herokuapp.com/statistik.uhr.se/rest/stats/tableData?request="+data, function(data){
        var output = data.aaData.filter(x => x[5] == 'BI').map(function(entry){
            var school = entry[4];
            if(schools.indexOf(school) < 0){
                schools.push(school)
            }
            return [entry[2], entry[6], entry[4]];
        });

        schools.forEach(function(school){
            $('#universities').append('<option value="' + school + '">' + school + '</option>')
        });

        _data = {
            schools: schools,
            data: output
        }
        console.log(output, output.length);
        console.log(schools);
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var x = 0, y = 0;

            function search( ){
                //Intializing the arrays
                let antagnaProgram = [ ];
                let obehorigaProgram = [ ];
                
        
                //deleting old results
                for( var i = 0; i < x; i++ ){
                    document.getElementById( "myTable" ).deleteRow( 0 );
                }

                 //deleting old results
                 for( var i = 0; i < y; i++ ){
                    document.getElementById( "myTable2" ).deleteRow( 0 );

                }

                //Inserting the first row of antagnaprogam
                var row = document.getElementById( "myTable" ).insertRow( 0 );
                var cell1 = row.insertCell( 0 );
                var cell2 = row.insertCell( 1 );
                var cell3 = row.insertCell( 2 );

                cell1.innerHTML = "Program";
                cell2.innerHTML = "Antagningspoäng";
                cell3.innerHTML = "universitet/Högskolan";

                cell1.setAttribute( 'class','first' ); 
                cell2.setAttribute( 'class','first' ); 
                cell3.setAttribute( 'class','first' ); 

                //Inserting the first row of obehrigaprogram
                var row = document.getElementById( "myTable2" ).insertRow(0);
                var cell1 = row.insertCell( 0 );
                var cell2 = row.insertCell( 1 );
                var cell3 = row.insertCell( 2 );

                cell1.innerHTML = "Program";
                cell2.innerHTML = "Antagningspoäng";
                cell3.innerHTML = "universitet/Högskolan";

                cell1.setAttribute( 'class','first2' ); 
                cell2.setAttribute( 'class','first2' ); 
                cell3.setAttribute( 'class','first2' ); 
                
            //getting the merit value
            var merit = document.getElementById( "studentsMerit" ).value;

            if ( merit == "" ) {
                  alert( "empty" );
              } else {

                if( merit <= 22.5 ){
                        
                    document.getElementById( "demo" ).innerHTML = "";

                    //All universites or chosen one
                    ChosenUniversity = document.getElementById( "universities" ).value;
                    console.log( ChosenUniversity );

                    for(var i=0;i<_data.data.length;i++){
                        var entry = _data.data[i];

                        if(ChosenUniversity == "alla" || ChosenUniversity == entry[2] ){
                            if ( merit >= entry [ 1 ] ) {
                                antagnaProgram.push(entry);
                            }else {
                                obehorigaProgram.push(entry)
                            }
                        }  
                    }

                } else {
                    alert( "Please enter a suitable number" );
                    document.getElementById( 'demo' ).innerHTML = " ";
                }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                
                


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //write the number of univeristies
                document.getElementById( "number" ).innerHTML = antagnaProgram.length + " program behöriga <br><br>";
                document.getElementById( "numberO" ).innerHTML = obehorigaProgram.length + " program obehöriga<br><br>";

                //change 0 to *
                for ( var i = 0; i < antagnaProgram.length; i++ ) {
                   
                    if( antagnaProgram[ i ][ 1 ] == 0 ){
                        antagnaProgram[ i ][ 1 ] = "*";
                    }

                    
                }

                //change -1 to -
                for ( var i = 0; i < antagnaProgram.length; i++ ) {
                   
                    if( antagnaProgram[ i ][ 1 ] == -1 ){
                        antagnaProgram[ i ][ 1 ] = "-";
                    }

                    
                }


                //Showing the result list
                for ( var i = 0; i < antagnaProgram.length; i++ ) {
                    var row = document.getElementById( "myTable" ).insertRow(1);
                    var cell1 = row.insertCell( 0 );
                    var cell2 = row.insertCell( 1 );
                    var cell3 = row.insertCell( 2 );

                    cell1.innerHTML = antagnaProgram[ i ][ 0 ];
                    cell2.innerHTML = antagnaProgram[ i ][ 1 ];
                    cell3.innerHTML = antagnaProgram[ i ][ 2 ];



                }

                //ObehrigaProgram
                for ( var i = 0; i < obehorigaProgram.length; i++ ) {
                    var row = document.getElementById( "myTable2" ).insertRow(1);
                    var cell1 = row.insertCell( 0 );
                    var cell2 = row.insertCell( 1 );
                    var cell3 = row.insertCell( 2 );

                    cell1.innerHTML = obehorigaProgram[ i ][ 0 ];
                    cell2.innerHTML = obehorigaProgram[ i ][ 1 ];
                    cell3.innerHTML = obehorigaProgram[ i ][ 2 ];
                }

                //myTable rows
                x = document.getElementById( "myTable" ).rows.length;
                console.log( x + " is the number of rows in myTable" );

                //myTable2 rows
                y = document.getElementById( "myTable2" ).rows.length;
                console.log( y + " is the number of rows in myTable2" );
                

                
                
            }



        }
    
    

        //Högskolan i Kalmar hade inga program i 2020
        //Högskolan på Gotland hade inga program i 2020
        //Malmö Högskola hade inga program i 2020
        //Teologiska högskolan Stockholm hade inga program i 2020
        //Jönköping univeristy == Högskolan i Jönköping 
        //Universitets och högskolerådet hade inga program i 2020
        //Vaxjö universitet hade inga program i 2020

