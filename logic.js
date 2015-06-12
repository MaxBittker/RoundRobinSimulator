var tableify = require('tableify');
var exports = module.exports = {};
var sorted;
var initialStatus = {
    'teams': [{
        'team': "SKT",
        'won': 5,
        'lost': 0,
        'maps won': 15,
        'maps lost': 6
    }, {
        'team': "KTR",
        'won': 3,
        'lost': 2,
        'maps won': 13,
        'maps lost': 8
    }, {
        'team': "SBN",
        'won': 3,
        'lost': 2,
        'maps won': 11,
        'maps lost': 8
    }, {
        'team': "MVP",
        'won': 3,
        'lost': 2,
        'maps won': 12,
        'maps lost': 12
    }, {
        'team': "CJE",
        'won': 2,
        'lost': 3,
        'maps won': 10,
        'maps lost': 11
    }, {
        'team': "JGW",
        'won': 2,
        'lost': 3,
        'maps won': 9,
        'maps lost': 11
    }, {
        'team': "SMG",
        'won': 2,
        'lost': 3,
        'maps won': 7,
        'maps lost': 10
    }, {
        'team': "PRM",
        'won': 0,
        'lost': 5,
        'maps won': 3,
        'maps lost': 17
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
        WorkingStatus['teams'][l]["maps won"]+= Number(matchresults[m][0])
		WorkingStatus['teams'][l]["maps lost"]+= Number(matchresults[m][2])
		WorkingStatus['teams'][r]["maps lost"]+= Number(matchresults[m][0])
		WorkingStatus['teams'][r]["maps won"]+= Number(matchresults[m][2])

        if (matchresults[m][0] === "3") {
            WorkingStatus['teams'][l]["won"]++;
            WorkingStatus['teams'][r]["lost"]++;
            console.log(WorkingStatus['teams'][l]["team"] + 'beat' + WorkingStatus['teams'][r]["team"]);
        } else if (matchresults[m][2] === "3") {
            WorkingStatus['teams'][r]["won"]++;
            WorkingStatus['teams'][l]["lost"]++;
            console.log(WorkingStatus['teams'][r]["team"] + 'beat' + WorkingStatus['teams'][l]["team"]);
        }
    }
}

function render() {
    WorkingStatus = JSON.parse(JSON.stringify(initialStatus));
    update();
    sortResults()
    document.getElementById("results").innerHTML = tableify(sorted);
    return;
}
// render();
function sortResults() {
    sorted = WorkingStatus.teams.sort(function(a, b) {
        return (a["won"] < b["won"]) ? 1 : ((a["won"] > b["won"]) ? -1 : (((a["maps won"] - a['maps lost']) < (b["maps won"] - b['maps lost'])) ? 1 : 0));
    });
}
window.onload = function() {
    render();
}