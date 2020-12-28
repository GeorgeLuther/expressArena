const e = require('express')
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('common'))

app.get('/pizza',(req, res)=> {
    res.send('Sounds yumbus!')
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
    res.send(responseText);
  });

app.get('/queryViewer', (req, res) => {
console.log(req.query);
res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
  });
// 1. 
app.get('/sum',(req, res)=> {
    const a = Number(req.query.a)
    const b = Number(req.query.b)
    if (!a || !b) return res.status(400).send('Please provide two numbers via query parameters a & b')
    const sum = a+b
    res.send(`The sum of ${a} and ${b} is ${sum}`)
})
// 2.
app.get('/cipher',(req,res)=>{
    const text=req.query.text
    
    const shift= Number(req.query.shift)

    if (!text) return res.status(400).send('Please provide a string of alphabetically letters via query parameter text.')
    if (!shift) return res.status(400).send('Please provide a number via query parameter shift.')
    
    let codeArr = text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97)
        } else if (char.match(/[A-Z]/i)) {
            return String.fromCharCode(((char.charCodeAt(0) + 65 + shift ) % 26) + 65)
        } char
    })
    
    res.send(codeArr.join(''))
})
app.get('/lotto',(req,res)=>{
    
    const numbers = req.query.numbers
    let outOfRange = false

    if (numbers.length !== 6) res.status(400).send('Please provide an array called numbers with 6 values')
    numbers.forEach(num=> {
        if (num < 1 || num > 20) {
            outOfRange = true
        }
    })

    if (outOfRange) res.status(400).send('Values must be between 1 and 20')
    
    let winArr = []
    for (let i=0; i<6;i++) {
        winArr.push((Math.floor(Math.random()*Math.floor(20))+1))
    }

    const count = numbers.reduce((total, number) => {
        return total + winArr.includes(number);
    }, 0);
    

    if (count < 4) {
        res.send(`Sorry, you lose. ${winArr} vs ${numbers}`)
    } else if (count === 4) {
        res.send(`Congratulations, you win a free ticket. ${winArr} vs ${numbers}`)
    } else if (count === 5) {
        res.send("Congratulations, you win $100")
    } else if (count === 6) {
        res.send("Wow! Unbelievable! You could have won the mega millions!")
    }
})

app.listen(8000, ()=> {
    console.log('Listening on 8000')
})

