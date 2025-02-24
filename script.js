let leftWeight = 0, rightWeight = 0;

// ドロップを許可
function allowDrop(event) {
    event.preventDefault();
}

// ドラッグ開始時の処理
function drag(event) {
    event.dataTransfer.setData("value", event.target.getAttribute("data-value"));
}

// ドロップ時の処理
function drop(event, side) {
    event.preventDefault();
    let value = parseInt(event.dataTransfer.getData("value"));

    // ドロップされた数字をプレートに表示
    let contentArea = document.getElementById(`${side}-content`);
    let numberElement = document.createElement('div');
    numberElement.className = 'number-on-plate';
    numberElement.textContent = value;
    contentArea.appendChild(numberElement);

    // 重さを加算
    if (side === 'left') {
        leftWeight += value;
    } else {
        rightWeight += value;
    }
    updatePlates();
}

// プレートの動きを更新（重い方が下に下がる）
function updatePlates() {
    let leftPlate = document.getElementById("left-plate");
    let rightPlate = document.getElementById("right-plate");

    let maxShift = 40; // 最大移動距離

    // 重い方を下に
    leftPlate.style.top = `${50 + Math.max(0, (leftWeight - rightWeight) / 2 * maxShift / 10)}px`;
    rightPlate.style.top = `${50 + Math.max(0, (rightWeight - leftWeight) / 2 * maxShift / 10)}px`;

    // 結果表示の更新
    document.getElementById("result-display").textContent = 
        `左 ${leftWeight} ${leftWeight < rightWeight ? '<' : leftWeight > rightWeight ? '>' : '='} 右 ${rightWeight}`;
}

// プレートと数字のリセット
function resetBalance() {
    leftWeight = 0;
    rightWeight = 0;

    document.getElementById("left-plate").style.top = "50px";
    document.getElementById("right-plate").style.top = "50px";

    document.getElementById("left-content").innerHTML = '';
    document.getElementById("right-content").innerHTML = '';

    updatePlates();
}
