$(document).ready(function() {
    // Set onClick event handler with 'Get Pokemon' button 
    $('#get-pokemon-button').on('click', function() {
        $(this).hide();
        var string = "";

        string += "<table class='table'>";
        // Set table column headings
        string += "<tr><th scope='col'>Sprite</th><th scope='col'>Name</th><th scope='col'>Button</th><th scope='col'>Moves</th><th scope='col'>Abilities</th><th scope='col'>Type</th></tr>";


        var promises = []
        for (let i = 1; i < 41; i++)
        {
            //Make Ajax GET request for first 20 pokemon
            promises.push($.get('https://pokeapi.co/api/v2/pokemon/'+i, function(data, status) {
                    
            }));  
        }

        // Wait for all the request to complete before filling the table
        Promise.all(promises).then((values) => {
            $(values).each(function(index, pokemon) {
                //Start Pokemon entry
                string += "<tr>";
                //Add image
                string += "<td><img src='"+pokemon.sprites.front_default+"'></td>";
                //Add name
                string += "<td>"+pokemon.name+"</td>";
                //Add button
                string += "<td><button class='details-button btn btn-primary'>Details</button></td>";

                // Moves table
                string += "<td style='display:none'><table class='move-table details table'>"

                for (var i = 0; i < pokemon.moves.length; i++)
                {
                    // Add moves
                    string += "<tr><td>"+pokemon.moves[i].move.name+"</td></tr>";
                }
                
                // Moves table end
                string += "</table></td>";

                // Abilities table
                string += "<td style='display:none'><table class='ability-table details table'>"

                for (var i = 0; i < pokemon.abilities.length; i++)
                {
                    // Add ability
                    string += "<tr><td>"+pokemon.abilities[i].ability.name+"</td></tr>";
                }
                
                // Abilities table end
                string += "</table></td>";

                // Types table
                string += "<td style='display:none'><table class='type-table details table'>"

                for (var i = 0; i < pokemon.types.length; i++)
                {
                    // Add types
                    string += "<tr><td>"+pokemon.types[i].type.name+"</td></tr>";
                }
                
                // Types table end
                string += "</table></td>";

                //End Pokemon entry
                string += "</tr>";
            });

            string += "</table>";
            
            $('#poke-list').html(string)

            $('.details-button').on('click', function() {

                $(this).parent().nextAll().toggle();


            });
            
            
        });

        
        
        
    
        
        
    });

    


});