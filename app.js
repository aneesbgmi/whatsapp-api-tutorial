const { Client, MessageMedia } = require('whatsapp-web.js');
const express = require('express');
const { body, validationResult } = require('express-validator');
const socketIO = require('socket.io');
const qrcode = require('qrcode');
const http = require('http');
const fs = require('fs');
const { phoneNumberFormatter } = require('./helpers/formatter');
const fileUpload = require('express-fileupload');
const axios = require('axios');
const mime = require('mime-types');
const { Buttons, List } = require('whatsapp-web.js');
const { getgroups } = require('process');


const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(fileUpload({
  debug: true
}));

const SESSION_FILE_PATH = './whatsapp-session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: __dirname
  });
});

const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ],
  },
  session: sessionCfg
});
///--------------------------------------------------------------------------------------------///


client.on('message', message => {
	if(message.body === 'Hi'||message.body === 'hi'||message.body === 'hlo') {
		client.sendMessage(message.from, '🤖Bot is currently in Beta stage some note will not be available right now we will be adding soon Feel free to Report Bug using !Bug Thanks❤️');

     client.sendMessage(message.from, new List('Select option From the List', 'View Menu', [{title: 'Main Menu', rows: [{id: 'studymaterials', title: 'Study Material'}, {id: 'Request Materials', title: 'Request Study Materials'},{id: 'sbte update', title: 'Subscribe For SBTE Notification'},{id: 'whoiami', title: 'About me'}]}] ,'Hi There👋 \n Iam a programmed For Assist you For Finding Study Materials', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
  
      }
      switch(message.body){
        
        case 'Study Material'://client.sendMessage(message.from,'Study Material 📚');
        client.sendMessage(message.from, new List('Select option From the List', 'View Department',[{title: 'Select Deaprtment', rows: [{id: 's1', title: 'S1'},{id: 's2', title: 'S2'},{id: 'mech', title: 'Mechanical'},{id: 'auto', title: 'Automobile'},{id: 'Electric', title: 'Electrical'},{id: 'Electronic', title: 'Electronics'},{id: 'civil', title: 'Civil'},{id: 'Computer', title: 'Computer'}]}] ,'Select Your Department', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
        
          break;
        case 'Request Materials Material':client.sendMessage(message.from,'Request Materials Material 🔰');
        
        break;
        case 'Subscribe For SBTE Notification':client.sendMessage(message.from,'Subscribe For SBTE Notification');
        
        break;

        case 'About me':client.sendMessage(message.from,'About me');
        
        break;  
      
      }
    
  
    });

//====================subject name and semester=================================//

    client.on('message',message =>{

      if(message.body=='S1'){
      client.sendMessage(message.from, new List('Select Subject', 'S1 Subjects',[{title: 'Select Subject', rows: [{id: 'English', title: 'English-1'},{id: 'Physics', title: 'Physics-1'},{id: 'Chemistry', title: 'Chemistry-1'},{id: 'maths', title: 'Maths-1'}]}] ,'S1 Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
      }

    });


    client.on('message',message =>{
      if(message.body=='S2'){
 client.sendMessage(message.from, new List('Select Subject', 'S2 Subjects',[{title: 'Select Subject', rows: [{id: 'English', title: 'English-2'},{id: 'Physics', title: 'Physics-2'},{id: 'Chemistry', title: 'Chemistry-2'},{id: 'maths', title: 'Maths-2'}]}] ,'S2 Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
  }
  });


    client.on('message',message =>{

if (message.body=='Mechanical'){

  client.sendMessage(message.from, new List('Select Semester', 'Select',[{title: 'Select Semester', rows: [{id: 's2', title: 'ME-S2'},{id: 's3', title: 'ME-S3'},{id: 's4', title: 'ME-S4'},{id: 's5', title: 'ME-S5 '},{id: 's5', title: 'ME-S6'}]}] ,'Mechanical Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
      
}
else if(message.body=='Automobile')
{
  client.sendMessage(message.from, new List('Select Semester', 'Select',[{title: 'Select Semester', rows: [{id: 's2', title: 'AU-S2'},{id: 's3', title: 'AU-S3'},{id: 's4', title: 'AU-S4'},{id: 's5', title: 'AU-S5'},{id: 's6', title: 'AU-S6'}]}] ,' 	Automobile Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
  } 
  else if(message.body=='Electrical')
{
  client.sendMessage(message.from, new List('Select Semester', 'Select',[{title: 'Select Semester', rows: [{id: 's2', title: 'EEE-S2'},{id: 's3', title: 'EEE-S3'},{id: 's4', title: 'EEE-S4'},{id: 's5', title: 'EEE-S5'},{id: 's5', title: 'EEE-S6'}]}] ,'Electrical & Electronics Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
  } 
  else if(message.body=='Electronics')
{
  client.sendMessage(message.from, new List('Select Semester', 'Select',[{title: 'Select Semester', rows: [{id: 's2', title: 'EC-S2'},{id: 's3', title: 'EC-S3'},{id: 's4', title: 'EC-S4'},{id: 's5', title: 'EC-S5'},{id: 's5', title: 'EC-S6'}]}] ,'Electronics and Communication', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
  } 
  else if(message.body=='Civil')
{
  client.sendMessage(message.from, new List('Select Semester', 'Select',[{title: 'Select Semester', rows: [{id: 's2', title: 'CE-S2'},{id: 'CE-S3', title: 'CE-S3'},{id: 'CE-S4', title: 'CE-S4'},{id: '5', title: 'CE-S5'},{id: 's5', title: 'CE-S6'}]}] ,' 	Civil Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
  } 
  else if(message.body=='Computer')
  {
    client.sendMessage(message.from, new List('Select Semester', 'Select',[{title: 'Select Semester', rows: [{id: 's2', title: 'CT-S2'},{id: 's3', title: 'CT-S3'},{id: 's4', title: 'CT-S4'},{id: 's5', title: 'CT-S5'},{id: 's6', title: 'CT-S6'}]}] ,'SemComputer Computer Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    } 
});



//--------------------request section------------------------

client.on('message',message =>{

  if(message.body=='Request Study Materials'){
    message.reply('You Can Request any File In Following Following Formate👇\n*#request Department Sem Subject Name(description)* \n\n ```Eg: #request Mech S4 Thermal(shortnote)```' )

  }

})



    client.on('message',message =>{

      if(message.body.startsWith("#request")){
        message.reply('request has been Forwarded to admin🤝')
        client.sendMessage("+447148329123@c.us",message.body);
        
      }
    
    })


    //--------------------------S1 Subjects-----------------------------------


    client.on('message',message =>{

     if(message.body=='English-1'){

      message.reply('English Text book⬇️\nhttps://bit.ly/3rlBU5I')

     }

    })

    client.on('message',message =>{

      if(message.body=='Physics-1'){
 
       message.reply('Note➡️https://bit.ly/3r7Jkt2 \n Unit 2⬇️ \nhttps://bit.ly/3fi44sv \nUnit 3⬇️ \nhttps://bit.ly/3qjDfdL \nUnit 4⬇️\nhttps://bit.ly/3tlnBQX \n Unit 5⬇️\nhttps://bit.ly/3K4b0Yq \nUnit 6⬇️\nhttps://bit.ly/34RFOf3\nUnit 7⬇️\nhttps://bit.ly/3rgm5gw')
  }  
     })


     client.on('message',message =>{

      if(message.body=='Chemistry-1'){
 
       message.reply('Chemistry Text book⬇️\nhttps://bit.ly/33v67qu \nChemistry Note 1⬇️\n https://bit.ly/3tp0rtg \npdf➡️https://bit.ly/3FoAkon')
 
      }
 
     })


     client.on('message',message =>{

      if(message.body=='Maths-1'){
 
       message.reply('Maths 1 Text book⬇️\nhttps://bit.ly/3fpCNEo\nTrignometry⬇\n️https://bit.ly/3Gsfx4F\nlimits➡️https://bit.ly/34RFixD')
      }
  })
 




//--------------------------S2 Subjects-----------------------------------


client.on('message',message =>{

 if(message.body=='English-2'){

  message.reply('not Avaliable \n *adding soon !*')

 }

})

client.on('message',message =>{

  if(message.body=='Physics-2'){
    
    message.reply('CIRCULAR MOTION➡️ https://bit.ly/3rdecIvPHYSICS \nNOTES⬇️\nhttps://bit.ly/3K7Sm1H \nPhysics 2 full note⬇️\n https://bit.ly/3rlFVqO\n  ROTATIONAL DYNAMICS⬇️ \n https://bit.ly/3toxFJd')
}  
 })


 client.on('message',message =>{

  if(message.body=='Chemistry-2'){

   message.reply('ATOMIC STRUCTURE & CHEMICAL BONDING⬇️\n https://bit.ly/3fiWs90 \nimportant Questions & Answers⬇️ \nhttps://bit.ly/3fmoC2Y')

  }

 })


 client.on('message',message =>{

  if(message.body=='Maths-2'){

   message.reply('Maths2 Note 1⬇️\nhttps://bit.ly/3KbnwWi \nmaths2 Note 2⬇️\nhttps://bit.ly/3tkjy7D')
  }
})

////==============================CT===S2======================================================
    
client.on('message',message =>{
  if(message.body=='CT-S2'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'c', title: 'Programming in C'}]}] ,'Computer Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Programming in C'){
  
    message.reply('Module 1 ⬇️\nhttps://bit.ly/polynotes2ctcm1 \nModule 3 ⬇️\nhttps://bit.ly/polynotes2ctcm3 \nModule 4 ⬇️ \nhttps://bit.ly/polynotes2ctcm4')
}
});

////==============================CT===S3======================================================

client.on('message',message =>{
  if(message.body=='CT-S3'){
    //client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'c', title: 'Programmineeeeeeeg in C'}]}] ,'Computer Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'dcp', title: 'Digital Computer Principles'},{id: 'dbms', title: 'Database Management System'},{id: 'ca', title: 'Computer Architecture'},{id: 'oop', title: 'Object Oriented Programming'},{id: 'esdm', title: 'Environmental Science & Disaster Management'}]}] ,'Computer Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});  
  }});

  client.on('message',message =>{
  if(message.body=='Digital Computer Principles'){
  
    message.reply('Module 1&2 ⬇️\nhttps://bit.ly/polynotes3ctdcp12 \nModule 3&4 ⬇\n️ https://bit.ly/polynotects3dcp34')
}
else if(message.body=='Database Management System'){
  
  message.reply('Module 2 ⬇️\nhttps://bit.ly/polynotes3dbmsm2 \nhttps://bit.ly/polynotects3dbmsm21')
}
else if(message.body=='Computer Architecture'){
  
  message.reply('Note ⬇️\nhttps://bit.ly/poiynotects3ca \nModule 2 ⬇️ \n https://bit.ly/polynotects3cam2 \nModule 3 ⬇️ \n https://bit.ly/polynotects3cam3 \nModule 4 ⬇️ \nhttps://bit.ly/polynotects3cam4')
}
else if(message.body=='Object Oriented Programming'){
  
  message.reply('Note ⬇️\nhttps://bit.ly/3I2ggd8')
}
else if(message.body=='Environmental Science & Disaster Management'){
  
  message.reply('Module 1 ⬇️\nhttps://bit.ly/polynotects3esdmm1 \nModule 2 ⬇️\nhttps://bit.ly/polynotects3esdmm2 \nModule 3 ⬇️\nhttps://bit.ly/polynotects3esdmm3')
}
});

////==============================CT===S4======================================================

client.on('message',message =>{
  if(message.body=='CT-S4'){
    
    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'dc', title: 'Data Communication'},{id: 'os', title: 'Operating Systems'},{id: 'ds', title: 'Data Structures'},{id: 'CSh', title: 'Computer System Hardware'}]}] ,'Computer Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});  
  }});

  client.on('message',message =>{
  if(message.body=='Data Communication'){
  
    message.reply('module 2 ⬇️ \n https://bit.ly/polynotes4ctm211 \n Module 3 ⬇️ \n https://bit.ly/polynotects4dcm3')
}
else if(message.body=='Operating Systems'){
  
  message.reply('Module 1 ⬇️\n https://bit.ly/polynotects4osm1 \n https://bit.ly/3GqOeHU \nModule 2 ⬇️\n  https://bit.ly/33sml3G \nhttps://bit.ly/3nl1BBS \nModule 3 ⬇️\n https://bit.ly/3zWeVlf \nModule 4 ⬇️\n https://bit.ly/polynotects4osm4 \n https://bit.ly/3GErhRX \n https://bit.ly/3fkkUae \nhttps://bit.ly/3tmqdy5')
}
else if(message.body=='Data Structures'){
  
  message.reply('Module 1 ⬇️ \nhttps://bit.ly/polynotects4dsm1 \n Module 2 ⬇️ \nhttps://bit.ly/polynotects4dsm2 \nModule 3 ⬇️ \nhttps://bit.ly/polynotects4dsm3 \n Module 4 ⬇️ \nhttps://bit.ly/polynotects4dsm4')
}
else if(message.body=='Computer System Hardware'){
  
  message.reply('Module 1 ⬇️ \nhttps://bit.ly/polynotects4cshm1 \nModule 2 ⬇️ \nhttps://bit.ly/polynotects4cshm2 \nModule 3 ⬇️ \nhttps://bit.ly/polynotects4cshm3 \nhttps://bit.ly/polynotects4cshm31\n Module 4 ⬇️ \nhttps://bit.ly/polynotects4cshm4')
}
});

////==============================CT===S5======================================================
    
client.on('message',message =>{
  if(message.body=='CT-S5'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'pmse', title: 'PMSE'},{id: 'wp', title: 'Web Programming'},{id: 'mp', title: 'Microprocessor and Interfacing'},{id: 'cloud', title: 'Cloud Computing'}]}] ,'Computer Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='PMSE'){
  
    message.reply('Module 1 ⬇️\nhttps://bit.ly/polynotects5pmsem1 \nModule 2 ⬇️ \nhttps://bit.ly/polynotects5pmsem2 \nModule 3 ⬇️ \nhttps://bit.ly/polynotes5ctpmsem3 \nModule 4 ⬇️ \nhttps://bit.ly/polynotects5pmsem4')
}
else if(message.body=='Web Programming'){
  
  message.reply('Module 1 ⬇️ \nhttps://bit.ly/polynotes5ctwpm1 \nModule 2 ⬇️\nhttps://bit.ly/polynotects5wpm2 \nCSS➡️ https://bit.ly/polynotects5wpcss \nJS➡️ https://bit.ly/polynotes5ctwpjava\n Module 3&4 ⬇️\nhttps://bit.ly/polynotes5ctwpm34')
}
else if(message.body=='Microprocessor and Interfacing'){
  message.reply('Module 1 ⬇️\nhttps://bit.ly/polynotects5mpm1 \nModule 2 ⬇️\nhttps://bit.ly/polynotects5mpm2 \nModule 3 ⬇️\n https://bit.ly/polynotects5mpm3 \nModule 4 ⬇️\nhttps://bit.ly/polynotes5ctmpm4')
}
else if(message.body=='Cloud Computing'){
  message.reply('Module 1 ⬇️\nhttps://bit.ly/polynotects5cm1 \nModule 2 ⬇️\nhttps://bit.ly/polynotects5cm2 \nModule 3⬇️\nhttps://bit.ly/polynotects5m3 \nModule 4 ⬇️\nhttps://bit.ly/polynotects5cm4')
}
});

////==============================CT===S6======================================================
    
client.on('message',message =>{
  if(message.body=='CT-S6'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'sdpgrm', title: 'Smart Device Programming'},{id: 'nim', title: 'Network Infrastructure Mangagement'},{id: 'mcct', title: 'Mobile Communication'},{id: 'cnnn', title: 'Computer Networks'}]}] ,'Computer Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Microcontrollers'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Network Infrastructure Mangagement'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Smart Device Programming'){
  message.reply('*Adding soon!*')
}
else if(message.body=='Mobile Communication'){
  message.reply('*Adding soon!*')
}
else if(message.body=='Computer Networks'){
  message.reply('*Adding soon!*')
}
});


////==============================mech===S2======================================================


client.on('message',message =>{
  if(message.body=='ME-S2'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'bmes1mech', title: 'Basic Mechanical Engineering'}]}] ,'Mechanical Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Basic Mechanical Engineering'){
  
    message.reply('*Adding soon!*')
}
});
////==============================mech===S3======================================================

client.on('message',message =>{
  if(message.body=='ME-S3'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Electrical & Electronics Engg.'},{id: 'mech', title: 'Manufacturing Process'},{id: 'mech', title: 'Fluid Mechanics & Pneumatics'},{id: 'mech', title: 'Environmental Science & Disaster Management'}]}] ,'Mechanical Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Electrical & Electronics Engg.'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Manufacturing Process'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Fluid Mechanics & Pneumatics'){
  
  message.reply('*Adding soon!*')
}
});


////==============================mech===S4======================================================

client.on('message',message =>{
  if(message.body=='ME-S4'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Metullurgy & Machine Tools'},{id: 'mech', title: 'Automobile Engineering'},{id: 'mech', title: 'Applied Mechanics and Strength of Materials'},{id: 'mech', title: 'Thermal Engineering'},{id: 'mech', title: 'Production Drawing'}]}] ,'Mechanical Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Metullurgy & Machine Tools'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Automobile Engineering'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Applied Mechanics and Strength of Materials'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Thermal Engineering'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Production Drawing'){
  
  message.reply('*Adding soon!*')
}
});

////==============================mech===S5======================================================

client.on('message',message =>{
  if(message.body=='ME-S5'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Industrial Management & Safety'},{id: 'mech', title: 'Design of Machine Elements'},{id: 'mech', title: 'Industrial Engineering'},{id: 'mech', title: ' 	Power Plant Engineering'}]}] ,'Mechanical Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Industrial Management & Safety'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Design of Machine Elements'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Industrial Engineering'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Power Plant Engineering'){
  
  message.reply('*Adding soon!*')
}
});

////==============================mech===S6======================================================

client.on('message',message =>{
  if(message.body=='ME-S6'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Hydraulic Machines'},{id: 'mech', title: 'Advanced Production Processes'},{id: 'mech', title: 'Refrigeration & Air Conditioning'},{id: 'mech', title: 'Industrial Automation & Mechatronics'},{id: 'mech', title: 'CAD-CAM'},{id: 'mech', title: 'Maintenance Engineering'}]}] ,'Mechanical Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Hydraulic Machines'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Advanced Production Processes'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Refrigeration & Air Conditioning'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Industrial Automation & Mechatronics'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='CAD-CAM'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Maintenance Engineering'){
  
  message.reply('*Adding soon!*')
}
});

///==============================Auto===S2======================================================


client.on('message',message =>{
  if(message.body=='AU-S2'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'bmes1mech', title: 'Automobile Power Plant'}]}] ,'Automobile Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Automobile Power Plant')
  {
    message.reply('*Adding soon!*')
  }
});


////==============================Auto===S3======================================================

client.on('message',message =>{
  if(message.body=='AU-S3'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Electrical & Electronics Engg'},{id: 'mech', title: 'Production Process of Automobile Components'},{id: 'mech', title: 'Fluid Mechanics & Machinery'},{id: 'mech', title: 'Environmental Science & Disaster Management'}]}] ,'Automobile Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Electrical & Electronics Engg'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Production Process of Automobile Components'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Fluid Mechanics & Machinery'){
  
  message.reply('*Adding soon!*')
}
});
////==============================auto===S4======================================================

client.on('message',message =>{
  if(message.body=='AU-S4'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Applied Thermodynamics'},{id: 'mech', title: 'Material Science & Strength of Materials'},{id: 'mech', title: 'Automobile Electrical & Electronic Systems'}]}] ,'Automobile Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Applied Thermodynamics'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Material Science & Strength of Materials'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Automobile Electrical & Electronic Systems'){
  
  message.reply('*Adding soon!*')
}
});
////==============================Auto===S5======================================================

client.on('message',message =>{
  if(message.body=='AU-S5'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Industrial Management & Safety'},{id: 'mech', title: 'Automobile Design'},{id: 'mech', title: 'Automobile Transmission'},{id: 'mech', title: 'Fuels and Combustion'}]}] ,'Automobile Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Industrial Management & Safety'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Automobile Design'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Automobile Transmission'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Fuels and Combustion'){
  
  message.reply('*Adding soon!*')
}
});

////==============================Auto===S6======================================================

client.on('message',message =>{
  if(message.body=='AU-S6'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Transport Management'},{id: 'mech', title: 'Automobile Servicing & Maintenance'},{id: 'mech', title: 'Automobile Chassis'},{id: 'mech', title: 'Industrial Automation & Mechatronics'},{id: 'mech', title: 'Advanced Automobile Engineering'}]}] ,'Automobile Engineering Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Transport Management'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Automobile Servicing & Maintenance'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Automobile Chassis'){
  
  message.reply('*Adding soon!*')
}
//else if(message.body=='Industrial Automation & Mechatronics'){
  
 // message.reply('*Adding soon!*')
//}
else if(message.body=='Advanced Automobile Engineering'){
  
  message.reply('*Adding soon!*')
}
});


//==============================EEE===S2======================================================


client.on('message',message =>{
  if(message.body=='EEE-S2'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'bees2eee', title: 'Basic Electrical Engineering'}]}] ,'EEE Subjects', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Basic Electrical Engineering')
  {
    message.reply('*Adding soon!*')
  }
});


////==============================EEEE===S3======================================================

client.on('message',message =>{
  if(message.body=='EEE-S3'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Electrical Measuring Instruments'},{id: 'mech', title: 'Analog Devices & Circuits'},{id: 'mech', title: 'Fundamentals of AC Systems'},{id: 'mech', title: 'Mechanical Engineering '},{id: 'mech', title: 'Environmental Science & Disaster Management'}]}] ,'Electrical & Electronics Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Electrical Measuring Instruments'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Analog Devices & Circuits'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Fundamentals of AC Systems '){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Mechanical Engineering '){
  
  message.reply('*Adding soon!*')
}
});
////==============================EEEE===S4======================================================

client.on('message',message =>{
  if(message.body=='EEE-S4'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'EPGT&D'},{id: 'mech', title: 'Electrical Estimating and Costing'},{id: 'mech', title: 'DC Machines'},{id: 'mech', title: 'Digital Electronics & Microprocessors'},{id: 'mech', title: 'Electrical Engineering Drawing'}]}] ,'Electrical & Electronics Engineering ', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='EPGT&D'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Electrical Estimating and Costing'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='DC Machines'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Digital Electronics & Microprocessors'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Electrical Engineering Drawing'){
  
  message.reply('*Adding soon!*')
}
});
////==============================EEEE===S5======================================================

client.on('message',message =>{
  if(message.body=='EEE-S5'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Industrial Management & Safety'},{id: 'mech', title: 'Induction Machines'},{id: 'mech', title: 'Power Electronics'},{id: 'mech', title: 'Renewable Energy Sources'},{id: 'mech', title: 'Electrical Engineering Materials'}]}] ,'Electrical & Electronics Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Industrial Management & Safety'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Induction Machines'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Power Electronics'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Renewable Energy Sources'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Electrical Engineering Materials'){
  
  message.reply('*Adding soon!*')
}
});

////==============================EEEE===S6======================================================

client.on('message',message =>{
  if(message.body=='EEE-S6'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Synchronous Machines & FHP Motors'},{id: 'mech', title: 'EPU & System Protection'},{id: 'mech', title: 'Microcontrollers and PLC'},{id: 'mech', title: 'Electrical Devices & Controls'},{id: 'mech', title: 'Electrical Machine Design'},{id: 'mech', title: 'Industrial Automation'}]}] ,'Electrical & Electronics Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Synchronous Machines & FHP Motors'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='EPU & System Protection'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Microcontrollers and PLC'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Electrical Devices & Controls'){
  
 message.reply('*Adding soon!*')
}
else if(message.body=='Electrical Machine Design'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Industrial Automation'){
  
  message.reply('*Adding soon!*')
}
});

//==============================EC===S2======================================================


client.on('message',message =>{
  if(message.body=='EC-S2'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'bees2eee', title: 'Basic Electronics'}]}] ,'Electronic Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Basic Electronics')
 {
    message.reply('*Adding soon!*')
  }
});


////==============================EC===S3======================================================

client.on('message',message =>{
  if(message.body=='EC-S3'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Electrical Technology'},{id: 'mech', title: 'Electronic Devices & Circuits'},{id: 'mech', title: 'Digital Electronics '},{id: 'mech', title: 'Communication Engineering'},{id: 'mech', title: 'Environmental Science & Disaster Management'}]}] ,' Electronics Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Electrical Technology'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Electronic Devices & Circuits'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Digital Electronics'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Communication Engineering'){
  
  message.reply('*Adding soon!*')
}
});
////==============================EC===S4======================================================

client.on('message',message =>{
  if(message.body=='EC-S4'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Linear Integrated Circuits'},{id: 'mech', title: 'Electronics Instruments & Measurements'},{id: 'mech', title: 'Microcontroller and Interfacing'},{id: 'mech', title: 'Programming in C '}]}] ,' Electronics Engineering ', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Linear Integrated Circuits'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Electronics Instruments & Measurements'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Microcontroller and Interfacing'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Programming in C '){
  
  message.reply('*Adding soon!*')
}
});
////==============================Ec===S5======================================================

client.on('message',message =>{
  if(message.body=='EC-S5'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Industrial Management & Safety'},{id: 'mech', title: 'Embedded System'},{id: 'mech', title: 'Industrial Electronics & PLC'},{id: 'mech', title: 'Control System'},{id: 'mech', title: 'Medical Electronics'},{id: 'mech', title: 'Optical Fibre Communication'}]}] ,'Electronics Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Industrial Management & Safety'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Embedded System'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Industrial Electronics & PLC'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Control System'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Medical Electronics'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Optical Fibre Communication'){
  
  message.reply('*Adding soon!*')
}
});

////==============================Ec===S6======================================================

client.on('message',message =>{
  if(message.body=='EC-S6'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Communication Systems'},{id: 'mech', title: 'Computer Hardware & Networking'},{id: 'mech', title: 'Advanced Microprocessors'},{id: 'mech', title: 'Radar and Navigation'},{id: 'mech', title: 'Television Engineering'},{id: 'mech', title: 'Digital Signal Processing'}]}] ,' Electronics Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Communication Systems'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Computer Hardware & Networking'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Advanced Microprocessors'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Radar and Navigation'){
  
 message.reply('*Adding soon!*')
}
else if(message.body=='Television Engineering'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Digital Signal Processing'){
  
  message.reply('*Adding soon!*')
}
});
//==============================CE===S2======================================================


client.on('message',message =>{
  if(message.body=='CE-S2'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'cess2', title: 'Surveying I'}]}] ,'Civil Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Surveying I')
 {
    message.reply('*Adding soon!*')
  }
});


////==============================CE===S3======================================================

client.on('message',message =>{
  if(message.body=='CE-S3'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Theory of Structures I'},{id: 'mech', title: 'Surveying II'},{id: 'mech', title: 'Construction Materials and Engineering'},{id: 'mech', title: 'Building Planning & Drawing'},{id: 'mech', title: 'Environmental Science & Disaster Management'}]}] ,' Civil Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Theory of Structures I'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Surveying II'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Construction Materials and Engineering'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Building Planning & Drawing'){
  
  message.reply('*Adding soon!*')
}
});
////==============================CE===S4======================================================

client.on('message',message =>{
  if(message.body=='CE-S4'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Theory of Structures II'},{id: 'mech', title: 'Quantity Surveying I'},{id: 'mech', title: 'Hydraulics'},{id: 'mech', title: 'Irrigation Engineering'}]}] ,' Civil Engineering ', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Theory of Structures II'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Quantity Surveying I'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Hydraulics'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Irrigation Engineering'){
  
  message.reply('*Adding soon!*')
}
});
////==============================CE===S5======================================================

client.on('message',message =>{
  if(message.body=='CE-S5'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Construction Management & Safety Engineering'},{id: 'mech', title: 'Structural Design I'},{id: 'mech', title: 'Geotechnical Engineering'},{id: 'mech', title: 'Quantity Surveying II'},{id: 'mech', title: 'Building Maintenance & Services'},{id: 'mech', title: 'Habitat Technology'}]}] ,'Civil Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Construction Management & Safety Engineering'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Structural Design I'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Geotechnical Engineering'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Quantity Surveying II'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Building Maintenance & Services'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Habitat Technology'){
  
  message.reply('*Adding soon!*')
}
});

////==============================CE===S6======================================================

client.on('message',message =>{
  if(message.body=='CE-S6'){

    client.sendMessage(message.from, new List('Select Subject', 'Subjects',[{title: 'Select Subject', rows: [{id: 'mech', title: 'Structural Design II'},{id: 'mech', title: 'Environmental Engineering'},{id: 'mech', title: 'Transportation Engineering '},{id: 'mech', title: 'Concrete Technology'},{id: 'mech', title: 'Design of Pre-stressed Concrete'},{id: 'mech', title: 'Ground Improvement Technique'},{id: 'mech', title: 'Structural & Irrigation Engineering Drawing'}]}] ,' Civil Engineering', 'Footer here'), {caption: 'if you used a MessageMedia instance, use the caption here'});
    
  }
  if(message.body=='Structural Design II'){
  
    message.reply('*Adding soon!*')
}
else if(message.body=='Environmental Engineering'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Transportation Engineering '){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Concrete Technology'){
  
 message.reply('*Adding soon!*')
}
else if(message.body=='Design of Pre-stressed Concrete'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Ground Improvement Technique'){
  
  message.reply('*Adding soon!*')
}
else if(message.body=='Structural & Irrigation Engineering Drawing'){
  
  message.reply('*Adding soon!*')
}
});































///--------------------------------------------------------------------------------------------///
client.initialize();

// Socket IO
io.on('connection', function(socket) {
  socket.emit('message', 'Connecting...');

  client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.toDataURL(qr, (err, url) => {
      socket.emit('qr', url);
      socket.emit('message', 'QR Code received, scan please!');
    });
  });

  client.on('ready', () => {
    socket.emit('ready', 'Whatsapp is ready!');
    socket.emit('message', 'Whatsapp is ready!');
  });

  client.on('authenticated', (session) => {
    socket.emit('authenticated', 'Whatsapp is authenticated!');
    socket.emit('message', 'Whatsapp is authenticated!');
    console.log('AUTHENTICATED', session);
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(err) {
      if (err) {
        console.error(err);
      }
    });
  });

  client.on('auth_failure', function(session) {
    socket.emit('message', 'Auth failure, restarting...');
  });

  client.on('disconnected', (reason) => {
    socket.emit('message', 'Whatsapp is disconnected!');
    fs.unlinkSync(SESSION_FILE_PATH, function(err) {
        if(err) return console.log(err);
        console.log('Session file deleted!');
    });
    client.destroy();
    client.initialize();
  });
});


const checkRegisteredNumber = async function(number) {
  const isRegistered = await client.isRegisteredUser(number);
  return isRegistered;
}

// Send message
app.post('/send-message', [
  body('number').notEmpty(),
  body('message').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  const number = phoneNumberFormatter(req.body.number);
  const message = req.body.message;

  const isRegisteredNumber = await checkRegisteredNumber(number);

  if (!isRegisteredNumber) {
    return res.status(422).json({
      status: false,
      message: 'The number is not registered'
    });
  }

  client.sendMessage(number, message).then(response => {
    res.status(200).json({
      status: true,
      response: response
    });
  }).catch(err => {
    res.status(500).json({
      status: false,
      response: err
    });
  });
});




const findGroupByName = async function(name) {
  const group = await client.getChats().then(chats => {
    return chats.find(chat => 
      chat.isGroup && chat.name.toLowerCase() == name.toLowerCase()
    );
  });
  return group;
}

// Send message to group
// You can use chatID or group name, yea!
app.post('/send-group-message', [
  body('id').custom((value, { req }) => {
    if (!value && !req.body.name) {
      throw new Error('Invalid value, you can use `id` or `name`');
    }
    return true;
  }),
  body('message').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  let chatId = req.body.id;
  const groupName = req.body.name;
  const message = req.body.message;

  // Find the group by name
  if (!chatId) {
    const group = await findGroupByName(groupName);
    if (!group) {
      return res.status(422).json({
        status: false,
        message: 'No group found with name: ' + groupName
      });
    }
    chatId = group.id._serialized;
  }

  client.sendMessage(chatId, message).then(response => {
    res.status(200).json({
      status: true,
      response: response
    });
  }).catch(err => {
    res.status(500).json({
      status: false,
      response: err
    });
  });
});

// Clearing message on spesific chat
app.post('/clear-message', [
  body('number').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  const number = phoneNumberFormatter(req.body.number);

  const isRegisteredNumber = await checkRegisteredNumber(number);

  if (!isRegisteredNumber) {
    return res.status(422).json({
      status: false,
      message: 'The number is not registered'
    });
  }

  const chat = await client.getChatById(number);
  
  chat.clearMessages().then(status => {
    res.status(200).json({
      status: true,
      response: status
    });
  }).catch(err => {
    res.status(500).json({
      status: false,
      response: err
    });
  })
});

server.listen(port, function() {
  console.log('App running on *: ' + port);
});
