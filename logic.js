var tableify = require('tableify');
var exports = module.exports = {};
var sorted;
var initialStatus = {
    'teams': [{
        'team': "SKT",
        'won': 6,
        'lost': 0,
        'maps won': 18,
        'maps lost': 7
    }, {
        'team': "KTR",
        'won': 4,
        'lost': 2,
        'maps won': 16,
        'maps lost': 8
    }, {
        'team': "SBN",
        'won': 3,
        'lost': 3,
        'maps won': 12,
        'maps lost': 11
    }, {
        'team': "MVP",
        'won': 3,
        'lost': 3,
        'maps won': 12,
        'maps lost': 16
    }, {
        'team': "CJE",
        'won': 2,
        'lost': 4,
        'maps won': 10,
        'maps lost': 14
    }, {
        'team': "JGW",
        'won': 3,
        'lost': 3,
        'maps won': 12,
        'maps lost': 11
    }, {
        'team': "SMG",
        'won': 3,
        'lost': 3,
        'maps won': 10,
        'maps lost': 11
    }, {
        'team': "PRM",
        'won': 0,
        'lost': 6,
        'maps won': 4,
        'maps lost': 20
    }]
};
var WorkingStatus = JSON.parse(JSON.stringify(initialStatus));
exports.cb1 = function() {
    poll("u1");
}
exports.cb2 = function() {
    poll("u2");
}
exports.cb3 = function() {
    poll("u3");
}
exports.cb4 = function() {
    poll("u4");
}
exports.cb5 = function() {
    poll("u5");
}
exports.cb6 = function() {
    poll("u6");
}
exports.cb7 = function() {
    poll("u7");
}
exports.cb8 = function() {
    poll("u8");
}
var matchresults = ["0-0", "0-0", "0-0", "0-0", "0-0", "0-0", "0-0", "0-0"];
var matrix = [
    [1, 4],
    [3, 5],
    [3, 1],
    [7, 4],
    [6, 5],
    [0, 7],
    [2, 6],
    [2, 0]
];

function poll(id) {
    var form = document.getElementById(id);
    txt = form.value;
    if (!isNaN(txt[0]) && !isNaN(txt[2])) {
        if (((Number(txt[0]) + Number(txt[2])) > 5) || ((Number(txt[0]) < 3) && (Number(txt[2]) < 3))) return;
        Number(txt[0]) > Number(txt[2]) ? document.getElementById("d" + id[1]).style.background = "#bbffbb" : document.getElementById("d" + id[1]).style.background = "#ffbbbb";
    } else {
        txt = "0-0";
    }
    matchresults[Number(id[1]) - 1] = txt;
    render();
}

function update() {
    // console.log(WorkingStatus['teams']);
    for (var m = 0; m < 8; m++) {
        l = matrix[m][0]
        r = matrix[m][1]
        WorkingStatus['teams'][l]["maps won"] += Number(matchresults[m][0])
        WorkingStatus['teams'][l]["maps lost"] += Number(matchresults[m][2])
        WorkingStatus['teams'][r]["maps lost"] += Number(matchresults[m][0])
        WorkingStatus['teams'][r]["maps won"] += Number(matchresults[m][2])
        if (matchresults[m][0] === "3") {
            WorkingStatus['teams'][l]["won"]++;
            WorkingStatus['teams'][r]["lost"]++;
            // console.log(WorkingStatus['teams'][l]["team"] + 'beat' + WorkingStatus['teams'][r]["team"]);
        } else if (matchresults[m][2] === "3") {
            WorkingStatus['teams'][r]["won"]++;
            WorkingStatus['teams'][l]["lost"]++;
            // console.log(WorkingStatus['teams'][r]["team"] + 'beat' + WorkingStatus['teams'][l]["team"]);
        }
    }
}

function render() {
    WorkingStatus = JSON.parse(JSON.stringify(initialStatus));
    update();
    sortResults()
    coalate()
        // sorted["maps won"] === undefined;
    var html = tableify(sorted);
    html = html.replace("SKT", "<span class=\"team-template-team-icon\"><span class=\"team-template-image\"><img alt=\"SK Telecom T1\" src=\"SKT1logo_std.png\" width=\"60\" height=\"25\"></a></span></span> SK Telecom T1");
    html = html.replace("KTR", "<span class=\"team-template-team-icon\"><span class=\"team-template-image\"><img alt=\"SK Telecom T1\" src=\"Rolsterlogo_std.png\" width=\"60\" height=\"25\"></a></span></span> KT Rolster");
    html = html.replace("SBN", "<span class=\"team-template-team-icon\"><span class=\"team-template-image\"><img alt=\"SK Telecom T1\" src=\"SBENUlogo_std.png\" width=\"60\" height=\"25\"></a></span></span> SBENU");
    html = html.replace("MVP", "<span class=\"team-template-team-icon\"><span class=\"team-template-image\"><img alt=\"SK Telecom T1\" src=\"MVPlogo_std.png\" width=\"60\" height=\"25\"></a></span></span> MVP");
    html = html.replace("CJE", "<span class=\"team-template-team-icon\"><span class=\"team-template-image\"><img alt=\"SK Telecom T1\" src=\"CJEntuslogo_std.png\" width=\"60\" height=\"25\"></a></span></span> CJ Entus");
    html = html.replace("JGW", "<span class=\"team-template-team-icon\"><span class=\"team-template-image\"><img alt=\"SK Telecom T1\" src=\"Green_Wings_std.png\" width=\"60\" height=\"25\"></a></span></span> Jin Air Green Wings");
    html = html.replace("SMG", "<span class=\"team-template-team-icon\"><span class=\"team-template-image\"><img alt=\"SK Telecom T1\" src=\"Samsung_galaxy_std.png\" width=\"60\" height=\"25\"></a></span></span> Samsung Galaxy");
    html = html.replace("PRM", "<span class=\"team-template-team-icon\"><span class=\"team-template-image\"><img alt=\"SK Telecom T1\" src=\"Primelogo_std.png\" width=\"60\" height=\"25\"></a></span></span> Prime");
    document.getElementById("results").innerHTML = html;
    return;
}
// render();
function sortResults() {
    sorted = WorkingStatus.teams.sort(function(a, b) {
        return (a["won"] < b["won"]) ? 1 : ((a["won"] > b["won"]) ? -1 : (((a["maps won"] - a['maps lost']) < (b["maps won"] - b['maps lost'])) ? 1 : 0));
    });
}

function coalate(){
for(var t = 0; t<8; t++)
{
    sorted[t]["map balance"] = (sorted[t]["maps won"] - sorted[t]["maps lost"]);
    delete sorted[t]["maps won"];
    delete sorted[t]["maps lost"];

}
}
window.onload = function() {
    // poll('u1');
    // poll('u2');
    // poll('u6');
    // poll('u7');
    render();
}