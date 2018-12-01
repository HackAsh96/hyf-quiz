console.log('Script loaded');
const createQuiz = function(){
  return{
    fetchQuiz:function(url){
      return fetch(url)
      .then(resp=>resp.json())
    },
    renderQuiz:function(questions){
      document.querySelector("main").style.display="block";
      questions.forEach((question)=>{

        const ul = document.getElementsByClassName("questions")[0];
        const li = document.createElement("li");
        ul.appendChild(li);
        const h2 = document.createElement("h2");
        h2.innerText=question.title;
        li.appendChild(h2);
        const p = document.createElement("p");
        p.innerText=question.content;
        li.appendChild(p);
        const select=document.createElement("select");
        question.options.forEach((option)=>{
          const answerQuest = document.createElement("option");
          answerQuest.innerText=option.content;
          select.appendChild(answerQuest);
          li.appendChild(select);
          answerQuest.value=option.correct;
        });

      });

    },
    showScore:function(timeStopped){
      let score=0;
      const selectAnswer=[...document.querySelectorAll("select")];
      const total = selectAnswer.length;
      selectAnswer.forEach((select)=>{
        const i = select.selectedIndex;
          const answer = select.options[i].value;
          if(answer=="true"){
            score ++;
            select.style.background="white";

          }
          else{
              select.style.background="#FA3E50";
            }
      });
      if(timeStopped<=60){
        let points;
        if(score>=1&&score<=total-1){
          points=10;
          points+=(score+timeStopped);
          document.querySelector("#score").style.display="none";
          document.querySelector("#reset").style.left="45%";
          document.querySelector("#reset").style.bottom="-100%";
          document.querySelector(".result").innerText=points;
        }
        else{
          points=100;
          points+=(score+timeStopped);
          document.querySelector("form").style.display="none";
          document.querySelector("#score").style.display="none";
          document.querySelector("#reset").style.left="45%";
          document.querySelector("#reset").style.bottom="-100%";
          document.querySelector("#finalScore").style.display="block";
        }
        const p=document.querySelector("#finalScore").innerText=points;
}
      if(score==total){

        const confetti = new ConfettiGenerator({ target: 'confetti' });
        confetti.render();
      }
    }

  }
}

const url="https://gist.githubusercontent.com/benna100/13f5850bf78f59d9baea915cbbe9f258/raw/ef8f2b137b07b05e8f593cef0281b4f1f0aba79a/JS-3%2520questions";

function start(){
  const hyfQuiz=createQuiz();
  document.querySelector("#startQuiz").style.display="none";
  document.querySelector("#info").style.display="none";
 hyfQuiz.fetchQuiz(url)
  .then((questions)=>hyfQuiz.renderQuiz(questions));
  let userAnswered = false;
  let time = 0;
  const timeContainer = document.getElementById("time");
  function increaseTime(){
      if (userAnswered) {
          return;
      }
      time++;
      timeContainer.innerText = time;
      setTimeout(increaseTime, 1000);
  }
  increaseTime();
    document.querySelector('button#score').addEventListener('click',()=>{
        hyfQuiz.showScore(time)
        userAnswered=true;
    });


}
function reloadPage() {
    window.location.reload(true)
}
