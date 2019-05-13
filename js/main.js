(window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (t) {
        window.setTimeout(t, 1e3 / 60);
    }),

/* -------------------窗口改变 ---------------*/

    (window.onresize = function () {
        c.width = cw = c.offsetWidth;
        c.height = ch = c.offsetHeight;
        ctx.fillStyle = "rgba(21,21,21,1)";
        ctx.fillRect(0, 0, cw, ch);
    });

/* -------------------初始化画布 ---------------*/
var cf = document.createElement("canvas");
    c = document.getElementById("startrack");
    c.width = cf.width = cw = c.offsetWidth;
    c.height = cf.height = ch = c.offsetHeight;
/* -------------------画布大小宽最大就*2.6 高最大同理 ---------------*/
var longside = Math.max(cw, ch);
    cf.width =  2.6*longside;
    cf.height = 2.6*longside;

/* -------------------创建canvas画布 与储存星星的数组---------------*/ 
var ctx = c.getContext("2d"),
    cftx = cf.getContext("2d"),
    centerX = cw,
    centerY = 0,
    stars = [],
    drawTimes = 0;


/* -------------------随机函数 ---------------*/

function rand(t, a) {
    var e = a - t,
        n = Math.random();
        return t + Math.round(n * e);
}


/* -------------------随机创建一个星星存入数组 ---------------*/

function createStar() {
    stars.push({
        x: rand(-cf.width, cf.width),
        y: rand(-cf.height, cf.height),
        size: 1,
        color: randomColor()
    });
}

/* -------------------随机颜色 ---------------*/
function randomColor() {
    return (
        "rgba(" +
        rand(120, 255) +
        "," +
        rand(120, 255) +
        "," +
        rand(120, 255) +
        "," +
        rand(30, 100) / 100 +
        ")"
    );
}
/* -------------------循环画每一个星星 10000个---------------*/

for (var count = 2e4; count!=0; count--){
    createStar();
    console.log('star[count]');
}
    drawStar();

var x = centerX;
    y = centerY;

function drawStar() {
    for (var t = stars.length; t--;) {
        var a = stars[t];
        cftx.beginPath(),
        cftx.arc(a.x, a.y, a.size, 0, 2 * Math.PI, !0),
        cftx.fillStyle = a.color,
        cftx.closePath(),
        cftx.fill();
    }
}
/* -------------------轨迹消失---------------*/
    ctx.fillStyle = "rgba(21,21,21,1)",
    ctx.fillRect(0, 0, cw, ch),
    ctx.lineCap = "round";

function drawfromCache() {
    ctx.drawImage(cf, -cf.width / 2, -cf.height / 2);
}

function loop() {
    drawfromCache(),
        ++drawTimes > 150 &&
        drawTimes % 8 == 0 &&((ctx.fillStyle = "rgba(0,0,0,.04)"), ctx.fillRect(-3 * longside, -3 * longside, 6 * longside, 6 * longside)),
        rotateCanvas(0.025);
}


function rotateCanvas(t) {
    ctx.rotate((t * Math.PI) / 180);
}



function fireAnimate() {
    requestAnimFrame(fireAnimate), loop();
}


function changeStar() {
    loop = function () {
        drawfromCache(),
            ++drawTimes > 150 &&
            drawTimes % 8 == 0 &&((ctx.fillStyle = "rgba(0,0,0,.04)"),ctx.fillRect(-3 * longside, -3 * longside, 6 * longside, 6 * longside)),
            rotateCanvas(random(1, 100));
    };
}


function getMsg() {
    var t = [
        "希望能成为有趣的人",
        "给时光以生命<br>给岁月以文明",
        "你好，请多指教",
        "当你在凝视着网页的时候<br>网页也正在凝视着你",
        "嘿！活着是件很好的事",
        "愿人类圣光永存！",
        "平凡的日常正奇迹的发生着",
        "Lata<br>lulila<br>lulula<br>lulalila ♪♫",
        "如果现在不开始想<br>那以后哪有时间做",
        "さあ、ゲームを始めよう",
        "何其有幸，我们相遇",
        "敬畏之心！",
        "赞美之心！",
        "我很好奇！",
        "欢迎大家光临星象馆<br>这里有着无论何时永远不会消失<br>美丽的无穷光辉<br>满天的星星等候着大家的到来",
        "双马尾是最好的方向盘"
    ],
        a = random(0, t.length - 1);
    $("#slogan").html(t[a]);
}


function random(t, a) {
    var e = a - t,
        n = Math.random();
    return t + Math.round(n * e);
}

ctx.translate(x, y),
    fireAnimate(),
    $(function () {
        getMsg();
    }),
    (window.onscroll = function () {
        $(window).scrollTop() > 0.6 * $(window).height()
            ? $(".background").addClass("fixed")
            : $(".background").removeClass("fixed");
    }),



    $(function () {
        $(".chatbox .line[data-meta-conf=init]").css("display", "block"),
            $("[data-meta-flag]").on("click", function () {
                var t = $(this).attr("data-meta-flag"),
                    a = $(this).parent(".line.question");
                if (a.hasClass("disable"))
                    $(this)
                        .removeClass("error")
                        .addClass("error");
                else {
                    !(function (t) {
                        switch (t) {
                            case "the-end":
                            case "nekotora-magic":
                                $(".chatbox").slideUp();
                                break;
                            case "do-another-style":
                                $("body").html(
                                    '\n          <div class="container">\n            <h1>你好我是哞菇/Nekotora.</h1>\n            <h4>完了。</h4>\n          </div>\n        '
                                );
                        }
                    })(t),
                        a.addClass("disable"),
                        $(this).addClass("selected"),
                        $(".chatbox .loading").css("display", "block"),
                        $(`[data-meta-content=${t}] > *`).css("display", "none"),
                        $(`[data-meta-content=${t}]`).css("display", "block");
                    var e = 0;
                    $(`[data-meta-content=${t}] > *`).each(function () {
                        var t = random(1e3, 2e3);
                        (e += t),
                            $(".chatbox .loading").css("display", "block"),
                            setTimeout(() => {
                                $(this).fadeIn();
                            }, e);
                    }),
                        setTimeout(() => {
                            $(".chatbox .loading").css("display", "none");
                        }, e);
                }
            });
    });
