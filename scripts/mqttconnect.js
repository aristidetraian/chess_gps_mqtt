//hide settings in mqttchess
function starthide() {

  var x = document.getElementById("settings");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  };
 

}

///timer settings
var P1seconds;
var P2seconds;
var increment;
var interval_p1;
var interval_p2;
var winner;
var loser;

$("body").bind('touchmove', function(e) {
  e.preventDefault();
})
/*
$(document).ready(function() {
  $("#modal").css("display", "block");
  $(".player").click(function() {
    $(".player").toggleClass("active");
  
  });
  var timeUpCheck = window.setInterval(function() {
    if (P1seconds == -1 || P2seconds == -1) {
      if (P1seconds == -1) {
        clearInterval(interval_p1);
        winner = "2";
        loser = "1";
      } else {
        clearInterval(interval_p2);
        winner = "1";
        loser = "2";
      }
      $("#"+winner).css("background-color", "DarkSeaGreen");
      $("#"+loser).css("background-color", "#ff4633");
      $("#gameOver").html("Player " + loser + " Loses!");
      $(".player").css("pointer-events", "none");
      $(".over_msg").fadeIn();
    }
  }, 1);
});
*/
function player1_moves() {
  P2seconds += increment; // Increment player 2's clock time
  $("#2").html(formatSec(P2seconds));
 // $("#1").css("pointer-events", "none"); // Allow clicking player 1's clock
 // $("#2").css("pointer-events", "auto"); // Disable clicking player 2's clock
 $(".player").toggleClass("active");
 
  clearInterval(interval_p1);
  interval_p2 = window.setInterval(reduceByOne, 1000, "2");
}

function player2_moves() {
  P1seconds += increment; // Increment player 1's clock time
  $("#1").html(formatSec(P1seconds));
  //$("#1").css("pointer-events", "auto"); // Disable clicking player 1's clock
  //$("#2").css("pointer-events", "none"); // Allow clicking player 2's clock
  $(".player").toggleClass("active");
  clearInterval(interval_p2);
  interval_p1 = window.setInterval(reduceByOne, 1000, "1");
}

function reduceByOne(id) {
  var reduced;
  if (id == "1") {
    reduced = P1seconds--;  
  } else {
    reduced = P2seconds--;
  }
  $("#"+id).html(formatSec(reduced));
}

function getClockValues() {
  increment = parseInt($("input[name='increment']").val());
  P1seconds = $("input[name='time']").val() * 60 + increment;
  P2seconds = P1seconds;
  $("#1").html(formatSec(P1seconds));
  $("#2").html(formatSec(P2seconds));
  document.getElementById("modal").style.display = "none";
  //player2_moves();
  $("#1").addClass("active"); // Tells the player whose clock will start as the default!
  
}

function formatSec(now_sec) {
  var min = Math.floor(now_sec/60);
  var sec = now_sec%60;
  if (sec < 10) {
    sec = "0" + sec;
  }
  return min + ":" + sec;
}


///GPS inserts
///this is to display gps
const x = document.getElementById("demo");
var distance=0;
//move test is equal previous move count in move function to test if move is legal
//var movetest=0;
///this is to calcualte the move distance
// do value positive Math.abs() 
function movedist(inpozition,finpozition){
  //function use global prev movecount
  //console.log(inpozition,finpozition,inpozition[0],finpozition[0]);
  var lettersvalue={"a":1,"b":2,"c":3,"d":4,"e":5,"f":6,"g":7,"h":8};
  //console.log(Math.abs(lettersvalue[inpozition[0]]-lettersvalue[finpozition[0]])); 
  //console.log(Math.abs(inpozition[1]-finpozition[1]));

  return Math.abs(lettersvalue[inpozition[0]]-lettersvalue[finpozition[0]])+Math.abs(inpozition[1]-finpozition[1]);
}

///calculating distance between two points gps
// Convert from degrees to radians
function degreesToRadians(degrees) {
  var radians = (degrees * Math.PI)/180;
  return radians;
}
// Function takes two objects, that contain coordinates to a starting and destination location.
function calcDistance (startCoords, destCoords){
  let startingLat = degreesToRadians(startCoords.latitude);
  let startingLong = degreesToRadians(startCoords.longitude);
  let destinationLat = degreesToRadians(destCoords.latitude);
  let destinationLong = degreesToRadians(destCoords.longitude);

  // Radius of the Earth in meters
  let radius = 6571000;

  // Haversine equation
  let distanceInMeters = Math.acos(Math.sin(startingLat) * Math.sin(destinationLat) +
  Math.cos(startingLat) * Math.cos(destinationLat) *
  Math.cos(startingLong - destinationLong)) * radius;

  return distanceInMeters;

}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

//initializing
let sCoords = {
  latitude: 0,
  longitude: 0
  }
  let dCoords = {
    latitude: 0,
    longitude: 0
    }

function showPosition(position) {
 
  if(sCoords.latitude==0 && sCoords.longitude==0){
    sCoords.latitude=position.coords.latitude;sCoords.longitude=position.coords.longitude;
  }
  else 
   {
    if(sCoords.latitude!==position.coords.latitude || sCoords.longitude!==position.coords.longitude){
  dCoords = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
    }
    distance=distance-calcDistance(sCoords,dCoords);
    console.log(distance);
    sCoords=dCoords; 

   }
  }
  x.innerHTML = "Lat: " + position.coords.latitude + 
  " Lon: " + position.coords.longitude+
  "<br> Distance is: "+distance;
  

  //console.log(sCoords);
}


async function myFunction() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  };
  while (1==1) {
  await new Promise(r => setTimeout(r, 2000));
  console.log(x.innerHTML)
  alert(x.innerHTML);
  var t=setInterval(getLocation,1000);
  }
}

var t=setInterval(getLocation,1000);

//lets do a test
/*
let sCoords = {
  latitude: 58.39343,
  longitude: -259.2627
  }
  
  let dCoords = {
  latitude: 43.8394,
  longitude: -129.3984
  }
  let dist = calcDistance(sCoords, dCoords);
  console.log(dist);
  */




///this is where the mqtt connections and message analyzis starts

   ///added to js together because cannot do export and import right.
   
    /**
     * this demo uses EMQX Public MQTT Broker (https://www.emqx.com/en/mqtt/public-mqtt5-broker), here are the details:
     *
     * Broker host: broker.emqx.io
     * WebSocket port: 8083
     * WebSocket over TLS/SSL port: 8084
     */
    //import { mqttgame } from './scripts/script.js';
    //var mqttgame = require('./script.js');
    const clientId = 'mqttjs' + Math.random().toString(36).slice(2, 7);
    var oponentId="";
    var mqttgame=0;
    var oponentmqttgame=0;
    var topic_default="h@3@3";
    /**
     * choose which protocol to use for connection here
     *
     * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
     * which should be specified when connecting, and the path used on EMQX is /mqtt.
     *
     * for more details about "mqtt.connect" method & options,
     * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
     */
    const connectUrl = 'wss://broker.hivemq.com:8884/mqtt'
    //const connectUrl = 'ws://192.168.31.40:8080'
    //const connectUrl = 'wss://broker.emqx.io:8084/mqtt'

    const options = {
      keepalive: 30,
      clientId: clientId,
      clean: true,
      connectTimeout: 5000,
      /**
       * By default, EMQX allows clients to connect without authentication.
       * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
       */
      //username: 'onix',
      port:8884,
      //password: 'Aristide01',
      reconnectPeriod: 1000,
      // for more options and details, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
    }
    const topic = 'h@3@3'
    const payload = `{"WebSocket" :"mqtt test", "client":"${clientId}" }`
    // https://github.com/mqttjs/MQTT.js#qos
    const qos = 0

    console.log('connecting mqtt client')
    client = mqtt.connect(connectUrl, options)

    // https://github.com/mqttjs/MQTT.js#event-error
    client.on('error', (err) => {
      console.log('Connection error: ', err)
      client.end()
    })

    // https://github.com/mqttjs/MQTT.js#event-reconnect
    client.on('reconnect', () => {
      console.log('Reconnecting...')
    })

    // https://github.com/mqttjs/MQTT.js#event-connect
    client.on('connect', () => {
      console.log('Client connected:' + clientId)

      // subscribe topic
      // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe error:', error)
          return
        }
        console.log(`Subscribe to topic ${topic}`)
      })

      // publish message
      // https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.error(error)
        }
      })
    })

    // https://github.com/mqttjs/MQTT.js#event-message
    client.on('message', (topic, payload) => {
      console.log(
        'Received Message: ' + payload.toString() + '\nOn topic: ' + topic
      );
      
      //console.log('topic analyzed' );
      //here we analyze the messages;
      try {
        analize_mess_topic(JSON.parse(payload.toString()),topic);
      }
      catch(err) {
        console.log( err.message);
      }
      
    })

    /**
     * If you need to unsubscribe from a topic, you can use the following code.
     */
    // // unsubscribe topic
    // // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback

    function analize_mess_topic(payload_tostring,topic_analize)
     {
     //in this function we analyze the message
     //if we have send a reuqest for a game we can accept requests
     console.log(payload_tostring["client"])
     //console.log(payload_tostring,topic_analize);
     if (payload_tostring["client"]==clientId){
     console.log("massage from same Id");
     } else { 
       console.log(mqttgame);
       //starting connection an handling status of mqtt hame 0-not presset, 1-waiting , 2 -playing agains oponentid
       if (mqttgame==1){
       
       try {
            //getting oponent mqttgame status
            oponentmqttgame=payload_tostring["mqttgame"];
            //this is not clear yet from bugs for multiple players but good enough
            //if there is nothing thre in oponent mqttgame exit the function check message
            if (!(oponentmqttgame)){return};
            //this is error trowing if no move is there, also if my status is not playing not interested in moves
            if (mqttgame==1 && payload_tostring["move"]){return};
            console.log("have started game two");
            //at this point i am playing, this may be buggy
            mqttgame=2;
            oponentId=payload_tostring["client"];
            alert(`"Welcome ${oponentId}! "`);
            //sending a message to the other player to start
                if (oponentmqttgame==1){
                document.getElementById("Message1").value=`{"client":"${clientId}","receiver":"${oponentId}","mqttgame":${mqttgame},"color":"${userColor}"}`;
                document.getElementById("topic_p").value=topic_default;
                publishMessage() ;
                };
            //resetting the game and setting mqttgame to 2 to receive moves
            //mqttgame=2;set distance to zero also
            game.reset();
            distance=0;
            board.start();
            moveHistory.textContent = '';
            moveCount = 1;
            //assigning color if sent with the message
            try {
              //console.log("test");
              if(oponentmqttgame==2 && clientId==payload_tostring["receiver"]){
              userColor = payload_tostring["color"];
              userColor = userColor === 'w' ? 'b' : 'w';
              console.log(userColor);
               }
            }
            catch(err) {
            console.log( err.message);
           };
            
           }
catch(err) {
            console.log( err.message);
           };
       
       };
       
   };
       //playing the game
        try {
       if (oponentId==payload_tostring["client"]){
         move=payload_tostring["move"];
         if (move) {
         console.log(move);
            game.move(move);
            board.position(game.fen());
            recordMove2(move, moveCount); // Record and display the move with move count
            moveCount++;
       };}
       ;
       }
catch(err) {
            console.log( err.message);
           };       
     
    
     
     
     }
     
     
     
     
    const recordMove2 = (move, count) => {
        const formattedMove = count % 2 === 1 ? `${Math.ceil(count / 2)}. ${move}` : `${move} -`;
        moveHistory.textContent += formattedMove + ' ';
        moveHistory.scrollTop = moveHistory.scrollHeight;
        if (moveCount==1){getClockValues();};
        console.log((moveCount % 2)==0,(moveCount % 2));
        if ((moveCount % 2)==1){player1_moves() ;};
        if ((moveCount % 2)==0){player2_moves() ;};
       //publishMessage() of the move on temperature
         // Auto-scroll to the latest move
    };     
     
    function startUnSubscribe(){
    //subscribe
    topic1 = document.getElementById("topic_s").value;
    //console.log(topic1);
        client.unsubscribe(topic1, { qos }, (error) => {
       if (error) {
         console.log('unsubscribe error:', error)
        return
       }
       console.log(`unsubscribed topic: ${topic1}`)
     })
    }
        
    function startSubscribe(){
    //unsubscribe
    topic1 = document.getElementById("topic_s").value;
    
    //console.log(topic1);
    client.subscribe(topic1, { qos }, (error) => {
        if (error) {
          console.log('Subscribe error:', error)
          return
        }
        console.log(`Subscribe to topic ${topic1}`)
        document.getElementById("topic_p").value=topic1;
        
      })

    }
    

    /**
     * If you need to disconnect, you can use the following code.
     */
           
      function publishMessage(){
       payload1 = document.getElementById("Message1").value;
       topic1 = document.getElementById("topic_p").value;
       //console.log(payload1);
       //console.log(topic1);
       
       client.publish(topic1, payload1, { qos }, (error) => {
        if (error) {
          console.error(error);
         };
        }
        )
     //document.getElementById("messages").innerHTML += "<span> Message to topic "+topic+" is sent </span><br>";
      };
      //making clientId global
      //const clientId = 'mqttjs'+Math.random().toString(36).slice(2, 5);      
      
      function startConnect(){
      //connection
      //client id is out
      const connectUrl = document.getElementById("host").value;
      const options = {
      keepalive: 30,
      clientId: clientId,
      port:document.getElementById("port").value,
      clean: true,
      connectTimeout: 5000,
      /**
       * By default, EMQX allows clients to connect without authentication.
       * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
       */
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      reconnectPeriod: 1000,
      // for more options and details, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
      };
      
      //username1= document.getElementById("username").value;
      //password1=  document.getElementById("password").value;
      
      //console.log(username1, password1)
    client = mqtt.connect(connectUrl, options)

    // https://github.com/mqttjs/MQTT.js#event-error
    client.on('error', (err) => {
      console.log('Connection error: ', err)
      client.end()
    })
      //console.log(options)
      client.on('error', (err) => {
      console.log('Connection error: ', err)
      client.end()
    })

    client.on('connect', () => {
      console.log('Client connected:' + clientId);
      startSubscribe();
      }) 
    client.on('message', (topic, payload) => {
      console.log(
        'Received Message: ' + payload.toString() + '\nOn topic: ' + topic
      );
      
    //analize the message  
    //console.log("de");  
    }) 
    }    
       
      function startDisconnect(){
       //disconnect function
      
       if (client.connected) {
       try {
        // disconnect
         // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
         client.end(false, () => {
           console.log('disconnected successfully')
         })
       } catch (error) {
         console.log('disconnect error:', error)
       }
     }
       
       }








//because i Do not know how to do this right
// Wait for the DOM to be fully loaded before executing code


// Wait for the DOM to be fully loaded before executing code

    let board = null; // Initialize the chessboard
    const game = new Chess(); // Create new Chess.js game instance
    const moveHistory = document.getElementById('move-history'); // Get move history container
    let moveCount = 1; // Initialize the move count
    let userColor = 'w'; // Initialize the user's color as white
    var topicgame=topic_default;

    // Function to make a random move for the computer
    const makeRandomMove = () => {
        const possibleMoves = game.moves();

        if (game.game_over()) {
            alert("Checkmate!");
        } else {
            const randomIdx = Math.floor(Math.random() * possibleMoves.length);
            const move = possibleMoves[randomIdx];
            game.move(move);
            board.position(game.fen());
            recordMove(move, moveCount); // Record and display the move with move count
            moveCount++; // Increament the move count
        }
    };

    // Function to record and display a move in the move history
    const recordMove = (move, count) => {
        const formattedMove = count % 2 === 1 ? `${Math.ceil(count / 2)}. ${move}` : `${move} -`;
        moveHistory.textContent += formattedMove + ' ';
        moveHistory.scrollTop = moveHistory.scrollHeight;
       //publishMessage() of the move on temperature
       //clock move and change the player
       if (moveCount==1){getClockValues();};
       console.log((moveCount % 2)==0,(moveCount % 2));
       if ((moveCount % 2)==1){player1_moves() ;};
       if ((moveCount % 2)==0){player2_moves() ;};
       document.getElementById("Message1").value=`{"mqttgame":"${mqttgame}", "move":"${move}" ,"color":"${userColor}","client":"${clientId}"}`;
       document.getElementById("topic_p").value=topic_default;
       publishMessage()
         // Auto-scroll to the latest move
    };

    // Function to handle the start of a drag position
    const onDragStart = (source, piece) => {
        // Allow the user to drag only their own pieces based on color
        return !game.game_over() && piece.search(userColor) === 0;
        //after move change collor

    };

    // Function to handle a piece drop on the board
    const onDrop = (source, target) => {
        //console.log(source,target);
        //movetest=moveCount;
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q',
        });

        if (move === null) return 'snapback';
        //client.publish(topicgame, move.san, { qos }, (error) => {
        //if (error) {
        //  console.error(error);
        // };});
        //window.setTimeout(makeRandomMove, 250);
        recordMove(move.san, moveCount); // Record and display the move with move count
        //allow the other person to play but not if mqtt game started
        if (mqttgame!==2){
        userColor = userColor === 'w' ? 'b' : 'w';
        };
        moveCount++;
        distance=distance+movedist(source,target);
        
    };

    // Function to handle the end of a piece snap animation
    const onSnapEnd = () => {
        board.position(game.fen());
    };

    // Configuration options for the chessboard
    const boardConfig = {
        showNotation: true,
        draggable: true,
        position: 'start',
        onDragStart,
        onDrop,
        onSnapEnd,
        moveSpeed: 'fast',
        snapBackSpeed: 500,
        snapSpeed: 100,
    };

    // Initialize the chessboard
    board = Chessboard('board', boardConfig);

    // Event listener for the "Play Again" button
    document.querySelector('.play-again').addEventListener('click', () => {
        game.reset();
        //also setting distance to 0
        distance=0;
        board.start();
        moveHistory.textContent = '';
        moveCount = 1;
        userColor = 'w';
        mqttgame=0;
    });
    
    //mqtt game over
    document.querySelector('.play-mqtt').addEventListener('click', () => {
       // game.reset();
       if (mqttgame==2) {
       console.log("Game already started");
       return
       //mqttgame=1;
       };
       if (mqttgame==0) {
       console.log("Waiting for game to start");
       document.getElementById("Message1").value=`{"client":"${clientId}","mqttgame":1}`;
       document.getElementById("topic_p").value=topic_default;
       publishMessage();
       mqttgame=1;
       } else { 
                if (mqttgame==2) {conole.log("you are in a game"); return};
                console.log("Already waitting",mqttgame);
                document.getElementById("Message1").value=`{"client":"${clientId}","mqttgame":${mqttgame}}`;
                document.getElementById("topic_p").value=topic_default;
                publishMessage() ;
               }
       //client.publish(topicgame, "moving", { qos }, (error) => {
       // if (error) {
       //   console.error(error);
       //  };});
       //analize_mess_topic("test","testw",1);
    });

    // Event listener for the "Set Position" button
    document.querySelector('.set-pos').addEventListener('click', () => {
        const fen = prompt("Enter the FEN notation for the desired position!");
        if (fen !== null) {
            if (game.load(fen)) {
                board.position(fen);
                moveHistory.textContent = '';
                moveCount = 1;
                userColor = 'w';
            } else {
                alert("Invalid FEN notation. Please try again.");
            }
        }
    });

    // Event listener for the "Flip Board" button
    document.querySelector('.flip-board').addEventListener('click', () => {
        board.flip();
        //makeRandomMove();
        // Toggle user's color after flipping the board but not if ai is deactivated
        //userColor = userColor === 'w' ? 'b' : 'w';
    });


         
