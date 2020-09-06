// Aman Singh worked on the design of the app (all of the UI elements)
// and completed the database under the data tab for all flags

// Yizhen Zhen worked on defining all the global variables and the basic framework of the app
// as well as the newQuestion function (Lines 6-31)
setScreen("First");
onEvent("Flag", "click", function(event) {
  setScreen("welcome");
});
onEvent("Pokemon", "click", function(event) {
  setScreen("screen1");
  playSound("http://66.90.93.122/ost/pokemon-gameboy-sound-collection/svlclmai/101-opening.mp3",false);

});
var correctCountry = "";
var score = 0;
onEvent("startButton", "click", function() {
  setScreen("gameScreen");
  newQuestion();
  setProperty("resultLabel", "hidden", true);
});

function newQuestion(){
  setText("userInput", "Loading...");
  readRecords("Flags", {}, function(records) {
    var flagId = randomNumber(0,records.length-1);
    setImageURL("flagImage", records[flagId].Flags);
    correctCountry = records[flagId].Country;
    setText("userInput", "");
  });
}

// Brandon Wang worked on the rest of the app (Lines 35-69)
// which includes the functions for the guess and hint buttons
onEvent("submit", "click", function() {
  var answer = getText("userInput");
  setProperty("resultLabel", "hidden", false);
  if (answer == correctCountry) {
    setProperty("resultLabel", "text-color", "green");
    setProperty("resultLabel","text", "You were correct! \n How about this one?");
    score++;
    
    readRecords("Flags High Score", {}, function(records) {
        var highscore = records;
        if (score > highscore[0].score){
          updateRecord("Flags High Score", {id:1, score:score}, function(record, success) {
             console.log(success);
          });
        }
        else if (score > highscore[1].score){
          updateRecord("Flags High Score", {id:2, score:score}, function(record, success) {
             console.log(success);
          });
        }
        else if (score > highscore[2].score){
          updateRecord("Flags High Score", {id:3, score:score}, function(record, success) {
             console.log(success);
          });
        }
  
    });
    
  } else {
    setProperty("resultLabel", "text-color", "red");
    setProperty("resultLabel","text", "You were wrong! It was "+ correctCountry + "\n How about this one?");
  }
  setText("scoreLabel", "Score: "+ score);
  newQuestion();
});
//Aman did the hint and High score buttons (71-85)
onEvent("hintButton", "click", function() {
    setProperty("resultLabel", "hidden", false);
    setProperty("resultLabel", "text-color", "blue");
    setProperty("resultLabel","text", "Hint: Starts with " + correctCountry.charAt(0));
  
});

onEvent("HighScoreCheck", "click", function(event) {
  setScreen("HighScore")
 readRecords("Flags High Score", {}, function(records) {
 var HighScore = records;
 setText("HighScoreTop3", "1. " + HighScore[0].score + "\n\n2. " + + HighScore[1].score + "\n\n3. "+ HighScore[2].score )
  });
   
});
//Brandon coded the start and selection screen (128-322) and opp AI (853-1091)
//Yizhen built the database as well as coded the battle system and screen (322-853)
//Aman made all the animations, most of the UI and help screen(1091-1458)

//variables list

var pokemon = [];
var number = 0;
var next = false;
var chosen = [];
var ChosenNumber = 0;
var check = false;
var box = " ";
var selected = "";
var stage = 1;
var OppPokemon = 0;
var pokemonOut = false;
var allyHP = 0;
var allyAtk = 0;
var allyDef = 0;
var allySpA = 0;
var allySpD = 0;
var allySpe = 0;
var oppHP = 0;
var oppAtk = 0;
var oppDef = 0;
var oppSpA = 0;
var oppSpD = 0;
var oppSpe = 0;
var allyTypeI = "";
var allyTypeII = "";
var oppTypeI = "";
var oppTypeII = "";
var oppAttacked = false;
var allyAttacked = false;
var oppSelected = "";
var setup = false;
var mew = 1;
var Battle1 = false;
var Battle2 = false;
var Battle3 = false;
var Stats1 = false;
var Stats2 = false;
var Type1 = false;
//load select page
onEvent("StartBtn", "click", function(event) {
  playSound("Press.mp3",false);
  
    readRecords("Pokemons", {}, function(records){
  pokemon = records;
  showElement("mew");
if (setup == false){
   updateName();
   setup = true;
}
});
     setScreen("screen2");
    })
    



function updateName(){
  for (var i = 0; i < 8; i++) {
     number = number + 1;  
setName();
  }  
}
//sets name of pokemons
function setName() {
 var name =  pokemon[number-1].Pokemon;
 var image = pokemon[number-1].Front;
 setText("Pokemon"+number, name);
setImageURL("PokemonImage"+number, image); 
}
//next page
onEvent("NextBtn", "click", function(event) {
  playSound("Press.mp3",false);
  setScreen("screen3");
  
  if (next == false){
  for (var i = 0; i < 8; i++) {
     number = number + 1;  
setName();}
  next = true;} 
});
onEvent("NextBtn1", "click", function(event) {
  setScreen("screen2");
});

//check boxes
onEvent("checkbox1", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox1");
box = getText("Pokemon1")
checking();
});

onEvent("checkbox2", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox2");
box = getText("Pokemon2")
checking();
});

onEvent("checkbox4", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox4");
box = getText("Pokemon3")
checking();
});

onEvent("checkbox5", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox5");
box = getText("Pokemon4")
checking();
});

onEvent("checkbox6", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox6");
box = getText("Pokemon5")
checking();
});

onEvent("checkbox7", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox7");
box = getText("Pokemon6")
checking();
});

onEvent("checkbox8", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox8");
box = getText("Pokemon7")
checking();
});

onEvent("checkbox9", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox9");
box = getText("Pokemon8")
checking();
});

onEvent("checkbox10", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox10");
box = getText("Pokemon9")
checking();
});

onEvent("checkbox11", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox11");
box = getText("Pokemon10")
checking();
});

onEvent("checkbox12", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox12");
box = getText("Pokemon11")
checking();
});

onEvent("checkbox13", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox13");
box = getText("Pokemon12")
checking();
});

onEvent("checkbox14", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox14");
box = getText("Pokemon13")
checking();
});
onEvent("checkbox15", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox15");
box = getText("Pokemon14")
checking();
});
onEvent("checkbox16", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox16");
box = getText("Pokemon15")
checking();
});
onEvent("checkbox17", "change", function(event) {
  playSound("Press.mp3",false);
  check = getChecked("checkbox17");
box = getText("Pokemon16")
checking();
});
//check = picks pokemon
function checking() {
    if (check==true){
    insertItem(chosen,0,box);

    three();
  }
   else{
     for (var i = 0; i < chosen.length; i++){
       if (chosen[i] == box){ ChosenNumber = i;
        }
  }
    
       removeItem(chosen,ChosenNumber);
      
   }}
  //easter egg mew
onEvent("mew", "click", function(event) {
  mew = mew +1;
  if (mew != 6){
  setPosition("mew", randomNumber(20, 300), randomNumber(20, 400));}
  if (mew == 6){
    insertItem(chosen,0,"Mew");
    mew = 1;
    hideElement("mew");
    setPosition("mew", 155,5);
    three();
  }
  
});
//once there r three pokemons chosen --> start battle
  function three(){
    
    if (chosen.length==3){
      stopSound();
playSound("http://66.90.93.122/ost/pokemon-gameboy-sound-collection/ravcdrgo/107-battle%20%28vs%20wild%20pokemon%29.mp3", true);
     battle();}
  }
//set up battle screen and refreshes battle
function battle() {
     setScreen("screen4");
     setPosition("opppokemon", 135, 95);
     setPosition("allypokemon", -30, 150,250,250);
      showElement("Skill1");
  showElement("Skill2");
   showElement("Skill3");
    showElement("Skill4");
    setText("stage", "Stage: " + stage)
      setText("Skill1", chosen[0]);
      setText("Skill2", chosen[1]);
      setText("Skill3", chosen[2]);
      setText("Skill4", "-----");
      setText("health", "0/0");
      setText("pokemonname", "Pokemon")
      setSize("oppHPBar", 140, 8);
      setProperty("oppHPBar", "background-color", "#23ff00");
       setSize("allyHPBar", 140, 8);
       setProperty("allyHPBar", "background-color", "#23ff00");
       setImageURL("allypokemon", "https://archives.bulbagarden.net/media/upload/9/90/BW_Hilbert_Back.png")
      setText("Announcement", "Choose a Pokemon!");
      showElement("Announcement");
      setTimeout(function() {
     hideElement("Announcement");
           
      }, 2100);
      if (stage != 5) {
      
        Stage1Pokemon();
        stage = stage+1;
      }
      else if (stage == 5) {
      
        Stage5Pokemon();
        stage = stage+1;
      }
 
}
//select you pokemon --> spawn in image
onEvent("Skill1", "click", function(event) {
   selected = getText("Skill1");
  if (pokemonOut == false){
  spawn();
    pokemonOut = true;
  }
  else { skill();}

});
onEvent("Skill2", "click", function(event) {
 selected = getText("Skill2");
  if (pokemonOut == false){
  spawn();
    pokemonOut = true;
  }
  else { skill();}
});

onEvent("Skill3", "click", function(event) {
    selected = getText("Skill3");
  if (pokemonOut == false){
  spawn();
    pokemonOut = true;
  }
  else { skill();}
});
onEvent("Skill4", "click", function(event) {
  selected = getText("Skill4");
if (pokemonOut == true) { skill();}
});

//what pokemon spawns
function spawn() {
    console.log(selected);
 if (selected == "Dragonite"){
   
  number = 0;
  display();
 }
 else if (selected == "Articuno"){
    number = 1;
  display();
 }
  else if (selected == "Moltres"){
    number = 2;
  display();
 }
  else if (selected == "Arcanine"){
    number = 3;
  display();
 }
  else if (selected == "Gyarados"){
    number = 4;
  display();
 }
  else if (selected == "Blastoise"){
    number = 5;
  display();
 }
  else if (selected == "Venusaur"){
    number = 6;
  display();
 }
  else if (selected == "Vaporeon"){
    number = 7;
  display();
 }
  else if (selected == "Flareon"){
    number = 8;
  display();
 }
  else if (selected == "Aerodactyl"){
    number = 9;
  display();
 }
  else if (selected == "Snorlax"){
    number = 10;
  display();
 }
  else if (selected == "Muk"){
    number = 11;
  display();
 }
  else if (selected == "Scyther"){
    number = 12;
  display();
 }
  else if (selected == "Pinsir"){
    number = 13;
  display();
 }
  else if (selected == "Raichu"){
    number = 14;
  display();
 }
  else if (selected == "Charizard"){
    number = 15;
  display();
 }
 else if (selected == "Mew"){
    number = 17;
  display();
   setPosition("allypokemon", 50, 230, 100, 100);
 }
}
 //displays all the pokemons, refreshes the skills
 function display() {
   
    
   animation("go");
   setText("pokemonname", pokemon[number].Pokemon);
    setText("Skill1", pokemon[number].AbilityI);
    setText("Skill2", pokemon[number].AbilityII);
    setText("Skill3", pokemon[number].AbilityIII);
    setText("Skill4", pokemon[number].AbilityIV);
      setText("health", pokemon[number].HP + "/" + pokemon[number].HP);
      showElement("Announcement");
      setText("Announcement", "Go " +pokemon[number].Pokemon + "!")
      setTimeout(function() {
        hideElement("Announcement")
      }, 2500);
      
      allyHP = pokemon[number].HP;
      allyAtk = pokemon[number].Atk;
      allyDef = pokemon[number].Def;
      allySpA = pokemon[number].SpA;
      allySpD = pokemon[number].SpD;
      allySpe = pokemon[number].Spe;
      allyTypeI = pokemon[number].TypeI;
      allyTypeII = pokemon[number].TypeII;
      
 }
//spawns in pokemon
function Stage1Pokemon(){
  OppPokemon = randomNumber(0,14);
    setImageURL("opppokemon", pokemon[OppPokemon].Front);
   setText("oppname", pokemon[OppPokemon].Pokemon);
    oppHP = pokemon[OppPokemon].HP;
      oppAtk = pokemon[OppPokemon].Atk;
      oppDef = precisionRound(pokemon[OppPokemon].Def*(1+((stage-2)/10)),0);
      oppSpA = pokemon[OppPokemon].SpA;
      oppSpD = precisionRound(pokemon[OppPokemon].SpD*(1+((stage-2)/10)),0);
      oppSpe = pokemon[OppPokemon].Spe;
      oppTypeI = pokemon[OppPokemon].TypeI;
      oppTypeII = pokemon[OppPokemon].TypeII;
}
//spawns in MewTwo
function Stage5Pokemon(){
  OppPokemon = 16;
    setImageURL("opppokemon", pokemon[OppPokemon].Front);
   setText("oppname", pokemon[OppPokemon].Pokemon + " 👑");
    oppHP = pokemon[OppPokemon].HP;
      oppAtk = pokemon[OppPokemon].Atk;
      oppDef = pokemon[OppPokemon].Def;
      oppSpA = pokemon[OppPokemon].SpA;
      oppSpD = pokemon[OppPokemon].SpD;
      oppSpe = pokemon[OppPokemon].Spe;
      oppTypeI = pokemon[OppPokemon].TypeI;
      oppTypeII = pokemon[OppPokemon].TypeII;
}
//First function when skill is used
function skill() {
   hideElement("Skill1");
    hideElement("Skill2");
     hideElement("Skill3");
      hideElement("Skill4");
  firstOrSecond();
}
//deteremines who goes first
function firstOrSecond(){
  if (allySpe >= oppSpe) {
    skills();
    oppAttacked = false;
    allyAttacked = true;
  }
  else {
    oppAttack(randomNumber(1,4));
    oppAttacked = true;
    allyAttacked = false;
  }
}
  //ally skills
function skills (){
   allyAttacked = true;
  //Hyperbeam
  if (selected == "Hyperbeam"){
    var hitormiss = randomNumber(1,10);
    if (hitormiss == 10) { setText("Announcement", pokemon[number].Pokemon +" used Hyperbeam and missed")
skillannouncment();}
else{    
    oppHP = oppHP - damageCalcSpA(90);
     setText("Announcement", pokemon[number].Pokemon + " used Hyper Beam, it dealt " +damageCalcSpA(90)+ " damage" );
         skillannouncment();
         damage();
}
  }
  //Double Edge
  if (selected == "Double Edge"){
    oppHP = oppHP - damageCalcPhy(100);
    allyHP = precisionRound(allyHP - ((((16*100*(allyAtk/oppDef))/50)+2)/4), 0);
 
      setText("Announcement", pokemon[number].Pokemon + " used Double Edge it dealt " +damageCalcPhy(100)+ " damage" + " and took " +precisionRound((((((16*100*(allyAtk/oppDef)))/50)+2)/4),0)+ " damage from recoil" );
  skillannouncment();
     damage();
  }
  //Agility
  if (selected == "Agility"){
    allySpe = allySpe*2;
     setText("Announcement", pokemon[number].Pokemon + " used Aglility, " + pokemon[number].Pokemon + "'s speed rose sharpely");
   skillannouncment();

  }
//sword dance
if (selected == "Sword Dance"){
    allyAtk = allyAtk*2;

     setText("Announcement", pokemon[number].Pokemon + " used Sword Dance, " + pokemon[number].Pokemon + "'s attack rose sharpely")
  skillannouncment();
       
  }
  //blizzard
  if (selected == "Blizzard"){
     var hitormiss = randomNumber(1,10);
    if (hitormiss >= 7) { setText("Announcement",pokemon[number].Pokemon +" used Blizzard and missed")
 showElement("Announcement");
    skillannouncment();}
else{
if (oppTypeI == "Grass"||oppTypeI == "Ground"||oppTypeI == "Dragon"||oppTypeI == "Flying"||oppTypeII == "Grass"||oppTypeII == "Ground"||oppTypeII == "Dragon"||oppTypeII == "Flying"){
    oppHP =oppHP -  damageCalcSpA(110)*2;
    setText("Announcement", pokemon[number].Pokemon + " used Blizzard, it was super effective, it dealt " +damageCalcSpA(110)*2+ " damage" );
  skillannouncment();
}
  else if (oppTypeI == "Fire"||oppTypeI == "Water"||oppTypeI == "Ice"||oppTypeII == "Fire"||oppTypeII == "Water"||oppTypeII == "Ice"){
    oppHP = oppHP - precisionRound(damageCalcSpA(110)*0.5,0);
     setText("Announcement", pokemon[number].Pokemon + " used Blizzard, it was not very effective, it dealt " +precisionRound(damageCalcSpA(110)*0.5,0)+ " damage" );
    skillannouncment();
    
  } 
  else { oppHP =oppHP - damageCalcSpA(110);
     
   
     setText("Announcement", pokemon[number].Pokemon + " used Blizzard, it dealt " +damageCalcSpA(110)+ " damage" ); 
       skillannouncment();

    
  }
  damage();
}
}
//Flare Blitz
   if (selected == "Flare Blitz"){
     var hitormiss = randomNumber(1,20);
    if (hitormiss >= 17) { setText("Announcement",pokemon[number].Pokemon +" used Flare Blitz and missed")
        skillannouncment();
    }
else{
if (oppTypeI == "Grass"||oppTypeI == "Ice"||oppTypeI == "Bug"||oppTypeII == "Grass"||oppTypeII == "Bug"||oppTypeII == "Ice"){
    oppHP = oppHP - damageCalcPhy(120)*2;
    setText("Announcement", pokemon[number].Pokemon + " used Flare Blitz, it was super effective, it dealt " +damageCalcPhy(120)*2+ " damage" );
    skillannouncment();
}
  else if (oppTypeI == "Fire"||oppTypeI == "Water"||oppTypeI == "Dragon"||oppTypeI == "Rock"||oppTypeII == "Fire"||oppTypeII == "Water"||oppTypeII == "Rock"||oppTypeII == "Dragon"){
    oppHP = oppHP - precisionRound(damageCalcPhy(120)*0.5,0);
     setText("Announcement", pokemon[number].Pokemon + " used Flare Blitz, it was not very effective, it dealt " +precisionRound(damageCalcPhy(120)*0.5,0) + " damage" );
       skillannouncment();
  } 
  else { oppHP = oppHP -  damageCalcPhy(120);
     setText("Announcement", pokemon[number].Pokemon + " used Flare Blitz, it dealt " +damageCalcPhy(120)+ " damage" );
      skillannouncment();
  } 
 damage();
  }
}
//body slam
if (selected == "Body Slam"){

    oppHP = oppHP - damageCalcPhy(85);
     setText("Announcement", pokemon[number].Pokemon + " used Body Slam, it dealt " +damageCalcPhy(85)+ " damage" );
     skillannouncment();
    damage();
}
//surf
 if (selected == "Surf"){
if (oppTypeI == "Fire"||oppTypeI == "Ground"||oppTypeI == "Rock"||oppTypeII == "Fire"||oppTypeII == "Ground"||oppTypeII == "Rock"){
    oppHP = oppHP - damageCalcSpA(90)*2;
    setText("Announcement", pokemon[number].Pokemon + " used Surf, it was super effective, it dealt " +damageCalcSpA(90)*2+ " damage" );
    skillannouncment();
}
  else if (oppTypeI == "Water"||oppTypeI == "Grass"||oppTypeI == "Dragon"||oppTypeII == "Water"||oppTypeII == "Grass"||oppTypeII == "Dragon"){
    oppHP = oppHP - precisionRound(damageCalcSpA(90)*0.5,0);
     setText("Announcement", pokemon[number].Pokemon + " used Surf, it was not very effective, it dealt " +precisionRound(damageCalcSpA(90)*0.5,0) + " damage" );
       skillannouncment();
  } 
  else { oppHP = oppHP -  damageCalcSpA(90);
     setText("Announcement", pokemon[number].Pokemon + " used Surf, it dealt " +damageCalcSpA(90)+ " damage" );
      skillannouncment();
  } 
 damage();
  
}
if (selected == "Sludge"){
if (oppTypeI == "Grass"&&oppTypeII != "Poison"||oppTypeII == "Grass"){
    oppHP = oppHP - damageCalcSpA(70)*2;
    setText("Announcement", pokemon[number].Pokemon + " used Sludge, it was super effective, it dealt " +damageCalcSpA(70)*2+ " damage" );
    skillannouncment();
}
  else if (oppTypeI == "Poison"||oppTypeI == "Rock"||oppTypeI == "Ground"||oppTypeII == "Poison"||oppTypeII == "Rock"||oppTypeII == "Ground"){
    oppHP = oppHP - precisionRound(damageCalcSpA(70)*0.5,0);
     setText("Announcement", pokemon[number].Pokemon + " used Sludge, it was not very effective, it dealt " +precisionRound(damageCalcSpA(70)*0.5,0) + " damage" );
       skillannouncment();
  } 
  else { oppHP = oppHP -  damageCalcSpA(70);
     setText("Announcement", pokemon[number].Pokemon + " used Sludge, it dealt " +damageCalcSpA(70)+ " damage" );
      skillannouncment();
  } 
 damage();
  
}
if (selected == "Mega Drain"){
if (oppTypeI == "Water"||oppTypeI == "Ground"||oppTypeI == "Rock"||oppTypeII == "Water"||oppTypeII == "Ground"||oppTypeII == "Rock")
{
    oppHP = oppHP - damageCalcSpA(50)*2;
     setText("Announcement", pokemon[number].Pokemon + " used Mega Drain, it was super effective, it dealt " +damageCalcSpA(50)*2+ " damage" + " and healed for " +damageCalcSpA(50)+ " damage"  );
    skillannouncment();
     allyHP = precisionRound(allyHP + damageCalcSpA(50),0);
}
  else if (oppTypeI == "Fire"||oppTypeI == "Grass"||oppTypeI == "Poison"||oppTypeI == "Flying"||oppTypeI == "Bug"||oppTypeI == "Dragon"||oppTypeII == "Fire"||oppTypeII == "Grass"||oppTypeII == "Poison"||oppTypeII == "Flying"||oppTypeII == "Bug"||oppTypeII == "Dragon")
  {
    oppHP = precisionRound(oppHP - damageCalcSpA(50)*0.5,0);
     setText("Announcement", pokemon[number].Pokemon + " used Mega Drain, it was not very effective, it dealt " +precisionRound(damageCalcSpA(50)*0.5,0) + " damage" + " and healed for " +precisionRound(damageCalcSpA(50)*0.25,0)+ " damage"  );
       skillannouncment();
      
    allyHP = precisionRound(allyHP + damageCalcSpA(50)*0.25,0);
  } 
  else { oppHP = oppHP -  damageCalcSpA(50);
     setText("Announcement", pokemon[number].Pokemon + " used Mega Drain, it dealt " +damageCalcSpA(50)+ " damage" + " and healed for " +precisionRound(damageCalcSpA(50)*0.5,0)+ " damage");
      skillannouncment();
 allyHP = precisionRound(allyHP + damageCalcSpA(50)*0.5,0);
     
  } 
  if (allyHP > pokemon[number].HP){
    allyHP =  pokemon[number].HP;
  }
 damage();
 
  
}
 if (selected == "Thunderbolt"){
if (oppTypeI == "Water"||oppTypeI == "Flying"||oppTypeII == "Water"||oppTypeII == "Flying"){
    oppHP = oppHP - damageCalcSpA(90)*2;
    setText("Announcement", pokemon[number].Pokemon + " used Thunderbolt, it was super effective, it dealt " +damageCalcSpA(90)*2+ " damage" );
    skillannouncment();
}
  else if (oppTypeI == "Electric"||oppTypeI == "Grass"||oppTypeI == "Dragon"||oppTypeII == "Electric"||oppTypeII == "Grass"||oppTypeII == "Dragon"){
    oppHP = oppHP - precisionRound(damageCalcSpA(90)*0.5,0);
     setText("Announcement", pokemon[number].Pokemon + " used Thunderbolt, it was not very effective, it dealt " +precisionRound(damageCalcSpA(90)*0.5,0) + " damage" );
       skillannouncment();
  } 
  else { oppHP = oppHP -  damageCalcSpA(90);
     setText("Announcement", pokemon[number].Pokemon + " used Thunderbolt, it dealt " +damageCalcSpA(90)+ " damage" );
      skillannouncment();
  } 
 damage();
  
}
if (selected == "Restore"){
allyHP = allyHP + pokemon[number].HP/2;
  if (allyHP > pokemon[number].HP){
    allyHP =  pokemon[number].HP;
  }
  setText("Announcement", pokemon[number].Pokemon + " used restore and recovered HP");
   skillannouncment();
  damage();
}
if (selected == "Psystrike"){
     oppHP  = oppHP  - damageCalcSpA(100);
     setText("Announcement", pokemon[number].Pokemon + " used PsyStrike, it dealt " +damageCalcSpA(100)+ " damage" );
     skillannouncment();
    damage();
  }
  if (oppAttacked == false && oppHP > 0 && allyHP > 0 ){
   setTimeout(function() {
      oppAttack();
    }, 2000);
  }
  else if (allyAttacked == true && oppAttacked == true){
    endTurn();
  }

}
//Announcement screen update
function skillannouncment(){
    showElement("Announcement");
   setTimeout(function() {
      hideElement("Announcement");
     }, 2000);
  
}
//damage calulations
function damageCalcSpA(power){
  var damagedealt = precisionRound((((16*power*(allySpA/oppSpD))/50)+2), 0);
  return damagedealt
 
}
function damageCalcPhy(power){
  var damagedealt = precisionRound((((16*power*(allyAtk/oppDef))/50)+2), 0);
  return damagedealt
 
}
function damageOppCalcSpA(power){
  var damagedealt = precisionRound((((16*power*(oppSpA/allySpD))/50)+2), 0);
  return damagedealt
 
}
function damageOppCalcPhy(power){
  var damagedealt = precisionRound((((16*power*(oppAtk/allyDef))/50)+2), 0);
  return damagedealt
 
}
//damage dealt animation + UI update
function damage(){
  var sound = randomNumber(1,4);
   if (sound == 1){
     playSound("Tackle.mp3",false)
   }
   if (sound == 2){
  playSound("MegaDrain1.mp3",false)
   }
   if (sound == 3){
   playSound("Ember.mp3",false)
   }
   if (sound == 4){
   playSound("HyperFang.mp3",false)
   }
    if (oppHP <= 0){
      setSize("oppHPBar",1,8);
          setProperty("oppHPBar", "background-color", "red");
         
      setTimeout(function() {
        playSound("Withdraw1.mp3",false)
 animation("oppfaint");
        setText("Announcement", pokemon[OppPokemon].Pokemon + " has fainted");
         showElement("Announcement");
         showElement("nextstage");
      }, 2000);
      
     
    }
    if (allyHP <= 0){
    
      setSize("allyHPBar",1,8);
          setProperty("allyHPBar", "background-color", "red");
         setText("health",0 + "/" +pokemon[number].HP )
      setTimeout(function() {
        playSound("Withdraw1.mp3",false);
         animation("allyfaint");
        setText("Announcement", pokemon[number].Pokemon + " has fainted");
        showElement("Announcement");
        showElement("nextstage");
      }, 2000);
     showElement("Announcement");
    }
     else if (oppHP >= 0 && allyHP >= 0){
     setHealth();
    setText("health",allyHP + "/" +pokemon[number].HP )
    }
    
  }
  //updates health UI
function setHealth() {
    var newOppHealth = 140*(oppHP/(pokemon[OppPokemon].HP));
    setSize("oppHPBar",newOppHealth,8);
    if (newOppHealth > 70){
      setProperty("oppHPBar", "background-color", "#23ff00");
    }
    if (newOppHealth <= 70 && newOppHealth>= 28){
      setProperty("oppHPBar", "background-color", "yellow");
      }
      if (newOppHealth <= 28){
      setProperty("oppHPBar", "background-color", "red");
    }
   var newAllyHealth = 140*(allyHP/(pokemon[number].HP));
    setSize("allyHPBar",newAllyHealth,8);
    if (newAllyHealth > 70){
      setProperty("allyHPBar", "background-color", "#23ff00");
    }
    if (newAllyHealth <= 70 && newAllyHealth > 28){
      setProperty("allyHPBar", "background-color", "yellow");
      
    }
    if (newAllyHealth <= 28){
      setProperty("allyHPBar", "background-color", "red");
    }
}
//opponent skills random
function oppAttack(){
  var skill = randomNumber(1,4);
  if (skill == 1) { 
    oppSelected = pokemon[OppPokemon].AbilityI; 
  }
  else if (skill == 2) {
    oppSelected = pokemon[OppPokemon].AbilityII;
     }
  else if (skill == 3) { 
    oppSelected = pokemon[OppPokemon].AbilityIII; 
    }
  else if (skill == 4) { 
    oppSelected = pokemon[OppPokemon].AbilityIV;
    }
 console.log(oppSelected);
  oppskills();
}
//opp moves
function oppskills (){
   oppAttacked = true;
  //Hyperbeam
  if (oppSelected == "Hyperbeam"){
    var hitormiss = randomNumber(1,10);
    if (hitormiss == 10) { setText("Announcement", pokemon[OppPokemon].Pokemon +" used Hyperbeam and missed")
skillannouncment();}
else{    
    allyHP = allyHP - damageOppCalcSpA(90);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Hyper Beam, it dealt " +damageOppCalcSpA(90)+ " damage" );
         skillannouncment();
         damage();
}}
  
  //Double Edge
  if (oppSelected == "Double Edge"){
    allyHP  = allyHP  - damageOppCalcPhy(100);
    oppHP = precisionRound(oppHP - ((((16*100*(oppAtk/allyDef))/50)+2)/4), 0);
 
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Double Edge it dealt " +damageOppCalcPhy(100)+ " damage" + " and took " +precisionRound((((((16*100*(oppAtk/allyDef)))/50)+2)/4),0)+ " damage from recoil" );
  skillannouncment();
     damage();
  }
  //Agility
  if (oppSelected == "Agility"){
    oppSpe = oppSpe*2;
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Aglility, " + pokemon[OppPokemon].Pokemon + "'s speed rose sharpely")
   skillannouncment();
  
  }
//sword dance
if (oppSelected == "Sword Dance"){
    oppAtk = oppAtk*2;

     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Sword Dance, " + pokemon[OppPokemon].Pokemon + "'s attack rose sharpely");
  skillannouncment();
       
  }
  //blizzard
  if (oppSelected == "Blizzard"){
     var hitormiss = randomNumber(1,10);
    if (hitormiss >= 7) { setText("Announcement",pokemon[OppPokemon].Pokemon +" used Blizzard and missed")
 showElement("Announcement");
    skillannouncment();}
else{
if (allyTypeI == "Grass"||allyTypeI == "Ground"||allyTypeI == "Dragon"||allyTypeI == "Flying"||allyTypeII == "Grass"||allyTypeII == "Ground"||allyTypeII == "Dragon"||allyTypeII == "Flying"){
    allyHP  =allyHP  -  damageOppCalcSpA(110)*2;
    setText("Announcement", pokemon[OppPokemon].Pokemon + " used Blizzard, it was super effective, it dealt " +damageOppCalcSpA(110)*2+ " damage" );
  skillannouncment();
}
  else if (allyTypeI == "Fire"||allyTypeI == "Water"||allyTypeI == "Ice"||allyTypeII == "Fire"||allyTypeII == "Water"||allyTypeII == "Ice"){
    allyHP  = allyHP  - precisionRound(damageOppCalcSpA(110)*0.5,0);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Blizzard, it was not very effective, it dealt " +precisionRound(damageOppCalcSpA(110)*0.5,0)+ " damage" );
    skillannouncment();
    
  } 
  else { allyHP  =allyHP  - damageOppCalcSpA(110);
     
   
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Blizzard, it dealt " +damageOppCalcSpA(110)+ " damage" ); 
       skillannouncment();

   
  }
   damage();
}
}
//Flare Blitz
   if (oppSelected == "Flare Blitz"){
     var hitormiss = randomNumber(1,20);
    if (hitormiss >= 17) { setText("Announcement",pokemon[OppPokemon].Pokemon +" used Flare Blitz and missed")
        skillannouncment();
    }
else{
if (allyTypeI == "Grass"||allyTypeI == "Ice"||allyTypeI == "Bug"||allyTypeII == "Grass"||allyTypeII == "Bug"||allyTypeII == "Ice"){
    allyHP  = allyHP  - damageOppCalcPhy(120)*2;
    setText("Announcement", pokemon[OppPokemon].Pokemon + " used Flare Blitz, it was super effective, it dealt " +damageOppCalcPhy(120)*2+ " damage" );
    skillannouncment();
}
  else if (allyTypeI == "Fire"||allyTypeI == "Water"||allyTypeI == "Dragon"||allyTypeI == "Rock"||allyTypeII == "Fire"||allyTypeII == "Water"||allyTypeII == "Rock"||allyTypeII == "Dragon"){
    allyHP  = allyHP  - precisionRound(damageOppCalcPhy(120)*0.5,0);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Flare Blitz, it was not very effective, it dealt " +precisionRound(damageOppCalcPhy(120)*0.5,0) + " damage" );
       skillannouncment();
  } 
  else { allyHP  = allyHP  -  damageOppCalcPhy(120);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Flare Blitz, it dealt " +damageOppCalcPhy(120)+ " damage" );
      skillannouncment();
  } 
 damage();
  }
}
//body slam
if (oppSelected == "Body Slam"){

    allyHP  = allyHP  - damageOppCalcPhy(85);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Body Slam, it dealt " +damageOppCalcPhy(85)+ " damage" );
     skillannouncment();
    damage();
}
//surf
 if (oppSelected == "Surf"){
if (allyTypeI == "Fire"||allyTypeI == "Ground"||allyTypeI == "Rock"||allyTypeII == "Fire"||allyTypeII == "Ground"||allyTypeII == "Rock"){
    allyHP  = allyHP  - damageOppCalcSpA(90)*2;
    setText("Announcement", pokemon[OppPokemon].Pokemon + " used Surf, it was super effective, it dealt " +damageOppCalcSpA(90)*2+ " damage" );
    skillannouncment();
}
  else if (allyTypeI == "Water"||allyTypeI == "Grass"||allyTypeI == "Dragon"||allyTypeII == "Water"||allyTypeII == "Grass"||allyTypeII == "Dragon"){
    allyHP  = allyHP  - precisionRound(damageOppCalcSpA(90)*0.5,0);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Surf, it was not very effective, it dealt " +precisionRound(damageOppCalcSpA(90)*0.5,0) + " damage" );
       skillannouncment();
  } 
  else { allyHP  = allyHP  -  damageOppCalcSpA(90);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Surf, it dealt " +damageOppCalcSpA(90)+ " damage" );
      skillannouncment();
  } 
 damage();
  
}
if (oppSelected == "Sludge"){
if (allyTypeI == "Grass"&&allyTypeII != "Poison"||allyTypeII == "Grass"){
    allyHP  = allyHP  - damageOppCalcSpA(70)*2;
    setText("Announcement", pokemon[OppPokemon].Pokemon + " used Sludge, it was super effective, it dealt " +damageOppCalcSpA(70)*2+ " damage" );
    skillannouncment();
}
  else if (allyTypeI == "Poison"||allyTypeI == "Rock"||allyTypeI == "Ground"||allyTypeII == "Poison"||allyTypeII == "Rock"||allyTypeII == "Ground"){
    allyHP  = allyHP  - precisionRound(damageOppCalcSpA(70)*0.5,0);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Sludge, it was not very effective, it dealt " +precisionRound(damageOppCalcSpA(70)*0.5,0) + " damage" );
       skillannouncment();
  } 
  else { allyHP  = allyHP  -  damageOppCalcSpA(70);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Sludge, it dealt " +damageOppCalcSpA(70)+ " damage" );
      skillannouncment();
  } 
 damage();
  
}
if (oppSelected == "Mega Drain"){
if (allyTypeI == "Water"||allyTypeI == "Ground"||allyTypeI == "Rock"||allyTypeII == "Water"||allyTypeII == "Ground"||allyTypeII == "Rock")
{
    allyHP  = allyHP  - damageOppCalcSpA(50)*2;
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Mega Drain, it was super effective, it dealt " +damageOppCalcSpA(50)*2+ " damage" + " and healed for " +damageOppCalcSpA(50)+ " damage"  );
    skillannouncment();
    oppHP = precisionRound(oppHP + damageCalcSpA(50),0);
}
  else if (allyTypeI == "Fire"||allyTypeI == "Grass"||allyTypeI == "Poison"||allyTypeI == "Flying"||allyTypeI == "Bug"||allyTypeI == "Dragon"||allyTypeII == "Fire"||allyTypeII == "Grass"||allyTypeII == "Poison"||allyTypeII == "Flying"||allyTypeII == "Bug"||allyTypeII == "Dragon")
  {
    allyHP = precisionRound(allyHP - damageOppCalcSpA(50)*0.5,0);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Mega Drain, it was not very effective, it dealt " +precisionRound(damageOppCalcSpA(50)*0.5,0) + " damage" + " and healed for " +precisionRound(damageOppCalcSpA(50)*0.25,0)+ " damage"  );
       skillannouncment();
      
    oppHP = precisionRound(oppHP + damageOppCalcSpA(50)*0.25,0);
  } 
  else { allyHP = allyHP -  damageOppCalcSpA(50);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Mega Drain, it dealt " +damageOppCalcSpA(50)+ " damage" + " and healed for " +precisionRound(damageOppCalcSpA(50)*0.5,0)+ " damage");
      skillannouncment();
 oppHP = precisionRound(oppHP + damageOppCalcSpA(50)*0.5,0);
     
  } 
  if (oppHP > pokemon[OppPokemon].HP){
    oppHP =  pokemon[OppPokemon].HP;
  }
 damage();
 
  
}
 if (oppSelected == "Thunderbolt"){
if (allyTypeI == "Water"||allyTypeI == "Flying"||allyTypeII == "Water"||allyTypeII == "Flying"){
    allyHP = allyHP - damageOppCalcSpA(90)*2;
    setText("Announcement", pokemon[OppPokemon].Pokemon + " used Thunderbolt, it was super effective, it dealt " +damageOppCalcSpA(90)*2+ " damage" );
    skillannouncment();
}
  else if (allyTypeI == "Electric"||allyTypeI == "Grass"||allyTypeI == "Dragon"||allyTypeII == "Electric"||allyTypeII == "Grass"||allyTypeII == "Dragon"){
    allyHP = allyHP - precisionRound(damageOppCalcSpA(90)*0.5,0);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Thunderbolt, it was not very effective, it dealt " +precisionRound(damageOppCalcSpA(90)*0.5,0) + " damage" );
       skillannouncment();
  } 
  else { allyHP = allyHP -  damageOppCalcSpA(90);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used Thunderbolt, it dealt " +damageOppCalcSpA(90)+ " damage" );
      skillannouncment();
  } 
 damage();
  
}
if (oppSelected == "Restore"){
oppHP = oppHP + pokemon[OppPokemon].HP/2;
if (oppHP > pokemon[OppPokemon].HP){
    oppHP =  pokemon[OppPokemon].HP;
  }
   setText("Announcement", pokemon[OppPokemon].Pokemon + " used rest and recovered HP");
   skillannouncment();
   damage();
  }
  
  if (oppSelected == "Psystrike"){
     allyHP  = allyHP  - damageOppCalcSpA(100);
     setText("Announcement", pokemon[OppPokemon].Pokemon + " used PsyStrike, it dealt " +damageOppCalcSpA(100)+ " damage" );
     skillannouncment();
    damage();
  }
  if (allyAttacked == false && oppHP > 0 && allyHP > 0){
     setTimeout(function() {
    skills();
     }, 2000);
  }
  else if (allyAttacked == true && oppAttacked == true){
    endTurn();
  }
}
//refresh everything after turn ends
function endTurn(){
  allyAttacked = false;
    oppAttacked = false;
 showElement("Skill1");
  showElement("Skill2");
   showElement("Skill3");
    showElement("Skill4");
   if (allyHP < 0 || oppHP < 0){
     showElement("Announcement");
setTimeout(function() {
  showElement("nextstage");  
}, 2000);

   }
}
//rounds up numbers
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
//all the animation shit
function animation(scene){
  if (scene == "go"){
    for (var i = 0; i < 10; i++) {
      setTimeout(function() {
        var ypos = getYPosition("allypokemon");
          var xpos = getXPosition("allypokemon")
        setPosition("allypokemon", xpos - 22, ypos);
      }, 100);}
      setTimeout(function() {
        setImageURL("allypokemon", pokemon[number].Back);
        setImageURL("allypokemon", pokemon[number].Back);
        setImageURL("allypokemon", pokemon[number].Back);
        setTimeout(function() {
            playSound("Withdraw1.mp3",false);
     for (var i = 0; i < 10; i++) {
      setTimeout(function() {
        var ypos = getYPosition("allypokemon")
          var xpos = getXPosition("allypokemon")
        setPosition("allypokemon", xpos + 22, ypos);
      }, 100); 
    }
        }, 300);
}, 1000); 
  
}
if (scene == "allyfaint"){
   for (var i = 0; i < 10; i++) {
      setTimeout(function() {
        var ypos = getYPosition("allypokemon")
          var xpos = getXPosition("allypokemon")
        setPosition("allypokemon", xpos - 22, ypos);
      }, 100); 
    }
}
if (scene == "oppfaint"){
   for (var i = 0; i < 10; i++) {
      setTimeout(function() {
        var ypos = getYPosition("opppokemon")
          var xpos = getXPosition("opppokemon")
        setPosition("opppokemon", xpos + 18, ypos);
      }, 100); 
    }
}
}
//what happens when u press next (faints and restarts, actually next stage)
onEvent("nextstage", "click", function(event) {
  playSound("Press.mp3",false);
    hideElement("nextstage");
  if (oppHP <= 0 && stage != 6){
    allyAttacked = false;
    oppAttacked = false;
    pokemonOut = false;
    battle();
    
  }
  if (oppHP <= 0 && stage == 6){
     setText("Announcement", "You beat all the pokemons! You won!");
    showElement("Announcement");
       stopSound();
       playSound("http://66.90.93.122/ost/pokemon-gameboy-sound-collection/kccmwnxi/108-victory%20%28vs%20wild%20pokemon%29.mp3",false)

  }
  else if (allyHP <= 0){
    stopSound();
    playSound("Press.mp3",false);
    setText("Announcement", "GG, Your Pokemon has fainted. Better luck next time!");
    setTimeout(function() {
    stage = 1;
      setScreen("screen1");
      removeItem(chosen,0);
      removeItem(chosen,0);
      removeItem(chosen,0);
      setChecked("checkbox1",false);
      setChecked("checkbox2",false);
      setChecked("checkbox4",false);
      setChecked("checkbox5",false);
      setChecked("checkbox6",false);
      setChecked("checkbox7",false);
      setChecked("checkbox8",false);
      setChecked("checkbox9",false);
      setChecked("checkbox10",false);
      setChecked("checkbox11",false);
      setChecked("checkbox12",false);
      setChecked("checkbox13",false);
      setChecked("checkbox14",false);
      setChecked("checkbox15",false);
      setChecked("checkbox16",false);
      setChecked("checkbox17",false);
      pokemonOut = false;
    }, 2000);
    
    showElement("Announcement");

  }
});

//all the mouse over stuff
var DescOn = false;

onEvent("Skill1", "mouseover", function(event) {
  if (pokemonOut == true){
    var desc = getText("Skill1")
   showSkill(desc); 
  }
   else if (pokemonOut == false){
    var pokemonHovered = getText("Skill1")
    showStatsMicro(pokemonHovered)
  }
  
});
onEvent("Skill2", "mouseover", function(event) {
  if (pokemonOut == true){
    var desc = getText("Skill2")
   showSkill(desc); 
  }
   else if (pokemonOut == false){
    var pokemonHovered = getText("Skill2")
    showStatsMicro(pokemonHovered)
  }
});
onEvent("Skill3", "mouseover", function(event) {
  if (pokemonOut == true){
    var desc = getText("Skill3")
   showSkill(desc); 
  }
   else if (pokemonOut == false){
    var pokemonHovered = getText("Skill3")
    showStatsMicro(pokemonHovered)
  }

});
onEvent("Skill4", "mouseover", function(event) {
  if (pokemonOut == true){
    var desc = getText("Skill4")
   showSkill(desc); 
  }
  if (pokemonOut == false){
    hideElement("SkillDesc");
  }
});

function showSkill(desc) {
  showElement("SkillDesc");
  if(desc == "Flare Blitz"){
     setText("SkillDesc","Type: Fire\nCategory: Physical\nPower: 120\nAccuracy: 85%");
  }
  if(desc == "Blizzard"){
       setText("SkillDesc","Type: Ice\nCategory: Special\n Power: 110\n Accuracy: 70%");
  }
  if(desc == "Restore"){
    setText("SkillDesc", "User recovers half of its max HP");
  }
  if(desc == "Mega Drain"){
    setText("SkillDesc","Type: Grass\nCategory: Special\nPower: 40. 50% lifesteal\nAccuracy: 100%.");
  }
  if(desc == "Body Slam"){
     setText("SkillDesc","Type: Normal\nCategory: Physical\nPower: 85\nAccuracy: 100%.");
  }
  if(desc == "Double Edge"){
     setText("SkillDesc","Type: Normal\nCategory: Physical\nPower: 120. 50% recoil\nAccuracy: 100%");
  }
  if(desc == "Sword Dance"){
    setText("SkillDesc","Agility raises the user's Attack by two stages.");
  }
  if(desc == "Agility"){
    setText("SkillDesc","Agility raises the user's Speed by two stages.");
  }
  if(desc == "Thunder Bolt"){
    setText("SkillDesc","Type: Electric\nCategory: \nPower: 90\nAccuracy: 100%");
  }
  if(desc == "Sludge"){
    setText("SkillDesc","Type: Poison\nCategory: Special\nPower: 70\nAccuracy: 100%");
  }
  if(desc == "Surf"){
    setText("SkillDesc","Type: Water\nCategory: Special\nPower: 90\nAccuracy: 100%");
  }
  if(desc == "PsyStrike"){
    setText("SkillDesc","Type: Psychic\nCategory: Special\nPower: 120\nAccuracy: 100%");
  }
  if(desc == "Hyperbeam"){
    setText("SkillDesc","Type: Normal\nCategory: Special\nPower: 120\nAccuracy: 90%");
  }
}
  
function showStatsMicro(pokemonHovered){
  showElement("SkillDesc");
   if (pokemonHovered == "Dragonite"){
    var hover = 0;
  setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }
 else if (pokemonHovered == "Articuno"){
    var hover = 1;
  setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);

 }
  else if (pokemonHovered == "Moltres"){
    var hover = 2;
   setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);

 }
  else if (pokemonHovered == "Arcanine"){
    var hover = 3;
  setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);

 }
  else if (pokemonHovered == "Gyarados"){
    var hover = 4;
  setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);

 }
  else if (pokemonHovered == "Blastoise"){
    var hover = 5;
setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }
  else if (pokemonHovered == "Venusaur"){
    var hover = 6;
setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }
  else if (pokemonHovered == "Vaporeon"){
    var hover = 7;
setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }
  else if (pokemonHovered == "Flareon"){
    var hover = 8;
setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }
  else if (pokemonHovered == "Aerodactyl"){
    var hover = 9;
setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }
  else if (pokemonHovered == "Snorlax"){
    var hover = 10;
setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }
  else if (pokemonHovered == "Muk"){
    var hover = 11;
setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }
  else if (pokemonHovered == "Scyther"){
    var hover = 12;
setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }
  else if (pokemonHovered == "Pinsir"){
    var hover = 13;
setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }
  else if (pokemonHovered == "Raichu"){
    var hover = 14;
setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }
  else if (pokemonHovered == "Charizard"){
    var hover = 15;
setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }
 else if (pokemonHovered == "Mew"){
   var hover = 17;
setText("SkillDesc", pokemon[hover].Pokemon +  "\n HP: " +pokemon[hover].HP + " Atk : " +  pokemon[hover].Atk + " Def: " + pokemon[hover].Def + "\n SpA: " + pokemon[hover].SpA +  " SpD: "+ pokemon[hover].SpD +" Spe: "+ pokemon[hover].Spe);
 }

}
onEvent("screen4", "mousemove", function(event) {
  if(event.y < 395 || event.y > 450){
    hideElement("SkillDesc");
  }
  if(event.y < 95 || event.y > 225 || event.x < 165 || event.x > 295 ){
    hideElement("OppStat");}
    if(event.y < 160 || event.y > 400 || event.x < 0 || event.x > 210 ){
    hideElement("AllyStat");}
});
onEvent("Announcement", "mouseover", function(event) {
    hideElement("SkillDesc");
});

onEvent("opppokemon", "mousemove", function(event) {
  showElement("OppStat");
setText("OppStat", pokemon[OppPokemon].Pokemon + " HP: " +oppHP +"/"+ pokemon[OppPokemon].HP + "\n Types: " + pokemon[OppPokemon].TypeI + " " + pokemon[OppPokemon].TypeII + "\n Atk: " + oppAtk + " Def: " + oppDef + "\n SpA: " + oppSpA +  " SpD: "+ oppSpD +" Spe: "+ oppSpe);
});
onEvent("allypokemon", "mousemove", function(event) {
  if (pokemonOut == true){
  showElement("AllyStat");
setText("AllyStat", pokemon[number].Pokemon + " HP: " + allyHP +"/"+ pokemon[number].HP + "\n Types: " + pokemon[number].TypeI + " " + pokemon[number].TypeII + "\n Atk: " + allyAtk + " Def: " + allyDef + "\n SpA: " + allySpA +  " SpD: "+ allySpD +" Spe: "+ allySpe);
}
  });
onEvent("Help", "click", function(event) {
  setScreen("screen5");
});
//Help Screen
onEvent("BattleHelp", "click", function(event) {
  hideElement("TypeHelp");
hideElement("StatsHelp");
hideElement("BattleHelp");
setText("HelpChat", "In a battle, first you choose one of you three pokemons to enter into battle against your opponent.");
Battle1 = true;
showElement("HelpNext");
});

onEvent("StatsHelp", "click", function(event) {
  hideElement("TypeHelp");
hideElement("StatsHelp");
hideElement("BattleHelp");
setText("HelpChat", "HP stands health points, it is your pokemon’s life force, when a pokemon’s HP hits 0, they faint and lose the battle. Speed determines which pokemon moves first, the higher the speed, the faster the pokemon");
Stats1 = true;
showElement("HelpNext");
});

onEvent("TypeHelp", "click", function(event) {
  hideElement("TypeHelp");
hideElement("StatsHelp");
hideElement("BattleHelp");
showElement("TypeChart");
setText("HelpChat", "Types determine the effectiveness of each attack. For example, a fire attack such as flare blitz is ineffective against a water pokemon and does ½ of the damage. While a grass attack deals 2x damage. See the chart above for all the type advantages");
Type1 = true;
showElement("HelpNext");
});

onEvent("HelpNext", "click", function(event) {
  if (Battle3 == true){
    showElement("StatsHelp");
showElement("BattleHelp");
showElement("TypeHelp");
hideElement("HelpNext");
Battle3 = false;
    setText("HelpChat","You win when the opponent hits 0 HP. There are a total of 5 stages, each more challenging, good luck!");
  }
  if (Battle2 == true){
setText("HelpChat", "Each turn you will pick a move for your pokemon to use in order to attack the opponent, heal, or boost your pokemon, you can find the effects by hovering over each move.");
Battle2 = false;
Battle3 = true;
}

  if(Battle1 == true){
setText("HelpChat", "You should choose your pokemon based on their type and stat advantage, which you can view by hovering your mouse over the pokemons.");
Battle1 = false;
Battle2 = true;}
if (Stats2 == true){
setText("HelpChat", "The Special Attack stat determines how much damage your Pokémon causes with its special attacks. Its counterpart is special defense, which minimizes the damage of a special attack");
Stats2= false;
showElement("StatsHelp");
showElement("BattleHelp");
showElement("TypeHelp");
hideElement("HelpNext");}
if (Stats1 == true){
setText("HelpChat", "Attack determines the amount of damage your Pokémon will cause using physical attacks. The attack stat interacts with Defense, the higher the Defense, the less damage a physical attack causes")
Stats1 = false;
Stats2= true;}

if (Type1 == true){
showElement("StatsHelp");
showElement("BattleHelp");
showElement("TypeHelp");
hideElement("HelpNext");
hideElement("TypeChart");
Type1 = false;
}

});
onEvent("Back", "click", function(event) {
  setScreen("screen4");
});
onEvent("BackButtonFlags", "click", function(event) {
  setScreen("First")
});
onEvent("BackButtonInGameFlags", "click", function(event) {
  setScreen("welcome");
});
onEvent("BackButtonPokemon", "click", function(event) {
  setScreen("First");
});


onEvent("BackBtnHighScore", "click", function(event) {
  setScreen("welcome");
});
