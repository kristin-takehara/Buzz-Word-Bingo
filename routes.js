//jshint esversion: 6
let express = require('express');
let router = express.Router();

let buzzArr = [];
let userScore = {
  score:0
};

//'buzzword' object inside buzzArr
function buzzWord(buzzword, score) {
  this.buzzWord = buzzWord;
  this.points = points; //points or score?
  this.heard = false;
}

//If server crashes, RESET buzzword array to be COMPLETELY EMPTY!
router.post('/reset', (req, res) => {
  if(req.body.reset === true || req.body.reset === 'true') { //set RESET to be TRUE
    userScore.score = 0; //set score to 0
    buzzArr.length = 0; //set to 0 buzzwords
    res.status(200).json({ success: true });
  } else { //SET SUCCESS to be TRUE
    res.status(400).json({ success: false });
  }
});

////////////////////////////////////

//GET /buzzwords -- retrieve ALL buzzwords.
router.route('/buzzwords')
  .get((req, res) => {
    res.status(200).json({
      buzzArr: buzzArr,
      success: true
    });
  })

//POST /buzzword
  .post((req, res) => {
    let { buzzWord, points } = req.body;

    points = parseFloat(points);

    if(isNaN(points)) { //if the points is not a number... <<-- do i need this???
      res.status(400).json({
        success: false
      });
      return;
    }
//check if the word already exists in the buzzArr, if so, error.
    if (buzzArr.length > 0 && !buzzArr.every(word => word.buzzWord !== buzzWord)){
      res.status(400).json({success: false});
      return;
    }

    const word = new buzzWord(buzzWord, points);

      buzzArr.push(word);
      console.log(buzzArr);
      res.status(200).json({ success: true });
})

//PUT /buzzword
  .put((req, res) => {
  const { buzzWord, heard } = req.body;

  const index = buzzArr.findIndex(word => {
    return word.buzzWord === buzzWord;
  });

  if(index > -1) {
    buzzArr[index].heard = heard;
    userScore.score += buzzArr[index].score;
    res.status(200).json({ success: true, newScore: userScore.score });

    return;
  }

  res.status(400).json({ success: false });
})
.delete((req, res) => {
  const { buzzWord } = req.body;
  const index = buzzArr.findIndex(word => word.buzzWord === buzzWord);

  if(index > -1) {
    buzzArr.splice(index, 1);
    res.status(200).json({ success: true});
  } else {
    res.status(400).json({ success: false});
  }
});

module.exports = router;
