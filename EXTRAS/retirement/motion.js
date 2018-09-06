function overall()  {
    grabValues()
}

function grabValues() {
    $(".output-area").remove()
    var s_capital = parseFloat($("#s_capital").val()),
    s_contribution = parseFloat($("#s_contribution").val()),
    s_rate = parseFloat($("#s_rate").val()),
    s_month = parseInt($("#s_month").val()),
    b_capital = parseFloat($("#b_capital").val()),
    b_contribution = parseFloat($("#b_contribution").val()),
    b_rate = parseFloat($("#b_rate").val()),
    b_month = parseInt($("#b_month").val())

    // console.log(s_capital, s_contribution, s_month, s_rate)
    // console.log(b_capital, b_contribution, b_month, b_rate)

    for (var i=0; i<9; i++) {
        s_capital = calculate(s_capital, s_contribution, s_rate, s_month)
        b_capital = calculate(b_capital, b_contribution, b_rate, b_month)
        // console.log(s_capital)
        console.log(b_capital)
        var row = '<tr class="output-area">'
        row+='<td class="label">Year ' + +(i+1) + '</td>'
        row+='<td class="output">'+s_capital.toFixed(2)+'</td>'
        row+='<td class="output">'+(s_capital/(s_capital+b_capital)*100).toFixed(2)+'%</td>'
        row+='<td class="output">'+b_capital.toFixed(2)+'</td>'
        row+='<td class="output">'+(b_capital/(s_capital+b_capital)*100).toFixed(2)+'%</td>'
        row+="</tr>"
        //<tr>
        //     <td class="output">27%</td>
        //     <td class="output">105200</td>
        //     <td class="output">27%</td>
        // </tr>
        $("#results").append(row)
    }
}

function calculate(capital, contribution, rate, monthInvest) {
    //amount of the current year that is available to generate interest
    var portion = (12-monthInvest)/12;
    return capital + contribution + rate*(capital + (contribution * portion))
}
