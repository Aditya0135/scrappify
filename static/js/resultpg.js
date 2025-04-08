let Positive=document.getElementById("Positive");
let Nuteral=document.getElementById("Nuteral");
let Negative=document.getElementById("Negative");
let result_comment=document.getElementById("result_comment");

// Get results by your sentiment analysis program
// Here are example result

let result_pos= pos_num;
let result_neg= neg_num;
let result_nut= neu_num;

// Calculating percentages
let percent_pos;
let percent_neg;
let percent_nut;
let total_rev;
total_rev=result_pos+result_neg+result_nut;
percent_pos=(result_pos/total_rev*100).toFixed(2);
percent_neg=(result_neg/total_rev*100).toFixed(2);
percent_nut=(result_nut/total_rev*100).toFixed(2);

Positive.textContent=percent_pos+"%";
Negative.textContent=percent_neg+"%";
Nuteral.textContent=percent_nut+"%";


// ResultComment

result_comment.classList.remove("pos","neg","nut");
var adjustedScore = (percent_pos - percent_neg) + (percent_nut * 0.2);

// Determine comment based on adjusted score
if (adjustedScore > 35) {
    result_comment.classList.add("pos");
    result_comment.textContent = "Highly positive feedback! Customers are overwhelmingly satisfied with the product.";
} else if (adjustedScore > 10) {
    result_comment.classList.add("pos");
    result_comment.textContent = "Positive feedback! Customers generally express satisfaction with the product.";
} else if (adjustedScore >= 0) {
    result_comment.classList.add("nut");
    result_comment.textContent = "Mixed feedback! Opinions vary, suggesting a neutral sentiment overall.";
} else if (adjustedScore >= -20) {
    result_comment.classList.add("neg");
    result_comment.textContent = "Negative feedback! Customers express dissatisfaction or concerns about the product";
} else {
    result_comment.classList.add("neg");
    result_comment.textContent = "Highly negative feedback! Address urgent concerns to improve customer satisfaction.";
}

// This section generates graph

var ctx = document.getElementById('myChart').getContext('2d');
var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Positive', 'Neutral','Negative' ],
        datasets: [{
            data: [result_pos, result_nut,result_neg ],
            backgroundColor: [
                'rgb(0, 148, 0)',
                'rgb(54, 162, 235)',
                'rgb(138, 0, 0)'
            ]
        }]
    },
    options: {

        elements: {
            arc: {
                borderWidth: 0
            }
        },
        

        legend: {
            display: false
        }
    }
});

