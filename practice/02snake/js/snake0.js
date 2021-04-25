const GRID_WIDTH = 10;  // 格子的边长
const GAP_WIDTH = 2;    // 空隙的边长
const ROW = 8;         // 一共有多少行格子&每行有多少个格子
const COLOR = '#fff';   // 蛇的颜色
const BG_COLOR = '#000';// 背景颜色
const FOOD_COLOR = 'red'; // 食物颜色
const INTERVAL = 300;

const UP = 0, LEFT = 1, RIGHT = 2, DOWN = 3;    // 定义蛇前进的方向
const CHANGE = [ [0, -1], [-1, 0], [1, 0], [0, 1] ]; // 每个方向前进时格子坐标的变化

let isAI = false;
let inteval = 300;
let newInterval = 300;

let canvas = document.getElementById('canvas');
canvas.height = GRID_WIDTH * ROW + GAP_WIDTH * (ROW + 1);
canvas.width = GRID_WIDTH * ROW + GAP_WIDTH * (ROW + 1);
let ctx = canvas.getContext('2d');

let snack, dir, map, nextDir, food;
let timer;

function changeSpeed(v) {
    newInterval = 1000 - v + 50;
}

function switchAI() { isAI = !isAI; }

function initialize() {
    snack = [ [2, 2], [3, 2], [4, 2]]; // 初始化一条🐍
    nextDir = dir = RIGHT; // 初始化一个方向
    map = [];
    for (let i = 0; i < ROW * ROW; i++) map[i] = 0;
    for (let i = 0; i < snack.length; i++) map[ getGridNumber(snack[i]) ] = 1;
    window.onkeydown = function(e) {
        // e.preventDefault();
        if (e.key === 'ArrowUp') nextDir = UP;
        if (e.key === 'ArrowDown') nextDir = DOWN;
        if (e.key === 'ArrowRight') nextDir = RIGHT;
        if (e.key === 'ArrowLeft') nextDir = LEFT;
    }
    drawSnack(ctx, snack, COLOR);
    drawFood();
}

function start() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initialize();
    move();
}

function move() {
    timer = setInterval(() => {
        if (newInterval !== inteval) {
            inteval = newInterval;
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            move();
        }
        // 每隔一段时间就刷新一次
        // 只有转头方向与当前方向垂直的时候 才改变方向
        if (isAI) nextDir = getNextDirection();
        if (nextDir !== dir && nextDir + dir !== 3) dir = nextDir;
        let head = snack[snack.length - 1]; // 蛇头
        let change = CHANGE[dir];           // 下一个格子前进位置
        let newGrid = [head[0] + change[0], head[1] + change[1]]; // 新格子的位置
        if (!isValidPosition(newGrid, map)) { // 新位置不合法 游戏结束
            clearInterval(timer);
            return;
        }
        snack.push(newGrid);    // 新格子加入蛇身的数组中
        map[getGridNumber(newGrid)] = 1;
        gradientRect(ctx, ...getUniteRect(newGrid, getBetweenTwoGridGap(head, newGrid)), dir, COLOR, inteval);
        if (newGrid[0] === food[0] && newGrid[1] === food[1]) {
            drawFood();
            return;
        }
        let delGrid = snack.shift();    // 删除蛇尾-最后一个元素
        map[getGridNumber(delGrid)] = 0;
        gradientRect(ctx, ...getUniteRect(delGrid, getBetweenTwoGridGap(delGrid, snack[0])), 
            getDirection(delGrid, snack[0]), BG_COLOR, inteval);
    }, inteval);
}

// 获取 g1 到 g2 的最短路径
function bfs(g1, g2, visited) {
    let x = 0;
    let queue = [g1];
    let lastEle = {}; // 记录每一个点的前一个点是什么
    let path = [];
    visited[getGridNumber(g1)] = 1;
    while (queue.length) {
        let now = queue.shift();
        if (now[0] === g2[0] && now[1] === g2[1]) {
            // 如果这个点就是g2 证明找到了最短路径
            path.push(now);
            while (now = lastEle[now]) {
                path.push(now);
            }
            return path;
        }
        // 为了达到随机的效果...防止死循环
        let permutation = getRandomPermutation(4);
        for (let i = 0; i < 4; i++) {
            let change = CHANGE[ permutation[i] ];
            let next = [now[0] + change[0], now[1] + change[1]];
            // 如果下一个位置合法的话
            if (next[0] >= 0 && next[0] < ROW && next[1] >= 0 && next[1] < ROW && 
                    (!visited[ getGridNumber(next) ] || next[0] === g2[0] && next[1] === g2[1])) {
                visited[ getGridNumber(next) ] = 1;
                lastEle[next] = now;
                queue.push(next);
            }
        }
    }
    return path;
}
// 获取两点之间的最长路径 
// 参考: https://github.com/chuyangliu/Snake/blob/master/docs/algorithms.md#longest-path
function longestPath(g1, g2, visited) {
    let sp = bfs(g1, g2, [...visited]);
    if (!sp.length) return sp;
    for (let g of sp) {
        visited[getGridNumber(g)] = 1;
    }
    let hasChange;
    do {
        hasChange = false;
        for (let i = 0; i < sp.length - 1; i++) {
            let now = sp[i], next = sp[i+1];
            let g1, g2; // 扩展出两个格子
            if (sp[i][1] === sp[i+1][1]) {
                // 相邻两个格子是水平排列的 尝试向上下扩展
                let g1 = [ now[0] + CHANGE[UP][0], now[1] + CHANGE[UP][1] ];
                let g2 = [ next[0] + CHANGE[UP][0], next[1] + CHANGE[UP][1] ];
                if (isValidPosition(g1, visited) && isValidPosition(g2, visited)) {
                    sp.splice(i + 1, 0, g1, g2);
                    visited[getGridNumber(g1)] = visited[getGridNumber(g2)] = 1;
                    hasChange = true;
                    break;
                }
                // 下
                g1 = [ now[0] + CHANGE[DOWN][0], now[1] + CHANGE[DOWN][1] ];
                g2 = [ next[0] + CHANGE[DOWN][0], next[1] + CHANGE[DOWN][1] ];
                if (isValidPosition(g1, visited) && isValidPosition(g2, visited)) {
                    sp.splice(i + 1, 0, g1, g2);
                    visited[getGridNumber(g1)] = visited[getGridNumber(g2)] = 1;
                    hasChange = true;
                    break;
                }
            } else {
                // 左
                let g1 = [ now[0] + CHANGE[LEFT][0], now[1] + CHANGE[LEFT][1] ];
                let g2 = [ next[0] + CHANGE[LEFT][0], next[1] + CHANGE[LEFT][1] ];
                if (isValidPosition(g1, visited) && isValidPosition(g2, visited)) {
                    sp.splice(i + 1, 0, g1, g2);
                    visited[getGridNumber(g1)] = visited[getGridNumber(g2)] = 1;
                    hasChange = true;
                    break;
                }
                // 右
                g1 = [ now[0] + CHANGE[RIGHT][0], now[1] + CHANGE[RIGHT][1] ];
                g2 = [ next[0] + CHANGE[RIGHT][0], next[1] + CHANGE[RIGHT][1] ];
                if (isValidPosition(g1, visited) && isValidPosition(g2, visited)) {
                    sp.splice(i + 1, 0, g1, g2);
                    visited[getGridNumber(g1)] = visited[getGridNumber(g2)] = 1;
                    hasChange = true;
                    break;
                }
            }
        }
    } while(hasChange);
    return sp;
}
// 获得 0 - n-1 的一个随机排列
function getRandomPermutation(n) {
    let ans = [];
    let vis = [];
    for (let i = 0; i < n; i++) {
        let t = Math.floor(Math.random() * (n - i));
        for (let j = 0; ; j++) {
            if (!vis[j] && !t--) {
                ans[i] = j;
                vis[j] = 1;
                break;
            }
        }
    }
    return ans;
}
// 获得一个数组的最后一个元素
function getLastEle(arr) {
    return arr[arr.length - 1];
}
// 获取两个格子之间的... 曼哈顿距离？
function getTwoGridDis(g1, g2) {
    return Math.abs(g1[0] - g2[0]) + Math.abs(g1[1] - g2[1]);
}

// 获得下一步移动的方向
function getNextDirection() {
    // 获取蛇头到食物的路径
    let path = bfs(getLastEle(snack), food, [...map]);
    // 如果路径存在的话
    if (snack.length * 2 < ROW * ROW && path.length) {
        // 尝试去按照这个路径吃苹果
        let virtualSnack = [...snack];
        let virtualMap = [...map];
        for (let i = path.length - 2; i >= 0; i--) {
            virtualSnack.push(path[i]);
            virtualMap[getGridNumber(path[i])] = 1;
            i && (virtualMap[getGridNumber(virtualSnack.shift())] = 0);
        }
        // 吃完之后看看能不能找到蛇尾
        let toTailPath = bfs(getLastEle(virtualSnack), virtualSnack[0], [...virtualMap]);
        if (toTailPath.length) {
            // 如果能找到蛇尾 证明一开始吃苹果的路径没问题 可以那么走
            return getDirection(getLastEle(path), path[path.length-2]);
        }
        // 吃完苹果找不到蛇尾 吃了苹果也没用 还是直接找蛇尾吧
    }
    let lp = longestPath(getLastEle(snack), snack[0], [...map]);
    if (lp.length) return getDirection(getLastEle(lp), lp[lp.length-2]);
    // 走投无路 随便选吧
    for (let i = 0; i < 4; i++) {
        let change = CHANGE[i];
        let next = [getLastEle(snack)[0] + change[0], getLastEle(snack)[1] + change[1]];
        if (isValidPosition(next, map)) return i;
    }
    return Math.floor(Math.random() * 4);
}
// 画食物
function drawFood() {
    food = getFoodPosition();
    ctx.fillStyle = FOOD_COLOR;
    ctx.fillRect(...getGridULCoordinate(food), GRID_WIDTH, GRID_WIDTH);
}
// 判断一个新生成的格子位置是否合法
function isValidPosition(g, visited) {
    if (g[0] >= 0 && g[0] < ROW && g[1] >= 0 && g[1] < ROW && !visited[getGridNumber(g)]) return true;
    return false;
}
// 获取一个格子的编号
function getGridNumber(g) {
    return g[0] * ROW + g[1];
}
function getFoodPosition() {
    let r = Math.floor(Math.random() * (ROW * ROW - snack.length)); // 随机获取一个数字 数字范围和剩余的格子数相同
    for (let i = 0; ; i++) {    // 只有遇到空位的时候 计数君 r 才减一
        if (!map[i] && --r < 0) return [Math.floor(i / ROW), i % ROW];
    }
}
// 给定一个格子的坐标和一个格子间隙的矩形（左上角，宽，高） 返回两个合并的矩形 的左上角、右下角 坐标
function getUniteRect(g, rect) {
    let p = getGridULCoordinate(g);
    if (p[0] === rect[0] && p[1] < rect[1] ||   // 矩形是在格子正下方
        p[1] === rect[1] && p[0] < rect[0]) {   // 矩形在格子的正右方
        return [p[0], p[1], rect[0] + rect[2], rect[1] + rect[3]];
    } else if (p[0] === rect[0] && p[1] > rect[1] || // 矩形是在格子正上方
        p[1] === rect[1] && p[0] > rect[0]) { // 矩形在格子的正左方
        return [rect[0], rect[1], p[0] + GRID_WIDTH, p[1] + GRID_WIDTH];
    }
}
// 从格子1 移动到格子2 的方向
function getDirection(g1, g2) {
    if (g1[0] === g2[0] && g1[1] < g2[1]) return DOWN;
    if (g1[0] === g2[0] && g1[1] > g2[1]) return UP;
    if (g1[1] === g2[1] && g1[0] < g2[0]) return RIGHT;
    if (g1[1] === g2[1] && g1[0] > g2[0]) return LEFT;
}

// 慢慢的填充一个矩形 （真的不知道则怎么写 瞎写...动画的执行时间可能不等于duration 但一定要保证<=duration
// 传入的是矩形左上角和右下角的坐标 以及渐变的方向
function gradientRect(ctx, x1, y1, x2, y2, dir, color, duration) {
    let dur = 20;
    let times = Math.floor(duration / dur); // 更新次数
    let nowX1 = x1, nowY1 = y1, nowX2 = x2, nowY2 = y2;
    let dx1 = 0, dy1 = 0, dx2 = 0, dy2 = 0;
    if (dir === UP) { dy1 = (y1 - y2) / times; nowY1 = y2; }
    if (dir === DOWN) { dy2 = (y2 - y1) / times; nowY2 = y1; }
    if (dir === LEFT) { dx1 = (x1 - x2) / times; nowX1 = x2; }
    if (dir === RIGHT) { dx2 = (x2 - x1) / times; nowX2 = x1; }
    let startTime = Date.now();
    let timer = setInterval(() => {
        nowX1 += dx1, nowX2 += dx2, nowY1 += dy1, nowY2 += dy2; // 更新
        let runTime = Date.now() - startTime;
        if (nowX1 < x1 || nowX2 > x2 || nowY1 < y1 || nowY2 > y2 || runTime >= duration - dur) {
            nowX1 = x1, nowX2 = x2, nowY1 = y1, nowY2 = y2;
            clearInterval(timer);
        }
        ctx.fillStyle = color;
        ctx.fillRect(nowX1, nowY1, nowX2 - nowX1, nowY2 - nowY1);
    }, dur);
}
// 根据snack二维数组画一条蛇
function drawSnack(ctx, snack, color) {
    ctx.fillStyle = color;
    for (let i = 0; i < snack.length; i++) {
        ctx.fillRect(...getGridULCoordinate(snack[i]), GRID_WIDTH, GRID_WIDTH);
        if (i) {
            ctx.fillRect(...getBetweenTwoGridGap(snack[i], snack[i - 1]));
        }
    }
}
// 传入一个格子 返回左上角坐标
function getGridULCoordinate(g) {
    return [g[0] * (GRID_WIDTH + GAP_WIDTH) + GAP_WIDTH, g[1] * (GRID_WIDTH + GAP_WIDTH) + GAP_WIDTH];
}
// 传入两个格子 返回两个格子之间的矩形缝隙
// 这里传入的两个格子必须是相邻的
// 返回一个数组 分别是这个矩形缝隙的 左上角横坐标 左上角纵坐标 宽 高
function getBetweenTwoGridGap(g1, g2) {
    let width = GRID_WIDTH + GAP_WIDTH;
    if (g1[0] === g2[0]) { // 横坐标相同 是纵向相邻的两个格子
        let x = g1[0] * width + GAP_WIDTH;
        let y = Math.min(g1[1], g2[1]) * width + width;
        return [x, y, GRID_WIDTH, GAP_WIDTH];
    } else { // 纵坐标相同 是横向相邻的两个格子
        let x = Math.min(g1[0], g2[0]) * width + width;
        let y = g1[1] * width + GAP_WIDTH;
        return [x, y, GAP_WIDTH, GRID_WIDTH];
    }
}